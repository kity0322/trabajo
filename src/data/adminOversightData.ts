import type { AreaId } from './areas'
import { baseEstudiantesPorMateria, type DetalleEstudianteMateria } from './teacherData'

export type EstadoDocencia = 'optimo' | 'al_dia' | 'requiere_atencion' | 'en_riesgo'
export type NivelGravedad = 'critico' | 'alto' | 'medio'

export interface AuditoriaDocente {
  id: string
  profesor: string
  materiaId: AreaId
  materiaNombre: string
  correo: string
  telefono: string
  gruposAsignados: string[]
  avanceCurricular: number // %
  evaluacionesAsignadas: number
  planesRefuerzoCreados: number
  planesRefuerzoCompletados: number
  tasaRespuestaSeguimiento: number // %
  indiceCumplimientoDocente: number // 0 - 100
  estadoDocencia: EstadoDocencia
  fortalezasDocentes: string[]
  fallasDocenciaOportunidades: string[]
  recomendacionAdministrador: string
  ultimaSupervision: string
}

export interface FallaTematicaEstudiantil {
  id: string
  materiaId: AreaId
  materiaNombre: string
  tema: string
  competencia: string
  porcentajeFalla: number // %
  estudiantesAfectados: number
  nivelGravedad: NivelGravedad
  motivoPedagogico: string
  accionCorrectivaInstitucional: string
}

export interface ConsolidadoEstudianteAdmin {
  id: string
  nombre: string
  grado: string
  institucion: string
  correo: string
  telefono: string
  puntajeGlobalIcfes: number // sobre 500
  promedioGeneral: number // sobre 100
  estadoGeneral: 'excelente' | 'satisfactorio' | 'en_riesgo' | 'critico'
  materias: {
    matematicas: number
    lectura: number
    ciencias: number
    sociales: number
    ingles: number
  }
  materiasEnRiesgo: string[]
  materiasDestacadas: string[]
  totalSimulacros: number
  ultimaActividad: string
}

