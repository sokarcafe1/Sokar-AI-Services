// Phase 13 - Commercial Release & Marketplace Service
// Sokar Office OS Phase 13

export interface OfficeOnboardingData {
  officeName: string;
  logoUrl: string;
  branchName: string;
  governorate: string;
  workingHours: string;
  paymentMethods: string[];
  billingAddress: string;
  receiptSlogan: string;
  commercialRegisterNo?: string;
  taxNo?: string;
  isCompleted: boolean;
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  category: 'Integration' | 'Hardware' | 'AI & Analytics' | 'Management';
  description: string;
  version: string;
  license: 'FREE' | 'PRO' | 'ENTERPRISE';
  priceEgp: number;
  isInstalled: boolean;
  status: 'ACTIVE' | 'DISABLED' | 'UPDATE_AVAILABLE';
  author: string;
  iconName: string;
}

export interface SystemUpdateInfo {
  version: string;
  releaseDate: string;
  sizeMb: number;
  releaseNotes: string[];
  isUpdateAvailable: boolean;
  isDownloading: boolean;
  canRollback: boolean;
  previousVersion: string;
}

export interface WhiteLabelConfig {
  appTitle: string;
  brandName: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  loginScreenMessage: string;
  loadingScreenMessage: string;
  footerText: string;
  supportEmail: string;
  customDomain: string;
  isEnabled: boolean;
}

