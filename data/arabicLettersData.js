// Arabic letter connection data — letters that don't connect to the following letter:
// أ، د، ذ، ر، ز، و

export const LONELY_LETTER_CHARS = new Set(["أ", "ر", "ز", "و", "د", "ذ"]);

export const lonelyLetters = [
  { letter: "أ", name: "Alif", nameAr: "ألف", emoji: "🍎" },
  { letter: "د", name: "Dal", nameAr: "دال", emoji: "🚪" },
  { letter: "ذ", name: "Dhal", nameAr: "ذال", emoji: "🌽" },
  { letter: "ر", name: "Ra", nameAr: "راء", emoji: "🚗" },
  { letter: "ز", name: "Zay", nameAr: "زاي", emoji: "🌸" },
  { letter: "و", name: "Waw", nameAr: "واو", emoji: "🌙" },
];

export const sortLetters = [
  { id: "s1", letter: "أ", lonely: true, emoji: "🍎" },
  { id: "s2", letter: "ت", lonely: false, emoji: "🍓" },
  { id: "s3", letter: "ر", lonely: true, emoji: "🚗" },
  { id: "s4", letter: "ك", lonely: false, emoji: "🪁" },
  { id: "s5", letter: "د", lonely: true, emoji: "🚪" },
  { id: "s6", letter: "ف", lonely: false, emoji: "🐘" },
  { id: "s7", letter: "ز", lonely: true, emoji: "🌸" },
  { id: "s8", letter: "ق", lonely: false, emoji: "☕" },
  { id: "s9", letter: "و", lonely: true, emoji: "🌙" },
  { id: "s10", letter: "ب", lonely: false, emoji: "🦆" },
  { id: "s11", letter: "ذ", lonely: true, emoji: "🌽" },
  { id: "s12", letter: "ن", lonely: false, emoji: "🐜" },
];

export const wordBuilderChallenges = [
  {
    id: "w1",
    word: "مَدْرَسَة",
    meaning: "school",
    emoji: "🏫",
    hint: "Dal cannot connect to Ra!",
    letters: [
      { char: "م", lonely: false },
      { char: "د", lonely: true },
      { char: "ر", lonely: true },
      { char: "س", lonely: false },
      { char: "ة", lonely: false },
    ],
  },
  {
    id: "w2",
    word: "وَرَق",
    meaning: "paper",
    emoji: "📄",
    hint: "Waw leaves a space before Ra.",
    letters: [
      { char: "و", lonely: true },
      { char: "ر", lonely: true },
      { char: "ق", lonely: false },
    ],
  },
  {
    id: "w3",
    word: "أَزْرَق",
    meaning: "blue",
    emoji: "🔵",
    hint: "Alif and Zay are both special letters!",
    letters: [
      { char: "أ", lonely: true },
      { char: "ز", lonely: true },
      { char: "ر", lonely: true },
      { char: "ق", lonely: false },
    ],
  },
  {
    id: "w4",
    word: "بَاب",
    meaning: "door",
    emoji: "🚪",
    hint: "The Alif breaks the connection!",
    letters: [
      { char: "ب", lonely: false },
      { char: "ا", lonely: true },
      { char: "ب", lonely: false },
    ],
  },
  {
    id: "w5",
    word: "سُوق",
    meaning: "market",
    emoji: "🛍️",
    hint: "Waw cannot connect to the next letter.",
    letters: [
      { char: "س", lonely: false },
      { char: "و", lonely: true },
      { char: "ق", lonely: false },
    ],
  },
  {
    id: "w6",
    word: "ذُرَة",
    meaning: "corn",
    emoji: "🌽",
    hint: "Dhal and Ra are both non-connecting letters.",
    letters: [
      { char: "ذ", lonely: true },
      { char: "ر", lonely: true },
      { char: "ة", lonely: false },
    ],
  },
];

export const connectPairs = [
  { id: "c1", first: "ب", second: "ت", connects: true, wordHint: "بَتَرَ" },
  { id: "c2", first: "م", second: "ن", connects: true, wordHint: "مَنَار" },
  { id: "c3", first: "س", second: "ل", connects: true, wordHint: "سَلَّة" },
  { id: "c4", first: "ف", second: "ق", connects: true, wordHint: "فَقَدَ" },
  { id: "c5", first: "أ", second: "س", connects: false, wordHint: "أَسَد" },
  { id: "c6", first: "ذ", second: "ه", connects: false, wordHint: "ذَهَب" },
  { id: "c7", first: "ز", second: "ي", connects: false, wordHint: "زَيْت" },
  { id: "c8", first: "ز", second: "ه", connects: false, wordHint: "زَهْرَة" },
  { id: "c9", first: "ذ", second: "ب", connects: false, wordHint: "ذَبَحَ" },
  { id: "c10", first: "أ", second: "خ", connects: false, wordHint: "أَخ" },
];
