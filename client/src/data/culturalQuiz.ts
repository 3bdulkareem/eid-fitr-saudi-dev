export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: 'general' | 'saudi' | 'islamic' | 'arabic'
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Proverb {
  id: string
  proverb: string
  meaning: string
  origin: string
  emoji: string
}

export interface Wisdom {
  id: string
  quote: string
  author: string
  category: string
  emoji: string
}

export interface FunFact {
  id: string
  title: string
  fact: string
  emoji: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'كم عدد أركان الإسلام؟',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'أركان الإسلام خمسة: الشهادة، الصلاة، الزكاة، الصوم، والحج',
    category: 'islamic',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'ما هي عاصمة المملكة العربية السعودية؟',
    options: ['جدة', 'الرياض', 'الدمام', 'مكة'],
    correctAnswer: 1,
    explanation: 'الرياض هي عاصمة المملكة العربية السعودية',
    category: 'saudi',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'في أي سنة تأسست المملكة العربية السعودية؟',
    options: ['1920', '1932', '1945', '1950'],
    correctAnswer: 1,
    explanation: 'تأسست المملكة العربية السعودية في سنة 1932',
    category: 'saudi',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'كم عدد أيام شهر رمضان؟',
    options: ['28', '29', '30', 'يختلف بين 29 و 30'],
    correctAnswer: 3,
    explanation: 'عدد أيام رمضان إما 29 أو 30 يوماً حسب رؤية الهلال',
    category: 'islamic',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: 'ما هو أطول نهر في العالم؟',
    options: ['الأمازون', 'النيل', 'الفرات', 'دجلة'],
    correctAnswer: 1,
    explanation: 'نهر النيل هو أطول نهر في العالم بطول حوالي 6650 كم',
    category: 'general',
    difficulty: 'easy'
  },
  {
    id: '6',
    question: 'كم عدد دول مجلس التعاون الخليجي؟',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    explanation: 'دول مجلس التعاون الخليجي ست دول: السعودية، الإمارات، قطر، البحرين، عمان، والكويت',
    category: 'saudi',
    difficulty: 'medium'
  },
  {
    id: '7',
    question: 'ما هي أكبر صحراء في العالم؟',
    options: ['صحراء الربع الخالي', 'صحراء الكالاهاري', 'صحراء الصحراء الكبرى', 'صحراء جوبي'],
    correctAnswer: 2,
    explanation: 'الصحراء الكبرى هي أكبر صحراء في العالم تقع في شمال أفريقيا',
    category: 'general',
    difficulty: 'medium'
  },
  {
    id: '8',
    question: 'كم عدد سور القرآن الكريم؟',
    options: ['100', '110', '114', '120'],
    correctAnswer: 2,
    explanation: 'القرآن الكريم يحتوي على 114 سورة',
    category: 'islamic',
    difficulty: 'easy'
  },
  {
    id: '9',
    question: 'ما هي أقدم عاصمة مأهولة بالسكان في العالم؟',
    options: ['القاهرة', 'دمشق', 'بغداد', 'القدس'],
    correctAnswer: 1,
    explanation: 'دمشق تعتبر من أقدم العواصم المأهولة بالسكان بشكل مستمر',
    category: 'general',
    difficulty: 'hard'
  },
  {
    id: '10',
    question: 'كم عدد أيام السنة الميلادية؟',
    options: ['364', '365', '365.25', '366'],
    correctAnswer: 2,
    explanation: 'السنة الميلادية تحتوي على 365.25 يوماً تقريباً، لذا كل 4 سنوات سنة كبيسة',
    category: 'general',
    difficulty: 'medium'
  }
]

export const proverbs: Proverb[] = [
  {
    id: '1',
    proverb: 'من جد وجد، ومن سار على الدرب وصل',
    meaning: 'الاجتهاد والمثابرة يؤديان إلى النجاح والوصول للأهداف',
    origin: 'مثل عربي قديم',
    emoji: '🎯'
  },
  {
    id: '2',
    proverb: 'الصديق وقت الضيق',
    meaning: 'الصديق الحقيقي هو من يكون بجانبك في الأوقات الصعبة',
    origin: 'مثل عربي شهير',
    emoji: '👥'
  },
  {
    id: '3',
    proverb: 'العلم نور والجهل ظلام',
    meaning: 'العلم يضيء الطريق والجهل يبقيك في الظلام',
    origin: 'مثل إسلامي عربي',
    emoji: '💡'
  },
  {
    id: '4',
    proverb: 'الصبر مفتاح الفرج',
    meaning: 'الصبر والتحمل يؤديان إلى حل المشاكل والفرج',
    origin: 'مثل إسلامي',
    emoji: '🔑'
  },
  {
    id: '5',
    proverb: 'الحلم أفضل من العجلة',
    meaning: 'التأني والحكمة أفضل من التسرع والعجلة',
    origin: 'مثل عربي قديم',
    emoji: '🧘'
  },
  {
    id: '6',
    proverb: 'الكلمة الطيبة صدقة',
    meaning: 'الكلمة اللطيفة واللطف مع الآخرين عمل خير',
    origin: 'مثل إسلامي',
    emoji: '💬'
  },
  {
    id: '7',
    proverb: 'الوقت من ذهب',
    meaning: 'الوقت ثمين جداً ويجب استغلاله بحكمة',
    origin: 'مثل عربي شهير',
    emoji: '⏰'
  },
  {
    id: '8',
    proverb: 'التعاون بين الناس يصنع المعجزات',
    meaning: 'العمل الجماعي والتعاون يحقق أشياء عظيمة',
    origin: 'مثل عربي حديث',
    emoji: '🤝'
  }
]

