import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SubstitutionExercise, BoardName } from '../../types';
import { SUBSTITUTION_TABLE_DATA } from '../../data/sscData';
import { getSubstitutionTranslations } from '../../data/substitutionSentenceTranslations';
import { BoardSelector } from '../BoardSelector';
import { CelebrationModal } from '../CelebrationModal';
import { BookmarkButton } from '../BookmarkButton';
import {
  Columns3,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Bot,
  Loader2,
  Eye,
  BookOpen,
  MessageSquare,
  ChevronRight,
  GripVertical,
  X,
  Trash2,
  MoveDown,
  Check,
  Shuffle,
  Languages,
  ChevronDown,
} from 'lucide-react';

interface SubstitutionTableItemProps {
  onBackToMenu: () => void;
}

interface TableAiEvaluation {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade?: string;
  provider?: string;
  overallFeedback: string;
  banglaTips?: string;
  gapEvaluations: Array<{
    label: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    collocation?: string;
    ruleExplanation?: string;
    banglaRule?: string;
    whyIncorrect?: string;
  }>;
  studySuggestions?: string[];
  aiPowered?: boolean;
}

interface PoolItem {
  id: string;
  column: 'partA' | 'partB' | 'partC';
  text: string;
  originalIndex: number;
}

// Pseudo-shuffle helper to scramble pool items so columns are not in parallel sequential order
const shufflePoolItems = <T extends { text: string }>(items: T[], seedOffset: number): T[] => {
  if (!items || items.length <= 1) return items;
  const copy = [...items];
  let s = Math.abs(seedOffset) + 17;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    const j = Math.floor(rnd * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  // Ensure it's not identical to input order if length >= 2
  let isIdentical = true;
  for (let i = 0; i < copy.length; i++) {
    if (copy[i].text !== items[i].text) {
      isIdentical = false;
      break;
    }
  }
  if (isIdentical && copy.length >= 2) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }
  return copy;
};

interface SentenceSlotItem {
  id: string;
  text: string;
}

interface SentenceBuildState {
  id: number;
  partA: SentenceSlotItem | null;
  partB: SentenceSlotItem | null;
  partC: SentenceSlotItem | null;
}

