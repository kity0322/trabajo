import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AreaId } from '@/data/areas'

export interface Usuario {
  nombre: string
  correo: string
  institucion: string
  grado: string
  rol?: 'estudiante' | 'docente' | 'admin'
  materia?: AreaId
  sector?: string
  municipio?: string
  instituciones?: string[] // Para profesores con 2 o más instituciones
}

export const USUARIO_ESTUDIANTE_DEFAULT: Usuario = {
  nombre: 'Estudiante',
  correo: 'estudiante@impulsasaber.edu.co',
  institucion: 'Colegio Nacional Simón Bolívar (CNSB)',
  grado: '11°A',
  rol: 'estudiante',
  sector: 'Samaniego - Sector Urbano / Centro',
  municipio: 'Samaniego',
}

interface AuthContextValue {
  usuario: Usuario | null
  cargando: boolean
  iniciarSesion: (usuario: Usuario) => void
  cerrarSesion: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'impulsasaber_usuario'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUsuario(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
        setUsuario(USUARIO_ESTUDIANTE_DEFAULT)
      }
    } else {
      setUsuario(USUARIO_ESTUDIANTE_DEFAULT)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(USUARIO_ESTUDIANTE_DEFAULT))
    }
    setCargando(false)
  }, [])

  const iniciarSesion = (nuevoUsuario: Usuario) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoUsuario))
    setUsuario(nuevoUsuario)
  }

  const cerrarSesion = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
