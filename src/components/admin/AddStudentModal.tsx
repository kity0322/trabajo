import { useState, type FormEvent } from 'react'
import { Save, UserPlus } from 'lucide-react'
import { institucionesAliadas } from '@/data/institutional'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { sedesPorInstitucion, type AdminStudent } from '@/hooks/useStudents'

export type StudentFormValues = Omit<AdminStudent, 'id' | 'creadoEn' | 'actualizadoEn'>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (student: StudentFormValues) => void
  student?: AdminStudent
  defaultInstitutionId?: string
}

export function AddStudentModal({ open, onOpenChange, onSave, student, defaultInstitutionId }: Props) {
  const initialInstitution = student?.institucionId ?? defaultInstitutionId ?? ''
  const [nombre, setNombre] = useState(student?.nombre ?? '')
  const [documento, setDocumento] = useState(student?.documento ?? '')
  const [grado, setGrado] = useState(student?.grado ?? '')
  const [institucionId, setInstitucionId] = useState(initialInstitution)
  const [sede, setSede] = useState(student?.sede ?? sedesPorInstitucion[initialInstitution]?.[0] ?? '')
  const [telefono, setTelefono] = useState(student?.telefono ?? '')
  const [correo, setCorreo] = useState(student?.correo ?? '')
  const [puntajeActual, setPuntajeActual] = useState(String(student?.puntajeActual ?? ''))
  const [error, setError] = useState('')

  const sedes = sedesPorInstitucion[institucionId] ?? ['Sede Principal']

  const handleInstitutionChange = (id: string) => {
    setInstitucionId(id)
    setSede(sedesPorInstitucion[id]?.[0] ?? 'Sede Principal')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const institution = institucionesAliadas.find((item) => item.id === institucionId)
    const score = Number(puntajeActual)
    if (!institution) {
      setError('Selecciona una institución aliada.')
      return
    }
    if (!Number.isFinite(score) || score < 0 || score > 500) {
      setError('El puntaje debe estar entre 0 y 500.')
      return
    }

    onSave({
      nombre: nombre.trim(),
      documento: documento.trim(),
      grado,
      institucionId,
      sede,
      telefono: telefono.trim(),
      correo: correo.trim().toLowerCase(),
      puntajeActual: score,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy-900">
            <UserPlus className="h-5 w-5 text-gold-600" />
            {student ? 'Editar estudiante' : 'Agregar estudiante'}
          </DialogTitle>
          <DialogDescription>Registra la información académica y de contacto del estudiante.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre completo">
              <Input required autoFocus value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder="Nombre y apellidos" />
            </Field>
            <Field label="Documento">
              <Input required value={documento} onChange={(event) => setDocumento(event.target.value)} placeholder="Número de documento" />
            </Field>
            <Field label="Grado">
              <select required value={grado} onChange={(event) => setGrado(event.target.value)} className={selectClass}>
                <option value="">Selecciona grado</option>
                {['9°', '10°', '11°', '11°A', '11°B', '11°C'].map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>
            <Field label="Institución">
              <select required value={institucionId} onChange={(event) => handleInstitutionChange(event.target.value)} className={selectClass}>
                <option value="">Selecciona institución</option>
                {institucionesAliadas.map((item) => <option key={item.id} value={item.id}>{item.sigla ? `${item.sigla} · ` : ''}{item.nombre}</option>)}
              </select>
            </Field>
            <Field label="Sede">
              <select required value={sede} onChange={(event) => setSede(event.target.value)} className={selectClass} disabled={!institucionId}>
                <option value="">Selecciona sede</option>
                {sedes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>
            <Field label="Puntaje actual (0–500)">
              <Input required type="number" min="0" max="500" step="1" value={puntajeActual} onChange={(event) => setPuntajeActual(event.target.value)} placeholder="300" />
            </Field>
            <Field label="Teléfono">
              <Input required type="tel" value={telefono} onChange={(event) => setTelefono(event.target.value)} placeholder="+57 300 000 0000" />
            </Field>
            <Field label="Correo electrónico">
              <Input required type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder="estudiante@correo.com" />
            </Field>
          </div>
          {error && <p role="alert" className="text-sm font-medium text-wine-600">{error}</p>}
          <div className="flex justify-end gap-2 border-t border-navy-100 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit"><Save className="h-4 w-4" />{student ? 'Guardar cambios' : 'Guardar estudiante'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5 text-sm font-semibold text-navy-700"><span>{label}</span>{children}</label>
}

const selectClass = 'h-11 w-full rounded-xl border-2 border-navy-100 bg-white px-3 text-sm text-navy-800 outline-none focus:border-navy-400'
