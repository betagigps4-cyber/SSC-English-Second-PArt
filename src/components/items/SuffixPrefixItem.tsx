import React, { useState, useEffect, useMemo } from 'react';
import { SuffixPrefixExercise, BoardName } from '../../types';
import { SUFFIX_PREFIX_DATA } from '../../data/sscData';
import { getSuffixPrefixBanglaMeaning } from '../../data/suffixPrefixBanglaTranslations';
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
  Languages,
  Copy,
  Check,
} from 'lucide-react';

interface SuffixPrefixItemProps {
  onBackToMenu: () => void;
}

interface SuffixAiEvaluation {
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

export const SuffixPrefixItem: React.FC<SuffixPrefixItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    SUFFIX_PREFIX_DATA[0]?.board || 'Model Question 1'
  );
  const [exercise, setExercise] = useState<SuffixPrefixExercise>(SUFFIX_PREFIX_DATA[0]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [aiEvaluation, setAiEvaluation] = useState<SuffixAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [showAudioReader, setShowAudioReader] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');
  const [isBanglaFolded, setIsBanglaFolded] = useState<boolean>(true);
  const [copiedBangla, setCopiedBangla] = useState<boolean>(false);

  // Bangla meaning translation for current exercise
  const banglaMeaningText = useMemo(() => {
    if (!exercise) return '';
    return getSuffixPrefixBanglaMeaning(exercise);
  }, [exercise]);

  // Spoken text with filled or correct affixed words
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
      (SUFFIX_PREFIX_DATA || []).find((e) => e.board === selectedBoard) || SUFFIX_PREFIX_DATA[0];
    setExercise(found);
    handleReset();
  }, [selectedBoard]);

  const handleInputChange = (label: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [label]: value }));
  };

  // Instant Manual Quick Check
  const handleQuickCheck = () => {
    let currentScore = 0;
    const items = exercise?.items || [];
    const evals: SuffixAiEvaluation['gapEvaluations'] = [];

    items.forEach((item) => {
      const userAns = (answers[item.label] || '').trim().toLowerCase();
      const correct = (item.correctAnswer || '').toLowerCase().trim();
      const acceptable = (item.acceptableAnswers || []).map((a) => a.toLowerCase().trim());
      const isMatch = userAns.length > 0 && (userAns === correct || acceptable.includes(userAns));

      if (isMatch) {
        currentScore += 1;
      }

      evals.push({
        label: item.label,
        studentAnswer: answers[item.label] || '(blank)',
        correctAnswer: item.correctAnswer,
        isCorrect: isMatch,
        collocation: `Root: (${item.rootWord})`,
        ruleExplanation: item.ruleExplanation || item.explanation || `Affixed form: "${item.correctAnswer}".`,
        banglaRule: 'শব্দের আগে উপসর্গ (Prefix) বা পরে প্রত্যয় (Suffix) যোগে পার্টস অফ স্পিচ পরিবর্তন।',
        whyIncorrect: isMatch
          ? ''
          : userAns.length === 0
          ? 'Gap left blank.'
          : `Affixation error on root "${item.rootWord}". Expected: "${item.correctAnswer}".`,
      });
    });

    const itemWeight = items.length === 5 ? 1 : 0.5;
    const normalizedScore = Math.round(currentScore * itemWeight * 10) / 10;
    setScore(normalizedScore);

    setAiEvaluation({
      totalScore: normalizedScore,
      maxScore: 5,
      percentage: Math.round((normalizedScore / 5) * 100),
      grade: normalizedScore >= 4.5 ? 'A+' : normalizedScore >= 4 ? 'A' : normalizedScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        normalizedScore === 5
          ? 'Phenomenal morphology mastery! All prefixes and suffixes correctly formed.'
          : normalizedScore >= 3.5
          ? `Great work (${normalizedScore}/5.0)! Review the highlighted affixes to ensure correct spelling and form.`
          : `Good attempt (${normalizedScore}/5.0). Practice converting adjectives to adverbs (-ly), nouns to adjectives (-ful, -al), and negative prefixes (un-, im-, in-).`,
      banglaTips:
        'শূন্যস্থানের পূর্ব ও পরের শব্দের পার্টস অফ স্পিচ দেখে লক্ষ্য করুন এখানে Noun, Adjective, Verb নাকি Adverb বসবে।',
      gapEvaluations: evals,
      studySuggestions: [
        'Notice if the context requires a negative meaning (e.g. un-, dis-, in-, non-).',
        'Check spelling rules when adding suffixes (e.g. happy -> happily, rely -> reliable).',
        'Identify whether a noun maker (-tion, -ment, -ness, -ity) is needed.',
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
      const response = await fetch('/api/ai-grammar-examine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber: 6,
          itemTitle: 'Suffix and Prefix',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            passageTemplate: exercise.passageTemplate,
          },
          items: (exercise.items || []).map((item) => ({
            label: item.label,
            correctAnswer: item.correctAnswer,
            ruleExplanation: `${item.rootWord} -> ${item.ruleExplanation}`,
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
      console.warn('AI suffix prefix error, falling back to manual check:', err);
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
    setIsBanglaFolded(true);
  };

  const availableBoards = SUFFIX_PREFIX_DATA.map((e) => e.board);
  const items = exercise?.items || [];

  const renderPassage = () => {
    const parts = (exercise?.passageTemplate || '').split(/(\[[a-z]\])/g);

    return (
      <div className="text-sm sm:text-base md:text-lg leading-loose text-justify text-slate-800 dark:text-slate-200 bg-cyan-50/40 dark:bg-slate-900/60 p-4 sm:p-6 md:p-7 rounded-2xl border border-cyan-200/60 dark:border-slate-800 break-words">
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
                  userAns.trim().toLowerCase() === (item.correctAnswer || '').toLowerCase().trim());

            return (
              <span key={index} className="inline-flex flex-col items-center mx-1 my-1 align-middle">
                <span className="inline-flex items-center gap-1">
                  <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300 font-mono">
                    ({label})
                  </span>
                  <input
                    type="text"
                    value={userAns}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    placeholder={`[${label}] (${item?.rootWord || ''})`}
                    className={`w-28 sm:w-36 md:w-44 text-center font-semibold text-xs sm:text-sm md:text-base px-2 py-1 rounded-xl border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 ${
                      isChecked
                        ? isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-400'
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
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 max-w-[120px] truncate text-center">
                    Ans: {item.correctAnswer}
                  </span>
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
          id: `item-6-${exercise.id || selectedBoard}`,
          itemId: 6,
          itemNumber: 6,
          itemTitle: 'Suffix and Prefix',
          subTitle: `${selectedBoard}: ${exercise.title || 'Affixes Practice'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 mb-1.5">
              <span>Question No. 6</span>
              <span>•</span>
              <span>Marks: 0.5x10 = 05</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              বন্ধনীতে দেওয়া মূল শব্দের (Root word) আগে প্রিফিক্স (Prefix) বা পরে সাফিক্স (Suffix) যোগ করে শূন্যস্থান পূরণ করুন।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-6-${exercise.id || selectedBoard}`,
              itemId: 6,
              itemNumber: 6,
              itemTitle: 'Suffix and Prefix',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* Read-Aloud Toolbar with Live Highlight */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Practice Passage:
          </span>
          <button
            onClick={() => setShowAudioReader(!showAudioReader)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
              showAudioReader
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/80 hover:bg-cyan-100'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>
              {showAudioReader
                ? 'Hide Read-Out (প্যাসেজ লুকান)'
                : '🔊 Read Aloud (লাইভ হাইলাইটসহ শুনুন)'}
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
              accentColor="blue"
            />
          </div>
        )}

        {/* Passage with Gap Inputs */}
        {renderPassage()}

        {/* Full Bangla Meaning - Folding Accordion directly below English Passage */}
        <div className="mt-5 mb-2" id="suffix-prefix-folding-bangla-container">
          <button
            type="button"
            id="toggle-suffix-prefix-bangla-folding"
            onClick={() => setIsBanglaFolded((prev) => !prev)}
            className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 border cursor-pointer select-none text-left shadow-xs ${
              !isBanglaFolded
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700/80 text-cyan-950 dark:text-cyan-200 ring-2 ring-cyan-400/30'
                : 'bg-emerald-50/70 hover:bg-emerald-100/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-emerald-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-300'
            }`}
            aria-expanded={!isBanglaFolded}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  !isBanglaFolded
                    ? 'bg-cyan-200/80 dark:bg-cyan-900/80 text-cyan-900 dark:text-cyan-200'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <Languages className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 dark:text-slate-100">
                    📖 প্যাসেজের সম্পূর্ণ বাংলা অর্থ (Full Bangla Meaning)
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      !isBanglaFolded
                        ? 'bg-cyan-200/90 dark:bg-cyan-900/90 text-cyan-950 dark:text-cyan-100 border border-cyan-300 dark:border-cyan-700'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {!isBanglaFolded ? 'খোলা রয়েছে • ক্লিক করে বন্ধ করুন' : 'ক্লিক করে সম্পূর্ণ অর্থ দেখুন (Folded)'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {!isBanglaFolded
                    ? 'বাংলা অনুবাদ লুকাতে পুনরায় এখানে ক্লিক করুন'
                    : 'প্যাসেজের প্রতিটি বাক্য ও সাফিক্স-প্রিফিক্সের সঠিক প্রয়োগের পূর্ণাঙ্গ বাংলা অনুবাদ দেখতে ক্লিক করুন'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`p-1.5 rounded-full transition-transform duration-200 ${
                  !isBanglaFolded
                    ? 'bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-200 rotate-180'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Unfolded Bangla Meaning Box */}
          {!isBanglaFolded && (
            <div className="mt-2.5 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-cyan-50/90 via-teal-50/40 to-blue-100/30 dark:from-slate-850 dark:via-slate-900 dark:to-cyan-950/20 border-2 border-cyan-200/90 dark:border-cyan-800/60 rounded-2xl shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between gap-3 pb-3 mb-3.5 border-b border-cyan-200/70 dark:border-cyan-800/40">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-950 dark:text-cyan-300">
                    প্যাসেজের নির্ভুল বঙ্গানুবাদ ও ভাবার্থ
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (banglaMeaningText) {
                        navigator.clipboard.writeText(banglaMeaningText);
                        setCopiedBangla(true);
                        setTimeout(() => setCopiedBangla(false), 2000);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-cyan-100 dark:hover:bg-slate-700 text-cyan-950 dark:text-cyan-200 border border-cyan-300/80 dark:border-slate-700 transition cursor-pointer shadow-2xs"
                    title="সম্পূর্ণ বাংলা অনুবাদ কপি করুন"
                  >
                    {copiedBangla ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBanglaFolded(true)}
                    className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-xl bg-cyan-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    সংকোচন করুন ✕
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-200 font-sans text-justify break-words bg-white/75 dark:bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-cyan-200/50 dark:border-slate-800 shadow-inner">
                {banglaMeaningText || (
                  <span className="italic text-slate-500">
                    এই অনুচ্ছেদের পূর্ণাঙ্গ বাংলা অর্থ প্রস্তুত রয়েছে।
                  </span>
                )}
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
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
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
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:hover:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 font-bold text-xs sm:text-sm border border-cyan-200 dark:border-cyan-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
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
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-cyan-50 dark:bg-cyan-950/60 px-4 py-2.5 rounded-2xl border border-cyan-300 dark:border-cyan-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-cyan-700 dark:text-cyan-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5.0</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-cyan-200 dark:bg-cyan-900 text-[11px] font-black text-cyan-950 dark:text-cyan-100">
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
                    ? 'bg-cyan-600 text-white shadow-md'
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
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Rules Reference (ব্যাকরণ বিধি)</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-teal-500/10 border border-cyan-300 dark:border-cyan-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-cyan-200 dark:border-slate-700">
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
                          বাংলা টিপস ও কৌশল (Suffix and Prefix Strategy):
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
                      <MessageSquare className="w-4 h-4 text-cyan-600" />
                      <span>Detailed Affixation Breakdown:</span>
                    </h5>
                    <span className="text-xs font-bold text-slate-500">10 Affixes (0.5 x 10 = 5 Marks)</span>
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
                                Correct Form:
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
                      <Sparkles className="w-4 h-4 text-cyan-600" />
                      <span>Study Recommendations for Affixes:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
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
                  <span>Affix Rules Reference (সাফিক্স ও প্রিফিক্স নিয়মাবলী):</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.items.map((item) => (
                    <div
                      key={item.label}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 mr-1.5">
                        ({item.label}) {item.correctAnswer} ({item.rootWord}):
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{item.ruleExplanation}</span>
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
            ? 'Phenomenal morphology mastery! All prefixes and suffixes correctly formed.'
            : score >= 3.5
            ? 'Great work! You have strong understanding of word formation.'
            : 'Keep practicing! Review prefixes, suffixes, and parts of speech transformation.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          'মূল শব্দের পার্টস অফ স্পিচ পরিবর্তন (Noun, Adjective, Adverb) ও বানানের নিয়ম লক্ষ্য করুন।'
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
