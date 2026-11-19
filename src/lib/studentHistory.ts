import { useState, useEffect } from 'react'
import type { ResultadoSimulacro } from '@/lib/scoring'

export const PROMEDIO_NACIONAL_ICFES = 255
const STORAGE_KEY_SIMULACROS = 'impulsasaber_simulacros_realizados'

export interface DesgloseAreaValores {
  matematicas: number
  lectura: number
  ciencias: number
  sociales: number
  ingles: number
}

export interface SimulacroRealizado {
  id: string
  simulacroId: string
  tituloSimulacro: string
  fecha: string
  fechaIso: string
  puntajeIcfes: number
  porcentaje: number
  aciertos: number
  totalPreguntas: number
  tiempoUsadoSeg: number
  desglose: DesgloseAreaValores
}

export interface HistorialPuntoGrafica {
  fecha: string
  puntaje: number
  matematicas: number
  lectura: number
  ciencias: number
  sociales: number
  ingles: number
  titulo: string
}

export interface EstadisticasEstudiante {
  puntajeActual: number
  puntajeAnterior: number
  mejora: number
  mejoraTotal: number
  totalSimulacros: number
  vsPromedioNacional: number
  promedioNacional: number
  diasConsecutivos: number
  diasCompletadosSemana: number
  metaSemanal: number
  simulacros: SimulacroRealizado[]
  puntosGrafica: HistorialPuntoGrafica[]
  areaMasFuerte: string | null
  areaMasDebil: string | null
}

function formatearFecha(isoDate: string): string {
  try {
    const d = new Date(isoDate)
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const dia = d.getDate()
    const mes = meses[d.getMonth()]
    const hora = d.getHours().toString().padStart(2, '0')
    const min = d.getMinutes().toString().padStart(2, '0')
    return `${dia} ${mes} (${hora}:${min})`
  } catch {
    return 'Hoy'
  }
}

export function obtenerSimulacrosGuardados(): SimulacroRealizado[] {
  if (typeof window === 'undefined') return []
  const guardado = localStorage.getItem(STORAGE_KEY_SIMULACROS)
  if (!guardado) return []
  try {
    const parseado = JSON.parse(guardado)
    if (Array.isArray(parseado)) return parseado
    return []
  } catch {
    return []
  }
}

export function guardarSimulacros(simulacros: SimulacroRealizado[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY_SIMULACROS, JSON.stringify(simulacros))
  window.dispatchEvent(new Event('impulsasaber_historial_cambio'))
}

export function limpiarHistorialEstudiante(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY_SIMULACROS)
  localStorage.removeItem('impulsasaber_ultimo_resultado')
  window.dispatchEvent(new Event('impulsasaber_historial_cambio'))
}

