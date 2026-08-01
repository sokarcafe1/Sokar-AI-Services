import React from 'react';
import { CategoryType } from '../types';
import { AuthSession } from '../types/auth';
import { Landmark, GraduationCap, School, Wrench, Building, Trophy, Search, Bookmark, Shield, PhoneCall, LogOut, KeyRound } from 'lucide-react';

interface HeaderProps {
  activeCategory: CategoryType | 'all';
  onSelectCategory: (cat: CategoryType | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  bookmarksCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarksOnly: () => void;
  onOpenAdmin: () => void;
  onOpenHotlines: () => void;
  onOpenAiAssistant: () => void;
  onOpenNews: () => void;
  onOpenCenters: () => void;
  onOpenCompare: () => void;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onOpenApi: () => void;
  onOpenMinistries: () => void;
  onOpenForms: () => void;
  onOpenDeadlines: () => void;
  onOpenEligibility: () => void;
  onOpenGlossary: () => void;
  onOpenLinkMonitor: () => void;
  onOpenLiveVerification?: () => void;
  onOpenGovSyncCenter?: () => void;
  onOpenUserDashboard: () => void;
  onOpenOfficeManagement?: () => void;
  onOpenSubscriptions?: () => void;
  onOpenSuperAdminCrm?: () => void;
  onOpenEnterpriseProduction?: () => void;
  onOpenCommercialRelease?: () => void;
  onOpenGmailIntegration?: () => void;
  onOpenIntegrationsCenter?: () => void;
  onOpenComprehensiveSettings?: () => void;
  onOpenNotificationCenter?: () => void;
  onOpenLegalAndAbout?: () => void;
  onOpenLandingWebsite?: () => void;
  onOpenOnlineCheckout?: () => void;
  onOpenSupportCenter?: () => void;
  onOpenReleaseNotes?: () => void;
  onOpenCrashReport?: () => void;
  onOpenCloudMonitoring?: () => void;
  onOpenProcedureAiGuide?: () => void;
  onOpenTrainingCenter?: () => void;
  onOpenDeveloperApi?: () => void;
  onOpenMobileCompanion?: () => void;
  onTriggerLiveSync?: () => void;
  isSyncingLive?: boolean;
  trialRemainingFormatted?: string | null;
  onResetTrialSession?: () => void;
  isAdminLoggedIn?: boolean;
  onAdminLogout?: () => void;
  authSession?: AuthSession | null;
  onOpenSessionManager?: () => void;
  onLogout?: () => void;
  lang?: 'ar' | 'en';
  onToggleLang?: () => void;
  themeMode?: 'light' | 'dark' | 'black';
  onToggleThemeMode?: () => void;
  onReadPage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  bookmarksCount,
  showBookmarksOnly,
  onToggleBookmarksOnly,
  onOpenAdmin,
  onOpenHotlines,
  onOpenAiAssistant,
  onOpenNews,
  onOpenCenters,
  onOpenCompare,
  onOpenAuth,
  onOpenNotifications,
  onOpenApi,
  onOpenMinistries,
  onOpenForms,
  onOpenDeadlines,
  onOpenEligibility,
  onOpenGlossary,
  onOpenLinkMonitor,
  onOpenLiveVerification,
  onOpenGovSyncCenter,
  onOpenUserDashboard,
  onOpenOfficeManagement,
  onOpenSubscriptions,
  onOpenSuperAdminCrm,
  onOpenEnterpriseProduction,
  onOpenCommercialRelease,
  onOpenGmailIntegration,
  onOpenIntegrationsCenter,
  onOpenComprehensiveSettings,
  onOpenNotificationCenter,
  onOpenLegalAndAbout,
  onOpenLandingWebsite,
  onOpenOnlineCheckout,
  onOpenSupportCenter,
  onOpenReleaseNotes,
  onOpenCrashReport,
  onOpenCloudMonitoring,
  onOpenProcedureAiGuide,
  onOpenTrainingCenter,
  onOpenDeveloperApi,
  onOpenMobileCompanion,
  onTriggerLiveSync,
  isSyncingLive = false,
  trialRemainingFormatted,
  onResetTrialSession,
  isAdminLoggedIn = false,
  onAdminLogout,
  authSession,
  onOpenSessionManager,
  onLogout,
  lang = 'ar',
  onToggleLang,
  themeMode = 'light',
  onToggleThemeMode,
  onReadPage,
}) => {

  const sections: { id: CategoryType; title: string; emoji: string }[] = [
    { id: 'interior', title: 'الأحوال المدنية والداخلية', emoji: '🆔' },
    { id: 'traffic', title: 'المرور والنيابة', emoji: '🚗' },
    { id: 'housing', title: 'الإسكان والشهر العقاري', emoji: '🏠' },
    { id: 'electricity', title: 'الكهرباء والطاقة', emoji: '⚡' },
    { id: 'water', title: 'المياه والصرف', emoji: '💧' },
    { id: 'gas', title: 'الغاز الطبيعي', emoji: '🔥' },
    { id: 'healthcare', title: 'الصحة والتأمين الصحي', emoji: '🏥' },
    { id: 'employment', title: 'التوظيف وبوابة الوظائف', emoji: '💼' },
    { id: 'taxes', title: 'الضرائب والسجل التجاري', emoji: '🧾' },
    { id: 'academies', title: 'الكليات العسكرية والشرطة', emoji: '🛡️' },
    { id: 'travel', title: 'السفر والمصريون بالخارج', emoji: '✈️' },
    { id: 'social', title: 'الدعم الاجتماعي ومصر الرقمية', emoji: '🤝' },
    { id: 'schools', title: 'المدارس والتقديمات', emoji: '🏫' },
    { id: 'results', title: 'نتائج الامتحانات', emoji: '🎯' },
    { id: 'universities', title: 'الجامعات والمعاهد', emoji: '🎓' },
    { id: 'tansik', title: 'تنسيق الجامعات', emoji: '🏛' },
    { id: 'technical', title: 'التعليم الفني', emoji: '📖' },
    { id: 'teachers', title: 'خدمات المعلمين', emoji: '👨‍🏫' },
    { id: 'portals', title: 'المنصات وبنك المعرفة', emoji: '📚' },
  ];

  const isBlackTheme = themeMode === 'black';
  const isDarkTheme = themeMode === 'dark';

  return (
    <header className={`sticky top-0 z-40 text-white shadow-md border-b transition-colors duration-200 ${
      isBlackTheme 
        ? 'bg-zinc-950 border-zinc-800' 
        : isDarkTheme 
        ? 'bg-slate-900 border-slate-800' 
        : 'bg-sky-900 border-sky-800'
    }`}>
      {/* Top Utility Bar */}
      <div className={`text-xs py-2 px-4 border-b transition-colors duration-200 ${
        isBlackTheme 
          ? 'bg-black text-zinc-300 border-zinc-800' 
          : isDarkTheme 
          ? 'bg-slate-950 text-slate-300 border-slate-800' 
          : 'bg-sky-950 text-sky-200 border-sky-800/80'
      }`}>
        <div className="w-full px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2">
          
          {/* Live Sync Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerLiveSync}
              disabled={isSyncingLive}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-extrabold text-[11px] border transition-all shadow-xs ${
                isSyncingLive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                  : isBlackTheme
                  ? 'bg-amber-400 text-black border-amber-300 hover:bg-amber-300'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 hover:from-emerald-500 hover:to-teal-500'
              }`}
              title="تحديث الخدمات والبيانات فورياً وبشكل لحظي من الخوادم الحكومية الرسمية"
            >
              <span className={`w-2 h-2 rounded-full ${isSyncingLive ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
              <span>{isSyncingLive ? 'جاري المزامنة اللحظية...' : '🔄 تحديث الخدمات لحظياً'}</span>
            </button>

            <span className={`hidden sm:inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full border text-[10px] ${
              isBlackTheme 
                ? 'text-zinc-400 bg-zinc-900 border-zinc-800' 
                : 'text-sky-300 bg-sky-900/60 border-sky-700/60'
            }`}>
              ⚡ المزامنة 24/7 نشطة
            </span>

            {trialRemainingFormatted && (
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg bg-amber-400 text-black border border-amber-300 shadow-xs">
                  ⏱️ متبقي من الفترة التجريبية: {trialRemainingFormatted}
                </span>
                {onResetTrialSession && (
                  <button
                    onClick={onResetTrialSession}
                    className="text-[10px] font-extrabold px-2 py-1 rounded-lg bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700 transition-colors"
                    title="إلغاء التجربة الحالية وتوفير نافذة تسجيل عميل تجريبي جديد"
                  >
                    إعادة التسجيل 🔄
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
            {onOpenIntegrationsCenter && (
              <button
                onClick={onOpenIntegrationsCenter}
                className="flex items-center gap-1.5 text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-3 py-1 rounded-lg font-black border border-indigo-400 transition-all shadow-md shadow-indigo-950/40"
                title="مركز التكاملات الإلكترونية الموحد"
              >
                <span>🔌 التكاملات (Integrations)</span>
              </button>
            )}

            {onOpenComprehensiveSettings && (
              <button
                onClick={onOpenComprehensiveSettings}
                className="flex items-center gap-1.5 text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-3 py-1 rounded-lg font-black border border-amber-400 transition-all shadow-md shadow-amber-950/40"
                title="إعدادات المكتب الكاملة والطباعة"
              >
                <span>⚙️ إعدادات المكتب</span>
              </button>
            )}

            {onOpenNotificationCenter && (
              <button
                onClick={onOpenNotificationCenter}
                className="flex items-center gap-1.5 text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 px-3 py-1 rounded-lg font-black border border-rose-400 transition-all shadow-md shadow-rose-950/40"
                title="مركز الإشعارات والتنبيهات المباشرة"
              >
                <span>🔔 الإشعارات</span>
              </button>
            )}

            {onOpenLegalAndAbout && (
              <button
                onClick={onOpenLegalAndAbout}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg font-bold border border-slate-700 transition-all"
                title="عن النظام، الشروط وسياسة الخصوصية"
              >
                <span>📄 الشروط والتواصل</span>
              </button>
            )}

            {onOpenLandingWebsite && (
              <button
                onClick={onOpenLandingWebsite}
                className="flex items-center gap-1.5 text-emerald-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 px-3 py-1 rounded-lg font-black border border-emerald-300 transition-all shadow-md"
                title="الموقع الرسمي لبيع وتراخيص النظام"
              >
                <span>🌐 موقع النظام (Landing)</span>
              </button>
            )}

            {onOpenSupportCenter && (
              <button
                onClick={onOpenSupportCenter}
                className="flex items-center gap-1.5 text-white bg-gradient-to-r from-sky-600 to-cyan-700 hover:from-sky-500 hover:to-cyan-600 px-3 py-1 rounded-lg font-black border border-sky-400 transition-all shadow-md"
                title="مركز الدعم الفني وتذاكر المساعدة"
              >
                <span>🛟 الدعم الفني (Support)</span>
              </button>
            )}

            {onOpenProcedureAiGuide && (
              <button
                onClick={onOpenProcedureAiGuide}
                className="flex items-center gap-1.5 text-amber-950 bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded-lg font-black border border-amber-300 transition-all"
                title="مساعد الذكاء الاصطناعي للإجراءات والمستندات الحكومية"
              >
                <span>🤖 مساعد الإجراءات</span>
              </button>
            )}

            {onOpenTrainingCenter && (
              <button
                onClick={onOpenTrainingCenter}
                className="flex items-center gap-1.5 text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 px-2.5 py-1 rounded-lg font-bold border border-emerald-700 transition-all"
                title="مركز الكورسات والتدريب للموظفين"
              >
                <span>🎓 التدريب والكورسات</span>
              </button>
            )}

            {onOpenGmailIntegration && (
              <button
                onClick={onOpenGmailIntegration}
                className="flex items-center gap-1.5 text-white bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 px-3 py-1 rounded-lg font-black border border-rose-400 transition-all shadow-md shadow-rose-950/40"
                title="Google Gmail Workspace Integration"
              >
                <span>📧 Gmail Workspace</span>
              </button>
            )}

            {onOpenCommercialRelease && (
              <button
                onClick={onOpenCommercialRelease}
                className="flex items-center gap-1.5 text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 px-3 py-1 rounded-lg font-black border border-amber-300 transition-all shadow-md shadow-amber-950/40"
                title="Phase 13 Commercial Release, Marketplace & White-Label"
              >
                <span>🛒 Phase 13 Commercial Release & Marketplace</span>
              </button>
            )}

            {onOpenEnterpriseProduction && (
              <button
                onClick={onOpenEnterpriseProduction}
                className="flex items-center gap-1.5 text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-yellow-300 hover:to-amber-200 px-3 py-1 rounded-lg font-black border border-amber-300 transition-all shadow-md shadow-amber-950/40 animate-pulse"
                title="Phase 12 Enterprise Infrastructure & AI Hub"
              >
                <span>⚡ Phase 12 Enterprise Hub</span>
              </button>
            )}

            {onOpenSuperAdminCrm && (
              <button
                onClick={onOpenSuperAdminCrm}
                className="flex items-center gap-1.5 text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-yellow-300 hover:to-amber-300 px-3 py-1 rounded-lg font-black border border-amber-300 transition-all shadow-md shadow-amber-950/40"
                title="لوحة إدارة المكاتب المسجلة وتراخيص المشتركين CRM"
              >
                <span>📊 حسابات المشتركين (CRM)</span>
              </button>
            )}

            {onOpenSubscriptions && (
              <button
                onClick={onOpenSubscriptions}
                className="flex items-center gap-1.5 text-amber-300 bg-amber-950/80 hover:bg-amber-900 px-2.5 py-1 rounded-lg font-black border border-amber-600/60 transition-colors shadow-xs"
                title="باقات الاشتراك الشهري والسنوي"
              >
                <span>💳 باقات الاشتراك (شهري/سنوي)</span>
              </button>
            )}

            {authSession && authSession.user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenSessionManager}
                  className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/90 hover:bg-emerald-900 px-3 py-1 rounded-lg border border-emerald-500/80 font-bold transition-all shadow-xs"
                  title="عرض تفاصيل الجلسة والأجهزة النشطة"
                >
                  <span className="text-base">{authSession.user.avatarEmoji || '👤'}</span>
                  <span>{(authSession.user.fullName || authSession.user.username || 'مستخدم').split(' ')[0]}</span>
                  <span className="text-[9px] bg-emerald-800 text-white font-extrabold px-1.5 py-0.2 rounded">
                    {authSession.user.roleTitleAr || 'مستخدم'}
                  </span>
                </button>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1 text-rose-200 bg-rose-950/80 hover:bg-rose-900 px-2.5 py-1 rounded-lg border border-rose-700/60 font-bold text-[11px] transition-colors"
                    title="تسجيل الخروج المباشر"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>خروج</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 text-sky-100 hover:text-white bg-sky-800/80 hover:bg-sky-700 px-2.5 py-1 rounded-lg border border-sky-600 font-bold transition-colors"
                title="تسجيل دخول المواطنين والعملاء (تجريبي 24 ساعة)"
              >
                <span>👤 دخول العملاء (تجريبي 24س)</span>
              </button>
            )}

            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-600/60 font-black transition-colors"
                  title="فتح لوحة التحكم الخاصة بالمدير"
                >
                  <span>🛡️ مدير النظام (hemasokar24)</span>
                </button>
                {onAdminLogout && (
                  <button
                    onClick={onAdminLogout}
                    className="flex items-center gap-1 text-red-200 bg-red-950/90 hover:bg-red-900 px-2 py-1 rounded-lg border border-red-700 font-bold text-[10px] transition-colors"
                    title="تسجيل خروج الأدمن"
                  >
                    <span>خروج 🚪</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-amber-300 bg-amber-950/80 hover:bg-amber-900 px-2.5 py-1 rounded-lg border border-amber-600/60 font-black transition-colors"
                title="تسجيل دخول الأدمن (hemasokar23@gmail.com)"
              >
                <span>🛡️ دخول الأدمن (Admin)</span>
              </button>
            )}

            {onToggleThemeMode && (
              <button
                onClick={onToggleThemeMode}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold border transition-all ${
                  isBlackTheme 
                    ? 'bg-amber-400 text-black border-amber-300 font-extrabold' 
                    : isDarkTheme 
                    ? 'bg-zinc-800 text-sky-200 border-zinc-700' 
                    : 'bg-zinc-950 text-amber-300 border-zinc-700 hover:bg-black'
                }`}
                title="تغيير مظهر الموقع"
              >
                <span>{isBlackTheme ? '🖤 الوضع الأسود' : isDarkTheme ? '🌙 الوضع الليلي' : '🖤 الوضع الأسود'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full px-4 sm:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Executive Brand Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('all'); }}
              className="flex items-center gap-3.5 group"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all shrink-0 ${
                isBlackTheme 
                  ? 'bg-amber-400 text-black border border-amber-300' 
                  : 'bg-white text-sky-900'
              }`}>
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black leading-none text-white tracking-tight">
                    Sokar AI Services
                  </h1>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                    isBlackTheme ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-sky-800 text-sky-200 border-sky-700'
                  }`}>
                    الموحدة
                  </span>
                </div>
                <p className={`text-xs font-semibold mt-1 ${isBlackTheme ? 'text-zinc-400' : 'text-sky-200'}`}>
                  الخدمات الالكترونيه في موقع واحد
                </p>
              </div>
            </a>

            {/* Quick Mobile Bookmark Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onToggleBookmarksOnly}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  showBookmarksOnly
                    ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold'
                    : 'bg-sky-800 border-sky-700 text-sky-200'
                }`}
                title="الخدمات المحفوظة لوقت لاحق"
              >
                <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? 'fill-slate-950 text-slate-950' : ''}`} />
                <span>المحفوظات</span>
                {bookmarksCount > 0 && (
                  <span className="bg-white text-sky-900 font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                    {bookmarksCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-sky-300 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن أي خدمة حكومية (رقم قومي، مرور، إسكان، كهرباء)..."
              className="w-full pl-3 pr-9 py-1.5 rounded-lg bg-sky-800/80 border border-sky-700 text-white placeholder-sky-300/70 text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sky-300 hover:text-white text-xs bg-sky-700 w-4 h-4 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bookmarks Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onToggleBookmarksOnly}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-2 transition-all ${
                showBookmarksOnly
                  ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-md'
                  : 'bg-sky-800/80 border-sky-700 text-sky-200 hover:bg-sky-800 hover:text-white'
              }`}
              title="تصفية واستعراض الخدمات المحفوظة لوقت لاحق في حسابك"
            >
              <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? 'fill-slate-950 text-slate-950' : ''}`} />
              <span>الخدمات المحفوظة (Save for Later)</span>
              {bookmarksCount > 0 && (
                <span className={`font-black px-1.5 py-0.2 rounded-md text-[11px] ${
                  showBookmarksOnly ? 'bg-slate-950 text-amber-300' : 'bg-white text-sky-900'
                }`}>
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories Navigation Bar */}
        <div className="mt-3 pt-2.5 border-t border-sky-800/80 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === 'all' && !showBookmarksOnly
                  ? 'bg-sky-600 text-white font-bold shadow-sm'
                  : 'text-sky-200 hover:text-white hover:bg-sky-800/60'
              }`}
            >
              <span>🏛️</span>
              <span>جميع القطاعات</span>
            </button>

            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => onSelectCategory(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeCategory === sec.id && !showBookmarksOnly
                    ? 'bg-sky-600 text-white font-bold shadow-sm'
                    : 'text-sky-200 hover:text-white hover:bg-sky-800/60'
                }`}
              >
                <span>{sec.emoji}</span>
                <span>{sec.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
