import type { Question } from '../questions'

// Transcrito de "JMES PRIMERA SESIÓN 2023" — Matemáticas (preguntas 1-25)
// NOTA: el cuadernillo original no trae clave de respuestas. Las respuestas
// marcadas aquí son inferidas por razonamiento matemático. Preguntas que
// dependían de una imagen/gráfica no reconstruible en texto (8, 14, 16, 21,
// 22, 23) quedan señaladas en la explicación como "verificar con el PDF".
export const s1Matematicas: Question[] = [
  {
    id: 's1-mat-1',
    area: 'matematicas',
    contexto:
      'Tabla de precios del cono doble en varias heladerías: Dipsy du $5.500, Drenm cream $2.300, Caso del hielo $1.900, Cereza en la punta $3.900, Banana split $3.400, y una sexta heladería $2.800.',
    enunciado: 'Teniendo en cuenta la información de la tabla, ¿cuál es el rango estadístico de los precios?',
    opciones: ['Entre 1.900 y 3.900 pesos.', 'Entre 2.800 y 5.500 pesos.', '3.600 pesos.', '2.700 pesos.'],
    respuestaCorrecta: 2,
    explicacion: 'El rango es la diferencia entre el valor máximo y el mínimo: 5.500 − 1.900 = 3.600 pesos.',
  },
  {
    id: 's1-mat-2',
    area: 'matematicas',
    contexto:
      'José y Carlos juegan a adivinar el número de un dado. Carlos: Paso 1, calcula la moda de los últimos 5 lanzamientos; Paso 2, calcula el promedio de esos 5 lanzamientos; Paso 3, compara los resultados de 1 y 2 y escoge el menor. Los últimos 5 lanzamientos fueron 5, 1, 3, 6 y 5.',
    enunciado: '¿Qué número escogerá Carlos en el siguiente lanzamiento?',
    opciones: ['4', '1', '5', '3'],
    respuestaCorrecta: 0,
    explicacion: 'La moda es 5 (se repite dos veces) y el promedio es (5+1+3+6+5)/5 = 4. El menor de los dos es 4.',
  },
  {
    id: 's1-mat-3',
    area: 'matematicas',
    enunciado:
      'Una persona tiene un libro de 200 páginas y mide el grosor total del libro (5 cm). Luego divide esa medida (5 cm) entre la cantidad de hojas (200). Con este procedimiento, ¿qué información acerca de una sola hoja se obtiene?',
    opciones: ['El área.', 'El ancho.', 'El grosor.', 'La altura.'],
    respuestaCorrecta: 2,
    explicacion: 'Dividir el espesor total del libro entre el número de hojas da el grosor (espesor) de una sola hoja.',
  },
  {
    id: 's1-mat-4',
    area: 'matematicas',
    enunciado:
      'Una tienda de ropa está vendiendo todas las prendas con un descuento del 20 %. ¿Cuál de las siguientes estrategias NO permite calcular el descuento de una prenda?',
    opciones: [
      'Calcular el 1 % del precio de la prenda y, luego, dividir el resultado entre 20.',
      'Calcular el 1 % del precio de la prenda y, luego, multiplicar el resultado por 20.',
      'Calcular el 10 % del precio de la prenda y, luego, multiplicar el resultado por 2.',
      'Calcular el 40 % del precio de la prenda y, luego, dividir el resultado entre 2.',
    ],
    respuestaCorrecta: 0,
    explicacion:
      'Dividir el 1 % entre 20 da 0,05 % del precio, no el 20 %. Las otras tres estrategias (1 %×20, 10 %×2, 40 %÷2) sí equivalen a 20 %.',
  },
  {
    id: 's1-mat-5',
    area: 'matematicas',
    enunciado:
      'Una persona contrató un plan de salud durante un año, por el que debe pagar $200.000 cada mes y, además, $15.000 por cada servicio que solicite. ¿Cuál expresión representa el total de dinero que debe pagar la persona por el plan de salud durante el año?',
    opciones: [
      '(12 × 200.000) + (15.000 × número de servicios solicitados durante el año).',
      '12 × (200.000 + 15.000 × número de servicios solicitados durante un mes).',
      '200.000 + (15.000 × número de servicios solicitados durante el año).',
      '200.000 + 12 × (15.000 × número de servicios solicitados durante un mes).',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El pago fijo anual es 12 × 200.000, y se suma 15.000 por cada servicio solicitado durante todo el año.',
  },
  {
    id: 's1-mat-6',
    area: 'matematicas',
    contexto:
      'Seis habitantes de un edificio se reparten el aseo de la entrada (dos veces al día, de lunes a sábado). Procedimiento: Paso 1, considerar 26 días de aseo al mes; Paso 2, multiplicar esos días por los 12 meses del año; Paso 3, dividir el resultado entre los 6 habitantes; Paso 4, multiplicar el resultado por las 2 veces al día que se hace el aseo.',
    enunciado: '¿Cuántas veces deberá cada habitante encargado realizar el aseo de la entrada del edificio en el año?',
    opciones: ['13 veces.', '52 veces.', '104 veces.', '312 veces.'],
    respuestaCorrecta: 2,
    explicacion: '26×12 = 312 días-aseo al año; 312/6 = 52 por habitante; 52×2 (veces al día) = 104 veces.',
  },
  {
    id: 's1-mat-7',
    area: 'matematicas',
    contexto:
      'La densidad es masa/volumen. Dos sustancias X y Z tienen el mismo volumen (100 ml) y distinta masa. X tiene densidad D1 > 1 g/ml y Z tiene densidad D2 con 0 < D2 < 1 g/ml. Se necesita la sustancia cuya masa sea menor que 100 g, y se escoge Z.',
    enunciado: '¿Es correcta esta elección?',
    opciones: [
      'No, porque la sustancia X tiene la mayor densidad de la tabla.',
      'Sí, porque el cociente masa/volumen de la sustancia Z resulta menor que 1.',
      'No, porque la sustancia Z tiene una densidad menor que 1 pero positiva.',
      'Sí, porque la sustancia X tiene más masa en el mismo volumen.',
    ],
    respuestaCorrecta: 1,
    explicacion:
      'Con volumen = 100 ml, masa = densidad × 100. Como la densidad de Z es menor que 1, su masa es menor que 100 g; la elección es correcta por esa razón.',
  },
  {
    id: 's1-mat-8',
    area: 'matematicas',
    contexto:
      'Un arquitecto construirá una casa; el dibujo (no incluido como texto) muestra medidas de la casa. Un ayudante construyó una maqueta con r = 12 cm, s = 8 cm, t = 12 cm, x = 20 cm, z = 10 cm.',
    enunciado: '¿Cuál medida de la maqueta impide que esta sea semejante a la casa que se va a construir?',
    opciones: ['r', 's', 't', 'z'],
    respuestaCorrecta: 3,
    explicacion:
      'Verificar con el PDF: la pregunta depende de las medidas originales de la casa (mostradas solo en la imagen), que no pudieron extraerse como texto. Se requiere confirmar visualmente cuál medida rompe la razón de escala constante.',
  },
  {
    id: 's1-mat-9',
    area: 'matematicas',
    contexto:
      'Tabla de un experimento: edad 14 años → 28 minutos; edad 15 años → 30 minutos; edad 19 años → 38 minutos; edad 20 años → 40 minutos, para resolver un problema.',
    enunciado: 'Según estos datos, ¿qué se puede afirmar correctamente sobre los minutos necesarios para resolver el problema?',
    opciones: [
      'Que son directamente proporcionales a la edad, porque es constante su producto con la edad.',
      'Que son inversamente proporcionales a la edad, porque es constante su producto con la edad.',
      'Que son directamente proporcionales a la edad, porque son el doble de la edad correspondiente.',
      'Que son inversamente proporcionales a la edad, porque son el doble de la edad correspondiente.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'En cada caso los minutos equivalen exactamente al doble de la edad (14→28, 15→30, 19→38, 20→40), lo que indica proporcionalidad directa.',
  },
  {
    id: 's1-mat-10',
    area: 'matematicas',
    contexto:
      'Para aprobar un curso se necesitan mínimo 210 puntos sumando 3 evaluaciones de máximo 100 puntos cada una. Un estudiante obtuvo 70 en la primera y 60 en la segunda. Procedimiento usado: Paso 1, sumó las dos notas (130); Paso 2, dividió ese resultado entre la cantidad de evaluaciones de las que desconoce la nota (1); Paso 3, a la nota mínima de aprobación (210) le restó el resultado del paso 2.',
    enunciado: '¿Cuál de los pasos del procedimiento es innecesario?',
    opciones: [
      'El paso 1, porque, al dividir la nota mínima de aprobación entre el número de evaluaciones, se obtiene la nota de la tercera evaluación.',
      'El paso 1, porque la nota de la tercera evaluación es independiente de las notas obtenidas en las dos primeras evaluaciones.',
      'El paso 2, porque la división se tiene que realizar para cada una de las notas de las primeras evaluaciones y después sí sumar los resultados.',
      'El paso 2, porque, al dividir la suma de las notas de las primeras dos evaluaciones entre la unidad, se obtiene el mismo resultado.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Dividir 130 entre 1 (la unidad) no cambia el valor, por lo que ese paso no aporta nada al cálculo final.',
  },
  {
    id: 's1-mat-11',
    area: 'matematicas',
    contexto:
      'Valores de pH: detergente 12, zumo de limón 2, leche 6, hidróxido de sodio 14. Procedimiento para la mediana: Paso 1, ordenar de mayor a menor; Paso 2, identificar los dos valores centrales; Paso 3, promediar esos dos valores.',
    enunciado: '¿Qué característica debe tener el resultado de la mediana del pH para las 4 sustancias?',
    opciones: [
      'Ser un número terminado en dígito par.',
      'Ser un número entero positivo.',
      'Ser un número entero menor que 2.',
      'Ser un número con solo un dígito decimal igual a 5.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Ordenados: 14, 12, 6, 2. La mediana es (12+6)/2 = 9, que es un número entero positivo.',
  },
  {
    id: 's1-mat-12',
    area: 'matematicas',
    contexto:
      'Hexágono regular de lado L = 2 m, con apotema a. Procedimiento: Paso 1, sumar L seis veces (perímetro); Paso 2, multiplicar el resultado por la apotema; Paso 3, dividir entre dos.',
    enunciado: '¿Cuál es el valor del área del hexágono resultante de este procedimiento?',
    opciones: ['12√3 m²', '3√3 m²', '4√3 m²', '6√3 m²'],
    respuestaCorrecta: 3,
    explicacion:
      'Perímetro = 6×2 = 12 m. Apotema de un hexágono regular de lado 2 es √3 m. Área = (perímetro × apotema)/2 = (12×√3)/2 = 6√3 m².',
  },
  {
    id: 's1-mat-13',
    area: 'matematicas',
    contexto:
      'Estudio de supervivencia de truchas de color brillante y de color pardo en un arroyo cerrado, comenzando con 100 de cada tipo (200 en total). La población total se mantiene alrededor de 100 individuos en los años siguientes, en lugar de reducirse constantemente a la mitad cada año.',
    enunciado:
      'Una persona afirma que la mezcla de tipos de trucha hace que cada año la población total se reduzca a la mitad. ¿Es verdadera la afirmación?',
    opciones: [
      'Sí, porque en el año 0 había 200 truchas y al cabo del año 1 había 100 truchas.',
      'No, porque al final del primer año la cantidad de truchas de cada tipo es diferente de 50.',
      'No, porque a partir del primer año el número total de truchas se mantiene alrededor de 100.',
      'Sí, porque 100 de las 200 truchas que había inicialmente eran de cada tipo disponible.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Después del primer año la población total no sigue reduciéndose a la mitad: se estabiliza alrededor de 100, lo que contradice la afirmación de reducción constante.',
  },
  {
    id: 's1-mat-14',
    area: 'matematicas',
    contexto:
      'Un examen de 4 preguntas a 10 estudiantes: Pregunta 1, 70 % de respuestas correctas; Pregunta 2, 80 %; Pregunta 3, 40 %; Pregunta 4, 70 %. Se presentan cuatro gráficas (A-D) con esta información.',
    enunciado: '¿Cuál de las siguientes gráficas muestra exactamente la misma información de la tabla?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 3,
    explicacion: 'Verificar con el PDF: de las cuatro gráficas, la opción D es la única con una escala de eje (0 %-90 %) que permite leer exactamente 70 %, 80 %, 40 % y 70 % para las preguntas 1 a 4; confirmar visualmente contra el cuadernillo.',
  },
  {
    id: 's1-mat-15',
    area: 'matematicas',
    contexto:
      'Encuesta a niños menores de 5 años: jugar es la actividad favorita del 98 % de los encuestados. Una gráfica adicional muestra la frecuencia con la que juegan (todos los días, varias veces a la semana, una vez a la semana, una vez al mes).',
    enunciado:
      'Una persona afirma que la suma de los porcentajes de las frecuencias con las que los niños prefieren jugar debería ser igual a 98 %. ¿Es verdadera la afirmación?',
    opciones: [
      'Sí, porque al realizar la suma de los porcentajes, el resultado obtenido es 100 % y debería ser 98 %, que es el total de niños encuestados.',
      'Sí, porque el mayor porcentaje que aparece en la gráfica es 98 %.',
      'No, porque el 98 % representa el total de niños a los que les gusta jugar y los demás porcentajes se refieren a la frecuencia de juego de los niños.',
      'No, porque al realizar la suma de los porcentajes, el resultado obtenido es 198 %, que es el total de niños encuestados.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El 98 % es la proporción de niños a quienes les gusta jugar (una variable), mientras que la frecuencia con la que juegan es otra variable distinta; no tienen por qué sumar lo mismo.',
  },
  {
    id: 's1-mat-16',
    area: 'matematicas',
    contexto:
      'Registro de medallas por género en unas competencias (Oro, Plata, Bronce, por Mujeres y Hombres). Un periódico publica una gráfica con esa información, pero las barras de uno de los géneros no coinciden con los datos registrados originalmente.',
    enunciado: '¿Es correcta la representación hecha por el periódico con base en el registro de las competencias?',
    opciones: [
      'No, porque las frecuencias para cada tipo de medalla correspondiente al género "hombres" no son las registradas originalmente.',
      'No, porque las frecuencias para cada tipo de medalla correspondiente al género "mujeres" no son las registradas originalmente.',
      'Sí, porque las frecuencias para cada tipo de medalla y género son las registradas originalmente.',
      'Sí, porque las frecuencias presentan un orden para cada tipo de medalla y género respecto a las registradas originalmente.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: la tabla y la gráfica del periódico deben compararse visualmente para confirmar cuál género aparece con las barras intercambiadas respecto al registro original.',
  },
  {
    id: 's1-mat-17',
    area: 'matematicas',
    contexto:
      'Funciones de costo C1(x) = x² + x + 3 y C2(x) = 3x² − 3x − 3. Procedimiento para calcular C2 − C1: Paso 1, 3x² − 3x − 3 − (x² + x + 3); Paso 2, agrupar términos semejantes: 3x² − x² − 3x + x − 3 + 3; Paso 3, simplificar: 2x² − 2x. Conclusión: la diferencia es 2x² − 2x.',
    enunciado: '¿Hay algún error en este procedimiento?',
    opciones: [
      'No, pues en el paso 3 se realiza de forma correcta la suma de términos semejantes.',
      'No, porque el signo menos solo afecta al primer término de la segunda expresión en el paso 2.',
      'Sí, pues en el paso 2 se usa de manera incorrecta la propiedad distributiva del signo menos.',
      'Sí, pues se observa que el resultado depende únicamente de la cantidad de artículos producidos en el paso 3.',
    ],
    respuestaCorrecta: 2,
    explicacion:
      'Al distribuir el signo menos sobre (x² + x + 3) debía obtenerse −x² − x − 3; en el paso 2 se usó "+x" y "+3" en vez de "−x" y "−3", un error en la propiedad distributiva del signo menos.',
  },
  {
    id: 's1-mat-18',
    area: 'matematicas',
    contexto:
      'Encuesta a profesores de un colegio sobre edad, estado civil, horas trabajadas por semana y título universitario obtenido. Procedimiento: Paso 1, hallar el rango estadístico de cada variable seleccionada; Paso 2, sumar los resultados; Paso 3, dividir entre el número de preguntas evaluadas.',
    enunciado: '¿Con cuáles de las variables se puede realizar el procedimiento planteado?',
    opciones: [
      'Edad y estado civil.',
      'Edad y número de horas que trabajan semanalmente.',
      'Título universitario y estado civil.',
      'Título universitario y número de horas que trabajan semanalmente.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'El rango estadístico solo se puede calcular con variables cuantitativas; edad y horas trabajadas son numéricas, mientras que estado civil y título universitario son categóricas.',
  },
  {
    id: 's1-mat-19',
    area: 'matematicas',
    contexto:
      'Tabla de tensión arterial de 4 personas, con presión diastólica (mmHg), presión sistólica (mmHg) y un nivel categórico (Normal, Elevada, Hipertensión I, Hipertensión II). Procedimiento para desviación estándar: Paso 1, calcular la varianza; Paso 2, calcular la raíz cuadrada de la varianza.',
    enunciado: '¿Para cuáles variables se puede aplicar este procedimiento?',
    opciones: [
      'Persona y Nivel.',
      'Persona, Presión diastólica y Presión sistólica.',
      'Presión diastólica y Presión sistólica.',
      'Persona, Presión diastólica, Presión sistólica y Nivel.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La desviación estándar requiere variables cuantitativas; Persona y Nivel son variables categóricas/identificadoras, por lo que solo aplica a las presiones diastólica y sistólica.',
  },
  {
    id: 's1-mat-20',
    area: 'matematicas',
    contexto:
      'Una etiqueta indica que una solución debe conservarse a una temperatura T tal que −8 °C ≤ T < −2 °C. Se presentan cuatro neveras con distintos rangos de temperatura.',
    enunciado: '¿Cuál de las siguientes neveras tiene una temperatura adecuada para conservar la muestra?',
    opciones: ['−12 °C < T < −8 °C', '8 °C < T < 12 °C', '3 °C < T < 5 °C', 'Rango dentro de −8 °C ≤ T < −2 °C'],
    respuestaCorrecta: 3,
    explicacion: 'Las opciones A, B y C quedan fuera del intervalo exigido (−8 °C a −2 °C); solo una nevera con rango contenido en ese intervalo es adecuada. Verificar con el PDF el rango exacto de la opción D.',
  },
  {
    id: 's1-mat-21',
    area: 'matematicas',
    contexto:
      'Tabla 1 con ubicación de avenidas, calles y diagonales de una ciudad (Avenida Océano: Oeste; Calle Santa María: Norte; Calle Primera: Centro; Diagonal Esperanza: Sur/Sureste). Tabla 2 describe relaciones entre vías: Avenida Océano perpendicular a calle Primera; Calle Santa María paralela a calle Segunda; Diagonal Esperanza oblicua a las tres calles. Se presentan varios mapas posibles.',
    enunciado: '¿Cuál de los siguientes mapas ubicaría correctamente al turista?',
    opciones: ['Mapa A', 'Mapa B', 'Mapa C', 'Mapa D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: la respuesta depende de comparar visualmente los 4 mapas contra las relaciones de perpendicularidad, paralelismo y oblicuidad descritas en la Tabla 2.',
  },
  {
    id: 's1-mat-22',
    area: 'matematicas',
    contexto:
      'Para sujetar un poste que está por caerse, una persona usará una cuerda formando un triángulo con un ángulo de 20° y una medida de referencia de 20 (unidades de la figura).',
    enunciado: '¿Cuál de los siguientes procedimientos permite calcular la longitud y de la cuerda?',
    opciones: ['Fórmula A (con seno de 20°)', 'Fórmula B (con seno de 20°)', 'Fórmula C (con seno de 120°)', 'Fórmula D'],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: la pregunta aplica la ley de senos sobre el triángulo formado por el poste, la cuerda y el suelo; se requiere confirmar la fórmula exacta de cada opción contra la imagen original.',
  },
  {
    id: 's1-mat-23',
    area: 'matematicas',
    contexto:
      'Seis trabajadores recogen café durante un día. Una gráfica de barras muestra los kilogramos recogidos por cada uno de los 6 trabajadores (eje con valores hasta 180 kg).',
    enunciado: 'Con base en la información de la gráfica, ¿cuál fue el promedio de café recolectado por trabajador?',
    opciones: ['90 kilogramos.', '110 kilogramos.', '120 kilogramos.', '130 kilogramos.'],
    respuestaCorrecta: 1,
    explicacion: 'Verificar con el PDF: el promedio se calcula sumando los kilogramos de las 6 barras de la gráfica y dividiendo entre 6; los valores individuales no se pudieron extraer como texto.',
  },
  {
    id: 's1-mat-24',
    area: 'matematicas',
    contexto:
      'Los tres primeros elementos del grupo I de la tabla periódica son hidrógeno (H), litio (Li) y sodio (Na), con números atómicos 1, 3 y 11 respectivamente. Sus energías de ionización son: H = 1.312 kJ/mol, Li = 520 kJ/mol, Na = 496 kJ/mol.',
    enunciado: '¿Cuál de las siguientes listas muestra el símbolo, el número atómico y la energía de ionización para los tres elementos?',
    opciones: [
      '(1, 1.312) / (3, 520) / (11, 496)',
      '(H, 1, 1.312) / (Li, 3, 520) / (Na, 11, 496)',
      '(H, 1, 496) / (Li, 3, 520) / (Na, 11, 1.312)',
      '(1, 496) / (3, 520) / (11, 1.312)',
    ],
    respuestaCorrecta: 1,
    explicacion: 'La lista debe asociar correctamente símbolo, número atómico y energía de ionización de cada elemento: H(1, 1.312), Li(3, 520), Na(11, 496).',
  },
  {
    id: 's1-mat-25',
    area: 'matematicas',
    contexto:
      'Para medir el perímetro de una piscina rectangular, un turista contó 80 baldosas cuadradas de lado 20 cm que la rodean, excluyendo las baldosas de las esquinas (porque no contribuyen al cálculo del perímetro).',
    enunciado: '¿Cuál es el perímetro de la piscina, medido en centímetros?',
    opciones: ['400 cm', '1.600 cm', '6.400 cm', '32.000 cm'],
    respuestaCorrecta: 1,
    explicacion: 'Como las baldosas de las esquinas no se cuentan para el perímetro, este se calcula como 80 × 20 cm = 1.600 cm.',
  },
]
