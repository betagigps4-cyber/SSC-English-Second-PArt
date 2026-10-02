import React, { useState, useMemo, useEffect } from 'react';
import { BoardName, SavedExerciseBookmark } from '../types';
import { Layers, CheckCircle2, Award, Calendar } from 'lucide-react';
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
  const has2026 = useMemo(() => availableBoards.some((b) => b.includes('2026')), [availableBoards]);
  const has2024 = useMemo(() => availableBoards.some((b) => b.includes('2024')), [availableBoards]);
  const has2023 = useMemo(() => availableBoards.some((b) => b.includes('2023')), [availableBoards]);
  const has2022 = useMemo(() => availableBoards.some((b) => b.includes('2022')), [availableBoards]);
  const hasModel = useMemo(() => availableBoards.some((b) => b.includes('Model')), [availableBoards]);
  const hasCategories = (has2026 ? 1 : 0) + (has2024 ? 1 : 0) + (has2023 ? 1 : 0) + (has2022 ? 1 : 0) + (hasModel ? 1 : 0) > 1;

  const [activeFilter, setActiveFilter] = useState<'all' | '2026' | '2024' | '2023' | '2022' | 'model'>('all');

  // Auto switch filter if selected board is not in current activeFilter
  useEffect(() => {
    if (activeFilter === '2026' && !selectedBoard.includes('2026')) {
      setActiveFilter('all');
    } else if (activeFilter === '2024' && !selectedBoard.includes('2024')) {
      setActiveFilter('all');
    } else if (activeFilter === '2023' && !selectedBoard.includes('2023')) {
      setActiveFilter('all');
    } else if (activeFilter === '2022' && !selectedBoard.includes('2022')) {
      setActiveFilter('all');
    } else if (activeFilter === 'model' && !selectedBoard.includes('Model')) {
      setActiveFilter('all');
    }
  }, [selectedBoard]);

  const filteredBoards = useMemo(() => {
    if (activeFilter === '2026') return availableBoards.filter((b) => b.includes('2026'));
    if (activeFilter === '2024') return availableBoards.filter((b) => b.includes('2024'));
    if (activeFilter === '2023') return availableBoards.filter((b) => b.includes('2023'));
    if (activeFilter === '2022') return availableBoards.filter((b) => b.includes('2022'));
    if (activeFilter === 'model') return availableBoards.filter((b) => b.includes('Model'));
    return availableBoards;
  }, [availableBoards, activeFilter]);

  return (
    <div className="bg-slate-100 dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            Select Board / Model Question (বোর্ড / মডেল প্রশ্ন নির্বাচন করুন):
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            SSC Exam Preparation • {availableBoards.length} Sets Available
          </span>
          {bookmarkData && (
            <BookmarkButton exercise={bookmarkData} variant="pill" showLabel={true} />
          )}
        </div>
      </div>

      {hasCategories && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-2.5 border-b border-slate-200 dark:border-slate-700/60">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
            Category Filter:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300'
            }`}
          >
            All Sets ({availableBoards.length})
          </button>
          {has2026 && (
            <button
              onClick={() => setActiveFilter('2026')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === '2026'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 hover:bg-amber-200'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>Board 2026 ({availableBoards.filter((b) => b.includes('2026')).length})</span>
            </button>
          )}
          {has2024 && (
            <button
              onClick={() => setActiveFilter('2024')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === '2024'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 hover:bg-blue-200'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Board 2024 ({availableBoards.filter((b) => b.includes('2024')).length})</span>
            </button>
          )}
          {has2023 && (
            <button
              onClick={() => setActiveFilter('2023')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === '2023'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 hover:bg-purple-200'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Board 2023 ({availableBoards.filter((b) => b.includes('2023')).length})</span>
            </button>
          )}
          {has2022 && (
            <button
              onClick={() => setActiveFilter('2022')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === '2022'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 hover:bg-rose-200'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Board 2022 ({availableBoards.filter((b) => b.includes('2022')).length})</span>
            </button>
          )}
          {hasModel && (
            <button
              onClick={() => setActiveFilter('model')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'model'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
              }`}
            >
              Model Questions ({availableBoards.filter((b) => b.includes('Model')).length})
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 max-h-56 sm:max-h-72 overflow-y-auto pr-1">
        {filteredBoards.map((board) => {
          const isSelected = selectedBoard === board;
          const is2026 = board.includes('2026');
          const is2024 = board.includes('2024');
          const is2023 = board.includes('2023');
          const is2022 = board.includes('2022');

          let badgeColor = 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
          if (is2026) {
            badgeColor = 'bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800/50';
          } else if (is2024) {
            badgeColor = 'bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800/50';
          } else if (is2023) {
            badgeColor = 'bg-purple-50/70 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800/50';
          } else if (is2022) {
            badgeColor = 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800/50';
          }

          return (
            <button
              key={board}
              onClick={() => onSelectBoard(board)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm border ${
                isSelected
                  ? 'bg-emerald-600 !text-white !border-emerald-600 ring-2 ring-emerald-400/50 scale-105 z-10'
                  : `${badgeColor} hover:bg-slate-200 dark:hover:bg-slate-700`
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

