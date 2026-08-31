import React from 'react';
import { SSC_SECTIONS } from '../data/sscData';
import {
  Sparkles,
  Columns3,
  CheckCircle2,
  ArrowLeftRight,
  HelpCircle,
  Type,
  Navigation,
  Link,
  Quote,
  FileText,
  Mail,
  BookOpen,
  ArrowRight,
  Award,
  GraduationCap,
  Tag,
} from 'lucide-react';

interface ItemGridProps {
  onSelectItem: (itemId: number) => void;
  activeItemId?: number | null;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ onSelectItem, activeItemId }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Columns3':
        return <Columns3 className="w-6 h-6" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6" />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight className="w-6 h-6" />;
      case 'HelpCircle':
        return <HelpCircle className="w-6 h-6" />;
      case 'Type':
        return <Type className="w-6 h-6" />;
      case 'Navigation':
        return <Navigation className="w-6 h-6" />;
      case 'Link':
        return <Link className="w-6 h-6" />;
      case 'Quote':
        return <Quote className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'Mail':
        return <Mail className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive Practice Modules (১ থেকে ১২ টি আইটেম)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            প্রতিটি আইটেমে ক্লিক করে বোর্ড প্রশ্ন নির্বাচন করুন এবং ড্র্যাগ-অ্যান্ড-ড্রপ, টাইপিং ও এআই চেকিং এর মাধ্যমে অনুশীলন করুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {SSC_SECTIONS.map((item) => {
          const isSelected = activeItemId === item.id;
          const boardTag = item.boardTag || 'Rajshahi Board 2026';
          const boardSubtitle = item.boardSubtitle || 'Rajshahi Board 2026';

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600'
              }`}
            >
              {/* Top Row: Badge & Number & Board Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-bold text-sm shadow-sm text-white bg-gradient-to-br ${item.colorClass}`}
                  >
                    {item.itemNumber}
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {/* Explicit Board Tag */}
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                      <GraduationCap className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{boardTag}</span>
                    </span>

                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        item.part === 'A'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                      }`}
                    >
                      Part {item.part}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      {item.marksText.split('=')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Title and Icon */}
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className={`p-2.5 rounded-xl text-white bg-gradient-to-br ${item.colorClass} shadow-md shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    {getIcon(item.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors text-base leading-tight">
                      {item.nameEn}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {item.nameBn}
                    </p>

                    {/* Explicit Board Subtitle */}
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200/80 dark:border-teal-900/60 w-fit">
                      <Tag className="w-3 h-3 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>{boardSubtitle}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer: Marks & Open Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Marks: <span className="text-emerald-600 dark:text-emerald-400">{item.totalMarks}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>অনুশীলন শুরু</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