export const auditoriaDocentesData: AuditoriaDocente[] = [
  {
    id: 'doc-mate',
    profesor: 'Prof. Carlos Alberto Muñoz',
    materiaId: 'matematicas',
    materiaNombre: 'Matemáticas',
    correo: 'mate@impulsasaber.demo',
    telefono: '+57 310 987 6541',
    gruposAsignados: ['11°A', '11°B', '11°C'],
    avanceCurricular: 88,
    evaluacionesAsignadas: 16,
    planesRefuerzoCreados: 6,
    planesRefuerzoCompletados: 4,
    tasaRespuestaSeguimiento: 82,
    indiceCumplimientoDocente: 88,
    estadoDocencia: 'al_dia',
    fortalezasDocentes: [
      'Excelente retroalimentación en problemas de razonamiento cuantitativo.',
      'Constante actualización del banco de reactivos de álgebra y funciones.',
      'Puntualidad en el registro de calificaciones.',
    ],
    fallasDocenciaOportunidades: [
      'Pendiente reforzar el módulo de trigonometría aplicada para los grados 11°B y 11°C.',
      'Falta registrar 2 observaciones individuales de refuerzo en plataforma.',
      'Poco uso de simulaciones gráficas tipo GeoGebra en clase presencial.',
    ],
    recomendacionAdministrador:
      'Programar 2 sesiones intensivas de nivelación en trigonometría antes del segundo simulacro general y verificar el cierre de las observaciones pendientes.',
    ultimaSupervision: 'Hace 2 días',
  },
  {
    id: 'doc-lec',
    profesor: 'Profa. Andrea Patricia López',
    materiaId: 'lectura',
    materiaNombre: 'Lectura Crítica',
    correo: 'lectura@impulsasaber.demo',
    telefono: '+57 311 876 5432',
    gruposAsignados: ['11°A', '11°B', '11°C'],
    avanceCurricular: 94,
    evaluacionesAsignadas: 18,
    planesRefuerzoCreados: 7,
    planesRefuerzoCompletados: 6,
    tasaRespuestaSeguimiento: 92,
    indiceCumplimientoDocente: 95,
    estadoDocencia: 'optimo',
    fortalezasDocentes: [
      'Altísimo compromiso pedagógico y seguimiento individualizado.',
      'Excelente selección de textos continuos (filosofía y ensayo) y discontinuos.',
      'Mayor tasa de estudiantes con puntajes superiores a 80 pts en Saber 11.',
    ],
    fallasDocenciaOportunidades: [
      'Algunos estudiantes con dificultades lectoras severas (11°B) requieren material adaptado más gradual.',
      'Mejorar la distribución del tiempo en talleres para evitar sobrecarga en fines de semana.',
    ],
    recomendacionAdministrador:
      'Reconocimiento institucional por excelencia docente. Apoyar a la profesora con monitoría estudiantil para atender a los 2 estudiantes en riesgo crítico.',
    ultimaSupervision: 'Ayer',
  },
  {
    id: 'doc-cien',
    profesor: 'Prof. Jorge Enrique Salazar',
    materiaId: 'ciencias',
    materiaNombre: 'Ciencias Naturales',
    correo: 'ciencias@impulsasaber.demo',
    telefono: '+57 312 765 4321',
    gruposAsignados: ['11°A', '11°B', '11°C'],
    avanceCurricular: 70,
    evaluacionesAsignadas: 10,
    planesRefuerzoCreados: 4,
    planesRefuerzoCompletados: 2,
    tasaRespuestaSeguimiento: 64,
    indiceCumplimientoDocente: 72,
    estadoDocencia: 'requiere_atencion',
    fortalezasDocentes: [
      'Dominio experto en Biología celular y Ecología aplicada.',
      'Buenas explicaciones teóricas en sesiones sincrónicas.',
    ],
    fallasDocenciaOportunidades: [
      'Atraso significativo del 20% en el componente de Física Mecánica y Ondas.',
      'Baja asignación de planes de refuerzo para química inorgánica (balanceo y molaridad).',
      'Demoras en responder dudas y retroalimentar a estudiantes en riesgo.',
    ],
    recomendacionAdministrador:
      'LLAMADO DE ATENCIÓN PEDAGÓGICA: Ajustar el cronograma para recuperar el contenido de Física en las próximas 3 semanas. La dirección académica asignará un tallerista de apoyo.',
    ultimaSupervision: 'Hace 4 días',
  },
  {
    id: 'doc-soc',
    profesor: 'Profa. Liliana Marcela Ortiz',
    materiaId: 'sociales',
    materiaNombre: 'Sociales y Ciudadanas',
    correo: 'sociales@impulsasaber.demo',
    telefono: '+57 313 654 3210',
    gruposAsignados: ['11°A', '11°B', '11°C'],
    avanceCurricular: 86,
    evaluacionesAsignadas: 14,
    planesRefuerzoCreados: 5,
    planesRefuerzoCompletados: 4,
    tasaRespuestaSeguimiento: 85,
    indiceCumplimientoDocente: 87,
    estadoDocencia: 'al_dia',
    fortalezasDocentes: [
      'Gran dinamismo en debates de competencias ciudadanas y Constitución de 1991.',
      'Excelente contextualización de problemas históricos de Colombia.',
    ],
    fallasDocenciaOportunidades: [
      'Déficit en el abordaje de geografía económica y modelos de desarrollo internacional.',
      'Necesidad de intensificar preguntas de Pensamiento Reflexivo y Sistémico.',
    ],
    recomendacionAdministrador:
      'Reforzar con lecturas complementarias de geopolítica y entregar el reporte de avance de 11°C.',
    ultimaSupervision: 'Hace 3 días',
  },
  {
    id: 'doc-ing',
    profesor: 'Teacher Diana Carolina Restrepo',
    materiaId: 'ingles',
    materiaNombre: 'Inglés',
    correo: 'ingles@impulsasaber.demo',
    telefono: '+57 314 543 2109',
    gruposAsignados: ['11°A', '11°B', '11°C'],
    avanceCurricular: 74,
    evaluacionesAsignadas: 11,
    planesRefuerzoCreados: 6,
    planesRefuerzoCompletados: 3,
    tasaRespuestaSeguimiento: 68,
    indiceCumplimientoDocente: 73,
    estadoDocencia: 'requiere_atencion',
    fortalezasDocentes: [
      'Excelente pronunciación y material interactivo para vocabulario básico (Partes 1-3).',
      'Buena disposición para atender a estudiantes en horario extracurricular.',
    ],
    fallasDocenciaOportunidades: [
      '42% de estudiantes de la institución están en nivel A- o A1 (muy rezagados).',
      'Falta de estrategias efectivas para afrontar las Partes 6 y 7 (lectura densa e inferencia gramatical).',
      'Se requiere mayor rigurosidad en el control de entrega de talleres semanales.',
    ],
    recomendacionAdministrador:
      'URGENTE: Implementar el "Club de Lectura en Inglés Saber 11" de 45 min diarios y realizar talleres de conectores gramaticales con asistencia obligatoria para los estudiantes rezagados.',
    ultimaSupervision: 'Hace 1 día',
  },
]

