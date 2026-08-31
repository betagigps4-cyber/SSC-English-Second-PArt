import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Search,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Volume2,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  Lightbulb,
  Printer,
  Eye,
  EyeOff,
  ExternalLink,
  Dock,
  PanelRight,
  GraduationCap,
  FileText,
  Filter,
} from 'lucide-react';
import {
  GRAMMAR_CHEAT_SHEET_DATA,
  ItemCheatSheet,
  CheatSheetRule,
  CommonMistake,
} from '../data/grammarCheatSheetData';
import { speechService } from '../utils/speechUtils';

interface QuickGrammarCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemId?: number | null;
  onNavigateToItem?: (itemId: number) => void;
}

type ViewMode = 'modal' | 'drawer';

export const QuickGrammarCheatSheet: React.FC<QuickGrammarCheatSheetProps> = ({
  isOpen,
  onClose,
  initialItemId = null,
  onNavigateToItem,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<number>(initialItemId || 1);
  const [searchQuery, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'grammar' | 'writing'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('modal');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hideMistakeAnswers, setHideMistakeAnswers] = useState<boolean>(false);
  const [revealedMistakes, setRevealedMistakes] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'rules' | 'mistakes' | 'shortcuts' | 'all'>('all');

  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Sync initial item when opened from a specific exercise
  useEffect(() => {
    if (initialItemId && initialItemId >= 1 && initialItemId <= 12) {
      setSelectedItemId(initialItemId);
    }
  }, [initialItemId, isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Scroll to top of content on item change
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
  }, [selectedItemId]);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return GRAMMAR_CHEAT_SHEET_DATA.filter((item) => {
      // Category filter
      if (filterCategory === 'grammar' && item.part !== 'Grammar') return false;
      if (filterCategory === 'writing' && item.part !== 'Writing') return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inTitle =
        item.nameEn.toLowerCase().includes(q) ||
        item.nameBn.toLowerCase().includes(q) ||
        `item ${item.itemNumber}`.includes(q);
      const inShortcuts = item.quickShortcuts.some((s) => s.toLowerCase().includes(q));
      const inRules = item.rules.some(
        (r) =>
          r.ruleTitle.toLowerCase().includes(q) ||
          r.ruleBn.toLowerCase().includes(q) ||
          (r.formula && r.formula.toLowerCase().includes(q)) ||
          r.exampleEn.toLowerCase().includes(q)
      );
      const inMistakes = item.commonMistakes.some(
        (m) =>
          m.incorrect.toLowerCase().includes(q) ||
          m.correct.toLowerCase().includes(q) ||
          m.explanationBn.toLowerCase().includes(q)
      );
      return inTitle || inShortcuts || inRules || inMistakes;
    });
  }, [filterCategory, searchQuery]);

  // The active item being displayed
  const currentItem = useMemo(() => {
    const found = GRAMMAR_CHEAT_SHEET_DATA.find((i) => i.itemId === selectedItemId);
    return found || GRAMMAR_CHEAT_SHEET_DATA[0];
  }, [selectedItemId]);

  // Speech synthesizer handler
  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      speechService.stop();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    const cleanText = text
      .replace(/→/g, ' becomes ')
      .replace(/↔/g, ' transforms into ')
      .replace(/\+/g, ' plus ')
      .replace(/\//g, ' or ')
      .replace(/[\[\]]/g, '')
      .replace(/\.\.\./g, ' ');

    speechService.speakText({
      text: cleanText,
      rate: 1.0,
      accent: 'en-GB',
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  };

  // Copy rule to clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle reveal for a specific mistake when self-test mode is enabled
  const toggleRevealMistake = (mistakeId: string) => {
    setRevealedMistakes((prev) => ({
      ...prev,
      [mistakeId]: !prev[mistakeId],
    }));
  };

  // Print current cheat sheet
  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  // Render Minimized Pill widget
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50 animate-bounce">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-indigo-600 text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all border-2 border-white/40 ring-4 ring-black/10"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span>Quick Grammar Cheat-Sheet (Open)</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">
            Item {currentItem.itemNumber}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'modal'
          ? 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200'
          : 'fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[580px] md:w-[680px] shadow-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 flex flex-col'
      }
    >
      {/* Modal Card Container */}
      <div
        className={
          viewMode === 'modal'
            ? 'w-full max-w-6xl h-[92vh] max-h-[880px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden relative'
            : 'w-full h-full flex flex-col overflow-hidden'
        }
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white px-4 sm:px-6 py-4 flex items-center justify-between gap-3 shrink-0 border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Quick Grammar Cheat-Sheet</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold shadow-xs">
                    All 12 Items
                  </span>
                </h2>
              </div>
              <p className="text-xs text-emerald-200 font-medium hidden sm:block">
                এসএসসি ইংরেজি ২য় পত্রের ১০০ নম্বরের সকল ব্যাকরণ ও রাইটিং এর সংক্ষিপ্ত গোল্ডেন রুলস এবং ভুল সংশোধনিকা
              </p>
            </div>
          </div>

          {/* Action Tools: Switch Mode (Modal/Drawer), Self-test toggle, Minimize, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Self-Test / Hide Answers Toggle */}
            <button
              onClick={() => setHideMistakeAnswers(!hideMistakeAnswers)}
              className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                hideMistakeAnswers
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-emerald-100 border-white/20'
              }`}
              title={
                hideMistakeAnswers
                  ? 'Self-Test Mode Active: Correct answers are masked. Click to reveal all.'
                  : 'Click to enable Self-Test Mode (mask correct answers for revision)'
              }
            >
              {hideMistakeAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden md:inline">
                {hideMistakeAnswers ? 'Self-Test: Active' : 'Self-Test Mode'}
              </span>
            </button>

            {/* Switch between Full Modal and Side-Drawer */}
            <button
              onClick={() => setViewMode(viewMode === 'modal' ? 'drawer' : 'modal')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20 transition hidden sm:flex items-center gap-1 text-xs font-semibold"
              title={
                viewMode === 'modal'
                  ? 'Switch to Side-Docked Drawer (Practice side-by-side)'
                  : 'Switch to Centered Full Modal'
              }
            >
              {viewMode === 'modal' ? (
                <>
                  <PanelRight className="w-4 h-4" />
                  <span className="hidden lg:inline">Dock Right</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden lg:inline">Expand Modal</span>
                </>
              )}
            </button>

            {/* Minimize to bottom pill */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
              title="Minimize cheat sheet to floating bubble"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-white transition hover:scale-105"
              title="Close Cheat Sheet (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body Grid: Left Sidebar (Item Selector & Search) + Right Content View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar: Search & 12 Item List */}
          <div className="w-full md:w-80 lg:w-96 bg-slate-50 dark:bg-slate-950/70 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
            {/* Search Input & Category Filters */}
            <div className="p-3 sm:p-4 space-y-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search rules, keywords (e.g. tag, lest, voice)..."
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Tabs: All / Grammar / Writing */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    filterCategory === 'all'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  All (12)
                </button>
                <button
                  onClick={() => setFilterCategory('grammar')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    filterCategory === 'grammar'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Grammar (1-9)
                </button>
                <button
                  onClick={() => setFilterCategory('writing')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    filterCategory === 'writing'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Writing (10-12)
                </button>
              </div>
            </div>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 max-h-48 md:max-h-none">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-amber-500/70" />
                  <p>কোনো নিয়ম বা আইটেম পাওয়া যায়নি।</p>
                  <p className="mt-1 text-[11px]">অন্য কোনো শব্দ লিখে অনুসন্ধান করুন।</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isSelected = item.itemId === selectedItemId;
                  return (
                    <button
                      key={item.itemId}
                      onClick={() => setSelectedItemId(item.itemId)}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-2xl transition flex items-center justify-between gap-2 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-md border-emerald-500 scale-[1.01]'
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 shadow-inner'
                              : item.part === 'Grammar'
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          {item.itemNumber}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm truncate font-bold">{item.nameEn}</div>
                          <div
                            className={`text-[11px] truncate ${
                              isSelected ? 'text-emerald-100' : 'text-slate-400'
                            }`}
                          >
                            {item.nameBn}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.marks.split('=')[0].trim()}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 ${
                            isSelected ? 'text-amber-300' : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Main Content Area */}
          <div
            ref={contentScrollRef}
            className="flex-1 overflow-y-auto bg-slate-100/70 dark:bg-slate-950/40 p-4 sm:p-6 lg:p-8 space-y-6"
          >
            {/* Active Item Title & Quick Info Header */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs border border-emerald-300 dark:border-emerald-700">
                      Item {currentItem.itemNumber} • {currentItem.part} Section
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-xs border border-amber-300 dark:border-amber-700">
                      {currentItem.marks}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    {currentItem.nameEn}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {currentItem.nameBn}
                  </p>
                </div>

                {/* Direct Action: Jump to Practice this Item */}
                {onNavigateToItem && (
                  <button
                    onClick={() => {
                      onNavigateToItem(currentItem.itemId);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition hover:scale-105 active:scale-95 shrink-0"
                  >
                    <span>অনুশীলন শুরু করুন (Practice Item {currentItem.itemNumber})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Bengali Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  আইটেম পরিচিতি:{' '}
                </span>
                {currentItem.summaryBn}
              </p>

              {/* Quick Formula / Shortcut Chips */}
              {currentItem.quickShortcuts && currentItem.quickShortcuts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>কুইক শর্টকাট ও সোনালী সূত্র (Quick Shortcuts):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.quickShortcuts.map((sc, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-mono font-bold shadow-2xs group"
                      >
                        <span>{sc}</span>
                        <button
                          onClick={() => handleSpeak(sc, `shortcut-${idx}`)}
                          className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition"
                          title="Listen to formula"
                        >
                          <Volume2
                            className={`w-3.5 h-3.5 ${
                              speakingId === `shortcut-${idx}` ? 'text-emerald-500 animate-pulse' : ''
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Content Tabs: All / Core Rules / Common Mistakes / Exam Tips */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === 'all'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  সকল সেকশন (All)
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'rules'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>গোল্ডেন রুলস ({currentItem.rules.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('mistakes')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'mistakes'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>ভুল সংশোধন ({currentItem.commonMistakes.length})</span>
                </button>
              </div>

              {/* Copy Full Item Cheat Sheet Button */}
              <button
                onClick={() => {
                  const ruleText = currentItem.rules
                    .map((r, i) => `${i + 1}. ${r.ruleTitle}\nFormula: ${r.formula || 'N/A'}\nExample: ${r.exampleEn}\n${r.ruleBn}\n`)
                    .join('\n');
                  const mistakeText = currentItem.commonMistakes
                    .map((m, i) => `Mistake ${i + 1}:\n❌ ${m.incorrect}\n✅ ${m.correct}\nNote: ${m.explanationBn}\n`)
                    .join('\n');
                  const fullText = `=== SSC English 2nd Paper Cheat Sheet: Item ${currentItem.itemNumber} (${currentItem.nameEn}) ===\nMarks: ${currentItem.marks}\n\n[CORE RULES]\n${ruleText}\n[COMMON MISTAKES]\n${mistakeText}`;
                  handleCopy(fullText, `item-${currentItem.itemId}`);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition shadow-2xs"
              >
                {copiedId === `item-${currentItem.itemId}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Sheet</span>
                  </>
                )}
              </button>
            </div>

            {/* SECTION 1: Core Condensed Rules */}
            {(activeTab === 'all' || activeTab === 'rules') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>সংক্ষিপ্ত ব্যাকরণ ও গঠন বিধি (Core Condensed Rules)</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentItem.rules.length} টি প্রধান নিয়ম
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentItem.rules.map((rule, idx) => (
                    <div
                      key={rule.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {rule.ruleTitle}
                          </h5>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Speak Rule Example */}
                          <button
                            onClick={() => handleSpeak(rule.exampleEn, `rule-ex-${rule.id}`)}
                            className={`p-1.5 rounded-lg text-xs transition ${
                              speakingId === `rule-ex-${rule.id}`
                                ? 'bg-emerald-600 text-white animate-pulse'
                                : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800'
                            }`}
                            title="Pronounce English Example"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          {/* Copy Rule */}
                          <button
                            onClick={() =>
                              handleCopy(
                                `${rule.ruleTitle}\nFormula: ${rule.formula || ''}\nExample: ${rule.exampleEn}\nExplanation: ${rule.ruleBn}`,
                                `rule-${rule.id}`
                              )
                            }
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition"
                            title="Copy this rule"
                          >
                            {copiedId === `rule-${rule.id}` ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Formula Banner */}
                      {rule.formula && (
                        <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 dark:bg-slate-950 font-mono text-xs font-semibold overflow-x-auto shadow-inner border border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-amber-400 font-bold select-none text-[10px] uppercase">
                            Structure:
                          </span>
                          <code className="text-emerald-300 font-bold flex-1">{rule.formula}</code>
                        </div>
                      )}

                      {/* Bengali Explanation */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-normal">
                        {rule.ruleBn}
                      </p>

                      {/* English Example Card */}
                      <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                        <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200 flex items-center justify-between">
                          <span>Example:</span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">
                            Model Question Pattern
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono">
                          {rule.exampleEn}
                        </p>
                        {rule.exampleBn && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            বাংলা অর্থ: {rule.exampleBn}
                          </p>
                        )}
                      </div>

                      {/* Special Note/Tip if available */}
                      {rule.tip && (
                        <div className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{rule.tip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: Common Pitfalls & Mistakes Verifier */}
            {(activeTab === 'all' || activeTab === 'mistakes') && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      <span>সচরাচর ভুলসমূহ ও শুদ্ধ সমাধান (Common Mistakes & Fixes)</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      পরীক্ষার খাতায় শিক্ষার্থীরা যেসব ভুল বেশি করে এবং যেভাবে তা এড়িয়ে সঠিক উত্তর লিখবেন
                    </p>
                  </div>

                  {/* Self Test Toggle */}
                  <button
                    onClick={() => setHideMistakeAnswers(!hideMistakeAnswers)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
                      hideMistakeAnswers
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {hideMistakeAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{hideMistakeAnswers ? 'Self-Test (Hide Fixes): ON' : 'Self-Test (Test Yourself)'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentItem.commonMistakes.map((mistake, idx) => {
                    const isRevealed = revealedMistakes[mistake.id] || !hideMistakeAnswers;
                    return (
                      <div
                        key={mistake.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-rose-100 dark:border-rose-950 shadow-xs space-y-2.5"
                      >
                        {/* Incorrect Version */}
                        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                          <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-extrabold text-[10px] uppercase shrink-0 mt-0.5">
                            ❌ Incorrect
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-rose-950 dark:text-rose-200 font-mono flex-1">
                            {mistake.incorrect}
                          </span>
                          <button
                            onClick={() => handleSpeak(mistake.incorrect, `inc-${mistake.id}`)}
                            className="text-rose-400 hover:text-rose-600 p-1"
                            title="Speak phrase"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Correct Version with Self-Test Reveal Support */}
                        {isRevealed ? (
                          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 animate-in fade-in">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] uppercase shrink-0 mt-0.5">
                              ✅ Correct
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200 font-mono flex-1">
                              {mistake.correct}
                            </span>
                            <button
                              onClick={() => handleSpeak(mistake.correct, `cor-${mistake.id}`)}
                              className="text-emerald-500 hover:text-emerald-700 p-1"
                              title="Speak correct phrase"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center flex items-center justify-between gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                              🤔 সঠিক উত্তরটি কী হবে ভাবুন? (Self-Test Mode Active)
                            </span>
                            <button
                              onClick={() => toggleRevealMistake(mistake.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                            >
                              উত্তর দেখুন (Reveal)
                            </button>
                          </div>
                        )}

                        {/* Reason / Bengali Explanation */}
                        {isRevealed && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-amber-400 leading-relaxed font-medium">
                            <span className="font-bold text-amber-700 dark:text-amber-400">ব্যাখ্যা: </span>
                            {mistake.explanationBn}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 3: NCTB Exam Tips */}
            {currentItem.examTips && currentItem.examTips.length > 0 && (
              <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10 rounded-2xl p-4 sm:p-5 border border-amber-200 dark:border-amber-900/40 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-300">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span>পরীক্ষার্থীদের জন্য বিশেষ নির্দেশনা (NCTB Exam Tips):</span>
                </div>
                <ul className="space-y-1.5">
                  {currentItem.examTips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        ✓
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar: Quick Nav Previous / Next Item + Quick Print */}
        <div className="bg-white dark:bg-slate-900 px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const prev = selectedItemId > 1 ? selectedItemId - 1 : 12;
                setSelectedItemId(prev);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1"
            >
              <span>← পূর্ববর্তী আইটেম</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              Item {currentItem.itemNumber} of 12
            </span>

            <button
              onClick={() => {
                const next = selectedItemId < 12 ? selectedItemId + 1 : 1;
                setSelectedItemId(next);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1"
            >
              <span>পরবর্তী আইটেম →</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToItem && (
              <button
                onClick={() => {
                  onNavigateToItem(currentItem.itemId);
                  onClose();
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <span>এই আইটেমটি অনুশীলন করুন (Go to Exercise)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
            >
              বন্ধ করুন (Close)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
