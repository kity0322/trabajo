import type { Question } from '../questions'

// Transcrito de "JMES PRIMERA SESIÓN 2023" — Ciencias Naturales (preguntas 92-120)
// El cuadernillo original no trae clave de respuestas; se infieren por
// razonamiento científico. Varias preguntas (93, 98, 106, 114, 117) dependen
// de imágenes/gráficas que no se pudieron reconstruir fielmente como texto;
// quedan señaladas para verificación contra el PDF original.
export const s1Ciencias: Question[] = [
  {
    id: 's1-cie-92',
    area: 'ciencias',
    contexto:
      'Juan mide la temperatura de su computadora con dos termómetros, obteniendo mediciones distintas para cada uno a lo largo de 7 mediciones. Su objetivo es representar los datos para visualizar las diferencias entre las medidas de ambos termómetros.',
    enunciado: '¿Cuál de las siguientes gráficas es la más adecuada para que Juan cumpla con su objetivo?',
    opciones: [
      'Gráfica A (barras con eje en porcentaje).',
      'Gráfica B (combina número de medición como si fuera un dato de temperatura).',
      'Gráfica C: barras de Termómetro 1 y Termómetro 2 agrupadas por número de medición.',
      'Gráfica D (sin series diferenciadas por termómetro).',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Para comparar diferencias entre dos termómetros en cada medición, se necesita un gráfico que agrupe ambas series (Termómetro 1 y 2) por número de medición, no uno que use porcentajes o mezcle el número de medición como si fuera un dato de temperatura.',
  },
  {
    id: 's1-cie-93',
    area: 'ciencias',
    contexto:
      'Juan elabora una brújula casera con una aguja imantada flotando sobre un trozo de corcho en una taza de agua; la aguja se orienta en una dirección específica mostrada en una figura.',
    enunciado: '¿Cuál será la dirección del campo magnético terrestre que hace que la aguja se oriente como se muestra en la figura?',
    opciones: ['Dirección A', 'Dirección B', 'Dirección C', 'Dirección D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: la respuesta depende de la orientación exacta de la aguja mostrada en la figura (norte-sur magnético), que no se pudo extraer como texto.',
  },
  {
    id: 's1-cie-94',
    area: 'ciencias',
    contexto:
      'Las superficies tienen rugosidades microscópicas; el área real de contacto (menor que el área aparente) aumenta con la presión. Una estudiante concluyó, tras experimentar modificando el área aparente de contacto entre dos superficies, que esta no afecta la fuerza de rozamiento.',
    enunciado: '¿Cuál de los siguientes modelos apoya la conclusión a la que llegó la estudiante?',
    opciones: [
      'Al disminuir el área aparente de contacto, aumenta la presión existente entre los dos cuerpos, aumentando la fuerza de rozamiento.',
      'Al disminuir el área aparente de contacto, aumenta la fuerza de rozamiento debido a que la presión ejercida en la superficie disminuye.',
      'Al aumentar el área real de contacto, aumenta la interacción entre los cuerpos; así, se incrementa la fuerza de rozamiento.',
      'Al aumentar el área real de contacto, disminuye la presión entre las dos superficies, lo que compensa el aumento del área aparente.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El rozamiento depende del área REAL de contacto (que varía con la presión), no del área aparente; por eso modificar el área aparente no cambia necesariamente la fuerza de rozamiento.',
  },
  {
    id: 's1-cie-95',
    area: 'ciencias',
    contexto:
      'En un colegio, el 82 % de los estudiantes almacena sus residuos electrónicos en casa por no saber qué hacer con ellos. Se organiza una jornada de clasificación de desechos electrónicos para aprovechar los metales.',
    enunciado: 'Un estudiante propone quemar allí mismo el material excedente para extraer los metales. ¿La anterior propuesta es ambientalmente correcta?',
    opciones: [
      'Sí, porque de esta manera los residuos electrónicos se pueden usar como combustible para reemplazar el carbón.',
      'No, porque en el proceso de quema se pueden generar reacciones en otros materiales que pueden ser contaminantes.',
      'Sí, porque las pantallas y plásticos son residuos aprovechables y los residuos de la quema se podrían usar como fertilizantes.',
      'No, porque a los estudiantes se les dificulta desprenderse de sus residuos electrónicos y prefieren darle un uso aprovechable en su casa.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Quemar residuos electrónicos puede liberar sustancias tóxicas (plásticos, metales pesados) que contaminan el aire, por lo que no es una práctica ambientalmente adecuada.',
  },
  {
    id: 's1-cie-96',
    area: 'ciencias',
    contexto: 'De los metales que componen los residuos electrónicos, se afirma que el cobre es el mejor conductor de corriente eléctrica.',
    enunciado: '¿La anterior conclusión cuenta con las evidencias suficientes para ser respaldada?',
    opciones: [
      'No, porque no se dan a conocer las propiedades eléctricas de los metales.',
      'Sí, porque los porcentajes están relacionados con las propiedades eléctricas.',
      'No, porque otro metal tiene propiedades similares en los residuos electrónicos.',
      'Sí, porque el cobre es el metal que más se encuentra en los residuos electrónicos.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'La gráfica solo muestra la composición porcentual (masa) de los residuos, no las propiedades eléctricas de los metales, por lo que no hay evidencia suficiente para esa conclusión.',
  },
  {
    id: 's1-cie-97',
    area: 'ciencias',
    contexto: 'Gráfica de composición porcentual de residuos electrónicos por tipo de metal (hierro, cobre, aluminio, oro, plata, cobalto, otros).',
    enunciado: 'Teniendo en cuenta los metales que componen los residuos electrónicos, ¿qué relación existe entre la cantidad de masa que se puede recuperar de algunos de ellos?',
    opciones: [
      'Que la cantidad de masa de plata y cobalto es menor que la de aluminio.',
      'Que la cantidad de masa es similar en el aluminio y metales tóxicos.',
      'Que la cantidad de masa de hierro y cobre es mayor que la de "Otros metales".',
      'Que la cantidad de masa es similar en el oro y la plata.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: en la composición típica de residuos electrónicos, el hierro y el cobre representan una proporción de masa considerablemente mayor que la categoría "Otros metales".',
  },
  {
    id: 's1-cie-98',
    area: 'ciencias',
    contexto:
      'Tabla de índice de viscosidad de un aceite de carro según la temperatura mínima a la que puede fluir: -35 °C → 0 centistokes, -30 °C → 5, -25 °C → 10, -20 °C → 15, -15 °C → 20 (relación lineal creciente entre temperatura y viscosidad).',
    enunciado: '¿Cuál de las siguientes gráficas ilustra los datos de la tabla?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 1,
    explicacion: 'Verificar con el PDF: la gráfica correcta debe mostrar una relación lineal creciente entre la temperatura mínima de fluidez (de -35 °C a -15 °C) y el índice de viscosidad (de 0 a 20 centistokes).',
  },
  {
    id: 's1-cie-99',
    area: 'ciencias',
    contexto:
      'La hemoglobina es una proteína férrica producida en la médula ósea a partir de alimentos ricos en hierro, cuya función es transportar oxígeno de los pulmones a los tejidos. Su déficit causa anemia.',
    enunciado: '¿Qué efecto podría tener la deficiencia de hierro en el cuerpo humano?',
    opciones: [
      'Alteración del ciclo circadiano.',
      'Aumento de la masa corporal.',
      'Disminución en la oxigenación de las células.',
      'Cambios en el material genético de las células.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Si falta hierro, se produce menos hemoglobina y, por tanto, se transporta menos oxígeno a los tejidos, disminuyendo la oxigenación celular (como ocurre en la anemia).',
  },
  {
    id: 's1-cie-100',
    area: 'ciencias',
    contexto:
      'Un estudio relaciona el aumento de enfermedades respiratorias por material particulado (MP10) con el porcentaje de área industrial y de urbanización en cuatro zonas de una ciudad.',
    enunciado: 'De acuerdo con la información y la gráfica, ¿cuál es una posible solución para disminuir la incidencia de enfermedades respiratorias en esta ciudad?',
    opciones: [
      'Reducir la actividad de la industria y distribuir las áreas industriales de manera equitativa por toda la ciudad.',
      'Regular el crecimiento urbano y capacitar a los ciudadanos en prácticas que generen menos contaminación.',
      'Regular el crecimiento industrial y realizar actividades de prevención en las zonas de mayor contaminación.',
      'Regular el crecimiento urbano y aumentar el área industrial para que se genere menos contaminación.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La solución más coherente combina regular la fuente principal de contaminación (la industria) con medidas de prevención focalizadas en las zonas más afectadas.',
  },
  {
    id: 's1-cie-101',
    area: 'ciencias',
    contexto:
      'Un estudiante registra la producción mensual de residuos de su institución por categoría: plástico y latas, orgánico, vidrio, papel y cartón. El material orgánico (alrededor de 5.286 kg en el total registrado) es, por mucho, la categoría de mayor masa, seguida de papel y cartón (2.841 kg), siendo plástico y vidrio categorías menores. La alcaldía solicita reducir a la mitad la producción total de residuos.',
    enunciado: 'De acuerdo con lo solicitado por la alcaldía, ¿cuál de las siguientes propuestas le permitirá solucionar la problemática al estudiante?',
    opciones: [
      'Iniciar un programa de compostaje para aprovechar el material orgánico, papel y cartón.',
      'Eliminar las canecas de reciclaje para evitar la producción de plástico, latas, papel y cartón.',
      'Prohibir la venta de plásticos de un solo uso, botellas de vidrio y latas en la tienda escolar.',
      'Realizar campañas en la comunidad que promuevan la reducción de material no reciclable.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Como el material orgánico (y el papel/cartón) representa la mayor parte de la masa total de residuos, una estrategia de compostaje enfocada en esas categorías tendría el mayor impacto para reducir la producción total a la mitad.',
  },
  {
    id: 's1-cie-102',
    area: 'ciencias',
    contexto:
      'Las algas tienen metabolismo mixótrofo (obtienen energía de la luz y de compuestos orgánicos). En un experimento, el cultivo 1 recibió luz y compuestos orgánicos (alcanzó 36 g/L de algas); el cultivo 2 solo recibió luz, sin compuestos orgánicos adicionados (alcanzó 18 g/L de algas), ambos a temperatura constante.',
    enunciado: '¿Por qué crecieron las algas en el cultivo 2 si estas no contaban con la adición de compuestos orgánicos en su medio?',
    opciones: [
      'Porque al mantenerse la temperatura constante, las algas pudieron crecer.',
      'Porque las algas estaban inhibiendo su crecimiento con los compuestos orgánicos.',
      'Porque las algas utilizaron los nutrientes excretados por ellas mismas para crecer.',
      'Porque las algas utilizaron la luz para producir energía por la fotosíntesis y crecer.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Al ser mixótrofas, las algas pueden obtener energía de la luz mediante fotosíntesis incluso sin compuestos orgánicos disponibles, lo que explica su crecimiento (aunque menor) en el cultivo 2.',
  },
  {
    id: 's1-cie-103',
    area: 'ciencias',
    contexto:
      'Noticia 1: aparecen peces muertos en una quebrada cerca de un pueblo. Noticia 2: una fábrica de pinturas cercana vierte aguas residuales mal tratadas a las fuentes hídricas cercanas.',
    enunciado: '¿Cuál de las siguientes explicaciones relaciona ambas noticias?',
    opciones: [
      'El tratamiento inadecuado de los desechos y el vertimiento de las aguas residuales de la fábrica de pinturas no afecta la vida de los peces.',
      'La aparición de los peces muertos no tiene nada que ver con las aguas residuales, ya que no son dañinas para el medio ambiente.',
      'Los peces tienen menor cantidad de nutrientes disponibles, porque la fábrica de pinturas usa el agua de la quebrada en sus procesos industriales.',
      'El agua de la quebrada se afecta por el vertimiento de desechos y aguas residuales de la fábrica, impactando negativamente la vida de los peces.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'El vertimiento de aguas residuales mal tratadas contamina la quebrada, lo que explica directamente la muerte de los peces reportada en la primera noticia.',
  },
  {
    id: 's1-cie-104',
    area: 'ciencias',
    contexto:
      'Clasificación de la materia: sustancias puras (elementos y compuestos) y mezclas (homogéneas y heterogéneas). En un medicamento, el principio activo es una molécula con actividad biológica definida, y los excipientes son compuestos sólidos o líquidos que mejoran su distribución y liberación.',
    enunciado: 'De acuerdo con la tabla, ¿cómo se clasifican el principio activo y los excipientes del medicamento?',
    opciones: ['Ambos son sustancias puras.', 'Ambos son mezclas homogéneas.', 'Ambos son mezclas heterogéneas.', 'Ambos son elementos.'],
    respuestaCorrecta: 0,
    explicacion: 'Tanto el principio activo (una molécula definida) como los excipientes (compuestos definidos) son sustancias puras (compuestos), no mezclas; la mezcla se forma al combinarlos en el medicamento final.',
  },
  {
    id: 's1-cie-105',
    area: 'ciencias',
    contexto:
      'La electronegatividad es la capacidad de un elemento de atraer electrones en un enlace. Una pequeña diferencia de electronegatividad produce enlaces covalentes; una gran diferencia produce enlaces iónicos.',
    enunciado: '¿Qué tipo de enlace se forma entre el elemento Cl y el elemento Cs?',
    opciones: [
      'Iónico, ya que el Cl tiene una alta electronegatividad respecto al Cs.',
      'Covalente, ya que el Cl tiene una alta electronegatividad respecto al Cs.',
      'Iónico, ya que el Cl tiene una baja electronegatividad respecto al Cs.',
      'Covalente, ya que el Cl y el Cs están separados en la tabla periódica.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El cloro (halógeno, alta electronegatividad) y el cesio (metal alcalino, muy baja electronegatividad) tienen una gran diferencia de electronegatividad, lo que produce un enlace iónico (como en el CsCl).',
  },
  {
    id: 's1-cie-106',
    area: 'ciencias',
    contexto:
      'Dos cuerpos cilíndricos pequeños con igual carga positiva se colocan en los extremos de un palo de madera; se acerca una pequeña esfera cargada positivamente. Se dibuja la fuerza ejercida por el cilindro 2 sobre la esfera.',
    enunciado: '¿Cuál es la magnitud y dirección de la fuerza que ejerce el cilindro 1 sobre la esfera, en relación a la fuerza que ejerce el cilindro 2?',
    opciones: [
      'Mayor que la magnitud de la fuerza generada por el cilindro 2 y hacia arriba de la esfera.',
      'Igual a la magnitud de la fuerza generada por el cilindro 2 y hacia la izquierda de la esfera.',
      'Igual a la magnitud de la fuerza generada por el cilindro 2 y hacia abajo de la esfera.',
      'Menor que la magnitud de la fuerza generada por el cilindro 2 y hacia la derecha de la esfera.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Verificar con el PDF: al tener ambos cilindros la misma carga, la magnitud de la fuerza eléctrica depende de la distancia a la esfera mostrada en la figura, que no se pudo extraer como texto.',
  },
  {
    id: 's1-cie-107',
    area: 'ciencias',
    contexto:
      'Un profesor explica que la inducción electromagnética se genera cuando hay un cambio en el campo magnético. Al pasar un imán por el centro de una bobina de cobre conectada a un led, este se enciende; al dejar el imán quieto, el led se apaga.',
    enunciado: '¿Por qué el led deja de emitir luz cuando el imán se encuentra estático?',
    opciones: [
      'Porque cuando un campo magnético se encuentra estático no genera el campo eléctrico que enciende el bombillo led.',
      'Porque la bobina pierde las propiedades de conductividad eléctrica cuando el campo magnético se encuentra estático.',
      'Porque el campo magnético del imán pierde sus propiedades magnéticas cuando deja de moverse continuamente.',
      'Porque el campo eléctrico que produce la bobina se cancela con el campo magnético del imán cuando este está quieto.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'La inducción electromagnética (ley de Faraday) requiere un cambio en el flujo magnético; un campo magnético estático no induce corriente eléctrica, por lo que el led se apaga.',
  },
  {
    id: 's1-cie-108',
    area: 'ciencias',
    contexto:
      'Tabla de aportes de CO2 por actividad: Transporte 14,3 %, Industrias de la energía 10,7 %, Industrias manufactureras y de la construcción 9,5 %, Gases de animales 20,7 %, Zona de cultivo 20,3 %, Emisión del suelo 6,3 %, Bosques y praderas 11,4 %, Disposición de residuos sólidos en la tierra 7,2 %.',
    enunciado: 'De acuerdo con lo anterior, ¿cuál de las siguientes gráficas muestra correctamente los datos reportados?',
    opciones: [
      'Gráfica A (categorías agrupadas de forma genérica como "Energía" repetida).',
      'Gráfica B (categorías agrupadas de forma genérica, sin discriminar cada actividad).',
      'Gráfica C (agrupa en macrocategorías: Energía, Agricultura, Uso del suelo, Residuos, con porcentajes distintos a los reportados).',
      'Gráfica D: Transporte 14,3 %, Industrias de la energía 10,7 %, Industrias manufactureras y de la construcción 9,5 %, Gases de animales 20,7 %, Zona de cultivo 20,3 %, Emisión del suelo 6,3 %, Bosques y praderas 11,4 %, Disposición de residuos sólidos en la tierra 7,2 %.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Solo la gráfica D reproduce exactamente las categorías y los porcentajes específicos reportados en la tabla original, sin agruparlos ni alterarlos.',
  },
  {
    id: 's1-cie-109',
    area: 'ciencias',
    contexto: 'La comunidad decide aumentar las áreas de cultivo de caña de azúcar, yuca y maíz (usados para producir etanol) frente a otros productos agrícolas.',
    enunciado: '¿Por qué debe regularse el uso del etanol como biocombustible?',
    opciones: [
      'Porque fomentar los cultivos para producir etanol puede desequilibrar la producción de otros alimentos necesarios en la región.',
      'Porque el uso de etanol como combustible limita la cantidad de carros que pueden usarse dentro de la zona.',
      'Porque al utilizar el etanol como combustible disminuye la potencia de los motores de los carros de la zona.',
      'Porque se restringe el uso de etanol solo para carros que sean empleados en la producción de otros tipos de alimentos.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Si se destinan más tierras a cultivos para producir etanol (caña, yuca, maíz), se reduce la producción de esos mismos cultivos como alimento, generando un conflicto entre uso energético y alimentario.',
  },
  {
    id: 's1-cie-110',
    area: 'ciencias',
    contexto:
      'Los estudiantes habían propuesto una mezcla de 90 % etanol y 10 % gasolina. Nueva información indica que basta con mezclar el etanol en un porcentaje menor al 5 % en carros comunes para reducir considerablemente las emisiones de CO2 sin afectar el motor.',
    enunciado: '¿Esta nueva información contradice o apoya la propuesta de los estudiantes?',
    opciones: [
      'La apoya, porque se reducen completamente las emisiones de CO2.',
      'La contradice, porque para reducir las emisiones sin afectar el motor de los carros no es necesario usar una mezcla de 90 % de etanol.',
      'La contradice, porque el motor de los carros no se ve afectado.',
      'La apoya, porque no importa el porcentaje de etanol que se mezcle con la gasolina, ya que nunca se afectarán los motores de los carros.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Si con menos del 5 % de etanol ya se logra reducir considerablemente las emisiones sin afectar el motor, la propuesta original de usar 90 % de etanol resulta innecesaria y queda contradicha.',
  },
  {
    id: 's1-cie-111',
    area: 'ciencias',
    contexto:
      'La breva (higo) tiene un receptáculo que guarda flores internas; tras la polinización por avispas, estas depositan sus huevos dentro sin afectar las flores, y el árbol produce frutos con semillas gracias a esa polinización.',
    enunciado: 'Teniendo en cuenta el ciclo de vida del árbol de breva, ¿cuál es la interacción presente entre este y las avispas?',
    opciones: [
      'El árbol de breva se ve afectado por las avispas, mientras que las avispas se benefician del árbol.',
      'El árbol de breva se beneficia de las avispas, y las avispas también se benefician del árbol de breva.',
      'El árbol de breva se beneficia de las avispas, mientras las avispas se ven afectadas por el árbol.',
      'El árbol de breva se ve afectado por las avispas, y las avispas también se ven afectadas por el árbol.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Es una relación de mutualismo: el árbol se beneficia de la polinización que realizan las avispas, y estas se benefician al depositar sus huevos protegidos dentro del receptáculo.',
  },
  {
    id: 's1-cie-112',
    area: 'ciencias',
    contexto: 'Práctica de laboratorio con huevos de gallina sumergidos en vinagre, luego en agua y miel, midiendo masa de los huevos y volumen de los líquidos.',
    enunciado: '¿Qué unidades de medida se deben utilizar para determinar con precisión el volumen de los líquidos y la masa de los huevos?',
    opciones: [
      'Mililitros para el líquido / Gramos para el huevo.',
      'Tazas para el líquido / Porciones para el huevo.',
      'Gramos para el líquido / Mililitros para el huevo.',
      'Porciones para el líquido / Tazas para el huevo.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Las unidades de medida precisas del sistema métrico son mililitros (volumen) y gramos (masa); las tazas y porciones no son unidades estandarizadas de laboratorio.',
  },
  {
    id: 's1-cie-113',
    area: 'ciencias',
    contexto:
      'Para una crema hidratante se debe mezclar 2 tazas de agua, una cucharada de jabón de manos y 1 taza de aceite mineral. La estudiante mezcló primero el agua con el aceite (sin el jabón, que actúa como emulsionante).',
    enunciado: 'De los siguientes procedimientos, ¿cuál puede aplicar para separar el aceite de la mezcla?',
    opciones: [
      'Pasar la mezcla a un recipiente transparente; esperar a que se separe en dos fases y el aceite será el que esté en mayor proporción.',
      'Agitar la mezcla y separarla por igual en dos recipientes; el primero tendrá el agua y el segundo el aceite.',
      'Pasar la mezcla a un recipiente transparente; esperar a que se separe en dos fases y el aceite será el que esté en menor proporción.',
      'Agitar la mezcla y separarla por igual en dos recipientes; el primero tendrá el aceite y el segundo el agua.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Sin el jabón como emulsionante, el agua y el aceite (inmiscibles) se separan por decantación en dos fases visibles; como se usó solo 1 taza de aceite frente a 2 de agua, el aceite es la fase en menor proporción.',
  },
  {
    id: 's1-cie-114',
    area: 'ciencias',
    contexto: 'Una nevera es empujada por una rampa con velocidad constante durante una mudanza.',
    enunciado: '¿Cuál de los siguientes diagramas de cuerpo libre muestra correctamente las fuerzas sobre la nevera?',
    opciones: ['Diagrama A', 'Diagrama B', 'Diagrama C', 'Diagrama D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: con velocidad constante, la fuerza neta debe ser cero, por lo que la fuerza aplicada debe equilibrar exactamente la fricción, y la normal debe equilibrar la componente perpendicular del peso; se requiere confirmar la orientación exacta de los vectores en cada diagrama.',
  },
  {
    id: 's1-cie-115',
    area: 'ciencias',
    contexto:
      'Un ingeniero observa una gráfica de temperatura del acero contra tiempo de un incendio en una edificación, y concluye que el acero colapsará después de 5 minutos porque, según un libro, el acero se debilita a 538 °C.',
    enunciado: '¿El ingeniero planteó una hipótesis o una suposición sin fundamento?',
    opciones: [
      'Es una suposición no fundamentada, puesto que los datos ofrecidos por la gráfica son insuficientes para dar un resultado.',
      'Es una hipótesis, ya que todos los metales tienden a colapsar con temperaturas superiores a los 500 °C.',
      'Es una suposición no fundamentada, puesto que los datos de temperatura no pueden llegar a relacionarse con los del tiempo.',
      'Es una hipótesis, ya que se basa en el comportamiento del acero y los datos de temperatura-tiempo.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'El ingeniero combina datos observables (la curva temperatura-tiempo) con conocimiento documentado del comportamiento del acero, lo que constituye una hipótesis fundamentada, no una suposición arbitraria.',
  },
  {
    id: 's1-cie-116',
    area: 'ciencias',
    contexto:
      'Para fabricar vidrio se calienta una mezcla heterogénea de arena, álcali y óxidos metálicos a 1.500 °C hasta fundirse completamente, formando una mezcla homogénea que luego se extiende, pule y enfría lentamente.',
    enunciado: '¿Qué ocurriría con la mezcla de arena, álcali y óxidos metálicos si se somete a una temperatura de 1.000 °C?',
    opciones: [
      'No se fundiría, por lo tanto no se formará la mezcla homogénea para la obtención del vidrio.',
      'Se demorará en fundir, por lo tanto habrán imperfecciones después de pulir el vidrio.',
      'Se enfriará más rápido, por lo tanto no se quebrará el vidrio antes de cortarlo.',
      'Se enfriará más lento, por lo tanto no sería necesario verterlo sobre la superficie metálica.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Si la temperatura necesaria para la fusión completa es de 1.500 °C, una temperatura menor (1.000 °C) sería insuficiente para fundir completamente la mezcla y formar el vidrio.',
  },
  {
    id: 's1-cie-117',
    area: 'ciencias',
    contexto:
      'Un disco se mueve con velocidad constante sobre una mesa de aire (fricción casi nula). Al apagar el aire, el disco se desliza sobre la mesa hasta detenerse por la fricción.',
    enunciado: '¿Cuál de las siguientes gráficas ilustra la velocidad del disco en el tiempo?',
    opciones: [
      'Velocidad constante todo el tiempo, sin cambios.',
      'Velocidad constante y luego disminuye gradualmente hasta cero tras apagar el aire.',
      'Velocidad aumenta continuamente desde el inicio.',
      'Velocidad es cero desde el inicio del movimiento.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Mientras hay aire (fricción casi nula) la velocidad se mantiene constante; al apagar el aire, la fricción actúa y la velocidad disminuye gradualmente hasta que el disco se detiene.',
  },
  {
    id: 's1-cie-118',
    area: 'ciencias',
    contexto:
      'En conejos, el color de pelo negro (N) es dominante sobre el café (n); el color café solo se manifiesta en condición homocigota recesiva (nn). Un criador cruza un macho negro heterocigoto con una hembra de color café.',
    enunciado: 'De las siguientes posibilidades de alelos, ¿cuál representa adecuadamente la condición genética de los dos conejos de este cruce?',
    opciones: ['Macho NN / Hembra nn', 'Macho Nn / Hembra nn', 'Macho Nn / Hembra Nn', 'Macho nn / Hembra nn'],
    respuestaCorrecta: 1,
    explicacion:
      'El macho negro heterocigoto debe ser Nn (tiene el alelo dominante N pero porta el recesivo n); la hembra café, al manifestar el fenotipo recesivo, debe ser homocigota nn.',
  },
  {
    id: 's1-cie-119',
    area: 'ciencias',
    contexto:
      'Tabla de materiales con igual masa: Madera (densidad 400 kg/m³, calor específico 0,12 kcal/kg°C, 39 s en llegar a 36 °C), Acero (densidad 7.850 kg/m³, calor específico 0,57, 9 s), Agua (densidad 1.000 kg/m³, calor específico 1,00, 70 s).',
    enunciado: 'Teniendo en cuenta los datos registrados en la tabla, ¿cuáles materiales se hunden en el agua y cuáles cambian de temperatura más fácilmente que el agua?',
    opciones: [
      'La madera y el acero se hunden, y ambos materiales cambian de temperatura más difícilmente en comparación con el agua.',
      'Solo el acero se hunde en el agua, mientras que la madera y el acero cambian de temperatura más fácilmente en comparación con el agua.',
      'La madera y el acero se hunden, mientras que solamente el acero cambia de temperatura más fácilmente en comparación con el agua.',
      'Solo el acero se hunde en el agua, mientras que la madera y el acero, al tener un calor específico menor a 1, no cambian de temperatura.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Solo el acero (7.850 kg/m³) tiene mayor densidad que el agua (1.000 kg/m³) y se hunde; tanto la madera como el acero tienen menor calor específico que el agua, por lo que cambian de temperatura más rápido (como confirman los tiempos de 39 s y 9 s frente a 70 s).',
  },
  {
    id: 's1-cie-120',
    area: 'ciencias',
    contexto:
      'Las células fotosintéticas (tejidos fuente) elaboran moléculas de azúcar usando luz solar; estos productos se transportan por el floema hacia tejidos no fotosintéticos (tejidos destino) de la planta.',
    enunciado: '¿Por qué es importante que existan tejidos fuente (fotosintéticos) en la planta?',
    opciones: [
      'Porque los tejidos fuente reciben energía en forma de azúcares de los tejidos destino de la planta.',
      'Porque los tejidos fuente elaboran agua que puede ser transportada por los vasos conductores.',
      'Porque las células fuente generan azúcares que se transportan a través del xilema de la planta.',
      'Porque las células fuente elaboran sustancias que se transportan a tejidos no fotosintéticos.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Los tejidos fuente producen azúcares mediante fotosíntesis, que luego son transportados (por el floema) a los tejidos no fotosintéticos que no pueden producir su propio alimento.',
  },
]
