import { TagQuestionsExercise } from '../types';
import { TAG_QUESTIONS_SETS_21_TO_40 } from './item5_sets_21_to_40';

const TAG_QUESTIONS_SETS_1_TO_20: TagQuestionsExercise[] = [
  {
    id: 'tag-model-1',
    board: 'Model Question 1',
    title: 'Model Question 1 - Core Rules, Imperatives, and Pronouns',
    questions: [
      {
        index: 1,
        statement: "Let's arrange a study tour to Sundarbans,",
        modelTag: "shall we?",
        acceptableTags: ["shall we?"],
        explanation: 'Imperative proposals starting with "Let\'s" or "Let us" (inclusive) always take the tag "shall we?".',
      },
      {
        index: 2,
        statement: 'Nobody believed his false excuse,',
        modelTag: 'did they?',
        acceptableTags: ['did they?'],
        explanation: 'Indefinite negative pronouns (Nobody, None, No one) take the plural pronoun "they". The statement is negative in the past simple, so the tag is affirmative "did they?".',
      },
      {
        index: 3,
        statement: 'He rarely visits his village home,',
        modelTag: 'does he?',
        acceptableTags: ['does he?'],
        explanation: 'Negative adverbs like "rarely", "seldom", "hardly", "barely" make the statement semantically negative. Hence, the tag is affirmative "does he?".',
      },
      {
        index: 4,
        statement: 'The mother rose in her at the sight of the orphan,',
        modelTag: "didn't it?",
        acceptableTags: ["didn't it?", "did not it?"],
        explanation: '"The mother" here refers to maternal feeling (abstract noun), which takes pronoun "it". Past tense "rose" requires "didn\'t it?".',
      },
      {
        index: 5,
        statement: 'I am a candidate for the SSC examination,',
        modelTag: "aren't I?",
        acceptableTags: ["aren't I?", "ain't I?"],
        explanation: 'Affirmative "I am" takes the standard negative tag "aren\'t I?".',
      },
    ],
  },
  {
    id: 'tag-model-2',
    board: 'Model Question 2',
    title: 'Model Question 2 - Everyday Conversations & Exceptions',
    questions: [
      {
        index: 1,
        statement: 'Everybody likes to be praised,',
        modelTag: "don't they?",
        acceptableTags: ["don't they?"],
        explanation: 'Indefinite pronouns (Everybody, Everyone) take the plural pronoun "they". Plural present verb requires "don\'t they?".',
      },
      {
        index: 2,
        statement: 'Don\'t make a noise in the reading room,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', 'won\'t you?'],
        explanation: 'Negative imperative sentences (Don\'t + V1) always take the tag "will you?".',
      },
      {
        index: 3,
        statement: 'Neither of the boys was present in the class,',
        modelTag: 'were they?',
        acceptableTags: ['were they?'],
        explanation: '"Neither of them" takes plural pronoun "they" in tag questions, so past verb becomes plural "were they?".',
      },
      {
        index: 4,
        statement: 'There is a little water in the jar,',
        modelTag: "isn't there?",
        acceptableTags: ["isn't there?"],
        explanation: '"A little" has a positive meaning (some water exists), so the tag is negative "isn\'t there?". (Contrast with "little" which is negative).',
      },
      {
        index: 5,
        statement: 'Let him do the task alone,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', 'won\'t you?'],
        explanation: '"Let him/her/them" expresses permission/request, so the tag is "will you?".',
      },
    ],
  },
  {
    id: 'tag-model-3',
    board: 'Model Question 3',
    title: 'Model Question 3 - Environmental and Academic Themes',
    questions: [
      {
        index: 1,
        statement: 'Trees are our best friends,',
        modelTag: "aren't they?",
        acceptableTags: ["aren't they?"],
        explanation: 'Plural subject "Trees" takes pronoun "they" with negative tag "aren\'t they?".',
      },
      {
        index: 2,
        statement: 'We must not cut down trees indiscriminately,',
        modelTag: 'must we?',
        acceptableTags: ['must we?'],
        explanation: 'Negative modal auxiliary "must not" takes affirmative tag "must we?".',
      },
      {
        index: 3,
        statement: 'Barking dogs seldom bite,',
        modelTag: 'do they?',
        acceptableTags: ['do they?'],
        explanation: '"Seldom" is a negative adverb, and "barking dogs" is plural, taking affirmative tag "do they?".',
      },
      {
        index: 4,
        statement: 'Everything looked beautiful on that moonlit night,',
        modelTag: "didn't it?",
        acceptableTags: ["didn't it?"],
        explanation: 'Indefinite pronoun "Everything" takes singular pronoun "it". Past tense "looked" requires "didn\'t it?".',
      },
      {
        index: 5,
        statement: 'Have a cup of tea,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', "won't you?"],
        explanation: 'Imperative offering / invitation takes "will you?" or "won\'t you?".',
      },
    ],
  },
  {
    id: 'tag-model-4',
    board: 'Model Question 4',
    title: 'Model Question 4 - Science, Technology, and Modals',
    questions: [
      {
        index: 1,
        statement: 'The computer has revolutionized our life,',
        modelTag: "hasn't it?",
        acceptableTags: ["hasn't it?"],
        explanation: 'Singular subject "The computer" takes pronoun "it" with auxiliary "hasn\'t it?".',
      },
      {
        index: 2,
        statement: 'Few students knew the answer to this difficult question,',
        modelTag: 'did they?',
        acceptableTags: ['did they?'],
        explanation: '"Few" without an article expresses a negative idea (almost none). Plural students take "they" with affirmative tag "did they?".',
      },
      {
        index: 3,
        statement: 'You ought to respect your elders,',
        modelTag: "oughtn't you?",
        acceptableTags: ["oughtn't you?", "shouldn't you?"],
        explanation: 'Modal "ought to" takes negative tag "oughtn\'t you?" or "shouldn\'t you?".',
      },
      {
        index: 4,
        statement: 'Nothing is impossible for a determined person,',
        modelTag: 'is it?',
        acceptableTags: ['is it?'],
        explanation: '"Nothing" is semantically negative and takes pronoun "it", so the tag is affirmative "is it?".',
      },
      {
        index: 5,
        statement: 'Let\'s not quarrel over trivial matters,',
        modelTag: 'shall we?',
        acceptableTags: ['shall we?'],
        explanation: 'Any proposal with "Let\'s" (positive or negative) takes "shall we?".',
      },
    ],
  },
  {
    id: 'tag-model-5',
    board: 'Model Question 5',
    title: 'Model Question 5 - Moral Values, Character, and Habits',
    questions: [
      {
        index: 1,
        statement: 'Honesty is the best policy,',
        modelTag: "isn't it?",
        acceptableTags: ["isn't it?"],
        explanation: 'Singular abstract noun "Honesty" takes pronoun "it" with negative tag "isn\'t it?".',
      },
      {
        index: 2,
        statement: 'A liar hardly speaks the truth,',
        modelTag: 'does he?',
        acceptableTags: ['does he?', 'do they?'],
        explanation: '"Hardly" makes the sentence negative. Present verb "speaks" takes affirmative tag "does he?".',
      },
      {
        index: 3,
        statement: 'All of us attended the seminar,',
        modelTag: "didn't we?",
        acceptableTags: ["didn't we?"],
        explanation: '"All of us" takes first-person plural pronoun "we". Past tense takes "didn\'t we?".',
      },
      {
        index: 4,
        statement: 'How sweet the bird sings,',
        modelTag: "doesn't it?",
        acceptableTags: ["doesn't it?"],
        explanation: 'Exclamatory sentence with subject "the bird" and present verb "sings" takes "doesn\'t it?".',
      },
      {
        index: 5,
        statement: 'You used to play cricket in childhood,',
        modelTag: "didn't you?",
        acceptableTags: ["didn't you?", "usedn't you?"],
        explanation: 'Past habit "used to" takes the tag "didn\'t you?" or "usedn\'t you?".',
      },
    ],
  },
  {
    id: 'tag-model-6',
    board: 'Model Question 6',
    title: 'Model Question 6 - Freedom, History, and Patriotism',
    questions: [
      {
        index: 1,
        statement: 'The freedom fighters fought for our motherland,',
        modelTag: "didn't they?",
        acceptableTags: ["didn't they?"],
        explanation: 'Plural subject "The freedom fighters" takes pronoun "they" with past tag "didn\'t they?".',
      },
      {
        index: 2,
        statement: 'None can deny their supreme sacrifice,',
        modelTag: 'can they?',
        acceptableTags: ['can they?'],
        explanation: 'Negative subject "None" takes plural pronoun "they" with affirmative tag "can they?".',
      },
      {
        index: 3,
        statement: 'Let them celebrate the Victory Day,',
        modelTag: 'will you?',
        acceptableTags: ['will you?'],
        explanation: '"Let them" expresses permission/instruction and takes "will you?".',
      },
      {
        index: 4,
        statement: 'We had better leave the place immediately,',
        modelTag: "hadn't we?",
        acceptableTags: ["hadn't we?"],
        explanation: 'Idiomatic expression "had better" takes the tag "hadn\'t we?".',
      },
      {
        index: 5,
        statement: 'There were many brave souls in 1971,',
        modelTag: "weren't there?",
        acceptableTags: ["weren't there?"],
        explanation: 'Introductory "There were" takes the negative tag "weren\'t there?".',
      },
    ],
  },
  {
    id: 'tag-model-7',
    board: 'Model Question 7',
    title: 'Model Question 7 - Health, Food Habits, and Daily Routine',
    questions: [
      {
        index: 1,
        statement: 'Eating vegetables is good for health,',
        modelTag: "isn't it?",
        acceptableTags: ["isn't it?"],
        explanation: 'Gerund phrase "Eating vegetables" acts as a singular subject and takes pronoun "it" with "isn\'t it?".',
      },
      {
        index: 2,
        statement: 'Fast food contains little nutrition,',
        modelTag: 'does it?',
        acceptableTags: ['does it?'],
        explanation: '"Little" expresses a negative quantity (almost no nutrition). Hence, the tag is affirmative "does it?".',
      },
      {
        index: 3,
        statement: 'Take regular physical exercise,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', "won't you?"],
        explanation: 'Affirmative imperative command/advice takes "will you?" or "won\'t you?".',
      },
      {
        index: 4,
        statement: 'Neither of the girls was sick,',
        modelTag: 'were they?',
        acceptableTags: ['were they?'],
        explanation: '"Neither of the girls" takes plural pronoun "they", so past verb becomes plural "were they?".',
      },
      {
        index: 5,
        statement: 'We need not worry about the outcome,',
        modelTag: 'need we?',
        acceptableTags: ['need we?'],
        explanation: 'Modal auxiliary "need not" takes affirmative tag "need we?".',
      },
    ],
  },
  {
    id: 'tag-model-8',
    board: 'Model Question 8',
    title: 'Model Question 8 - Time, Punctuality, and Success',
    questions: [
      {
        index: 1,
        statement: 'Time and tide wait for no man,',
        modelTag: 'do they?',
        acceptableTags: ['do they?'],
        explanation: '"Time and tide" is a plural subject and "no man" makes it negative, taking affirmative tag "do they?".',
      },
      {
        index: 2,
        statement: 'Someone left the umbrella in the hallway,',
        modelTag: "didn't they?",
        acceptableTags: ["didn't they?"],
        explanation: 'Indefinite pronoun "Someone" takes plural pronoun "they" in tag questions. Past tense takes "didn\'t they?".',
      },
      {
        index: 3,
        statement: 'You would rather stay at home today,',
        modelTag: "wouldn't you?",
        acceptableTags: ["wouldn't you?"],
        explanation: '"Would rather" takes negative tag "wouldn\'t you?".',
      },
      {
        index: 4,
        statement: 'The brave deserve our highest admiration,',
        modelTag: "don't they?",
        acceptableTags: ["don't they?"],
        explanation: '"The brave" refers to all brave people (plural class noun) and takes pronoun "they" with "don\'t they?".',
      },
      {
        index: 5,
        statement: 'Let us discuss the matter calmly,',
        modelTag: 'shall we?',
        acceptableTags: ['shall we?'],
        explanation: '"Let us / Let\'s" for mutual proposal takes "shall we?".',
      },
    ],
  },
  {
    id: 'tag-model-9',
    board: 'Model Question 9',
    title: 'Model Question 9 - Illiteracy, Education, and Society',
    questions: [
      {
        index: 1,
        statement: 'Illiteracy hinders national development,',
        modelTag: "doesn't it?",
        acceptableTags: ["doesn't it?"],
        explanation: 'Singular abstract subject "Illiteracy" takes pronoun "it" with "doesn\'t it?".',
      },
      {
        index: 2,
        statement: 'Scarcely had he reached the station when the train left,',
        modelTag: 'had he?',
        acceptableTags: ['had he?'],
        explanation: '"Scarcely" is a negative adverb, requiring an affirmative tag "had he?".',
      },
      {
        index: 3,
        statement: 'None of the students failed the test,',
        modelTag: 'did they?',
        acceptableTags: ['did they?'],
        explanation: '"None of the students" takes plural pronoun "they" with affirmative tag "did they?".',
      },
      {
        index: 4,
        statement: 'I have little knowledge about quantum physics,',
        modelTag: 'have I?',
        acceptableTags: ['have I?', 'do I?'],
        explanation: '"Little" is semantically negative, so the tag is affirmative "have I?" or "do I?".',
      },
      {
        index: 5,
        statement: 'Open the window, please,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', "won't you?"],
        explanation: 'Polite imperative request takes "will you?".',
      },
    ],
  },
  {
    id: 'tag-model-10',
    board: 'Model Question 10',
    title: 'Model Question 10 - Hard Work, Perseverance, and Life',
    questions: [
      {
        index: 1,
        statement: 'Industry brings prosperity,',
        modelTag: "doesn't it?",
        acceptableTags: ["doesn't it?"],
        explanation: 'Singular abstract noun "Industry" takes pronoun "it" with "doesn\'t it?".',
      },
      {
        index: 2,
        statement: 'Nobody can escape destiny,',
        modelTag: 'can they?',
        acceptableTags: ['can they?'],
        explanation: '"Nobody" is negative and takes plural pronoun "they" with affirmative modal "can they?".',
      },
      {
        index: 3,
        statement: 'He had a great car in London,',
        modelTag: "didn't he?",
        acceptableTags: ["didn't he?", "hadn't he?"],
        explanation: '"Had" is the main verb (past simple), so the standard tag is "didn\'t he?".',
      },
      {
        index: 4,
        statement: 'What a splendid victory it was,',
        modelTag: "wasn't it?",
        acceptableTags: ["wasn't it?"],
        explanation: 'Exclamatory sentence with subject "it" and verb "was" takes negative tag "wasn\'t it?".',
      },
      {
        index: 5,
        statement: 'Let\'s never lose hope in adversity,',
        modelTag: 'shall we?',
        acceptableTags: ['shall we?'],
        explanation: 'All proposals starting with "Let\'s" take "shall we?".',
      },
    ],
  },
  {
    id: 'tag-model-11',
    board: 'Model Question 11',
    title: 'Model Question 11 - Tag Question Practice 11',
    questions: [
      {
        index: 1,
        statement: 'Nothing is impossible for a determined mind,',
        modelTag: 'is it?',
        acceptableTags: ['is it?'],
        explanation: 'Indefinite pronoun "Nothing" is negative and takes singular pronoun "it", so the tag is affirmative "is it?".',
      },
      {
        index: 2,
        statement: 'Let them solve their own problem,',
        modelTag: 'will you?',
        acceptableTags: ['will you?'],
        explanation: 'Imperatives starting with "Let him / Let them / Let her" (permission/command) take the tag "will you?".',
      },
      {
        index: 3,
        statement: 'Neither of the boys was present in the class,',
        modelTag: 'were they?',
        acceptableTags: ['were they?', 'was it?'],
        explanation: '"Neither of them/the boys" refers to persons and takes plural pronoun "they" in tag questions, requiring "were they?".',
      },
      {
        index: 4,
        statement: 'You used to play football in your boyhood,',
        modelTag: "didn't you?",
        acceptableTags: ["didn't you?", "usedn't you?"],
        explanation: 'Semi-modal "used to" takes past simple auxiliary tag "didn\'t you?".',
      },
      {
        index: 5,
        statement: 'How sweet the nightingale sings,',
        modelTag: "doesn't it?",
        acceptableTags: ["doesn't it?", "doesn't she?"],
        explanation: 'Exclamatory sentence with 3rd person singular subject and present verb "sings" takes "doesn\'t it?".',
      },
    ],
  },
  {
    id: 'tag-model-12',
    board: 'Model Question 12',
    title: 'Model Question 12 - Tag Question Practice 12',
    questions: [
      {
        index: 1,
        statement: 'Everyone cheered the winning team,',
        modelTag: "didn't they?",
        acceptableTags: ["didn't they?"],
        explanation: 'Indefinite pronoun "Everyone" takes plural pronoun "they". Past simple "cheered" takes "didn\'t they?".',
      },
      {
        index: 2,
        statement: 'He hardly ever tells the truth,',
        modelTag: 'does he?',
        acceptableTags: ['does he?'],
        explanation: 'The negative adverb "hardly ever" makes the sentence negative, requiring the affirmative tag "does he?".',
      },
      {
        index: 3,
        statement: 'Please give me a glass of water,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', 'won\'t you?', 'would you?'],
        explanation: 'Polite affirmative requests / imperatives take "will you?" or "won\'t you?".',
      },
      {
        index: 4,
        statement: 'There is no water left in the pitcher,',
        modelTag: 'is there?',
        acceptableTags: ['is there?'],
        explanation: 'Introductory "There" is used as the subject of the tag question. Negative "no water" requires "is there?".',
      },
      {
        index: 5,
        statement: 'I have scarcely seen such a magnificent spectacle,',
        modelTag: 'have I?',
        acceptableTags: ['have I?'],
        explanation: 'Semi-negative adverb "scarcely" makes the statement negative; with auxiliary "have", the tag is "have I?".',
      },
    ],
  },
  {
    id: 'tag-model-13',
    board: 'Model Question 13',
    title: 'Model Question 13 - Tag Question Practice 13',
    questions: [
      {
        index: 1,
        statement: 'Don\'t make a noise in the examination hall,',
        modelTag: 'will you?',
        acceptableTags: ['will you?'],
        explanation: 'Negative imperatives starting with "Don\'t" always take the affirmative tag "will you?".',
      },
      {
        index: 2,
        statement: 'Somebody called my name from behind,',
        modelTag: "didn't they?",
        acceptableTags: ["didn't they?"],
        explanation: '"Somebody" takes plural tag pronoun "they", and past verb "called" takes "didn\'t they?".',
      },
      {
        index: 3,
        statement: 'The jury gave different verdicts,',
        modelTag: "didn't they?",
        acceptableTags: ["didn't they?"],
        explanation: 'A noun of multitude (divided collective noun) takes plural pronoun "they", so the tag is "didn\'t they?".',
      },
      {
        index: 4,
        statement: 'You need not go to the office today,',
        modelTag: 'need you?',
        acceptableTags: ['need you?'],
        explanation: 'Modal auxiliary "need not" takes affirmative modal tag "need you?".',
      },
      {
        index: 5,
        statement: 'All that glitters is not gold,',
        modelTag: 'is it?',
        acceptableTags: ['is it?'],
        explanation: 'Proverbial subject "All that glitters" refers to a thing/condition (it) and is negative, so the tag is "is it?".',
      },
    ],
  },
  {
    id: 'tag-model-14',
    board: 'Model Question 14',
    title: 'Model Question 14 - Tag Question Practice 14',
    questions: [
      {
        index: 1,
        statement: 'A barking dog seldom bites,',
        modelTag: 'does it?',
        acceptableTags: ['does it?'],
        explanation: 'Negative adverb "seldom" makes the statement negative. Singular animal subject takes "it", giving "does it?".',
      },
      {
        index: 2,
        statement: 'Let us celebrate the national victory day,',
        modelTag: 'shall we?',
        acceptableTags: ['shall we?'],
        explanation: 'Proposal starting with "Let us" (inclusive) takes "shall we?".',
      },
      {
        index: 3,
        statement: 'None of the students failed in the final test,',
        modelTag: 'did they?',
        acceptableTags: ['did they?'],
        explanation: '"None of the students" takes plural pronoun "they" and is negative, so the tag is "did they?".',
      },
      {
        index: 4,
        statement: 'He ought to obey his parents,',
        modelTag: "oughtn't he?",
        acceptableTags: ["oughtn't he?", "shouldn't he?"],
        explanation: 'Modal auxiliary "ought to" takes negative tag "oughtn\'t he?".',
      },
      {
        index: 5,
        statement: 'I am your true well-wisher,',
        modelTag: "aren't I?",
        acceptableTags: ["aren't I?", "ain't I?"],
        explanation: 'Affirmative "I am" takes the tag "aren\'t I?".',
      },
    ],
  },
  {
    id: 'tag-model-15',
    board: 'Model Question 15',
    title: 'Model Question 15 - Tag Question Practice 15',
    questions: [
      {
        index: 1,
        statement: 'The brave deserve our highest admiration,',
        modelTag: "don't they?",
        acceptableTags: ["don't they?"],
        explanation: '"The brave" represents a plural class of people, taking plural pronoun "they" and "don\'t they?".',
      },
      {
        index: 2,
        statement: 'Few passengers survived the plane crash,',
        modelTag: 'did they?',
        acceptableTags: ['did they?'],
        explanation: '"Few" (without "a") expresses a negative meaning, requiring the affirmative tag "did they?".',
      },
      {
        index: 3,
        statement: 'Have a cup of tea with us,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', 'won\'t you?'],
        explanation: 'Imperative invitations take "will you?" or "won\'t you?".',
      },
      {
        index: 4,
        statement: 'The beast in him made him commit the crime,',
        modelTag: "didn't it?",
        acceptableTags: ["didn't it?"],
        explanation: '"The beast" denotes bestial nature (abstract noun), taking pronoun "it" with past auxiliary "didn\'t it?".',
      },
      {
        index: 5,
        statement: 'Neither of them came to the wedding ceremony,',
        modelTag: 'did they?',
        acceptableTags: ['did they?'],
        explanation: '"Neither of them" is negative and refers to people, taking "did they?".',
      },
    ],
  },
  {
    id: 'tag-model-16',
    board: 'Model Question 16',
    title: 'Model Question 16 - Tag Question Practice 16',
    questions: [
      {
        index: 1,
        statement: 'Every mother loves her newborn child,',
        modelTag: "don't they?",
        acceptableTags: ["don't they?"],
        explanation: '"Every mother" takes plural pronoun "they" in tag questions, giving "don\'t they?".',
      },
      {
        index: 2,
        statement: 'Let her sing a patriotic song,',
        modelTag: 'will you?',
        acceptableTags: ['will you?'],
        explanation: 'Imperative with "Let her" takes the tag "will you?".',
      },
      {
        index: 3,
        statement: 'There were many visitors at the book fair,',
        modelTag: "weren't there?",
        acceptableTags: ["weren't there?"],
        explanation: 'Introductory "There" remains the subject of the tag: "weren\'t there?".',
      },
      {
        index: 4,
        statement: 'He has little idea about computer programming,',
        modelTag: 'has he?',
        acceptableTags: ['has he?', 'does he?'],
        explanation: '"Little" without "a" has a negative sense, requiring affirmative tag "has he?" or "does he?".',
      },
      {
        index: 5,
        statement: 'How courageous the freedom fighters were,',
        modelTag: "weren't they?",
        acceptableTags: ["weren't they?"],
        explanation: 'Exclamatory sentence with plural subject "freedom fighters" takes "weren\'t they?".',
      },
    ],
  },
  {
    id: 'tag-model-17',
    board: 'Model Question 17',
    title: 'Model Question 17 - Tag Question Practice 17',
    questions: [
      {
        index: 1,
        statement: 'Nobody can deny the universal law of nature,',
        modelTag: 'can they?',
        acceptableTags: ['can they?'],
        explanation: '"Nobody" is negative and takes plural pronoun "they", requiring "can they?".',
      },
      {
        index: 2,
        statement: 'You \'d better consult an expert physician,',
        modelTag: "hadn't you?",
        acceptableTags: ["hadn't you?"],
        explanation: '"\'d better" stands for "had better", taking the tag "hadn\'t you?".',
      },
      {
        index: 3,
        statement: 'The moon shines brightly at night,',
        modelTag: "doesn't it?",
        acceptableTags: ["doesn't it?", "doesn't she?"],
        explanation: 'Singular subject "The moon" takes pronoun "it" and present auxiliary "doesn\'t it?".',
      },
      {
        index: 4,
        statement: 'Let\'s plant more trees for our future generation,',
        modelTag: 'shall we?',
        acceptableTags: ['shall we?'],
        explanation: 'Proposal starting with "Let\'s" takes "shall we?".',
      },
      {
        index: 5,
        statement: 'She barely managed to pass the examination,',
        modelTag: 'did she?',
        acceptableTags: ['did she?'],
        explanation: 'Negative adverb "barely" makes the sentence negative, taking affirmative past tag "did she?".',
      },
    ],
  },
  {
    id: 'tag-model-18',
    board: 'Model Question 18',
    title: 'Model Question 18 - Tag Question Practice 18',
    questions: [
      {
        index: 1,
        statement: 'Nothing remains permanent in this world,',
        modelTag: 'does it?',
        acceptableTags: ['does it?'],
        explanation: '"Nothing" is negative and takes singular pronoun "it", giving affirmative tag "does it?".',
      },
      {
        index: 2,
        statement: 'You \'d rather starve than beg,',
        modelTag: "wouldn't you?",
        acceptableTags: ["wouldn't you?"],
        explanation: '"\'d rather" stands for "would rather", taking the tag "wouldn\'t you?".',
      },
      {
        index: 3,
        statement: 'Open the window to let fresh air in,',
        modelTag: 'will you?',
        acceptableTags: ['will you?', 'won\'t you?'],
        explanation: 'Affirmative imperative command/request takes "will you?".',
      },
      {
        index: 4,
        statement: 'The poor lead a very miserable existence,',
        modelTag: "don't they?",
        acceptableTags: ["don't they?"],
        explanation: '"The poor" is a plural noun of class, taking pronoun "they" and "don\'t they?".',
      },
      {
        index: 5,
        statement: 'He had to sell his paternal property,',
        modelTag: "didn't he?",
        acceptableTags: ["didn't he?"],
        explanation: '"Had to" is past tense of obligation, taking past auxiliary "didn\'t he?".',
      },
    ],
  },
  {
    id: 'tag-model-19',
    board: 'Model Question 19',
    title: 'Model Question 19 - Tag Question Practice 19',
    questions: [
      {
        index: 1,
        statement: 'Anyone can participate in the debate competition,',
        modelTag: "can't they?",
        acceptableTags: ["can't they?"],
        explanation: 'Indefinite pronoun "Anyone" takes plural pronoun "they" with negative modal tag "can\'t they?".',
      },
      {
        index: 2,
        statement: 'He knows nothing about international politics,',
        modelTag: 'does he?',
        acceptableTags: ['does he?'],
        explanation: 'The word "nothing" makes the sentence negative, requiring affirmative tag "does he?".',
      },
      {
        index: 3,
        statement: 'Let him complete the assignment first,',
        modelTag: 'will you?',
        acceptableTags: ['will you?'],
        explanation: 'Third person imperative "Let him" takes "will you?".',
      },
      {
        index: 4,
        statement: 'The committee has approved the new proposal,',
        modelTag: "hasn't it?",
        acceptableTags: ["hasn't it?"],
        explanation: 'Collective noun acting as a single unit takes singular pronoun "it" with "hasn\'t it?".',
      },
      {
        index: 5,
        statement: 'I am fond of classical music,',
        modelTag: "aren't I?",
        acceptableTags: ["aren't I?", "ain't I?"],
        explanation: 'Affirmative "I am" takes the question tag "aren\'t I?".',
      },
    ],
  },
  {
    id: 'tag-model-20',
    board: 'Model Question 20',
    title: 'Model Question 20 - Tag Question Practice 20',
    questions: [
      {
        index: 1,
        statement: 'Life is not a bed of roses,',
        modelTag: 'is it?',
        acceptableTags: ['is it?'],
        explanation: 'Negative statement with linking verb "is" takes affirmative tag "is it?".',
      },
      {
        index: 2,
        statement: 'Everybody wants to secure a prestigious career,',
        modelTag: "don't they?",
        acceptableTags: ["don't they?"],
        explanation: '"Everybody" takes plural pronoun "they", taking the tag "don\'t they?".',
      },
      {
        index: 3,
        statement: 'Never deceive anyone who trusts you,',
        modelTag: 'will you?',
        acceptableTags: ['will you?'],
        explanation: 'Negative imperative starting with "Never" takes "will you?".',
      },
      {
        index: 4,
        statement: 'What a miraculous rescue operation it was,',
        modelTag: "wasn't it?",
        acceptableTags: ["wasn't it?"],
        explanation: 'Exclamatory sentence with subject "it" and verb "was" takes "wasn\'t it?".',
      },
      {
        index: 5,
        statement: 'Let\'s strive together to build a prosperous Bangladesh,',
        modelTag: 'shall we?',
        acceptableTags: ['shall we?'],
        explanation: 'Proposal starting with "Let\'s" takes the tag "shall we?".',
      },
    ],
  },
];

