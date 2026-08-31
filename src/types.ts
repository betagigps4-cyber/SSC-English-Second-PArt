export type BoardName =
  | 'Model Question 1'
  | 'Model Question 2'
  | 'Model Question 3'
  | 'Model Question 4'
  | 'Model Question 5'
  | 'Model Question 6'
  | 'Model Question 7'
  | 'Model Question 8'
  | 'Model Question 9'
  | 'Model Question 10'
  | 'Dhaka Board 2026'
  | 'Barishal Board 2026'
  | 'Cumilla Board 2026'
  | 'Rajshahi Board 2026'
  | 'Chattogram Board 2026'
  | 'Chattragram Board 2026'
  | 'Sylhet Board 2026'
  | 'Dinajpur Board 2026'
  | 'Jashore Board 2026'
  | 'Mymensingh Board 2026'
  | string;

export interface GapFillingExercise {
  id: string;
  board: BoardName;
  title: string;
  clues: string[];
  passageTemplate: string; // contains placeholders like [a], [b]...
  gaps: {
    label: string; // 'a', 'b', ...
    correctAnswer: string;
    acceptableAnswers?: string[];
    explanation?: string;
  }[];
  banglaMeaning?: string;
  banglaTranslation?: string;
}

export interface SubstitutionRow {
  partA: string;
  partB: string;
  partC: string;
  fullSentence: string;
}

export interface SubstitutionExercise {
  id: string;
  board: BoardName;
  title: string;
  columnA: string[];
  columnB: string[];
  columnC: string[];
  validCombinations: SubstitutionRow[];
  explanation: string;
}

export interface RightFormVerbsExercise {
  id: string;
  board: BoardName;
  title: string;
  rootVerbs: string[];
  passageTemplate: string;
  passageBangla?: string;
  sentenceTranslations?: { en: string; bn: string }[];
  gaps: {
    label: string;
    rootVerb: string;
    correctAnswer: string;
    acceptableAnswers?: string[];
    ruleExplanation: string;
  }[];
}

export interface ChangingSentenceItem {
  index: number;
  original: string;
  instruction: string; // e.g. '(Negative)', '(Passive)', '(Complex)'
  modelAnswer: string;
  alternateAnswers?: string[];
  ruleTip: string;
}

export interface ChangingSentencesExercise {
  id: string;
  board: BoardName;
  title: string;
  sentences: ChangingSentenceItem[];
}

export interface TagQuestionItem {
  index: number;
  statement: string;
  modelTag?: string;
  correctTag?: string;
  acceptableTags?: string[];
  acceptableAnswers?: string[];
  explanation?: string;
  ruleTip?: string;
}

export interface TagQuestionsExercise {
  id: string;
  board: BoardName;
  title: string;
  questions: TagQuestionItem[];
}

export interface SuffixPrefixItem {
  label: string;
  rootWord: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  partOfSpeech: string;
  explanation: string;
  ruleExplanation?: string;
}

export interface SuffixPrefixExercise {
  id: string;
  board: BoardName;
  title: string;
  passageTemplate: string;
  banglaMeaning?: string;
  banglaTranslation?: string;
  items: SuffixPrefixItem[];
}

export interface PrepositionItem {
  label: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  collocation?: string;
  banglaMeaning?: string;
  ruleExplanation: string;
}

export interface PrepositionExercise {
  id: string;
  board: BoardName;
  title: string;
  passageTemplate: string;
  banglaTranslation?: string;
  items: PrepositionItem[];
}

export interface ConnectorItem {
  label: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
}

export interface ConnectorsExercise {
  id: string;
  board: BoardName;
  title: string;
  passageTemplate: string;
  banglaTranslation?: string;
  banglaMeaning?: string;
  items: ConnectorItem[];
}

export interface PunctuationExercise {
  id: string;
  board: BoardName;
  title: string;
  unpunctuatedPassage: string;
  correctPassage: string;
  keyPunctuationPoints: string[];
  explanation: string;
  banglaMeaning?: string;
  banglaTranslation?: string;
}

export interface WritingItemData {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'paragraph' | 'email_letter_application' | 'composition';
  markWeight: number;
  englishContent: string;
  banglaMeaning: string;
  keyPoints: string[];
  vocabularyTips: { word: string; meaningBn: string; partOfSpeech: string }[];
  structureBreakdown?: { section: string; explanationBn: string }[];
}

export interface SscSectionItem {
  id: number;
  itemNumber: number;
  nameEn: string;
  nameBn: string;
  part: 'A' | 'B';
  partName: 'Grammar' | 'Writing';
  marksText: string;
  totalMarks: number;
  iconName: string;
  colorClass: string;
  description: string;
  boardTag?: string;
  boardSubtitle?: string;
}

export interface WordDerivative {
  form: string;
  partOfSpeech: string;
  meaningBn?: string;
}

export interface WordLookupResult {
  word: string;
  phonetic: string;
  syllables?: string;
  partOfSpeech: string;
  meaningBn: string;
  meaningEn: string;
  sscContext: string;
  exampleSentence: string;
  exampleSentenceBn: string;
  derivatives?: WordDerivative[];
  synonyms: string[];
  antonyms: string[];
  collocations?: string[];
  relatedSscItems?: string[];
}

export interface SavedExerciseBookmark {
  id: string; // unique ID e.g. "item-1-model-1" or "item-10-para-model-1"
  itemId: number; // 1 to 12
  itemNumber: number; // 1 to 12
  itemTitle: string; // e.g. "Gap Filling with Clues", "Prepositions", "Paragraph Writing"
  subTitle: string; // e.g. "Model Question 1: A Winter Morning"
  category: 'grammar' | 'writing';
  boardOrTopic?: string;
  savedAt: string; // ISO string
  notes?: string;
}

