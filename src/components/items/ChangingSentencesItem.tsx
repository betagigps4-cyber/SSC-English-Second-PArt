import React, { useState, useEffect } from 'react';
import { ChangingSentencesExercise, BoardName, ChangingSentenceItem } from '../../types';
import { CHANGING_SENTENCES_DATA } from '../../data/sscData';
import { BoardSelector } from '../BoardSelector';
import { CelebrationModal } from '../CelebrationModal';
import { BookmarkButton } from '../BookmarkButton';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Bot,
  Lightbulb,
  Loader2,
  Eye,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Shuffle,
} from 'lucide-react';

interface ChangingSentencesItemProps {
  onBackToMenu: () => void;
}

interface SentenceAiEvaluation {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade?: string;
  provider?: string;
  overallFeedback: string;
  banglaTips?: string;
  gapEvaluations: Array<{
    label: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    collocation?: string;
    ruleExplanation?: string;
    banglaRule?: string;
    whyIncorrect?: string;
  }>;
  studySuggestions?: string[];
  aiPowered?: boolean;
}

// Utility to randomly shuffle an array (Fisher-Yates)
const shuffleSentenceArray = (array: ChangingSentenceItem[]): ChangingSentenceItem[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure order is actually different if array has multiple items
  if (arr.length > 1 && arr.every((item, idx) => item.index === array[idx].index)) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
};