export const SubstitutionTableItem: React.FC<SubstitutionTableItemProps> = ({ onBackToMenu }) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardName>(
    SUBSTITUTION_TABLE_DATA[0]?.board || 'Model Question 1'
  );
  const [exercise, setExercise] = useState<SubstitutionExercise>(SUBSTITUTION_TABLE_DATA[0]);
  const [shuffleNonce, setShuffleNonce] = useState(0);

  // 5 Sentences state with drag & drop slot bindings
  const [createdSentences, setCreatedSentences] = useState<SentenceBuildState[]>([
    { id: 1, partA: null, partB: null, partC: null },
    { id: 2, partA: null, partB: null, partC: null },
    { id: 3, partA: null, partB: null, partC: null },
    { id: 4, partA: null, partB: null, partC: null },
    { id: 5, partA: null, partB: null, partC: null },
  ]);

  // Drag state tracking
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    column: 'partA' | 'partB' | 'partC';
    text: string;
    fromSentenceId?: number;
  } | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [aiEvaluation, setAiEvaluation] = useState<TableAiEvaluation | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'aiFeedback' | 'modelSentences'>('aiFeedback');
  const [isBanglaMeaningOpen, setIsBanglaMeaningOpen] = useState(false);

  // 5 Model Sentences with complete Bangla translations for the current exercise
  const sentenceTranslations = useMemo(() => {
    return getSubstitutionTranslations(exercise);
  }, [exercise]);

  useEffect(() => {
    const found =
      (SUBSTITUTION_TABLE_DATA || []).find((e) => e.board === selectedBoard) ||
      SUBSTITUTION_TABLE_DATA[0];
    setExercise(found);
    handleReset();
  }, [selectedBoard]);

  // Unique base seed for current board + manual shuffle counter
  const baseSeed = useMemo(() => {
    const str = `${exercise?.id || selectedBoard || 'sub-item-2'}`;
    return (
      str.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 77) +
      shuffleNonce * 37
    );
  }, [exercise?.id, selectedBoard, shuffleNonce]);

  // Jumbled / Scrambled items for Column A, B, and C so rows are not in parallel sequential order
  const allItemsA: PoolItem[] = useMemo(() => {
    const raw = (exercise?.columnA || []).map((text, idx) => ({
      id: `colA-${idx}`,
      column: 'partA' as const,
      text,
      originalIndex: idx,
    }));
    return shufflePoolItems(raw, baseSeed + 19);
  }, [exercise, baseSeed]);

  const allItemsB: PoolItem[] = useMemo(() => {
    const raw = (exercise?.columnB || []).map((text, idx) => ({
      id: `colB-${idx}`,
      column: 'partB' as const,
      text,
      originalIndex: idx,
    }));
    return shufflePoolItems(raw, baseSeed + 53);
  }, [exercise, baseSeed]);

  const allItemsC: PoolItem[] = useMemo(() => {
    const raw = (exercise?.columnC || []).map((text, idx) => ({
      id: `colC-${idx}`,
      column: 'partC' as const,
      text,
      originalIndex: idx,
    }));
    return shufflePoolItems(raw, baseSeed + 97);
  }, [exercise, baseSeed]);

  // Set of all item IDs currently placed in any sentence slot
  const usedItemIds = useMemo(() => {
    const ids = new Set<string>();
    createdSentences.forEach((s) => {
      if (s.partA?.id) ids.add(s.partA.id);
      if (s.partB?.id) ids.add(s.partB.id);
      if (s.partC?.id) ids.add(s.partC.id);
    });
    return ids;
  }, [createdSentences]);

  // Available items in the table (vanish when placed)
  const availableItemsA = useMemo(
    () => allItemsA.filter((item) => !usedItemIds.has(item.id)),
    [allItemsA, usedItemIds]
  );
  const availableItemsB = useMemo(
    () => allItemsB.filter((item) => !usedItemIds.has(item.id)),
    [allItemsB, usedItemIds]
  );
  const availableItemsC = useMemo(
    () => allItemsC.filter((item) => !usedItemIds.has(item.id)),
    [allItemsC, usedItemIds]
  );

  // Place item into a target sentence slot
  const placeItemInSlot = (
    sentenceId: number,
    column: 'partA' | 'partB' | 'partC',
    item: { id: string; text: string },
    fromSentenceId?: number
  ) => {
    setCreatedSentences((prev) =>
      prev.map((s) => {
        // If moving from another sentence, clear that slot
        if (fromSentenceId && s.id === fromSentenceId && s.id !== sentenceId) {
          return { ...s, [column]: null };
        }
        if (s.id === sentenceId) {
          return { ...s, [column]: { id: item.id, text: item.text } };
        }
        return s;
      })
    );
  };

  // Remove item from a slot (returns back to available list)
  const removeItemFromSlot = (sentenceId: number, column: 'partA' | 'partB' | 'partC') => {
    setCreatedSentences((prev) =>
      prev.map((s) => (s.id === sentenceId ? { ...s, [column]: null } : s))
    );
  };

  // Clear all 3 parts of a sentence
  const clearSentence = (sentenceId: number) => {
    setCreatedSentences((prev) =>
      prev.map((s) => (s.id === sentenceId ? { id: s.id, partA: null, partB: null, partC: null } : s))
    );
  };

  // Tap/Click to Place: places item into the first available sentence slot
  const handleTapPlaceItem = (item: PoolItem) => {
    const target = createdSentences.find((s) => !s[item.column]);
    if (target) {
      placeItemInSlot(target.id, item.column, { id: item.id, text: item.text });
    } else {
      placeItemInSlot(1, item.column, { id: item.id, text: item.text });
    }
  };

  // Drag Handlers
  const handleDragStart = (
    e: React.DragEvent,
    item: { id: string; column: 'partA' | 'partB' | 'partC'; text: string },
    fromSentenceId?: number
  ) => {
    const payload = { item, fromSentenceId };
    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'move';
    setDraggedItem({ ...item, fromSentenceId });
  };

  const handleDragOver = (
    e: React.DragEvent,
    slotColumn: 'partA' | 'partB' | 'partC',
    sentenceId: number
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const targetKey = `s${sentenceId}-${slotColumn}`;
    if (dragOverTarget !== targetKey) {
      setDragOverTarget(targetKey);
    }
  };

  const handleDragLeave = (
    _e: React.DragEvent,
    slotColumn: 'partA' | 'partB' | 'partC',
    sentenceId: number
  ) => {
    const targetKey = `s${sentenceId}-${slotColumn}`;
    if (dragOverTarget === targetKey) {
      setDragOverTarget(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    slotColumn: 'partA' | 'partB' | 'partC',
    sentenceId: number
  ) => {
    e.preventDefault();
    setDragOverTarget(null);

    try {
      const rawData = e.dataTransfer.getData('application/json');
      const data = rawData ? JSON.parse(rawData) : null;
      const item = data?.item || draggedItem;
      const fromSentenceId = data?.fromSentenceId ?? draggedItem?.fromSentenceId;

      if (item && item.column === slotColumn) {
        placeItemInSlot(sentenceId, slotColumn, { id: item.id, text: item.text }, fromSentenceId);
      }
    } catch {
      if (draggedItem && draggedItem.column === slotColumn) {
        placeItemInSlot(
          sentenceId,
          slotColumn,
          { id: draggedItem.id, text: draggedItem.text },
          draggedItem.fromSentenceId
        );
      }
    } finally {
      setDraggedItem(null);
    }
  };

  // Instant Manual Quick Check
  const handleQuickCheck = () => {
    const cleanNorm = (str: string) =>
      String(str || '')
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const validCombos = (exercise?.validCombinations || []).map((v) => {
      const full = v.fullSentence || `${v.partA} ${v.partB} ${v.partC}`;
      return {
        raw: full,
        partA: String(v.partA || '').trim(),
        partB: String(v.partB || '').trim(),
        partC: String(v.partC || '').trim(),
        normalized: cleanNorm(full),
        normalizedParts: cleanNorm(`${v.partA} ${v.partB} ${v.partC}`),
        normA: cleanNorm(v.partA || ''),
        normB: cleanNorm(v.partB || ''),
        normC: cleanNorm(v.partC || ''),
      };
    });

    let currentScore = 0;
    const matchedIndices = new Set<number>();
    const evals: TableAiEvaluation['gapEvaluations'] = [];

    createdSentences.forEach((sentence, sIdx) => {
      const partAText = (sentence.partA?.text || '').trim();
      const partBText = (sentence.partB?.text || '').trim();
      const partCText = (sentence.partC?.text || '').trim();
      const rawSentence =
        partAText && partBText && partCText ? `${partAText} ${partBText} ${partCText}` : '';
      const normStudent = cleanNorm(rawSentence);

      let isMatch = false;
      let matchedModelRaw = '';

      if (
        normStudent &&
        !normStudent.includes('incomplete') &&
        !normStudent.includes('(incomplete)')
      ) {
        for (let cIdx = 0; cIdx < validCombos.length; cIdx++) {
          if (!matchedIndices.has(cIdx)) {
            const target = validCombos[cIdx];
            if (
              normStudent === target.normalized ||
              normStudent === target.normalizedParts ||
              (target.normA && target.normB && target.normC && normStudent === cleanNorm(`${target.normA} ${target.normB} ${target.normC}`))
            ) {
              isMatch = true;
              matchedIndices.add(cIdx);
              matchedModelRaw = target.raw;
              break;
            }
          }
        }
      }

      if (isMatch) currentScore += 1;

      // Find first unused model combination as suggestion for fallback
      let fallbackModelAns = '';
      for (let cIdx = 0; cIdx < validCombos.length; cIdx++) {
        if (!matchedIndices.has(cIdx)) {
          fallbackModelAns = validCombos[cIdx].raw;
          break;
        }
      }
      if (!fallbackModelAns && validCombos[sIdx]) {
        fallbackModelAns = validCombos[sIdx].raw;
      }

      evals.push({
        label: `Sentence #${sentence.id}`,
        studentAnswer: rawSentence || '(Incomplete Sentence)',
        correctAnswer: isMatch ? matchedModelRaw : fallbackModelAns,
        isCorrect: isMatch,
        collocation: 'Subject-Verb-Complement Alignment',
        ruleExplanation: isMatch
          ? `Grammatically and semantically coherent sentence: "${matchedModelRaw}".`
          : `Valid sentence combination: "${fallbackModelAns}".`,
        banglaRule: 'কর্তা (Subject), ক্রিয়া (Verb) ও কর্ম (Object/Complement) এর সঠিক মিলন।',
        whyIncorrect: isMatch
          ? ''
          : !partAText || !partBText || !partCText
          ? 'Sentence incomplete (সবগুলো অংশ drag & drop করে পূরণ করা হয়নি).'
          : 'The selected parts do not form a semantically logical or factually coherent sentence.',
      });
    });

    setScore(currentScore);

    setAiEvaluation({
      totalScore: currentScore,
      maxScore: 5,
      percentage: Math.round((currentScore / 5) * 100),
      grade:
        currentScore === 5 ? 'A+' : currentScore >= 4 ? 'A' : currentScore >= 3 ? 'B' : 'Needs Practice',
      provider: 'Manual Check (বোর্ড মডেল উত্তর)',
      overallFeedback:
        currentScore === 5
          ? 'Splendid! All 5 sentences are grammatically and syntactically flawless.'
          : currentScore >= 3
          ? `Good work (${currentScore}/5)! Review the incorrect combinations to align subject and predicate logically.`
          : `Keep practicing (${currentScore}/5). Ensure that each part matches in tense and meaning.`,
      banglaTips:
        'সারণী থেকে বাক্য গঠনের সময় প্রথমে Subject এর একবচন/বহুবচন অনুযায়ী Verb নির্বাচন করুন, তারপর উপযুক্ত Complement যোগ করুন। বাক্যের ক্রম যেকোনো অর্ডারে রাখা যাবে।',
      gapEvaluations: evals,
      studySuggestions: [
        'Match singular subject with singular verb and plural subject with plural verb.',
        'Sentences can be written in any sequence as long as each combination is valid.',
        'Ensure that each sentence has all three parts (Subject, Verb, and Object/Complement).',
      ],
      aiPowered: false,
    });

    setIsChecked(true);
    setShowCelebration(true);
  };

  // AI & ChatGPT Examination
  const handleAiExamine = async (provider: 'chatgpt' | 'gemini') => {
    setSelectedAiModel(provider);
    setIsAiChecking(true);

    try {
      const userBuiltSentences: Record<string, string> = {};
      createdSentences.forEach((s) => {
        const partAText = (s.partA?.text || '').trim();
        const partBText = (s.partB?.text || '').trim();
        const partCText = (s.partC?.text || '').trim();
        const full =
          partAText && partBText && partCText
            ? `${partAText} ${partBText} ${partCText}`.trim()
            : '(Incomplete Sentence)';
        userBuiltSentences[`Sentence #${s.id}`] = full;
        userBuiltSentences[`sentence_${s.id}`] = full;
        userBuiltSentences[String(s.id)] = full;
      });

      const response = await fetch('/api/ai-grammar-examine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber: 2,
          itemTitle: 'Substitution Table',
          provider,
          exerciseContext: {
            passageTitle: exercise.title,
            board: selectedBoard,
            columnA: exercise.columnA,
            columnB: exercise.columnB,
            columnC: exercise.columnC,
            validCombinations: exercise.validCombinations,
          },
          items: exercise.validCombinations.map((v, i) => ({
            label: `Sentence #${i + 1}`,
            correctAnswer: v.fullSentence,
            partA: v.partA,
            partB: v.partB,
            partC: v.partC,
            ruleExplanation: 'Standard Subject-Verb-Object alignment',
          })),
          userAnswers: userBuiltSentences,
        }),
      });

      const data = await response.json();
      if (data && data.evaluation) {
        setAiEvaluation(data.evaluation);
        const resolvedScore =
          typeof data.evaluation.totalScore === 'number'
            ? data.evaluation.totalScore
            : data.evaluation.gapEvaluations?.filter((g: any) => g.isCorrect).length ?? 0;
        setScore(resolvedScore);
      } else {
        handleQuickCheck();
      }
    } catch (err) {
      console.warn('AI table examine error, falling back to manual check:', err);
      handleQuickCheck();
    } finally {
      setIsAiChecking(false);
      setIsChecked(true);
      setShowCelebration(true);
    }
  };

  const handleShowAllAnswers = () => {
    const valid = exercise?.validCombinations || [];
    const populated = [1, 2, 3, 4, 5].map((id, idx) => {
      const model = valid[idx];
      const fallbackA = exercise.columnA[idx % exercise.columnA.length] || '';
      const fallbackB = exercise.columnB[idx % exercise.columnB.length] || '';
      const fallbackC = exercise.columnC[idx % exercise.columnC.length] || '';
      return {
        id,
        partA: { id: `colA-${idx}`, text: model?.partA || fallbackA },
        partB: { id: `colB-${idx}`, text: model?.partB || fallbackB },
        partC: { id: `colC-${idx}`, text: model?.partC || fallbackC },
      };
    });

    setCreatedSentences(populated);
    setIsChecked(true);
    setScore(5);
  };

  const handleReset = () => {
    setCreatedSentences([
      { id: 1, partA: null, partB: null, partC: null },
      { id: 2, partA: null, partB: null, partC: null },
      { id: 3, partA: null, partB: null, partC: null },
      { id: 4, partA: null, partB: null, partC: null },
      { id: 5, partA: null, partB: null, partC: null },
    ]);
    setIsChecked(false);
    setIsAiChecking(false);
    setAiEvaluation(null);
    setShowCelebration(false);
    setScore(0);
    setActiveTab('aiFeedback');
    setIsBanglaMeaningOpen(false);
  };

  const availableBoards = SUBSTITUTION_TABLE_DATA.map((e) => e.board);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <BoardSelector
        availableBoards={availableBoards}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        bookmarkData={{
          id: `item-2-${exercise.id || selectedBoard}`,
          itemId: 2,
          itemNumber: 2,
          itemTitle: 'Substitution Table',
          subTitle: `${selectedBoard}: ${exercise.title || 'Table Practice'}`,
          category: 'grammar',
          savedAt: new Date().toISOString(),
        }}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        {/* Title */}
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 mb-1.5">
              <span>Question No. 2</span>
              <span>•</span>
              <span>Marks: 1x5 = 05</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GripVertical className="w-3 h-3" /> Drag & Drop Mode
              </span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              {exercise.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              নিচের ৩টি কলাম থেকে শব্দ বা শব্দগুচ্ছ <strong>Drag & Drop</strong> করে (বা ক্লিক করে) বাক্যের ৩টি অংশে বসান। ড্রপ করার সাথে সাথে শব্দটি তালিকা থেকে অদৃশ্য (vanish) হয়ে যাবে।
            </p>
          </div>

          <BookmarkButton
            exercise={{
              id: `item-2-${exercise.id || selectedBoard}`,
              itemId: 2,
              itemNumber: 2,
              itemTitle: 'Substitution Table',
              subTitle: `${selectedBoard}: ${exercise.title}`,
              category: 'grammar',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
          />
        </div>

        {/* 3-Column Source Table with Interactive Draggable/Clickable Chips that Vanish */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-700 mb-8 overflow-hidden shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Columns3 className="w-4 h-4 text-teal-600" />
              <span>Available Word Pool (মূল সারণীর শব্দভাণ্ডার):</span>
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setShuffleNonce((n) => n + 1)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-100/80 hover:bg-teal-200/80 dark:bg-teal-950/70 dark:hover:bg-teal-900/80 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-300/50 dark:border-teal-700/50 transition shadow-xs cursor-pointer active:scale-95"
                title="কলামগুলোর শব্দ আরও এলোমেলো (Shuffle) করুন"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>এলোমেলো / রদবদল (Shuffle)</span>
              </button>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                💡 Drag into slots or click on any item to place
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Column A (Subject) */}
            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-teal-100 dark:border-teal-900/80 pb-2 mb-2.5">
                <span className="text-xs font-black text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                  Part A (Subject)
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  {availableItemsA.length > 0
                    ? `বাকি: ${availableItemsA.length}`
                    : '✓ সব ব্যবহৃত'}
                </span>
              </div>

              <div className="flex-1 min-h-[140px] space-y-2">
                <AnimatePresence mode="popLayout">
                  {availableItemsA.length > 0 ? (
                    availableItemsA.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.85, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, item)}
                        onClick={() => handleTapPlaceItem(item)}
                        className="group flex items-start justify-between gap-2 p-2.5 rounded-xl bg-teal-50/70 hover:bg-teal-100/80 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/80 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:scale-[1.01] transition-all select-none"
                      >
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <GripVertical className="w-3.5 h-3.5 text-teal-500 shrink-0 opacity-60 group-hover:opacity-100 mt-0.5" />
                          <span className="break-words leading-relaxed flex-1">{item.text}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center p-4 text-center text-teal-700 dark:text-teal-400 bg-teal-50/30 dark:bg-teal-950/20 rounded-xl border border-dashed border-teal-200 dark:border-teal-900"
                    >
                      <Check className="w-5 h-5 mb-1" />
                      <span className="text-xs font-bold">All Part A items placed!</span>
                      <span className="text-[10px] text-slate-500">সব শব্দ বাক্যে বসানো হয়েছে</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Column B (Verb Phrase) */}
            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/80 pb-2 mb-2.5">
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  Part B (Verb Phrase)
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {availableItemsB.length > 0
                    ? `বাকি: ${availableItemsB.length}`
                    : '✓ সব ব্যবহৃত'}
                </span>
              </div>

              <div className="flex-1 min-h-[140px] space-y-2">
                <AnimatePresence mode="popLayout">
                  {availableItemsB.length > 0 ? (
                    availableItemsB.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.85, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, item)}
                        onClick={() => handleTapPlaceItem(item)}
                        className="group flex items-start justify-between gap-2 p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/80 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:scale-[1.01] transition-all select-none"
                      >
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <GripVertical className="w-3.5 h-3.5 text-amber-500 shrink-0 opacity-60 group-hover:opacity-100 mt-0.5" />
                          <span className="break-words leading-relaxed flex-1">{item.text}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center p-4 text-center text-amber-700 dark:text-amber-400 bg-amber-50/30 dark:bg-amber-950/20 rounded-xl border border-dashed border-amber-200 dark:border-amber-900"
                    >
                      <Check className="w-5 h-5 mb-1" />
                      <span className="text-xs font-bold">All Part B items placed!</span>
                      <span className="text-[10px] text-slate-500">সব শব্দ বাক্যে বসানো হয়েছে</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Column C (Object / Complement) */}
            <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/80 pb-2 mb-2.5">
                <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                  Part C (Complement)
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  {availableItemsC.length > 0
                    ? `বাকি: ${availableItemsC.length}`
                    : '✓ সব ব্যবহৃত'}
                </span>
              </div>

              <div className="flex-1 min-h-[140px] space-y-2">
                <AnimatePresence mode="popLayout">
                  {availableItemsC.length > 0 ? (
                    availableItemsC.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.85, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, item)}
                        onClick={() => handleTapPlaceItem(item)}
                        className="group flex items-start justify-between gap-2 p-2.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/80 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/80 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:scale-[1.01] transition-all select-none"
                      >
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <GripVertical className="w-3.5 h-3.5 text-indigo-500 shrink-0 opacity-60 group-hover:opacity-100 mt-0.5" />
                          <span className="break-words leading-relaxed flex-1">{item.text}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center p-4 text-center text-indigo-700 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900"
                    >
                      <Check className="w-5 h-5 mb-1" />
                      <span className="text-xs font-bold">All Part C items placed!</span>
                      <span className="text-[10px] text-slate-500">সব শব্দ বাক্যে বসানো হয়েছে</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Foldable 5 Sentences Bengali Meaning Box (Right below the Table) */}
        <div className="mb-8 rounded-3xl border border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-emerald-50/80 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40 overflow-hidden shadow-sm transition-all duration-200">
          <button
            type="button"
            onClick={() => setIsBanglaMeaningOpen((prev) => !prev)}
            className="w-full p-3.5 sm:p-4.5 flex items-center justify-between gap-3 text-left transition hover:bg-emerald-100/60 dark:hover:bg-emerald-900/50 cursor-pointer select-none"
            aria-expanded={isBanglaMeaningOpen}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-600 dark:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                <Languages className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm md:text-base font-black text-emerald-950 dark:text-emerald-100">
                    টেবিল থেকে গঠিত ৫টি বাক্যের বাংলা অর্থ (Bangla Meaning of 5 Sentences)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-200/90 dark:bg-emerald-900/90 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                    {isBanglaMeaningOpen ? 'খোলা আছে (Open)' : 'ক্লিক করে দেখুন (Click to View)'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-0.5 font-medium">
                  {isBanglaMeaningOpen
                    ? 'বাংলা অর্থ লুকাতে এখানে পুনরায় ক্লিক করুন (Click to Fold)'
                    : 'টেবিল থেকে গঠিত ৫টি পূর্ণাঙ্গ বাক্যের বাংলা অর্থ একসাথে দেখতে এখানে ক্লিক করুন (Click to Unfold)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold shadow-xs">
              <span className="hidden sm:inline">{isBanglaMeaningOpen ? 'লুকান (Fold)' : 'অর্থ দেখুন (Unfold)'}</span>
              <motion.div
                animate={{ rotate: isBanglaMeaningOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isBanglaMeaningOpen && (
              <motion.div
                key="bangla-meaning-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-emerald-200/80 dark:border-emerald-900/80"
              >
                <div className="p-3.5 sm:p-5 md:p-6 space-y-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-emerald-100 dark:border-emerald-900/60 flex-wrap">
                    <span className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      টেবিলের ৫টি বাক্যের পূর্ণাঙ্গ বাংলা অনুবাদ:
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      💡 যেকোনো ৫টি অর্থপূর্ণ সঠিক বাক্য লিখলেই পূর্ণ নম্বর পাওয়া যাবে
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {sentenceTranslations.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-4 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50/80 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/60 transition shadow-xs"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-700 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                              {item.en}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-emerald-900 dark:text-emerald-300 leading-relaxed flex items-start gap-1.5">
                              <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">বাংলা অর্থ:</span>
                              <span>{item.bn}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>পরামর্শ:</strong> উপরের শব্দভাণ্ডার (Available Word Pool) থেকে কলাম অনুযায়ী উপযুক্ত শব্দ ও বাক্যাংশ ড্র্যাগ করে নিচের ড্রপ জোনে বসিয়ে ৫টি বাক্য গঠন করুন।
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive 5 Sentence Drag & Drop Target Builder */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <MoveDown className="w-4 h-4 text-teal-600" />
              <span>Construct 5 Sentences by Dragging (৫টি বাক্যের ড্রপ জোন):</span>
            </h4>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Drag from above or click '✕' to remove and restore to pool
            </span>
          </div>

          {createdSentences.map((sentence, sIdx) => {
            const partAText = (sentence.partA?.text || '').trim();
            const partBText = (sentence.partB?.text || '').trim();
            const partCText = (sentence.partC?.text || '').trim();
            const full = `${partAText} ${partBText} ${partCText}`.toLowerCase();

            const isSentenceValid =
              isChecked &&
              (exercise?.validCombinations || []).some(
                (v) =>
                  (v?.fullSentence || '').toLowerCase().replace(/\s+/g, ' ').trim() ===
                  full.replace(/\s+/g, ' ').trim()
              );

            const hasAnyPart = Boolean(sentence.partA || sentence.partB || sentence.partC);

            return (
              <div
                key={sentence.id}
                className={`p-3.5 sm:p-4 rounded-3xl border-2 transition-all duration-200 shadow-sm ${
                  isChecked
                    ? isSentenceValid
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 shadow-emerald-500/10'
                      : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-500 shadow-rose-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Sentence Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-700 dark:text-slate-300">
                      Sentence #{sIdx + 1}
                    </span>
                    {hasAnyPart && (
                      <button
                        onClick={() => clearSentence(sentence.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition cursor-pointer"
                        title="Clear this row and return words to pool"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>মুছুন (Clear)</span>
                      </button>
                    )}
                  </div>

                  {isChecked && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold">
                      {isSentenceValid ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct (+1 Mark)
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect Combination
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* 3 Drop Zone Slots */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Slot Part A (Subject) */}
                  <div
                    onDragOver={(e) => handleDragOver(e, 'partA', sentence.id)}
                    onDragLeave={(e) => handleDragLeave(e, 'partA', sentence.id)}
                    onDrop={(e) => handleDrop(e, 'partA', sentence.id)}
                    className={`min-h-[58px] rounded-2xl p-2 sm:p-2.5 flex items-center justify-center transition-all ${
                      sentence.partA
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-2 border-teal-400 dark:border-teal-700 shadow-sm'
                        : dragOverTarget === `s${sentence.id}-partA`
                        ? 'bg-teal-100/70 dark:bg-teal-900/50 border-2 border-dashed border-teal-500 ring-2 ring-teal-400/40 scale-[1.02]'
                        : 'bg-slate-50/80 dark:bg-slate-800/40 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-300'
                    }`}
                  >
                    {sentence.partA ? (
                      <div
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e,
                            { id: sentence.partA!.id, column: 'partA', text: sentence.partA!.text },
                            sentence.id
                          )
                        }
                        className="w-full flex items-start justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm font-bold text-teal-900 dark:text-teal-200 cursor-grab active:cursor-grabbing shadow-xs"
                      >
                        <div className="flex items-start gap-1.5 min-w-0 flex-1">
                          <GripVertical className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span className="break-words leading-relaxed flex-1">{sentence.partA.text}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItemFromSlot(sentence.id, 'partA')}
                          className="w-5 h-5 rounded-full bg-teal-100 hover:bg-rose-100 dark:bg-teal-950 dark:hover:bg-rose-950 text-teal-700 hover:text-rose-700 dark:text-teal-300 dark:hover:text-rose-300 flex items-center justify-center shrink-0 transition mt-0.5 cursor-pointer"
                          title="Remove and restore to table"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 select-none text-center px-2">
                        + Drop Part A (Subject)
                      </span>
                    )}
                  </div>

                  {/* Slot Part B (Verb) */}
                  <div
                    onDragOver={(e) => handleDragOver(e, 'partB', sentence.id)}
                    onDragLeave={(e) => handleDragLeave(e, 'partB', sentence.id)}
                    onDrop={(e) => handleDrop(e, 'partB', sentence.id)}
                    className={`min-h-[58px] rounded-2xl p-2 sm:p-2.5 flex items-center justify-center transition-all ${
                      sentence.partB
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-400 dark:border-amber-700 shadow-sm'
                        : dragOverTarget === `s${sentence.id}-partB`
                        ? 'bg-amber-100/70 dark:bg-amber-900/50 border-2 border-dashed border-amber-500 ring-2 ring-amber-400/40 scale-[1.02]'
                        : 'bg-slate-50/80 dark:bg-slate-800/40 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-300'
                    }`}
                  >
                    {sentence.partB ? (
                      <div
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e,
                            { id: sentence.partB!.id, column: 'partB', text: sentence.partB!.text },
                            sentence.id
                          )
                        }
                        className="w-full flex items-start justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 cursor-grab active:cursor-grabbing shadow-xs"
                      >
                        <div className="flex items-start gap-1.5 min-w-0 flex-1">
                          <GripVertical className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="break-words leading-relaxed flex-1">{sentence.partB.text}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItemFromSlot(sentence.id, 'partB')}
                          className="w-5 h-5 rounded-full bg-amber-100 hover:bg-rose-100 dark:bg-amber-950 dark:hover:bg-rose-950 text-amber-700 hover:text-rose-700 dark:text-amber-300 dark:hover:text-rose-300 flex items-center justify-center shrink-0 transition mt-0.5 cursor-pointer"
                          title="Remove and restore to table"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 select-none text-center px-2">
                        + Drop Part B (Verb)
                      </span>
                    )}
                  </div>

                  {/* Slot Part C (Complement) */}
                  <div
                    onDragOver={(e) => handleDragOver(e, 'partC', sentence.id)}
                    onDragLeave={(e) => handleDragLeave(e, 'partC', sentence.id)}
                    onDrop={(e) => handleDrop(e, 'partC', sentence.id)}
                    className={`min-h-[58px] rounded-2xl p-2 sm:p-2.5 flex items-center justify-center transition-all ${
                      sentence.partC
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-400 dark:border-indigo-700 shadow-sm'
                        : dragOverTarget === `s${sentence.id}-partC`
                        ? 'bg-indigo-100/70 dark:bg-indigo-900/50 border-2 border-dashed border-indigo-500 ring-2 ring-indigo-400/40 scale-[1.02]'
                        : 'bg-slate-50/80 dark:bg-slate-800/40 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {sentence.partC ? (
                      <div
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e,
                            { id: sentence.partC!.id, column: 'partC', text: sentence.partC!.text },
                            sentence.id
                          )
                        }
                        className="w-full flex items-start justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm font-bold text-indigo-900 dark:text-indigo-200 cursor-grab active:cursor-grabbing shadow-xs"
                      >
                        <div className="flex items-start gap-1.5 min-w-0 flex-1">
                          <GripVertical className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span className="break-words leading-relaxed flex-1">{sentence.partC.text}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItemFromSlot(sentence.id, 'partC')}
                          className="w-5 h-5 rounded-full bg-indigo-100 hover:bg-rose-100 dark:bg-indigo-950 dark:hover:bg-rose-950 text-indigo-700 hover:text-rose-700 dark:text-indigo-300 dark:hover:text-rose-300 flex items-center justify-center shrink-0 transition mt-0.5 cursor-pointer"
                          title="Remove and restore to table"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 select-none text-center px-2">
                        + Drop Part C (Complement)
                      </span>
                    )}
                  </div>
                </div>

                {/* Assembled Sentence Preview */}
                {hasAnyPart && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 break-words flex items-center gap-2">
                    <span className="font-bold text-teal-600 dark:text-teal-400 uppercase text-[10px] tracking-wider shrink-0">
                      Assembled Sentence:
                    </span>
                    <span className="font-semibold italic">
                      {[sentence.partA?.text, sentence.partB?.text, sentence.partC?.text]
                        .filter(Boolean)
                        .join(' ')}
                      {sentence.partA && sentence.partB && sentence.partC && !sentence.partC.text.endsWith('.') ? '.' : ''}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Responsive Action Buttons Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* ChatGPT Check Button */}
            <button
              onClick={() => handleAiExamine('chatgpt')}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'chatgpt' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Bot className="w-4 h-4 text-emerald-200" />
              )}
              <span>ChatGPT Examiner</span>
            </button>

            {/* Gemini AI Check Button */}
            <button
              onClick={() => handleAiExamine('gemini')}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isAiChecking && selectedAiModel === 'gemini' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-teal-200" />
              )}
              <span>Gemini 3.7 AI</span>
            </button>

            {/* Manual Quick Check Button */}
            <button
              onClick={handleQuickCheck}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold text-xs sm:text-sm border border-teal-200 dark:border-teal-800/80 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Quick Check (ম্যানুয়াল যাচাই)</span>
            </button>

            <button
              onClick={handleShowAllAnswers}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Show Answers</span>
            </button>

            <button
              onClick={handleReset}
              disabled={isAiChecking}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {isChecked && (
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-teal-50 dark:bg-teal-950/60 px-4 py-2.5 rounded-2xl border border-teal-300 dark:border-teal-800 self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Score:</span>
              <span className="text-base sm:text-lg font-black text-teal-700 dark:text-teal-300 font-mono">
                {score} <span className="text-xs text-slate-500 font-sans">/ 5</span>
              </span>
              {aiEvaluation?.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-teal-200 dark:bg-teal-900 text-[11px] font-black text-teal-950 dark:text-teal-100">
                  {aiEvaluation.grade}
                </span>
              )}
            </div>
          )}
        </div>

        {/* In-Page Responsive AI & Examiner Feedback Display */}
        {isChecked && aiEvaluation && (
          <div className="mt-8 space-y-6 animate-in fade-in">
            {/* View Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('aiFeedback')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'aiFeedback'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>AI Tutor Assessment & Feedback</span>
              </button>

              <button
                onClick={() => setActiveTab('modelSentences')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'modelSentences'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Model Correct Sentences</span>
              </button>
            </div>

            {activeTab === 'aiFeedback' && (
              <div className="space-y-6">
                {/* Examiner Assessment Header Card */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-500/10 border border-teal-300 dark:border-teal-800 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{aiEvaluation.provider || 'AI English Tutor Evaluation'}</span>
                          {aiEvaluation.aiPowered && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                              AI Powered
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500">Marks:</span>
                          <span className="text-xs sm:text-sm font-black text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-teal-200 dark:border-slate-700">
                            {score} / 5 ({Math.round((score / 5) * 100)}%)
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        "{aiEvaluation.overallFeedback}"
                      </p>
                    </div>
                  </div>

                  {/* Bangla Tips Card */}
                  {aiEvaluation.banglaTips && (
                    <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-start gap-2.5 sm:gap-3">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-0.5">
                          বাংলা টিপস ও কৌশল (Substitution Table Strategy):
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                          {aiEvaluation.banglaTips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Per-Sentence Breakdown Cards */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    <span>Per-Sentence Alignment Review:</span>
                  </h5>

                  <div className="grid grid-cols-1 gap-3">
                    {aiEvaluation.gapEvaluations?.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                          item.isCorrect
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.label}
                          </span>
                          {item.isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>+1.0 Mark</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>0.0 Mark</span>
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs sm:text-sm mb-2 break-words">
                          <div className="text-slate-600 dark:text-slate-400">
                            <strong>Your Sentence: </strong>
                            <span
                              className={
                                item.isCorrect
                                  ? 'text-emerald-800 dark:text-emerald-200 font-semibold'
                                  : 'text-rose-800 dark:text-rose-200 font-semibold line-through'
                              }
                            >
                              {item.studentAnswer}
                            </span>
                          </div>

                          {!item.isCorrect && (
                            <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                              <strong>Model Sentence: </strong>
                              {item.correctAnswer}
                            </div>
                          )}
                        </div>

                        {!item.isCorrect && item.whyIncorrect && (
                          <p className="text-xs text-rose-800 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-950/50 p-2 rounded-lg mb-2 leading-relaxed">
                            <strong>বিশ্লেষণ:</strong> {item.whyIncorrect}
                          </p>
                        )}

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.ruleExplanation || item.banglaRule}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                {aiEvaluation.studySuggestions && aiEvaluation.studySuggestions.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span>Study Recommendations for Substitution Tables:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {aiEvaluation.studySuggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'modelSentences' && (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>Model Correct Sentences & Bangla Meaning (সঠিক পূর্ণাঙ্গ বাক্য ও বাংলা অর্থ):</span>
                  </h4>
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800">
                    ৫টি সঠিক বাক্য
                  </span>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm font-medium">
                  {sentenceTranslations.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 break-words flex items-start gap-3 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1 flex-1 min-w-0">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {item.en}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">অর্থ:</span>
                          <span>{item.bn}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        score={score}
        maxScore={5}
        title={exercise.title}
        provider={aiEvaluation?.provider}
        feedbackText={
          aiEvaluation?.overallFeedback ||
          (score === 5
            ? 'Splendid! All five sentences are grammatically and syntactically flawless.'
            : score >= 3
            ? 'Good attempt! Make sure the subject matches the verb and object logically.'
            : 'Try again by carefully matching subject-verb-object relationships.')
        }
        banglaTips={
          aiEvaluation?.banglaTips ||
          'Subject ও Verb এর Number/Person সঠিকভাবে মিলিয়ে বাক্য গঠন করুন।'
        }
        onClose={() => setShowCelebration(false)}
        onRetry={handleReset}
      />
    </div>
  );
};

