// data/tajweedGames.js
export const quizQuestions = [
  {
    question: "which of these shows ikhfaa?",
    answers: [
      { text: "من قبل", isCorrect: true },
      { text: "من بعد", isCorrect: false },
      { text: "من وراء", isCorrect: false },
      { text: "من خلف", isCorrect: false },
    ],
  },
  {
    question: "what's the meaning of idgham?",
    answers: [
      { text: "hide", isCorrect: false },
      { text: "merge", isCorrect: true },
      { text: "turn over", isCorrect: false },
      { text: "clear", isCorrect: false },
    ],
  },
  {
    question: "what are we suppoed to do when we see 'نّ' or 'مّ'?",
    answers: [
      { text: "Do Nothing", isCorrect: false },
      { text: "Do Ghunnah", isCorrect: true },
      { text: "Do Idgham", isCorrect: false },
      { text: "Do Ikhfa", isCorrect: false },
    ],
  },
  {
    question: "What do we do when نْ meets ب?",
    answers: [
      { text: "Merge them", isCorrect: false },
      { text: "Change ن to م (Iqlab)", isCorrect: true },
      { text: "Hide the sound", isCorrect: false },
      { text: "say them clearly", isCorrect: false },
    ],
  },
  {
    question: "Which of these shows Izhaar?",
    answers: [
      { text: "من حليب", isCorrect: true },
      { text: "من ربك", isCorrect: false },
      { text: "من بعد", isCorrect: false },
      { text: "عن بنت", isCorrect: false },
    ],
  },
  {
    question: "How long is the Ghunnah sound?",
    answers: [
      { text: "1 second", isCorrect: false },
      { text: "2 beats", isCorrect: true },
      { text: "No sound", isCorrect: false },
      { text: "Very long", isCorrect: false },
    ],
  },
  {
    question: "Which letter doesn't make Qalqalah?",
    answers: [
      { text: "ق", isCorrect: false },
      { text: "ب", isCorrect: false },
      { text: "م", isCorrect: true },
      { text: "ط", isCorrect: false },
    ],
  },
  {
    question: "When do we hide نْ (Ikhfaa)?",
    answers: [
      { text: "Before ت", isCorrect: true },
      { text: "Before م", isCorrect: false },
      { text: "Before ب", isCorrect: false },
      { text: "Before و", isCorrect: false },
    ],
  },
  {
    question: "Which word has Ghunnah?",
    answers: [
      { text: "أمّ", isCorrect: true },
      { text: "باب", isCorrect: false },
      { text: "قلم", isCorrect: false },
      { text: "دين", isCorrect: false },
    ],
  },
];

export const wheelItems = [
  "Ghunnah",
  "Idgham",
  "Ikhfa",
  "Iqlab",
  "Izhaar",
  "Qalqalah",
];

export const matchingPairs = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د"];

export const flashCards = [
  {
    question: "What is Tajweed?",
    answer:
      "The art of reciting the Quran with proper pronunciation, rhythm, and rules",
  },
  {
    question: "What is 'Ghunnah'?",
    answer:
      "A nasal sound",
  },
  {
    question: "What does 'Idgham' mean?",
    answer: "Merging or mixing of 'نْ' with certain letters 'يرملون'",
  },
  {
    question: "What is 'Ikhfa'?",
    answer: "Hiding the sound of noon sakinah or tanween",
  },
  {
    question: "What does 'Iqlab' mean?",
    answer:
      "Changing noon sakinah or tanween into a meem sound before the letter ب",
  },
  {
    question: "What is 'Izhar'?",
    answer:
      "Clear pronunciation of noon sakinah or tanween before throat letters 'ه ء ع ح غ خ'",
  },
  {
    question: "What are the throat letters for Izhar?",
    answer: "ء ، ه، ع، ح، غ، خ (hamza, Ha, Ain, Ha, Ghain, Kha)",
  },
  {
    question: "What is 'Qalqalah'?",
    answer: "A bouncing or echoing sound done with letters ق، ط، ب، ج، د",
  },
];

