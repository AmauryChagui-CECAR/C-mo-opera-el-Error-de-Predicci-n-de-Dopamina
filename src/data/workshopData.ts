import {
  DecisionScenario,
  ExpandableCardItem,
  MatchingItem,
  QuizQuestion,
  ReferenceItem,
  RoundChallenge,
  SectionId,
  SectionMeta,
} from '../types/workshop';

export const SECTIONS: SectionMeta[] = [
  {
    id: SectionId.INICIO,
    order: '01',
    shortLabel: 'Inicio',
    title: 'Portada y activación',
    subtitle: 'Contextualización del Ejercicio Neurocognitivo Integrado 1 en modalidad virtual.',
    estimatedMinutes: 3,
  },
  {
    id: SectionId.OBJETIVOS,
    order: '02',
    shortLabel: 'Objetivos',
    title: 'Propósito y competencias',
    subtitle: 'Metas de aprendizaje neurobiológico, metacognitivo y deontológico.',
    estimatedMinutes: 5,
  },
  {
    id: SectionId.FUNDAMENTOS,
    order: '03',
    shortLabel: 'Fundamentos',
    title: 'Neurobiología del EPD y flujo',
    subtitle: 'Simulador interactivo de dopamina, economía cognitiva y tarjetas conceptuales.',
    estimatedMinutes: 10,
  },
  {
    id: SectionId.TALLER,
    order: '04',
    shortLabel: 'Taller EPD',
    title: 'Experimento vivencial en dos rondas',
    subtitle: 'Reto equilibrado versus trampa por economía cognitiva bajo presión temporal.',
    estimatedMinutes: 10,
  },
  {
    id: SectionId.APLICACION,
    order: '05',
    shortLabel: 'Aplicación',
    title: 'Escenarios, asociación y juicio',
    subtitle: 'Transferencia al estudio virtual y uso ético de la inteligencia artificial.',
    estimatedMinutes: 12,
  },
  {
    id: SectionId.CIERRE,
    order: '06',
    shortLabel: 'Cierre',
    title: 'Síntesis y aprendizajes alcanzados',
    subtitle: 'Balance de tu recorrido, compromiso ético y bibliografía de acceso abierto.',
    estimatedMinutes: 5,
  },
];

export const BASELINE_OPTIONS = [
  {
    id: 'distraction',
    label: 'Mantener el foco frente a múltiples pestañas y notificaciones durante sesiones virtuales.',
  },
  {
    id: 'ai-temptation',
    label: 'Evitar delegar el pensamiento crítico a la IA cuando siento fatiga o presión por entregar.',
  },
  {
    id: 'sleep-rhythm',
    label: 'Proteger mi descanso y sensibilidad dopaminérgica en jornadas de estudio nocturno.',
  },
  {
    id: 'procrastination',
    label: 'Superar la parálisis o frustración inicial ante tareas universitarias complejas.',
  },
];

