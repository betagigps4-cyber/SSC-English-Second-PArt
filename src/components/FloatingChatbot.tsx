import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Lightbulb,
  Search,
  Languages,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Layers,
  HelpCircle,
  Play,
  Pause,
  SlidersHorizontal,
  Headphones,
  Share2,
  Eye,
  EyeOff,
  Undo2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SscSectionItem, WordLookupResult } from '../types';
import { speechService, AccentType, SpeechSpeed } from '../utils/speechUtils';
import {
  lookupSscWord,
  POPULAR_SSC_WORDS,
  ITEM_SUGGESTED_WORDS,
} from '../data/sscVocabulary';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  provider: 'gemini' | 'chatgpt';
}

interface FloatingChatbotProps {
  activeSection?: SscSectionItem | null;
  activeItemId?: number | null;
  isWidgetVisible?: boolean;
  onToggleWidgetVisibility?: (visible: boolean) => void;
  forcedOpenTab?: 'chat' | 'lookup' | null;
  onForcedOpenHandled?: () => void;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  activeSection,
  activeItemId,
  isWidgetVisible = true,
  onToggleWidgetVisibility,
  forcedOpenTab = null,
  onForcedOpenHandled,
}) => {
  // Modal visibility and state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'lookup'>('chat');
  const [showHiddenToast, setShowHiddenToast] = useState<boolean>(false);

  // Handle external forced tab open request (from header buttons)
  useEffect(() => {
    if (forcedOpenTab) {
      setActiveTab(forcedOpenTab);
      setIsOpen(true);
      setIsMinimized(false);
      if (!isWidgetVisible && onToggleWidgetVisibility) {
        onToggleWidgetVisibility(true);
      }
      onForcedOpenHandled?.();
    }
  }, [forcedOpenTab]);

  // AI Chat states
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'chatgpt'>('gemini');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeechPaused, setIsSpeechPaused] = useState<boolean>(false);
  const [showAudioSettings, setShowAudioSettings] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Word Lookup states
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [isLookupLoading, setIsLookupLoading] = useState<boolean>(false);
  const [currentWordResult, setCurrentWordResult] = useState<WordLookupResult | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [accent, setAccent] = useState<AccentType>('en-GB');
  const [speechRate, setSpeechRate] = useState<SpeechSpeed>(1.0);
  const [autoSpeakOnSearch, setAutoSpeakOnSearch] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ssc_lookup_autospeak');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [recentLookups, setRecentLookups] = useState<string[]>([
    'Perseverance',
    'Indispensable',
    'Contaminate',
    'Deforestation',
  ]);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [copiedWord, setCopiedWord] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lookupInputRef = useRef<HTMLInputElement>(null);

  const toggleAutoSpeak = () => {
    setAutoSpeakOnSearch((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ssc_lookup_autospeak', String(next));
      } catch (err) {
        console.error('Failed to save auto-speak state', err);
      }
      return next;
    });
  };

  // Initialize greeting or welcome message based on active context
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: Message = {
        id: 'init-1',
        role: 'assistant',
        content: activeSection
          ? `👋 **Hello!** I am your **AI English Tutor** (powered by **Gemini 3.7 & ChatGPT**).
I see you are currently practicing **Item ${activeSection.itemNumber}: ${activeSection.nameEn} (${activeSection.nameBn})**.

Ask me any specific grammar rules, formula breakdowns, board exam exceptions, or standard writing formats in **English, বাংলা, or Banglish**! You can also use the **Word Lookup (শব্দকোষ)** tab to check word meanings & pronunciations.`
          : `👋 **Welcome to SSC English AI Tutor!** (Powered by **Gemini 3.7 & ChatGPT**).
Ask me any question about the **12 SSC English 2nd Paper items** — from Right Form of Verbs, Tag Questions, Voice & Sentence Changes to Paragraphs, Applications, and Compositions! Switch to **Word Lookup** anytime for syllabus vocabulary.`,
        timestamp: new Date(),
        provider: selectedProvider,
      };
      setMessages([initialGreeting]);
    }
  }, [activeSection]);

  // Default word lookup upon opening lookup tab if none selected
  useEffect(() => {
    if (activeTab === 'lookup' && !currentWordResult) {
      const defaultWord = activeItemId && ITEM_SUGGESTED_WORDS[activeItemId]?.[0]
        ? ITEM_SUGGESTED_WORDS[activeItemId][0]
        : 'Perseverance';
      handlePerformLookup(defaultWord);
    }
  }, [activeTab]);

  // Scroll to bottom on new message in chat
  useEffect(() => {
    if (isOpen && !isMinimized && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, activeTab]);

  // Handle Speech State change
  useEffect(() => {
    const unsubscribe = speechService.subscribe((speaking, paused) => {
      if (!speaking) {
        setSpeakingId(null);
        setIsSpeechPaused(false);
      } else {
        setIsSpeechPaused(paused);
      }
    });
    return () => unsubscribe();
  }, []);

  // Quick preset chips depending on active item
  const getContextChips = () => {
    if (!activeItemId) {
      return [
        'Right Form of Verbs er top 5 rules bolo',
        'Simple, Complex & Compound er conversion chart',
        'Tag questions er exceptions (Let\'s vs Let him)',
        'Formal Application to Principal format',
      ];
    }

    switch (activeItemId) {
      case 1:
        return [
          'How to identify parts of speech for blank gaps?',
          'Rules for Preposition + (Verb+ing)',
          'Top 10 clues used in SSC board exams',
        ];
      case 2:
        return [
          'Subject-Verb-Predicate alignment rules',
          'How to make 5 meaningful sentences from table?',
          'Grammatical agreement rules in table',
        ];
      case 3:
        return [
          'Rules for "as if / as though / wish"',
          'Rules for "with a view to / look forward to"',
          '"Lest... should" rule explanation',
          'Passive voice in Right Form of Verbs',
        ];
      case 4:
        return [
          'Simple ⇄ Complex ⇄ Compound formula chart',
          'Active to Passive Voice transformation rules',
          'Affirmative to Negative (Only, Must, Every)',
          'Positive ⇄ Comparative ⇄ Superlative degree',
        ];
      case 5:
        return [
          'Rules for "Let\'s" vs "Let us/him/them"',
          'Tags for "Everybody", "Nobody", "Neither", "None"',
          'Imperative sentences tag rules (Order vs Request)',
          'Negative adverbs (hardly, seldom, rarely, little)',
        ];
      case 6:
        return [
          'Opposite Prefixes (un-, in-, dis-, mis-, non-)',
          'Suffixes to make Nouns (-tion, -ment, -ness)',
          'Suffixes to make Adjectives (-ful, -less, -able)',
        ];
      case 7:
        return [
          'Prepositions after die (of, from, for, by)',
          'Rules for senior to, junior to, superior to',
          'Abide by, prevent from, congratulate on rules',
        ];
      case 8:
        return [
          'Connectors for adding ideas (Moreover, Furthermore)',
          'Contrast connectors (However, On the other hand)',
          'Cause & effect connectors (Therefore, Consequently)',
        ];
      case 9:
        return [
          'Rules for Direct Speech quotation marks ("...")',
          'Capitalization golden rules for SSC',
          'Correct usage of Apostrophe (\')',
        ];
      case 10:
        return [
          'Standard SSC 3-tier Paragraph structure',
          'How to write in a single paragraph without breaking',
          'High-scoring transition connectors for paragraphs',
        ];
      case 11:
        return [
          'Application to Principal standard SSC format',
          'Standard E-mail layout (Subject, Salutation, Body)',
          'Formal vs Informal letter differences',
        ];
      case 12:
        return [
          '4-step Short Composition outline & format',
          'Introduction & Conclusion writing formulas',
          'High-scoring idioms and connectors for composition',
        ];
      default:
        return [
          'Right Form of Verbs golden rules',
          'Voice Change rules',
          'Formal Application format',
        ];
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
      provider: selectedProvider,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          itemContext: activeSection
            ? {
                itemNumber: activeSection.itemNumber,
                nameEn: activeSection.nameEn,
                nameBn: activeSection.nameBn,
                part: activeSection.part,
                partName: activeSection.partName,
              }
            : null,
          provider: selectedProvider,
        }),
      });

      const data = await response.json();
      const botMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I am ready to help you with SSC English 2nd Paper!',
        timestamp: new Date(),
        provider: data.provider || selectedProvider,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Could not reach AI server. Please check your internet connection or try asking again.`,
        timestamp: new Date(),
        provider: selectedProvider,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Perform Word Lookup (via local curated dictionary + server API for arbitrary words)
  const handlePerformLookup = async (wordToSearch: string, triggerSpeech = autoSpeakOnSearch) => {
    const query = wordToSearch.trim();
    if (!query) return;

    setIsLookupLoading(true);
    setLookupError(null);
    setLookupQuery(query);

    // 1. First check instant offline curated dictionary
    const localMatch = lookupSscWord(query);
    if (localMatch) {
      setCurrentWordResult(localMatch);
      addToRecentLookups(localMatch.word);
      setIsLookupLoading(false);
      if (triggerSpeech) {
        handleSpeakAudio(localMatch.word, `word-${localMatch.word}`, speechRate, accent);
      }
      return;
    }

    // 2. Query the server word-lookup endpoint
    try {
      const response = await fetch('/api/word-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: query,
          itemContext: activeSection
            ? {
                itemNumber: activeSection.itemNumber,
                nameEn: activeSection.nameEn,
                nameBn: activeSection.nameBn,
              }
            : null,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setCurrentWordResult(json.data);
        addToRecentLookups(json.data.word || query);
        if (triggerSpeech) {
          handleSpeakAudio(json.data.word || query, `word-${json.data.word || query}`, speechRate, accent);
        }
      } else {
        throw new Error('Word data not found');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      // Fallback local synthetic entry
      const fallback: WordLookupResult = {
        word: query.charAt(0).toUpperCase() + query.slice(1),
        phonetic: `/${query.toLowerCase()}/`,
        partOfSpeech: 'Word',
        meaningBn: `"${query}" শব্দের সাধারণ অর্থ ও বোর্ড পরীক্ষার প্রয়োগ।`,
        meaningEn: `Syllabus vocabulary word for SSC English practice.`,
        sscContext: `Relevant for SSC English 2nd Paper reading comprehension and grammar practice.`,
        exampleSentence: `Understanding the meaning and application of "${query}" helps improve your score.`,
        exampleSentenceBn: `"${query}" শব্দের সঠিক অর্থ ও প্রয়োগ জানা আপনার পরীক্ষায় ভালো নম্বরে সহায়ক।`,
        derivatives: [],
        synonyms: [],
        antonyms: [],
        collocations: [],
        relatedSscItems: ['Item 1: Gap Filling', 'Item 6: Suffixes and Prefixes'],
      };
      setCurrentWordResult(fallback);
      addToRecentLookups(fallback.word);
      if (triggerSpeech) {
        handleSpeakAudio(fallback.word, `word-${fallback.word}`, speechRate, accent);
      }
    } finally {
      setIsLookupLoading(false);
    }
  };

  const addToRecentLookups = (word: string) => {
    setRecentLookups((prev) => {
      const filtered = prev.filter((w) => w.toLowerCase() !== word.toLowerCase());
      return [word, ...filtered].slice(0, 8);
    });
  };

  const toggleSaveWord = (word: string) => {
    setSavedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyWordCard = () => {
    if (!currentWordResult) return;
    const text = `📖 SSC Word: ${currentWordResult.word} (${currentWordResult.partOfSpeech})
