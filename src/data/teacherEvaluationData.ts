import type { AreaId } from './areas'

export interface PreguntaEvaluacionDocente {
  id: string
  clave: 'claridad' | 'metodologia' | 'acompanamiento' | 'puntualidad'
  titulo: string
  pregunta: string
  descripcion: string
}

export const preguntasEvaluacionDocente: PreguntaEvaluacionDocente[] = [
  {
    id: 'p1',
    clave: 'claridad',
    titulo: 'Claridad al explicar',
    pregunta: 'Del 1 al 10, ¿qué tan bien se hace entender tu profesor al explicar los temas?',
    descripcion: 'Considera si comprendes las ideas y los ejemplos, incluso cuando el tema es difícil.',
  },
  {
    id: 'p2',
    clave: 'metodologia',
    titulo: 'Actividades y forma de enseñar',
    pregunta: '¿Qué tan útiles son las actividades y ejercicios para aprender esta materia y prepararte para Saber 11?',
    descripcion: 'Considera si las clases te ayudan a practicar y aplicar lo aprendido.',
  },
  {
    id: 'p3',
    clave: 'acompanamiento',
    titulo: 'Apoyo y resolución de dudas',
    pregunta: '¿Qué tan dispuesto y paciente es tu profesor cuando preguntas o necesitas que vuelva a explicar?',
    descripcion: 'Considera si recibes orientación y apoyo cuando algo no te queda claro.',
  },
  {
    id: 'p4',
    clave: 'puntualidad',
    titulo: 'Cumplimiento y organización',
    pregunta: '¿Qué tanto cumple tu profesor con los horarios, actividades y compromisos de la materia?',
    descripcion: 'Considera si las clases y la retroalimentación se realizan según lo acordado.',
  },
]

export interface EvaluacionDocenteEstudiante {
  id: string
  docenteId: string
  docenteNombre: string
  materiaId: AreaId
  materiaNombre: string
  estudianteNombre: string
  grado: string
  fecha: string
  puntajeClaridad: number // 1 a 10
  puntajeMetodologia: number // 1 a 10
  puntajeAcompanamiento: number // 1 a 10
  puntajePuntualidad: number // 1 a 10
  promedioGlobal: number // 1 a 10
  comentario: string
  recomiendaProfesor: boolean
}

export interface ResumenCalificacionesDocente {
  docenteId: string
  docenteNombre: string
  materiaId: AreaId
  materiaNombre: string
  correo: string
  promedioGlobal: number // sobre 10
  totalEvaluaciones: number
  porcentajeSatisfaccion: number // %
  promediosPorAspecto: {
    claridad: number
    metodologia: number
    acompanamiento: number
    puntualidad: number
  }
  comentariosRecientes: {
    id: string
    estudianteNombre: string
    grado: string
    fecha: string
    promedio: number
    comentario: string
    aspectoPositivo: string
  }[]
}

