import type { Question } from '../questions'

// Transcrito de "JMES SEGUNDA SESIÓN 2023" — Sociales y Ciudadanas (preguntas 1-25)
// El cuadernillo original no trae clave de respuestas; se infieren por
// análisis del contexto histórico/social de cada enunciado. La pregunta 16
// quedó con su enunciado incompleto en el PDF original (problema de
// columnas en el documento escaneado); se señala para verificación.
export const s2Sociales: Question[] = [
  {
    id: 's2-soc-1',
    area: 'sociales',
    contexto:
      'Discurso de Manuel Marulanda: exige devolución de tierras a víctimas de la "violencia y fuego de la dictadura anterior", reconstrucción de viviendas, escuelas y vías, castigo a criminales y desarme de bandas (lenguaje propio de la época de La Violencia/orígenes de las FARC). Discurso de Alfonso Cano: menciona el terrorismo de Estado, el TLC, el calentamiento global y la "estrategia neoliberal en curso" (temas de finales del siglo XX / inicios del XXI).',
    enunciado: 'De acuerdo con el contenido de los anteriores discursos, puede establecerse que',
    opciones: [
      'el de Marulanda antecede al de Cano, porque menciona las principales demandas de la guerrilla de las FARC en las negociaciones de paz en La Habana.',
      'el de Cano antecede al de Marulanda, porque describe los problemas sociales y económicos de los campesinos que motivaron el nacimiento de las FARC.',
      'el de Marulanda antecede al de Cano, porque menciona las tensiones partidistas entre liberales y conservadores en el periodo conocido como La Violencia.',
      'el de Cano antecede al de Marulanda, porque describe las consecuencias sociales de la apertura económica que experimentó Colombia a finales del siglo XX.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El discurso de Marulanda usa un lenguaje y unas demandas propias del origen de las FARC en el contexto de La Violencia, mientras que el de Cano menciona temas contemporáneos como el TLC y el neoliberalismo, lo que indica que es posterior.',
  },
  {
    id: 's2-soc-2',
    area: 'sociales',
    contexto:
      'Un gobierno asiático instala 200.000 cámaras de reconocimiento facial. Las minorías religiosas se sienten vigiladas incluso en sus templos; los estudiantes creen que viola su privacidad; los rectores de colegios consideran que el monitoreo favorece el desempeño académico de sus estudiantes.',
    enunciado: 'Según lo expuesto, es probable que haya un conflicto entre:',
    opciones: [
      'el Gobierno y las minorías religiosas porque el Gobierno centra su vigilancia en sus hijos incluso en las escuelas.',
      'los estudiantes y los rectores, porque los rectores implementan medidas que violan sus derechos.',
      'las minorías religiosas y los rectores, porque los rectores promueven el monitoreo de sus hijos.',
      'los estudiantes y el Gobierno, porque el Gobierno está violando su privacidad.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'Los estudiantes consideran que el monitoreo viola su privacidad, mientras que los rectores lo defienden como beneficioso, lo que genera un conflicto directo de posturas entre ambos grupos.',
  },
  {
    id: 's2-soc-3',
    area: 'sociales',
    contexto:
      'Campesinos productores de papa, afectados por un TLC que permitió el ingreso de papa extranjera más económica, rescatan los mercados campesinos para vender sin intermediarios, mejorar sus ingresos y recuperar tradiciones ligadas al cultivo de la tierra.',
    enunciado: '¿Cuáles de las siguientes dimensiones se privilegiaron en la solución propuesta por los campesinos?',
    opciones: ['Social y política.', 'Cultural y social.', 'Económica y cultural.', 'Política y comercial.'],
    respuestaCorrecta: 2,
    explicacion: 'Los mercados campesinos buscan mejorar los ingresos (dimensión económica) y, a la vez, recuperar tradiciones ligadas al cultivo de la tierra (dimensión cultural).',
  },
  {
    id: 's2-soc-4',
    area: 'sociales',
    contexto:
      'Fragmento del Pacto de Benidorm (mediados del siglo XX), firmado por liberales y conservadores, que propone un gobierno de coalición para evitar reabrir la lucha por el poder entre los dos partidos.',
    enunciado: '¿Cuál de los siguientes hechos de la historia política colombiana pudo haber motivado la firma de este acuerdo político entre los partidos tradicionales?',
    opciones: [
      'La crisis económica generada por la pérdida del istmo de Panamá.',
      'La crisis institucional producida por las guerras civiles del siglo XIX.',
      'La violencia bipartidista que se desató en el país después del asesinato de Gaitán.',
      'El surgimiento de guerrillas influenciadas por las ideas de la Revolución cubana.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El Pacto de Benidorm (1956) buscó superar la violencia bipartidista entre liberales y conservadores desatada tras el asesinato de Gaitán en 1948 (La Violencia).',
  },
  {
    id: 's2-soc-5',
    area: 'sociales',
    contexto:
      'En un país presidencialista, una fuerza política lleva casi 20 años en el poder; el presidente se atribuye funciones del poder legislativo (el único con representación de la oposición), lo que organismos internacionales califican de antidemocrático. Hay protestas pidiendo elecciones anticipadas, y la oposición solicita vigilancia internacional de derechos humanos.',
    enunciado: 'En la situación descrita, ¿qué es lo que probablemente quiere lograr cada una de las partes?',
    opciones: [
      'Los organismos internacionales, mantenerse al margen de los asuntos internos del país; los ciudadanos, manifestar su apoyo a la oposición.',
      'La oposición, derrocar al Gobierno por cualquier medio; los organismos internacionales, desaprobar las decisiones que este toma.',
      'El Gobierno, lograr la concentración total del poder; la oposición, obtener protección y apoyo internacional.',
      'El poder legislativo, delegar sus funciones al presidente; los ciudadanos, cambiar de dirigente político.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Al atribuirse funciones legislativas, el Gobierno busca concentrar el poder, mientras que la oposición, ante la falta de garantías internas, busca respaldo y protección de organismos internacionales.',
  },
  {
    id: 's2-soc-6',
    area: 'sociales',
    contexto:
      'La alcaldía de una capital propone trasladar a 600 habitantes de calle farmacodependientes a fincas de rehabilitación en un pequeño municipio rural que no tiene hospital y cuenta con solo nueve agentes de policía.',
    enunciado: 'La reacción más probable de las autoridades del municipio rural frente al programa de la alcaldía de la capital es de rechazo, ya que podrían argumentar que',
    opciones: [
      'el ingreso al municipio de habitantes de calle drogadictos aumentaría considerablemente la proporción de crímenes en la región.',
      'el municipio no cuenta con instalaciones apropiadas para atender los posibles riesgos sanitarios de los habitantes de calle.',
      'la llegada de los habitantes de calle con problemas de farmacodependencia aumentaría el consumo de drogas en el municipio.',
      'las fincas pertenecen a institutos privados, por lo que no podrían atender a los habitantes de calle.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'El municipio carece de hospital y de suficiente personal de seguridad, lo que haría muy difícil atender adecuadamente los riesgos sanitarios de un traslado masivo de población vulnerable.',
  },
  {
    id: 's2-soc-7',
    area: 'sociales',
    contexto:
      'Relato histórico: tras robar el ganado, los victimarios persiguieron a ciudadanos liberales que huían a los montes, apresaron a los que no pudieron escapar, les quitaron la cédula y los obligaron a firmar renuncias a sus ideas liberales para adoptar las del partido conservador.',
    enunciado: 'El anterior relato corresponde a la época denominada "La Violencia" en Colombia porque:',
    opciones: [
      'en ese período fue característico el enfrentamiento entre liberales y conservadores por el predominio de una u otra ideología en las zonas rurales del país.',
      'durante ese período de La Violencia la forma en la cual hacían campaña electoral los conservadores era tal y como se describe en el fragmento.',
      'en ese período se persiguió a los campesinos y muchos de ellos, que eran liberales, se internaron en los montes para renunciar a sus ideas políticas.',
      'durante ese período la privación de la libertad fue una manera de conseguir que los liberales no derrotaran al candidato del partido conservador.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El relato (persecución armada, despojo y coerción ideológica entre bandos políticos rurales) es representativo del enfrentamiento partidista característico de La Violencia en las zonas rurales de Colombia.',
  },
  {
    id: 's2-soc-8',
    area: 'sociales',
    contexto:
      'Un concejal de Bogotá presiona a la Junta de Administración Local (JAL) para desviar el presupuesto de un parque infantil hacia la financiación de la campaña política de un miembro de su partido, prometiendo duplicar luego los recursos para el parque.',
    enunciado: 'Según la Constitución Política de Colombia, la actuación del concejal evidencia',
    opciones: [
      'un compromiso a futuro con el mejoramiento de la infraestructura del parque infantil, a cambio del apoyo ciudadano en las elecciones.',
      'una transacción que incluye desvío de fondos ya asignados para mejoras públicas, en pro de la financiación de campañas electorales.',
      'una estrategia válida que beneficiará tanto al político en campaña como a los niños, porque los recursos destinados para el parque se duplicarán.',
      'un ejemplo del uso indebido de la autoridad para manipular decisiones que afectan el bien de la localidad, pues privilegia intereses particulares.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'La función administrativa debe estar al servicio de los intereses generales; presionar para desviar recursos públicos hacia fines particulares constituye un uso indebido de la autoridad.',
  },
  {
    id: 's2-soc-9',
    area: 'sociales',
    contexto:
      'Un artículo sostiene que reducir impuestos a las empresas genera más empleo y mejores condiciones laborales, porque alivia la carga tributaria del empresario y le da mayor "espacio de maniobra".',
    enunciado: 'El fragmento anterior se sustenta en un principio básico del liberalismo económico porque el autor concibe los impuestos como',
    opciones: [
      'Una forma justa de redistribución de las rentas fruto de la productividad económica.',
      'Un mecanismo de intervención estatal que puede impactar negativamente el sector empresarial.',
      'Un mecanismo de recaudo de dinero que debe ser abolido para promover el consumo de bienes y servicios.',
      'Una forma de generar ingresos para la Nación que a largo plazo puede empobrecer a la clase trabajadora.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'El liberalismo económico concibe los impuestos como una forma de intervención estatal que limita la actividad empresarial; por eso el autor propone reducirlos para liberar esa carga.',
  },
  {
    id: 's2-soc-10',
    area: 'sociales',
    contexto:
      'Medios de comunicación alternativos liderados por jóvenes en un barrio son considerados por una bancada política como una amenaza al orden público; esta propone una ley para clausurarlos y prohibirlos.',
    enunciado: 'De acuerdo con lo establecido en la Constitución Política de Colombia, en esta situación:',
    opciones: [
      'La bancada política actúa de manera errónea, ya que ellos no pueden impulsar un proyecto de ley, sino que solamente lo puede hacer el presidente de la República.',
      'Los medios alternativos actúan de manera errónea, ya que tienen que modificar su opinión y la manera como hacen difusión de la información, para no incomodar a los miembros del barrio.',
      'La bancada política actúa de manera errónea, ya que su proyecto de ley va en contra de la libertad de expresión y ningún proyecto de ley puede ir en contra de este tipo de principios.',
      'Los medios alternativos actúan de manera errónea, ya que el contenido que se difunde en este medio de comunicación debe ser aprobado tanto por la Policía Nacional como por los jóvenes.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La libertad de expresión es un derecho fundamental protegido constitucionalmente; una ley que busque clausurar medios de comunicación por su contenido iría en contra de ese principio.',
  },
  {
    id: 's2-soc-11',
    area: 'sociales',
    contexto:
      'Un alcalde promueve el ecoturismo usando como atractivo una rana en peligro de extinción, propia de un ecosistema delicado. El turismo crece 300 % y surgen restaurantes y bares que, en su mayoría, desconocen las regulaciones ambientales.',
    enunciado: '¿Cuál de los siguientes es un posible efecto NO deseado del caso anterior?',
    opciones: [
      'Que el hábitat de la rana se vea afectado negativamente.',
      'Que la economía del pueblo mejore con la llegada de turistas.',
      'Que la popularidad del pueblo disminuya drásticamente.',
      'Que se aumente el interés por el estudio del ecosistema de la rana.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'La construcción descontrolada que desconoce las regulaciones ambientales puede dañar el ecosistema delicado del que depende la rana, siendo este el efecto no deseado del éxito turístico.',
  },
  {
    id: 's2-soc-12',
    area: 'sociales',
    contexto:
      'En el delta del río de las Perlas (China) existieron matrimonios con muertos, arreglados por los padres de una mujer viva y los padres de un hombre ya muerto, "para beneficio mutuo".',
    enunciado: '¿Cuál de las siguientes opciones explica mejor esta práctica?',
    opciones: [
      'Por medio de esta clase de matrimonio, la familia de la mujer expandía su núcleo familiar, con la familia de sus suegros, lo que podía brindar ventajas económicas y sociales a las dos familias.',
      'Por medio de esta clase de matrimonio, se sellaban las alianzas de amor cuando el prometido de la mujer moría de manera trágica o imprevista.',
      'Por medio de esta clase de matrimonio, la familia del hombre muerto podía reclamar bienes o recursos económicos a la familia de la mujer, lo que podía mejorar su posición social en la comunidad.',
      'Por medio de esta clase de matrimonio, se buscaba honrar la noción tradicional de matrimonio entre un hombre y una mujer, sin importar las circunstancias.',
    ],
    respuestaCorrecta: 0,
    explicacion: 'El texto indica que el arreglo se hacía "para beneficio mutuo" entre las dos familias, lo que coincide con una alianza familiar que brinda ventajas económicas y sociales reciprocas, no con un reclamo unilateral de bienes.',
  },
  {
    id: 's2-soc-13',
    area: 'sociales',
    contexto:
      'En diciembre de 2010, protestas en Túnez derrocaron al régimen de Ben Ali. Poco después, estallaron levantamientos casi simultáneos (2011) en Egipto, Libia, Siria, Yemen y otros países árabes, con alta participación juvenil: la Primavera Árabe.',
    enunciado: '¿Cuál es la principal razón que puede explicar la relación entre el levantamiento de Túnez y la Primavera Árabe?',
    opciones: [
      'Las alianzas militares permitieron que los gobernantes del mundo árabe conocieran la organización social en Túnez y emprendieran medidas para sofocar las nuevas protestas.',
      'La existencia de una misma religión incidió en el sistema de creencias de los pueblos árabes y generó un rechazo generalizado en Túnez hacia el autoritarismo de nuevos gobernantes.',
      'La intervención de los Estados Unidos en Siria y otros países de la región incrementó el descontento popular e intensificó el conflicto en Túnez y otros países del mundo árabe.',
      'Las nuevas tecnologías y redes sociales permitieron que jóvenes de varios países árabes se enteraran del éxito relativo en Túnez y protestaran para conseguir cambios similares.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'La rápida propagación casi simultánea de las protestas, impulsada principalmente por jóvenes, se explica por el papel de las redes sociales y las nuevas tecnologías como medio de contagio y organización.',
  },
  {
    id: 's2-soc-14',
    area: 'sociales',
    contexto:
      'En una reunión de un conjunto de edificios: Grupo A se queja de intolerancia y conflictos interpersonales; Grupo B, de la falta de respeto por el otro (mal manejo de espacios comunes y ruido excesivo nocturno); Grupo C, de inseguridad (pide cámaras y más seguridad); Grupo D, de falta de espacios recreativos (que vincula a la falta de tolerancia y respeto). La administradora establece: 1) multas para quienes resuelvan conflictos con violencia física o verbal; 2) reporte anónimo de quienes dejan basura en zonas no permitidas o hacen ruido después de las 8:00 p.m.',
    enunciado: 'Las soluciones propuestas por la administradora privilegiaron los problemas enunciados por los grupos',
    opciones: ['A y C.', 'C y D.', 'B y C.', 'A y B.'],
    respuestaCorrecta: 3,
    explicacion: 'La norma de multas por violencia física o verbal atiende la preocupación del Grupo A (intolerancia/conflictos), y la norma sobre basura y ruido nocturno atiende directamente la preocupación del Grupo B (falta de respeto, manejo de espacios comunes y ruido).',
  },
  {
    id: 's2-soc-15',
    area: 'sociales',
    contexto:
      'Un análisis de la Revolución mexicana la compara con la Revolución rusa de 1917: en Rusia el proletariado, aliado con el campesinado, no se detuvo tras expropiar a los terratenientes, sino que avanzó a expropiar a la burguesía y establecer un "Estado obrero"; en México, en cambio, la revolución fue "secuestrada" por la burguesía sin lograr esa transformación completa.',
    enunciado: '¿Cuál de los siguientes conceptos usa el autor en el análisis de la situación anterior?',
    opciones: ['Contrarrevolución.', 'Reformas sociales.', 'Revolución social.', 'Militarismo civil.'],
    respuestaCorrecta: 2,
    explicacion: 'El autor analiza el potencial de una transformación estructural y completa de las relaciones de propiedad y de clase (expropiación de terratenientes y burguesía, Estado obrero), lo cual corresponde al concepto de revolución social.',
  },
  {
    id: 's2-soc-16',
    area: 'sociales',
    contexto:
      'Nota de transcripción: el enunciado completo de esta pregunta no se pudo recuperar del PDF original debido a un problema de columnas en el documento escaneado; solo se conservan sus cuatro opciones, relacionadas con procesos del capitalismo industrial.',
    enunciado: 'Según el proceso descrito (no recuperado por completo del documento original), ¿cuál de las siguientes opciones lo caracteriza principalmente?',
    opciones: [
      'Propiedad social de los medios de producción.',
      'Concentración del capital y la producción.',
      'División del trabajo, maquinismo y producción en masa.',
      'Concentración de la población en las ciudades.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Verificar con el PDF: el enunciado de esta pregunta no pudo extraerse completo; la división del trabajo, el maquinismo y la producción en masa son rasgos clásicos del capitalismo industrial, pero se recomienda confirmar la pregunta original antes de usarla.',
  },
  {
    id: 's2-soc-17',
    area: 'sociales',
    contexto: 'Ante trancones vehiculares, un alcalde propone cobrar peajes a vehículos particulares en zonas de mayor congestión para desincentivar su uso.',
    enunciado: '¿Cuál podría ser un efecto NO deseado de la propuesta del alcalde?',
    opciones: [
      'Que los dueños de vehículos particulares usen con mayor frecuencia el servicio de transporte público.',
      'Que con el tiempo disminuya la demanda de vehículos particulares en la ciudad.',
      'Que las personas cuyo trabajo depende de su vehículo particular vean afectados sus ingresos.',
      'Que se incremente el número de vehículos de transporte público en la ciudad.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Quienes dependen de su vehículo particular para trabajar (por ejemplo, conductores de plataformas o repartidores) verían reducidos sus ingresos al tener que pagar peajes adicionales, un efecto colateral no buscado por la medida.',
  },
  {
    id: 's2-soc-18',
    area: 'sociales',
    contexto:
      'Campesinos del sur del país, afectados por la contaminación de sus fuentes de agua debido a la minería de oro de una multinacional, realizan una consulta popular para rechazar la continuidad de esa actividad en sus territorios.',
    enunciado: '¿Cuál es el fundamento legal para promover esta consulta?',
    opciones: [
      'La vulneración del derecho de los campesinos colombianos a asociarse en favor de su desarrollo social.',
      'Cumplir con el compromiso de organizar elecciones democráticas, como lo define la Constitución.',
      'La vulneración del derecho ciudadano a un ambiente sano y apto para el desarrollo humano.',
      'Cumplir con el deber de preservar la herencia cultural de las poblaciones campesinas de la nación.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La consulta popular se fundamenta en la protección del derecho constitucional a un ambiente sano, vulnerado por la contaminación de las fuentes de agua a causa de la minería.',
  },
  {
    id: 's2-soc-19',
    area: 'sociales',
    contexto:
      'Discurso de George W. Bush tras los atentados del 11 de septiembre de 2001: anuncia una guerra contra el terror que "comienza con Al Qaeda" y no terminará "hasta que cada grupo terrorista haya sido encontrado, detenido y vencido", refiriéndose a organizaciones específicas vinculadas a Bin Laden.',
    enunciado: '¿Puede deducirse acertadamente que la intención del Gobierno de los Estados Unidos era la de perseguir y vencer a todos los musulmanes sin importar su nacionalidad?',
    opciones: [
      'Sí, porque el Gobierno de los Estados Unidos, en cabeza de su entonces presidente, tenía derecho a defenderse luego de los atentados que mataron a muchos civiles inocentes.',
      'Sí, porque los Estados Unidos tenían pruebas de que los países musulmanes apoyaban a la organización de Osama Bin Laden.',
      'No, porque el Gobierno de los Estados Unidos, en cabeza de su entonces presidente, no está acusando a todos los musulmanes sino solo a los que son considerados terroristas.',
      'No, porque los Estados Unidos aclaran que solo serán perseguidos y vencidos los musulmanes de Afganistán, Egipto y Uzbekistán.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El discurso se dirige explícitamente contra grupos terroristas específicos (Al Qaeda y organizaciones vinculadas), no contra los musulmanes como colectivo religioso o nacional.',
  },
  {
    id: 's2-soc-20',
    area: 'sociales',
    contexto: 'Un candidato presidencial afirma que el denominador común de los mayores atentados terroristas recientes es que estaban implicados inmigrantes o hijos de inmigrantes.',
    enunciado: '¿Cuál podría ser una posible consecuencia de la afirmación del candidato?',
    opciones: [
      'Que disminuyan los actos discriminatorios contra los inmigrantes en ciudades del país donde la población inmigrante es minoritaria.',
      'Que disminuyan los actos discriminatorios contra los inmigrantes en ciudades del país donde la población inmigrante es mayoritaria.',
      'Que se incrementen los actos discriminatorios contra los inmigrantes en ciudades del país donde el candidato tiene un menor número de simpatizantes.',
      'Que se incrementen los actos discriminatorios contra los inmigrantes en ciudades del país afectadas recientemente por ataques terroristas.',
    ],
    respuestaCorrecta: 3,
    explicacion: 'Vincular públicamente a los inmigrantes con el terrorismo tiende a intensificar la discriminación, especialmente en las zonas que han sufrido directamente los ataques mencionados.',
  },
  {
    id: 's2-soc-21',
    area: 'sociales',
    contexto:
      'Un candidato presidencial propone dar alternativas de emprendimiento a jóvenes para reducir el embarazo adolescente, argumentando que "el exceso de tiempo libre y su situación de ocio las está llevando a tomar malas decisiones".',
    enunciado: '¿Cuál de los siguientes planteamientos del candidato contiene un sesgo discriminatorio?',
    opciones: [
      'Las mujeres jóvenes viven en una situación de desprotección y falta de oportunidades que es necesario reconocer.',
      'Es necesario ofrecer alternativas de emprendimiento a las mujeres jóvenes que cursan últimos grados escolares.',
      'Las mujeres jóvenes están quedando embarazadas por malas decisiones relacionadas con el uso de su tiempo libre.',
      'Los programas de educación sexual y reproductiva de las anteriores administraciones son cuestionables y urge un nuevo enfoque.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'Atribuir el embarazo adolescente al "mal uso del tiempo libre" de las jóvenes es un juicio simplista y estigmatizante que ignora causas estructurales, lo que constituye un sesgo discriminatorio.',
  },
  {
    id: 's2-soc-22',
    area: 'sociales',
    contexto:
      'Principios del neoliberalismo: rechazo a la intervención estatal en la economía, el mercado como única forma de regulación, libre competencia y apertura comercial (eliminación de aranceles entre países).',
    enunciado: '¿Cuál de las siguientes es una posible consecuencia de las políticas económicas neoliberales en la agricultura?',
    opciones: [
      'Se limita la entrada de productos agrícolas extranjeros que pongan en riesgo a los productores locales.',
      'Aumentan los subsidios oficiales destinados a agricultores nacionales.',
      'Disminuyen los precios de los productos agrícolas importados.',
      'Se facilita el crecimiento de los sectores de la agricultura con bajos niveles de competitividad internacional.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'La eliminación de aranceles (apertura comercial) reduce el precio de los productos agrícolas importados, tal como ocurrió con la papa extranjera tras un TLC en un caso anterior; las otras opciones contradicen los principios neoliberales de no intervención.',
  },
  {
    id: 's2-soc-23',
    area: 'sociales',
    contexto:
      'En Río de Janeiro y Lima se han construido muros que separan favelas o barrios pobres de zonas ricas. Un urbanista señala que estos muros responden a la necesidad de "marcar diferencias sociales con elementos físicos" por miedo a la cercanía social, resguardando intereses de ciertos sectores.',
    enunciado: 'De acuerdo con la situación planteada, ¿a cuál aspecto se le da mayor importancia cuando se construyen muros en las ciudades?',
    opciones: [
      'Al aspecto jurídico, pues la intervención urbana responde a las lógicas normativas que reorganizan las ciudades de América Latina.',
      'Al aspecto estético, pues se plantea la idea de que lo más relevante para las ciudades es la belleza como eje fundamental del desarrollo urbano.',
      'Al aspecto económico, pues con la intervención urbana se están resguardando los intereses y el patrimonio de unos sectores de la sociedad.',
      'Al aspecto político, pues se están desarrollando proyectos de intervención urbana que solucionan problemas a la mayoría de la población.',
    ],
    respuestaCorrecta: 2,
    explicacion: 'El análisis del urbanista señala que los muros buscan proteger el patrimonio y los intereses de los sectores más favorecidos, es decir, privilegian el aspecto económico sobre otros.',
  },
  {
    id: 's2-soc-24',
    area: 'sociales',
    contexto:
      'Organizaciones de salud pública en Colombia buscan, por medio de una ley, que los alimentos incluyan etiquetas visibles que indiquen su alto contenido de azúcar o grasa.',
    enunciado: 'Teniendo en cuenta las funciones de las ramas del poder público en Colombia, ¿a cuál deben acudir las organizaciones para que se promueva una ley que reglamente el uso de etiquetas nutricionales en los alimentos?',
    opciones: ['A la rama judicial.', 'A la rama pública.', 'A la rama ejecutiva.', 'A la rama legislativa.'],
    respuestaCorrecta: 3,
    explicacion: 'Las leyes son expedidas por el Congreso de la República, que corresponde a la rama legislativa del poder público.',
  },
  {
    id: 's2-soc-25',
    area: 'sociales',
    contexto:
      'En el Caribe colombiano, los monocultivos de palma aceitera han generado falta de agua y contaminación de fuentes hídricas. En el Eje Cafetero, los monocultivos de eucalipto afectan los ciclos del agua por las desviaciones artificiales construidas para abastecerlos, además de afectar la fauna local.',
    enunciado: 'A partir de la información presentada, un aspecto en común en la implementación de monocultivos en el Caribe colombiano y en el Eje Cafetero es que, en ambos casos, los monocultivos',
    opciones: [
      'requieren una modificación técnica y mecánica para su óptimo funcionamiento y mantenimiento.',
      'implican el uso indiscriminado de fuentes hídricas para su óptimo funcionamiento y mantenimiento.',
      'se han articulado de manera exitosa con los habitantes de estas regiones.',
      'afectan directamente a las especies vegetales y animales de estas zonas.',
    ],
    respuestaCorrecta: 1,
    explicacion: 'En ambos casos (palma aceitera y eucalipto) el problema común y explícitamente señalado es el impacto sobre las fuentes y los ciclos del agua debido al uso intensivo de recursos hídricos.',
  },
]
