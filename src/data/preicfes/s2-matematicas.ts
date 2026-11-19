import type { Question } from '../questions'

// Transcrito de "JMES SEGUNDA SESIÓN 2023" — Matemáticas (preguntas 26-50)
// El cuadernillo original no trae clave de respuestas; se infieren por
// cálculo matemático. Varias preguntas (26, 30, 33, 35, 36, 39, 47, 48)
// dependen de figuras/gráficas que no se pudieron reconstruir fielmente
// como texto; quedan señaladas para verificación contra el PDF original.
export const s2Matematicas: Question[] = [
  {
    id: 's2-mat-26',
    area: 'matematicas',
    contexto:
      'A un estudiante se le pide rotar 90° un triángulo (figura 1) en dirección contraria a las manecillas del reloj, en torno al origen. El estudiante obtiene la figura 2, y este resultado es incorrecto.',
    enunciado: '¿Por qué es incorrecto el resultado obtenido por el estudiante?',
    opciones: [
      'Porque el triángulo no debería apuntar hacia abajo.',
      'Porque el triángulo no debería apuntar hacia la derecha.',
      'Porque la rotación realizada fue de menos de 90°.',
      'Porque la rotación se hizo en la dirección equivocada.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Verificar con el PDF: la figura muestra que el estudiante giró el triángulo en sentido horario en lugar de antihorario, es decir, en la dirección opuesta a la solicitada.',
  },
  {
    id: 's2-mat-27',
    area: 'matematicas',
    contexto:
      'La calificación final (nota F) de un curso se calcula con cuatro notas: I (10 %), S (20 %), T (30 %) y Q (40 %).',
    enunciado: '¿Cuál de los siguientes cálculos NO corresponde a una relación correcta entre las notas?',
    opciones: [
      'nota F = (nota I + 2 × nota S + 3 × nota T + 4 × nota Q)/10',
      'nota F = nota I/4 + nota S/3 + nota T/2 + nota Q',
      'nota F = 0,1 × nota I + 0,2 × nota S + 0,3 × nota T + 0,4 × nota Q',
      'nota F = [nota Q + (nota T + nota Q) + (nota S + nota T + nota Q) + (nota I + nota S + nota T + nota Q)]/10',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Las opciones A, C y D son formas equivalentes de la combinación 0,1·I + 0,2·S + 0,3·T + 0,4·Q. La opción B usa coeficientes (1/4, 1/3, 1/2, 1) que no corresponden a los porcentajes 10 %, 20 %, 30 % y 40 %.',
  },
  {
    id: 's2-mat-28',
    area: 'matematicas',
    contexto:
      'Banco M: cuota de manejo trimestral de $12.000 más $1.000 por cada retiro. Banco N: sin cuota de manejo, pero $5.000 por cada retiro. El padre de Manuel retira dinero 2 veces al mes.',
    enunciado: 'Al cabo de un año, ¿ahorraría al seguir el consejo de su hijo (cambiarse al Banco N)?',
    opciones: [
      'Sí, porque en el Banco M le cobran cuota de manejo y en el N, no.',
      'No, porque debería pagar igual cantidad de dinero a ambos bancos cada año.',
      'Sí, porque, teniendo en cuenta cada retiro, pagaría menos dinero al cambiarse al Banco N.',
      'No, porque, incluso pagando cuota de manejo, pagaría menos dinero al quedarse en el Banco M.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Banco M al año: 4 × $12.000 (cuota) + 24 × $1.000 (retiros) = $72.000. Banco N al año: 24 × $5.000 = $120.000. Es más barato quedarse en el Banco M.',
  },
  {
    id: 's2-mat-29',
    area: 'matematicas',
    contexto: 'Un vaso cilíndrico tiene una base circular de radio 3 cm y una altura de 8 cm. El estudiante plantea la operación π × 3² × 8 = 226,19.',
    enunciado: '¿A qué corresponde el resultado de la anterior operación?',
    opciones: ['Al volumen del vaso.', 'Al área de la tapa del vaso.', 'Al perímetro de la tapa del vaso.', 'Al área lateral del vaso.'],
    respuestaCorrecta: 0,
    explicacion: 'La operación π×r²×h es exactamente la fórmula del volumen de un cilindro, con r = 3 cm y h = 8 cm.',
  },
  {
    id: 's2-mat-30',
    area: 'matematicas',
    contexto:
      'Una gráfica muestra el nivel de audiencia de dos documentales, f(x) y g(x), durante su primer mes al aire. Un empleado concluye que f(x) tuvo mayor audiencia que g(x) todos los días del mes, basado en que las dos funciones difieren por una constante (un desplazamiento vertical fijo entre ellas).',
    enunciado: '¿Es verdadera la conclusión del empleado?',
    opciones: [
      'Sí, porque las funciones f(x) y g(x) tienen rangos diferentes.',
      'No, porque las funciones f(x) y g(x) tienen dominios iguales.',
      'Sí, porque f(x) = g(x) + 20 para todo x; por tanto, f(x) es siempre mayor que g(x).',
      'No, porque f(x) = g(x) − 20 para todo x; por tanto, g(x) es siempre mayor que f(x).',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: si la diferencia entre las dos funciones es una constante fija en toda la gráfica, entonces una de ellas es mayor que la otra todos los días; se debe confirmar en la gráfica original el signo exacto de esa constante.',
  },
  {
    id: 's2-mat-31',
    area: 'matematicas',
    contexto: 'En un bulto de café hay granos con nivel de cafeína bajo, medio o alto. La probabilidad de extraer un grano con nivel bajo es 0,27.',
    enunciado: '¿Cuál es la probabilidad de que al extraer un grano este tenga un nivel medio o alto de cafeína?',
    opciones: ['0,09', '0,73', '0,54', '0,37'],
    respuestaCorrecta: 1,
    explicacion: 'Como las probabilidades deben sumar 1, la probabilidad de nivel medio o alto es 1 − 0,27 = 0,73.',
  },
  {
    id: 's2-mat-32',
    area: 'matematicas',
    contexto:
      'En la primera vuelta, un candidato obtuvo 1/4 de los votos de un total de 13.209.560. En la segunda vuelta, obtuvo 1/2 de los votos de un total de 15.794.940.',
    enunciado: '¿Cuál procedimiento permite determinar el número total de votos obtenido por ese candidato en las dos vueltas?',
    opciones: [
      'Paso 1. Multiplicar 1/4 por 13.209.560. Paso 2. Multiplicar 1/2 por 15.794.940. Paso 3. Sumar los valores obtenidos en los pasos 1 y 2.',
      'Paso 1. Multiplicar 1 por 13.209.560. Paso 2. Multiplicar 2 por 15.794.940. Paso 3. Sumar los valores obtenidos en los pasos 1 y 2.',
      'Paso 1. Multiplicar 1/4 por 13.209.560. Paso 2. Multiplicar 1/2 por 15.794.940. Paso 3. Restar los valores obtenidos en los pasos 1 y 2.',
      'Paso 1. Multiplicar 1/2 por 13.209.560. Paso 2. Multiplicar 1/4 por 15.794.940. Paso 3. Restar los valores obtenidos en los pasos 1 y 2.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El total de votos obtenido en ambas vueltas es la suma (no la resta) de los votos de cada vuelta: (1/4 × 13.209.560) + (1/2 × 15.794.940).',
  },
  {
    id: 's2-mat-33',
    area: 'matematicas',
    contexto: 'Pedro quiere calcular cuánta agua se necesita para llenar un cilindro interno, contando solo con algunas de las medidas mostradas en una figura.',
    enunciado: '¿Qué medida le falta a Pedro para hallar la cantidad deseada?',
    opciones: ['Radio externo.', 'Diámetro externo.', 'Altura del cilindro.', 'Perímetro del cilindro.'],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: para calcular el volumen (cantidad de agua) se necesita el radio y la altura del cilindro; la medida que falta depende de cuáles datos ya aparecen en la figura original.',
  },
  {
    id: 's2-mat-34',
    area: 'matematicas',
    contexto:
      'Un futbolista anota 4 goles por cada 5 tiros al arco (en un entrenamiento anterior, 25 tiros produjeron 25×4/5 = 20 goles, cumpliendo esa proporción). En el siguiente entrenamiento anotó 12 goles manteniendo la misma proporción.',
    enunciado: '¿Cuántos tiros al arco pateó inicialmente en ese entrenamiento?',
    opciones: ['12', '15', '20', '25'],
    respuestaCorrecta: 1,
    explicacion: 'Manteniendo la proporción 4 goles por cada 5 tiros, para 12 goles se necesitan 12 × (5/4) = 15 tiros al arco.',
  },
  {
    id: 's2-mat-35',
    area: 'matematicas',
    contexto:
      'Un piloto de acrobacias relata: durante los primeros 30 segundos subió de altura de forma constante; luego descendió de forma constante durante 5 segundos; después giró sobre el eje del avión durante 20 segundos manteniendo la misma altura; finalmente, aterrizó reduciendo la altura de forma constante durante 25 segundos.',
    enunciado: '¿Cuál de las siguientes gráficas representa de forma correcta la información dada por el piloto?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: la gráfica correcta debe mostrar altura creciente (30 s), luego decreciente (5 s), luego constante (20 s) y finalmente decreciente hasta el aterrizaje (25 s).',
  },
  {
    id: 's2-mat-36',
    area: 'matematicas',
    contexto:
      'Tabla de un viaje en camión: a las 0, 2, 4, 6 y 8 horas, el combustible disponible es 55, 45, 35, 25 y 15 litros (decrece 10 litros cada 2 horas) y la distancia recorrida es 0, 20, 40, 60 y 80 km (aumenta 20 km cada 2 horas).',
    enunciado: 'De acuerdo con la tabla, ¿cuál gráfica representa correctamente el comportamiento de la distancia recorrida y del combustible disponible en función del tiempo?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: la gráfica correcta debe mostrar una recta creciente para la distancia (0 a 80 km) y una recta decreciente para el combustible (55 a 15 litros), ambas en función del tiempo (0 a 8 horas).',
  },
  {
    id: 's2-mat-37',
    area: 'matematicas',
    contexto:
      'Un estudiante debe obtener un promedio de 4,5 en las asignaturas Inglés, Matemáticas, Química y Física (de un total de 12 asignaturas). Calcula el promedio resolviendo (5+4+4+5)/4.',
    enunciado: '¿Este procedimiento es correcto o incorrecto?',
    opciones: [
      'Correcto, porque usa las notas mayores que 4.',
      'Incorrecto, porque debe calcular el promedio de las 12 asignaturas.',
      'Correcto, porque el denominador es la cantidad de notas usadas en el numerador.',
      'Incorrecto, porque debe calcular el promedio de los valores intermedios de las notas del total de asignaturas.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El procedimiento es válido porque promedia exactamente las notas de las 4 asignaturas solicitadas (Inglés, Matemáticas, Química y Física), dividiendo entre esa misma cantidad de notas (4).',
  },
  {
    id: 's2-mat-38',
    area: 'matematicas',
    contexto:
      'Una agencia de viajes calcula el costo de un tiquete con C = (1/E + M + D²) × V, donde E es el número de escalas, M el número de maletas, D el número de días del viaje y V un valor fijado por cada aerolínea. Isabella llevará 5 maletas, hará una escala y estará dos semanas (14 días) en el destino.',
    enunciado: '¿Qué información le falta conocer a Isabella para calcular el costo de su pasaje?',
    opciones: [
      'El valor de E, es decir, el número de escalas.',
      'La cantidad M de maletas que puede llevar.',
      'El número D de días que durará su viaje.',
      'El valor V fijado por cada aerolínea.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Isabella ya conoce E (1 escala), M (5 maletas) y D (14 días); el único dato que le falta es V, el valor fijado por la aerolínea.',
  },
  {
    id: 's2-mat-39',
    area: 'matematicas',
    contexto:
      'Una gráfica muestra el porcentaje de desempleo en mayores de 16 años en el Reino Unido por trimestre. Se presentan tres afirmaciones: I) de marzo a noviembre de 2011 el desempleo aumentó; II) en marzo-mayo de 2011 el desempleo disminuyó respecto al mismo período de 2010; III) si la tendencia de los últimos dos trimestres se mantuviera, en junio-agosto de 2012 el porcentaje sería 8,1.',
    enunciado: '¿Cuál(es) de las anteriores afirmaciones es(son) correcta(s)?',
    opciones: ['I solamente.', 'III solamente.', 'I y II solamente.', 'II y III solamente.'],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: las afirmaciones I y II describen tendencias ya observadas en los datos de la gráfica; la afirmación III extrapola una tendencia futura, lo que suele ser una conclusión no garantizada por los datos presentados.',
  },
  {
    id: 's2-mat-40',
    area: 'matematicas',
    contexto:
      'Elena quiere comprar una nevera y una lavadora con la menor probabilidad de fallar antes de vencerse la garantía. Marca P: nevera falla 1 de cada 125; Marca R: nevera falla 1 de cada 115. Para la lavadora, la Marca R falla 1 de cada 120 (y la Marca P tiene una proporción de falla también más baja que la R). Un vendedor afirma que la mejor opción es comprar ambos de marca P.',
    enunciado: '¿Es verdadera la afirmación del vendedor?',
    opciones: [
      'Sí, porque al analizar la información de la tabla, se puede inferir que la marca P tiene un mayor número de compradores que la marca R.',
      'No, porque en las cuatro opciones que aparecen en la tabla, al menos un electrodoméstico ha fallado antes del vencimiento de su garantía.',
      'Sí, porque la proporción de fallas en la marca P es más baja que en la R, dado que en la P se está dividiendo 1 entre números más grandes.',
      'No, porque en la tabla se observa que hasta el momento han fallado menos neveras y lavadoras de la marca R que de la marca P.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Una probabilidad de falla de "1 de cada n" es menor cuanto mayor es n; como los denominadores de la marca P son mayores en ambos electrodomésticos, su probabilidad de falla es más baja.',
  },
  {
    id: 's2-mat-41',
    area: 'matematicas',
    contexto: 'En un campamento escolar se reciben 25 niños durante 4 días y se preparan 100 meriendas para alimentarlos durante su estadía.',
    enunciado: '¿Cuántas meriendas se deben preparar para alimentar a 50 niños durante 7 días?',
    opciones: ['350', '200', '175', '114'],
    respuestaCorrecta: 0,
    explicacion: 'La proporción es 100 meriendas / (25 niños × 4 días) = 1 merienda por niño-día. Para 50 niños durante 7 días: 50 × 7 × 1 = 350 meriendas.',
  },
  {
    id: 's2-mat-42',
    area: 'matematicas',
    contexto: 'Un avión cubre, ida y vuelta, una distancia de 800 km entre dos ciudades. En la ida, el vuelo duró 2 horas; en la vuelta, la velocidad promedio fue de 500 km/h.',
    enunciado: '¿Cuál fue la velocidad promedio del avión en el viaje de ida y vuelta?',
    opciones: ['450 km/h', '400 km/h', '500 km/h', '650 km/h'],
    respuestaCorrecta: 0,
    explicacion: 'Velocidad de ida: 800 km/2 h = 400 km/h. Tiempo de vuelta: 800/500 = 1,6 h. Velocidad promedio = distancia total/tiempo total = 1.600/(2+1,6) = 1.600/3,6 ≈ 444 km/h, la opción más cercana es 450 km/h.',
  },
  {
    id: 's2-mat-43',
    area: 'matematicas',
    contexto: 'La función de costos de producir x unidades en una empresa es y = x² + 30.000.',
    enunciado: 'Cuando el costo de producción fue de 40.000, ¿cuántas unidades se produjeron?',
    opciones: ['100', '1.000', '70.000', '190.000'],
    respuestaCorrecta: 0,
    explicacion: '40.000 = x² + 30.000 → x² = 10.000 → x = 100 unidades.',
  },
  {
    id: 's2-mat-44',
    area: 'matematicas',
    contexto:
      'Para hallar el área superficial de un prisma triangular regular (base triángulo equilátero de lado x y altura h, con 3 caras rectangulares congruentes de altura H), un estudiante: Paso 1, multiplica x por h; Paso 2, divide ese resultado entre 2 (área de un triángulo); Paso 3, multiplica ese resultado por 2 (área de los dos triángulos); Paso 4, multiplica H por x; Paso 5, multiplica ese resultado por 3 (área de los tres rectángulos); Paso 6, suma los resultados de los pasos 1 y 5.',
    enunciado: '¿Cuál o cuáles pasos son innecesarios para calcular el área superficial del prisma?',
    opciones: [
      'El paso 2, porque en el paso 1 se está calculando el área de los dos triángulos equiláteros.',
      'Los pasos 2 y 3, porque, al dividir y multiplicar por 2, se obtiene el mismo resultado del paso 1.',
      'Los pasos 5 y 6, porque, como los rectángulos son congruentes, es suficiente calcular el área de uno de ellos.',
      'El paso 6, porque en los pasos 3 y 5 se obtuvo el área de los triángulos y rectángulos que componen el prisma.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Dividir entre 2 (paso 2) y luego multiplicar por 2 (paso 3) son operaciones inversas que se cancelan, devolviendo el mismo valor obtenido en el paso 1; por eso son innecesarios.',
  },
  {
    id: 's2-mat-45',
    area: 'matematicas',
    contexto: 'Cantidad mensual de empanadas de 9 personas: Elisa 3, Gabriela 6, Ximena 6, Fernando 10, Ricardo 11, Jaime 12, Néstor 13, Tatiana 14, Bibiana 15.',
    enunciado: '¿Quién de estas personas come una cantidad mensual de empanadas igual a la mediana de las 9 cantidades?',
    opciones: ['Fernando.', 'Bibiana.', 'Ricardo.', 'Gabriela.'],
    respuestaCorrecta: 2,
    explicacion: 'Ordenados los 9 valores (3, 6, 6, 10, 11, 12, 13, 14, 15), el valor central (quinto) es 11, que corresponde a Ricardo.',
  },
  {
    id: 's2-mat-46',
    area: 'matematicas',
    contexto:
      'Cuatro estudiantes eligen 5 números al azar: Estudiante I: 0, 1, 5, 5, 7; Estudiante II: 2, 2, 2, 5, 5; Estudiante III: 1, 1, 6, 7, 8; Estudiante IV: 1, 2, 2, 8, 9. Gana quien tenga la mayor mediana.',
    enunciado: '¿Cuál estudiante ganó el juego?',
    opciones: ['Estudiante I.', 'Estudiante II.', 'Estudiante III.', 'Estudiante IV.'],
    respuestaCorrecta: 2,
    explicacion: 'Las medianas son: I = 5, II = 2, III = 6, IV = 2. La mayor mediana (6) corresponde al Estudiante III.',
  },
  {
    id: 's2-mat-47',
    area: 'matematicas',
    contexto:
      'Encuesta de sabores de torta: Nuez 139 clientes, Almendra 161 clientes, Chocolate 170 clientes, Naranja 149 clientes (los dos sabores preferidos son Chocolate y Almendra). Una gráfica adicional muestra el número de tortas vendidas cada día de la semana.',
    enunciado: 'La pastelería planea vender tortas de los 2 sabores preferidos el día de mayor venta. ¿Cuál día de la semana se venderán las tortas y de qué sabores serán?',
    opciones: [
      'Se venderán el sábado y los sabores serán almendra y chocolate.',
      'Se venderán el jueves y los sabores serán almendra y chocolate.',
      'Se venderán el sábado y los sabores serán naranja y nuez.',
      'Se venderán el jueves y los sabores serán naranja y nuez.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Los sabores preferidos por los clientes son chocolate (170) y almendra (161), los de mayor número de clientes en la encuesta. Verificar con el PDF cuál día específico tuvo el mayor número de ventas según la gráfica.',
  },
  {
    id: 's2-mat-48',
    area: 'matematicas',
    contexto: 'Un futbolista recorre un tramo de 80 metros a una velocidad constante de 20 km/h.',
    enunciado: '¿Cuál de las siguientes gráficas representa correctamente la velocidad del futbolista en dicho tramo?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: al moverse a velocidad constante, la gráfica correcta de velocidad contra tiempo (o distancia) debe ser una línea horizontal, sin variaciones.',
  },
  {
    id: 's2-mat-49',
    area: 'matematicas',
    contexto:
      'En un colegio se revisaron las sillas disponibles: 610 en buen estado, 90 para arreglar, 200 de brazo izquierdo y 500 de brazo derecho.',
    enunciado: '¿Cuál de los siguientes datos se puede calcular con la información obtenida por el encargado?',
    opciones: [
      'La cantidad de estudiantes que usan sillas de brazo izquierdo.',
      'La cantidad de sillas de brazo derecho para arreglar.',
      'La cantidad de estudiantes inscritos en el colegio.',
      'La cantidad de sillas revisadas por el encargado.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Las sillas en buen estado (610) más las que hay que arreglar (90) suman 700; de igual forma, las de brazo izquierdo (200) más las de brazo derecho (500) también suman 700. Ambas particiones permiten calcular el total de sillas revisadas (700).',
  },
  {
    id: 's2-mat-50',
    area: 'matematicas',
    contexto:
      'Un contenedor usa tres materiales: Base (área 2 m², $30.000 por m²), Tapa (área 2 m², $20.000 por m²), Caras laterales (área 6 m², $12.000 por m²).',
    enunciado: '¿Cuál de las siguientes opciones representa el costo total del material para cada parte del contenedor?',
    opciones: [
      'Base: $32.000 / Tapa: $22.000 / Caras laterales: $18.000',
      'Base: $15.000 / Tapa: $10.000 / Caras laterales: $2.000',
      'Base: $60.000 / Tapa: $40.000 / Caras laterales: $72.000',
      'Base: $30.000 / Tapa: $20.000 / Caras laterales: $12.000',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Costo total = área × costo por m²: Base = 2×$30.000=$60.000; Tapa = 2×$20.000=$40.000; Caras laterales = 6×$12.000=$72.000.',
  },
]
