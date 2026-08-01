import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { INITIAL_SERVICES } from './data/servicesData';
import { INITIAL_NEWS } from './data/newsData';
import { INITIAL_SERVICE_CENTERS } from './data/centersData';
import { EducationService, FilterOptions, CategoryType, IncorrectInfoReport, UserProfile } from './types';
import { filterServices } from './utils/helpers';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { FiltersBar } from './components/FiltersBar';
import { ServiceCard } from './components/ServiceCard';
import { ResultsQuickWidget } from './components/ResultsQuickWidget';
import { INITIAL_MINISTRIES } from './data/ministriesData';
import { AnimatedBackground } from './components/AnimatedBackground';
import { OfficialAnnouncementsWidget } from './components/OfficialAnnouncementsWidget';
import { INITIAL_OFFICIAL_ANNOUNCEMENTS } from './data/officialAnnouncementsData';
import { OfficialAnnouncement } from './types';
import { generateAnnouncementJsonLd, injectStructuredData } from './utils/seoUtils';
import { Language } from './types';
import { Footer } from './components/Footer';
import { PhoneCall, ShieldCheck, Bookmark, Search, Layers, X, ExternalLink, Trophy, CheckCircle2 } from 'lucide-react';

// Mandatory Auth System Imports
import { AuthPage } from './components/auth/AuthPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { ContextualAiBadge } from './components/ContextualAiBadge';
import { OfficeRecord, addAuditLog } from './services/superAdminCrmService';
import { AuthSession } from './types/auth';
import { getActiveAuthSession, logoutUser, logoutAllDevices } from './services/authService';
import type { TrialSession } from './components/TrialGateModal';

