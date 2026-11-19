import { useState, useMemo, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookMarked,
  LineChart,
  Building2,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Lock,
  BookOpenCheck,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { usuario, cerrarSesion } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const navItems = useMemo(() => {
    if (usuario?.rol === 'admin') {
      return [
        { to: '/institucional', label: 'Supervisión & Auditoría', icon: ShieldCheck },
        { to: '/admin', label: 'Gestión de estudiantes', icon: Users },
        { to: '/mi-materia', label: 'Portal Docente (5 Áreas)', icon: BookOpenCheck },
        { to: '/pruebas-preicfes', label: 'Cuadernillos PRE ICFES', icon: GraduationCap },
        { to: '/simulacros', label: 'Inspección de Simulacros', icon: BookMarked },
      ]
    }
    if (usuario?.rol === 'docente') {
      return [
        { to: '/mi-materia', label: 'Mi Materia & Alumnos', icon: BookOpenCheck },
        { to: '/institucional', label: 'Panel Institucional', icon: Building2 },
        { to: '/simulacros', label: 'Pruebas de mi materia', icon: BookMarked },
        { to: '/estudiantes', label: 'Estudiantes', icon: Users },
      ]
    }
    // Por defecto: Estudiante
    return [
      { to: '/panel', label: 'Panel', icon: LayoutDashboard },
      { to: '/simulacros', label: 'Simulacros', icon: BookMarked },
      { to: '/progreso', label: 'Mi progreso', icon: LineChart },
      { to: '/pruebas-preicfes', label: 'Pruebas PRE ICFES', icon: GraduationCap, bloqueado: true },
    ]
  }, [usuario?.rol])

  const handleLogout = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-navy-100 bg-white lg:flex">
        <div className="flex h-16 items-center px-6">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const active = location.pathname === item.to
            const estaBloqueado = item.bloqueado && usuario?.rol !== 'admin'
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                  active
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'text-navy-500 hover:bg-navy-50 hover:text-navy-800'
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {estaBloqueado && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-wine-100 text-wine-600">
                    <Lock className="h-3 w-3" />
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-navy-100 p-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">{iniciales(usuario?.nombre ?? 'Est')}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy-800">{usuario?.nombre ?? 'Estudiante'}</p>
              <p className="truncate text-xs text-navy-400">{usuario?.grado ?? ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-navy-400 transition-colors hover:bg-wine-50 hover:text-wine-500"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-navy-100 bg-white/90 px-4 backdrop-blur-md lg:hidden">
        <Logo />
        <button
          onClick={() => setMenuAbierto(true)}
          className="rounded-lg p-2 text-navy-700 hover:bg-navy-50"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuAbierto(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button onClick={() => setMenuAbierto(false)} className="rounded-lg p-2 hover:bg-navy-50">
                  <X className="h-5 w-5 text-navy-700" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = location.pathname === item.to
                  const estaBloqueado = item.bloqueado && usuario?.rol !== 'admin'
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuAbierto(false)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold',
                        active ? 'bg-navy-700 text-white' : 'text-navy-500 hover:bg-navy-50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </div>
                      {estaBloqueado && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-wine-100 text-wine-600">
                          <Lock className="h-3 w-3" />
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-8 border-t border-navy-100 pt-4">
                <div className="mb-3 flex items-center gap-3 px-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">{iniciales(usuario?.nombre ?? 'Est')}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-800">{usuario?.nombre ?? 'Estudiante'}</p>
                    <p className="truncate text-xs text-navy-400">{usuario?.grado ?? ''}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-wine-500 hover:bg-wine-50"
                >
                  <LogOut className="h-5 w-5" />
                  Cerrar sesión
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
