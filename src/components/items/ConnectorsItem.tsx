import React, { useState, useEffect, useMemo } from 'react';
import { ConnectorsExercise, BoardName } from '../../types';
import { CONNECTORS_DATA } from '../../data/sscData';
import { getConnectorsBanglaMeaning } from '../../data/connectorsBanglaTranslations';
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
  Languages,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react';

interface ConnectorsItemProps {
  onBackToMenu: () => void;
}

interface ConnectorAiEvaluation {
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
    acceptableAnswers?: string[];
    isCorrect: boolean;
    collocation?: string;
    ruleExplanation?: string;
    banglaRule?: string;
    whyIncorrect?: string;
  }>;
  studySuggestions?: string[];
  aiPowered?: boolean;
}

export const ConnectorsItem: React.FC<ConnectorsItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    CONNECTORS_DATA[0]?.board || 'Model Question 1'
  );
  const [exercise, setExercise] = useState<ConnectorsExercise>(CONNECTORS_DATA[0]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [aiEvaluation, setAiEvaluation] = useState<ConnectorAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [showAudioReader, setShowAudioReader] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'rules'>('aiFeedback');
  const [isBanglaFolded, setIsBanglaFolded] = useState<boolean>(true);
  const [copiedBangla, setCopiedBangla] = useState<boolean>(false);

  // Full Bangla meaning for the current exercise
  const banglaMeaningText = useMemo(() => {
    if (!exercise) return '';
    return getConnectorsBanglaMeaning(exercise);
  }, [exercise]);

  // Spoken text with filled or model connectors
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
      (CONNECTORS_DATA || []).find((e) => e.board === selectedBoard) || CONNECTORS_DATA[0];
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
    const evals: ConnectorAiEvaluation['gapEvaluations'] = [];

    items.forEach((item) => {
      const userAns = (answers[item.label] || '').trim().toLowerCase();
      const correct = (item.correctAnswer || '').toLowerCase().trim();
      const acceptable = (item.acceptableAnswers || []).map((a) => (a || '').toLowerCase().trim());
      const isMatch = userAns.length > 0 && (userAns === correct || acceptable.includes(userAns));

      if (isMatch) {
        currentScore += 1;
      }

      const ruleText = item.explanation || (item as any).ruleExplanation || `Appropriate linker is "${item.correctAnswer}".`;

      evals.push({
        label: item.label,
        studentAnswer: answers[item.label] || '(blank)',
        correctAnswer: item.correctAnswer,
        acceptableAnswers: item.acceptableAnswers,
        isCorrect: isMatch,
        collocation: `Connector (${item.label})`,
        ruleExplanation: ruleText,
        banglaRule: 'ক্লজ বা বাক্যের মধ্যকার অর্থসঙ্গতি, কারণ, ফলাফল ও বৈপরীত্য অনুযায়ী সংযোগকারী শব্দ।',
        whyIncorrect: isMatch
          ? ''
          : userAns.length === 0
          ? 'Gap left empty.'
          : `Connector "${userAns}" does not match logical transition. Expected: "${item.correctAnswer}".`,
      });
    });

    // SSC Item 7/8 (Sentence Connectors): 1x5 = 5 marks
    setScore(currentScore);

    setAiEvaluation({
      totalScore: currentScore,
      maxScore: 5,
      percentage: Math.round((currentScore / 5) * 100),
      grade: currentScore === 5 ? 'A+' : currentScore >= 4 ? 'A' : currentScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Rule Engine (বোর্ড উত্তরমালা)',
      overallFeedback:
        currentScore === 5
          ? 'Exceptional logical cohesion! All sentence connectors and linking words accurately placed.'
          : currentScore >= 3
          ? `Well done (${currentScore}/5)! Good grasp of transitions. Check the incorrect connectors below.`
          : `Keep practicing (${currentScore}/5). Review cause-and-effect linkers (so, therefore, as a result) and contrast linkers (but, however, on the contrary).`,
      banglaTips:
        'আগের বাক্য ও পরের বাক্যের মধ্যে কারণ-ফলাফল (So/Therefore), বৈপরীত্য (However/On the other hand) নাকি ক্রম (Firstly/Moreover) আছে তা বুঝুন।',
      gapEvaluations: evals,
      studySuggestions: [
        'Contrast connectors: but, however, on the other hand, nevertheless, though.',
        'Addition connectors: moreover, furthermore, in addition, besides, also.',
        'Result/Consequence: therefore, so, as a result, consequently, thus.',
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
          itemNumber: 7,
          itemTitle: 'Sentence Connectors',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            passageTemplate: exercise.passageTemplate,
          },
          items: (exercise.items || []).map((item) => ({
            label: item.label,
            correctAnswer: item.correctAnswer,
            acceptableAnswers: item.acceptableAnswers,
            ruleExplanation: item.explanation || (item as any).ruleExplanation,
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
      console.warn('AI connectors error, falling back to manual check:', err);
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
  };

  const availableBoards = CONNECTORS_DATA.map((e) => e.board);
  const items = exercise?.items || [];

  const renderPassage = () => {
    const parts = (exercise?.passageTemplate || '').split(/(\[[a-z]\])/g);

    return (
      <div className="text-sm sm:text-base md:text-lg leading-loose text-justify text-slate-800 dark:text-slate-200 bg-indigo-50/40 dark:bg-slate-900/60 p-4 sm:p-6 md:p-7 rounded-2xl border border-indigo-200/60 dark:border-slate-800 break-words">
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

            return (
              <span key={index} className="inline-flex flex-col items-center mx-1 my-1 align-middle">
                <span className="inline-flex items-center gap-1">
                  <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 font-mono">
                    ({label})
                  </span>
                  <input
                    type="text"
                    value={userAns}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    placeholder={`[${label}]`}
                    className={`w-28 sm:w-36 md:w-40 text-center font-semibold text-xs sm:text-sm md:text-base px-2 py-1 rounded-xl border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 ${
                      isChecked
                        ? isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-400'
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
          id: `item-8-${exercise.id || selectedBoard}`,
          itemId: 8,
          itemNumber: 8,
          itemTitle: 'Sentence Connectors',
          subTitle: `${selectedBoard}: ${exercise.title || 'Sentence Connectors'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 mb-1.5">
              <span>Question No. 7</span>
              <span>•</span>
              <span>Marks: 1x5 = 05</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              প্রদত্ত অনুচ্ছেদের বাক্যগুলোর অর্থসঙ্গতি বজায় রেখে উপযুক্ত সংযোগকারী শব্দ (Connectors / Linking Words) বসান।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-8-${exercise.id || selectedBoard}`,
              itemId: 8,
              itemNumber: 8,
              itemTitle: 'Sentence Connectors',
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
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100'
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
              accentColor="indigo"
            />
          </div>
        )}

        {/* Passage with Gap Inputs */}
        {renderPassage()}

        {/* Full Bangla Meaning - Folding Accordion directly below Passage */}
        <div className="mt-4 sm:mt-5" id="connectors-folding-bangla-container">
          <button
            type="button"
            id="toggle-connectors-bangla-folding"
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
                    : 'প্যাসেজের প্রতিটি বাক্যের অর্থ ও সংযোগকারী শব্দের সঠিক প্রয়োগ বাংলায় দেখতে ক্লিক করুন'}
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
                    অনুচ্ছেদের পূর্ণাঙ্গ সরলার্থ ও সঠিক সংযোগকারী শব্দ (Connectors)
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
                    className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline px-1.5 py-0.5 cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>

              <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed sm:leading-loose font-normal text-justify">
                {banglaMeaningText.split(/(\[[a-e]:\s*[^\]]+\])/g).map((chunk, idx) => {
                  if (chunk.startsWith('[') && chunk.endsWith(']')) {
                    return (
                      <span
                        key={idx}
                        className="inline-block mx-1 my-0.5 px-2 py-0.5 rounded-lg font-bold text-xs sm:text-sm bg-amber-200/90 dark:bg-amber-900/90 text-amber-950 dark:text-amber-100 border border-amber-300 dark:border-amber-700 shadow-2xs"
                      >
                        {chunk}
                      </span>
                    );
                  }
                  return <span key={idx}>{chunk}</span>;
                })}
              </div>

              <div className="mt-3 pt-2.5 border-t border-amber-200/60 dark:border-amber-800/30 flex items-center justify-between text-[11px] sm:text-xs text-amber-900/80 dark:text-amber-300/80 flex-wrap gap-2">
                <span>💡 লক্ষ্য করুন: ব্র্যাকেটের ভেতরের অংশে সঠিক Connector এবং তার বাংলা অর্থ দেখানো হয়েছে।</span>
                <span className="font-semibold">{selectedBoard}</span>
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
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-indigo-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-bold text-xs sm:text-sm border border-indigo-200 dark:border-indigo-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
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
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2.5 rounded-2xl border border-indigo-300 dark:border-indigo-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-indigo-700 dark:text-indigo-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-indigo-200 dark:bg-indigo-900 text-[11px] font-black text-indigo-950 dark:text-indigo-100">
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
                    ? 'bg-indigo-600 text-white shadow-md'
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
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Connectors Rules Reference</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-teal-500/10 border border-indigo-300 dark:border-indigo-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-indigo-200 dark:border-slate-700">
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
                          বাংলা টিপস ও কৌশল (Sentence Connectors Strategy):
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
                      <MessageSquare className="w-4 h-4 text-indigo-600" />
                      <span>Detailed Sentence Connector Breakdown:</span>
                    </h5>
                    <span className="text-xs font-bold text-slate-500">5 Connectors (1 x 5 = 5 Marks)</span>
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
                                <span>+1.0 Mark</span>
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
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
                                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                  Model Linker:
                                </span>
                                <span className="font-bold font-mono bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 px-2 py-0.5 rounded">
                                  {gap.correctAnswer}
                                </span>
                              </div>
                              {gap.acceptableAnswers && gap.acceptableAnswers.length > 1 && (
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                                  <span>Also accepted:</span>
                                  <span className="font-mono text-slate-700 dark:text-slate-300">
                                    {gap.acceptableAnswers.filter((a) => a.toLowerCase() !== gap.correctAnswer.toLowerCase()).join(', ')}
                                  </span>
                                </div>
                              )}
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
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Study Recommendations for Connectors:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
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
                  <span>Connector Rules Reference (সংযোগকারী শব্দের নিয়মাবলী):</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {exercise.items.map((item) => (
                    <div
                      key={item.label}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <div>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1.5">
                          ({item.label}) {item.correctAnswer}:
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">{item.explanation || (item as any).ruleExplanation}</span>
                      </div>
                      {item.acceptableAnswers && item.acceptableAnswers.length > 1 && (
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          Other options: {item.acceptableAnswers.filter((a) => a.toLowerCase() !== item.correctAnswer.toLowerCase()).join(', ')}
                        </div>
                      )}
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
            ? 'Exceptional logical cohesion! All sentence connectors accurately placed.'
            : score >= 3
            ? 'Good work! You have strong understanding of linking words.'
            : 'Keep practicing! Review connectors showing result, contrast, and continuity.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          'বাক্যসমূহের মধ্যকার অর্থসঙ্গতি (কারণ, ফলাফল, বৈপরীত্য, ক্রম) লক্ষ্য করে সঠিক Connector বসান।'
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};
