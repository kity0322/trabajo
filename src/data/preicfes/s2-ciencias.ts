import type { Question } from '../questions'

// Transcrito de "JMES SEGUNDA SESIÓN 2023" — Ciencias Naturales (preguntas 51-79)
// El cuadernillo original no trae clave de respuestas; se infieren por
// razonamiento científico. Varias preguntas (56, 58, 69, 73, 74, 77) dependen
// de imágenes/gráficas o tuvieron pérdida de texto por mala calidad del
// escaneo original; quedan señaladas para verificación contra el PDF.
export const s2Ciencias: Question[] = [
  {
    id: 's2-cie-51',
    area: 'ciencias',
    contexto:
      'El dengue es transmitido por el mosquito Aedes aegypti. Como estrategia de control, se propone infectar a los mosquitos con una bacteria (tipo Wolbachia) que dificulta que el virus se reproduzca dentro de ellos; la bacteria no puede sobrevivir fuera del mosquito y se transmite de generación en generación a través de los huevos.',
    enunciado: 'Teniendo en cuenta que la bacteria no puede sobrevivir fuera del mosquito, ¿qué tipo de interacción está presente entre la bacteria y el mosquito Aedes aegypti?',
    opciones: [
      'Comensalismo, porque el mosquito ni se beneficia ni se perjudica de la interacción y la bacteria tiene dónde crecer.',
      'Parasitismo, porque la bacteria vive a expensas del mosquito y le causa un daño en el flujo genético.',
      'Mutualismo, porque la bacteria y el mosquito se benefician de la relación eliminando al virus.',
      'Competencia, porque la bacteria y el mosquito compiten por tener y transportar el virus.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'La bacteria obtiene un hábitat necesario para sobrevivir (se beneficia), mientras que el mosquito no resulta perjudicado por su presencia; esto corresponde a comensalismo.',
  },
  {
    id: 's2-cie-52',
    area: 'ciencias',
    contexto: 'En el laboratorio se infectó al 20 % de los mosquitos con la bacteria y se evaluó cuántas generaciones se necesitan para que el 100 % de la población esté infectada.',
    enunciado: '¿Por qué funcionaría esta estrategia para el control del dengue?',
    opciones: [
      'Porque desde la liberación de los mosquitos macho con la bacteria, todos los huevos que se pongan no eclosionarán y, por lo tanto, no habrán nuevos mosquitos que transmitan la enfermedad.',
      'Porque a medida que aumenten las generaciones y los mosquitos infectados con la bacteria, disminuirán los mosquitos con la capacidad de transmitir el dengue a las personas.',
      'Porque las personas ya no se enfermarán de dengue, pues todos los mosquitos liberados tendrán la bacteria y no podrán transmitir el virus.',
      'Porque todos los mosquitos liberados son hembras, y ya no se podrá transmitir el dengue, pues todos los mosquitos que nazcan tendrán la bacteria.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'La estrategia funciona de manera progresiva: a medida que la bacteria se propaga por generaciones, aumenta la proporción de mosquitos que no pueden transmitir el virus, reduciendo gradualmente la transmisión del dengue.',
  },
  {
    id: 's2-cie-53',
    area: 'ciencias',
    contexto:
      'Los investigadores plantean la hipótesis de que en la tercera generación de mosquitos el 100 % de la población estará infectada con la bacteria. Los resultados experimentales muestran la frecuencia de infección a lo largo de varias generaciones (0, 2, 4, 6, 8, 10).',
    enunciado: 'Teniendo en cuenta los resultados obtenidos a nivel de laboratorio, ¿qué se podría concluir respecto a la hipótesis planteada?',
    opciones: [
      'Que es falsa, porque después de nueve generaciones, la frecuencia de infección es 0 % en los mosquitos estudiados.',
      'Que es verdadera, porque al finalizar el ensayo realizado en el laboratorio la frecuencia de infección es del 100 %.',
      'Que es falsa, porque se requieren siete generaciones para lograr una infección del 100 % en los mosquitos estudiados.',
      'Que es verdadera, porque se mantiene la cantidad de infectados con la bacteria al 100 % durante tres generaciones consecutivas.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: si la gráfica muestra que el 100 % de infección se alcanza después de más de tres generaciones, la hipótesis de que esto ocurriría en la tercera generación resulta falsa.',
  },
  {
    id: 's2-cie-54',
    area: 'ciencias',
    contexto:
      'Un correntómetro mide la velocidad de una corriente de agua mediante una hélice que gira por el choque del agua contra sus aspas, conectada a un contador de revoluciones.',
    enunciado: '¿Cuáles formas de energía están presentes en el funcionamiento del correntómetro?',
    opciones: [
      'Energía química del agua y energía cinética del contador de revoluciones.',
      'Energía cinética del tornillo de bloqueo y energía potencial del contrapeso.',
      'Energía cinética del agua y energía cinética rotacional de la hélice.',
      'Energía potencial de la barra graduada y energía cinética del tornillo de bloqueo.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El agua en movimiento (energía cinética) hace girar la hélice (energía cinética rotacional), que es lo que permite medir la velocidad de la corriente.',
  },
  {
    id: 's2-cie-55',
    area: 'ciencias',
    contexto: 'El correntómetro usa un contador de revoluciones en el que un imán establece contacto eléctrico con un sensor que envía la señal al contador.',
    enunciado: '¿En qué parte del correntómetro se debe ubicar el imán para que el contador de revoluciones indique la velocidad de la corriente?',
    opciones: [
      'En la barra graduada, porque la velocidad del agua depende de la profundidad.',
      'En el tornillo de bloqueo, porque el imán estaría fijo en todo momento.',
      'En el contrapeso, porque es el elemento que da estabilidad al correntómetro.',
      'En la hélice, porque esta gira gracias a la velocidad del agua.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'El imán debe estar en la parte que gira con la corriente (la hélice) para que cada revolución genere una señal proporcional a la velocidad del agua.',
  },
  {
    id: 's2-cie-56',
    area: 'ciencias',
    contexto:
      'Luego de una prueba en un río, el correntómetro registró: profundidad 1,15 m → velocidad 0,16 m/s; 3,63 m → 0,54 m/s; 5,20 m → 0,90 m/s; 5,66 m → 1,09 m/s (relación creciente entre profundidad y velocidad registrada).',
    enunciado: '¿Cuál gráfica representa correctamente los resultados obtenidos por el correntómetro?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: la gráfica correcta debe mostrar una tendencia creciente entre la profundidad (de 1,15 a 5,66 m) y la velocidad registrada (de 0,16 a 1,09 m/s).',
  },
  {
    id: 's2-cie-57',
    area: 'ciencias',
    contexto:
      'Un experimento varía la cantidad de nitrógeno añadida a dos grupos de plantas durante 30 días. Grupo 1 (menos nitrógeno): hojas verdes, follaje abundante, crecimiento 60-80 cm, floración en la semana 8. Grupo 2 (más nitrógeno): hojas verde intenso, follaje muy abundante, crecimiento 70-100 cm, floración en la semana 5 (más temprana).',
    enunciado: 'Si se toma un nuevo grupo de plantas al que NO se le aplica ninguna cantidad de nitrógeno, ¿cuáles serán los resultados esperados después de 30 días?',
    opciones: [
      'Coloración de las hojas: Amarillas. Follaje: Abundante. Crecimiento: 70-90 cm. Floración: Semana 5.',
      'Coloración de las hojas: Verde. Follaje: Abundante. Crecimiento: 70-90 cm. Floración: Semana 8.',
      'Coloración de las hojas: Amarillas. Follaje: Muy poco. Crecimiento: 30-45 cm. Floración: Semana 10.',
      'Coloración de las hojas: Verde. Follaje: Muy poco. Crecimiento: 30-45 cm. Floración: Semana 2.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La deficiencia de nitrógeno típicamente causa clorosis (hojas amarillas), menor desarrollo foliar, menor crecimiento y retraso en la floración, un efecto aún más marcado que el del Grupo 1 (que sí recibió algo de nitrógeno).',
  },
  {
    id: 's2-cie-58',
    area: 'ciencias',
    contexto:
      'Un grupo de investigadores evalúa la capacidad de búsqueda de alimento (pecoreo) de una especie de abeja a diferentes velocidades de viento, dentro de un invernadero con un cultivo en floración, usando un ventilador para controlar la velocidad del viento.',
    enunciado: '¿Cuál de las siguientes gráficas puede corresponder adecuadamente a los resultados de la investigación?',
    opciones: ['Gráfica A', 'Gráfica B', 'Gráfica C', 'Gráfica D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: no fue posible recuperar las gráficas de opción del documento original. En general, se espera que el número de abejas pecoreando disminuya a medida que aumenta la velocidad del viento.',
  },
  {
    id: 's2-cie-59',
    area: 'ciencias',
    contexto:
      'En un bosque húmedo, los primates comen frutos y dispersan sus semillas en la materia fecal; los escarabajos coprófagos usan esa materia fecal como alimento y, al enterrarla junto con las semillas, favorecen su germinación. Ha aumentado la caza de primates, disminuyendo su número.',
    enunciado: '¿Qué efecto tiene esta situación sobre el ecosistema?',
    opciones: [
      'Aumento en la abundancia de plántulas, porque los primates dejan de consumir las semillas de los árboles frutales.',
      'Disminución en la generación de plántulas, porque hay disminución en la abundancia de materia fecal para los escarabajos.',
      'Aumento en la germinación de las semillas, porque más escarabajos entierran las semillas protegiéndolas de la depredación.',
      'Disminución en la abundancia de escarabajos, porque el número de semillas necesarias para su alimentación disminuye.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Menos primates implican menos materia fecal con semillas disponible para los escarabajos, lo que reduce el entierro de semillas y, por tanto, la generación de nuevas plántulas.',
  },
  {
    id: 's2-cie-60',
    area: 'ciencias',
    contexto:
      'Una red trófica muestra: una planta hospedera (primer nivel trófico) es consumida por juveniles de mosca blanca (segundo nivel trófico), que a su vez son presa de un chinche depredador y de una avispa parasitoide (ambos en el tercer nivel trófico), que compiten entre sí por las moscas blancas.',
    enunciado: '¿Por qué la competencia entre el chinche y la avispa influye en el mantenimiento de las comunidades de este ecosistema?',
    opciones: [
      'Porque permite la reducción de la población de moscas y, por tanto, una mayor supervivencia de la planta.',
      'Porque permite el aumento de la población de moscas y, por tanto, una menor supervivencia de la planta.',
      'Porque permite la reducción de la población de moscas y, por tanto, una menor supervivencia de la planta.',
      'Porque permite el aumento de la población de moscas y, por tanto, una mayor supervivencia de la planta.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'Al competir por el mismo recurso (las moscas blancas), tanto el chinche como la avispa contribuyen a reducir la población de moscas, lo que beneficia la supervivencia de la planta hospedera.',
  },
  {
    id: 's2-cie-61',
    area: 'ciencias',
    contexto: 'Una estudiante hace pasar una corriente eléctrica por agua, separando el O2 del H2 (electrólisis del agua), y se da cuenta de que su conclusión inicial es incorrecta.',
    enunciado: '¿Cuál de las siguientes conclusiones debería proponer?',
    opciones: [
      'Al final de la reacción se producen 2 moles de H2 por cada mol de O2.',
      'Al final de la reacción se producen 4 moles de H2 y 2 moles de O2.',
      'Al final de la reacción se obtienen 4 moléculas de H2 y 2 moléculas de O2.',
      'Al final de la reacción se obtienen 2 gramos de H2 por cada 16 gramos de O2.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'La electrólisis del agua sigue la ecuación 2 H2O → 2 H2 + O2, por lo que se producen 2 moles de H2 por cada mol de O2 (relación molar 2:1).',
  },
  {
    id: 's2-cie-62',
    area: 'ciencias',
    contexto: 'Se deja caer un carro por una rampa para que choque contra un resorte, conservándose la energía mecánica. Al aumentar la altura desde la que se deja caer el carro, aumenta también la compresión del resorte.',
    enunciado: '¿Por qué ocurre esto?',
    opciones: [
      'Porque disminuye la energía cinética inicial aumentando la energía potencial final.',
      'Porque aumenta la energía potencial inicial disminuyendo la energía cinética final.',
      'Porque disminuye la energía cinética inicial aumentando la energía elástica final.',
      'Porque aumenta la energía potencial inicial aumentando la energía elástica final.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Al soltar el carro desde mayor altura, su energía potencial inicial es mayor; por conservación de energía, toda esa energía termina convertida en energía elástica del resorte al comprimirse, por lo que la compresión final es mayor.',
  },
  {
    id: 's2-cie-63',
    area: 'ciencias',
    contexto:
      'Pachliopta aristolochiae tiene toxinas que la protegen de depredadores; Papilio xuthus no tiene toxinas, pero imita el patrón de vuelo de P. aristolochiae.',
    enunciado: '¿Qué ventaja podría dar a la especie P. xuthus imitar el patrón de vuelo de P. aristolochiae?',
    opciones: [
      'Le proporcionaría un vuelo más rápido que el de P. aristolochiae para escapar de los depredadores.',
      'Le ayudaría a eliminar depredadores que se intoxican al confundirlas con P. aristolochiae.',
      'Le permitiría esquivar cualquier contacto con P. aristolochiae que evita que se intoxiquen y mueran.',
      'La protegería de depredadores que evitan atacarlas al confundirlas con P. aristolochiae.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Al imitar a una especie tóxica, P. xuthus se beneficia de un mimetismo tipo batesiano: los depredadores, al confundirla con la especie tóxica, evitan atacarla.',
  },
  {
    id: 's2-cie-64',
    area: 'ciencias',
    contexto:
      'Los isótopos son átomos con la misma cantidad de protones pero distinto número de masa. Átomo 1: 20 protones, masa 40. Átomo 2: 20 protones, masa 42. Átomo 3: 21 protones, masa 40.',
    enunciado: '¿Cuáles átomos son isótopos entre sí?',
    opciones: ['1 y 3', '1 y 2', '2 y 3', '1, 2 y 3'],
    respuestaCorrecta: 1,
    explicacion: 'Los átomos 1 y 2 tienen el mismo número de protones (20) pero distinta masa (40 y 42), lo que los hace isótopos entre sí; el átomo 3 tiene un número de protones diferente (21).',
  },
  {
    id: 's2-cie-65',
    area: 'ciencias',
    contexto:
      'Un paciente recibe un analgésico oral de 50 mg cada 12 horas sin mucho alivio tras 30 horas; al aplicarle el mismo medicamento, en igual concentración, de forma inyectable intramuscular, el alivio se percibe en menos de una hora.',
    enunciado: '¿Cuál de las siguientes opciones corresponde a una explicación lógica de este fenómeno?',
    opciones: [
      'El analgésico oral tiene mayor concentración, por lo que disminuye la cantidad de sangre en las venas y genera dolor en el cuello.',
      'El medicamento recetado de forma inyectable tiene el doble de concentración y produjo una intoxicación en el estudiante.',
      'El analgésico inyectable está hecho a base de un compuesto con más átomos que el analgésico oral para que actúe más rápido.',
      'El medicamento inyectado se absorbe más rápidamente que el medicamento oral porque no tiene que ser digerido en el estómago.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'La vía intramuscular evita el proceso de digestión y el efecto de primer paso hepático, por lo que el medicamento se absorbe y actúa mucho más rápido que por vía oral.',
  },
  {
    id: 's2-cie-66',
    area: 'ciencias',
    contexto:
      'Tabla de densidad de varios gases a 1 atm, comparando T = 25 °C y T = 0 °C: en todos los casos (aire, helio, nitrógeno, hidrógeno, oxígeno, metano) la densidad es mayor a 0 °C que a 25 °C.',
    enunciado: '¿Por qué la densidad de los gases aumenta?',
    opciones: [
      'Porque la presión cambia y afecta el volumen del gas.',
      'Porque la presión se mantiene constante y el volumen no se afecta.',
      'Porque la presión y la temperatura se mantienen constantes.',
      'Porque la temperatura disminuye, lo que afecta el volumen del gas.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'A presión constante, al disminuir la temperatura el volumen del gas se reduce, lo que aumenta su densidad (masa/volumen).',
  },
  {
    id: 's2-cie-67',
    area: 'ciencias',
    contexto:
      'Una estudiante prueba mezclas entre agua, vinagre, etanol y aceite: agua-etanol (sí se mezclan), agua-vinagre (sí), vinagre-etanol (sí), aceite-etanol (no), aceite-vinagre (no). Concluye que agua, etanol y vinagre son semejantes entre sí porque ninguno se mezcla con el aceite.',
    enunciado: 'Según los resultados y la hipótesis planteada, ¿esta afirmación es una evidencia o una conclusión?',
    opciones: [
      'Una conclusión, ya que a partir de los resultados se infiere que el agua, el etanol y el vinagre son semejantes.',
      'Una evidencia, ya que solo una parte de los resultados muestra que el agua, el etanol y el vinagre no se mezclan.',
      'Una conclusión, ya que a partir de los resultados se infiere que el agua, el etanol y el vinagre no se mezclan.',
      'Una evidencia, ya que solo una parte de los resultados muestra que el agua, el etanol y el vinagre se mezclan con el aceite.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'La afirmación de que estas tres sustancias son "semejantes" es una interpretación construida a partir de los datos observados (los resultados de las mezclas), es decir, una conclusión, no un dato bruto.',
  },
  {
    id: 's2-cie-68',
    area: 'ciencias',
    contexto:
      'Arroz, fríjoles y azúcar (todos sólidos, de distinto tamaño de partícula) se mezclaron accidentalmente en un mismo recipiente. Métodos disponibles: decantación (mezclas heterogéneas de líquidos), tamizado (sólidos por diferencia de tamaño), centrifugación (por diferencia de densidades) y filtración (sólido insoluble de un líquido).',
    enunciado: '¿Qué método es el más apropiado para separar los fríjoles, el arroz y el azúcar?',
    opciones: ['Decantación.', 'Centrifugación.', 'Tamizado.', 'Filtración.'],
    respuestaCorrecta: 2,
    explicacion: 'Al ser todos sólidos con tamaños de partícula distintos, el tamizado es el método apropiado para separarlos; los otros métodos son para mezclas que incluyen líquidos.',
  },
  {
    id: 's2-cie-69',
    area: 'ciencias',
    contexto:
      'Clasificación de sustancias: elementos (átomos iguales sin enlazar), compuestos (dos o más átomos distintos enlazados) y mezclas (dos o más componentes no enlazados). Se presentan esquemas de tres sustancias (Q, T y Z) con la distribución de sus átomos.',
    enunciado: '¿Cuál o cuáles de las anteriores sustancias son un compuesto?',
    opciones: ['Únicamente la sustancia T.', 'Las sustancias Q y Z.', 'Las sustancias Q y T.', 'Únicamente la sustancia Z.'],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: un compuesto debe estar formado por dos o más átomos distintos enlazados entre sí; se debe confirmar en los esquemas originales cuáles sustancias cumplen esa condición.',
  },
  {
    id: 's2-cie-70',
    area: 'ciencias',
    contexto:
      'Dos grupos midieron crecimiento bacteriano en un medio rico en proteínas, con la misma temperatura (37 °C), nutrientes y número de frascos. El Grupo 1 contó las bacterias cada 2 horas; el Grupo 2 contó cada 30 minutos durante un período total más largo.',
    enunciado: '¿Cuál de los dos experimentos arrojará resultados más confiables?',
    opciones: [
      'El primero, porque al realizar el conteo en períodos más largos se interfiere menos en el crecimiento bacteriano.',
      'El segundo, porque tenía mejores condiciones en el medio de cultivo para el crecimiento bacteriano.',
      'El primero, porque los datos se tomaron teniendo en cuenta el período de división celular y se contrastó con más frascos.',
      'El segundo, porque los datos se obtienen en períodos más cortos y durante un tiempo más largo.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Medir con mayor frecuencia (cada 30 minutos) y durante un período total más largo permite capturar con más detalle la dinámica real del crecimiento bacteriano, dando resultados más confiables.',
  },
  {
    id: 's2-cie-71',
    area: 'ciencias',
    contexto: 'Un joven patina en una rampa; en la cumbre queda momentáneamente quieto (velocidad y energía cinética mínimas, altura y energía potencial máximas). Comienza a descender hasta el suelo.',
    enunciado: '¿Cómo cambian las energías cinética y potencial del joven antes de llegar al suelo?',
    opciones: [
      'Aumenta la energía potencial y disminuye la energía cinética.',
      'La energía cinética aumenta y la energía potencial se mantiene constante.',
      'Aumenta la energía cinética y disminuye la energía potencial.',
      'La energía cinética se mantiene constante y la energía potencial disminuye.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Al descender, la altura (y por tanto la energía potencial) disminuye, mientras que la velocidad (y la energía cinética) aumenta, conservándose la energía mecánica total.',
  },
  {
    id: 's2-cie-72',
    area: 'ciencias',
    contexto:
      'Reacción de aluminotermia: Fe2O3 + 2 Al → 2 Fe + Al2O3. Masas moleculares: Fe2O3 = 160 g/mol, Al = 27 g/mol, Fe = 56 g/mol, Al2O3 = 102 g/mol.',
    enunciado: 'Si se hacen reaccionar 3 moles de Fe2O3 con suficiente Al, ¿cuántos gramos se obtienen de Al2O3?',
    opciones: [
      '75 g, porque por cada mol de Fe2O3 que reacciona se produce 1 mol de Al2O3.',
      '306 g, porque cada 3 moles de Fe2O3 que reaccionan se producen 3 moles de Al2O3.',
      '480 g, porque por cada 3 moles de Fe2O3 que reaccionan se producen 6 moles de Al2O3.',
      '150 g, porque por cada mol de Fe2O3 que reacciona se producen 2 moles de Al2O3.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'La ecuación balanceada muestra una relación 1:1 entre Fe2O3 y Al2O3; 3 moles de Fe2O3 producen 3 moles de Al2O3, es decir, 3 × 102 g/mol = 306 g.',
  },
  {
    id: 's2-cie-73',
    area: 'ciencias',
    contexto: 'Dos niños halan una caja llena de manzanas hacia la derecha con una cuerda; la caja no se mueve porque la fuerza de fricción del suelo es igual en magnitud a la fuerza de tensión de la cuerda.',
    enunciado: '¿Cuál de los siguientes diagramas representa adecuadamente la situación mencionada?',
    opciones: ['Diagrama A', 'Diagrama B', 'Diagrama C', 'Diagrama D'],
    respuestaCorrecta: 0,
    explicacion: 'Verificar con el PDF: el diagrama correcto debe mostrar la fuerza de tensión y la fuerza de fricción con la misma magnitud y sentidos opuestos (equilibrio horizontal), además del peso y la normal equilibrados verticalmente.',
  },
  {
    id: 's2-cie-74',
    area: 'ciencias',
    contexto:
      'Un estudiante lee que la energía interna del aire aumenta si disminuye su volumen y aumenta su temperatura. Introduce en la nevera una botella llena de aire; tiempo después observa que el volumen de la botella no cambia (la temperatura del aire disminuye por estar en la nevera).',
    enunciado: '¿Cómo varía la energía interna del aire que está dentro de la botella durante el tiempo que permanece en la nevera?',
    opciones: [
      'Aumenta, porque el volumen de la botella no cambió.',
      'Disminuye, porque la temperatura del aire disminuyó dentro de la nevera.',
      'Se mantiene constante, porque ni el volumen ni la temperatura cambiaron.',
      'No se puede determinar sin conocer la presión del aire.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Verificar con el PDF: las opciones de esta pregunta no se recuperaron del documento original. Como el volumen permanece constante pero la temperatura disminuye dentro de la nevera, la energía interna del aire debería disminuir.',
  },
  {
    id: 's2-cie-75',
    area: 'ciencias',
    contexto:
      'Un equipo de ingenieros tiene datos de temperatura y potencia por hora de un "Panel tipo 1" ya probado. Compran un panel solar de tecnología diferente y toman las mismas mediciones (temperatura y potencia) a cada hora durante un día con ese nuevo panel.',
    enunciado: '¿Los nuevos datos tomados por el grupo de ingenieros sirven para corroborar los datos presentados en la tabla?',
    opciones: [
      'Sí, porque inclusive se toman los datos de potencia y temperatura cada hora.',
      'No, porque se deben tomar los datos con el mismo tipo de panel.',
      'Sí, porque la potencia de cualquier panel depende únicamente de la hora del día.',
      'No, porque se deben tomar los datos a las mismas horas registradas en la tabla.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Para corroborar los resultados de un experimento se debe mantener constante la variable que se está probando (el tipo de panel); al cambiarla, los nuevos datos no permiten validar los resultados anteriores.',
  },
  {
    id: 's2-cie-76',
    area: 'ciencias',
    contexto:
      'Un ciclista salta de una rampa en dos ocasiones y cae sobre una superficie inclinada, con diferente velocidad cada vez. Al llegar a la superficie, debe conservar la cantidad de movimiento para evitar un choque fuerte.',
    enunciado: '¿Cuál de las siguientes predicciones puede obtenerse teniendo en cuenta el modelo anterior?',
    opciones: [
      'En el primer salto el ciclista tendrá menor probabilidad de caer, porque la posición de llegada a la superficie será de menor contacto, minimizando la fricción con el suelo.',
      'En ambos saltos es altamente probable que se caiga el ciclista, porque la posición ideal para la bicicleta es tocar el suelo de manera perpendicular al mismo.',
      'En el segundo salto el ciclista tendrá menos probabilidad de caer, porque al ir paralelo a la superficie del suelo se evitan cambios bruscos en la cantidad de movimiento.',
      'En ambos saltos llegará el ciclista a la superficie del suelo sin inconveniente alguno, porque la fricción es la misma en ambos saltos, conservando su cantidad de movimiento.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Aterrizar con una trayectoria paralela a la superficie inclinada evita cambios bruscos en la dirección de la cantidad de movimiento, reduciendo el riesgo de un choque fuerte y de caída.',
  },
  {
    id: 's2-cie-77',
    area: 'ciencias',
    contexto:
      'Dos cuerpos cilíndricos pequeños con igual carga positiva se colocan en los extremos de un palo de madera; se acerca una pequeña esfera cargada positivamente. Se dibuja la fuerza ejercida por el cilindro 2 sobre la esfera.',
    enunciado: '¿Cuál es la magnitud y dirección de la fuerza que ejerce el cilindro 2 sobre la esfera, en relación a la fuerza que ejerce el cilindro 1?',
    opciones: [
      'Mayor que la magnitud de la fuerza generada por el cilindro 1 y hacia arriba de la esfera.',
      'Igual a la magnitud de la fuerza generada por el cilindro 1 y hacia la izquierda de la esfera.',
      'Igual a la magnitud de la fuerza generada por el cilindro 1 y hacia abajo de la esfera.',
      'Menor que la magnitud de la fuerza generada por el cilindro 1 y hacia la derecha de la esfera.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Verificar con el PDF: al tener ambos cilindros la misma carga, la magnitud de la fuerza depende de la distancia de cada uno a la esfera, mostrada en la figura original, que no se pudo extraer como texto.',
  },
  {
    id: 's2-cie-78',
    area: 'ciencias',
    contexto:
      'En una comunidad expuesta al mercurio, algunos niños han nacido con ceguera, posiblemente por mutaciones en células sexuales de sus padres. La expresión de esta enfermedad está ligada a la presencia de alelos recesivos en un solo gen.',
    enunciado: '¿Qué genotipo presentará un niño sano de la zona?',
    opciones: ['Homocigoto dominante o heterocigoto.', 'Heterocigoto recesivo únicamente.', 'Homocigoto recesivo únicamente.', 'Heterocigoto u homocigoto recesivo.'],
    respuestaCorrecta: 0,
    explicacion: 'Si la enfermedad solo se manifiesta en homocigotos recesivos, un niño sano puede ser homocigoto dominante o heterocigoto (portador sin manifestar la enfermedad).',
  },
  {
    id: 's2-cie-79',
    area: 'ciencias',
    contexto:
      'Una comunidad de pescadores presenta enfermedades asociadas a la contaminación con mercurio proveniente de la explotación de oro río arriba. Un estudio mostró que los peces carnívoros (bagre pintado, blanquillo, pacora) tienen mayor concentración de mercurio que los no carnívoros (bocachico, liseta).',
    enunciado: '¿Cuál de las siguientes preguntas puede ser resuelta mediante una investigación en el campo de las Ciencias Naturales?',
    opciones: [
      '¿Es suficiente el presupuesto destinado a la salud de pescadores, al compararlo con las ganancias obtenidas a partir de la explotación de oro?',
      '¿La distancia al puesto de salud afecta los índices de mortalidad por mercurio en esta población?',
      '¿Cómo ayudaría una dieta de peces no carnívoros a disminuir la concentración de mercurio en los habitantes de la zona afectada?',
      '¿Cuántos ríos se reportan en el mundo por sufrir vertimiento de mercurio por minería?',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Esta pregunta puede abordarse con un estudio biológico/experimental sobre bioacumulación de mercurio según el tipo de dieta, a diferencia de las otras opciones, que son de naturaleza económica, social o puramente estadística.',
  },
]
