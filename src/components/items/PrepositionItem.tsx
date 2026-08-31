import React, { useState, useEffect, useMemo } from 'react';
import { PrepositionExercise, BoardName } from '../../types';
import { PREPOSITION_DATA } from '../../data/sscData';
import { getPassageBanglaTranslation } from '../../data/prepositionPassageTranslations';
import { BoardSelector } from '../BoardSelector';
import { CelebrationModal } from '../CelebrationModal';
import { HighlightedPassageReader } from '../HighlightedPassageReader';
import { BookmarkButton } from '../BookmarkButton';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Volume2,
  Eye,
  Bot,
  Loader2,
  BookOpen,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Languages,
  BookOpenCheck,
  Copy,
  Check,
} from 'lucide-react';

interface PrepositionItemProps {
  onBackToMenu: () => void;
}

interface PrepositionAiGapResult {
  label: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  collocation?: string;
  ruleExplanation?: string;
  banglaRule?: string;
  whyIncorrect?: string;
}

interface PrepositionAiEvaluation {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade?: string;
  provider?: string;
  overallFeedback: string;
  banglaTips?: string;
  gapEvaluations: PrepositionAiGapResult[];
  studySuggestions?: string[];
  aiPowered?: boolean;
}

export const PrepositionItem: React.FC<PrepositionItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    PREPOSITION_DATA[0]?.board || 'Model Question 1'
  );
  const [exercise, setExercise] = useState<PrepositionExercise>(PREPOSITION_DATA[0]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [aiEvaluation, setAiEvaluation] = useState<PrepositionAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [showAudioReader, setShowAudioReader] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');
  
  // Folding state for each preposition's Bangla meaning
  const [unfoldedGaps, setUnfoldedGaps] = useState<Record<string, boolean>>({});
  // Master toggle for all gap meanings
  const [showAllMeanings, setShowAllMeanings] = useState<boolean>(false);
  // Toggle for full passage Bangla translation (folding)
  const [showPassageBangla, setShowPassageBangla] = useState<boolean>(false);
  const [copiedBangla, setCopiedBangla] = useState<boolean>(false);

  // Full Passage Bangla Translation for the current exercise
  const fullPassageBangla = useMemo(() => {
    return getPassageBanglaTranslation(exercise);
  }, [exercise]);

  // Helper to get formatted collocation & bangla meaning
  const getPrepositionCollocation = (item: any) => {
    if (item.collocation) return item.collocation;
    const match = item.ruleExplanation?.match(/"([^"]+)"/);
    if (match && match[1]) return match[1];
    return `${item.correctAnswer} (preposition)`;
  };

  const getPrepositionBanglaMeaning = (item: any) => {
    if (item.banglaMeaning) return item.banglaMeaning;
    const match = item.ruleExplanation?.match(/\(([^)]+)\)/);
    if (match && match[1]) return match[1];
    return item.ruleExplanation || 'উপযুক্ত প্রিপজিশন এর সঠিক প্রয়োগ';
  };

  // Toggle single gap fold/unfold
  const toggleGapMeaning = (label: string) => {
    setUnfoldedGaps((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Toggle all gaps fold/unfold
  const toggleAllMeanings = () => {
    const nextState = !showAllMeanings;
    setShowAllMeanings(nextState);
    const newUnfolded: Record<string, boolean> = {};
    (exercise?.items || []).forEach((item) => {
      newUnfolded[item.label] = nextState;
    });
    setUnfoldedGaps(newUnfolded);
  };

  // Spoken text with filled or correct prepositions
  const cleanSpokenPassage = useMemo(() => {
    if (!exercise) return '';
    let txt = exercise.passageTemplate;
    const items = exercise.items || [];
    items.forEach((item) => {
      const userWord = answers[item.label];
      const wordToSpeak =
        userWord && userWord.trim() ? userWord.trim() : item.correctAnswer || `gap ${item.label}`;
      txt = txt.replace(`[${item.label}]`, wordToSpeak);
    });
    return txt;
  }, [exercise, answers]);

  useEffect(() => {
    const found =
      (PREPOSITION_DATA || []).find((e) => e.board === selectedBoard) || PREPOSITION_DATA[0];
    setExercise(found);
    handleReset();
  }, [selectedBoard]);

  const handleInputChange = (label: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [label]: value }));
  };

  // Instant local rule check
  const handleQuickCheck = () => {
    let correctCount = 0;
    const items = exercise?.items || [];
    const gapEvals: PrepositionAiGapResult[] = [];

    items.forEach((item) => {
      const userAns = (answers[item.label] || '').trim().toLowerCase();
      const correct = (item.correctAnswer || '').toLowerCase().trim();
      const acceptable = (item.acceptableAnswers || []).map((a) => (a || '').toLowerCase().trim());
      const isMatch = userAns.length > 0 && (userAns === correct || acceptable.includes(userAns));

      if (isMatch) {
        correctCount += 1;
      }

      const collocation = getPrepositionCollocation(item);
      const banglaMeaning = getPrepositionBanglaMeaning(item);

      gapEvals.push({
        label: item.label,
        studentAnswer: answers[item.label] || '',
        correctAnswer: item.correctAnswer,
        isCorrect: isMatch,
        collocation: collocation,
        ruleExplanation: item.ruleExplanation || `Standard appropriate preposition usage: "${item.correctAnswer}".`,
        banglaRule: `${collocation}: ${banglaMeaning}`,
        whyIncorrect: isMatch
          ? ''
          : userAns.length === 0
          ? 'Gap left blank (কোনো উত্তর দেওয়া হয়নি).'
          : `"${userAns}" does not match the required collocation. The correct preposition here is "${item.correctAnswer}".`,
      });
    });

    const itemWeight = items.length === 5 ? 1 : 0.5;
    const calculatedScore = Math.round(correctCount * itemWeight * 10) / 10;
    setScore(calculatedScore);

    setAiEvaluation({
      totalScore: calculatedScore,
      maxScore: 5,
      percentage: (calculatedScore / 5) * 100,
      grade: calculatedScore >= 4.5 ? 'A+' : calculatedScore >= 4 ? 'A' : calculatedScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        calculatedScore === 5
          ? 'Phenomenal! You scored full marks (5.0 / 5.0). Your command of appropriate prepositions and phrasal idioms is outstanding.'
          : calculatedScore >= 3.5
          ? `Good performance (${calculatedScore} / 5.0)! Review the highlighted collocations to avoid minor prepositional traps in board exams.`
          : `Keep practicing (${calculatedScore} / 5.0). Make sure to memorize prepositions grouped with their head verbs or adjectives.`,
      banglaTips:
        'Appropriate Preposition নির্ভুলভাবে মনে রাখতে Verb বা Adjective এর সাথে Preposition মিলিয়ে একসাথে পড়ুন (যেমন: addicted to, proud of, look into)।',
      gapEvaluations: gapEvals,
      studySuggestions: [
        'Notice if the preposition indicates movement (into, to) or fixed state (in, at).',
        'Identify whether the word before the gap requires a fixed collocation (e.g. key to, aim at).',
        'Read the whole sentence aloud to verify that the preposition flows naturally.',
      ],
      aiPowered: false,
    });

    setIsChecked(true);
    setShowCelebration(true);
  };

  // ChatGPT & Gemini AI Examination
  const handleAiExamine = async (provider: 'chatgpt' | 'gemini') => {
    setSelectedAiModel(provider);
    setIsAiChecking(true);

    try {
      const response = await fetch('/api/ai-grammar-examine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber: 2,
          itemTitle: 'Prepositions',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            passageTemplate: exercise.passageTemplate,
          },
          items: exercise.items.map((item) => ({
            label: item.label,
            correctAnswer: item.correctAnswer,
            acceptableAnswers: item.acceptableAnswers,
            ruleExplanation: item.ruleExplanation,
          })),
          userAnswers: answers,
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
      console.warn('Network issue during AI preposition check, running intelligent fallback:', err);
      handleQuickCheck();
    } finally {
      setIsAiChecking(false);
      setIsChecked(true);
      setShowCelebration(true);
    }
  };

  const handleShowAllAnswers = () => {
    const modelAnswers: Record<string, string> = {};
    (exercise?.items || []).forEach((item) => {
      modelAnswers[item.label] = item.correctAnswer;
    });
    setAnswers(modelAnswers);
    setIsChecked(true);
    setScore(5);
  };

  const handleReset = () => {
    setAnswers({});
    setIsChecked(false);
    setIsAiChecking(false);
    setAiEvaluation(null);
    setShowCelebration(false);
    setScore(0);
    setActiveTab('aiFeedback');
    setUnfoldedGaps({});
    setShowAllMeanings(false);
    setShowPassageBangla(false);
  };

  const availableBoards = PREPOSITION_DATA.map((e) => e.board);
  const items = exercise?.items || [];

  const renderPassage = () => {
    const parts = (exercise?.passageTemplate || '').split(/(\[[a-z]\])/g);

    return (
      <div className="text-sm sm:text-base md:text-lg leading-loose text-justify text-slate-800 dark:text-slate-200 bg-emerald-50/40 dark:bg-slate-900/60 p-4 sm:p-6 md:p-7 rounded-3xl border border-emerald-200/60 dark:border-slate-800 break-words shadow-sm">
        {parts.map((part, index) => {
          const match = part.match(/\[([a-z])\]/);
          if (match) {
            const label = match[1];
            const item = items.find((g) => g.label === label);
            const userAns = answers[label] || '';

            const gapEval = aiEvaluation?.gapEvaluations?.find((g) => g.label === label);
            const isCorrect =
              isChecked &&
              (gapEval
                ? gapEval.isCorrect
                : item &&
                  userAns.trim().length > 0 &&
                  (userAns.trim().toLowerCase() === (item.correctAnswer || '').toLowerCase().trim() ||
                    (item.acceptableAnswers || [])
                      .map((a) => (a || '').toLowerCase().trim())
                      .includes(userAns.trim().toLowerCase())));

            const isUnfolded = Boolean(unfoldedGaps[label]);
            const collocation = item ? getPrepositionCollocation(item) : '';
            const banglaMeaning = item ? getPrepositionBanglaMeaning(item) : '';

            return (
              <span key={index} className="inline-flex flex-col items-center mx-1 my-1.5 align-middle">
                <span className="inline-flex items-center gap-1">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                    ({label})
                  </span>
                  <input
                    type="text"
                    value={userAns}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    placeholder={`[${label}]`}
                    className={`w-24 sm:w-28 md:w-32 text-center font-semibold text-xs sm:text-sm md:text-base px-2 py-1 rounded-xl border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 ${
                      isChecked
                        ? isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-emerald-500 focus:ring-emerald-400'
                    }`}
                  />
                  {isChecked && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline-block" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 inline-block" />
                      )}
                    </span>
                  )}
                </span>

                {isChecked && !isCorrect && item && (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 max-w-[140px] truncate text-center">
                    Ans: {item.correctAnswer}
                  </span>
                )}

                {/* Folding / Collapsible Bangla Meaning Component directly under each Preposition */}
                {item && (
                  <div className="mt-1 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => toggleGapMeaning(label)}
                      className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer select-none shadow-xs ${
                        isUnfolded
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 ring-1 ring-amber-400/50'
                          : 'bg-emerald-100/80 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300/70 dark:border-emerald-800'
                      }`}
                      title="Preposition সহ পূর্ণাঙ্গ বাংলা অর্থ দেখুন / লুকান"
                    >
                      <Languages className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-700 dark:text-emerald-400" />
                      <span>{isUnfolded ? 'বাংলা অর্থ বন্ধ' : 'বাংলা অর্থ'}</span>
                      {isUnfolded ? (
                        <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-700 dark:text-amber-400" />
                      ) : (
                        <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-700 dark:text-emerald-400" />
                      )}
                    </button>

                    {/* Unfolded Bangla Card */}
                    {isUnfolded && (
                      <div className="mt-1.5 px-3 py-1.5 bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-slate-800 dark:to-slate-850 border border-amber-300/90 dark:border-amber-600/70 rounded-2xl shadow-lg text-center max-w-[210px] sm:max-w-[260px] animate-in fade-in zoom-in-95 duration-200 z-10">
                        <div className="text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-300 font-mono flex items-center justify-center gap-1">
                          <span className="w-4 h-4 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 flex items-center justify-center text-[10px]">
                            {label}
                          </span>
                          <span>{collocation}</span>
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-medium leading-relaxed">
                          {banglaMeaning}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <BoardSelector
        availableBoards={availableBoards}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        bookmarkData={{
          id: `item-7-${exercise.id || selectedBoard}`,
          itemId: 7,
          itemNumber: 7,
          itemTitle: 'Prepositions',
          subTitle: `${selectedBoard}: ${exercise.title || 'Prepositions Practice'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1.5">
              <span>Question No. 2</span>
              <span>•</span>
              <span>Marks: 0.5x10 = 05</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              প্রদত্ত অনুচ্ছেদের উপযুক্ত স্থানে উপযুক্ত প্রিপজিশন (Appropriate Preposition) বসিয়ে শূন্যস্থান পূরণ করুন। প্রতিটি শূন্যস্থানের নিচে ক্লিক করে <strong className="text-emerald-700 dark:text-emerald-400">Preposition সহ পূর্ণাঙ্গ বাংলা অর্থ (Folding)</strong> দেখে নিতে পারবেন।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-7-${exercise.id || selectedBoard}`,
              itemId: 7,
              itemNumber: 7,
              itemTitle: 'Prepositions',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* Toolbar with Folding Controls & Read-Aloud */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle All Individual Preposition Meanings (Folding/Unfolding) */}
            <button
              onClick={toggleAllMeanings}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                showAllMeanings
                  ? 'bg-amber-500 text-white shadow-md hover:bg-amber-600'
                  : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
              }`}
              title="প্রতিটি শূন্যস্থানের নিচের বাংলা অর্থ একসাথে খুলুন বা বন্ধ করুন"
            >
              <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>
                {showAllMeanings
                  ? 'সব Preposition অর্থ ভাঁজ করুন'
                  : '📖 প্রতিটি Preposition-এর অর্থ ভাঁজ খুলুন'}
              </span>
            </button>

            {/* Quick Toggle for Total Passage Meaning */}
            <button
              onClick={() => setShowPassageBangla(!showPassageBangla)}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                showPassageBangla
                  ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                  : 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800'
              }`}
              title="সম্পূর্ণ অনুচ্ছেদের বাংলা অর্থ দেখুন বা লুকান"
            >
              <BookOpenCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>
                {showPassageBangla
                  ? 'সম্পূর্ণ অনুচ্ছেদের অর্থ লুকান'
                  : 'সম্পূর্ণ অনুচ্ছেদের অর্থ দেখুন'}
              </span>
              {showPassageBangla ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Read Aloud Button */}
          <button
            onClick={() => setShowAudioReader(!showAudioReader)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              showAudioReader
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>
              {showAudioReader
                ? 'Hide Audio'
                : '🔊 Read Aloud (লাইভ হাইলাইট)'}
            </span>
          </button>
        </div>

        {/* Live Highlighted Passage Reader */}
        {showAudioReader && (
          <div className="mb-6">
            <HighlightedPassageReader
              text={cleanSpokenPassage}
              title={`${exercise.title} (Live Read-Out & Highlighting)`}
              banglaTitle="প্যাসেজটি শুনুন: অডিও বাজানোর সময় প্রতিটি শব্দ ও বাক্য লাইভ সোনালী রঙে হাইলাইট হবে।"
              accentColor="emerald"
            />
          </div>
        )}

        {/* Preposition Passage with Fill-in Blanks */}
        {renderPassage()}

        {/* STATE-DRIVEN FOLDING SECTION: Total Passage Bengali Translation */}
        <div 
          id="preposition-passage-translation-disclosure"
          className="mt-5 overflow-hidden rounded-3xl border border-indigo-200/90 dark:border-indigo-800/90 bg-gradient-to-br from-indigo-50/80 via-sky-50/40 to-slate-50 dark:from-slate-900/95 dark:via-indigo-950/40 dark:to-slate-900 shadow-sm transition-all duration-300"
        >
          {/* Main State-driven Toggle / Disclosure Button */}
          <button
            type="button"
            id="btn-toggle-passage-translation"
            aria-controls="passage-translation-content"
            aria-expanded={showPassageBangla}
            onClick={() => setShowPassageBangla(!showPassageBangla)}
            className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-left transition-colors hover:bg-indigo-100/70 dark:hover:bg-indigo-950/70 cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <BookOpenCheck className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-indigo-950 dark:text-indigo-100 tracking-tight">
                    {showPassageBangla ? 'সম্পূর্ণ অনুচ্ছেদের অর্থ লুকান' : 'সম্পূর্ণ অনুচ্ছেদের অর্থ দেখুন'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-colors ${
                    showPassageBangla 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-indigo-200/80 dark:bg-indigo-900/70 text-indigo-900 dark:text-indigo-200'
                  }`}>
                    {showPassageBangla ? 'খোলা রয়েছে (Opened)' : 'ফোল্ডিং (Click to Unfold)'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-indigo-800/80 dark:text-indigo-300/80 font-medium truncate mt-0.5">
                  অনুচ্ছেদটির সম্পূর্ণ প্রাঞ্জল বাংলা অর্থ ফোল্ডিং অবস্থায় পড়তে ক্লিক করুন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs group-hover:bg-indigo-50 dark:group-hover:bg-slate-700 transition">
                {showPassageBangla ? 'ভাঁজ করুন' : 'সম্পূর্ণ অনুচ্ছেদের অর্থ দেখুন'}
              </span>
              <span className={`w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shadow-xs transition-transform duration-300 ${
                showPassageBangla ? 'rotate-180 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' : ''
              }`}>
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Unfolded Total Passage Meaning Body */}
          {showPassageBangla && (
            <div 
              id="passage-translation-content"
              role="region"
              aria-labelledby="btn-toggle-passage-translation"
              className="px-4 sm:px-6 pb-5 pt-2 border-t border-indigo-100 dark:border-indigo-900/60 animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-indigo-100 dark:border-indigo-900/50 shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌐</span>
                    <span className="text-xs sm:text-sm font-black text-indigo-950 dark:text-indigo-200 tracking-wide">
                      সম্পূর্ণ অনুচ্ছেদের প্রাঞ্জল বাংলা অর্থ:
                    </span>
                  </div>

                  <button
                    type="button"
                    id="btn-copy-passage-translation"
                    onClick={() => {
                      navigator.clipboard.writeText(fullPassageBangla);
                      setCopiedBangla(true);
                      setTimeout(() => setCopiedBangla(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition cursor-pointer"
                    title="অনুবাদ কপি করুন"
                  >
                    {copiedBangla ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">কপি সম্পন্ন!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed sm:leading-loose font-medium text-justify">
                  {fullPassageBangla}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Responsive Action Buttons Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
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
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-cyan-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-200 dark:border-emerald-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2.5 rounded-2xl border border-emerald-300 dark:border-emerald-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5.0</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-emerald-200 dark:bg-emerald-900 text-[11px] font-black text-emerald-950 dark:text-emerald-100">
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
                    ? 'bg-emerald-600 text-white shadow-md'
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
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Preposition Collocations & Rules Reference</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-300 dark:border-emerald-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-slate-700">
                            {score} / 5.0 ({Math.round((score / 5) * 100)}%)
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
                          বাংলা টিপস ও কৌশল (Appropriate Preposition Strategy):
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                          {aiEvaluation.banglaTips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Per-Gap In-Depth Responsive Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Detailed Preposition Breakdown:</span>
                    </h5>
                    <span className="text-xs font-bold text-slate-500">10 Gaps (0.5 x 10 = 5 Marks)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {aiEvaluation.gapEvaluations?.map((gap) => (
                      <div
                        key={gap.label}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                          gap.isCorrect
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                                gap.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                              }`}
                            >
                              {gap.label}
                            </span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Gap ({gap.label}) {gap.collocation}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {gap.isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>+0.5 Mark</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>0.0 Mark</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Student Answer vs Correct Answer */}
                        <div className="space-y-1 text-xs sm:text-sm mb-2">
                          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                            <span>Your Answer:</span>
                            <span
                              className={`font-bold font-mono px-2 py-0.5 rounded ${
                                gap.isCorrect
                                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100'
                                  : 'bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 line-through'
                              }`}
                            >
                              {gap.studentAnswer && gap.studentAnswer.trim() ? gap.studentAnswer : '(blank)'}
                            </span>
                          </div>

                          {!gap.isCorrect && (
                            <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
                              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                Correct Preposition:
                              </span>
                              <span className="font-bold font-mono bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 px-2 py-0.5 rounded">
                                {gap.correctAnswer}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Why Incorrect Notice */}
                        {!gap.isCorrect && gap.whyIncorrect && (
                          <p className="text-xs text-rose-800 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-950/50 p-2 rounded-lg mb-2 leading-relaxed">
                            <strong>ভুলের কারণ:</strong> {gap.whyIncorrect}
                          </p>
                        )}

                        {/* Grammatical explanation */}
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
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Study Recommendations for Prepositions:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Appropriate Preposition Rules & Collocations (Preposition সহ পূর্ণাঙ্গ বাংলা অর্থ):</span>
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.items.map((item) => {
                    const collocation = getPrepositionCollocation(item);
                    const banglaMeaning = getPrepositionBanglaMeaning(item);
                    return (
                      <div
                        key={item.label}
                        className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-mono font-bold text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-lg">
                              Gap ({item.label}) — Preposition: {item.correctAnswer}
                            </span>
                            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-md font-mono">
                              {collocation}
                            </span>
                          </div>
                          <p className="text-emerald-900 dark:text-emerald-300 font-semibold mb-1">
                            বাংলা অর্থ: {banglaMeaning}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                            {item.ruleExplanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
            ? 'Phenomenal! You scored full marks (5.0 / 5.0). Your command of appropriate prepositions is outstanding.'
            : score >= 3.5
            ? 'Good work! Review the highlighted prepositions to avoid minor errors in board exams.'
            : 'Keep practicing! Review appropriate prepositions and phrasal verbs.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          'Appropriate Preposition নির্ভুলভাবে মনে রাখতে Verb বা Adjective এর সাথে Preposition মিলিয়ে একসাথে পড়ুন।'
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