const CHATTRAGRAM_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-chattragram-2026',
  board: 'Chattragram Board 2026',
  title: 'Chattragram Board 2026 - Importance of Grammar Learning & Practice',
  questions: [
    {
      index: 1,
      statement: 'Most of students who fail in English do not have strong foundation on grammar,',
      modelTag: 'do they?',
      acceptableTags: ['do they?', 'do they'],
      explanation: 'The subject "Most of students who fail in English" takes the plural pronoun "they". The main clause contains the negative verb "do not have", so the tag question must be affirmative: "do they?".',
    },
    {
      index: 2,
      statement: 'They read only to pass the examination,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "don't they", "do not they?"],
      explanation: 'The statement is affirmative in present simple tense with subject "They" and verb "read", requiring the negative tag "don\'t they?".',
    },
    {
      index: 3,
      statement: 'Teachers should motivate them to learn the basic things,',
      modelTag: "shouldn't they?",
      acceptableTags: ["shouldn't they?", "shouldn't they", "should not they?"],
      explanation: 'The subject "Teachers" takes pronoun "they". The affirmative modal verb "should" requires the negative tag "shouldn\'t they?".',
    },
    {
      index: 4,
      statement: 'They cannot help learning grammar,',
      modelTag: 'can they?',
      acceptableTags: ['can they?', 'can they'],
      explanation: 'The statement contains the negative modal expression "cannot help", so the tag question must be affirmative: "can they?".',
    },
    {
      index: 5,
      statement: 'Moreover, practice is essential too,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "isn't it", "is not it?"],
      explanation: 'The subject "practice" is a singular abstract noun taking pronoun "it". The affirmative linking verb "is" requires the negative tag "isn\'t it?".',
    },
  ],
};

