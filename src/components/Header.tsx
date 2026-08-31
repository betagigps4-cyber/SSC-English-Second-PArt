import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, GraduationCap, Award, Bot, Eye, EyeOff, Bookmark } from 'lucide-react';
import { getBookmarks, subscribeToBookmarks } from '../utils/bookmarkUtils';

interface HeaderProps {
  onGoHome?: () => void;
  activeItemTitle?: string | null;
  isAiTutorVisible?: boolean;
  onToggleAiTutorVisibility?: () => void;
  onOpenAiTutorTab?: (tab: 'chat' | 'lookup') => void;
  onOpenCheatSheet?: () => void;
  onOpenSavedExercises?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  activeItemTitle,
  isAiTutorVisible = true,
  onToggleAiTutorVisibility,
  onOpenAiTutorTab,
  onOpenCheatSheet,
  onOpenSavedExercises,
}) => {
  const [imgError, setImgError] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(() => getBookmarks().length);

  useEffect(() => {
    setBookmarkCount(getBookmarks().length);
    const unsubscribe = subscribeToBookmarks((bookmarks) => {
      setBookmarkCount(bookmarks.length);
    });
    return () => unsubscribe();
  }, []);


  const primaryImage = 'https://i.ibb.co.com/Lz1qrSv4/My-Passport-Photo.png';
  const fallbackImage = 'https://i.imgur.com/akJtZZb.jpeg';

  return (
    <header className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white shadow-xl relative overflow-hidden border-b-4 border-amber-400">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Sacred Bismillah Banner */}
      <div className="bg-emerald-950/80 backdrop-blur-sm border-b border-emerald-700/50 py-2.5 px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-1 max-w-4xl mx-auto">
          <p
            dir="rtl"
            className="text-xl md:text-2xl font-serif tracking-wide text-amber-300 drop-shadow-sm font-semibold select-none"
            style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', 'Amiri', serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-xs md:text-sm text-emerald-200 font-medium tracking-wide">
            বিসমিল্লাহির রাহমানির রাহিম
          </p>
        </div>
      </div>

      {/* Main Branding, Profile and AI Tutor Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Left: Author Profile Photo & Mini Badge */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={onGoHome}>
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-300 shadow-xl ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={imgError ? fallbackImage : primaryImage}
                  alt="Md. Ismail Hossain"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top rounded-full bg-slate-800"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 rounded-full p-1 shadow-md border-2 border-white">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/40 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>British Council Master Trainer Designed</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Md. Ismail Hossain
                <span className="text-xs font-normal text-emerald-200 hidden sm:inline">
                  (M.A., B.A. Hons, B.Ed.)
                </span>
              </h2>
              <p className="text-xs text-emerald-100/90 leading-relaxed max-w-sm">
                Assistant Teacher, Uttar Deshanterkathi GPS, Betagi, Barguna
              </p>
            </div>
          </div>

          {/* Center/Right: App Title & Subtitle + AI Tutor Quick Toggles */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-3">
            <button
              onClick={onGoHome}
              className="text-left md:text-right group focus:outline-none"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md group-hover:text-amber-300 transition-colors flex items-center justify-center md:justify-end gap-2.5">
                <BookOpen className="w-7 h-7 text-amber-400 inline-block shrink-0" />
                <span>SSC English Second Part</span>
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-200 mt-1 flex items-center justify-center md:justify-end gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>এসএসসি ইংরেজি ২য় পত্র ডিজিটাল লার্নিং অ্যান্ড এক্সাম প্ল্যাটফর্ম</span>
              </p>
            </button>

            {/* Navigation & Controls Bar: Active item + AI Tutor Hide/Show Toggle */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-xs">
              {/* Quick Breadcrumb badge if active item */}
              {activeItemTitle && (
                <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs text-amber-300 font-semibold">
                  <span className="text-emerald-300 font-medium">বর্তমান বিষয়:</span>
                  <span className="truncate max-w-[160px] sm:max-w-xs">{activeItemTitle}</span>
                </div>
              )}

              {/* Direct Open Quick Grammar Cheat-Sheet */}
              {onOpenCheatSheet && (
                <button
                  id="header-open-grammar-cheat-sheet"
                  onClick={onOpenCheatSheet}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold shadow-md border border-amber-300 transition active:scale-95 hover:scale-105"
                  title="Open Quick Grammar Cheat-Sheet (কুইক রুলস ও ভুল সংশোধন)"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Grammar Cheat-Sheet</span>
                </button>
              )}

              {/* Direct Open Saved Exercises List */}
              {onOpenSavedExercises && (
                <button
                  id="header-open-saved-exercises"
                  onClick={onOpenSavedExercises}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 font-extrabold shadow-sm transition active:scale-95 hover:scale-105"
                  title="Open Saved Exercises (বুকমার্ক করা সংরক্ষিত প্রশ্নসমূহ)"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Saved Exercises</span>
                  {bookmarkCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                      {bookmarkCount}
                    </span>
                  )}
                </button>
              )}


              {/* Direct Open AI Tutor Tab */}
              {onOpenAiTutorTab && (
                <button
                  onClick={() => onOpenAiTutorTab('chat')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/70 hover:bg-emerald-500 text-white font-bold border border-emerald-400/40 shadow-sm transition active:scale-95"
                  title="Open AI Tutor Chat"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI Tutor</span>
                </button>
              )}

              {/* Direct Open Word Lookup Tab */}
              {onOpenAiTutorTab && (
                <button
                  onClick={() => onOpenAiTutorTab('lookup')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/70 hover:bg-indigo-500 text-white font-bold border border-indigo-400/40 shadow-sm transition active:scale-95"
                  title="Open Word Lookup & Pronunciation"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Word Lookup (শব্দকোষ)</span>
                </button>
              )}

              {/* Hide / Show Global Toggle Button */}
              {onToggleAiTutorVisibility && (
                <button
                  id="header-toggle-ai-tutor-visibility"
                  onClick={onToggleAiTutorVisibility}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition shadow-sm border ${
                    isAiTutorVisible
                      ? 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border-amber-400/50'
                      : 'bg-rose-500/25 hover:bg-rose-500/35 text-rose-200 border-rose-400/50 animate-pulse'
                  }`}
                  title={
                    isAiTutorVisible
                      ? 'Click to Hide AI Tutor & Word Lookup widget'
                      : 'Click to Show AI Tutor & Word Lookup widget'
                  }
                >
                  {isAiTutorVisible ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                      <span>AI বাটন: Visible (লুকান)</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-rose-300" />
                      <span>AI বাটন: Hidden (দেখান)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