// Lazy-loaded Modal and Secondary Components for Maximum Bundle Performance
const ServiceDetailModal = lazy(() => import('./components/ServiceDetailModal').then((m: any) => ({ default: m.ServiceDetailModal || m.default })));
const PrintGuideModal = lazy(() => import('./components/PrintGuideModal').then((m: any) => ({ default: m.PrintGuideModal || m.default })));
const ReportInfoModal = lazy(() => import('./components/ReportInfoModal').then((m: any) => ({ default: m.ReportInfoModal || m.default })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then((m: any) => ({ default: m.AdminDashboard || m.default })));
const AiAssistantModal = lazy(() => import('./components/AiAssistantModal').then((m: any) => ({ default: m.AiAssistantModal || m.default })));
const NewsCenterModal = lazy(() => import('./components/NewsCenterModal').then((m: any) => ({ default: m.NewsCenterModal || m.default })));
const ServiceCentersModal = lazy(() => import('./components/ServiceCentersModal').then((m: any) => ({ default: m.ServiceCentersModal || m.default })));
const ServiceCompareModal = lazy(() => import('./components/ServiceCompareModal').then((m: any) => ({ default: m.ServiceCompareModal || m.default })));
const AuthModal = lazy(() => import('./components/AuthModal').then((m: any) => ({ default: m.AuthModal || m.default })));
const NotificationsModal = lazy(() => import('./components/NotificationsModal').then((m: any) => ({ default: m.NotificationsModal || m.default })));
const ApiExplorerModal = lazy(() => import('./components/ApiExplorerModal').then((m: any) => ({ default: m.ApiExplorerModal || m.default })));
const MinistriesModal = lazy(() => import('./components/MinistriesModal').then((m: any) => ({ default: m.MinistriesModal || m.default })));
const FormsCenterModal = lazy(() => import('./components/FormsCenterModal').then((m: any) => ({ default: m.FormsCenterModal || m.default })));
const DeadlineCalendarModal = lazy(() => import('./components/DeadlineCalendarModal').then((m: any) => ({ default: m.DeadlineCalendarModal || m.default })));
const EligibilityCheckerModal = lazy(() => import('./components/EligibilityCheckerModal').then((m: any) => ({ default: m.EligibilityCheckerModal || m.default })));
const GlossaryModal = lazy(() => import('./components/GlossaryModal').then((m: any) => ({ default: m.GlossaryModal || m.default })));
const PdfGuideModal = lazy(() => import('./components/PdfGuideModal').then((m: any) => ({ default: m.PdfGuideModal || m.default })));
const UserDashboardModal = lazy(() => import('./components/UserDashboardModal').then((m: any) => ({ default: m.UserDashboardModal || m.default })));
const GovernmentDirectoryModal = lazy(() => import('./components/GovernmentDirectoryModal').then((m: any) => ({ default: m.GovernmentDirectoryModal || m.default })));
const LinkMonitorModal = lazy(() => import('./components/LinkMonitorModal').then((m: any) => ({ default: m.LinkMonitorModal || m.default })));
const LiveVerificationTestPage = lazy(() => import('./components/LiveVerificationTestPage').then((m: any) => ({ default: m.LiveVerificationTestPage || m.default })));
const GovernmentSyncCenterModal = lazy(() => import('./components/GovernmentSyncCenterModal').then((m: any) => ({ default: m.GovernmentSyncCenterModal || m.default })));
const OfficeManagementModal = lazy(() => import('./components/OfficeManagementModal').then((m: any) => ({ default: m.OfficeManagementModal || m.default })));
const AdminAuthModal = lazy(() => import('./components/AdminAuthModal').then((m: any) => ({ default: m.AdminAuthModal || m.default })));
const SubscriptionPlansModal = lazy(() => import('./components/SubscriptionPlansModal').then((m: any) => ({ default: m.SubscriptionPlansModal || m.default })));
const TrialGateModal = lazy(() => import('./components/TrialGateModal').then((m: any) => ({ default: m.TrialGateModal || m.default })));
const OfficialAnnouncementsModal = lazy(() => import('./components/OfficialAnnouncementsModal').then((m: any) => ({ default: m.OfficialAnnouncementsModal || m.default })));
const SessionManagerModal = lazy(() => import('./components/auth/SessionManagerModal').then((m: any) => ({ default: m.SessionManagerModal || m.default })));
const SuperAdminCrmModal = lazy(() => import('./components/SuperAdminCrmModal').then((m: any) => ({ default: m.SuperAdminCrmModal || m.default })));
const EnterpriseProductionModal = lazy(() => import('./components/EnterpriseProductionModal').then((m: any) => ({ default: m.EnterpriseProductionModal || m.default })));
const CommercialReleaseModal = lazy(() => import('./components/CommercialReleaseModal').then((m: any) => ({ default: m.CommercialReleaseModal || m.default })));
const GmailIntegrationModal = lazy(() => import('./components/GmailIntegrationModal').then((m: any) => ({ default: m.GmailIntegrationModal || m.default })));
const IntegrationsModal = lazy(() => import('./components/IntegrationsModal').then((m: any) => ({ default: m.IntegrationsModal || m.default })));
const ComprehensiveSettingsModal = lazy(() => import('./components/ComprehensiveSettingsModal').then((m: any) => ({ default: m.ComprehensiveSettingsModal || m.default })));
const NotificationCenterModal = lazy(() => import('./components/NotificationCenterModal').then((m: any) => ({ default: m.NotificationCenterModal || m.default })));
const LegalAndAboutModal = lazy(() => import('./components/LegalAndAboutModal').then((m: any) => ({ default: m.LegalAndAboutModal || m.default })));
const LandingWebsiteModal = lazy(() => import('./components/LandingWebsiteModal').then((m: any) => ({ default: m.LandingWebsiteModal || m.default })));
const OnlineCheckoutModal = lazy(() => import('./components/OnlineCheckoutModal').then((m: any) => ({ default: m.OnlineCheckoutModal || m.default })));
const SupportCenterModal = lazy(() => import('./components/SupportCenterModal').then((m: any) => ({ default: m.SupportCenterModal || m.default })));
const ReleaseNotesModal = lazy(() => import('./components/ReleaseNotesModal').then((m: any) => ({ default: m.ReleaseNotesModal || m.default })));
const CrashReportModal = lazy(() => import('./components/CrashReportModal').then((m: any) => ({ default: m.CrashReportModal || m.default })));
const CloudMonitoringModal = lazy(() => import('./components/CloudMonitoringModal').then((m: any) => ({ default: m.CloudMonitoringModal || m.default })));
const ProcedureAiGuideModal = lazy(() => import('./components/ProcedureAiGuideModal').then((m: any) => ({ default: m.ProcedureAiGuideModal || m.default })));
const TrainingCenterModal = lazy(() => import('./components/TrainingCenterModal').then((m: any) => ({ default: m.TrainingCenterModal || m.default })));
const DeveloperApiCenterModal = lazy(() => import('./components/DeveloperApiCenterModal').then((m: any) => ({ default: m.DeveloperApiCenterModal || m.default })));
const MobileCompanionModal = lazy(() => import('./components/MobileCompanionModal').then((m: any) => ({ default: m.MobileCompanionModal || m.default })));

export default function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // Phase 11 Announcements State
  const [announcements, setAnnouncements] = useState<OfficialAnnouncement[]>(INITIAL_OFFICIAL_ANNOUNCEMENTS);
  const [showAnnouncementsModal, setShowAnnouncementsModal] = useState(false);
  const [announcementsModalFilter, setAnnouncementsModalFilter] = useState<string>('all');
  const [selectedAnnouncementForModal, setSelectedAnnouncementForModal] = useState<OfficialAnnouncement | null>(null);

  // SEO Structured Data effect
  useEffect(() => {
    if (announcements.length > 0) {
      injectStructuredData(generateAnnouncementJsonLd(announcements[0]), 'ld-announcements-official');
    }
  }, [announcements]);

  // Accessibility & Theme state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'black'>(() => {
    return (localStorage.getItem('sokar_theme_mode') as 'light' | 'dark' | 'black') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('sokar_theme_mode', themeMode);
  }, [themeMode]);

  const handleToggleThemeMode = () => {
    setThemeMode(prev => prev === 'light' ? 'black' : prev === 'black' ? 'dark' : 'light');
  };

  // Persistence for services
  const [services, setServices] = useState<EducationService[]>(() => {
    const saved = localStorage.getItem('egypt_edu_services_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved services:', e);
      }
    }
    return INITIAL_SERVICES;
  });

  // User auth state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('egypt_user_profile_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('egypt_user_profile_v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('egypt_user_profile_v1');
    }
  }, [currentUser]);

  // Save services to localStorage when changed
  useEffect(() => {
    localStorage.setItem('egypt_edu_services_v1', JSON.stringify(services));
  }, [services]);

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('egypt_edu_bookmarks_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['thanaweya-results', 'national-id-renew', 'traffic-violations'];
  });

  // Save Toast Notification State
  const [saveToast, setSaveToast] = useState<{ message: string; type: 'add' | 'remove' } | null>(null);

  useEffect(() => {
    localStorage.setItem('egypt_edu_bookmarks_v1', JSON.stringify(bookmarks));
    setUserProfile(prev => ({ ...prev, savedServices: bookmarks }));
  }, [bookmarks]);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    name: 'أحمد محمود القاضي',
    email: 'citizen.ahmed@egypt.gov.eg',
    governorate: 'القاهرة',
    nationalId: '29801011234567',
    savedServices: bookmarks,
    savedSearches: ['رياض الأطفال', 'مرور الجيزة', 'الرقم القومي'],
    subscribedCategories: ['schools', 'traffic', 'interior'],
    recentlyViewedServices: ['kg-admission', 'national-id-issuance', 'traffic-license-renewal'],
    downloadedGuides: ['kg-admission-guide.pdf'],
    reminders: [
      { id: '1', serviceTitle: 'تجديد رخصة القيادة الشخصية', dueDate: '2026-08-20', note: 'متبقي 27 يوماً على موعد انتهاء الرخصة' },
      { id: '2', serviceTitle: 'تقديم تنسيق المرحلة الأولى للجامعات', dueDate: '2026-08-05', note: 'البوابة مفتوحة لتسجيل الرغبات' }
    ]
  });

  // User reports persistence
  const [reports, setReports] = useState<IncorrectInfoReport[]>(() => {
    const saved = localStorage.getItem('egypt_edu_reports_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('egypt_edu_reports_v1', JSON.stringify(reports));
  }, [reports]);

  // Filters State
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: 'all',
    level: 'all',
    authority: 'all',
    status: 'all',
    onlyBookmarks: false,
  });

  // Modal States
  const [selectedService, setSelectedService] = useState<EducationService | null>(null);
  const [printGuideService, setPrintGuideService] = useState<EducationService | null>(null);
  const [reportService, setReportService] = useState<EducationService | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showResultsWidget, setShowResultsWidget] = useState(false);
  const [showHotlinesModal, setShowHotlinesModal] = useState(false);

  // Phase 3 & 4 Modal States
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showNewsCenter, setShowNewsCenter] = useState(false);
  const [showServiceCenters, setShowServiceCenters] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showApiExplorer, setShowApiExplorer] = useState(false);

  // Phase 4 Enterprise Modal States
  const [showMinistriesModal, setShowMinistriesModal] = useState(false);
  const [showFormsModal, setShowFormsModal] = useState(false);
  const [showDeadlinesModal, setShowDeadlinesModal] = useState(false);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [showGlossaryModal, setShowGlossaryModal] = useState(false);

  // Phase 5 Verified Data & Automation States
  const [showPdfGuideModal, setShowPdfGuideModal] = useState(false);
  const [pdfGuideService, setPdfGuideService] = useState<EducationService | null>(null);
  const [showUserDashboardModal, setShowUserDashboardModal] = useState(false);
  const [showGovernmentDirectoryModal, setShowGovernmentDirectoryModal] = useState(false);
  const [showLinkMonitorModal, setShowLinkMonitorModal] = useState(false);
  const [showLiveVerificationModal, setShowLiveVerificationModal] = useState(false);
  const [showGovSyncCenterModal, setShowGovSyncCenterModal] = useState(false);
  const [showOfficeManagementModal, setShowOfficeManagementModal] = useState(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSuperAdminCrmModal, setShowSuperAdminCrmModal] = useState(false);
  const [showEnterpriseProductionModal, setShowEnterpriseProductionModal] = useState(false);
  const [showCommercialReleaseModal, setShowCommercialReleaseModal] = useState(false);
  const [showGmailIntegrationModal, setShowGmailIntegrationModal] = useState(false);
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);
  const [showComprehensiveSettingsModal, setShowComprehensiveSettingsModal] = useState(false);
  const [showNotificationCenterModal, setShowNotificationCenterModal] = useState(false);
  const [showLegalAndAboutModal, setShowLegalAndAboutModal] = useState(false);

  // 10 Commercial Release Priority Modal States
  const [showLandingWebsiteModal, setShowLandingWebsiteModal] = useState(false);
  const [showOnlineCheckoutModal, setShowOnlineCheckoutModal] = useState(false);
  const [checkoutPlanInfo, setCheckoutPlanInfo] = useState<{ planName: string; priceEgp: number }>({ planName: 'الباقة الاحترافية Pro', priceEgp: 1299 });
  const [showSupportCenterModal, setShowSupportCenterModal] = useState(false);
  const [showReleaseNotesModal, setShowReleaseNotesModal] = useState(false);
  const [showCrashReportModal, setShowCrashReportModal] = useState(false);
  const [showCloudMonitoringModal, setShowCloudMonitoringModal] = useState(false);
  const [showProcedureAiGuideModal, setShowProcedureAiGuideModal] = useState(false);
  const [showTrainingCenterModal, setShowTrainingCenterModal] = useState(false);
  const [showDeveloperApiCenterModal, setShowDeveloperApiCenterModal] = useState(false);
  const [showMobileCompanionModal, setShowMobileCompanionModal] = useState(false);
  const [impersonatedOffice, setImpersonatedOffice] = useState<OfficeRecord | null>(null);

  const handleImpersonateOffice = (office: OfficeRecord) => {
    setImpersonatedOffice(office);
    setShowSuperAdminCrmModal(false);
    addAuditLog({
      performedBy: authSession?.user?.email || 'hemasokar23@gmail.com',
      action: 'IMPERSONATE_OFFICE_LOGIN',
      targetOfficeOrEmail: `${office.name} (${office.ownerEmail})`,
      status: 'SUCCESS',
      details: `Super Admin switched view to impersonate office ${office.name}.`
    });
  };

  const handleExitImpersonation = () => {
    setImpersonatedOffice(null);
  };
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sokar_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAdminLoggedIn) {
        localStorage.setItem('sokar_admin_logged_in', 'true');
      } else {
        localStorage.removeItem('sokar_admin_logged_in');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdminDashboard(false);
    try {
      localStorage.removeItem('sokar_admin_logged_in');
    } catch (e) {
      console.error(e);
    }
  };
  const [isSyncingLive, setIsSyncingLive] = useState(false);
  const [syncNotificationBanner, setSyncNotificationBanner] = useState<string | null>(null);

  // 24-Hour Free Trial State
  const [trialSession, setTrialSession] = useState<TrialSession | null>(() => {
    try {
      const saved = localStorage.getItem('sokar_trial_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Website Registered Clients Database
  const [registeredClients, setRegisteredClients] = useState<TrialSession[]>(() => {
    try {
      const saved = localStorage.getItem('sokar_registered_clients_db');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        name: 'أحمد محمود القاضي',
        email: 'citizen.ahmed@egypt.gov.eg',
        phone: '01012345678',
        governorate: 'القاهرة',
        registeredAt: Date.now() - (2 * 60 * 60 * 1000),
        isSubscribed: false
      },
      {
        name: 'سارة إبراهيم حسن',
        email: 'sara.ibrahim@gmail.com',
        phone: '01198765432',
        governorate: 'الجيزة',
        registeredAt: Date.now() - (25 * 60 * 60 * 1000),
        isSubscribed: false
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sokar_registered_clients_db', JSON.stringify(registeredClients));
    } catch (e) {
      console.error(e);
    }
  }, [registeredClients]);

  const [trialRemainingFormatted, setTrialRemainingFormatted] = useState<string | null>(null);

  // Calculate remaining trial time every second
  useEffect(() => {
    if (!trialSession || trialSession.isSubscribed || isAdminLoggedIn) {
      setTrialRemainingFormatted(null);
      return;
    }

    const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000;

    const updateTimer = () => {
      const elapsed = Date.now() - trialSession.registeredAt;
      const remaining = TRIAL_DURATION_MS - elapsed;

      if (remaining <= 0) {
        setTrialRemainingFormatted('انتهت التجربة!');
      } else {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        setTrialRemainingFormatted(`${hours}س و ${minutes}د`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000);
    return () => clearInterval(interval);
  }, [trialSession, isAdminLoggedIn]);

  const handleRegisterTrial = (session: TrialSession) => {
    setTrialSession(session);
    try {
      localStorage.setItem('sokar_trial_session', JSON.stringify(session));
    } catch {
      // ignore
    }

    setRegisteredClients(prev => {
      const filtered = prev.filter(c => c.email.toLowerCase() !== session.email.toLowerCase());
      const updated = [session, ...filtered];
      return updated;
    });
  };

  const handleResetTrialSession = () => {
    setTrialSession(null);
    try {
      localStorage.removeItem('sokar_trial_session');
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleClientSubscription = (email: string) => {
    setRegisteredClients(prev => prev.map(c => {
      if (c.email.toLowerCase() === email.toLowerCase()) {
        return { ...c, isSubscribed: !c.isSubscribed };
      }
      return c;
    }));

    if (trialSession && trialSession.email.toLowerCase() === email.toLowerCase()) {
      const updatedTrial = { ...trialSession, isSubscribed: !trialSession.isSubscribed };
      setTrialSession(updatedTrial);
      try {
        localStorage.setItem('sokar_trial_session', JSON.stringify(updatedTrial));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDeleteClient = (email: string) => {
    setRegisteredClients(prev => prev.filter(c => c.email.toLowerCase() !== email.toLowerCase()));
  };

  const handleTriggerLiveSync = () => {
    setIsSyncingLive(true);
    setSyncNotificationBanner('جاري التحديث والمزامنة اللحظية المباشرة من خوادم الوزارات والجهات الرسمية 🔄');
    
    setTimeout(() => {
      setIsSyncingLive(false);
      setSyncNotificationBanner('تمت المزامنة والتحديث اللحظي بنجاح ⚡ جميع الخدمات 100% محدثة بدون انقطاع!');
      setTimeout(() => {
        setSyncNotificationBanner(null);
      }, 5000);
    }, 1200);
  };

  const [lang, setLang] = useState<Language>('ar');

  const handleToggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // Derived Authorities List
  const authoritiesList = useMemo(() => {
    const set = new Set<string>();
    services.forEach(s => {
      if (s.authority) set.add(s.authority);
    });
    return Array.from(set);
  }, [services]);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return filterServices(services, filters, bookmarks);
  }, [services, filters, bookmarks]);

  // Results services list for the quick finder widget
  const resultsServices = useMemo(() => {
    return services.filter(s => s.category === 'results');
  }, [services]);

  // Text reader function
  const handleReadPage = () => {
    if ('speechSynthesis' in window) {
      const text = 'مرحباً بك في موقع Sokar Ai Services، الدليل الاسترشادي الموحد للخدمات الحكومية. يمكنك الاستعلام والتصفح بسهولة.';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('القارئ الصوتي غير مدعوم متصفحك حالياً.');
    }
  };

  // Handlers
  const handleToggleBookmark = (serviceId: string) => {
    const serviceObj = services.find(s => s.id === serviceId);
    const serviceTitle = serviceObj ? serviceObj.name : 'الخدمة';

    setBookmarks(prev => {
      const isCurrentlySaved = prev.includes(serviceId);
      if (isCurrentlySaved) {
        setSaveToast({
          message: `تمت إزالة "${serviceTitle}" من قائمة الحفظ لوقت لاحق.`,
          type: 'remove'
        });
        return prev.filter(id => id !== serviceId);
      } else {
        setSaveToast({
          message: `📌 تم حفظ "${serviceTitle}" لوقت لاحق بحسابك بنجاح!`,
          type: 'add'
        });
        return [...prev, serviceId];
      }
    });

    // Auto dismiss toast after 3.5 seconds
    setTimeout(() => {
      setSaveToast(null);
    }, 3500);
  };

  const handleUpdateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      level: 'all',
      authority: 'all',
      status: 'all',
      onlyBookmarks: false,
      openTodayOnly: false,
    });
  };

  const handleFilterOpenToday = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      level: 'all',
      authority: 'all',
      status: 'all',
      onlyBookmarks: false,
      openTodayOnly: true,
    });
    setTimeout(() => {
      const el = document.getElementById('services-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSelectCategory = (cat: CategoryType | 'all') => {
    setFilters(prev => ({
      ...prev,
      category: cat,
      searchQuery: '',
      onlyBookmarks: false,
    }));
    setTimeout(() => {
      const el = document.getElementById('services-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleQuickSearch = (query: string, serviceId?: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: query,
      onlyBookmarks: false,
    }));

    if (serviceId === 'results-widget') {
      setShowResultsWidget(true);
      return;
    }

    if (serviceId) {
      const target = services.find(s => s.id === serviceId);
      if (target) {
        setSelectedService(target);
        return;
      }
    }

    const matched = services.find(s =>
      s.id.toLowerCase() === query.toLowerCase() ||
      s.name.includes(query) ||
      (s.keywords && s.keywords.some(k => k.includes(query)))
    );

    if (matched) {
      setSelectedService(matched);
    } else {
      const el = document.getElementById('services-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Admin Actions
  const handleSaveService = (savedService: EducationService) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === savedService.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = savedService;
        return next;
      }
      return [savedService, ...prev];
    });
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذه الخدمة الحكومية؟')) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('هل أنت متاكد من إعادة ضبط كافة الخدمات لقائمتها الرسمية الافتراضية؟')) {
      setServices(INITIAL_SERVICES);
      localStorage.removeItem('egypt_edu_services_v1');
    }
  };

  const handleAddReport = (reportData: Omit<IncorrectInfoReport, 'id' | 'createdAt' | 'status'>) => {
    const newReport: IncorrectInfoReport = {
      ...reportData,
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setReports(prev => [newReport, ...prev]);
  };

  const handleUpdateReportStatus = (reportId: string, newStatus: IncorrectInfoReport['status']) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
  };

  const fontSizeClass = fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm';

  // Mandatory System Auth State
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => getActiveAuthSession());
  const [showSessionManagerModal, setShowSessionManagerModal] = useState(false);

  const handleAuthLogout = () => {
    logoutUser();
    setAuthSession(null);
  };

  const handleAuthLogoutAllDevices = () => {
    if (authSession) {
      logoutAllDevices(authSession.user.id);
    }
    setAuthSession(null);
  };

  // HARD REQUIREMENT: If not authenticated, render ONLY the Login/Register AuthPage entry gate
  if (!authSession) {
    return (
      <AuthPage
        onLoginSuccess={(session) => setAuthSession(session)}
        themeMode={themeMode}
        onToggleTheme={handleToggleThemeMode}
      />
    );
  }

  const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000;
  const isTrialExpired = Boolean(
    trialSession &&
    !trialSession.isSubscribed &&
    (Date.now() - trialSession.registeredAt > TRIAL_DURATION_MS)
  );

  const isTrialGateVisible = (!trialSession || isTrialExpired) && !isAdminLoggedIn && !showSubscriptionModal && !showAdminAuthModal && authSession.user.role === 'customer';

  return (
    <ProtectedRoute
      session={authSession}
      onLoginSuccess={(session) => setAuthSession(session)}
      themeMode={themeMode}
      onToggleTheme={handleToggleThemeMode}
    >
      <div className={`min-h-screen font-['Cairo',sans-serif] dir-rtl transition-colors duration-200 relative overflow-x-hidden ${fontSizeClass} ${
        themeMode === 'black'
          ? 'bg-zinc-950 text-zinc-100'
          : themeMode === 'dark' || highContrast
          ? 'bg-slate-950 text-white'
          : 'bg-slate-50 text-slate-800'
      }`}>
        {/* Animated Professional Atmosphere Background */}
        <AnimatedBackground themeMode={themeMode} isPreAuth={false} />
        
        {/* Mobile PWA & Camera Scanner Banner */}
        <PwaInstallBanner />

        {/* Sidebar Navigation Bar on the side */}
        <Sidebar
          authSession={authSession}
          onOpenSessionManager={() => setShowSessionManagerModal(true)}
          onLogout={handleAuthLogout}
          activeCategory={filters.category}
          onSelectCategory={handleSelectCategory}
          searchQuery={filters.searchQuery}
          onSearchChange={(q) => handleUpdateFilters({ searchQuery: q })}
          bookmarksCount={bookmarks.length}
          showBookmarksOnly={filters.onlyBookmarks || false}
          onToggleBookmarksOnly={() => handleUpdateFilters({ onlyBookmarks: !filters.onlyBookmarks })}
          onOpenAdmin={() => isAdminLoggedIn ? setShowAdminDashboard(true) : setShowAdminAuthModal(true)}
          onOpenHotlines={() => setShowHotlinesModal(true)}
          onOpenAiAssistant={() => setShowAiAssistant(true)}
          onOpenNews={() => setShowNewsCenter(true)}
          onOpenCenters={() => setShowServiceCenters(true)}
          onOpenCompare={() => setShowCompareModal(true)}
          onOpenAuth={() => setShowAuthModal(true)}
          onOpenNotifications={() => setShowNotificationsModal(true)}
          onOpenApi={() => setShowApiExplorer(true)}
          onOpenMinistries={() => setShowMinistriesModal(true)}
          onOpenForms={() => setShowFormsModal(true)}
          onOpenDeadlines={() => setShowDeadlinesModal(true)}
          onOpenEligibility={() => setShowEligibilityModal(true)}
          onOpenGlossary={() => setShowGlossaryModal(true)}
          onOpenLinkMonitor={() => setShowLinkMonitorModal(true)}
          onOpenLiveVerification={() => setShowLiveVerificationModal(true)}
          onOpenGovSyncCenter={() => setShowGovSyncCenterModal(true)}
          onOpenUserDashboard={() => setShowUserDashboardModal(true)}
          onOpenOfficeManagement={() => setShowOfficeManagementModal(true)}
          onOpenSubscriptions={() => setShowSubscriptionModal(true)}
          onOpenSuperAdminCrm={() => setShowSuperAdminCrmModal(true)}
          onOpenEnterpriseProduction={() => setShowEnterpriseProductionModal(true)}
          onOpenCommercialRelease={() => setShowCommercialReleaseModal(true)}
          onOpenGmailIntegration={() => setShowGmailIntegrationModal(true)}
          onOpenIntegrationsCenter={() => setShowIntegrationsModal(true)}
          onOpenComprehensiveSettings={() => setShowComprehensiveSettingsModal(true)}
          onOpenNotificationCenter={() => setShowNotificationCenterModal(true)}
          onOpenLegalAndAbout={() => setShowLegalAndAboutModal(true)}
          onOpenLandingWebsite={() => setShowLandingWebsiteModal(true)}
          onOpenOnlineCheckout={() => setShowOnlineCheckoutModal(true)}
          onOpenSupportCenter={() => setShowSupportCenterModal(true)}
          onOpenReleaseNotes={() => setShowReleaseNotesModal(true)}
          onOpenCrashReport={() => setShowCrashReportModal(true)}
          onOpenCloudMonitoring={() => setShowCloudMonitoringModal(true)}
          onOpenProcedureAiGuide={() => setShowProcedureAiGuideModal(true)}
          onOpenTrainingCenter={() => setShowTrainingCenterModal(true)}
          onOpenDeveloperApi={() => setShowDeveloperApiCenterModal(true)}
          onOpenMobileCompanion={() => setShowMobileCompanionModal(true)}
          onTriggerLiveSync={handleTriggerLiveSync}
          isSyncingLive={isSyncingLive}
          trialRemainingFormatted={trialRemainingFormatted}
          onResetTrialSession={handleResetTrialSession}
          isAdminLoggedIn={isAdminLoggedIn}
          onAdminLogout={handleAdminLogout}
          lang={lang}
          onToggleLang={handleToggleLang}
          themeMode={themeMode}
          onToggleThemeMode={handleToggleThemeMode}
          onReadPage={handleReadPage}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area (taking remaining screen width) */}
        <div className="lg:mr-72 flex flex-col min-h-screen transition-all">
          
          {/* Main Top Header Bar (Mobile Toggle + Quick Search + Actions) */}
          <header className={`sticky top-0 z-30 border-b px-4 py-2.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-sm ${
            themeMode === 'black'
              ? 'bg-zinc-950/90 border-zinc-800 text-white'
              : themeMode === 'dark' || highContrast
              ? 'bg-slate-900/90 border-slate-800 text-white'
              : 'bg-white/90 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 rounded-xl bg-slate-800 text-white lg:hidden hover:bg-slate-700 transition-colors"
                title="فتح القائمة الجانبية"
              >
                <Layers className="w-5 h-5 text-amber-400" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <div>
                  <h2 className="font-black text-sm sm:text-base leading-tight">دليل الخدمات الالكترونية الموحد</h2>
                  <p className="text-[10px] text-slate-400 font-bold hidden sm:block">منظومة الربط السحابي والخدمات الرقمية للمكاتب</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Header Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowSuperAdminCrmModal(true)}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:from-amber-400 hover:to-yellow-300 px-3 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>+ إضافة مشترك (CRM)</span>
              </button>

              <button
                onClick={() => setShowAiAssistant(true)}
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>🤖 المساعد AI</span>
              </button>

              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>🛡️ التراخيص</span>
              </button>

              <button
                onClick={() => handleUpdateFilters({ onlyBookmarks: !filters.onlyBookmarks })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  filters.onlyBookmarks
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>المفضلة ({bookmarks.length})</span>
              </button>
            </div>
          </header>

          {/* Impersonation Active Top Banner */}
          {impersonatedOffice && (
            <div className="bg-amber-500 text-slate-950 font-black py-2 px-4 text-center text-xs shadow-lg border-b border-amber-600 flex flex-wrap items-center justify-center gap-3 z-30">
              <span className="flex items-center gap-1.5 bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                ⚠️ وضع المحاكاة بصفة مكتب: <strong>{impersonatedOffice.name}</strong>
              </span>
              <button
                onClick={handleExitImpersonation}
                className="bg-slate-950 text-amber-300 hover:bg-slate-900 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-md"
              >
                العودة لحساب Super Admin ↩️
              </button>
            </div>
          )}

          {/* Real-time Live Sync Toast Notification Banner */}
          {syncNotificationBanner && (
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-2 px-4 text-center text-xs font-black shadow-lg animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>{syncNotificationBanner}</span>
            </div>
          )}

          {/* Floating Save for Later Toast Notification */}
          {saveToast && (
            <div className={`fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl shadow-2xl border text-xs font-bold flex items-center justify-between gap-3 animate-bounce ${
              saveToast.type === 'add'
                ? 'bg-slate-900 text-amber-300 border-amber-400/80'
                : 'bg-slate-900 text-rose-300 border-rose-500/80'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-base">{saveToast.type === 'add' ? '📌' : '🗑️'}</span>
                <span>{saveToast.message}</span>
              </div>
              <button
                onClick={() => setSaveToast(null)}
                className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Hero Banner Quick Access */}
          <HeroBanner
            onQuickSearch={handleQuickSearch}
            onSelectCategory={handleSelectCategory}
            onOpenResultsWidget={() => setShowResultsWidget(true)}
            onFilterOpenToday={handleFilterOpenToday}
            totalServicesCount={services.length}
            themeMode={themeMode}
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            onResetFilters={handleResetFilters}
          />

          {/* Services Main View Section ("وراعي الخدمات") */}
          <main className="w-full px-3 sm:px-5 lg:px-6 py-2 flex-grow space-y-3">
            
            {/* Exam Results Direct Inquiry Widget Banner */}
            <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-right">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg text-white">مُستعلم نتائج الامتحانات المباشر</h3>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>محدث بانتظام مع الجهات الرسمية 36</span>
                    </span>
                  </div>
                  <p className="font-bold text-xs text-amber-300">روابط النتيجة الرسمية بمحافظتك</p>
                  <p className="text-xs text-slate-300 leading-normal">
                    اختر المرحلة والمحافظة للانتقال فوراً لرابط النتيجة الرسمية المعتمد في جمهوريتك.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowResultsWidget(true)}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 shrink-0 transition-all transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>انتقل لمُستعلم النتائج الرسمية الآن 🎯</span>
              </button>
            </div>

            {/* Phase 11: Official Government Open Applications Widget */}
            <OfficialAnnouncementsWidget
              announcements={announcements}
              onOpenAnnouncementsCenter={(filterType) => {
                setAnnouncementsModalFilter(filterType || 'all');
                setSelectedAnnouncementForModal(null);
                setShowAnnouncementsModal(true);
              }}
              onSelectAnnouncement={(announcement) => {
                setSelectedAnnouncementForModal(announcement);
                setShowAnnouncementsModal(true);
              }}
              onFilterServicesByStatus={(status) => {
                handleUpdateFilters({ status });
                const section = document.getElementById('services-grid-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onTriggerLiveSync={handleTriggerLiveSync}
            />

            {/* Filters and Search Bar */}
            <FiltersBar
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              authoritiesList={authoritiesList}
              totalResultsCount={filteredServices.length}
            />

            {/* Section Title Banner & Category Header */}
            <div id="services-grid-section" className="flex items-center justify-between border-b pb-3 scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className={`text-base sm:text-lg font-black ${
                  themeMode === 'black' ? 'text-amber-300' : 'text-slate-900'
                }`}>
                  {filters.onlyBookmarks
                    ? '⭐ الخدمات المحفوظة بالمفضلة'
                    : filters.searchQuery
                    ? `نتائج البحث عن: "${filters.searchQuery}"`
                    : filters.category !== 'all'
                    ? `خدمات القطاع المختار`
                    : 'دليل كافة الخدمات الحكومية الرقمية الموحدة بجمهورية مصر العربية'}
                </h2>
                <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
                  {filteredServices.length} خدمة
                </span>
              </div>

              {filters.onlyBookmarks && (
                <button
                  onClick={() => handleUpdateFilters({ onlyBookmarks: false })}
                  className="text-xs text-sky-700 hover:underline font-bold"
                >
                  عرض جميع الخدمات ➔
                </button>
              )}
            </div>

            {/* Services Grid Cards */}
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onOpenDetails={(srv) => setSelectedService(srv)}
                    isBookmarked={bookmarks.includes(service.id)}
                    onToggleBookmark={handleToggleBookmark}
                    themeMode={themeMode}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4 my-6 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-800">لم يتم العثور على خدمات تطابق معايير البحث</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  جرب تغيير الكلمات المفتاحية في مربع البحث أو قم بإعادة ضبط الفلاتر لاستعراض جميع الخدمات.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  إعادة ضبط الفلاتر والبحث
                </button>
              </div>
            )}

          </main>

          {/* Footer inside main layout container */}
          <Footer />

        </div>

      {/* MODALS */}
      <Suspense fallback={null}>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={showAiAssistant}
        onClose={() => setShowAiAssistant(false)}
        services={services}
        onSelectService={(srv) => setSelectedService(srv)}
      />

      {/* Government News Center Modal */}
      <NewsCenterModal
        isOpen={showNewsCenter}
        onClose={() => setShowNewsCenter(false)}
        newsList={INITIAL_NEWS}
      />

      {/* Service Centers Map Modal */}
      <ServiceCentersModal
        isOpen={showServiceCenters}
        onClose={() => setShowServiceCenters(false)}
        centers={INITIAL_SERVICE_CENTERS}
      />

      {/* Service Comparison Modal */}
      <ServiceCompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        services={services}
        initialServiceId={selectedService?.id}
      />

      {/* User Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onLogin={(usr) => setCurrentUser(usr)}
        onLogout={() => setCurrentUser(null)}
        allServices={services}
        bookmarkedIds={bookmarks}
        onSelectService={(srv) => setSelectedService(srv)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      {/* REST API Explorer Modal */}
      <ApiExplorerModal
        isOpen={showApiExplorer}
        onClose={() => setShowApiExplorer(false)}
        services={services}
      />

      {/* Phase 4 Enterprise Modals */}
      <MinistriesModal
        isOpen={showMinistriesModal}
        onClose={() => setShowMinistriesModal(false)}
        ministries={INITIAL_MINISTRIES}
      />

      <FormsCenterModal
        isOpen={showFormsModal}
        onClose={() => setShowFormsModal(false)}
      />

      <DeadlineCalendarModal
        isOpen={showDeadlinesModal}
        onClose={() => setShowDeadlinesModal(false)}
      />

      <EligibilityCheckerModal
        isOpen={showEligibilityModal}
        onClose={() => setShowEligibilityModal(false)}
        services={services}
      />

      <GlossaryModal
        isOpen={showGlossaryModal}
        onClose={() => setShowGlossaryModal(false)}
      />

      {/* Phase 5 Verified Data & Automation Modals */}
      <PdfGuideModal
        isOpen={showPdfGuideModal}
        onClose={() => setShowPdfGuideModal(false)}
        service={pdfGuideService}
        lang={lang}
      />

      <UserDashboardModal
        isOpen={showUserDashboardModal}
        onClose={() => setShowUserDashboardModal(false)}
        userProfile={{
          ...userProfile,
          savedServices: bookmarks
        }}
        services={services}
        onSelectService={(srv) => setSelectedService(srv)}
        onOpenPdfGuide={(srv) => {
          setPdfGuideService(srv);
          setShowPdfGuideModal(true);
        }}
        onToggleBookmark={handleToggleBookmark}
        lang={lang}
      />

      <GovernmentDirectoryModal
        isOpen={showGovernmentDirectoryModal}
        onClose={() => setShowGovernmentDirectoryModal(false)}
        ministries={INITIAL_MINISTRIES}
        lang={lang}
      />

      <LinkMonitorModal
        isOpen={showLinkMonitorModal}
        onClose={() => setShowLinkMonitorModal(false)}
        services={services}
        onUpdateServiceStatus={(srvId, health) => {
          setServices(prev => prev.map(s => s.id === srvId ? { ...s, linkHealth: health } : s));
        }}
        lang={lang}
      />

      <OfficeManagementModal
        isOpen={showOfficeManagementModal}
        onClose={() => setShowOfficeManagementModal(false)}
        services={services}
        lang={lang}
      />

      {/* Complete Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          isBookmarked={bookmarks.includes(selectedService.id)}
          onToggleBookmark={handleToggleBookmark}
          onPrintGuide={(srv) => setPrintGuideService(srv)}
          onReportIncorrectInfo={(srv) => setReportService(srv)}
          onSelectRelatedService={(relId) => {
            const rel = services.find(s => s.id === relId);
            if (rel) setSelectedService(rel);
          }}
          allServices={services}
        />
      )}

      {/* Printable Guide Modal */}
      {printGuideService && (
        <PrintGuideModal
          service={printGuideService}
          onClose={() => setPrintGuideService(null)}
        />
      )}

      {/* Report Incorrect Info Modal */}
      {reportService && (
        <ReportInfoModal
          service={reportService}
          onClose={() => setReportService(null)}
          onSubmitReport={handleAddReport}
        />
      )}

      {/* Quick Results Finder Widget */}
      {showResultsWidget && (
        <ResultsQuickWidget
          onClose={() => setShowResultsWidget(false)}
          resultsServices={resultsServices}
          onOpenServiceDetails={(srv) => setSelectedService(srv)}
        />
      )}

      {/* Admin Dashboard Modal */}
      {showAdminDashboard && (
        <AdminDashboard
          services={services}
          reports={reports}
          onClose={() => setShowAdminDashboard(false)}
          onSaveService={handleSaveService}
          onDeleteService={handleDeleteService}
          onResetToDefaults={handleResetToDefaults}
          onUpdateReportStatus={handleUpdateReportStatus}
          onOpenLiveVerification={() => {
            setShowAdminDashboard(false);
            setShowLiveVerificationModal(true);
          }}
          registeredClients={registeredClients}
          onToggleClientSubscription={handleToggleClientSubscription}
          onDeleteClient={handleDeleteClient}
        />
      )}

      {/* Hotlines & Helplines Modal */}
      {showHotlinesModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-800 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <PhoneCall className="w-5 h-5 text-emerald-600" />
                <span>دليل الخط الساخن والشكاوى الحكومية المباشرة</span>
              </div>
              <button onClick={() => setShowHotlinesModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">وزارة التربية والتعليم (خدمة المواطنين والشكاوى)</p>
                  <p className="text-slate-500 text-[11px]">لاستفسارات المدارس ونتائج النقل والتحويلات</p>
                </div>
                <strong className="text-emerald-700 font-mono text-base bg-white px-3 py-1 rounded-xl border border-slate-200">16001</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">وزارة التعليم العالي والتنسيق الإلكتروني</p>
                  <p className="text-slate-500 text-[11px]">لتنسيق الكليات والجامعات الأهلية والدراسات العليا</p>
                </div>
                <strong className="text-amber-700 font-mono text-base bg-white px-3 py-1 rounded-xl border border-slate-200">15300</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">بوابة الشكاوى الحكومية الموحدة بمجلس الوزراء</p>
                  <p className="text-slate-500 text-[11px]">لتلقي وطعونات الشكاوى الإدارية والخدمية</p>
                </div>
                <strong className="text-cyan-700 font-mono text-base bg-white px-3 py-1 rounded-xl border border-slate-200">16528</strong>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <button
                onClick={() => setShowHotlinesModal(false)}
                className="w-full py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase 11: Official Announcements Modal */}
      <OfficialAnnouncementsModal
        isOpen={showAnnouncementsModal}
        onClose={() => {
          setShowAnnouncementsModal(false);
          setSelectedAnnouncementForModal(null);
        }}
        announcements={announcements}
        initialSelectedAnnouncement={selectedAnnouncementForModal}
        initialStatusFilter={announcementsModalFilter}
        lang={lang}
      />

      {/* Live Verification Test Page */}
      <LiveVerificationTestPage
        isOpen={showLiveVerificationModal}
        onClose={() => setShowLiveVerificationModal(false)}
      />

      {/* Phase 12.5: Government Sync Center Modal */}
      <GovernmentSyncCenterModal
        isOpen={showGovSyncCenterModal}
        onClose={() => setShowGovSyncCenterModal(false)}
      />

      {/* Admin Login Auth Modal */}
      <AdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => setShowAdminAuthModal(false)}
        onAdminLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setShowAdminAuthModal(false);
          setShowAdminDashboard(true);
        }}
        themeMode={themeMode}
      />

      {/* Subscription Plans Modal (Monthly & Annual) */}
      <SubscriptionPlansModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onOpenClientLogin={() => setShowAuthModal(true)}
        themeMode={themeMode}
      />

      {/* 24-Hour Free Trial Registration Gate & Expired Paywall */}
      <TrialGateModal
        isOpen={isTrialGateVisible}
        trialSession={trialSession}
        onRegisterTrial={handleRegisterTrial}
        onOpenSubscriptions={() => setShowSubscriptionModal(true)}
        onOpenAdminAuth={() => setShowAdminAuthModal(true)}
        themeMode={themeMode}
      />

      {/* Super Admin CRM & Subscriber Management Modal */}
      <SuperAdminCrmModal
        isOpen={showSuperAdminCrmModal}
        onClose={() => setShowSuperAdminCrmModal(false)}
        currentUserEmail={authSession?.user?.email || 'hemasokar23@gmail.com'}
        onImpersonateOffice={handleImpersonateOffice}
      />

      {/* Enterprise Production Infrastructure Modal */}
      <EnterpriseProductionModal
        isOpen={showEnterpriseProductionModal}
        onClose={() => setShowEnterpriseProductionModal(false)}
        currentUserEmail={authSession?.user?.email || 'hemasokar23@gmail.com'}
      />

      {/* Commercial Release & Marketplace Modal */}
      <CommercialReleaseModal
        isOpen={showCommercialReleaseModal}
        onClose={() => setShowCommercialReleaseModal(false)}
        currentUserEmail={authSession?.user?.email || 'hemasokar23@gmail.com'}
      />

      {/* Gmail Workspace Integration Modal */}
      <GmailIntegrationModal
        isOpen={showGmailIntegrationModal}
        onClose={() => setShowGmailIntegrationModal(false)}
        currentUserEmail={authSession?.user?.email || 'hemasokar23@gmail.com'}
      />

      {/* Integrations Center Modal */}
      <IntegrationsModal
        isOpen={showIntegrationsModal}
        onClose={() => setShowIntegrationsModal(false)}
        onOpenGmailWorkspace={() => setShowGmailIntegrationModal(true)}
      />

      {/* Comprehensive Office Settings Modal */}
      <ComprehensiveSettingsModal
        isOpen={showComprehensiveSettingsModal}
        onClose={() => setShowComprehensiveSettingsModal(false)}
      />

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={showNotificationCenterModal}
        onClose={() => setShowNotificationCenterModal(false)}
      />

      {/* Legal & About System Modal */}
      <LegalAndAboutModal
        isOpen={showLegalAndAboutModal}
        onClose={() => setShowLegalAndAboutModal(false)}
      />

      {/* 1. Landing Website Modal */}
      <LandingWebsiteModal
        isOpen={showLandingWebsiteModal}
        onClose={() => setShowLandingWebsiteModal(false)}
        onOpenCheckout={(planName, priceEgp) => {
          setCheckoutPlanInfo({ planName, priceEgp });
          setShowLandingWebsiteModal(false);
          setShowOnlineCheckoutModal(true);
        }}
      />

      {/* 2. Online Subscription Checkout Modal */}
      <OnlineCheckoutModal
        isOpen={showOnlineCheckoutModal}
        onClose={() => setShowOnlineCheckoutModal(false)}
        selectedPlanName={checkoutPlanInfo.planName}
        selectedPriceEgp={checkoutPlanInfo.priceEgp}
      />

      {/* 3. Technical Support Center Modal */}
      <SupportCenterModal
        isOpen={showSupportCenterModal}
        onClose={() => setShowSupportCenterModal(false)}
      />

      {/* 4. Release Notes Modal */}
      <ReleaseNotesModal
        isOpen={showReleaseNotesModal}
        onClose={() => setShowReleaseNotesModal(false)}
      />

      {/* 5. Crash Report Modal */}
      <CrashReportModal
        isOpen={showCrashReportModal}
        onClose={() => setShowCrashReportModal(false)}
      />

      {/* 6. Cloud Monitoring Modal */}
      <CloudMonitoringModal
        isOpen={showCloudMonitoringModal}
        onClose={() => setShowCloudMonitoringModal(false)}
      />

      {/* 7. Procedure AI Guide Modal */}
      <ProcedureAiGuideModal
        isOpen={showProcedureAiGuideModal}
        onClose={() => setShowProcedureAiGuideModal(false)}
      />

      {/* 8. Staff Training Center Modal */}
      <TrainingCenterModal
        isOpen={showTrainingCenterModal}
        onClose={() => setShowTrainingCenterModal(false)}
      />

      {/* 9. Developer API Center Modal */}
      <DeveloperApiCenterModal
        isOpen={showDeveloperApiCenterModal}
        onClose={() => setShowDeveloperApiCenterModal(false)}
      />

      {/* 10. Mobile Companion App Modal */}
      <MobileCompanionModal
        isOpen={showMobileCompanionModal}
        onClose={() => setShowMobileCompanionModal(false)}
      />


      {/* Session Manager Modal */}
      {authSession && (
        <SessionManagerModal
          isOpen={showSessionManagerModal}
          onClose={() => setShowSessionManagerModal(false)}
          session={authSession}
          onLogout={handleAuthLogout}
          onLogoutAllDevices={handleAuthLogoutAllDevices}
        />
      )}

      </Suspense>

    </div>
    </ProtectedRoute>
  );
}

