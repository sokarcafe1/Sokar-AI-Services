import React, { useState } from 'react';
import { EducationService } from '../types';
import { Search, Trophy, ExternalLink, GraduationCap, X, CheckCircle2 } from 'lucide-react';

interface ResultsQuickWidgetProps {
  onClose: () => void;
  resultsServices: EducationService[];
  onOpenServiceDetails: (service: EducationService) => void;
}

export const ResultsQuickWidget: React.FC<ResultsQuickWidgetProps> = ({
  onClose,
  resultsServices,
  onOpenServiceDetails,
}) => {
  const [selectedExamType, setSelectedExamType] = useState('thanaweya');
  const [governorate, setGovernorate] = useState('cairo');
  const [seatNumber, setSeatNumber] = useState('');

  const governorates = [
    { id: 'cairo', name: 'محافظة القاهرة (البوابة التعليمية)' },
    { id: 'giza', name: 'محافظة الجيزة' },
    { id: 'alex', name: 'محافظة الإسكندرية' },
    { id: 'dakahlia', name: 'محافظة الدقهلية' },
    { id: 'sharqia', name: 'محافظة الشرقية' },
    { id: 'qalyubia', name: 'محافظة القليوبية' },
    { id: 'monufia', name: 'محافظة المنوفية' },
    { id: 'gharbia', name: 'محافظة الغربية' },
    { id: 'beheira', name: 'محافظة البحيرة' },
    { id: 'fayoum', name: 'محافظة الفيوم' },
    { id: 'minya', name: 'محافظة المنيا' },
    { id: 'asyut', name: 'محافظة أسيوط' },
    { id: 'sohag', name: 'محافظة سوهاج' },
    { id: 'qena', name: 'محافظة قنا' },
  ];

  const handleGoToResultsPortals = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTargetUrl = () => {
    if (selectedExamType === 'thanaweya') return 'https://nateega.emis.gov.eg';
    if (selectedExamType === 'tansik') return 'https://tansik.digital.gov.eg';
    if (selectedExamType === 'technical') return 'https://fany.emis.gov.eg';
    if (selectedExamType === 'preparatory') {
      if (governorate === 'cairo') return 'https://natiga.cairo.gov.eg';
      return 'https://eduserv.cairo.gov.eg';
    }
    return 'https://eduserv.cairo.gov.eg/Results/DifferentStages';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 relative text-slate-800">
        
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-sm sm:text-base">مُستعلم نتائج الامتحانات المباشر</h2>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  محدث بانتظام مع الجهات الرسمية 36
                </span>
              </div>
              <p className="text-xs text-sky-700 font-bold">روابط النتيجة الرسمية بمحافظتك</p>
              <p className="text-[11px] text-slate-500">اختر المرحلة والمحافظة للانتقال فوراً لرابط النتيجة الرسمية المعتمد في جمهوريتك.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Exam Type Selector */}
          <div>
            <label className="block text-slate-800 font-bold mb-2">اختر النتيجة والشهادة المراد الاستعلام عنها:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedExamType('thanaweya')}
                className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                  selectedExamType === 'thanaweya'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>🎓 الثانوية العامة</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedExamType('tansik')}
                className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                  selectedExamType === 'tansik'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>🏛️ التنسيق الإلكتروني</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedExamType('preparatory')}
                className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                  selectedExamType === 'preparatory'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>📜 الشهادة الإعدادية</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedExamType('technical')}
                className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                  selectedExamType === 'technical'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>📖 الدبلومات الفنية</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedExamType('primary')}
                className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                  selectedExamType === 'primary'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>🏫 سنوات النقل</span>
              </button>
            </div>
          </div>

          {/* Governorate selector if preparatory or primary */}
          {(selectedExamType === 'preparatory' || selectedExamType === 'primary') && (
            <div>
              <label className="block text-slate-800 font-bold mb-1">حدد المحافظة:</label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
              >
                {governorates.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Seat number input note */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <label className="block text-slate-800 font-bold mb-1">أدخل رقم الجلوس (للحفظ والمساعدة عند الانتقال):</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                placeholder="مثلاً: 123456"
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-500"
              />
              {seatNumber && (
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(seatNumber)}
                  className="px-3 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs shrink-0"
                >
                  نسخ رقم الجلوس
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              * سيتم نسخ رقم الجلوس تلقائياً لتلصقه في الحقل المخصص بالموقع الحكومي الرسمي.
            </p>
          </div>

          {/* Direct Launch Button */}
          <div className="pt-2">
            <button
              onClick={() => handleGoToResultsPortals(getTargetUrl())}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <span>انتقل الآن لموقع النتيجة الرسمي المباشر</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Verified Services List */}
          <div className="pt-3 border-t border-slate-200">
            <p className="font-bold text-slate-700 mb-2">أو تصفح دليل الخدمات والنتائج الموثقة بالمنصة:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {resultsServices.slice(0, 4).map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => {
                    onClose();
                    onOpenServiceDetails(srv);
                  }}
                  className="p-2 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-right transition-colors flex items-center justify-between"
                >
                  <span className="font-bold text-slate-800 text-[11px] truncate">{srv.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
