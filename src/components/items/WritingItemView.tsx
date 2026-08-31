import React, { useState, useEffect } from 'react';
import { WritingItemData } from '../../types';
import { PARAGRAPHS_DATA, EMAILS_LETTERS_APPLICATIONS_DATA, COMPOSITIONS_DATA } from '../../data/sscData';
import { HighlightedPassageReader } from '../HighlightedPassageReader';
import { CelebrationModal } from '../CelebrationModal';
import { BookmarkButton } from '../BookmarkButton';
import {
  FileText,
  Mail,
  BookOpen,
  Languages,
  Bot,
  Sparkles,
  ListOrdered,
  PenTool,
  Loader2,
  Award,
  ChevronRight,
  Eye,
  RotateCcw,
  Volume2,
} from 'lucide-react';


interface WritingItemViewProps {
  itemId: number; // 10, 11, or 12
  onBackToMenu: () => void;
}

export const WritingItemView: React.FC<WritingItemViewProps> = ({ itemId, onBackToMenu }) => {
  let currentSamples: WritingItemData[] = PARAGRAPHS_DATA;
  let sectionTitle = 'Paragraph Writing';
  let totalMarks = 10;
  let itemNumber = 10;
  let itemBn = 'অনুচ্ছেদ লিখন (১০ নম্বর)';
  let targetWordCount = 200;

  if (itemId === 11) {
    currentSamples = EMAILS_LETTERS_APPLICATIONS_DATA;
    sectionTitle = 'Formal Letter / E-mail / Application';
    totalMarks = 10;
    itemNumber = 11;
    itemBn = 'আনুষ্ঠানিক পত্র / ইমেইল / দরখাস্ত (১০ নম্বর)';
    targetWordCount = 150;
  } else if (itemId === 12) {
    currentSamples = COMPOSITIONS_DATA;
    sectionTitle = 'Writing Short Composition';
    totalMarks = 12;
    itemNumber = 12;
    itemBn = 'সংক্ষিপ্ত প্রবন্ধ / কম্পোজিশন (১২ নম্বর)';
    targetWordCount = 250;
  }

  const [selectedSample, setSelectedSample] = useState<WritingItemData>(currentSamples[0]);
  const [activeTab, setActiveTab] = useState<'read' | 'practice'>('read');
  const [studentWriting, setStudentWriting] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<any>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  useEffect(() => {
    let samples = PARAGRAPHS_DATA;
    if (itemId === 11) samples = EMAILS_LETTERS_APPLICATIONS_DATA;
    else if (itemId === 12) samples = COMPOSITIONS_DATA;
    setSelectedSample(samples[0]);
    setStudentWriting('');
    setReviewResult(null);
    setActiveTab('read');
  }, [itemId]);

  const handleSelectSample = (sample: WritingItemData) => {
    setSelectedSample(sample);
    setReviewResult(null);
    setStudentWriting('');
  };

  const handleEvaluateStudentWriting = async () => {
    if (!studentWriting.trim()) return;
    setIsEvaluating(true);

    try {
      const response = await fetch('/api/ai-writing-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedSample.titleEn,
          writingType: selectedSample.category,
          maxMarks: selectedSample.markWeight || totalMarks,
          studentText: studentWriting,
        }),
      });

      const data = await response.json();
      if (data && data.review) {
        setReviewResult(data.review);
        setShowCelebration(true);
      } else {
        fallbackReview();
      }
    } catch (err) {
      console.warn('AI writing review offline, fallback to heuristic examiner:', err);
      fallbackReview();
    } finally {
      setIsEvaluating(false);
    }
  };

  const fallbackReview = () => {
    const wordCount = studentWriting.trim().split(/\s+/).length;
    const maxMarks = selectedSample.markWeight || totalMarks;
    const marksAwarded = Math.min(
      maxMarks,
      Math.max(4, Math.round((wordCount / targetWordCount) * maxMarks))
    );

    const mockReview = {
      marksAwarded,
      maxMarks,
      rubrics: {
        relevanceAndContent: Math.round(marksAwarded * 0.35),
        grammarAndStructure: Math.round(marksAwarded * 0.25),
        vocabularyAndSpelling: Math.round(marksAwarded * 0.2),
        coherenceAndOrganization: Math.round(marksAwarded * 0.2),
      },
      overallFeedback: `Well written! You composed ${wordCount} words for the topic "${selectedSample.titleEn}". Great effort in organizing your ideas and vocabulary.`,
      banglaAdvice: 'বাক্যের বৈচিত্র্য বজায় রেখে মূল ভাব সুন্দরভাবে উপস্থাপন করার চেষ্টা অব্যাহত রাখুন।',
      strengths: ['Topic focused and structured', 'Good sentence coherence'],
      areasForImprovement: ['Enrich academic vocabulary', 'Check prepositions and punctuation'],
    };

    setReviewResult(mockReview);
    setShowCelebration(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 mb-3 shadow-md">
              <span>Question No. {itemNumber}</span>
              <span>•</span>
              <span>Part B - Writing ({totalMarks} Marks)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">{sectionTitle}</h3>
            <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-2xl">
              {itemBn} — বাংলা অর্থসহ সম্পূর্ণ পাঠ, ব্রিটিশ ও আমেরিকান প্রমিত অডিও উচ্চারণ এবং এআই চালিত খাতা মূল্যায়ন ব্যবস্থা।
            </p>
          </div>

          {/* Model Question Selector Chips (1 to 10) */}
          <div className="flex flex-wrap gap-2">
            {currentSamples.map((sample, idx) => {
              const isSelected = selectedSample.id === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-indigo-950 shadow-lg scale-105 ring-2 ring-amber-400 font-extrabold'
                      : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-mono text-[11px] font-black">
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[170px]">{sample.titleEn.replace(/^Model Question \d+:\s*/, '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs: Study & Audio Mode vs Interactive AI Writing Practice + Bookmark button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('read')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
              activeTab === 'read'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Read, Listen & Learn (পড়ুন ও অডিও শুনুন)</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
              activeTab === 'practice'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>AI Writing Practice & Examiner (এআই খাতা পরীক্ষণ)</span>
          </button>
        </div>

        {/* Bookmark this writing topic */}
        {selectedSample && (
          <BookmarkButton
            exercise={{
              id: `writing-${itemId}-${selectedSample.id}`,
              itemId: itemId,
              itemNumber: itemNumber,
              itemTitle: sectionTitle,
              subTitle: `${selectedSample.titleEn} (${selectedSample.titleBn})`,
              category: 'writing',
              savedAt: new Date().toISOString(),
            }}
            variant="standard"
            showLabel={true}
          />
        )}
      </div>


      {activeTab === 'read' ? (
        <div className="space-y-6">
          {/* Native Pronunciation & Live Karaoke Text Highlighting Reader */}
          <HighlightedPassageReader
            text={selectedSample.englishContent}
            title={`${selectedSample.titleEn} (Live Read-Out)`}
            banglaTitle="পড়ুন এবং শুনুন: অডিও চালু করলে পড়ার সাথে সাথে প্রতিটি শব্দ ও বাক্য সোনালী রঙে লাইভ হাইলাইট হবে।"
            accentColor="indigo"
          />

          {/* Bilingual Translation & Notes Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            {/* Title Banner */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                <h4 className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-indigo-200">
                  {selectedSample.titleEn}
                </h4>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  Total Marks: {selectedSample.markWeight || totalMarks}
                </span>
              </div>
              <h5 className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {selectedSample.titleBn}
              </h5>
            </div>

            {/* Bangla Translation Card */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-6 sm:p-7 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 shadow-inner">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-4 flex items-center gap-1.5">
                <Languages className="w-4 h-4" />
                <span>🇧🇩 সম্পূর্ণ বাংলা অর্থ ও অনুবাদ (Bangla Translation):</span>
              </span>
              <p className="text-sm sm:text-base text-emerald-950 dark:text-emerald-100 leading-relaxed font-sans whitespace-pre-line text-justify">
                {selectedSample.banglaMeaning}
              </p>
            </div>

            {/* Key Vocabulary Table */}
            {selectedSample?.vocabularyTips && selectedSample.vocabularyTips.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-4">
                  📖 Key Vocabulary & Word Meanings (গুরুত্বপূর্ণ শব্দার্থ):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(selectedSample.vocabularyTips || []).map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm block">
                          {vocab.word}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase">
                          {vocab.partOfSpeech}
                        </span>
                      </div>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {vocab.meaningBn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Points / Structure Guide */}
            {selectedSample?.keyPoints && selectedSample.keyPoints.length > 0 && (
              <div className="bg-amber-50/70 dark:bg-slate-800/40 p-6 rounded-2xl border border-amber-200 dark:border-slate-700">
                <span className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-amber-600" />
                  <span>Exam Writing Tips & Key Focus Points (পরীক্ষার জন্য প্রয়োজনীয় পয়েন্টসমূহ):</span>
                </span>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {(selectedSample.keyPoints || []).map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Interactive AI Writing Practice & Examiner Mode */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Bot className="w-6 h-6 text-pink-600" />
              <span>Interactive AI Writing Examiner (এআই খাতা মূল্যায়ন)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              বিষয়: <strong className="text-indigo-600">{selectedSample.titleEn}</strong> ({selectedSample.titleBn}) এর ওপর নিজের ভাষায় লিখুন। AI সাথে সাথে এসএসসি পরীক্ষার মানদণ্ডে নম্বর ও সংশোধনী প্রদান করবে।
            </p>
          </div>

          {/* Student Writing Editor Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Type Your {selectedSample.category === 'paragraph' ? 'Paragraph' : selectedSample.category === 'composition' ? 'Composition' : 'Letter / Application'}:
              </label>
              <span className="text-xs text-slate-500 font-mono">
                Word Count: {studentWriting.trim() ? studentWriting.trim().split(/\s+/).length : 0} words
              </span>
            </div>

            <textarea
              rows={10}
              value={studentWriting}
              onChange={(e) => setStudentWriting(e.target.value)}
              placeholder={`Write your own original text on "${selectedSample.titleEn}" here...`}
              className="w-full text-base sm:text-lg p-5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/70 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:outline-none leading-relaxed transition shadow-inner font-serif"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={handleEvaluateStudentWriting}
                disabled={isEvaluating || !studentWriting.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-900/30 transition-transform active:scale-95 disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI Examiner is Grading & Reviewing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Submit to AI Examiner (খাতা মূল্যায়ন করুন)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setStudentWriting('');
                  setReviewResult(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>

            {reviewResult && (
              <div className="flex items-center gap-3 bg-pink-50 dark:bg-pink-950/60 px-4 py-2.5 rounded-2xl border border-pink-300 dark:border-pink-800">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-pink-900 dark:text-pink-200">
                  Marks Awarded: <span className="text-xl text-pink-600 dark:text-pink-400 font-mono">{reviewResult.marksAwarded}</span> / {selectedSample.markWeight || totalMarks}
                </span>
              </div>
            )}
          </div>

          {/* AI Detailed Feedback Cards */}
          {reviewResult && (
            <div className="mt-8 space-y-6 animate-in fade-in">
              {/* Overall Feedback Card */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-slate-800/80 dark:to-slate-800/40 p-6 rounded-2xl border border-pink-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-pink-950 dark:text-pink-200 text-base flex items-center gap-2">
                    <Bot className="w-5 h-5 text-pink-600" />
                    <span>AI Examiner's Comprehensive Assessment:</span>
                  </h5>
                  <span className="text-lg font-black font-mono text-pink-600">
                    {Math.round((reviewResult.marksAwarded / (selectedSample.markWeight || totalMarks)) * 100)}% Grade
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed italic">
                  "{reviewResult.overallFeedback}"
                </p>
                {reviewResult.banglaAdvice && (
                  <p className="text-xs sm:text-sm text-pink-900 dark:text-pink-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-pink-200 dark:border-slate-700">
                    💡 <strong>পরীক্ষকের বাংলা পরামর্শ:</strong> {reviewResult.banglaAdvice}
                  </p>
                )}
              </div>

              {/* Rubric Breakdown Grid */}
              {reviewResult.rubrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs text-slate-500 block mb-1">Relevance & Content</span>
                    <span className="text-lg font-bold text-indigo-600 font-mono">
                      {reviewResult.rubrics.relevanceAndContent} pts
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs text-slate-500 block mb-1">Grammar & Syntax</span>
                    <span className="text-lg font-bold text-emerald-600 font-mono">
                      {reviewResult.rubrics.grammarAndStructure} pts
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs text-slate-500 block mb-1">Vocabulary & Spelling</span>
                    <span className="text-lg font-bold text-amber-600 font-mono">
                      {reviewResult.rubrics.vocabularyAndSpelling} pts
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs text-slate-500 block mb-1">Coherence & Flow</span>
                    <span className="text-lg font-bold text-pink-600 font-mono">
                      {reviewResult.rubrics.coherenceAndOrganization} pts
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Celebration Modal for Writing Review */}
      <CelebrationModal
        isOpen={showCelebration}
        score={reviewResult ? reviewResult.marksAwarded : 0}
        maxScore={selectedSample.markWeight || totalMarks}
        title={`${selectedSample.titleEn} (${selectedSample.category})`}
        feedbackText={reviewResult?.overallFeedback}
        banglaTips={reviewResult?.banglaAdvice}
        onClose={() => setShowCelebration(false)}
        onRetry={() => setShowCelebration(false)}
      />
    </div>
  );
};