Pronunciation: ${currentWordResult.phonetic}
বাংলা অর্থ: ${currentWordResult.meaningBn}
Definition: ${currentWordResult.meaningEn}
SSC Context: ${currentWordResult.sscContext}
Example: ${currentWordResult.exampleSentence} (${currentWordResult.exampleSentenceBn})
Synonyms: ${currentWordResult.synonyms?.join(', ')}
Antonyms: ${currentWordResult.antonyms?.join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopiedWord(true);
    setTimeout(() => setCopiedWord(false), 2000);
  };

  const handleSpeakAudio = (
    textToSpeak: string,
    id: string,
    speed: SpeechSpeed = speechRate,
    accentToUse: AccentType = accent
  ) => {
    if (speakingId === id) {
      if (isSpeechPaused) {
        speechService.resume();
      } else {
        speechService.stop();
        setSpeakingId(null);
      }
    } else {
      setSpeakingId(id);
      setIsSpeechPaused(false);

      // Clean text for natural, fluent SpeechSynthesis in English
      const cleanText = textToSpeak
        .replace(/###/g, '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .replace(/\|/g, ' ')
        .replace(/\[([a-z0-9]+)\]/gi, ' gap $1 ')
        .replace(/->|→/g, ' becomes ')
        .replace(/=>|⇒/g, ' transforms to ')
        .replace(/[-*•]\s+/g, '. ')
        .replace(/[\u0980-\u09FF]+/g, ' ') // Strip Bengali characters so English TTS voice reads cleanly
        .replace(/\s+/g, ' ')
        .trim();

      speechService.speakText({
        text: cleanText || textToSpeak,
        accent: accentToUse,
        rate: speed,
        onEnd: () => {
          setSpeakingId(null);
          setIsSpeechPaused(false);
        },
        onError: () => {
          setSpeakingId(null);
          setIsSpeechPaused(false);
        },
      });
    }
  };

  const handlePauseResumeSpeech = () => {
    if (isSpeechPaused) {
      speechService.resume();
    } else {
      speechService.pause();
    }
  };

  const handleStopSpeech = () => {
    speechService.stop();
    setSpeakingId(null);
    setIsSpeechPaused(false);
  };

  const handleClearHistory = () => {
    speechService.stop();
    setSpeakingId(null);
    const resetGreeting: Message = {
      id: `init-${Date.now()}`,
      role: 'assistant',
      content: `Chat history cleared. What topic or grammar rule would you like to explore now?`,
      timestamp: new Date(),
      provider: selectedProvider,
    };
    setMessages([resetGreeting]);
  };

  const handleAskAITutorAboutWord = (word: string) => {
    setActiveTab('chat');
    handleSendMessage(`Explain the grammatical rules, suffix/prefix variations, and SSC board exam questions for the word "${word}".`);
  };

  // Helper to render markdown-like formatted text with high readability
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-extrabold text-emerald-950 dark:text-emerald-300 text-sm sm:text-base mt-2 mb-1 flex items-center gap-1.5">
                <span>{line.replace('### ', '')}</span>
              </h4>
            );
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <p key={idx} className="font-bold text-slate-900 dark:text-slate-100 mt-1">
                {line.replace(/\*\*/g, '')}
              </p>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            const itemText = line.replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {renderInlineFormatting(itemText)}
                </span>
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const num = line.match(/^(\d+\.)\s/)?.[1];
            const rest = line.replace(/^\d+\.\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 min-w-[20px]">{num}</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {renderInlineFormatting(rest)}
                </span>
              </div>
            );
          }
          if (line.startsWith('```') || line.endsWith('```')) {
            return null;
          }
          if (line.trim() === '') {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="text-slate-800 dark:text-slate-200">
              {renderInlineFormatting(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-emerald-950 dark:text-emerald-200">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-slate-700 dark:text-slate-300">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-mono text-xs font-semibold">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const activeSuggestedWords = activeItemId && ITEM_SUGGESTED_WORDS[activeItemId]
    ? ITEM_SUGGESTED_WORDS[activeItemId]
    : POPULAR_SSC_WORDS.slice(0, 8);

  return (
    <>
      {/* Toast Notification when hidden */}
      <AnimatePresence>
        {showHiddenToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-4 sm:right-6 z-50 bg-slate-950/95 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-amber-400/40 max-w-sm backdrop-blur-lg"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <EyeOff className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <p className="font-extrabold text-slate-100">AI Tutor & শব্দকোষ হাইড করা হয়েছে</p>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  ওপরের Header-এর <strong>"AI বাটন: Hidden (দেখান)"</strong> বা স্ক্রিনের নিচে রাখা বোতাম থেকে যেকোনো সময় আবার দৃশ্যমান করতে পারবেন।
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onToggleWidgetVisibility) onToggleWidgetVisibility(true);
                      setShowHiddenToast(false);
                      setIsOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                  >
                    <Undo2 className="w-3 h-3" />
                    <span>পুনরায় দেখান (Undo)</span>
                  </button>
                  <button
                    onClick={() => setShowHiddenToast(false)}
                    className="px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition"
                  >
                    ঠিক আছে
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Floating Trigger Button (FAB) when isWidgetVisible === true */}
      {isWidgetVisible ? (
        <div className="fixed bottom-6 right-6 z-50">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                className="relative group"
              >
                {/* Pulsing halo */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none" />

                {/* Direct quick Hide button in the corner of FAB */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleWidgetVisibility) onToggleWidgetVisibility(false);
                    setShowHiddenToast(true);
                    setTimeout(() => setShowHiddenToast(false), 6000);
                  }}
                  title="হাইড করুন / লুকান (Hide AI Tutor)"
                  className="absolute -top-2 -left-2 w-6 h-6 bg-slate-900 text-slate-300 hover:text-white hover:bg-rose-600 rounded-full flex items-center justify-center border border-white/40 shadow-lg transition-all scale-90 hover:scale-110 z-10"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                </button>

                <button
                  id="floating-ai-tutor-fab"
                  onClick={() => {
                    setIsOpen(true);
                    setIsMinimized(false);
                  }}
                  className="relative flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
                  aria-label="Open SSC English AI Chatbot & Word Lookup"
                >
                  <div className="relative">
                    <Bot className="w-6 h-6 text-amber-300" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-extrabold tracking-wide uppercase flex items-center gap-1 text-amber-200">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Tutor & Word Lookup</span>
                    </div>
                    <div className="text-[11px] font-medium text-emerald-100">
                      {activeSection ? `Item ${activeSection.itemNumber}: ${activeSection.nameEn}` : 'Meaning, Pronunciation & Rules'}
                    </div>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Discreet Mini Floating Restore Button when hidden */
        <div className="fixed bottom-4 right-4 z-40">
          <motion.button
            id="floating-restore-ai-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              if (onToggleWidgetVisibility) onToggleWidgetVisibility(true);
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-emerald-700 text-white text-xs font-bold shadow-xl border border-slate-700 hover:border-emerald-400 backdrop-blur-md transition-all hover:scale-105 group"
            title="AI Tutor ও শব্দকোষ দৃশ্যমান করতে ক্লিক করুন"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Tutor & শব্দকোষ (দেখান)</span>
            <span className="sm:hidden">AI Tutor</span>
            <Eye className="w-3.5 h-3.5 text-emerald-300" />
          </motion.button>
        </div>
      )}

      {/* 2. Floating Chatbot Interactive Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '620px',
            }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[95vw] sm:w-[440px] md:w-[480px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 max-h-[88vh]`}
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.2)' }}
          >
            {/* Main Header */}
            <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md relative">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  {activeTab === 'chat' ? (
                    <Bot className="w-6 h-6 text-amber-300" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-amber-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                      {activeTab === 'chat' ? 'SSC English AI Tutor' : 'SSC Word Lookup & Pronunciation'}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
                      2026
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-100 line-clamp-1">
                    {activeSection ? `Active Topic: Item ${activeSection.itemNumber} (${activeSection.nameEn})` : 'Grammar rules, writing guidance & syllabus vocabulary'}
                  </p>
                </div>
              </div>

              {/* Window Controls: Clear, Hide, Minimize, Close */}
              <div className="flex items-center gap-1 text-white/80">
                {activeTab === 'chat' && (
                  <button
                    onClick={handleClearHistory}
                    title="Clear chat history"
                    className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                {/* Explicit Hide Button in Header */}
                <button
                  onClick={() => {
                    speechService.stop();
                    setIsOpen(false);
                    if (onToggleWidgetVisibility) onToggleWidgetVisibility(false);
                    setShowHiddenToast(true);
                    setTimeout(() => setShowHiddenToast(false), 6000);
                  }}
                  title="হাইড / লুকিয়ে রাখুন (Hide Widget)"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-amber-300 hover:text-white transition"
                >
                  <EyeOff className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    speechService.stop();
                    setIsOpen(false);
                  }}
                  title="Close window"
                  className="p-1.5 rounded-lg hover:bg-red-500/80 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-header Navigation Tabs */}
            {!isMinimized && (
              <>
                <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/80 p-1 gap-1">
                  <button
                    id="tab-ai-tutor"
                    onClick={() => setActiveTab('chat')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'chat'
                        ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-200/60 dark:border-emerald-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>AI Tutor (প্রশ্নোত্তর)</span>
                  </button>

                  <button
                    id="tab-word-lookup"
                    onClick={() => setActiveTab('lookup')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'lookup'
                        ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-200/60 dark:border-indigo-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <div className="flex items-center gap-1">
                      <span>Word Lookup (শব্দকোষ)</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    </div>
                  </button>
                </div>

                {/* Active Context Banner */}
                {activeSection && (
                  <div className="bg-emerald-50/80 dark:bg-emerald-950/40 px-3.5 py-1.5 border-b border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-200 font-bold truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="truncate">
                        Item {activeSection.itemNumber}: {activeSection.nameEn} ({activeSection.marksText})
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-200 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-100 px-2 py-0.5 rounded font-extrabold shrink-0">
                      Part {activeSection.part}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* TAB CONTENT 1: AI CHAT TUTOR */}
            {!isMinimized && activeTab === 'chat' && (
              <>
                {/* AI Provider Switcher (Gemini vs ChatGPT) & Speech Synthesis Bar */}
                <div className="bg-slate-50 dark:bg-slate-850 p-1.5 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1.5">
                      Engine:
                    </span>
                    <button
                      onClick={() => setSelectedProvider('gemini')}
                      className={`flex-1 py-1 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-xs ${
                        selectedProvider === 'gemini'
                          ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-200 dark:border-emerald-800'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span>Gemini 3.7 (NCTB)</span>
                    </button>

                    <button
                      onClick={() => setSelectedProvider('chatgpt')}
                      className={`flex-1 py-1 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-xs ${
                        selectedProvider === 'chatgpt'
                          ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-200 dark:border-indigo-800'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Bot className="w-3 h-3 text-indigo-500" />
                      <span>ChatGPT Tutor</span>
                    </button>

                    {/* Audio Settings Toggle */}
                    <button
                      onClick={() => setShowAudioSettings(!showAudioSettings)}
                      title="SpeechSynthesis Voice & Speed Settings"
                      className={`p-1.5 rounded-xl border flex items-center gap-1 transition ${
                        showAudioSettings || speakingId
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden sm:inline">Voice</span>
                    </button>
                  </div>

                  {/* Expandable SpeechSynthesis Voice & Speed Bar */}
                  {showAudioSettings && (
                    <div className="bg-emerald-50/80 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300">Accent:</span>
                        <button
                          onClick={() => setAccent('en-GB')}
                          className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                            accent === 'en-GB'
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          🇬🇧 UK
                        </button>
                        <button
                          onClick={() => setAccent('en-US')}
                          className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                            accent === 'en-US'
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          🇺🇸 US
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300">Speed:</span>
                        {[0.75, 1.0, 1.25].map((rateVal) => (
                          <button
                            key={rateVal}
                            onClick={() => setSpeechRate(rateVal as SpeechSpeed)}
                            className={`px-1.5 py-0.5 rounded-lg font-semibold transition ${
                              speechRate === rateVal
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {rateVal}x
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active Speech Playing Live Status Bar */}
                  {speakingId && (
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-3 py-1.5 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0ms] h-2" />
                          <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:150ms] h-3" />
                          <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:300ms] h-2.5" />
                        </div>
                        <span className="text-[11px] font-bold">
                          {isSpeechPaused ? 'Speech Paused' : `Reading aloud (${accent === 'en-GB' ? 'UK' : 'US'}, ${speechRate}x)...`}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handlePauseResumeSpeech}
                          className="px-2 py-0.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[10px] flex items-center gap-1 transition"
                        >
                          {isSpeechPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                          <span>{isSpeechPaused ? 'Resume' : 'Pause'}</span>
                        </button>
                        <button
                          onClick={handleStopSpeech}
                          className="px-2 py-0.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-bold text-[10px] flex items-center gap-1 transition"
                        >
                          <VolumeX className="w-3 h-3" />
                          <span>Stop</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {/* Avatar / Role Title */}
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        {msg.role === 'assistant' ? (
                          <>
                            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                              {msg.provider === 'gemini' ? 'G' : 'AI'}
                            </div>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                              {msg.provider === 'gemini' ? 'Gemini 3.7 Board AI' : 'ChatGPT Tutor'}
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                            Student (আপনি)
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl p-3 sm:p-3.5 max-w-[90%] sm:max-w-[85%] shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-br-none'
                            : speakingId === msg.id
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-2 border-emerald-500 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-md ring-2 ring-emerald-500/20'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          renderFormattedText(msg.content)
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>

                      {/* Assistant Actions Bar (TTS Listen & Copy) */}
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mt-1.5 px-1 text-slate-400 dark:text-slate-500">
                          <button
                            onClick={() => handleSpeakAudio(msg.content, msg.id)}
                            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold transition ${
                              speakingId === msg.id
                                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                            }`}
                            title="Listen to AI feedback in English via SpeechSynthesis"
                          >
                            {speakingId === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span>Stop Reading (থামুন)</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Listen (শুনুন)</span>
                              </>
                            )}
                          </button>

                          {speakingId === msg.id && (
                            <button
                              onClick={handlePauseResumeSpeech}
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-bold"
                            >
                              {isSpeechPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                              <span>{isSpeechPaused ? 'Resume' : 'Pause'}</span>
                            </button>
                          )}

                          <span>•</span>

                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="flex items-center gap-1 text-[11px] font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                        <Bot className="w-4 h-4 animate-bounce" />
                      </div>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {selectedProvider === 'gemini' ? 'Gemini 3.7 is analyzing rules...' : 'ChatGPT is preparing explanation...'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Topic Prompts (Chips) */}
                <div className="px-3 py-2 bg-slate-100/70 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1 mb-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    <span>Quick Questions for this Item:</span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {getContextChips().map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip)}
                        className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-300 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition shrink-0 shadow-xs"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input Bar */}
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={
                        activeSection
                          ? `Ask about Item ${activeSection.itemNumber} (${activeSection.nameEn})...`
                          : 'Ask any SSC grammar rule or format...'
                      }
                      disabled={isLoading}
                      className="flex-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold transition shadow-md hover:shadow-emerald-500/20 active:scale-95 shrink-0"
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* TAB CONTENT 2: WORD LOOKUP & PRONUNCIATION */}
            {!isMinimized && activeTab === 'lookup' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/60 dark:bg-slate-950/40">
                {/* Search Bar & Accent Controls */}
                <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2.5 shadow-2xs">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePerformLookup(lookupQuery);
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      <input
                        ref={lookupInputRef}
                        type="text"
                        value={lookupQuery}
                        onChange={(e) => setLookupQuery(e.target.value)}
                        placeholder="Type any English word (e.g. Perseverance, Indispensable)..."
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-16 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {lookupQuery.trim() && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSpeakAudio(lookupQuery.trim(), `query-${lookupQuery.trim()}`, speechRate, accent)
                            }
                            className={`p-1 rounded-lg text-xs transition ${
                              speakingId === `query-${lookupQuery.trim()}`
                                ? 'bg-emerald-600 text-white animate-pulse'
                                : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700'
                            }`}
                            title="Speak typed word"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {lookupQuery && (
                          <button
                            type="button"
                            onClick={() => setLookupQuery('')}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                            title="Clear search"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!lookupQuery.trim() || isLookupLoading}
                      className="px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition shadow-md flex items-center gap-1.5 shrink-0 active:scale-95"
                    >
                      {isLookupLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Search className="w-3.5 h-3.5" />
                          <span>Search</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Accent, Speed & Auto-Speak Controls Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-0.5">
                    {/* Voice Accent & Speed */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <Languages className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="hidden sm:inline">Accent:</span>
                        <button
                          type="button"
                          onClick={() => setAccent('en-GB')}
                          className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
                            accent === 'en-GB'
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-400 shadow-2xs'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                          title="British UK Pronunciation"
                        >
                          🇬🇧 UK
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccent('en-US')}
                          className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
                            accent === 'en-US'
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-400 shadow-2xs'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                          title="American US Pronunciation"
                        >
                          🇺🇸 US
                        </button>
                      </div>

                      {/* Speed */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="text-slate-400">|</span>
                        <span>Speed:</span>
                        {[
                          { val: 1.0, label: '1.0x' },
                          { val: 0.75, label: '0.75x' },
                          { val: 0.5, label: '0.5x' },
                        ].map((sp) => (
                          <button
                            key={sp.val}
                            type="button"
                            onClick={() => setSpeechRate(sp.val as SpeechSpeed)}
                            className={`px-1.5 py-0.5 rounded font-bold text-[10px] transition ${
                              speechRate === sp.val
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold ring-1 ring-emerald-400'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            {sp.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Auto-Speak Toggle & Copy Info */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleAutoSpeak}
                        className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition ${
                          autoSpeakOnSearch
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                        title={
                          autoSpeakOnSearch
                            ? 'Auto-Speak on search is enabled (Click to turn off)'
                            : 'Auto-Speak on search is disabled (Click to turn on)'
                        }
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${autoSpeakOnSearch ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
                        <span>Auto-Speak: {autoSpeakOnSearch ? 'ON' : 'OFF'}</span>
                      </button>

                      {currentWordResult && (
                        <button
                          onClick={handleCopyWordCard}
                          className="text-[11px] text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-semibold"
                        >
                          {copiedWord ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Copy Info</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Word Suggestion Chips */}
                <div className="px-3 py-1.5 bg-slate-100/80 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                      {activeItemId ? `Item ${activeItemId} Words:` : 'Top SSC Words:'}
                    </span>
                    {activeSuggestedWords.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePerformLookup(word)}
                        className={`whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-semibold border transition shrink-0 shadow-2xs ${
                          currentWordResult?.word.toLowerCase() === word.toLowerCase()
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600'
                        }`}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5">
                  {currentWordResult ? (
                    <motion.div
                      key={currentWordResult.word}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {/* Main Word Card Header */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-sky-50/80 dark:from-slate-850 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-sm relative">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                {currentWordResult.word}
                              </h2>
                              <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-700">
                                {currentWordResult.partOfSpeech}
                              </span>
                              {speakingId === `word-${currentWordResult.word}` && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-extrabold animate-pulse border border-emerald-300 dark:border-emerald-700">
                                  <Volume2 className="w-3 h-3 text-emerald-600" />
                                  <span>Speaking {accent === 'en-GB' ? 'UK' : 'US'}...</span>
                                </span>
                              )}
                            </div>

                            {/* Phonetics & IPA */}
                            <div className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-0.5 flex items-center gap-2">
                              <span>{currentWordResult.phonetic}</span>
                              {currentWordResult.syllables && (
                                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-sans font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">
                                  {currentWordResult.syllables}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Audio Speech Controls */}
                          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                            {/* Standard Speed Speak */}
                            <button
                              id={`speak-word-${currentWordResult.word}`}
                              onClick={() =>
                                handleSpeakAudio(
                                  currentWordResult.word,
                                  `word-${currentWordResult.word}`,
                                  speechRate,
                                  accent
                                )
                              }
                              className={`p-2.5 rounded-2xl flex items-center gap-1.5 transition shadow-sm font-bold text-xs ${
                                speakingId === `word-${currentWordResult.word}`
                                  ? 'bg-emerald-600 text-white animate-pulse'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95'
                              }`}
                              title={`Listen to pronunciation (${accent === 'en-GB' ? 'British UK' : 'American US'}, ${speechRate}x)`}
                            >
                              {speakingId === `word-${currentWordResult.word}` ? (
                                <>
                                  <VolumeX className="w-4 h-4" />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-4 h-4" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>

                            {/* Slow Speech Button (0.75x) */}
                            <button
                              onClick={() =>
                                handleSpeakAudio(
                                  currentWordResult.word,
                                  `slow-${currentWordResult.word}`,
                                  0.75,
                                  accent
                                )
                              }
                              className={`px-2 py-2 rounded-2xl text-[11px] font-bold transition ${
                                speakingId === `slow-${currentWordResult.word}`
                                  ? 'bg-emerald-600 text-white animate-pulse'
                                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                              title="Listen slowly (0.75x)"
                            >
                              0.75x
                            </button>

                            {/* Extra Slow (0.5x) */}
                            <button
                              onClick={() =>
                                handleSpeakAudio(
                                  currentWordResult.word,
                                  `slowest-${currentWordResult.word}`,
                                  0.5,
                                  accent
                                )
                              }
                              className={`px-2 py-2 rounded-2xl text-[11px] font-bold transition hidden sm:inline-block ${
                                speakingId === `slowest-${currentWordResult.word}`
                                  ? 'bg-emerald-600 text-white animate-pulse'
                                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                              title="Listen extra slow (0.5x)"
                            >
                              0.5x
                            </button>

                            {/* Bookmark word */}
                            <button
                              onClick={() => toggleSaveWord(currentWordResult.word)}
                              className="p-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-amber-500 transition"
                              title="Bookmark word"
                            >
                              {savedWords.includes(currentWordResult.word) ? (
                                <BookmarkCheck className="w-4 h-4 text-amber-500" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Bengali Meaning (বাংলা অর্থ) */}
                        <div className="mt-3 pt-3 border-t border-indigo-100/80 dark:border-slate-800">
                          <div className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-700 dark:text-indigo-400 mb-0.5">
                            বাংলা অর্থ (Bengali Meaning):
                          </div>
                          <p className="text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-300">
                            {currentWordResult.meaningBn}
                          </p>
                        </div>

                        {/* English Meaning */}
                        <div className="mt-2">
                          <div className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 mb-0.5">
                            English Definition:
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {currentWordResult.meaningEn}
                          </p>
                        </div>
                      </div>

                      {/* SSC Syllabus Relevance & Exam Context */}
                      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
                        <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-extrabold text-xs mb-1">
                          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>SSC Exam Context & Board Relevance:</span>
                        </div>
                        <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                          {currentWordResult.sscContext}
                        </p>

                        {currentWordResult.relatedSscItems && currentWordResult.relatedSscItems.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap mt-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/30">
                            <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400">Tested In:</span>
                            {currentWordResult.relatedSscItems.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-amber-200/70 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 text-[10px] font-bold"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Item 6 Suffix & Prefix Derivatives (Morphological Family) with Audio Pronounce */}
                      {currentWordResult.derivatives && currentWordResult.derivatives.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                              <span>Suffix/Prefix Family (Item 6):</span>
                            </div>
                            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                              Click word to lookup • 🔊 to pronounce
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currentWordResult.derivatives.map((deriv, idx) => (
                              <div
                                key={idx}
                                className="p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/60 border border-purple-100 dark:border-purple-900/50 transition flex items-center justify-between group"
                              >
                                <button
                                  type="button"
                                  onClick={() => handlePerformLookup(deriv.form)}
                                  className="text-left flex-1 mr-1.5 focus:outline-none"
                                >
                                  <div className="text-xs font-bold text-purple-950 dark:text-purple-200 group-hover:text-purple-700">
                                    {deriv.form}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {deriv.meaningBn || deriv.partOfSpeech}
                                  </div>
                                </button>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeakAudio(deriv.form, `deriv-${deriv.form}`, speechRate, accent);
                                    }}
                                    className={`p-1.5 rounded-lg text-[10px] transition ${
                                      speakingId === `deriv-${deriv.form}`
                                        ? 'bg-purple-600 text-white animate-pulse'
                                        : 'text-purple-600 hover:bg-purple-200/70 dark:hover:bg-purple-900/60'
                                    }`}
                                    title={`Pronounce "${deriv.form}"`}
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white dark:bg-slate-800 text-purple-800 dark:text-purple-300 border border-purple-200/50">
                                    {deriv.partOfSpeech}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Example Sentence with Audio */}
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Model SSC Sentence:
                          </span>
                          <button
                            onClick={() =>
                              handleSpeakAudio(
                                currentWordResult.exampleSentence,
                                `sent-${currentWordResult.word}`,
                                1.0,
                                accent
                              )
                            }
                            className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg transition ${
                              speakingId === `sent-${currentWordResult.word}`
                                ? 'bg-emerald-600 text-white animate-pulse'
                                : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{speakingId === `sent-${currentWordResult.word}` ? 'Playing Sentence...' : 'Play Sentence'}</span>
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                          "{currentWordResult.exampleSentence}"
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                          "{currentWordResult.exampleSentenceBn}"
                        </p>
                      </div>

                      {/* Synonyms & Antonyms with Quick Pronunciation */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Synonyms */}
                        <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                          <div className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Synonyms (সমার্থক):</span>
                            <span className="text-[9px] text-emerald-600 font-normal">Click word to lookup • 🔊 listen</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {currentWordResult.synonyms && currentWordResult.synonyms.length > 0 ? (
                              currentWordResult.synonyms.map((syn, idx) => (
                                <div
                                  key={idx}
                                  className="inline-flex items-center rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 overflow-hidden text-[11px] shadow-2xs"
                                >
                                  <button
                                    type="button"
                                    onClick={() => handlePerformLookup(syn)}
                                    className="px-2 py-0.5 text-emerald-900 dark:text-emerald-200 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950 transition"
                                  >
                                    {syn}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeakAudio(syn, `syn-${syn}`, speechRate, accent);
                                    }}
                                    className={`px-1 py-0.5 border-l border-emerald-200 dark:border-emerald-800 transition ${
                                      speakingId === `syn-${syn}`
                                        ? 'bg-emerald-600 text-white animate-pulse'
                                        : 'text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900'
                                    }`}
                                    title={`Pronounce "${syn}"`}
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400">N/A</span>
                            )}
                          </div>
                        </div>

                        {/* Antonyms */}
                        <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
                          <div className="text-[10px] font-extrabold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Antonyms (বিপরীত):</span>
                            <span className="text-[9px] text-rose-600 font-normal">Click word to lookup • 🔊 listen</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {currentWordResult.antonyms && currentWordResult.antonyms.length > 0 ? (
                              currentWordResult.antonyms.map((ant, idx) => (
                                <div
                                  key={idx}
                                  className="inline-flex items-center rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 overflow-hidden text-[11px] shadow-2xs"
                                >
                                  <button
                                    type="button"
                                    onClick={() => handlePerformLookup(ant)}
                                    className="px-2 py-0.5 text-rose-900 dark:text-rose-200 font-medium hover:bg-rose-50 dark:hover:bg-rose-950 transition"
                                  >
                                    {ant}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeakAudio(ant, `ant-${ant}`, speechRate, accent);
                                    }}
                                    className={`px-1 py-0.5 border-l border-rose-200 dark:border-rose-800 transition ${
                                      speakingId === `ant-${ant}`
                                        ? 'bg-rose-600 text-white animate-pulse'
                                        : 'text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900'
                                    }`}
                                    title={`Pronounce "${ant}"`}
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400">N/A</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Bar: Ask AI Tutor about this word */}
                      <button
                        onClick={() => handleAskAITutorAboutWord(currentWordResult.word)}
                        className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Ask AI Tutor for deeper rules & board exercises on "{currentWordResult.word}"</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                          Type a word to look up
                        </h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                          Get Bangla meaning, phonetic pronunciation with UK/US audio, and SSC syllabus context.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Recent Searches Bar with Audio Speaker */}
                  {recentLookups.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center justify-between">
                        <span>Recently Searched Words:</span>
                        <span className="text-[10px] text-indigo-500 font-normal">Click to re-pronounce & view</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {recentLookups.map((w, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePerformLookup(w)}
                            className="px-2.5 py-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-950 hover:text-indigo-700 transition flex items-center gap-1"
                          >
                            <span>{w}</span>
                            <Volume2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
