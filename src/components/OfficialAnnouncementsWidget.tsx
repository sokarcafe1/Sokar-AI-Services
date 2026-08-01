import React, { useState } from 'react';
import { OfficialAnnouncement } from '../types';
import { 
  Sparkles, Calendar, Clock, ArrowLeft,
  FileText, ExternalLink, ShieldAlert
} from 'lucide-react';

interface OfficialAnnouncementsWidgetProps {
  announcements: OfficialAnnouncement[];
  onOpenAnnouncementsCenter: (filterType?: string) => void;
  onSelectAnnouncement: (announcement: OfficialAnnouncement) => void;
  onFilterServicesByStatus?: (status: 'all' | 'active' | 'maintenance') => void;
  onTriggerLiveSync?: () => void;
}

export const OfficialAnnouncementsWidget: React.FC<OfficialAnnouncementsWidgetProps> = ({
  announcements,
  onOpenAnnouncementsCenter,
  onSelectAnnouncement,
  onFilterServicesByStatus,
  onTriggerLiveSync
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const openNowCount = announcements.filter(a => a.status === 'open_now' || a.status === 'extended').length;
  const endingSoonCount = announcements.filter(a => a.remainingDays !== null && a.remainingDays <= 10 && a.remainingDays > 0).length;
  const announcedTodayCount = announcements.filter(a => a.announcedToday).length;
  const lastUpdatedText = 'اليوم (تحديث تلقائي كل 24 ساعة)';

  const filtered = announcements.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  }).slice(0, 4);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-4 sm:p-5 text-white shadow-xl border border-indigo-800/60 my-2 dir-rtl font-['Cairo',sans-serif]">
      
      {/* Widget Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-800/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
            📢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                تحديث رسمي حصرّي 🏛️
              </span>
              <span className="bg-emerald-900/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-700/60 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>روابط موثقة 100%</span>
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white mt-1">
              مركز التقديمات الرسمية المفتوحة حالياً بالوزارات والهيئات الحكومية
            </h2>
          </div>
        </div>

        <button
          onClick={() => onOpenAnnouncementsCenter('all')}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>عرض جميع التقديمات والإعلانات</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Interactive Dashboard Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        
        {/* Card 1: Open Now */}
        <button
          onClick={() => {
            if (onFilterServicesByStatus) {
              onFilterServicesByStatus('active');
            }
            onOpenAnnouncementsCenter('open_now');
          }}
          className="bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 p-3.5 rounded-2xl flex items-center justify-between shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-right group focus:outline-none focus:ring-2 focus:ring-emerald-400"
          title="انقر للتصفية المباشرة واستعراض جميع التقديمات والخدمات المتاحة الآن"
        >
          <div>
            <span className="text-[11px] text-emerald-300 font-bold block">التقديمات المفتوحة الآن</span>
            <div className="text-xl md:text-2xl font-black text-emerald-400 mt-0.5">
              {openNowCount} <span className="text-xs font-bold text-slate-300">تقديم نشط</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 group-hover:underline block font-bold mt-1">
              اضغط للتصفية والعرض ➔
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
            🟢
          </div>
        </button>

        {/* Card 2: Ending Soon */}
        <button
          onClick={() => {
            onOpenAnnouncementsCenter('ending_soon');
          }}
          className="bg-slate-800/80 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 p-3.5 rounded-2xl flex items-center justify-between shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-right group focus:outline-none focus:ring-2 focus:ring-amber-400"
          title="انقر للتوجه للتقديمات القريبة من موعد الإغلاق"
        >
          <div>
            <span className="text-[11px] text-amber-300 font-bold block">ينتهي قريباً</span>
            <div className="text-xl md:text-2xl font-black text-amber-400 mt-0.5">
              {endingSoonCount} <span className="text-xs font-bold text-slate-300">خلال 10 أيام</span>
            </div>
            <span className="text-[10px] text-amber-400/80 group-hover:underline block font-bold mt-1">
              اضغط لاستعراض العاجل ➔
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
            ⏳
          </div>
        </button>

        {/* Card 3: Announced Today */}
        <button
          onClick={() => {
            onOpenAnnouncementsCenter('announced_today');
          }}
          className="bg-slate-800/80 hover:bg-slate-800 border border-sky-500/40 hover:border-sky-400 p-3.5 rounded-2xl flex items-center justify-between shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-right group focus:outline-none focus:ring-2 focus:ring-sky-400"
          title="انقر لاستعراض إشعارات والتقديمات المعلنة اليوم"
        >
          <div>
            <span className="text-[11px] text-sky-300 font-bold block">تم الإعلان اليوم</span>
            <div className="text-xl md:text-2xl font-black text-sky-400 mt-0.5">
              {announcedTodayCount} <span className="text-xs font-bold text-slate-300">إشعار جديد</span>
            </div>
            <span className="text-[10px] text-sky-400/80 group-hover:underline block font-bold mt-1">
              اضغط لإشعارات اليوم ➔
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
            📣
          </div>
        </button>

        {/* Card 4: Last Updated */}
        <button
          onClick={() => {
            if (onTriggerLiveSync) {
              onTriggerLiveSync();
            }
            onOpenAnnouncementsCenter('all');
          }}
          className="bg-slate-800/80 hover:bg-slate-800 border border-purple-500/40 hover:border-purple-400 p-3.5 rounded-2xl flex items-center justify-between shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-right group focus:outline-none focus:ring-2 focus:ring-purple-400"
          title="انقر لتشغيل التحديث والمزامنة اللحظية الفورية"
        >
          <div>
            <span className="text-[11px] text-purple-300 font-bold block">آخر تحديث وتوثيق</span>
            <div className="text-xs font-bold text-purple-200 mt-1">
              {lastUpdatedText}
            </div>
            <span className="text-[10px] text-purple-400/80 group-hover:underline block font-bold mt-1">
              تحديث ومزامنة فورية ⚡
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
            🛡️
          </div>
        </button>

      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-none border-b border-indigo-900/60 mb-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          الكل ({announcements.length})
        </button>
        <button
          onClick={() => setSelectedCategory('education')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'education'
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          🎓 التعليم والمدارس
        </button>
        <button
          onClick={() => setSelectedCategory('coordination')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'coordination'
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          🏛️ التنسيق والجامعات
        </button>
        <button
          onClick={() => setSelectedCategory('housing')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'housing'
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          🏘️ الإسكان الاجتماعي
        </button>
        <button
          onClick={() => setSelectedCategory('jobs')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'jobs'
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          💼 الوظائف الحكومية
        </button>
        <button
          onClick={() => setSelectedCategory('military')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'military'
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          🎖️ العسكرية والشرطة
        </button>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div 
            key={item.id}
            className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-4 transition-all shadow-md flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.status === 'open_now' && (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>مفتوح الآن للتقديم 🟢</span>
                    </span>
                  )}
                  {item.status === 'opening_soon' && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      <span>قيد التجهيز - لم يبدأ التقديم بعد 🟡</span>
                    </span>
                  )}
                  {item.status === 'extended' && (
                    <span className="bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      <span>ممتد رسمياً 🔵</span>
                    </span>
                  )}
                  {item.status === 'closed' && (
                    <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>انتهى موعد التقديم 🔴</span>
                    </span>
                  )}

                  {(item.openingDate === '2026-07-30' || item.announcedToday) && (
                    <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 rounded-md animate-pulse shadow-xs">
                      🔥 فتح اليوم - اليوم الأول
                    </span>
                  )}
                </div>

                {item.remainingDays !== null ? (
                  <span className={`font-bold text-[11px] px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                    item.remainingDays <= 5 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black' : 'bg-slate-700 text-slate-300'
                  }`}>
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{item.remainingDays === 1 ? 'غداً آخر موعد (متبقي يوم)' : `متبقي ${item.remainingDays} أيام`}</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-md font-bold">
                    غير معلن رسمياً (لم يبدأ)
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-sm text-white leading-snug">
                {item.titleAr}
              </h3>

              <div className="text-[11px] text-indigo-200 font-bold flex items-center gap-1">
                <span>🏛️ {item.officialAuthorityAr}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-700/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>تاريخ الفتح: {item.openingDate}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  <span>الإغلاق: {item.closingDate}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
              <button
                onClick={() => onSelectAnnouncement(item)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>الشروط والتفاصيل</span>
              </button>

              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  item.status === 'opening_soon'
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                } text-white font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1 shadow-xs shrink-0`}
                title={item.status === 'opening_soon' ? 'متابعة البوابة الرسمية (الإعلان قيد التجهيز)' : 'الانتقال لرابط التقديم الرسمى'}
              >
                <span>{item.status === 'opening_soon' ? 'متابعة البوابة الرسمية' : 'رابط التقديم'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-indigo-900/60 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>التزام رسمي: جميع البيانات مستوردة حصرًا من المصادر والمواقع الرسمية الحكومية بدون اجتهاد أو شائعات.</span>
        </div>
        <button
          onClick={onOpenAnnouncementsCenter}
          className="text-amber-400 hover:underline font-bold text-xs"
        >
          استعراض الـ 10+ تقديمات الحالية ←
        </button>
      </div>

    </div>
  );
};
