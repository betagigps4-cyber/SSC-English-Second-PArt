import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { SavedExerciseBookmark } from '../types';
import { isBookmarked, toggleBookmark, subscribeToBookmarks } from '../utils/bookmarkUtils';

interface BookmarkButtonProps {
  exercise: SavedExerciseBookmark;
  className?: string;
  variant?: 'compact' | 'standard' | 'pill' | 'header';
  showLabel?: boolean;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  exercise,
  className = '',
  variant = 'standard',
  showLabel = true,
}) => {
  const [saved, setSaved] = useState<boolean>(() => isBookmarked(exercise.id));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSaved(isBookmarked(exercise.id));
    const unsubscribe = subscribeToBookmarks(() => {
      setSaved(isBookmarked(exercise.id));
    });
    return () => unsubscribe();
  }, [exercise.id]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowSaved = toggleBookmark(exercise);
    setSaved(isNowSaved);

    const msg = isNowSaved
      ? `"${exercise.subTitle || exercise.itemTitle}" সংরক্ষিত তালিকায় যোগ করা হয়েছে!`
      : `সংরক্ষিত তালিকা থেকে সরানো হয়েছে।`;
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  if (variant === 'compact') {
    return (
      <div className="relative inline-block">
        <button
          onClick={handleToggle}
          title={saved ? 'Remove from Saved Exercises' : 'Save this question to Saved Exercises'}
          className={`p-2 rounded-xl transition-all duration-200 active:scale-90 flex items-center justify-center ${
            saved
              ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 hover:bg-amber-300'
              : 'bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600'
          } ${className}`}
        >
          {saved ? (
            <BookmarkCheck className="w-4 h-4 text-slate-950 fill-slate-950" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>

        {toastMessage && (
          <div className="absolute right-0 top-full mt-1 z-50 whitespace-nowrap bg-slate-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-amber-400/50 pointer-events-none animate-in fade-in duration-200">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className="relative inline-block">
        <button
          onClick={handleToggle}
          title={saved ? 'Remove from Saved Exercises' : 'Save this exercise to Saved Exercises'}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 shadow-sm active:scale-95 border ${
            saved
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 scale-105'
              : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-amber-400'
          } ${className}`}
        >
          {saved ? (
            <BookmarkCheck className="w-4 h-4 text-slate-950 fill-slate-950" />
          ) : (
            <Bookmark className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          )}
          {showLabel && (
            <span>
              {saved ? 'বুকমার্ক করা হয়েছে (Saved)' : 'বুকমার্ক করুন (Save Exercise)'}
            </span>
          )}
        </button>

        {toastMessage && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50 whitespace-nowrap bg-slate-950 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xl border border-amber-400/70 pointer-events-none">
            <span className="text-amber-300 font-extrabold">★ </span>
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggle}
        title={saved ? 'Remove from Saved Exercises' : 'Save this exercise'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm active:scale-95 border ${
          saved
            ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300 font-extrabold hover:bg-amber-300'
            : 'bg-slate-100 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-300'
        } ${className}`}
      >
        {saved ? (
          <BookmarkCheck className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
        ) : (
          <Bookmark className="w-3.5 h-3.5 text-amber-500" />
        )}
        {showLabel && <span>{saved ? 'Saved' : 'Bookmark'}</span>}
      </button>

      {toastMessage && (
        <div className="absolute left-0 top-full mt-1 z-50 whitespace-nowrap bg-slate-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-amber-400/50 pointer-events-none">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
