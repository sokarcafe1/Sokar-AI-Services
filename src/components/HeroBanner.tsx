import React from 'react';
import { CategoryType, FilterOptions } from '../types';
import { Filter, CheckCircle2, Search, ShieldCheck, MapPin, Building2, RotateCcw } from 'lucide-react';
import { EGYPT_GOVERNORATES } from '../data/centersData';

interface HeroBannerProps {
  onQuickSearch: (query: string, serviceId?: string) => void;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenResultsWidget: () => void;
  onFilterOpenToday?: () => void;
  totalServicesCount: number;
  themeMode?: 'light' | 'dark' | 'black';
  filters?: FilterOptions;
  onUpdateFilters?: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onQuickSearch,
  onSelectCategory,
  onOpenResultsWidget,
  onFilterOpenToday,
  totalServicesCount,
  themeMode = 'light',
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  const isBlackTheme = themeMode === 'black';

  const quickServicesList = [
    { label: '🆔 الرقم القومي', query: 'الرقم القومي', serviceId: 'interior-birth-cert' },
    { label: '🚗 مخالفات المرور', query: 'مخالفات المرور', serviceId: 'traffic-violations' },
    { label: '🏠 شقق الإسكان', query: 'الإسكان الاجتماعي', serviceId: 'housing-social-apartments' },
    { label: '⚡ فواتير الكهرباء', query: 'فواتير الكهرباء', serviceId: 'electricity-bill-inquiry' },
    { label: '🛒 التموين ودعم مصر', query: 'بطاقة التموين', serviceId: 'social-supply-cards' },
    { label: '🏛️ تنسيق الجامعات', query: 'تنسيق الجامعات', serviceId: 'tansik-stage1' },
    { label: '🎯 نتائج الامتحانات', query: 'نتائج الامتحانات', serviceId: 'results-widget' },
    { label: '📜 الشهر العقاري', query: 'الشهر العقاري', serviceId: 'housing-notary-services' },
    { label: '💼 وظائف حكومية', query: 'وظائف', serviceId: 'employment-jobs-portal' },
    { label: '🏫 التقديم المدرسي', query: 'التقديم المباشر', serviceId: 'primary-admission' },
  ];

  const categoriesList: { id: CategoryType | 'all'; label: string }[] = [
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
    <div className={`text-white border-b relative overflow-hidden transition-colors duration-200 ${
      isBlackTheme 
        ? 'bg-gradient-to-br from-black via-zinc-950 to-neutral-900 border-zinc-800' 
        : 'bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900 border-sky-800'
    }`}>
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

      <div className="w-full px-4 sm:px-6 py-3 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Main Hero Text & Quick Services */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
              isBlackTheme
                ? 'bg-zinc-900/90 text-amber-300 border-amber-500/40 shadow-xs'
                : 'bg-sky-800/80 text-sky-200 border-sky-600/60 shadow-xs'
            }`}>
              <ShieldCheck className={`w-4 h-4 ${isBlackTheme ? 'text-amber-400' : 'text-sky-300'}`} />
              <span>منصة Sokar AI Services الرقمية الموحدة — جمهورية مصر العربية</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
              Sokar AI Services — <span className={isBlackTheme ? "text-amber-400" : "text-sky-300"}>الخدمات الالكترونيه في موقع واحد</span>
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl font-medium ${
              isBlackTheme ? 'text-zinc-300' : 'text-sky-100/90'
            }`}>
              دليل متكامل يضم شروط، إجراءات، مستندات، رسوم، وخطوات تنفيذ كافة المعاملات الحكومية المصرية الرسمية، مع الربط المباشر بأحدث البوابات الإلكترونية المعتمدة.
            </p>

            {/* Quick Keyword Pills */}
            <div className="pt-2">
              <p className="text-xs text-sky-200 font-bold mb-2 flex items-center gap-1">
                <span>⚡ خدمات سريعة وأكثر بحثاً (اضغط للانتقال المباشر للخدمة):</span>
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {onFilterOpenToday && (
                  <button
                    onClick={onFilterOpenToday}
                    className="bg-amber-400 hover:bg-amber-300 text-black font-black border border-amber-300 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-md animate-pulse"
                  >
                    <span>🔥 الخدمات المتاحة للتقديم اليوم</span>
                  </button>
                )}

                {quickServicesList.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onQuickSearch(item.query, item.serviceId)}
                    className="bg-sky-800/80 hover:bg-sky-600 text-sky-100 hover:text-white border border-sky-700/80 hover:border-sky-400 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Slot: تصفية وتصنيف الخدمات الالكترونية */}
          <div className="lg:col-span-5 bg-slate-900/95 border border-sky-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center font-bold">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">تصفية وتصنيف الخدمات الالكترونية</h3>
                  <p className="text-[11px] text-sky-300/80 font-medium">حدد القطاع أو المحافظة للوصول الفوري للخدمة</p>
                </div>
              </div>

              {onResetFilters && (
                <button
                  onClick={onResetFilters}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md transition-colors border border-slate-700"
                  title="إعادة ضبط"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>ضبط</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Category Dropdown */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" /> اختر القطاع أو الفئة:
                </label>
                <select
                  value={filters?.category || 'all'}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    if (onUpdateFilters) onUpdateFilters({ category: val });
                    onSelectCategory(val);
                  }}
                  className="w-full p-2 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 font-medium text-xs focus:outline-none focus:border-sky-400"
                >
                  {categoriesList.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Governorate Dropdown */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> تصفية بالمحافظة:
                </label>
                <select
                  value={filters?.governorate || 'all'}
                  onChange={(e) => {
                    if (onUpdateFilters) onUpdateFilters({ governorate: e.target.value === 'all' ? undefined : e.target.value });
                  }}
                  className="w-full p-2 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 font-medium text-xs focus:outline-none focus:border-sky-400"
                >
                  <option value="all">🗺️ جميع محافظات الجمهورية (27 محافظة)</option>
                  {EGYPT_GOVERNORATES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Quick Actions & Status */}
              <div className="pt-1 flex items-center justify-between gap-2 text-[11px]">
                {onUpdateFilters && (
                  <button
                    onClick={() => onUpdateFilters({ openTodayOnly: !filters?.openTodayOnly })}
                    className={`px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                      filters?.openTodayOnly
                        ? 'bg-amber-400 text-black border-amber-300 shadow-sm'
                        : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>🔥 التقديمات اليوم</span>
                  </button>
                )}

                <div className="bg-sky-950/80 border border-sky-700/60 px-2.5 py-1 rounded-lg text-sky-200 font-bold">
                  <span>{totalServicesCount} خدمة متوفرة</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};