// Match Up Game Data - Drag keywords to definitions
export const matchUpData = {
  keywords: [
    {
      id: 1,
      term: "Izhaar",
      definition: "Clear pronunciation of نْ before ح خ ه ع غ أ",
    },
    {
      id: 2,
      term: "Ghunnah",
      definition:
        "A nasal sound",
    },
    {
      id: 3,
      term: "Idgham",
      definition:
        "Merging or mixing of noon sakinah or tanween with certain letters 'يرملون'",
    },
    {
      id: 4,
      term: "Ikhfa",
      definition: "Hiding the sound of noon sakinah or tanween",
    },
    {
      id: 5,
      term: "Iqlab",
      definition:
        "Changing noon sakinah or tanween into a meem sound before the letter ب",
    },
    {
      id: 6,
      term: "Qalqalah",
      definition:
        "A bouncing or echoing sound produced with letters ق، ط، ب، ج، د",
    },
  ],
  definitions: [
    {
      id: 1,
      text: "Clear pronunciation of نْ before ح خ ه ع غ أ",
    },
    {
      id: 2,
      text: "A nasal sound",
    },
    {
      id: 3,
      text: "Merging or mixing - when one letter merges into another",
    },
    {
      id: 4,
      text: "Hiding or concealing the sound of noon sakinah or tanween",
    },
    {
      id: 5,
      text: "Changing noon sakinah or tanween into a meem sound before the letter ب",
    },
    {
      id: 6,
      text: "A bouncing or echoing sound produced with letters ق، ط، ب، ج، د",
    },
  ],
};

// Open Box Game Data - Tap boxes to reveal Tajweed concepts
export const boxItems = [
  {
    emoji: "🔊",
    title: "Ghunnah",
    description: "Nasal sound",
  },
  {
    emoji: "🔗",
    title: "Idgham",
    description: "Letter merging",
  },
  {
    emoji: "🙈",
    title: "Ikhfa",
    description: "Hidden pronunciation",
  },
  {
    emoji: "🔄",
    title: "Iqlab",
    description: "Sound changing",
  },
  {
    emoji: "⚡",
    title: "Qalqalah",
    description: "Bouncing sound",
  },
  {
    emoji: "🎵",
    title: "Tajweed",
    description: "Beautiful recitation",
  },
];

// Anagram Game Data - Unscramble Tajweed terms
export const anagramData = [
  {
    word: "IZHAAR",
    hint: "Showing نْ clearly before throat letters 'ه ء ع ح غ خ'",
  },
  {
    word: "TAJWEED",
    hint: "The art of beautiful Quran recitation",
  },
  {
    word: "GHUNNAH",
    hint: "Nasal sound",
  },
  {
    word: "IDGHAM",
    hint: "When letters merge together",
  },
  {
    word: "IKHFA",
    hint: "Hiding the sound of noon sakinah",
  },
  {
    word: "IQLAB",
    hint: "Changing noon sakinah to meem sound",
  },
  {
    word: "QALQALAH",
    hint: "Bouncing sound with specific letters",
  },
  {
    word: "MADD",
    hint: "Stretching vowel sounds",
  },
];

// Group Sort Game Data - Sort items into categories
export const groupSortData = {
  groups: [
    {
      id: 1,
      name: "Noon Sakinah Rules",
      emoji: "📝",
      description: "Rules for noon sakinah and tanween",
    },
  ],
  items: [
    { id: 1, name: "Idgham", emoji: "🔗", groupId: 1 },
    { id: 2, name: "Ikhfa", emoji: "🙈", groupId: 1 },
    { id: 3, name: "Iqlab", emoji: "🔄", groupId: 1 },
    { id: 5, name: "Izhar", emoji: "🔊", groupId: 1 },
  ],
};

// Speaking Cards Game Data - Random cards for pronunciation practice
export const speakingCards = [
  {
    id: 1,
    title: "Izhaar",
    emoji: "🔊",
    description: "Practice saying نْ clearly before throat letters",
    example: "Say 'من حليب' clearly",
  },
  {
    id: 2,
    title: "Ikhfaa",
    emoji: "🙉",
    description: "Practice hiding نْ before 15 letters",
    example: "Say 'من تاجر' with hidden noon",
  },
  {
    id: 3,
    title: "Qalqalah ق",
    emoji: "💥",
    description: "Practice the strong ق sound from throat",
    example: "Say 'مُقْبل' with bouncing ق",
  },
  {
    id: 4,
    title: "Ghunnah Practice",
    emoji: "👶",
    description: "Make nasal sound like a baby crying",
    example: "Say 'أنّ' like 'nnnn' (2 beats)",
  },
  {
    id: 5,
    title: "Idgham Without Ghunnah",
    emoji: "🚀",
    description: "Merge نْ into ل or ر quickly",
    example: "Say 'من ربك' fast → 'mirrabbik'",
  },
  {
    id: 6,
    title: "Iqlab Fun",
    emoji: "🪄",
    description: "Magic trick! Change ن to م before ب",
    example: "Say 'من بعيد' → 'mim ba'eed'",
  },
];

