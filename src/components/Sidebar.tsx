import React, { useState } from 'react';
import { CategoryType } from '../types';
import { AuthSession } from '../types/auth';
import {
  Landmark,
  GraduationCap,
  School,
  Building,
  Search,
  Bookmark,
  PhoneCall,
  LogOut,
  KeyRound,
  LayoutDashboard,
  Bot,
  Bell,
  SlidersHorizontal,
  Layers,
  Sparkles,
  HelpCircle,
  FileText,
  Calendar,
  ShieldCheck,
  Zap,
  RefreshCw,
  Users,
  Settings,
  Plug,
  X,
  Menu,
  ChevronLeft,
  Crown,
  MapPin,
  Newspaper,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
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
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
  isMobileOpen = false,
  onCloseMobile
}) => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);

  const categories: { id: CategoryType; title: string; emoji: string }[] = [
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
  ];

  const isBlackTheme = themeMode === 'black';
  const isDarkTheme = themeMode === 'dark';

  return (
    <>
      {/* Sidebar Mobile Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 h-screen flex flex-col border-l transition-all duration-300 font-sans shadow-2xl ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } ${
          isBlackTheme
            ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
            : isDarkTheme
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Sidebar Header & Brand Logo */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-950/40 border border-amber-300">
              <Landmark className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-sm sm:text-base text-white tracking-tight">Sokar AI Services</h1>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded-md font-bold">
                  v2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold">الخدمات الالكترونيه في موقع واحد</p>
            </div>
          </div>

          {/* Close mobile button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync & Trial Status Widget */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/80 space-y-2 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onTriggerLiveSync}
              disabled={isSyncingLive}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs border transition-all shadow-md ${
                isSyncingLive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-400'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingLive ? 'animate-spin' : ''}`} />
              <span>{isSyncingLive ? 'جاري المزامنة...' : 'مزامنة لحظية 24/7'}</span>
            </button>

            {onToggleThemeMode && (
              <button
                onClick={onToggleThemeMode}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl border border-slate-700 text-xs font-bold"
                title="تغيير مظهر الشاشة"
              >
                {themeMode === 'light' ? '☀️' : themeMode === 'black' ? '🌙' : '🌓'}
              </button>
            )}
          </div>

          {trialRemainingFormatted && (
            <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-2 text-center text-[11px] font-bold text-amber-300 flex items-center justify-between">
              <span>⏱️ الفترة التجريبية: {trialRemainingFormatted}</span>
              {onResetTrialSession && (
                <button
                  onClick={onResetTrialSession}
                  className="text-[9px] bg-rose-900 hover:bg-rose-800 text-rose-200 px-2 py-0.5 rounded font-black"
                >
                  إعادة
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 no-scrollbar">

          {/* Quick Search inside Sidebar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن خدمة حكومية..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-bold"
            />
          </div>

          {/* Primary Quick Actions / Core Modules */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 block">
              القائمة الرئيسية والخدمات
            </span>

            <button
              onClick={() => {
                onSelectCategory('all');
                onToggleBookmarksOnly();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-black transition-all ${
                showBookmarksOnly
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>الخدمات المحفوظة بالمفضلة</span>
              </div>
              <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold">
                {bookmarksCount}
              </span>
            </button>

            {/* Super Admin CRM Button */}
            {onOpenSuperAdminCrm && (
              <button
                onClick={onOpenSuperAdminCrm}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-950/40 hover:brightness-110 transition-all border border-amber-300"
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>حسابات المشتركين (CRM)</span>
                </div>
                <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded text-[9px] font-bold">
                  جديد
                </span>
              </button>
            )}

            {onOpenSubscriptions && (
              <button
                onClick={onOpenSubscriptions}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-amber-300 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>الاشتراكات وتوثيق HWID</span>
              </button>
            )}

            {onOpenOfficeManagement && (
              <button
                onClick={onOpenOfficeManagement}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Building className="w-4 h-4 text-cyan-400" />
                <span>إدارة المكتب والوردية الخزينة</span>
              </button>
            )}

            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>المساعد الذكي للخدمات AI</span>
              </button>
            )}

            {onOpenIntegrationsCenter && (
              <button
                onClick={onOpenIntegrationsCenter}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Plug className="w-4 h-4 text-indigo-400" />
                <span>التكاملات الإلكترونية MNO</span>
              </button>
            )}

            {onOpenComprehensiveSettings && (
              <button
                onClick={onOpenComprehensiveSettings}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Settings className="w-4 h-4 text-amber-400" />
                <span>إعدادات النظام والطباعة</span>
              </button>
            )}

            {onOpenNotificationCenter && (
              <button
                onClick={onOpenNotificationCenter}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Bell className="w-4 h-4 text-rose-400" />
                <span>مركز الإشعارات والتنبيهات</span>
              </button>
            )}

            {onOpenMinistries && (
              <button
                onClick={onOpenMinistries}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Landmark className="w-4 h-4 text-emerald-400" />
                <span>استعلام وزارات مصر</span>
              </button>
            )}

            {onOpenNews && (
              <button
                onClick={onOpenNews}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <Newspaper className="w-4 h-4 text-sky-400" />
                <span>مركز الأخبار والقرارات الرسمية</span>
              </button>
            )}

            {onOpenCenters && (
              <button
                onClick={onOpenCenters}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>خريطة مراكز الخدمة والسجل المدني</span>
              </button>
            )}

            {onOpenHotlines && (
              <button
                onClick={onOpenHotlines}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>أرقام الطوارئ والدعم الحكومي</span>
              </button>
            )}
          </div>

          {/* Categories Quick List */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="w-full flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 py-1"
            >
              <span>قطاعات الخدمات الحكومية</span>
              <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${categoriesExpanded ? '-rotate-90' : ''}`} />
            </button>

            {categoriesExpanded && (
              <div className="space-y-1">
                <button
                  onClick={() => onSelectCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === 'all' && !showBookmarksOnly
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <span>🏛️ جميع القطاعات</span>
                  <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded font-mono">الكل</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeCategory === cat.id && !showBookmarksOnly
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span className="truncate">{cat.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Footer User Session Profile */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 shrink-0 space-y-2">
          {authSession && authSession.user ? (
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                  {(authSession.user.fullName || authSession.user.username || authSession.user.email || 'م').charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <span className="font-bold text-xs text-white block truncate">
                    {authSession.user.fullName || authSession.user.username || authSession.user.email}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">{authSession.user.email}</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 text-rose-400 hover:bg-rose-950/80 rounded-xl transition-colors shrink-0"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-xs shadow-md"
            >
              تسجيل الدخول للنظام
            </button>
          )}
        </div>

      </aside>
    </>
  );
};
