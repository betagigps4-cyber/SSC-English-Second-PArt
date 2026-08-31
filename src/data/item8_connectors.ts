import { ConnectorsExercise } from '../types';

export const CONNECTORS_MODEL_QUESTIONS: ConnectorsExercise[] = [
  {
    id: 'conn-rajshahi-2026',
    board: 'Rajshahi Board 2026',
    title: 'Rajshahi Board 2026 - Dengue Fever Transmission, Spread and Prevention',
    passageTemplate:
      'Dengue fever is a serious disease [a] is caused by a sort of virus called \'Dengue virus\'. [b], this virus was identified in Africa. [c] now it has spread all over the world. [d] in most cases, dengue has its remedy, it is better to prevent it. [e] we keep our dwelling places clean and people are aware of it, we can easily prevent this disease.',
    items: [
      {
        label: 'a',
        correctAnswer: 'that',
        acceptableAnswers: ['that', 'which'],
        explanation: 'Relative pronoun "that / which" referring back to antecedent noun phrase "a serious disease".',
      },
      {
        label: 'b',
        correctAnswer: 'At first',
        acceptableAnswers: ['At first', 'Initially', 'Originally', 'First of all', 'In the beginning'],
        explanation: 'Temporal adverbial connector "At first / Initially" describing the historical identification of the virus.',
      },
      {
        label: 'c',
        correctAnswer: 'But',
        acceptableAnswers: ['But', 'However', 'Yet', 'but', 'however'],
        explanation: 'Adversative connector "But / However" contrasting historical African origins with current worldwide spread.',
      },
      {
        label: 'd',
        correctAnswer: 'Although',
        acceptableAnswers: ['Although', 'Though', 'Even though'],
        explanation: 'Concessive subordinating conjunction "Although / Though" emphasizing that prevention is superior despite treatment availability.',
      },
      {
        label: 'e',
        correctAnswer: 'If',
        acceptableAnswers: ['If', 'Provided that', 'In case', 'As long as'],
        explanation: 'Conditional subordinating conjunction "If / Provided that" introducing the condition for disease prevention.',
      },
    ],
  },
  {
    id: 'conn-mymensingh-2026',
    board: 'Mymensingh Board 2026',
    title: 'Mymensingh Board 2026 - Dengue Fever Transmission and Prevention',
    passageTemplate:
      'Dengue fever is a serious disease [a] is caused by a kind of virus called \'Dengue Virus\'. [b], this virus was identified in Africa [c] now it has spread all over the world. [d] in most cases dengue fever has its remedy, it is better to prevent it. [e] we keep our dwelling houses clean and people are conscious of it, we can easily avoid it.',
    items: [
      {
        label: 'a',
        correctAnswer: 'which',
        acceptableAnswers: ['which', 'that'],
        explanation: 'Relative pronoun "which / that" referring back to the antecedent noun "a serious disease".',
      },
      {
        label: 'b',
        correctAnswer: 'At first',
        acceptableAnswers: ['At first', 'Initially', 'Originally', 'First of all', 'In the beginning'],
        explanation: 'Temporal / historical origin connector "At first / Initially" describing when and where the virus was first detected.',
      },
      {
        label: 'c',
        correctAnswer: 'but',
        acceptableAnswers: ['but', 'however', 'yet'],
        explanation: 'Adversative coordinator "but / however" contrasting historical localization with current global spread.',
      },
      {
        label: 'd',
        correctAnswer: 'Although',
        acceptableAnswers: ['Although', 'Though', 'Even though'],
        explanation: 'Concessive subordinating conjunction "Although / Though" showing that despite treatments, prevention is superior.',
      },
      {
        label: 'e',
        correctAnswer: 'If',
        acceptableAnswers: ['If', 'Provided that', 'In case', 'As long as'],
        explanation: 'Conditional connector "If / Provided that" introducing the hygiene condition required to prevent the disease.',
      },
    ],
  },
  {
    id: 'conn-jessore-2026',
    board: 'Jessore Board 2026',
    title: 'Jessore Board 2026 - Information Technology and Global Village',
    passageTemplate:
      'The whole world has turned into a global village [a] the improvement of information technology. [b] we can know [c] is happening on the other corner of the world sitting at home. One culture is coming in touch with other [d] technology transforms culture and develops it. [e] we have to prevent the infiltration of bad culture of another society to our own culture.',
    items: [
      {
        label: 'a',
        correctAnswer: 'due to',
        acceptableAnswers: ['due to', 'because of', 'owing to', 'for', 'through'],
        explanation: 'Causal connector / prepositional phrase: "due to / because of" indicates the root reason for becoming a global village.',
      },
      {
        label: 'b',
        correctAnswer: 'As a result',
        acceptableAnswers: ['As a result', "That's why", 'Consequently', 'Therefore', 'So', 'Now'],
        explanation: 'Resultative / consecutive connector: "As a result / That\'s why" introduces the outcome of technological connectivity.',
      },
      {
        label: 'c',
        correctAnswer: 'what',
        acceptableAnswers: ['what', 'whatever'],
        explanation: 'Noun clause connector / relative pronoun: "what" acts as the subject for "is happening".',
      },
      {
        label: 'd',
        correctAnswer: 'as',
        acceptableAnswers: ['as', 'since', 'because'],
        explanation: 'Subordinating conjunction of reason: "as / since / because" links cultural interaction to technological transformation.',
      },
      {
        label: 'e',
        correctAnswer: 'So',
        acceptableAnswers: ['So', 'Therefore', 'Hence', 'However', 'Thus', 'At the same time'],
        explanation: 'Concluding / consequence connector: "So / Therefore" introduces our collective duty to safeguard our cultural heritage.',
      },
    ],
  },
  {
    id: 'conn-cumilla-2026',
    board: 'Cumilla Board 2026',
    title: 'Cumilla Board 2026 - Hard Work vs Blind Reliance on Fate',
    passageTemplate:
      "In general, people hate their fate [a] they don't get the result they wish. But [b] a man works deliberately for building his future, success will definitely touch him. There is no magic power [c] it is the magic of hard work. [d] he works hard to attain success, fortune will never follow him. Those [e] are unlucky rebuke fate. Actually, there is no alternative to hard work.",
    items: [
      {
        label: 'a',
        correctAnswer: 'as',
        acceptableAnswers: ['as', 'when', 'because', 'if'],
        explanation: 'Causal / temporal subordinator: "as / when / because" introduces the reason or circumstance for hating fate.',
      },
      {
        label: 'b',
        correctAnswer: 'if',
        acceptableAnswers: ['if', 'when'],
        explanation: 'Conditional connector: "if" sets the condition under which success touches a person.',
      },
      {
        label: 'c',
        correctAnswer: 'rather',
        acceptableAnswers: ['rather', 'but', 'instead'],
        explanation: 'Adversative / corrective connector: "rather / but" clarifies the real source of success (hard work, not magic).',
      },
      {
        label: 'd',
        correctAnswer: 'Unless',
        acceptableAnswers: ['Unless', 'If not'],
        explanation: 'Negative conditional conjunction: "Unless" (meaning if not) introduces the condition that without hard work, fortune will not follow.',
      },
      {
        label: 'e',
        correctAnswer: 'who',
        acceptableAnswers: ['who', 'that'],
        explanation: 'Relative pronoun: "who" refers back to the antecedent pronoun "Those".',
      },
    ],
  },
  {
    id: 'conn-barishal-2026',
    board: 'Barishal Board 2026',
    title: 'Barishal Board 2026 - Misconceptions and Facts of Blood Donation',
    passageTemplate:
      'Some people think that blood donation is so serious a loss from their body [a] it cannot be recovered or it may cause serious health problem. [b] this concept is completely wrong [c] most people [d] the educated people do not have clear conception on the process of blood donation and its facts correctly. The fact is [e] red blood cells in our body produced from the bone, have a lifespan of 120 days.',
    items: [
      {
        label: 'a',
        correctAnswer: 'that',
        acceptableAnswers: ['that'],
        explanation: 'Result clause subordinator: correlative structure "so + adjective + that" (so serious a loss... that it cannot be recovered).',
      },
      {
        label: 'b',
        correctAnswer: 'But',
        acceptableAnswers: ['But', 'Actually', 'In fact', 'However'],
        explanation: 'Adversative / reality connector: "But / Actually / In fact" refutes the popular misconception with facts.',
      },
      {
        label: 'c',
        correctAnswer: 'as',
        acceptableAnswers: ['as', 'because', 'since'],
        explanation: 'Causal conjunction: "as / because / since" introduces the explanation why people fear blood donation.',
      },
      {
        label: 'd',
        correctAnswer: 'even',
        acceptableAnswers: ['even', 'and even'],
        explanation: 'Focusing adverb / linker: "even the educated people" emphasizes that ignorance about blood donation exists even among educated people.',
      },
      {
        label: 'e',
        correctAnswer: 'that',
        acceptableAnswers: ['that'],
        explanation: 'Noun clause complementizer: "The fact is that..." introduces the biological truth about red blood cell lifespan.',
      },
    ],
  },
  {
    id: 'conn-dhaka-2026',
    board: 'Dhaka Board 2026',
    title: 'Dhaka Board 2026 - Mobile Phone and Its Impacts',
    passageTemplate:
      'Mobile phone has added a new dimension to our communication system. It has made the world closer to us. [a] it has made our life easy and comfortable. [b] it is not an unmixed blessing. [c] it has some negative impacts. [d] students are getting addicted to it. [e] they are spoiling their valuable time.',
    items: [
      {
        label: 'a',
        correctAnswer: 'Moreover',
        acceptableAnswers: ['Moreover', 'Besides', 'In addition', 'Furthermore', 'In fact'],
        explanation: 'Additive connector: "Moreover / Besides / In addition" adds another positive point about mobile phones.',
      },
      {
        label: 'b',
        correctAnswer: 'However',
        acceptableAnswers: ['However', 'But', 'Yet', 'Nevertheless'],
        explanation: 'Contrast connector: "However / But / Yet" transitions to discuss negative aspects and limitations.',
      },
      {
        label: 'c',
        correctAnswer: 'In fact',
        acceptableAnswers: ['In fact', 'Actually', 'Indeed', 'Rather', 'Because'],
        explanation: 'Emphatic/explanatory connector: "In fact / Actually / Indeed" underscores that it has harmful impacts.',
      },
      {
        label: 'd',
        correctAnswer: 'For example',
        acceptableAnswers: ['For example', 'For instance', 'Firstly', 'Particularly', 'Especially'],
        explanation: 'Exemplification connector: "For example / For instance / Especially" introduces student addiction as a specific instance.',
      },
      {
        label: 'e',
        correctAnswer: 'As a result',
        acceptableAnswers: ['As a result', 'Consequently', 'Therefore', 'So', 'And thus'],
        explanation: 'Consequence/result connector: "As a result / Consequently / Therefore" shows the harmful outcome of time wastage.',
      },
    ],
  },
  {
    id: 'conn-chattragram-2026',
    board: 'Chattragram Board 2026',
    title: 'Chattragram Board 2026 - Deforestation and Global Warming Consequences',
    passageTemplate:
      'Global warming is increasing day by day [a] deforestation. We cut down trees [b] never think of planting trees. [c] human beings and other living beings are in the threat of extinction. Time is coming [d] there will be no trees left for us. [e], we have to face bitter consequences of deforestation.',
    items: [
      {
        label: 'a',
        correctAnswer: 'for',
        acceptableAnswers: ['for', 'because of', 'due to', 'owing to', 'on account of'],
        explanation: 'Prepositional connector of cause: "for / because of / due to" introduces the reason before noun phrase "deforestation".',
      },
      {
        label: 'b',
        correctAnswer: 'but',
        acceptableAnswers: ['but', 'and', 'yet'],
        explanation: 'Adversative coordinate conjunction "but" contrasts cutting down trees with never thinking of planting them.',
      },
      {
        label: 'c',
        correctAnswer: 'Therefore',
        acceptableAnswers: ['Therefore', 'So', 'As a result', 'Consequently', 'For this reason'],
        explanation: 'Consequence connector "Therefore / So / As a result" introduces the threat of extinction caused by deforestation.',
      },
      {
        label: 'd',
        correctAnswer: 'when',
        acceptableAnswers: ['when', 'that'],
        explanation: 'Relative conjunction of time "when" specifies the coming time.',
      },
      {
        label: 'e',
        correctAnswer: 'Then',
        acceptableAnswers: ['Then', 'Thus', 'Consequently', 'Therefore', 'As a result', 'Finally', 'In fact', 'So'],
        explanation: 'Sequential/deductive sentence linker "Then / Thus / Consequently" introduces the final consequence.',
      },
    ],
  },
  {
    id: 'conn-sylhet-2026',
    board: 'Sylhet Board 2026',
    title: 'Sylhet Board 2026 - Sincerity as the Key to Success',
    passageTemplate:
      'Everybody knows [a] sincerity is the key to success. A sincere person can prosper in life. The man [b] does not follow the rules of sincerity can never go a long way in the world. Many a man is not conscious of the importance of sincerity for [c] they don\'t have the benefit of success. [d] we should be sincere to our work. [e] we are sincere to our work, we will suffer in the long run.',
    items: [
      {
        label: 'a',
        correctAnswer: 'that',
        acceptableAnswers: ['that'],
        explanation: 'Noun clause connector "that" connects the main verb "knows" with its complement clause.',
      },
      {
        label: 'b',
        correctAnswer: 'who',
        acceptableAnswers: ['who', 'that'],
        explanation: 'Relative pronoun "who" refers to the person subject "The man".',
      },
      {
        label: 'c',
        correctAnswer: 'which',
        acceptableAnswers: ['which', 'what', 'this', 'that reason'],
        explanation: 'Relative pronoun / prepositional complement "which" in "for which" (যার কারণে) introducing the consequence.',
      },
      {
        label: 'd',
        correctAnswer: 'So',
        acceptableAnswers: ['So', 'Therefore', 'Hence', 'Thus', 'As a result'],
        explanation: 'Consequence / concluding connector "So / Therefore" introduces the imperative duty.',
      },
      {
        label: 'e',
        correctAnswer: 'Unless',
        acceptableAnswers: ['Unless', 'If', 'If not', 'Except when'],
        explanation: 'Conditional connector "Unless" (or "If not / If") indicates the negative condition for suffering in the long run.',
      },
    ],
  },
  {
    id: 'conn-dinajpur-2026',
    board: 'Dinajpur Board 2026',
    title: 'Dinajpur Board 2026 - Punctuality, Discipline and Achieving Success',
    passageTemplate:
      'Punctuality is a daily routine of our life. It is a virtue [a] helps us to become successful in life. An unpunctual man [b] meets failure in every walk of his life. [c] an unpunctual man cannot reach the goal of his life. He always repents [d] time slips away. [e] we should be punctual from our childhood.',
    items: [
      {
        label: 'a',
        correctAnswer: 'which',
        acceptableAnswers: ['which', 'that'],
        explanation: 'Relative pronoun "which / that" refers back to the antecedent abstract noun "a virtue".',
      },
      {
        label: 'b',
        correctAnswer: 'always',
        acceptableAnswers: ['always', 'usually', 'often', 'inevitably'],
        explanation: 'Adverb of frequency/manner "always / usually / often" modifies the verb "meets failure".',
      },
      {
        label: 'c',
        correctAnswer: 'So',
        acceptableAnswers: ['So', 'Therefore', 'As a result', 'Consequently', 'Thus', 'Hence'],
        explanation: 'Cause-and-effect / result connector "So / Therefore / As a result" introduces the consequence of unpunctuality.',
      },
      {
        label: 'd',
        correctAnswer: 'when',
        acceptableAnswers: ['when', 'as', 'because', 'after'],
        explanation: 'Subordinating conjunction of time/reason "when / as / after" connects repenting with time slipping away.',
      },
      {
        label: 'e',
        correctAnswer: 'Therefore',
        acceptableAnswers: ['Therefore', 'So', 'Hence', 'Thus', 'So that'],
        explanation: 'Concluding connector "Therefore / So / Hence / Thus" introduces the final moral advice.',
      },
    ],
  },
  {
    id: 'conn-model-1',
    board: 'Model Question 1',
    title: 'Model Question 1 - Early Rising, Daily Health, and Success',
    passageTemplate:
      'Early rising is a very good habit. [a] it ensures sound health and long life. An early riser can enjoy the fresh air of the morning. [b] he gets enough time to perform his daily tasks smoothly. [c] a late riser misses the beauty of nature. [d] he remains sluggish throughout the day. [e] we all should form the habit of rising early from our student life.',
    items: [
      { label: 'a', correctAnswer: 'First of all', acceptableAnswers: ['Firstly', 'At first', 'First of all', 'Because'], explanation: 'Introductory sequence connector starting the first argument.' },
      { label: 'b', correctAnswer: 'Besides', acceptableAnswers: ['Moreover', 'Furthermore', 'In addition', 'Besides'], explanation: 'Additive connector adding further advantages of early rising.' },
      { label: 'c', correctAnswer: 'On the other hand', acceptableAnswers: ['On the contrary', 'In contrast', 'However', 'On the other hand', 'Conversely'], explanation: 'Adversative connector highlighting contrast with a late riser.' },
      { label: 'd', correctAnswer: 'Consequently', acceptableAnswers: ['As a result', 'Therefore', 'Consequently', 'So'], explanation: 'Cause and effect connector indicating outcome of rising late.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Hence', 'Thus', 'Therefore', 'Finally'], explanation: 'Concluding summary connector.' },
    ],
  },
  {
    id: 'conn-model-2',
    board: 'Model Question 2',
    title: 'Model Question 2 - Environmental Pollution and Climate Peril',
    passageTemplate:
      'Environmental pollution has reached an alarming level in our country. [a] our air is being polluted by black smoke from mills and vehicles. [b] water is contaminated by toxic chemicals and garbage. [c] our sound is polluted by loud horns and loudspeakers. [d] the ecological balance is being severely disrupted. [e] effective measures are taken immediately, our planet will soon become uninhabitable.',
    items: [
      { label: 'a', correctAnswer: 'Firstly', acceptableAnswers: ['First of all', 'At first', 'Firstly'], explanation: 'Sequential listing connector for the first type of pollution.' },
      { label: 'b', correctAnswer: 'Secondly', acceptableAnswers: ['Besides', 'Moreover', 'Furthermore', 'Secondly'], explanation: 'Sequential/additive connector for water pollution.' },
      { label: 'c', correctAnswer: 'Thirdly', acceptableAnswers: ['In addition', 'Also', 'Furthermore', 'Thirdly'], explanation: 'Continuing the list with sound pollution.' },
      { label: 'd', correctAnswer: 'As a result', acceptableAnswers: ['Consequently', 'Therefore', 'Thus', 'As a result'], explanation: 'Result connector describing environmental degradation.' },
      { label: 'e', correctAnswer: 'Unless', acceptableAnswers: ['If not', 'Unless'], explanation: 'Conditional negative connector introducing danger.' },
    ],
  },
  {
    id: 'conn-model-3',
    board: 'Model Question 3',
    title: 'Model Question 3 - Trees, Reforestation, and Oxygen Supply',
    passageTemplate:
      'Trees are essential for human survival. [a] they provide us with oxygen which is indispensable for life. [b] they supply us with timber, fruits, and medicines. [c] trees prevent soil erosion and floods during rainy seasons. [d] some greedy people cut down trees indiscriminately. [e] we must launch a nationwide tree plantation campaign to save our environment.',
    items: [
      { label: 'a', correctAnswer: 'First of all', acceptableAnswers: ['Firstly', 'At first', 'Primarily', 'First of all'], explanation: 'Opening connector detailing the primary role of trees.' },
      { label: 'b', correctAnswer: 'Moreover', acceptableAnswers: ['Furthermore', 'Besides', 'In addition', 'Moreover'], explanation: 'Additive connector introducing supplementary benefits.' },
      { label: 'c', correctAnswer: 'In addition', acceptableAnswers: ['Besides', 'Also', 'Furthermore', 'In addition'], explanation: 'Adding ecological protection benefits.' },
      { label: 'd', correctAnswer: 'Unfortunately', acceptableAnswers: ['However', 'Regrettably', 'Yet', 'Unfortunately', 'But'], explanation: 'Adversative emotional connector highlighting destruction.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Hence', 'Thus', 'Therefore'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-4',
    board: 'Model Question 4',
    title: 'Model Question 4 - Digital Education and Internet Connectivity',
    passageTemplate:
      'Information technology has revolutionized the education sector. [a] students can attend virtual lectures from world-renowned professors. [b] digital libraries provide instant access to thousands of reference books. [c] online examination systems save huge paper and time. [d] excessive addiction to online video games harms students\' vision and health. [e] we must utilize modern devices wisely and productively.',
    items: [
      { label: 'a', correctAnswer: 'For instance', acceptableAnswers: ['For example', 'Firstly', 'First of all', 'For instance'], explanation: 'Illustrative connector providing specific example of digital education.' },
      { label: 'b', correctAnswer: 'Furthermore', acceptableAnswers: ['Moreover', 'Besides', 'In addition', 'Furthermore'], explanation: 'Additive connector for digital libraries.' },
      { label: 'c', correctAnswer: 'Similarly', acceptableAnswers: ['Likewise', 'Also', 'In addition', 'Similarly'], explanation: 'Comparative additive connector.' },
      { label: 'd', correctAnswer: 'However', acceptableAnswers: ['On the contrary', 'Nevertheless', 'But', 'However'], explanation: 'Concessive/contrast connector presenting the negative side of screen addiction.' },
      { label: 'e', correctAnswer: 'Hence', acceptableAnswers: ['Therefore', 'So', 'Thus', 'Hence'], explanation: 'Final deductive connector.' },
    ],
  },
  {
    id: 'conn-model-5',
    board: 'Model Question 5',
    title: 'Model Question 5 - Female Education and National Upliftment',
    passageTemplate:
      'Female education is of supreme importance for national progress. [a] women constitute almost half of our total population. [b] an educated mother can raise educated and cultured children. [c] in many rural areas, girls are still married off at an early age. [d] early marriage ruins their educational career and health. [e] the government and conscious citizens must work together to eliminate early marriage.',
    items: [
      { label: 'a', correctAnswer: 'Firstly', acceptableAnswers: ['First of all', 'Because', 'At first', 'Firstly'], explanation: 'Reasoning/sequential connector.' },
      { label: 'b', correctAnswer: 'Secondly', acceptableAnswers: ['Moreover', 'Furthermore', 'Besides', 'Secondly'], explanation: 'Adding benefit of an educated mother.' },
      { label: 'c', correctAnswer: 'However', acceptableAnswers: ['Unfortunately', 'Regrettably', 'Yet', 'However'], explanation: 'Adversative connector introducing rural child marriage problem.' },
      { label: 'd', correctAnswer: 'As a consequence', acceptableAnswers: ['Consequently', 'As a result', 'Therefore', 'As a consequence'], explanation: 'Cause-effect connector describing the harm of child marriage.' },
      { label: 'e', correctAnswer: 'Thus', acceptableAnswers: ['Therefore', 'So', 'Hence', 'Thus'], explanation: 'Concluding call to action.' },
    ],
  },
  {
    id: 'conn-model-6',
    board: 'Model Question 6',
    title: 'Model Question 6 - Honesty, Moral Integrity, and Peace',
    passageTemplate:
      'Honesty is the foundation of a noble character. [a] an honest man is loved and trusted by everyone. [b] he may face financial hardships, he never compromises on truth. [c] a dishonest man lives in constant fear of exposure. [d] his illegitimate wealth brings no real peace of mind. [e] let us teach our children the priceless value of truthfulness from childhood.',
    items: [
      { label: 'a', correctAnswer: 'Undoubtedly', acceptableAnswers: ['Indeed', 'Truly', 'Certainly', 'Undoubtedly'], explanation: 'Emphatic opening connector.' },
      { label: 'b', correctAnswer: 'Although', acceptableAnswers: ['Though', 'Even though', 'Although'], explanation: 'Concessive subordinate conjunction.' },
      { label: 'c', correctAnswer: 'In contrast', acceptableAnswers: ['On the other hand', 'On the contrary', 'In contrast', 'Conversely'], explanation: 'Contrast connector comparing with a dishonest man.' },
      { label: 'd', correctAnswer: 'Moreover', acceptableAnswers: ['Furthermore', 'In fact', 'Besides', 'Moreover'], explanation: 'Additive connector emphasizing absence of peace.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Hence', 'Thus', 'Therefore'], explanation: 'Concluding appeal connector.' },
    ],
  },
  {
    id: 'conn-model-7',
    board: 'Model Question 7',
    title: 'Model Question 7 - Value of Time and Punctuality',
    passageTemplate:
      'Time is the most valuable asset in human existence. [a] lost money can be earned back, lost time can never be retrieved. [b] great scientists and writers achieved fame through strict time management. [c] a lazy person puts off today\'s work for tomorrow. [d] he piles up workload and suffers failure in the examination. [e] we should make the best use of every fleeting moment.',
    items: [
      { label: 'a', correctAnswer: 'While', acceptableAnswers: ['Whereas', 'Although', 'Though', 'While'], explanation: 'Contrastive subordinate connector.' },
      { label: 'b', correctAnswer: 'In fact', acceptableAnswers: ['Indeed', 'For example', 'Moreover', 'In fact'], explanation: 'Emphatic corroborative connector.' },
      { label: 'c', correctAnswer: 'On the contrary', acceptableAnswers: ['On the other hand', 'However', 'In contrast', 'On the contrary'], explanation: 'Adversative connector highlighting laziness.' },
      { label: 'd', correctAnswer: 'As a result', acceptableAnswers: ['Consequently', 'Therefore', 'Thus', 'As a result'], explanation: 'Result connector describing accumulated workload.' },
      { label: 'e', correctAnswer: 'So', acceptableAnswers: ['Therefore', 'Hence', 'Thus', 'So'], explanation: 'Concluding advice connector.' },
    ],
  },
  {
    id: 'conn-model-8',
    board: 'Model Question 8',
    title: 'Model Question 8 - Habit of Reading Books and Intellectual Elevation',
    passageTemplate:
      'Reading books widens the horizon of human knowledge. [a] it acquaints us with ancient civilizations and modern scientific discoveries. [b] books provide pure delight to our lonely hours. [c] many students spend their precious time on social media scrolling reels. [d] they lose their concentration and critical thinking skills. [e] parents and teachers must inspire youngsters to build personal libraries.',
    items: [
      { label: 'a', correctAnswer: 'Firstly', acceptableAnswers: ['First of all', 'At first', 'Primarily', 'Firstly'], explanation: 'Initial sequential argument connector.' },
      { label: 'b', correctAnswer: 'Besides', acceptableAnswers: ['Moreover', 'Furthermore', 'In addition', 'Besides'], explanation: 'Additive connector.' },
      { label: 'c', correctAnswer: 'Regrettably', acceptableAnswers: ['Unfortunately', 'However', 'Yet', 'Regrettably', 'But'], explanation: 'Adversative expressing concern.' },
      { label: 'd', correctAnswer: 'Consequently', acceptableAnswers: ['As a result', 'Therefore', 'Consequently'], explanation: 'Consequence connector.' },
      { label: 'e', correctAnswer: 'Hence', acceptableAnswers: ['Therefore', 'So', 'Thus', 'Hence'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-9',
    board: 'Model Question 9',
    title: 'Model Question 9 - Illiteracy Eradication and Universal Primary Education',
    passageTemplate:
      'Illiteracy is a major stumbling block in the path of our national prosperity. [a] an illiterate person cannot participate effectively in modern technical jobs. [b] he is easily deceived by corrupt opportunists. [c] our government has introduced free textbooks and stipends for school children. [d] NGOs are running adult literacy centers in remote villages. [e] illiteracy will soon be completely eliminated from Bangladesh.',
    items: [
      { label: 'a', correctAnswer: 'Because', acceptableAnswers: ['As', 'Since', 'Firstly', 'Because'], explanation: 'Causal reasoning connector.' },
      { label: 'b', correctAnswer: 'Moreover', acceptableAnswers: ['Furthermore', 'Besides', 'In addition', 'Moreover'], explanation: 'Additive connector explaining vulnerabilities.' },
      { label: 'c', correctAnswer: 'To solve this problem', acceptableAnswers: ['Fortunately', 'To overcome this', 'In response', 'To solve this problem'], explanation: 'Problem-solution transition connector.' },
      { label: 'd', correctAnswer: 'At the same time', acceptableAnswers: ['Simultaneously', 'Also', 'In addition', 'At the same time'], explanation: 'Concurrent action connector.' },
      { label: 'e', correctAnswer: 'As a result', acceptableAnswers: ['Hopefully', 'Therefore', 'Thus', 'As a result'], explanation: 'Hopeful conclusion connector.' },
    ],
  },
  {
    id: 'conn-model-10',
    board: 'Model Question 10',
    title: 'Model Question 10 - Hard Work, Perseverance, and Goal Fulfillment',
    passageTemplate:
      'Success in life is not an accidental miracle. [a] it is the golden fruit of dedication, perseverance, and patience. [b] Thomas Alva Edison failed a thousand times before inventing the light bulb. [c] he never surrendered to despair. [d] he kept experimenting untiringly until he conquered darkness. [e] we should keep striving relentlessly without fearing initial setbacks.',
    items: [
      { label: 'a', correctAnswer: 'Rather', acceptableAnswers: ['In fact', 'On the contrary', 'Indeed', 'Rather'], explanation: 'Correction/reformulation connector.' },
      { label: 'b', correctAnswer: 'For example', acceptableAnswers: ['For instance', 'Indeed', 'To illustrate', 'For example'], explanation: 'Exemplification connector.' },
      { label: 'c', correctAnswer: 'Yet', acceptableAnswers: ['Still', 'However', 'Nevertheless', 'Yet', 'But'], explanation: 'Concessive contrast connector.' },
      { label: 'd', correctAnswer: 'Instead', acceptableAnswers: ['Rather', 'On the contrary', 'Instead'], explanation: 'Action reinforcement connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Thus', 'Hence', 'Therefore'], explanation: 'Final moral conclusion connector.' },
    ],
  },
  {
    id: 'conn-model-11',
    board: 'Model Question 11',
    title: 'Model Question 11 - Punctuality and Timeliness',
    passageTemplate:
      'Punctuality is the key to accomplishing tasks smoothly. [a] a punctual person values every minute of his day. [b] he completes his assignments well before the deadline. [c] an unpunctual person is always in a hurry. [d] he makes mistakes and fails to achieve desired outcomes. [e] everyone should strictly adhere to time management.',
    items: [
      { label: 'a', correctAnswer: 'Firstly', acceptableAnswers: ['First of all', 'To begin with', 'Primarily', 'Firstly'], explanation: 'Introductory sequential connector establishing the trait of punctuality.' },
      { label: 'b', correctAnswer: 'As a result', acceptableAnswers: ['Consequently', 'Therefore', 'Thus', 'So', 'As a result'], explanation: 'Cause and effect connector indicating timely completion.' },
      { label: 'c', correctAnswer: 'On the other hand', acceptableAnswers: ['In contrast', 'On the contrary', 'However', 'On the other hand'], explanation: 'Adversative connector highlighting contrast with an unpunctual person.' },
      { label: 'd', correctAnswer: 'Consequently', acceptableAnswers: ['Therefore', 'As a result', 'Hence', 'Consequently'], explanation: 'Result connector describing negative outcomes.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Thus', 'Hence', 'So', 'Therefore', 'In conclusion'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-12',
    board: 'Model Question 12',
    title: 'Model Question 12 - Discipline in Student Life',
    passageTemplate:
      'Discipline is indispensable for orderly social and student life. [a] nature functions under strict discipline and regular laws. [b] the planets revolve around the sun in absolute harmony. [c] human life will fall into utter chaos without discipline. [d] students must obey the rules of school, home, and society. [e] they will build a glorious and prosperous future.',
    items: [
      { label: 'a', correctAnswer: 'Indeed', acceptableAnswers: ['In fact', 'Truly', 'Undoubtedly', 'Indeed'], explanation: 'Emphatic connector introducing natural law evidence.' },
      { label: 'b', correctAnswer: 'For instance', acceptableAnswers: ['For example', 'To illustrate', 'For instance'], explanation: 'Exemplification connector illustrating celestial order.' },
      { label: 'c', correctAnswer: 'Similarly', acceptableAnswers: ['Likewise', 'In the same way', 'Similarly'], explanation: 'Comparative connector relating natural order to human society.' },
      { label: 'd', correctAnswer: 'Hence', acceptableAnswers: ['Therefore', 'So', 'Thus', 'Hence'], explanation: 'Deductive connector emphasizing duty.' },
      { label: 'e', correctAnswer: 'Only then', acceptableAnswers: ['In this way', 'Thus', 'As a result', 'Only then'], explanation: 'Conditional result connector.' },
    ],
  },
  {
    id: 'conn-model-13',
    board: 'Model Question 13',
    title: 'Model Question 13 - Rivers of Bangladesh and Flash Floods',
    passageTemplate:
      'The rivers of Bangladesh are our lifeline for agriculture and transport. [a] they bring fertile silt during the rainy season. [b] heavy upstream rainfall causes sudden flash floods. [c] standing crops and village homesteads are washed away. [d] thousands of farmers suffer acute economic distress. [e] permanent embankments and river dredging are urgently needed.',
    items: [
      { label: 'a', correctAnswer: 'First of all', acceptableAnswers: ['Firstly', 'Primarily', 'At first', 'First of all'], explanation: 'Opening connector detailing agricultural benefits.' },
      { label: 'b', correctAnswer: 'However', acceptableAnswers: ['Nevertheless', 'On the contrary', 'Yet', 'Unfortunately', 'However'], explanation: 'Adversative connector introducing the problem of flooding.' },
      { label: 'c', correctAnswer: 'As a consequence', acceptableAnswers: ['As a result', 'Consequently', 'Therefore', 'As a consequence'], explanation: 'Result connector describing devastation.' },
      { label: 'd', correctAnswer: 'Consequently', acceptableAnswers: ['Thus', 'Hence', 'Therefore', 'Consequently'], explanation: 'Cause-effect connector describing human distress.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Thus', 'Hence', 'Therefore'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-14',
    board: 'Model Question 14',
    title: 'Model Question 14 - Mobile Phone Addiction and Solutions',
    passageTemplate:
      'Smartphones have become an inseparable part of modern living. [a] excessive screen time is creating severe mental and physical disorders among teenagers. [b] students waste valuable study hours scrolling social feeds. [c] their academic performance drops drastically. [d] parents should set healthy screen-time limits. [e] schools should encourage outdoor sports and offline recreational activities.',
    items: [
      { label: 'a', correctAnswer: 'However', acceptableAnswers: ['Nevertheless', 'Yet', 'Unfortunately', 'However', 'But'], explanation: 'Adversative connector pivoting to the drawbacks of excessive phone use.' },
      { label: 'b', correctAnswer: 'Firstly', acceptableAnswers: ['In fact', 'For example', 'Moreover', 'Firstly'], explanation: 'Sequential/illustrative connector describing distraction.' },
      { label: 'c', correctAnswer: 'As a result', acceptableAnswers: ['Consequently', 'Therefore', 'Thus', 'As a result'], explanation: 'Result connector linking distraction to poor grades.' },
      { label: 'd', correctAnswer: 'To prevent this', acceptableAnswers: ['Therefore', 'So', 'In response', 'To prevent this'], explanation: 'Problem-solving transition connector.' },
      { label: 'e', correctAnswer: 'Besides', acceptableAnswers: ['Moreover', 'Furthermore', 'In addition', 'Also', 'Besides'], explanation: 'Additive recommendation connector for schools.' },
    ],
  },
  {
    id: 'conn-model-15',
    board: 'Model Question 15',
    title: 'Model Question 15 - Female Education and Economic Growth',
    passageTemplate:
      'No country can achieve prosperity keeping half of its population illiterate. [a] female education is essential for national development. [b] an educated mother raises enlightened and healthy children. [c] educated women can earn an income and contribute to the family budget. [d] rural women in Bangladesh are actively participating in micro-finance and garment industries. [e] we must ensure higher education for every girl child.',
    items: [
      { label: 'a', correctAnswer: 'Therefore', acceptableAnswers: ['Hence', 'So', 'Thus', 'Therefore'], explanation: 'Logical conclusion connector from the opening premise.' },
      { label: 'b', correctAnswer: 'Firstly', acceptableAnswers: ['First of all', 'Primarily', 'In fact', 'Firstly'], explanation: 'Sequential connector listing benefits of educated mothers.' },
      { label: 'c', correctAnswer: 'Secondly', acceptableAnswers: ['Moreover', 'Furthermore', 'Besides', 'In addition', 'Secondly'], explanation: 'Additive connector highlighting economic benefits.' },
      { label: 'd', correctAnswer: 'Nowadays', acceptableAnswers: ['Currently', 'At present', 'Indeed', 'Nowadays'], explanation: 'Temporal connector highlighting present reality.' },
      { label: 'e', correctAnswer: 'So', acceptableAnswers: ['Therefore', 'Hence', 'Thus', 'So'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-16',
    board: 'Model Question 16',
    title: 'Model Question 16 - Patriotism and National Independence',
    passageTemplate:
      'Patriotism is the heartfelt devotion of a citizen toward his motherland. [a] our heroic freedom fighters took up arms in 1971. [b] they were vastly outgunned by the occupation forces. [c] their indomitable courage and supreme sacrifice led to our liberation. [d] we achieved our glorious independence after nine months of bloody struggle. [e] we must dedicate ourselves to defending national sovereignty and democratic ideals.',
    items: [
      { label: 'a', correctAnswer: 'In 1971', acceptableAnswers: ['Historically', 'For instance', 'In 1971'], explanation: 'Historical contextual connector.' },
      { label: 'b', correctAnswer: 'Although', acceptableAnswers: ['Even though', 'Though', 'Although'], explanation: 'Concessive connector acknowledging disparity in weapons.' },
      { label: 'c', correctAnswer: 'Yet', acceptableAnswers: ['Still', 'Nevertheless', 'However', 'Yet'], explanation: 'Adversative connector highlighting heroic triumph.' },
      { label: 'd', correctAnswer: 'Finally', acceptableAnswers: ['Ultimately', 'As a result', 'Eventually', 'Finally'], explanation: 'Sequential culmination connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Hence', 'Thus', 'So', 'Therefore'], explanation: 'Concluding moral duty connector.' },
    ],
  },
  {
    id: 'conn-model-17',
    board: 'Model Question 17',
    title: 'Model Question 17 - Importance of Reading Books',
    passageTemplate:
      'Reading books is the finest habit a person can develop. [a] books widen our mental horizon and broaden our thinking. [b] they introduce us to diverse cultures, historical milestones, and scientific breakthroughs. [c] reading relieves mental stress and loneliness after a hectic day. [d] digital screens are distracting modern youths from reading literature. [e] parents and teachers should inspire children to build personal home libraries.',
    items: [
      { label: 'a', correctAnswer: 'First of all', acceptableAnswers: ['Firstly', 'At first', 'Primarily', 'First of all'], explanation: 'Sequential opener explaining mental benefits.' },
      { label: 'b', correctAnswer: 'Moreover', acceptableAnswers: ['Furthermore', 'In addition', 'Besides', 'Moreover'], explanation: 'Additive connector adding world knowledge aspects.' },
      { label: 'c', correctAnswer: 'Besides', acceptableAnswers: ['Also', 'Furthermore', 'In addition', 'Besides'], explanation: 'Additive connector noting therapeutic benefits.' },
      { label: 'd', correctAnswer: 'However', acceptableAnswers: ['Unfortunately', 'Regrettably', 'Yet', 'However'], explanation: 'Adversative connector identifying contemporary decline in reading.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Hence', 'Thus', 'Therefore'], explanation: 'Concluding actionable advice connector.' },
    ],
  },
  {
    id: 'conn-model-18',
    board: 'Model Question 18',
    title: 'Model Question 18 - Honesty and Moral Integrity',
    passageTemplate:
      'Honesty is universally respected as the best policy in human conduct. [a] an honest man lives with a clear conscience and tranquility. [b] he may face material hardships in the beginning. [c] he wins the enduring admiration and trust of everyone around him. [d] a dishonest man lives in constant fear and guilt. [e] truthfulness and integrity should be practiced in every sphere of life.',
    items: [
      { label: 'a', correctAnswer: 'Undoubtedly', acceptableAnswers: ['In fact', 'Indeed', 'Firstly', 'Undoubtedly', 'Truly'], explanation: 'Emphatic opening connector.' },
      { label: 'b', correctAnswer: 'Although', acceptableAnswers: ['Though', 'Even if', 'Although'], explanation: 'Concessive connector indicating temporary hardships.' },
      { label: 'c', correctAnswer: 'Ultimately', acceptableAnswers: ['Eventually', 'In the end', 'Yet', 'Still', 'Ultimately'], explanation: 'Temporal/result connector describing long-term respect.' },
      { label: 'd', correctAnswer: 'On the contrary', acceptableAnswers: ['In contrast', 'On the other hand', 'Conversely', 'On the contrary'], explanation: 'Direct contrast connector with a dishonest person.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Thus', 'Hence', 'So', 'Therefore'], explanation: 'Concluding moral principle connector.' },
    ],
  },
  {
    id: 'conn-model-19',
    board: 'Model Question 19',
    title: 'Model Question 19 - Global Warming and Renewable Energy',
    passageTemplate:
      'Global temperatures are rising due to unchecked fossil fuel consumption. [a] polar ice caps are melting at an unprecedented speed. [b] sea levels are rising and submerging low-lying delta regions. [c] severe droughts and erratic cyclones are destroying agricultural yields. [d] world nations are transitioning to solar and wind energy. [e] we must preserve green forests to protect the planet for future generations.',
    items: [
      { label: 'a', correctAnswer: 'As a result', acceptableAnswers: ['Consequently', 'Firstly', 'Therefore', 'As a result'], explanation: 'Result connector describing ice melting.' },
      { label: 'b', correctAnswer: 'Secondly', acceptableAnswers: ['Moreover', 'In addition', 'Furthermore', 'Secondly'], explanation: 'Additive/sequential connector describing sea rise.' },
      { label: 'c', correctAnswer: 'Furthermore', acceptableAnswers: ['Besides', 'Moreover', 'Also', 'Furthermore'], explanation: 'Additive connector describing agricultural loss.' },
      { label: 'd', correctAnswer: 'To combat this crisis', acceptableAnswers: ['Fortunately', 'In response', 'Therefore', 'To combat this crisis'], explanation: 'Action/response transition connector.' },
      { label: 'e', correctAnswer: 'Above all', acceptableAnswers: ['Finally', 'In addition', 'Most importantly', 'Above all'], explanation: 'Emphatic concluding connector.' },
    ],
  },
  {
    id: 'conn-model-20',
    board: 'Model Question 20',
    title: 'Model Question 20 - Sports, Games, and Physical Fitness',
    passageTemplate:
      'Physical exercise and sports are vital for a healthy human body and mind. [a] outdoor sports improve blood circulation and build stamina. [b] games teach students discipline, teamwork, and leadership skills. [c] they provide recreation and relieve mental fatigue after heavy studies. [d] some students completely neglect sports and only memorize textbooks. [e] educational institutions must allocate mandatory periods for physical games.',
    items: [
      { label: 'a', correctAnswer: 'First of all', acceptableAnswers: ['Firstly', 'Primarily', 'At first', 'First of all'], explanation: 'Opening sequence connector highlighting physical benefits.' },
      { label: 'b', correctAnswer: 'Secondly', acceptableAnswers: ['Moreover', 'Furthermore', 'In addition', 'Secondly'], explanation: 'Sequential/additive connector highlighting character traits.' },
      { label: 'c', correctAnswer: 'In addition', acceptableAnswers: ['Besides', 'Moreover', 'Also', 'In addition'], explanation: 'Additive connector noting mental refreshment.' },
      { label: 'd', correctAnswer: 'Unfortunately', acceptableAnswers: ['However', 'Regrettably', 'Yet', 'Unfortunately', 'But'], explanation: 'Adversative connector pointing out neglect.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['So', 'Hence', 'Thus', 'Therefore'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-21',
    board: 'Model Question 21',
    title: 'Model Question 21 - Tree Plantation',
    passageTemplate:
      'Trees are very useful to us. [a] they give us oxygen and absorb carbon dioxide. [b] they provide us with fruits, wood and medicine. We should plant more trees [c] the environment is becoming increasingly polluted. [d] we cut down trees indiscriminately, the ecological balance will be disturbed. [e] tree plantation should be made a social movement.',
    items: [
      { label: 'a', correctAnswer: 'Moreover', acceptableAnswers: ['Moreover', 'Furthermore', 'In addition', 'Firstly', 'First of all'], explanation: 'Additive or introductory connector detailing the primary benefits of trees.' },
      { label: 'b', correctAnswer: 'Besides', acceptableAnswers: ['Besides', 'Moreover', 'Furthermore', 'In addition', 'Secondly'], explanation: 'Additive connector adding further benefits.' },
      { label: 'c', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector indicating the reason why we should plant trees.' },
      { label: 'd', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'In case'], explanation: 'Conditional connector stating the condition of indiscriminate felling.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding deduction connector.' },
    ],
  },
  {
    id: 'conn-model-22',
    board: 'Model Question 22',
    title: 'Model Question 22 - A Good Student',
    passageTemplate:
      'A good student is attentive to his studies. [a] he attends his classes regularly, he does not neglect his lessons. He works hard [b] he may achieve good results. [c] he faces difficulties, he does not give up. He knows that success cannot be achieved without effort. [d] he obeys his teachers and respects his parents. [e] everybody loves and respects him.',
    items: [
      { label: 'a', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'As', 'Since', 'While'], explanation: 'Concessive / causal clause connector.' },
      { label: 'b', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction indicating the goal of achieving good results.' },
      { label: 'c', correctAnswer: 'When', acceptableAnswers: ['When', 'Whenever', 'If', 'Even when', 'Even if'], explanation: 'Temporal / conditional connector.' },
      { label: 'd', correctAnswer: 'Moreover', acceptableAnswers: ['Moreover', 'Besides', 'Furthermore', 'In addition', 'Also'], explanation: 'Additive connector listing moral and respectful qualities.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding result connector.' },
    ],
  },
  {
    id: 'conn-model-23',
    board: 'Model Question 23',
    title: 'Model Question 23 - Physical Exercise',
    passageTemplate:
      'Physical exercise is essential for good health. [a] it keeps our body fit, it also refreshes our mind. A person who takes regular exercise can work more efficiently [b] a person who does not exercise. [c] many people know its importance, they do not take exercise regularly. We should exercise every day; [d] we may suffer from various diseases. [e] physical exercise should be made a part of our daily routine.',
    items: [
      { label: 'a', correctAnswer: 'Not only', acceptableAnswers: ['Not only', 'As', 'While', 'Because'], explanation: 'Correlative connector paired with "it also refreshes".' },
      { label: 'b', correctAnswer: 'than', acceptableAnswers: ['than', 'rather than'], explanation: 'Comparative connector following "more efficiently".' },
      { label: 'c', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'Even if'], explanation: 'Concessive connector contrasting awareness with inaction.' },
      { label: 'd', correctAnswer: 'otherwise', acceptableAnswers: ['otherwise', 'or else', 'or'], explanation: 'Adversative conditional connector indicating consequences.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding deduction connector.' },
    ],
  },
  {
    id: 'conn-model-24',
    board: 'Model Question 24',
    title: 'Model Question 24 - Honesty',
    passageTemplate:
      'Honesty is one of the greatest virtues. An honest person is trusted by everyone [a] he always speaks the truth. He may be poor, [b] he is respected by all. A dishonest person may become rich [c] dishonest means, but he cannot earn true respect. [d] we want to lead a peaceful life, we should be honest. [e] honesty is the best policy.',
    items: [
      { label: 'a', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as', 'for'], explanation: 'Causal connector explaining trust in an honest person.' },
      { label: 'b', correctAnswer: 'but', acceptableAnswers: ['but', 'yet', 'still', 'however'], explanation: 'Coordinating adversative conjunction contrasting poverty and respect.' },
      { label: 'c', correctAnswer: 'by', acceptableAnswers: ['by', 'through', 'by means of', 'with'], explanation: 'Prepositional connective link indicating means or medium.' },
      { label: 'd', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Whenever', 'In case'], explanation: 'Conditional clause connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'In fact', 'Truly'], explanation: 'Concluding proverbial connector.' },
    ],
  },
  {
    id: 'conn-model-25',
    board: 'Model Question 25',
    title: 'Model Question 25 - The Value of Time',
    passageTemplate:
      'Time is very valuable. [a] time once passes, it never comes back. We should make proper use of every moment [b] we can succeed in life. Many students waste their valuable time [c] they do not understand its importance. They should remember that time and tide wait for none. [d] they waste their time, they will suffer in the future. [e] everyone should be conscious of the value of time.',
    items: [
      { label: 'a', correctAnswer: 'Once', acceptableAnswers: ['Once', 'When', 'If', 'As'], explanation: 'Temporal / conditional connector.' },
      { label: 'b', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction indicating the objective of success.' },
      { label: 'c', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector explaining why students waste time.' },
      { label: 'd', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Whenever'], explanation: 'Conditional connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding statement connector.' },
    ],
  },
  {
    id: 'conn-model-26',
    board: 'Model Question 26',
    title: 'Model Question 26 - Early Rising',
    passageTemplate:
      'Early rising is a good habit. [a] a person rises early, he gets enough time to complete his daily activities. He can enjoy the fresh air [b] the morning. [c] it is beneficial to health, many people do not practise it. A student should go to bed early [d] he can get up early in the morning. [e] early rising helps us lead a healthy and disciplined life.',
    items: [
      { label: 'a', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Whenever', 'As'], explanation: 'Conditional / temporal connector.' },
      { label: 'b', correctAnswer: 'in', acceptableAnswers: ['in', 'of', 'during', 'in the course of'], explanation: 'Prepositional / connective link.' },
      { label: 'c', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'While'], explanation: 'Concessive connector contrasting benefits with non-practice.' },
      { label: 'd', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Above all'], explanation: 'Concluding summary connector.' },
    ],
  },
  {
    id: 'conn-model-27',
    board: 'Model Question 27',
    title: 'Model Question 27 - Environment Pollution',
    passageTemplate:
      'Environment pollution is a serious problem. Air, water and soil are being polluted in various ways. [a] factories release harmful smoke and waste, the environment becomes polluted. People throw waste here and there [b] they are not conscious of its harmful effects. We must control pollution [c] we want to live a healthy life. [d] proper measures are not taken, the situation will become worse. [e] everyone should work together to protect the environment.',
    items: [
      { label: 'a', correctAnswer: 'When', acceptableAnswers: ['When', 'If', 'As', 'Since', 'Because'], explanation: 'Temporal / causal connector.' },
      { label: 'b', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector explaining careless waste disposal.' },
      { label: 'c', correctAnswer: 'if', acceptableAnswers: ['if', 'provided that', 'in case', 'as long as'], explanation: 'Conditional connector.' },
      { label: 'd', correctAnswer: 'Unless', acceptableAnswers: ['Unless', 'If not', 'If...not', 'If'], explanation: 'Negative conditional connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding call to action.' },
    ],
  },
  {
    id: 'conn-model-28',
    board: 'Model Question 28',
    title: 'Model Question 28 - A Rainy Day',
    passageTemplate:
      'A rainy day is a common phenomenon in Bangladesh. The sky remains cloudy [a] it may rain at any time. Roads become muddy [b] people suffer greatly while travelling. [c] the rain is heavy, poor people often cannot go to work. Students sometimes cannot attend school [d] the roads become waterlogged. [e] a rainy day has both advantages and disadvantages.',
    items: [
      { label: 'a', correctAnswer: 'and', acceptableAnswers: ['and', 'so that', 'so', 'as'], explanation: 'Coordinating conjunction joining descriptive clauses.' },
      { label: 'b', correctAnswer: 'so', acceptableAnswers: ['so', 'and', 'as a result', 'consequently', 'therefore'], explanation: 'Result connector indicating travel difficulties.' },
      { label: 'c', correctAnswer: 'When', acceptableAnswers: ['When', 'If', 'Whenever', 'As', 'Since'], explanation: 'Temporal / conditional connector.' },
      { label: 'd', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'e', correctAnswer: 'However', acceptableAnswers: ['However', 'Nevertheless', 'Nonetheless', 'Yet', 'Still', 'In fact', 'Thus'], explanation: 'Adversative / summarizing transitional connector.' },
    ],
  },
  {
    id: 'conn-model-29',
    board: 'Model Question 29',
    title: 'Model Question 29 - The Importance of Education',
    passageTemplate:
      'Education is the backbone of a nation. [a] a nation is properly educated, it can make progress rapidly. Education removes ignorance [b] develops our sense of responsibility. [c] education is important, many children in poor families cannot continue their studies. The government should take necessary steps [d] every child can receive education. [e] education should be made accessible to all.',
    items: [
      { label: 'a', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Once', 'As'], explanation: 'Conditional clause connector.' },
      { label: 'b', correctAnswer: 'and', acceptableAnswers: ['and', 'as well as', 'while'], explanation: 'Coordinating conjunction combining positive effects.' },
      { label: 'c', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'While'], explanation: 'Concessive connector contrasting importance with poverty barriers.' },
      { label: 'd', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-30',
    board: 'Model Question 30',
    title: 'Model Question 30 - Discipline',
    passageTemplate:
      'Discipline is necessary in every sphere of life. No nation can prosper [a] its people are disciplined. Students should follow a routine [b] they can complete their studies properly. [c] they maintain discipline, they will achieve success more easily. A disciplined person obeys rules [d] he understands their importance. [e] discipline is the key to a successful life.',
    items: [
      { label: 'a', correctAnswer: 'unless', acceptableAnswers: ['unless', 'if not', 'without'], explanation: 'Negative conditional connector.' },
      { label: 'b', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'c', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Whenever', 'Once'], explanation: 'Conditional connector.' },
      { label: 'd', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Undoubtedly', 'Truly'], explanation: 'Concluding summary connector.' },
    ],
  },
  {
    id: 'conn-model-31',
    board: 'Model Question 31',
    title: 'Model Question 31 - Climate Change',
    passageTemplate:
      'Climate change is one of the greatest challenges of the modern world. The temperature of the earth is rising [a] greenhouse gases are increasing. Sea levels may rise [b] the polar ice continues to melt. We should reduce carbon emissions [c] we can protect the environment. [d] immediate action is taken, future generations will face serious problems. [e] all countries should work together to combat climate change.',
    items: [
      { label: 'a', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'b', correctAnswer: 'if', acceptableAnswers: ['if', 'when', 'as long as'], explanation: 'Conditional connector.' },
      { label: 'c', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'd', correctAnswer: 'Unless', acceptableAnswers: ['Unless', 'If not', 'If...not'], explanation: 'Negative conditional connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently'], explanation: 'Concluding call to action.' },
    ],
  },
  {
    id: 'conn-model-32',
    board: 'Model Question 32',
    title: 'Model Question 32 - A Book Fair',
    passageTemplate:
      'A book fair is a popular event in Bangladesh. People visit book fairs [a] they can buy books of different kinds. Many students go there [b] they are interested in reading. [c] the fair is crowded, visitors enjoy it very much. Books are important [d] they increase our knowledge and broaden our minds. [e] everyone should develop the habit of reading books.',
    items: [
      { label: 'a', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'b', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'c', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'While'], explanation: 'Concessive connector contrasting crowds with enjoyment.' },
      { label: 'd', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'In fact'], explanation: 'Concluding advice connector.' },
    ],
  },
  {
    id: 'conn-model-33',
    board: 'Model Question 33',
    title: 'Model Question 33 - Female Education',
    passageTemplate:
      'Female education is essential for the development of a country. An educated woman can educate her children properly [a] she knows the importance of education. [b] women constitute a large part of the population, their education cannot be neglected. A country cannot progress [c] half of its population remains uneducated. The government should provide more opportunities for girls [d] they can continue their studies. [e] female education should receive proper attention.',
    items: [
      { label: 'a', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'b', correctAnswer: 'Since', acceptableAnswers: ['Since', 'As', 'Because', 'Inasmuch as'], explanation: 'Causal connector.' },
      { label: 'c', correctAnswer: 'if', acceptableAnswers: ['if', 'when', 'while', 'as long as', 'unless...not'], explanation: 'Conditional connector.' },
      { label: 'd', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Above all'], explanation: 'Concluding recommendation connector.' },
    ],
  },
  {
    id: 'conn-model-34',
    board: 'Model Question 34',
    title: 'Model Question 34 - Digital Technology',
    passageTemplate:
      'Digital technology has changed our way of life. We can communicate with people around the world [a] we are far away from them. Students can learn many things online [b] they use digital resources properly. Technology saves time; [c] it can sometimes cause problems. Young people should use technology wisely [d] they become addicted to it. [e] technology is useful, it should not be misused.',
    items: [
      { label: 'a', correctAnswer: 'although', acceptableAnswers: ['although', 'even though', 'though', 'even if', 'while'], explanation: 'Concessive connector.' },
      { label: 'b', correctAnswer: 'if', acceptableAnswers: ['if', 'when', 'provided that', 'as long as'], explanation: 'Conditional connector.' },
      { label: 'c', correctAnswer: 'however', acceptableAnswers: ['however', 'nevertheless', 'nonetheless', 'yet', 'still', 'on the other hand'], explanation: 'Adversative transition connector.' },
      { label: 'd', correctAnswer: 'lest', acceptableAnswers: ['lest', 'so that...not', 'otherwise', 'in case'], explanation: 'Negative purpose conjunction meaning "for fear that".' },
      { label: 'e', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'While'], explanation: 'Concessive connector.' },
    ],
  },
  {
    id: 'conn-model-35',
    board: 'Model Question 35',
    title: 'Model Question 35 - A Village Market',
    passageTemplate:
      'A village market is an important place for rural people. Farmers bring their products to the market [a] they can sell them. Buyers come there [b] they can purchase necessary goods. The market becomes crowded on certain days. [c] it is often noisy and dirty, it is very useful to villagers. People can buy vegetables, fish and other things [d] they need them for daily life. [e] a village market plays an important role in rural life.',
    items: [
      { label: 'a', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'b', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose conjunction.' },
      { label: 'c', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'While'], explanation: 'Concessive connector.' },
      { label: 'd', correctAnswer: 'when', acceptableAnswers: ['when', 'whenever', 'as', 'because', 'since'], explanation: 'Temporal / causal connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Undoubtedly', 'Truly'], explanation: 'Concluding statement connector.' },
    ],
  },
  {
    id: 'conn-model-36',
    board: 'Model Question 36',
    title: 'Model Question 36 - The Liberation War',
    passageTemplate:
      'The Liberation War of Bangladesh is a glorious chapter in our history. Millions of people suffered [a] they wanted to achieve independence. The freedom fighters fought bravely [b] they had limited resources. Many people sacrificed their lives [c] the country could become independent. [d] we remember their sacrifice, we become proud of our nation. [e] we should always respect the freedom fighters.',
    items: [
      { label: 'a', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'b', correctAnswer: 'although', acceptableAnswers: ['although', 'though', 'even though', 'while'], explanation: 'Concessive connector.' },
      { label: 'c', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose connector.' },
      { label: 'd', correctAnswer: 'When', acceptableAnswers: ['When', 'Whenever', 'As', 'If'], explanation: 'Temporal connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Above all'], explanation: 'Concluding statement connector.' },
    ],
  },
  {
    id: 'conn-model-37',
    board: 'Model Question 37',
    title: 'Model Question 37 - Road Safety',
    passageTemplate:
      'Road accidents are increasing day by day. Many accidents occur [a] drivers violate traffic rules. Pedestrians should use footbridges [b] they can cross busy roads safely. Drivers must not drive recklessly [c] accidents may occur. [d] everyone follows traffic rules, road accidents can be reduced. [e] road safety is the responsibility of all.',
    items: [
      { label: 'a', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'b', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose connector.' },
      { label: 'c', correctAnswer: 'otherwise', acceptableAnswers: ['otherwise', 'or else', 'or', 'lest'], explanation: 'Adversative / cautionary conditional connector.' },
      { label: 'd', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Provided that', 'As long as'], explanation: 'Conditional connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently', 'In fact'], explanation: 'Concluding statement connector.' },
    ],
  },
  {
    id: 'conn-model-38',
    board: 'Model Question 38',
    title: 'Model Question 38 - Student Life',
    passageTemplate:
      'Student life is the best period for preparing oneself for the future. Students should study regularly [a] they can build a strong foundation. They should take part in games and sports [b] physical exercise is necessary for good health. [c] they waste their student life, they may regret it later. They should obey their teachers [d] teachers guide them in the right direction. [e] students should use their time properly.',
    items: [
      { label: 'a', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose connector.' },
      { label: 'b', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'c', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'In case'], explanation: 'Conditional connector.' },
      { label: 'd', correctAnswer: 'because', acceptableAnswers: ['because', 'since', 'as'], explanation: 'Causal connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Above all'], explanation: 'Concluding advice connector.' },
    ],
  },
  {
    id: 'conn-model-39',
    board: 'Model Question 39',
    title: 'Model Question 39 - Social Media',
    passageTemplate:
      'Social media has become very popular among young people. It helps us communicate with others [a] we are far away from them. People can share information quickly; [b] false information can also spread rapidly. We should verify information [c] sharing it with others. [d] social media is useful, excessive use can waste valuable time. We should use it wisely [e] we can gain its benefits without being harmed.',
    items: [
      { label: 'a', correctAnswer: 'although', acceptableAnswers: ['although', 'even though', 'though', 'while', 'even if'], explanation: 'Concessive connector.' },
      { label: 'b', correctAnswer: 'however', acceptableAnswers: ['however', 'nevertheless', 'nonetheless', 'yet', 'still', 'on the other hand'], explanation: 'Adversative transition connector.' },
      { label: 'c', correctAnswer: 'before', acceptableAnswers: ['before', 'prior to'], explanation: 'Temporal prepositional connector preceding gerund.' },
      { label: 'd', correctAnswer: 'Although', acceptableAnswers: ['Although', 'Though', 'Even though', 'While'], explanation: 'Concessive connector.' },
      { label: 'e', correctAnswer: 'so that', acceptableAnswers: ['so that', 'in order that', 'that'], explanation: 'Purpose connector.' },
    ],
  },
  {
    id: 'conn-model-40',
    board: 'Model Question 40',
    title: 'Model Question 40 - Hard Work and Success',
    passageTemplate:
      'Hard work is the key to success. Nobody can achieve great success [a] making sincere efforts. A student may be intelligent, [b] he cannot do well without regular study. We should continue our efforts [c] we face difficulties. [d] we work hard and remain patient, we are more likely to achieve our goals. [e] hard work and perseverance are essential for success.',
    items: [
      { label: 'a', correctAnswer: 'without', acceptableAnswers: ['without', 'unless'], explanation: 'Prepositional / conditional connector preceding gerund.' },
      { label: 'b', correctAnswer: 'but', acceptableAnswers: ['but', 'yet', 'still', 'however'], explanation: 'Adversative coordinating conjunction.' },
      { label: 'c', correctAnswer: 'although', acceptableAnswers: ['although', 'though', 'even though', 'even if'], explanation: 'Concessive connector.' },
      { label: 'd', correctAnswer: 'If', acceptableAnswers: ['If', 'When', 'Whenever', 'As long as'], explanation: 'Conditional connector.' },
      { label: 'e', correctAnswer: 'Therefore', acceptableAnswers: ['Therefore', 'Thus', 'Hence', 'So', 'Consequently', 'Truly', 'In conclusion'], explanation: 'Concluding summary connector.' },
    ],
  },
];

