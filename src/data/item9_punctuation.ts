import { PunctuationExercise } from '../types';

export const PUNCTUATION_MODEL_QUESTIONS: PunctuationExercise[] = [
  {
    id: 'punc-dhaka-2026',
    board: 'Dhaka Board 2026',
    title: 'Dhaka Board 2026 - Haji Mohammad Mohsin and the Starving Man',
    unpunctuatedPassage:
      'the man said to mohsin my family have been starving for a couple of days i have gone from door to door in quest of work but i have found no work mohsin said take the bunch of keys and open the almirah have as much money as you require',
    correctPassage:
      'The man said to Mohsin, "My family have been starving for a couple of days. I have gone from door to door in quest of work, but I have found no work." Mohsin said, "Take the bunch of keys and open the almirah. Have as much money as you require."',
    keyPunctuationPoints: [
      'Capitalize initial "The" and proper noun "Mohsin" in the reporting clause: "The man said to Mohsin,".',
      'Comma after reporting verb phrase "The man said to Mohsin," before opening quotation marks.',
      'Opening inverted commas before "My" and capital "M" in direct speech: \'"My family have been starving for a couple of days.\'.',
      'Full stop after "couple of days." followed by capital pronoun "I" in "I have gone...".',
      'Comma before coordinating conjunction "but" in "...in quest of work, but I have found no work.".',
      'Capital pronoun "I" in "but I have found no work." followed by terminal full stop inside closing inverted commas.',
      'Capital "Mohsin" for proper noun, comma after reporting clause "Mohsin said,", and opening inverted commas before "Take".',
      'Capital "Take" for imperative sentence, and full stop after "open the almirah.".',
      'Capital "Have" starting the next sentence, and terminal full stop inside closing quotation marks after "...as you require."',
    ],
    explanation:
      'Direct dialogue speeches must begin with capital letters and be enclosed within quotation marks ("..."). Reporting clauses are separated with commas. Proper nouns (Mohsin) and the personal pronoun "I" are always capitalized. Declarative and imperative sentences within direct speech end with full stops before closing quotation marks.',
    banglaMeaning:
      'লোকটি মহসীনকে বলল, "আমার পরিবার কয়েক দিন ধরে অনাহারে আছে। আমি কাজের সন্ধানে দ্বারে দ্বারে ঘুরেছি, কিন্তু কোনো কাজ পাইনি।" মহসীন বললেন, "চাবির গোছাটি নাও এবং আলমারিটি খোলো। তোমার যতটুকু টাকার প্রয়োজন নিয়ে নাও।"',
    banglaTranslation:
      'লোকটি মহসীনকে বলল, "আমার পরিবার কয়েক দিন ধরে অনাহারে আছে। আমি কাজের সন্ধানে দ্বারে দ্বারে ঘুরেছি, কিন্তু কোনো কাজ পাইনি।" মহসীন বললেন, "চাবির গোছাটি নাও এবং আলমারিটি খোলো। তোমার যতটুকু টাকার প্রয়োজন নিয়ে নাও।"',
  },
  {
    id: 'punc-chattogram-2026',
    board: 'Chattogram Board 2026',
    title: 'Chattogram Board 2026 - Mother and Son Dialogue about Rafiq',
    unpunctuatedPassage:
      'once my mother said to me who came to you my friend rafiq mom she asked what did he want i said his mother is ill he needs some money',
    correctPassage:
      'Once my mother said to me, "Who came to you?" "My friend Rafiq, Mom." She asked, "What did he want?" I said, "His mother is ill. He needs some money."',
    keyPunctuationPoints: [
      'Capital "Once" at the beginning of the passage.',
      'Comma after reporting clause "Once my mother said to me," before direct speech.',
      'Opening inverted commas and capital "Who" for the interrogative sentence.',
      'Question mark and closing inverted commas after "Who came to you?".',
      'Opening inverted commas, capital "My", and capital "Rafiq" for proper noun.',
      'Comma before vocative direct address and capital "Mom" followed by full stop and closing quotes: \'"My friend Rafiq, Mom."\'.',
      'Capital "She" beginning a new sentence and comma after reporting verb "asked,".',
      'Opening quotation marks, capital "What", and question mark inside closing quotes after "What did he want?".',
      'Capital "I" for personal pronoun and comma after reporting verb "said,".',
      'Opening quotes, capital "His", full stop after "ill.", capital "He", and full stop inside closing quotes after "money."',
    ],
    explanation:
      'Direct speeches in dialogue must be enclosed within quotation marks ("..."). The reporting clause is separated with a comma. Proper nouns (Rafiq) and vocative addresses (Mom) are capitalized. Sentences within speech begin with capital letters and end with appropriate punctuation marks (question mark, full stop) inside the quotes.',
    banglaMeaning:
      'একবার আমার মা আমাকে বললেন, "তোমার কাছে কে এসেছিল?" "আমার বন্ধু রফিক, মা।" তিনি জিজ্ঞাসা করলেন, "সে কী চেয়েছিল?" আমি বললাম, "তার মা অসুস্থ। তার কিছু টাকার প্রয়োজন।" ',
    banglaTranslation:
      'একবার আমার মা আমাকে বললেন, "তোমার কাছে কে এসেছিল?" "আমার বন্ধু রফিক, মা।" তিনি জিজ্ঞাসা করলেন, "সে কী চেয়েছিল?" আমি বললাম, "তার মা অসুস্থ। তার কিছু টাকার প্রয়োজন।" ',
  },
  {
    id: 'punc-cumilla-2026',
    board: 'Cumilla Board 2026',
    title: 'Cumilla Board 2026 - Teacher and Student Conversation on Study Progress',
    unpunctuatedPassage:
      'where is your mother I would like to talk to her about your progress in studies the teacher said to the student sorry sir I have forgotten to inform my mother the student replied',
    correctPassage:
      '"Where is your mother? I would like to talk to her about your progress in studies," the teacher said to the student. "Sorry, sir. I have forgotten to inform my mother," the student replied.',
    keyPunctuationPoints: [
      'Opening quotation marks and capital "Where" at the start of direct speech, question mark after "Where is your mother?".',
      'Capital "I" for personal pronoun, and comma inside closing quotation marks after "studies," before the reporting clause.',
      'Reporting clause "the teacher said to the student." ending with a period.',
      'Opening quotation marks, capital "Sorry", comma after "Sorry,", vocative noun "sir.", and capital "I" for personal pronoun.',
      'Comma inside closing quotation marks after "mother," before the reporting clause "the student replied." ending with a period.',
    ],
    explanation:
      'Direct speeches must be enclosed in quotation marks with capital initial letters. A question mark separates interrogative direct sentences, while commas separate spoken clauses from reporting verbs.',
    banglaMeaning:
      '"তোমার মা কোথায়? পড়াশোনায় তোমার অগ্রগতি সম্পর্কে আমি তাঁর সাথে কথা বলতে চাই," শিক্ষক ছাত্রটিকে বললেন। "দুঃখিত, স্যার। আমি আমার মাকে জানাতে ভুলে গেছি," ছাত্রটি উত্তর দিল।',
    banglaTranslation:
      '"তোমার মা কোথায়? পড়াশোনায় তোমার অগ্রগতি সম্পর্কে আমি তাঁর সাথে কথা বলতে চাই," শিক্ষক ছাত্রটিকে বললেন। "দুঃখিত, স্যার। আমি আমার মাকে জানাতে ভুলে গেছি," ছাত্রটি উত্তর দিল।',
  },
  {
    id: 'punc-rajshahi-2026',
    board: 'Rajshahi Board 2026',
    title: 'Rajshahi Board 2026 - The Honest Student and the Hundred Taka Note',
    unpunctuatedPassage:
      'in a certain school a student once found a one hundred taka note in the play ground he took it to his mother what shall i do with it asked the mother',
    correctPassage:
      'In a certain school, a student once found a one-hundred-taka note in the playground. He took it to his mother. "What shall I do with it?" asked the mother.',
    keyPunctuationPoints: [
      'Capitalize initial "In" and insert comma after the introductory adverbial phrase "In a certain school,".',
      'Full stop after "in the playground." followed by capital "H" in "He took it to his mother.".',
      'Direct question enclosed in quotation marks: opening inverted commas, capital "What", capital pronoun "I", question mark, and closing inverted commas: \'"What shall I do with it?"\'.',
      'Reporting clause ends with a full stop: "asked the mother.".',
    ],
    explanation:
      'Introductory prepositional phrases set the scene and take a comma. Complete declarative thoughts terminate in periods/full stops. Direct quoted speech is enclosed in quotation marks with capitalized beginnings, with internal punctuation (question marks) placed before the closing quotation marks.',
    banglaMeaning:
      'একটি নির্দিষ্ট বিদ্যালয়ে এক ছাত্র একবার খেলার মাঠে একশত টাকার একটি নোট পেয়েছিল। সে এটি তার মায়ের কাছে নিয়ে গেল। "আমি এটি দিয়ে কী করব?" মা জিজ্ঞাসা করলেন।',
    banglaTranslation:
      'একটি নির্দিষ্ট বিদ্যালয়ে এক ছাত্র একবার খেলার মাঠে একশত টাকার একটি নোট পেয়েছিল। সে এটি তার মায়ের কাছে নিয়ে গেল। "আমি এটি দিয়ে কী করব?" মা জিজ্ঞাসা করলেন।',
  },
  {
    id: 'punc-jashore-2026',
    board: 'Jashore Board 2026',
    title: 'Jashore Board 2026 - Dialogue between Librarian and Tamim on Wings of Fire',
    unpunctuatedPassage:
      'how can i help you the librarian says i need a book sir Wings of Fire by APJ Abdul Kalam tamim replies',
    correctPassage:
      '"How can I help you?" the librarian says. "I need a book, sir, \'Wings of Fire\' by APJ Abdul Kalam," Tamim replies.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "How", capital "I", and question mark inside closing quotation marks after "How can I help you?".',
      'Lower case in reporting clause "the librarian says" followed by a full stop.',
      'Opening quotation marks, capital "I", comma after vocative address "sir,", single/double quotes around book title "\'Wings of Fire\'", capital "APJ Abdul Kalam" for proper noun, and comma before closing quotes.',
      'Capital "Tamim" for proper noun and terminal full stop after "replies.".',
    ],
    explanation:
      'Direct speeches in dialogue are enclosed in quotation marks ("..."). Questions inside direct speech end with a question mark before closing quotation marks. The pronoun "I", book title "Wings of Fire", author name "APJ Abdul Kalam", and character name "Tamim" must be properly capitalized. Vocative direct address like "sir" is separated by commas.',
    banglaMeaning:
      '"আমি আপনাকে কীভাবে সাহায্য করতে পারি?" গ্রন্থাগারিক (লাইব্রেরিয়ান) বললেন। "স্যার, আমার একটি বই প্রয়োজন, এপিজে আবদুল কালামের \'উইংস অব ফায়ার\'," তামিম উত্তর দিল।',
    banglaTranslation:
      '"আমি আপনাকে কীভাবে সাহায্য করতে পারি?" গ্রন্থাগারিক (লাইব্রেরিয়ান) বললেন। "স্যার, আমার একটি বই প্রয়োজন, এপিজে আবদুল কালামের \'উইংস অব ফায়ার\'," তামিম উত্তর দিল।',
  },
  {
    id: 'punc-mymensingh-2026',
    board: 'Mymensingh Board 2026',
    title: 'Mymensingh Board 2026 - Dialogue between the Lion and the Mouse',
    unpunctuatedPassage:
      'how dare you wake me up the lion roared i shall kill you for that please let me go the mouse cried i did not mean to wake you up',
    correctPassage:
      '"How dare you wake me up?" the lion roared. "I shall kill you for that." "Please, let me go," the mouse cried. "I did not mean to wake you up."',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "How", and question mark inside closing quotation marks after "How dare you wake me up?" followed by reporting verb phrase "the lion roared.".',
      'Opening quotation marks, capital "I", and full stop inside closing quotes after "I shall kill you for that.".',
      'Opening quotation marks, capital "Please", comma after "Please,", and comma inside closing quotes before reporting clause "the mouse cried.".',
      'Opening quotation marks, capital "I", and terminal full stop inside closing quotes after "I did not mean to wake you up.".',
    ],
    explanation:
      'Direct dialogue utterances are enclosed within inverted commas (quotation marks) with capitalized initial words. Interrogative speech ends with a question mark before closing quotes. Polite interjections like "Please" take commas, and the pronoun "I" is capitalized.',
    banglaMeaning:
      '"তুমি কোন সাহসে আমাকে ঘুম থেকে জাগালে?" সিংহটি গর্জন করে উঠল। "এ জন্য আমি তোমাকে মেরে ফেলব।" "দয়া করে আমাকে ছেড়ে দিন," ইঁদুরটি কেঁদে বলল। "আমি ইচ্ছে করে আপনার ঘুম ভাঙাতে চাইনি।"',
    banglaTranslation:
      '"তুমি কোন সাহসে আমাকে ঘুম থেকে জাগালে?" সিংহটি গর্জন করে উঠল। "এ জন্য আমি তোমাকে মেরে ফেলব।" "দয়া করে আমাকে ছেড়ে দিন," ইঁদুরটি কেঁদে বলল। "আমি ইচ্ছে করে আপনার ঘুম ভাঙাতে চাইনি।"',
  },
  {
    id: 'punc-dinajpur-2026',
    board: 'Dinajpur Board 2026',
    title: 'Dinajpur Board 2026 - Dialogue between Momin and Feroz on Winter Vacation',
    unpunctuatedPassage:
      'what are you going to do in the coming winter vacation said momin to feroz i will visit some historic and interesting places of bangladesh with my family and you replied feroz momin said excellent decision',
    correctPassage:
      '"What are you going to do in the coming winter vacation?" said Momin to Feroz. "I will visit some historic and interesting places of Bangladesh with my family, and you?" replied Feroz. Momin said, "Excellent decision!"',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "What", and question mark inside quotation marks after "winter vacation?".',
      'Capital proper nouns "Momin" and "Feroz", ending reporting clause with full stop "said Momin to Feroz.".',
      'Opening quotation marks, capital pronoun "I", capital proper noun "Bangladesh", comma before "and you?", and question mark inside quotes after "and you?".',
      'Reporting clause "replied Feroz." with capital "Feroz" and full stop.',
      'Capital "Momin", comma after "Momin said,", opening quotation marks, capital "Excellent", and exclamation mark inside quotes after "decision!".',
    ],
    explanation:
      'Direct speeches are enclosed in quotation marks. Proper nouns such as Momin, Feroz, and Bangladesh, as well as the pronoun "I", must be capitalized. Questions end with question marks within quotes, and enthusiastic or appreciative remarks like "Excellent decision!" appropriately take an exclamation mark.',
    banglaMeaning:
      '"আসন্ন শীতের ছুটিতে তুমি কী করতে যাচ্ছ?" মোমিন ফিরোজকে বলল। "আমি আমার পরিবারের সাথে বাংলাদেশের কিছু ঐতিহাসিক ও আকর্ষণীয় স্থান পরিদর্শন করব, আর তুমি?" ফিরোজ উত্তর দিল। মোমিন বলল, "চমৎকার সিদ্ধান্ত!"',
    banglaTranslation:
      '"আসন্ন শীতের ছুটিতে তুমি কী করতে যাচ্ছ?" মোমিন ফিরোজকে বলল। "আমি আমার পরিবারের সাথে বাংলাদেশের কিছু ঐতিহাসিক ও আকর্ষণীয় স্থান পরিদর্শন করব, আর তুমি?" ফিরোজ উত্তর দিল। মোমিন বলল, "চমৎকার সিদ্ধান্ত!"',
  },
  {
    id: 'punc-sylhet-2026',
    board: 'Sylhet Board 2026',
    title: 'Sylhet Board 2026 - Dialogue on Plan After the Examination',
    unpunctuatedPassage:
      'what is your plan after the examination said i we have decided to visit our home town mamun replied',
    correctPassage:
      '"What is your plan after the examination?" said I. "We have decided to visit our home town," Mamun replied.',
    keyPunctuationPoints: [
      'Opening inverted commas, capital "W" in "What", and question mark inside quotation marks after "examination?".',
      'Capital pronoun "I" in "said I." followed by a full stop.',
      'Opening inverted commas, capital "W" in "We", and comma inside closing quotes after "home town,".',
      'Capital "M" in proper noun "Mamun", and full stop after "replied.".',
    ],
    explanation:
      'Direct speeches in dialogue must be enclosed within quotation marks ("..."). The question sentence ends with a question mark inside the quote. The pronoun "I" and the proper noun "Mamun" must be capitalized. The declarative statement ends with a comma inside quotes before the reporting clause "Mamun replied."',
    banglaMeaning:
      '"পরীক্ষার পর তোমার কী পরিকল্পনা?" আমি বললাম। "আমরা আমাদের নিজ শহরে বেড়াতে যাওয়ার সিদ্ধান্ত নিয়েছি," মামুন উত্তর দিল।',
    banglaTranslation:
      '"পরীক্ষার পর তোমার কী পরিকল্পনা?" আমি বললাম। "আমরা আমাদের নিজ শহরে বেড়াতে যাওয়ার সিদ্ধান্ত নিয়েছি," মামুন উত্তর দিল।',
  },
  {
    id: 'punc-dakhil-2026',
    board: 'Dakhil Board 2026',
    title: 'Dakhil Board 2026 - Passage on Physical and Mental Health',
    unpunctuatedPassage:
      'who are happy those who have fit bodies are the happiest ones if we are physically sound we will be mentally sound too we need to take care of our health as well as be positive in thinking how lucky they are who are both ways fit',
    correctPassage:
      'Who are happy? Those who have fit bodies are the happiest ones. If we are physically sound, we will be mentally sound too. We need to take care of our health as well as be positive in thinking. How lucky they are who are both ways fit!',
    keyPunctuationPoints: [
      'Capital "Who" starting the passage, and question mark after "Who are happy?".',
      'Capital "Those" starting the answer, and full stop after "happiest ones.".',
      'Capital "If" starting conditional clause, comma after dependent clause "physically sound,", and full stop after "mentally sound too.".',
      'Capital "We" starting new sentence, and full stop after "positive in thinking.".',
      'Capital "How" starting exclamatory sentence, and exclamation mark after "both ways fit!".',
    ],
    explanation:
      'The passage starts with a rhetorical/interrogative question requiring a question mark. Declarative sentences conclude with full stops. A conditional complex sentence contains a comma after its dependent \'if\' clause ("If we are physically sound,"). An exclamatory statement conveying admiration or emotional emphasis ("How lucky they are...") concludes with an exclamation mark (!).',
    banglaMeaning:
      'কারা সুখী? যাদের সুস্থ ও নীরোগ শরীর আছে তারাই সবচেয়ে সুখী। আমরা যদি শারীরিকভাবে সুস্থ থাকি, তবে আমরা মানসিকভাবেও সুস্থ থাকব। আমাদের যেমন স্বাস্থ্যের যত্ন নিতে হবে, তেমনই চিন্তাভাবনায় ইতিবাচক হতে হবে। তারা কতই না ভাগ্যবান যারা উভয় দিক থেকেই সুস্থ!',
    banglaTranslation:
      'কারা সুখী? যাদের সুস্থ ও নীরোগ শরীর আছে তারাই সবচেয়ে সুখী। আমরা যদি শারীরিকভাবে সুস্থ থাকি, তবে আমরা মানসিকভাবেও সুস্থ থাকব। আমাদের যেমন স্বাস্থ্যের যত্ন নিতে হবে, তেমনই চিন্তাভাবনায় ইতিবাচক হতে হবে। তারা কতই না ভাগ্যবান যারা উভয় দিক থেকেই সুস্থ!',
  },
  {
    id: 'punc-barishal-2026',
    board: 'Barishal Board 2026',
    title: 'Barishal Board 2026 - Dialogue Greeting and Inquiring Gentlemen',
    unpunctuatedPassage:
      'suddenly a voice called out good morning gentlemen where are you going and what are you doing here oh nowhere and nothing',
    correctPassage:
      'Suddenly, a voice called out, "Good morning, gentlemen. Where are you going and what are you doing here?" "Oh, nowhere and nothing."',
    keyPunctuationPoints: [
      'Capital "Suddenly" and comma after introductory adverbial word "Suddenly,".',
      'Comma after reporting verb "called out,", and opening quotation marks for the direct speech.',
      'Capital "Good", comma after greeting phrase "Good morning,", and full stop after vocative "gentlemen." (or comma before question).',
      'Capital "Where", and question mark inside closing quotation marks after "here?" to mark the direct interrogative sentence.',
      'Opening quotation marks, capital "Oh", comma after interjection "Oh,", and full stop inside closing quotation marks after "nothing.".',
    ],
    explanation:
      'Direct dialogue sentences must be enclosed within quotation marks. Introductory phrases are punctuated with commas, greetings followed by direct questions require question marks, and responses are marked in separate quotes.',
    banglaMeaning:
      'হঠাৎ এক কণ্ঠস্বর ডেকে বলল, "সুপ্রভাত, ভদ্রমহোদয়গণ। আপনারা কোথায় যাচ্ছেন এবং এখানে কী করছেন?" "ওহ্, কোথাও নয় এবং বিশেষ কিছুই নয়।"',
    banglaTranslation:
      'হঠাৎ এক কণ্ঠস্বর ডেকে বলল, "সুপ্রভাত, ভদ্রমহোদয়গণ। আপনারা কোথায় যাচ্ছেন এবং এখানে কী করছেন?" "ওহ্, কোথাও নয় এবং বিশেষ কিছুই নয়।"',
  },
  {
    id: 'punc-dhaka-2024',
    board: 'Dhaka Board 2024',
    title: 'Dhaka Board 2024 - Dialogue between Abdullah and Mr. Rahman about Aesop\'s Fables',
    unpunctuatedPassage:
      'what kind of stories did aesop tell said abdullah fables replied mr rahman do you know what fables are no replied abdullah well continued mr rahman fables are stories with a message or a moral.',
    correctPassage:
      '"What kind of stories did Aesop tell?" said Abdullah. "Fables," replied Mr. Rahman. "Do you know what fables are?" "No," replied Abdullah. "Well," continued Mr. Rahman, "fables are stories with a message or a moral."',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "What", capital "Aesop" (proper noun), and question mark inside quotation marks after "Aesop tell?".',
      'Lower case "said", capital "Abdullah" (proper noun), and full stop after "said Abdullah.".',
      'Opening quotation marks, capital "Fables", comma inside quotation marks, and reporting clause "replied Mr. Rahman." with abbreviation dot and full stop.',
      'Opening quotation marks, capital "Do", and question mark inside quotation marks after "what fables are?".',
      'Opening quotation marks, capital "No", comma inside quotes, and reporting clause "replied Abdullah.".',
      'Direct dialogue continuation: \'"Well," continued Mr. Rahman, "fables are stories with a message or a moral."\' with commas isolating the speaker tag and final full stop inside inverted commas.',
    ],
    explanation:
      'Spoken direct dialogue must be enclosed in quotation marks. Proper nouns such as Aesop, Abdullah, and Rahman must be capitalized. Honorific abbreviations such as "Mr." take a period. When a speaker\'s sentence is interrupted by a reporting clause ("Well," continued Mr. Rahman, "..."), commas enclose the reporting clause and the second part begins with a lowercase letter if it continues the same sentence.',
    banglaMeaning:
      '"ঈশপ কী ধরনের গল্প বলতেন?" আব্দুল্লাহ বলল। "উপকথা (নীতিকথা)," জনাব রহমান উত্তর দিলেন। "তুমি কি জানো উপকথা কী?" "না," আব্দুল্লাহ উত্তর দিল। "বেশ," জনাব রহমান বলে চললেন, "উপকথা হলো এমন গল্প যাতে কোনো বার্তা বা নীতিশিক্ষা থাকে। "',
    banglaTranslation:
      '"ঈশপ কী ধরনের গল্প বলতেন?" আব্দুল্লাহ বলল। "উপকথা (নীতিকথা)," জনাব রহমান উত্তর দিলেন। "তুমি কি জানো উপকথা কী?" "না," আব্দুল্লাহ উত্তর দিল। "বেশ," জনাব রহমান বলে চললেন, "উপকথা হলো এমন গল্প যাতে কোনো বার্তা বা নীতিশিক্ষা থাকে। "',
  },
  {
    id: 'punc-rajshahi-2024',
    board: 'Rajshahi Board 2024',
    title: 'Rajshahi Board 2024 - Dialogue between Sumon and Mr. Jamal',
    unpunctuatedPassage:
      'do you know me yes i know you from my childhood. what’s your name my name is sumon thank you a lot said mr. Jamal.',
    correctPassage:
      '"Do you know me?" "Yes, I know you from my childhood." "What\'s your name?" "My name is Sumon." "Thank you a lot," said Mr. Jamal.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Do", and question mark inside quotation marks after "Do you know me?".',
      'Opening quotation marks, capital "Yes", comma after "Yes,", capital pronoun "I", and full stop inside quotes after "childhood.".',
      'Opening quotation marks, capital "What\'s" with apostrophe for contraction, and question mark inside quotes after "name?".',
      'Opening quotation marks, capital "My", capital "Sumon" (proper noun), and full stop inside quotes after "Sumon.".',
      'Opening quotation marks, capital "Thank", comma inside quotes after "a lot,", lower case "said", abbreviation period in "Mr.", capital "Jamal", and ending full stop.',
    ],
    explanation:
      'Every direct speech turn is enclosed within quotation marks. Yes/No introductory words take a comma. The personal pronoun "I", proper nouns (Sumon, Jamal), and honorifics (Mr.) must always be capitalized. Contractions (What\'s) require an apostrophe.',
    banglaMeaning:
      '"আপনি কি আমাকে চেনেন?" "হ্যাঁ, আমি শৈশব থেকেই তোমাকে চিনি।" "তোমার নাম কী?" "আমার নাম সুমন।" "তোমাকে অনেক ধন্যবাদ," জনাব জামাল বললেন।',
    banglaTranslation:
      '"আপনি কি আমাকে চেনেন?" "হ্যাঁ, আমি শৈশব থেকেই তোমাকে চিনি।" "তোমার নাম কী?" "আমার নাম সুমন।" "তোমাকে অনেক ধন্যবাদ," জনাব জামাল বললেন।',
  },
  {
    id: 'punc-chattogram-2024',
    board: 'Chattogram Board 2024',
    title: 'Chattogram Board 2024 - Teacher and Girl Dialogue on Honesty',
    unpunctuatedPassage:
      'the teacher said to the girl do you think that honesty is the best policy yes sir i think so said the girl then learn to be honest from your childhood thank you sir said the girl may allah bless you said the teacher',
    correctPassage:
      'The teacher said to the girl, "Do you think that honesty is the best policy?" "Yes, sir, I think so," said the girl. "Then learn to be honest from your childhood." "Thank you, sir," said the girl. "May Allah bless you," said the teacher.',
    keyPunctuationPoints: [
      'Capital "The" at the start, comma after reporting clause "The teacher said to the girl," before opening quotation marks.',
      'Capital "Do" and question mark inside closing quotation marks after "best policy?".',
      'Opening quotation marks, capital "Yes", commas setting off vocative address "sir" ("Yes, sir, I think so,"), capital pronoun "I", and comma inside closing quotes before "said the girl.".',
      'Opening quotation marks, capital "Then", and full stop inside quotes after "childhood.".',
      'Opening quotation marks, capital "Thank", comma before vocative "sir,", and comma inside quotes before "said the girl.".',
      'Opening quotation marks, capital "May", capital "Allah" for the Creator, comma inside quotes after "bless you,", and full stop after "said the teacher.".',
    ],
    explanation:
      'Direct speeches in dialogue are enclosed in quotation marks. Polite vocatives like "sir" are set off by commas. Proper nouns including the divine name "Allah" and the pronoun "I" must always be capitalized. Declarative statements inside quotes end with commas before reporting clauses.',
    banglaMeaning:
      'শিক্ষক বালিকাটিকে বললেন, "তুমি কি মনে করো যে সততাই সর্বোৎকৃষ্ট পন্থা?" "হ্যাঁ স্যার, আমি তা-ই মনে করি," বালিকাটি বলল। "তাহলে শৈশব থেকেই সৎ হতে শেখো।" "ধন্যবাদ, স্যার," বালিকাটি বলল। "আল্লাহ তোমার মঙ্গল করুন," শিক্ষক বললেন।',
    banglaTranslation:
      'শিক্ষক বালিকাটিকে বললেন, "তুমি কি মনে করো যে সততাই সর্বোৎকৃষ্ট পন্থা?" "হ্যাঁ স্যার, আমি তা-ই মনে করি," বালিকাটি বলল। "তাহলে শৈশব থেকেই সৎ হতে শেখো।" "ধন্যবাদ, স্যার," বালিকাটি বলল। "আল্লাহ তোমার মঙ্গল করুন," শিক্ষক বললেন।',
  },
  {
    id: 'punc-sylhet-2024',
    board: 'Sylhet Board 2024',
    title: 'Sylhet Board 2024 - Teacher and Student Conversation on Regular Attendance',
    unpunctuatedPassage:
      'why don’t you attend classes regularly the teacher said to the boy you cannot expect good results unless you attend classes as i tell you i am sorry sir said the student',
    correctPassage:
      '"Why don\'t you attend classes regularly?" the teacher said to the boy. "You cannot expect good results unless you attend classes as I tell you." "I am sorry, sir," said the student.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Why", apostrophe in contraction "don\'t", and question mark inside quotes after "regularly?".',
      'Reporting clause in lowercase "the teacher said to the boy." ending with a period.',
      'Opening quotation marks, capital "You", capital pronoun "I" in "as I tell you.", and full stop inside closing quotation marks.',
      'Opening quotation marks, capital pronoun "I", comma before vocative "sir,", comma inside quotes, lowercase "said", and full stop after "the student.".',
    ],
    explanation:
      'Direct dialogue is placed in quotation marks. Interrogative sentences conclude with a question mark before the closing quote. Contractions (don\'t) require apostrophes. The pronoun "I" is always capitalized, and vocative addresses (sir) are set off with commas.',
    banglaMeaning:
      '"তুমি নিয়মিত ক্লাসে উপস্থিত থাকো না কেন?" শিক্ষক ছেলেটিকে বললেন। "আমি যেভাবে বলি সে অনুযায়ী ক্লাসে উপস্থিত না থাকলে তুমি ভালো ফলাফল আশা করতে পারো না।" "আমি অত্যন্ত দুঃখিত, স্যার," ছাত্রটি বলল।',
    banglaTranslation:
      '"তুমি নিয়মিত ক্লাসে উপস্থিত থাকো না কেন?" শিক্ষক ছেলেটিকে বললেন। "আমি যেভাবে বলি সে অনুযায়ী ক্লাসে উপস্থিত না থাকলে তুমি ভালো ফলাফল আশা করতে পারো না।" "আমি অত্যন্ত দুঃখিত, স্যার," ছাত্রটি বলল।',
  },
  {
    id: 'punc-barishal-2024',
    board: 'Barishal Board 2024',
    title: 'Barishal Board 2024 - Old Woman and Young Man Dialogue',
    unpunctuatedPassage:
      'the old woman said, can you give me some food i have been starving for three days the young man said why do you beg cant you work',
    correctPassage:
      'The old woman said, "Can you give me some food? I have been starving for three days." The young man said, "Why do you beg? Can\'t you work?"',
    keyPunctuationPoints: [
      'Capital "The" at the start, comma after reporting verb "said," and opening quotation marks before "Can".',
      'Capital "Can", question mark after "some food?", capital pronoun "I", and full stop inside closing quotation marks after "three days.".',
      'Capital "The young man said,", comma after "said,", and opening quotation marks before "Why".',
      'Capital "Why", question mark after "beg?", capital "Can\'t" with contraction apostrophe, and question mark inside closing quotation marks after "work?".',
    ],
    explanation:
      'Introductory reporting clauses end with commas before opening quotation marks. Direct questions end with question marks. Contractions (Can\'t) require apostrophes. Personal pronoun "I" and sentence-initial words are always capitalized.',
    banglaMeaning:
      'বৃদ্ধা মহিলাটি বললেন, "আপনি কি আমাকে কিছু খাবার দিতে পারেন? আমি তিন দিন ধরে অনাহারে আছি।" যুবকটি বলল, "তুমি ভিক্ষা করো কেন? কাজ করতে পারো না?"',
    banglaTranslation:
      'বৃদ্ধা মহিলাটি বললেন, "আপনি কি আমাকে কিছু খাবার দিতে পারেন? আমি তিন দিন ধরে অনাহারে আছি।" যুবকটি বলল, "তুমি ভিক্ষা করো কেন? কাজ করতে পারো না?"',
  },
  {
    id: 'punc-jashore-2024',
    board: 'Jashore Board 2024',
    title: 'Jashore Board 2024 - Father and Raju Dialogue on Feeling Feverish',
    unpunctuatedPassage:
      'won’t you go to school today raju he said dad i feel feverish i dont want to go to school ok take rest now said he.',
    correctPassage:
      '"Won\'t you go to school today, Raju?" he said. "Dad, I feel feverish. I don\'t want to go to school." "OK, take rest now," said he.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Won\'t" with apostrophe, comma before vocative name "Raju", capital "Raju" (proper noun), and question mark inside quotes after "Raju?".',
      'Reporting clause in lowercase "he said." ending with a full stop.',
      'Opening quotation marks, capital "Dad", comma after "Dad,", capital pronoun "I", and full stop after "feverish.".',
      'Capital pronoun "I", apostrophe in "don\'t", and full stop inside closing quotation marks after "school.".',
      'Opening quotation marks, capital "OK", comma after "OK,", comma inside quotes after "rest now,", and full stop after "said he.".',
    ],
    explanation:
      'Vocative nouns (Raju, Dad) are separated by commas. Contractions (Won\'t, don\'t) require apostrophes. Proper nouns (Raju) and personal pronoun "I" must be capitalized. Spoken speech turns are enclosed in quotation marks.',
    banglaMeaning:
      '"আজ কি তুমি স্কুলে যাবে না, রাজু?" সে বলল। "বাবা, আমার জ্বর জ্বর লাগছে। আমি স্কুলে যেতে চাই না।" "ঠিক আছে, এখন বিশ্রাম নাও," সে বলল।',
    banglaTranslation:
      '"আজ কি তুমি স্কুলে যাবে না, রাজু?" সে বলল। "বাবা, আমার জ্বর জ্বর লাগছে। আমি স্কুলে যেতে চাই না।" "ঠিক আছে, এখন বিশ্রাম নাও," সে বলল।',
  },
  {
    id: 'punc-cumilla-2024',
    board: 'Cumilla Board 2024',
    title: 'Cumilla Board 2024 - The Lion and the Mouse Dialogue',
    unpunctuatedPassage:
      'how dare you wake me up the lion roared i shall kill you for that please let me go the mouse cried.',
    correctPassage:
      '"How dare you wake me up?" the lion roared. "I shall kill you for that." "Please, let me go," the mouse cried.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "How", and question mark inside quotes after "wake me up?".',
      'Reporting clause in lowercase "the lion roared." ending with a full stop.',
      'Opening quotation marks, capital pronoun "I", and full stop inside quotes after "for that.".',
      'Opening quotation marks, capital "Please", comma after "Please,", comma inside quotes after "go,", and full stop after "the mouse cried.".',
    ],
    explanation:
      'Quotation marks enclose direct speech. Rhetorical questions require a question mark. Polite requests starting with "Please" use a comma to set off the interjection.',
    banglaMeaning:
      '"তুমি কোন সাহসে আমাকে ঘুম থেকে জাগালে?" সিংহটি গর্জন করে উঠল। "এ জন্য আমি তোমাকে মেরে ফেলব।" "দয়া করে আমাকে ছেড়ে দিন," ইঁদুরটি কেঁদে বলল।',
    banglaTranslation:
      '"তুমি কোন সাহসে আমাকে ঘুম থেকে জাগালে?" সিংহটি গর্জন করে উঠল। "এ জন্য আমি তোমাকে মেরে ফেলব।" "দয়া করে আমাকে ছেড়ে দিন," ইঁদুরটি কেঁদে বলল।',
  },
  {
    id: 'punc-dinajpur-2024',
    board: 'Dinajpur Board 2024',
    title: 'Dinajpur Board 2024 - Dialogue between Passenger and Speaker on Visiting Varsity',
    unpunctuatedPassage:
      'the man said to me where are you going i am going to Varsity said i did you go to Varsity yesterday no I replied why did you not go i was very busy said i.',
    correctPassage:
      'The man said to me, "Where are you going?" "I am going to Varsity," said I. "Did you go to Varsity yesterday?" "No," I replied. "Why did you not go?" "I was very busy," said I.',
    keyPunctuationPoints: [
      'Capital "The" at the start, comma after reporting clause "The man said to me," before quotes.',
      'Opening quotation marks, capital "Where", and question mark inside quotes after "Where are you going?".',
      'Opening quotation marks, capital pronoun "I", capital "Varsity", comma inside quotes, lowercase "said", and capital pronoun "I." with a period.',
      'Opening quotation marks, capital "Did", and question mark inside quotes after "Varsity yesterday?".',
      'Opening quotation marks, capital "No", comma inside quotes, and capital pronoun "I replied.".',
      'Opening quotation marks, capital "Why", and question mark inside quotes after "not go?".',
      'Opening quotation marks, capital pronoun "I", comma inside quotes after "busy,", lowercase "said", and capital pronoun "I." ending with a period.',
    ],
    explanation:
      'Direct dialogues must be enclosed in quotation marks. Questions terminate with question marks before closing inverted commas. The personal pronoun "I" is always capitalized, both in direct speech and in reporting clauses ("said I").',
    banglaMeaning:
      'লোকটি আমাকে বলল, "তুমি কোথায় যাচ্ছ?" "আমি বিশ্ববিদ্যালয়ে যাচ্ছি," আমি বললাম। "তুমি কি গতকাল বিশ্ববিদ্যালয়ে গিয়েছিলে?" "না," আমি উত্তর দিলাম। "কেন যাওনি?" "আমি খুব ব্যস্ত ছিলাম," আমি বললাম।',
    banglaTranslation:
      'লোকটি আমাকে বলল, "তুমি কোথায় যাচ্ছ?" "আমি বিশ্ববিদ্যালয়ে যাচ্ছি," আমি বললাম। "তুমি কি গতকাল বিশ্ববিদ্যালয়ে গিয়েছিলে?" "না," আমি উত্তর দিলাম। "কেন যাওনি?" "আমি খুব ব্যস্ত ছিলাম," আমি বললাম।',
  },
  {
    id: 'punc-mymensingh-2024',
    board: 'Mymensingh Board 2024',
    title: 'Mymensingh Board 2024 - Meghla and Jhorna Dialogue about Airport Reception',
    unpunctuatedPassage:
      'hi Jhorna, Im coming to Bangladesh next month Will you receive me at the airport said Meghla. Dont worry Ill be there Jhorna said.',
    correctPassage:
      '"Hi Jhorna, I\'m coming to Bangladesh next month. Will you receive me at the airport?" said Meghla. "Don\'t worry, I\'ll be there," Jhorna said.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Hi", capital proper noun "Jhorna", and comma after "Jhorna,".',
      'Apostrophe and capital in contraction "I\'m", capital proper noun "Bangladesh", and full stop after "next month.".',
      'Capital "Will", and question mark inside quotes after "airport?".',
      'Reporting clause in lowercase "said", capital proper noun "Meghla.", and full stop.',
      'Opening quotation marks, capital "Don\'t" with contraction apostrophe, and comma after "worry,".',
      'Capital pronoun and contraction "I\'ll", comma inside quotes after "there,", capital proper noun "Jhorna", and full stop after "said.".',
    ],
    explanation:
      'Direct dialogue utterances are enclosed in quotation marks. Proper nouns (Jhorna, Bangladesh, Meghla) and pronoun contractions (I\'m, I\'ll, Don\'t) must be correctly capitalized and punctuated with apostrophes. Direct questions conclude with a question mark before closing quotation marks.',
    banglaMeaning:
      '"হাই ঝর্ণা, আমি আগামী মাসে বাংলাদেশে আসছি। তুমি কি বিমানবন্দরে আমাকে অভ্যর্থনা জানাতে আসবে?" মেঘলা বলল। "চিন্তা করো না, আমি সেখানে থাকব," ঝর্ণা বলল।',
    banglaTranslation:
      '"হাই ঝর্ণা, আমি আগামী মাসে বাংলাদেশে আসছি। তুমি কি বিমানবন্দরে আমাকে অভ্যর্থনা জানাতে আসবে?" মেঘলা বলল। "চিন্তা করো না, আমি সেখানে থাকব," ঝর্ণা বলল।',
  },
  {
    id: 'punc-dhaka-2023',
    board: 'Dhaka Board 2023',
    title: 'Dhaka Board 2023 - Mehdi and Nitu Dialogue on Visiting the Padma Bridge',
    unpunctuatedPassage:
      'mehdi said to nitu whats your programme after the text examination nitu said i have decided to visit the padma bridge what an excellent idea it is',
    correctPassage:
      'Mehdi said to Nitu, "What\'s your programme after the test examination?" Nitu said, "I have decided to visit the Padma Bridge." "What an excellent idea it is!"',
    keyPunctuationPoints: [
      'Capitalize initial "Mehdi" (proper noun), comma after reporting clause "Mehdi said to Nitu," before opening quotation marks.',
      'Opening quotation marks, capital "What\'s" with apostrophe for contraction, capital "Nitu" (proper noun), and question mark inside quotes after "test examination?".',
      'Capital "Nitu", comma after "Nitu said,", opening quotation marks, and capital pronoun "I".',
      'Capitalize proper noun "Padma Bridge", followed by full stop inside closing quotation marks.',
      'Opening quotation marks, capital "What", and exclamation mark inside quotes after "idea it is!", expressing admiration.',
    ],
    explanation:
      'Direct dialogue speeches are enclosed within inverted commas. Proper nouns (Mehdi, Nitu, Padma Bridge) are capitalized. The contraction "What\'s" requires an apostrophe. Exclamatory utterances conclude with an exclamation mark (!) within quotation marks.',
    banglaMeaning:
      'মেহেদী নিতুকে বলল, "টেস্ট পরীক্ষার পর তোমার কী পরিকল্পনা?" নিতু বলল, "আমি পদ্মা সেতু দেখতে যাওয়ার সিদ্ধান্ত নিয়েছি।" "কী চমৎকার একটি ভাবনা!"',
    banglaTranslation:
      'মেহেদী নিতুকে বলল, "টেস্ট পরীক্ষার পর তোমার কী পরিকল্পনা?" নিতু বলল, "আমি পদ্মা সেতু দেখতে যাওয়ার সিদ্ধান্ত নিয়েছি।" "কী চমৎকার একটি ভাবনা!"',
  },
  {
    id: 'punc-rajshahi-2023',
    board: 'Rajshahi Board 2023',
    title: 'Rajshahi Board 2023 - Mother and Child Dialogue about Rafiq\'s Illness',
    unpunctuatedPassage:
      'once my mother said to me who came to you my friend rafiq mom she asked what did he want i said his mother is ill he needs some money i have given him five hundred taka my mother said wonderful',
    correctPassage:
      'Once my mother said to me, "Who came to you?" "My friend Rafiq, Mom." She asked, "What did he want?" I said, "His mother is ill. He needs some money. I have given him five hundred taka." My mother said, "Wonderful!"',
    keyPunctuationPoints: [
      'Capital "Once", comma after reporting clause "Once my mother said to me,".',
      'Opening quotation marks, capital "Who", and question mark inside quotes after "Who came to you?".',
      'Opening quotation marks, capital "My", capital "Rafiq" (proper noun), comma before vocative direct address "Mom", and full stop inside quotes.',
      'Capital "She", comma after "asked,", opening quotation marks, capital "What", and question mark inside quotes after "want?".',
      'Capital pronoun "I", comma after "said,", opening quotes, capital "His", full stop after "ill.", capital "He", full stop after "money.", capital pronoun "I", and full stop inside quotes after "five hundred taka."',
      'Capital "My mother said,", comma after "said,", opening quotes, capital "Wonderful", and exclamation mark inside quotes after "Wonderful!".',
    ],
    explanation:
      'Direct speech turns are enclosed in quotation marks. Proper nouns (Rafiq) and direct vocative addresses (Mom) must be capitalized. Expressive interjections ("Wonderful!") require exclamation marks.',
    banglaMeaning:
      'একবার আমার মা আমাকে বললেন, "তোমার কাছে কে এসেছিল?" "আমার বন্ধু রফিক, মা।" তিনি জিজ্ঞাসা করলেন, "সে কী চেয়েছিল?" আমি বললাম, "তার মা অসুস্থ। তার কিছু টাকার প্রয়োজন। আমি তাকে পাঁচশত টাকা দিয়েছি।" আমার মা বললেন, "চমৎকার!"',
    banglaTranslation:
      'একবার আমার মা আমাকে বললেন, "তোমার কাছে কে এসেছিল?" "আমার বন্ধু রফিক, মা।" তিনি জিজ্ঞাসা করলেন, "সে কী চেয়েছিল?" আমি বললাম, "তার মা অসুস্থ। তার কিছু টাকার প্রয়োজন। আমি তাকে পাঁচশত টাকা দিয়েছি।" আমার মা বললেন, "চমৎকার!"',
  },
  {
    id: 'punc-jashore-2023',
    board: 'Jashore Board 2023',
    title: 'Jashore Board 2023 - Sheikh Saadi and the Nobleman on Hospitality and Dress',
    unpunctuatedPassage:
      'Why are you putting the foods in your pocket Sir? Why don\'t you eat? asked the nobleman I\'m doing the right thing My dress deserves these rich dishes replied Seikh Saadi. I\'m sorry I don\'t understand what you mean to say said the nobleman.',
    correctPassage:
      '"Why are you putting the foods in your pocket, Sir? Why don\'t you eat?" asked the nobleman. "I\'m doing the right thing. My dress deserves these rich dishes," replied Seikh Saadi. "I\'m sorry. I don\'t understand what you mean to say," said the nobleman.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Why", comma before polite vocative "Sir,", question mark after "Sir?".',
      'Capital "Why", contraction apostrophe in "don\'t", and question mark inside closing quotation marks after "eat?".',
      'Reporting clause in lowercase "asked the nobleman." ending with a full stop.',
      'Opening quotation marks, capital pronoun with contraction "I\'m", full stop after "right thing.", capital "My", comma inside quotes, lowercase "replied", capital proper noun "Seikh Saadi", and full stop.',
      'Opening quotation marks, capital "I\'m", full stop after "sorry.", capital pronoun "I", apostrophe in "don\'t", comma inside quotes, and full stop after "said the nobleman."',
    ],
    explanation:
      'Polite vocatives (Sir) are set off with commas. Proper nouns (Seikh Saadi) and personal pronouns (I, I\'m) are always capitalized. Inverted commas enclose each speaker\'s words.',
    banglaMeaning:
      '"জনাব, আপনি কেন খাবারগুলো আপনার পকেটে রাখছেন? আপনি খাচ্ছেন না কেন?" সম্ভ্রান্ত ব্যক্তিটি জিজ্ঞাসা করলেন। "আমি সঠিক কাজটিই করছি। আমার পোশাকই এই মূল্যবান খাবারের যোগ্য," শেখ সাদী উত্তর দিলেন। "আমি দুঃখিত। আপনি কী বোঝাতে চেয়েছেন আমি বুঝতে পারছি না," সম্ভ্রান্ত ব্যক্তিটি বললেন।',
    banglaTranslation:
      '"জনাব, আপনি কেন খাবারগুলো আপনার পকেটে রাখছেন? আপনি খাচ্ছেন না কেন?" সম্ভ্রান্ত ব্যক্তিটি জিজ্ঞাসা করলেন। "আমি সঠিক কাজটিই করছি। আমার পোশাকই এই মূল্যবান খাবারের যোগ্য," শেখ সাদী উত্তর দিলেন। "আমি দুঃখিত। আপনি কী বোঝাতে চেয়েছেন আমি বুঝতে পারছি না," সম্ভ্রান্ত ব্যক্তিটি বললেন।',
  },
  {
    id: 'punc-cumilla-2023',
    board: 'Cumilla Board 2023',
    title: 'Cumilla Board 2023 - Dialogue with Karim on Hospital Visit',
    unpunctuatedPassage:
      'Where are you going now Karim Said I am going to hospital My brother is ill Ive to stay with him in the hospital',
    correctPassage:
      '"Where are you going now?" Karim said, "I am going to hospital. My brother is ill. I\'ve to stay with him in the hospital."',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Where", and question mark inside quotes after "Where are you going now?".',
      'Capital proper noun "Karim", lowercase "said,", and comma after reporting verb.',
      'Opening quotation marks, capital pronoun "I", and full stop after "hospital.". ',
      'Capital "My", and full stop after "ill.". ',
      'Capital pronoun with apostrophe in contraction "I\'ve", and terminal full stop inside closing quotation marks after "hospital."',
    ],
    explanation:
      'Direct dialogue is enclosed in quotation marks. Questions terminate with question marks before closing inverted commas. Proper nouns (Karim) and the pronoun "I" (including contractions like "I\'ve") must be capitalized.',
    banglaMeaning:
      '"তুমি এখন কোথায় যাচ্ছ?" করিম বলল, "আমি হাসপাতালে যাচ্ছি। আমার ভাই অসুস্থ। আমাকে হাসপাতালে তার সাথে থাকতে হবে।" ',
    banglaTranslation:
      '"তুমি এখন কোথায় যাচ্ছ?" করিম বলল, "আমি হাসপাতালে যাচ্ছি। আমার ভাই অসুস্থ। আমাকে হাসপাতালে তার সাথে থাকতে হবে।" ',
  },
  {
    id: 'punc-chattogram-2023',
    board: 'Chattogram Board 2023',
    title: 'Chattogram Board 2023 - Cunning Fox and Other Foxes on Tails',
    unpunctuatedPassage:
      'My dear friends I am here to tell you about an important discovery said the cunning fox I have discovered that our tails are unnecessary How strange Is it unnecessary said the other foxes',
    correctPassage:
      '"My dear friends, I am here to tell you about an important discovery," said the cunning fox. "I have discovered that our tails are unnecessary." "How strange! Is it unnecessary?" said the other foxes.',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "My", comma after direct vocative address "My dear friends,", capital pronoun "I", comma inside closing quotes before "said the cunning fox.". ',
      'Full stop after "said the cunning fox." ',
      'Opening quotation marks, capital pronoun "I", and full stop inside closing quotes after "unnecessary."',
      'Opening quotation marks, capital "How", exclamation mark after "How strange!", capital "Is", question mark inside closing quotes after "unnecessary?", and full stop after "said the other foxes."',
    ],
    explanation:
      'Introductory vocative phrases ("My dear friends,") are separated by commas. Direct quoted speech is surrounded by quotation marks. Strong emotional remarks receive exclamation marks, and questions receive question marks inside the quotation marks.',
    banglaMeaning:
      '"আমার প্রিয় বন্ধুরা, আমি এখানে তোমাদের একটি গুরুত্বপূর্ণ আবিষ্কারের কথা জানাতে এসেছি," ধূর্ত শিয়ালটি বলল। "আমি আবিষ্কার করেছি যে আমাদের লেজগুলো একেবারেই অপ্রয়োজনীয়।" "কী অদ্ভুত! এটা কি সত্যিই অপ্রয়োজনীয়?" অন্যান্য শিয়ালরা বলল।',
    banglaTranslation:
      '"আমার প্রিয় বন্ধুরা, আমি এখানে তোমাদের একটি গুরুত্বপূর্ণ আবিষ্কারের কথা জানাতে এসেছি," ধূর্ত শিয়ালটি বলল। "আমি আবিষ্কার করেছি যে আমাদের লেজগুলো একেবারেই অপ্রয়োজনীয়।" "কী অদ্ভুত! এটা কি সত্যিই অপ্রয়োজনীয়?" অন্যান্য শিয়ালরা বলল।',
  },
  {
    id: 'punc-sylhet-2023',
    board: 'Sylhet Board 2023',
    title: 'Sylhet Board 2023 - Mainul Islam: The Qualified Farmer in Naogaon',
    unpunctuatedPassage:
      'Mainul Islam a qualified farmer in Naogaon. He lives in his village with his two brothers When he was asked What makes you decide to stay here in this village He replied Look its true that we could leave this village for a city life But it dinnt attract us',
    correctPassage:
      'Mainul Islam, a qualified farmer in Naogaon, lives in his village with his two brothers. When he was asked, "What makes you decide to stay here in this village?" he replied, "Look, it\'s true that we could leave this village for a city life, but it didn\'t attract us."',
    keyPunctuationPoints: [
      'Capital "Mainul Islam" (proper noun), commas enclosing appositive phrase "a qualified farmer in Naogaon," and capital "Naogaon" (district/town proper noun).',
      'Full stop after "with his two brothers." ',
      'Capital "When", comma after dependent adverbial clause "When he was asked,".',
      'Opening quotation marks, capital "What", and question mark inside quotes after "this village?".',
      'Lowercase "he replied,", comma after reporting verb.',
      'Opening quotation marks, capital "Look", comma after conversational interjection "Look,", apostrophe in contraction "it\'s", comma before conjunction "but", apostrophe in "didn\'t", and terminal period inside closing quotes.',
    ],
    explanation:
      'Appositives (noun phrases explaining another noun) are set off by commas. Proper nouns (Mainul Islam, Naogaon) are capitalized. Complex sentences with introductory adverbial clauses take commas. Direct dialogue is enclosed in quotation marks with appropriate internal punctuation.',
    banglaMeaning:
      'মাইনুল ইসলাম নওগাঁর একজন উচ্চশিক্ষিত কৃষক। তিনি তাঁর দুই ভাইয়ের সাথে তাঁর গ্রামেই বসবাস করেন। যখন তাঁকে জিজ্ঞাসা করা হয়েছিল, "কী আপনাকে এই গ্রামে থাকার সিদ্ধান্ত নিতে বাধ্য করল?" তিনি উত্তর দিয়েছিলেন, "দেখুন, এটা সত্যি যে আমরা শহরের জীবনের জন্য এই গ্রাম ছেড়ে চলে যেতে পারতাম, কিন্তু তা আমাদের আকর্ষণ করেনি। "',
    banglaTranslation:
      'মাইনুল ইসলাম নওগাঁর একজন উচ্চশিক্ষিত কৃষক। তিনি তাঁর দুই ভাইয়ের সাথে তাঁর গ্রামেই বসবাস করেন। যখন তাঁকে জিজ্ঞাসা করা হয়েছিল, "কী আপনাকে এই গ্রামে থাকার সিদ্ধান্ত নিতে বাধ্য করল?" তিনি উত্তর দিয়েছিলেন, "দেখুন, এটা সত্যি যে আমরা শহরের জীবনের জন্য এই গ্রাম ছেড়ে চলে যেতে পারতাম, কিন্তু তা আমাদের আকর্ষণ করেনি। "',
  },
  {
    id: 'punc-dinajpur-2023',
    board: 'Dinajpur Board 2023',
    title: 'Dinajpur Board 2023 - Mainul Islam: The Qualified Farmer in Naogaon',
    unpunctuatedPassage:
      'Mainul Islam a qualified farmer in Naogaon. He lives in his village with his two brothers When he was asked What makes you decide to stay here in this village He replied Look its true that we could leave this village for a city life But it dinnt attract us',
    correctPassage:
      'Mainul Islam, a qualified farmer in Naogaon, lives in his village with his two brothers. When he was asked, "What makes you decide to stay here in this village?" he replied, "Look, it\'s true that we could leave this village for a city life, but it didn\'t attract us."',
    keyPunctuationPoints: [
      'Capital "Mainul Islam" (proper noun), commas enclosing appositive phrase "a qualified farmer in Naogaon," and capital "Naogaon" (district/town proper noun).',
      'Full stop after "with his two brothers." ',
      'Capital "When", comma after dependent adverbial clause "When he was asked,".',
      'Opening quotation marks, capital "What", and question mark inside quotes after "this village?".',
      'Lowercase "he replied,", comma after reporting verb.',
      'Opening quotation marks, capital "Look", comma after conversational interjection "Look,", apostrophe in contraction "it\'s", comma before conjunction "but", apostrophe in "didn\'t", and terminal period inside closing quotes.',
    ],
    explanation:
      'Appositives (noun phrases explaining another noun) are set off by commas. Proper nouns (Mainul Islam, Naogaon) are capitalized. Complex sentences with introductory adverbial clauses take commas. Direct dialogue is enclosed in quotation marks with appropriate internal punctuation.',
    banglaMeaning:
      'মাইনুল ইসলাম নওগাঁর একজন উচ্চশিক্ষিত কৃষক। তিনি তাঁর দুই ভাইয়ের সাথে তাঁর গ্রামেই বসবাস করেন। যখন তাঁকে জিজ্ঞাসা করা হয়েছিল, "কী আপনাকে এই গ্রামে থাকার সিদ্ধান্ত নিতে বাধ্য করল?" তিনি উত্তর দিয়েছিলেন, "দেখুন, এটা সত্যি যে আমরা শহরের জীবনের জন্য এই গ্রাম ছেড়ে চলে যেতে পারতাম, কিন্তু তা আমাদের আকর্ষণ করেনি। "',
    banglaTranslation:
      'মাইনুল ইসলাম নওগাঁর একজন উচ্চশিক্ষিত কৃষক। তিনি তাঁর দুই ভাইয়ের সাথে তাঁর গ্রামেই বসবাস করেন। যখন তাঁকে জিজ্ঞাসা করা হয়েছিল, "কী আপনাকে এই গ্রামে থাকার সিদ্ধান্ত নিতে বাধ্য করল?" তিনি উত্তর দিয়েছিলেন, "দেখুন, এটা সত্যি যে আমরা শহরের জীবনের জন্য এই গ্রাম ছেড়ে চলে যেতে পারতাম, কিন্তু তা আমাদের আকর্ষণ করেনি। "',
  },
  {
    id: 'punc-mymensingh-2023',
    board: 'Mymensingh Board 2023',
    title: 'Mymensingh Board 2023 - Mainul Islam: The Qualified Farmer in Naogaon',
    unpunctuatedPassage:
      'Mainul Islam a qualified farmer in Naogaon. He lives in his village with his two brothers When he was asked What makes you decide to stay here in this village He replied Look its true that we could leave this village for a city life But it dinnt attract us',
    correctPassage:
      'Mainul Islam, a qualified farmer in Naogaon, lives in his village with his two brothers. When he was asked, "What makes you decide to stay here in this village?" he replied, "Look, it\'s true that we could leave this village for a city life, but it didn\'t attract us."',
    keyPunctuationPoints: [
      'Capital "Mainul Islam" (proper noun), commas enclosing appositive phrase "a qualified farmer in Naogaon," and capital "Naogaon" (district/town proper noun).',
      'Full stop after "with his two brothers." ',
      'Capital "When", comma after dependent adverbial clause "When he was asked,".',
      'Opening quotation marks, capital "What", and question mark inside quotes after "this village?".',
      'Lowercase "he replied,", comma after reporting verb.',
      'Opening quotation marks, capital "Look", comma after conversational interjection "Look,", apostrophe in contraction "it\'s", comma before conjunction "but", apostrophe in "didn\'t", and terminal period inside closing quotes.',
    ],
    explanation:
      'Appositives (noun phrases explaining another noun) are set off by commas. Proper nouns (Mainul Islam, Naogaon) are capitalized. Complex sentences with introductory adverbial clauses take commas. Direct dialogue is enclosed in quotation marks with appropriate internal punctuation.',
    banglaMeaning:
      'মাইনুল ইসলাম নওগাঁর একজন উচ্চশিক্ষিত কৃষক। তিনি তাঁর দুই ভাইয়ের সাথে তাঁর গ্রামেই বসবাস করেন। যখন তাঁকে জিজ্ঞাসা করা হয়েছিল, "কী আপনাকে এই গ্রামে থাকার সিদ্ধান্ত নিতে বাধ্য করল?" তিনি উত্তর দিয়েছিলেন, "দেখুন, এটা সত্যি যে আমরা শহরের জীবনের জন্য এই গ্রাম ছেড়ে চলে যেতে পারতাম, কিন্তু তা আমাদের আকর্ষণ করেনি। "',
    banglaTranslation:
      'মাইনুল ইসলাম নওগাঁর একজন উচ্চশিক্ষিত কৃষক। তিনি তাঁর দুই ভাইয়ের সাথে তাঁর গ্রামেই বসবাস করেন। যখন তাঁকে জিজ্ঞাসা করা হয়েছিল, "কী আপনাকে এই গ্রামে থাকার সিদ্ধান্ত নিতে বাধ্য করল?" তিনি উত্তর দিয়েছিলেন, "দেখুন, এটা সত্যি যে আমরা শহরের জীবনের জন্য এই গ্রাম ছেড়ে চলে যেতে পারতাম, কিন্তু তা আমাদের আকর্ষণ করেনি। "',
  },
  {
    id: 'punc-barishal-2023',
    board: 'Barishal Board 2023',
    title: 'Barishal Board 2023 - Mother and Son Dialogue about Going to School',
    unpunctuatedPassage:
      'why are not you going to school said mother to her son he said i am waiting for my friend to come and go to school together',
    correctPassage:
      '"Why are you not going to school?" said mother to her son. He said, "I am waiting for my friend to come and go to school together."',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Why", and question mark inside closing quotation marks after "going to school?".',
      'Lowercase "said", full stop after reporting clause "said mother to her son."',
      'Capital "He", comma after reporting verb "He said,", and opening quotation marks before direct speech.',
      'Capital pronoun "I", terminal full stop inside closing quotation marks after "together."',
    ],
    explanation:
      'Direct dialogue questions require quotation marks and question marks inside the quotes. Reporting clauses between two separate speakers conclude with full stops. The pronoun "I" and sentence-initial words are always capitalized.',
    banglaMeaning:
      '"তুমি স্কুলে যাচ্ছ না কেন?" মা তাঁর ছেলেকে বললেন। সে বলল, "আমি আমার বন্ধুর জন্য অপেক্ষা করছি যাতে সে এলে আমরা একসাথে স্কুলে যেতে পারি।"',
    banglaTranslation:
      '"তুমি স্কুলে যাচ্ছ না কেন?" মা তাঁর ছেলেকে বললেন। সে বলল, "আমি আমার বন্ধুর জন্য অপেক্ষা করছি যাতে সে এলে আমরা একসাথে স্কুলে যেতে পারি।"',
  },
  {
    id: 'punc-dhaka-2022',
    board: 'Dhaka Board 2022',
    title: 'Dhaka Board 2022 - Pied Piper and Mayor of Hamelin Dialogue',
    unpunctuatedPassage:
      'have you killed the rats said the mayor yes i have replied the piper give me the promised money how funny you are said the mayor take only fifty',
    correctPassage:
      '"Have you killed the rats?" said the mayor. "Yes, I have," replied the piper. "Give me the promised money." "How funny you are!" said the mayor. "Take only fifty."',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Have", and question mark inside quotes after "rats?".',
      'Reporting clause in lowercase "said the mayor." ending with a full stop.',
      'Opening quotation marks, capital "Yes", comma after "Yes,", capital pronoun "I", comma inside quotes, lowercase "replied the piper." ending with a period.',
      'Opening quotation marks, capital "Give", and full stop inside quotes after "promised money."',
      'Opening quotation marks, capital "How", exclamation mark after "How funny you are!", lowercase "said the mayor." ending with a period.',
      'Opening quotation marks, capital "Take", and terminal period inside closing quotes after "fifty."',
    ],
    explanation:
      'Direct speech is enclosed in quotation marks. Questions take question marks before the closing quote, while exclamations of amazement take exclamation marks. Commas set off Yes/No introductory words and separate speech from reporting verbs.',
    banglaMeaning:
      '"তুমি কি ইঁদুরগুলোকে মেরে ফেলেছ?" মেয়র বললেন। "হ্যাঁ, আমি মেরেছি," বাঁশিওয়ালা উত্তর দিল। "আমাকে প্রতিশ্রুত অর্থ দিন।" "তুমি কেমন রসিক লোক!" মেয়র বললেন। "কেবল পঞ্চাশ নাও।" ',
    banglaTranslation:
      '"তুমি কি ইঁদুরগুলোকে মেরে ফেলেছ?" মেয়র বললেন। "হ্যাঁ, আমি মেরেছি," বাঁশিওয়ালা উত্তর দিল। "আমাকে প্রতিশ্রুত অর্থ দিন।" "তুমি কেমন রসিক লোক!" মেয়র বললেন। "কেবল পঞ্চাশ নাও।" ',
  },
  {
    id: 'punc-rajshahi-2022',
    board: 'Rajshahi Board 2022',
    title: 'Rajshahi Board 2022 - Shohel and Alam on the National Memorial at Savar',
    unpunctuatedPassage:
      'Shoel asked Alam Friend have you ever visited the National Memorial at Savar in Dhaka Wow how Splendid it is Yes I havent yet gone there said Alam.',
    correctPassage:
      'Shoel asked Alam, "Friend, have you ever visited the National Memorial at Savar in Dhaka? Wow, how splendid it is!" "Yes, I haven\'t yet gone there," said Alam.',
    keyPunctuationPoints: [
      'Capital proper nouns "Shoel" and "Alam", comma after reporting clause "Shoel asked Alam,".',
      'Opening quotation marks, capital "Friend", comma after vocative address "Friend,", capital "National Memorial", "Savar", "Dhaka" for proper nouns, and question mark inside quotes after "Dhaka?".',
      'Capital "Wow", comma after "Wow,", exclamation mark inside quotes after "splendid it is!".',
      'Opening quotation marks, capital "Yes", comma after "Yes,", capital pronoun "I", contraction apostrophe in "haven\'t", comma inside quotes, lowercase "said", and capital proper noun "Alam." with full stop.',
    ],
    explanation:
      'Vocative direct addresses (Friend) and Yes/No interjections take commas. Proper nouns representing specific monuments, towns, and cities (National Memorial, Savar, Dhaka) must be capitalized. Expressive utterances take exclamation marks.',
    banglaMeaning:
      'সোহেল আলমকে জিজ্ঞাসা করল, "বন্ধু, তুমি কি কখনো ঢাকার সাভারে জাতীয় স্মৃতিসৌধ পরিদর্শন করেছ? বাহ্, এটি কতই না চমৎকার!" "হ্যাঁ, আমি এখনো সেখানে যাইনি," আলম বলল।',
    banglaTranslation:
      'সোহেল আলমকে জিজ্ঞাসা করল, "বন্ধু, তুমি কি কখনো ঢাকার সাভারে জাতীয় স্মৃতিসৌধ পরিদর্শন করেছ? বাহ্, এটি কতই না চমৎকার!" "হ্যাঁ, আমি এখনো সেখানে যাইনি," আলম বলল।',
  },
  {
    id: 'punc-jashore-2022',
    board: 'Jashore Board 2022',
    title: 'Jashore Board 2022 - Mother and Child Dialogue on Completing Assignment',
    unpunctuatedPassage:
      'go to bed now mother said you can complete your assignment in the morning no mom ill finish it now.',
    correctPassage:
      '"Go to bed now," mother said. "You can complete your assignment in the morning." "No, Mom, I\'ll finish it now."',
    keyPunctuationPoints: [
      'Opening quotation marks, capital "Go", comma inside quotes after "now,", lowercase "mother said." followed by a full stop.',
      'Opening quotation marks, capital "You", and full stop inside closing quotation marks after "morning."',
      'Opening quotation marks, capital "No", comma after "No,", capital vocative "Mom,", capital pronoun with contraction "I\'ll", and terminal full stop inside quotes after "now."',
    ],
    explanation:
      'Direct dialogue must be enclosed in quotation marks. Direct addresses like "Mom" are set off by commas and capitalized. Contractions like "I\'ll" require apostrophes.',
    banglaMeaning:
      '"এখন ঘুমাতে যাও," মা বললেন। "তুমি সকালে তোমার বাড়ির কাজটি শেষ করতে পারবে।" "না, মা, আমি এখনই এটি শেষ করব।" ',
    banglaTranslation:
      '"এখন ঘুমাতে যাও," মা বললেন। "তুমি সকালে তোমার বাড়ির কাজটি শেষ করতে পারবে।" "না, মা, আমি এখনই এটি শেষ করব।" ',
  },
  {
    id: 'punc-cumilla-2022',
    board: 'Cumilla Board 2022',
    title: 'Cumilla Board 2022 - Passage on Mr. Hasan the Renowned English Teacher',
    unpunctuatedPassage:
      'mr. hasan is a renowned english teacher he has been teaching in our school for the past five years he is honest and sincere he is our favourite teacher we love him much',
    correctPassage:
      'Mr. Hasan is a renowned English teacher. He has been teaching in our school for the past five years. He is honest and sincere. He is our favourite teacher. We love him much.',
    keyPunctuationPoints: [
      'Capital "Mr." with abbreviation period, capital proper noun "Hasan", capital proper adjective "English", and full stop after "teacher."',
      'Capital "He" starting new sentence, and full stop after "five years."',
      'Capital "He" starting new sentence, and full stop after "sincere."',
      'Capital "He" starting new sentence, and full stop after "favourite teacher."',
      'Capital "We" starting new sentence, and terminal full stop after "him much."',
    ],
    explanation:
      'Every complete declarative thought terminates in a full stop (period). Proper nouns (Hasan) and proper adjectives designating languages or nationalities (English) must begin with capital letters. Each new sentence begins with a capital letter.',
    banglaMeaning:
      'জনাব হাসান একজন প্রখ্যাত ইংরেজি শিক্ষক। তিনি বিগত পাঁচ বছর ধরে আমাদের বিদ্যালয়ে শিক্ষকতা করছেন। তিনি সৎ ও নিষ্ঠাবান। তিনি আমাদের প্রিয় শিক্ষক। আমরা তাঁকে খুব ভালোবাসি।',
    banglaTranslation:
      'জনাব হাসান একজন প্রখ্যাত ইংরেজি শিক্ষক। তিনি বিগত পাঁচ বছর ধরে আমাদের বিদ্যালয়ে শিক্ষকতা করছেন। তিনি সৎ ও নিষ্ঠাবান। তিনি আমাদের প্রিয় শিক্ষক। আমরা তাঁকে খুব ভালোবাসি।',
  },
  {
    id: 'punc-chattogram-2022',
    board: 'Chattogram Board 2022',
    title: 'Chattogram Board 2022 - Rich Banker and Poor Cobbler on Happiness and Earnings',
    unpunctuatedPassage:
      'Once a rich banker said to a poor cobbler How much do you earn a year The cobbler replied laughing I never count in this way I earn barely enough to pass a day And I’m happy Are you really happy said the banker.',
    correctPassage:
      'Once a rich banker said to a poor cobbler, "How much do you earn a year?" The cobbler replied laughing, "I never count in this way. I earn barely enough to pass a day, and I\'m happy." "Are you really happy?" said the banker.',
    keyPunctuationPoints: [
      'Capital "Once", comma after reporting clause "Once a rich banker said to a poor cobbler,".',
      'Opening quotation marks, capital "How", and question mark inside quotes after "year?".',
      'Capital "The", comma after reporting phrase "The cobbler replied laughing,".',
      'Opening quotation marks, capital pronoun "I", full stop after "this way.", capital pronoun "I", comma before "and", contraction apostrophe in "I\'m", and full stop inside quotes after "happy."',
      'Opening quotation marks, capital "Are", question mark inside quotes after "really happy?", lowercase "said the banker." ending with full stop.',
    ],
    explanation:
      'Direct dialogue is enclosed in quotation marks. Reporting clauses take commas before opening quotes. Direct questions conclude with question marks inside the inverted commas. The pronoun "I" and contractions (I\'m) are capitalized and apostrophized.',
    banglaMeaning:
      'একবার এক ধনী ব্যাংকার এক গরিব মুচিকে বলল, "তুমি বছরে কত উপার্জন করো?" মুচি হেসে উত্তর দিল, "আমি কখনো এভাবে হিসাব করি না। দিন পার করার মতো কোনোমতে আয় করি, এবং আমি এতেই সুখী।" "তুমি কি সত্যিই সুখী?" ব্যাংকার জিজ্ঞাসা করলেন।',
    banglaTranslation:
      'একবার এক ধনী ব্যাংকার এক গরিব মুচিকে বলল, "তুমি বছরে কত উপার্জন করো?" মুচি হেসে উত্তর দিল, "আমি কখনো এভাবে হিসাব করি না। দিন পার করার মতো কোনোমতে আয় করি, এবং আমি এতেই সুখী।" "তুমি কি সত্যিই সুখী?" ব্যাংকার জিজ্ঞাসা করলেন।',
  },
  {
    id: 'punc-sylhet-2022',
    board: 'Sylhet Board 2022',
    title: 'Sylhet Board 2022 - Old Man and Boys Swimming in the Pond',
    unpunctuatedPassage:
      'I said to the old man, what are you doing I am watching the boy, swimming in the pond he said How happy they are May Allah bless them let me sit by you and enjoy the scene I said.',
    correctPassage:
      'I said to the old man, "What are you doing?" "I am watching the boys swimming in the pond," he said. "How happy they are! May Allah bless them." "Let me sit by you and enjoy the scene," I said.',
    keyPunctuationPoints: [
      'Capital pronoun "I", comma after reporting clause "I said to the old man,".',
      'Opening quotation marks, capital "What", and question mark inside quotes after "What are you doing?".',
      'Opening quotation marks, capital pronoun "I", comma inside quotes after "pond,", lowercase "he said." followed by full stop.',
      'Opening quotation marks, capital "How", exclamation mark after "How happy they are!", capital "May", capital "Allah" (Creator), and full stop inside quotes after "bless them."',
      'Opening quotation marks, capital "Let", comma inside quotes after "scene,", lowercase "said", and capital pronoun "I." ending with full stop.',
    ],
    explanation:
      'Direct quoted speech is enclosed within quotation marks. Sentences expressing emotion (How happy they are!) take exclamation marks. Religious/divine names (Allah) must always be capitalized. The personal pronoun "I" is capitalized anywhere in the sentence.',
    banglaMeaning:
      'আমি বৃদ্ধ লোকটিকে বললাম, "আপনি কী করছেন?" "আমি পুকুরে ছেলেদের সাঁতার কাটা দেখছি," তিনি বললেন। "তারা কতই না সুখী! আল্লাহ তাদের মঙ্গল করুন।" "আমাকে আপনার পাশে বসতে দিন এবং দৃশ্যটি উপভোগ করতে দিন," আমি বললাম।',
    banglaTranslation:
      'আমি বৃদ্ধ লোকটিকে বললাম, "আপনি কী করছেন?" "আমি পুকুরে ছেলেদের সাঁতার কাটা দেখছি," তিনি বললেন। "তারা কতই না সুখী! আল্লাহ তাদের মঙ্গল করুন।" "আমাকে আপনার পাশে বসতে দিন এবং দৃশ্যটি উপভোগ করতে দিন," আমি বললাম।',
  },
  {
    id: 'punc-barishal-2022',
    board: 'Barishal Board 2022',
    title: 'Barishal Board 2022 - Mother and Child Dialogue on Going to School',
    unpunctuatedPassage:
      'my mother said to me where are you going i am going to school said i did you go to school yesterday',
    correctPassage:
      'My mother said to me, "Where are you going?" "I am going to school," said I. "Did you go to school yesterday?"',
    keyPunctuationPoints: [
      'Capital "My", comma after reporting clause "My mother said to me,".',
      'Opening quotation marks, capital "Where", and question mark inside quotes after "going?".',
      'Opening quotation marks, capital pronoun "I", comma inside quotes after "school,", lowercase "said", and capital pronoun "I." ending with period.',
      'Opening quotation marks, capital "Did", and question mark inside closing quotation marks after "yesterday?".',
    ],
    explanation:
      'Direct dialogue is enclosed in quotation marks. Questions terminate with question marks before the closing quotation marks. The pronoun "I" is capitalized both in direct speech and in the speaker tag ("said I").',
    banglaMeaning:
      'আমার মা আমাকে বললেন, "তুমি কোথায় যাচ্ছ?" "আমি স্কুলে যাচ্ছি," আমি বললাম। "তুমি কি গতকাল স্কুলে গিয়েছিলে?"',
    banglaTranslation:
      'আমার মা আমাকে বললেন, "তুমি কোথায় যাচ্ছ?" "আমি স্কুলে যাচ্ছি," আমি বললাম। "তুমি কি গতকাল স্কুলে গিয়েছিলে?"',
  },
  {
    id: 'punc-dinajpur-2022',
    board: 'Dinajpur Board 2022',
    title: 'Dinajpur Board 2022 - Old Woman and Young Man Dialogue on Begging and Work',
    unpunctuatedPassage:
      'the old woman said can you give me some food i have been starving for three days the young man said why do you beg cant you work',
    correctPassage:
      'The old woman said, "Can you give me some food? I have been starving for three days." The young man said, "Why do you beg? Can\'t you work?"',
    keyPunctuationPoints: [
      'Capital "The", comma after reporting clause "The old woman said,".',
      'Opening quotation marks, capital "Can", question mark after "some food?", capital pronoun "I", and full stop inside quotes after "three days."',
      'Capital "The young man said,", comma after "said,".',
      'Opening quotation marks, capital "Why", question mark after "beg?", capital "Can\'t" with contraction apostrophe, and question mark inside quotes after "work?".',
    ],
    explanation:
      'Reporting clauses end with commas before quotes. Interrogative sentences end with question marks. Contractions (Can\'t) require apostrophes. Sentence-initial words and personal pronoun "I" are always capitalized.',
    banglaMeaning:
      'বৃদ্ধা মহিলাটি বললেন, "আপনি কি আমাকে কিছু খাবার দিতে পারেন? আমি তিন দিন ধরে অনাহারে আছি।" যুবকটি বলল, "তুমি ভিক্ষা করো কেন? কাজ করতে পারো না?"',
    banglaTranslation:
      'বৃদ্ধা মহিলাটি বললেন, "আপনি কি আমাকে কিছু খাবার দিতে পারেন? আমি তিন দিন ধরে অনাহারে আছি।" যুবকটি বলল, "তুমি ভিক্ষা করো কেন? কাজ করতে পারো না?"',
  },
  {
    id: 'punc-mymensingh-2022',
    board: 'Mymensingh Board 2022',
    title: 'Mymensingh Board 2022 - Monira and Protiva Dialogue on Common Questions in Exam',
    unpunctuatedPassage:
      'Monira said to Protiva How does the question seem to you Have you got everything common. No one item is uncommon to me. What about you said Protiva. Im in the same position like you replied Monira.',
    correctPassage:
      'Monira said to Protiva, "How does the question seem to you? Have you got everything common?" "No, one item is uncommon to me. What about you?" said Protiva. "I\'m in the same position like you," replied Monira.',
    keyPunctuationPoints: [
      'Capital proper nouns "Monira" and "Protiva", comma after reporting clause "Monira said to Protiva,".',
      'Opening quotation marks, capital "How", question mark after "seem to you?", capital "Have", and question mark inside quotes after "common?".',
      'Opening quotation marks, capital "No", comma after "No,", capital "What", and question mark inside quotes after "about you?".',
      'Reporting clause in lowercase "said Protiva." ending with a full stop.',
      'Opening quotation marks, capital pronoun with contraction "I\'m", comma inside quotes after "like you,", lowercase "replied Monira." ending with a period.',
    ],
    explanation:
      'Direct dialogue is enclosed in quotation marks. Proper nouns (Monira, Protiva) are capitalized. Introductory negative words ("No,") take a comma. Contractions (I\'m) require an apostrophe.',
    banglaMeaning:
      'মনিরা প্রতিভাকে বলল, "প্রশ্ন তোমার কাছে কেমন মনে হচ্ছে? তুমি কি সবকিছু কমন পেয়েছ?" "না, একটি বিষয় আমার কাছে আনকমন। তোমার খবর কী?" প্রতিভা বলল। "আমিও তোমার মতোই অবস্থায় আছি," মনিরা উত্তর দিল।',
    banglaTranslation:
      'মনিরা প্রতিভাকে বলল, "প্রশ্ন তোমার কাছে কেমন মনে হচ্ছে? তুমি কি সবকিছু কমন পেয়েছ?" "না, একটি বিষয় আমার কাছে আনকমন। তোমার খবর কী?" প্রতিভা বলল। "আমিও তোমার মতোই অবস্থায় আছি," মনিরা উত্তর দিল।',
  },
  {
    id: 'punc-model-1',
    board: 'Model Question 1',
    title: 'Model Question 1 - Dialogue on Exam Preparation & Punctuality',
    unpunctuatedPassage:
      'why are you looking so worried rubel said ashraf i haven\'t prepared well for my ssc english examination replied rubel don\'t lose heart study attentively from today and you will overcome your deficiency',
    correctPassage:
      '"Why are you looking so worried, Rubel?" said Ashraf. "I haven\'t prepared well for my SSC English examination," replied Rubel. "Don\'t lose heart. Study attentively from today and you will overcome your deficiency."',
    keyPunctuationPoints: [
      'Inverted commas and capital "Why" at the start of direct speech.',
      'Comma and capital "Rubel" before question mark inside inverted speech.',
      'Capital "Ashraf" for proper noun followed by full stop.',
      'Opening quotes and capital "I" with apostrophe in "haven\'t".',
      'Capital "SSC" and "English" for proper acronyms and proper adjectives.',
      'Comma inside quote and small "replied" after quote.',
      'Opening quotes and capital "Don\'t" with apostrophe.',
      'Full stop after "heart" to separate two distinct imperative sentences.',
      'Capital "Study" for the beginning of the new sentence.',
      'Closing full stop inside final inverted commas.',
    ],
    explanation:
      'Direct dialogue must be enclosed in quotation marks. Separate the speaker tag with a comma or full stop. Capitalize names (Rubel, Ashraf), acronyms (SSC), and proper adjectives (English).',
  },
  {
    id: 'punc-model-2',
    board: 'Model Question 2',
    title: 'Model Question 2 - Teacher and Student Conversation on Homework',
    unpunctuatedPassage:
      'have you completed your home task kamal said the teacher no sir i was suffering from severe fever yesterday replied kamal may allah grant you sound health said the teacher',
    correctPassage:
      '"Have you completed your home task, Kamal?" said the teacher. "No, sir, I was suffering from severe fever yesterday," replied Kamal. "May Allah grant you sound health," said the teacher.',
    keyPunctuationPoints: [
      'Opening inverted commas and capital "Have".',
      'Comma before proper noun "Kamal" and question mark inside quote.',
      'Capital "Kamal" as vocative proper noun.',
      'Closing inverted commas and full stop after "teacher".',
      'Opening quotes, capital "No", and commas isolating polite "sir".',
      'Capital "I" for personal pronoun.',
      'Comma before closing quotes and small "replied".',
      'Capital "Kamal" for proper noun.',
      'Opening quote, capital "May", and capital "Allah" for Creator.',
      'Comma before closing quote and full stop after "teacher".',
    ],
    explanation:
      'Use quotation marks for each spoken turn. Isolate vocative words like "Kamal" and polite tags like "sir" using commas. Capitalize "Allah".',
  },
  {
    id: 'punc-model-3',
    board: 'Model Question 3',
    title: 'Model Question 3 - Beggar and Kind Gentleman Dialogue',
    unpunctuatedPassage:
      'will you give me some money sir said the beggar why do you beg can\'t you work said the gentleman i am blind and old i have no one to look after me replied the beggar',
    correctPassage:
      '"Will you give me some money, sir?" said the beggar. "Why do you beg? Can\'t you work?" said the gentleman. "I am blind and old. I have no one to look after me," replied the beggar.',
    keyPunctuationPoints: [
      'Opening quotes and capital "Will".',
      'Comma before "sir" and question mark inside quote.',
      'Opening quotes and capital "Why" for first question.',
      'Question mark after "beg" ending first question.',
      'Capital "Can\'t" with apostrophe and question mark inside quote.',
      'Full stop after "gentleman".',
      'Opening quote, capital "I", and full stop after "old".',
      'Capital "I" starting new sentence.',
      'Comma before closing quotation marks.',
      'Small "replied" and full stop ending the sentence.',
    ],
    explanation:
      'Ensure each independent question receives a question mark. Apostrophe is mandatory for contractions such as "can\'t".',
  },
  {
    id: 'punc-model-4',
    board: 'Model Question 4',
    title: 'Model Question 4 - Tourist and Local Guide at Historical Place',
    unpunctuatedPassage:
      'excuse me can you tell me the way to the sixty dome mosque said the tourist go straight for two miles and then turn left said the local guide how beautiful the architecture is exclaimed the tourist',
    correctPassage:
      '"Excuse me, can you tell me the way to the Sixty Dome Mosque?" said the tourist. "Go straight for two miles and then turn left," said the local guide. "How beautiful the architecture is!" exclaimed the tourist.',
    keyPunctuationPoints: [
      'Opening quotes and capital "Excuse".',
      'Comma after polite phrase "Excuse me".',
      'Capital "Sixty Dome Mosque" for historic proper monument name.',
      'Question mark inside closing quotes.',
      'Opening quotes and capital "Go".',
      'Comma before closing quote and full stop after "guide".',
      'Opening quotes and capital "How".',
      'Exclamation mark after "is" expressing wonder.',
      'Closing inverted commas after exclamation mark.',
      'Small "exclaimed" and full stop ending narrative.',
    ],
    explanation:
      'Proper names of heritage monuments require capitalization of all major lexical words. Exclamations take an exclamation mark inside inverted commas.',
  },
  {
    id: 'punc-model-5',
    board: 'Model Question 5',
    title: 'Model Question 5 - Father and Son on Time Management',
    unpunctuatedPassage:
      'father said to his son why are you wasting your time in playing video games i have finished my lessons father replied the son remember time once lost is lost forever said father',
    correctPassage:
      'Father said to his son, "Why are you wasting your time in playing video games?" "I have finished my lessons, father," replied the son. "Remember, time once lost is lost forever," said father.',
    keyPunctuationPoints: [
      'Capital "Father" starting the sentence and comma after "son".',
      'Opening quotes and capital "Why".',
      'Question mark inside closing inverted commas.',
      'Opening quotes, capital "I", and comma before vocative "father".',
      'Comma before closing quote and small "replied".',
      'Full stop after "son".',
      'Opening quotes and capital "Remember".',
      'Comma after imperative verb "Remember".',
      'Comma before closing quotation marks.',
      'Full stop after final word "father".',
    ],
    explanation:
      'A reporting clause preceding direct quotation must be followed by a comma before opening quotes.',
  },
  {
    id: 'punc-model-6',
    board: 'Model Question 6',
    title: 'Model Question 6 - Friends Planning a Picnic at Kuakata',
    unpunctuatedPassage:
      'where shall we go during this autumn vacation said sohel let\'s go to kuakata sea beach suggested rony what a wonderful idea shouted all of them together',
    correctPassage:
      '"Where shall we go during this autumn vacation?" said Sohel. "Let\'s go to Kuakata sea beach," suggested Rony. "What a wonderful idea!" shouted all of them together.',
    keyPunctuationPoints: [
      'Opening quotes and capital "Where".',
      'Question mark inside closing quotes and capital "Sohel" for proper noun.',
      'Full stop after "Sohel".',
      'Opening quotes and capital "Let\'s" with apostrophe.',
      'Capital "Kuakata" for proper geographical noun.',
      'Comma before closing quote and capital "Rony" for proper noun.',
      'Full stop after "Rony".',
      'Opening quotes and capital "What".',
      'Exclamation mark after "idea" expressing excitement inside quotes.',
      'Full stop closing the narrative.',
    ],
    explanation:
      'Place names like "Kuakata" and personal names like "Sohel", "Rony" are proper nouns and must be capitalized.',
  },
  {
    id: 'punc-model-7',
    board: 'Model Question 7',
    title: 'Model Question 7 - Doctor and Patient Consultation',
    unpunctuatedPassage:
      'what is your problem young man said the doctor i have been suffering from severe headache for three days sir replied the patient take this medicine twice daily and avoid oily food advised the doctor',
    correctPassage:
      '"What is your problem, young man?" said the doctor. "I have been suffering from severe headache for three days, sir," replied the patient. "Take this medicine twice daily and avoid oily food," advised the doctor.',
    keyPunctuationPoints: [
      'Opening quotes and capital "What".',
      'Comma before vocative address "young man".',
      'Question mark inside quotation marks.',
      'Opening quotes, capital "I", and comma before polite "sir".',
      'Comma after "sir" before closing quotes.',
      'Small "replied" and full stop after "patient".',
      'Opening quotes and capital "Take".',
      'Comma before closing quotes and small "advised".',
      'Full stop closing the statement.',
      'Proper spacing around dialogue quotes.',
    ],
    explanation:
      'Polite address and vocatives are separated with commas. Ensure advice/imperatives are capitalized at the beginning of direct quotes.',
  },
  {
    id: 'punc-model-8',
    board: 'Model Question 8',
    title: 'Model Question 8 - Interview Between Employer and Job Candidate',
    unpunctuatedPassage:
      'what is your qualification said the manager i have completed my bsc in computer science and engineering from buet sir said farhan why do you want to join our company asked the manager',
    correctPassage:
      '"What is your qualification?" said the manager. "I have completed my BSc in Computer Science and Engineering from BUET, sir," said Farhan. "Why do you want to join our company?" asked the manager.',
    keyPunctuationPoints: [
      'Opening quotes and capital "What".',
      'Question mark inside quotes and full stop after "manager".',
      'Opening quotes, capital "I", and proper capitalization for "BSc".',
      'Capital "Computer Science and Engineering" as academic title.',
      'Capital "BUET" as university acronym.',
      'Comma before polite address "sir".',
      'Comma before closing quotes and capital "Farhan".',
      'Full stop after "Farhan".',
      'Opening quotes, capital "Why", and question mark inside quotes.',
      'Small "asked" and full stop after "manager".',
    ],
    explanation:
      'Academic degrees (BSc) and institution acronyms (BUET) require exact capital lettering.',
  },
  {
    id: 'punc-model-9',
    board: 'Model Question 9',
    title: 'Model Question 9 - Two Friends Talking about Tree Plantation',
    unpunctuatedPassage:
      'trees are our greatest friends tarek said sumon how do they help us asked tarek they provide us with oxygen shade fruits and timber replied sumon we should plant more trees shouldn\'t we said tarek',
    correctPassage:
      '"Trees are our greatest friends, Tarek," said Sumon. "How do they help us?" asked Tarek. "They provide us with oxygen, shade, fruits, and timber," replied Sumon. "We should plant more trees, shouldn\'t we?" said Tarek.',
    keyPunctuationPoints: [
      'Opening quotes and capital "Trees".',
      'Comma and capital "Tarek" inside quotes.',
      'Comma after closing quote and capital "Sumon".',
      'Opening quotes, capital "How", and question mark inside quotes.',
      'Capital "Tarek" for proper noun.',
      'Opening quotes, capital "They", and commas separating list items: oxygen, shade, fruits.',
      'Comma before closing quote and capital "Sumon".',
      'Opening quotes, capital "We", and comma before tag question.',
      'Apostrophe in "shouldn\'t" and question mark inside quotes.',
      'Capital "Tarek" and final full stop.',
    ],
    explanation:
      'Commas must separate three or more coordinate items in a list. Tag questions attached to statements must be preceded by a comma.',
  },
  {
    id: 'punc-model-10',
    board: 'Model Question 10',
    title: 'Model Question 10 - Passenger and Conductor on Bus Fare',
    unpunctuatedPassage:
      'give me a ticket for motijheel please said the passenger how much is the fare it is fifty taka only said the conductor here is the money thank you sir said the conductor',
    correctPassage:
      '"Give me a ticket for Motijheel, please," said the passenger. "How much is the fare?" "It is fifty taka only," said the conductor. "Here is the money." "Thank you, sir," said the conductor.',
    keyPunctuationPoints: [
      'Opening quotes and capital "Give".',
      'Capital "Motijheel" for proper location name.',
      'Comma before "please" and comma inside quotes.',
      'Full stop after "passenger".',
      'Opening quotes, capital "How", and question mark inside quotes.',
      'Opening quotes, capital "It", comma inside quote, and full stop after "conductor".',
      'Opening quotes, capital "Here", full stop inside quotes.',
      'Opening quotes, capital "Thank", and comma before "sir".',
      'Comma inside quote and small "said".',
      'Full stop after "conductor".',
    ],
    explanation:
      'Each new turn of dialogue is opened with quotation marks, and proper city areas (Motijheel) are capitalized.',
  },
  {
    id: 'punc-model-11',
    board: 'Model Question 11',
    title: 'Model Question 11 - Doctor and Patient Consultation',
    unpunctuatedPassage:
      'what is your trouble young man said the doctor i have been suffering from acute stomach ache since yesterday doctor replied the boy take this medicine twice daily after meals and don\'t eat oily street food advised the doctor',
    correctPassage:
      '"What is your trouble, young man?" said the doctor. "I have been suffering from acute stomach ache since yesterday, doctor," replied the boy. "Take this medicine twice daily after meals, and don\'t eat oily street food," advised the doctor.',
    keyPunctuationPoints: [
      'Inverted commas and capital "What" at the start of direct question.',
      'Comma before address phrase "young man" and question mark inside quote.',
      'Closing inverted commas and small "said".',
      'Capital "I" as personal pronoun and opening inverted commas.',
      'Comma before vocative "doctor" and comma inside quotes.',
      'Apostrophe in "don\'t".',
      'Closing inverted commas and full stop after "doctor".',
    ],
    explanation:
      'Direct questions in dialogue require inverted commas with question marks enclosed within quotation marks, while vocatives like "young man" and "doctor" require preceding commas.',
  },
  {
    id: 'punc-model-12',
    board: 'Model Question 12',
    title: 'Model Question 12 - Father and Son on Career Aspiration',
    unpunctuatedPassage:
      'what do you want to become after your ssc exam father asked sayeed i want to study computer science and engineering at buet replied the boy that is a wonderful ambition work hard and you will succeed said the father',
    correctPassage:
      '"What do you want to become after your SSC exam, father?" asked Sayeed. "I want to study computer science and engineering at BUET," replied the boy. "That is a wonderful ambition! Work hard and you will succeed," said the father.',
    keyPunctuationPoints: [
      'Capital "What" inside quotes and capital "SSC" for the acronym.',
      'Comma before vocative "father" and question mark inside quotation marks.',
      'Capital "Sayeed" as a proper noun.',
      'Capital "BUET" as an educational institution acronym.',
      'Exclamation mark after "ambition!" to convey fatherly encouragement.',
      'Capital "Work" starting the imperative sentence.',
      'Full stop after "father".',
    ],
    explanation:
      'Acronyms like SSC and BUET must be fully capitalized. Use exclamation marks to emphasize encouraging expressions in spoken dialogue.',
  },
  {
    id: 'punc-model-13',
    board: 'Model Question 13',
    title: 'Model Question 13 - Visiting National Memorial at Savar',
    unpunctuatedPassage:
      'have you ever visited the national memorial at savar said tanvir to anis no i haven\'t but i wish to go there soon replied anis let\'s go together this friday said tanvir what a splendid idea exclaimed anis',
    correctPassage:
      '"Have you ever visited the National Memorial at Savar?" said Tanvir to Anis. "No, I haven\'t, but I wish to go there soon," replied Anis. "Let\'s go together this Friday," said Tanvir. "What a splendid idea!" exclaimed Anis.',
    keyPunctuationPoints: [
      'Capital "National Memorial" for historical landmark and capital "Savar" for geographic location.',
      'Capital "Tanvir" and "Anis" as proper nouns.',
      'Apostrophe in "haven\'t" and "Let\'s".',
      'Capital "Friday" for the day of the week.',
      'Exclamation mark after "splendid idea!" for exclamatory utterance.',
      'Quotation marks enclosing all direct speech utterances.',
    ],
    explanation:
      'Proper nouns including monuments (National Memorial), places (Savar), and days (Friday) must always be capitalized.',
  },
  {
    id: 'punc-model-14',
    board: 'Model Question 14',
    title: 'Model Question 14 - Friends Discussing River Pollution',
    unpunctuatedPassage:
      'look at the buriganga river it has turned pitch black said rahim how tragic it is said karim people dump plastics chemicals and household waste into it without thinking we must save our rivers said rahim',
    correctPassage:
      '"Look at the Buriganga River! It has turned pitch black," said Rahim. "How tragic it is!" said Karim. "People dump plastics, chemicals, and household waste into it without thinking. We must save our rivers," said Rahim.',
    keyPunctuationPoints: [
      'Capital "Buriganga River" with an exclamation mark.',
      'Capital "It" after exclamation mark inside quotes.',
      'Exclamation mark after "tragic it is!".',
      'Commas separating items in a series: "plastics, chemicals, and household waste".',
      'Full stop after "thinking" followed by capital "We".',
      'Quotation marks framing Rahim and Karim\'s dialogue.',
    ],
    explanation:
      'Serial lists require separating commas. Names of famous geographic rivers (Buriganga River) require initial capital letters.',
  },
  {
    id: 'punc-model-15',
    board: 'Model Question 15',
    title: 'Model Question 15 - Customer at a Bookstore',
    unpunctuatedPassage:
      'do you have a copy of gitashri by rabindranath tagore asked the customer yes sir we have several editions of it replied the salesman please give me the deluxe hardbound edition said the buyer',
    correctPassage:
      '"Do you have a copy of Gitashri by Rabindranath Tagore?" asked the customer. "Yes, sir, we have several editions of it," replied the salesman. "Please give me the deluxe hardbound edition," said the buyer.',
    keyPunctuationPoints: [
      'Capital "Gitashri" as the title of a literary book.',
      'Capital "Rabindranath Tagore" for the poet\'s name.',
      'Commas isolating polite address "sir" in "Yes, sir,".',
      'Capital "Please" starting the courteous request.',
      'Full stop closing the sentence after "buyer".',
    ],
    explanation:
      'Book titles and author names must be capitalized. Polite address words like "sir" in response phrases are separated by commas.',
  },
  {
    id: 'punc-model-16',
    board: 'Model Question 16',
    title: 'Model Question 16 - Student Seeking Leave from Headmaster',
    unpunctuatedPassage:
      'may i come in sir said sabbir yes come in why do you look distressed asked the headmaster my grandmother is critically ill in chittagong and i need three days leave replied sabbir may allah cure her soon grant him leave said the headmaster',
    correctPassage:
      '"May I come in, sir?" said Sabbir. "Yes, come in. Why do you look distressed?" asked the headmaster. "My grandmother is critically ill in Chittagong, and I need three days\' leave," replied Sabbir. "May Allah cure her soon. Grant him leave," said the headmaster.',
    keyPunctuationPoints: [
      'Capital "May" and "I", comma before "sir", question mark inside quotes.',
      'Capital "Sabbir" and "Chittagong" for proper nouns.',
      'Apostrophe in plural possessive "three days\' leave".',
      'Capital "Allah" for the Creator.',
      'Full stop separating prayer sentence from the order "Grant him leave".',
    ],
    explanation:
      'Use possessive apostrophes in expressions of time/duration (three days\' leave). Capitalize religious entities and proper cities (Chittagong).',
  },
  {
    id: 'punc-model-17',
    board: 'Model Question 17',
    title: 'Model Question 17 - Reading Daily Newspapers',
    unpunctuatedPassage:
      'which newspaper do you read regularly nafisa asked shamima i read the daily star every morning replied nafisa it keeps me updated on world politics sports and business news doesn\'t it asked shamima yes absolutely said nafisa',
    correctPassage:
      '"Which newspaper do you read regularly, Nafisa?" asked Shamima. "I read The Daily Star every morning," replied Nafisa. "It keeps me updated on world politics, sports, and business news, doesn\'t it?" asked Shamima. "Yes, absolutely," said Nafisa.',
    keyPunctuationPoints: [
      'Capital "The Daily Star" with "The" capitalized as part of the official title.',
      'Capital "Nafisa" and "Shamima" as proper nouns.',
      'Commas separating list: "world politics, sports, and business news".',
      'Comma before tag question "doesn\'t it?" and question mark inside quotes.',
      'Apostrophe in contraction "doesn\'t".',
      'Comma after "Yes" and comma after "absolutely" before closing quote.',
    ],
    explanation:
      'Official newspaper titles must be capitalized. Tag questions at the end of statements are preceded by a comma.',
  },
  {
    id: 'punc-model-18',
    board: 'Model Question 18',
    title: 'Model Question 18 - Interview with Young Scientist',
    unpunctuatedPassage:
      'congratulations on winning the national science fair said the reporter thank you very much sir replied the young innovator what inspired your solar water purifier project asked the journalist my village suffers from arsenic contamination and i wanted to find a low-cost solution said the boy',
    correctPassage:
      '"Congratulations on winning the National Science Fair!" said the reporter. "Thank you very much, sir," replied the young innovator. "What inspired your solar water purifier project?" asked the journalist. "My village suffers from arsenic contamination, and I wanted to find a low-cost solution," said the boy.',
    keyPunctuationPoints: [
      'Capital "National Science Fair" for official national competition title.',
      'Exclamation mark after congratulations inside quotation marks.',
      'Comma before "sir" in polite acknowledgement.',
      'Question mark after "project?" inside direct question quote.',
      'Capital "I" for personal pronoun inside compound sentence.',
      'Full stop after "boy".',
    ],
    explanation:
      'Official competition names are capitalized. Inverted commas enclose each distinct dialogue exchange.',
  },
  {
    id: 'punc-model-19',
    board: 'Model Question 19',
    title: 'Model Question 19 - Practicing Spoken English',
    unpunctuatedPassage:
      'why do you feel shy while speaking english shakil asked his friend i am afraid of making grammatical errors confessed habib don\'t be afraid mistakes are the stepping stones to learning said shakil you are right from now on i will practice daily replied habib',
    correctPassage:
      '"Why do you feel shy while speaking English, Shakil?" asked his friend. "I am afraid of making grammatical errors," confessed Habib. "Don\'t be afraid. Mistakes are the stepping stones to learning," said Shakil. "You are right. From now on, I will practice daily," replied Habib.',
    keyPunctuationPoints: [
      'Capital "English" for language name and capital "Shakil", "Habib" for proper names.',
      'Comma before "Shakil" and question mark inside quote.',
      'Apostrophe in "Don\'t" and full stop after "afraid".',
      'Capital "Mistakes" starting the second sentence inside the quotation.',
      'Full stop after "right" followed by capital "From".',
      'Comma after introductory phrase "From now on,".',
    ],
    explanation:
      'Language names like English must always be capitalized. Separate independent sentences within the same speaker\'s quotation with a full stop.',
  },
  {
    id: 'punc-model-20',
    board: 'Model Question 20',
    title: 'Model Question 20 - Mother and Daughter on Nutrition',
    unpunctuatedPassage:
      'why aren\'t you eating your vegetables sumi said mother i don\'t like leafy greens mom said the girl leafy greens contain vitamins minerals and dietary fiber which keep you healthy said mother alright mom i will finish my meal obediently replied sumi',
    correctPassage:
      '"Why aren\'t you eating your vegetables, Sumi?" said mother. "I don\'t like leafy greens, mom," said the girl. "Leafy greens contain vitamins, minerals, and dietary fiber which keep you healthy," said mother. "Alright, mom, I will finish my meal obediently," replied Sumi.',
    keyPunctuationPoints: [
      'Apostrophe in "aren\'t" and "don\'t".',
      'Capital "Sumi" and comma before "Sumi" inside question.',
      'Comma before "mom" inside direct speech.',
      'Commas in series: "vitamins, minerals, and dietary fiber".',
      'Commas isolating informal vocative: "Alright, mom, I will...".',
      'Quotation marks framing each speaker\'s statement.',
    ],
    explanation:
      'Contractions (aren\'t, don\'t) require apostrophes. Series of coordinate items (vitamins, minerals, and fiber) must be separated by commas.',
  },
  {
    id: 'punc-model-21',
    board: 'Model Question 21',
    title: 'Model Question 21 - A Good Student',
    unpunctuatedPassage:
      'a good student is regular in his studies he never wastes his valuable time he obeys his parents and teachers he is punctual disciplined and sincere therefore everybody loves him',
    correctPassage:
      'A good student is regular in his studies. He never wastes his valuable time. He obeys his parents and teachers. He is punctual, disciplined and sincere. Therefore, everybody loves him.',
    keyPunctuationPoints: [
      'Capital "A" at the beginning of the passage.',
      'Full stop after "studies" and capital "He" starting the second sentence.',
      'Full stop after "time" and capital "He" starting the third sentence.',
      'Full stop after "teachers" and capital "He" starting the fourth sentence.',
      'Comma separating list items: "punctual, disciplined and sincere".',
      'Full stop after "sincere" and capital "Therefore" starting the concluding sentence.',
      'Comma after the introductory adverbial connector "Therefore,".',
      'Full stop after "him" ending the paragraph.',
    ],
    explanation:
      'Separate distinct independent clauses with full stops and begin each new sentence with a capital letter. Use commas in coordinate lists and after introductory sentence linkers like "Therefore,".',
  },
  {
    id: 'punc-model-22',
    board: 'Model Question 22',
    title: 'Model Question 22 - A Conversation Between Two Friends',
    unpunctuatedPassage:
      'rahim said to karim where are you going i am going to the school library said karim why are you going there asked rahim i want to borrow a book on the liberation war replied karim',
    correctPassage:
      'Rahim said to Karim, "Where are you going?" "I am going to the school library," said Karim. "Why are you going there?" asked Rahim. "I want to borrow a book on the Liberation War," replied Karim.',
    keyPunctuationPoints: [
      'Capital "Rahim" and "Karim" for proper names.',
      'Comma after "Karim" before direct quotation.',
      'Quotation marks and capital "Where" inside dialogue with a question mark.',
      'Quotation marks and capital "I" for second speaker with comma before closing quote.',
      'Question mark inside quotation marks for "Why are you going there?".',
      'Capital "Liberation War" for historic proper event.',
      'Closing quotation marks and full stop after "Karim".',
    ],
    explanation:
      'Enclose direct speech in quotation marks. Capitalize proper nouns (Rahim, Karim) and historical event names (Liberation War). Place question marks and commas inside quotation marks.',
  },
  {
    id: 'punc-model-23',
    board: 'Model Question 23',
    title: 'Model Question 23 - Honesty',
    unpunctuatedPassage:
      'honesty is a great virtue an honest person is respected by all people he may be poor but he is never unhappy because he enjoys peace of mind so everybody should practise honesty',
    correctPassage:
      'Honesty is a great virtue. An honest person is respected by all people. He may be poor, but he is never unhappy because he enjoys peace of mind. So, everybody should practise honesty.',
    keyPunctuationPoints: [
      'Capital "Honesty" starting the passage.',
      'Full stop after "virtue" and capital "An".',
      'Full stop after "people" and capital "He".',
      'Comma before coordinating conjunction "but" joining two independent clauses.',
      'Full stop after "mind" and capital "So".',
      'Comma after sentence-initial linker "So,".',
      'Full stop after "honesty".',
    ],
    explanation:
      'Capitalize the first word of each sentence and end with a full stop. Use a comma before coordinating conjunctions separating independent clauses.',
  },
  {
    id: 'punc-model-24',
    board: 'Model Question 24',
    title: 'Model Question 24 - A Teacher and a Student',
    unpunctuatedPassage:
      'the teacher said to the student why are you late today sir i am sorry said the student i missed the bus this morning the teacher said never be late again',
    correctPassage:
      'The teacher said to the student, "Why are you late today?" "Sir, I am sorry," said the student. "I missed the bus this morning." The teacher said, "Never be late again."',
    keyPunctuationPoints: [
      'Capital "The" at the start and comma after "student".',
      'Quotation marks and capital "Why" ending with a question mark inside quotes.',
      'Quotation marks and capital "Sir" with comma after vocative "Sir,".',
      'Capital "I" and comma before closing quotation marks.',
      'Full stop after "student" and opening quotation with capital "I".',
      'Full stop after "morning." inside quotation marks.',
      'Capital "The" and comma after "said".',
      'Quotation marks with capital "Never" and ending full stop inside quotes.',
    ],
    explanation:
      'Enclose all dialogue in inverted commas. Isolate vocative addresses (Sir) with a comma. Ensure capital letters begin each direct quotation.',
  },
  {
    id: 'punc-model-25',
    board: 'Model Question 25',
    title: 'Model Question 25 - Tree Plantation',
    unpunctuatedPassage:
      'trees are very useful to us they give us oxygen fruits timber and shade they protect the soil from erosion they also help to keep the environment cool so we should plant more trees',
    correctPassage:
      'Trees are very useful to us. They give us oxygen, fruits, timber and shade. They protect the soil from erosion. They also help to keep the environment cool. So, we should plant more trees.',
    keyPunctuationPoints: [
      'Capital "Trees" starting the sentence and full stop after "us".',
      'Capital "They" and commas separating series items: "oxygen, fruits, timber and shade".',
      'Full stop after "shade" and capital "They".',
      'Full stop after "erosion" and capital "They".',
      'Full stop after "cool" and capital "So".',
      'Comma after introductory connector "So," and final full stop.',
    ],
    explanation:
      'Use commas to separate three or more coordinate nouns in a series. Start every new sentence with a capital letter and end with a full stop.',
  },
  {
    id: 'punc-model-26',
    board: 'Model Question 26',
    title: 'Model Question 26 - A Visit to Cox\'s Bazar',
    unpunctuatedPassage:
      'last winter i went to coxs bazar with my parents it is one of the most beautiful tourist spots in bangladesh we visited the sea beach in the afternoon what a wonderful sight it was',
    correctPassage:
      'Last winter I went to Cox\'s Bazar with my parents. It is one of the most beautiful tourist spots in Bangladesh. We visited the sea beach in the afternoon. What a wonderful sight it was!',
    keyPunctuationPoints: [
      'Capital "Last" and capital "I" for first-person pronoun.',
      'Apostrophe and capitals in proper place name "Cox\'s Bazar".',
      'Full stop after "parents" and capital "It".',
      'Capital "Bangladesh" for country name and full stop after it.',
      'Capital "We" and full stop after "afternoon".',
      'Capital "What" and exclamation mark (!) after "was" for exclamatory sentence.',
    ],
    explanation:
      'Proper names of places require capitalization and apostrophe (Cox\'s Bazar, Bangladesh). Exclamatory sentences must end with an exclamation mark.',
  },
  {
    id: 'punc-model-27',
    board: 'Model Question 27',
    title: 'Model Question 27 - The Value of Time',
    unpunctuatedPassage:
      'time is very precious it waits for nobody once it is lost it never comes back therefore we should make proper use of time a wise person always remembers this truth',
    correctPassage:
      'Time is very precious. It waits for nobody. Once it is lost, it never comes back. Therefore, we should make proper use of time. A wise person always remembers this truth.',
    keyPunctuationPoints: [
      'Capital "Time" starting the paragraph.',
      'Full stop after "precious" and capital "It".',
      'Full stop after "nobody" and capital "Once".',
      'Comma after introductory dependent clause "Once it is lost,".',
      'Full stop after "back" and capital "Therefore".',
      'Comma after introductory transition word "Therefore,".',
      'Full stop after "time" and capital "A".',
      'Full stop after "truth" ending the passage.',
    ],
    explanation:
      'Use a comma after an introductory subordinate clause ("Once it is lost,") and after transition words ("Therefore,").',
  },
  {
    id: 'punc-model-28',
    board: 'Model Question 28',
    title: 'Model Question 28 - A Dialogue About Examination',
    unpunctuatedPassage:
      'sumi said to rina have you finished your preparation for the ssc examination yes i have replied rina but i am still worried dont worry said sumi work hard and remain confident',
    correctPassage:
      'Sumi said to Rina, "Have you finished your preparation for the SSC examination?" "Yes, I have," replied Rina, "but I am still worried." "Don\'t worry," said Sumi. "Work hard and remain confident."',
    keyPunctuationPoints: [
      'Capitals in proper nouns "Sumi" and "Rina" and comma after "Rina".',
      'Quotation marks, capital "Have", and capitalized acronym "SSC".',
      'Question mark inside closing quotes after "examination?".',
      'Quotation marks, capital "Yes", and comma before "I have,".',
      'Small "replied", capital "Rina", and comma before continuation of speech.',
      'Opening quote, small "but", and full stop inside quotes after "worried."',
      'Apostrophe in "Don\'t", comma before quote, and small "said Sumi."',
      'Capital "Work" starting new direct sentence and closing quotes with full stop.',
    ],
    explanation:
      'Acronyms (SSC) and names (Sumi, Rina) must be capitalized. Split direct speeches require commas before and after the reporting tag.',
  },
  {
    id: 'punc-model-29',
    board: 'Model Question 29',
    title: 'Model Question 29 - A School Library',
    unpunctuatedPassage:
      'our school has a beautiful library it contains many useful books students can borrow books from the library for a certain period the librarian helps them choose suitable books what a useful place it is',
    correctPassage:
      'Our school has a beautiful library. It contains many useful books. Students can borrow books from the library for a certain period. The librarian helps them choose suitable books. What a useful place it is!',
    keyPunctuationPoints: [
      'Capital "Our" starting the sentence.',
      'Full stop after "library" and capital "It".',
      'Full stop after "books" and capital "Students".',
      'Full stop after "period" and capital "The".',
      'Full stop after "books" and capital "What".',
      'Exclamation mark (!) at the end of the exclamatory sentence "What a useful place it is!".',
    ],
    explanation:
      'Exclamatory expressions beginning with "What a..." require an exclamation mark. Standard declarative statements end with full stops.',
  },
  {
    id: 'punc-model-30',
    board: 'Model Question 30',
    title: 'Model Question 30 - Road Safety',
    unpunctuatedPassage:
      'one day my father said to me always follow the traffic rules when you cross a road look carefully to the right and left never run across a busy road he added your life is more valuable than a few minutes',
    correctPassage:
      'One day my father said to me, "Always follow the traffic rules. When you cross a road, look carefully to the right and left. Never run across a busy road." He added, "Your life is more valuable than a few minutes."',
    keyPunctuationPoints: [
      'Capital "One" and comma after reporting phrase "said to me,".',
      'Opening quotes and capital "Always" with full stop after "rules."',
      'Capital "When" and comma after subordinate clause "When you cross a road,".',
      'Full stop after "left" and capital "Never".',
      'Full stop before closing quotes after "road."',
      'Capital "He" and comma after "He added,".',
      'Opening quotes, capital "Your", and closing quotes with full stop.',
    ],
    explanation:
      'Direct speech is enclosed in quotes with a comma separating the reporting clause. Subordinate clauses placed before main clauses require a comma.',
  },
  {
    id: 'punc-model-31',
    board: 'Model Question 31',
    title: 'Model Question 31 - A Question to a Doctor',
    unpunctuatedPassage:
      'the patient said to the doctor doctor i have been suffering from fever for three days what should i do the doctor replied take adequate rest drink plenty of water and take the medicine regularly',
    correctPassage:
      'The patient said to the doctor, "Doctor, I have been suffering from fever for three days. What should I do?" The doctor replied, "Take adequate rest, drink plenty of water and take the medicine regularly."',
    keyPunctuationPoints: [
      'Capital "The" and comma after "doctor".',
      'Opening quotes, capital "Doctor", and comma after vocative address "Doctor,".',
      'Capital "I" for personal pronoun and full stop after "days".',
      'Capital "What", capital "I", and question mark inside quotes.',
      'Capital "The" and comma after "replied".',
      'Opening quotes, capital "Take", and comma separating list of advice.',
      'Closing full stop inside inverted commas.',
    ],
    explanation:
      'Vocatives like "Doctor" inside quotes take a comma. Separate questions within dialogue with question marks.',
  },
  {
    id: 'punc-model-32',
    board: 'Model Question 32',
    title: 'Model Question 32 - The Importance of Education',
    unpunctuatedPassage:
      'education is the backbone of a nation it removes ignorance and develops our sense of responsibility an educated person can distinguish between right and wrong therefore every child should have access to education',
    correctPassage:
      'Education is the backbone of a nation. It removes ignorance and develops our sense of responsibility. An educated person can distinguish between right and wrong. Therefore, every child should have access to education.',
    keyPunctuationPoints: [
      'Capital "Education" starting the passage.',
      'Full stop after "nation" and capital "It".',
      'Full stop after "responsibility" and capital "An".',
      'Full stop after "wrong" and capital "Therefore".',
      'Comma after introductory connector "Therefore,".',
      'Full stop after "education" ending the passage.',
    ],
    explanation:
      'Punctuate run-on sentences into well-formed individual sentences with full stops and capital letters.',
  },
  {
    id: 'punc-model-33',
    board: 'Model Question 33',
    title: 'Model Question 33 - A Rainy Day',
    unpunctuatedPassage:
      'what a rainy day it is the sky is cloudy and the roads are muddy people are carrying umbrellas some children are enjoying the rain but the poor day labourers are suffering greatly',
    correctPassage:
      'What a rainy day it is! The sky is cloudy and the roads are muddy. People are carrying umbrellas. Some children are enjoying the rain, but the poor day labourers are suffering greatly.',
    keyPunctuationPoints: [
      'Capital "What" and exclamation mark (!) after "What a rainy day it is!".',
      'Capital "The" and full stop after "muddy".',
      'Capital "People" and full stop after "umbrellas".',
      'Capital "Some" and comma before "but" connecting compound clauses.',
      'Full stop after "greatly" ending the paragraph.',
    ],
    explanation:
      'Use an exclamation mark for exclamatory expressions and a comma before the conjunction "but" in compound sentences.',
  },
  {
    id: 'punc-model-34',
    board: 'Model Question 34',
    title: 'Model Question 34 - Independence Day',
    unpunctuatedPassage:
      '26 march is our independence day on this day in 1971 the people of bangladesh began their struggle for independence it is a memorable day in our national history we observe the day with due respect and enthusiasm',
    correctPassage:
      '26 March is our Independence Day. On this day in 1971, the people of Bangladesh began their struggle for independence. It is a memorable day in our national history. We observe the day with due respect and enthusiasm.',
    keyPunctuationPoints: [
      'Capital "March" for month and capital "Independence Day" for national holiday.',
      'Full stop after "Day" and capital "On".',
      'Comma after prepositional time phrase "in 1971,".',
      'Capital "Bangladesh" for country name.',
      'Full stop after "independence" and capital "It".',
      'Full stop after "history" and capital "We".',
      'Full stop after "enthusiasm".',
    ],
    explanation:
      'Capitalize names of months (March), official national days (Independence Day), and countries (Bangladesh). Use a comma after introductory prepositional phrases.',
  },
  {
    id: 'punc-model-35',
    board: 'Model Question 35',
    title: 'Model Question 35 - A Dialogue About Reading Books',
    unpunctuatedPassage:
      'hasan said to his friend do you like reading books yes i do replied rafiq what kind of books do you like most asked hasan i like books on science history and adventure said rafiq',
    correctPassage:
      'Hasan said to his friend, "Do you like reading books?" "Yes, I do," replied Rafiq. "What kind of books do you like most?" asked Hasan. "I like books on science, history and adventure," said Rafiq.',
    keyPunctuationPoints: [
      'Capital "Hasan" and comma after "friend".',
      'Quotation marks, capital "Do", and question mark inside quotes.',
      'Quotation marks, capital "Yes", and comma before "I do,".',
      'Small "replied", capital "Rafiq", and full stop after "Rafiq".',
      'Quotation marks, capital "What", and question mark inside quotes.',
      'Small "asked", capital "Hasan", and full stop after "Hasan".',
      'Quotation marks, capital "I", and comma in series "science, history and adventure".',
      'Comma inside quotes, small "said", capital "Rafiq", and final full stop.',
    ],
    explanation:
      'Enclose all dialogue exchanges in quotation marks. Capitalize proper nouns (Hasan, Rafiq) and place question marks/commas within quotes.',
  },
  {
    id: 'punc-model-36',
    board: 'Model Question 36',
    title: 'Model Question 36 - A Visit to a Village',
    unpunctuatedPassage:
      'last friday i visited my grandparents village in khulna the village was surrounded by green fields ponds and trees the villagers were simple and friendly i enjoyed the natural beauty very much',
    correctPassage:
      'Last Friday I visited my grandparents\' village in Khulna. The village was surrounded by green fields, ponds and trees. The villagers were simple and friendly. I enjoyed the natural beauty very much.',
    keyPunctuationPoints: [
      'Capital "Last", capital "Friday" for day of the week, and capital "I".',
      'Apostrophe in plural possessive "grandparents\'".',
      'Capital "Khulna" for city name and full stop after it.',
      'Capital "The" and comma separating items: "green fields, ponds and trees".',
      'Full stop after "trees" and capital "The".',
      'Full stop after "friendly" and capital "I".',
      'Full stop after "much".',
    ],
    explanation:
      'Capitalize days of week (Friday) and district names (Khulna). Use an apostrophe after plural possessive nouns (grandparents\').',
  },
  {
    id: 'punc-model-37',
    board: 'Model Question 37',
    title: 'Model Question 37 - A Wise Farmer',
    unpunctuatedPassage:
      'a farmer had three sons they were always quarrelling one day the farmer called them and said my sons unity is strength then he gave them a bundle of sticks can you break this bundle he asked',
    correctPassage:
      'A farmer had three sons. They were always quarrelling. One day the farmer called them and said, "My sons, unity is strength." Then he gave them a bundle of sticks. "Can you break this bundle?" he asked.',
    keyPunctuationPoints: [
      'Capital "A" and full stop after "sons".',
      'Capital "They" and full stop after "quarrelling".',
      'Capital "One" and comma after "and said,".',
      'Opening quotes, capital "My", and comma after vocative "My sons,".',
      'Full stop inside quotes after "strength."',
      'Capital "Then" and full stop after "sticks".',
      'Opening quotes, capital "Can", and question mark inside quotes.',
      'Small "he asked." with a closing full stop.',
    ],
    explanation:
      'Quotation marks enclose spoken dialogue. Vocative addresses (My sons,) are set off with a comma.',
  },
  {
    id: 'punc-model-38',
    board: 'Model Question 38',
    title: 'Model Question 38 - Cleanliness',
    unpunctuatedPassage:
      'cleanliness is next to godliness a clean person always keeps his body clothes and surroundings neat and tidy dirty surroundings cause many diseases so we should keep our homes schools and roads clean',
    correctPassage:
      'Cleanliness is next to godliness. A clean person always keeps his body, clothes and surroundings neat and tidy. Dirty surroundings cause many diseases. So, we should keep our homes, schools and roads clean.',
    keyPunctuationPoints: [
      'Capital "Cleanliness" starting the proverb and full stop after "godliness".',
      'Capital "A" and comma in series "body, clothes and surroundings".',
      'Full stop after "tidy" and capital "Dirty".',
      'Full stop after "diseases" and capital "So".',
      'Comma after introductory connector "So," and comma in series "homes, schools and roads".',
      'Full stop after "clean".',
    ],
    explanation:
      'Capitalize sentence beginnings and separate items in a series with commas. Follow sentence-initial connectors like "So," with a comma.',
  },
  {
    id: 'punc-model-39',
    board: 'Model Question 39',
    title: 'Model Question 39 - A Dialogue About Morning Walk',
    unpunctuatedPassage:
      'good morning said ali good morning replied sabbir where are you going i am going for a morning walk said ali why do you go for a morning walk asked sabbir because it keeps me fit and fresh replied ali',
    correctPassage:
      '"Good morning," said Ali. "Good morning," replied Sabbir. "Where are you going?" "I am going for a morning walk," said Ali. "Why do you go for a morning walk?" asked Sabbir. "Because it keeps me fit and fresh," replied Ali.',
    keyPunctuationPoints: [
      'Quotation marks and capital "Good" with comma inside quotes before "said Ali."',
      'Capital "Ali" and "Sabbir" for proper names.',
      'Quotation marks and question mark for "Where are you going?".',
      'Quotation marks, capital "I", and comma before "said Ali." ',
      'Quotation marks and question mark for "Why do you go for a morning walk?".',
      'Quotation marks, capital "Because", and comma before "replied Ali."',
      'Full stops after each speaker reporting clause.',
    ],
    explanation:
      'Each speaker turn in direct dialogue must be enclosed in quotation marks, with appropriate punctuation (commas, question marks) placed inside the quotes.',
  },
  {
    id: 'punc-model-40',
    board: 'Model Question 40',
    title: 'Model Question 40 - Our National Flag',
    unpunctuatedPassage:
      'the national flag of bangladesh is very beautiful it is rectangular in shape and has a green background with a red circle in the middle the green colour represents the beauty of our country and the red colour reminds us of the sacrifice of our freedom fighters',
    correctPassage:
      'The national flag of Bangladesh is very beautiful. It is rectangular in shape and has a green background with a red circle in the middle. The green colour represents the beauty of our country and the red colour reminds us of the sacrifice of our freedom fighters.',
    keyPunctuationPoints: [
      'Capital "The" and capital "Bangladesh" for country name.',
      'Full stop after "beautiful" and capital "It".',
      'Full stop after "middle" and capital "The".',
      'Compound sentence joined with coordinating conjunction "and".',
      'Full stop after "freedom fighters" ending the passage.',
    ],
    explanation:
      'Proper country names (Bangladesh) must be capitalized. Break long run-on passages into distinct grammatical sentences with full stops.',
  },
];

