import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GapFillingExercise, BoardName } from '../../types';
import { GAP_FILLING_DATA } from '../../data/sscData';
import { getGapFillingBanglaMeaning } from '../../data/gapFillingBanglaTranslations';
import { BoardSelector } from '../BoardSelector';
import { CelebrationModal } from '../CelebrationModal';
import { HighlightedPassageReader } from '../HighlightedPassageReader';
import { BookmarkButton } from '../BookmarkButton';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lightbulb,
  Move,
  Volume2,
  Eye,
  Bot,
  Loader2,
  ChevronRight,
  ChevronDown,
  BookOpen,
  MessageSquare,
  Pin,
  PinOff,
  ScrollText,
  ArrowUp,
  ArrowDown,
  ZoomIn,
  ZoomOut,
  Hash,
  Languages,
  Copy,
  Check,
} from 'lucide-react';

interface GapFillingItemProps {
  onBackToMenu: () => void;
}

interface GapAiEvaluation {
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

export const GapFillingItem: React.FC<GapFillingItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(GAP_FILLING_DATA[0]?.board || 'Model Question 1');
  const [exercise, setExercise] = useState<GapFillingExercise>(GAP_FILLING_DATA[0]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [aiEvaluation, setAiEvaluation] = useState<GapAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activeBlankLabel, setActiveBlankLabel] = useState<string | null>(null);
  const [showAudioReader, setShowAudioReader] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');
  const [isStickyClues, setIsStickyClues] = useState<boolean>(true);
  const [passageScrollMode, setPassageScrollMode] = useState<'scroll' | 'full'>('scroll');
  const [fontSizeMode, setFontSizeMode] = useState<'normal' | 'large' | 'compact'>('normal');
  const [isBanglaFolded, setIsBanglaFolded] = useState<boolean>(true);
  const [copiedBangla, setCopiedBangla] = useState<boolean>(false);

  const passageContainerRef = useRef<HTMLDivElement>(null);

  // Full Bangla meaning for the current passage
  const banglaMeaningText = useMemo(() => {
    return getGapFillingBanglaMeaning(exercise);
  }, [exercise]);

  // Spoken text with filled or correct words for speech reader
  const cleanSpokenPassage = useMemo(() => {
    if (!exercise) return '';
    let txt = exercise.passageTemplate;
    (exercise.gaps || []).forEach((gap) => {
      const userWord = answers[gap.label];
      const wordToSpeak =
        userWord && userWord.trim() ? userWord.trim() : gap.correctAnswer || `gap ${gap.label}`;
      txt = txt.replace(`[${gap.label}]`, wordToSpeak);
    });
    return txt;
  }, [exercise, answers]);

