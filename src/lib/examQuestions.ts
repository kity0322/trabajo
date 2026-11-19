import { questionBank, type Question } from '@/data/questions'
import type { AreaId } from '@/data/areas'

export function buildExamQuestions(area: AreaId, count = 10): Question[] {
  const propias = questionBank.filter((q) => q.area === area)
  const otras = questionBank.filter((q) => q.area !== area)
  const combinadas = [...propias, ...otras]
  return combinadas.slice(0, Math.min(count, combinadas.length))
}
