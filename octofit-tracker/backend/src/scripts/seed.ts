import mongoose from 'mongoose';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const [trailblazers, pulseCollective] = await Promise.all([
      Team.findOneAndUpdate(
        { slug: 'trailblazers' },
        {
          $set: {
            name: 'Trailblazers',
            slug: 'trailblazers',
            description: 'A running team focused on steady progress and weekend routes.',
            memberIds: [],
            totalPoints: 1630,
            seedKey: 'team-trailblazers',
          },
        },
        { returnDocument: 'after', upsert: true, runValidators: true },
      ),
      Team.findOneAndUpdate(
        { slug: 'pulse-collective' },
        {
          $set: {
            name: 'Pulse Collective',
            slug: 'pulse-collective',
            description: 'A balanced crew mixing strength, cycling, and recovery.',
            memberIds: [],
            totalPoints: 1385,
            seedKey: 'team-pulse-collective',
          },
        },
        { returnDocument: 'after', upsert: true, runValidators: true },
      ),
    ]);

    if (!trailblazers || !pulseCollective) {
      throw new Error('Could not create the sample teams');
    }

    const teamByKey = { trailblazers, pulseCollective };
    const userSeeds = [
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', age: 29, totalPoints: 840, teamKey: 'trailblazers' as const },
      { name: 'Priya Shah', email: 'priya.shah@example.com', age: 34, totalPoints: 790, teamKey: 'trailblazers' as const },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', age: 26, totalPoints: 720, teamKey: 'pulseCollective' as const },
      { name: 'Camila Santos', email: 'camila.santos@example.com', age: 31, totalPoints: 665, teamKey: 'pulseCollective' as const },
    ];

    const users = await Promise.all(
      userSeeds.map(async ({ teamKey, ...user }) => {
        const team = teamByKey[teamKey];
        return User.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              ...user,
              teamId: team._id,
              seedKey: `user-${user.email}`,
            },
          },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    if (users.some((user) => !user)) {
      throw new Error('Could not create the sample users');
    }

    const trailblazerMembers = users
      .filter((user) => user.teamId.equals(trailblazers._id))
      .map((user) => user._id);
    const pulseMembers = users
      .filter((user) => user.teamId.equals(pulseCollective._id))
      .map((user) => user._id);

    await Promise.all([
      Team.updateOne({ _id: trailblazers._id }, { $set: { memberIds: trailblazerMembers } }),
      Team.updateOne({ _id: pulseCollective._id }, { $set: { memberIds: pulseMembers } }),
    ]);

    const activitySeeds = [
      { seedKey: 'activity-alex-run', userIndex: 0, type: 'run' as const, durationMinutes: 38, distanceKm: 6.2, calories: 410, daysAgo: 1 },
      { seedKey: 'activity-priya-cycling', userIndex: 1, type: 'cycling' as const, durationMinutes: 52, distanceKm: 18.5, calories: 520, daysAgo: 2 },
      { seedKey: 'activity-jordan-strength', userIndex: 2, type: 'strength' as const, durationMinutes: 45, distanceKm: 0, calories: 330, daysAgo: 1 },
      { seedKey: 'activity-camila-walk', userIndex: 3, type: 'walk' as const, durationMinutes: 40, distanceKm: 3.4, calories: 190, daysAgo: 3 },
    ];

    await Promise.all(
      activitySeeds.map(({ userIndex, daysAgo, ...activity }) => {
        const user = users[userIndex];
        return Activity.findOneAndUpdate(
          { seedKey: activity.seedKey },
          {
            $set: {
              ...activity,
              userId: user._id,
              teamId: user.teamId,
              completedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
            },
          },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    await Promise.all(
      users.map((user, index) =>
        LeaderboardEntry.findOneAndUpdate(
          { seedKey: `leaderboard-weekly-${user.email}` },
          {
            $set: {
              seedKey: `leaderboard-weekly-${user.email}`,
              userId: user._id,
              teamId: user.teamId,
              userName: user.name,
              teamName: user.teamId.equals(trailblazers._id) ? trailblazers.name : pulseCollective.name,
              points: user.totalPoints,
              rank: index + 1,
              period: 'weekly',
            },
          },
          { returnDocument: 'after', upsert: true, runValidators: true },
        ),
      ),
    );

    const workoutSeeds = [
      {
        name: 'Tempo Run Builder',
        slug: 'tempo-run-builder',
        category: 'cardio' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 35,
        exercises: [
          { name: 'Easy warm-up', durationSeconds: 300 },
          { name: 'Tempo intervals', sets: 4, durationSeconds: 240 },
          { name: 'Cool-down jog', durationSeconds: 360 },
        ],
      },
      {
        name: 'Full-body Foundations',
        slug: 'full-body-foundations',
        category: 'strength' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Push-up', sets: 3, reps: 8 },
          { name: 'Glute bridge', sets: 3, reps: 15 },
        ],
      },
      {
        name: 'Mobility Reset',
        slug: 'mobility-reset',
        category: 'mobility' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 18,
        exercises: [
          { name: "World's greatest stretch", sets: 2, reps: 5 },
          { name: 'Hip flexor opener', durationSeconds: 60 },
          { name: 'Thoracic rotation', sets: 2, reps: 8 },
        ],
      },
    ];

    await Promise.all(
      workoutSeeds.map((workout) =>
        Workout.findOneAndUpdate(
          { slug: workout.slug },
          { $set: { ...workout, seedKey: `workout-${workout.slug}` } },
          { returnDocument: 'after', upsert: true, runValidators: true },
        ),
      ),
    );

    console.log('Seed the octofit_db database with test data');
    console.log('Seeded 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
