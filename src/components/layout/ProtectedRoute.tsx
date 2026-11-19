import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AppShell } from './AppShell'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { usuario, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy-100 border-t-navy-700" />
      </div>
    )
  }

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" replace />
  }

  return <AppShell>{children}</AppShell>
}
