import type { AreaId } from './areas'

export type EstadoRendimiento = 'sobresaliente' | 'al_dia' | 'quedado' | 'critico'

export interface CompetenciaMateria {
  nombre: string
  puntaje: number // 0 a 100
  descripcion: string
  estado: 'dominado' | 'en_progreso' | 'reforzar'
}

export interface EvaluacionHistorial {
  id: string
  titulo: string
  fecha: string
  puntaje: number // 0 a 100
  totalPreguntas: number
  aciertos: number
  tiempoMin: number
  estado: 'Excelente' | 'Aprobado' | 'Requiere Refuerzo' | 'Crítico'
}

export interface DetalleEstudianteMateria {
  id: string
  nombre: string
  grado: string
  institucion: string
  sector?: string
  municipio?: string
  correo: string
  telefono: string
  ultimaActividad: string
  materia: AreaId
  promedioMateria: number
  tendencia: 'up' | 'down' | 'stable'
  estado: EstadoRendimiento
  evaluacionesRealizadas: number
  tasaAciertos: number
  tiempoPromedioMin: number
  competencias: CompetenciaMateria[]
  temasDominados: string[]
  temasPorReforzar: string[]
  planRefuerzoSugerido: string[]
  diagnosticoDocente: string
  historialEvaluaciones: EvaluacionHistorial[]
  observacionGuardada?: string
}

export interface InformacionProfesorMateria {
  materiaId: AreaId
  materiaNombre: string
  nombreProfesor: string
  correo: string
  descripcion: string
  metaPromedio: number
  institucionesAsignadas: string[]
  sectoresAsignados: string[]
}

export const profesoresPorMateria: Record<AreaId, InformacionProfesorMateria> = {
  matematicas: {
    materiaId: 'matematicas',
    materiaNombre: 'Matemáticas',
    nombreProfesor: 'Prof. Carlos Alberto Muñoz',
    correo: 'mate@impulsasaber.demo',
    descripcion: 'Especialista en Razonamiento Cuantitativo, Álgebra y Geometría ICFES Saber 11',
    metaPromedio: 75,
    institucionesAsignadas: [
      'Colegio Nacional Simón Bolívar (CNSB)',
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
      'Institución Educativa Providencia',
    ],
    sectoresAsignados: ['Sector Samaniego (Urbano & Rural)', 'Sector Providencia (Centro & Veredas)'],
  },
  lectura: {
    materiaId: 'lectura',
    materiaNombre: 'Lectura Crítica',
    nombreProfesor: 'Profa. Andrea Patricia López',
    correo: 'lectura@impulsasaber.demo',
    descripcion: 'Especialista en Comprensión Textual, Análisis Argumentativo y Filosofía',
    metaPromedio: 78,
    institucionesAsignadas: [
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
      'Institución Educativa San Juan Bautista',
      'Colegio Nacional Simón Bolívar (CNSB)',
    ],
    sectoresAsignados: ['Sector Samaniego (Urbano & Rural)', 'Sector Santa Cruz de Guachavez'],
  },
  ciencias: {
    materiaId: 'ciencias',
    materiaNombre: 'Ciencias Naturales',
    nombreProfesor: 'Prof. Jorge Enrique Salazar',
    correo: 'ciencias@impulsasaber.demo',
    descripcion: 'Especialista en Biología, Química, Física e Indagación Científica',
    metaPromedio: 72,
    institucionesAsignadas: [
      'Institución Educativa Providencia',
      'Institución Educativa Nuestra Señora de Lourdes',
      'Colegio Nacional Simón Bolívar (CNSB)',
    ],
    sectoresAsignados: ['Sector Providencia (Centro & Veredas)', 'Sector Santa Cruz de Guachavez', 'Sector Samaniego (Urbano & Rural)'],
  },
  sociales: {
    materiaId: 'sociales',
    materiaNombre: 'Sociales y Ciudadanas',
    nombreProfesor: 'Profa. Liliana Marcela Ortiz',
    correo: 'sociales@impulsasaber.demo',
    descripcion: 'Especialista en Historia de Colombia, Constitución Política y Análisis de Perspectivas',
    metaPromedio: 74,
    institucionesAsignadas: [
      'Colegio Nacional Simón Bolívar (CNSB)',
      'Institución Educativa San Juan Bautista',
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
    ],
    sectoresAsignados: ['Sector Samaniego (Urbano & Rural)', 'Sector Santa Cruz de Guachavez'],
  },
  ingles: {
    materiaId: 'ingles',
    materiaNombre: 'Inglés',
    nombreProfesor: 'Teacher Diana Carolina Restrepo',
    correo: 'ingles@impulsasaber.demo',
    descripcion: 'Especialista en Lectura Bilingüe, Gramática y Estructura B1/B2 ICFES',
    metaPromedio: 70,
    institucionesAsignadas: [
      'Institución Educativa Providencia',
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
      'Institución Educativa Nuestra Señora de Lourdes',
    ],
    sectoresAsignados: ['Sector Providencia (Centro & Veredas)', 'Sector Samaniego (Urbano & Rural)', 'Sector Santa Cruz de Guachavez'],
  },
}

