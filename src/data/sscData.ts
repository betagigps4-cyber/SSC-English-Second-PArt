import {
  SscSectionItem,
  GapFillingExercise,
  SubstitutionExercise,
  RightFormVerbsExercise,
  ChangingSentencesExercise,
  TagQuestionsExercise,
  SuffixPrefixExercise,
  PrepositionExercise,
  ConnectorsExercise,
  PunctuationExercise,
  WritingItemData,
} from '../types';

import { GAP_FILLING_MODEL_QUESTIONS } from './item1_gapFilling';
import { SUBSTITUTION_TABLE_MODEL_QUESTIONS } from './item2_substitutionTable';
import { RIGHT_FORM_VERBS_MODEL_QUESTIONS } from './item3_rightFormVerbs';
import { CHANGING_SENTENCES_MODEL_QUESTIONS } from './item4_changingSentences';
import { TAG_QUESTIONS_MODEL_QUESTIONS } from './item5_tagQuestions';
import { SUFFIX_PREFIX_MODEL_QUESTIONS } from './item6_suffixPrefix';
import { PREPOSITION_MODEL_QUESTIONS } from './item7_prepositions';
import { CONNECTORS_MODEL_QUESTIONS } from './item8_connectors';
import { PUNCTUATION_MODEL_QUESTIONS } from './item9_punctuation';
import { PARAGRAPHS_MODEL_QUESTIONS } from './item10_paragraphs';
import { LETTERS_EMAILS_MODEL_QUESTIONS } from './item11_lettersEmails';
import { COMPOSITIONS_MODEL_QUESTIONS } from './item12_compositions';

export const SSC_SECTIONS: SscSectionItem[] = [
  // Part A - Grammar
  {
    id: 1,
    itemNumber: 1,
    nameEn: 'Gap filling with clues',
    nameBn: 'ক্লু সহ শূন্যস্থান পূরণ',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x10 = 10',
    totalMarks: 10,
    iconName: 'Sparkles',
    colorClass: 'from-blue-600 to-indigo-600',
    description: 'Fill in the blanks with suitable words from the clue box with necessary grammatical changes.',
  },
  {
    id: 2,
    itemNumber: 2,
    nameEn: 'Substitution table',
    nameBn: 'প্রতিস্থাপন সারণী',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x5 = 05',
    totalMarks: 5,
    iconName: 'Columns3',
    colorClass: 'from-emerald-600 to-teal-600',
    description: 'Match Part A, Part B, and Part C from the table to make five meaningful sentences.',
  },
  {
    id: 3,
    itemNumber: 3,
    nameEn: 'Right form of Verbs',
    nameBn: 'ক্রিয়ার সঠিক রূপ',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x10 = 10',
    totalMarks: 10,
    iconName: 'CheckCircle2',
    colorClass: 'from-amber-600 to-orange-600',
    description: 'Complete the passage with correct grammatical forms of the given root verbs.',
  },
  {
    id: 4,
    itemNumber: 4,
    nameEn: 'Changing sentences',
    nameBn: 'বাক্য রূপান্তর',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x10 = 10',
    totalMarks: 10,
    iconName: 'ArrowLeftRight',
    colorClass: 'from-purple-600 to-pink-600',
    description: 'Transform sentences into Affirmative, Negative, Interrogative, Passive, Simple, Complex, Compound etc.',
  },
  {
    id: 5,
    itemNumber: 5,
    nameEn: 'Tag questions',
    nameBn: 'ট্যাগ প্রশ্ন',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x5 = 05',
    totalMarks: 5,
    iconName: 'HelpCircle',
    colorClass: 'from-cyan-600 to-blue-600',
    description: 'Add suitable tag questions to the statements according to grammatical rules.',
  },
  {
    id: 6,
    itemNumber: 6,
    nameEn: 'Suffixes and Prefixes',
    nameBn: 'উপসর্গ ও প্রত্যয়',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x5 = 05',
    totalMarks: 5,
    iconName: 'Type',
    colorClass: 'from-rose-600 to-red-600',
    description: 'Add appropriate suffixes or prefixes to the root words in parentheses to complete the text.',
  },
  {
    id: 7,
    itemNumber: 7,
    nameEn: 'Preposition',
    nameBn: 'পদান্বয়ী অব্যয়',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x5 = 05',
    totalMarks: 5,
    iconName: 'Navigation',
    colorClass: 'from-indigo-600 to-violet-600',
    description: 'Fill in the blanks with suitable prepositions to make the passage coherent.',
  },
  {
    id: 8,
    itemNumber: 8,
    nameEn: 'Connectors/ Linking words',
    nameBn: 'সংযোগকারী শব্দ',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '1x5 = 05',
    totalMarks: 5,
    iconName: 'Link',
    colorClass: 'from-teal-600 to-emerald-700',
    description: 'Use appropriate sentence connectors or linking words to connect sentences logically.',
  },
  {
    id: 9,
    itemNumber: 9,
    nameEn: 'Punctuation and Capitalization',
    nameBn: 'বিরামচিহ্ন ও ক্যাপিটালাইজেশন',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'A',
    partName: 'Grammar',
    marksText: '05',
    totalMarks: 5,
    iconName: 'Quote',
    colorClass: 'from-fuchsia-600 to-purple-700',
    description: 'Rewrite the unpunctuated passage using necessary punctuation marks and capital letters.',
  },

  // Part B - Writing
  {
    id: 10,
    itemNumber: 10,
    nameEn: 'Writing paragraph',
    nameBn: 'অনুচ্ছেদ লিখন',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'B',
    partName: 'Writing',
    marksText: '10',
    totalMarks: 10,
    iconName: 'FileText',
    colorClass: 'from-emerald-700 to-green-600',
    description: 'Standard SSC Paragraphs with line-by-line Bangla meaning, key points, and vocabulary tips.',
  },
  {
    id: 11,
    itemNumber: 11,
    nameEn: 'Writing- E-mail/letter/application',
    nameBn: 'ই-মেইল / চিঠি / আবেদনপত্র',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'B',
    partName: 'Writing',
    marksText: '10',
    totalMarks: 10,
    iconName: 'Mail',
    colorClass: 'from-sky-700 to-blue-600',
    description: 'Formal applications, personal letters, and emails with structural guides, pronunciation speech, and translation.',
  },
  {
    id: 12,
    itemNumber: 12,
    nameEn: 'Writing short composition',
    nameBn: 'সংক্ষিপ্ত প্রবন্ধ লিখন',
    boardTag: 'Rajshahi Board 2026',
    boardSubtitle: 'Rajshahi Board 2026 (রাজশাহী বোর্ড ২০২৬)',
    part: 'B',
    partName: 'Writing',
    marksText: '12',
    totalMarks: 12,
    iconName: 'BookOpen',
    colorClass: 'from-amber-700 to-yellow-600',
    description: 'Comprehensive high-scoring essay compositions with outlined headings, bilingual translation, and voice read-along.',
  },
];

