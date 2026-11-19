import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ArrowLeft, CircleCheck, CircleX, Eye, FolderOpen, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { institucionesAliadas } from '@/data/institutional'
import { getArea } from '@/data/areas'
import { obtenerEstudiantesPorMateria } from '@/data/teacherData'
import { obtenerIdInstitucion, obtenerResultadosPorMateriaEInstitucion, type ResultadoSimulacro } from '@/lib/scoring'

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]?.toUpperCase()).join('')
}

export default function Students() {
  const { usuario } = useAuth()
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState<string | null>(null)
  const [correoSeleccionado, setCorreoSeleccionado] = useState('')
  const [examenClave, setExamenClave] = useState('')
  const [resultados, setResultados] = useState<ResultadoSimulacro[]>([])

  const instituciones = useMemo(() => {
    const asignadas = usuario?.instituciones?.length
      ? usuario.instituciones
      : usuario?.institucion
        ? usuario.institucion.split(/\s*&\s*/)
        : []
    const unicas = new Map<string, string>()
    asignadas.forEach((nombre) => {
      const id = obtenerIdInstitucion(nombre)
      const oficial = institucionesAliadas.find((institucion) => institucion.id === id)
      unicas.set(id, oficial ? `${oficial.sigla ?? oficial.nombre} · ${oficial.nombre}` : nombre)
    })
    return [...unicas].map(([id, nombre]) => ({ id, nombre }))
  }, [usuario])

  useEffect(() => {
    if (!usuario?.materia) return
    const actualizar = () => setResultados(obtenerResultadosPorMateriaEInstitucion(usuario.materia!))
    actualizar()
    window.addEventListener('impulsasaber_resultados_detallados_cambio', actualizar)
    window.addEventListener('storage', actualizar)
    return () => {
      window.removeEventListener('impulsasaber_resultados_detallados_cambio', actualizar)
      window.removeEventListener('storage', actualizar)
    }
  }, [usuario?.materia])

  if (usuario?.rol !== 'docente') return <Navigate to={usuario?.rol === 'admin' ? '/institucional' : '/panel'} replace />
  if (!usuario.materia) {
    return <p className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">Tu cuenta docente aún no tiene una materia asignada.</p>
  }

  const area = getArea(usuario.materia)
  const roster = obtenerEstudiantesPorMateria(usuario.materia)
  const resultadosInstitucion = institucionSeleccionada
    ? resultados.filter((resultado) => resultado.estudiante?.institucion && obtenerIdInstitucion(resultado.estudiante.institucion) === institucionSeleccionada)
    : []
  const alumnos = [...new Map([
    ...roster
      .filter((estudiante) => !institucionSeleccionada || obtenerIdInstitucion(estudiante.institucion) === institucionSeleccionada)
      .map((estudiante) => [estudiante.correo.toLowerCase(), { ...estudiante, ficha: estudiante }] as const),
    ...resultadosInstitucion.flatMap((resultado) => {
      const estudiante = resultado.estudiante
      return estudiante ? [[estudiante.correo.toLowerCase(), { ...estudiante, ficha: roster.find((item) => item.correo.toLowerCase() === estudiante.correo.toLowerCase()) }] as const] : []
    }),
  ])].map(([, estudiante]) => estudiante).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  const alumnoSeleccionado = alumnos.find((alumno) => alumno.correo.toLowerCase() === correoSeleccionado.toLowerCase())
  const resultadosAlumno = resultadosInstitucion.filter((resultado) => resultado.estudiante?.correo.toLowerCase() === correoSeleccionado.toLowerCase())
  const historialPadrón = alumnoSeleccionado?.ficha?.historialEvaluaciones ?? []
  const seguimientoExamenes = [
    ...historialPadrón.map((evaluacion) => ({ tipo: 'resumen' as const, clave: `legacy:${evaluacion.id}`, fechaOrden: evaluacion.fecha, evaluacion })),
    ...resultadosAlumno.map((resultado) => ({ tipo: 'detalle' as const, clave: `${resultado.fecha}|${resultado.simulacroId}`, fechaOrden: resultado.fecha, resultado })),
  ].sort((a, b) => b.fechaOrden.localeCompare(a.fechaOrden))
  const examenSeleccionado = seguimientoExamenes.find((examen) => examen.clave === examenClave) ?? seguimientoExamenes[0]

  const seleccionarColegio = (id: string | null) => {
    setInstitucionSeleccionada(id)
    setCorreoSeleccionado('')
    setExamenClave('')
  }

  const seleccionarAlumno = (correo: string) => {
    setCorreoSeleccionado(correo)
    setExamenClave('')
  }

  return (
    <div className="space-y-6">
      <header className="border-b border-navy-100 pb-5">
        <p className="text-xs font-bold uppercase text-gold-700">Portal docente · {area.nombre}</p>
        <h1 className="mt-1 font-heading text-2xl font-bold text-navy-900">Estudiantes</h1>
        <p className="mt-1 text-sm text-navy-500">Resultados separados por institución y limitados a tu materia.</p>
      </header>

      {!institucionSeleccionada ? (
        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-navy-800">Colegios asignados</h2>
          <div className="divide-y divide-navy-100 border-y border-navy-100">
            {instituciones.map((institucion) => {
              const total = resultados.filter((resultado) => resultado.estudiante?.institucion && obtenerIdInstitucion(resultado.estudiante.institucion) === institucion.id).length
              return (
                <button
                  type="button"
                  key={institucion.id}
                  onClick={() => {
                    seleccionarColegio(institucion.id)
                  }}
                  className="flex w-full items-center gap-4 py-5 text-left hover:bg-navy-50/70"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <FolderOpen className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-navy-900">{institucion.nombre}</span>
                    <span className="text-xs text-navy-500">{total} {total === 1 ? 'prueba registrada' : 'pruebas registradas'} en {area.nombre}</span>
                  </span>
                  <Users className="h-4 w-4 text-navy-400" />
                </button>
              )
            })}
            {instituciones.length === 0 && <p className="py-8 text-sm text-navy-400">No hay colegios asignados a esta cuenta docente.</p>}
          </div>
        </section>
      ) : (
        <div className="space-y-5">
          <Button variant="outline" size="sm" onClick={() => {
            seleccionarColegio(null)
          }}>
            <ArrowLeft className="h-4 w-4" /> Volver a colegios
          </Button>
          <h2 className="font-heading text-lg font-bold text-navy-900">
            {instituciones.find((institucion) => institucion.id === institucionSeleccionada)?.nombre}
          </h2>

          <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.5fr)]">
            <section>
              <h3 className="mb-2 text-xs font-bold uppercase text-navy-500">Alumnos con resultados</h3>
              <div className="max-h-[70vh] divide-y divide-navy-100 overflow-y-auto border-y border-navy-100">
                {alumnos.map((alumno) => {
                  const cantidadExamenes = resultadosInstitucion.filter((resultado) => resultado.estudiante?.correo.toLowerCase() === alumno.correo.toLowerCase()).length + (alumno.ficha?.historialEvaluaciones.length ?? 0)
                  const seleccionado = alumno.correo.toLowerCase() === correoSeleccionado.toLowerCase()
                  return (
                    <div key={alumno.correo} className={`flex items-center gap-3 py-3 ${seleccionado ? 'bg-navy-50' : ''}`}>
                      <Avatar className="h-9 w-9 shrink-0 border border-navy-100"><AvatarFallback className="bg-navy-50 text-xs font-bold text-navy-700">{initials(alumno.nombre)}</AvatarFallback></Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-navy-900">{alumno.nombre}</p>
                        <p className="text-xs text-navy-500">{alumno.grado} · {cantidadExamenes} {cantidadExamenes === 1 ? 'examen' : 'exámenes'}</p>
                      </div>
                      <Button type="button" size="icon" variant={seleccionado ? 'default' : 'outline'} className="h-9 w-9 shrink-0" aria-label={`Ver resultados de ${alumno.nombre}`} onClick={() => {
                        seleccionarAlumno(alumno.correo)
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
                {alumnos.length === 0 && <p className="py-8 text-center text-xs text-navy-400">Aún no hay resultados registrados para este colegio y materia.</p>}
              </div>
            </section>

            <section className="min-w-0 border-t border-navy-100 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              {!correoSeleccionado ? (
                <p className="py-10 text-center text-sm text-navy-400">Selecciona el ojo junto a un alumno para revisar sus resultados.</p>
              ) : alumnoSeleccionado ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-navy-900">{alumnoSeleccionado.nombre}</h3>
                      <p className="text-xs text-navy-500">{alumnoSeleccionado.institucion} · {area.nombre}</p>
                    </div>
                    {seguimientoExamenes.length > 1 && (
                      <label className="space-y-1 text-xs font-semibold text-navy-600">Prueba
                        <select className="block w-full rounded-lg border border-navy-200 bg-white px-3 py-2" value={examenClave || seguimientoExamenes[0]?.clave || ''} onChange={(event) => setExamenClave(event.target.value)}>
                          {seguimientoExamenes.map((examen) => <option key={examen.clave} value={examen.clave}>{examen.tipo === 'detalle' ? `${examen.resultado.tituloSimulacro} · ${new Date(examen.resultado.fecha).toLocaleDateString('es-CO')}` : `${examen.evaluacion.titulo} · ${examen.evaluacion.fecha}`}</option>)}
                        </select>
                      </label>
                    )}
                  </div>
                  {!examenSeleccionado ? (
                    <p className="rounded-lg border border-dashed border-navy-200 p-5 text-sm text-navy-400">Este alumno aún no tiene exámenes registrados en {area.nombre}.</p>
                  ) : examenSeleccionado.tipo === 'detalle' ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap justify-between gap-2 border-b border-navy-100 pb-3 text-xs">
                        <strong className="text-navy-700">{examenSeleccionado.resultado.tituloSimulacro}</strong>
                        <span className="font-bold text-navy-600">{examenSeleccionado.resultado.aciertos}/{examenSeleccionado.resultado.totalPreguntas} correctas · {new Date(examenSeleccionado.resultado.fecha).toLocaleString('es-CO')}</span>
                      </div>
                      <p className={`rounded-lg p-3 text-xs font-semibold ${examenSeleccionado.resultado.porcentaje >= 70 ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'}`}>
                        {examenSeleccionado.resultado.porcentaje >= 70 ? 'Buen avance en esta prueba.' : 'Necesita refuerzo en los temas evaluados en esta prueba.'} · {examenSeleccionado.resultado.porcentaje}%
                      </p>
                      <div className="max-h-[62vh] space-y-3 overflow-y-auto pr-1">
                        {examenSeleccionado.resultado.preguntasDetalle?.map((pregunta, index) => (
                          <article key={pregunta.preguntaId} className={`space-y-3 rounded-lg border p-4 ${pregunta.correcta ? 'border-emerald-200 bg-emerald-50/50' : 'border-wine-200 bg-wine-50/40'}`}>
                            <div className="flex items-start gap-2">
                              {pregunta.correcta ? <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-wine-600" />}
                              <div>
                                <p className="text-[11px] font-bold uppercase text-navy-500">Pregunta {index + 1} · {pregunta.correcta ? 'Correcta' : 'Incorrecta'}</p>
                                {pregunta.contexto && <p className="mt-1 whitespace-pre-wrap text-xs text-navy-600">{pregunta.contexto}</p>}
                                <p className="mt-1 text-sm font-semibold text-navy-900">{pregunta.enunciado}</p>
                              </div>
                            </div>
                            <div className="space-y-1.5 pl-6 text-xs">
                              <p><strong>Respuesta del alumno:</strong> {pregunta.seleccionada === null ? 'Sin responder' : `${String.fromCharCode(65 + pregunta.seleccionada)}. ${pregunta.opciones[pregunta.seleccionada]}`}</p>
                              <p className="text-emerald-800"><strong>Respuesta correcta:</strong> {String.fromCharCode(65 + pregunta.respuestaCorrecta)}. {pregunta.opciones[pregunta.respuestaCorrecta]}</p>
                              <p className="text-navy-600"><strong>Explicación:</strong> {pregunta.explicacion}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <h4 className="font-semibold text-amber-950">{examenSeleccionado.evaluacion.titulo}</h4>
                      <p className="text-xs text-amber-900">{examenSeleccionado.evaluacion.aciertos} de {examenSeleccionado.evaluacion.totalPreguntas} aciertos · {examenSeleccionado.evaluacion.puntaje}/100 · {examenSeleccionado.evaluacion.fecha}</p>
                      <p className="text-xs font-semibold text-amber-950">
                        {examenSeleccionado.evaluacion.puntaje >= 70 ? 'Buen avance; continuar con práctica y seguimiento.' : 'Necesita refuerzo después de este examen.'}
                      </p>
                      <p className="text-xs text-amber-900">Este es un registro histórico resumido; no conserva el detalle de cada pregunta.</p>
                    </div>
                  )}
                </div>
              ) : <Card><CardContent className="p-6 text-sm text-navy-400">No hay pruebas registradas para este alumno.</CardContent></Card>}
            </section>
          </div>
        </div>
      )}
    </div>
  )
}