import React from 'react';
import { X, Bookmark, BookmarkCheck } from 'lucide-react';
import { SavedExercisesSection } from './SavedExercisesSection';

interface SavedExercisesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (itemId: number) => void;
}

export const SavedExercisesModal: React.FC<SavedExercisesModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-indigo-900 text-white flex items-center justify-between border-b border-emerald-700/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold">
              <Bookmark className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Saved Exercises (সংরক্ষিত প্রশ্নের তালিকা)
              </h3>
              <p className="text-xs text-emerald-200">
                আপনার বুকমার্ক করা সকল ব্যাকরণ ও রাইটিং অনুশীলন তালিকা
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <SavedExercisesSection
            onSelectItem={onSelectItem}
            onCloseModal={onClose}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};
