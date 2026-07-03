// Arabic letter connection data — letters that don't connect to the following letter:
// أ، د، ذ، ر، ز، و

export const LONELY_LETTER_CHARS = new Set(["أ", "ر", "ز", "و", "د", "ذ"]);

export const lonelyLetters = [
  { letter: "أ", name: "Alif", nameAr: "ألف", emoji: "🦁" },
  { letter: "د", name: "Dal", nameAr: "دال", emoji: "🏠" },
  { letter: "ذ", name: "Dhal", nameAr: "ذال", emoji: "🌽" },
  { letter: "ر", name: "Ra", nameAr: "راء", emoji: "🌴" },
  { letter: "ز", name: "Zay", nameAr: "زاي", emoji: "🛢️" },
  { letter: "و", name: "Waw", nameAr: "واو", emoji: "🌹" },
];

export const sortLetters = [
  { id: "s1", letter: "و", lonely: true, emoji: "🌹" },
  { id: "s2", letter: "ج", lonely: false, emoji: "🐪" },
  { id: "s3", letter: "ذ", lonely: true, emoji: "🌽" },
  { id: "s4", letter: "ح", lonely: false, emoji: "❤️" },
  { id: "s5", letter: "ر", lonely: true, emoji: "🌴" },
  { id: "s6", letter: "ع", lonely: false, emoji: "👁️" },
  { id: "s7", letter: "د", lonely: true, emoji: "🏠" },
  { id: "s8", letter: "ش", lonely: false, emoji: "☀️" },
  { id: "s9", letter: "أ", lonely: true, emoji: "🦁" },
  { id: "s10", letter: "ك", lonely: false, emoji: "📖" },
  { id: "s11", letter: "ز", lonely: true, emoji: "🛢️" },
  { id: "s12", letter: "م", lonely: false, emoji: "🌊" },
];

export const wordBuilderChallenges = [
  {
    id: "w1",
    word: "وَلَد",
    meaning: "boy",
    emoji: "👦",
    hint: "Waw cannot connect to Lam.",
    letters: [
      { char: "و", lonely: true },
      { char: "ل", lonely: false },
      { char: "د", lonely: true },
    ],
  },
  {
    id: "w2",
    word: "رُمَّان",
    meaning: "pomegranate",
    emoji: "🍎",
    hint: "Ra leaves a gap before Meem.",
    letters: [
      { char: "ر", lonely: true },
      { char: "م", lonely: false },
      { char: "ا", lonely: true },
      { char: "ن", lonely: false },
    ],
  },
  {
    id: "w3",
    word: "ذِئْب",
    meaning: "wolf",
    emoji: "🐺",
    hint: "Dhal cannot connect to Hamza.",
    letters: [
      { char: "ذ", lonely: true },
      { char: "ئ", lonely: false },
      { char: "ب", lonely: false },
    ],
  },
  {
    id: "w4",
    word: "أَكَلَ",
    meaning: "ate",
    emoji: "🍽️",
    hint: "Alif cannot connect to Kaf.",
    letters: [
      { char: "أ", lonely: true },
      { char: "ك", lonely: false },
      { char: "ل", lonely: false },
    ],
  },
  {
    id: "w5",
    word: "زَرَعَ",
    meaning: "planted",
    emoji: "🌱",
    hint: "Zay cannot connect to Ra.",
    letters: [
      { char: "ز", lonely: true },
      { char: "ر", lonely: true },
      { char: "ع", lonely: false },
    ],
  },
  {
    id: "w6",
    word: "دُب",
    meaning: "bear",
    emoji: "🐻",
    hint: "Dal cannot connect to Ba.",
    letters: [
      { char: "د", lonely: true },
      { char: "ب", lonely: false },
    ],
  },
];

export const connectPairs = [
  { id: "c1", first: "ل", second: "م", connects: true, wordHint: "لَمَسَ" },
  { id: "c2", first: "ن", second: "ج", connects: true, wordHint: "نَجْم" },
  { id: "c3", first: "ك", second: "ت", connects: true, wordHint: "كَتَبَ" },
  { id: "c5", first: "و", second: "ل", connects: false, wordHint: "وَلَد" },
  { id: "c6", first: "ر", second: "م", connects: false, wordHint: "رُمَّان" },
  { id: "c7", first: "د", second: "ب", connects: false, wordHint: "دُب" },
  { id: "c8", first: "ذ", second: "ئ", connects: false, wordHint: "ذِئْب" },
  { id: "c4", first: "ج", second: "م", connects: true, wordHint: "جَمَل" },
  { id: "c9", first: "ز", second: "ر", connects: false, wordHint: "زَرَعَ" },
  { id: "c10", first: "أ", second: "ك", connects: false, wordHint: "أَكَلَ" },
];