// Radiografía de las mayores fallas y cuellos de botella de los estudiantes en toda la institución
export const fallasEstudiantesData: FallaTematicaEstudiantil[] = [
  {
    id: 'fal-1',
    materiaId: 'matematicas',
    materiaNombre: 'Matemáticas',
    tema: 'Funciones Exponenciales y Trigonometría Básica',
    competencia: 'Formulación y Ejecución',
    porcentajeFalla: 74,
    estudiantesAfectados: 52,
    nivelGravedad: 'critico',
    motivoPedagogico:
      'Los estudiantes no identifican cuándo usar razones trigonométricas vs. Teorema de Pitágoras en problemas de sombras y ángulos de elevación.',
    accionCorrectivaInstitucional:
      'Taller obligatorio de modelado geométrico y asignación de 30 ejercicios guiados con retroalimentación paso a paso.',
  },
  {
    id: 'fal-2',
    materiaId: 'ingles',
    materiaNombre: 'Inglés',
    tema: 'Comprensión Lectora e Inferencia (Partes 6 y 7)',
    competencia: 'Lectura Profunda en Lengua Extranjera',
    porcentajeFalla: 69,
    estudiantesAfectados: 48,
    nivelGravedad: 'critico',
    motivoPedagogico:
      'Vocabulario insuficiente para deducir la postura e intención del autor en textos de divulgación científica en inglés.',
    accionCorrectivaInstitucional:
      'Plan intensivo de 200 palabras clave Saber 11 con tarjetas interactivas y lecturas graduadas.',
  },
  {
    id: 'fal-3',
    materiaId: 'ciencias',
    materiaNombre: 'Ciencias Naturales',
    tema: 'Física: Cinemática y Fuerzas Mecánicas (Leyes de Newton)',
    competencia: 'Uso Comprensivo del Conocimiento Científico',
    porcentajeFalla: 65,
    estudiantesAfectados: 43,
    nivelGravedad: 'alto',
    motivoPedagogico:
      'Dificultad para construir y desglosar diagramas de cuerpo libre con planos inclinados y fuerzas de fricción.',
    accionCorrectivaInstitucional:
      'Sesiones prácticas con simuladores PhET y resolución de problemas tipo ICFES en grupos de estudio.',
  },
  {
    id: 'fal-4',
    materiaId: 'lectura',
    materiaNombre: 'Lectura Crítica',
    tema: 'Identificación de Falacias y Supuestos Implícitos en Filosofía',
    competencia: 'Reflexión y Evaluación Crítica',
    porcentajeFalla: 58,
    estudiantesAfectados: 39,
    nivelGravedad: 'alto',
    motivoPedagogico:
      'Los estudiantes confunden la tesis central del autor con los contraargumentos que este expone para refutar.',
    accionCorrectivaInstitucional:
      'Laboratorio de análisis de textos argumentativos y mapas de tesis-premisas.',
  },
  {
    id: 'fal-5',
    materiaId: 'sociales',
    materiaNombre: 'Sociales y Ciudadanas',
    tema: 'Mecanismos Constitucionales (Tutela vs. Acción Popular) y Conflicto Armado',
    competencia: 'Pensamiento Social y Multiperspectivismo',
    porcentajeFalla: 54,
    estudiantesAfectados: 36,
    nivelGravedad: 'medio',
    motivoPedagogico:
      'Confusión en los requisitos jurídicos para interponer acciones constitucionales de protección de derechos colectivos vs individuales.',
    accionCorrectivaInstitucional:
      'Juego de roles de casos reales de la Corte Constitucional colombiana.',
  },
  {
    id: 'fal-6',
    materiaId: 'matematicas',
    materiaNombre: 'Matemáticas',
    tema: 'Probabilidad Condicional y Combinatoria',
    competencia: 'Interpretación y Representación',
    porcentajeFalla: 62,
    estudiantesAfectados: 41,
    nivelGravedad: 'alto',
    motivoPedagogico:
      'Fallas en el conteo sistemático sin repetición y distinción entre permutaciones y combinaciones.',
    accionCorrectivaInstitucional:
      'Diagramas de árbol interactivos y resolución de problemas cotidianos de muestreo.',
  },
]