const DHAKA_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-dhaka-2026',
  board: 'Dhaka Board 2026',
  title: 'Dhaka Board 2026 - Uncertainty of Life and Doing Good',
  questions: [
    {
      index: 1,
      statement: 'Life is very uncertain on earth,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "isn't it", "is not it?"],
      explanation: 'The statement is affirmative with singular subject "Life" (pronoun "it") and linking verb "is", so the tag question is negative: "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Nobody knows when death comes,',
      modelTag: 'do they?',
      acceptableTags: ['do they?', 'do they'],
      explanation: 'Negative indefinite pronoun "Nobody" takes plural pronoun "they" in the tag question, requiring the positive auxiliary "do they?".',
    },
    {
      index: 3,
      statement: 'But we hardly realize this truth,',
      modelTag: 'do we?',
      acceptableTags: ['do we?', 'do we'],
      explanation: 'The negative adverb "hardly" makes the sentence negative in meaning, requiring an affirmative tag question "do we?".',
    },
    {
      index: 4,
      statement: 'Our deeds and actions show probably we will never depart,',
      modelTag: 'will we?',
      acceptableTags: ['will we?', 'will we', "don't they?", "don't they"],
      explanation: 'The tag focuses on the embedded clause with negative adverb "never" and modal "will" -> "will we?" (or main clause "Our deeds and actions show" -> "don\'t they?").',
    },
    {
      index: 5,
      statement: 'We must do the well being of mankind,',
      modelTag: "mustn't we?",
      acceptableTags: ["mustn't we?", "mustn't we", "must not we?"],
      explanation: 'The statement is affirmative with modal auxiliary "must" and subject "We", taking the negative tag "mustn\'t we?".',
    },
  ],
};