export const CONCEPT_CARDS: ExpandableCardItem[] = [
  {
    id: 'dopamina-busqueda',
    category: 'Neurobiología',
    title: 'La dopamina es motor de búsqueda, no de placer pasivo',
    summary:
      'El sistema dopaminérgico mesolímbico se activa ante la anticipación de un logro posible, no simplemente al consumir una recompensa.',
    myth: 'Creer que la dopamina solo se libera al sentir placer inmediato o al terminar una tarea fácil.',
    evidence:
      'Las neuronas dopaminérgicas codifican la expectativa de recompensa y sostienen el esfuerzo motor y atencional mientras perciben que la meta es alcanzable.',
    virtualImplication:
      'Dividir una sesión de estudio virtual de tres horas en micro-retos de 25 minutos produce señales frecuentes de progreso que sostienen la atención.',
  },
  {
    id: 'formula-epd',
    category: 'Modelo Predictivo',
    title: 'Error de Predicción de Dopamina (δ = R_real − R_esperada)',
    summary:
      'Tu cerebro compara continuamente lo que esperaba obtener con lo que realmente ocurre; esa diferencia ajusta la motivación futura.',
    myth: 'Suponer que el estudiante pierde interés por pura falta de voluntad o carácter.',
    evidence:
      'Cuando el resultado supera la expectativa (δ > 0), la descarga fásica de dopamina refuerza la ruta neuronal. Cuando la expectativa se frustra (δ < 0), la dopamina cae por debajo de la línea base.',
    virtualImplication:
      'Evaluaciones ambiguas o retos desproporcionados en el aula virtual provocan un desplome dopaminérgico que empuja al estudiante a abandonar la pestaña de estudio.',
  },
  {
    id: 'economia-ia',
    category: 'Economía Cognitiva y Deontología',
    title: 'Ley del mínimo esfuerzo y uso pasivo de la IA',
    summary:
      'El cerebro optimiza el gasto metabólico: si puede obtener la recompensa externa con costo energético cercano a cero, evitará el esfuerzo profundo.',
    myth: 'Pensar que pedir a una IA que redacte o resuma todo agiliza el aprendizaje universitario.',
    evidence:
      'Sin conflicto cognitivo ni poda sináptica activa (autofagia neurocognitiva), la información no se recicla en competencias duraderas y se degrada la metacognición.',
    virtualImplication:
      'Usar la IA de forma deontológica implica convertirla en entrenador socrático o interlocutor crítico, nunca en sustituto de la síntesis propia.',
  },
  {
    id: 'circadiano-d2',
    category: 'Cronobiología',
    title: 'Luz nocturna, sueño y receptores dopaminérgicos D2',
    summary:
      'Trasnochar frente a pantallas brillantes desincroniza el reloj biológico y reduce la sensibilidad de los receptores D2 al día siguiente.',
    myth: 'Compensar la falta de sueño estudiando más horas de madrugada frente al monitor sin consecuencias cognitivas.',
    evidence:
      'La luz azul suprime la melatonina e impide las fases No-REM y REM necesarias para el lavado glinfático y la consolidación sináptica; al despertar, la atención basal cae.',
    virtualImplication:
      'Un cerebro privado de sueño percibe la lectura académica como insoportable y busca recompensas hiper-dopaminérgicas rápidas en redes sociales.',
  },
];

