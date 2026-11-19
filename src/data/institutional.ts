export interface EstudianteInstitucional {
  id: string
  nombre: string
  grado: string
  simulacrosPresentados: number
  puntajePromedio: number
  ultimaActividad: string
  tendencia: 'up' | 'down' | 'stable'
  areaMasFuerte: string
  areaMasDebil: string
}

export const estudiantesInstitucion: EstudianteInstitucional[] = [
  { id: 'e1', nombre: 'Valentina Gómez Ruiz', grado: '11°A', simulacrosPresentados: 14, puntajePromedio: 372, ultimaActividad: 'Hace 2 horas', tendencia: 'up', areaMasFuerte: 'Lectura Crítica', areaMasDebil: 'Matemáticas' },
  { id: 'e2', nombre: 'Santiago Martínez Pérez', grado: '11°A', simulacrosPresentados: 11, puntajePromedio: 341, ultimaActividad: 'Hace 5 horas', tendencia: 'up', areaMasFuerte: 'Ciencias Naturales', areaMasDebil: 'Inglés' },
  { id: 'e3', nombre: 'Isabella Torres Cárdenas', grado: '11°B', simulacrosPresentados: 9, puntajePromedio: 298, ultimaActividad: 'Ayer', tendencia: 'stable', areaMasFuerte: 'Sociales', areaMasDebil: 'Matemáticas' },
  { id: 'e4', nombre: 'Juan Esteban Rodríguez', grado: '11°B', simulacrosPresentados: 16, puntajePromedio: 389, ultimaActividad: 'Hace 1 hora', tendencia: 'up', areaMasFuerte: 'Matemáticas', areaMasDebil: 'Inglés' },
  { id: 'e5', nombre: 'María José Ramírez', grado: '11°A', simulacrosPresentados: 7, puntajePromedio: 264, ultimaActividad: 'Hace 3 días', tendencia: 'down', areaMasFuerte: 'Lectura Crítica', areaMasDebil: 'Ciencias Naturales' },
  { id: 'e6', nombre: 'Andrés Felipe Castro', grado: '11°C', simulacrosPresentados: 12, puntajePromedio: 315, ultimaActividad: 'Hace 6 horas', tendencia: 'stable', areaMasFuerte: 'Sociales', areaMasDebil: 'Lectura Crítica' },
  { id: 'e7', nombre: 'Camila Andrea Vargas', grado: '11°C', simulacrosPresentados: 18, puntajePromedio: 401, ultimaActividad: 'Hace 30 min', tendencia: 'up', areaMasFuerte: 'Inglés', areaMasDebil: 'Sociales' },
  { id: 'e8', nombre: 'Daniel Felipe Ospina', grado: '11°B', simulacrosPresentados: 5, puntajePromedio: 241, ultimaActividad: 'Hace 4 días', tendencia: 'down', areaMasFuerte: 'Ciencias Naturales', areaMasDebil: 'Matemáticas' },
  { id: 'e9', nombre: 'Laura Sofía Herrera', grado: '11°A', simulacrosPresentados: 13, puntajePromedio: 356, ultimaActividad: 'Hace 8 horas', tendencia: 'up', areaMasFuerte: 'Lectura Crítica', areaMasDebil: 'Ciencias Naturales' },
  { id: 'e10', nombre: 'Nicolás Alejandro Díaz', grado: '11°C', simulacrosPresentados: 10, puntajePromedio: 288, ultimaActividad: 'Ayer', tendencia: 'stable', areaMasFuerte: 'Matemáticas', areaMasDebil: 'Inglés' },
]

export const resumenInstitucional = {
  nombreInstitucion: 'I.E. Simón Bolívar',
  totalEstudiantes: 96,
  simulacrosDelMes: 214,
  puntajePromedioGeneral: 322,
  porcentajeMetaSaber11: 68,
}

export const promedioPorArea = [
  { area: 'Matemáticas', promedio: 62 },
  { area: 'Lectura Crítica', promedio: 71 },
  { area: 'C. Naturales', promedio: 58 },
  { area: 'Sociales', promedio: 65 },
  { area: 'Inglés', promedio: 54 },
]

export interface InstitucionAliada {
  id: string
  nombre: string
  sigla?: string
  municipio: string
  departamento: string
}

export interface GrupoMunicipioInstituciones {
  municipio: string
  departamento: string
  instituciones: {
    id: string
    nombre: string
    sigla?: string
  }[]
}

export const institucionesAliadasPorMunicipio: GrupoMunicipioInstituciones[] = [
  {
    municipio: 'Samaniego',
    departamento: 'Nariño',
    instituciones: [
      {
        id: 'ipsa',
        nombre: 'Institución Educativa Policarpa Salavarrieta',
        sigla: 'IPSA',
      },
      {
        id: 'cnsb',
        nombre: 'Colegio Nacional Simón Bolívar',
        sigla: 'CNSB',
      },
    ],
  },
  {
    municipio: 'Providencia',
    departamento: 'Nariño',
    instituciones: [
      {
        id: 'ie-providencia',
        nombre: 'Institución Educativa Providencia',
        sigla: 'I.E. Providencia',
      },
    ],
  },
  {
    municipio: 'Santa Cruz de Guachavez',
    departamento: 'Nariño',
    instituciones: [
      {
        id: 'ie-sanjuan',
        nombre: 'Institución Educativa San Juan Bautista',
        sigla: 'I.E. San Juan Bautista',
      },
      {
        id: 'ie-lourdes',
        nombre: 'Institución Educativa Nuestra Señora de Lourdes',
        sigla: 'I.E. Ntra. Sra. de Lourdes',
      },
    ],
  },
]

export const institucionesAliadas: InstitucionAliada[] = [
  {
    id: 'ipsa',
    nombre: 'Institución Educativa Policarpa Salavarrieta',
    sigla: 'IPSA',
    municipio: 'Samaniego',
    departamento: 'Nariño',
  },
  {
    id: 'cnsb',
    nombre: 'Colegio Nacional Simón Bolívar',
    sigla: 'CNSB',
    municipio: 'Samaniego',
    departamento: 'Nariño',
  },
  {
    id: 'ie-providencia',
    nombre: 'Institución Educativa Providencia',
    sigla: 'I.E. Providencia',
    municipio: 'Providencia',
    departamento: 'Nariño',
  },
  {
    id: 'ie-sanjuan',
    nombre: 'Institución Educativa San Juan Bautista',
    sigla: 'I.E. San Juan Bautista',
    municipio: 'Santa Cruz de Guachavez',
    departamento: 'Nariño',
  },
  {
    id: 'ie-lourdes',
    nombre: 'Institución Educativa Nuestra Señora de Lourdes',
    sigla: 'I.E. Ntra. Sra. de Lourdes',
    municipio: 'Santa Cruz de Guachavez',
    departamento: 'Nariño',
  },
]