  // Track used clues counts
  const usedCluesCount = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(answers).forEach((ans) => {
      const clean = (typeof ans === 'string' ? ans : '').trim().toLowerCase();
      if (clean) {
        counts[clean] = (counts[clean] || 0) + 1;
      }
    });
    return counts;
  }, [answers]);

  const filledGapsCount = useMemo(() => {
    return Object.values(answers).filter((v) => typeof v === 'string' && v.trim().length > 0).length;
  }, [answers]);

  useEffect(() => {
    const found =
      (GAP_FILLING_DATA || []).find((e) => e.board === selectedBoard) || GAP_FILLING_DATA[0];
    setExercise(found);
    handleReset();
  }, [selectedBoard]);

  const handleInputChange = (label: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [label]: value }));
  };

  const handleWordClick = (word: string) => {
    if (activeBlankLabel) {
      setAnswers((prev) => ({ ...prev, [activeBlankLabel]: word }));
      setSelectedWord(null);
      // Automatically advance to the next empty blank if available
      const gapsList = exercise?.gaps || [];
      const nextEmpty = gapsList.find(
        (g) => g.label !== activeBlankLabel && !(answers[g.label] && answers[g.label].trim().length > 0)
      );
      if (nextEmpty) {
        setActiveBlankLabel(nextEmpty.label);
        const el = document.getElementById(`gap-input-${nextEmpty.label}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          el.focus();
        }
      } else {
        setActiveBlankLabel(null);
      }
    } else {
      setSelectedWord(selectedWord === word ? null : word);
    }
  };

  const handleBlankClick = (label: string) => {
    setActiveBlankLabel(label);
    if (selectedWord) {
      setAnswers((prev) => ({ ...prev, [label]: selectedWord }));
      setSelectedWord(null);
      // Advance to next gap
      const gapsList = exercise?.gaps || [];
      const nextEmpty = gapsList.find(
        (g) => g.label !== label && !(answers[g.label] && answers[g.label].trim().length > 0)
      );
      if (nextEmpty) {
        setActiveBlankLabel(nextEmpty.label);
      } else {
        setActiveBlankLabel(null);
      }
    }
  };

  const scrollToGap = (label: string) => {
    setActiveBlankLabel(label);
    const element = document.getElementById(`gap-input-${label}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
    }
  };

  const scrollToTop = () => {
    if (passageContainerRef.current) {
      passageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (passageContainerRef.current) {
      passageContainerRef.current.scrollTo({
        top: passageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, word: string) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e: React.DragEvent, label: string) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain') || draggedWord;
    if (word) {
      setAnswers((prev) => ({ ...prev, [label]: word }));
      setDraggedWord(null);
      setActiveBlankLabel(label);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Instant Manual Quick Check
  const handleQuickCheck = () => {
    let correctCount = 0;
    const gapEvals: GapAiEvaluation['gapEvaluations'] = [];

    (exercise?.gaps || []).forEach((gap) => {
      const userAns = (answers[gap.label] || '').trim().toLowerCase();
      const correct = (gap.correctAnswer || '').toLowerCase().trim();
      const acceptable = (gap.acceptableAnswers || []).map((a) => (a || '').toLowerCase().trim());
      const isMatch = userAns.length > 0 && (userAns === correct || acceptable.includes(userAns));

      if (isMatch) {
        correctCount += 1;
      }

      gapEvals.push({
        label: gap.label,
        studentAnswer: answers[gap.label] || '',
        correctAnswer: gap.correctAnswer,
        isCorrect: isMatch,
        collocation: gap.explanation?.split(':')[0] || 'Vocabulary & Grammar Rule',
        ruleExplanation: gap.explanation || `Correct form: "${gap.correctAnswer}".`,
        banglaRule: 'প্রদত্ত ক্লু অনুযায়ী পার্টস অব স্পিচ এর সঠিক প্রয়োগ।',
        whyIncorrect: isMatch
          ? ''
          : userAns.length === 0
          ? 'Gap left blank (কোনো উত্তর লেখা হয়নি).'
          : `"${userAns}" does not match the contextual grammar. Expected form is "${gap.correctAnswer}".`,
      });
    });

    const calculatedScore = Math.round(correctCount * 0.5 * 10) / 10;
    setScore(calculatedScore);

    setAiEvaluation({
      totalScore: calculatedScore,
      maxScore: 5,
      percentage: Math.round((calculatedScore / 5) * 100),
      grade: calculatedScore >= 4.5 ? 'A+' : calculatedScore >= 4 ? 'A' : calculatedScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        calculatedScore === 5
          ? 'Outstanding mastery! You filled all 10 gaps correctly with perfect parts of speech conversion.'
          : calculatedScore >= 3.5
          ? `Great job (${calculatedScore}/5.0)! Review the highlighted gaps to achieve full marks in board exams.`
          : `Good effort (${calculatedScore}/5.0). Pay attention to grammatical parts of speech transformations.`,
      banglaTips:
        'ক্লু বক্সের শব্দগুলো হুবহু না বসে প্রায়ই পার্টস অব স্পিচ পরিবর্তন (যেমন: Noun, Adjective, Adverb) হয়ে বসে।',
      gapEvaluations: gapEvals,
      studySuggestions: [
        'Identify the part of speech required before and after the gap.',
        'Check subject-verb agreement and prepositional collocations.',
        'Reread the whole sentence to ensure natural semantic flow.',
      ],
      aiPowered: false,
    });

    setIsChecked(true);
    setShowCelebration(true);
  };

  // AI Examination (ChatGPT / Gemini AI)
  const handleAiExamine = async (provider: 'chatgpt' | 'gemini') => {
    setSelectedAiModel(provider);
    setIsAiChecking(true);

    try {
      const response = await fetch('/api/ai-grammar-examine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber: 1,
          itemTitle: 'Gap Filling with Clues',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            passageTemplate: exercise.passageTemplate,
            boxWords: exercise.clues,
          },
          items: exercise.gaps.map((g) => ({
            label: g.label,
            correctAnswer: g.correctAnswer,
            acceptableAnswers: g.acceptableAnswers,
            ruleExplanation: g.explanation,
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
      console.warn('AI evaluation network warning, running local rule check:', err);
      handleQuickCheck();
    } finally {
      setIsAiChecking(false);
      setIsChecked(true);
      setShowCelebration(true);
    }
  };

  const handleShowAllAnswers = () => {
    const modelAnswers: Record<string, string> = {};
    (exercise?.gaps || []).forEach((gap) => {
      modelAnswers[gap.label] = gap.correctAnswer;
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
    setSelectedWord(null);
    setActiveTab('aiFeedback');
    setIsBanglaFolded(true);
    setCopiedBangla(false);
  };

  const availableBoards = GAP_FILLING_DATA.map((e) => e.board);
  const gaps = exercise?.gaps || [];

  const fontClass =
    fontSizeMode === 'large'
      ? 'text-base sm:text-lg md:text-xl leading-loose'
      : fontSizeMode === 'compact'
      ? 'text-xs sm:text-sm md:text-base leading-relaxed'
      : 'text-sm sm:text-base md:text-lg leading-loose';

  const renderPassage = () => {
    const parts = (exercise?.passageTemplate || '').split(/(\[[a-z]\])/g);

    return (
      <div
        ref={passageContainerRef}
        className={`${fontClass} text-justify text-slate-800 dark:text-slate-200 bg-blue-50/40 dark:bg-slate-900/60 p-4 sm:p-6 md:p-7 rounded-2xl border-2 border-blue-200/80 dark:border-slate-800 break-words ${
          passageScrollMode === 'scroll'
            ? 'max-h-[380px] sm:max-h-[460px] md:max-h-[500px] overflow-y-auto custom-scrollbar shadow-inner'
            : ''
        }`}
      >
        {parts.map((part, index) => {
          const match = part.match(/\[([a-z])\]/);
          if (match) {
            const label = match[1];
            const gap = gaps.find((g) => g.label === label);
            const userAns = answers[label] || '';
            const isActive = activeBlankLabel === label;

            const gapEval = aiEvaluation?.gapEvaluations?.find((g) => g.label === label);
            const isCorrect = isChecked && (gapEval ? gapEval.isCorrect : (
              gap &&
              userAns.trim().length > 0 &&
              (userAns.trim().toLowerCase() === (gap.correctAnswer || '').toLowerCase().trim() ||
                (gap.acceptableAnswers || []).map((a) => (a || '').toLowerCase().trim()).includes(userAns.trim().toLowerCase()))
            ));

            return (
              <span
                key={index}
                id={`gap-wrapper-${label}`}
                className="inline-flex flex-col items-center mx-1 my-1.5 align-middle"
              >
                <span
                  className={`inline-flex items-center gap-1 p-0.5 rounded-xl transition-all ${
                    isActive ? 'ring-2 ring-blue-500 bg-blue-100/60 dark:bg-blue-950/60' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => scrollToGap(label)}
                    title={`Focus gap (${label})`}
                    className={`text-[11px] sm:text-xs font-black font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200'
                    }`}
                  >
                    ({label})
                  </button>
                  <input
                    id={`gap-input-${label}`}
                    type="text"
                    value={userAns}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    onClick={() => handleBlankClick(label)}
                    onFocus={() => setActiveBlankLabel(label)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, label)}
                    placeholder={`[${label}]`}
                    className={`w-24 sm:w-32 md:w-36 text-center font-semibold text-xs sm:text-sm md:text-base px-2 py-1.5 rounded-xl border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 ${
                      isChecked
                        ? isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                        : isActive
                        ? 'bg-white dark:bg-slate-800 border-blue-500 ring-2 ring-blue-400 font-bold'
                        : selectedWord
                        ? 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/50 cursor-pointer animate-pulse'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-400'
                    }`}
                  />
                  {userAns && !isChecked && (
                    <button
                      type="button"
                      onClick={() => handleInputChange(label, '')}
                      title="Clear this blank"
                      className="text-slate-400 hover:text-rose-500 text-xs px-0.5 cursor-pointer"
                    >
                      ×
                    </button>
                  )}
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
                {isChecked && !isCorrect && gap && (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 max-w-[130px] truncate text-center">
                    Ans: {gap.correctAnswer}
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
      {/* Board Selector */}
      <BoardSelector
        availableBoards={availableBoards}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        bookmarkData={{
          id: `item-1-${exercise.id || selectedBoard}`,
          itemId: 1,
          itemNumber: 1,
          itemTitle: 'Gap Filling with Clues',
          subTitle: `${selectedBoard}: ${exercise.title || 'Gap Filling Activities'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        {/* Title and Instruction Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-1.5">
              <span>Question No. 1</span>
              <span>•</span>
              <span>Marks: 0.5x10 = 05</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              বাক্স থেকে উপযুক্ত শব্দ নিয়ে অথবা প্রয়োজন অনুযায়ী পার্টস অব স্পিচ পরিবর্তন করে শূন্যস্থান পূরণ করুন।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-1-${exercise.id || selectedBoard}`,
              itemId: 1,
              itemNumber: 1,
              itemTitle: 'Gap Filling with Clues',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* Clue Words Box with Sticky Proximity & Usage Tracking */}
        <div
          className={`${
            isStickyClues
              ? 'sticky top-3 sm:top-5 z-20 shadow-lg backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-2 border-blue-400/80 dark:border-blue-700'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-800/40 border-2 border-blue-200 dark:border-blue-900/50'
          } p-3.5 sm:p-5 rounded-2xl mb-4 transition-all duration-300`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                <Move className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Clues Box (ক্লু শব্দসমূহ - Click to Place or Drag):</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                <span>Filled: {filledGapsCount}/10</span>
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {activeBlankLabel && (
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-lg">
                  Target: <span className="font-mono underline font-black">[{activeBlankLabel}]</span>
                </span>
              )}
              {selectedWord && (
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-lg animate-pulse">
                  Selected: "{selectedWord}"
                </span>
              )}

              {/* Pin / Sticky Toggle Button */}
              <button
                type="button"
                onClick={() => setIsStickyClues(!isStickyClues)}
                title={isStickyClues ? 'Unpin Clues Box' : 'Pin Clues Box to top while scrolling'}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isStickyClues
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {isStickyClues ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
                <span>{isStickyClues ? 'Pinned on Top (পিন্ড)' : 'Pin Clues'}</span>
              </button>
            </div>
          </div>

          {/* Clue Words Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {exercise.clues.map((word, idx) => {
              const isSelected = selectedWord === word;
              const wordLower = word.toLowerCase();
              const usedTimes = usedCluesCount[wordLower] || 0;

              return (
                <button
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, word)}
                  onClick={() => handleWordClick(word)}
                  title={
                    activeBlankLabel
                      ? `Click to place "${word}" directly into blank [${activeBlankLabel}]`
                      : `Click to select "${word}"`
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 scale-105 shadow-md'
                      : usedTimes > 0
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-2 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700 hover:border-blue-600'
                  }`}
                >
                  <span>{word}</span>
                  {usedTimes > 0 && (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 font-mono">
                      ✓{usedTimes > 1 ? ` ${usedTimes}` : ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-blue-200/50 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 flex-wrap gap-2">
            <span>
              💡 <strong>টিপস:</strong> প্যাসেজের যেকোনো শূন্যস্থান সিলেক্ট করে উপরের শব্দে ক্লিক করলে সাথে সাথে বসে যাবে।
            </span>
            {selectedWord && (
              <button
                type="button"
                onClick={() => setSelectedWord(null)}
                className="text-xs text-amber-700 dark:text-amber-300 hover:underline font-bold"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>

        {/* Quick Gap Navigator Bar & Scroll View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 mb-4">
          {/* Gap Jump Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" />
              <span>Gaps:</span>
            </span>
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((label) => {
              const hasVal = !!(answers[label] && answers[label].trim().length > 0);
              const isActive = activeBlankLabel === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollToGap(label)}
                  title={`Jump to blank (${label}) ${hasVal ? `- "${answers[label]}"` : '(empty)'}`}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-black transition-all flex items-center justify-center cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-110 shadow-sm'
                      : hasVal
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-blue-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Controls: Scroll Mode, Scroll buttons, Text Size, Audio */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Scroll Mode Toggle */}
            <button
              type="button"
              onClick={() => setPassageScrollMode(passageScrollMode === 'scroll' ? 'full' : 'scroll')}
              title={
                passageScrollMode === 'scroll'
                  ? 'Switch to full expanded passage'
                  : 'Switch to compact scrollable passage box'
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition cursor-pointer"
            >
              <ScrollText className="w-3.5 h-3.5 text-blue-600" />
              <span>{passageScrollMode === 'scroll' ? 'Scroll View (স্ক্রল)' : 'Full View (পূর্ণ)'}</span>
            </button>

            {/* Scroll Up / Down inside passage */}
            {passageScrollMode === 'scroll' && (
              <div className="inline-flex items-center rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-0.5">
                <button
                  type="button"
                  onClick={scrollToTop}
                  title="Scroll to top of passage"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={scrollToBottom}
                  title="Scroll to bottom of passage"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Font Size Adjuster */}
            <div className="inline-flex items-center rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-0.5">
              <button
                type="button"
                onClick={() =>
                  setFontSizeMode(
                    fontSizeMode === 'large'
                      ? 'normal'
                      : fontSizeMode === 'normal'
                      ? 'compact'
                      : 'compact'
                  )
                }
                title="Smaller text"
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-bold px-1.5 text-slate-500 font-mono">
                {fontSizeMode === 'compact' ? 'A-' : fontSizeMode === 'large' ? 'A+' : 'A'}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFontSizeMode(
                    fontSizeMode === 'compact'
                      ? 'normal'
                      : fontSizeMode === 'normal'
                      ? 'large'
                      : 'large'
                  )
                }
                title="Larger text"
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Read Aloud Button */}
            <button
              onClick={() => setShowAudioReader(!showAudioReader)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                showAudioReader
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span>{showAudioReader ? 'Hide Audio' : '🔊 Read Aloud'}</span>
            </button>
          </div>
        </div>

        {/* Highlighted Passage Reader */}
        {showAudioReader && (
          <div className="mb-4">
            <HighlightedPassageReader
              text={cleanSpokenPassage}
              title={`${exercise.title} (Live Read-Out & Highlighting)`}
              banglaTitle="প্যাসেজটি শুনুন: অডিও বাজানোর সময় প্রতিটি শব্দ ও বাক্য লাইভ সোনালী রঙে হাইলাইট হবে।"
              accentColor="blue"
            />
          </div>
        )}

        {/* Passage with Gap Inputs (Scrollable or Full with Close Proximity) */}
        {renderPassage()}

        {/* Full Bangla Meaning - Folding Accordion directly below English Passage */}
        <div className="mt-5 mb-2" id="gap-filling-folding-bangla-container">
          <button
            type="button"
            id="toggle-gap-filling-bangla-folding"
            onClick={() => setIsBanglaFolded((prev) => !prev)}
            className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 border cursor-pointer select-none text-left shadow-xs ${
              !isBanglaFolded
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700/80 text-blue-950 dark:text-blue-200 ring-2 ring-blue-400/30'
                : 'bg-emerald-50/70 hover:bg-emerald-100/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-emerald-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-300'
            }`}
            aria-expanded={!isBanglaFolded}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  !isBanglaFolded
                    ? 'bg-blue-200/80 dark:bg-blue-900/80 text-blue-900 dark:text-blue-200'
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
                        ? 'bg-blue-200/90 dark:bg-blue-900/90 text-blue-950 dark:text-blue-100 border border-blue-300 dark:border-blue-700'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {!isBanglaFolded ? 'খোলা রয়েছে • ক্লিক করে বন্ধ করুন' : 'ক্লিক করে সম্পূর্ণ অর্থ দেখুন (Folded)'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {!isBanglaFolded
                    ? 'বাংলা অনুবাদ লুকাতে পুনরায় এখানে ক্লিক করুন'
                    : 'প্যাসেজের প্রতিটি বাক্য ও শূন্যস্থানের সঠিক প্রয়োগের পূর্ণাঙ্গ বাংলা অনুবাদ দেখতে ক্লিক করুন'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`p-1.5 rounded-full transition-transform duration-200 ${
                  !isBanglaFolded
                    ? 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rotate-180'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Unfolded Bangla Meaning Box */}
          {!isBanglaFolded && (
            <div className="mt-2.5 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-blue-100/30 dark:from-slate-850 dark:via-slate-900 dark:to-blue-950/20 border-2 border-blue-200/90 dark:border-blue-800/60 rounded-2xl shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between gap-3 pb-3 mb-3.5 border-b border-blue-200/70 dark:border-blue-800/40">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <h4 className="font-bold text-xs sm:text-sm text-blue-950 dark:text-blue-300">
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
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-950 dark:text-blue-200 border border-blue-300/80 dark:border-slate-700 transition cursor-pointer shadow-2xs"
                    title="সম্পূর্ণ বাংলা অনুবাদ কপি করুন"
                  >
                    {copiedBangla ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBanglaFolded(true)}
                    className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-xl bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    সংকোচন করুন ✕
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-200 font-sans text-justify break-words bg-white/75 dark:bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-blue-200/50 dark:border-slate-800 shadow-inner">
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
          {/* Main Action Triggers */}
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
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-blue-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-bold text-xs sm:text-sm border border-blue-200 dark:border-blue-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
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
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-blue-50 dark:bg-blue-950/60 px-4 py-2.5 rounded-2xl border border-blue-300 dark:border-blue-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-blue-700 dark:text-blue-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5.0</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-blue-200 dark:bg-blue-900 text-[11px] font-black text-blue-950 dark:text-blue-100">
                  {aiEvaluation.grade}
                </span>
              )}
            </div>
          )}
        </div>

        {/* In-Page Responsive AI / Examiner Feedback Display */}
        {isChecked && aiEvaluation && (
          <div className="mt-8 space-y-6 animate-in fade-in">
            {/* View Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('aiFeedback')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'aiFeedback'
                    ? 'bg-blue-600 text-white shadow-md'
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
                    ? 'bg-blue-600 text-white shadow-md'
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
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 border border-blue-300 dark:border-blue-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-blue-200 dark:border-slate-700">
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
                          বাংলা টিপস ও কৌশল (Gap Filling Strategy):
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
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>Detailed Per-Gap Evaluation Breakdown:</span>
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
                              Gap ({gap.label})
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
                                Correct Answer:
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
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Study Recommendations for Gap Filling:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
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
                  <span>Grammatical Rules Reference (ব্যাখ্যা ও নিয়মাবলী):</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.gaps.map((gap) => (
                    <div
                      key={gap.label}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <span className="font-bold text-blue-600 dark:text-blue-400 mr-1.5">
                        ({gap.label}) {gap.correctAnswer}:
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{gap.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        score={score}
        maxScore={5}
        title={exercise.title}
        provider={aiEvaluation?.provider}
        feedbackText={
          aiEvaluation?.overallFeedback ||
          (score === 5
            ? 'Superb mastery! You answered all 10 gaps correctly with perfect grammar.'
            : score >= 3.5
            ? 'Great job! You have strong command over contextual vocabulary.'
            : 'Keep practicing! Review the grammar rules below for better scores.')
        }
        banglaTips={aiEvaluation?.banglaTips || 'প্রদত্ত ক্লু শব্দগুলোর পার্টস অফ স্পিচ পরিবর্তন (Noun, Verb, Adjective) লক্ষ্য করুন।'}
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
