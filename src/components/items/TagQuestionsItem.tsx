import React, { useState, useEffect } from 'react';
import { TagQuestionsExercise, BoardName } from '../../types';
import { TAG_QUESTIONS_DATA } from '../../data/sscData';
import { BoardSelector } from '../BoardSelector';
import { CelebrationModal } from '../CelebrationModal';
import { BookmarkButton } from '../BookmarkButton';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Bot,
  Loader2,
  Eye,
  BookOpen,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

interface TagQuestionsItemProps {
  onBackToMenu: () => void;
}

interface TagAiEvaluation {
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

export const TagQuestionsItem: React.FC<TagQuestionsItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    TAG_QUESTIONS_DATA[0]?.board || 'Model Question 1'
  );
  const [exercise, setExercise] = useState<TagQuestionsExercise>(TAG_QUESTIONS_DATA[0]);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [isChecked, setIsChecked] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<TagAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');

  useEffect(() => {
    const found =
      (TAG_QUESTIONS_DATA || []).find((e) => e.board === selectedBoard) || TAG_QUESTIONS_DATA[0];
    setExercise(found);
    handleReset();
  }, [selectedBoard]);

  const handleInputChange = (index: number, text: string) => {
    setUserInputs((prev) => ({ ...prev, [index]: text }));
  };

  // Instant Manual Quick Check
  const handleQuickCheck = () => {
    let currentScore = 0;
    const evals: TagAiEvaluation['gapEvaluations'] = [];

    (exercise?.questions || []).forEach((q) => {
      const student = (userInputs[q.index] || '')
        .trim()
        .toLowerCase()
        .replace(/[,?]/g, '')
        .replace(/\s+/g, ' ');
      const correctTagStr = q.correctTag || q.modelTag || '';
      const correct = correctTagStr.toLowerCase().replace(/[,?]/g, '').replace(/\s+/g, ' ');
      const altList = q.acceptableAnswers || q.acceptableTags || [];
      const alt = altList.map((a) =>
        (a || '').toLowerCase().replace(/[,?]/g, '').replace(/\s+/g, ' ')
      );

      const isMatch = student.length > 0 && (student === correct || alt.includes(student));

      if (isMatch) {
        currentScore += 1;
      }

      evals.push({
        label: `(${String.fromCharCode(96 + q.index)})`,
        studentAnswer: userInputs[q.index] || '(blank)',
        correctAnswer: correctTagStr,
        isCorrect: isMatch,
        collocation: `Statement: "${q.statement}"`,
        ruleExplanation: q.ruleTip || q.explanation,
        banglaRule: 'বাক্যটি Affirmative হলে Tag হবে Negative, আর Negative হলে Tag হবে Affirmative।',
        whyIncorrect: isMatch
          ? ''
          : student.length === 0
          ? 'Tag question was left empty.'
          : `Auxiliary verb or pronoun mismatch. Expected tag: "${correctTagStr}".`,
      });
    });

    setScore(currentScore);

    setAiEvaluation({
      totalScore: currentScore,
      maxScore: 5,
      percentage: Math.round((currentScore / 5) * 100),
      grade: currentScore === 5 ? 'A+' : currentScore >= 4 ? 'A' : currentScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        currentScore === 5
          ? 'Terrific! All 5 tag questions are accurate with proper auxiliary verbs, contractions, and pronoun references.'
          : currentScore >= 3
          ? `Good work (${currentScore}/5)! Watch out for indefinite pronouns (nobody/everybody) taking plural "they" and negative adverbs.`
          : `Keep practicing (${currentScore}/5). Review tag rules for imperative sentences, let's, and semi-negative adverbs.`,
      banglaTips:
        "Let's থাকলে shall we?, Imperative এ will you? এবং Negative word (hardly/seldom/scarcely) থাকলে Affirmative tag ব্যবহার করুন।",
      gapEvaluations: evals,
      studySuggestions: [
        'Always use contracted negative forms (e.g. aren\'t, isn\'t, hasn\'t, didn\'t, won\'t, shan\'t).',
        'Check the main subject: Everyone / Nobody / Somebody take the pronoun "they".',
        'Nothing / Everything / Something take the pronoun "it".',
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
      exercise.questions.forEach((q) => {
        answersMap[`q_${q.index}`] = userInputs[q.index] || '';
      });

      const response = await fetch('/api/ai-grammar-examine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber: 5,
          itemTitle: 'Tag Questions',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            questions: exercise.questions,
          },
          items: exercise.questions.map((q) => ({
            label: `(${String.fromCharCode(96 + q.index)})`,
            correctAnswer: q.correctTag || q.modelTag,
            acceptableAnswers: q.acceptableAnswers || q.acceptableTags,
            ruleExplanation: `${q.statement} -> ${q.ruleTip || q.explanation}`,
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
      console.warn('AI tag questions error, falling back to manual check:', err);
      handleQuickCheck();
    } finally {
      setIsAiChecking(false);
      setIsChecked(true);
      setShowCelebration(true);
    }
  };

  const handleShowAllAnswers = () => {
    const modelAns: Record<number, string> = {};
    exercise.questions.forEach((q) => {
      modelAns[q.index] = q.correctTag || q.modelTag || '';
    });
    setUserInputs(modelAns);
    setIsChecked(true);
    setScore(5);
  };

  const handleReset = () => {
    setUserInputs({});
    setIsChecked(false);
    setIsAiChecking(false);
    setAiEvaluation(null);
    setShowCelebration(false);
    setScore(0);
    setActiveTab('aiFeedback');
  };

  const availableBoards = TAG_QUESTIONS_DATA.map((e) => e.board);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <BoardSelector
        availableBoards={availableBoards}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        bookmarkData={{
          id: `item-5-${exercise.id || selectedBoard}`,
          itemId: 5,
          itemNumber: 5,
          itemTitle: 'Tag Questions',
          subTitle: `${selectedBoard}: ${exercise.title || 'Tag Questions Practice'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 mb-1.5">
              <span>Question No. 5</span>
              <span>•</span>
              <span>Marks: 1x5 = 05</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              বাক্যগুলো পড়ে উপযুক্ত প্রশ্নসংযোজন (Tag Question) যোগ করুন।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-5-${exercise.id || selectedBoard}`,
              itemId: 5,
              itemNumber: 5,
              itemTitle: 'Tag Questions',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* 5 Questions */}
        <div className="space-y-4 mb-8">
          {(exercise?.questions || []).map((q) => {
            const gapEval = aiEvaluation?.gapEvaluations?.find(
              (g) =>
                g.label === `(${String.fromCharCode(96 + q.index)})` ||
                g.label === `${q.index}` ||
                g.label === `q_${q.index}`
            );

            const student = (userInputs[q.index] || '')
              .trim()
              .toLowerCase()
              .replace(/[,?]/g, '')
              .replace(/\s+/g, ' ');
            const correctTagStr = q.correctTag || q.modelTag || '';
            const correct = correctTagStr.toLowerCase().replace(/[,?]/g, '').replace(/\s+/g, ' ');
            const altList = q.acceptableAnswers || q.acceptableTags || [];
            const alt = altList.map((a) =>
              (a || '').toLowerCase().replace(/[,?]/g, '').replace(/\s+/g, ' ')
            );

            const isCorrect =
              isChecked && (gapEval ? gapEval.isCorrect : (student.length > 0 && (student === correct || alt.includes(student))));

            return (
              <div
                key={q.index}
                className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 shadow-sm ${
                  isChecked
                    ? isCorrect
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500'
                      : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-500'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold shrink-0 mt-0.5 font-mono">
                      {String.fromCharCode(96 + q.index)}
                    </span>
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 break-words">
                      {q.statement}
                    </p>
                  </div>

                  {/* Input Box for Tag */}
                  <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0">
                    <span className="font-bold text-slate-400">,</span>
                    <input
                      type="text"
                      value={userInputs[q.index] || ''}
                      onChange={(e) => handleInputChange(q.index, e.target.value)}
                      placeholder="e.g. aren't they?"
                      className={`w-32 sm:w-40 md:w-44 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                            : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-100'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-rose-500 focus:ring-rose-400'
                      }`}
                    />
                    <span className="font-bold text-slate-400">?</span>
                    {isChecked && (
                      <span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {isChecked && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1">
                    {!isCorrect && (
                      <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                        Correct Tag: <span className="font-mono">{correctTagStr}</span>
                      </div>
                    )}
                    <div className="text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{q.ruleTip || q.explanation}</span>
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
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-rose-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-bold text-xs sm:text-sm border border-rose-200 dark:border-rose-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Quick Check (ম্যানুয়াল যাচাই)</span>
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
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-rose-50 dark:bg-rose-950/60 px-4 py-2.5 rounded-2xl border border-rose-300 dark:border-rose-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-rose-700 dark:text-rose-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-rose-200 dark:bg-rose-900 text-[11px] font-black text-rose-950 dark:text-rose-100">
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
                    ? 'bg-rose-600 text-white shadow-md'
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
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Tag Rules Reference</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 border border-rose-300 dark:border-rose-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-rose-200 dark:border-slate-700">
                            {score} / 5 ({Math.round((score / 5) * 100)}%)
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
                          বাংলা টিপস ও কৌশল (Tag Questions Strategy):
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                          {aiEvaluation.banglaTips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Per-Tag In-Depth Breakdown Cards */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-rose-600" />
                    <span>Tag Question Review Breakdown:</span>
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
                            <strong>Your Tag: </strong>
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
                              <strong>Correct Tag: </strong>
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
                      <Sparkles className="w-4 h-4 text-rose-600" />
                      <span>Study Recommendations for Tag Questions:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
                  <span>Tag Question Rules (ট্যাগ কোয়েশ্চন নিয়মাবলী):</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.questions.map((item) => (
                    <div
                      key={item.index}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <span className="font-bold text-rose-600 dark:text-rose-400 mr-1.5">
                        ({String.fromCharCode(96 + item.index)}) {item.correctTag}:
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
        maxScore={5}
        title={exercise.title}
        provider={aiEvaluation?.provider}
        feedbackText={
          aiEvaluation?.overallFeedback ||
          (score === 5
            ? 'Terrific! All tag questions are accurate with proper auxiliary verbs and pronoun references.'
            : score >= 3
            ? 'Good work! Watch out for indefinite pronouns like nobody/everybody taking plural they.'
            : 'Review tag question rules for imperative and negative adverbs.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          "Let's থাকলে shall we?, Imperative এ will you? এবং Negative word থাকলে Affirmative tag ব্যবহার করুন।"
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
