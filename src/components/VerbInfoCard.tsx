import React, { useState } from 'react';
import { Volume2, X, Check, Copy, Sparkles, BookOpen, Layers } from 'lucide-react';
import { getVerbDetail, VerbDetail } from '../data/verbDictionary';

interface VerbInfoCardProps {
  verb: string;
  onClose: () => void;
  onSelectForGap?: (verb: string) => void;
}

export const VerbInfoCard: React.FC<VerbInfoCardProps> = ({
  verb,
  onClose,
  onSelectForGap,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const detail: VerbDetail = getVerbDetail(verb);

  const handleSpeak = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const text = `Verb: ${detail.v1} (${detail.pronunciationBn})\nMeaning: ${detail.meaningBn}\nPast (V2): ${detail.v2} (${detail.v2Bn || ''})\nPast Participle (V3): ${detail.v3} (${detail.v3Bn || ''})\nExample: ${detail.exampleSentence || ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-2xl border-2 border-amber-400/80 dark:border-amber-600/60 p-4 sm:p-5 shadow-xl transition-all duration-300 mt-3 animate-in fade-in slide-in-from-top-2">
      {/* Header Bar */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-amber-200/80 dark:border-slate-700/80">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-base sm:text-lg font-black tracking-wide shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-slate-950" />
            {detail.v1}
          </span>

          <button
            type="button"
            onClick={() => handleSpeak(detail.v1)}
            title="Listen English Pronunciation"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>🔊 শুনুন</span>
          </button>

          {detail.ipa && (
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              {detail.ipa}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy verb details"
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            title="দ্বিতীয় ক্লিকে বন্ধ হবে বা এখানে ক্লিক করুন (Close)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Pronunciation & Meaning Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
        {/* বাংলা উচ্চারণ */}
        <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-amber-200/60 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
              বাংলা উচ্চারণ:
            </span>
            <span className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300">
              {detail.pronunciationBn}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSpeak(detail.v1)}
            className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/60 dark:hover:bg-amber-800 text-amber-800 dark:text-amber-200 transition-colors"
            title="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* বাংলা অর্থ */}
        <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-amber-200/60 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
            বাংলা অর্থ:
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
            {detail.meaningBn}
          </span>
        </div>
      </div>

      {/* Verb Forms (V1, V2, V3, V-ing) Grid */}
      <div className="mb-3">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>ক্রিয়াপদের বিভিন্ন রূপ (Principal Verb Forms):</span>
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1.5">
          {/* Present Form (V1) */}
          <div className="bg-amber-100/50 dark:bg-slate-800/90 p-2.5 rounded-xl border border-amber-300/60 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase block">
              Present (V1)
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white block mt-0.5">
              {detail.v1}
            </span>
            {detail.vS && (
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                s/es: {detail.vS}
              </span>
            )}
          </div>

          {/* Past Form (V2) */}
          <div className="bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase block">
              Past (V2)
            </span>
            <span className="text-sm sm:text-base font-black text-blue-950 dark:text-blue-100 block mt-0.5">
              {detail.v2}
            </span>
            {detail.v2Bn && (
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block">
                ({detail.v2Bn})
              </span>
            )}
          </div>

          {/* Past Participle (V3) */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-center">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block">
              Past Participle (V3)
            </span>
            <span className="text-sm sm:text-base font-black text-emerald-950 dark:text-emerald-100 block mt-0.5">
              {detail.v3}
            </span>
            {detail.v3Bn && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">
                ({detail.v3Bn})
              </span>
            )}
          </div>

          {/* Present Participle (V-ing) */}
          <div className="bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-xl border border-purple-200 dark:border-purple-800/50 text-center">
            <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase block">
              Continuous / V-ing
            </span>
            <span className="text-sm sm:text-base font-black text-purple-950 dark:text-purple-100 block mt-0.5">
              {detail.vIng || `${detail.v1}ing`}
            </span>
            <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 block">
              (Gerund / Participle)
            </span>
          </div>
        </div>
      </div>

      {/* Example Sentence */}
      {detail.exampleSentence && (
        <div className="bg-amber-50/60 dark:bg-slate-800/60 p-2.5 sm:p-3 rounded-xl border border-amber-200/50 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 dark:text-amber-300">উদাহরণ বাক্য: </span>
            <span className="italic">"{detail.exampleSentence}"</span>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-amber-200/50 dark:border-slate-700/50">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          💡 পুনরায় এই verb-এ ক্লিক করলে বা ✕ চাপলে এটি vanish হবে।
        </span>

        {onSelectForGap && (
          <button
            type="button"
            onClick={() => onSelectForGap(detail.v1)}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            গ্যাপে বসাতে নির্বাচন করুন
          </button>
        )}
      </div>
    </div>
  );
};
