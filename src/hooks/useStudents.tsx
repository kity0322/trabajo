import { useCallback, useEffect, useState } from 'react'
import { institucionesAliadas } from '@/data/institutional'

const STORAGE_KEY = 'impulsasaber_admin_students_v1'
const CHANGE_EVENT = 'impulsasaber_admin_students_changed'

export interface AdminStudent {
  id: string
  nombre: string
  documento: string
  grado: string
  institucionId: string
  sede: string
  telefono: string
  correo: string
  puntajeActual: number
  creadoEn: string
  actualizadoEn: string
}

function readStudents(): AdminStudent[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed as AdminStudent[] : []
  } catch {
    return []
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `student-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useStudents() {
  const [students, setStudents] = useState<AdminStudent[]>(readStudents)

  useEffect(() => {
    const sync = () => setStudents(readStudents())
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const persist = useCallback((next: AdminStudent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setStudents(next)
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  const addStudent = useCallback((student: Omit<AdminStudent, 'id' | 'creadoEn' | 'actualizadoEn'>) => {
    const now = new Date().toISOString()
    const created: AdminStudent = { ...student, id: createId(), creadoEn: now, actualizadoEn: now }
    persist([created, ...readStudents()])
    return created
  }, [persist])

  const updateStudent = useCallback((id: string, changes: Omit<AdminStudent, 'id' | 'creadoEn' | 'actualizadoEn'>) => {
    const now = new Date().toISOString()
    persist(readStudents().map((student) => student.id === id
      ? { ...student, ...changes, actualizadoEn: now }
      : student))
  }, [persist])

  const deleteStudent = useCallback((id: string) => {
    persist(readStudents().filter((student) => student.id !== id))
  }, [persist])

  const studentsByInstitution = useCallback((institutionId: string) =>
    students.filter((student) => student.institucionId === institutionId), [students])

  const institutionStats = institucionesAliadas.map((institution) => {
    const institutionStudents = students.filter((student) => student.institucionId === institution.id)
    const average = institutionStudents.length
      ? Math.round(institutionStudents.reduce((sum, student) => sum + student.puntajeActual, 0) / institutionStudents.length)
      : 0
    return { institution, total: institutionStudents.length, average }
  })

  return { students, institutionStats, studentsByInstitution, addStudent, updateStudent, deleteStudent }
}

export const sedesPorInstitucion: Record<string, string[]> = {
  ipsa: ['Sede Principal', 'Sede Samaniego'],
  cnsb: ['Sede Principal', 'Sede Samaniego'],
  'ie-providencia': ['Sede Principal', 'Centro', 'Veredas'],
  'ie-sanjuan': ['Sede Principal', 'Sede Guachavez'],
  'ie-lourdes': ['Sede Principal', 'Sede Lourdes'],
}
