import type { AreaId } from './areas'

export interface Question {
  id: string
  area: AreaId
  contexto?: string
  enunciado: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}

export const questionBank: Question[] = [
  {
    id: 'q1',
    area: 'matematicas',
    enunciado:
      'Una tienda ofrece un descuento del 20% sobre el precio de un artículo que cuesta $85.000. Si además se aplica un IVA del 19% sobre el precio ya descontado, ¿cuál es el valor final que paga el cliente?',
    opciones: ['$68.000', '$80.920', '$84.000', '$92.650'],
    respuestaCorrecta: 1,
    explicacion:
      'Primero se calcula el 20% de descuento: 85.000 × 0,8 = 68.000. Luego se aplica el 19% de IVA: 68.000 × 1,19 = 80.920.',
  },
  {
    id: 'q2',
    area: 'matematicas',
    contexto:
      'La función que modela la altura h (en metros) de un cohete de juguete en función del tiempo t (en segundos) es h(t) = -5t² + 20t.',
    enunciado: '¿En qué momento el cohete alcanza su altura máxima?',
    opciones: ['t = 1 s', 't = 2 s', 't = 4 s', 't = 5 s'],
    respuestaCorrecta: 1,
    explicacion:
      'El vértice de la parábola está en t = -b/2a = -20/(2×-5) = 2. Por lo tanto, la altura máxima se alcanza en t = 2 segundos.',
  },
  {
    id: 'q3',
    area: 'lectura',
    contexto:
      '"El río Magdalena, la arteria fluvial más importante de Colombia, ha sido testigo del desarrollo económico y cultural del país durante siglos. Sin embargo, la deforestación de sus riberas y la contaminación industrial han reducido su caudal de manera alarmante en las últimas tres décadas, poniendo en riesgo los ecosistemas que dependen de él."',
    enunciado: 'De acuerdo con el texto, ¿cuál es la idea principal que el autor quiere comunicar?',
    opciones: [
      'El río Magdalena es el más largo de Colombia.',
      'El desarrollo económico del país depende exclusivamente del río Magdalena.',
      'La actividad humana ha deteriorado significativamente al río Magdalena y sus ecosistemas.',
      'La deforestación es un fenómeno exclusivo de las riberas del Magdalena.',
    ],
    respuestaCorrecta: 2,
    explicacion:
      'El texto enfatiza cómo la deforestación y la contaminación —causadas por la actividad humana— han afectado negativamente el caudal y los ecosistemas del río.',
  },
  {
    id: 'q4',
    area: 'lectura',
    contexto:
      '"Aunque muchos creen que la creatividad es un don innato reservado para unos pocos elegidos, la evidencia sugiere lo contrario: la creatividad es una habilidad que se cultiva con práctica deliberada, exposición a nuevas ideas y tolerancia al error."',
    enunciado: 'La expresión "lo contrario" en el texto hace referencia a que la creatividad es:',
    opciones: [
      'un talento que no puede desarrollarse con el tiempo',
      'una habilidad que se puede entrenar y mejorar',
      'un rasgo exclusivo de los artistas',
      'un concepto que no ha sido estudiado científicamente',
    ],
    respuestaCorrecta: 1,
    explicacion:
      'El autor contrasta la creencia popular ("don innato") con la idea de que la creatividad se cultiva mediante práctica y exposición, es decir, se puede entrenar.',
  },
  {
    id: 'q5',
    area: 'ciencias',
    enunciado:
      'Un estudiante mezcla agua con sal de cocina y observa que la sal desaparece por completo. ¿Qué tipo de mezcla se formó y por qué?',
    opciones: [
      'Una mezcla heterogénea, porque se pueden distinguir sus componentes a simple vista',
      'Una mezcla homogénea, porque las partículas de sal se distribuyen uniformemente en el agua',
      'Un compuesto nuevo, porque el agua y la sal reaccionaron químicamente',
      'Una suspensión, porque la sal se sedimentará con el tiempo',
    ],
    respuestaCorrecta: 1,
    explicacion:
      'Al disolverse completamente y distribuirse de forma uniforme sin reacción química, se forma una mezcla homogénea (una disolución).',
  },
  {
    id: 'q6',
    area: 'ciencias',
    contexto:
      'En un ecosistema de páramo, las plantas llamadas frailejones absorben y retienen grandes cantidades de agua de la neblina.',
    enunciado: '¿Qué función ecológica cumplen principalmente los frailejones en este ecosistema?',
    opciones: [
      'Aceleran la erosión del suelo del páramo',
      'Regulan el ciclo del agua y abastecen fuentes hídricas río abajo',
      'Impiden por completo el crecimiento de otras especies vegetales',
      'Generan la mayor parte del oxígeno atmosférico del planeta',
    ],
    respuestaCorrecta: 1,
    explicacion:
      'Los frailejones capturan la humedad del aire y la liberan lentamente al suelo, regulando el ciclo hídrico y alimentando ríos y quebradas.',
  },
  {
    id: 'q7',
    area: 'sociales',
    enunciado:
      'La Constitución Política de Colombia de 1991 estableció al país como un Estado Social de Derecho. ¿Qué implica principalmente este modelo?',
    opciones: [
      'Que el Estado solo garantiza el orden público y la defensa nacional',
      'Que el Estado debe garantizar derechos fundamentales, sociales y económicos a sus ciudadanos',
      'Que las decisiones judiciales no pueden ser revisadas por ninguna autoridad',
      'Que el poder ejecutivo tiene control absoluto sobre los otros poderes públicos',
    ],
    respuestaCorrecta: 1,
    explicacion:
      'Un Estado Social de Derecho se compromete a garantizar no solo derechos civiles y políticos, sino también sociales, económicos y culturales.',
  },
  {
    id: 'q8',
    area: 'sociales',
    enunciado:
      'Durante el siglo XIX, Colombia vivió múltiples guerras civiles entre liberales y conservadores. ¿Cuál era una de las principales causas de estos conflictos?',
    opciones: [
      'Diferencias sobre el papel de la Iglesia y el grado de centralización del poder político',
      'Disputas exclusivamente relacionadas con tratados de comercio internacional',
      'La abolición inmediata de todos los impuestos nacionales',
      'La ausencia total de una Constitución Política en el país',
    ],
    respuestaCorrecta: 0,
    explicacion:
      'Los conflictos del siglo XIX giraron en gran parte en torno al federalismo vs. centralismo y al rol de la Iglesia católica en el Estado.',
  },
  {
    id: 'q9',
    area: 'ingles',
    contexto:
      '"Sarah has been working as a volunteer at the local animal shelter for two years. She usually goes there every Saturday morning to feed the animals and clean their cages. Although it can be tiring, she says it is the most rewarding part of her week."',
    enunciado: 'According to the text, how often does Sarah volunteer at the shelter?',
    opciones: ['Every day', 'Every Saturday morning', 'Twice a week', 'Only during holidays'],
    respuestaCorrecta: 1,
    explicacion: 'The text states: "she usually goes there every Saturday morning."',
  },
  {
    id: 'q10',
    area: 'ingles',
    enunciado: 'Choose the correct sentence.',
    opciones: [
      'She don\'t like studying at night.',
      'She doesn\'t likes studying at night.',
      'She doesn\'t like studying at night.',
      'She not like studying at night.',
    ],
    respuestaCorrecta: 2,
    explicacion:
      'En tercera persona del singular, el negativo del presente simple se forma con "doesn\'t" + verbo en infinitivo: "She doesn\'t like..."',
  },
]

export function getQuestionsByArea(area: AreaId): Question[] {
  return questionBank.filter((q) => q.area === area)
}
