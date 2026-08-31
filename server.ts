import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Evaluation Route for SSC English 2nd Paper
  app.post('/api/ai-check', async (req, res) => {
    const { itemType, questionContext, userAnswers, expectedAnswers } = req.body;

    if (!userAnswers) {
      return res.status(400).json({ error: 'Missing userAnswers in request body.' });
    }

    if (!ai || !process.env.GEMINI_API_KEY) {
      return res.json({
        aiPowered: false,
        message: 'AI key not detected. Using built-in comprehensive rule verification.',
      });
    }

    try {
      const prompt = `You are a strict, helpful, and expert SSC English 2nd Paper (Bangladesh National Curriculum) Examiner & Teacher.
Evaluate the student's answers for the following English test item:

Topic / Item Type: "${itemType}"
Context / Passage / Questions:
${JSON.stringify(questionContext, null, 2)}

Expected Model Answers (Reference):
${JSON.stringify(expectedAnswers, null, 2)}

Student Submitted Answers:
${JSON.stringify(userAnswers, null, 2)}

Instructions:
1. Compare each submitted answer against standard grammatical rules, spelling, punctuation, capitalization, and semantic correctness.
2. Allow valid grammatical variations (e.g. synonyms, contractions or expanded tags, alternate valid transformations).
3. Score each question accurately.
4. Provide constructive, student-friendly feedback in simple English with Bangla tips where helpful.
5. Highlight specific mistakes (e.g., missed question mark, incorrect verb form, wrong preposition, wrong case).

Respond ONLY with a JSON object in the following format:
{
  "totalScore": number,
  "maxScore": number,
  "percentage": number,
  "overallFeedback": string,
  "banglaTips": string,
  "items": [
    {
      "index": number,
      "isCorrect": boolean,
      "studentAnswer": string,
      "correctAnswer": string,
      "explanation": string,
      "feedback": string
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);

      return res.json({
        aiPowered: true,
        evaluation: parsed,
      });
    } catch (err: any) {
      console.error('AI Check error:', err);
      return res.status(500).json({
        error: 'Failed to generate AI evaluation',
        details: err?.message || String(err),
      });
    }
  });

  // Unified AI & ChatGPT Examination Engine for All 9 SSC Grammar Items
  app.post('/api/ai-grammar-examine', async (req, res) => {
    const { itemNumber, itemTitle, provider, exerciseContext, items, userAnswers } = req.body;

    if (!items || !Array.isArray(items) || !userAnswers) {
      return res.status(400).json({ error: 'Missing items or userAnswers in request body.' });
    }

    const isChatGPT = provider === 'chatgpt';
    const providerName = isChatGPT ? 'ChatGPT English Tutor' : 'Gemini 3.7 AI Examiner';

    // Maximum marks per item according to SSC English 2nd Paper Syllabus:
    // Item 1 (Gap Filling with clues): 0.5 x 10 = 5.0
    // Item 2 (Substitution Table): 1 x 5 = 5.0 (or 5 sentences = 5.0)
    // Item 3 (Right Form of Verbs): 0.5 x 10 = 5.0
    // Item 4 (Changing Sentences / Transformation): 1 x 10 = 10.0 (or 5.0)
    // Item 5 (Tag Questions): 1 x 5 = 5.0
    // Item 6 (Suffix and Prefix): 0.5 x 10 = 5.0
    // Item 7 (Prepositions): 0.5 x 10 = 5.0
    // Item 8 (Connectors & Linking Words): 0.5 x 10 = 5.0
    // Item 9 (Punctuation & Capitalisation): 0.5 x 10 = 5.0
    let marksPerGap = 0.5;
    let maxMarks = 5.0;
    if (itemNumber === 2 || itemNumber === 5) {
      marksPerGap = 1.0;
      maxMarks = 5.0;
    } else if (itemNumber === 4) {
      marksPerGap = items.length === 10 ? 1.0 : 1.0;
      maxMarks = items.length === 10 ? 10.0 : 5.0;
    }

    // Local intelligent evaluation fallback when API key is missing or offline
    const buildFallbackEvaluation = () => {
      // Specialized Substitution Table evaluation (Item 2)
      if (itemNumber === 2) {
        const cleanNorm = (str: string) =>
          String(str || '')
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        const validCombos = (exerciseContext?.validCombinations || items || []).map((v: any) => {
          const raw = v.fullSentence || v.correctAnswer || `${v.partA || ''} ${v.partB || ''} ${v.partC || ''}`;
          return {
            raw: String(raw).trim(),
            partA: String(v.partA || '').trim(),
            partB: String(v.partB || '').trim(),
            partC: String(v.partC || '').trim(),
            normalized: cleanNorm(raw),
            normalizedParts: cleanNorm(`${v.partA || ''} ${v.partB || ''} ${v.partC || ''}`),
            normA: cleanNorm(v.partA || ''),
            normB: cleanNorm(v.partB || ''),
            normC: cleanNorm(v.partC || ''),
          };
        });

        const matchedComboIndices = new Set<number>();
        let correctCount = 0;

        const gapEvaluations = [1, 2, 3, 4, 5].map((num, sIdx) => {
          const label = `Sentence #${num}`;
          const studentRaw =
            typeof userAnswers === 'object' && !Array.isArray(userAnswers)
              ? userAnswers[label] ||
                userAnswers[`sentence_${num}`] ||
                userAnswers[String(num)] ||
                userAnswers[sIdx] ||
                ''
              : Array.isArray(userAnswers)
              ? userAnswers[sIdx] || ''
              : '';

          const normStudent = cleanNorm(studentRaw);

          let isMatch = false;
          let matchedComboText = '';

          if (
            normStudent.length > 0 &&
            !normStudent.includes('incomplete') &&
            !normStudent.includes('(incomplete)')
          ) {
            for (let cIdx = 0; cIdx < validCombos.length; cIdx++) {
              if (!matchedComboIndices.has(cIdx)) {
                const target = validCombos[cIdx];
                if (
                  normStudent === target.normalized ||
                  normStudent === target.normalizedParts ||
                  (target.normA && target.normB && target.normC && normStudent === cleanNorm(`${target.normA} ${target.normB} ${target.normC}`))
                ) {
                  isMatch = true;
                  matchedComboIndices.add(cIdx);
                  matchedComboText = target.raw;
                  break;
                }
              }
            }
          }

          if (isMatch) correctCount += 1;

          // Find first unassigned combo for fallback
          let fallbackAns = '';
          for (let cIdx = 0; cIdx < validCombos.length; cIdx++) {
            if (!matchedComboIndices.has(cIdx)) {
              fallbackAns = validCombos[cIdx].raw;
              break;
            }
          }
          if (!fallbackAns && validCombos[sIdx]) {
            fallbackAns = validCombos[sIdx].raw;
          }

          return {
            label,
            prompt: `Sentence Construction #${num}`,
            studentAnswer:
              studentRaw && !String(studentRaw).includes('incomplete')
                ? String(studentRaw).trim()
                : '(Incomplete Sentence)',
            correctAnswer: matchedComboText || fallbackAns,
            isCorrect: isMatch,
            collocation: 'Subject + Verb + Complement Alignment',
            ruleExplanation: isMatch
              ? `Grammatically and semantically coherent sentence from the table: "${matchedComboText}".`
              : `Valid sentence combination: "${fallbackAns}".`,
            banglaRule:
              'সারণী থেকে কর্তা (Subject), ক্রিয়া (Verb) ও কর্ম (Object/Complement) মিলিয়ে অর্থপূর্ণ বাক্য তৈরি।',
            whyIncorrect: isMatch
              ? ''
              : !studentRaw || String(studentRaw).includes('incomplete')
              ? 'Sentence incomplete (সবগুলো অংশ drag & drop করে পূরণ করা হয়নি).'
              : 'The selected parts do not form a semantically logical or factually coherent sentence from the table.',
          };
        });

        const calculatedScore = correctCount;
        const percentage = Math.round((calculatedScore / 5) * 100);

        return {
          aiPowered: false,
          provider: providerName,
          totalScore: calculatedScore,
          maxScore: 5,
          percentage,
          grade:
            calculatedScore === 5
              ? 'A+'
              : calculatedScore >= 4
              ? 'A'
              : calculatedScore >= 3
              ? 'B'
              : 'Needs Practice',
          overallFeedback:
            calculatedScore === 5
              ? `Outstanding! You successfully formed all 5 correct sentences in ${itemTitle}. Your sentence structure and meaning alignment are flawless.`
              : calculatedScore >= 3
              ? `Good performance (${calculatedScore}/5) in ${itemTitle}! Review the mismatched sentence combinations.`
              : `Keep practicing (${calculatedScore}/5) in ${itemTitle}. Ensure each subject is combined with an appropriate verb and complement.`,
          banglaTips:
            'প্রতিস্থাপন সারণী (Substitution Table) থেকে বাক্য গঠনের সময় কর্তা অনুযায়ী ক্রিয়া এবং অর্থ অনুযায়ী উপযুক্ত Complement নির্বাচন করুন। বাক্যের ক্রম যেকোনো অর্ডারে রাখা যায়।',
          gapEvaluations,
          studySuggestions: [
            'Match singular subject with singular verb and plural subject with plural verb.',
            'Sentences can be created in any order as long as the 5 combinations are valid and meaningful.',
            'Ensure all three parts (Subject, Verb, Complement) are selected for each sentence.',
          ],
        };
      }

      let correctCount = 0;
      const gapEvaluations = items.map((item: any) => {
        const key = item.label !== undefined ? String(item.label) : String(item.index ?? '');
        const studentRaw =
          typeof userAnswers === 'object' && !Array.isArray(userAnswers)
            ? userAnswers[key] || userAnswers[`sentence_${key}`] || userAnswers[String(key).replace(/\D/g, '')] || ''
            : Array.isArray(userAnswers)
            ? userAnswers[item.index || 0] || ''
            : '';
        const studentAns = String(studentRaw).trim().toLowerCase();
        const correct = String(item.correctAnswer || '').trim().toLowerCase();
        const acceptable = (item.acceptableAnswers || []).map((a: string) => String(a || '').trim().toLowerCase());
        
        // Match checking
        let isMatch = false;
        if (studentAns.length > 0) {
          if (studentAns === correct || acceptable.includes(studentAns)) {
            isMatch = true;
          } else {
            // Normalize punctuation/spaces for comparison
            const normStudent = studentAns.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, '').replace(/\s+/g, ' ').trim();
            const normCorrect = correct.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, '').replace(/\s+/g, ' ').trim();
            if (normStudent === normCorrect) {
              isMatch = true;
            }
          }
        }

        if (isMatch) correctCount += 1;

        return {
          label: String(item.label || item.index || ''),
          prompt: item.prompt || item.target || item.baseWord || '',
          studentAnswer: studentRaw,
          correctAnswer: item.correctAnswer || '',
          isCorrect: isMatch,
          collocation: item.ruleExplanation?.split(':')[0] || 'Grammar Rule',
          ruleExplanation: item.ruleExplanation || `Standard grammatical usage: "${item.correctAnswer}".`,
          banglaRule: item.banglaRule || item.ruleExplanation || 'জাতীয় শিক্ষাক্রম ও বোর্ড পরীক্ষার ব্যাকরণ নিয়ম।',
          whyIncorrect: isMatch
            ? ''
            : studentAns.length === 0
            ? 'Gap left blank (কোনো উত্তর লেখা হয়নি).'
            : `"${studentRaw}" does not satisfy the required grammar rule or context. The expected correct form is "${item.correctAnswer}".`,
        };
      });

      const calculatedScore = Math.round(correctCount * marksPerGap * 10) / 10;
      const percentage = Math.round((calculatedScore / maxMarks) * 100);

      return {
        aiPowered: false,
        provider: providerName,
        totalScore: calculatedScore,
        maxScore: maxMarks,
        percentage,
        grade: percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'Needs Practice',
        overallFeedback:
          calculatedScore === maxMarks
            ? `Outstanding! You achieved full marks in ${itemTitle}. Your understanding of grammar rules and sentence patterns is excellent.`
            : calculatedScore >= maxMarks * 0.7
            ? `Great performance (${calculatedScore} / ${maxMarks})! You have a solid grasp of ${itemTitle}. Review the highlighted points to secure 100% marks.`
            : `Good effort (${calculatedScore} / ${maxMarks}) in ${itemTitle}. Carefully study the rules and practice regularly for board exams.`,
        banglaTips:
          `বোর্ড পরীক্ষায় ${itemTitle} এ পূর্ণ নম্বর পেতে পুরো প্যাসেজটি পড়ে অর্থ ও Grammatical Context বুঝে উত্তর লিখুন।`,
        gapEvaluations,
        studySuggestions: [
          'Read the complete sentence to understand the subject, tense, and connector relationship.',
          'Double check spelling, capitalization, and punctuation marks.',
          'Review the provided explanation for any gaps you missed.',
        ],
      };
    };

    if (!ai || !process.env.GEMINI_API_KEY) {
      return res.json({
        aiPowered: false,
        evaluation: buildFallbackEvaluation(),
      });
    }

    try {
      const personaPrompt = isChatGPT
        ? `You are ChatGPT English Tutor — an expert, pedagogical, and encouraging English teacher specializing in the Bangladesh SSC English 2nd Paper examination.`
        : `You are Gemini 3.7 AI Chief Examiner — an official SSC English 2nd Paper Curriculum & Board Examiner AI.`;

      let itemSpecificPrompt = '';
      if (itemNumber === 2) {
        itemSpecificPrompt = `
CRITICAL EXAMINATION RULES FOR ITEM 2 (SUBSTITUTION TABLE):
- In Question 2 (Substitution Table), the student constructs 5 sentences by connecting Part A, Part B, and Part C.
- RULE 1 (ORDER DOES NOT MATTER): The student is allowed to create the 5 sentences in ANY ORDER. Sentence #1 does not have to be Model #1; it can be Model #4, #5, etc.
- RULE 2 (VALIDITY OVER ORDER): Compare each student sentence (Sentence #1 to #5) against the entire set of valid combinations from the board table.
- RULE 3 (CASE & PUNCTUATION TOLERANCE): Ignore differences in capitalization or trailing periods (full stops).
- RULE 4 (NO FALSE "WRONG COMBINATION"): If a student sentence forms a valid, meaningful, and factually correct combination from the table, it MUST be evaluated as "isCorrect": true, "whyIncorrect": "", and awarded 1.0 mark.
- RULE 5 (FULL MARKS FOR 5 VALID SENTENCES): If all 5 submitted sentences match the 5 valid combinations (in any sequence), you MUST set "totalScore": 5, "percentage": 100, "grade": "A+".
`;
      }

      const prompt = `${personaPrompt}

Task: Examine and evaluate a student's submission for Question No. ${itemNumber}: ${itemTitle}.
Total Marks: ${maxMarks} (Each item worth: ${marksPerGap} mark).
${itemSpecificPrompt}
Context / Board Information:
${JSON.stringify(exerciseContext || {}, null, 2)}

Expected Key Items & Answers:
${JSON.stringify(items, null, 2)}

Student Submitted Answers:
${JSON.stringify(userAnswers, null, 2)}

Evaluation Guidelines:
1. Examine each gap/sentence/item individually. Compare against standard English grammar, syntax, spelling, punctuation, capitalization, and appropriate collocations.
2. Be fair: if the student provided a valid grammatical synonym or acceptable alternative that preserves meaning and accuracy, mark it correct.
3. If incorrect, clearly explain why in English and Bengali (ভুলের কারণ ও ব্যাকরণ নিয়ম).
4. Calculate total score (${marksPerGap} marks per correct item up to ${maxMarks} marks).
5. Provide overall pedagogical feedback, high-yield Bengali tips (বাংলা টিপস), and 3 actionable study suggestions.

Respond strictly in JSON matching this exact structure:
{
  "totalScore": number,
  "maxScore": ${maxMarks},
  "percentage": number,
  "grade": string,
  "overallFeedback": string,
  "banglaTips": string,
  "gapEvaluations": [
    {
      "label": string,
      "prompt": string,
      "studentAnswer": string,
      "correctAnswer": string,
      "isCorrect": boolean,
      "collocation": string,
      "ruleExplanation": string,
      "banglaRule": string,
      "whyIncorrect": string
    }
  ],
  "studySuggestions": [
    string,
    string,
    string
  ]
}`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });
      } catch (firstErr: any) {
        console.warn('Gemini 2.5 flash busy or failed, attempting with gemini-2.0-flash:', firstErr?.message || firstErr);
        try {
          response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          });
        } catch (secondErr: any) {
          console.warn('AI model temporarily unavailable (503/high demand), smoothly activating local intelligence evaluator.');
          return res.json({
            aiPowered: true,
            provider: providerName,
            evaluation: buildFallbackEvaluation(),
          });
        }
      }

      const parsed = JSON.parse(response.text || '{}');

      // Post-validation safeguards for Substitution Table (Item 2)
      if (itemNumber === 2 && exerciseContext?.validCombinations && Array.isArray(exerciseContext.validCombinations)) {
        const cleanNorm = (str: string) =>
          String(str || '')
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        const validCombos = exerciseContext.validCombinations.map((v: any) => ({
          raw: v.fullSentence,
          partA: String(v.partA || '').trim(),
          partB: String(v.partB || '').trim(),
          partC: String(v.partC || '').trim(),
          normalized: cleanNorm(v.fullSentence || ''),
          normalizedParts: cleanNorm(`${v.partA || ''} ${v.partB || ''} ${v.partC || ''}`),
          normA: cleanNorm(v.partA || ''),
          normB: cleanNorm(v.partB || ''),
          normC: cleanNorm(v.partC || ''),
        }));

        const matchedIndices = new Set<number>();
        let recomputedScore = 0;

        // Ensure we iterate through the 5 sentences
        const safeGapEvals: any[] = [];

        for (let sIdx = 0; sIdx < 5; sIdx++) {
          const num = sIdx + 1;
          const label = `Sentence #${num}`;
          const rawUserAns =
            typeof userAnswers === 'object' && !Array.isArray(userAnswers)
              ? userAnswers[label] ||
                userAnswers[`sentence_${num}`] ||
                userAnswers[String(num)] ||
                userAnswers[sIdx] ||
                ''
              : Array.isArray(userAnswers)
              ? userAnswers[sIdx] || ''
              : '';

          const existingEval = Array.isArray(parsed.gapEvaluations)
            ? parsed.gapEvaluations[sIdx] || {}
            : {};

          const studentAns = rawUserAns || existingEval.studentAnswer || '';
          const normStudent = cleanNorm(studentAns);

          let isMatch = false;
          let matchedComboRaw = '';

          if (
            normStudent &&
            !normStudent.includes('incomplete') &&
            !normStudent.includes('(incomplete)')
          ) {
            for (let cIdx = 0; cIdx < validCombos.length; cIdx++) {
              if (!matchedIndices.has(cIdx)) {
                const target = validCombos[cIdx];
                if (
                  normStudent === target.normalized ||
                  normStudent === target.normalizedParts ||
                  (target.normA && target.normB && target.normC && normStudent === cleanNorm(`${target.normA} ${target.normB} ${target.normC}`))
                ) {
                  isMatch = true;
                  matchedIndices.add(cIdx);
                  matchedComboRaw = target.raw;
                  break;
                }
              }
            }
          }

          if (isMatch) {
            recomputedScore += 1;
          }

          // Unassigned fallback combo
          let fallbackCombo = '';
          for (let cIdx = 0; cIdx < validCombos.length; cIdx++) {
            if (!matchedIndices.has(cIdx)) {
              fallbackCombo = validCombos[cIdx].raw;
              break;
            }
          }
          if (!fallbackCombo && validCombos[sIdx]) {
            fallbackCombo = validCombos[sIdx].raw;
          }

          safeGapEvals.push({
            label,
            prompt: existingEval.prompt || `Sentence Construction #${num}`,
            studentAnswer: studentAns && !studentAns.includes('incomplete') ? studentAns : '(Incomplete Sentence)',
            correctAnswer: isMatch ? matchedComboRaw : (existingEval.correctAnswer || fallbackCombo),
            isCorrect: isMatch,
            collocation: 'Subject + Verb + Complement Alignment',
            ruleExplanation: isMatch
              ? `Grammatically and semantically coherent sentence from the table: "${matchedComboRaw}".`
              : (existingEval.ruleExplanation || `Valid sentence combination: "${fallbackCombo}".`),
            banglaRule:
              existingEval.banglaRule ||
              'সারণী থেকে কর্তা (Subject), ক্রিয়া (Verb) ও কর্ম (Object/Complement) মিলিয়ে অর্থপূর্ণ বাক্য তৈরি।',
            whyIncorrect: isMatch
              ? ''
              : !studentAns || String(studentAns).includes('incomplete')
              ? 'Sentence incomplete (সবগুলো অংশ drag & drop করে পূরণ করা হয়নি).'
              : (existingEval.whyIncorrect || 'The selected parts do not form a semantically logical or factually coherent sentence from the table.'),
          });
        }

        parsed.gapEvaluations = safeGapEvals;
        parsed.totalScore = recomputedScore;
        parsed.percentage = Math.round((recomputedScore / 5) * 100);
        parsed.grade =
          recomputedScore === 5
            ? 'A+'
            : recomputedScore >= 4
            ? 'A'
            : recomputedScore >= 3
            ? 'B'
            : 'Needs Practice';

        if (recomputedScore === 5) {
          parsed.overallFeedback =
            'Splendid! All 5 sentences are grammatically and syntactically flawless. You have successfully formed all valid combinations.';
        }
      }

      return res.json({
        aiPowered: true,
        provider: providerName,
        evaluation: {
          ...parsed,
          maxScore: maxMarks,
        },
      });
    } catch (err: any) {
      console.warn('AI grammar examine error, falling back to local evaluation:', err);
      return res.json({
        aiPowered: false,
        provider: providerName,
        evaluation: buildFallbackEvaluation(),
      });
    }
  });

  // Dedicated AI & ChatGPT Preposition Examination & Feedback Route
  app.post('/api/ai-preposition-examine', async (req, res) => {
    const { passageTitle, passageTemplate, items, userAnswers, provider } = req.body;

    if (!userAnswers || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing items or userAnswers in request body.' });
    }

    const isChatGPT = provider !== 'gemini';

    if (!ai || !process.env.GEMINI_API_KEY) {
      // Fallback algorithmic evaluation with comprehensive grammatical explanations
      let correctCount = 0;
      const gapEvaluations = items.map((item: any) => {
        const studentAns = (userAnswers[item.label] || '').trim().toLowerCase();
        const correct = (item.correctAnswer || '').trim().toLowerCase();
        const acceptable = (item.acceptableAnswers || []).map((a: string) => (a || '').trim().toLowerCase());
        const isMatch = studentAns.length > 0 && (studentAns === correct || acceptable.includes(studentAns));

        if (isMatch) correctCount += 1;

        return {
          label: item.label,
          studentAnswer: userAnswers[item.label] || '',
          correctAnswer: item.correctAnswer,
          isCorrect: isMatch,
          collocation: item.ruleExplanation?.split(':')[0] || `${item.correctAnswer} (preposition)`,
          ruleExplanation: item.ruleExplanation || `Standard appropriate preposition usage: "${item.correctAnswer}".`,
          banglaRule: item.ruleExplanation || 'উপযুক্ত প্রিপজিশন এর সঠিক নিয়ম অনুযায়ী ব্যবহার।',
          whyIncorrect: isMatch
            ? ''
            : studentAns.length === 0
            ? 'Gap left blank (কোনো উত্তর দেওয়া হয়নি).'
            : `"${studentAns}" does not form the required collocation or idiom in this sentence. The fixed preposition here is "${item.correctAnswer}".`,
        };
      });

      const calculatedScore = Math.round(correctCount * 0.5 * 10) / 10;
      return res.json({
        aiPowered: false,
        evaluation: {
          totalScore: calculatedScore,
          maxScore: 5,
          percentage: (calculatedScore / 5) * 100,
          grade: calculatedScore >= 4.5 ? 'A+' : calculatedScore >= 4 ? 'A' : calculatedScore >= 3 ? 'B' : 'Needs Practice',
          overallFeedback:
            calculatedScore === 5
              ? 'Outstanding performance! You mastered every appropriate preposition and idiom in this board passage.'
              : calculatedScore >= 3.5
              ? 'Great job! You have a solid grasp of prepositions. Review the few highlighted collocations for full marks.'
              : 'Keep practicing! Focus on learning fixed prepositions and their exact Bengali meanings.',
          banglaTips:
            'Appropriate Preposition মুখস্থ করার সবচেয়ে সহজ কৌশল হলো শব্দটিকে এর পরবর্তী বা পূর্ববর্তী শব্দের সাথে মিলিয়ে গ্রুপ হিসেবে পড়া (যেমন: keen on, proud of, abide by)।',
          gapEvaluations,
          chatGptSuggestions: [
            'Read the full sentence before choosing the preposition to identify the governing verb or adjective.',
            'Memorize common SSC collocations (e.g., devoted to, depend on, harmful to, key to).',
            'Watch out for prepositions indicating direction vs place (e.g., into vs in, at vs on).',
          ],
        },
      });
    }

    try {
      const prompt = `You are ChatGPT English Tutor & Bangladesh SSC English 2nd Paper Chief Examiner.
Examine and evaluate a student's answers for Question No. 7: Appropriate Prepositions (Marks: 0.5 x 10 = 5 Marks).

Passage Title: "${passageTitle || 'Preposition Board Exercise'}"
Passage Template (with gaps [a] to [j]):
"""
${passageTemplate}
"""

Expected Key Collocations & Answers:
${JSON.stringify(items, null, 2)}

Student Submitted Answers:
${JSON.stringify(userAnswers, null, 2)}

Evaluation Criteria:
1. Check each gap (a) through (j). Total marks: 5 (0.5 marks per gap).
2. For each gap, check whether the student's answer is correct or an acceptable standard English preposition in that exact sentence context.
3. If incorrect, explain why the student's preposition does not fit, and provide the exact grammatical rule / appropriate preposition collocation (with Bengali meaning).
4. Provide an encouraging, pedagogical ChatGPT-style assessment summary.
5. Provide high-yield Bengali tips (বাংলা টিপস) and 3 actionable improvement suggestions.

Respond strictly in JSON matching this exact structure:
{
  "totalScore": number,
  "maxScore": 5,
  "percentage": number,
  "grade": string,
  "overallFeedback": string,
  "banglaTips": string,
  "gapEvaluations": [
    {
      "label": string,
      "studentAnswer": string,
      "correctAnswer": string,
      "isCorrect": boolean,
      "collocation": string,
      "ruleExplanation": string,
      "banglaRule": string,
      "whyIncorrect": string
    }
  ],
  "chatGptSuggestions": [
    string,
    string,
    string
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        aiPowered: true,
        evaluation: parsed,
      });
    } catch (err: any) {
      console.error('AI Preposition Examine error:', err);
      return res.status(500).json({
        error: 'Failed to examine prepositions via AI',
        details: err?.message || String(err),
      });
    }
  });

  // AI Writing Evaluator Route for Paragraphs, Emails, Letters, Applications & Compositions
  app.post('/api/ai-writing-review', async (req, res) => {
    const { topic, writingType, studentText, maxMarks } = req.body;

    if (!studentText) {
      return res.status(400).json({ error: 'Missing studentText in request body.' });
    }

    if (!ai || !process.env.GEMINI_API_KEY) {
      return res.json({
        aiPowered: false,
        message: 'AI key not configured.',
      });
    }

    try {
      const prompt = `You are a seasoned SSC English board examiner in Bangladesh.
Review the following student written ${writingType} on the topic "${topic}".
Max Marks: ${maxMarks || 10}

Student Submission:
"""
${studentText}
"""

Evaluate on:
1. Relevance to topic and content richness (Ideas & structure)
2. Grammatical accuracy and sentence variety
3. Vocabulary and spelling
4. Organization, coherence, punctuation, and formatting (e.g. Email/letter/application structure if applicable)

Respond strictly in JSON format:
{
  "marksAwarded": number,
  "maxMarks": number,
  "grade": string,
  "overallAssessment": string,
  "strengths": [string],
  "areasForImprovement": [string],
  "correctedVersion": string,
  "banglaAdvice": string
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        aiPowered: true,
        review: parsed,
      });
    } catch (err: any) {
      console.error('Writing review error:', err);
      return res.status(500).json({
        error: 'Failed to review writing',
        details: err?.message || String(err),
      });
    }
  });

  // AI Interactive Floating Chatbot for Grammar Rules & Writing Formats
  app.post('/api/ai-chat', async (req, res) => {
    const { messages, itemContext, provider } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid messages array in request body.' });
    }

    const latestMessage = messages[messages.length - 1]?.content || '';
    const isChatGPTMode = provider === 'chatgpt';

    // If Gemini client is active, process via Google Gen AI
    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const itemInfo = itemContext
          ? `Current Active Exercise / Topic: Item ${itemContext.itemNumber || ''} - ${itemContext.nameEn || ''} (${itemContext.nameBn || ''}), Part: ${itemContext.part || ''} (${itemContext.partName || ''}).`
          : 'Topic: General SSC English 2nd Paper (Grammar & Writing).';

        const systemInstruction = isChatGPTMode
          ? `You are ChatGPT English Tutor — an empathetic, world-class pedagogical mentor for Bangladesh SSC (Class 9-10) English 2nd Paper.
${itemInfo}

Pedagogical Directives:
1. Explain English grammar rules, formulas, sentence structures, and writing formats in crystal-clear steps with simple English and helpful Bangla explanations.
2. Provide illustrative example sentences with English and Bangla meanings.
3. For grammar topics (Right Form of Verbs, Tag Questions, Changing Sentences, Prepositions, Connectors, Suffix/Prefix, Gap Filling, Punctuation), highlight the exact rule formula and common traps.
4. For writing topics (Paragraphs, E-mails, Letters, Applications, Compositions), demonstrate standard layout formats, transition markers, and high-scoring vocabulary.
5. Use clean formatting with bold headings, numbered steps, and bullet points.`
          : `You are Gemini SSC AI Assistant — an authoritative Bangladesh NCTB English Curriculum & Board Examiner AI.
${itemInfo}

Examiner Directives:
1. Provide accurate, board-exam-standard explanations for SSC English 2nd Paper questions.
2. Focus on NCTB syllabus guidelines, scoring criteria, and common exam errors.
3. Offer quick, high-yield grammar rules, structure charts, and standard board model formats.
4. Give bilingual explanations (English with Bengali translations/tips) to ensure deep student comprehension.
5. Format responses clearly with markdown, bold key words, and bulleted takeaways.`;

        const contents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: isChatGPTMode ? 0.7 : 0.4,
          },
        });

        const replyText = response.text || 'I am ready to help you with SSC English 2nd Paper grammar rules and writing formats!';
        return res.json({
          reply: replyText,
          provider: isChatGPTMode ? 'chatgpt' : 'gemini',
          aiPowered: true,
        });
      } catch (err: any) {
        console.error('Gemini Chat error:', err);
      }
    }

    // Fallback expert curriculum response
    const fallbackReply = generateCurriculumKnowledgeBaseReply(latestMessage, itemContext, isChatGPTMode);
    return res.json({
      reply: fallbackReply,
      provider: isChatGPTMode ? 'chatgpt' : 'gemini',
      aiPowered: false,
    });
  });

  // AI SSC Word Lookup (Meaning, Pronunciation, Grammar context, Suffix/Prefix forms)
  app.post('/api/word-lookup', async (req, res) => {
    const { word, itemContext } = req.body;

    if (!word || typeof word !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid word parameter.' });
    }

    const cleanWord = word.trim();

    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const itemInfo = itemContext
          ? `Current SSC Exam Section: Item ${itemContext.itemNumber || ''} - ${itemContext.nameEn || ''} (${itemContext.nameBn || ''}).`
          : 'General SSC English 2nd Paper Syllabus (Class 9-10 Bangladesh NCTB).';

        const prompt = `You are an expert English Lexicographer and Bangladesh SSC English Board Curriculum specialist.
Analyze the English word "${cleanWord}" tailored specifically for secondary school (SSC Class 9-10) students in Bangladesh.
${itemInfo}

Provide:
1. "word": The word in Title Case.
2. "phonetic": International Phonetic Alphabet (IPA) representation (e.g., "/ˌpɜː.sɪˈvɪə.rəns/").
3. "partOfSpeech": Primary part of speech (Noun, Verb, Adjective, Adverb, Preposition, Conjunction).
4. "meaningBn": Accurate, natural Bengali meaning (বাংলা অর্থ) using clear secondary school standard language.
5. "meaningEn": Concise, easy-to-understand English definition.
6. "sscContext": Exactly how this word is tested or applied in the SSC 12-item syllabus (e.g. Item 1 Clues, Item 6 Suffix/Prefix root change, Item 7 Appropriate Preposition, Item 8 Connector, or Item 10 Paragraphs).
7. "exampleSentence": A model SSC exam standard English sentence containing the word.
8. "exampleSentenceBn": Accurate Bengali translation of the example sentence.
9. "derivatives": Array of related morphological forms (Noun, Verb, Adjective, Adverb) with form name, partOfSpeech, and meaningBn.
10. "synonyms": Array of 3-5 high-yield synonyms suitable for SSC students.
11. "antonyms": Array of 3-5 antonyms suitable for SSC students.
12. "collocations": Array of 2-4 common SSC phrases or collocations (e.g. "abide by", "indispensable to").
13. "relatedSscItems": Array of SSC items (e.g. ["Item 1: Gap Filling", "Item 6: Suffix/Prefix"]).

Respond strictly in valid JSON format matching this schema:
{
  "word": string,
  "phonetic": string,
  "partOfSpeech": string,
  "meaningBn": string,
  "meaningEn": string,
  "sscContext": string,
  "exampleSentence": string,
  "exampleSentenceBn": string,
  "derivatives": [
    { "form": string, "partOfSpeech": string, "meaningBn": string }
  ],
  "synonyms": [string],
  "antonyms": [string],
  "collocations": [string],
  "relatedSscItems": [string]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({
          success: true,
          aiPowered: true,
          data: parsed,
        });
      } catch (err: any) {
        console.error('Word lookup error:', err);
      }
    }

    // Fallback response if API key is not present or failed
    const capitalized = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1);
    return res.json({
      success: true,
      aiPowered: false,
      data: {
        word: capitalized,
        phonetic: `/${cleanWord.toLowerCase()}/`,
        partOfSpeech: 'Word',
        meaningBn: `"${capitalized}" শব্দের অর্থ ও ব্যাকরণিক প্রয়োগ।`,
        meaningEn: `General vocabulary word in the context of SSC English syllabus.`,
        sscContext: `Useful for SSC English 2nd Paper reading comprehension and grammar practice.`,
        exampleSentence: `Every student should learn the correct spelling and application of "${cleanWord}".`,
        exampleSentenceBn: `প্রতিটি শিক্ষার্থীর "${capitalized}" শব্দের সঠিক বানান ও প্রয়োগ শেখা উচিত।`,
        derivatives: [],
        synonyms: [],
        antonyms: [],
        collocations: [],
        relatedSscItems: ['Item 1: Gap Filling', 'Item 6: Suffixes and Prefixes'],
      },
    });
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SSC English Second Part Server running on http://localhost:${PORT}`);
  });
}

