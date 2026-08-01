import React, { useState } from 'react';
import { GlossaryTerm } from '../types';
import { INITIAL_GLOSSARY } from '../data/glossaryData';
import { X, Search, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = INITIAL_GLOSSARY.filter(t => 
    t.term.includes(searchQuery) ||
    t.definition.includes(searchQuery) ||
    t.category.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white p-5 flex items-center justify-between border-b border-purple-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-800/80 flex items-center justify-center text-xl shadow-inner border border-purple-700/60">
              📖
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">قاموس المعاملات والمصطلحات الحكومية</h2>
              <p className="text-xs text-purple-200">شرح مبسط ومباشر لكافة المفاهيم والمصطلحات القانونية والإدارية المصرية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-100 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن الرقم القومي، مصر الرقمية، التنسيق الإلكتروني، الشهر العقاري..."
              className="w-full pl-4 pr-10 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-600 shadow-xs"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" /> {item.term}
                </h3>
                <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                {item.definition}
              </p>

              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block text-[11px] text-amber-950">💡 التبسيط والعمق المالي والتطبيقي:</span>
                <p className="text-[11px] leading-relaxed">{item.simplifiedExplanation}</p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-800 text-[11px]">حالات واستخدامات شائعة:</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {item.commonUseCases.map((uc, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg">
                      • {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