// Evaluaciones base iniciales de estudiantes para cada profesor
export const baseEvaluacionesDocentes: Record<string, EvaluacionDocenteEstudiante[]> = {
  'doc-mate': [
    {
      id: 'eval-m1',
      docenteId: 'doc-mate',
      docenteNombre: 'Prof. Carlos Alberto Muñoz',
      materiaId: 'matematicas',
      materiaNombre: 'Matemáticas',
      estudianteNombre: 'Valentina Gómez Ruiz',
      grado: '11°A',
      fecha: '02 Oct 2026',
      puntajeClaridad: 8,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 8,
      puntajePuntualidad: 9,
      promedioGlobal: 8.5,
      comentario: 'El profe explica muy bien las fórmulas y trucos de descarte. A veces en trigonometría va un poco rápido, pero siempre responde las dudas cuando uno le pregunta.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-m2',
      docenteId: 'doc-mate',
      docenteNombre: 'Prof. Carlos Alberto Muñoz',
      materiaId: 'matematicas',
      materiaNombre: 'Matemáticas',
      estudianteNombre: 'Juan Esteban Rodríguez',
      grado: '11°B',
      fecha: '04 Oct 2026',
      puntajeClaridad: 10,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 10,
      puntajePuntualidad: 10,
      promedioGlobal: 9.8,
      comentario: 'Excelente profesor, domina completamente las preguntas Saber 11 y enseña a resolver problemas de razonamiento en menos de 2 minutos.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-m3',
      docenteId: 'doc-mate',
      docenteNombre: 'Prof. Carlos Alberto Muñoz',
      materiaId: 'matematicas',
      materiaNombre: 'Matemáticas',
      estudianteNombre: 'Daniel Felipe Ospina',
      grado: '11°B',
      fecha: '05 Oct 2026',
      puntajeClaridad: 7,
      puntajeMetodologia: 8,
      puntajeAcompanamiento: 8,
      puntajePuntualidad: 9,
      promedioGlobal: 8.0,
      comentario: 'Me cuesta matemáticas pero el profe tiene paciencia para volver a explicar las ecuaciones.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-m4',
      docenteId: 'doc-mate',
      docenteNombre: 'Prof. Carlos Alberto Muñoz',
      materiaId: 'matematicas',
      materiaNombre: 'Matemáticas',
      estudianteNombre: 'Camila Andrea Vargas',
      grado: '11°C',
      fecha: '06 Oct 2026',
      puntajeClaridad: 9,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 9,
      puntajePuntualidad: 10,
      promedioGlobal: 9.3,
      comentario: 'Los simulacros que nos deja son muy parecidos a los del ICFES real. 10/10.',
      recomiendaProfesor: true,
    },
  ],

  'doc-lec': [
    {
      id: 'eval-l1',
      docenteId: 'doc-lec',
      docenteNombre: 'Profa. Andrea Patricia López',
      materiaId: 'lectura',
      materiaNombre: 'Lectura Crítica',
      estudianteNombre: 'Valentina Gómez Ruiz',
      grado: '11°A',
      fecha: '01 Oct 2026',
      puntajeClaridad: 10,
      puntajeMetodologia: 10,
      puntajeAcompanamiento: 10,
      puntajePuntualidad: 10,
      promedioGlobal: 10.0,
      comentario: 'La mejor profesora de lectura. Hace que los textos de filosofía que parecían aburridos se entiendan facilísimo con ejemplos cotidianos.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-l2',
      docenteId: 'doc-lec',
      docenteNombre: 'Profa. Andrea Patricia López',
      materiaId: 'lectura',
      materiaNombre: 'Lectura Crítica',
      estudianteNombre: 'Andrés Felipe Castro',
      grado: '11°C',
      fecha: '03 Oct 2026',
      puntajeClaridad: 9,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 9,
      puntajePuntualidad: 9,
      promedioGlobal: 9.0,
      comentario: 'Explica con mucha claridad la diferencia entre tesis y contraargumento. Muy recomendada.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-l3',
      docenteId: 'doc-lec',
      docenteNombre: 'Profa. Andrea Patricia López',
      materiaId: 'lectura',
      materiaNombre: 'Lectura Crítica',
      estudianteNombre: 'Laura Sofía Herrera',
      grado: '11°A',
      fecha: '05 Oct 2026',
      puntajeClaridad: 10,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 10,
      puntajePuntualidad: 10,
      promedioGlobal: 9.8,
      comentario: 'Excelente dinamismo en clase y análisis de caricaturas políticas.',
      recomiendaProfesor: true,
    },
  ],

  'doc-cien': [
    {
      id: 'eval-c1',
      docenteId: 'doc-cien',
      docenteNombre: 'Prof. Jorge Enrique Salazar',
      materiaId: 'ciencias',
      materiaNombre: 'Ciencias Naturales',
      estudianteNombre: 'Santiago Martínez Pérez',
      grado: '11°A',
      fecha: '30 Sep 2026',
      puntajeClaridad: 9,
      puntajeMetodologia: 8,
      puntajeAcompanamiento: 7,
      puntajePuntualidad: 8,
      promedioGlobal: 8.0,
      comentario: 'Sabe muchísimo de biología y genética. En física mecánica a veces deja muchas fórmulas de memoria y falta más práctica con simuladores.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-c2',
      docenteId: 'doc-cien',
      docenteNombre: 'Prof. Jorge Enrique Salazar',
      materiaId: 'ciencias',
      materiaNombre: 'Ciencias Naturales',
      estudianteNombre: 'María José Ramírez',
      grado: '11°A',
      fecha: '02 Oct 2026',
      puntajeClaridad: 6,
      puntajeMetodologia: 6,
      puntajeAcompanamiento: 6,
      puntajePuntualidad: 7,
      promedioGlobal: 6.3,
      comentario: 'En química de balanceo de ecuaciones se me hace muy difícil entenderle, va muy rápido y casi no da espacio para dudas.',
      recomiendaProfesor: false,
    },
    {
      id: 'eval-c3',
      docenteId: 'doc-cien',
      docenteNombre: 'Prof. Jorge Enrique Salazar',
      materiaId: 'ciencias',
      materiaNombre: 'Ciencias Naturales',
      estudianteNombre: 'Daniel Felipe Ospina',
      grado: '11°B',
      fecha: '04 Oct 2026',
      puntajeClaridad: 8,
      puntajeMetodologia: 7,
      puntajeAcompanamiento: 7,
      puntajePuntualidad: 8,
      promedioGlobal: 7.5,
      comentario: 'Buenas clases de ecología. Le sugerimos más tiempo para resolver dudas de física.',
      recomiendaProfesor: true,
    },
  ],

  'doc-soc': [
    {
      id: 'eval-s1',
      docenteId: 'doc-soc',
      docenteNombre: 'Profa. Liliana Marcela Ortiz',
      materiaId: 'sociales',
      materiaNombre: 'Sociales y Ciudadanas',
      estudianteNombre: 'Isabella Torres Cárdenas',
      grado: '11°B',
      fecha: '01 Oct 2026',
      puntajeClaridad: 9,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 9,
      puntajePuntualidad: 9,
      promedioGlobal: 9.0,
      comentario: 'Los debates de Constitución y derechos humanos son geniales. Se aprende mucho participando.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-s2',
      docenteId: 'doc-soc',
      docenteNombre: 'Profa. Liliana Marcela Ortiz',
      materiaId: 'sociales',
      materiaNombre: 'Sociales y Ciudadanas',
      estudianteNombre: 'Andrés Felipe Castro',
      grado: '11°C',
      fecha: '03 Oct 2026',
      puntajeClaridad: 9,
      puntajeMetodologia: 8,
      puntajeAcompanamiento: 9,
      puntajePuntualidad: 9,
      promedioGlobal: 8.8,
      comentario: 'Muy buena profesora, enseña a ver los problemas sociales desde diferentes puntos de vista.',
      recomiendaProfesor: true,
    },
  ],

  'doc-ing': [
    {
      id: 'eval-i1',
      docenteId: 'doc-ing',
      docenteNombre: 'Teacher Diana Carolina Restrepo',
      materiaId: 'ingles',
      materiaNombre: 'Inglés',
      estudianteNombre: 'Camila Andrea Vargas',
      grado: '11°C',
      fecha: '02 Oct 2026',
      puntajeClaridad: 9,
      puntajeMetodologia: 9,
      puntajeAcompanamiento: 9,
      puntajePuntualidad: 9,
      promedioGlobal: 9.0,
      comentario: 'Teacher Diana es muy amable y tiene excelente pronunciación. Sus canciones y juegos en clase son entretenidos.',
      recomiendaProfesor: true,
    },
    {
      id: 'eval-i2',
      docenteId: 'doc-ing',
      docenteNombre: 'Teacher Diana Carolina Restrepo',
      materiaId: 'ingles',
      materiaNombre: 'Inglés',
      estudianteNombre: 'Santiago Martínez Pérez',
      grado: '11°A',
      fecha: '04 Oct 2026',
      puntajeClaridad: 6,
      puntajeMetodologia: 6,
      puntajeAcompanamiento: 7,
      puntajePuntualidad: 8,
      promedioGlobal: 6.8,
      comentario: 'Para los que no sabemos inglés desde antes se nos hace muy duro. Nos gustaría que explicara las reglas de gramática en español antes de ponernos lecturas tan largas.',
      recomiendaProfesor: false,
    },
    {
      id: 'eval-i3',
      docenteId: 'doc-ing',
      docenteNombre: 'Teacher Diana Carolina Restrepo',
      materiaId: 'ingles',
      materiaNombre: 'Inglés',
      estudianteNombre: 'Nicolás Alejandro Díaz',
      grado: '11°C',
      fecha: '06 Oct 2026',
      puntajeClaridad: 7,
      puntajeMetodologia: 7,
      puntajeAcompanamiento: 8,
      puntajePuntualidad: 8,
      promedioGlobal: 7.5,
      comentario: 'Buena actitud. Se requiere más enfoque en las partes 6 y 7 del ICFES que son las más difíciles.',
      recomiendaProfesor: true,
    },
  ],
}

