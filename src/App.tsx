import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MarksTable } from './components/MarksTable';
import { ItemGrid } from './components/ItemGrid';
import { SSC_SECTIONS } from './data/sscData';

// Grammar items 1 - 9
import { GapFillingItem } from './components/items/GapFillingItem';
import { SubstitutionTableItem } from './components/items/SubstitutionTableItem';
import { RightFormVerbsItem } from './components/items/RightFormVerbsItem';
import { ChangingSentencesItem } from './components/items/ChangingSentencesItem';
import { TagQuestionsItem } from './components/items/TagQuestionsItem';
import { SuffixPrefixItem } from './components/items/SuffixPrefixItem';
import { PrepositionItem } from './components/items/PrepositionItem';
import { ConnectorsItem } from './components/items/ConnectorsItem';
import { PunctuationItem } from './components/items/PunctuationItem';

// Writing items 10 - 12
import { WritingItemView } from './components/items/WritingItemView';
import { FloatingChatbot } from './components/FloatingChatbot';
import { QuickGrammarCheatSheet } from './components/QuickGrammarCheatSheet';
import { BookmarkButton } from './components/BookmarkButton';
import { SavedExercisesSection } from './components/SavedExercisesSection';
import { SavedExercisesModal } from './components/SavedExercisesModal';

import {
  ArrowLeft,
  ArrowRight,
  Home,
  BookOpen,
  Sparkles,
  Layers,
  Search,
  CheckCircle,
  HelpCircle,
  FileText,
  AlertTriangle,
  Bookmark,
} from 'lucide-react';

