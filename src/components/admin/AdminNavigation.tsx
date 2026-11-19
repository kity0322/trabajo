import { NavLink } from 'react-router-dom'

const items = [
  { to: '/admin', label: 'Instituciones', end: true },
  { to: '/admin/ranking', label: 'Ranking General', end: false },
]

export function AdminNavigation() {
  return (
    <nav aria-label="Administración de estudiantes" className="flex flex-wrap gap-2 border-b border-navy-100 pb-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-navy-800 text-white' : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
