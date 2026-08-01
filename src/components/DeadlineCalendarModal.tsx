import React, { useState } from 'react';
import { DeadlineEvent } from '../types';
import { INITIAL_DEADLINES } from '../data/deadlinesData';
import { X, Calendar, Clock, Bell, ExternalLink, Filter, CheckCircle, AlertCircle } from 'lucide-react';

interface DeadlineCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeadlineCalendarModal: React.FC<DeadlineCalendarModalProps> = ({
  isOpen,
  onClose
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [remindersSet, setRemindersSet] = useState<string[]>([]);

  if (!isOpen) return null;

  const filtered = INITIAL_DEADLINES.filter(d => 
    filterCategory === 'all' || d.category === filterCategory
  );

  const toggleReminder = (id: string) => {
    if (remindersSet.includes(id)) {
      setRemindersSet(prev => prev.filter(item => item !== id));
    } else {
      setRemindersSet(prev => [...prev, id]);
      alert('تم إضافة تذكير بالمواصفات على متصفحك وتقويم المواعيد بنجاح!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white p-5 flex items-center justify-between border-b border-amber-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-800/80 flex items-center justify-center text-xl shadow-inner border border-amber-700/60">
              📅
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">تقويم المواعيد والمهل الرسمية والتقديمات</h2>
              <p className="text-xs text-amber-200">جدول المواعيد لتقديم المدارس، تنسيق الجامعات، حجز شقق الإسكان، والوظائف الحكومية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> تصفيةسب النوع:
          </span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterCategory === 'all' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white text-slate-700 border hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilterCategory('admission')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterCategory === 'admission' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white text-slate-700 border hover:bg-slate-200'
            }`}
          >
            🏫 تقديم المدارس
          </button>
          <button
            onClick={() => setFilterCategory('tansik')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterCategory === 'tansik' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white text-slate-700 border hover:bg-slate-200'
            }`}
          >
            🎓 تنسيق الجامعات
          </button>
          <button
            onClick={() => setFilterCategory('housing')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterCategory === 'housing' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white text-slate-700 border hover:bg-slate-200'
            }`}
          >
            🏠 شقق الإسكان
          </button>
        </div>

        {/* Calendar Events List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50">
          {filtered.map((item) => {
            const isReminder = remindersSet.includes(item.id);
            const statusBadge = 
              item.status === 'open_now' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
              item.status === 'closing_soon' ? 'bg-rose-100 text-rose-900 border-rose-300' :
              item.status === 'upcoming' ? 'bg-sky-100 text-sky-900 border-sky-300' :
              'bg-slate-200 text-slate-700 border-slate-300';

            const statusText = 
              item.status === 'open_now' ? '🟢 التقديم مفتوح الآن' :
              item.status === 'closing_soon' ? '⚠️ يوشك على الانتهاء' :
              item.status === 'upcoming' ? '🗓️ قادماً قريباً' :
              '🔒 مغلق حالياً';

            return (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200/60 mb-1 inline-block">
                      {item.categoryLabelAr}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">الجهة المنظمة: {item.authority}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${statusBadge}`}>
                    {statusText}
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-4 text-slate-700 font-bold">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> البدء: {item.startDate}</span>
                    <span className="flex items-center gap-1 text-rose-700"><Clock className="w-3.5 h-3.5 text-rose-500" /> الانتهاء: {item.endDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReminder(item.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                        isReminder ? 'bg-emerald-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{isReminder ? 'مفعّل بالتذكير' : 'إضافة تذكير'}</span>
                    </button>

                    {item.officialUrl && (
                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-900 hover:bg-amber-950 text-white font-bold py-1.5 px-3 rounded-xl flex items-center gap-1"
                      >
                        <span>رابط التقديم</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