// Find Match Game Data - Tap matching pairs to eliminate them
export const findMatchData = [
  { id: 1, text: "Ghunnah", emoji: "👃", pairId: 1, subtitle: "Term" },
  {
    id: 2,
    text: "Nasal Sound",
    emoji: "🔊",
    pairId: 1,
    subtitle: "Definition",
  },
  { id: 2, text: "Idgham", emoji: "🔗", pairId: 2, subtitle: "Term" },
  {
    id: 3,
    text: "Merging Letters",
    emoji: "🤝",
    pairId: 2,
    subtitle: "Definition",
  },
  { id: 3, text: "Qalqalah", emoji: "⚡", pairId: 3, subtitle: "Term" },
  {
    id: 4,
    text: "Bouncing Sound",
    emoji: "🏀",
    pairId: 3,
    subtitle: "Definition",
  },
];

// Unjumble Game Data - Rearrange words to form correct sentences
export const unjumbleData = [
  {
    topic: "Basic Tajweed Definition",
    words: [
      "Tajweed",
      "is",
      "the",
      "art",
      "of",
      "beautiful",
      "Quran",
      "recitation",
    ],
    correctSentence: "Tajweed is the art of beautiful Quran recitation",
  },
  {
    topic: "Iqlab Rule",
    words: ["Change", "ن", "to", "م", "before", "ب"],
    correctSentence: "Change ن to م before ب",
  },
  {
    topic: "Izhaar Letters",
    words: ["ح", "خ", "ه", "ع", "غ", "أ"],
    correctSentence: "ح خ ه ع غ أ",
  },
  {
    topic: "Ghunnah Time",
    words: ["Nasal", "sound", "for", "2", "beats"],
    correctSentence: "Nasal sound for 2 beats",
  },
  {
    topic: "Qalqalah Word",
    words: ["قطب", "جد", "makes", "bouncing", "sound"],
    correctSentence: "قطب جد makes bouncing sound",
  },
  {
    topic: "Idgham Letters",
    words: ["ی", "ر", "م", "ل", "و", "ن"],
    correctSentence: "ی ر م ل و ن",
  },
  {
    topic: "Noon with Shadda",
    words: ["نّ", "always", "has", "Ghunnah"],
    correctSentence: "نّ always has Ghunnah",
  },
];

// Complete Sentence Game Data - Fill in the blanks
export const completeSentenceData = [
  {
    topic: "Idgham Rule",
    sentence: "Idgham means merging نْ with ___, ___, ___, ___, ___, or ___",
    blanks: ["ی", "ر", "م", "ل", "و", "ن"],
    options: ["ی", "ر", "م", "ل", "و", "ن", "ب", "ت"],
    completeSentence: "Idgham means merging نْ with ی, ر, م, ل, و, or ن",
  },
  {
    topic: "Ikhfaa Letters",
    sentence: "We hide نْ before letters like ___, ___, and ___",
    blanks: ["ت", "ج", "ق"],
    options: ["ت", "ج", "ق", "ب", "ی", "م"],
    completeSentence: "We hide نْ before letters like ت, ج, and ق",
  },
  {
    topic: "Ghunnah Time",
    sentence: "Ghunnah lasts for ___ beats (harakat)",
    blanks: ["two"],
    options: ["two", "one", "three", "four"],
    completeSentence: "Ghunnah lasts for two beats (harakat)",
  },
  {
    topic: "Qalqalah Strength",
    sentence: "The strongest Qalqalah is with letter ___",
    blanks: ["ق"],
    options: ["ق", "ب", "د", "ط"],
    completeSentence: "The strongest Qalqalah is with letter ق",
  },
  {
    topic: "Izhaar Example",
    sentence: "In 'من ___', we do Izhaar (show ن clearly)",
    blanks: ["حليب"],
    options: ["حليب", "ربك", "بعد", "تاجر"],
    completeSentence: "In 'من حليب', we do Izhaar (show ن clearly)",
  },
  {
    topic: "Meem Shadda",
    sentence: "مّ always has ___ sound",
    blanks: ["Ghunnah"],
    options: ["Ghunnah", "Qalqalah", "Idgham", "Ikhfaa"],
    completeSentence: "مّ always has Ghunnah sound",
  },
  {
    topic: "Iqlab Example",
    sentence: "In 'من ___', we change ن to م",
    blanks: ["بعد"],
    options: ["بعد", "ربك", "حليب", "تاجر"],
    completeSentence: "In 'من بعد', we change ن to م",
  },
];
