import type { Question } from '@/data/questions'
import { areas, type AreaId } from '@/data/areas'
import { registrarNuevoSimulacro } from '@/lib/studentHistory'

export interface RespuestaUsuario {
  preguntaId: string
  seleccionada: number | null
  correcta: boolean
}

export interface DesgloseArea {
  areaId: string
  area: string
  aciertos: number
  total: number
  puntaje: number
}

export interface PreguntaResultado {
  preguntaId: string
  areaId: AreaId
  contexto?: string
  enunciado: string
  opciones: string[]
  respuestaCorrecta: number
  seleccionada: number | null
  correcta: boolean
  explicacion: string
}

export interface EstudianteResultado {
  nombre: string
  correo: string
  grado: string
  institucion: string
}

export interface ResultadoSimulacro {
  simulacroId: string
  tituloSimulacro: string
  areaId?: AreaId
  estudiante?: EstudianteResultado
  preguntasDetalle?: PreguntaResultado[]
  fecha: string
  respuestas: RespuestaUsuario[]
  totalPreguntas: number
  aciertos: number
  porcentaje: number
  puntajeIcfes: number
  desglosePorArea: DesgloseArea[]
  tiempoUsadoSeg: number
}

export function calcularResultado(
  simulacroId: string,
  tituloSimulacro: string,
  preguntas: Question[],
  respuestas: RespuestaUsuario[],
  tiempoUsadoSeg: number,
  areaId?: AreaId,
  estudiante?: EstudianteResultado
): ResultadoSimulacro {
  const aciertos = respuestas.filter((r) => r.correcta).length
  const total = preguntas.length
  const porcentaje = Math.round((aciertos / total) * 100)
  const puntajeIcfes = Math.round(100 + (aciertos / total) * 400)

  const desglosePorArea: DesgloseArea[] = []
  for (const area of areas) {
    const preguntasArea = preguntas.filter((q) => q.area === area.id)
    if (preguntasArea.length === 0) continue
    const aciertosArea = respuestas.filter(
      (r) => r.correcta && preguntasArea.some((q) => q.id === r.preguntaId)
    ).length
    desglosePorArea.push({
      areaId: area.id,
      area: area.nombreCorto,
      aciertos: aciertosArea,
      total: preguntasArea.length,
      puntaje: Math.round((aciertosArea / preguntasArea.length) * 100),
    })
  }

  return {
    simulacroId,
    tituloSimulacro,
    areaId,
    estudiante,
    preguntasDetalle: preguntas.map((pregunta) => {
      const respuesta = respuestas.find((item) => item.preguntaId === pregunta.id)
      return {
        preguntaId: pregunta.id,
        areaId: pregunta.area,
        contexto: pregunta.contexto,
        enunciado: pregunta.enunciado,
        opciones: pregunta.opciones,
        respuestaCorrecta: pregunta.respuestaCorrecta,
        seleccionada: respuesta?.seleccionada ?? null,
        correcta: respuesta?.correcta ?? false,
        explicacion: pregunta.explicacion,
      }
    }),
    fecha: new Date().toISOString(),
    respuestas,
    totalPreguntas: total,
    aciertos,
    porcentaje,
    puntajeIcfes,
    desglosePorArea,
    tiempoUsadoSeg,
  }
}

const RESULT_KEY = 'impulsasaber_ultimo_resultado'
const RESULTADOS_DETALLADOS_KEY = 'impulsasaber_resultados_detallados'

export function guardarResultado(resultado: ResultadoSimulacro) {
  localStorage.setItem(RESULT_KEY, JSON.stringify(resultado))
  registrarNuevoSimulacro(resultado)

  if (resultado.estudiante && resultado.areaId && resultado.preguntasDetalle) {
    try {
      const almacenados = JSON.parse(localStorage.getItem(RESULTADOS_DETALLADOS_KEY) || '[]')
      const resultados = Array.isArray(almacenados) ? almacenados as ResultadoSimulacro[] : []
      localStorage.setItem(RESULTADOS_DETALLADOS_KEY, JSON.stringify([resultado, ...resultados].slice(0, 500)))
      window.dispatchEvent(new Event('impulsasaber_resultados_detallados_cambio'))
    } catch (error) {
      console.error('No se pudo guardar el detalle del resultado:', error)
    }
  }
}

export function obtenerResultadosPorMateria(areaId: AreaId): ResultadoSimulacro[] {
  return obtenerResultadosPorMateriaEInstitucion(areaId)
}

export function obtenerResultadosPorMateriaEInstitucion(
  areaId: AreaId,
  institucionId?: string
): ResultadoSimulacro[] {
  if (typeof window === 'undefined') return []
  try {
    const almacenados = JSON.parse(localStorage.getItem(RESULTADOS_DETALLADOS_KEY) || '[]')
    if (!Array.isArray(almacenados)) return []
    return (almacenados as ResultadoSimulacro[])
      .filter((resultado) => {
        if (!resultado.estudiante?.institucion || !resultado.preguntasDetalle) return false
        return !institucionId || obtenerIdInstitucion(resultado.estudiante.institucion) === institucionId
      })
      .map((resultado) => {
        const preguntasDetalle = resultado.preguntasDetalle!.filter((pregunta) => pregunta.areaId === areaId)
        const totalPreguntas = preguntasDetalle.length
        const aciertos = preguntasDetalle.filter((pregunta) => pregunta.correcta).length
        return {
          ...resultado,
          areaId,
          preguntasDetalle,
          totalPreguntas,
          aciertos,
          porcentaje: totalPreguntas ? Math.round((aciertos / totalPreguntas) * 100) : 0,
          puntajeIcfes: totalPreguntas ? Math.round(100 + (aciertos / totalPreguntas) * 400) : 0,
        }
      })
      .filter((resultado) => resultado.totalPreguntas > 0)
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
  } catch {
    return []
  }
}

export function obtenerIdInstitucion(nombre: string): string {
  const normalizado = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (normalizado.includes('ipsa') || normalizado.includes('policarpa')) return 'ipsa'
  if (normalizado.includes('cnsb') || normalizado.includes('simon') || normalizado.includes('bolivar')) return 'cnsb'
  if (normalizado.includes('providencia')) return 'ie-providencia'
  if (normalizado.includes('san juan')) return 'ie-sanjuan'
  if (normalizado.includes('lourdes')) return 'ie-lourdes'
  return `otra-${normalizado.replace(/[^a-z0-9]+/g, '-')}`
}

export function obtenerUltimoResultado(): ResultadoSimulacro | null {
  const stored = localStorage.getItem(RESULT_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function obtenerUltimoResultadoEstudiante(correo: string): ResultadoSimulacro | null {
  if (typeof window === 'undefined') return null
  const correoNormalizado = correo.trim().toLowerCase()
  if (!correoNormalizado) return null

  const ultimo = obtenerUltimoResultado()
  if (ultimo?.estudiante?.correo.trim().toLowerCase() === correoNormalizado) return ultimo

  try {
    const almacenados = JSON.parse(localStorage.getItem(RESULTADOS_DETALLADOS_KEY) || '[]')
    if (!Array.isArray(almacenados)) return null
    return (almacenados as ResultadoSimulacro[])
      .filter((resultado) => resultado.estudiante?.correo.trim().toLowerCase() === correoNormalizado)
      .sort((a, b) => b.fecha.localeCompare(a.fecha))[0] ?? null
  } catch {
    return null
  }
}