const STORAGE_EVALUACIONES_DOCENTES_KEY = 'impulsasaber_evaluaciones_docentes'

export function obtenerTodasLasEvaluaciones(): Record<string, EvaluacionDocenteEstudiante[]> {
  if (typeof window === 'undefined') return baseEvaluacionesDocentes
  try {
    const data = localStorage.getItem(STORAGE_EVALUACIONES_DOCENTES_KEY)
    if (!data) {
      localStorage.setItem(STORAGE_EVALUACIONES_DOCENTES_KEY, JSON.stringify(baseEvaluacionesDocentes))
      return baseEvaluacionesDocentes
    }
    return JSON.parse(data)
  } catch {
    return baseEvaluacionesDocentes
  }
}

export function guardarEvaluacionEstudiante(
  docenteId: string,
  docenteNombre: string,
  materiaId: AreaId,
  materiaNombre: string,
  estudianteNombre: string,
  grado: string,
  puntajes: {
    claridad: number
    metodologia: number
    acompanamiento: number
    puntualidad: number
  },
  comentario: string,
  recomiendaProfesor: boolean
): EvaluacionDocenteEstudiante {
  const promedio = Number(
    (
      (puntajes.claridad + puntajes.metodologia + puntajes.acompanamiento + puntajes.puntualidad) /
      4
    ).toFixed(1)
  )

  const nueva: EvaluacionDocenteEstudiante = {
    id: `eval-${Date.now()}`,
    docenteId,
    docenteNombre,
    materiaId,
    materiaNombre,
    estudianteNombre: estudianteNombre || 'Estudiante anónimo',
    grado: grado || '11°',
    fecha: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
    puntajeClaridad: puntajes.claridad,
    puntajeMetodologia: puntajes.metodologia,
    puntajeAcompanamiento: puntajes.acompanamiento,
    puntajePuntualidad: puntajes.puntualidad,
    promedioGlobal: promedio,
    comentario: comentario.trim(),
    recomiendaProfesor,
  }

  if (typeof window !== 'undefined') {
    try {
      const actuales = obtenerTodasLasEvaluaciones()
      const listaDocente = actuales[docenteId] || []
      actuales[docenteId] = [nueva, ...listaDocente]
      localStorage.setItem(STORAGE_EVALUACIONES_DOCENTES_KEY, JSON.stringify(actuales))
    } catch (err) {
      console.error('Error guardando evaluación docente:', err)
    }
  }

  return nueva
}

