import type { AreaId } from './areas'
import type { Question } from './questions'

export type Dificultad = 'Básico' | 'Intermedio' | 'Avanzado'

export interface Simulacro {
  id: string
  materia: AreaId
  desbloqueado: boolean
  preguntas: Question[]
  area: AreaId
  titulo: string
  dificultad: Dificultad
  duracionMin: number
  numPreguntas: number
  intentos: number
  descripcion: string
}

export const simulacros: Simulacro[] = [
  {
    id: 'sim-mat-1',
    materia: 'matematicas',
    desbloqueado: false,
    preguntas: [],
    area: 'matematicas',
    titulo: 'Álgebra y funciones básicas',
    dificultad: 'Básico',
    duracionMin: 25,
    numPreguntas: 10,
    intentos: 1204,
    descripcion: 'Ecuaciones lineales, funciones y operaciones fundamentales.',
  },
  {
    id: 'sim-mat-2',
    materia: 'matematicas',
    desbloqueado: false,
    preguntas: [],
    area: 'matematicas',
    titulo: 'Razonamiento cuantitativo',
    dificultad: 'Intermedio',
    duracionMin: 35,
    numPreguntas: 10,
    intentos: 986,
    descripcion: 'Interpretación de datos, proporciones y modelado matemático.',
  },
  {
    id: 'sim-mat-3',
    materia: 'matematicas',
    desbloqueado: false,
    preguntas: [],
    area: 'matematicas',
    titulo: 'Geometría y estadística avanzada',
    dificultad: 'Avanzado',
    duracionMin: 40,
    numPreguntas: 10,
    intentos: 512,
    descripcion: 'Áreas, volúmenes, probabilidad y análisis estadístico.',
  },
  {
    id: 'sim-lec-1',
    materia: 'lectura',
    desbloqueado: false,
    preguntas: [],
    area: 'lectura',
    titulo: 'Comprensión de textos narrativos',
    dificultad: 'Básico',
    duracionMin: 30,
    numPreguntas: 10,
    intentos: 1350,
    descripcion: 'Identificación de ideas principales y secundarias.',
  },
  {
    id: 'sim-lec-2',
    materia: 'lectura',
    desbloqueado: false,
    preguntas: [],
    area: 'lectura',
    titulo: 'Análisis de textos argumentativos',
    dificultad: 'Intermedio',
    duracionMin: 35,
    numPreguntas: 10,
    intentos: 890,
    descripcion: 'Evaluación de tesis, argumentos y postura del autor.',
  },
  {
    id: 'sim-cie-1',
    materia: 'ciencias',
    desbloqueado: false,
    preguntas: [],
    area: 'ciencias',
    titulo: 'Biología y ecosistemas',
    dificultad: 'Básico',
    duracionMin: 30,
    numPreguntas: 10,
    intentos: 1120,
    descripcion: 'Célula, ecosistemas colombianos y biodiversidad.',
  },
  {
    id: 'sim-cie-2',
    materia: 'ciencias',
    desbloqueado: false,
    preguntas: [],
    area: 'ciencias',
    titulo: 'Física y química aplicada',
    dificultad: 'Intermedio',
    duracionMin: 35,
    numPreguntas: 10,
    intentos: 745,
    descripcion: 'Mezclas, energía, movimiento y reacciones químicas.',
  },
  {
    id: 'sim-soc-1',
    materia: 'sociales',
    desbloqueado: false,
    preguntas: [],
    area: 'sociales',
    titulo: 'Historia de Colombia',
    dificultad: 'Básico',
    duracionMin: 30,
    numPreguntas: 10,
    intentos: 998,
    descripcion: 'Independencia, siglo XIX y formación del Estado.',
  },
  {
    id: 'sim-soc-2',
    materia: 'sociales',
    desbloqueado: false,
    preguntas: [],
    area: 'sociales',
    titulo: 'Constitución y competencias ciudadanas',
    dificultad: 'Intermedio',
    duracionMin: 30,
    numPreguntas: 10,
    intentos: 823,
    descripcion: 'Derechos, deberes y estructura del Estado colombiano.',
  },
  {
    id: 'sim-ing-1',
    materia: 'ingles',
    desbloqueado: false,
    preguntas: [],
    area: 'ingles',
    titulo: 'Reading comprehension A2-B1',
    dificultad: 'Básico',
    duracionMin: 25,
    numPreguntas: 10,
    intentos: 1078,
    descripcion: 'Vocabulario cotidiano y comprensión de textos cortos.',
  },
  {
    id: 'sim-ing-2',
    materia: 'ingles',
    desbloqueado: false,
    preguntas: [],
    area: 'ingles',
    titulo: 'Grammar & structure B1-B2',
    dificultad: 'Intermedio',
    duracionMin: 30,
    numPreguntas: 10,
    intentos: 667,
    descripcion: 'Tiempos verbales, conectores y estructuras gramaticales.',
  },
]

export function getSimulacrosByArea(area: AreaId) {
  return simulacros.filter((s) => s.area === area)
}

export function getSimulacro(id: string) {
  return simulacros.find((s) => s.id === id)
}

export const PRUEBAS_DESBLOQUEADAS_KEY = 'pruebas_desbloqueadas'
export const PRUEBAS_DESBLOQUEADAS_EVENT = 'impulsasaber_pruebas_desbloqueadas_cambio'

export type EstadoPruebasDesbloqueadas = Record<string, boolean>

export function obtenerEstadoPruebasDesbloqueadas(): EstadoPruebasDesbloqueadas {
  const estadoInicial = Object.fromEntries(simulacros.map((simulacro) => [simulacro.id, false]))
  if (typeof window === 'undefined') return estadoInicial

  try {
    const almacenado = localStorage.getItem(PRUEBAS_DESBLOQUEADAS_KEY)
    if (!almacenado) return estadoInicial
    const guardado = JSON.parse(almacenado) as Record<string, unknown>
    const estado = Object.fromEntries(simulacros.map((simulacro) => {
      const valor = guardado[simulacro.id]
      return [simulacro.id, typeof valor === 'boolean' ? valor : false]
    }))
    return estado as EstadoPruebasDesbloqueadas
  } catch {
    return estadoInicial
  }
}

export function guardarEstadoPruebasDesbloqueadas(estado: EstadoPruebasDesbloqueadas) {
  if (typeof window === 'undefined') return
  const validado = Object.fromEntries(simulacros.map((simulacro) => [simulacro.id, estado[simulacro.id] === true]))
  localStorage.setItem(PRUEBAS_DESBLOQUEADAS_KEY, JSON.stringify(validado))
  window.dispatchEvent(new Event(PRUEBAS_DESBLOQUEADAS_EVENT))
}