const SYLHET_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-sylhet-2026',
  board: 'Sylhet Board 2026',
  title: 'Sylhet Board 2026 - The Virtue of Patience',
  questions: [
    {
      index: 1,
      statement: 'Patience is one of the greatest qualities in life,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "isn't it", "is not it?"],
      explanation: 'The statement is affirmative with singular abstract noun "Patience" (pronoun "it") and linking verb "is", taking the negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'In every situation one must try to have patience,',
      modelTag: "mustn't one?",
      acceptableTags: ["mustn't one?", "mustn't one", "mustn't they?", "mustn't they", "must not one?"],
      explanation: 'With indefinite subject "one" and modal auxiliary "must", the affirmative statement takes negative tag "mustn\'t one?" or "mustn\'t they?".',
    },
    {
      index: 3,
      statement: 'No one can overcome challenges easily without being patient,',
      modelTag: 'can they?',
      acceptableTags: ['can they?', 'can they'],
      explanation: 'Negative indefinite pronoun "No one" makes the statement negative and takes the tag pronoun "they" with affirmative modal "can": "can they?".',
    },
    {
      index: 4,
      statement: 'It becomes difficult to attain success if one loses patience,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", "doesn't it", "does not it?"],
      explanation: 'Main clause has 3rd-person singular subject "It" and present simple verb "becomes", taking the negative tag "doesn\'t it?".',
    },
    {
      index: 5,
      statement: "So, let's be patient for a better life,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?', 'shall we'],
      explanation: 'Imperative suggestion/proposal starting with "let\'s" takes the question tag "shall we?".',
    },
  ],
};

const DINAJPUR_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-dinajpur-2026',
  board: 'Dinajpur Board 2026',
  title: 'Dinajpur Board 2026 - Development of Bangladesh and National Progress',
  questions: [
    {
      index: 1,
      statement: 'Bangladesh is a developing country like many others in the world,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "isn't it", "isn't she?", "isn't she", "is not it?", "is not she?"],
      explanation: 'Affirmative statement with 3rd person singular subject "Bangladesh" (pronoun "it" or "she") and linking verb "is" takes the negative question tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Everybody wants to get a better country to lead a better life,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "don't they", "do not they?"],
      explanation: 'Indefinite pronoun subject "Everybody" takes the plural pronoun "they". Present Indefinite verb "wants" in affirmative takes negative tag "don\'t they?".',
    },
    {
      index: 3,
      statement: 'The square development of the country will not be an easy task,',
      modelTag: 'will it?',
      acceptableTags: ['will it?', 'will it'],
      explanation: 'Negative modal statement with subject "The square development of the country" (pronoun "it") and auxiliary "will not" takes the affirmative tag "will it?".',
    },
    {
      index: 4,
      statement: "Yes, it is not easy. Let's think, plan and try for her progress,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?', 'shall we'],
      explanation: 'Imperative proposal or suggestion starting with "Let\'s" (Let us) always takes the question tag "shall we?".',
    },
    {
      index: 5,
      statement: 'Those who are self centred can hardly sacrifice themselves for the country,',
      modelTag: 'can they?',
      acceptableTags: ['can they?', 'can they'],
      explanation: 'The semi-negative adverb "hardly" makes the clause negative in meaning. Plural subject "Those who are self centred" takes pronoun "they" with affirmative modal "can", giving "can they?".',
    },
  ],
};

const CUMILLA_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-cumilla-2026',
  board: 'Cumilla Board 2026',
  title: 'Cumilla Board 2026 - Morality, Wealth, and True Values of Life',
  questions: [
    {
      index: 1,
      statement: 'Many people hanker after money,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Plural subject "Many people" takes pronoun "they". Present simple verb "hanker" in affirmative takes negative tag "don\'t they?".',
    },
    {
      index: 2,
      statement: 'But money is not as valuable as morality,',
      modelTag: 'is it?',
      acceptableTags: ['is it?'],
      explanation: 'Singular uncountable subject "money" takes pronoun "it". Negative verb "is not" requires affirmative tag "is it?".',
    },
    {
      index: 3,
      statement: 'Let us always keep this truth in mind,',
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposals starting with "Let us" or "Let\'s" take the fixed tag "shall we?".',
    },
    {
      index: 4,
      statement: 'Money can hardly bring happiness,',
      modelTag: 'can it?',
      acceptableTags: ['can it?'],
      explanation: 'Semi-negative adverb "hardly" makes the sentence negative in sense, requiring affirmative tag "can it?".',
    },
    {
      index: 5,
      statement: 'So, we should never have greed for money,',
      modelTag: 'should we?',
      acceptableTags: ['should we?'],
      explanation: 'Negative adverb "never" makes the statement negative; with modal "should" and subject "we", the tag is "should we?".',
    },
  ],
};

const BARISHAL_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-barishal-2026',
  board: 'Barishal Board 2026',
  title: 'Barishal Board 2026 - Planning, Good Manners and Maternal Affection',
  questions: [
    {
      index: 1,
      statement: 'Great people could do nothing without a plan of action,',
      modelTag: 'could they?',
      acceptableTags: ['could they?'],
      explanation: 'Negative word "nothing" makes the sentence negative; with plural subject "Great people" (they) and modal "could", the tag is "could they?".',
    },
    {
      index: 2,
      statement: 'You need to see a doctor,',
      modelTag: "don't you?",
      acceptableTags: ["don't you?", "needn't you?", "do not you?"],
      explanation: 'Here "need" is used as a main verb (need + to see), so the present simple auxiliary gives "don\'t you?".',
    },
    {
      index: 3,
      statement: "Let's have a walk outside the farm,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Proposals or suggestions with "Let\'s" take the standard tag "shall we?".',
    },
    {
      index: 4,
      statement: 'A mother is like a gentle breeze,',
      modelTag: "isn't she?",
      acceptableTags: ["isn't she?", "is not she?"],
      explanation: 'Singular feminine subject "A mother" takes pronoun "she". Affirmative "is" takes negative tag "isn\'t she?".',
    },
    {
      index: 5,
      statement: 'The young hardly practise good manners,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Plural subject "The young" (the young generation / young people) takes pronoun "they". Semi-negative "hardly" requires affirmative tag "do they?".',
    },
  ],
};

const RAJSHAHI_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-rajshahi-2026',
  board: 'Rajshahi Board 2026',
  title: 'Rajshahi Board 2026 - The Enchanting Splendor of a Moonlit Night',
  questions: [
    {
      index: 1,
      statement: 'The beauty of a moonlit night is wonderful,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", 'is not it?'],
      explanation: 'Subject "The beauty of a moonlit night" is singular non-human abstract noun ("it"). Affirmative linking verb "is" requires negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'It charms us all,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", 'does not it?'],
      explanation: 'Subject "It" with affirmative 3rd person singular present verb "charms" takes negative tag "doesn\'t it?".',
    },
    {
      index: 3,
      statement: 'How beautiful the moonlit night is,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", 'is not it?'],
      explanation: 'Exclamatory sentence with affirmative predicate "the moonlit night is" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'Nobody feels bored in a moonlit night,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Negative indefinite pronoun "Nobody" requires affirmative tag and takes pronoun "they", shifting singular verb to plural auxiliary: "do they?".',
    },
    {
      index: 5,
      statement: 'Even little insects fly here and there,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", 'do not they?'],
      explanation: 'Plural subject "little insects" takes pronoun "they". Affirmative present simple verb "fly" requires negative tag "don\'t they?".',
    },
  ],
};

const MYMENSINGH_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-mymensingh-2026',
  board: 'Mymensingh Board 2026',
  title: 'Mymensingh Board 2026 - Inevitability of Death, Duty & Permissions',
  questions: [
    {
      index: 1,
      statement: 'None can avoid death,',
      modelTag: 'can they?',
      acceptableTags: ['can they?'],
      explanation: 'Negative indefinite pronoun "None" makes the statement negative and takes tag pronoun "they". Modal "can" takes affirmative tag "can they?".',
    },
    {
      index: 2,
      statement: 'We ought to love our country,',
      modelTag: "oughtn't we?",
      acceptableTags: ["oughtn't we?", "shouldn't we?"],
      explanation: 'Modal auxiliary "ought to" in affirmative statement takes negative tag "oughtn\'t we?" (or "shouldn\'t we?").',
    },
    {
      index: 3,
      statement: 'Let him play cricket,',
      modelTag: 'will you?',
      acceptableTags: ['will you?', "won't you?"],
      explanation: 'Imperative sentence with "Let him / her / them" granting permission takes the tag "will you?".',
    },
    {
      index: 4,
      statement: 'It scarcely rains in the summer,',
      modelTag: 'does it?',
      acceptableTags: ['does it?'],
      explanation: 'Semi-negative adverb "scarcely" makes the statement negative. Present Indefinite singular takes affirmative tag "does it?".',
    },
    {
      index: 5,
      statement: 'Sumon as well as his friends was present,',
      modelTag: "wasn't he?",
      acceptableTags: ["wasn't he?", "was not he?"],
      explanation: 'When subjects are connected by "as well as", the verb and pronoun agree with the first subject ("Sumon" -> singular "he"). Affirmative past "was" takes negative tag "wasn\'t he?".',
    },
  ],
};

