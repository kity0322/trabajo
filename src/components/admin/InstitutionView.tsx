import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react'
import { AddStudentModal, type StudentFormValues } from '@/components/admin/AddStudentModal'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { institucionesAliadas } from '@/data/institutional'
import { useStudents, type AdminStudent } from '@/hooks/useStudents'

export default function InstitutionView() {
  const { id } = useParams<{ id: string }>()
  const { usuario } = useAuth()
  const { studentsByInstitution, updateStudent, deleteStudent } = useStudents()
  const [modalOpen, setModalOpen] = useState(false)
  const [studentToEdit, setStudentToEdit] = useState<AdminStudent | undefined>()

  if (usuario?.rol !== 'admin') return <Navigate to="/panel" replace />
  const institution = institucionesAliadas.find((item) => item.id === id)
  if (!institution) return <Navigate to="/admin" replace />

  const students = studentsByInstitution(institution.id).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))

  const openEdit = (student: AdminStudent) => {
    setStudentToEdit(student)
    setModalOpen(true)
  }

  const closeModal = (open: boolean) => {
    setModalOpen(open)
    if (!open) setStudentToEdit(undefined)
  }

  const saveStudent = (values: StudentFormValues) => {
    if (studentToEdit) updateStudent(studentToEdit.id, values)
  }

  const removeStudent = (student: AdminStudent) => {
    if (window.confirm(`¿Eliminar a ${student.nombre} del registro?`)) deleteStudent(student.id)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-navy-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1 text-xs font-semibold text-navy-500 hover:text-navy-900"><ArrowLeft className="h-3.5 w-3.5" />Instituciones</Link>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-gold-700">{institution.sigla} · {institution.municipio}</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-navy-900">{institution.nombre}</h1>
          <p className="mt-1 text-sm text-navy-500">{students.length} {students.length === 1 ? 'estudiante matriculado' : 'estudiantes matriculados'}</p>
        </div>
        <Button onClick={() => { setStudentToEdit(undefined); setModalOpen(true) }}><Plus className="h-4 w-4" />Agregar estudiante</Button>
      </header>

      <AdminNavigation />

      <Card className="overflow-hidden border-navy-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-navy-50 text-[11px] uppercase text-navy-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Estudiante</th>
                  <th className="px-4 py-3 font-bold">Documento</th>
                  <th className="px-4 py-3 font-bold">Grado</th>
                  <th className="px-4 py-3 font-bold">Sede</th>
                  <th className="px-4 py-3 font-bold">Teléfono</th>
                  <th className="px-4 py-3 font-bold">Correo</th>
                  <th className="px-4 py-3 text-right font-bold">Puntaje</th>
                  <th className="px-4 py-3 text-right font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-navy-50/60">
                    <td className="px-4 py-3 font-semibold text-navy-900">{student.nombre}</td>
                    <td className="px-4 py-3 text-navy-600">{student.documento}</td>
                    <td className="px-4 py-3 text-navy-600">{student.grado}</td>
                    <td className="px-4 py-3 text-navy-600">{student.sede}</td>
                    <td className="px-4 py-3 text-navy-600">{student.telefono}</td>
                    <td className="px-4 py-3 text-navy-600">{student.correo}</td>
                    <td className="px-4 py-3 text-right font-bold text-navy-900">{student.puntajeActual}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="outline" aria-label={`Editar ${student.nombre}`} title="Editar" onClick={() => openEdit(student)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="wine" aria-label={`Eliminar ${student.nombre}`} title="Eliminar" onClick={() => removeStudent(student)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan={8} className="px-4 py-14 text-center text-sm text-navy-400">No hay estudiantes registrados en esta institución.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {modalOpen && <AddStudentModal open={modalOpen} onOpenChange={closeModal} onSave={saveStudent} student={studentToEdit} defaultInstitutionId={institution.id} />}
    </div>
  )
}
