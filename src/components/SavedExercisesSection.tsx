import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
  CheckCircle2,
  Layers,
  Filter,
} from 'lucide-react';
import { SavedExerciseBookmark } from '../types';
import {
  getBookmarks,
  removeBookmark,
  clearAllBookmarks,
  subscribeToBookmarks,
  saveBookmark,
} from '../utils/bookmarkUtils';

interface SavedExercisesSectionProps {
  onSelectItem: (itemId: number) => void;
  onCloseModal?: () => void;
  isModal?: boolean;
}

export const SavedExercisesSection: React.FC<SavedExercisesSectionProps> = ({
  onSelectItem,
  onCloseModal,
  isModal = false,
}) => {
  const [bookmarks, setBookmarks] = useState<SavedExerciseBookmark[]>(() => getBookmarks());
  const [activeFilter, setActiveFilter] = useState<'all' | 'grammar' | 'writing'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setBookmarks(getBookmarks());
    const unsubscribe = subscribeToBookmarks((updated) => {
      setBookmarks(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeBookmark(id);
  };

  const handleClearAll = () => {
    if (window.confirm('আপনি কি সকল সংরক্ষিত অনুশীলন মুছে ফেলতে চান? (Are you sure you want to remove all saved exercises?)')) {
      clearAllBookmarks();
    }
  };

  const handleOpenExercise = (bookmark: SavedExerciseBookmark) => {
    if (onCloseModal) onCloseModal();
    onSelectItem(bookmark.itemId);
  };

  // Add default sample bookmarks if student wants quick starter bookmarks
  const handleAddSampleBookmarks = () => {
    const samples: SavedExerciseBookmark[] = [
      {
        id: 'item-7-model-1',
        itemId: 7,
        itemNumber: 7,
        itemTitle: 'Prepositions',
        subTitle: 'Model Question 1: Uses of Appropriate Prepositions',
        category: 'grammar',
        savedAt: new Date().toISOString(),
      },
      {
        id: 'item-10-sample-0',
        itemId: 10,
        itemNumber: 10,
        itemTitle: 'Paragraph Writing',
        subTitle: 'A Winter Morning (শীতের সকাল)',
        category: 'writing',
        savedAt: new Date().toISOString(),
      },
      {
        id: 'item-3-model-1',
        itemId: 3,
        itemNumber: 3,
        itemTitle: 'Right Form of Verbs',
        subTitle: 'Model Question 1: Subject-Verb Agreement & Tense Rules',
        category: 'grammar',
        savedAt: new Date().toISOString(),
      },
    ];
    samples.forEach((s) => saveBookmark(s));
  };

  const filteredBookmarks = bookmarks.filter((item) => {
    if (activeFilter === 'grammar' && item.category !== 'grammar') return false;
    if (activeFilter === 'writing' && item.category !== 'writing') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (item.itemTitle || '').toLowerCase().includes(q);
      const matchSub = (item.subTitle || '').toLowerCase().includes(q);
      const matchNum = `item ${item.itemNumber}`.toLowerCase().includes(q) || `q.${item.itemNumber}`.includes(q);
      return matchTitle || matchSub || matchNum;
    }
    return true;
  });

  const grammarCount = bookmarks.filter((b) => b.category === 'grammar').length;
  const writingCount = bookmarks.filter((b) => b.category === 'writing').length;

  return (
    <div
      className={`rounded-3xl border ${
        isModal
          ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl mb-10'
      }`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 shadow-md">
              <Bookmark className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Saved Exercises (সংরক্ষিত অনুশীলন তালিকা)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold border border-amber-300 dark:border-amber-700">
                  {bookmarks.length} টি সংরক্ষিত
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                যেকোনো ব্যাকরণ বা রাইটিং প্রশ্নের &quot;বুকমার্ক&quot; বাটনে ক্লিক করে পরবর্তীতে দ্রুত রিভিশন ও অনুশীলনের জন্য এখানে সংরক্ষণ করুন
              </p>
            </div>
          </div>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>সবগুলো মুছুন (Clear All)</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      {bookmarks.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All ({bookmarks.length})
            </button>
            <button
              onClick={() => setActiveFilter('grammar')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                activeFilter === 'grammar'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Part A: Grammar ({grammarCount})
            </button>
            <button
              onClick={() => setActiveFilter('writing')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                activeFilter === 'writing'
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Part B: Writing ({writingCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved questions..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}

      {/* Bookmarks Grid / Empty State */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-10 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
            <Bookmark className="w-8 h-8" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
            এখনও কোনো প্রশ্ন সংরক্ষিত নেই (No Saved Exercises Yet)
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
            যেকোনো Grammar বা Writing আইটেমে গিয়ে উপরের <strong className="text-amber-600 dark:text-amber-400">★ বুকমার্ক বাটনে</strong> ক্লিক করলে জটিল প্রশ্ন বা গুরুত্বপূর্ণ প্যারাগ্রাফ সরাসরি এই তালিকায় সেভ হয়ে থাকবে।
          </p>
          <button
            onClick={handleAddSampleBookmarks}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition hover:scale-105 active:scale-95 border border-amber-300"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>নমুনা সংরক্ষিত প্রশ্ন লোড করুন (Load Recommended Bookmarks)</span>
          </button>
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs sm:text-sm">
          খুঁজে পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে সার্চ করুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map((bookmark) => {
            const isWriting = bookmark.category === 'writing';
            return (
              <div
                key={bookmark.id}
                onClick={() => handleOpenExercise(bookmark)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        {bookmark.itemNumber}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isWriting
                            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                            : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                        }`}
                      >
                        {isWriting ? 'Part B: Writing' : 'Part A: Grammar'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleRemove(bookmark.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Main Title & Subtitle */}
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 text-sm sm:text-base leading-snug transition-colors mb-1">
                    {bookmark.subTitle || bookmark.itemTitle}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Item {bookmark.itemNumber}: {bookmark.itemTitle}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">
                    {bookmark.savedAt
                      ? new Date(bookmark.savedAt).toLocaleDateString('bn-BD', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Saved'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>অনুশীলন করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