export function obtenerResumenCalificacionesDocente(docenteId: string): ResumenCalificacionesDocente {
  const todas = obtenerTodasLasEvaluaciones()
  const evaluaciones = todas[docenteId] || []

  if (evaluaciones.length === 0) {
    return {
      docenteId,
      docenteNombre: 'Docente',
      materiaId: 'matematicas',
      materiaNombre: 'Matemáticas',
      correo: 'docente@impulsasaber.demo',
      promedioGlobal: 0,
      totalEvaluaciones: 0,
      porcentajeSatisfaccion: 0,
      promediosPorAspecto: { claridad: 0, metodologia: 0, acompanamiento: 0, puntualidad: 0 },
      comentariosRecientes: [],
    }
  }

  const total = evaluaciones.length
  const sumClaridad = evaluaciones.reduce((acc, e) => acc + e.puntajeClaridad, 0)
  const sumMetodologia = evaluaciones.reduce((acc, e) => acc + e.puntajeMetodologia, 0)
  const sumAcompanamiento = evaluaciones.reduce((acc, e) => acc + e.puntajeAcompanamiento, 0)
  const sumPuntualidad = evaluaciones.reduce((acc, e) => acc + e.puntajePuntualidad, 0)
  const sumGlobal = evaluaciones.reduce((acc, e) => acc + e.promedioGlobal, 0)

  const recomendados = evaluaciones.filter((e) => e.recomiendaProfesor).length
  const porcentajeSatisfaccion = Math.round((recomendados / total) * 100)

  const primerEjemplo = evaluaciones[0]

  return {
    docenteId,
    docenteNombre: primerEjemplo.docenteNombre,
    materiaId: primerEjemplo.materiaId,
    materiaNombre: primerEjemplo.materiaNombre,
    correo: `${primerEjemplo.materiaId}@impulsasaber.demo`,
    promedioGlobal: Number((sumGlobal / total).toFixed(1)),
    totalEvaluaciones: total,
    porcentajeSatisfaccion,
    promediosPorAspecto: {
      claridad: Number((sumClaridad / total).toFixed(1)),
      metodologia: Number((sumMetodologia / total).toFixed(1)),
      acompanamiento: Number((sumAcompanamiento / total).toFixed(1)),
      puntualidad: Number((sumPuntualidad / total).toFixed(1)),
    },
    comentariosRecientes: evaluaciones.filter((e) => e.comentario.trim().length > 0).map((e) => ({
      id: e.id,
      estudianteNombre: e.estudianteNombre,
      grado: e.grado,
      fecha: e.fecha,
      promedio: e.promedioGlobal,
      comentario: e.comentario,
      aspectoPositivo: e.puntajeClaridad >= 8 ? 'Claridad explicativa destacada' : 'Acompañamiento positivo',
    })),
  }
}

export function obtenerTodosLosResumenesDocentes(): ResumenCalificacionesDocente[] {
  const docentesIds = ['doc-mate', 'doc-lec', 'doc-cien', 'doc-soc', 'doc-ing']
  return docentesIds.map((id) => obtenerResumenCalificacionesDocente(id))
}