export function registrarNuevoSimulacro(resultado: ResultadoSimulacro): SimulacroRealizado {
  const listaActual = obtenerSimulacrosGuardados()

  // Extraer valores por área con base en el desglose
  const desglose: DesgloseAreaValores = {
    matematicas: 0,
    lectura: 0,
    ciencias: 0,
    sociales: 0,
    ingles: 0,
  }

  // Llenar las áreas evaluadas
  resultado.desglosePorArea.forEach((item) => {
    if (item.areaId in desglose) {
      desglose[item.areaId as keyof DesgloseAreaValores] = item.puntaje
    }
  })

  // Si el simulacro era de un área específica o general, normalizar áreas que no hayan estado en el test
  // para que la gráfica no caiga a cero en materias no evaluadas en ese examen específico
  const ultimoRegistro = listaActual[listaActual.length - 1]
  const areasClaves = ['matematicas', 'lectura', 'ciencias', 'sociales', 'ingles'] as const
  areasClaves.forEach((key) => {
    if (!resultado.desglosePorArea.some((d) => d.areaId === key)) {
      if (ultimoRegistro) {
        desglose[key] = ultimoRegistro.desglose[key]
      } else {
        desglose[key] = resultado.porcentaje
      }
    }
  })

  const nuevoItem: SimulacroRealizado = {
    id: `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    simulacroId: resultado.simulacroId,
    tituloSimulacro: resultado.tituloSimulacro,
    fecha: formatearFecha(resultado.fecha),
    fechaIso: resultado.fecha,
    puntajeIcfes: resultado.puntajeIcfes,
    porcentaje: resultado.porcentaje,
    aciertos: resultado.aciertos,
    totalPreguntas: resultado.totalPreguntas,
    tiempoUsadoSeg: resultado.tiempoUsadoSeg,
    desglose,
  }

  const nuevaLista = [...listaActual, nuevoItem]
  guardarSimulacros(nuevaLista)
  return nuevoItem
}

export function calcularEstadisticas(simulacros: SimulacroRealizado[]): EstadisticasEstudiante {
  const totalSimulacros = simulacros.length
  const promedioNacional = PROMEDIO_NACIONAL_ICFES

  if (totalSimulacros === 0) {
    return {
      puntajeActual: 0,
      puntajeAnterior: 0,
      mejora: 0,
      mejoraTotal: 0,
      totalSimulacros: 0,
      vsPromedioNacional: 0,
      promedioNacional,
      diasConsecutivos: 0,
      diasCompletadosSemana: 0,
      metaSemanal: 5,
      simulacros: [],
      puntosGrafica: [],
      areaMasFuerte: null,
      areaMasDebil: null,
    }
  }

  const ultimo = simulacros[totalSimulacros - 1]
  const anterior = totalSimulacros > 1 ? simulacros[totalSimulacros - 2] : null
  const primero = simulacros[0]

  const puntajeActual = ultimo.puntajeIcfes
  const puntajeAnterior = anterior ? anterior.puntajeIcfes : 0
  const mejora = anterior ? puntajeActual - anterior.puntajeIcfes : puntajeActual
  const mejoraTotal = puntajeActual - primero.puntajeIcfes
  const vsPromedioNacional = puntajeActual - promedioNacional

  // Calcular racha (días distintos con simulacros)
  const fechasUnicas = new Set(simulacros.map((s) => s.fechaIso.split('T')[0]))
  const diasConsecutivos = Math.max(1, fechasUnicas.size)
  const diasCompletadosSemana = Math.min(5, totalSimulacros)

  // Determinar área más fuerte y débil del último simulacro
  const areasEntradas = Object.entries(ultimo.desglose) as [keyof DesgloseAreaValores, number][]
  const ordenadas = [...areasEntradas].sort((a, b) => b[1] - a[1])
  const areaMasFuerte = ordenadas[0] ? ordenadas[0][0] : null
  const areaMasDebil = ordenadas[ordenadas.length - 1] ? ordenadas[ordenadas.length - 1][0] : null

  // Construir puntos de la gráfica
  let puntosGrafica: HistorialPuntoGrafica[] = []
  if (totalSimulacros === 1) {
    puntosGrafica = [
      {
        fecha: 'Inicial',
        puntaje: 0,
        matematicas: 0,
        lectura: 0,
        ciencias: 0,
        sociales: 0,
        ingles: 0,
        titulo: 'Punto de partida',
      },
      {
        fecha: ultimo.fecha,
        puntaje: ultimo.puntajeIcfes,
        matematicas: ultimo.desglose.matematicas,
        lectura: ultimo.desglose.lectura,
        ciencias: ultimo.desglose.ciencias,
        sociales: ultimo.desglose.sociales,
        ingles: ultimo.desglose.ingles,
        titulo: ultimo.tituloSimulacro,
      },
    ]
  } else {
    puntosGrafica = simulacros.map((sim) => ({
      fecha: sim.fecha,
      puntaje: sim.puntajeIcfes,
      matematicas: sim.desglose.matematicas,
      lectura: sim.desglose.lectura,
      ciencias: sim.desglose.ciencias,
      sociales: sim.desglose.sociales,
      ingles: sim.desglose.ingles,
      titulo: sim.tituloSimulacro,
    }))
  }

  return {
    puntajeActual,
    puntajeAnterior,
    mejora,
    mejoraTotal,
    totalSimulacros,
    vsPromedioNacional,
    promedioNacional,
    diasConsecutivos,
    diasCompletadosSemana,
    metaSemanal: 5,
    simulacros,
    puntosGrafica,
    areaMasFuerte,
    areaMasDebil,
  }
}

export function useEstadisticasEstudiante(): {
  stats: EstadisticasEstudiante
  cargando: boolean
  limpiarHistorial: () => void
} {
  const [stats, setStats] = useState<EstadisticasEstudiante>(() => {
    return calcularEstadisticas(obtenerSimulacrosGuardados())
  })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const actualizar = () => {
      setStats(calcularEstadisticas(obtenerSimulacrosGuardados()))
    }
    actualizar()
    setCargando(false)

    window.addEventListener('impulsasaber_historial_cambio', actualizar)
    window.addEventListener('storage', actualizar)

    return () => {
      window.removeEventListener('impulsasaber_historial_cambio', actualizar)
      window.removeEventListener('storage', actualizar)
    }
  }, [])

  return {
    stats,
    cargando,
    limpiarHistorial: limpiarHistorialEstudiante,
  }
}