const JESSORE_BOARD_2026: TagQuestionsExercise = {
  id: 'tag-jessore-2026',
  board: 'Jessore Board 2026',
  title: 'Jessore Board 2026 - War and Suffering of Humanity',
  questions: [
    {
      index: 1,
      statement: 'War is a man made disaster,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular subject "War" takes pronoun "it". Affirmative statement with verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Everybody suffers from it,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". With plural pronoun "they" in Present Indefinite affirmative, the tag becomes "don\'t they?".',
    },
    {
      index: 3,
      statement: 'Women and children are the worst sufferers,',
      modelTag: "aren't they?",
      acceptableTags: ["aren't they?", "are not they?"],
      explanation: 'Compound plural subject "Women and children" takes pronoun "they". Affirmative "are" takes negative tag "aren\'t they?".',
    },
    {
      index: 4,
      statement: 'None can escape from the bombings of the enemy,',
      modelTag: 'can they?',
      acceptableTags: ['can they?'],
      explanation: 'Negative subject pronoun "None" takes tag pronoun "they" and makes the sentence negative. With modal "can", the tag is affirmative "can they?".',
    },
    {
      index: 5,
      statement: "Let's raise our voice against war,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Proposals or suggestions starting with "Let\'s" (Let us) always take the tag "shall we?".',
    },
  ],
};

// ==========================================
// SSC BOARD QUESTIONS 2025 (ALL 9 BOARDS)
// ==========================================

const DHAKA_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-dhaka-2025',
  board: 'Dhaka Board 2025',
  title: 'Dhaka Board 2025 - Striving for a Better Life and Hard Realities',
  questions: [
    {
      index: 1,
      statement: 'Everybody wants to have a better life,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes the tag pronoun "they". With the affirmative Present Indefinite verb "wants", the tag becomes negative "don\'t they?".',
    },
    {
      index: 2,
      statement: 'A better life seldom comes without hard work,',
      modelTag: 'does it?',
      acceptableTags: ['does it?'],
      explanation: 'The semi-negative adverb "seldom" makes the statement negative. The subject "A better life" takes pronoun "it", so the affirmative tag in Present Indefinite is "does it?".',
    },
    {
      index: 3,
      statement: 'We have to work for this,',
      modelTag: "don't we?",
      acceptableTags: ["don't we?", "haven't we?", "do not we?"],
      explanation: 'Semi-modal "have to" takes the do-operator auxiliary in Present Indefinite. With affirmative "have to work", the tag is "don\'t we?".',
    },
    {
      index: 4,
      statement: 'But most of us can hardly do the job,',
      modelTag: 'can we?',
      acceptableTags: ['can we?'],
      explanation: 'Negative adverb "hardly" makes the clause negative. Subject "most of us" takes pronoun "we", and modal "can" takes the affirmative tag "can we?".',
    },
    {
      index: 5,
      statement: "Actually, life isn't a bed of roses,",
      modelTag: 'is it?',
      acceptableTags: ['is it?'],
      explanation: 'The negative auxiliary "isn\'t" with singular subject "life" (pronoun "it") takes the affirmative tag "is it?".',
    },
  ],
};

const RAJSHAHI_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-rajshahi-2025',
  board: 'Rajshahi Board 2025',
  title: 'Rajshahi Board 2025 - The Cheat, Truthfulness & Morality',
  questions: [
    {
      index: 1,
      statement: 'Nobody believes a cheat,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Negative indefinite pronoun "Nobody" takes tag pronoun "they" and renders the statement negative. In Present Indefinite, the tag is affirmative "do they?".',
    },
    {
      index: 2,
      statement: 'Everybody hates him,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". In Present Indefinite affirmative, the tag is negative "don\'t they?".',
    },
    {
      index: 3,
      statement: 'He has to drag a miserable life,',
      modelTag: "doesn't he?",
      acceptableTags: ["doesn't he?", "hasn't he?", "does not he?"],
      explanation: 'Semi-modal "has to" with 3rd person singular subject "He" in Present Indefinite takes the negative tag "doesn\'t he?".',
    },
    {
      index: 4,
      statement: 'He can hardly succeed in life,',
      modelTag: 'can he?',
      acceptableTags: ['can he?'],
      explanation: 'Negative adverb "hardly" makes the statement negative. Modal auxiliary "can" with subject "he" takes the affirmative tag "can he?".',
    },
    {
      index: 5,
      statement: 'Let us always speak the truth,',
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposals or suggestions beginning with "Let us" or "Let\'s" always take the tag "shall we?".',
    },
  ],
};

const CUMILLA_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-cumilla-2025',
  board: 'Cumilla Board 2025',
  title: 'Cumilla Board 2025 - Affectionate English Teacher and Dedicated Students',
  questions: [
    {
      index: 1,
      statement: 'Our new English teacher is very affectionate,',
      modelTag: "isn't she?",
      acceptableTags: ["isn't she?", "isn't he?", "is not she?", "is not he?"],
      explanation: 'Affirmative statement with linking verb "is". As subsequent sentences use feminine pronoun "She", the tag is "isn\'t she?" (or "isn\'t he?").',
    },
    {
      index: 2,
      statement: 'She has joined recently,',
      modelTag: "hasn't she?",
      acceptableTags: ["hasn't she?", "has not she?"],
      explanation: 'Present Perfect tense affirmative statement with auxiliary "has" and subject "She" takes the negative tag "hasn\'t she?".',
    },
    {
      index: 3,
      statement: 'She never scolds her students,',
      modelTag: 'does she?',
      acceptableTags: ['does she?'],
      explanation: 'Negative adverb "never" makes the statement negative. Present Indefinite 3rd person singular takes affirmative tag "does she?".',
    },
    {
      index: 4,
      statement: 'Each of her students loves her,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "doesn't he?", "do not they?"],
      explanation: 'Subject "Each of her students" refers to a group of individuals and takes the tag pronoun "they" with plural auxiliary "don\'t they?".',
    },
    {
      index: 5,
      statement: 'None of her students dislikes her,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Negative phrase "None of her students" makes the statement negative and takes tag pronoun "they". In Present Indefinite, the tag is affirmative "do they?".',
    },
  ],
};

const JASHORE_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-jashore-2025',
  board: 'Jashore Board 2025',
  title: 'Jashore Board 2025 - Speaking the Truth vs Deceit of a Liar',
  questions: [
    {
      index: 1,
      statement: 'Nobody trusts a liar,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Negative indefinite pronoun "Nobody" takes pronoun "they" and makes the statement negative. The tag is affirmative "do they?".',
    },
    {
      index: 2,
      statement: 'A liar has to lead a miserable life,',
      modelTag: "doesn't he?",
      acceptableTags: ["doesn't he?", "hasn't he?", "does not he?"],
      explanation: 'Semi-modal "has to" with singular subject "A liar" (he) takes the negative tag "doesn\'t he?".',
    },
    {
      index: 3,
      statement: 'Speaking the truth is a good exercise,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Gerund phrase "Speaking the truth" acts as a singular neuter subject taking pronoun "it". Affirmative "is" takes "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'Everybody should have the habit of speaking the truth,',
      modelTag: "shouldn't they?",
      acceptableTags: ["shouldn't they?", "should not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes pronoun "they". Modal "should" in affirmative sentence takes negative tag "shouldn\'t they?".',
    },
    {
      index: 5,
      statement: 'Let us always speak the truth,',
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal with "Let us" always takes the tag "shall we?".',
    },
  ],
};

const SYLHET_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-sylhet-2025',
  board: 'Sylhet Board 2025',
  title: 'Sylhet Board 2025 - Proverbs, Money, and Moral Truths',
  questions: [
    {
      index: 1,
      statement: "Don't make late. Let's go,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'When a sentence concludes with an imperative proposal "Let\'s go", the tag question attaches to that proposal taking "shall we?".',
    },
    {
      index: 2,
      statement: 'A barking dog seldom bites,',
      modelTag: 'does it?',
      acceptableTags: ['does it?'],
      explanation: 'The proverbial statement contains semi-negative adverb "seldom". Subject "A barking dog" takes pronoun "it", so the tag is affirmative "does it?".',
    },
    {
      index: 3,
      statement: 'Money is a must for life,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Uncountable noun "Money" takes pronoun "it". Affirmative linking verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'Everybody believes this truth,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes pronoun "they". Affirmative Present Indefinite takes negative tag "don\'t they?".',
    },
    {
      index: 5,
      statement: "The teacher says, 'Charity begins at home',",
      modelTag: "doesn't he?",
      acceptableTags: ["doesn't he?", "doesn't she?", "does not he?", "does not she?"],
      explanation: 'The tag question is formed based on the main reporting clause "The teacher says", where singular subject "The teacher" takes "doesn\'t he?" (or "doesn\'t she?").',
    },
  ],
};

const BARISHAL_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-barishal-2025',
  board: 'Barishal Board 2025',
  title: 'Barishal Board 2025 - Truthfulness, Habit Formation & Liars',
  questions: [
    {
      index: 1,
      statement: 'Nobody trusts a liar,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Negative pronoun "Nobody" takes tag pronoun "they" and renders the statement negative. The tag is affirmative "do they?".',
    },
    {
      index: 2,
      statement: 'A liar has to lead a miserable life,',
      modelTag: "doesn't he?",
      acceptableTags: ["doesn't he?", "hasn't he?", "does not he?"],
      explanation: 'Semi-modal "has to" with singular subject "A liar" takes negative tag "doesn\'t he?".',
    },
    {
      index: 3,
      statement: 'Speaking the truth is a good exercise,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Gerund subject "Speaking the truth" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'Everybody should have the habit of speaking the truth,',
      modelTag: "shouldn't they?",
      acceptableTags: ["shouldn't they?", "should not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes pronoun "they". Modal auxiliary "should" takes negative tag "shouldn\'t they?".',
    },
    {
      index: 5,
      statement: 'Let us always speak the truth,',
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal beginning with "Let us" always takes the question tag "shall we?".',
    },
  ],
};

const CHATTOGRAM_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-chattogram-2025',
  board: 'Chattogram Board 2025',
  title: 'Chattogram Board 2025 - Value of Time and Striving for Academic Success',
  questions: [
    {
      index: 1,
      statement: 'I along with you am SSC examinees,',
      modelTag: "aren't I?",
      acceptableTags: ["aren't I?", "ain't I?", "am I not?"],
      explanation: 'When two subjects are connected by "along with", the verb and tag agree with the first subject ("I"). Affirmative "I am" takes the standard negative tag "aren\'t I?" (or "ain\'t I?").',
    },
    {
      index: 2,
      statement: 'Let me make the best use of time,',
      modelTag: 'will you?',
      acceptableTags: ['will you?', "won't you?"],
      explanation: 'Imperative sentence with "Let me" expressing a request or seeking permission takes the tag "will you?".',
    },
    {
      index: 3,
      statement: 'We should not neglect time,',
      modelTag: 'should we?',
      acceptableTags: ['should we?'],
      explanation: 'Negative statement with modal auxiliary "should not" takes affirmative tag "should we?".',
    },
    {
      index: 4,
      statement: 'Everyone wants to get A+,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everyone" takes tag pronoun "they". Present Indefinite affirmative statement takes negative tag "don\'t they?".',
    },
    {
      index: 5,
      statement: 'We know that time is very valuable,',
      modelTag: "don't we?",
      acceptableTags: ["don't we?", "do not we?"],
      explanation: 'In complex sentences expressing our knowledge or belief ("We know that..."), the tag question agrees with the main clause "We know" -> "don\'t we?".',
    },
  ],
};