// Consolidado de todos los estudiantes para la administración con notas por área
export const consolidadoEstudiantesData: ConsolidadoEstudianteAdmin[] = [
  {
    id: 'e1',
    nombre: 'Valentina Gómez Ruiz',
    grado: '11°A',
    institucion: 'I.E. Simón Bolívar',
    correo: 'valentina.gomez@estudiante.edu.co',
    telefono: '+57 312 456 7890',
    puntajeGlobalIcfes: 372,
    promedioGeneral: 74.4,
    estadoGeneral: 'satisfactorio',
    materias: {
      matematicas: 54,
      lectura: 89,
      ciencias: 76,
      sociales: 82,
      ingles: 71,
    },
    materiasEnRiesgo: ['Matemáticas (54 pts)'],
    materiasDestacadas: ['Lectura Crítica (89 pts)', 'Sociales (82 pts)'],
    totalSimulacros: 14,
    ultimaActividad: 'Hace 2 horas',
  },
  {
    id: 'e2',
    nombre: 'Santiago Martínez Pérez',
    grado: '11°A',
    institucion: 'I.E. Simón Bolívar',
    correo: 'santiago.martinez@estudiante.edu.co',
    telefono: '+57 314 333 4455',
    puntajeGlobalIcfes: 341,
    promedioGeneral: 68.2,
    estadoGeneral: 'satisfactorio',
    materias: {
      matematicas: 71,
      lectura: 72,
      ciencias: 87,
      sociales: 65,
      ingles: 44,
    },
    materiasEnRiesgo: ['Inglés (44 pts)'],
    materiasDestacadas: ['Ciencias Naturales (87 pts)', 'Matemáticas (71 pts)'],
    totalSimulacros: 11,
    ultimaActividad: 'Hace 5 horas',
  },
  {
    id: 'e3',
    nombre: 'Isabella Torres Cárdenas',
    grado: '11°B',
    institucion: 'I.E. Simón Bolívar',
    correo: 'isabella.torres@estudiante.edu.co',
    telefono: '+57 318 777 8899',
    puntajeGlobalIcfes: 298,
    promedioGeneral: 59.6,
    estadoGeneral: 'en_riesgo',
    materias: {
      matematicas: 59,
      lectura: 68,
      ciencias: 58,
      sociales: 86,
      ingles: 52,
    },
    materiasEnRiesgo: ['Matemáticas (59 pts)', 'Ciencias Naturales (58 pts)', 'Inglés (52 pts)'],
    materiasDestacadas: ['Sociales (86 pts)'],
    totalSimulacros: 9,
    ultimaActividad: 'Ayer',
  },
  {
    id: 'e4',
    nombre: 'Juan Esteban Rodríguez',
    grado: '11°B',
    institucion: 'I.E. Simón Bolívar',
    correo: 'juan.rodriguez@estudiante.edu.co',
    telefono: '+57 315 987 6543',
    puntajeGlobalIcfes: 389,
    promedioGeneral: 77.8,
    estadoGeneral: 'excelente',
    materias: {
      matematicas: 88,
      lectura: 78,
      ciencias: 84,
      sociales: 77,
      ingles: 52,
    },
    materiasEnRiesgo: ['Inglés (52 pts)'],
    materiasDestacadas: ['Matemáticas (88 pts)', 'Ciencias Naturales (84 pts)'],
    totalSimulacros: 16,
    ultimaActividad: 'Hace 1 hora',
  },
  {
    id: 'e5',
    nombre: 'María José Ramírez',
    grado: '11°A',
    institucion: 'I.E. Simón Bolívar',
    correo: 'maria.ramirez@estudiante.edu.co',
    telefono: '+57 320 111 2233',
    puntajeGlobalIcfes: 264,
    promedioGeneral: 52.8,
    estadoGeneral: 'en_riesgo',
    materias: {
      matematicas: 66,
      lectura: 82,
      ciencias: 47,
      sociales: 62,
      ingles: 46,
    },
    materiasEnRiesgo: ['Ciencias Naturales (47 pts)', 'Inglés (46 pts)'],
    materiasDestacadas: ['Lectura Crítica (82 pts)'],
    totalSimulacros: 7,
    ultimaActividad: 'Hace 3 días',
  },
  {
    id: 'e6',
    nombre: 'Andrés Felipe Castro',
    grado: '11°C',
    institucion: 'I.E. Simón Bolívar',
    correo: 'andres.castro@estudiante.edu.co',
    telefono: '+57 316 444 5566',
    puntajeGlobalIcfes: 315,
    promedioGeneral: 63.0,
    estadoGeneral: 'satisfactorio',
    materias: {
      matematicas: 74,
      lectura: 51,
      ciencias: 68,
      sociales: 81,
      ingles: 60,
    },
    materiasEnRiesgo: ['Lectura Crítica (51 pts)'],
    materiasDestacadas: ['Sociales (81 pts)', 'Matemáticas (74 pts)'],
    totalSimulacros: 12,
    ultimaActividad: 'Hace 6 horas',
  },
  {
    id: 'e7',
    nombre: 'Camila Andrea Vargas',
    grado: '11°C',
    institucion: 'I.E. Simón Bolívar',
    correo: 'camila.vargas@estudiante.edu.co',
    telefono: '+57 317 888 9900',
    puntajeGlobalIcfes: 401,
    promedioGeneral: 80.2,
    estadoGeneral: 'excelente',
    materias: {
      matematicas: 85,
      lectura: 79,
      ciencias: 81,
      sociales: 56,
      ingles: 92,
    },
    materiasEnRiesgo: ['Sociales (56 pts)'],
    materiasDestacadas: ['Inglés (92 pts)', 'Matemáticas (85 pts)', 'Ciencias Naturales (81 pts)'],
    totalSimulacros: 18,
    ultimaActividad: 'Hace 30 min',
  },
  {
    id: 'e8',
    nombre: 'Daniel Felipe Ospina',
    grado: '11°B',
    institucion: 'I.E. Simón Bolívar',
    correo: 'daniel.ospina@estudiante.edu.co',
    telefono: '+57 311 234 5678',
    puntajeGlobalIcfes: 241,
    promedioGeneral: 48.2,
    estadoGeneral: 'critico',
    materias: {
      matematicas: 42,
      lectura: 48,
      ciencias: 75,
      sociales: 52,
      ingles: 40,
    },
    materiasEnRiesgo: ['Inglés (40 pts)', 'Matemáticas (42 pts)', 'Lectura Crítica (48 pts)', 'Sociales (52 pts)'],
    materiasDestacadas: ['Ciencias Naturales (75 pts)'],
    totalSimulacros: 5,
    ultimaActividad: 'Hace 4 días',
  },
  {
    id: 'e9',
    nombre: 'Laura Sofía Herrera',
    grado: '11°A',
    institucion: 'I.E. Simón Bolívar',
    correo: 'laura.herrera@estudiante.edu.co',
    telefono: '+57 313 555 6677',
    puntajeGlobalIcfes: 356,
    promedioGeneral: 71.2,
    estadoGeneral: 'satisfactorio',
    materias: {
      matematicas: 72,
      lectura: 86,
      ciencias: 53,
      sociales: 78,
      ingles: 67,
    },
    materiasEnRiesgo: ['Ciencias Naturales (53 pts)'],
    materiasDestacadas: ['Lectura Crítica (86 pts)', 'Sociales (78 pts)'],
    totalSimulacros: 13,
    ultimaActividad: 'Hace 8 horas',
  },
  {
    id: 'e10',
    nombre: 'Nicolás Alejandro Díaz',
    grado: '11°C',
    institucion: 'I.E. Simón Bolívar',
    correo: 'nicolas.diaz@estudiante.edu.co',
    telefono: '+57 319 666 7788',
    puntajeGlobalIcfes: 288,
    promedioGeneral: 57.6,
    estadoGeneral: 'en_riesgo',
    materias: {
      matematicas: 80,
      lectura: 65,
      ciencias: 60,
      sociales: 58,
      ingles: 55,
    },
    materiasEnRiesgo: ['Inglés (55 pts)', 'Sociales (58 pts)'],
    materiasDestacadas: ['Matemáticas (80 pts)'],
    totalSimulacros: 10,
    ultimaActividad: 'Ayer',
  },
]