// --- Item 1 Data: Gap filling with clues (10 Model Questions) ---
export const GAP_FILLING_DATA: GapFillingExercise[] = GAP_FILLING_MODEL_QUESTIONS;

// --- Item 2 Data: Substitution Table (40 Model Questions) ---
export const SUBSTITUTION_TABLE_DATA: SubstitutionExercise[] = SUBSTITUTION_TABLE_MODEL_QUESTIONS;

// --- Item 3 Data: Right Form of Verbs (10 Model Questions) ---
export const RIGHT_FORM_VERBS_DATA: RightFormVerbsExercise[] = RIGHT_FORM_VERBS_MODEL_QUESTIONS;

// --- Item 4 Data: Changing Sentences (40 Model Practice Sets) ---
export const CHANGING_SENTENCES_DATA: ChangingSentencesExercise[] = CHANGING_SENTENCES_MODEL_QUESTIONS;

// --- Item 5 Data: Tag Questions (40 Model Questions) ---
export const TAG_QUESTIONS_DATA: TagQuestionsExercise[] = TAG_QUESTIONS_MODEL_QUESTIONS;

// --- Item 6 Data: Suffixes and Prefixes (10 Model Questions) ---
export const SUFFIX_PREFIX_DATA: SuffixPrefixExercise[] = SUFFIX_PREFIX_MODEL_QUESTIONS;

// --- Item 7 Data: Preposition (10 Model Questions) ---
export const PREPOSITION_DATA: PrepositionExercise[] = PREPOSITION_MODEL_QUESTIONS;

// --- Item 8 Data: Connectors / Linking Words (10 Model Questions) ---
export const CONNECTORS_DATA: ConnectorsExercise[] = CONNECTORS_MODEL_QUESTIONS;

// --- Item 9 Data: Punctuation and Capitalization (10 Model Questions) ---
export const PUNCTUATION_DATA: PunctuationExercise[] = PUNCTUATION_MODEL_QUESTIONS;

// --- Item 10 Data: Paragraphs (10 Model Questions) ---
export const PARAGRAPHS_DATA: WritingItemData[] = PARAGRAPHS_MODEL_QUESTIONS;

// --- Item 11 Data: Emails, Letters, Applications (10 Model Questions) ---
export const EMAILS_LETTERS_APPLICATIONS_DATA: WritingItemData[] = LETTERS_EMAILS_MODEL_QUESTIONS;

// --- Item 12 Data: Compositions (10 Model Questions) ---
export const COMPOSITIONS_DATA: WritingItemData[] = COMPOSITIONS_MODEL_QUESTIONS;