export interface SuperAdminCustomerUsage {
  officeId: string;
  officeName: string;
  ownerEmail: string;
  userCount: number;
  lastLogin: string;
  storageUsageMb: number;
  apiUsageRequests: number;
  ocrUsageCount: number;
  transactionCount: number;
  monthlyRevenueEgp: number;
  subscriptionStatus: 'ACTIVE' | 'TRIAL' | 'EXPIRED' | 'SUSPENDED';
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface MarketingCampaign {
  id: string;
  title: string;
  type: 'BULK_MESSAGE' | 'OFFER' | 'SYSTEM_UPDATE' | 'DISCOUNT';
  targetSegment: 'ALL_OFFICES' | 'HIGH_ACTIVITY' | 'INACTIVE' | 'CHURN_RISK';
  sentCount: number;
  openRatePercentage: number;
  sentAt: string;
  status: 'SENT' | 'SCHEDULED' | 'DRAFT';
}

export interface LicenseRecord {
  licenseKey: string;
  officeName: string;
  activeDevicesCount: number;
  maxDevicesAllowed: number;
  maxBranches: number;
  maxEmployees: number;
  issuedAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
}

export interface PreLaunchChecklistItem {
  id: string;
  category: 'Penetration Testing' | 'Load Testing' | 'Disaster Recovery' | 'Legal & Compliance' | 'Production Integration';
  title: string;
  status: 'PASSED' | 'PENDING' | 'IN_PROGRESS';
  details: string;
}

// LocalStorage Keys
const ONBOARDING_KEY = 'sokar_phase13_onboarding';
const PLUGINS_KEY = 'sokar_phase13_plugins';
const WHITE_LABEL_KEY = 'sokar_phase13_whitelabel';
const LICENSES_KEY = 'sokar_phase13_licenses';
const CAMPAIGNS_KEY = 'sokar_phase13_campaigns';

export const getOnboardingData = (): OfficeOnboardingData => {
  const stored = localStorage.getItem(ONBOARDING_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  return {
    officeName: 'مكتب السكر للخدمات الحكومية الشاملة',
    logoUrl: '/sokar-logo.png',
    branchName: 'الفرع الرئيسي - القاهرة',
    governorate: 'القاهرة',
    workingHours: 'من 8:00 صباحاً إلى 6:00 مساءً (السبت - الخميس)',
    paymentMethods: ['نقدي', 'فودافون كاش', 'فيزا / ماستر كارد', 'إنستا باي'],
    billingAddress: '14 شارع التحرير - الدقي - الجيزة',
    receiptSlogan: 'خدمتك أمانتنا - دقة وسرعة في إنجاز المعاملات',
    commercialRegisterNo: '109842',
    taxNo: '450-981-223',
    isCompleted: true
  };
};

export const saveOnboardingData = (data: OfficeOnboardingData) => {
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
};

export const getMarketplacePlugins = (): MarketplacePlugin[] => {
  const stored = localStorage.getItem(PLUGINS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  const defaults: MarketplacePlugin[] = [
    {
      id: 'plugin-ocr-plus',
      name: 'OCR Plus Engine',
      category: 'AI & Analytics',
      description: 'استخراج متقدم لبيانات بطاقات الرقم القومي والسجلات التجارية وجوازات السفر.',
      version: 'v2.4.0',
      license: 'PRO',
      priceEgp: 250,
      isInstalled: true,
      status: 'ACTIVE',
      author: 'Sokar OS Labs',
      iconName: 'ScanText'
    },
    {
      id: 'plugin-whatsapp-api',
      name: 'WhatsApp Business API Connector',
      category: 'Integration',
      description: 'إرسال إشعارات وتحديثات الطلبات آلياً للعملاء عبر الواتساب الفوري.',
      version: 'v1.8.2',
      license: 'PRO',
      priceEgp: 300,
      isInstalled: true,
      status: 'ACTIVE',
      author: 'Meta & Sokar Integrations',
      iconName: 'MessageSquare'
    },
    {
      id: 'plugin-thermal-printer',
      name: 'Thermal Printer & Barcode Driver',
      category: 'Hardware',
      description: 'طباعة الإيصالات الحرارية والباركود والباركود السريع QR تلقائياً.',
      version: 'v3.1.0',
      license: 'FREE',
      priceEgp: 0,
      isInstalled: true,
      status: 'ACTIVE',
      author: 'Hardware Core Team',
      iconName: 'Printer'
    },
    {
      id: 'plugin-queue-kiosk',
      name: 'Queue & Ticket Kiosk System',
      category: 'Management',
      description: 'نظام إدارة أدوار الانتظار وشاشات الاستدعاء الرقمية للمكاتب المزدحمة.',
      version: 'v1.2.0',
      license: 'ENTERPRISE',
      priceEgp: 450,
      isInstalled: false,
      status: 'DISABLED',
      author: 'Smart Queue Solutions',
      iconName: 'Users'
    },
    {
      id: 'plugin-ai-business-advisor',
      name: 'AI Revenue & Business Advisor',
      category: 'AI & Analytics',
      description: 'مساعد الذكاء الاصطناعي لتحليل ساعات الذروة والربحية وتوقع الضغط.',
      version: 'v2.0.1',
      license: 'PRO',
      priceEgp: 200,
      isInstalled: true,
      status: 'ACTIVE',
      author: 'Gemini Enterprise Lab',
      iconName: 'TrendingUp'
    }
  ];
  localStorage.setItem(PLUGINS_KEY, JSON.stringify(defaults));
  return defaults;
};

export const togglePluginStatus = (id: string): MarketplacePlugin[] => {
  const plugins = getMarketplacePlugins();
  const index = plugins.findIndex(p => p.id === id);
  if (index !== -1) {
    plugins[index].isInstalled = !plugins[index].isInstalled;
    plugins[index].status = plugins[index].isInstalled ? 'ACTIVE' : 'DISABLED';
    localStorage.setItem(PLUGINS_KEY, JSON.stringify(plugins));
  }
  return plugins;
};

export const getSystemUpdateInfo = (): SystemUpdateInfo => {
  return {
    version: 'v13.2.0 Enterprise',
    releaseDate: '2026-07-30',
    sizeMb: 42.8,
    releaseNotes: [
      'إضافة متجر الإضافات Commercial Marketplace',
      'تحديث محرك White-Label وتخصيص العلامة التجارية الكامل',
      'إدماج خادم التراخيص ومراقبة الأجهزة النشطة (License Server)',
      'إضافة AI Business Advisor لتوقعات الربحية والضغط',
      'اجتياز اختبارات الاختراق والأمان (Penetration Test Passed)'
    ],
    isUpdateAvailable: true,
    isDownloading: false,
    canRollback: true,
    previousVersion: 'v12.0.0 Stable'
  };
};

export const getWhiteLabelConfig = (): WhiteLabelConfig => {
  const stored = localStorage.getItem(WHITE_LABEL_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  return {
    appTitle: 'نظام إدارة مكاتب الخدمات الحكومية',
    brandName: 'السُّكَّر أوفيس OS',
    logoUrl: '/sokar-logo.png',
    faviconUrl: '/favicon.ico',
    primaryColor: '#f59e0b',
    loginScreenMessage: 'أهلاً بك في البوابة الإلكترونية الموحدة لإدارة المعاملات الحكومية',
    loadingScreenMessage: 'جاري تحميل نظام التشغيل المؤسسي...',
    footerText: 'جميع الحقوق محفوظة © 2026 - Sokar Office OS Enterprise Platform',
    supportEmail: 'support@sokar-os.eg',
    customDomain: 'office.sokar-services.eg',
    isEnabled: true
  };
};

export const saveWhiteLabelConfig = (config: WhiteLabelConfig) => {
  localStorage.setItem(WHITE_LABEL_KEY, JSON.stringify(config));
};

export const getSuperAdminCustomerUsages = (): SuperAdminCustomerUsage[] => {
  return [
    {
      officeId: 'off-cairo-01',
      officeName: 'مكتب السكر - القاهرة الرئيسي',
      ownerEmail: 'hemasokar23@gmail.com',
      userCount: 12,
      lastLogin: new Date(Date.now() - 5 * 60000).toISOString(),
      storageUsageMb: 14500,
      apiUsageRequests: 18450,
      ocrUsageCount: 480,
      transactionCount: 1240,
      monthlyRevenueEgp: 45000,
      subscriptionStatus: 'ACTIVE',
      churnRisk: 'LOW'
    },
    {
      officeId: 'off-giza-02',
      officeName: 'مكتب الأمل والخدمات - الجيزة',
      ownerEmail: 'giza.office@gmail.com',
      userCount: 6,
      lastLogin: new Date(Date.now() - 3600000).toISOString(),
      storageUsageMb: 6200,
      apiUsageRequests: 8900,
      ocrUsageCount: 210,
      transactionCount: 540,
      monthlyRevenueEgp: 18500,
      subscriptionStatus: 'ACTIVE',
      churnRisk: 'LOW'
    },
    {
      officeId: 'off-alex-03',
      officeName: 'المركز السريع للخدمات - الإسكندرية',
      ownerEmail: 'alex.express@gmail.com',
      userCount: 4,
      lastLogin: new Date(Date.now() - 86400000 * 4).toISOString(),
      storageUsageMb: 2100,
      apiUsageRequests: 1200,
      ocrUsageCount: 45,
      transactionCount: 110,
      monthlyRevenueEgp: 4500,
      subscriptionStatus: 'TRIAL',
      churnRisk: 'HIGH'
    }
  ];
};

export const getMarketingCampaigns = (): MarketingCampaign[] => {
  const stored = localStorage.getItem(CAMPAIGNS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  const defaults: MarketingCampaign[] = [
    {
      id: 'camp-1',
      title: 'عرض التحديث الصيفي - خصم 20% على باقة Enterprise',
      type: 'OFFER',
      targetSegment: 'ALL_OFFICES',
      sentCount: 145,
      openRatePercentage: 88.4,
      sentAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'SENT'
    },
    {
      id: 'camp-2',
      title: 'إطلاق إضافة محرك OCR Plus المحدث',
      type: 'SYSTEM_UPDATE',
      targetSegment: 'HIGH_ACTIVITY',
      sentCount: 62,
      openRatePercentage: 94.1,
      sentAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      status: 'SENT'
    }
  ];
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(defaults));
  return defaults;
};

export const getLicenseRecords = (): LicenseRecord[] => {
  const stored = localStorage.getItem(LICENSES_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  const defaults: LicenseRecord[] = [
    {
      licenseKey: 'SOKAR-ENT-2026- CairoMain-9981-8812',
      officeName: 'مكتب السكر - القاهرة الرئيسي',
      activeDevicesCount: 8,
      maxDevicesAllowed: 15,
      maxBranches: 5,
      maxEmployees: 25,
      issuedAt: '2026-01-01',
      expiresAt: '2027-01-01',
      status: 'ACTIVE'
    },
    {
      licenseKey: 'SOKAR-PRO-2026-GizaOffice-3312-4410',
      officeName: 'مكتب الأمل والخدمات - الجيزة',
      activeDevicesCount: 4,
      maxDevicesAllowed: 5,
      maxBranches: 1,
      maxEmployees: 8,
      issuedAt: '2026-03-15',
      expiresAt: '2026-09-15',
      status: 'ACTIVE'
    }
  ];
  localStorage.setItem(LICENSES_KEY, JSON.stringify(defaults));
  return defaults;
};

export const getPreLaunchChecklist = (): PreLaunchChecklistItem[] => {
  return [
    {
      id: 'chk-1',
      category: 'Penetration Testing',
      title: 'فحص ثغرات SQL Injection و XSS و CSRF والصلاحيات',
      status: 'PASSED',
      details: 'تم اجتياز الفحص الأمني 100%، لا يوجد أي ثغرات أو تسريب للبيانات.'
    },
    {
      id: 'chk-2',
      category: 'Load Testing',
      title: 'اختبار الحمل والضغط لمئات المستخدمين المتزاحمين (Load Test)',
      status: 'PASSED',
      details: 'استجابة السيرفر تظل أقل من 120ms عند محاكاة 500 طلب/ثانية.'
    },
    {
      id: 'chk-3',
      category: 'Disaster Recovery',
      title: 'تجربة الاستعادة الكاملة للنسخ الاحتياطي (Disaster Recovery Simulation)',
      status: 'PASSED',
      details: 'تم استعادة قاعدة بيانات بحجم 1.5 GB بنجاح ودون أي فقد في المعاملات.'
    },
    {
      id: 'chk-4',
      category: 'Legal & Compliance',
      title: 'مراجعة شروط الاستخدام وسياسة الخصوصية والتوافق القانوني',
      status: 'PASSED',
      details: 'تم صياغة ومراجعة سياسة الخصوصية وحماية بيانات المواطنين بشكل رسمي.'
    },
    {
      id: 'chk-5',
      category: 'Production Integration',
      title: 'الربط الفعلي ببوابات الدفع ومفاتيح الإنتاج (Production Keys Setup)',
      status: 'PASSED',
      details: 'تم إعداد بوابات الدفع الرسمية وتفعيل التراخيص المعتمدة.'
    }
  ];
};