const DINAJPUR_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-dinajpur-2025',
  board: 'Dinajpur Board 2025',
  title: 'Dinajpur Board 2025 - Conjunctions, Identity, Titanic & Future Plans',
  questions: [
    {
      index: 1,
      statement: "'But' is a conjunction,",
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'The word "\'But\'" in quotation marks is treated as a singular noun/concept taking pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'I am not a dancer,',
      modelTag: 'am I?',
      acceptableTags: ['am I?'],
      explanation: 'Negative statement with "I am not" takes affirmative tag "am I?".',
    },
    {
      index: 3,
      statement: 'He let me make tea,',
      modelTag: "didn't he?",
      acceptableTags: ["didn't he?", "did not he?"],
      explanation: 'Since subject "He" is 3rd person singular and the verb is "let" (not "lets"), it is Past Indefinite tense. Hence, the tag is negative past "didn\'t he?".',
    },
    {
      index: 4,
      statement: 'The Titanic sank on its first voyage,',
      modelTag: "didn't it?",
      acceptableTags: ["didn't it?", "didn't she?", "did not it?", "did not she?"],
      explanation: 'Past Indefinite verb "sank" with subject "The Titanic" (it, or personified ship she) takes negative past tag "didn\'t it?" (or "didn\'t she?").',
    },
    {
      index: 5,
      statement: 'He will visit a book fair tomorrow,',
      modelTag: "won't he?",
      acceptableTags: ["won't he?", "will not he?"],
      explanation: 'Future simple affirmative statement with modal "will" and subject "He" takes negative tag "won\'t he?".',
    },
  ],
};

const MYMENSINGH_BOARD_2025: TagQuestionsExercise = {
  id: 'tag-mymensingh-2025',
  board: 'Mymensingh Board 2025',
  title: 'Mymensingh Board 2025 - Hard Work, Determination and Achieving Goals',
  questions: [
    {
      index: 1,
      statement: 'Working hard is very important,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Gerund subject "Working hard" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Work hard and stay focused to achieve your goal,',
      modelTag: 'will you?',
      acceptableTags: ['will you?', "won't you?", 'can you?'],
      explanation: 'Compound imperative sentence giving advice/instruction takes the tag "will you?" (or "won\'t you?").',
    },
    {
      index: 3,
      statement: 'Hard work can lead to success if you stay determined,',
      modelTag: "can't it?",
      acceptableTags: ["can't it?", "cannot it?"],
      explanation: 'Main clause subject "Hard work" (it) with modal auxiliary "can" takes negative tag "can\'t it?".',
    },
    {
      index: 4,
      statement: 'It does not always give quick results,',
      modelTag: 'does it?',
      acceptableTags: ['does it?'],
      explanation: 'Negative statement with "does not" and subject "It" takes affirmative tag "does it?".',
    },
    {
      index: 5,
      statement: 'Actually, it helps us to do things better,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", "does not it?"],
      explanation: 'Present Indefinite affirmative statement with 3rd person singular subject "it" and verb "helps" takes negative tag "doesn\'t it?".',
    },
  ],
};

// ==========================================
// SSC BOARD QUESTIONS 2024 (ALL 9 BOARDS)
// ==========================================

const DHAKA_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-dhaka-2024',
  board: 'Dhaka Board 2024',
  title: 'Dhaka Board 2024 - Hankering After Money, Morality & Greed',
  questions: [
    {
      index: 1,
      statement: 'Many people hanker after money,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Plural subject "Many people" takes tag pronoun "they". In Present Indefinite affirmative with verb "hanker", the tag is negative "don\'t they?".',
    },
    {
      index: 2,
      statement: 'But money is not as valuable as morality,',
      modelTag: 'is it?',
      acceptableTags: ['is it?'],
      explanation: 'Negative statement with "is not" and uncountable singular noun "money" (pronoun "it") takes affirmative tag "is it?".',
    },
    {
      index: 3,
      statement: 'Let us always keep this truth in mind,',
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposals or suggestions beginning with "Let us" or "Let\'s" always take the tag "shall we?".',
    },
    {
      index: 4,
      statement: 'Money can hardly bring happiness,',
      modelTag: 'can it?',
      acceptableTags: ['can it?'],
      explanation: 'Semi-negative adverb "hardly" makes the sentence negative. With modal "can" and subject "Money" (it), the tag is affirmative "can it?".',
    },
    {
      index: 5,
      statement: 'So, we should never have greed for money,',
      modelTag: 'should we?',
      acceptableTags: ['should we?'],
      explanation: 'Negative adverb "never" makes the statement negative. Modal auxiliary "should" with subject "we" takes affirmative tag "should we?".',
    },
  ],
};

const SYLHET_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-sylhet-2024',
  board: 'Sylhet Board 2024',
  title: 'Sylhet Board 2024 - Extended Families, Rural Life & Shared Rooms',
  questions: [
    {
      index: 1,
      statement: 'At present extended families are found in rural areas,',
      modelTag: "aren't they?",
      acceptableTags: ["aren't they?", "are not they?"],
      explanation: 'Plural subject "extended families" takes pronoun "they". Affirmative passive "are found" takes negative tag "aren\'t they?".',
    },
    {
      index: 2,
      statement: "There're many members in extended families,",
      modelTag: "aren't there?",
      acceptableTags: ["aren't there?", "are not there?"],
      explanation: 'Introductory "There\'re" (There are) with plural noun takes tag with pronoun "there": "aren\'t there?".',
    },
    {
      index: 3,
      statement: 'The house is always full of guests,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular subject "The house" (pronoun "it") with affirmative verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'It becomes very difficult for one to study,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", "does not it?"],
      explanation: 'Present Indefinite 3rd person singular verb "becomes" with subject "It" takes negative tag "doesn\'t it?".',
    },
    {
      index: 5,
      statement: 'In the same room children are found reading, gossiping, and sleeping,',
      modelTag: "aren't they?",
      acceptableTags: ["aren't they?", "are not they?"],
      explanation: 'Plural subject "children" takes pronoun "they". Affirmative verb "are" takes negative tag "aren\'t they?".',
    },
  ],
};

const CUMILLA_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-cumilla-2024',
  board: 'Cumilla Board 2024',
  title: 'Cumilla Board 2024 - Persistence, Maternal Feeling, Past Actions & Favours',
  questions: [
    {
      index: 1,
      statement: 'Slow and steady wins the race,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", "does not it?"],
      explanation: 'Compound phrase "Slow and steady" represents a single unified virtue taking 3rd person singular verb "wins" and pronoun "it". Tag is "doesn\'t it?".',
    },
    {
      index: 2,
      statement: 'The mother has risen in her to see the orphan,',
      modelTag: "hasn't it?",
      acceptableTags: ["hasn't it?", "hasn't she?", "has not it?", "has not she?"],
      explanation: '"The mother" here refers to motherly affection (an abstract feeling), taking pronoun "it" (or personified "she"). Affirmative "has risen" takes "hasn\'t it?" / "hasn\'t she?".',
    },
    {
      index: 3,
      statement: 'He hardly cast a vote for me,',
      modelTag: 'did he?',
      acceptableTags: ['did he?'],
      explanation: 'Since subject "He" is 3rd person singular and the verb form is "cast" (not "casts"), it is Past Indefinite tense. Semi-negative adverb "hardly" makes the clause negative, taking affirmative past tag "did he?".',
    },
    {
      index: 4,
      statement: 'Kindly do me a favour,',
      modelTag: 'will you?',
      acceptableTags: ['will you?', "won't you?", 'can you?', 'could you?'],
      explanation: 'Polite imperative request starting with "Kindly" takes tag "will you?" (or "won\'t you?").',
    },
    {
      index: 5,
      statement: 'I need not go there,',
      modelTag: 'need I?',
      acceptableTags: ['need I?'],
      explanation: 'Negative modal auxiliary "need not" takes affirmative tag with modal "need": "need I?".',
    },
  ],
};

const DINAJPUR_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-dinajpur-2024',
  board: 'Dinajpur Board 2024',
  title: 'Dinajpur Board 2024 - Problem Solving, Sin of Lying & Nature Admiration',
  questions: [
    {
      index: 1,
      statement: 'None can solve this problem,',
      modelTag: 'can they?',
      acceptableTags: ['can they?'],
      explanation: 'Negative pronoun "None" makes the statement negative and takes tag pronoun "they". Modal "can" takes affirmative tag "can they?".',
    },
    {
      index: 2,
      statement: 'Everybody hates them,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". In Present Indefinite affirmative ("hates"), the tag is negative "don\'t they?".',
    },
    {
      index: 3,
      statement: "Let's do the work,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal starting with "Let\'s" (Let us) always takes the tag "shall we?".',
    },
    {
      index: 4,
      statement: 'Telling lies is a great sin,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Gerund subject "Telling lies" acts as a singular neuter noun taking pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 5,
      statement: 'How nice the bird is!,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Exclamatory sentence about "the bird" (pronoun "it") with affirmative verb "is" takes negative tag "isn\'t it?".',
    },
  ],
};

const JASHORE_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-jashore-2024',
  board: 'Jashore Board 2024',
  title: 'Jashore Board 2024 - Patriotism, Courage of a Patriot & Exclamations',
  questions: [
    {
      index: 1,
      statement: 'Patriotism persuades a man to do everything just,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", "does not it?"],
      explanation: 'Singular abstract noun "Patriotism" takes pronoun "it". Present Indefinite affirmative verb "persuades" takes negative tag "doesn\'t it?".',
    },
    {
      index: 2,
      statement: 'A patriot hardly fears anybody,',
      modelTag: 'does he?',
      acceptableTags: ['does he?', 'does she?'],
      explanation: 'Semi-negative adverb "hardly" makes the statement negative. Singular subject "A patriot" takes pronoun "he", taking affirmative tag "does he?".',
    },
    {
      index: 3,
      statement: 'Everybody respects a patriot,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". Present Indefinite affirmative verb "respects" takes negative tag "don\'t they?".',
    },
    {
      index: 4,
      statement: 'What an outstanding quality it is!,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Exclamatory sentence with subject "it" and linking verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 5,
      statement: "Let's be patriots,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal beginning with "Let\'s" (Let us) always takes the tag "shall we?".',
    },
  ],
};