export const TWO_ROUNDS: RoundChallenge[] = [
  {
    id: 'round1',
    numberLabel: 'Ronda 01',
    title: 'El dilema del examen final',
    epdType: 'positive',
    durationSeconds: 30,
    prompt:
      'Un profesor establece una regla estricta para su examen final: «Aquel estudiante que no traiga su propio bolígrafo azul, no podrá realizar el examen». El día de la evaluación, un estudiante llega sin bolígrafo azul; sin embargo, el profesor, cumpliendo estrictamente su propia regla y sin hacer excepciones, le permite presentar el examen. ¿Cómo es esto posible?',
    contextNote:
      'Dispones de 30 segundos. Analiza la formulación exacta de la regla antes de responder.',
    options: [
      {
        id: 'pencil',
        label: 'Trajo un lápiz (u otro instrumento de escritura como un examen digital) que no viola la regla literal.',
        isCorrect: true,
        feedback:
          'Exacto. La regla prohibía presentar el examen sin bolígrafo azul solo si se asumía que era el único medio posible, o bien el estudiante presentó una prueba digital o escribió con lápiz / bolígrafo negro según la interpretación lateral. Tu corteza prefrontal inhibió la suposición automática y resolvió el enigma.',
      },
      {
        id: 'borrowed',
        label: 'Le pidió prestado un bolígrafo azul a un compañero dentro del salón.',
        isCorrect: false,
        feedback:
          'Cuidado con el detalle literal: la regla exigía traer «su propio» bolígrafo azul. Pedirlo prestado incumpliría la norma.',
      },
      {
        id: 'exception',
        label: 'El profesor rompió su propia regla por empatía al ver que estudió.',
        isCorrect: false,
        feedback:
          'El enunciado especifica que el profesor cumplió estrictamente su regla sin romperla.',
      },
      {
        id: 'female',
        label: 'La persona que llegó era una estudiante mujer (no un «alumno» varón) o la regla aplicaba a un examen oral/digital.',
        isCorrect: true,
        feedback:
          '¡Bien visto! Esta es otra lectura clásica de pensamiento lateral válida: romper el sesgo de la formulación o considerar que el examen era oral/digital. El esfuerzo cognitivo dio un resultado positivo.',
      },
    ],
    revealTitle: 'Pico Dopaminérgico por Reto Equilibrado (δ > 0)',
    revealExplanation:
      'Al disponer de tiempo razonable (30 s) y una pista lógica descifrable, tu cerebro anticipó que podía resolver el problema. Ese equilibrio entre reto y habilidad (canal de Flow) genera una descarga dopaminérgica que fortalece la atención sostenida y las ganas de continuar.',
    neuroTakeaway:
      'Cuando la dificultad está calibrada, el esfuerzo se percibe como un desafío estimulante y no como una amenaza.',
  },
  {
    id: 'round2',
    numberLabel: 'Ronda 02',
    title: 'La velocidad del aprendizaje con IA',
    epdType: 'negative',
    durationSeconds: 10,
    prompt:
      'Si 5 sistemas de Inteligencia Artificial tardan exactamente 5 minutos en redactar 5 ensayos universitarios completos... ¿cuánto tiempo tardarán 100 sistemas de IA trabajando simultáneamente en redactar 100 ensayos?',
    contextNote:
      '¡Solo tienes 10 segundos! Responde lo más rápido que puedas antes de que el reloj llegue a cero.',
    options: [
      {
        id: '100-min',
        label: '100 minutos',
        isCorrect: false,
        isCognitiveTrap: true,
        feedback:
          '¡Caíste en el atajo de la economía cognitiva! Bajo presión de 10 segundos, el cerebro aplica una regla proporcional automática (5→5, entonces 100→100) para ahorrar energía.',
      },
      {
        id: '20-min',
        label: '20 minutos',
        isCorrect: false,
        feedback:
          'La presión temporal forzó una estimación rápida, pero los sistemas trabajan en paralelo, no en serie.',
      },
      {
        id: '5-min',
        label: '5 minutos',
        isCorrect: true,
        feedback:
          '¡Excelente control inhibitorio! Cada sistema produce un ensayo en 5 minutos de forma paralela, así que 100 sistemas también tardan 5 minutos.',
      },
      {
        id: '1-min',
        label: '1 minuto',
        isCorrect: false,
        feedback:
          'Cada sistema sigue necesitando sus propios 5 minutos para completar su ensayo.',
      },
    ],
    revealTitle: 'Desplome Dopaminérgico y Trampa Cognitiva (δ < 0)',
    revealExplanation:
      'Con solo 10 segundos y una redacción diseñada para disparar la heurística proporcional (5-5-5 → 100-100-100), la mayoría de los cerebros automatizan la respuesta «100 minutos» por economía cognitiva. Al descubrir el error bajo presión, se produce un Error de Predicción Negativo: la dopamina cae por debajo de la línea base.',
    neuroTakeaway:
      'En el aula virtual, cuando una tarea se percibe ambigua, injusta o abrumadora por falta de tiempo, ese desplome dopaminérgico empuja al estudiante a abrir redes sociales o copiar de una IA para huir de la frustración.',
  },
];

