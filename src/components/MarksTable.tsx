import React from 'react';
import { SSC_SECTIONS } from '../data/sscData';
import { Sparkles, CheckCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface MarksTableProps {
  onSelectItem: (itemId: number) => void;
  activeItemId?: number | null;
}

export const MarksTable: React.FC<MarksTableProps> = ({ onSelectItem, activeItemId }) => {
  const grammarItems = SSC_SECTIONS.filter((s) => s.part === 'A');
  const writingItems = SSC_SECTIONS.filter((s) => s.part === 'B');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 transition-all">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-300" />
            <span>Distributions of Marks for English 2nd Paper</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
            এসএসসি ইংরেজি ২য় পত্র মান বণ্টন ও পূর্ণাঙ্গ সিলেবাস (মোট নম্বর: ১০০)
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl shadow text-xs sm:text-sm self-start sm:self-auto">
          <Sparkles className="w-4 h-4" />
          <span>Total Marks: 100</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <th className="py-3.5 px-4 w-20 text-center">Q. No</th>
              <th className="py-3.5 px-6">Items & Syllabus Topic</th>
              <th className="py-3.5 px-6 text-center w-36">Format</th>
              <th className="py-3.5 px-6 text-right w-28">Marks</th>
              <th className="py-3.5 px-4 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {/* Part A Section Divider */}
            <tr className="bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-900 dark:text-emerald-300 border-t-2 border-emerald-500">
              <td colSpan={3} className="py-3 px-4 text-sm sm:text-base">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Part A - Grammar: 60 Marks
                </span>
              </td>
              <td className="py-3 px-6 text-right text-emerald-700 dark:text-emerald-400 font-extrabold text-base">
                60
              </td>
              <td className="py-3 px-4 text-center text-xs font-semibold text-emerald-600">
                (১ থেকে ৯)
              </td>
            </tr>

            {grammarItems.map((item) => {
              const isSelected = activeItemId === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`cursor-pointer transition-colors duration-150 hover:bg-emerald-50/70 dark:hover:bg-slate-800/60 ${
                    isSelected ? 'bg-emerald-100/70 dark:bg-emerald-900/40 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-slate-100">
                    <span className="inline-block w-7 h-7 leading-7 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      {item.itemNumber}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-2">
                      <span>{item.nameEn}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal">
                        {item.nameBn}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {item.boardTag || 'Rajshahi Board 2026'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </td>
                  <td className="py-3 px-6 text-center text-xs text-slate-600 dark:text-slate-300 font-mono">
                    {item.marksText.split('=')[0].trim()}
                  </td>
                  <td className="py-3 px-6 text-right font-bold text-emerald-700 dark:text-emerald-400 font-mono text-base">
                    {item.totalMarks < 10 ? `0${item.totalMarks}` : item.totalMarks}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Part B Section Divider */}
            <tr className="bg-indigo-50 dark:bg-indigo-950/40 font-bold text-indigo-900 dark:text-indigo-300 border-t-2 border-indigo-500">
              <td colSpan={3} className="py-3 px-4 text-sm sm:text-base">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  Part B - Writing: 40 Marks
                </span>
              </td>
              <td className="py-3 px-6 text-right text-indigo-700 dark:text-indigo-400 font-extrabold text-base">
                40
              </td>
              <td className="py-3 px-4 text-center text-xs font-semibold text-indigo-600">
                (১০ থেকে ১২)
              </td>
            </tr>

            {writingItems.map((item) => {
              const isSelected = activeItemId === item.id;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`cursor-pointer transition-colors duration-150 hover:bg-indigo-50/70 dark:hover:bg-slate-800/60 ${
                    isSelected ? 'bg-indigo-100/70 dark:bg-indigo-900/40 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-slate-100">
                    <span className="inline-block w-7 h-7 leading-7 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      {item.itemNumber}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-2">
                      <span>{item.nameEn}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal">
                        {item.nameBn}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                        {item.boardTag || 'Rajshahi Board 2026'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </td>
                  <td className="py-3 px-6 text-center text-xs text-slate-600 dark:text-slate-300 font-mono">
                    Structured Writing
                  </td>
                  <td className="py-3 px-6 text-right font-bold text-indigo-700 dark:text-indigo-400 font-mono text-base">
                    {item.totalMarks}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Total Row */}
            <tr className="bg-amber-100/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-bold border-t-2 border-amber-400 text-base">
              <td colSpan={3} className="py-3.5 px-6 text-left font-extrabold uppercase tracking-wide">
                Total Marks (Part A + Part B)
              </td>
              <td className="py-3.5 px-6 text-right font-black font-mono text-xl text-amber-800 dark:text-amber-300">
                100
              </td>
              <td className="py-3.5 px-4 text-center">
                <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-1 rounded">
                  100%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
