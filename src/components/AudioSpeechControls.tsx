import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Sliders, Globe } from 'lucide-react';
import { speechService, AccentType, SpeechSpeed, SpeechPitch } from '../utils/speechUtils';

interface AudioSpeechControlsProps {
  textToSpeak: string;
  title?: string;
}

export const AudioSpeechControls: React.FC<AudioSpeechControlsProps> = ({ textToSpeak, title }) => {
  const [accent, setAccent] = useState<AccentType>('en-GB'); // Default British English
  const [rate, setRate] = useState<SpeechSpeed>(1.0);
  const [pitch, setPitch] = useState<SpeechPitch>(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((speaking, paused) => {
      setIsSpeaking(speaking);
      setIsPaused(paused);
    });
    return () => {
      speechService.stop();
      unsubscribe();
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      speechService.resume();
    } else {
      speechService.speakText({
        text: textToSpeak,
        accent,
        rate,
        pitch,
      });
    }
  };

  const handlePause = () => {
    speechService.pause();
  };

  const handleStop = () => {
    speechService.stop();
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Pronunciation Title & Controls */}
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>Native English Pronunciation Audio</span>
                {isSpeaking && !isPaused && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 animate-pulse border border-emerald-500/40">
                    Playing...
                  </span>
                )}
              </h4>
              <p className="text-xs text-slate-400">
                British (UK) ও American (US) উচ্চারণ শুনুন এবং পড়ার গতি ও পিচ পরিবর্তন করুন
              </p>
            </div>
          </div>
        </div>

        {/* Play/Pause/Stop Buttons */}
        <div className="flex items-center gap-2">
          {!isSpeaking || isPaused ? (
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/50 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPaused ? 'Resume Audio' : 'Play Pronunciation'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          )}

          {isSpeaking && (
            <button
              onClick={handleStop}
              className="p-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700/50 transition"
              title="Stop audio"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Settings Row: Accent, Rate & Pitch */}
      <div className="mt-4 pt-3.5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Accent Selector (British vs American) */}
        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5 shrink-0">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Accent:</span>
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                setAccent('en-GB');
                if (isSpeaking) {
                  speechService.speakText({ text: textToSpeak, accent: 'en-GB', rate, pitch });
                }
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                accent === 'en-GB'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🇬🇧 British (UK)
            </button>
            <button
              onClick={() => {
                setAccent('en-US');
                if (isSpeaking) {
                  speechService.speakText({ text: textToSpeak, accent: 'en-US', rate, pitch });
                }
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                accent === 'en-US'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🇺🇸 American (US)
            </button>
          </div>
        </div>

        {/* Speed / Pace Controller (Slow, Medium, Fast) */}
        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5 shrink-0">
            <FastForward className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pace (গতি):</span>
          </span>
          <div className="flex gap-1">
            {[
              { val: 0.75, label: 'Slow (ধীর)' },
              { val: 1.0, label: 'Medium (স্বাভাবিক)' },
              { val: 1.25, label: 'Fast (দ্রুত)' },
            ].map((sp) => (
              <button
                key={sp.val}
                onClick={() => {
                  const newRate = sp.val as SpeechSpeed;
                  setRate(newRate);
                  if (isSpeaking) {
                    speechService.speakText({ text: textToSpeak, accent, rate: newRate, pitch });
                  }
                }}
                className={`px-2 py-1 rounded-lg font-semibold text-[11px] transition ${
                  rate === sp.val
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sp.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Pitch Controller (Low, Normal, High) */}
        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5 shrink-0">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pitch (সুর):</span>
          </span>
          <div className="flex gap-1">
            {[
              { val: 0.8, label: 'Low' },
              { val: 1.0, label: 'Normal' },
              { val: 1.2, label: 'High' },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => {
                  const newPitch = p.val as SpeechPitch;
                  setPitch(newPitch);
                  if (isSpeaking) {
                    speechService.speakText({ text: textToSpeak, accent, rate, pitch: newPitch });
                  }
                }}
                className={`px-2 py-1 rounded-lg font-semibold text-[11px] transition ${
                  pitch === p.val
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
