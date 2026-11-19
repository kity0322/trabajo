import type { Question } from '../questions'

// Transcrito de "JMES PRIMERA SESIÓN 2023" — Sociales y Ciudadanas (preguntas 67-91)
// El cuadernillo original no trae clave de respuestas; se infieren por
// análisis del contexto histórico/social de cada enunciado.
export const s1Sociales: Question[] = [
  {
    id: 's1-soc-67',
    area: 'sociales',
    contexto:
      'Discurso 1 (Carlos Lleras Restrepo): defiende corregir el Frente Nacional "para salvarlo", en tono de reforma mientras el acuerdo sigue vigente. Discurso 2 (Alfonso López Michelsen): habla en pasado de haber "contribuido a facilitar el llamado desmonte" del Frente Nacional, es decir, tras su finalización.',
    enunciado: '¿Cuál de los dos discursos fue pronunciado con anterioridad al otro?',
    opciones: [
      'El primero, pues anota que el expresidente señala haber sido partícipe del desmonte del Frente Nacional, mientras que, en el segundo, López Michelsen participó en la creación de este acuerdo.',
      'El primero, pues el expresidente menciona su interés en aplicar los principios del Frente Nacional, mientras que, en el segundo, López Michelsen señala haber sido partícipe del desmonte de este acuerdo.',
      'El segundo, pues el expresidente señala haber sido crítico del plebiscito que dio origen al Frente Nacional, mientras que, en el primero, Lleras Restrepo defiende el plebiscito mencionando las ventajas que considera que ha traído una vez implementado.',
      'El segundo, pues el expresidente menciona la caída de una dictadura que antecedió al Frente Nacional, mientras que, en el primero, Lleras Restrepo defiende el proceso del Frente Nacional mencionando las ventajas que considera que ha traído una vez implementado.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Lleras Restrepo habla de corregir el acuerdo mientras aún funciona; López Michelsen habla en pasado del "desmonte" ya ocurrido, lo que indica que su discurso es posterior.',
  },
  {
    id: 's1-soc-68',
    area: 'sociales',
    contexto:
      'Una persona afirma públicamente que una compañía busca "promover la agenda LGBT" al incluir un personaje homosexual en una película infantil, y que los cristianos tienen derecho a no apoyarla.',
    enunciado: '¿Cuál de las siguientes es una posible consecuencia directa de esta afirmación?',
    opciones: [
      'Que los estadounidenses piensen que está desconociéndose la libertad de expresión y que los cristianos promueven la censura.',
      'Que la comunidad LGBT sienta que está siendo juzgada negativamente y que su presencia es rechazada, en especial, cuando hay niños cerca.',
      'Que la comunidad cristiana sienta que la mejor forma de hacer valer sus creencias es dejar de ver películas de cualquier tipo.',
      'Que la compañía piense que la comunidad LGBT debe ser incluida más frecuentemente en sus producciones, para aumentar sus ventas.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Una declaración pública que vincula la representación LGBT con un intento de "promover una agenda" genera estigmatización y rechazo hacia esa comunidad, especialmente en espacios con niños.',
  },
  {
    id: 's1-soc-69',
    area: 'sociales',
    contexto:
      'El yagé es una bebida sagrada de la medicina tradicional indígena del Putumayo. Ante muertes por su consumo fuera de contextos indígenas, se proponen: 1) prohibir su consumo, y 2) permitir que solo los indígenas puedan consumirlo.',
    enunciado:
      'Teniendo en cuenta la problemática planteada, desde el ámbito cultural, la implementación de la solución 1 (prohibir el consumo) sería',
    opciones: [
      'negativa, porque los conocedores de la planta no podrían obtener ingresos por las ceremonias.',
      'positiva, porque no se presentarían más casos de muerte por causa del consumo de yagé.',
      'negativa, porque se estaría vulnerando el derecho de los indígenas a mantener sus tradiciones.',
      'positiva, porque protege la tradición al permitir que solo los indígenas puedan beber yagé.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Prohibir totalmente el consumo del yagé afectaría también su uso tradicional indígena, vulnerando el derecho cultural de esa comunidad a su práctica ancestral.',
  },
  {
    id: 's1-soc-70',
    area: 'sociales',
    enunciado:
      'En Colombia, el presidente de la República tiene una función de control sobre la actividad principal del Congreso, ya que, al presidente, le corresponde',
    opciones: [
      'conservar el orden público en todo el territorio.',
      'dirigir las relaciones internacionales.',
      'sancionar las leyes.',
      'modificar la estructura de los ministerios.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La sanción presidencial de las leyes aprobadas por el Congreso es el mecanismo constitucional de control del Ejecutivo sobre la función legislativa.',
  },
  {
    id: 's1-soc-71',
    area: 'sociales',
    contexto:
      'Fragmento: "Se trata de construir una paz estable y duradera... acordamos los puntos de la Agenda del Acuerdo General de agosto de 2012".',
    enunciado: '¿A cuál proceso histórico de Colombia se refiere el anterior fragmento?',
    opciones: [
      'A los acuerdos de paz entre el Gobierno de Colombia y las Fuerzas Armadas Revolucionarias de Colombia, en los diálogos de La Habana.',
      'A la entrega de las armas por las Autodefensas Unidas de Colombia, como una parte de la Ley de Justicia y Paz.',
      'A los acuerdos de convivencia entre el Gobierno de Colombia y el M-19, en el marco de los diálogos de paz.',
      'A la entrega de la zona de distensión por el Gobierno colombiano a las Fuerzas Armadas Revolucionarias de Colombia, en San Vicente del Caguán.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El "Acuerdo General de agosto de 2012" es el documento que dio origen a los diálogos de paz de La Habana entre el Gobierno colombiano y las FARC.',
  },
  {
    id: 's1-soc-72',
    area: 'sociales',
    contexto:
      'Definición de biodiversidad según la ONU: variedad de seres vivos y patrones naturales, moldeada por procesos naturales y, cada vez más, por la influencia del ser humano.',
    enunciado: '¿En cuál de las siguientes situaciones se aplica adecuadamente la anterior definición de biodiversidad?',
    opciones: [
      'El crecimiento desmedido de las ciudades latinoamericanas ha llevado a un abandono paulatino del campo, lo cual pone en peligro la diversidad biológica.',
      'El calentamiento global va a llevar a un derretimiento de los polos y va a causar un aumento en el nivel del mar, lo cual favorece la biodiversidad en el planeta.',
      'En las zonas con asentamientos humanos en la selva amazónica puede existir una mayor diversidad de fauna y flora, pues la influencia de la actividad humana en la biodiversidad no siempre es negativa.',
      'El hueco en la capa de ozono ha hecho más fuerte el efecto invernadero sobre la superficie del planeta, pues la influencia de la actividad humana es altamente negativa para la diversidad biológica de la Tierra.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La definición señala que la biodiversidad es moldeada "cada vez más" por la influencia humana, sin que esto implique necesariamente un efecto negativo; esta opción es la única que refleja esa idea.',
  },
  {
    id: 's1-soc-73',
    area: 'sociales',
    contexto:
      'Una aplicación de transporte basada en la web gana popularidad frente a los taxis tradicionales, pero no está sujeta a los mismos requisitos e impuestos. Ante protestas de taxistas, el Gobierno de la ciudad decide declarar ilegal el nuevo modelo de negocio.',
    enunciado: '¿Quiénes se verán afectados por la decisión del Gobierno?',
    opciones: [
      'El Gobierno, porque los taxistas continuarán la protesta hasta que se tenga en cuenta su inconformidad.',
      'Los taxistas, porque la competencia, que consideran desleal, disminuye sus clientes.',
      'Los conductores del servicio de transporte tradicional, porque perderán su trabajo.',
      'Los usuarios del servicio de transporte ofrecido por la aplicación, porque no podrán seguir haciendo uso de este.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Al declarar ilegal la aplicación, quienes pierden directamente el servicio que usaban son sus usuarios, no los taxistas (que más bien se benefician de la decisión).',
  },
  {
    id: 's1-soc-74',
    area: 'sociales',
    enunciado: '¿Cuál de los siguientes conjuntos de eventos presenta un orden cronológico correcto?',
    opciones: [
      'Construcción del Muro de Berlín, Segunda Guerra Mundial y creación de la OTAN.',
      'Fin de la Guerra Fría, creación de la OTAN y construcción del Muro de Berlín.',
      'Segunda Guerra Mundial, inicio de la Guerra Fría y caída del Muro de Berlín.',
      'Caída del Muro de Berlín, inicio de la Guerra Fría y Segunda Guerra Mundial.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El orden histórico correcto es: Segunda Guerra Mundial (1939-1945), inicio de la Guerra Fría (finales de los años 40) y caída del Muro de Berlín (1989).',
  },
  {
    id: 's1-soc-75',
    area: 'sociales',
    contexto:
      'Un operativo de la alcaldía en una zona con indigencia, prostitución, secuestros y explotación sexual rescata a mujeres y menores explotados, además de atender a una persona secuestrada. El alcalde aclara que no es un operativo contra los habitantes de calle, sino para proteger a los niños explotados.',
    enunciado: 'De acuerdo con el anterior fragmento, ¿cuál enfoque de política pública se privilegia en la intervención de la alcaldía?',
    opciones: [
      'Un enfoque económico, pues se espera aumentar las ventas de los sectores aledaños, al reducir la presencia de habitantes de calle.',
      'Un enfoque de seguridad, pues se le da prioridad a perseguir a los delincuentes a través de la intervención policial.',
      'Un enfoque de salud, pues se le da prioridad a acabar con el consumo de droga como el principal problema de salud en menores de edad.',
      'Un enfoque social, pues se espera atender a los menores de edad afectados, a mujeres y a la comunidad vulnerable del sector.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'El operativo se centra en proteger y atender a la población vulnerable (menores, mujeres explotadas), lo que corresponde a un enfoque social, según lo aclara el propio alcalde.',
  },
  {
    id: 's1-soc-76',
    area: 'sociales',
    contexto:
      'Discurso de Jorge Eliécer Gaitán ("Oración por la paz", 7 de febrero de 1948), pronunciado ante el presidente Mariano Ospina Pérez, pidiendo el fin de la violencia partidista y el restablecimiento de la tranquilidad pública.',
    enunciado: 'La posible intención de Gaitán al pronunciar este discurso era',
    opciones: [
      'denunciar la avanzada de violencia y represión contra los liberales, como consecuencia del "Bogotazo".',
      'hacer alarde del respaldo popular al Partido Liberal, de cara a las próximas elecciones presidenciales.',
      'ejercer presión sobre el Gobierno para la adopción de medidas que detuvieran la violencia partidista.',
      'reafirmar el incondicional apoyo popular a la gestión de Ospina Pérez en materia de orden público.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El discurso, pronunciado antes del Bogotazo (que ocurrió después, en abril de 1948), buscaba presionar al Gobierno para detener la violencia partidista mostrando el respaldo masivo del pueblo.',
  },
  {
    id: 's1-soc-77',
    area: 'sociales',
    contexto:
      'Ante la contaminación del aire, el presidente de un país ordena frenar las actividades de fábricas, colegios y universidades hasta que mejore la situación ambiental. Las opiniones sobre la medida están divididas.',
    enunciado: 'En esta situación, ¿entre quiénes es más probable que se dé un conflicto?',
    opciones: [
      'Entre los organismos ambientales y el Gobierno.',
      'Entre el sector industrial y el Gobierno.',
      'Entre el Gobierno y el sector educativo.',
      'Entre el Gobierno y los medios de comunicación.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Frenar la actividad de las fábricas afecta directamente los intereses económicos del sector industrial, que es el más propenso a entrar en conflicto con la medida gubernamental.',
  },
  {
    id: 's1-soc-78',
    area: 'sociales',
    contexto:
      'Tribunales y organismos internacionales, incluida la Comisión de Derechos Humanos de la ONU, han reconocido que la discriminación basada en el sexo incluye la discriminación por orientación sexual.',
    enunciado: 'De acuerdo con el texto anterior, ¿cuál es el propósito de reconocer que no se debe discriminar a las personas por su orientación sexual?',
    opciones: [
      'Respetar los pactos internacionales en materia de derechos humanos y así cumplir con las disposiciones de igualdad de protección que promulga la ley.',
      'Animar a las Naciones Unidas para que promuevan y garanticen el respeto por los derechos fundamentales de todas las personas.',
      'Garantizar el respeto de los derechos humanos de todas las personas y evitar toda forma de maltrato por orientación sexual o identidad de género.',
      'Reconocer el derecho que tienen las personas a manifestar su inconformidad con respecto a características de los demás, entre esas la orientación sexual.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El propósito de fondo es garantizar el respeto de los derechos humanos de todas las personas, independientemente de su orientación sexual o identidad de género.',
  },
  {
    id: 's1-soc-79',
    area: 'sociales',
    contexto:
      'Una empresa que fabrica un bien esencial de la canasta familiar decide aumentar producción y precio. El sindicato acepta nuevas metas de producción a cambio de la promesa condicionada de incrementar salarios si los ingresos aumentan significativamente.',
    enunciado: 'En esta situación, ¿qué intereses pueden entrar en conflicto?',
    opciones: [
      'Los de los consumidores y los de los dueños de la empresa.',
      'Los de los consumidores y los de los trabajadores que laboraban en la empresa antes de los cambios.',
      'Los de los trabajadores que se contratarán a partir de los cambios y los de los dueños de la empresa.',
      'Los de los dueños de la empresa y los del sindicato.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'El sindicato busca garantías salariales inmediatas para los trabajadores actuales, mientras que los dueños solo ofrecen un incremento condicionado a mayores ingresos, lo que genera un conflicto de intereses entre ambas partes.',
  },
  {
    id: 's1-soc-80',
    area: 'sociales',
    contexto:
      'La fumigación aérea sobre cultivos de coca en Colombia no ha sido efectiva en 20 años; los cultivadores se adaptan trasladando y reduciendo el tamaño de los cultivos para evadir la detección, debido a la escasa presencia estatal.',
    enunciado: 'De acuerdo con la descripción de la situación, ¿cuál de las siguientes condiciones mejoraría la efectividad de las medidas de erradicación de cultivos ilícitos?',
    opciones: [
      'La ubicación de los cultivos ilícitos en zonas geográficas de escasa presencia estatal.',
      'El desarrollo de programas de sustitución de cultivos.',
      'La penalización del consumo de drogas de uso ilícito.',
      'El aumento del flujo de compradores de productos derivados de los cultivos ilícitos.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Dado que la coca ofrece ingresos ante la falta de alternativas, los programas de sustitución de cultivos atacan la causa estructural del problema, a diferencia de la fumigación.',
  },
  {
    id: 's1-soc-81',
    area: 'sociales',
    contexto:
      'Una alcaldía prohibió las corridas de toros y el uso de un escenario público destinado a ellas. La Corte Constitucional ordenó restituir el escenario para la realización de espectáculos taurinos y "la preservación de la tradición taurina".',
    enunciado: 'Para realizar esta afirmación, la Corte Constitucional privilegió los derechos',
    opciones: ['humanos.', 'políticos.', 'culturales.', 'de solidaridad.'],
    respuestaCorrecta: 2,
    explicacion: 'La Corte protegió la "tradición taurina" como una expresión cultural, es decir, privilegió los derechos culturales.',
  },
  {
    id: 's1-soc-82',
    area: 'sociales',
    contexto:
      'El feminismo liberal aboga por la participación igualitaria de las mujeres en el Estado, el mercado laboral y las actividades económicas.',
    enunciado: '¿Cuál de las siguientes oraciones sería más afín con la corriente del "feminismo liberal"?',
    opciones: [
      '"Dad los derechos a quien os da la vida" (FECHIF, Chile).',
      '"Yo no deseo que las mujeres tengan poder sobre los hombres, sino sobre ellas mismas" (Mary Wollstonecraft).',
      '"Todas las mujeres conciben ideas, pero no todas conciben hijos. El ser humano no es un árbol frutal que solo se cultive por la cosecha" (Emilia Pardo Bazán).',
      '"Las mujeres son responsables de dos tercios de los trabajos realizados en todo el mundo y, sin embargo, ganan solo el 10 % de los ingresos totales" (Daniel Craig).',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Esta frase denuncia la desigualdad económica y laboral entre hombres y mujeres, que es precisamente el foco del feminismo liberal (participación igualitaria en el mercado laboral y la economía).',
  },
  {
    id: 's1-soc-83',
    area: 'sociales',
    contexto:
      'Un amigo le da a Mariana tres razones para no votar por la candidata Karen: las encuestas indican que no ganará, las mujeres históricamente no llegan a la presidencia en América Latina, y el abstencionismo hace que los planes de gobierno "no sean válidos".',
    enunciado: '¿Cuál de los siguientes enunciados contradice las razones dadas por el amigo de Mariana para no votar por Karen?',
    opciones: [
      'Los niveles de abstencionismo en América Latina son muy altos. Por ejemplo, solo en Colombia, el abstencionismo fue superado por primera vez en la historia del país para las elecciones presidenciales de 2018.',
      'Las empresas que realizan encuestas sobre la intención de voto, previas a las elecciones, están sujetas a rigurosos filtros de calidad. Por otro lado, dudar de los resultados de estas empresas puede hacer que los ciudadanos voten por el candidato equivocado.',
      'Las personas deben votar por el candidato de su elección, independientemente de las posibilidades que estos tengan de ganar. Por otro lado, solo en América Latina, Michelle Bachelet y Dilma Rousseff llegaron a la presidencia de Chile y Brasil, respectivamente.',
      'Estudios recientes indican que el internet es el principal, y casi el único, medio de acceso a los programas electorales de los candidatos a la presidencia de un país.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Esta opción refuta directamente dos de los argumentos del amigo: que no vale la pena votar por quien no puede ganar, y que las mujeres no pueden llegar a la presidencia en América Latina, con ejemplos concretos (Bachelet, Rousseff).',
  },
  {
    id: 's1-soc-84',
    area: 'sociales',
    contexto:
      'El modelo del "multinaturalismo" sostiene que las cosmologías indígenas no separan tajantemente lo humano de lo natural, de modo que múltiples naturalezas y socializaciones son válidas.',
    enunciado: '¿Cuál de las siguientes investigaciones sería un ejemplo de uso del modelo multinaturalista?',
    opciones: [
      'Un análisis sobre las condiciones sanitarias en la producción industrial de aves.',
      'Un estudio sobre las propiedades medicinales y curativas de las plantas amazónicas.',
      'Un estudio sobre el significado de las ofrendas que una comunidad indígena le hace al agua.',
      'Un análisis sobre las relaciones interpersonales entre colonos e indígenas en América del Sur.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Estudiar el significado espiritual-cultural que una comunidad indígena da al agua refleja la visión multinaturalista, donde lo natural y lo social-espiritual no están separados.',
  },
  {
    id: 's1-soc-85',
    area: 'sociales',
    contexto:
      'Ante la llegada masiva de migrantes de un país vecino, los parlamentarios proponen: 1) deportar a quienes estén de manera ilegal; 2) cerrar la frontera definitivamente; 3) conceder la nacionalidad a todos los migrantes; 4) solicitar recursos económicos internacionales.',
    enunciado: 'Con respecto a las soluciones planteadas por los parlamentarios, se puede afirmar que',
    opciones: [
      '2 es compatible con 3, porque ambas solucionan los problemas económicos de los ciudadanos del vecino país.',
      '3 es incompatible con 4, porque la primera busca solucionar problemas económicos y la segunda apunta a un asunto de seguridad.',
      '2 complementa a 1, porque ambas limitan la llegada masiva de ciudadanos del vecino país.',
      '4 es igual a 1, porque ambas enfatizan en la seguridad del país por encima de otro tipo de necesidades.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Cerrar la frontera (2) y deportar a quienes están ilegalmente (1) son medidas que, juntas, restringen y reducen la presencia de migrantes, por lo que se complementan.',
  },
  {
    id: 's1-soc-86',
    area: 'sociales',
    contexto:
      'Un grupo de empresarios propone que jóvenes recién graduados trabajen sin salario, a cambio de transporte y comidas, argumentando que así adquieren experiencia, siguen estudiando y se reduce el desempleo juvenil.',
    enunciado: '¿Cuál de los siguientes aspectos prefirió el grupo de empresarios con su solución al problema de las altas tasas de desempleo juvenil?',
    opciones: [
      'El educativo, porque se privilegia la búsqueda de alternativas para que los jóvenes no abandonen sus estudios universitarios.',
      'El económico, porque se privilegia la disminución de las estadísticas de desempleo juvenil en ese país.',
      'El educativo, porque se privilegia la participación del sector empresarial en la formación de los jóvenes recién graduados.',
      'El económico, porque se privilegia el ahorro en la nómina de las empresas al vincular profesionales a muy bajo costo.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Detrás del discurso educativo y social, la propuesta beneficia principalmente a las empresas, que obtienen mano de obra profesional prácticamente sin costo salarial.',
  },
  {
    id: 's1-soc-87',
    area: 'sociales',
    contexto:
      'Una encuesta del Observatorio de la Democracia (2018) muestra que el 73,5 % de los colombianos encuestados no simpatiza con ningún partido político.',
    enunciado: 'De acuerdo con la Constitución Política de Colombia, resulta problemático que el 73,5 % de los encuestados NO simpatice con alguno de los partidos políticos porque estos deben',
    opciones: [
      'eliminarse o suspenderse por el bien de la democracia, si pocas personas confían en ellos.',
      'representar a los ciudadanos, pero los resultados de la encuesta sugieren lo contrario.',
      'defender los intereses de las personas que sean cercanas a los políticos y empresarios.',
      'representar solo los intereses de la población que esté dispuesta a votar por ellos.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Los partidos políticos tienen, constitucionalmente, la función de representar a los ciudadanos; un nivel tan bajo de identificación partidista cuestiona el cumplimiento de ese rol representativo.',
  },
  {
    id: 's1-soc-88',
    area: 'sociales',
    contexto:
      'George Jackson, activista afroamericano preso desde 1960, escribió cartas entre 1964 y 1970. En el "Momento 1" se mostraba confiado en que una revolución armada triunfaría; en el "Momento 2" afirmó que "la revolución ha fallado" y que el fascismo había triunfado temporalmente.',
    enunciado: '¿Cuál de las siguientes razones explica por qué el discurso de Jackson acerca de la revolución antirracista cambió entre el momento 1 y el momento 2?',
    opciones: [
      'En el momento 1, Jackson se mostraba optimista sobre un posible triunfo de la revolución armada. En el momento 2, posiblemente influido por el asesinato de Martin Luther King, su optimismo por la revolución armada desapareció.',
      'En el momento 1, Jackson se pronunció con decepción sobre la actividad revolucionaria. En el momento 2, influido por el fracaso de la revolución fascista alemana, se mostró confiado en las virtudes que el capitalismo traería para la clase media estadounidense afroamericana.',
      'En el momento 1, Jackson impulsó a la sociedad afroamericana a participar masivamente en política. En el momento 2, influido por el triunfo de la reforma fascista alemana, se mostró decepcionado sobre el alcance que esta participación podía tener en la sociedad estadounidense.',
      'En el momento 1, Jackson promovía un esquema de gobierno basado en el capitalismo participativo de la sociedad estadounidense. En el momento 2, influido por los discursos de Martin Luther King, rechazó cualquier forma pacífica de promover una revolución antirracista.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El cambio de tono —de confianza en el triunfo de la revolución armada a reconocer su fracaso— coincide con el contexto de represión y violencia política de finales de los años sesenta en Estados Unidos.',
  },
  {
    id: 's1-soc-89',
    area: 'sociales',
    contexto:
      'El desplazamiento forzado por el conflicto armado ha llevado a miles de personas a asentarse en barrios informales urbanos sin servicios públicos, generando un crecimiento urbano desordenado y sin planificación.',
    enunciado: 'A partir de lo anterior, se puede establecer una relación entre',
    opciones: [
      'el recrudecimiento del conflicto armado y el aumento de la población rural.',
      'el crecimiento del desplazamiento forzado y el aumento de la segregación urbana.',
      'la disminución de ayudas humanitarias y el aumento de la densidad poblacional.',
      'la disminución de la informalidad laboral y el aumento de la migración desde el campo.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'El asentamiento de población desplazada en barrios informales sin servicios ni planificación, sin poder integrarse a la vida urbana, describe un proceso de segregación urbana.',
  },
  {
    id: 's1-soc-90',
    area: 'sociales',
    contexto:
      'Leonardo afirma que existe vida extraterrestre porque un científico reconocido lo dijo. Juana responde que ese argumento es inválido.',
    enunciado: '¿Juana tiene la razón frente a la invalidez del argumento de Leonardo? ¿Por qué?',
    opciones: [
      'No, porque la veracidad de un argumento depende de la persona que realiza la afirmación, que en este caso es un científico de gran reputación.',
      'Sí, porque la veracidad de un argumento no depende solo de la persona que realiza la afirmación, sino de las evidencias que usen para apoyarla.',
      'No, porque Leonardo presentó su opinión sobre un tema y cualquier opinión al respecto es un argumento válido.',
      'Sí, porque Leonardo presentó un argumento que contradice la opinión de Juana, por tanto, su opinión es inválida.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Apoyarse únicamente en la autoridad o reputación de quien habla, sin evidencia que sustente la afirmación, es una falacia de autoridad; Juana tiene razón al señalar la invalidez del argumento.',
  },
  {
    id: 's1-soc-91',
    area: 'sociales',
    contexto:
      'Texto 1 de Lenin: escrito "teniendo en cuenta la censura zarista", obligado a usar un lenguaje velado ("al estilo Esopo"). Texto 2 de Lenin: reflexiona sobre "nuestra revolución" como un hecho ya ocurrido y complejo.',
    enunciado: '¿Cuál de los dos textos fue escrito primero?',
    opciones: [
      'El texto 1 fue escrito primero porque se refiere al imperialismo, que se presentó antes de la Revolución rusa, mientras que en el texto 2 dicha Revolución ya tuvo lugar.',
      'El texto 2 se escribió primero porque menciona a León Tolstói, quien nació en 1828 y murió en 1910, antes de la Revolución rusa, mientras que el texto 1 es posterior a la Revolución.',
      'El texto 1 fue escrito primero porque se refiere al régimen zarista que motivó la Revolución rusa, mientras que en el texto 2 dicha Revolución ya tuvo lugar.',
      'El texto 2 fue escrito primero porque menciona la censura a la que estuvieron expuestos los escritores durante la Revolución rusa, mientras que en el texto 1 se permitía la escritura al estilo Esopo.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El texto 1 fue escrito bajo la censura del régimen zarista (antes de la Revolución); el texto 2 habla de "nuestra revolución" en tono retrospectivo, lo que indica que ya había ocurrido.',
  },
]