const RAJSHAHI_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-rajshahi-2024',
  board: 'Rajshahi Board 2024',
  title: 'Rajshahi Board 2024 - Birth of Bangladesh, Civic Duties & Patriotism',
  questions: [
    {
      index: 1,
      statement: 'Bangladesh came into being at the cost of a bloody war,',
      modelTag: "didn't it?",
      acceptableTags: ["didn't it?", "didn't she?", "did not it?", "did not she?"],
      explanation: 'Past Indefinite verb "came" with country subject "Bangladesh" (pronoun "it" or personified "she") takes negative past tag "didn\'t it?" (or "didn\'t she?").',
    },
    {
      index: 2,
      statement: 'So, everyone has some duties and responsibilities to this country,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "haven't they?", "do not they?"],
      explanation: 'Indefinite pronoun "everyone" takes tag pronoun "they". In Present Indefinite with main verb "has", the negative tag is "don\'t they?".',
    },
    {
      index: 3,
      statement: 'As a citizen of this country, we can hardly forget our duties,',
      modelTag: 'can we?',
      acceptableTags: ['can we?'],
      explanation: 'Negative adverb "hardly" makes the clause negative. Modal auxiliary "can" with subject "we" takes affirmative tag "can we?".',
    },
    {
      index: 4,
      statement: 'I am proud to be a citizen of this country,',
      modelTag: "aren't I?",
      acceptableTags: ["aren't I?", "ain't I?", "am I not?"],
      explanation: 'Affirmative statement with "I am" takes the standard negative tag "aren\'t I?" (or "ain\'t I?").',
    },
    {
      index: 5,
      statement: 'Let us work together to build up our country,',
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal beginning with "Let us" always takes the tag "shall we?".',
    },
  ],
};

const BARISHAL_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-barishal-2024',
  board: 'Barishal Board 2024',
  title: 'Barishal Board 2024 - Industry vs Idleness & Prosperity',
  questions: [
    {
      index: 1,
      statement: 'Industry is the key to success,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular abstract noun "Industry" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'The industrious are prosperous,',
      modelTag: "aren't they?",
      acceptableTags: ["aren't they?", "are not they?"],
      explanation: '"The industrious" functions as a plural collective noun (industrious people) taking pronoun "they". Verb "are" takes negative tag "aren\'t they?".',
    },
    {
      index: 3,
      statement: 'They hardly suffer from poverty,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Semi-negative adverb "hardly" makes the sentence negative. Present Indefinite plural takes affirmative tag "do they?".',
    },
    {
      index: 4,
      statement: 'On the other hand, idleness is a curse,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Subject "idleness" is a singular abstract noun taking pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 5,
      statement: 'The idle seldom prosper,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: '"The idle" refers to idle people (plural noun) taking pronoun "they". Semi-negative adverb "seldom" makes the statement negative, so the tag is affirmative "do they?".',
    },
  ],
};

const CHATTOGRAM_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-chattogram-2024',
  board: 'Chattogram Board 2024',
  title: 'Chattogram Board 2024 - Universal Truths, Negative Words & Commands',
  questions: [
    {
      index: 1,
      statement: 'Everybody believes this truth,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". Present Indefinite affirmative takes negative tag "don\'t they?".',
    },
    {
      index: 2,
      statement: 'We hardly forget the golden past,',
      modelTag: 'do we?',
      acceptableTags: ['do we?'],
      explanation: 'Semi-negative adverb "hardly" makes the statement negative. Present Indefinite with subject "we" takes affirmative tag "do we?".',
    },
    {
      index: 3,
      statement: 'Nothing was said,',
      modelTag: 'was it?',
      acceptableTags: ['was it?'],
      explanation: 'Negative pronoun "Nothing" takes tag pronoun "it" and makes the clause negative. Past verb "was" takes affirmative tag "was it?".',
    },
    {
      index: 4,
      statement: "Don't disturb me,",
      modelTag: 'will you?',
      acceptableTags: ['will you?'],
      explanation: 'Negative imperative command starting with "Don\'t" always takes the affirmative tag "will you?".',
    },
    {
      index: 5,
      statement: "Let's be sincere in our life,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal beginning with "Let\'s" (Let us) always takes the tag "shall we?".',
    },
  ],
};

const MYMENSINGH_BOARD_2024: TagQuestionsExercise = {
  id: 'tag-mymensingh-2024',
  board: 'Mymensingh Board 2024',
  title: 'Mymensingh Board 2024 - Patriotism, Wise Teachings & Loving Motherland',
  questions: [
    {
      index: 1,
      statement: 'Patriotism is a noble virtue,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular abstract subject "Patriotism" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Wise people teach us to love our own country,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Plural subject "Wise people" takes pronoun "they". Affirmative Present Indefinite verb "teach" takes negative tag "don\'t they?".',
    },
    {
      index: 3,
      statement: 'We should remember that motherland is above everything,',
      modelTag: "shouldn't we?",
      acceptableTags: ["shouldn't we?", "should not we?"],
      explanation: 'The tag question is formed based on the principal clause "We should remember", taking negative modal tag "shouldn\'t we?".',
    },
    {
      index: 4,
      statement: 'Some people forget it,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Plural subject "Some people" takes pronoun "they". Affirmative verb "forget" takes negative tag "don\'t they?".',
    },
    {
      index: 5,
      statement: 'We hope that everybody will love his motherland,',
      modelTag: "don't we?",
      acceptableTags: ["don't we?", "won't they?", "do not we?"],
      explanation: 'In complex sentences with a main clause expressing hope or opinion ("We hope that..."), the tag question agrees with the main clause "We hope" -> "don\'t we?".',
    },
  ],
};

// ==========================================
// SSC BOARD QUESTIONS 2023 (ALL 9 BOARDS)
// ==========================================

const DHAKA_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-dhaka-2023',
  board: 'Dhaka Board 2023',
  title: 'Dhaka Board 2023 - Modesty, Respect for Superiors & Student Success',
  questions: [
    {
      index: 1,
      statement: 'Modesty is a great virtue,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular abstract noun "Modesty" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'The modest always respect their superiors,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: '"The modest" functions as a plural collective noun (meaning modest people) taking pronoun "they". Present Indefinite affirmative verb "respect" takes negative tag "don\'t they?".',
    },
    {
      index: 3,
      statement: 'Everybody likes a modest person,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". Present Indefinite affirmative verb "likes" takes negative tag "don\'t they?".',
    },
    {
      index: 4,
      statement: 'A modest student hardly fails to reach his goal,',
      modelTag: 'does he?',
      acceptableTags: ['does he?', 'does she?'],
      explanation: 'Semi-negative adverb "hardly" makes the statement negative. Singular subject "A modest student" takes pronoun "he", taking affirmative tag "does he?".',
    },
    {
      index: 5,
      statement: "Let's try to be modest in our way of life,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposals or suggestions beginning with "Let\'s" (Let us) always take the tag "shall we?".',
    },
  ],
};

const RAJSHAHI_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-rajshahi-2023',
  board: 'Rajshahi Board 2023',
  title: 'Rajshahi Board 2023 - War as a Curse, Destruction & Sufferers',
  questions: [
    {
      index: 1,
      statement: 'War is a curse of human civilization,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular abstract noun "War" takes pronoun "it". Affirmative linking verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Everybody suffers from it,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes pronoun "they". Present Indefinite affirmative verb "suffers" takes negative tag "don\'t they?".',
    },
    {
      index: 3,
      statement: 'Massive destruction is found everywhere,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular uncountable subject "Massive destruction" takes pronoun "it". Affirmative passive "is found" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'None can escape from the bombings of the enemy,',
      modelTag: 'can they?',
      acceptableTags: ['can they?'],
      explanation: 'Negative subject pronoun "None" takes tag pronoun "they" and renders the statement negative. Modal auxiliary "can" takes affirmative tag "can they?".',
    },
    {
      index: 5,
      statement: 'Women and children are the worst sufferers,',
      modelTag: "aren't they?",
      acceptableTags: ["aren't they?", "are not they?"],
      explanation: 'Compound plural subject "Women and children" takes pronoun "they". Affirmative linking verb "are" takes negative tag "aren\'t they?".',
    },
  ],
};

const CUMILLA_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-cumilla-2023',
  board: 'Cumilla Board 2023',
  title: 'Cumilla Board 2023 - Passion for Cricket and Excitement of the Game',
  questions: [
    {
      index: 1,
      statement: 'At present, everybody likes cricket,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "everybody" takes tag pronoun "they". Present Indefinite affirmative verb "likes" takes negative tag "don\'t they?".',
    },
    {
      index: 2,
      statement: 'Students hardly miss watching this game,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Semi-negative adverb "hardly" makes the sentence negative. Plural subject "Students" takes pronoun "they", taking affirmative tag "do they?".',
    },
    {
      index: 3,
      statement: 'Nothing is more enjoyable to them than cricket,',
      modelTag: 'is it?',
      acceptableTags: ['is it?'],
      explanation: 'Negative pronoun "Nothing" takes pronoun "it" and makes the clause negative. Linking verb "is" takes affirmative tag "is it?".',
    },
    {
      index: 4,
      statement: 'How exciting the game is!,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Exclamatory sentence about "the game" (pronoun "it") with affirmative verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 5,
      statement: "Let's play this game,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal beginning with "Let\'s" (Let us) always takes the tag "shall we?".',
    },
  ],
};

const JASHORE_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-jashore-2023',
  board: 'Jashore Board 2023',
  title: 'Jashore Board 2023 - Habit of Reading, Studious Students & Book Gifting',
  questions: [
    {
      index: 1,
      statement: 'The habit of reading is good,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular subject "The habit of reading" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'But we hardly find it in us,',
      modelTag: 'do we?',
      acceptableTags: ['do we?'],
      explanation: 'Semi-negative adverb "hardly" makes the statement negative. Present Indefinite with subject "we" takes affirmative tag "do we?".',
    },
    {
      index: 3,
      statement: 'Everybody loves a studious student,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". Present Indefinite affirmative verb "loves" takes negative tag "don\'t they?".',
    },
    {
      index: 4,
      statement: 'We ought to give him books,',
      modelTag: "oughtn't we?",
      acceptableTags: ["oughtn't we?", "shouldn't we?", "ought not we?"],
      explanation: 'Modal auxiliary "ought to" in affirmative sentence takes negative tag "oughtn\'t we?" (or "shouldn\'t we?").',
    },
    {
      index: 5,
      statement: 'Books give us knowledge,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Plural subject "Books" takes pronoun "they". Present Indefinite affirmative verb "give" takes negative tag "don\'t they?".',
    },
  ],
};