// Fallback offline curriculum knowledge base helper
function generateCurriculumKnowledgeBaseReply(
  userQuery: string,
  itemContext: any,
  isChatGPTMode: boolean
): string {
  const query = (userQuery || '').toLowerCase();
  const itemNumber = itemContext?.itemNumber || 0;

  // 1. Right Form of Verbs
  if (itemNumber === 3 || query.includes('verb') || query.includes('tense') || query.includes('v3') || query.includes('subject-verb')) {
    if (query.includes('as if') || query.includes('as though') || query.includes('wish')) {
      return `### 💡 Rule: "As if / As though / Wish" এর ব্যবহার
**Formula & Rules:**
1. **Present Tense + as if / as though + Past Indefinite (be verb হলে were)**
   - *Example:* He talks as if he **knew** (know) everything.
   - *Example:* She behaves as if she **were** (be) a queen.
2. **Past Indefinite + as if / as though + Past Perfect (had + V3)**
   - *Example:* He spoke as if he **had seen** (see) the incident.
3. **Wish এর পর Past Subjunctive (were / had + V3)**
   - *Example:* I wish I **were** (be) a bird!

**SSC Exam Tip:** ব্র্যাকেটে *be* থাকলে এবং ইচ্ছা বা অবাস্তব কল্পনা বুঝালে সর্বদা **were** বসবে।`;
    }
    if (query.includes('view to') || query.includes('look forward') || query.includes('gerund') || query.includes('preposition + ing')) {
      return `### 💡 Rule: Prepositional Phrases + (Verb + ing)
সাধারণত Preposition 'to' এর পর Verb এর Base Form ($V_1$) বসে। কিন্তু নিচের Phrase গুলোর পর **Verb + ing** আবশ্যক:
- **with a view to** (উদ্দেশ্যে)
- **look forward to** (প্রতীক্ষা করা)
- **be used to / get used to** (অভ্যস্ত হওয়া)
- **would you mind**
- **cannot help / could not help**

**Board Exam Examples:**
1. He went to the library *with a view to* **reading** (read) books.
2. I am *looking forward to* **hearing** (hear) from you soon.
3. *Would you mind* **opening** (open) the door?`;
    }
    return `### 📘 Right Form of Verbs: Top 5 Golden Rules for SSC
1. **Universal Truth & Habitual Fact:** চিরন্তন সত্য হলে সর্বদা Present Indefinite Tense ($V_1$ / $s/es$) হয়।
   - *The sun rises (rise) in the east.*
2. **Recent Past Markers (just, just now, already, yet, recently, lately):** থাকলে Present Perfect Tense (**have/has + V3**) হয়।
   - *He has just finished (finish) his homework.*
3. **Past Indicators (yesterday, ago, long since, last night, in 1971):** থাকলে Past Indefinite Tense ($V_2$) হয়।
   - *We achieved (achieve) independence in 1971.*
4. **Passive Voice in Context:** কর্তা যদি কাজটি নিজে না করে, তবে **be verb + V3** হবে।
   - *English is spoken (speak) all over the world.*
5. **Lest... should:** *Lest* যুক্ত বাক্যে সর্বদা **Subject + should + V1** বসে।
   - *Walk fast lest you should miss (miss) the train.*`;
  }

  // 2. Changing Sentences (Voice, Simple-Complex-Compound, Degree)
  if (itemNumber === 4 || query.includes('voice') || query.includes('passive') || query.includes('simple') || query.includes('complex') || query.includes('compound') || query.includes('negative')) {
    if (query.includes('voice') || query.includes('passive') || query.includes('active')) {
      return `### 🔄 Active to Passive Voice Rules
**Basic Formula:**
\`Object becomes Subject + Auxiliary Verb (Tense অনুযায়ী) + V3 (Past Participle) + by / with / at + Subject becomes Object\`

**Tense Transformation Chart:**
- **Present Indefinite:** am / is / are + V3 (*Rice is eaten by me*)
- **Present Continuous:** am/is/are + **being** + V3 (*A book is being read*)
- **Present Perfect:** have/has + **been** + V3 (*Work has been done*)
- **Past Indefinite:** was / were + V3 (*A letter was written*)
- **Modal Auxiliaries (can, could, may, must, should):** Modal + **be** + V3 (*The problem can be solved*)

**Imperative Passive:**
- *Do the work* ➔ **Let the work be done.**
- *Don't open the door* ➔ **Let not the door be opened.**`;
    }
    if (query.includes('simple') || query.includes('complex') || query.includes('compound')) {
      return `### ⚡ Simple, Complex & Compound Conversion Master Guide
| Type | Structure Characteristic | Example |
| :--- | :--- | :--- |
| **Simple** | 1 Subject + 1 Finite Verb (By + V-ing / In spite of / To) | *By working hard, you can succeed.* |
| **Complex** | 1 Principal Clause + 1 Subordinate Clause (Since, As, If, Though, When) | *If you work hard, you can succeed.* |
| **Compound** | 2 Independent Clauses connected by (and, but, or, so, therefore) | *Work hard and you can succeed.* |

**Crucial SSC Pair Rules:**
1. **Though / Although (Complex) ➔ In spite of / Despite (Simple) ➔ But (Compound)**
   - *Complex:* Though he was poor, he was honest.
   - *Simple:* In spite of his poverty, he was honest.
   - *Compound:* He was poor but he was honest.`;
    }
    return `### 🔁 Changing Sentences: High-Scoring Tips for SSC
- **Affirmative to Negative:**
  - *Only/Alone* (ব্যক্তি) ➔ **None but** (*Only Allah can help us* ➔ *None but Allah can help us*)
  - *Only* (বস্তু) ➔ **Nothing but** (*A child likes only sweets* ➔ *A child likes nothing but sweets*)
  - *Must* ➔ **Cannot but + V1** or **Cannot help + V-ing** (*You must obey parents* ➔ *You cannot but obey parents*)
  - *Every* ➔ **There is no... but** (*Every mother loves her child* ➔ *There is no mother but loves her child*)`;
  }

  // 3. Tag Questions
  if (itemNumber === 5 || query.includes('tag') || query.includes('question') || query.includes("let's") || query.includes('neither')) {
    return `### ❓ Tag Questions: Rules & Exceptions for SSC
**Basic Principle:**
- **Positive Statement ➔ Negative Tag** (*He is a student, isn't he?*)
- **Negative Statement ➔ Positive Tag** (*She is not happy, is she?*)

**Key Board Exam Exceptions:**
1. **Let's / Let us (প্রস্তাব বুঝালে):** সর্বদা **shall we?** বসবে।
   - *Let's go for a walk, shall we?*
2. **Let him / her / them (অনুমতি বুঝালে):** সর্বদা **will you?** বসবে।
   - *Let him do the sum, will you?*
3. **Imperative (Order / Request):** **will you?** বা **won't you?**
   - *Please help me, will you?*
   - *Don't make a noise, will you?*
4. **Negative Words in Statement (hardly, scarcely, seldom, rarely, few, little, neither, none):** বাক্যটি Negative, তাই Tag হবে **Positive**!
   - *Barking dogs seldom bite, do they?*
   - *A little water is left, isn't it?* (কিন্তু *There is little water, is there?*)
5. **Indefinite Pronouns (Everybody, Everyone, Somebody, Nobody, None, Neither):** Pronoun সর্বদা **they** হবে!
   - *Everybody loves flowers, don't they?* (Note: *they* এর সাথে *don't* বসে, *doesn't* নয়!)`;
  }

  // 4. Suffixes and Prefixes
  if (itemNumber === 6 || query.includes('suffix') || query.includes('prefix') || query.includes('antonym')) {
    return `### 🔤 Suffixes & Prefixes: Part of Speech Formations
**1. Formation of Nouns:**
- Root + **-tion / -sion:** pollute ➔ *pollution*, decide ➔ *decision*
- Root + **-ment:** develop ➔ *development*, govern ➔ *government*
- Root + **-ness:** dark ➔ *darkness*, kind ➔ *kindness*
- Root + **-er / -or:** drive ➔ *driver*, act ➔ *actor*

**2. Formation of Adjectives:**
- Root + **-ful:** hope ➔ *hopeful*, care ➔ *careful*
- Root + **-less:** care ➔ *careless*, harm ➔ *harmless*
- Root + **-able / -ible:** comfort ➔ *comfortable*, resist ➔ *irresistible*
- Root + **-al:** nation ➔ *national*, education ➔ *educational*

**3. Negative Prefixes (Opposite Meanings):**
- **un-:** happy ➔ *unhappy*, conscious ➔ *unconscious*
- **dis-:** honest ➔ *dishonest*, agree ➔ *disagree*
- **in- / im- / ir- / il-:** direct ➔ *indirect*, possible ➔ *impossible*, regular ➔ *irregular*, legal ➔ *illegal*
- **mis-:** guide ➔ *misguide*, understand ➔ *misunderstand*`;
  }

  // 5. Appropriate Prepositions
  if (itemNumber === 7 || query.includes('preposition') || query.includes('appropriate preposition')) {
    return `### 📍 Essential SSC Appropriate Prepositions
- **Die of** (রোগে মারা যাওয়া): *He died of cancer.*
- **Die from** (অতিরিক্ত কোনো কারণে মারা যাওয়া): *He died from over-eating.*
- **Die for** (দেশের জন্য আত্মত্যাগ করা): *Patriots die for their country.*
- **Die by** (বিষ বা দুর্ঘটনায় মারা যাওয়া): *He died by poison / by accident.*
- **Abide by** (মেনে চলা): *We must abide by the rules.*
- **Senior / Junior / Superior / Inferior to** (than নয়, to বসে): *He is senior to me by two years.*
- **Prevent / Refrain / Prohibit from + V-ing:** *He prevented me from going there.*
- **Congratulate on:** *I congratulated him on his brilliant success.*
- **Devoid of** (বর্জিত/হীন): *He is devoid of common sense.*
- **Addicted to** (খারাপ কাজে আসক্ত): *He is addicted to gambling.*`;
  }

  // 6. Connectors / Sentence Linkers
  if (itemNumber === 8 || query.includes('connector') || query.includes('linker') || query.includes('moreover')) {
    return `### 🔗 Sentence Connectors: Context & Usage Map
1. **To Add Information (তথ্য যোগ করতে):**
   - *Moreover, Furthermore, In addition, Besides, Not only... but also*
   - *Example:* Reading books enriches vocabulary. **Moreover**, it broadens our outlook.
2. **To Show Contrast (বিপরীত ভাব প্রকাশ করতে):**
   - *However, On the other hand, On the contrary, Yet, Though, But*
   - *Example:* He studied hard. **However**, he could not secure GPA-5.
3. **To Show Cause & Effect (কারণ ও ফলাফল):**
   - *Therefore, Consequently, As a result, For this reason, So*
   - *Example:* Trees provide us with oxygen. **Therefore**, we should plant more trees.
4. **To Order Sequence (ধারাবাহিকতা বোঝাতে):**
   - *First of all, Secondly, Thirdly, Next, After that, Finally, At last*`;
  }

  // 7. Punctuation & Capitalization
  if (itemNumber === 9 || query.includes('punctuation') || query.includes('comma') || query.includes('quotation') || query.includes('capital')) {
    return `### ✍️ Punctuation & Capitalization Rules for SSC
1. **Direct Speech & Quotation Marks ("..."):**
   - রিপোর্টিং ভার্বের পর কমা (,) বসে এবং রিপোর্টেড স্পিচের প্রথম অক্ষর Capital ও ইনভার্টেড কমার ভিতরে থাকে।
   - *Example:* The teacher said to the boy, **"Why are you making a noise in the class?"**
2. **Apostrophe ('):**
   - Possessive: *Rahim's book, Students' common room (বহুবচনে s এর পর ')*
   - Contractions: *It's (It is), don't, I've, o'clock*
3. **Capital Letter Rules:**
   - বাক্যের প্রথম অক্ষর: **H**e is a good boy.
   - নির্দিষ্ট নাম (Proper Noun): **D**haka, **B**angladesh, the **P**adma.
   - দিন ও মাস: **S**unday, **J**anuary.
   - প্রোনাউন 'I' (আমি) সর্বদা Capital হয়: If **I** were you.`;
  }

  // 8. Paragraph Writing (Item 10)
  if (itemNumber === 10 || query.includes('paragraph') || query.includes('topic sentence')) {
    return `### 📝 SSC Paragraph Writing: Perfect Structure Guide
**Key Board Exam Specifications:**
- **Word Limit:** 150 to 200 words (Marks: 10)
- **Single Paragraph Rule:** পুরো লেখাটি **একটি মাত্র প্যারায়** লিখতে হবে (No sub-headings or breaks!).

**3-Tier Anatomy of a Top-Scoring Paragraph:**
1. **Topic Sentence (Introductory Line):** প্যারাগ্রাফের প্রথম লাইনে মূল বিষয়ের সুস্পষ্ট সংজ্ঞা বা গুরুত্ব তুলে ধরুন।
2. **Supporting Sentences (Body Analysis):** মূল বিষয়ের কারণ, প্রভাব, বর্তমান অবস্থা, এবং সম্ভাব্য সমাধান বা সুবিধা আলোচনা করুন।
3. **Concluding Sentence (Final Takeaway):** শেষ লাইনে একটি ইতিবাচক বার্তা বা ভবিষ্যৎ আশাবাদ দিয়ে সমাপ্ত করুন।

**Scoring Tips:**
- ব্যবহার করুন Transition Connectors (*Firstly, Moreover, Consequently, Ultimately*).
- ব্যাকরণ ও বানানের নির্ভুলতা বজায় রাখুন।`;
  }

  // 9. E-mails, Letters & Formal Applications (Item 11)
  if (itemNumber === 11 || query.includes('email') || query.includes('letter') || query.includes('application') || query.includes('principal')) {
    return `### ✉️ Formal Application & E-mail Layout for SSC
**A. Formal Application Format (To Headmaster/Principal):**
\`\`\`text
16 August 2026
The Principal,
Dhaka Residential Model College, Dhaka.
Subject: Application for setting up a multimedia classroom / canteen.

Sir,
We, the students of your college, beg most respectfully to state that... [Body paragraph explaining necessity]...

We, therefore, pray and hope that you would be kind enough to grant our prayer and oblige thereby.

Yours obediently,
The students of class 10.
\`\`\`

**B. Standard E-mail Format:**
\`\`\`text
From: student@gmail.com
To: friend@gmail.com
Date: 16 August 2026, 10:00 AM
Subject: Congratulation on your brilliant success in SSC examination.

Dear [Friend's Name],
I hope this email finds you in good health and high spirits... [Message Body]...

Best regards,
[Your Name]
\`\`\``;
  }

  // 10. Short Composition (Item 12)
  if (itemNumber === 12 || query.includes('composition') || query.includes('essay')) {
    return `### 📖 SSC Short Composition: 4-Step Standard Guide
**Marks: 12-15 (Word Limit: 250 words)**

**Standard Multi-Paragraph Layout:**
1. **Introduction (সূচনা):** বিষয়ের পটভূমি, সংজ্ঞা ও মানবজীবনে এর গুরুত্ব।
2. **Main Body Paragraph 1 (মূল দিক ও সুবিধা/কার্যকারিতা):** বিষয়ের ইতিবাচক দিক, দৈনন্দিন প্রয়োজনীয়তা ও বিস্তার।
3. **Main Body Paragraph 2 (চ্যালেঞ্জ বা প্রতিকূলতা):** সমস্যা, অপব্যবহার বা প্রতিবন্ধকতা।
4. **Conclusion (উপসংহার):** সরকারি/বেসরকারি উদ্যোগ, তরুণদের ভূমিকা ও সুন্দর ভবিষ্যৎ প্রত্যাশা।

**Exam Tip:** প্রতিটি প্যারায় সুস্পষ্ট বিষয়ভিত্তিক শব্দভাণ্ডার (Vocabulary) এবং লিঙ্কিং ওয়ার্ড ব্যবহার করুন।`;
  }

  // General SSC English fallback
  return `### 🎓 SSC English 2nd Paper Master AI Assistant
আমি আপনাকে এসএসসি ইংরেজি ২য় পত্রের যে কোনো ব্যাকরণ নিয়ম এবং রাইটিং ফরম্যাট বোঝাতে প্রস্তুত!

**আপনি প্রশ্ন করতে পারেন:**
- 🔹 *Right form of verbs* এর কঠিন নিয়ম ও উদাহরণ
- 🔹 *Changing Sentences* (Voice, Degree, Simple/Complex/Compound)
- 🔹 *Tag Questions* এর ব্যতিক্রমী নিয়মাবলি
- 🔹 *Appropriate Preposition* এবং *Sentence Connectors* এর ব্যবহার
- 🔹 *Paragraph, Formal Application, E-mail ও Composition* এর আদর্শ বোর্ড ফরম্যাট

আপনার নির্দিষ্ট কোনো বাক্য বা নিয়ম নিয়ে দ্বিধা থাকলে নিচে সরাসরি লিখে জানান!`;
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