export function App() {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Quick Grammar Cheat-Sheet state
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const [cheatSheetTargetId, setCheatSheetTargetId] = useState<number | null>(null);

  // Saved Exercises Modal state
  const [isSavedExercisesOpen, setIsSavedExercisesOpen] = useState<boolean>(false);

  // AI Tutor & Word Lookup widget visibility state (persisted in localStorage)
  const [isAiTutorVisible, setIsAiTutorVisible] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ssc_ai_tutor_visible');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // State to trigger forced opening of a specific tab from header or quick actions
  const [forcedOpenTab, setForcedOpenTab] = useState<'chat' | 'lookup' | null>(null);

  const handleOpenCheatSheet = (itemId?: number) => {
    setCheatSheetTargetId(itemId || activeItemId || 1);
    setIsCheatSheetOpen(true);
  };

  const handleToggleAiTutorVisibility = () => {
    setIsAiTutorVisible((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ssc_ai_tutor_visible', String(next));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      return next;
    });
  };

  const handleSetAiTutorVisibility = (visible: boolean) => {
    setIsAiTutorVisible(visible);
    try {
      localStorage.setItem('ssc_ai_tutor_visible', String(visible));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  };

  const handleOpenAiTutorTab = (tab: 'chat' | 'lookup') => {
    setIsAiTutorVisible(true);
    setForcedOpenTab(tab);
  };

  const activeSection = (SSC_SECTIONS || []).find((s) => s.id === activeItemId);

  const handleSelectItem = (id: number) => {
    setActiveItemId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevItem = () => {
    if (!activeItemId) return;
    const prevId = activeItemId > 1 ? activeItemId - 1 : 12;
    handleSelectItem(prevId);
  };

  const handleNextItem = () => {
    if (!activeItemId) return;
    const nextId = activeItemId < 12 ? activeItemId + 1 : 1;
    handleSelectItem(nextId);
  };

  // Render the appropriate active item component
  const renderActiveItem = () => {
    switch (activeItemId) {
      case 1:
        return <GapFillingItem onBackToMenu={handleGoHome} />;
      case 2:
        return <SubstitutionTableItem onBackToMenu={handleGoHome} />;
      case 3:
        return <RightFormVerbsItem onBackToMenu={handleGoHome} />;
      case 4:
        return <ChangingSentencesItem onBackToMenu={handleGoHome} />;
      case 5:
        return <TagQuestionsItem onBackToMenu={handleGoHome} />;
      case 6:
        return <SuffixPrefixItem onBackToMenu={handleGoHome} />;
      case 7:
        return <PrepositionItem onBackToMenu={handleGoHome} />;
      case 8:
        return <ConnectorsItem onBackToMenu={handleGoHome} />;
      case 9:
        return <PunctuationItem onBackToMenu={handleGoHome} />;
      case 10:
      case 11:
      case 12:
        return <WritingItemView itemId={activeItemId} onBackToMenu={handleGoHome} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sacred Top Banner & Header */}
      <Header
        onGoHome={handleGoHome}
        activeItemTitle={activeSection ? `Item ${activeSection.itemNumber}: ${activeSection.nameEn}` : null}
        isAiTutorVisible={isAiTutorVisible}
        onToggleAiTutorVisibility={handleToggleAiTutorVisibility}
        onOpenAiTutorTab={handleOpenAiTutorTab}
        onOpenCheatSheet={() => handleOpenCheatSheet()}
        onOpenSavedExercises={() => setIsSavedExercisesOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Breadcrumb Bar if inside an item */}
        {activeItemId !== null ? (
          <div className="mb-6">
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {/* Back to All Topics & Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleGoHome}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition shadow-sm"
                >
                  <Home className="w-4 h-4" />
                  <span>সকল বিষয় সূচি (All Syllabus)</span>
                </button>

                {/* Quick In-Exercise Cheat-Sheet Trigger */}
                <button
                  onClick={() => handleOpenCheatSheet(activeItemId)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition shadow-sm hover:scale-105 active:scale-95 border border-amber-300"
                  title={`Open Item ${activeSection?.itemNumber} Quick Rules & Mistakes Cheat-Sheet`}
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Item {activeSection?.itemNumber} Cheat-Sheet</span>
                </button>

                {/* Bookmark Button for this Exercise / Topic */}
                {activeSection && (
                  <BookmarkButton
                    exercise={{
                      id: `item-${activeSection.id}-general`,
                      itemId: activeSection.id,
                      itemNumber: activeSection.itemNumber,
                      itemTitle: activeSection.nameEn,
                      subTitle: `${activeSection.nameEn} (${activeSection.nameBn})`,
                      category: activeSection.part === 'A' ? 'grammar' : 'writing',
                      savedAt: new Date().toISOString(),
                    }}
                    variant="header"
                  />
                )}
              </div>

              {/* Prev / Current / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevItem}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition"
                  title="Previous item"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">পূর্ববর্তী</span>
                </button>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                  <span>Q.{activeSection?.itemNumber}:</span>
                  <span className="truncate max-w-[150px] sm:max-w-none">{activeSection?.nameEn}</span>
                </div>

                <button
                  onClick={handleNextItem}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition"
                  title="Next item"
                >
                  <span className="hidden sm:inline">পরবর্তী</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Render Selected Interactive Exercise Component */}
            <div className="mt-6">{renderActiveItem()}</div>
          </div>
        ) : (
          /* Home Screen: Marks Distribution Table + Saved Exercises + 12 Item Grid */
          <div>
            {/* Introductory Guidance Banner */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 mb-3 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SSC Examination Preparation 2026</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  এসএসসি ইংরেজি ২য় পত্র সম্পূর্ণ ডিজিটাল প্রস্তুতি
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 mt-2.5 leading-relaxed">
                  জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রণীত নতুন প্রশ্নের ধারা ও ১০০ নম্বরের পূর্ণাঙ্গ মান বণ্টন অনুসারে নির্মিত। প্রতিটি ব্যাকরণ আইটেমে ড্র্যাগ-অ্যান্ড-ড্রপ, রিয়েল-টাইম এআই খাতা পরীক্ষণ, ও ব্রিটিশ কাউন্সিলের মাস্টার ট্রেইনার প্রণীত শুদ্ধ অডিও উচ্চারণ সংযুক্ত রয়েছে।
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/90">
                  <button
                    onClick={() => handleOpenCheatSheet(1)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition hover:scale-105 active:scale-95"
                  >
                    <BookOpen className="w-4 h-4 text-slate-950" />
                    <span>Quick Grammar Cheat-Sheet</span>
                  </button>

                  <button
                    onClick={() => setIsSavedExercisesOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs sm:text-sm shadow-md transition hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/30"
                  >
                    <Bookmark className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Saved Exercises (সংরক্ষিত তালিকা)</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    <span>Part A: Grammar (60 Marks)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    <span>Part B: Writing (40 Marks)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution of Marks Table */}
            <MarksTable onSelectItem={handleSelectItem} activeItemId={activeItemId} />

            {/* Saved Exercises Section in Dashboard */}
            <SavedExercisesSection onSelectItem={handleSelectItem} />

            {/* 12 Interactive Items Grid */}
            <ItemGrid onSelectItem={handleSelectItem} activeItemId={activeItemId} />
          </div>
        )}
      </main>

      {/* Quick Grammar Cheat-Sheet Overlay Modal / Side-Drawer */}
      <QuickGrammarCheatSheet
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        initialItemId={cheatSheetTargetId}
        onNavigateToItem={handleSelectItem}
      />

      {/* Saved Exercises Modal Drawer */}
      <SavedExercisesModal
        isOpen={isSavedExercisesOpen}
        onClose={() => setIsSavedExercisesOpen(false)}
        onSelectItem={handleSelectItem}
      />

      {/* Floating AI Grammar & Writing Tutor Chatbot (Gemini & ChatGPT) + Word Lookup */}
      <FloatingChatbot
        activeSection={activeSection}
        activeItemId={activeItemId}
        isWidgetVisible={isAiTutorVisible}
        onToggleWidgetVisibility={handleSetAiTutorVisibility}
        forcedOpenTab={forcedOpenTab}
        onForcedOpenHandled={() => setForcedOpenTab(null)}
      />

      {/* Global Author Credits & Footer */}
      <Footer />
    </div>
  );
}
export default App;
