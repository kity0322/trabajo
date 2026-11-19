import type { AreaId } from './areas'

export type Rol = 'estudiante' | 'docente' | 'admin'

export interface CuentaDemo {
  rol: Rol
  etiqueta: string
  nombre: string
  correo: string
  clave: string
  institucion: string
  grado: string
  redirectTo: string
  materia?: AreaId
  sector?: string
  municipio?: string
  instituciones?: string[]
}

export const cuentasDemo: CuentaDemo[] = [
  {
    rol: 'estudiante',
    etiqueta: 'Estudiante',
    nombre: 'Estudiante Demo',
    correo: 'estudiante@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'Colegio Nacional Simón Bolívar (CNSB)',
    grado: '11°A',
    sector: 'Sector Samaniego (Urbano & Rural)',
    municipio: 'Samaniego',
    redirectTo: '/panel',
  },
  // ── Profesores por materia (pueden pertenecer a dos o más instituciones) ──
  {
    rol: 'docente',
    etiqueta: 'Profesor Matemáticas',
    nombre: 'Carlos Alberto Muñoz',
    correo: 'mate@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'Colegio Nacional Simón Bolívar & I.E. Policarpa Salavarrieta',
    instituciones: [
      'Colegio Nacional Simón Bolívar (CNSB)',
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
      'Institución Educativa Providencia',
    ],
    grado: 'Docente Titular',
    materia: 'matematicas',
    sector: 'Samaniego & Providencia',
    redirectTo: '/mi-materia',
  },
  {
    rol: 'docente',
    etiqueta: 'Profesor Lectura Crítica',
    nombre: 'Andrea Patricia López',
    correo: 'lectura@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'I.E. Policarpa Salavarrieta & I.E. San Juan Bautista',
    instituciones: [
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
      'Institución Educativa San Juan Bautista',
      'Colegio Nacional Simón Bolívar (CNSB)',
    ],
    grado: 'Docente Titular',
    materia: 'lectura',
    sector: 'Samaniego & Guachavez',
    redirectTo: '/mi-materia',
  },
  {
    rol: 'docente',
    etiqueta: 'Profesor Ciencias Naturales',
    nombre: 'Jorge Enrique Salazar',
    correo: 'ciencias@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'I.E. Providencia & I.E. Nuestra Señora de Lourdes',
    instituciones: [
      'Institución Educativa Providencia',
      'Institución Educativa Nuestra Señora de Lourdes',
      'Colegio Nacional Simón Bolívar (CNSB)',
    ],
    grado: 'Docente Titular',
    materia: 'ciencias',
    sector: 'Providencia & Guachavez',
    redirectTo: '/mi-materia',
  },
  {
    rol: 'docente',
    etiqueta: 'Profesor Sociales',
    nombre: 'Liliana Marcela Ortiz',
    correo: 'sociales@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'Colegio Nacional Simón Bolívar & I.E. San Juan Bautista',
    instituciones: [
      'Colegio Nacional Simón Bolívar (CNSB)',
      'Institución Educativa San Juan Bautista',
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
    ],
    grado: 'Docente Titular',
    materia: 'sociales',
    sector: 'Samaniego & Guachavez',
    redirectTo: '/mi-materia',
  },
  {
    rol: 'docente',
    etiqueta: 'Profesor Inglés',
    nombre: 'Diana Carolina Restrepo',
    correo: 'ingles@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'I.E. Providencia & I.E. Policarpa Salavarrieta',
    instituciones: [
      'Institución Educativa Providencia',
      'Institución Educativa Policarpa Salavarrieta (IPSA)',
      'Institución Educativa Nuestra Señora de Lourdes',
    ],
    grado: 'Docente Titular',
    materia: 'ingles',
    sector: 'Providencia & Samaniego',
    redirectTo: '/mi-materia',
  },
  {
    rol: 'admin',
    etiqueta: 'Administrador(a)',
    nombre: 'Administrador Demo',
    correo: 'admin@impulsasaber.demo',
    clave: 'Demo2026*',
    institucion: 'ImpulsarSAS (Todos los Sectores)',
    grado: 'Dirección General',
    sector: 'Todos los Sectores (Samaniego, Providencia, Guachavez)',
    redirectTo: '/institucional',
  },
]

export function buscarCuentaDemo(correo: string): CuentaDemo | undefined {
  return cuentasDemo.find((c) => c.correo.toLowerCase() === correo.trim().toLowerCase())
}
