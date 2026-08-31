export type AccentType = 'en-GB' | 'en-US';
export type SpeechSpeed = 0.5 | 0.75 | 1.0 | 1.25 | 1.5;
export type SpeechPitch = 0.8 | 1.0 | 1.2;

export interface HighlightToken {
  id: number;
  word: string;
  start: number;
  end: number;
  sentenceIndex: number;
}

export interface HighlightSentence {
  id: number;
  text: string;
  start: number;
  end: number;
  tokenIndices: number[];
}

export interface ParsedPassageData {
  originalText: string;
  spokenText: string;
  tokens: HighlightToken[];
  sentences: HighlightSentence[];
}

/**
 * Splits text into words and sentences with exact character offsets for high-accuracy live highlighting.
 */
export function parsePassageForHighlighting(text: string): ParsedPassageData {
  if (!text) {
    return { originalText: '', spokenText: '', tokens: [], sentences: [] };
  }

  // Normalize gap placeholders like [a] -> " (gap a) " or similar for spoken text if needed
  const tokens: HighlightToken[] = [];
  const sentences: HighlightSentence[] = [];

  // Match sentences roughly by period, exclamation, question mark, or newline
  const sentenceRegex = /[^.!?\n]+[.!?\n]+/g;
  let sMatch: RegExpExecArray | null;
  let lastIndex = 0;
  let sentenceCount = 0;

  // First pass: extract sentences
  while ((sMatch = sentenceRegex.exec(text)) !== null) {
    const sStart = sMatch.index;
    const sText = sMatch[0];
    const sEnd = sStart + sText.length;
    sentences.push({
      id: sentenceCount++,
      text: sText,
      start: sStart,
      end: sEnd,
      tokenIndices: [],
    });
    lastIndex = sEnd;
  }

  // Add any trailing sentence without terminating punctuation
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    if (remaining.trim().length > 0) {
      sentences.push({
        id: sentenceCount++,
        text: remaining,
        start: lastIndex,
        end: text.length,
        tokenIndices: [],
      });
    }
  }

  // If no sentences were matched (e.g. short single phrase), fallback to full text as single sentence
  if (sentences.length === 0) {
    sentences.push({
      id: 0,
      text: text,
      start: 0,
      end: text.length,
      tokenIndices: [],
    });
  }

  // Second pass: extract words and map them to sentences
  const wordRegex = /\S+/g;
  let wMatch: RegExpExecArray | null;
  let wordCount = 0;

  while ((wMatch = wordRegex.exec(text)) !== null) {
    const wStart = wMatch.index;
    const wText = wMatch[0];
    const wEnd = wStart + wText.length;

    // Find sentence containing this word
    let sIdx = sentences.findIndex((s) => wStart >= s.start && wEnd <= s.end);
    if (sIdx === -1) {
      sIdx = sentences.findIndex((s) => wStart >= s.start);
      if (sIdx === -1) sIdx = 0;
    }

    const token: HighlightToken = {
      id: wordCount,
      word: wText,
      start: wStart,
      end: wEnd,
      sentenceIndex: sIdx,
    };

    tokens.push(token);
    if (sentences[sIdx]) {
      sentences[sIdx].tokenIndices.push(wordCount);
    }
    wordCount++;
  }

  return {
    originalText: text,
    spokenText: text,
    tokens,
    sentences,
  };
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSpeaking = false;
  private isPaused = false;
  private currentCharIndex = 0;
  private listeners: ((speaking: boolean, paused: boolean) => void)[] = [];
  private boundaryListeners: ((charIndex: number, textLength: number) => void)[] = [];
  private fallbackInterval: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    try {
      const v = this.synth.getVoices();
      this.voices = Array.isArray(v) ? v : [];
    } catch {
      this.voices = [];
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if ((!this.voices || this.voices.length === 0) && this.synth) {
      try {
        const v = this.synth.getVoices();
        this.voices = Array.isArray(v) ? v : [];
      } catch {
        this.voices = [];
      }
    }
    return Array.isArray(this.voices) ? this.voices : [];
  }

  public getVoiceForAccent(accent: AccentType): SpeechSynthesisVoice | null {
    const available = this.getVoices();
    if (!Array.isArray(available) || available.length === 0) return null;

    if (accent === 'en-GB') {
      const gbVoice = available.find(
        (v) =>
          v && (
            (typeof v.lang === 'string' && v.lang.toLowerCase().startsWith('en-gb')) ||
            (typeof v.name === 'string' && (
              v.name.toLowerCase().includes('british') ||
              v.name.toLowerCase().includes('uk') ||
              v.name.toLowerCase().includes('queen') ||
              v.name.toLowerCase().includes('george') ||
              v.name.toLowerCase().includes('oliver') ||
              v.name.toLowerCase().includes('stephanie')
            ))
          )
      );
      if (gbVoice) return gbVoice;
    }

    if (accent === 'en-US') {
      const usVoice = available.find(
        (v) =>
          v && (
            (typeof v.lang === 'string' && v.lang.toLowerCase().startsWith('en-us')) ||
            (typeof v.name === 'string' && (
              v.name.toLowerCase().includes('united states') ||
              v.name.toLowerCase().includes('samantha') ||
              v.name.toLowerCase().includes('alex') ||
              v.name.toLowerCase().includes('david') ||
              v.name.toLowerCase().includes('zira')
            ))
          )
      );
      if (usVoice) return usVoice;
    }

    // Fallback to any English voice
    return (
      available.find(
        (v) => v && typeof v.lang === 'string' && v.lang.toLowerCase().startsWith('en')
      ) ||
      available[0] ||
      null
    );
  }

  public speakText({
    text,
    accent = 'en-GB',
    rate = 1.0,
    pitch = 1.0,
    startIndex = 0,
    onBoundary,
    onEnd,
    onError,
  }: {
    text: string;
    accent?: AccentType;
    rate?: SpeechSpeed;
    pitch?: SpeechPitch;
    startIndex?: number;
    onBoundary?: (charIndex: number, textLength: number) => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }) {
    if (!this.synth) {
      console.warn('Speech synthesis is not supported in this browser.');
      return;
    }

    this.stop();

    const actualText = startIndex > 0 ? text.substring(startIndex) : text;
    const utterance = new SpeechSynthesisUtterance(actualText);
    const voice = this.getVoiceForAccent(accent);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = accent;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    let receivedNativeBoundary = false;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.currentCharIndex = startIndex;
      this.notifyListeners();
      if (onBoundary) onBoundary(startIndex, text.length);
      this.notifyBoundary(startIndex, text.length);

      // Setup timer fallback in case the browser platform fails to fire onboundary events
      this.startFallbackBoundaryTimer(actualText, rate, startIndex, text.length, onBoundary);
    };

    utterance.onpause = () => {
      this.isPaused = true;
      this.notifyListeners();
      this.stopFallbackTimer();
    };

    utterance.onresume = () => {
      this.isPaused = false;
      this.notifyListeners();
      this.startFallbackBoundaryTimer(actualText, rate, this.currentCharIndex, text.length, onBoundary);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentCharIndex = text.length;
      this.stopFallbackTimer();
      this.notifyListeners();
      if (onBoundary) onBoundary(text.length, text.length);
      this.notifyBoundary(text.length, text.length);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.stopFallbackTimer();
      this.notifyListeners();
      if (onError) onError(e);
    };

    utterance.onboundary = (e) => {
      receivedNativeBoundary = true;
      this.stopFallbackTimer(); // Native boundary is working, no need for simulated fallback
      const absoluteCharIndex = startIndex + (e.charIndex || 0);
      this.currentCharIndex = absoluteCharIndex;
      if (onBoundary) {
        onBoundary(absoluteCharIndex, text.length);
      }
      this.notifyBoundary(absoluteCharIndex, text.length);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  private startFallbackBoundaryTimer(
    spokenText: string,
    rate: number,
    startOffset: number,
    totalLength: number,
    onBoundaryCallback?: (charIndex: number, textLength: number) => void
  ) {
    this.stopFallbackTimer();
    const words = spokenText.split(/\s+/);
    if (words.length === 0) return;

    // Average speaking speed: ~150 words per minute * rate -> words per second
    const wordsPerSecond = (150 / 60) * (rate || 1.0);
    const msPerWord = Math.max(180, 1000 / wordsPerSecond);

    let currentWordIdx = 0;
    let accumulatedOffset = startOffset;

    this.fallbackInterval = setInterval(() => {
      if (!this.isSpeaking || this.isPaused || currentWordIdx >= words.length) {
        this.stopFallbackTimer();
        return;
      }

      const word = words[currentWordIdx];
      const wordPosInSpoken = spokenText.indexOf(word, accumulatedOffset - startOffset);
      const absPos = wordPosInSpoken >= 0 ? startOffset + wordPosInSpoken : accumulatedOffset;

      this.currentCharIndex = absPos;
      if (onBoundaryCallback) onBoundaryCallback(absPos, totalLength);
      this.notifyBoundary(absPos, totalLength);

      accumulatedOffset = absPos + word.length + 1;
      currentWordIdx++;
    }, msPerWord);
  }

  private stopFallbackTimer() {
    if (this.fallbackInterval) {
      clearInterval(this.fallbackInterval);
      this.fallbackInterval = null;
    }
  }

  public speakScore(score: number, maxScore: number, remarks?: string) {
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    if (percentage === 100) {
      message = `Outstanding! Perfect score! You scored ${score} out of ${maxScore}. Excellent performance!`;
    } else if (percentage >= 80) {
      message = `Great job! You scored ${score} out of ${maxScore}. Very good work!`;
    } else if (percentage >= 50) {
      message = `Good effort! You scored ${score} out of ${maxScore}. Keep practicing to master this topic!`;
    } else {
      message = `You scored ${score} out of ${maxScore}. Don't give up, review the grammar rules and try again!`;
    }

    if (remarks) {
      message += ` ${remarks}`;
    }

    this.speakText({ text: message, accent: 'en-US', rate: 1.0 });
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.stopFallbackTimer();
      this.notifyListeners();
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notifyListeners();
    }
  }

  public stop() {
    this.stopFallbackTimer();
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentCharIndex = 0;
      this.notifyListeners();
      this.notifyBoundary(0, 0);
    }
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentCharIndex: this.currentCharIndex,
    };
  }

  public subscribe(listener: (speaking: boolean, paused: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public subscribeBoundary(listener: (charIndex: number, textLength: number) => void) {
    this.boundaryListeners.push(listener);
    return () => {
      this.boundaryListeners = this.boundaryListeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l(this.isSpeaking, this.isPaused));
  }

  private notifyBoundary(charIndex: number, textLength: number) {
    this.boundaryListeners.forEach((l) => l(charIndex, textLength));
  }
}

export const speechService = new SpeechService();
