import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, ShieldCheck, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { getSimulacro, obtenerEstadoPruebasDesbloqueadas } from '@/data/simulacros'
import { buildExamQuestions } from '@/lib/examQuestions'
import { calcularResultado, guardarResultado, type RespuestaUsuario } from '@/lib/scoring'
import { getArea } from '@/data/areas'
import { cn } from '@/lib/utils'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function ExamTimer({
  duracionSegundos,
  onTimeUp,
}: {
  duracionSegundos: number
  onTimeUp: () => void
}) {
  const [tiempo, setTiempo] = useState(duracionSegundos)

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [onTimeUp])

  const tiempoCritico = tiempo <= 60

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 font-heading text-lg font-bold tabular-nums transition-colors',
        tiempoCritico
          ? 'animate-pulse border-wine-300 bg-wine-50 text-wine-600'
          : 'border-navy-100 bg-navy-50 text-navy-700'
      )}
    >
      <Clock className="h-4 w-4" />
      {formatTime(tiempo)}
    </div>
  )
}

export default function ExamRunner() {
  const { usuario } = useAuth()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const simulacro = useMemo(() => getSimulacro(id ?? ''), [id])

  const preguntas = useMemo(
    () => {
      if (!simulacro) return []
      const seleccion =
        simulacro.preguntas.length > 0
          ? simulacro.preguntas
          : buildExamQuestions(simulacro.area, simulacro.numPreguntas)
      return usuario?.rol === 'docente'
        ? seleccion.filter((pregunta) => pregunta.area === usuario.materia)
        : seleccion
    },
    [simulacro, usuario]
  )

  const [indiceActual, setIndiceActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, number | null>>({})
  const [marcadas, setMarcadas] = useState<Set<string>>(new Set())
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [mostrarSalida, setMostrarSalida] = useState(false)
  const inicioRef = useRef(Date.now())
  const finalizadoRef = useRef(false)

  if (!simulacro) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-wine-500" />
            <h1 className="font-heading text-xl font-bold text-navy-800">Simulacro no encontrado</h1>
            <p className="mt-2 text-sm text-navy-400">El simulacro que buscas no existe o fue movido.</p>
            <Button className="mt-5" onClick={() => navigate('/simulacros')}>
              Volver al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (usuario?.rol === 'estudiante' && !obtenerEstadoPruebasDesbloqueadas()[simulacro.id]) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <Card className="max-w-md border-navy-100 text-center">
          <CardContent className="p-8">
            <LockKeyhole className="mx-auto mb-3 h-10 w-10 text-navy-400" />
            <h1 className="font-heading text-xl font-bold text-navy-800">Prueba bloqueada</h1>
            <p className="mt-2 text-sm text-navy-500">Bloqueado por la administradora.</p>
            <Button className="mt-5" onClick={() => navigate('/simulacros', { replace: true })}>
              Volver a simulacros
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (usuario?.rol === 'docente' && (!usuario.materia || simulacro.area !== usuario.materia)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-navy-600" />
            <h1 className="font-heading text-xl font-bold text-navy-800">Prueba fuera de tu materia</h1>
            <p className="mt-2 text-sm text-navy-400">
              Solo puedes presentar pruebas del área que tienes asignada.
            </p>
            <Button className="mt-5" onClick={() => navigate('/simulacros', { replace: true })}>
              Ver mis pruebas
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const area = getArea(simulacro.area)
  const pregunta = preguntas[indiceActual]
  const totalRespondidas = Object.values(respuestas).filter((v) => v !== null && v !== undefined).length
  const progreso = Math.round((totalRespondidas / preguntas.length) * 100)

  const seleccionar = (opcionIndex: number) => {
    setRespuestas((prev) => ({ ...prev, [pregunta.id]: opcionIndex }))
  }

  const toggleMarcada = () => {
    setMarcadas((prev) => {
      const next = new Set(prev)
      if (next.has(pregunta.id)) next.delete(pregunta.id)
      else next.add(pregunta.id)
      return next
    })
  }

  const irA = (i: number) => {
    if (i >= 0 && i < preguntas.length) setIndiceActual(i)
  }

  function finalizarExamen() {
    if (!simulacro || finalizadoRef.current) return
    finalizadoRef.current = true
    const respuestasFinal: RespuestaUsuario[] = preguntas.map((q) => {
      const seleccionada = respuestas[q.id] ?? null
      return {
        preguntaId: q.id,
        seleccionada,
        correcta: seleccionada === q.respuestaCorrecta,
      }
    })
    const tiempoUsado = Math.round((Date.now() - inicioRef.current) / 1000)
    const estudiante = usuario?.rol === 'estudiante'
      ? {
          nombre: usuario.nombre,
          correo: usuario.correo,
          grado: usuario.grado,
          institucion: usuario.institucion,
        }
      : undefined
    const resultado = calcularResultado(
      simulacro.id,
      simulacro.titulo,
      preguntas,
      respuestasFinal,
      tiempoUsado,
      simulacro.area,
      estudiante
    )
    guardarResultado(resultado)
    navigate('/resultados', { state: { resultado } })
  }

  const sinResponder = preguntas.length - totalRespondidas

  if (usuario?.rol === 'docente' || usuario?.rol === 'admin') {
    return (
      <div className="min-h-screen bg-surface px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col gap-4 border-b border-navy-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-gold-700">{usuario.rol === 'admin' ? 'Análisis administrativo' : 'Análisis docente'} · {area.nombre}</p>
              <h1 className="mt-1 font-heading text-2xl font-bold text-navy-900">{simulacro.titulo}</h1>
              <p className="mt-1 text-sm text-navy-500">Preguntas y respuestas correctas de tu materia. Esta vista no registra intentos.</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/simulacros')}>
              Volver a mis simulacros
            </Button>
          </div>

          <div className="space-y-4">
            {preguntas.map((pregunta, indice) => (
              <Card key={pregunta.id} className="border-navy-100">
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase text-navy-400">Pregunta {indice + 1} de {preguntas.length}</p>
                  {pregunta.contexto && (
                    <p className="whitespace-pre-wrap rounded-lg bg-navy-50 p-4 text-sm text-navy-600">{pregunta.contexto}</p>
                  )}
                  <h2 className="font-heading text-base font-semibold text-navy-900">{pregunta.enunciado}</h2>
                  <div className="space-y-2">
                    {pregunta.opciones.map((opcion, opcionIndex) => {
                      const correcta = opcionIndex === pregunta.respuestaCorrecta
                      return (
                        <div
                          key={`${pregunta.id}-${opcionIndex}`}
                          className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${
                            correcta ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-navy-100 text-navy-600'
                          }`}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + opcionIndex)}.</span>
                          <span className="flex-1">{opcion}</span>
                          {correcta && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                        </div>
                      )
                    })}
                  </div>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-950">
                    <p className="font-bold">Respuesta correcta: {String.fromCharCode(65 + pregunta.respuestaCorrecta)}</p>
                    <p className="mt-1">{pregunta.explicacion}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header fijo */}
      <div className="sticky top-0 z-30 border-b border-navy-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-wide text-gold-600">
                {area.nombre}
              </p>
              <h1 className="truncate font-heading text-lg font-bold text-navy-800">{simulacro.titulo}</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ExamTimer
                duracionSegundos={(simulacro.duracionMin ?? 20) * 60}
                onTimeUp={finalizarExamen}
              />
              <Button
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
                onClick={() => setMostrarConfirmacion(true)}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Finalizar</span>
              </Button>
              <Button variant="wine" size="sm" onClick={() => setMostrarSalida(true)}>
                Salir
              </Button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Progress value={progreso} className="h-2.5 flex-1" />
            <span className="whitespace-nowrap text-xs font-semibold text-navy-400">
              {totalRespondidas}/{preguntas.length} respondidas
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
          {/* Pregunta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pregunta.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-500">
                      Pregunta {indiceActual + 1} de {preguntas.length}
                    </span>
                    <button
                      onClick={toggleMarcada}
                      className={cn(
                        'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                        marcadas.has(pregunta.id)
                          ? 'bg-gold-100 text-gold-700'
                          : 'text-navy-400 hover:bg-navy-50'
                      )}
                    >
                      <Flag className="h-3.5 w-3.5" />
                      {marcadas.has(pregunta.id) ? 'Marcada para revisar' : 'Marcar para revisar'}
                    </button>
                  </div>

                  {pregunta.contexto && (
                    <div className="mb-5 rounded-xl border border-navy-100 bg-navy-50/60 p-4 text-sm italic leading-relaxed text-navy-600">
                      {pregunta.contexto}
                    </div>
                  )}

                  <h2 className="font-heading text-lg font-semibold leading-snug text-navy-800">
                    {pregunta.enunciado}
                  </h2>

                  <div className="mt-6 space-y-3">
                    {pregunta.opciones.map((opcion, i) => {
                      const seleccionada = respuestas[pregunta.id] === i
                      return (
                        <button
                          key={i}
                          onClick={() => seleccionar(i)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-medium transition-all duration-150',
                            seleccionada
                              ? 'border-navy-700 bg-navy-700 text-white shadow-sm'
                              : 'border-navy-100 text-navy-700 hover:border-navy-300 hover:bg-navy-50'
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold',
                              seleccionada ? 'border-gold-400 bg-gold-400 text-navy-900' : 'border-navy-200 text-navy-400'
                            )}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opcion}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <Button variant="outline" onClick={() => irA(indiceActual - 1)} disabled={indiceActual === 0}>
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                    {indiceActual === preguntas.length - 1 ? (
                      <Button variant="primary" onClick={() => setMostrarConfirmacion(true)}>
                        Finalizar simulacro
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => irA(indiceActual + 1)}>
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navegador de preguntas */}
          <div>
            <Card className="lg:sticky lg:top-32">
              <CardContent className="p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-400">Preguntas</p>
                <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
                  {preguntas.map((q, i) => {
                    const respondida = respuestas[q.id] !== undefined && respuestas[q.id] !== null
                    const marcada = marcadas.has(q.id)
                    const actual = i === indiceActual
                    return (
                      <button
                        key={q.id}
                        onClick={() => irA(i)}
                        className={cn(
                          'relative flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all',
                          actual && 'ring-2 ring-navy-700 ring-offset-1',
                          respondida ? 'bg-navy-700 text-white' : 'bg-navy-50 text-navy-400',
                          marcada && 'ring-2 ring-gold-500 ring-offset-1'
                        )}
                      >
                        {i + 1}
                        {marcada && (
                          <Flag className="absolute -right-1 -top-1 h-3 w-3 fill-gold-500 text-gold-500" />
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-navy-400">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-navy-700" /> Respondida
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-navy-50" /> Sin responder
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="h-3 w-3 text-gold-500" /> Marcada
                  </div>
                </div>
                <Button
                  className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm"
                  onClick={() => setMostrarConfirmacion(true)}
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  Entregar examen
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmación de finalización */}
      <Dialog open={mostrarConfirmacion} onOpenChange={setMostrarConfirmacion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Finalizar el simulacro?</DialogTitle>
            <DialogDescription>
              {sinResponder > 0
                ? `Tienes ${sinResponder} pregunta${sinResponder > 1 ? 's' : ''} sin responder. Estas se contarán como incorrectas.`
                : 'Has respondido todas las preguntas. ¡Buen trabajo!'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setMostrarConfirmacion(false)}>
              Seguir presentando
            </Button>
            <Button variant="primary" onClick={finalizarExamen}>
              Finalizar y ver resultados
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmación de salida */}
      <Dialog open={mostrarSalida} onOpenChange={setMostrarSalida}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Salir del simulacro?</DialogTitle>
            <DialogDescription>
              Perderás tu progreso actual si sales ahora. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setMostrarSalida(false)}>
              Cancelar
            </Button>
            <Button variant="wine" onClick={() => navigate('/simulacros')}>
              Salir sin guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
