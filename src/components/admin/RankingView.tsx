import { Navigate } from 'react-router-dom'
import { ArrowDownWideNarrow, Trophy } from 'lucide-react'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useStudents } from '@/hooks/useStudents'

export default function RankingView() {
  const { usuario } = useAuth()
  const { students, institutionStats } = useStudents()

  if (usuario?.rol !== 'admin') return <Navigate to="/panel" replace />

  const rankedStudents = [...students].sort((a, b) => b.puntajeActual - a.puntajeActual || a.nombre.localeCompare(b.nombre, 'es'))

  return (
    <div className="space-y-6">
      <header className="border-b border-navy-100 pb-5">
        <p className="text-xs font-bold uppercase tracking-wide text-gold-700">ImpulsarSAS · Comparativa institucional</p>
        <h1 className="mt-1 font-heading text-2xl font-bold text-navy-900 sm:text-3xl">Ranking General</h1>
        <p className="mt-1 text-sm text-navy-500">Estudiantes de todas las instituciones, ordenados por puntaje actual.</p>
      </header>

      <AdminNavigation />

      <section aria-label="Promedio por institución" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {institutionStats.map(({ institution, total, average }) => (
          <Card key={institution.id} className="border-navy-100">
            <CardContent className="flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700"><Trophy className="h-5 w-5" /></span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-navy-600">{institution.sigla ?? institution.nombre}</p>
                <p className="font-heading text-lg font-bold text-navy-900">Promedio {average} pts</p>
                <p className="text-[11px] text-navy-400">{total} {total === 1 ? 'estudiante' : 'estudiantes'}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="overflow-hidden border-navy-100">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-navy-100 px-5 py-4">
            <ArrowDownWideNarrow className="h-4 w-4 text-gold-700" />
            <h2 className="font-heading font-bold text-navy-900">Puntajes más altos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-navy-50 text-[11px] uppercase text-navy-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Posición</th>
                  <th className="px-4 py-3 font-bold">Estudiante</th>
                  <th className="px-4 py-3 font-bold">Institución</th>
                  <th className="px-4 py-3 font-bold">Sede</th>
                  <th className="px-4 py-3 font-bold">Grado</th>
                  <th className="px-4 py-3 text-right font-bold">Puntaje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {rankedStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-navy-50/60">
                    <td className="px-4 py-3 font-bold text-gold-700">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold text-navy-900">{student.nombre}</td>
                    <td className="px-4 py-3 text-navy-600">{institutionStats.find((item) => item.institution.id === student.institucionId)?.institution.sigla}</td>
                    <td className="px-4 py-3 text-navy-600">{student.sede}</td>
                    <td className="px-4 py-3 text-navy-600">{student.grado}</td>
                    <td className="px-4 py-3 text-right font-heading font-bold text-navy-900">{student.puntajeActual}</td>
                  </tr>
                ))}
                {rankedStudents.length === 0 && <tr><td colSpan={6} className="px-4 py-14 text-center text-sm text-navy-400">Agrega estudiantes para construir el ranking institucional.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
