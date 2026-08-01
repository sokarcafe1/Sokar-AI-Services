import React, { useState } from 'react';
import { OfficialAnnouncement, Language } from '../types';
import { 
  X, Calendar, Clock, CheckCircle, ExternalLink, Download, Search, 
  Filter, FileText, Building2, ShieldCheck, Sparkles, AlertCircle, AlertTriangle, Printer, ArrowRight
} from 'lucide-react';

interface OfficialAnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: OfficialAnnouncement[];
  initialSelectedAnnouncement?: OfficialAnnouncement | null;
  initialStatusFilter?: string;
  lang?: Language;
}

export const OfficialAnnouncementsModal: React.FC<OfficialAnnouncementsModalProps> = ({
  isOpen,
  onClose,
  announcements,
  initialSelectedAnnouncement,
  initialStatusFilter = 'all',
  lang = 'ar'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<OfficialAnnouncement | null>(
    initialSelectedAnnouncement || null
  );

  React.useEffect(() => {
    if (isOpen && initialStatusFilter) {
      setStatusFilter(initialStatusFilter);
    }
  }, [isOpen, initialStatusFilter]);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const filteredAnnouncements = announcements.filter(item => {
    const matchesSearch = item.titleAr.includes(searchTerm) || 
                          item.officialAuthorityAr.includes(searchTerm) ||
                          item.category.includes(searchTerm);
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'open_now') {
      matchesStatus = item.status === 'open_now' || item.status === 'extended';
    } else if (statusFilter === 'ending_soon') {
      matchesStatus = item.remainingDays !== null && item.remainingDays <= 10 && item.remainingDays > 0;
    } else if (statusFilter === 'announced_today') {
      matchesStatus = item.announcedToday === true || item.openingDate === '2026-07-30';
    } else if (statusFilter !== 'all') {
      matchesStatus = item.status === statusFilter;
    }

    return matchesSearch && matchesCat && matchesStatus;
  });

  const openNowCount = announcements.filter(a => a.status === 'open_now' || a.status === 'extended').length;
  const openingSoonCount = announcements.filter(a => a.status === 'opening_soon').length;
  const endingSoonCount = announcements.filter(a => a.remainingDays !== null && a.remainingDays <= 10 && a.remainingDays > 0).length;

  const handlePrintGuide = (announcement: OfficialAnnouncement) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>دليل التقدم الرسمي - ${announcement.titleAr}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; line-height: 1.6; color: #1e293b; }
            h1 { color: #0f172a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px; font-size: 20px; }
            .header-badge { background: #fef3c7; color: #92400e; padding: 5px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; display: inline-block; }
            .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 15px 0; font-size: 13px; }
            .section-title { font-weight: bold; color: #1e3a8a; margin-top: 20px; border-right: 4px solid #1e3a8a; padding-right: 8px; }
            ul { padding-right: 20px; font-size: 13px; }
            li { margin-bottom: 6px; }
            .footer { margin-top: 40px; font-size: 11px; text-align: center; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header-badge">مُوثق ومعتمد رسمياً 🏛️</div>
          <h1>${announcement.titleAr}</h1>
          
          <div class="meta-box">
            <div><strong>الجهة الرسمية المنسقة:</strong> ${announcement.officialAuthorityAr}</div>
            <div><strong>تاريخ فتح باب التقديم:</strong> ${announcement.openingDate}</div>
            <div><strong>تاريخ إغلاق باب التقديم:</strong> ${announcement.closingDate}</div>
            <div><strong>الرابط الرسمي المعتمد:</strong> ${announcement.officialUrl}</div>
            <div><strong>المصدر التوثيقي:</strong> ${announcement.verificationSource}</div>
          </div>

          <div class="section-title">المستندات والملفات المطلوبة للتقديم:</div>
          <ul>
            ${announcement.requiredDocumentsAr.map(doc => `<li>${doc}</li>`).join('')}
          </ul>

          <div class="section-title">شروط وقواعد القبول والتقديم:</div>
          <ul>
            ${announcement.eligibilityAr.map(rule => `<li>${rule}</li>`).join('')}
          </ul>

          <div class="section-title">خطوات وإجراءات التقديم بالتفصيل:</div>
          <ol style="padding-right: 20px; font-size: 13px;">
            ${announcement.applicationStepsAr.map(step => `<li style="margin-bottom:8px;">${step}</li>`).join('')}
          </ol>

          <div class="footer">
            تم استخراج هذا الدليل الرسمي من بوابة الخدمات الحكومية المصرية الموحدة | جميع الحقوق محفوظة لجمهورية مصر العربية 2026
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Banner Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between border-b border-indigo-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
              📢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                  المركز الرسمي للتقديمات 🏛️
                </span>
                <span className="bg-emerald-900 text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-700">
                  معتمد برابط حقيقي
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white mt-0.5">
                التقديمات المفتوحة حالياً بالوزارات والجهات الحكومية المصرية
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Announcement Inspector Modal View (if selected) */}
        {selectedAnnouncement ? (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-slate-50 flex-1">
            
            {/* Back to list button */}
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع لقائمة التقديمات المعلنة</span>
            </button>

            {/* Title Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedAnnouncement.status === 'open_now' ? 'مفتوح للتقديم الآن' : 'مفتوح رسمي'}</span>
                </span>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl">
                    متبقي {selectedAnnouncement.remainingDays ?? 'غير معلن'} يوم
                  </span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">
                    آخر تحديث: {selectedAnnouncement.lastOfficialUpdate}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {selectedAnnouncement.titleAr}
              </h2>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2 text-xs text-indigo-950 font-bold">
                <Building2 className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>الجهة الحكومية المنسقة: {selectedAnnouncement.officialAuthorityAr}</span>
              </div>

              {selectedAnnouncement.portalStatusNoteAr && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-950 rounded-2xl flex items-start gap-3 text-xs font-bold shadow-xs">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-extrabold text-rose-800 text-xs">🔴 تنبيه حالة الخادم والموقع الرسمي:</div>
                    <p className="leading-relaxed text-rose-900">{selectedAnnouncement.portalStatusNoteAr}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Dates & Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>تاريخ الفتح الرسمي:</span>
                </span>
                <div className="font-black text-slate-900 text-sm">
                  {selectedAnnouncement.openingDate}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  <span>تاريخ الإغلاق الرسمي:</span>
                </span>
                <div className="font-black text-slate-900 text-sm">
                  {selectedAnnouncement.closingDate}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>المصدر التوثيقي:</span>
                </span>
                <div className="font-bold text-slate-800 text-xs truncate">
                  {selectedAnnouncement.verificationSource}
                </div>
              </div>

            </div>

            {/* Required Documents Section */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>المستندات والملفات المطلوبة للتقديم (رسمياً):</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedAnnouncement.requiredDocumentsAr.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-black text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Rules */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>شروط ومعايير القبول والتأهيل الرسمي:</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedAnnouncement.eligibilityAr.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/60">
                    <span className="text-indigo-600 font-black shrink-0">✓</span>
                    <span className="font-bold leading-relaxed text-indigo-950">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Application Steps */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>خطوات وإجراءات التقديم الإلكتروني بالتفصيل:</span>
              </h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                {selectedAnnouncement.applicationStepsAr.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shrink-0">
                      خطوة {idx + 1}
                    </span>
                    <p className="font-bold text-slate-900 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Toolbar Bottom */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrintGuide(selectedAnnouncement)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>طباعة الدليل الورقي</span>
                </button>

                {selectedAnnouncement.officialPdfUrl && (
                  <a
                    href={selectedAnnouncement.officialPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>تحميل كراسة الشروط الرسمية (PDF)</span>
                  </a>
                )}
              </div>

              <a
                href={selectedAnnouncement.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>الانتقال لرابط التقديم الرسمي المعتمد</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        ) : (
          /* Main Announcements List View */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50 flex-1">
            
            {/* Top Search & Category Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث باسم التقديم (e.g. رياض الأطفال، سكن لكل المصريين، التنسيق، الكليات العسكرية...)"
                    className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="all">جميع التصنيفات الرسمية</option>
                    <option value="education">🎓 التعليم والمدارس</option>
                    <option value="coordination">🏛️ التنسيق والجامعات</option>
                    <option value="housing">🏘️ الإسكان الاجتماعي</option>
                    <option value="jobs">💼 الوظائف الحكومية</option>
                    <option value="military">🎖️ العسكرية والشرطة</option>
                    <option value="migration">✈️ الهجرة والمصريين بالخارج</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="all">جميع الحالات والتنبيهات</option>
                    <option value="open_now">🟢 التقديمات المفتوحة الآن</option>
                    <option value="ending_soon">⏳ ينتهي قريباً (خلال 10 أيام)</option>
                    <option value="announced_today">📣 تم الإعلان اليوم</option>
                    <option value="opening_soon">🟡 يفتح قريباً</option>
                    <option value="closed">🔴 مغلق</option>
                  </select>
                </div>
              </div>

              {/* Quick Status Stats Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    🟢 التقديمات المتاحة: {openNowCount}
                  </span>
                  <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    ⏳ ينتهي قريباً: {endingSoonCount}
                  </span>
                  <span className="text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                    الإجمالي المعروض: {filteredAnnouncements.length}
                  </span>
                </div>

                <span className="text-[11px] text-slate-500 font-normal">
                  * يلتزم المركز بعدم نشر أي مواعيد أو شروط غير معلنة رسمياً.
                </span>
              </div>

            </div>

            {/* List of Announcement Cards */}
            <div className="space-y-3">
              {filteredAnnouncements.map(item => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.status === 'open_now' && (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          <span>مفتوح للتقديم الآن 🟢</span>
                        </span>
                      )}
                      {item.status === 'opening_soon' && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                          <span>قيد التجهيز - لم يبدأ بعد 🟡</span>
                        </span>
                      )}
                      {item.status === 'extended' && (
                        <span className="bg-sky-100 text-sky-900 border border-sky-300 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                          <span>ممتد رسمياً 🔵</span>
                        </span>
                      )}
                      {item.status === 'closed' && (
                        <span className="bg-rose-100 text-rose-900 border border-rose-300 font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                          <span>مغلق حالياً 🔴</span>
                        </span>
                      )}

                      {item.portalStatus === 'server_down' && (
                        <span className="bg-rose-100 text-rose-900 border border-rose-300 font-black text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
                          <span>🔴 الموقع يتأثر بعطل بسيرفر الصندوق</span>
                        </span>
                      )}

                      {(item.openingDate === '2026-07-30' || item.announcedToday) && (
                        <span className="bg-amber-400 text-black font-black text-[10px] px-2.5 py-0.5 rounded-md animate-pulse shadow-xs">
                          🔥 فتح اليوم - اليوم الأول
                        </span>
                      )}

                      <span className="text-[11px] text-slate-500 font-bold">
                        🏛️ {item.officialAuthorityAr}
                      </span>
                    </div>

                    {item.remainingDays !== null ? (
                      <span className={`font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1 w-max ${
                        item.remainingDays <= 5 ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold' : 'bg-slate-100 text-slate-800'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{item.remainingDays === 1 ? 'غداً آخر موعد (متبقي يوم واحد)' : `متبقي ${item.remainingDays} أيام`}</span>
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-xl font-bold">
                        غير معلن رسمياً
                      </span>
                    )}

                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 hover:text-indigo-900 transition-colors">
                      {item.titleAr}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>تاريخ الفتح: <strong className="text-slate-900">{item.openingDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>تاريخ الإغلاق: <strong className="text-slate-900">{item.closingDate}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.verificationSource}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedAnnouncement(item)}
                        className="bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>التفاصيل والشروط</span>
                      </button>

                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
                      >
                        <span>الرابط</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Footer info */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 font-bold">
          جمهورية مصر العربية - المنظومة الوطنية الموحدة لربط وتوثيق الروابط والتسجيلات الحكومية الرسمية 2026
        </div>

      </div>
    </div>
  );
};