// Base de estudiantes con desempeño personalizado en cada una de las 5 materias
export const baseEstudiantesPorMateria: Record<AreaId, DetalleEstudianteMateria[]> = {
  matematicas: [
    {
      id: 'e1',
      nombre: 'Valentina Gómez Ruiz',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'valentina.gomez@estudiante.edu.co',
      telefono: '+57 312 456 7890',
      ultimaActividad: 'Hace 2 horas',
      materia: 'matematicas',
      promedioMateria: 54,
      tendencia: 'down',
      estado: 'quedado',
      evaluacionesRealizadas: 6,
      tasaAciertos: 54,
      tiempoPromedioMin: 32,
      diagnosticoDocente: 'Presenta dificultades serias en funciones cuadráticas y lectura de gráficas estadísticas combinadas. Requiere nivelación antes de la siguiente prueba general.',
      temasDominados: ['Aritmética básica', 'Regla de tres simple', 'Conversión de unidades'],
      temasPorReforzar: ['Funciones exponenciales y logarítmicas', 'Teorema de Pitágoras y trigonometría básica', 'Probabilidad condicional'],
      planRefuerzoSugerido: [
        'Asignar taller práctico de funciones y modelado lineal.',
        'Revisión en clase de interpretación de histogramas y diagramas de caja.',
        'Programar 2 simulacros cortos de 10 preguntas de geometría.',
      ],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 62, descripcion: 'Comprender y transformar información cuantitativa', estado: 'en_progreso' },
        { nombre: 'Formulación y Ejecución', puntaje: 48, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'reforzar' },
        { nombre: 'Argumentación', puntaje: 52, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m1', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 48, totalPreguntas: 20, aciertos: 9, tiempoMin: 38, estado: 'Requiere Refuerzo' },
        { id: 'ev-m2', titulo: 'Taller Razonamiento Cuantitativo', fecha: '01 Oct 2026', puntaje: 56, totalPreguntas: 15, aciertos: 8, tiempoMin: 29, estado: 'Requiere Refuerzo' },
        { id: 'ev-m3', titulo: 'Prueba Álgebra y Geometría I', fecha: '05 Oct 2026', puntaje: 58, totalPreguntas: 25, aciertos: 14, tiempoMin: 42, estado: 'Requiere Refuerzo' },
      ],
    },
    {
      id: 'e4',
      nombre: 'Juan Esteban Rodríguez',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'juan.rodriguez@estudiante.edu.co',
      telefono: '+57 315 987 6543',
      ultimaActividad: 'Hace 1 hora',
      materia: 'matematicas',
      promedioMateria: 88,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 10,
      tasaAciertos: 89,
      tiempoPromedioMin: 22,
      diagnosticoDocente: 'Dominio destacado de conceptos algebraicos y resolución analítica de problemas complejos. Capacidad de tutoría con sus pares.',
      temasDominados: ['Álgebra avanzada', 'Geometría analítica', 'Combinatoria y probabilidad', 'Cálculo de áreas y volúmenes'],
      temasPorReforzar: ['Optimización de tiempo en preguntas de argumentación extendida'],
      planRefuerzoSugerido: [
        'Desafíos de nivel superior y olimpiadas matemáticas.',
        'Apoyo como monitor de grupo para compañeros con dificultades.',
      ],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 92, descripcion: 'Comprender y transformar información cuantitativa', estado: 'dominado' },
        { nombre: 'Formulación y Ejecución', puntaje: 86, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'dominado' },
        { nombre: 'Argumentación', puntaje: 86, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m4', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 85, totalPreguntas: 20, aciertos: 17, tiempoMin: 25, estado: 'Excelente' },
        { id: 'ev-m5', titulo: 'Taller Razonamiento Cuantitativo', fecha: '01 Oct 2026', puntaje: 90, totalPreguntas: 15, aciertos: 14, tiempoMin: 18, estado: 'Excelente' },
        { id: 'ev-m6', titulo: 'Prueba Álgebra y Geometría I', fecha: '05 Oct 2026', puntaje: 89, totalPreguntas: 25, aciertos: 22, tiempoMin: 28, estado: 'Excelente' },
      ],
    },
    {
      id: 'e8',
      nombre: 'Daniel Felipe Ospina',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'daniel.ospina@estudiante.edu.co',
      telefono: '+57 311 234 5678',
      ultimaActividad: 'Hace 4 días',
      materia: 'matematicas',
      promedioMateria: 42,
      tendencia: 'down',
      estado: 'critico',
      evaluacionesRealizadas: 4,
      tasaAciertos: 40,
      tiempoPromedioMin: 45,
      diagnosticoDocente: '¡ALERTA CRÍTICA! Muy bajo rendimiento y desinterés en entregas. No domina despeje de ecuaciones de primer grado ni proporcionalidad.',
      temasDominados: ['Lectura de tablas muy sencillas'],
      temasPorReforzar: ['Ecuaciones lineales y sistemas 2x2', 'Fracciones y porcentajes', 'Perímetros y áreas sombreadas', 'Interpretación gráfica'],
      planRefuerzoSugerido: [
        'Citar con acudiente para compromiso académico.',
        'Plan intensivo de rescate: 1 hora semanal extra en tutoría guiada.',
        'Guía de refuerzo remedial con ejercicios paso a paso.',
      ],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 45, descripcion: 'Comprender y transformar información cuantitativa', estado: 'reforzar' },
        { nombre: 'Formulación y Ejecución', puntaje: 38, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'reforzar' },
        { nombre: 'Argumentación', puntaje: 43, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m7', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 40, totalPreguntas: 20, aciertos: 8, tiempoMin: 44, estado: 'Crítico' },
        { id: 'ev-m8', titulo: 'Taller Razonamiento Cuantitativo', fecha: '01 Oct 2026', puntaje: 44, totalPreguntas: 15, aciertos: 6, tiempoMin: 46, estado: 'Crítico' },
      ],
    },
    {
      id: 'e2',
      nombre: 'Santiago Martínez Pérez',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'santiago.martinez@estudiante.edu.co',
      telefono: '+57 314 333 4455',
      ultimaActividad: 'Hace 5 horas',
      materia: 'matematicas',
      promedioMateria: 71,
      tendencia: 'up',
      estado: 'al_dia',
      evaluacionesRealizadas: 7,
      tasaAciertos: 72,
      tiempoPromedioMin: 27,
      diagnosticoDocente: 'Progreso constante. Resuelve bien la mayoría de problemas mecánicos pero duda en problemas contextuales de varios pasos.',
      temasDominados: ['Álgebra lineal', 'Estadística descriptiva (media, mediana, moda)', 'Geometría básica'],
      temasPorReforzar: ['Problemas de tasas de cambio', 'Probabilidad de eventos compuestos'],
      planRefuerzoSugerido: [
        'Reforzar lectura minuciosa de enunciados largos.',
        'Práctica de problemas combinados de dos o tres variables.',
      ],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 76, descripcion: 'Comprender y transformar información cuantitativa', estado: 'dominado' },
        { nombre: 'Formulación y Ejecución', puntaje: 70, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'en_progreso' },
        { nombre: 'Argumentación', puntaje: 67, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'en_progreso' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m9', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 68, totalPreguntas: 20, aciertos: 14, tiempoMin: 29, estado: 'Aprobado' },
        { id: 'ev-m10', titulo: 'Taller Razonamiento Cuantitativo', fecha: '01 Oct 2026', puntaje: 74, totalPreguntas: 15, aciertos: 11, tiempoMin: 26, estado: 'Aprobado' },
      ],
    },
    {
      id: 'e3',
      nombre: 'Isabella Torres Cárdenas',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'isabella.torres@estudiante.edu.co',
      telefono: '+57 318 777 8899',
      ultimaActividad: 'Ayer',
      materia: 'matematicas',
      promedioMateria: 59,
      tendencia: 'stable',
      estado: 'quedado',
      evaluacionesRealizadas: 5,
      tasaAciertos: 58,
      tiempoPromedioMin: 34,
      diagnosticoDocente: 'Está en zona de riesgo. Necesita consolidar conceptos antes de que la brecha aumente.',
      temasDominados: ['Operaciones básicas', 'Lectura de gráficos de barras'],
      temasPorReforzar: ['Razones trigonométricas (seno, coseno, tangente)', 'Función cuadrática y vértice'],
      planRefuerzoSugerido: [
        'Taller de trigonometría aplicada al triángulo rectángulo.',
        'Práctica con ejercicios interactivos de GeoGebra.',
      ],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 64, descripcion: 'Comprender y transformar información cuantitativa', estado: 'en_progreso' },
        { nombre: 'Formulación y Ejecución', puntaje: 56, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'reforzar' },
        { nombre: 'Argumentación', puntaje: 57, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m11', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 58, totalPreguntas: 20, aciertos: 12, tiempoMin: 35, estado: 'Requiere Refuerzo' },
        { id: 'ev-m12', titulo: 'Prueba Álgebra y Geometría I', fecha: '05 Oct 2026', puntaje: 60, totalPreguntas: 25, aciertos: 15, tiempoMin: 33, estado: 'Requiere Refuerzo' },
      ],
    },
    {
      id: 'e5',
      nombre: 'María José Ramírez',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'maria.ramirez@estudiante.edu.co',
      telefono: '+57 320 111 2233',
      ultimaActividad: 'Hace 3 días',
      materia: 'matematicas',
      promedioMateria: 66,
      tendencia: 'stable',
      estado: 'al_dia',
      evaluacionesRealizadas: 6,
      tasaAciertos: 65,
      tiempoPromedioMin: 30,
      diagnosticoDocente: 'Rendimiento aceptable, aunque debe ganar mayor rapidez en el cálculo mental.',
      temasDominados: ['Fracciones y decimales', 'Plano cartesiano'],
      temasPorReforzar: ['Probabilidad simple y combinatoria', 'Volúmenes de cilindros y conos'],
      planRefuerzoSugerido: [
        'Entrenamiento con cronómetro para agilidad mental.',
      ],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 70, descripcion: 'Comprender y transformar información cuantitativa', estado: 'en_progreso' },
        { nombre: 'Formulación y Ejecución', puntaje: 64, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'en_progreso' },
        { nombre: 'Argumentación', puntaje: 64, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'en_progreso' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m13', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 66, totalPreguntas: 20, aciertos: 13, tiempoMin: 30, estado: 'Aprobado' },
      ],
    },
    {
      id: 'e6',
      nombre: 'Andrés Felipe Castro',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'andres.castro@estudiante.edu.co',
      telefono: '+57 316 444 5566',
      ultimaActividad: 'Hace 6 horas',
      materia: 'matematicas',
      promedioMateria: 74,
      tendencia: 'up',
      estado: 'al_dia',
      evaluacionesRealizadas: 8,
      tasaAciertos: 75,
      tiempoPromedioMin: 26,
      diagnosticoDocente: 'Buen desempeño general en estadística y razonamiento aritmético.',
      temasDominados: ['Estadística descriptiva', 'Ecuaciones de primer grado'],
      temasPorReforzar: ['Funciones trigonométricas', 'Geometría del espacio'],
      planRefuerzoSugerido: ['Ejercicios de aplicación en física-matemática.'],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 78, descripcion: 'Comprender y transformar información cuantitativa', estado: 'dominado' },
        { nombre: 'Formulación y Ejecución', puntaje: 73, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'en_progreso' },
        { nombre: 'Argumentación', puntaje: 71, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'en_progreso' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m14', titulo: 'Prueba Álgebra y Geometría I', fecha: '05 Oct 2026', puntaje: 74, totalPreguntas: 25, aciertos: 18, tiempoMin: 26, estado: 'Aprobado' },
      ],
    },
    {
      id: 'e7',
      nombre: 'Camila Andrea Vargas',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'camila.vargas@estudiante.edu.co',
      telefono: '+57 317 888 9900',
      ultimaActividad: 'Hace 30 min',
      materia: 'matematicas',
      promedioMateria: 85,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 11,
      tasaAciertos: 86,
      tiempoPromedioMin: 23,
      diagnosticoDocente: 'Muy buen nivel analítico, precisión alta y buen manejo del tiempo.',
      temasDominados: ['Álgebra', 'Funciones', 'Geometría analítica', 'Probabilidad'],
      temasPorReforzar: ['Problemas no rutinarios de lógica matemática'],
      planRefuerzoSugerido: ['Banco de preguntas tipo Saber Pro y Olimpiadas.'],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 88, descripcion: 'Comprender y transformar información cuantitativa', estado: 'dominado' },
        { nombre: 'Formulación y Ejecución', puntaje: 84, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'dominado' },
        { nombre: 'Argumentación', puntaje: 83, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m15', titulo: 'Simulacro Diagnóstico Matemáticas', fecha: '28 Sep 2026', puntaje: 85, totalPreguntas: 20, aciertos: 17, tiempoMin: 23, estado: 'Excelente' },
      ],
    },
    {
      id: 'e10',
      nombre: 'Nicolás Alejandro Díaz',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'nicolas.diaz@estudiante.edu.co',
      telefono: '+57 319 666 7788',
      ultimaActividad: 'Ayer',
      materia: 'matematicas',
      promedioMateria: 80,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 7,
      tasaAciertos: 81,
      tiempoPromedioMin: 24,
      diagnosticoDocente: 'Excelente razonamiento lógico cuantitativo.',
      temasDominados: ['Geometría euclidiana', 'Álgebra de polinomios'],
      temasPorReforzar: ['Interpretación de sesgo en muestras estadísticas'],
      planRefuerzoSugerido: ['Ejercicios de muestreo e inferencia básica.'],
      competencias: [
        { nombre: 'Interpretación y Representación', puntaje: 82, descripcion: 'Comprender y transformar información cuantitativa', estado: 'dominado' },
        { nombre: 'Formulación y Ejecución', puntaje: 80, descripcion: 'Diseñar y ejecutar planes matemáticos para resolver problemas', estado: 'dominado' },
        { nombre: 'Argumentación', puntaje: 78, descripcion: 'Validar o refutar conclusiones matemáticas', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-m16', titulo: 'Prueba Álgebra y Geometría I', fecha: '05 Oct 2026', puntaje: 80, totalPreguntas: 25, aciertos: 20, tiempoMin: 24, estado: 'Excelente' },
      ],
    },
  ],

  lectura: [
    {
      id: 'e1',
      nombre: 'Valentina Gómez Ruiz',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'valentina.gomez@estudiante.edu.co',
      telefono: '+57 312 456 7890',
      ultimaActividad: 'Hace 2 horas',
      materia: 'lectura',
      promedioMateria: 89,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 9,
      tasaAciertos: 90,
      tiempoPromedioMin: 20,
      diagnosticoDocente: 'Lectora crítica excepcional. Identifica tesis, contraargumentos e intenciones del autor con gran agudeza.',
      temasDominados: ['Textos filosóficos', 'Ensayos argumentativos', 'Infografías y textos continuos y discontinuos'],
      temasPorReforzar: ['Vocabulario arcaico en literatura clásica'],
      planRefuerzoSugerido: ['Lectura guiada de textos del Siglo de Oro español.'],
      competencias: [
        { nombre: 'Identificar contenidos locales', puntaje: 94, descripcion: 'Entender el significado de palabras o frases locales', estado: 'dominado' },
        { nombre: 'Comprender articulación global', puntaje: 88, descripcion: 'Entender cómo se articulan las partes de un texto', estado: 'dominado' },
        { nombre: 'Reflexionar y evaluar', puntaje: 85, descripcion: 'Valorar la validez de los argumentos y posturas del texto', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-l1', titulo: 'Simulacro Lectura Crítica I', fecha: '27 Sep 2026', puntaje: 88, totalPreguntas: 20, aciertos: 18, tiempoMin: 21, estado: 'Excelente' },
        { id: 'ev-l2', titulo: 'Taller Textos Argumentativos', fecha: '02 Oct 2026', puntaje: 90, totalPreguntas: 15, aciertos: 14, tiempoMin: 19, estado: 'Excelente' },
      ],
    },
    {
      id: 'e6',
      nombre: 'Andrés Felipe Castro',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'andres.castro@estudiante.edu.co',
      telefono: '+57 316 444 5566',
      ultimaActividad: 'Hace 6 horas',
      materia: 'lectura',
      promedioMateria: 51,
      tendencia: 'down',
      estado: 'quedado',
      evaluacionesRealizadas: 5,
      tasaAciertos: 50,
      tiempoPromedioMin: 38,
      diagnosticoDocente: 'Se queda atrapado en el nivel literal. Le cuesta inferir la intención irónica o crítica de textos de opinión.',
      temasDominados: ['Lectura informativa básica', 'Resumen cronológico de hechos'],
      temasPorReforzar: ['Detección de falacias argumentativas', 'Identificación de tonos (satírico, reflexivo)', 'Comprensión de caricaturas políticas'],
      planRefuerzoSugerido: [
        'Taller semanal de lectura de editoriales y columnas de opinión.',
        'Guía de análisis de textos discontinuos (caricaturas y afiches).',
      ],
      competencias: [
        { nombre: 'Identificar contenidos locales', puntaje: 65, descripcion: 'Entender el significado de palabras o frases locales', estado: 'en_progreso' },
        { nombre: 'Comprender articulación global', puntaje: 48, descripcion: 'Entender cómo se articulan las partes de un texto', estado: 'reforzar' },
        { nombre: 'Reflexionar y evaluar', puntaje: 40, descripcion: 'Valorar la validez de los argumentos y posturas del texto', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-l3', titulo: 'Simulacro Lectura Crítica I', fecha: '27 Sep 2026', puntaje: 50, totalPreguntas: 20, aciertos: 10, tiempoMin: 40, estado: 'Requiere Refuerzo' },
        { id: 'ev-l4', titulo: 'Taller Textos Argumentativos', fecha: '02 Oct 2026', puntaje: 52, totalPreguntas: 15, aciertos: 8, tiempoMin: 36, estado: 'Requiere Refuerzo' },
      ],
    },
    {
      id: 'e5',
      nombre: 'María José Ramírez',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'maria.ramirez@estudiante.edu.co',
      telefono: '+57 320 111 2233',
      ultimaActividad: 'Hace 3 días',
      materia: 'lectura',
      promedioMateria: 82,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 7,
      tasaAciertos: 83,
      tiempoPromedioMin: 22,
      diagnosticoDocente: 'Muy buena comprensión e interpretación de ensayos contemporáneos.',
      temasDominados: ['Identificación de ideas centrales', 'Textos narrativos', 'Crónicas'],
      temasPorReforzar: ['Textos filosóficos presocráticos'],
      planRefuerzoSugerido: ['Lecturas de apoyo sobre historia de la filosofía occidental.'],
      competencias: [
        { nombre: 'Identificar contenidos locales', puntaje: 86, descripcion: 'Entender el significado de palabras o frases locales', estado: 'dominado' },
        { nombre: 'Comprender articulación global', puntaje: 82, descripcion: 'Entender cómo se articulan las partes de un texto', estado: 'dominado' },
        { nombre: 'Reflexionar y evaluar', puntaje: 78, descripcion: 'Valorar la validez de los argumentos y posturas del texto', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-l5', titulo: 'Simulacro Lectura Crítica I', fecha: '27 Sep 2026', puntaje: 82, totalPreguntas: 20, aciertos: 16, tiempoMin: 22, estado: 'Excelente' },
      ],
    },
    {
      id: 'e9',
      nombre: 'Laura Sofía Herrera',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'laura.herrera@estudiante.edu.co',
      telefono: '+57 313 555 6677',
      ultimaActividad: 'Hace 8 horas',
      materia: 'lectura',
      promedioMateria: 86,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 8,
      tasaAciertos: 87,
      tiempoPromedioMin: 21,
      diagnosticoDocente: 'Destacada agilidad lectora y precisión evaluativa.',
      temasDominados: ['Ensayos literarios', 'Textos discontinuos'],
      temasPorReforzar: ['Identificación de premisas implícitas'],
      planRefuerzoSugerido: ['Taller avanzado de lógica proposicional aplicada a textos.'],
      competencias: [
        { nombre: 'Identificar contenidos locales', puntaje: 90, descripcion: 'Entender el significado de palabras o frases locales', estado: 'dominado' },
        { nombre: 'Comprender articulación global', puntaje: 86, descripcion: 'Entender cómo se articulan las partes de un texto', estado: 'dominado' },
        { nombre: 'Reflexionar y evaluar', puntaje: 82, descripcion: 'Valorar la validez de los argumentos y posturas del texto', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-l6', titulo: 'Simulacro Lectura Crítica I', fecha: '27 Sep 2026', puntaje: 86, totalPreguntas: 20, aciertos: 17, tiempoMin: 21, estado: 'Excelente' },
      ],
    },
    {
      id: 'e8',
      nombre: 'Daniel Felipe Ospina',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'daniel.ospina@estudiante.edu.co',
      telefono: '+57 311 234 5678',
      ultimaActividad: 'Hace 4 días',
      materia: 'lectura',
      promedioMateria: 48,
      tendencia: 'down',
      estado: 'critico',
      evaluacionesRealizadas: 3,
      tasaAciertos: 46,
      tiempoPromedioMin: 42,
      diagnosticoDocente: '¡REQUIERE REFUERZO URGENTE! Abandona lecturas largas, baja retención y dificultades para distinguir tesis de ejemplos.',
      temasDominados: ['Textos publicitarios cortos'],
      temasPorReforzar: ['Lectura fluida y sostenida', 'Estructura del texto argumentativo', 'Idea principal vs secundaria'],
      planRefuerzoSugerido: [
        'Lecturas cortas progresivas de 3 minutos con preguntas inmediatas.',
        'Asignación de tutor estudiantil de apoyo.',
      ],
      competencias: [
        { nombre: 'Identificar contenidos locales', puntaje: 55, descripcion: 'Entender el significado de palabras o frases locales', estado: 'reforzar' },
        { nombre: 'Comprender articulación global', puntaje: 45, descripcion: 'Entender cómo se articulan las partes de un texto', estado: 'reforzar' },
        { nombre: 'Reflexionar y evaluar', puntaje: 44, descripcion: 'Valorar la validez de los argumentos y posturas del texto', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-l7', titulo: 'Simulacro Lectura Crítica I', fecha: '27 Sep 2026', puntaje: 48, totalPreguntas: 20, aciertos: 9, tiempoMin: 42, estado: 'Crítico' },
      ],
    },
  ],

  ciencias: [
    {
      id: 'e2',
      nombre: 'Santiago Martínez Pérez',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'santiago.martinez@estudiante.edu.co',
      telefono: '+57 314 333 4455',
      ultimaActividad: 'Hace 5 horas',
      materia: 'ciencias',
      promedioMateria: 87,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 8,
      tasaAciertos: 88,
      tiempoPromedioMin: 24,
      diagnosticoDocente: 'Gran dominio del método científico, comprensión de leyes físicas y balanceo de reacciones químicas.',
      temasDominados: ['Genética mendeliana', 'Leyes de Newton', 'Cinemática y dinámica', 'Estequiometría'],
      temasPorReforzar: ['Termodinámica aplicada'],
      planRefuerzoSugerido: ['Problemas avanzados de ciclos termodinámicos y entropía.'],
      competencias: [
        { nombre: 'Uso comprensivo del conocimiento científico', puntaje: 90, descripcion: 'Asociar fenómenos con conceptos y leyes de la ciencia', estado: 'dominado' },
        { nombre: 'Explicación de fenómenos', puntaje: 86, descripcion: 'Construir explicaciones y justificar hipótesis', estado: 'dominado' },
        { nombre: 'Indagación', puntaje: 85, descripcion: 'Comprender cómo se generan preguntas y procedimientos científicos', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-c1', titulo: 'Simulacro Ciencias Naturales ICFES', fecha: '26 Sep 2026', puntaje: 87, totalPreguntas: 25, aciertos: 22, tiempoMin: 24, estado: 'Excelente' },
      ],
    },
    {
      id: 'e5',
      nombre: 'María José Ramírez',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'maria.ramirez@estudiante.edu.co',
      telefono: '+57 320 111 2233',
      ultimaActividad: 'Hace 3 días',
      materia: 'ciencias',
      promedioMateria: 47,
      tendencia: 'down',
      estado: 'critico',
      evaluacionesRealizadas: 4,
      tasaAciertos: 45,
      tiempoPromedioMin: 41,
      diagnosticoDocente: 'Dificultad crítica en interpretación de experimentos químicos y leyes de conservación de masa/energía.',
      temasDominados: ['Ecología básica y cadenas tróficas'],
      temasPorReforzar: ['Balanceo químico', 'Soluciones y molaridad', 'Circuitos eléctricos simples (ley de Ohm)', 'Conservación de energía mecánica'],
      planRefuerzoSugerido: [
        'Taller de laboratorio virtual PhET sobre circuitos y soluciones.',
        'Sesión de refuerzo personalizada de química inorgánica.',
      ],
      competencias: [
        { nombre: 'Uso comprensivo del conocimiento científico', puntaje: 48, descripcion: 'Asociar fenómenos con conceptos y leyes de la ciencia', estado: 'reforzar' },
        { nombre: 'Explicación de fenómenos', puntaje: 46, descripcion: 'Construir explicaciones y justificar hipótesis', estado: 'reforzar' },
        { nombre: 'Indagación', puntaje: 47, descripcion: 'Comprender cómo se generan preguntas y procedimientos científicos', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-c2', titulo: 'Simulacro Ciencias Naturales ICFES', fecha: '26 Sep 2026', puntaje: 47, totalPreguntas: 25, aciertos: 11, tiempoMin: 41, estado: 'Crítico' },
      ],
    },
    {
      id: 'e9',
      nombre: 'Laura Sofía Herrera',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'laura.herrera@estudiante.edu.co',
      telefono: '+57 313 555 6677',
      ultimaActividad: 'Hace 8 horas',
      materia: 'ciencias',
      promedioMateria: 53,
      tendencia: 'down',
      estado: 'quedado',
      evaluacionesRealizadas: 5,
      tasaAciertos: 52,
      tiempoPromedioMin: 36,
      diagnosticoDocente: 'Quedada en la parte de física ondulatoria y cinemática. En biología le va bien.',
      temasDominados: ['Célula y organelos', 'Fotosíntesis y respiración celular'],
      temasPorReforzar: ['Ondas (sonido, luz, refracción)', 'Fuerzas de rozamiento y diagramas de cuerpo libre'],
      planRefuerzoSugerido: ['Módulo remedial de física mecánica y ondas.'],
      competencias: [
        { nombre: 'Uso comprensivo del conocimiento científico', puntaje: 58, descripcion: 'Asociar fenómenos con conceptos y leyes de la ciencia', estado: 'en_progreso' },
        { nombre: 'Explicación de fenómenos', puntaje: 50, descripcion: 'Construir explicaciones y justificar hipótesis', estado: 'reforzar' },
        { nombre: 'Indagación', puntaje: 51, descripcion: 'Comprender cómo se generan preguntas y procedimientos científicos', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-c3', titulo: 'Simulacro Ciencias Naturales ICFES', fecha: '26 Sep 2026', puntaje: 53, totalPreguntas: 25, aciertos: 13, tiempoMin: 36, estado: 'Requiere Refuerzo' },
      ],
    },
    {
      id: 'e8',
      nombre: 'Daniel Felipe Ospina',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'daniel.ospina@estudiante.edu.co',
      telefono: '+57 311 234 5678',
      ultimaActividad: 'Hace 4 días',
      materia: 'ciencias',
      promedioMateria: 75,
      tendencia: 'up',
      estado: 'al_dia',
      evaluacionesRealizadas: 6,
      tasaAciertos: 76,
      tiempoPromedioMin: 28,
      diagnosticoDocente: 'Muestra buen interés y rendimiento positivo en biología e indagación ambiental.',
      temasDominados: ['Ecosistemas colombianos', 'Evolución darwiniana'],
      temasPorReforzar: ['Estequiometría de gases ideales'],
      planRefuerzoSugerido: ['Ejercicios de la ley de los gases ideales.'],
      competencias: [
        { nombre: 'Uso comprensivo del conocimiento científico', puntaje: 74, descripcion: 'Asociar fenómenos con conceptos y leyes de la ciencia', estado: 'en_progreso' },
        { nombre: 'Explicación de fenómenos', puntaje: 76, descripcion: 'Construir explicaciones y justificar hipótesis', estado: 'dominado' },
        { nombre: 'Indagación', puntaje: 75, descripcion: 'Comprender cómo se generan preguntas y procedimientos científicos', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-c4', titulo: 'Simulacro Ciencias Naturales ICFES', fecha: '26 Sep 2026', puntaje: 75, totalPreguntas: 25, aciertos: 19, tiempoMin: 28, estado: 'Aprobado' },
      ],
    },
  ],

  sociales: [
    {
      id: 'e3',
      nombre: 'Isabella Torres Cárdenas',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'isabella.torres@estudiante.edu.co',
      telefono: '+57 318 777 8899',
      ultimaActividad: 'Ayer',
      materia: 'sociales',
      promedioMateria: 86,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 7,
      tasaAciertos: 87,
      tiempoPromedioMin: 21,
      diagnosticoDocente: 'Manejo impecable de la Constitución de 1991, mecanismos de participación ciudadana y análisis multiperspectivista.',
      temasDominados: ['Acción de tutela y derechos fundamentales', 'Ramas del poder público en Colombia', 'Historia siglo XX'],
      temasPorReforzar: ['Modelos de desarrollo económico y globalización'],
      planRefuerzoSugerido: ['Lectura de análisis sobre política fiscal y monetaria.'],
      competencias: [
        { nombre: 'Pensamiento social', puntaje: 89, descripcion: 'Usar conceptos básicos de las ciencias sociales', estado: 'dominado' },
        { nombre: 'Interpretación y análisis de perspectivas', puntaje: 86, descripcion: 'Reconocer perspectivas de distintos actores sociales', estado: 'dominado' },
        { nombre: 'Pensamiento reflexivo y sistémico', puntaje: 83, descripcion: 'Comprender la realidad social como un sistema', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-s1', titulo: 'Simulacro Sociales y Ciudadanas', fecha: '29 Sep 2026', puntaje: 86, totalPreguntas: 20, aciertos: 17, tiempoMin: 21, estado: 'Excelente' },
      ],
    },
    {
      id: 'e7',
      nombre: 'Camila Andrea Vargas',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'camila.vargas@estudiante.edu.co',
      telefono: '+57 317 888 9900',
      ultimaActividad: 'Hace 30 min',
      materia: 'sociales',
      promedioMateria: 56,
      tendencia: 'down',
      estado: 'quedado',
      evaluacionesRealizadas: 5,
      tasaAciertos: 55,
      tiempoPromedioMin: 35,
      diagnosticoDocente: 'Confunde los mecanismos de protección de derechos (tutela vs acción popular) y períodos del conflicto armado.',
      temasDominados: ['Geografía física de Colombia'],
      temasPorReforzar: ['Mecanismos constitucionales de participación', 'Frente Nacional y violencia bipartidista', 'Conceptos de Estado social de derecho'],
      planRefuerzoSugerido: [
        'Cuadro comparativo de mecanismos de protección ciudadana.',
        'Línea de tiempo interactiva de historia contemporánea de Colombia.',
      ],
      competencias: [
        { nombre: 'Pensamiento social', puntaje: 58, descripcion: 'Usar conceptos básicos de las ciencias sociales', estado: 'en_progreso' },
        { nombre: 'Interpretación y análisis de perspectivas', puntaje: 54, descripcion: 'Reconocer perspectivas de distintos actores sociales', estado: 'reforzar' },
        { nombre: 'Pensamiento reflexivo y sistémico', puntaje: 56, descripcion: 'Comprender la realidad social como un sistema', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-s2', titulo: 'Simulacro Sociales y Ciudadanas', fecha: '29 Sep 2026', puntaje: 56, totalPreguntas: 20, aciertos: 11, tiempoMin: 35, estado: 'Requiere Refuerzo' },
      ],
    },
    {
      id: 'e6',
      nombre: 'Andrés Felipe Castro',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'andres.castro@estudiante.edu.co',
      telefono: '+57 316 444 5566',
      ultimaActividad: 'Hace 6 horas',
      materia: 'sociales',
      promedioMateria: 81,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 6,
      tasaAciertos: 82,
      tiempoPromedioMin: 23,
      diagnosticoDocente: 'Excelente postura crítica y comprensión de dinámicas geopolíticas.',
      temasDominados: ['Conflicto armado colombiano', 'Derechos humanos', 'Geopolítica mundial'],
      temasPorReforzar: ['Estructura de los organismos de control (Procuraduría, Contraloría, Defensoría)'],
      planRefuerzoSugerido: ['Esquema visual de órganos autónomos del Estado.'],
      competencias: [
        { nombre: 'Pensamiento social', puntaje: 83, descripcion: 'Usar conceptos básicos de las ciencias sociales', estado: 'dominado' },
        { nombre: 'Interpretación y análisis de perspectivas', puntaje: 81, descripcion: 'Reconocer perspectivas de distintos actores sociales', estado: 'dominado' },
        { nombre: 'Pensamiento reflexivo y sistémico', puntaje: 79, descripcion: 'Comprender la realidad social como un sistema', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-s3', titulo: 'Simulacro Sociales y Ciudadanas', fecha: '29 Sep 2026', puntaje: 81, totalPreguntas: 20, aciertos: 16, tiempoMin: 23, estado: 'Excelente' },
      ],
    },
  ],

  ingles: [
    {
      id: 'e7',
      nombre: 'Camila Andrea Vargas',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'camila.vargas@estudiante.edu.co',
      telefono: '+57 317 888 9900',
      ultimaActividad: 'Hace 30 min',
      materia: 'ingles',
      promedioMateria: 92,
      tendencia: 'up',
      estado: 'sobresaliente',
      evaluacionesRealizadas: 10,
      tasaAciertos: 93,
      tiempoPromedioMin: 18,
      diagnosticoDocente: 'Nivel B1+/B2 consolidado. Responde todas las partes de la prueba Saber 11 con rapidez y precisión.',
      temasDominados: ['Part 1-7 completas', 'Tiempos verbales complejos', 'Phrasal verbs y modales'],
      temasPorReforzar: ['Expresiones idiomáticas avanzadas'],
      planRefuerzoSugerido: ['Material de nivel B2 Cambridge / TOEFL Junior.'],
      competencias: [
        { nombre: 'Vocabulario y avisos (Partes 1-3)', puntaje: 96, descripcion: 'Asociación de definiciones y conversaciones cotidianas', estado: 'dominado' },
        { nombre: 'Gramática contextual (Partes 4-5)', puntaje: 90, descripcion: 'Textos incompletos y opciones gramaticales', estado: 'dominado' },
        { nombre: 'Comprensión de lectura profunda (Partes 6-7)', puntaje: 90, descripcion: 'Inferencia del punto de vista del autor en inglés', estado: 'dominado' },
      ],
      historialEvaluaciones: [
        { id: 'ev-i1', titulo: 'Simulacro Inglés Saber 11', fecha: '30 Sep 2026', puntaje: 92, totalPreguntas: 25, aciertos: 23, tiempoMin: 18, estado: 'Excelente' },
      ],
    },
    {
      id: 'e2',
      nombre: 'Santiago Martínez Pérez',
      grado: '11°A',
      institucion: 'I.E. Simón Bolívar',
      correo: 'santiago.martinez@estudiante.edu.co',
      telefono: '+57 314 333 4455',
      ultimaActividad: 'Hace 5 horas',
      materia: 'ingles',
      promedioMateria: 44,
      tendencia: 'down',
      estado: 'critico',
      evaluacionesRealizadas: 4,
      tasaAciertos: 42,
      tiempoPromedioMin: 40,
      diagnosticoDocente: '¡EN RIESGO EN INGLÉS! Vocabulario muy limitado. Se pierde en Partes 4 a 7 (textos narrativos y gramática contextual).',
      temasDominados: ['Avisos públicos sencillos (Parte 1)'],
      temasPorReforzar: ['Tiempos verbales pasados (Simple Past vs Present Perfect)', 'Preposiciones de lugar y tiempo', 'Lectura de párrafos descriptivos en inglés'],
      planRefuerzoSugerido: [
        'Guía básica de vocabulario frecuente Saber 11 (200 palabras clave).',
        'Práctica diaria de 10 minutos con flashcards interactivas de gramática.',
      ],
      competencias: [
        { nombre: 'Vocabulario y avisos (Partes 1-3)', puntaje: 58, descripcion: 'Asociación de definiciones y conversaciones cotidianas', estado: 'en_progreso' },
        { nombre: 'Gramática contextual (Partes 4-5)', puntaje: 38, descripcion: 'Textos incompletos y opciones gramaticales', estado: 'reforzar' },
        { nombre: 'Comprensión de lectura profunda (Partes 6-7)', puntaje: 36, descripcion: 'Inferencia del punto de vista del autor en inglés', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-i2', titulo: 'Simulacro Inglés Saber 11', fecha: '30 Sep 2026', puntaje: 44, totalPreguntas: 25, aciertos: 11, tiempoMin: 40, estado: 'Crítico' },
      ],
    },
    {
      id: 'e4',
      nombre: 'Juan Esteban Rodríguez',
      grado: '11°B',
      institucion: 'I.E. Simón Bolívar',
      correo: 'juan.rodriguez@estudiante.edu.co',
      telefono: '+57 315 987 6543',
      ultimaActividad: 'Hace 1 hora',
      materia: 'ingles',
      promedioMateria: 52,
      tendencia: 'down',
      estado: 'quedado',
      evaluacionesRealizadas: 5,
      tasaAciertos: 51,
      tiempoPromedioMin: 37,
      diagnosticoDocente: 'Quedado en las lecturas largas. A pesar de ser muy bueno en matemáticas, inglés le baja el promedio ponderado.',
      temasDominados: ['Saludos y vocabulario de objetos escolares'],
      temasPorReforzar: ['Conectores lógicos en inglés (However, Therefore, Although)', 'Voz pasiva'],
      planRefuerzoSugerido: ['Taller de conectores y cohesión en textos en inglés.'],
      competencias: [
        { nombre: 'Vocabulario y avisos (Partes 1-3)', puntaje: 62, descripcion: 'Asociación de definiciones y conversaciones cotidianas', estado: 'en_progreso' },
        { nombre: 'Gramática contextual (Partes 4-5)', puntaje: 49, descripcion: 'Textos incompletos y opciones gramaticales', estado: 'reforzar' },
        { nombre: 'Comprensión de lectura profunda (Partes 6-7)', puntaje: 45, descripcion: 'Inferencia del punto de vista del autor en inglés', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-i3', titulo: 'Simulacro Inglés Saber 11', fecha: '30 Sep 2026', puntaje: 52, totalPreguntas: 25, aciertos: 13, tiempoMin: 37, estado: 'Requiere Refuerzo' },
      ],
    },
    {
      id: 'e10',
      nombre: 'Nicolás Alejandro Díaz',
      grado: '11°C',
      institucion: 'I.E. Simón Bolívar',
      correo: 'nicolas.diaz@estudiante.edu.co',
      telefono: '+57 319 666 7788',
      ultimaActividad: 'Ayer',
      materia: 'ingles',
      promedioMateria: 55,
      tendencia: 'stable',
      estado: 'quedado',
      evaluacionesRealizadas: 5,
      tasaAciertos: 54,
      tiempoPromedioMin: 35,
      diagnosticoDocente: 'Necesita reforzar comprensión lectora en textos medianos de divulgación.',
      temasDominados: ['Avisos y diálogos cortos'],
      temasPorReforzar: ['Partes 6 y 7 de la prueba Saber 11'],
      planRefuerzoSugerido: ['Lectura de noticias cortas en inglés adaptadas.'],
      competencias: [
        { nombre: 'Vocabulario y avisos (Partes 1-3)', puntaje: 64, descripcion: 'Asociación de definiciones y conversaciones cotidianas', estado: 'en_progreso' },
        { nombre: 'Gramática contextual (Partes 4-5)', puntaje: 52, descripcion: 'Textos incompletos y opciones gramaticales', estado: 'reforzar' },
        { nombre: 'Comprensión de lectura profunda (Partes 6-7)', puntaje: 49, descripcion: 'Inferencia del punto de vista del autor en inglés', estado: 'reforzar' },
      ],
      historialEvaluaciones: [
        { id: 'ev-i4', titulo: 'Simulacro Inglés Saber 11', fecha: '30 Sep 2026', puntaje: 55, totalPreguntas: 25, aciertos: 14, tiempoMin: 35, estado: 'Requiere Refuerzo' },
      ],
    },
  ],
}

const STORAGE_OBSERVACIONES_PREFIX = 'impulsasaber_obs_docente_'

export function obtenerObservacionesDocente(materiaId: AreaId): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const data = localStorage.getItem(`${STORAGE_OBSERVACIONES_PREFIX}${materiaId}`)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export function guardarObservacionDocente(
  materiaId: AreaId,
  estudianteId: string,
  observacion: string
) {
  if (typeof window === 'undefined') return
  try {
    const actuales = obtenerObservacionesDocente(materiaId)
    actuales[estudianteId] = observacion
    localStorage.setItem(
      `${STORAGE_OBSERVACIONES_PREFIX}${materiaId}`,
      JSON.stringify(actuales)
    )
  } catch (err) {
    console.error('Error guardando observación:', err)
  }
}

export function obtenerEstudiantesPorMateria(materiaId: AreaId): DetalleEstudianteMateria[] {
  const lista = baseEstudiantesPorMateria[materiaId] || []
  const observaciones = obtenerObservacionesDocente(materiaId)
  const institucionPorEstudiante: Record<string, string> = {
    e1: 'Colegio Nacional Simón Bolívar (CNSB)',
    e2: 'Colegio Nacional Simón Bolívar (CNSB)',
    e3: 'Institución Educativa Policarpa Salavarrieta (IPSA)',
    e4: 'Institución Educativa Policarpa Salavarrieta (IPSA)',
    e5: 'Institución Educativa Providencia',
    e6: 'Institución Educativa Providencia',
    e7: 'Institución Educativa San Juan Bautista',
    e8: 'Institución Educativa San Juan Bautista',
    e9: 'Institución Educativa Nuestra Señora de Lourdes',
    e10: 'Institución Educativa Nuestra Señora de Lourdes',
  }

  return lista.map((est) => ({
    ...est,
    institucion: est.institucion === 'I.E. Simón Bolívar'
      ? institucionPorEstudiante[est.id] ?? est.institucion
      : est.institucion,
    observacionGuardada: observaciones[est.id] || '',
  }))
}

export function obtenerEstudianteDetallePorMateria(
  estudianteId: string,
  materiaId: AreaId
): DetalleEstudianteMateria | undefined {
  const lista = obtenerEstudiantesPorMateria(materiaId)
  return lista.find((e) => e.id === estudianteId)
}

export function obtenerMetricasMateria(materiaId: AreaId) {
  const estudiantes = obtenerEstudiantesPorMateria(materiaId)
  const total = estudiantes.length

  if (total === 0) {
    return {
      total: 0,
      promedioGeneral: 0,
      sobresalientes: 0,
      alDia: 0,
      quedados: 0,
      criticos: 0,
      tasaAprobacion: 0,
      requierenRefuerzoTotal: 0,
    }
  }

  const suma = estudiantes.reduce((acc, e) => acc + e.promedioMateria, 0)
  const promedioGeneral = Math.round(suma / total)

  const sobresalientes = estudiantes.filter((e) => e.estado === 'sobresaliente').length
  const alDia = estudiantes.filter((e) => e.estado === 'al_dia').length
  const quedados = estudiantes.filter((e) => e.estado === 'quedado').length
  const criticos = estudiantes.filter((e) => e.estado === 'critico').length

  const aprobados = sobresalientes + alDia
  const tasaAprobacion = Math.round((aprobados / total) * 100)

  return {
    total,
    promedioGeneral,
    sobresalientes,
    alDia,
    quedados,
    criticos,
    tasaAprobacion,
    requierenRefuerzoTotal: quedados + criticos,
  }
}
