import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './Octofit.css'

const navigation = [
  { to: '/activities', label: 'Atividades', number: '01' },
  { to: '/leaderboard', label: 'Ranking', number: '02' },
  { to: '/teams', label: 'Equipes', number: '03' },
  { to: '/users', label: 'Pessoas', number: '04' },
  { to: '/workouts', label: 'Treinos', number: '05' },
]

function App() {
  return (
    <div className="octofit-app">
      <header className="topbar">
        <NavLink className="brand" to="/activities" aria-label="OctoFit Tracker, início">
          <img src="/octofitapp-small.png" alt="" className="brand-logo" />
          <span className="brand-copy">
            <strong>octofit</strong>
            <span>FITNESS, EM MOVIMENTO</span>
          </span>
        </NavLink>
        <div className="topbar-meta">
          <span className="live-dot" aria-hidden="true" />
          <span>API <b>8000</b></span>
        </div>
      </header>

      <nav className="section-nav" aria-label="Seções do OctoFit Tracker">
        <div className="section-nav-inner">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `section-link${isActive ? ' active' : ''}`}
            >
              <span className="section-number">{item.number}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="workspace">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <span>OCTOFIT TRACKER</span>
        <span>Consistência cria movimento.</span>
      </footer>
    </div>
  )
}

export default App
