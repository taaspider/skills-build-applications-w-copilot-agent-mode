import mongoose, { Schema, Types } from 'mongoose'

interface UserRecord {
  name: string
  email: string
  age: number
  totalPoints: number
  teamId: Types.ObjectId
  seedKey?: string
}

interface TeamRecord {
  name: string
  slug: string
  description: string
  memberIds: Types.ObjectId[]
  totalPoints: number
  seedKey?: string
}

interface ActivityRecord {
  userId: Types.ObjectId
  teamId: Types.ObjectId
  type: 'run' | 'walk' | 'cycling' | 'strength'
  durationMinutes: number
  distanceKm: number
  calories: number
  completedAt: Date
  seedKey?: string
}

interface LeaderboardRecord {
  userId: Types.ObjectId
  teamId: Types.ObjectId
  userName: string
  teamName: string
  points: number
  rank: number
  period: 'weekly' | 'monthly'
  seedKey?: string
}

interface WorkoutRecord {
  name: string
  slug: string
  category: 'cardio' | 'strength' | 'mobility'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  durationMinutes: number
  exercises: {
    name: string
    sets?: number
    reps?: number
    durationSeconds?: number
  }[]
  seedKey?: string
}

const userSchema = new Schema<UserRecord>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    age: { type: Number, min: 13 },
    totalPoints: { type: Number, default: 0, min: 0 },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
)

const teamSchema = new Schema<TeamRecord>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
)

const activitySchema = new Schema<ActivityRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, enum: ['run', 'walk', 'cycling', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, default: 0, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema<LeaderboardRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
)

const workoutSchema = new Schema<WorkoutRecord>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, min: 1 },
        reps: { type: Number, min: 1 },
        durationSeconds: { type: Number, min: 1 },
      },
    ],
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
)

export const User = mongoose.model<UserRecord>('User', userSchema, 'users')
export const Team = mongoose.model<TeamRecord>('Team', teamSchema, 'teams')
export const Activity = mongoose.model<ActivityRecord>('Activity', activitySchema, 'activities')
export const LeaderboardEntry = mongoose.model<LeaderboardRecord>(
  'LeaderboardEntry',
  leaderboardSchema,
  'leaderboard',
)
export const Workout = mongoose.model<WorkoutRecord>('Workout', workoutSchema, 'workouts')