import React from 'react';
import { BoardName, SavedExerciseBookmark } from '../types';
import { Layers, CheckCircle2 } from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';

interface BoardSelectorProps {
  availableBoards: BoardName[];
  selectedBoard: BoardName;
  onSelectBoard: (board: BoardName) => void;
  bookmarkData?: SavedExerciseBookmark;
}

export const BoardSelector: React.FC<BoardSelectorProps> = ({
  availableBoards,
  selectedBoard,
  onSelectBoard,
  bookmarkData,
}) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            Select Model Question (মডেল প্রশ্ন নির্বাচন করুন):
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            SSC Exam Preparation • {availableBoards.length} Model Sets Available
          </span>
          {bookmarkData && (
            <BookmarkButton exercise={bookmarkData} variant="pill" showLabel={true} />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableBoards.map((board) => {
          const isSelected = selectedBoard === board;
          return (
            <button
              key={board}
              onClick={() => onSelectBoard(board)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                isSelected
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{board}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

