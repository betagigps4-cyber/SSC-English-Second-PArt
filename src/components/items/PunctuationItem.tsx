import React, { useState, useEffect, useMemo } from 'react';
import { PunctuationExercise, BoardName } from '../../types';
import { PUNCTUATION_DATA } from '../../data/sscData';
import { getPunctuationBanglaMeaning } from '../../data/punctuationBanglaTranslations';
import { BoardSelector } from '../BoardSelector';
import { CelebrationModal } from '../CelebrationModal';
import { HighlightedPassageReader } from '../HighlightedPassageReader';
import { BookmarkButton } from '../BookmarkButton';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Bot,
  Lightbulb,
  Loader2,
  Copy,
  Volume2,
  Eye,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Languages,
  ChevronDown,
  Check,
} from 'lucide-react';

interface PunctuationItemProps {
  onBackToMenu: () => void;
}

interface PunctuationAiEvaluation {
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

export const PunctuationItem: React.FC<PunctuationItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    PUNCTUATION_DATA[0]?.board || 'Model Question 1'
  );
  const [exercise, setExercise] = useState<PunctuationExercise>(PUNCTUATION_DATA[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [isAiChecking, setIsAiChecking] = useState<boolean>(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [aiEvaluation, setAiEvaluation] = useState<PunctuationAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showAudioReader, setShowAudioReader] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');
  const [isBanglaFolded, setIsBanglaFolded] = useState<boolean>(true);
  const [copiedBangla, setCopiedBangla] = useState<boolean>(false);

  const banglaMeaningText = useMemo(() => {
    return getPunctuationBanglaMeaning(exercise);
  }, [exercise]);

  useEffect(() => {
    const found =
      (PUNCTUATION_DATA || []).find((e) => e.board === selectedBoard) || PUNCTUATION_DATA[0];
    setExercise(found);
    handleReset();
    setIsBanglaFolded(true);
  }, [selectedBoard]);

  const handleCopyUnpunctuated = () => {
    setUserInput(exercise.unpunctuatedPassage);
  };

  const handleShowModelPassage = () => {
    setUserInput(exercise.correctPassage);
    setIsChecked(true);
    setScore(5);
  };

  // Instant Manual Quick Check
  const handleQuickCheck = () => {
    const student = userInput.trim();
    const correctTokens = exercise.correctPassage.split(/\s+/);
    const userTokens = student.split(/\s+/);
    let tokenMatches = 0;
    userTokens.forEach((ut) => {
      if (correctTokens.includes(ut)) {
        tokenMatches += 1;
      }
    });

    const accuracyRatio = correctTokens.length > 0 ? tokenMatches / correctTokens.length : 0;
    let currentScore = Math.round(accuracyRatio * 5 * 10) / 10;
    if (currentScore > 5) currentScore = 5;

    const evals: PunctuationAiEvaluation['gapEvaluations'] = (
      exercise.keyPunctuationPoints || []
    ).map((kp: any, idx) => {
      const pointStr = typeof kp === 'string' ? kp : `${kp.text || ''} (${kp.type || 'Rule'})`;
      const ruleDetail = typeof kp === 'string' ? kp : kp.explanation || kp.text || '';
      // Check if student text contains punctuation fragments or applied rule
      const hasPoint =
        student.length > 0 &&
        (typeof kp === 'string'
          ? student.length >= exercise.correctPassage.length * 0.4
          : student.includes(kp.text) || student.toLowerCase().includes((kp.text || '').toLowerCase().replace(/["'.,?!]/g, '')));

      return {
        label: `Point #${idx + 1}`,
        studentAnswer: hasPoint ? 'Applied in passage' : 'Missing or incomplete',
        correctAnswer: typeof kp === 'string' ? kp : kp.text || '',
        isCorrect: hasPoint,
        collocation: typeof kp === 'string' ? `Point #${idx + 1}` : `Type: ${kp.type || 'Punctuation'}`,
        ruleExplanation: ruleDetail,
        banglaRule: 'উক্তি, ক্যাপিটালাইজেশন বা বিরতি অনুযায়ী সঠিক বিরামচিহ্ন।',
        whyIncorrect: hasPoint
          ? ''
          : `Make sure to apply the punctuation rule: "${pointStr}".`,
      };
    });

    setScore(currentScore);

    setAiEvaluation({
      totalScore: currentScore,
      maxScore: 5,
      percentage: Math.round((currentScore / 5) * 100),
      grade: currentScore >= 4.5 ? 'A+' : currentScore >= 4 ? 'A' : currentScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        currentScore >= 4.5
          ? 'Superb capitalization, inverted commas, and punctuation placements!'
          : currentScore >= 3
          ? `Good effort (${currentScore}/5.0)! Pay close attention to direct speech quotation marks and proper nouns.`
          : `Keep practicing (${currentScore}/5.0). Review quotation marks for direct speech and capitalization of proper nouns.`,
      banglaTips:
        'Direct Speech বা উক্তি শুরু হলে Inverted Comma ("...") এবং প্রথম অক্ষর Capitalize করতে হবে।',
      gapEvaluations: evals,
      studySuggestions: [
        'Capitalize the first letter of every new sentence and proper noun (names, places).',
        'Enclose exact spoken words within double quotation marks ("...").',
        'Use commas before or after reporting verbs (e.g. He said, "...").',
        'Place question marks or exclamation marks INSIDE quotation marks if they belong to speech.',
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
          itemNumber: 9,
          itemTitle: 'Punctuation and Capitalisation',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            unpunctuatedPassage: exercise.unpunctuatedPassage,
            correctPassage: exercise.correctPassage,
            keyPoints: exercise.keyPunctuationPoints,
          },
          items: (exercise.keyPunctuationPoints || []).map((kp, idx) => ({
            label: `Point #${idx + 1}`,
            correctAnswer: kp.text,
            ruleExplanation: `${kp.type} - ${kp.explanation}`,
          })),
          userAnswers: { studentPassage: userInput },
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
      console.warn('AI punctuation error, falling back to manual check:', err);
      handleQuickCheck();
    } finally {
      setIsAiChecking(false);
      setIsChecked(true);
      setShowCelebration(true);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setIsChecked(false);
    setIsAiChecking(false);
    setAiEvaluation(null);
    setShowCelebration(false);
    setScore(0);
    setActiveTab('aiFeedback');
  };

  const availableBoards = PUNCTUATION_DATA.map((e) => e.board);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <BoardSelector
        availableBoards={availableBoards}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        bookmarkData={{
          id: `item-9-${exercise.id || selectedBoard}`,
          itemId: 9,
          itemNumber: 9,
          itemTitle: 'Punctuation and Capitalisation',
          subTitle: `${selectedBoard}: ${exercise.title || 'Punctuation Practice'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mb-1.5">
              <span>Question No. 9</span>
              <span>•</span>
              <span>Marks: 0.5x10 = 05</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              প্রদত্ত অনুচ্ছেদে যেখানে যেখানে বিরামচিহ্ন (Punctuation) এবং বড় হাতের অক্ষর (Capital Letters) প্রয়োজন, সেখানে যথাযথভাবে প্রয়োগ করুন।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-9-${exercise.id || selectedBoard}`,
              itemId: 9,
              itemNumber: 9,
              itemTitle: 'Punctuation and Capitalisation',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* Read-Aloud Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Unpunctuated Given Passage:
          </span>
          <button
            onClick={() => setShowAudioReader(!showAudioReader)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
              showAudioReader
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 hover:bg-amber-100'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>
              {showAudioReader
                ? 'Hide Read-Out (প্যাসেজ লুকান)'
                : '🔊 Listen to Correct Flow (সঠিক পাঠ শুনুন)'}
            </span>
          </button>
        </div>

        {/* Live Highlighted Passage Reader */}
        {showAudioReader && (
          <div className="mb-6">
            <HighlightedPassageReader
              text={exercise.correctPassage}
              title={`${exercise.title} (Punctuation & Direct Dialogue Audio)`}
              banglaTitle="সঠিক অনুচ্ছেদটি শুনুন: প্রতিটি বিরামচিহ্ন ও বক্তব্যের সুর স্পষ্ট উচ্চারণে শুনুন।"
              accentColor="amber"
            />
          </div>
        )}

        {/* Unpunctuated Source Text with Quick Copy Button */}
        <div className="relative mb-4">
          <div className="text-xs sm:text-sm md:text-base leading-relaxed text-justify text-slate-800 dark:text-slate-200 bg-amber-50/40 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-amber-200/60 dark:border-slate-800 font-mono select-all break-words">
            {exercise.unpunctuatedPassage}
          </div>
          <button
            onClick={handleCopyUnpunctuated}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-amber-50 shadow-sm transition cursor-pointer"
            title="ইনপুট বক্সে কপি করুন"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy to Editor</span>
          </button>
        </div>

        {/* Full Bangla Meaning - Folding Accordion directly below English Passage */}
        <div className="mb-6" id="punctuation-folding-bangla-container">
          <button
            type="button"
            id="toggle-punctuation-bangla-folding"
            onClick={() => setIsBanglaFolded((prev) => !prev)}
            className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 border cursor-pointer select-none text-left shadow-xs ${
              !isBanglaFolded
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 ring-2 ring-amber-400/30'
                : 'bg-emerald-50/70 hover:bg-emerald-100/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-emerald-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-300'
            }`}
            aria-expanded={!isBanglaFolded}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  !isBanglaFolded
                    ? 'bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200'
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
                        ? 'bg-amber-200/90 dark:bg-amber-900/90 text-amber-950 dark:text-amber-100 border border-amber-300 dark:border-amber-700'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {!isBanglaFolded ? 'খোলা রয়েছে • ক্লিক করে বন্ধ করুন' : 'ক্লিক করে সম্পূর্ণ অর্থ দেখুন (Folded)'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {!isBanglaFolded
                    ? 'বাংলা অনুবাদ লুকাতে পুনরায় এখানে ক্লিক করুন'
                    : 'প্যাসেজের প্রতিটি সংলাপ ও বাক্যের পূর্ণাঙ্গ বাংলা অনুবাদ দেখতে ক্লিক করুন'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`p-1.5 rounded-full transition-transform duration-200 ${
                  !isBanglaFolded
                    ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 rotate-180'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Unfolded Bangla Meaning Box */}
          {!isBanglaFolded && (
            <div className="mt-2.5 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-100/30 dark:from-slate-850 dark:via-slate-900 dark:to-amber-950/20 border-2 border-amber-200/90 dark:border-amber-800/60 rounded-2xl shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between gap-3 pb-3 mb-3.5 border-b border-amber-200/70 dark:border-amber-800/40">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <h4 className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-300">
                    প্যাসেজের নির্ভুল বঙ্গানুবাদ ও কথোপকথনের ভাবার্থ
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
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-200 border border-amber-300/80 dark:border-slate-700 transition cursor-pointer shadow-2xs"
                    title="সম্পূর্ণ বাংলা অনুবাদ কপি করুন"
                  >
                    {copiedBangla ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBanglaFolded(true)}
                    className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    সংকোচন করুন ✕
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-200 font-sans text-justify break-words bg-white/75 dark:bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-amber-200/50 dark:border-slate-800 shadow-inner">
                {banglaMeaningText || (
                  <span className="italic text-slate-500">
                    এই অনুচ্ছেদের পূর্ণাঙ্গ বাংলা অর্থ প্রস্তুত রয়েছে।
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input Textarea */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Your Corrected Passage (আপনার সমাধান লিখুন):
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={5}
            placeholder="টাইপ করুন বা উপরের 'Copy to Editor' বাটনে ক্লিক করে বিরামচিহ্ন ও ক্যাপিটালাইজেশন সংশোধন করুন..."
            className="w-full text-xs sm:text-sm md:text-base leading-relaxed p-3.5 sm:p-4 rounded-2xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-400 font-sans transition-all duration-200 shadow-inner focus:outline-none"
          />
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
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-200 dark:border-amber-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Quick Check (ম্যানুয়াল যাচাই)</span>
            </button>

            <button
              onClick={handleShowModelPassage}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Show Model Answer</span>
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
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-amber-50 dark:bg-amber-950/60 px-4 py-2.5 rounded-2xl border border-amber-300 dark:border-amber-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5.0</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-amber-200 dark:bg-amber-900 text-[11px] font-black text-amber-950 dark:text-amber-100">
                  {aiEvaluation.grade}
                </span>
              )}
            </div>
          )}
        </div>

        {/* In-Page Responsive AI & Examiner Feedback Display */}
        {isChecked && (
          <div className="mt-8 space-y-6 animate-in fade-in">
            {/* View Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('aiFeedback')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'aiFeedback'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>AI Assessment & Punctuation Points</span>
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'rules'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Model Answer & Rule Explanations</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && aiEvaluation && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 border border-amber-300 dark:border-amber-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-amber-700 dark:text-amber-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-slate-700">
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
                          বাংলা টিপস ও কৌশল (Punctuation Strategy):
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                          {aiEvaluation.banglaTips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Punctuation Points Review */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <span>Key Punctuation & Capitalization Points Checked:</span>
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            {gap.label} ({gap.collocation})
                          </span>
                          {gap.isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Applied</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Needs Attention</span>
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs sm:text-sm mb-2 break-words">
                          <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                            <strong>Correct Formulation: </strong>
                            <span className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                              {gap.correctAnswer}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {gap.ruleExplanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {aiEvaluation.studySuggestions && aiEvaluation.studySuggestions.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Study Recommendations for Punctuation:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
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
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Model Corrected Passage (আদর্শ সমাধান):</span>
                </h4>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-sans text-slate-800 dark:text-slate-200 select-all">
                  {exercise.correctPassage}
                </div>

                <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm pt-2">
                  Key Punctuation Breakdown:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.keyPunctuationPoints.map((point: any, index: number) => {
                    const isStr = typeof point === 'string';
                    return (
                      <div
                        key={index}
                        className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      >
                        <span className="font-bold text-amber-600 dark:text-amber-400 mr-1.5">
                          {isStr ? `Point #${index + 1}:` : `${point.text} (${point.type}):`}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {isStr ? point : point.explanation}
                        </span>
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
          (score >= 4.5
            ? 'Superb punctuation placements, direct speech quotation marks, and capitalization!'
            : score >= 3
            ? 'Good effort! Pay close attention to quotation marks in direct speech.'
            : 'Review quotation marks for direct speech and proper noun capitalization.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          'উক্তি শুরু হলে Inverted Comma ("...") এবং প্রথম অক্ষর Capitalize করতে হবে।'
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