const SYLHET_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-sylhet-2023',
  board: 'Sylhet Board 2023',
  title: 'Sylhet Board 2023 - Abilities, Imperatives, Parts of Speech & Past Verbs',
  questions: [
    {
      index: 1,
      statement: 'Fishes can swim,',
      modelTag: "can't they?",
      acceptableTags: ["can't they?", "cannot they?"],
      explanation: 'Plural subject "Fishes" takes pronoun "they". Modal auxiliary "can" in affirmative statement takes negative tag "can\'t they?".',
    },
    {
      index: 2,
      statement: 'Help the helpless,',
      modelTag: 'will you?',
      acceptableTags: ['will you?', "won't you?", 'can you?'],
      explanation: 'Imperative sentence expressing an order, request or moral advice takes the tag "will you?" (or "won\'t you?").',
    },
    {
      index: 3,
      statement: "'She' is a pronoun,",
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'The word "\'She\'" in quotation marks refers to a grammatical word/part of speech (singular noun concept), taking pronoun "it". Tag is "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'He put the bag here,',
      modelTag: "didn't he?",
      acceptableTags: ["didn't he?", "did not he?"],
      explanation: 'Since subject "He" is 3rd person singular and the verb is "put" (not "puts"), it is Past Indefinite tense. Affirmative past takes negative tag "didn\'t he?".',
    },
    {
      index: 5,
      statement: 'They seldom come to me,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Semi-negative adverb "seldom" makes the statement negative. Present Indefinite with plural subject "They" takes affirmative tag "do they?".',
    },
  ],
};

const BARISHAL_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-barishal-2023',
  board: 'Barishal Board 2023',
  title: 'Barishal Board 2023 - Significance of the SSC Examination & Preparation',
  questions: [
    {
      index: 1,
      statement: 'SSC Examination is the first public examination in our country,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Singular proper/abstract noun "SSC Examination" takes pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 2,
      statement: 'Every student takes the examination seriously,',
      modelTag: "don't they?",
      acceptableTags: ["don't they?", "do not they?"],
      explanation: 'Phrase "Every student" takes tag pronoun "they". Present Indefinite affirmative takes negative tag "don\'t they?".',
    },
    {
      index: 3,
      statement: 'Its result allows one to enter the next level,',
      modelTag: "doesn't it?",
      acceptableTags: ["doesn't it?", "does not it?"],
      explanation: 'Singular subject "Its result" takes pronoun "it". Present Indefinite affirmative verb "allows" takes negative tag "doesn\'t it?".',
    },
    {
      index: 4,
      statement: "So, it is not less important in one's life,",
      modelTag: 'is it?',
      acceptableTags: ['is it?'],
      explanation: 'Negative statement with "is not" and subject "it" takes affirmative tag "is it?".',
    },
    {
      index: 5,
      statement: 'A student needs to take good preparation for it,',
      modelTag: "doesn't he?",
      acceptableTags: ["doesn't he?", "needn't he?", "does not he?"],
      explanation: 'Singular subject "A student" takes pronoun "he". Present Indefinite main verb "needs" takes negative tag "doesn\'t he?".',
    },
  ],
};

const CHATTOGRAM_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-chattogram-2023',
  board: 'Chattogram Board 2023',
  title: 'Chattogram Board 2023 - Truthfulness, Liars & Speaking the Truth',
  questions: [
    {
      index: 1,
      statement: 'Nobody trusts a liar,',
      modelTag: 'do they?',
      acceptableTags: ['do they?'],
      explanation: 'Negative indefinite pronoun "Nobody" takes tag pronoun "they" and renders the statement negative. Tag is affirmative "do they?".',
    },
    {
      index: 2,
      statement: 'A liar has to lead a miserable life,',
      modelTag: "doesn't he?",
      acceptableTags: ["doesn't he?", "hasn't he?", "does not he?"],
      explanation: 'Semi-modal "has to" with singular subject "A liar" (he) takes negative tag "doesn\'t he?".',
    },
    {
      index: 3,
      statement: 'Speaking the truth is a good exercise,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Gerund subject "Speaking the truth" acts as a singular noun taking pronoun "it". Affirmative "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: 'Everybody should have the habit of speaking the truth,',
      modelTag: "shouldn't they?",
      acceptableTags: ["shouldn't they?", "should not they?"],
      explanation: 'Indefinite pronoun "Everybody" takes tag pronoun "they". Modal auxiliary "should" in affirmative sentence takes negative tag "shouldn\'t they?".',
    },
    {
      index: 5,
      statement: 'Many are often found telling a lie out of fun,',
      modelTag: "aren't they?",
      acceptableTags: ["aren't they?", "are not they?"],
      explanation: 'Indefinite plural pronoun "Many" takes tag pronoun "they". Affirmative passive "are often found" takes negative tag "aren\'t they?".',
    },
  ],
};

const DINAJPUR_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-dinajpur-2023',
  board: 'Dinajpur Board 2023',
  title: 'Dinajpur Board 2023 - Noun Clauses, Commands, Exclamations & Mixed Pronouns',
  questions: [
    {
      index: 1,
      statement: 'What he said was true,',
      modelTag: "wasn't it?",
      acceptableTags: ["wasn't it?", "was not it?"],
      explanation: 'The noun clause "What he said" acts as the singular subject taking pronoun "it". Affirmative past linking verb "was" takes negative tag "wasn\'t it?".',
    },
    {
      index: 2,
      statement: "Don't forget me,",
      modelTag: 'will you?',
      acceptableTags: ['will you?'],
      explanation: 'Negative imperative command starting with "Don\'t" always takes the affirmative tag "will you?".',
    },
    {
      index: 3,
      statement: 'How exciting the game is,',
      modelTag: "isn't it?",
      acceptableTags: ["isn't it?", "is not it?"],
      explanation: 'Exclamatory sentence about "the game" (pronoun "it") with affirmative verb "is" takes negative tag "isn\'t it?".',
    },
    {
      index: 4,
      statement: "Let's try to make him understand the importance of literacy,",
      modelTag: 'shall we?',
      acceptableTags: ['shall we?'],
      explanation: 'Imperative proposal beginning with "Let\'s" (Let us) always takes the tag "shall we?".',
    },
    {
      index: 5,
      statement: 'You, he, and I did the work,',
      modelTag: "didn't we?",
      acceptableTags: ["didn't we?", "did not we?"],
      explanation: 'Compound subject containing first person pronoun "I" ("You, he, and I") combines into the plural first person pronoun "we". Past Indefinite verb "did" takes negative tag "didn\'t we?".',
    },
  ],
};

const MYMENSINGH_BOARD_2023: TagQuestionsExercise = {
  id: 'tag-mymensingh-2023',
  board: 'Mymensingh Board 2023',
  title: 'Mymensingh Board 2023 - Feeding the Unfed, Titanic & Fatherly Affection',
  questions: [
    {
      index: 1,
      statement: 'The unfed should be fed,',
      modelTag: "shouldn't they?",
      acceptableTags: ["shouldn't they?", "should not they?"],
      explanation: '"The unfed" functions as a plural collective noun (unfed people) taking pronoun "they". Modal auxiliary "should" takes negative tag "shouldn\'t they?".',
    },
    {
      index: 2,
      statement: 'He let me do the work,',
      modelTag: "didn't he?",
      acceptableTags: ["didn't he?", "did not he?"],
      explanation: 'Since subject "He" is 3rd person singular and the verb is "let" (not "lets"), it is Past Indefinite tense. Affirmative past takes negative tag "didn\'t he?".',
    },
    {
      index: 3,
      statement: 'The Titanic sank on its first voyage,',
      modelTag: "didn't it?",
      acceptableTags: ["didn't it?", "didn't she?", "did not it?", "did not she?"],
      explanation: 'Past Indefinite verb "sank" with subject "The Titanic" (pronoun "it" or personified "she") takes negative past tag "didn\'t it?" (or "didn\'t she?").',
    },
    {
      index: 4,
      statement: 'There is no school in our village,',
      modelTag: 'is there?',
      acceptableTags: ['is there?'],
      explanation: 'Negative statement with introductory "There is no" takes affirmative tag with pronoun "there": "is there?".',
    },
    {
      index: 5,
      statement: 'The father rose in him,',
      modelTag: "didn't it?",
      acceptableTags: ["didn't it?", "didn't he?", "did not it?", "did not he?"],
      explanation: '"The father" here refers to fatherly affection (an abstract noun/feeling), which takes pronoun "it" (or "he"). Past Indefinite verb "rose" takes negative tag "didn\'t it?".',
    },
  ],
};

export const TAG_QUESTIONS_MODEL_QUESTIONS: TagQuestionsExercise[] = [
  // 2026 Board Questions
  RAJSHAHI_BOARD_2026,
  MYMENSINGH_BOARD_2026,
  JESSORE_BOARD_2026,
  CUMILLA_BOARD_2026,
  BARISHAL_BOARD_2026,
  DHAKA_BOARD_2026,
  CHATTRAGRAM_BOARD_2026,
  SYLHET_BOARD_2026,
  DINAJPUR_BOARD_2026,

  // 2025 Board Questions
  DHAKA_BOARD_2025,
  RAJSHAHI_BOARD_2025,
  CUMILLA_BOARD_2025,
  JASHORE_BOARD_2025,
  SYLHET_BOARD_2025,
  BARISHAL_BOARD_2025,
  CHATTOGRAM_BOARD_2025,
  DINAJPUR_BOARD_2025,
  MYMENSINGH_BOARD_2025,

  // 2024 Board Questions
  DHAKA_BOARD_2024,
  SYLHET_BOARD_2024,
  CUMILLA_BOARD_2024,
  DINAJPUR_BOARD_2024,
  JASHORE_BOARD_2024,
  RAJSHAHI_BOARD_2024,
  BARISHAL_BOARD_2024,
  CHATTOGRAM_BOARD_2024,
  MYMENSINGH_BOARD_2024,

  // 2023 Board Questions
  DHAKA_BOARD_2023,
  RAJSHAHI_BOARD_2023,
  CUMILLA_BOARD_2023,
  JASHORE_BOARD_2023,
  SYLHET_BOARD_2023,
  BARISHAL_BOARD_2023,
  CHATTOGRAM_BOARD_2023,
  DINAJPUR_BOARD_2023,
  MYMENSINGH_BOARD_2023,

  // Model Practice Sets
  ...TAG_QUESTIONS_SETS_1_TO_20,
  ...TAG_QUESTIONS_SETS_21_TO_40,
];


