import React, { useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, Volume2, X, CheckCircle2, Award, Bot, Lightbulb } from 'lucide-react';
import { triggerGrandCelebration } from '../utils/celebrationUtils';
import { speechService } from '../utils/speechUtils';

interface CelebrationModalProps {
  isOpen: boolean;
  score: number;
  maxScore: number;
  title: string;
  feedbackText?: string;
  banglaTips?: string;
  provider?: string;
  onClose: () => void;
  onRetry: () => void;
  onNext?: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  score,
  maxScore,
  title,
  feedbackText,
  banglaTips,
  provider,
  onClose,
  onRetry,
  onNext,
}) => {
  useEffect(() => {
    if (isOpen) {
      triggerGrandCelebration();
      speechService.speakScore(score, maxScore, feedbackText);
    }
  }, [isOpen, score, maxScore, feedbackText]);

  if (!isOpen) return null;

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const isPerfect = percentage === 100;
  const isGood = percentage >= 70;
  const isAverage = percentage >= 50;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Festive floating banners on top */}
      <div className="fixed top-0 inset-x-0 flex justify-around pointer-events-none overflow-hidden h-16 sm:h-24 z-10">
        <div className="animate-bounce duration-1000 text-2xl sm:text-3xl">🎉</div>
        <div className="animate-pulse duration-700 text-2xl sm:text-3xl">🎊</div>
        <div className="animate-bounce duration-1000 delay-150 text-2xl sm:text-3xl hidden sm:block">🌸</div>
        <div className="animate-pulse duration-700 text-2xl sm:text-3xl">✨</div>
        <div className="animate-bounce duration-1000 delay-300 text-2xl sm:text-3xl hidden sm:block">💐</div>
        <div className="animate-pulse duration-700 text-2xl sm:text-3xl">🎈</div>
      </div>

      <div className="relative w-full max-w-lg my-auto bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-7 md:p-8 border-2 border-amber-400/90 shadow-2xl overflow-hidden text-center max-h-[92vh] flex flex-col">
        {/* Glowing atmospheric gradient backdrops */}
        <div className="absolute -top-20 -right-20 w-40 sm:w-48 h-40 sm:h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 sm:w-48 h-40 sm:h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer z-20"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable body content for small phones */}
        <div className="overflow-y-auto pr-1 -mr-1 custom-scrollbar space-y-4">
          {/* Festoon Ribbon Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 shadow-md animate-pulse mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isPerfect
                ? '🌟 Grand Perfection Result (পূর্ণমান) 🌟'
                : isGood
                ? '🎉 Excellent Performance (দারুণ ফলাফল) 🎉'
                : isAverage
                ? '👍 Good Effort (ভালো অগ্রগতি) 👍'
                : '💪 Keep Practicing (আরও অনুশীলন প্রয়োজন) 💪'}
            </span>
          </div>

          {/* Trophy & Floral Wreath */}
          <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 blur-md opacity-70 animate-spin duration-3000" />
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center shadow-inner">
              <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 animate-bounce" />
            </div>
          </div>

          {/* Congratulation Headline */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              {isPerfect
                ? 'অসাধারণ ও শতভাগ নির্ভুল!'
                : isGood
                ? 'দারুণ সাফল্য! অভিনন্দন!'
                : isAverage
                ? 'প্রশংসনীয় প্রচেষ্টা!'
                : 'মনোযোগ দিয়ে আবার চেষ্টা করো!'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1 px-2 line-clamp-2">
              {title}
            </p>
          </div>

          {/* Responsive Big Score Box */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 shadow-inner text-left">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center items-center">
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold block truncate">
                  Score (প্রাপ্ত নম্বর)
                </span>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-emerald-400 mt-0.5">
                  {score} <span className="text-xs sm:text-sm text-slate-400 font-sans">/ {maxScore}</span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold block truncate">
                  Accuracy (সঠিকতা)
                </span>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-amber-400 mt-0.5">
                  {percentage}%
                </div>
              </div>
            </div>

            {/* Provider Tag if AI generated */}
            {provider && (
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-emerald-300/90 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                <span className="flex items-center gap-1 font-semibold">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Evaluated with {provider}</span>
                </span>
                <span className="text-[10px] bg-emerald-900/80 px-1.5 py-0.5 rounded text-emerald-200">
                  Verified
                </span>
              </div>
            )}

            {/* Personalized Feedback */}
            {feedbackText && (
              <div className="mt-3 pt-2.5 border-t border-slate-700/60">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{feedbackText}"
                </p>
              </div>
            )}

            {/* Bangla Tips Box */}
            {banglaTips && (
              <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-[13px] text-amber-200 leading-relaxed">
                  <strong className="text-amber-300">টিপস:</strong> {banglaTips}
                </p>
              </div>
            )}
          </div>

          {/* Spoken Voice Replay Button */}
          <div className="flex justify-center">
            <button
              onClick={() => speechService.speakScore(score, maxScore, feedbackText)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">স্কোর পুনরাবৃত্তি শুনুন (Read out)</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 justify-center pt-2">
            <button
              onClick={onRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>আবার চেষ্টা করুন (Try Again)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/40 transition active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>সম্পূর্ণ হয়েছে (Done)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
