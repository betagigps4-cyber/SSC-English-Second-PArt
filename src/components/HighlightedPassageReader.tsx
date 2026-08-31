import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Globe,
  Gauge,
  Sparkles,
  Highlighter,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import {
  speechService,
  AccentType,
  SpeechSpeed,
  SpeechPitch,
  parsePassageForHighlighting,
  ParsedPassageData,
} from '../utils/speechUtils';

interface HighlightedPassageReaderProps {
  text: string;
  title?: string;
  banglaTitle?: string;
  showControls?: boolean;
  className?: string;
  onWordClick?: (word: string) => void;
  accentColor?: 'indigo' | 'emerald' | 'amber' | 'blue' | 'purple';
}

export const HighlightedPassageReader: React.FC<HighlightedPassageReaderProps> = ({
  text,
  title,
  banglaTitle,
  showControls = true,
  className = '',
  onWordClick,
  accentColor = 'indigo',
}) => {
  const [accent, setAccent] = useState<AccentType>('en-GB'); // Default British English
  const [rate, setRate] = useState<SpeechSpeed>(1.0);
  const [pitch, setPitch] = useState<SpeechPitch>(1.0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1);
  const [highlightMode, setHighlightMode] = useState<'word' | 'sentence' | 'both'>('both');

  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);

  // Parse text into structured tokens and sentences
  const parsedData: ParsedPassageData = useMemo(() => {
    return parsePassageForHighlighting(text);
  }, [text]);

  // Subscribe to speech service status and boundaries
  useEffect(() => {
    const unsubStatus = speechService.subscribe((speaking, paused) => {
      setIsSpeaking(speaking);
      setIsPaused(paused);
      if (!speaking) {
        setCurrentCharIndex(-1);
      }
    });

    const unsubBoundary = speechService.subscribeBoundary((charIndex) => {
      setCurrentCharIndex(charIndex);
    });

    return () => {
      unsubStatus();
      unsubBoundary();
    };
  }, []);

  // Stop speech if text changes
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, [text]);

  // Auto-scroll to active word smoothly if reading
  useEffect(() => {
    if (isSpeaking && activeWordRef.current && containerRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [currentCharIndex, isSpeaking]);

  // Determine which word token is currently active
  const activeTokenIndex = useMemo(() => {
    if (!isSpeaking || currentCharIndex < 0 || parsedData.tokens.length === 0) return -1;

    // Find token closest to or covering currentCharIndex
    const tokenIdx = parsedData.tokens.findIndex(
      (t) => currentCharIndex >= t.start && currentCharIndex < t.end + 2
    );

    if (tokenIdx !== -1) return tokenIdx;

    // Fallback: find closest previous token
    for (let i = parsedData.tokens.length - 1; i >= 0; i--) {
      if (parsedData.tokens[i].start <= currentCharIndex) {
        return i;
      }
    }
    return 0;
  }, [isSpeaking, currentCharIndex, parsedData]);

  // Determine which sentence is currently active
  const activeSentenceIndex = useMemo(() => {
    if (activeTokenIndex < 0 || !parsedData.tokens[activeTokenIndex]) return -1;
    return parsedData.tokens[activeTokenIndex].sentenceIndex;
  }, [activeTokenIndex, parsedData]);

  const handlePlay = (fromCharIndex: number = 0) => {
    if (isPaused && fromCharIndex === 0) {
      speechService.resume();
    } else {
      speechService.speakText({
        text,
        accent,
        rate,
        pitch,
        startIndex: fromCharIndex,
        onEnd: () => setCurrentCharIndex(-1),
      });
    }
  };

  const handlePause = () => {
    speechService.pause();
  };

  const handleStop = () => {
    speechService.stop();
    setCurrentCharIndex(-1);
  };

  const handleWordSelect = (token: any) => {
    if (onWordClick) {
      const cleanWord = token.word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'\[\]]/g, '');
      if (cleanWord) onWordClick(cleanWord);
    }
    // Start playback from this word
    handlePlay(token.start);
  };

  // Color theme presets
  const themeClasses = {
    indigo: {
      activeWord:
        'bg-amber-400 dark:bg-amber-400 text-slate-950 font-black rounded-md px-1.5 py-0.5 shadow-md ring-2 ring-amber-500 scale-105 inline-block mx-0.5 transition-transform duration-100',
      activeSentence:
        'bg-amber-100/90 dark:bg-indigo-950/80 rounded-md px-1 py-0.5 transition-colors duration-150',
      badge: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300',
    },
    emerald: {
      activeWord:
        'bg-amber-400 dark:bg-amber-400 text-slate-950 font-black rounded-md px-1.5 py-0.5 shadow-md ring-2 ring-amber-500 scale-105 inline-block mx-0.5 transition-transform duration-100',
      activeSentence:
        'bg-emerald-100/90 dark:bg-emerald-950/80 rounded-md px-1 py-0.5 transition-colors duration-150',
      badge: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
    },
    amber: {
      activeWord:
        'bg-emerald-400 dark:bg-emerald-400 text-slate-950 font-black rounded-md px-1.5 py-0.5 shadow-md ring-2 ring-emerald-500 scale-105 inline-block mx-0.5 transition-transform duration-100',
      activeSentence:
        'bg-amber-100/90 dark:bg-amber-950/80 rounded-md px-1 py-0.5 transition-colors duration-150',
      badge: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
    },
    blue: {
      activeWord:
        'bg-amber-400 dark:bg-amber-400 text-slate-950 font-black rounded-md px-1.5 py-0.5 shadow-md ring-2 ring-amber-500 scale-105 inline-block mx-0.5 transition-transform duration-100',
      activeSentence:
        'bg-blue-100/90 dark:bg-blue-950/80 rounded-md px-1 py-0.5 transition-colors duration-150',
      badge: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300',
    },
    purple: {
      activeWord:
        'bg-amber-400 dark:bg-amber-400 text-slate-950 font-black rounded-md px-1.5 py-0.5 shadow-md ring-2 ring-amber-500 scale-105 inline-block mx-0.5 transition-transform duration-100',
      activeSentence:
        'bg-purple-100/90 dark:bg-purple-950/80 rounded-md px-1 py-0.5 transition-colors duration-150',
      badge: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300',
    },
  }[accentColor] || {
    activeWord:
      'bg-amber-400 dark:bg-amber-400 text-slate-950 font-black rounded-md px-1.5 py-0.5 shadow-md ring-2 ring-amber-500 scale-105 inline-block mx-0.5 transition-transform duration-100',
    activeSentence:
      'bg-indigo-100/90 dark:bg-indigo-950/80 rounded-md px-1 py-0.5 transition-colors duration-150',
    badge: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300',
  };

  // Group sentences into genuine structural paragraphs based on double/single line breaks
  const paragraphBlocks = useMemo(() => {
    if (!text) return [];
    const rawBlocks = text.split(/\n+/);
    let searchStart = 0;

    return rawBlocks
      .map((blockText, pIdx) => {
        const trimmed = blockText.trim();
        if (!trimmed) return null;

        const blockStart = text.indexOf(blockText, searchStart);
        const blockEnd = blockStart >= 0 ? blockStart + blockText.length : text.length;
        if (blockStart >= 0) {
          searchStart = blockEnd;
        }

        // Match sentences belonging to this paragraph block
        const matchedSentences = parsedData.sentences.filter((s) => {
          return s.start >= blockStart && s.start < blockEnd;
        });

        // Fallback if boundary matching missed
        const sentenceList =
          matchedSentences.length > 0
            ? matchedSentences
            : pIdx === 0
            ? parsedData.sentences
            : [];

        return {
          id: pIdx,
          sentences: sentenceList,
        };
      })
      .filter(Boolean) as { id: number; sentences: typeof parsedData.sentences }[];
  }, [text, parsedData]);


  return (
    <div className={`space-y-4 ${className}`}>
      {/* Audio Controller Bar */}
      {showControls && (
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Title & Live Status */}
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-2xl ${
                  isSpeaking && !isPaused
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 animate-pulse'
                    : 'bg-slate-800 text-emerald-400 border border-slate-700'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>{title || 'Passage Read-Aloud & Live Text Highlighting'}</span>
                  </h4>
                  {isSpeaking && !isPaused && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-sm animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Reading Live...</span>
                    </span>
                  )}
                  {isPaused && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      Paused
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {banglaTitle ||
                    'পড়ুন এবং শুনুন: পড়ার সাথে সাথে প্রতিটি শব্দ ও বাক্য লাইভ হাইলাইট হবে। যেকোনো শব্দে ক্লিক করে সেখান থেকে পড়া শুরু করতে পারেন।'}
                </p>
              </div>
            </div>

            {/* Playback Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {!isSpeaking || isPaused ? (
                <button
                  onClick={() => handlePlay(0)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-950/60 transition hover:scale-105 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isPaused ? 'Resume Reading' : 'Play Live Read-Out'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-black shadow-lg transition hover:scale-105 active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-slate-950" />
                  <span>Pause</span>
                </button>
              )}

              {isSpeaking && (
                <button
                  onClick={handleStop}
                  className="p-2.5 rounded-2xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/50 transition hover:scale-105 active:scale-95"
                  title="Stop audio reading"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Voice Settings Bar: Accent, Speed & Highlight Mode */}
          <div className="mt-4 pt-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Accent Selector (British vs American) */}
            <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold px-1.5 flex items-center gap-1 shrink-0">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Voice:</span>
              </span>
              <button
                onClick={() => {
                  setAccent('en-GB');
                  if (isSpeaking) {
                    speechService.speakText({
                      text,
                      accent: 'en-GB',
                      rate,
                      pitch,
                      startIndex: currentCharIndex > 0 ? currentCharIndex : 0,
                    });
                  }
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  accent === 'en-GB'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🇬🇧 British (UK)
              </button>
              <button
                onClick={() => {
                  setAccent('en-US');
                  if (isSpeaking) {
                    speechService.speakText({
                      text,
                      accent: 'en-US',
                      rate,
                      pitch,
                      startIndex: currentCharIndex > 0 ? currentCharIndex : 0,
                    });
                  }
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  accent === 'en-US'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🇺🇸 American (US)
              </button>
            </div>

            {/* Speed Controller (0.75x, 1x, 1.25x) */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold px-1.5 flex items-center gap-1 shrink-0">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                <span>Speed:</span>
              </span>
              {([0.75, 1.0, 1.25] as SpeechSpeed[]).map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    setRate(spd);
                    if (isSpeaking) {
                      speechService.speakText({
                        text,
                        accent,
                        rate: spd,
                        pitch,
                        startIndex: currentCharIndex > 0 ? currentCharIndex : 0,
                      });
                    }
                  }}
                  className={`px-2 py-0.5 rounded-lg font-mono font-bold transition ${
                    rate === spd
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Highlighting Mode: Both / Word / Sentence */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-semibold px-1.5 flex items-center gap-1 shrink-0">
                <Highlighter className="w-3.5 h-3.5 text-amber-400" />
                <span>Highlight:</span>
              </span>
              <button
                onClick={() => setHighlightMode('both')}
                className={`px-2 py-0.5 rounded-lg font-bold transition ${
                  highlightMode === 'both'
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Word + Sentence
              </button>
              <button
                onClick={() => setHighlightMode('word')}
                className={`px-2 py-0.5 rounded-lg font-bold transition ${
                  highlightMode === 'word'
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Word Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Text with Live Karaoke Sentence & Word Highlighting */}
      <div
        ref={containerRef}
        className="bg-slate-50 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-inner relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Interactive Passage Reading (ক্লিক করে শব্দ শুনুন):</span>
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            {parsedData.tokens.length} words • {parsedData.sentences.length} sentences
          </span>
        </div>

        {/* The Passage Body */}
        <div className="text-base sm:text-lg lg:text-xl text-slate-800 dark:text-slate-100 font-serif space-y-4">
          {paragraphBlocks.map((block) => (
            <p
              key={block.id}
              className="text-justify leading-relaxed break-words"
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              {block.sentences.map((sentence) => {
                const isCurrentSentence =
                  isSpeaking &&
                  activeSentenceIndex === sentence.id &&
                  (highlightMode === 'sentence' || highlightMode === 'both');

                return (
                  <span
                    key={sentence.id}
                    className={`transition-all duration-150 inline rounded px-0.5 py-0.5 ${
                      isCurrentSentence ? themeClasses.activeSentence : ''
                    }`}
                  >
                    {sentence.tokenIndices.map((tokenIdx) => {
                      const token = parsedData.tokens[tokenIdx];
                      if (!token) return null;

                      const isCurrentWord =
                        isSpeaking &&
                        activeTokenIndex === token.id &&
                        (highlightMode === 'word' || highlightMode === 'both');

                      return (
                        <span
                          key={token.id}
                          ref={isCurrentWord ? activeWordRef : null}
                          onClick={() => handleWordSelect(token)}
                          className={`cursor-pointer rounded transition-all duration-150 select-text ${
                            isCurrentWord
                              ? themeClasses.activeWord
                              : 'hover:bg-amber-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-amber-300'
                          }`}
                          title="Click to pronounce and read from this word"
                        >
                          {token.word}
                          <span className="inline-block w-1" />
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
