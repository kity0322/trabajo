export interface InstitucionEducativa {
  id: string
  nombre: string
  sigla: string
  municipio: string
  sectorNombre: string
  tipo: 'Urbano' | 'Rural'
  direccion?: string
  estudiantesRegistrados: number
  puntajePromedioSector: number
}

export interface SectorTerritorial {
  id: string
  nombre: string
  municipio: string
  departamento: string
  totalEstudiantes: number
  totalColegios: number
  puntajePromedioSaber11: number
  metaInstitucional: number
  areaMayorRendimiento: string
  areaMayorRefuerzo: string
  color: string
}

export const sectoresTerritoriales: SectorTerritorial[] = [
  {
    id: 'sec-samaniego',
    nombre: 'Sector Samaniego (Urbano & Rural)',
    municipio: 'Samaniego',
    departamento: 'Nariño',
    totalEstudiantes: 54,
    totalColegios: 2,
    puntajePromedioSaber11: 338,
    metaInstitucional: 350,
    areaMayorRendimiento: 'Lectura Crítica (74 pts)',
    areaMayorRefuerzo: 'Matemáticas (58 pts)',
    color: 'from-blue-700 to-navy-900',
  },
  {
    id: 'sec-providencia',
    nombre: 'Sector Providencia (Centro & Veredas)',
    municipio: 'Providencia',
    departamento: 'Nariño',
    totalEstudiantes: 28,
    totalColegios: 1,
    puntajePromedioSaber11: 312,
    metaInstitucional: 340,
    areaMayorRendimiento: 'Ciencias Naturales (68 pts)',
    areaMayorRefuerzo: 'Inglés (48 pts)',
    color: 'from-emerald-700 to-teal-900',
  },
  {
    id: 'sec-guachavez',
    nombre: 'Sector Santa Cruz de Guachavez',
    municipio: 'Santa Cruz de Guachavez',
    departamento: 'Nariño',
    totalEstudiantes: 36,
    totalColegios: 2,
    puntajePromedioSaber11: 304,
    metaInstitucional: 335,
    areaMayorRendimiento: 'Sociales y Ciudadanas (69 pts)',
    areaMayorRefuerzo: 'Matemáticas (52 pts)',
    color: 'from-amber-700 to-orange-950',
  },
]

export const catalogoInstituciones: InstitucionEducativa[] = [
  {
    id: 'cnsb',
    nombre: 'Colegio Nacional Simón Bolívar (CNSB)',
    sigla: 'CNSB',
    municipio: 'Samaniego',
    sectorNombre: 'Sector Samaniego (Urbano & Rural)',
    tipo: 'Urbano',
    direccion: 'Carrera 4 # 5-20, Centro, Samaniego',
    estudiantesRegistrados: 32,
    puntajePromedioSector: 344,
  },
  {
    id: 'ipsa',
    nombre: 'Institución Educativa Policarpa Salavarrieta (IPSA)',
    sigla: 'IPSA',
    municipio: 'Samaniego',
    sectorNombre: 'Sector Samaniego (Urbano & Rural)',
    tipo: 'Urbano',
    direccion: 'Calle 6 # 7-14, Barrio El Progreso, Samaniego',
    estudiantesRegistrados: 22,
    puntajePromedioSector: 330,
  },
  {
    id: 'ie-providencia',
    nombre: 'Institución Educativa Providencia',
    sigla: 'I.E. Providencia',
    municipio: 'Providencia',
    sectorNombre: 'Sector Providencia (Centro & Veredas)',
    tipo: 'Urbano',
    direccion: 'Plaza Principal, Providencia',
    estudiantesRegistrados: 28,
    puntajePromedioSector: 312,
  },
  {
    id: 'ie-sanjuan',
    nombre: 'Institución Educativa San Juan Bautista',
    sigla: 'I.E. San Juan Bautista',
    municipio: 'Santa Cruz de Guachavez',
    sectorNombre: 'Sector Santa Cruz de Guachavez',
    tipo: 'Urbano',
    direccion: 'Barrio Central, Guachavez',
    estudiantesRegistrados: 20,
    puntajePromedioSector: 308,
  },
  {
    id: 'ie-lourdes',
    nombre: 'Institución Educativa Nuestra Señora de Lourdes',
    sigla: 'I.E. Ntra. Sra. de Lourdes',
    municipio: 'Santa Cruz de Guachavez',
    sectorNombre: 'Sector Santa Cruz de Guachavez',
    tipo: 'Rural',
    direccion: 'Vereda Lourdes, Santa Cruz de Guachavez',
    estudiantesRegistrados: 16,
    puntajePromedioSector: 299,
  },
]

export function obtenerInstitucionPorNombre(nombre: string): InstitucionEducativa | undefined {
  return catalogoInstituciones.find(
    (i) => i.nombre.toLowerCase().includes(nombre.toLowerCase()) || nombre.toLowerCase().includes(i.sigla.toLowerCase())
  )
}

export function obtenerInstitucionesPorMunicipio(municipio: string): InstitucionEducativa[] {
  return catalogoInstituciones.filter((i) => i.municipio.toLowerCase() === municipio.toLowerCase())
}

export function obtenerInstitucionesPorSector(sectorNombre: string): InstitucionEducativa[] {
  return catalogoInstituciones.filter((i) => i.sectorNombre.toLowerCase() === sectorNombre.toLowerCase())
}

export function obtenerSectorDeInstitucion(nombreInstitucion: string): string {
  const inst = obtenerInstitucionPorNombre(nombreInstitucion)
  return inst ? inst.sectorNombre : 'Sector Samaniego (Urbano & Rural)'
}