export const SENSATION_CHOICES = [
  {
    id: 'frustracion-bloqueo',
    label: 'Tensión y frustración rápida en la Ronda 2 por sentir que el tiempo me empujó al error.',
    interpretation:
      'Es la firma subjetiva típica de un Error de Predicción de Dopamina negativo (δ < 0): la corteza prefrontal detecta pérdida de control y el sistema límbico busca escapar de la tarea.',
  },
  {
    id: 'curiosidad-alerta',
    label: 'Activación y curiosidad en la Ronda 1, seguida de impulso automático en la Ronda 2.',
    interpretation:
      'Experimentaste en primera persona el contraste entre el sistema reflexivo (que disfruta descifrar un reto alcanzable) y el sistema automático guiado por economía cognitiva.',
  },
  {
    id: 'desmotivacion-escape',
    label: 'Impulso de rendirme o distraerme cuando el cronómetro apretó en la segunda ronda.',
    interpretation:
      'Ese micro-impulso de escape es exactamente el mecanismo que explica por qué en clases virtuales sin andamiaje se abren otras pestañas o se delega un trabajo completo a la IA.',
  },
  {
    id: 'calma-inhibitoria',
    label: 'Logré frenar el primer impulso y validar mi respuesta con análisis consciente.',
    interpretation:
      'Activaste tu monitoreo metacognitivo e inhibición prefrontal frente a la presión. Esa pausa deliberada es la base neurocognitiva del pensamiento crítico.',
  },
];

export const MATCHING_ITEMS: MatchingItem[] = [
  {
    id: 'm1',
    situation: 'Pasar de hacer scroll en videos cortos a intentar leer un artículo científico denso de inmediato.',
    mechanismId: 'contraste',
    mechanismLabel: 'Contraste hiper-dopaminérgico basal',
    strategy: 'Aplicar un ayuno dopaminérgico de transición de 5 a 10 minutos antes de abrir la lectura.',
  },
  {
    id: 'm2',
    situation: 'Copiar y pegar un ensayo completo generado por IA a las 11:50 p. m. para cumplir con la entrega.',
    mechanismId: 'minimo-esfuerzo',
    mechanismLabel: 'Economía cognitiva ciega (recompensa a costo cero)',
    strategy: 'Redactar hipótesis propias y pedir a la IA que busque fallos lógicos o contraejemplos.',
  },
  {
    id: 'm3',
    situation: 'Estudiar un bloque continuo de 4 horas sin metas intermedias ni pausas de verificación.',
    mechanismId: 'desplome-sostenido',
    mechanismLabel: 'Ausencia de micro-señales de progreso (δ ≤ 0)',
    strategy: 'Fraccionar la jornada en micro-retos verificables de 25 minutos con objetivos concretos.',
  },
  {
    id: 'm4',
    situation: 'Trasnochar frente al brillo del portátil hasta las 2:30 a. m. y despertar a las 6:00 a. m. para clase.',
    mechanismId: 'bloqueo-d2',
    mechanismLabel: 'Supresión de melatonina y baja sensibilidad D2',
    strategy: 'Activar filtros cálidos desde las 18:00 y sostener una hora fija de despertar con higiene lumínica.',
  },
];

