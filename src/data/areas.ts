import { Calculator, BookOpenText, FlaskConical, Landmark, Languages } from 'lucide-react'

export type AreaId = 'matematicas' | 'lectura' | 'ciencias' | 'sociales' | 'ingles'

export interface Area {
  id: AreaId
  nombre: string
  nombreCorto: string
  icon: typeof Calculator
  color: string
  colorSuave: string
  descripcion: string
}

export const areas: Area[] = [
  {
    id: 'matematicas',
    nombre: 'Matemáticas',
    nombreCorto: 'Mate',
    icon: Calculator,
    color: 'bg-navy-700',
    colorSuave: 'bg-navy-50 text-navy-700',
    descripcion: 'Razonamiento cuantitativo, álgebra y geometría',
  },
  {
    id: 'lectura',
    nombre: 'Lectura Crítica',
    nombreCorto: 'Lectura',
    icon: BookOpenText,
    color: 'bg-wine-500',
    colorSuave: 'bg-wine-50 text-wine-600',
    descripcion: 'Comprensión, análisis y evaluación de textos',
  },
  {
    id: 'ciencias',
    nombre: 'Ciencias Naturales',
    nombreCorto: 'Ciencias',
    icon: FlaskConical,
    color: 'bg-emerald-600',
    colorSuave: 'bg-emerald-50 text-emerald-700',
    descripcion: 'Biología, física y química aplicada',
  },
  {
    id: 'sociales',
    nombre: 'Sociales y Ciudadanas',
    nombreCorto: 'Sociales',
    icon: Landmark,
    color: 'bg-gold-600',
    colorSuave: 'bg-gold-50 text-gold-700',
    descripcion: 'Historia, constitución y competencias ciudadanas',
  },
  {
    id: 'ingles',
    nombre: 'Inglés',
    nombreCorto: 'Inglés',
    icon: Languages,
    color: 'bg-navy-500',
    colorSuave: 'bg-navy-50 text-navy-500',
    descripcion: 'Comprensión de lectura y uso del idioma',
  },
]

export const getArea = (id: AreaId) => areas.find((a) => a.id === id)!
