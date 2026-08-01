import React from 'react';
import { FilterOptions, EducationLevel, CategoryType } from '../types';
import { EDUCATION_LEVEL_LABELS } from '../utils/helpers';
import { EGYPT_GOVERNORATES } from '../data/centersData';
import { Filter, RotateCcw, Building2, GraduationCap, CheckCircle, MapPin } from 'lucide-react';

interface FiltersBarProps {
  filters: FilterOptions;
  onUpdateFilters: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  authoritiesList: string[];
  totalResultsCount: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  authoritiesList,
  totalResultsCount,
}) => {
  const levels: EducationLevel[] = ['all', 'citizens', 'youth', 'investors', 'kg', 'primary', 'preparatory', 'secondary', 'technical', 'university', 'postgraduate', 'teachers'];

  const categories: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: '🌐 جميع قطاعات المنصة' },
    { id: 'interior', label: '🆔 الأحوال المدنية والداخلية' },
    { id: 'traffic', label: '🚗 المرور والنيابة العامة' },
    { id: 'housing', label: '🏠 الإسكان والشهر العقاري' },
    { id: 'electricity', label: '⚡ الكهرباء والطاقة' },
    { id: 'water', label: '💧 المياه والصرف الصحي' },
    { id: 'gas', label: '🔥 الغاز الطبيعي' },
    { id: 'healthcare', label: '🏥 الصحة والتأمين الصحي' },
    { id: 'employment', label: '💼 التوظيف وبوابة الوظائف' },
    { id: 'taxes', label: '🧾 الضرائب والسجل التجاري' },
    { id: 'academies', label: '🛡️ الكليات العسكرية والشرطة' },
    { id: 'travel', label: '✈️ السفر والمصريون بالخارج' },
    { id: 'social', label: '🤝 الدعم الاجتماعي ومصر الرقمية' },
    { id: 'schools', label: '🏫 التقديمات والقبول المدرسي' },
    { id: 'results', label: '🎯 نتائج الامتحانات' },
    { id: 'universities', label: '🎓 الجامعات والمعاهد' },
    { id: 'tansik', label: '🏛️ تنسيق الجامعات' },
    { id: 'technical', label: '📖 التعليم الفني' },
    { id: 'teachers', label: '👨‍🏫 خدمات المعلمين' },
    { id: 'portals', label: '📚 المنصات التعليمية وبنك المعرفة' },
  ];


  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4 mb-3">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">تصفية وتصنيف الخدمات الحكومية</h2>
            <p className="text-[11px] text-slate-500">حدد المعايير أو المحافظة للوصول المباشر للخدمة الرسمية</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filter Button: Open Today */}
          <button
            onClick={() => onUpdateFilters({ openTodayOnly: !filters.openTodayOnly })}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border shadow-xs ${
              filters.openTodayOnly
                ? 'bg-amber-400 text-black border-amber-300 shadow-md animate-pulse ring-2 ring-amber-400/50'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
            }`}
          >
            <span className="text-amber-600">🔥</span>
            <span>الخدمات المتاحة للتقديم اليوم (الأقرب فتحاً)</span>
            {filters.openTodayOnly && <span className="text-[10px] bg-black text-amber-300 px-1.5 py-0.5 rounded-md font-extrabold">مُفعّل</span>}
          </button>

          <span className="text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            {totalResultsCount} خدمة متوفرة
          </span>

          <button
            onClick={onResetFilters}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
            title="إعادة ضبط الفلاتر"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">إعادة ضبط</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        
        {/* Filter by Governorate */}
        <div>
          <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" /> تصفية المحافظة:
          </label>
          <select
            value={filters.governorate || 'all'}
            onChange={(e) => onUpdateFilters({ governorate: e.target.value === 'all' ? undefined : e.target.value })}
            className="w-full p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value="all">📍 جميع المحافظات</option>
            {EGYPT_GOVERNORATES.filter((g) => !g.includes('الكل')).map((gov) => (
              <option key={gov} value={gov}>📍 {gov}</option>
            ))}
          </select>
        </div>

        {/* Filter by Category */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">نوع الخدمة والقطاع:</label>
          <select
            value={filters.category}
            onChange={(e) => onUpdateFilters({ category: e.target.value as CategoryType | 'all' })}
            className="w-full p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Filter by Education / Target Level */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">الفئة المستهدفة:</label>
          <select
            value={filters.level}
            onChange={(e) => onUpdateFilters({ level: e.target.value as EducationLevel | 'all' })}
            className="w-full p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>{EDUCATION_LEVEL_LABELS[lvl]}</option>
            ))}
          </select>
        </div>

        {/* Filter by Government Authority */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">الجهة الحكومية:</label>
          <select
            value={filters.authority}
            onChange={(e) => onUpdateFilters({ authority: e.target.value })}
            className="w-full p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value="all">جميع الجهات الحكومية</option>
            {authoritiesList.map((auth, idx) => (
              <option key={idx} value={auth}>{auth}</option>
            ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">حالة الخدمة:</label>
          <select
            value={filters.status}
            onChange={(e) => onUpdateFilters({ status: e.target.value })}
            className="w-full p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value="all">الجميع (نشط ومتاح)</option>
            <option value="active">🟢 متاحة ونشطة حالياً</option>
            <option value="maintenance">🟡 صيانة / تحديث مؤقت</option>
          </select>
        </div>

      </div>
    </div>
  );
};