export const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 'scenario-ai',
    contextLabel: 'Escenario 1 · Trabajo asíncrono y deontología',
    title: 'El ensayo de medianoche y la tentación del clic inmediato',
    narrative:
      'Son las 11:15 p. m., trabajaste todo el día y debes entregar un análisis crítico sobre un caso profesional en la plataforma virtual antes de la medianoche. Sientes fatiga y tu mente te sugiere pedirle a un asistente de IA que redacte el documento completo para terminarlo en dos minutos.',
    question: '¿Qué ruta eliges para proteger tu aprendizaje y tu ética profesional?',
    options: [
      {
        id: 'opt-copy',
        label: 'Generar el ensayo completo con IA, cambiar algunas palabras y subirlo.',
        description: 'Priorizas la recompensa inmediata de entregar con gasto energético mínimo.',
        quality: 'counterproductive',
        epdDelta: 'δ artificial (sin consolidación)',
        attentionImpact: 'Cero poda sináptica ni transferencia a memoria de largo plazo',
        feedback:
          'Obtienes la entrega, pero privas a tu cerebro del conflicto cognitivo necesario para construir la competencia. A mediano plazo, refuerzas la dependencia de atajos y vulneras la deontología universitaria.',
        deontologicalNote:
          'Riesgo ético alto: simular competencia profesional mediante autoría delegada.',
      },
      {
        id: 'opt-socratic',
        label: 'Escribir un esquema propio con 3 tesis y pedirle a la IA que actúe como evaluador crítico.',
        description: 'Usas la IA como andamio socrático para detectar vacíos en tu argumentación.',
        quality: 'optimal',
        epdDelta: 'δ > 0 sostenido por logro real',
        attentionImpact: 'Activa metacognición, corteza prefrontal y reciclaje de saberes',
        feedback:
          'Decisión neurodidáctica óptima. Al formular primero tus ideas y someterlas a debate con la IA, generas curiosidad cognitiva, mantienes el esfuerzo dentro de tu zona de flujo y consolidas aprendizaje significativo.',
        deontologicalNote:
          'Uso ético y transparente: la autoría intelectual y el criterio siguen siendo tuyos.',
      },
      {
        id: 'opt-read-only',
        label: 'Releer pasivamente las 40 diapositivas de la clase hasta que te venza el sueño.',
        description: 'Evitas la IA, pero estudias sin meta concreta ni preguntas guía.',
        quality: 'partial',
        epdDelta: 'δ ≈ 0 (habituación rápida)',
        attentionImpact: 'Caída progresiva de atención y retención superficial',
        feedback:
          'Aunque evitas el fraude académico, la lectura pasiva sin micro-retos produce baja activación dopaminérgica y acelera la curva del olvido al día siguiente.',
        deontologicalNote:
          'Sin falta ética, pero con baja eficiencia neurocognitiva.',
      },
    ],
  },
  {
    id: 'scenario-meet',
    contextLabel: 'Escenario 2 · Sesión sincrónica virtual',
    title: 'Fatiga de pantalla a los 25 minutos de videoconferencia',
    narrative:
      'Llevas 25 minutos escuchando una explicación teórica en Google Meet. Tu atención cae, miras de reojo el teléfono con notificaciones nuevas y sientes el impulso de abrir redes sociales en otra pestaña mientras mantienes la cámara apagada.',
    question: '¿Cómo reconfiguras tu entorno y tu circuito atencional en ese instante?',
    options: [
      {
        id: 'opt-multitask',
        label: 'Revisar redes sociales en silencio mientras escuchas la clase de fondo.',
        description: 'Intentas hacer multitarea para compensar el aburrimiento de la clase.',
        quality: 'counterproductive',
        epdDelta: 'δ < 0 para la clase (contraste dopaminérgico)',
        attentionImpact: 'Secuestro atencional y fragmentación de la memoria de trabajo',
        feedback:
          'El cambio constante entre estímulos de alta recompensa (redes) y una exposición académica reduce drásticamente el valor percibido de la clase. Al volver, la materia se sentirá aún más pesada.',
        deontologicalNote:
          'Auto-sabotaje cognitivo: sustituyes atención profunda por ruido informativo.',
      },
      {
        id: 'opt-microchallenge',
        label: 'Alejar el teléfono, formular una pregunta crítica sobre la diapositiva y anotar una hipótesis.',
        description: 'Generas un efecto suspenso cognitivo para rescatar tu metacognición.',
        quality: 'optimal',
        epdDelta: 'δ > 0 por curiosidad activa',
        attentionImpact: 'Reactiva el bucle Atención–Metacognición y acerca al estado de Flow',
        feedback:
          'Excelente intervención autorregulatoria. Al plantear una pregunta o conectar el tema con un caso de tu carrera, introduces impredecibilidad intelectual y devuelves a la corteza prefrontal el control de la atención.',
        deontologicalNote:
          'Compromiso activo con tu propia formación en modalidad virtual.',
      },
      {
        id: 'opt-force',
        label: 'Seguir mirando la pantalla fijamente sin tomar notas ni interactuar.',
        description: 'Confías únicamente en la fuerza de voluntad para no distraerte.',
        quality: 'partial',
        epdDelta: 'δ descendente por pasividad',
        attentionImpact: 'Riesgo alto de ceguera por desatención y fatiga visual',
        feedback:
          'La fuerza de voluntad aislada se agota rápido frente a la arquitectura distractora de los dispositivos. Sin interacción ni registro activo, el cerebro entra en piloto automático.',
        deontologicalNote:
          'Intención positiva, pero carente de estrategia neurocognitiva.',
      },
    ],
  },
  {
    id: 'scenario-sleep',
    contextLabel: 'Escenario 3 · Higiene circadiana y memoria',
    title: 'Preparación de evaluación tras una semana de trasnocho',
    narrative:
      'Es viernes a las 10:30 p. m., llevas cuatro noches durmiendo menos de 5 horas por combinar trabajo y estudios virtuales. Mañana tienes una evaluación práctica de resolución de casos. Tienes dos opciones para cerrar la noche.',
    question: '¿Qué estrategia protege mejor la consolidación de lo que ya estudiaste?',
    options: [
      {
        id: 'opt-allnighter',
        label: 'Tomar cafeína y quedarte hasta las 3:30 a. m. memorizando definiciones frente al monitor.',
        description: 'Sacrificas horas de sueño para intentar acumular más datos de último minuto.',
        quality: 'counterproductive',
        epdDelta: 'Desplome de receptores D2 al despertar',
        attentionImpact: 'Interrupción del sueño profundo No-REM y REM; olvido acelerado',
        feedback:
          'El brillo nocturno bloquea la melatonina y corta las fases en que el hipocampo transfiere memorias a la corteza. Mañana tendrás menor flexibilidad mental para resolver casos reales.',
        deontologicalNote:
          'Descuido del sustrato biológico necesario para el desempeño profesional.',
      },
      {
        id: 'opt-sleep-review',
        label: 'Hacer un repaso activo de 20 minutos sin pantallas luminosas y dormir para completar ciclos.',
        description: 'Priorizas la limpieza glinfática y la consolidación sináptica durante el sueño.',
        quality: 'optimal',
        epdDelta: 'Restauración basal de sensibilidad dopaminérgica',
        attentionImpact: 'Transferencia hipocampo-corteza (No-REM) e integración creativa (REM)',
        feedback:
          'Decisión respaldada por la cronobiología. El repaso espaciado previo al descanso marca qué redes sinápticas deben fortalecerse durante la noche, mientras el sueño consolida tu criterio resolutivo.',
        deontologicalNote:
          'Autocuidado neurocognitivo y sostenibilidad del aprendizaje universitario.',
      },
      {
        id: 'opt-scroll-bed',
        label: 'Dejar de estudiar a las 11:00 p. m., pero quedarte en la cama viendo el celular hasta la 1:30 a. m.',
        description: 'Crees descansar del estudio mientras mantienes estimulación lumínica y dopaminérgica.',
        quality: 'partial',
        epdDelta: 'Desbordamiento dopaminérgico nocturno',
        attentionImpact: 'Sueño fragmentado y fatiga atencional matutina',
        feedback:
          'Aunque cerraste los apuntes, la luz azul y los estímulos variables del teléfono engañan al núcleo supraquiasmático y deterioran la calidad reparadora del descanso.',
        deontologicalNote:
          'Descanso incompleto por higiene digital deficiente.',
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    competency: 'Neurobiología del EPD',
    stem: '¿Qué ocurre en el sistema dopaminérgico cuando un estudiante virtual enfrenta repetidamente tareas ambiguas o imposibles dentro del tiempo asignado?',
    options: [
      {
        id: 'q1-a',
        text: 'Se produce un Error de Predicción Negativo (δ < 0) que deprime la dopamina por debajo de la línea base e induce huida hacia distractores.',
        isCorrect: true,
        explanation:
          'Correcto. Como experimentaste en la Ronda 2, cuando la expectativa de logro fracasa bruscamente, la señal dopaminérgica cae y el cerebro busca recompensa inmediata en otras pestañas o atajos.',
      },
      {
        id: 'q1-b',
        text: 'La dopamina aumenta de forma sostenida porque el cerebro siempre disfruta cualquier tipo de dificultad extrema.',
        isCorrect: false,
        explanation:
          'Incorrecto. La dificultad extrema sin andamiaje (Reto >> Habilidad) genera ansiedad y desplome dopaminérgico, no motivación.',
      },
      {
        id: 'q1-c',
        text: 'La dopamina desaparece permanentemente de la corteza prefrontal hasta el final del semestre.',
        isCorrect: false,
        explanation:
          'Incorrecto. Se trata de una caída fásica y contextual asociada a la tarea; al recalibrar el reto, el sistema vuelve a responder.',
      },
    ],
  },
  {
    id: 'q2',
    competency: 'Canal de Flujo y Metacognición',
    stem: 'En términos de las variables Reto (R) y Habilidad (H), ¿qué condición facilita el estado de Flow durante el estudio universitario?',
    options: [
      {
        id: 'q2-a',
        text: 'Habilidad muy superior al reto (H >> R), para resolver la actividad sin esfuerzo.',
        isCorrect: false,
        explanation:
          'Incorrecto. Cuando el reto es demasiado bajo respecto a la habilidad, aparece el aburrimiento y la atención cae en picada.',
      },
      {
        id: 'q2-b',
        text: 'Equilibrio calibrado entre reto y habilidad (R ≈ H), donde la atención se sostiene sin saturación ansiosa.',
        isCorrect: true,
        explanation:
          'Correcto. En el canal de flujo (R ≈ H), la brecha atencional se estabiliza y la alarma metacognitiva no necesita interrumpir constantemente por ansiedad o tedio.',
      },
      {
        id: 'q2-c',
        text: 'Reto inmensamente superior a la habilidad (R >> H) combinado con restricción extrema de tiempo.',
        isCorrect: false,
        explanation:
          'Incorrecto. Esa combinación dispara la ansiedad, bloquea la corteza prefrontal y activa la economía cognitiva defensiva.',
      },
    ],
  },
  {
    id: 'q3',
    competency: 'Deontología e Inteligencia Artificial',
    stem: 'Desde la analogía de la autofagia neurocognitiva y la ética universitaria, ¿cuál es el principal problema de pedir a una IA que elabore íntegramente un trabajo académico?',
    options: [
      {
        id: 'q3-a',
        text: 'Que la IA utiliza fuentes demasiado antiguas para la educación superior.',
        isCorrect: false,
        explanation:
          'Incorrecto. El problema medular no es la fecha de los datos, sino la sustitución del proceso cognitivo del estudiante.',
      },
      {
        id: 'q3-b',
        text: 'Que automatiza el pensamiento, impide el conflicto cognitivo y bloquea el reciclaje de datos en competencias profesionales reales.',
        isCorrect: true,
        explanation:
          'Correcto. Sin esfuerzo activo, poda sináptica ni reflexión metacognitiva, el estudiante obtiene una calificación sin desarrollar las habilidades que necesitará en su ejercicio profesional.',
      },
      {
        id: 'q3-c',
        text: 'Que el uso de herramientas digitales siempre está prohibido por la neurodidáctica.',
        isCorrect: false,
        explanation:
          'Incorrecto. La neurodidáctica promueve el uso ético y activo de la IA como entrenador socrático, generador de contraejemplos y andamio metacognitivo.',
      },
    ],
  },
  {
    id: 'q4',
    competency: 'Cronobiología e Higiene Digital',
    stem: '¿Por qué hacer una transición de 5 a 10 minutos sin pantallas antes de estudiar mejora la respuesta dopaminérgica frente al material académico?',
    options: [
      {
        id: 'q4-a',
        text: 'Porque permite estabilizar la línea base de dopamina y reducir el contraste frente a estímulos hiper-recompensantes.',
        isCorrect: true,
        explanation:
          'Correcto. Venir de estímulos rápidos de redes sociales eleva el umbral de comparación; una pausa breve normaliza la sensibilidad para que el estudio resulte atractivo.',
      },
      {
        id: 'q4-b',
        text: 'Porque elimina por completo la necesidad de dormir fases No-REM y REM por la noche.',
        isCorrect: false,
        explanation:
          'Incorrecto. Ninguna pausa diurna sustituye el ciclo circadiano nocturno ni el lavado glinfático del sueño profundo.',
      },
      {
        id: 'q4-c',
        text: 'Porque borra la memoria episódica del día anterior para dejar espacio vacío.',
        isCorrect: false,
        explanation:
          'Incorrecto. La transición regula el tono dopaminérgico y atencional, no borra la memoria episódica.',
      },
    ],
  },
];

export const APA_REFERENCES: ReferenceItem[] = [
  {
    id: 'ref-mora-emociones',
    topic: 'Neuroeducación y emoción',
    apaCitation:
      'Mora, F. (2012). ¿Qué son las emociones? En Cómo educar las emociones (pp. 14-27). Observatorio FAROS Sant Joan de Déu.',
    summary:
      'Explica cómo los circuitos emocionales y la amígdala encienden la curiosidad y abren la puerta de la atención para consolidar aprendizajes significativos.',
    url: 'https://d1wqtxts1xzle7.cloudfront.net/38757302/25._Como_educar_las_emociones__Faros-libre.pdf',
    urlLabel: 'Acceso abierto en Observatorio FAROS',
  },
  {
    id: 'ref-corsi-dopamina',
    topic: 'Sistema dopaminérgico y ritmos circadianos',
    apaCitation:
      'Corsi-Cabrera, M., & Mendoza, J. (2017). Dopamine: A Modulator of Circadian Rhythms in the Central Nervous System. Frontiers in Cellular Neuroscience, 11, 74.',
    summary:
      'Revisa cómo la dopamina modula el reloj biológico central y cómo la estimulación artificial nocturna altera la atención y la motivación diurna.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5355422/',
    urlLabel: 'Texto completo en PMC (NCBI)',
  },
  {
    id: 'ref-reichert-adenosina',
    topic: 'Sueño, adenosina y memoria de trabajo',
    apaCitation:
      'Reichert, C., Maire, M., Schmidt, C., & Cajochen, C. (2016). Sleep-Wake Regulation and Its Impact on Working Memory Performance: The Role of Adenosine. Biology, 5(1), 11.',
    summary:
      'Analiza cómo la acumulación de adenosina por privación de sueño deteriora las funciones ejecutivas y la memoria operativa en la corteza prefrontal.',
    url: 'https://www.mdpi.com/2079-7737/5/1/11',
    urlLabel: 'Texto completo en MDPI',
  },
  {
    id: 'ref-autofagia',
    topic: 'Autofagia y limpieza cerebral',
    apaCitation:
      'Scientific Archives. (2022). Impact of Sleep on Autophagy and Neurodegenerative Disease: Sleeping Your Mind Clear. Journal of Brain and Neuroscience Research, 3(1), 12-19.',
    summary:
      'Describe cómo el descanso profundo promueve la degradación autofágica y la limpieza celular, sustento de la analogía del reciclaje neurocognitivo.',
    url: 'https://www.scientificarchives.com/article/impact-of-sleep-on-autophagy-and-neurodegenerative-disease-sleeping-your-mind-clear',
    urlLabel: 'Texto completo en Scientific Archives',
  },
  {
    id: 'ref-galenos-circadiano',
    topic: 'Cronobiología y memoria',
    apaCitation:
      'Galenos, J. (2024). Investigating the Relationship Between Circadian Rhythm and Learning-Memory. Journal of Turkish Sleep Medicine, 11(2), 112-118.',
    summary:
      'Examina la dependencia entre la consolidación sináptica de largo plazo y la sincronización de las fases No-REM y REM del ciclo circadiano.',
    url: 'https://jag.journalagent.com/jtsm/pdfs/JTSM-54251-REVIEW-GALENOS.pdf',
    urlLabel: 'Texto completo en JTSM',
  },
];
