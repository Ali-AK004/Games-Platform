// Arabic letter connection data — letters that don't connect forward: أ, ر, ز, و, د, ذ

export const LONELY_LETTER_CHARS = new Set(["أ", "ر", "ز", "و", "د", "ذ"]);

export const lonelyLetters = [
  { letter: "أ", name: "Alif", nameAr: "ألف", emoji: "🏔️" },
  { letter: "د", name: "Dal", nameAr: "دال", emoji: "🚪" },
  { letter: "ذ", name: "Dhal", nameAr: "ذال", emoji: "🌵" },
  { letter: "ر", name: "Ra", nameAr: "راء", emoji: "🌊" },
  { letter: "ز", name: "Zay", nameAr: "زاي", emoji: "⭐" },
  { letter: "و", name: "Waw", nameAr: "واو", emoji: "🌙" },
];

export const sortLetters = [
  { id: "s1", letter: "أ", lonely: true, emoji: "🏔️" },
  { id: "s2", letter: "ب", lonely: false, emoji: "🐝" },
  { id: "s3", letter: "ر", lonely: true, emoji: "🌊" },
  { id: "s4", letter: "م", lonely: false, emoji: "🌙" },
  { id: "s5", letter: "د", lonely: true, emoji: "🚪" },
  { id: "s6", letter: "س", lonely: false, emoji: "⭐" },
  { id: "s7", letter: "ز", lonely: true, emoji: "✨" },
  { id: "s8", letter: "ل", lonely: false, emoji: "🦁" },
  { id: "s9", letter: "و", lonely: true, emoji: "🌙" },
  { id: "s10", letter: "ن", lonely: false, emoji: "🌸" },
  { id: "s11", letter: "ذ", lonely: true, emoji: "🌵" },
  { id: "s12", letter: "ي", lonely: false, emoji: "🐪" },
];

export const wordBuilderChallenges = [
  {
    id: "w1",
    word: "دَرَج",
    meaning: "stairs",
    emoji: "🪜",
    hint: "Dal won't hold Ra's hand!",
    letters: [
      { char: "د", lonely: true },
      { char: "ر", lonely: true },
      { char: "ج", lonely: true },
    ],
  },
  {
    id: "w2",
    word: "وَرْد",
    meaning: "rose",
    emoji: "🌹",
    hint: "Waw leaves a gap before Ra!",
    letters: [
      { char: "و", lonely: true },
      { char: "ر", lonely: true },
      { char: "د", lonely: true },
    ],
  },
  {
    id: "w3",
    word: "أَرْنَب",
    meaning: "rabbit",
    emoji: "🐰",
    hint: "Alif stands alone at the start!",
    letters: [
      { char: "أ", lonely: true },
      { char: "ر", lonely: true },
      { char: "ن", lonely: false },
      { char: "ب", lonely: false },
    ],
  },
  {
    id: "w4",
    word: "زَرَاف",
    meaning: "giraffe",
    emoji: "🦒",
    hint: "Zay waves goodbye to Ra!",
    letters: [
      { char: "ز", lonely: true },
      { char: "ر", lonely: true },
      { char: "ا", lonely: true },
      { char: "ف", lonely: true },
    ],
  },
];

export const connectPairs = [
  { id: "c1", first: "ب", second: "ا", connects: true, wordHint: "بَاب" },
  { id: "c2", first: "د", second: "ر", connects: false, wordHint: "دَرَج" },
  { id: "c3", first: "م", second: "و", connects: true, wordHint: "مَوْج" },
  { id: "c4", first: "ر", second: "س", connects: false, wordHint: "رَسْم" },
  { id: "c5", first: "س", second: "م", connects: true, wordHint: "سَمَك" },
  { id: "c6", first: "و", second: "ق", connects: false, wordHint: "وَقْت" },
  { id: "c7", first: "ز", second: "ه", connects: false, wordHint: "زَهْر" },
  { id: "c8", first: "ل", second: "ب", connects: true, wordHint: "لَبَن" },
];
