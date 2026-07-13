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
    id: "w5",
    word: "زَوْرَق",
    meaning: "boat",
    emoji: "🚣",
    hint: "Zay cannot connect to Waw.",
    letters: [
      { char: "ز", lonely: true },
      { char: "و", lonely: true },
      { char: "ر", lonely: true },
      { char: "ق", lonely: false },
    ],
  },
  {
    id: "w6",
    word: "دَوَاء",
    meaning: "medicine",
    emoji: "💊",
    hint: "Dal cannot connect to Waw.",
    letters: [
      { char: "د", lonely: true },
      { char: "و", lonely: true },
      { char: "ا", lonely: true },
      { char: "ء", lonely: false },
    ],
  },
  {
    id: "w2",
    word: "رَسَمَ",
    meaning: "drew",
    emoji: "🎨",
    hint: "Ra cannot connect to Seen.",
    letters: [
      { char: "ر", lonely: true },
      { char: "س", lonely: false },
      { char: "م", lonely: false },
    ],
  },
  {
    id: "w3",
    word: "ذَهَب",
    meaning: "gold",
    emoji: "🥇",
    hint: "Dhal cannot connect to Ha.",
    letters: [
      { char: "ذ", lonely: true },
      { char: "ه", lonely: false },
      { char: "ب", lonely: false },
    ],
  },
  {
    id: "w4",
    word: "أَمَل",
    meaning: "hope",
    emoji: "✨",
    hint: "Alif cannot connect to Meem.",
    letters: [
      { char: "أ", lonely: true },
      { char: "م", lonely: false },
      { char: "ل", lonely: false },
    ],
  },
  {
    id: "w2",
    word: "رَمْل",
    meaning: "sand",
    emoji: "🏖️",
    hint: "Ra cannot connect to Meem.",
    letters: [
      { char: "ر", lonely: true },
      { char: "م", lonely: false },
      { char: "ل", lonely: false },
    ],
  },
];

export const connectPairs = [
{ id: "c1", first: "س", second: "ب", connects: true, wordHint: "سَبَحَ" },
{ id: "c2", first: "ف", second: "ل", connects: true, wordHint: "قَالَ" },
{ id: "c3", first: "ش", second: "ج", connects: true, wordHint: "شَجَرَة" },
{ id: "c4", first: "ع", second: "م", connects: true, wordHint: "عَمِل" },

{ id: "c5", first: "و", second: "ج", connects: false, wordHint: "وَجْه" },
{ id: "c6", first: "ر", second: "ك", connects: false, wordHint: "رَكِبَ" },
{ id: "c7", first: "د", second: "و", connects: false, wordHint: "دَوَاء" },
{ id: "c8", first: "ذ", second: "ه", connects: false, wordHint: "ذَهَب" },
];