export const wisdomQuotes: Wisdom[] = [
  {
    id: '1',
    quote: 'لا تحزن على ما مضى، ولا تخف مما هو آتٍ، واهتم بما أنت فيه الآن',
    author: 'حكمة عربية',
    category: 'الحياة والسعادة',
    emoji: '😊'
  },
  {
    id: '2',
    quote: 'الإنسان يحصل على ما يستحقه من خلال عمله واجتهاده',
    author: 'حكمة عامة',
    category: 'العمل والإنجاز',
    emoji: '💪'
  },
  {
    id: '3',
    quote: 'الأم مدرسة إذا أعددتها أعددت شعباً طيب الأعراق',
    author: 'حافظ إبراهيم',
    category: 'الأسرة والتربية',
    emoji: '👩'
  },
  {
    id: '4',
    quote: 'الحب هو أعظم قوة في العالم، وهو يحرك الجبال',
    author: 'حكمة عربية',
    category: 'الحب والعطف',
    emoji: '❤️'
  },
  {
    id: '5',
    quote: 'الشجاعة ليست غياب الخوف، بل التغلب عليه',
    author: 'حكمة عامة',
    category: 'الشجاعة والقوة',
    emoji: '🦁'
  },
  {
    id: '6',
    quote: 'الإخفاق هو أول خطوة نحو النجاح',
    author: 'حكمة عامة',
    category: 'النجاح والتطور',
    emoji: '🚀'
  },
  {
    id: '7',
    quote: 'الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى',
    author: 'حكمة عربية',
    category: 'الصحة والعافية',
    emoji: '💚'
  },
  {
    id: '8',
    quote: 'الحقيقة مرة لكنها أفضل من الكذب الحلو',
    author: 'حكمة عربية',
    category: 'الصدق والأمانة',
    emoji: '✨'
  }
]

export const funFacts: FunFact[] = [
  {
    id: '1',
    title: 'عن العيد',
    fact: 'عيد الفطر يأتي بعد شهر رمضان مباشرة، وهو يوم فرح وسعادة يحتفل به المسلمون في جميع أنحاء العالم',
    emoji: '🎉'
  },
  {
    id: '2',
    title: 'عن الملابس العيدية',
    fact: 'ارتداء الملابس الجديدة في العيد تقليد عريق يعود إلى آلاف السنين، وهو يرمز للتجديد والبدايات الجديدة',
    emoji: '👗'
  },
  {
    id: '3',
    title: 'عن الحلويات',
    fact: 'الحلويات العيدية لها أهمية ثقافية كبيرة، وتختلف من دولة لأخرى بناءً على التراث والعادات المحلية',
    emoji: '🍪'
  },
  {
    id: '4',
    title: 'عن الهدايا',
    fact: 'تبادل الهدايا في العيد يعزز الروابط الاجتماعية والعائلية، ويعكس الحب والاحترام بين الناس',
    emoji: '🎁'
  },
  {
    id: '5',
    title: 'عن الزيارات العائلية',
    fact: 'العيد هو وقت تجتمع فيه العائلات والأقارب، وهذا يقوي الروابط الأسرية والعلاقات الاجتماعية',
    emoji: '👨‍👩‍👧‍👦'
  },
  {
    id: '6',
    title: 'عن الألعاب التقليدية',
    fact: 'الألعاب التقليدية في العيد تعكس التراث والثقافة الشعبية، وتنقل الخبرات من جيل إلى آخر',
    emoji: '🎮'
  },
  {
    id: '7',
    title: 'عن الفعاليات',
    fact: 'تنظيم الفعاليات والمهرجانات في العيد يجعل الاحتفال أكثر بهجة وتنوعاً',
    emoji: '🎪'
  },
  {
    id: '8',
    title: 'عن العطور والبخور',
    fact: 'استخدام العطور والبخور في العيد تقليد عربي قديم، ويرمز للنظافة والطهارة والفرح',
    emoji: '🌹'
  }
]
