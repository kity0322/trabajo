import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Plus, School, UnlockKeyhole, Users } from 'lucide-react'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { AddStudentModal, type StudentFormValues } from '@/components/admin/AddStudentModal'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useStudents } from '@/hooks/useStudents'
import {
  guardarEstadoPruebasDesbloqueadas,
  obtenerEstadoPruebasDesbloqueadas,
  PRUEBAS_DESBLOQUEADAS_EVENT,
  simulacros,
} from '@/data/simulacros'
import { areas } from '@/data/areas'

export default function AdminDashboard() {
  const { usuario } = useAuth()
  const { institutionStats, addStudent } = useStudents()
  const [modalOpen, setModalOpen] = useState(false)
  const [pruebasDesbloqueadas, setPruebasDesbloqueadas] = useState(obtenerEstadoPruebasDesbloqueadas)

  useEffect(() => {
    const sync = () => setPruebasDesbloqueadas(obtenerEstadoPruebasDesbloqueadas())
    window.addEventListener(PRUEBAS_DESBLOQUEADAS_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(PRUEBAS_DESBLOQUEADAS_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (usuario?.rol !== 'admin') return <Navigate to="/panel" replace />

  const handleAdd = (student: StudentFormValues) => addStudent(student)

  const togglePrueba = (id: string) => {
    const siguiente = { ...pruebasDesbloqueadas, [id]: !pruebasDesbloqueadas[id] }
    setPruebasDesbloqueadas(siguiente)
    guardarEstadoPruebasDesbloqueadas(siguiente)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-navy-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gold-700">ImpulsarSAS · Administración</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-navy-900 sm:text-3xl">Gestión de estudiantes</h1>
          <p className="mt-1 text-sm text-navy-500">Resumen institucional y matrícula por sede.</p>
        </div>
        <Button size="lg" onClick={() => setModalOpen(true)}><Plus className="h-5 w-5" />Agregar estudiante</Button>
      </header>

      <AdminNavigation />

      <section aria-label="Instituciones aliadas" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {institutionStats.map(({ institution, total, average }) => (
          <Link
            key={institution.id}
            to={`/admin/institucion/${institution.id}`}
            className="group rounded-xl border border-navy-100 bg-white p-5 transition-colors hover:border-gold-400 hover:bg-gold-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700 group-hover:bg-navy-800 group-hover:text-gold-300">
                <School className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-700" />
            </div>
            <h2 className="mt-4 font-heading text-base font-bold text-navy-900">{institution.sigla ?? institution.nombre}</h2>
            <p className="mt-0.5 text-xs text-navy-500">{institution.nombre}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-navy-700">
              <Users className="h-4 w-4 text-gold-600" />{institution.sigla ?? institution.nombre} · {total} {total === 1 ? 'estudiante' : 'estudiantes'}
            </p>
            <p className="mt-1 text-xs text-navy-400">{institution.municipio}, {institution.departamento}{total ? ` · Promedio ${average} pts` : ''}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-4 border-t border-navy-100 pt-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gold-700">Acceso académico</p>
          <h2 className="mt-1 font-heading text-xl font-bold text-navy-900">Gestión de Pruebas Pre-ICFES</h2>
          <p className="mt-1 text-sm text-navy-500">Activa las pruebas que los estudiantes pueden presentar. Por defecto permanecen bloqueadas.</p>
        </div>
        <div className="divide-y divide-navy-100 border-y border-navy-100">
          {simulacros.map((simulacro) => {
            const desbloqueado = pruebasDesbloqueadas[simulacro.id] === true
            const area = areas.find((item) => item.id === simulacro.materia)
            return (
              <div key={simulacro.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${desbloqueado ? 'bg-gold-50 text-gold-700' : 'bg-navy-50 text-navy-400'}`}>
                    {desbloqueado ? <UnlockKeyhole className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-navy-900">{simulacro.titulo}</p>
                    <p className="text-xs text-navy-500">{area?.nombre ?? simulacro.materia} · {simulacro.dificultad}</p>
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-3 self-start sm:self-auto">
                  <span className={`text-sm font-semibold ${desbloqueado ? 'text-navy-800' : 'text-navy-500'}`}>
                    {desbloqueado ? 'Desbloqueado' : 'Bloqueado'}
                  </span>
                  <input
                    type="checkbox"
                    role="switch"
                    checked={desbloqueado}
                    onChange={() => togglePrueba(simulacro.id)}
                    aria-label={`${desbloqueado ? 'Bloquear' : 'Desbloquear'} ${simulacro.titulo}`}
                    className="peer sr-only"
                  />
                  <span aria-hidden="true" className={`relative h-6 w-11 rounded-full transition-colors after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500 ${desbloqueado ? 'bg-gold-500' : 'bg-navy-300'}`} />
                </label>
              </div>
            )
          })}
        </div>
      </section>

      {modalOpen && <AddStudentModal open={modalOpen} onOpenChange={setModalOpen} onSave={handleAdd} />}
    </div>
  )
}