const STORAGE_DIRECTRICES_KEY = 'impulsasaber_directrices_admin'

export interface DirectrizGuardada {
  id: string
  docenteId: string
  docenteNombre: string
  materiaNombre: string
  texto: string
  fecha: string
  urgencia: 'urgente' | 'moderada' | 'rutinaria'
  estado: 'Pendiente de cumplimiento' | 'En atención por docente' | 'Cumplida y verificada'
}

export function obtenerDirectricesGuardadas(): DirectrizGuardada[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_DIRECTRICES_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function guardarDirectrizAdmin(
  docenteId: string,
  docenteNombre: string,
  materiaNombre: string,
  texto: string,
  urgencia: 'urgente' | 'moderada' | 'rutinaria'
): DirectrizGuardada {
  const nueva: DirectrizGuardada = {
    id: `dir-${Date.now()}`,
    docenteId,
    docenteNombre,
    materiaNombre,
    texto,
    fecha: new Date().toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    urgencia,
    estado: 'Pendiente de cumplimiento',
  }

  if (typeof window !== 'undefined') {
    try {
      const anteriores = obtenerDirectricesGuardadas()
      const actualizadas = [nueva, ...anteriores]
      localStorage.setItem(STORAGE_DIRECTRICES_KEY, JSON.stringify(actualizadas))
    } catch (err) {
      console.error('Error guardando directriz:', err)
    }
  }

  return nueva
}

export function actualizarEstadoDirectriz(
  directrizId: string,
  nuevoEstado: 'Pendiente de cumplimiento' | 'En atención por docente' | 'Cumplida y verificada'
) {
  if (typeof window === 'undefined') return
  try {
    const anteriores = obtenerDirectricesGuardadas()
    const actualizadas = anteriores.map((d) =>
      d.id === directrizId ? { ...d, estado: nuevoEstado } : d
    )
    localStorage.setItem(STORAGE_DIRECTRICES_KEY, JSON.stringify(actualizadas))
  } catch (err) {
    console.error('Error actualizando directriz:', err)
  }
}

export function obtenerEstadisticasAdmin() {
  const totalDocentes = auditoriaDocentesData.length
  const docentesEnAlerta = auditoriaDocentesData.filter(
    (d) => d.estadoDocencia === 'requiere_atencion' || d.estadoDocencia === 'en_riesgo'
  ).length

  const promedioCumplimientoDocente = Math.round(
    auditoriaDocentesData.reduce((acc, d) => acc + d.indiceCumplimientoDocente, 0) / totalDocentes
  )

  const promedioAvanceCurricular = Math.round(
    auditoriaDocentesData.reduce((acc, d) => acc + d.avanceCurricular, 0) / totalDocentes
  )

  const totalEstudiantes = consolidadoEstudiantesData.length
  const estudiantesCriticos = consolidadoEstudiantesData.filter((e) => e.estadoGeneral === 'critico').length
  const estudiantesEnRiesgo = consolidadoEstudiantesData.filter((e) => e.estadoGeneral === 'en_riesgo').length
  const estudiantesExcelente = consolidadoEstudiantesData.filter((e) => e.estadoGeneral === 'excelente').length
  const estudiantesSatisfactorio = consolidadoEstudiantesData.filter(
    (e) => e.estadoGeneral === 'satisfactorio'
  ).length

  const puntajePromedioGlobal = Math.round(
    consolidadoEstudiantesData.reduce((acc, e) => acc + e.puntajeGlobalIcfes, 0) / totalEstudiantes
  )

  return {
    totalDocentes,
    docentesEnAlerta,
    promedioCumplimientoDocente,
    promedioAvanceCurricular,
    totalEstudiantes,
    estudiantesCriticos,
    estudiantesEnRiesgo,
    totalEnRiesgoOAlerta: estudiantesCriticos + estudiantesEnRiesgo,
    estudiantesExcelente,
    estudiantesSatisfactorio,
    puntajePromedioGlobal,
    totalFallasCriticas: fallasEstudiantesData.filter((f) => f.nivelGravedad === 'critico').length,
  }
}
