export interface CheatSheetRule {
  id: string;
  ruleTitle: string;
  ruleBn: string;
  formula?: string;
  exampleEn: string;
  exampleBn?: string;
  tip?: string;
}

export interface CommonMistake {
  id: string;
  incorrect: string;
  correct: string;
  explanationBn: string;
  tag?: string;
}

export interface ItemCheatSheet {
  itemId: number;
  itemNumber: number;
  nameEn: string;
  nameBn: string;
  part: 'Grammar' | 'Writing';
  marks: string;
  badgeColor: string;
  summaryBn: string;
  quickShortcuts: string[];
  rules: CheatSheetRule[];
  commonMistakes: CommonMistake[];
  examTips: string[];
}

export const GRAMMAR_CHEAT_SHEET_DATA: ItemCheatSheet[] = [
  {
    itemId: 1,
    itemNumber: 1,
    nameEn: 'Gap Filling with Clues',
    nameBn: 'ক্লু সহ শূন্যস্থান পূরণ',
    part: 'Grammar',
    marks: '1x10 = 10 Marks',
    badgeColor: 'blue',
    summaryBn: 'বক্সে দেওয়া ১০টি ক্লু শব্দ পরিবর্তন (Parts of Speech, Tense, Suffix/Prefix, Article, Preposition) করে ১০টি শূন্যস্থান পূরণ করতে হবে।',
    quickShortcuts: [
      'Preposition + Noun/Gerund (V+ing)',
      'Article (a/an/the) + Adjective + Noun',
      'Modal Aux (can/may/must) + V1',
      'Be verb + V3 (Passive) / V+ing (Continuous)'
    ],
    rules: [
      {
        id: '1-1',
        ruleTitle: 'Preposition-এর পর ক্রিয়াপদ বা বিশেষ্য',
        ruleBn: 'যেকোনো Preposition (to ব্যতীত) এর পর Verb আসলে তার সাথে ing যুক্ত হয়, অথবা Noun বসে। To এর পর সাধারণত Verb-এর Base form (V1) বসে।',
        formula: 'Preposition (by/for/in/with/without/of) + [Verb + ing] / Noun',
        exampleEn: 'He succeeded by working hard. (Not: by work hard)',
        exampleBn: 'কঠোর পরিশ্রম করার মাধ্যমে সে সফল হয়েছিল।',
        tip: 'ব্যতিক্রম: with a view to, look forward to, get used to, be accustomed to ইত্যাদির পর V+ing বসে।'
      },
      {
        id: '1-2',
        ruleTitle: 'Article ও Noun এর মধ্যবর্তী অবস্থান',
        ruleBn: 'Article এবং Noun এর মাঝে শূন্যস্থান থাকলে সেখানে অবশ্যই একটি Adjective বসাতে হবে।',
        formula: 'Article (a/an/the) + [Adjective] + Noun',
        exampleEn: 'Honesty is a noble virtue. (noble is an adjective before virtue)',
        exampleBn: 'সততা একটি মহৎ গুণ।'
      },
      {
        id: '1-3',
        ruleTitle: 'Subject ও Verb এর মধ্যবর্তী Adverb',
        ruleBn: 'Subject ও Main Verb এর মাঝে অথবা Auxiliary ও Main Verb এর মাঝে শূন্যস্থান থাকলে Adverb বসে।',
        formula: 'Subject + [Adverb] + Verb  অথবা  Aux + [Adverb] + Main Verb',
        exampleEn: 'He suddenly appeared in front of me. / It is strictly prohibited.',
        exampleBn: 'সে হঠাৎ আমার সামনে উপস্থিত হলো।'
      },
      {
        id: '1-4',
        ruleTitle: 'Passive Voice চিহ্নিতকরণ',
        ruleBn: 'Subject যদি কাজের কর্তা (doer) না হয়ে গ্রহীতা হয়, তবে Be verb এর পর Verb এর Past Participle (V3) রূপ বসবে।',
        formula: 'Passive Subject + Be verb (is/are/was/were/been) + [V3]',
        exampleEn: 'English is spoken all over the world.',
        exampleBn: 'সারা বিশ্বে ইংরেজি বলা হয়।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-1-1',
        incorrect: 'He went to market with a view to buy a book.',
        correct: 'He went to market with a view to buying a book.',
        explanationBn: '"with a view to" এর পর সর্বদা Verb এর সাথে ing যুক্ত হয়।'
      },
      {
        id: 'm-1-2',
        incorrect: 'It is a danger place.',
        correct: 'It is a dangerous place.',
        explanationBn: 'Noun (place) এর পূর্বে Adjective (dangerous) বসবে, Noun (danger) নয়।'
      },
      {
        id: 'm-1-3',
        incorrect: 'Smoking is injurious for health.',
        correct: 'Smoking is injurious to health.',
        explanationBn: '"injurious" এর সাথে সর্বদা নির্দিষ্ট Preposition "to" বসে।'
      }
    ],
    examTips: [
      'প্যাসেজের শুরু থেকে শেষ পর্যন্ত সম্পূর্ণ পড়ে অর্থ ও Tense (Present নাকি Past) বুঝে নিন।',
      'প্রদত্ত ক্লু শব্দগুলোর Parts of Speech চিহ্নিত করুন এবং শূন্যস্থানের ডিমান্ড অনুযায়ী রূপান্তর করুন।',
      'উত্তরপত্রে শুধুমাত্র (a), (b), (c)... দিয়ে পরিবর্তিত উত্তরটি লিখুন, পুরো প্যাসেজ তোলার দরকার নেই।'
    ]
  },
  {
    itemId: 2,
    itemNumber: 2,
    nameEn: 'Substitution Table',
    nameBn: 'প্রতিস্থাপন সারণী',
    part: 'Grammar',
    marks: '1x5 = 05 Marks',
    badgeColor: 'emerald',
    summaryBn: '৩টি কলাম (Subject, Verb/Auxiliary, Extension/Object) থেকে সঠিক অংশ মিলিয়ে অর্থপূর্ণ ও ব্যাকরণসম্মত ৫টি বাক্য তৈরি করতে হবে।',
    quickShortcuts: [
      'Singular Subject → Singular Verb (is / was / has / V+s/es)',
      'Plural Subject → Plural Verb (are / were / have / V1)',
      'Collocation ও প্রাসঙ্গিক অর্থ নিশ্চিত করুন'
    ],
    rules: [
      {
        id: '2-1',
        ruleTitle: 'Subject-Verb Agreement সামঞ্জস্য',
        ruleBn: 'Column A এর Subject একবচন (Singular) হলে Column B থেকে একবচন Verb এবং বহুবচন (Plural) হলে বহুবচন Verb নির্বাচন করতে হবে।',
        formula: 'Singular Noun/Pronoun + is/was/has/Verb+s/es | Plural Noun/Pronoun + are/were/have/Verb(base)',
        exampleEn: 'Patriotism is a noble virtue. / Patriots love their country.',
        exampleBn: 'দেশপ্রেম একটি মহৎ গুণ। / দেশপ্রেমিকরা তাদের দেশকে ভালোবাসে।'
      },
      {
        id: '2-2',
        ruleTitle: 'Logical & Semantic Match (অর্থসঙ্গতি)',
        ruleBn: 'ব্যাকরণগতভাবে মিল থাকলেও অর্থপূর্ণ হতে হবে। যেমন: Education এর সাথে "enlightens our mind" মানানসই, কিন্তু "pollutes environment" নয়।',
        formula: 'Subject + Appropriate Action Verb + Compatible Object/Predicate',
        exampleEn: 'Education widens our outlook and ennobles our mind.',
        exampleBn: 'শিক্ষা আমাদের দৃষ্টিভঙ্গি প্রসারিত করে এবং মনকে উন্নত করে।'
      },
      {
        id: '2-3',
        ruleTitle: '৫টি বাক্যে ৫টি আলাদা বিষয়বস্তু',
        ruleBn: 'কোনো অংশ পুনরাবৃত্তি না করে ৫টি ভিন্ন ও স্বয়ংসম্পূর্ণ বাক্য সাজাতে হবে।',
        formula: '5 Unique Meaningful Complete Sentences',
        exampleEn: '(a) Trees are our best friends. (b) They give us oxygen and shade.',
        exampleBn: 'গাছপালা আমাদের পরম বন্ধু। তারা আমাদের অক্সিজেন ও ছায়া দেয়।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-2-1',
        incorrect: 'Illiteracy remove our poverty.',
        correct: 'Illiteracy hinders our development. / Education removes our poverty.',
        explanationBn: 'Illiteracy (নিরক্ষরতা) দারিদ্র্য দূর করে না, বরং উন্নয়ন বাধাগ্রস্ত করে। অর্থসঙ্গতি বজায় রাখা আবশ্যক।'
      },
      {
        id: 'm-2-2',
        incorrect: 'Book reading are a good habit.',
        correct: 'Book reading is a good habit.',
        explanationBn: 'Gerund Subject (Book reading) সর্বদা Singular হিসেবে গণ্য হয় এবং "is" গ্রহণ করে।'
      }
    ],
    examTips: [
      'উত্তরপত্রে রোমান সংখ্যা বা বর্ণ (a, b, c, d, e) দিয়ে পূর্ণাঙ্গ বাক্যগুলো লিখবেন।',
      'টেবিল বা হাইফেন দিয়ে আংশিক লিখবেন না, সম্পূর্ণ বাক্য (Full Sentence) লিখতে হবে।'
    ]
  },
  {
    itemId: 3,
    itemNumber: 3,
    nameEn: 'Right Form of Verbs',
    nameBn: 'ক্রিয়ার সঠিক রূপ',
    part: 'Grammar',
    marks: '1x10 = 10 Marks',
    badgeColor: 'amber',
    summaryBn: 'ব্র্যাকেটের বা বক্সে দেওয়া root verb গুলোর সঠিক Tense, Voice, Subject-Verb Agreement ও Conditionals অনুযায়ী রূপ নির্ধারণ করা।',
    quickShortcuts: [
      'Always/often/daily → Present Indefinite (V1 / V+s/es)',
      'Yesterday/ago/last/in 1971 → Past Indefinite (V2)',
      'Now/at this moment → Present Continuous (am/is/are + V-ing)',
      'Have/has/had/having/get/got → Past Participle (V3)',
      'If + Present → Future Indefinite (will + V1)',
      'If + Past (V2) → would/could/might + V1',
      'If + Past Perfect (had+V3) → would have + V3'
    ],
    rules: [
      {
        id: '3-1',
        ruleTitle: 'Conditionals (শর্তযুক্ত বাক্য)',
        ruleBn: '1st: If + Present → Future (will+V1)\n2nd: If + Past (V2) → would/could + V1\n3rd: If + Past Perfect (had+V3) → would/could have + V3',
        formula: 'If + S + V1 → S + will + V1 | If + S + V2 → S + would + V1 | If + S + had + V3 → S + would have + V3',
        exampleEn: 'If he comes, I will go. / If I had seen him, I would have invited him.',
        exampleBn: 'যদি সে আসে, আমি যাব।'
      },
      {
        id: '3-2',
        ruleTitle: 'No sooner had / Scarcely had / Hardly had',
        ruleBn: 'No sooner had + Subject + V3 ... than + Past Indefinite (V2)। Scarcely had / Hardly had ... when/before + V2।',
        formula: 'No sooner had + S + [V3] ... than + S + [V2]',
        exampleEn: 'No sooner had we reached the station than the train left.',
        exampleBn: 'আমরা স্টেশনে পৌঁছাতে না পৌঁছাতেই ট্রেনটি ছেড়ে দিল।'
      },
      {
        id: '3-3',
        ruleTitle: 'It is high time / It is time / Fancy / Wish',
        ruleBn: 'It is high time / It is time এর পর Subject থাকলে Verb-এর Past form (V2) বসে। Subject না থাকলে to + V1 বসে।',
        formula: 'It is high time + S + [V2]  অথবা  It is high time + [to + V1]',
        exampleEn: 'It is high time we changed our bad habits.',
        exampleBn: 'এটাই আমাদের খারাপ অভ্যাস পরিবর্তন করার উপযুক্ত সময়।'
      },
      {
        id: '3-4',
        ruleTitle: 'Lest এর ব্যবহার',
        ruleBn: 'Lest যুক্ত বাক্যে Subject এর পর should বা might + Verb-এর Base form (V1) বসে। Lest নিজে নেগেটিভ, তাই not বসে না।',
        formula: 'Lest + Subject + [should / might + V1]',
        exampleEn: 'Walk fast lest you should miss the train.',
        exampleBn: 'দ্রুত হাঁটো পাছে তুমি ট্রেন মিস করো।'
      },
      {
        id: '3-5',
        ruleTitle: 'Since এর দুই পাশের Tense নিয়ম',
        ruleBn: 'Since এর পূর্বের অংশ Present Indefinite/Perfect হলে পরের অংশ Past Indefinite (V2)। কিন্তু পূর্বের অংশ Past Indefinite হলে পরের অংশ Past Perfect (had+V3)।',
        formula: 'Present Indef/Perf + since + [Past Indefinite (V2)] | Past Indef + since + [Past Perfect (had+V3)]',
        exampleEn: 'It is many years since I saw you last. / It was many years since we had met.',
        exampleBn: 'তোমার সাথে আমার দেখা হয়েছিল অনেক বছর আগে।'
      },
      {
        id: '3-6',
        ruleTitle: 'As if / As though এর নিয়ম',
        ruleBn: 'As if / As though এর আগের অংশ Present হলে পরের অংশ Past Indefinite (Be verb আসলে সর্বদা were)। আগের অংশ Past হলে পরের অংশ Past Perfect (had+V3)।',
        formula: 'Present + as if + S + [V2 / were] | Past + as if + S + [had + V3]',
        exampleEn: 'He talks as if he knew everything. / He speaks as if he were mad.',
        exampleBn: 'সে এমনভাবে কথা বলে যেন সে সবকিছু জানে।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-3-1',
        incorrect: 'If you studied hard, you will pass.',
        correct: 'If you studied hard, you would pass. (or: If you study hard, you will pass.)',
        explanationBn: 'Past Indefinite (studied) থাকলে ২য় অংশে would + V1 বসবে।'
      },
      {
        id: 'm-3-2',
        incorrect: 'It is high time we stop corruption.',
        correct: 'It is high time we stopped corruption.',
        explanationBn: 'It is high time + Subject এর পর Verb এর Past form (V2) বসে।'
      },
      {
        id: 'm-3-3',
        incorrect: 'He talks as if he is a leader.',
        correct: 'He talks as if he were a leader.',
        explanationBn: 'As if / As though এর পর অবাস্তব কল্পনায় Be verb সর্বদা "were" হয়।'
      },
      {
        id: 'm-3-4',
        incorrect: 'Walk carefully lest you do not fall down.',
        correct: 'Walk carefully lest you should fall down.',
        explanationBn: 'Lest এর পর "should + V1" বসে এবং এতে কোনো not বা do not ব্যবহার করা যাবে না।'
      }
    ],
    examTips: [
      'প্যাসেজের সার্বিক Tense আগে যাচাই করুন—ঐতিহাসিক ঘটনা হলে সাধারণত Past Tense হয়।',
      'Active বনাম Passive খেয়াল করুন: কাজটা কি Subject নিজে করছে নাকি তার ওপর হচ্ছে?'
    ]
  },
  {
    itemId: 4,
    itemNumber: 4,
    nameEn: 'Changing Sentences',
    nameBn: 'বাক্য রূপান্তর (Transformation)',
    part: 'Grammar',
    marks: '1x10 = 10 Marks',
    badgeColor: 'purple',
    summaryBn: 'অর্থ অপরিবর্তিত রেখে বাক্যের গঠন বা ভাব রূপান্তর (Affirmative/Negative, Assertive/Interrogative/Exclamatory, Voice, Degree, Simple/Complex/Compound)।',
    quickShortcuts: [
      'Only (person) → None but; Only (thing) → Nothing but; Only (age/number) → Not more than',
      'Must → Cannot but + V1 / Cannot help + V-ing',
      'As soon as ... , → No sooner had ... than',
      'Every + Noun → There is no + Noun + but + Verb',
      'Active to Passive: Object → Subject + Be-verb + V3 + by + Subject → Object',
      'Superlative to Positive: No other + Noun + as/so + Adj(pos) + as + S'
    ],
    rules: [
      {
        id: '4-1',
        ruleTitle: 'Affirmative to Negative (Only / Alone)',
        ruleBn: 'ব্যক্তির ক্ষেত্রে Only/Alone উঠিয়ে শুরুতে "None but", বস্তুর ক্ষেত্রে "Nothing but", বয়স বা সংখ্যার ক্ষেত্রে "Not more than / Not less than" বসে।',
        formula: 'Person: [None but] + S | Thing: [Nothing but] | Number: [Not more than]',
        exampleEn: 'Only Allah can help us. → None but Allah can help us.',
        exampleBn: 'কেবলমাত্র আল্লাহ আমাদের সাহায্য করতে পারেন।'
      },
      {
        id: '4-2',
        ruleTitle: 'Active to Passive Voice',
        ruleBn: 'Active এর Object হয় Subject + Tense ও Person অনুযায়ী Be-verb + Verb এর Past Participle (V3) + Preposition (by/with/at/to) + Active এর Subject হয় Object।',
        formula: 'Obj as Subj + Be-verb (am/is/are/was/were/being/been) + [V3] + by/to + Subj as Obj',
        exampleEn: 'He wrote a letter. → A letter was written by him. / I know him. → He is known to me.',
        exampleBn: 'সে একটি চিঠি লিখেছিল। → তার দ্বারা একটি চিঠি লেখা হয়েছিল।'
      },
      {
        id: '4-3',
        ruleTitle: 'Simple / Complex / Compound রূপান্তর',
        ruleBn: 'Simple: ১টি মাত্র Finite Verb (In spite of / By+V-ing / To+V1)\nComplex: ২ বা ততোধিক Clause যুক্ত (Though / Although / If / Since / As / So...that)\nCompound: Coordinating Conjunction যুক্ত (and / but / or / yet / so)',
        formula: 'Simple (In spite of his poverty) ↔ Complex (Though he is poor) ↔ Compound (He is poor but honest)',
        exampleEn: 'Though he worked hard, he failed. → Working hard, he failed. (Simple) / He worked hard but failed. (Compound)',
        exampleBn: 'যদিও সে কঠোর পরিশ্রম করেছিল, সে ব্যর্থ হয়েছিল।'
      },
      {
        id: '4-4',
        ruleTitle: 'Degree of Comparison (Positive / Comparative / Superlative)',
        ruleBn: 'Superlative: Subject + Verb + the + Superlative + Extension\nComparative: S + V + Comp-Adj + than any other + Ext\nPositive: No other + Ext + Verb + as + Pos-Adj + as + S\n(One of the থাকলে: Very few ... than most other)',
        formula: 'Positive: [No other / Very few] ... as Adj as | Comparative: Adj-er + [than any other / than most other] | Superlative: [the / one of the] + Adj-est',
        exampleEn: 'He is the best boy in the class. → No other boy in the class is as good as he.',
        exampleBn: 'সে ক্লাসের সেরা ছেলে।'
      },
      {
        id: '4-5',
        ruleTitle: 'Assertive to Interrogative',
        ruleBn: 'বাক্যটি Affirmative হলে Negative Interrogative (Aux+n\'t) হবে। আর বাক্যটি Negative হলে শুধু Interrogative (Aux) হবে। Every/All থাকলে Who doesn\'t/didn\'t বসে।',
        formula: 'Affirmative Sentence → [Aux + n\'t + Subject + ... ?] | Nobody/None → [Who + ... ?]',
        exampleEn: 'Everyone loves flowers. → Who does not love flowers? / Smoking is bad. → Isn\'t smoking bad?',
        exampleBn: 'সবাই ফুল ভালোবাসে। → কে ফুল ভালোবাসে না?'
      }
    ],
    commonMistakes: [
      {
        id: 'm-4-1',
        incorrect: 'He is known by me.',
        correct: 'He is known to me.',
        explanationBn: '"know" verb এর passive রূপান্তরের পর preposition "to" বসে, "by" নয়।'
      },
      {
        id: 'm-4-2',
        incorrect: 'No sooner had I reached than he had left.',
        correct: 'No sooner had I reached than he left.',
        explanationBn: '"than" এর পরের অংশ সর্বদা Past Indefinite (V2) হয়, Past Perfect নয়।'
      },
      {
        id: 'm-4-3',
        incorrect: 'Very few metals are as precious than gold.',
        correct: 'Very few metals are as precious as gold.',
        explanationBn: 'Positive degree তে "as + Adjective + as" বসে, "than" বসবে না।'
      }
    ],
    examTips: [
      'ব্র্যাকেটে দেওয়া নির্দেশকটি (যেমন: Negative, Passive, Simple) নিখুঁতভাবে অনুসরণ করুন।',
      'Transformation এ বাক্যের মূল অর্থ কখনো পরিবর্তন করা যাবে না (Meaning must remain intact)।'
    ]
  },
  {
    itemId: 5,
    itemNumber: 5,
    nameEn: 'Tag Questions',
    nameBn: 'ট্যাগ প্রশ্ন',
    part: 'Grammar',
    marks: '1x5 = 05 Marks',
    badgeColor: 'cyan',
    summaryBn: 'মূল বক্তব্য ইতিবাচক হলে ট্যাগ হবে নেতিবাচক, আর মূল বক্তব্য নেতিবাচক হলে ট্যাগ হবে ইতিবাচক। ট্যাগ সর্বদা Pronoun ও কমা-জিজ্ঞাসাচিহ্ন দিয়ে শেষ হবে।',
    quickShortcuts: [
      'Affirmative Statement → Negative Tag (Aux + n\'t + Pronoun?)',
      'Negative Statement → Positive Tag (Aux + Pronoun?)',
      'Let\'s / Let us → shall we?',
      'Let him/them/her → will you?',
      'Imperative (Do it / Don\'t do it) → will you?',
      'Everybody/Everyone/Somebody/Nobody/None/Neither → Subject pronoun "they"',
      'Everything/Something/Nothing → Subject pronoun "it"',
      'Hardly/Scarcely/Barely/Seldom/Few/Little → Negative statement (Positive Tag)'
    ],
    rules: [
      {
        id: '5-1',
        ruleTitle: 'মূল সোনালী সূত্র (Positive ↔ Negative)',
        ruleBn: 'Statement (+) → Tag (-) [Aux + n\'t + Pronoun?]\nStatement (-) → Tag (+) [Aux + Pronoun?]',
        formula: 'Statement, [Auxiliary (+/-) + Pronoun]?',
        exampleEn: 'He is a student, isn\'t he? / She cannot swim, can she?',
        exampleBn: 'সে একজন ছাত্র, তাই নয় কি? / সে সাঁতার কাটতে পারে না, তাই কি?'
      },
      {
        id: '5-2',
        ruleTitle: 'Let\'s বনাম Let him/them এর ট্যাগ',
        ruleBn: 'Let\'s বা Let us (প্রস্তাব বা Suggestion) থাকলে Tag সর্বদা "shall we?" হবে। কিন্তু Let me / Let him / Let them থাকলে Tag হবে "will you?"।',
        formula: 'Let\'s / Let us ... → [shall we?] | Let him / Let them / Let me ... → [will you?]',
        exampleEn: 'Let\'s go for a walk, shall we? / Let him do the work, will you?',
        exampleBn: 'চলো হাঁটতে যাই, কেমন? / তাকে কাজটি করতে দাও, কেমন?'
      },
      {
        id: '5-3',
        ruleTitle: 'Indefinite Pronouns (Body/One বনাম Thing)',
        ruleBn: 'Everybody, Everyone, Somebody, Nobody, None, Neither ইত্যাদি থাকলে Pronoun হবে "they" এবং Verb ও Plural হবে। কিন্তু Everything, Something, Nothing থাকলে Pronoun হবে "it"।',
        formula: 'Everybody / Nobody / None → [Aux (Plural) + they?] | Everything / Nothing → [Aux (Singular) + it?]',
        exampleEn: 'Everybody loves him, don\'t they? / Nobody phoned, did they? / Nothing is impossible, is it?',
        exampleBn: 'সবাই তাকে ভালোবাসে, তাই নয় কি? / কেউই ফোন করেনি, করেছিল কি?'
      },
      {
        id: '5-4',
        ruleTitle: 'Semi-negative শব্দের ব্যবহার',
        ruleBn: 'বাক্যে hardly, scarcely, seldom, barely, few, little, neither, none থাকলে বাক্যটি নেতিবাচক হিসেবে গণ্য হয়, তাই এর Tag হবে ইতিবাচক (Positive Tag)।',
        formula: 'Subject + hardly / seldom / little + Verb → [Positive Aux + Pronoun]?',
        exampleEn: 'A barking dog seldom bites, does it? / He has few friends, has he? / does he?',
        exampleBn: 'ঘেউ ঘেউ করা কুকুর কদাচিৎ কামড়ায়, কামড়ায় কি?'
      },
      {
        id: '5-5',
        ruleTitle: 'I am এর Negative Tag',
        ruleBn: 'I am যুক্ত affirmative বাক্যের negative tag হবে "aren\'t I?" অথবা "ain\'t I?" (সাধারণত aren\'t I মানসম্মত)। কিন্তু I am not থাকলে "am I?" হবে।',
        formula: 'I am ... → [aren\'t I?] | I am not ... → [am I?]',
        exampleEn: 'I am late, aren\'t I? / I am not wrong, am I?',
        exampleBn: 'আমার দেরি হয়ে গেছে, তাই না?'
      }
    ],
    commonMistakes: [
      {
        id: 'm-5-1',
        incorrect: 'Everybody likes flowers, doesn\'t he?',
        correct: 'Everybody likes flowers, don\'t they?',
        explanationBn: 'Everybody এর পরিবর্তে pronoun "they" বসে। আর "they" এর সাথে "doesn\'t" হয় না, "don\'t" হয়।'
      },
      {
        id: 'm-5-2',
        incorrect: 'Let\'s arrange a picnic, will you?',
        correct: 'Let\'s arrange a picnic, shall we?',
        explanationBn: 'Let\'s (Let us) থাকলে প্রস্তাব বুঝায় এবং ট্যাগ সর্বদা "shall we?" হয়।'
      },
      {
        id: 'm-5-3',
        incorrect: 'He hardly comes here, doesn\'t he?',
        correct: 'He hardly comes here, does he?',
        explanationBn: '"hardly" একটি negative শব্দ, তাই ট্যাগটি positive (does he?) হবে।'
      }
    ],
    examTips: [
      'উত্তরপত্রে পুরো বাক্য তুলে কমা (,) দিয়ে ট্যাগ লিখে প্রশ্নবোধক চিহ্ন (?) দেওয়া বাধ্যতামূলক এবং ট্যাগের নিচে আন্ডারলাইন করুন।',
      'ট্যাগে কখনো Noun বসাবেন না, সর্বদা Pronoun (he, she, it, they, we, you, I) ব্যবহার করতে হবে।'
    ]
  },
  {
    itemId: 6,
    itemNumber: 6,
    nameEn: 'Suffixes and Prefixes',
    nameBn: 'উপসর্গ ও প্রত্যয়',
    part: 'Grammar',
    marks: '1x10 = 10 Marks',
    badgeColor: 'pink',
    summaryBn: 'প্যাসেজের ব্র্যাকেটে থাকা root word টির পূর্বে Prefix বা শেষে Suffix বা উভয়টি যুক্ত করে অর্থবহ Noun, Adjective, Verb বা Adverb এ রূপান্তর।',
    quickShortcuts: [
      'Noun suffixes: -tion, -sion, -ment, -ness, -ity, -ance, -ence, -er, -or, -ship',
      'Adjective suffixes: -ful, -less, -able, -ible, -al, -ic, -ive, -ous, -y',
      'Adverb suffix: Adjective + -ly (e.g. quick → quickly)',
      'Verb prefixes/suffixes: en-, re-, dis-, -en, -ify, -ize',
      'Negative prefixes: un-, in-, im-, il-, ir-, dis-, mis-, non-'
    ],
    rules: [
      {
        id: '6-1',
        ruleTitle: 'Noun এর অবস্থান চিহ্নিতকরণ',
        ruleBn: 'Sentence এর Subject বা Object হিসেবে, Preposition এর পর, Article বা Possessive (my/our/his) এর পর Noun বসে।',
        formula: 'Article / Possessive / Preposition + [Noun (root + tion/ment/ness/ity/ance)]',
        exampleEn: 'Education (educate+tion) removes dark+ness (darkness) from mind.',
        exampleBn: 'শিক্ষা মন থেকে অন্ধকার দূর করে।'
      },
      {
        id: '6-2',
        ruleTitle: 'Adjective এর অবস্থান চিহ্নিতকরণ',
        ruleBn: 'Noun এর ঠিক পূর্বে অথবা Linking Verb (be, seem, look, become, sound) এর পর Adjective বসে।',
        formula: 'Be-verb / Linking verb + [Adjective (root + ful/less/able/al/ive/ous)]',
        exampleEn: 'He is a duty+ful (dutiful) son. / The scenery is charm+ing (charming).',
        exampleBn: 'সে একজন কর্তব্যপরায়ণ ছেলে।'
      },
      {
        id: '6-3',
        ruleTitle: 'Adverb এর অবস্থান ও গঠন',
        ruleBn: 'সাধারণত Adjective এর শেষে -ly যুক্ত করে Adverb গঠিত হয়। Adverb ক্রিয়া সম্পন্ন হওয়ার ধরণ বা বাক্যকে মডিফাই করে।',
        formula: 'Adjective + ly = [Adverb] (e.g., proper → properly, sincere → sincerely)',
        exampleEn: 'He spoke real+ly (really) sincere+ly (sincerely).',
        exampleBn: 'সে সত্যিই আন্তরিকভাবে কথা বলেছিল।'
      },
      {
        id: '6-4',
        ruleTitle: 'বিপরীতার্থক (Antonym) ও নেতিবাচক Prefix',
        ruleBn: 'প্যাসেজের অর্থের দাবি অনুযায়ী মূল শব্দের পূর্বে un-, in-, im-, dis-, mis-, non- ইত্যাদি প্রিফিক্স যুক্ত করে বিপরীত শব্দ বানাতে হয়।',
        formula: '[Prefix (un/dis/mis/in/im/il)] + Root Word',
        exampleEn: 'He is un+happy (unhappy). / Do not mis+use (misuse) your time.',
        exampleBn: 'সে অসুখী। / তোমার সময়ের অপব্যবহার করো না।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-6-1',
        incorrect: 'He acted very wise.',
        correct: 'He acted very wisely.',
        explanationBn: 'Verb (acted) কে মডিফাই করতে Adverb (wisely) প্রয়োজন।'
      },
      {
        id: 'm-6-2',
        incorrect: 'Health is wealth+y.',
        correct: 'Health is wealth.',
        explanationBn: 'Be verb এর পর এখানে Noun (wealth) বসবে, Adjective (wealthy) নয়।'
      },
      {
        id: 'm-6-3',
        incorrect: 'Smoking is harm to health.',
        correct: 'Smoking is harmful to health.',
        explanationBn: 'Be verb (is) এর পর Adjective (harmful) বসবে।'
      }
    ],
    examTips: [
      'স্পেলিং রুলস খেয়াল রাখুন: y এর আগে consonant থাকলে y উঠে i হয় (যেমন: happy → happiness, beauty → beautiful)।',
      'উত্তরপত্রে শুধুমাত্র (a), (b), (c)... দিয়ে উত্তর শব্দগুলো লিখুন।'
    ]
  },
  {
    itemId: 7,
    itemNumber: 7,
    nameEn: 'Prepositions',
    nameBn: 'পদান্বয়ী অব্যয় (Prepositions)',
    part: 'Grammar',
    marks: '1x5 = 05 Marks (or 10 gaps)',
    badgeColor: 'teal',
    summaryBn: 'স্থান, সময়, দিক, কারণ এবং নির্দিষ্ট শব্দগুচ্ছের Appropriate Preposition ব্যবহার করে শূন্যস্থান পূরণ করা।',
    quickShortcuts: [
      'Time: at 5 PM (নির্দিষ্ট সময়), on Friday/17th March (দিন/তারিখ), in 2026/May (বছর/মাস)',
      'Place: at Betagi (ছোট স্থান), in Dhaka (বড় শহর/দেশ)',
      'Movement: into (বাইরে থেকে ভেতরে), out of (ভেতর থেকে বাইরে), through (ভেতর দিয়ে)',
      'Between (দুইয়ের মধ্যে) vs Among (অনেকের মধ্যে)'
    ],
    rules: [
      {
        id: '7-1',
        ruleTitle: 'Appropriate Prepositions (সর্বাধিক পরীক্ষিত)',
        ruleBn: 'কিছু Word এর পর নির্দিষ্ট Preposition ই বসে: addicted to, abide by, aim at, proud of, depend on, rely on, good at, fond of, belong to, look for, key to, believe in।',
        formula: 'Fixed Verb/Adj + [Appropriate Preposition]',
        exampleEn: 'Hard work is the key to success. / He is good at English.',
        exampleBn: 'কঠোর পরিশ্রমই সাফল্যের চাবিকাঠি। / সে ইংরেজিতে ভালো।'
      },
      {
        id: '7-2',
        ruleTitle: 'Time (সময়) এর Preposition',
        ruleBn: 'In: বছর, মাস, ঋতু, শতাব্দী (in 2026, in summer, in May)\nOn: বার বা তারিখ (on Sunday, on 26th March)\nAt: ঘড়ির নির্দিষ্ট সময়, রাত, ভোর (at 7 o\'clock, at night, at dawn)',
        formula: 'at [precise time] | on [days & dates] | in [months, years, seasons]',
        exampleEn: 'He will meet me at 4 PM on Monday in October.',
        exampleBn: 'সে অক্টোবরের সোমবারে বিকেল ৪টায় আমার সাথে দেখা করবে।'
      },
      {
        id: '7-3',
        ruleTitle: 'Die of / from / for / by এর পার্থক্য',
        ruleBn: 'রোগে মারা গেলে: die of (cholera/cancer)\nঅতিরিক্ত খাওয়া/আঘাতে: die from (overeating)\nদেশের জন্য আত্মত্যাগ: die for (the country)\nদুর্ঘটনা বা বিষপানে: die by (accident/poison)',
        formula: 'die [of disease / from effect / for noble cause / by accident]',
        exampleEn: 'He died of cancer. / The martyrs died for the country.',
        exampleBn: 'তিনি ক্যান্সারে মারা গেলেন। / শহীদরা দেশের জন্য জীবন দিয়েছিলেন।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-7-1',
        incorrect: 'He prevented me to go there.',
        correct: 'He prevented me from going there.',
        explanationBn: '"prevent" এর পর "from + V-ing" বসে, "to + V1" নয়।'
      },
      {
        id: 'm-7-2',
        incorrect: 'Distribute the mangoes between the five boys.',
        correct: 'Distribute the mangoes among the five boys.',
        explanationBn: 'দুইয়ের বেশির ক্ষেত্রে "among" বসে এবং কেবল দুইজনের ক্ষেত্রে "between" বসে।'
      },
      {
        id: 'm-7-3',
        incorrect: 'I prefer tea than coffee.',
        correct: 'I prefer tea to coffee.',
        explanationBn: '"prefer" এবং "senior, junior, prior, superior" এর পর "to" বসে, "than" নয়।'
      }
    ],
    examTips: [
      'প্যাসেজের বাক্যটিতে কোনো নির্দিষ্ট ফিক্সড ফ্রেজ (যেমন: in order to, in front of, on behalf of) আছে কিনা লক্ষ্য করুন।',
      'প্রিপজিশনের পর Verb আসলে তাতে ing যুক্ত করতে ভুলবেন না।'
    ]
  },
  {
    itemId: 8,
    itemNumber: 8,
    nameEn: 'Sentence Connectors',
    nameBn: 'বাক্য সংযোগকারী (Connectors & Linkers)',
    part: 'Grammar',
    marks: '1x5 = 05 Marks (or 10 gaps)',
    badgeColor: 'indigo',
    summaryBn: 'প্যাসেজের একাধিক বাক্য বা ভাবকে যৌক্তিকভাবে যুক্ত করার জন্য উপযুক্ত Conjunctions ও Linking words ব্যবহার।',
    quickShortcuts: [
      'Addition: Moreover, Furthermore, Besides, In addition, Also',
      'Contrast: However, But, On the other hand, In contrast, Though, Although',
      'Result/Consequence: Therefore, As a result, Consequently, So, Thus, For this reason',
      'Sequence: Firstly, Secondly, At first, Then, Next, Finally, At last',
      'Example: For example, For instance, Such as',
      'Conclusion: In fine, In conclusion, To sum up, Overall'
    ],
    rules: [
      {
        id: '8-1',
        ruleTitle: 'কারণ ও ফলাফল নির্দেশক (Cause & Effect)',
        ruleBn: 'আগের বাক্যের ফলাফলের জন্য Therefore, As a result, Consequently, So বসে। আর কারণ বর্ণনার জন্য Because, Since, As বসে।',
        formula: 'Cause sentence → [Therefore / As a result / Consequently], Effect sentence',
        exampleEn: 'He did not study regularly. As a result, he failed in the examination.',
        exampleBn: 'সে নিয়মিত পড়াশোনা করেনি। ফলে সে পরীক্ষায় অকৃতকার্য হলো।'
      },
      {
        id: '8-2',
        ruleTitle: 'বিপরীত ভাব প্রকাশে (Contrast Linkers)',
        ruleBn: 'পূর্বের বক্তব্যের বিপরীত কিছু বলতে However, On the other hand, On the contrary, But, Nevertheless বসে। বাক্যের শুরুতে বসলে কমা (,) বসে।',
        formula: 'Statement 1. [However / On the other hand], Opposite statement.',
        exampleEn: 'He is very rich. However, he is a miser and unhappy.',
        exampleBn: 'তিনি খুব ধনী। কিন্তু তিনি কৃপণ এবং অসুখী।'
      },
      {
        id: '8-3',
        ruleTitle: 'অতিরিক্ত তথ্য সংযোজনে (Addition Linkers)',
        ruleBn: 'একই বিষয়ের ওপর আরও তথ্য দিতে Moreover, Furthermore, Besides, In addition, Not only...but also বসে।',
        formula: 'Point 1. [Moreover / Besides / Furthermore], Point 2.',
        exampleEn: 'Morning walk is good for health. Moreover, it refreshes our mind.',
        exampleBn: 'সকালের হাঁটা স্বাস্থ্যের জন্য ভালো। অধিকন্তু, এটি আমাদের মনকে সতেজ করে।'
      },
      {
        id: '8-4',
        ruleTitle: 'ধারাবাহিকতা বর্ণনায় (Sequential Linkers)',
        ruleBn: 'কোনো প্রক্রিয়া বা যুক্তি পর্যায়ক্রমে উপস্থাপনে Firstly, Secondly, Thirdly, Then, After that, Finally বসে।',
        formula: '[Firstly], ... [Secondly], ... [Finally], ...',
        exampleEn: 'Firstly, we should plant more trees. Finally, we should protect forests.',
        exampleBn: 'প্রথমত আমাদের আরও গাছ লাগানো উচিত। পরিশেষে আমাদের বন রক্ষা করা উচিত।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-8-1',
        incorrect: 'Though he is poor, but he is honest.',
        correct: 'Though he is poor, he is honest. (or: He is poor, but he is honest.)',
        explanationBn: 'একই সাথে "Though" এবং "but" ব্যবহার করা মারাত্মক ব্যাকরণগত ভুল (Double Conjunction error)।'
      },
      {
        id: 'm-8-2',
        incorrect: 'He was ill. Because he could not attend the class.',
        correct: 'He was ill. Therefore, he could not attend the class.',
        explanationBn: 'এখানে অসুস্থতার "ফলাফল" হিসেবে অনুপস্থিত ছিল, তাই "Therefore" বা "As a result" হবে, "Because" নয়।'
      }
    ],
    examTips: [
      'লিংকার যদি নতুন বাক্যের শুরুতে বসে, তবে প্রথম অক্ষরটি অবশ্যই Capital Letter (বড় হাতের) দিয়ে শুরু করতে হবে এবং পরে কমা বসবে (e.g., Moreover, / Therefore,)।',
      'পূর্বের বাক্য ও পরের বাক্যের মধ্যে অর্থের সম্পর্ক (কারণ, বৈপরীত্য, মিল, নাকি ক্রমান্বয়) যাচাই করে লিংকার বসান।'
    ]
  },
  {
    itemId: 9,
    itemNumber: 9,
    nameEn: 'Punctuation and Capitalization',
    nameBn: 'বিরামচিহ্ন ও বড় হাতের অক্ষরের ব্যবহার',
    part: 'Grammar',
    marks: '1x5 = 05 Marks',
    badgeColor: 'rose',
    summaryBn: 'প্যাসেজে উপযুক্ত স্থানে ফুলস্টপ, কমা, ইনভার্টেড কমা, প্রশ্নবোধক চিহ্ন, অ্যাপোস্ট্রফি এবং বড় হাতের অক্ষরের (Capital Letter) সঠিক প্রয়োগ।',
    quickShortcuts: [
      'Capital Letters: বাক্যের শুরুতে, Proper Noun (ব্যক্তি, দেশ, নদীর নাম), বার/মাসের নাম, উপাধি, "I" (আমি অর্থে)',
      'Direct Speech / Dialogue: "Speaker\'s exact words," said the man.',
      'Apostrophe: Contractions (can\'t, don\'t, it\'s) ও Possessive (student\'s book, teachers\' room)',
      'Question Mark (?): Direct Question এর শেষে'
    ],
    rules: [
      {
        id: '9-1',
        ruleTitle: 'Direct Speech (প্রত্যক্ষ উক্তি ও ইনভার্টেড কমা)',
        ruleBn: 'বক্তার হুবহু কথাকে ইনভার্টেড কমা ("...") এর মধ্যে রাখতে হবে। ইনভার্টেড কমার ভেতরের প্রথম অক্ষরটি সর্বদা Capital Letter হবে এবং ভেতরেই কমা/ফুলস্টপ/প্রশ্নবোধক চিহ্ন বসবে।',
        formula: 'Reporting Verb, "[Capital Letter ... ,/?/!]" said Speaker.',
        exampleEn: '"Why are you crying, my child?" asked the kind woman.',
        exampleBn: '"তুমি কাঁদছ কেন বাছা?" দয়ালু মহিলাটি জিজ্ঞেস করলেন।'
      },
      {
        id: '9-2',
        ruleTitle: 'Capitalization এর বিশেষ ক্ষেত্রসমূহ',
        ruleBn: '১. প্রতিটি নতুন বাক্যের প্রথম বর্ণ\n২. Proper Noun (Ismail, Bangladesh, Padma, Quran, English)\n৩. একা বসে "I" (আমি)\n৪. সৃষ্টিকর্তার নাম ও তাঁর Pronoun (Allah, God, He, His)\n৫. বার, মাস ও ঐতিহাসিক ঘটনার নাম (Friday, March, Liberation War)',
        formula: '[Capital Letter] for Proper Nouns, Start of Sentence, "I", Divine Pronouns',
        exampleEn: 'Ismail lives in Betagi. He prays to Allah for His blessing.',
        exampleBn: 'ইসমাইল বেতাগীতে বাস করে। সে আল্লাহর কাছে তাঁর রহমতের জন্য প্রার্থনা করে।'
      },
      {
        id: '9-3',
        ruleTitle: 'Apostrophe এর সঠিক ব্যবহার (Contractions & Possessive)',
        ruleBn: 'সংক্ষিপ্ত রূপ: don\'t, can\'t, I\'ve, he\'s, o\'clock।\nমালিকানা (Possessive): Singular Noun এর পর \'s (boy\'s pen)। কিন্তু s দিয়ে শেষ হওয়া Plural Noun এর পর শুধু \' বসে (boys\' school)।',
        formula: 'Singular: Noun + [\'s] | Plural ending in s: Noun + [\']',
        exampleEn: 'It\'s raining heavily. / This is a girls\' high school.',
        exampleBn: 'ভারী বৃষ্টি হচ্ছে। / এটি একটি বালিকা উচ্চ বিদ্যালয়।'
      },
      {
        id: '9-4',
        ruleTitle: 'Comma (কমা) এর ব্যবহার',
        ruleBn: '১. একই জাতীয় একাধিক শব্দের মাঝে\n২. সম্বোধন পদে (Salutation): Kamal, come here.\n৩. Yes / No এর পর\n৪. Reporting Verb এর পর\n৫. Clause আলাদা করতে (If you come, I will go.)',
        formula: 'Word, Word, and Word | [Yes/No], ... | [Vocative], ...',
        exampleEn: 'Yes, sir, I have finished my homework.',
        exampleBn: 'হ্যাঁ জনাব, আমি আমার বাড়ির কাজ সম্পন্ন করেছি।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-9-1',
        incorrect: '"why are you late"? asked the teacher',
        correct: '"Why are you late?" asked the teacher.',
        explanationBn: 'ইনভার্টেড কমার ভেতরের প্রথম অক্ষর W বড় হাতের হবে এবং প্রশ্নবোধক চিহ্নটি ইনভার্টেড কমার ভেতরেই থাকবে।'
      },
      {
        id: 'm-9-2',
        incorrect: 'Its a good idea.',
        correct: 'It\'s a good idea. (It is)',
        explanationBn: '"It is" এর সংক্ষিপ্ত রূপ "It\'s"। আর "Its" হলো possessive pronoun (ইহার)।'
      },
      {
        id: 'm-9-3',
        incorrect: 'i live in bangladesh with my father.',
        correct: 'I live in Bangladesh with my father.',
        explanationBn: '"I" (আমি অর্থে) এবং দেশের নাম (Bangladesh) সর্বদা Capital Letter হবে।'
      }
    ],
    examTips: [
      'উত্তরপত্রে পুরো প্যাসেজটি বিরামচিহ্ন ও বড় হাতের অক্ষর শুদ্ধ করে সুন্দর হস্তাক্ষরে লিখবেন।',
      'যেসব জায়গায় আপনি পরিবর্তন বা বিরামচিহ্ন বসিয়েছেন সেগুলোর নিচে হালকা আন্ডারলাইন করে দিলে পরীক্ষকের দেখতে সুবিধা হয়।'
    ]
  },
  {
    itemId: 10,
    itemNumber: 10,
    nameEn: 'Paragraph Writing',
    nameBn: 'অনুচ্ছেদ লিখন',
    part: 'Writing',
    marks: '10 Marks',
    badgeColor: 'emerald',
    summaryBn: 'প্রদত্ত প্রশ্নের (Question Prompts) উত্তর সমন্বয় করে নির্দিষ্ট বিষয়ের ওপর একটি একক প্যারায় (Single Paragraph) সুসংহত অনুচ্ছেদ তৈরি।',
    quickShortcuts: [
      'Strictly Single Paragraph (এক প্যারায় লিখতে হবে, কোনো প্যারা ভাগ করা যাবে না)',
      'Structure: Topic Sentence → Supporting Details & Evidence → Clincher / Concluding Sentence',
      'Word Count: 150 - 200 words',
      'Avoid point/bullet forms'
    ],
    rules: [
      {
        id: '10-1',
        ruleTitle: 'একটি মাত্র প্যারায় অনুচ্ছেদ লিখন',
        ruleBn: 'Paragraph এ কখনো একাধিক প্যারাগ্রাফ (Multiple Paragraphs) তৈরি করা যাবে না। শুরু থেকে শেষ পর্যন্ত একটানা একটি প্যারাগ্রাফেই লিখতে হবে।',
        formula: 'Title in Center → Single Solid Unified Paragraph (Topic + Body + Conclusion)',
        exampleEn: 'A Winter Morning\n[Single continuous paragraph of 150-200 words...]',
        exampleBn: 'শীতের সকাল — একটি একক পরিচ্ছন্ন অনুচ্ছেদে লিখতে হবে।'
      },
      {
        id: '10-2',
        ruleTitle: 'Topic Sentence ও প্রশ্নোত্তরের ধারাবাহিকতা',
        ruleBn: 'প্রথম বাক্যটি (Topic Sentence) অবশ্যই বিষয়ের মূল ভাব তুলে ধরবে। এরপর প্রশ্নে দেওয়া প্রশ্নগুলোর (Prompts) উত্তর ক্রমান্বয়ে দিয়ে অনুচ্ছেদটি সাজাতে হবে।',
        formula: 'Topic Sentence (Main Theme) → Answers to Question Prompts → Logical Flow',
        exampleEn: 'Tree plantation means planting more trees in a planned way.',
        exampleBn: 'বৃক্ষরোপণ বলতে পরিকল্পিতভাবে অধিক গাছ লাগানো বোঝায়।'
      },
      {
        id: '10-3',
        ruleTitle: 'সমাপ্তি বাক্য (Concluding / Clincher Sentence)',
        ruleBn: 'অনুচ্ছেদের শেষ বাক্যটি সম্পূর্ণ অনুচ্ছেদের একটি সারসংক্ষেপ বা সুপারিশমূলক সমাপনী ভাব প্রকাশ করবে।',
        formula: 'So, we all should come forward to ... / In fine, ...',
        exampleEn: 'Therefore, concerted efforts are needed to create mass awareness.',
        exampleBn: 'সুতরাং, গণসচেতনতা তৈরিতে সমন্বিত প্রচেষ্টা প্রয়োজন।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-10-1',
        incorrect: 'প্যারাগ্রাফকে Introduction, Body, Conclusion শিরোনাম দিয়ে একাধিক প্যারায় ভাগ করা।',
        correct: 'একক প্যারায় (Single Paragraph) কোনো সাব-হেডিং ছাড়া লেখা।',
        explanationBn: 'প্যারাগ্রাফে প্যারা ভাগ করলে বা পয়েন্ট দিলে নম্বর কাটা যায়।'
      },
      {
        id: 'm-10-2',
        incorrect: 'প্রশ্নে দেওয়া প্রশ্নগুলোর উত্তর না দিয়ে অপ্রাসঙ্গিক তথ্য লেখা।',
        correct: 'প্রশ্নের প্রতিটি Question Clue-র ক্রমান্বয়ে সুসংহত উত্তর অন্তর্ভুক্ত করা।',
        explanationBn: 'প্রশ্নের ক্লু-ভিত্তিক উত্তর দিলে পরীক্ষক পুরো নম্বর দেন।'
      }
    ],
    examTips: [
      'শিরোনাম (Title) খাতার মাঝখানে বড় ও স্পষ্ট করে লিখবেন।',
      'ব্যাকরণগত নির্ভুলতা, সমৃদ্ধ শব্দভাণ্ডার ও যতিচিহ্নের শুদ্ধ ব্যবহারে সর্বোচ্চ নম্বর নিশ্চিত হয়।'
    ]
  },
  {
    itemId: 11,
    itemNumber: 11,
    nameEn: 'Formal Letters & E-mails',
    nameBn: 'আবেদনপত্র ও ই-মেইল',
    part: 'Writing',
    marks: '10 Marks',
    badgeColor: 'blue',
    summaryBn: 'বিদ্যালয়ের প্রধান শিক্ষক, সরকারি কর্মকর্তা বা গণমাধ্যমের কাছে প্রাতিষ্ঠানিক আবেদনপত্র অথবা মানসম্মত ই-মেইল রচনা।',
    quickShortcuts: [
      'Formal Letter Parts: Date → The Designation (The Headmaster) → School Name & Address → Subject → Salutation (Sir,) → Body (With due respect...) → Subscription (Yours obediently) → Name & Roll',
      'E-mail Header: To:, Subject:, Salutation:, Body:, Closing:'
    ],
    rules: [
      {
        id: '11-1',
        ruleTitle: 'Formal Letter (Application) এর ৬টি অপরিহার্য অংশ',
        ruleBn: '১. Heading (Date, Designation, Institute, Address)\n২. Subject (সংক্ষিপ্ত ও স্পষ্ট)\n৩. Salutation (Sir / Respected Sir)\n৪. Body of the Letter (Opening, Request, Reason, Outcome)\n৫. Subscription (I remain, Sir, / Yours obediently / Yours faithfully)\n৬. Superscription (Name, Class, Roll, Section)',
        formula: 'Date → To The Headmaster → Subject: Prayer for [Topic] → Sir, → Body → Yours faithfully',
        exampleEn: 'Subject: Application for setting up a multimedia classroom.',
        exampleBn: 'বিষয়: মাল্টিমিডিয়া শ্রেণিকক্ষ স্থাপনের জন্য আবেদন।'
      },
      {
        id: '11-2',
        ruleTitle: 'E-mail লিখন কাঠামো',
        ruleBn: 'To: [receiver@example.com]\nSubject: [Clear, short topic]\nSalutation: Dear Mr. X / Dear Friend / Dear Sir,\nBody: [Concise message in 2-3 short paragraphs]\nClosing: Best regards / Yours sincerely, [Sender Name]',
        formula: 'To: ... | Subject: ... | Dear [Name], | Body | Regards, [Your Name]',
        exampleEn: 'To: headmaster.bgps@gmail.com\nSubject: Request for extra English classes',
        exampleBn: 'ই-মেইলে সুনির্দিষ্ট হেডার এবং প্রাতিষ্ঠানিক মার্জিত ভাষা ব্যবহার আবশ্যক।'
      },
      {
        id: '11-3',
        ruleTitle: 'বাম মার্জিনের সমান্তরাল বিন্যাস (Left-aligned Block Style)',
        ruleBn: 'আধুনিক ব্রিটিশ ও আন্তর্জাতিক নিয়ম অনুযায়ী আবেদনপত্রের প্রতিটি লাইন খাতার বাম মার্জিন ঘেঁষে (Left aligned) লিখতে হবে।',
        formula: 'All lines starting from the left margin without irregular indents.',
        exampleEn: 'Date, To, Subject, Sir, Body, Signature — all left-aligned.',
        exampleBn: 'সকল অংশ বাম মার্জিন বরাবর সোজা থাকবে।'
      }
    ],
    commonMistakes: [
      {
        id: 'm-11-1',
        incorrect: 'Subject: Application for a leave of absence please.',
        correct: 'Subject: Application for leave of absence.',
        explanationBn: 'Subject লাইনে "please", "kindly" ইত্যাদি ব্যবহার করা যায় না।'
      },
      {
        id: 'm-11-2',
        incorrect: 'Yours\' obediently (Apostrophe দিয়ে লেখা)।',
        correct: 'Yours obediently / Yours faithfully (No apostrophe)।',
        explanationBn: '"Yours" নিজেই একটি possessive pronoun, এতে কখনো অ্যাপোস্ট্রফি (\') বসবে না।'
      }
    ],
    examTips: [
      'আবেদনপত্র সবসময় পরীক্ষার খাতার এক পৃষ্ঠার মধ্যে (Single Page) শেষ করা সবচেয়ে উত্তম।',
      'প্রশ্নে কোনো কাল্পনিক নাম বা প্রতিষ্ঠানের নাম উল্লেখ থাকলে নিজের নাম না লিখে সেই নাম ব্যবহার করতে হবে।'
    ]
  },
  {
    itemId: 12,
    itemNumber: 12,
    nameEn: 'Composition Writing',
    nameBn: 'প্রবন্ধ রচনা',
    part: 'Writing',
    marks: '20 Marks',
    badgeColor: 'amber',
    summaryBn: 'একটি নির্ধারিত বিষয়ের ওপর ভূমিকা, বিভিন্ন অনুচ্ছেদে প্রাসঙ্গিক বর্ণনা, গুণ-দোষ বা গুরুত্ব এবং উপসংহার সংবলিত ২৫০ শব্দের বিশদ প্রবন্ধ।',
    quickShortcuts: [
      'Marks: 20 Marks (Highest weightage in SSC English 2nd Paper)',
      'Ideal Length: 250 - 300 words with 5-7 clear headings/sub-headings',
      'Structure: Introduction → Body paragraphs with Headings/Subheadings → Conclusion',
      'Use rich vocabulary, quotes, and transitional phrases'
    ],
    rules: [
      {
        id: '12-1',
        ruleTitle: 'প্রবন্ধের আদর্শ গঠন ও সাব-হেডিং',
        ruleBn: 'প্রবন্ধ রচনার প্রতিটি অংশ সুস্পষ্ট সাব-হেডিং (Sub-headings / Outlines) দিয়ে বিন্যস্ত করতে হবে।\n১. Introduction (ভূমিকা)\n২. Definition / Background (পটভূমি)\n৩. Merits / Utility / Importance (গুরুত্ব ও উপকারিতা)\n৪. Demerits / Challenges (সমস্যা বা চ্যালেঞ্জ)\n৫. Remedial Steps / Government initiatives (করণীয়)\n৬. Conclusion (উপসংহার)',
        formula: 'Title → Introduction → 4-5 Sub-headed Body Paragraphs → Conclusion',
        exampleEn: 'Duties of a Student: 1. Introduction 2. Primary Duty 3. Social Service 4. Conclusion',
        exampleBn: 'ছাত্রদের দায়িত্ব ও কর্তব্য প্রবন্ধের স্পষ্ট পয়েন্ট ভিত্তিক উপস্থাপনা।'
      },
      {
        id: '12-2',
        ruleTitle: 'ভূমিকা (Introduction) ও উপসংহার (Conclusion) এর ওজন',
        ruleBn: 'ভূমিকা হবে চিত্তাকর্ষক এবং বিষয়টির মৌলিক সংজ্ঞা সম্বলিত। উপসংহার হবে আশাবাদী, গঠনমূলক ও নীতিবাক্য সম্বলিত।',
        formula: 'Introduction (Hook + Thesis) & Conclusion (Summary + Forward-looking Vision)',
        exampleEn: 'In conclusion, we must remember that students of today are the leaders of tomorrow.',
        exampleBn: 'পরিশেষে মনে রাখতে হবে, আজকের ছাত্ররাই আগামী দিনের কর্ণধার।'
      },
      {
        id: '12-3',
        ruleTitle: 'উদ্ধৃতি ও প্রাসঙ্গিক প্রবাদ (Quotes & Proverbs)',
        ruleBn: 'প্রাসঙ্গিক স্থানে বিখ্যাত উক্তি বা প্রবাদ (যেমন: "Time and tide wait for none", "Industry is the mother of good luck") ব্যবহার করলে লেখার মান অনেক বৃদ্ধি পায়।',
        formula: 'Enrich paragraphs with authentic quotes and well-placed idioms.',
        exampleEn: 'As the proverb goes, "Health is the root of all happiness."',
        exampleBn: 'যেমনটি প্রবাদে আছে, "স্বাস্থ্যই সকল সুখের মূল।"'
      }
    ],
    commonMistakes: [
      {
        id: 'm-12-1',
        incorrect: 'কোনো হেডিং বা পয়েন্ট ছাড়া এক বা দুই প্যারায় অগোছালোভাবে রচনা লেখা।',
        correct: 'স্পষ্ট ও প্রাসঙ্গিক ৫-৭টি সাব-হেডিং দিয়ে সুবিন্যস্তভাবে রচনা সাজানো।',
        explanationBn: '২০ নম্বরের কম্পোজিশনে পয়েন্ট বা হেডিং না থাকলে পর্যাপ্ত নম্বর পাওয়া যায় না।'
      },
      {
        id: 'm-12-2',
        incorrect: 'একই কথার বারবার পুনরাবৃত্তি (Repetition of the same sentences)।',
        correct: 'প্রতিটি পয়েন্টে নতুন নতুন তথ্য, উদাহরণ ও যৌক্তিক ব্যাখ্যা দেওয়া।',
        explanationBn: 'তথ্যবহুল ও বৈচিত্র্যময় বাক্য ব্যবহারে পূর্ণ নম্বর অর্জন সম্ভব।'
      }
    ],
    examTips: [
      'কম্পোজিশন ২০ নম্বরের জন্য কমপক্ষে ৩ থেকে ৪ পৃষ্ঠা হওয়া উচিত।',
      'হেডিংগুলো নীল বা গাঢ় কালির কলম দিয়ে আন্ডারলাইন করে দিলে খাতা দৃষ্টিনন্দন দেখায়।'
    ]
  }
];
