import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'

export function PublicNavbar() {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const links = [
    { to: '/como-funciona', label: '¿Cómo funciona?' },
    { to: '/instituciones', label: 'Instituciones aliadas' },
    { to: '/areas', label: 'Áreas de estudio' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-navy-100/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `text-sm font-medium transition-colors hover:text-navy-900 ${isActive ? 'text-navy-900' : 'text-navy-500'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" onClick={() => navigate('/iniciar-sesion')}>
            Inicia sesión
          </Button>
          <Button size="sm" onClick={() => navigate('/registro')}>
            Regístrate gratis
          </Button>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-navy-700 hover:bg-navy-50 md:hidden"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          {menuAbierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuAbierto && (
        <nav className="border-t border-navy-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuAbierto(false)}
                className={({ isActive }) => `rounded-lg px-3 py-3 text-sm font-semibold ${isActive ? 'bg-gold-50 text-navy-900' : 'text-navy-600 hover:bg-navy-50'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-navy-100 pt-3">
              <Button variant="outline" size="sm" onClick={() => { setMenuAbierto(false); navigate('/iniciar-sesion') }}>
                Inicia sesión
              </Button>
              <Button size="sm" onClick={() => { setMenuAbierto(false); navigate('/registro') }}>
                Regístrate
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
