export interface HistorialPunto {
  fecha: string
  puntaje: number
  matematicas: number
  lectura: number
  ciencias: number
  sociales: number
  ingles: number
}

export const historialPuntajes: HistorialPunto[] = []

export const promedioNacional = 255

export const rachaEstudio = {
  diasConsecutivos: 0,
  metaSemanal: 5,
  diasCompletadosSemana: 0,
}
