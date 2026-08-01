import React, { useState } from 'react';
import { OfficialForm, CategoryType } from '../types';
import { INITIAL_FORMS } from '../data/formsData';
import { X, Search, Download, FileText, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

interface FormsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormsCenterModal: React.FC<FormsCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  if (!isOpen) return null;

  const filtered = INITIAL_FORMS.filter(f => {
    const matchesSearch = f.title.includes(searchQuery) || f.authority.includes(searchQuery) || f.description.includes(searchQuery);
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-sky-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-800/80 flex items-center justify-center text-xl shadow-inner border border-sky-700/60">
              📑
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">مركز النماذج والاستمارات الرسمية المعتمدة</h2>
              <p className="text-xs text-sky-200">تحميل النماذج والاستمارات الرسمية بملفات PDF مجانية مع قائمة المرفقات المطلوبة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن نموذج استمارة بطاقة الرقم القومي، جواز السفر، رخصة قيادة..."
              className="w-full pl-4 pr-10 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-600 shadow-xs"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CategoryType | 'all')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="all">📁 جميع القطاعات والوزارات</option>
            <option value="interior">🆔 الأحوال المدنية والداخلية</option>
            <option value="traffic">🚗 المرور والنيابة العامة</option>
            <option value="travel">✈️ السفر والجوازات</option>
            <option value="housing">🏠 الإسكان والشهر العقاري</option>
            <option value="schools">🏫 التعليم والمدارس</option>
            <option value="taxes">📊 الضرائب والسجل التجاري</option>
          </select>
        </div>

        {/* Content list */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50">
          {filtered.map((form) => (
            <div key={form.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-sky-300 transition-all space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0">
                    PDF
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{form.title}</h3>
                    <p className="text-xs text-sky-800 font-bold mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> الجهة المعتمدة: {form.authority}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                  الحجم: {form.fileSize}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {form.description}
              </p>

              {/* Prerequisites checklist */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 text-[11px]">المستندات المطلوبة إرفاقها قبل التسليم:</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {form.prerequisites.map((req, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>تاريخ آخر تحديث معتمد: {form.lastUpdated}</span>
                <a
                  href={form.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل النموذج الرسمي المعتمد</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
