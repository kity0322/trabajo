import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Send,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  X,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { areas, type AreaId, getArea } from '@/data/areas'
import {
  preguntasEvaluacionDocente,
  guardarEvaluacionEstudiante,
  type EvaluacionDocenteEstudiante,
} from '@/data/teacherEvaluationData'
import { profesoresPorMateria } from '@/data/teacherData'

interface Props {
  abierto: boolean
  onCerrar: () => void
  materiaPreseleccionada?: AreaId
  onEvaluacionEnviada?: (evaluacion: EvaluacionDocenteEstudiante) => void
}

const mapDocenteId: Record<AreaId, string> = {
  matematicas: 'doc-mate',
  lectura: 'doc-lec',
  ciencias: 'doc-cien',
  sociales: 'doc-soc',
  ingles: 'doc-ing',
}

const puntajesIniciales = {
  claridad: 0,
  metodologia: 0,
  acompanamiento: 0,
  puntualidad: 0,
}

export function TeacherEvaluationModal({
  abierto,
  onCerrar,
  materiaPreseleccionada = 'matematicas',
  onEvaluacionEnviada,
}: Props) {
  const { usuario } = useAuth()

  const [materiaSeleccionada, setMateriaSeleccionada] = useState<AreaId>(materiaPreseleccionada)
  const [puntajes, setPuntajes] = useState<{
    claridad: number
    metodologia: number
    acompanamiento: number
    puntualidad: number
  }>({
    ...puntajesIniciales,
  })

  const [comentario, setComentario] = useState('')
  const [recomienda, setRecomienda] = useState(true)
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)

  const infoProfesor = profesoresPorMateria[materiaSeleccionada]
  const docenteId = mapDocenteId[materiaSeleccionada]
  const areaConfig = getArea(materiaSeleccionada)
  const AreaIcon = areaConfig?.icon || BookOpen

  const respuestasCompletas = Object.values(puntajes).every((puntaje) => puntaje >= 1 && puntaje <= 10)
  const promedioCalculado = respuestasCompletas
    ? Number(
        ((puntajes.claridad + puntajes.metodologia + puntajes.acompanamiento + puntajes.puntualidad) / 4).toFixed(1)
      )
    : null

  const handleCambiarPuntaje = (clave: keyof typeof puntajes, valor: number) => {
    setPuntajes((prev) => ({ ...prev, [clave]: valor }))
  }

  const handleCerrar = () => {
    setMateriaSeleccionada(materiaPreseleccionada)
    setPuntajes({ ...puntajesIniciales })
    setComentario('')
    setRecomienda(true)
    setEnviado(false)
    onCerrar()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!respuestasCompletas) return
    setCargando(true)

    setTimeout(() => {
      const nueva = guardarEvaluacionEstudiante(
        docenteId,
        infoProfesor.nombreProfesor,
        materiaSeleccionada,
        infoProfesor.materiaNombre,
        usuario?.nombre || 'Estudiante',
        usuario?.grado || '11°A',
        puntajes,
        comentario,
        recomienda
      )

      setCargando(false)
      setEnviado(true)

      if (onEvaluacionEnviada) {
        onEvaluacionEnviada(nueva)
      }

      setTimeout(() => {
        handleCerrar()
      }, 2000)
    }, 600)
  }

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && handleCerrar()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="pb-4 border-b border-navy-100">
          <div className="flex items-center gap-2 text-gold-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            Evaluación y Calificación Docente
          </div>
          <DialogTitle className="text-xl font-bold text-navy-800">
            Califica a tu Profesor (Escala del 1 al 10)
          </DialogTitle>
          <DialogDescription className="text-xs text-navy-400">
            Tu opinión ayuda a mejorar las clases y permite a la administración supervisar qué tan claro se hace entender cada docente.
          </DialogDescription>
        </DialogHeader>

        {enviado ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-4"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-heading text-xl font-bold text-navy-800">
              ¡Muchas gracias por calificar a tu profesor!
            </h3>
            <p className="text-xs text-navy-500 max-w-md mx-auto">
              Tu calificación de <strong>{promedioCalculado} / 10</strong> ha sido registrada con éxito y será revisada por la dirección académica.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            {/* Selector de Materia / Profesor */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-700 uppercase tracking-wider">
                Selecciona la materia y profesor a calificar:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {areas.map((a) => {
                  const activo = materiaSeleccionada === a.id
                  const Icon = a.icon
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        setMateriaSeleccionada(a.id)
                        setPuntajes({ ...puntajesIniciales })
                        setComentario('')
                        setRecomienda(true)
                      }}
                      className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all border ${
                        activo
                          ? 'border-gold-400 bg-navy-800 text-white shadow-md'
                          : 'border-navy-100 bg-white text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      <Icon className={`h-4 w-4 mb-1 ${activo ? 'text-gold-400' : 'text-navy-500'}`} />
                      <span className="text-xs font-bold">{a.nombreCorto}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tarjeta del Profesor seleccionado */}
            <div className="rounded-2xl bg-navy-50/80 p-4 border border-navy-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400 font-bold">
                  <AreaIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-navy-800">
                    {infoProfesor.nombreProfesor}
                  </h4>
                  <p className="text-xs text-navy-500">
                    Área: <strong className="text-navy-700">{infoProfesor.materiaNombre}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-navy-400">Promedio de esta encuesta</span>
                <p className="font-heading text-2xl font-bold text-gold-600">
                  {promedioCalculado ?? '—'} <span className="text-xs text-navy-400 font-normal">/ 10</span>
                </p>
              </div>
            </div>

            {/* Preguntas de calificación (Escala del 1 al 10) */}
            <div className="space-y-5">
              {preguntasEvaluacionDocente.map((preg) => {
                const valorActual = puntajes[preg.clave]
                return (
                  <div
                    key={preg.id}
                    className="rounded-2xl border border-navy-100 bg-white p-4 space-y-3 hover:border-navy-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-heading text-xs font-bold text-navy-800 flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-gold-600" />
                          {preg.titulo}
                        </h4>
                        <p className="text-xs font-medium text-navy-700 mt-1">{preg.pregunta}</p>
                        <p className="text-[11px] text-navy-400 mt-0.5">{preg.descripcion}</p>
                      </div>
                      <span className="font-heading text-lg font-bold text-navy-900 bg-navy-50 px-2.5 py-1 rounded-lg border border-navy-100 shrink-0">
                        {valorActual}/10
                      </span>
                    </div>

                    {/* Selector interactivo de 1 a 10 */}
                    <div className="space-y-1.5">
                      <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                          const seleccionado = valorActual === num
                          return (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleCambiarPuntaje(preg.clave, num)}
                              aria-label={`${num} de 10`}
                              aria-pressed={seleccionado}
                              className={`h-9 rounded-lg text-xs font-bold transition-all ${
                                seleccionado
                                  ? num >= 8
                                    ? 'bg-emerald-600 text-white shadow-md scale-110'
                                    : num >= 6
                                    ? 'bg-gold-500 text-navy-950 shadow-md scale-110'
                                    : 'bg-wine-600 text-white shadow-md scale-110'
                                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                              }`}
                            >
                              {num}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-navy-400 px-1 font-semibold">
                        <span>1 = Muy mal</span>
                        <span>5 = Regular</span>
                        <span>10 = Excelente</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recomendación general */}
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-navy-50 p-3">
                <span className="text-xs font-bold text-navy-800">
                  ¿Recomiendas a este profesor para otros estudiantes?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRecomienda(true)}
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      recomienda ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-navy-600'
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecomienda(false)}
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      !recomienda ? 'bg-wine-600 text-white shadow-sm' : 'bg-white text-navy-600'
                    }`}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" /> No
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="comentario-estudiante" className="text-xs font-bold text-navy-700 uppercase tracking-wider">
                  Recomendación de mejora para esta materia y profesor (opcional):
                </label>
                <textarea
                  id="comentario-estudiante"
                  rows={3}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="¿Qué podría cambiar o reforzar el profesor para ayudarte a aprender mejor?"
                  className="w-full rounded-xl border border-navy-200 bg-white p-3 text-xs text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-600"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-100">
              <Button type="button" variant="outline" size="sm" onClick={handleCerrar}>
                Cancelar
              </Button>
              <Button type="submit" size="sm" className="bg-navy-800 hover:bg-navy-900 text-white font-bold" disabled={cargando || !respuestasCompletas}>
                <Send className="mr-1.5 h-3.5 w-3.5 text-gold-400" />
                {cargando ? 'Enviando...' : respuestasCompletas ? 'Enviar Calificación' : 'Califica los 4 criterios'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