export const ChangingSentencesItem: React.FC<ChangingSentencesItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    CHANGING_SENTENCES_DATA[0]?.board || 'Set–1'
  );
  const [exercise, setExercise] = useState<ChangingSentencesExercise>(CHANGING_SENTENCES_DATA[0]);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [isChecked, setIsChecked] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<SentenceAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledSentences, setShuffledSentences] = useState<ChangingSentenceItem[]>([]);

  useEffect(() => {
    const found =
      (CHANGING_SENTENCES_DATA || []).find((e) => e.board === selectedBoard) ||
      CHANGING_SENTENCES_DATA[0];
    setExercise(found);
    // Explicitly reset question order back to original sequence on new set selection
    setIsShuffled(false);
    setShuffledSentences(found?.sentences ? [...found.sentences] : []);
    handleReset(false);
  }, [selectedBoard]);

  const handleSelectBoard = (board: BoardName) => {
    setSelectedBoard(board);
    // Immediately clear shuffle state and restore original sequence
    setIsShuffled(false);
    const targetExercise =
      (CHANGING_SENTENCES_DATA || []).find((e) => e.board === board) ||
      CHANGING_SENTENCES_DATA[0];
    if (targetExercise?.sentences) {
      setShuffledSentences([...targetExercise.sentences]);
    }
  };

  const handleInputChange = (index: number, text: string) => {
    setUserInputs((prev) => ({ ...prev, [index]: text }));
  };

  const handleShuffle = () => {
    if (!exercise?.sentences || exercise.sentences.length === 0) return;
    const shuffled = shuffleSentenceArray(exercise.sentences);
    setShuffledSentences(shuffled);
    setIsShuffled(true);
  };

  const handleRestoreDefaultOrder = () => {
    if (!exercise?.sentences) return;
    setShuffledSentences([...exercise.sentences]);
    setIsShuffled(false);
  };

  // Instant Manual Quick Check
  const handleQuickCheck = () => {
    let currentScore = 0;
    const evals: SentenceAiEvaluation['gapEvaluations'] = [];

    const normalize = (t: string) =>
      (t || '')
        .toLowerCase()
        .replace(/[.,?!'"]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    (exercise?.sentences || []).forEach((s) => {
      const student = (userInputs[s.index] || '').trim();
      const studentNorm = normalize(student);
      const modelNorm = normalize(s.modelAnswer);
      const altNorms = (s.alternateAnswers || []).map(normalize);

      const isMatch =
        studentNorm.length > 0 && (studentNorm === modelNorm || altNorms.includes(studentNorm));

      if (isMatch) {
        currentScore += 1;
      }

      evals.push({
        label: `(${String.fromCharCode(96 + s.index)})`,
        studentAnswer: student || '(blank)',
        correctAnswer: s.modelAnswer,
        isCorrect: isMatch,
        collocation: `Instruction: ${s.instruction}`,
        ruleExplanation: s.ruleTip,
        banglaRule: 'রূপান্তরের সময় অর্থের পরিবর্তন না করে গঠন পরিবর্তন করতে হবে।',
        whyIncorrect: isMatch
          ? ''
          : student.length === 0
          ? 'Answer left blank.'
          : `Syntactic or structural difference from the required form (${s.instruction}).`,
      });
    });

    // SSC Item 4: 1x10 = 10 marks (or 10 sentences)
    setScore(currentScore);

    setAiEvaluation({
      totalScore: currentScore,
      maxScore: 10,
      percentage: Math.round((currentScore / 10) * 100),
      grade: currentScore >= 9 ? 'A+' : currentScore >= 8 ? 'A' : currentScore >= 6 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        currentScore === 10
          ? 'Outstanding mastery of English sentence transformations! Flawless structure and clause syntax.'
          : currentScore >= 7
          ? `Great performance (${currentScore}/10)! Review the highlighted sentences below for full accuracy.`
          : `Good attempt (${currentScore}/10). Review active/passive voice, degree of comparison, and clause markers.`,
      banglaTips:
        'Voice change, degree of comparison এবং Simple-Complex-Compound রূপান্তরের সময় Tense অপরিবর্তিত রাখুন।',
      gapEvaluations: evals,
      studySuggestions: [
        'Pay close attention to affirmative to negative without changing meaning (e.g., only/alone -> none but).',
        'In passive voice, ensure correct past participle (V3) and auxiliary verb.',
        'Use appropriate conjunctions for complex (though, although, since, as, if) and compound (and, but, or, yet).',
      ],
      aiPowered: false,
    });

    setIsChecked(true);
    setShowCelebration(true);
  };

  // AI & ChatGPT Examination
  const handleAiExamine = async (provider: 'chatgpt' | 'gemini') => {
    setSelectedAiModel(provider);
    setIsAiChecking(true);

    try {
      const answersMap: Record<string, string> = {};
      exercise.sentences.forEach((s) => {
        answersMap[`sentence_${s.index}`] = userInputs[s.index] || '';
      });

      const response = await fetch('/api/ai-grammar-examine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber: 4,
          itemTitle: 'Changing Sentences',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            sentences: exercise.sentences,
          },
          items: exercise.sentences.map((s) => ({
            label: `(${String.fromCharCode(96 + s.index)})`,
            correctAnswer: s.modelAnswer,
            acceptableAnswers: s.alternateAnswers,
            ruleExplanation: `${s.instruction} - ${s.ruleTip}`,
          })),
          userAnswers: answersMap,
        }),
      });

      const data = await response.json();
      if (data && data.evaluation) {
        setAiEvaluation(data.evaluation);
        setScore(data.evaluation.totalScore || 0);
      } else {
        handleQuickCheck();
      }
    } catch (err) {
      console.warn('AI changing sentences error, falling back to manual check:', err);
      handleQuickCheck();
    } finally {
      setIsAiChecking(false);
      setIsChecked(true);
      setShowCelebration(true);
    }
  };

  const handleShowAllAnswers = () => {
    const modelAns: Record<number, string> = {};
    exercise.sentences.forEach((s) => {
      modelAns[s.index] = s.modelAnswer;
    });
    setUserInputs(modelAns);
    setIsChecked(true);
    setScore(10);
  };

  const handleReset = (restoreOrder = false) => {
    setUserInputs({});
    setIsChecked(false);
    setIsAiChecking(false);
    setAiEvaluation(null);
    setShowCelebration(false);
    setScore(0);
    setActiveTab('aiFeedback');
    if (restoreOrder && exercise?.sentences) {
      setIsShuffled(false);
      setShuffledSentences([...exercise.sentences]);
    }
  };

  const availableBoards = CHANGING_SENTENCES_DATA.map((e) => e.board);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <BoardSelector
        availableBoards={availableBoards}
        selectedBoard={selectedBoard}
        onSelectBoard={handleSelectBoard}
        bookmarkData={{
          id: `item-4-${exercise.id || selectedBoard}`,
          itemId: 4,
          itemNumber: 4,
          itemTitle: 'Changing Sentences',
          subTitle: `${selectedBoard}: ${exercise.title || 'Transformation of Sentences'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        {/* Title */}
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 mb-1.5">
              <span>Question No. 4</span>
              <span>•</span>
              <span>Marks: 1x10 = 10</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              প্রতিটি বাক্যের পাশে বন্ধনীতে দেওয়া নির্দেশ (যেমন: Negative, Passive, Simple, Complex ইত্যাদি) অনুযায়ী বাক্যটি রূপান্তর করুন।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-4-${exercise.id || selectedBoard}`,
              itemId: 4,
              itemNumber: 4,
              itemTitle: 'Changing Sentences',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* Toolbar with Progress & Shuffle Control */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              Sentences ({exercise.sentences?.length || 10})
            </span>
            <span className="text-xs text-slate-500 font-medium">
              • {Object.values(userInputs).filter((v) => typeof v === 'string' && v.trim().length > 0).length}/{exercise.sentences?.length || 10} Answered
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isShuffled && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800 shadow-xs animate-in fade-in">
                <Shuffle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Shuffled Order (এলোমেলো)</span>
              </span>
            )}

            <button
              onClick={handleShuffle}
              disabled={isAiChecking}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/70 dark:hover:bg-purple-900/70 text-purple-700 dark:text-purple-300 font-bold text-xs border border-purple-200 dark:border-purple-800/80 transition-all active:scale-95 shadow-xs cursor-pointer"
              title="Randomize questions sequence"
            >
              <Shuffle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{isShuffled ? 'Re-shuffle (পুনরায় এলোমেলো)' : 'Shuffle Questions (এলোমেলো করুন)'}</span>
            </button>

            {isShuffled && (
              <button
                onClick={handleRestoreDefaultOrder}
                disabled={isAiChecking}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 dark:bg-slate-700/80 dark:hover:bg-slate-600/80 text-slate-700 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
                title="Restore default 1-10 sequence"
              >
                <span>Default Order</span>
              </button>
            )}
          </div>
        </div>

        {/* 10 Sentence Cards with Inputs */}
        <div className="space-y-4 mb-8">
          {(isShuffled ? shuffledSentences : exercise.sentences).map((item, displayIdx) => {
            const gapEval = aiEvaluation?.gapEvaluations?.find(
              (g) =>
                g.label === `(${String.fromCharCode(96 + item.index)})` ||
                g.label === `${item.index}` ||
                g.label === `Sentence #${item.index}`
            );

            const hasEvaluated = isChecked;
            const isSentenceCorrect = gapEval
              ? gapEval.isCorrect
              : userInputs[item.index]?.trim().toLowerCase() === item.modelAnswer.toLowerCase();

            return (
              <div
                key={item.index}
                className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 shadow-sm ${
                  hasEvaluated
                    ? isSentenceCorrect
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-400/40'
                    : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-500 ring-1 ring-rose-400/40'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                }`}
              >
                {/* Original Question */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold shrink-0 mt-0.5 font-mono shadow-xs">
                      {String.fromCharCode(96 + item.index)}
                    </span>
                    {isShuffled && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shrink-0 mt-0.5">
                        #{displayIdx + 1}
                      </span>
                    )}
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 leading-snug break-words">
                      {item.original}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-800 self-start sm:self-auto shrink-0 font-mono">
                    {item.instruction}
                  </span>
                </div>

                {/* Text Box Input */}
                <div className="mt-2.5 relative">
                  <input
                    type="text"
                    value={userInputs[item.index] || ''}
                    onChange={(e) => handleInputChange(item.index, e.target.value)}
                    placeholder="এখানে রূপান্তরিত বাক্যটি লিখুন (Type transformed sentence here)..."
                    className={`w-full text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 py-2.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 shadow-inner pr-10 ${
                      hasEvaluated
                        ? isSentenceCorrect
                          ? 'bg-emerald-100/60 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                          : 'bg-rose-100/60 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-400'
                    }`}
                  />
                  {hasEvaluated && (
                    <div className="absolute right-3 top-2.5">
                      {isSentenceCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                  )}
                </div>

                {/* AI & Rule Feedback details */}
                {hasEvaluated && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm space-y-1.5 animate-in fade-in">
                    {!isSentenceCorrect && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 break-words">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          Model Answer:
                        </span>{' '}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.modelAnswer}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400 pt-1">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Grammar Rule:</strong> {item.ruleTip}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Responsive Action Buttons Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* ChatGPT Check Button */}
            <button
              onClick={() => handleAiExamine('chatgpt')}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'chatgpt' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Bot className="w-4 h-4 text-emerald-200" />
              )}
              <span>ChatGPT Examiner</span>
            </button>

            {/* Gemini AI Check Button */}
            <button
              onClick={() => handleAiExamine('gemini')}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-purple-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-bold text-xs sm:text-sm border border-purple-200 dark:border-purple-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>Quick Check (ম্যানুয়াল যাচাই)</span>
            </button>

            {/* Shuffle Button */}
            <button
              onClick={handleShuffle}
              disabled={isAiChecking}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm border transition-all active:scale-95 cursor-pointer shadow-xs ${
                isShuffled
                  ? 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  : 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/80'
              }`}
              title="Randomize questions order for active practice set"
            >
              <Shuffle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{isShuffled ? 'Re-shuffle (পুনরায় এলোমেলো)' : 'Shuffle (এলোমেলো)'}</span>
            </button>

            <button
              onClick={handleShowAllAnswers}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Show Answers</span>
            </button>

            <button
              onClick={handleReset}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {isChecked && (
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-purple-50 dark:bg-purple-950/60 px-4 py-2.5 rounded-2xl border border-purple-300 dark:border-purple-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-purple-700 dark:text-purple-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 10</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-purple-200 dark:bg-purple-900 text-[11px] font-black text-purple-950 dark:text-purple-100">
                  {aiEvaluation.grade}
                </span>
              )}
            </div>
          )}
        </div>

        {/* In-Page Responsive AI & Examiner Feedback Display */}
        {isChecked && aiEvaluation && (
          <div className="mt-8 space-y-6 animate-in fade-in">
            {/* View Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('aiFeedback')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'aiFeedback'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>AI Tutor Assessment & Feedback</span>
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'rules'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Transformation Rules Reference</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 border border-purple-300 dark:border-purple-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-purple-200 dark:border-slate-700">
                            {score} / 10 ({Math.round((score / 10) * 100)}%)
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        "{aiEvaluation.overallFeedback}"
                      </p>
                    </div>
                  </div>

                  {/* Bangla Tips Card */}
                  {aiEvaluation.banglaTips && (
                    <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-start gap-2.5 sm:gap-3">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-0.5">
                          বাংলা টিপস ও কৌশল (Sentence Transformation Strategy):
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                          {aiEvaluation.banglaTips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Per-Sentence In-Depth Breakdown Cards */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span>Sentence Transformation Detailed Review:</span>
                  </h5>

                  <div className="grid grid-cols-1 gap-3">
                    {aiEvaluation.gapEvaluations?.map((gap, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                          gap.isCorrect
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {gap.label} {gap.collocation}
                          </span>
                          {gap.isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>+1.0 Mark</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>0.0 Mark</span>
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs sm:text-sm mb-2 break-words">
                          <div className="text-slate-600 dark:text-slate-400">
                            <strong>Your Answer: </strong>
                            <span
                              className={
                                gap.isCorrect
                                  ? 'text-emerald-800 dark:text-emerald-200 font-semibold'
                                  : 'text-rose-800 dark:text-rose-200 font-semibold line-through'
                              }
                            >
                              {gap.studentAnswer}
                            </span>
                          </div>

                          {!gap.isCorrect && (
                            <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                              <strong>Model Transformation: </strong>
                              {gap.correctAnswer}
                            </div>
                          )}
                        </div>

                        {!gap.isCorrect && gap.whyIncorrect && (
                          <p className="text-xs text-rose-800 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-950/50 p-2 rounded-lg mb-2 leading-relaxed">
                            <strong>বিশ্লেষণ:</strong> {gap.whyIncorrect}
                          </p>
                        )}

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {gap.ruleExplanation || gap.banglaRule}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {aiEvaluation.studySuggestions && aiEvaluation.studySuggestions.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Study Recommendations for Sentence Transformation:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Sentence Transformation Rules (রূপান্তর বিধি):</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.sentences.map((item) => (
                    <div
                      key={item.index}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <span className="font-bold text-purple-600 dark:text-purple-400 mr-1.5">
                        ({String.fromCharCode(96 + item.index)}) {item.instruction}:
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{item.ruleTip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        score={score}
        maxScore={10}
        title={exercise.title}
        provider={aiEvaluation?.provider}
        feedbackText={
          aiEvaluation?.overallFeedback ||
          (score === 10
            ? 'Remarkable accuracy! You mastered all sentence transformation rules.'
            : score >= 7
            ? 'Well done! Solid understanding of sentence transformation.'
            : 'Keep practicing! Review active/passive voice, degree, and clause conversion.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          'Simple, Complex ও Compound বাক্য রূপান্তরের সময় ক্লজ ও কনজাংশন এর সঠিক প্রয়োগ করুন।'
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
