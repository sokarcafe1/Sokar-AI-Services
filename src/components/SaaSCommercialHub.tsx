import React, { useState } from 'react';
import { 
  SaaSLicense, 
  OfficeBrandingConfig, 
  TenantInfo, 
  SaaSBillingInvoice, 
  SaaSPlugin, 
  AutoUpdateState, 
  DiagnosticErrorReport, 
  DeploymentConfig,
  SubscriptionTier
} from '../types';
import { 
  Key, ShieldCheck, Sparkles, Building2, Palette, CreditCard, 
  Layers, Package, RefreshCw, AlertTriangle, Cpu, Server, 
  Download, Check, Globe, Database, Terminal, CheckCircle2, 
  Zap, Lock, Play, HardDrive, FileText, Activity, ShieldAlert,
  Sliders, ArrowUpRight, Copy, CheckCircle, Smartphone, Send
} from 'lucide-react';

// Initial SaaS License State
const INITIAL_LICENSE: SaaSLicense = {
  licenseKey: 'EG-SAAS-PRO-8921-9012-X9',
  officeName: 'مكتب خدمات مصر الرقمية - الفرع الرئيسي',
  plan: 'professional',
  status: 'active',
  issuedAt: '2026-01-01',
  expiresAt: '2027-01-01',
  maxCountersAllowed: 10,
  maxBranchesAllowed: 5,
  isVerifiedOnline: true,
  lastOnlineCheck: 'منذ دقيقة واحدة'
};

// Initial Branding Config
const INITIAL_BRANDING: OfficeBrandingConfig = {
  officeNameAr: 'مكتب الخدمات الحكومية الرقمية المعتمد',
  officeNameEn: 'Egyptian Digital Government Services Office',
  taglineAr: 'خدمات مصرية سريعة بمرجعية رسمية معتمدة',
  logoEmoji: '🏛️',
  primaryColor: '#0f172a',
  accentColor: '#4f46e5',
  receiptHeaderAr: 'مكتب الخدمات الحكومية - جمهورية مصر العربية',
  receiptFooterAr: 'نشكركم لزيارة مكتبنا - نتمنى لكم يوماً سعيداً',
  customWatermarkText: 'رسمي ومعتمد - مكتب الخدمات',
  showGovBadge: true
};

// Initial Tenants List
const INITIAL_TENANTS: TenantInfo[] = [
  {
    id: 'tenant-1',
    subdomain: 'cairo-main',
    officeName: 'مكتب القاهرة الرئيسي - مجمع التحرير',
    databaseName: 'db_office_cairo_prod',
    createdAt: '2026-01-10',
    plan: 'professional',
    status: 'active',
    totalRequestsProcessed: 4820,
    activeUsersCount: 12,
    dbSizeBytes: 145000000
  },
  {
    id: 'tenant-2',
    subdomain: 'giza-pyramids',
    officeName: 'مكتب الجيزة - شارع الهرم',
    databaseName: 'db_office_giza_prod',
    createdAt: '2026-02-01',
    plan: 'professional',
    status: 'active',
    totalRequestsProcessed: 3120,
    activeUsersCount: 8,
    dbSizeBytes: 98000000
  },
  {
    id: 'tenant-3',
    subdomain: 'alex-station',
    officeName: 'مكتب الإسكندرية - محطة الرمل',
    databaseName: 'db_office_alex_prod',
    createdAt: '2026-03-15',
    plan: 'basic',
    status: 'active',
    totalRequestsProcessed: 1890,
    activeUsersCount: 5,
    dbSizeBytes: 54000000
  }
];

// Initial Billing Invoices
const INITIAL_BILLING_INVOICES: SaaSBillingInvoice[] = [
  {
    id: 's-inv-101',
    invoiceNumber: 'SAAS-2026-001',
    officeName: 'مكتب الخدمات الحكومية الرقمية المعتمد',
    plan: 'professional',
    billingPeriod: 'يناير 2026 - فبراير 2026',
    amountEgp: 1299,
    status: 'paid',
    dueDate: '2026-01-05',
    paidAt: '2026-01-02',
    paymentMethod: 'fawry'
  },
  {
    id: 's-inv-102',
    invoiceNumber: 'SAAS-2026-002',
    officeName: 'مكتب الخدمات الحكومية الرقمية المعتمد',
    plan: 'professional',
    billingPeriod: 'فبراير 2026 - مارس 2026',
    amountEgp: 1299,
    status: 'paid',
    dueDate: '2026-02-05',
    paidAt: '2026-02-01',
    paymentMethod: 'credit_card'
  }
];

// Initial Plugins Marketplace
const INITIAL_PLUGINS: SaaSPlugin[] = [
  {
    id: 'p-whatsapp',
    nameAr: 'بوابة إشعارات واتساب التلقائية',
    nameEn: 'WhatsApp Automation Gateway',
    descriptionAr: 'إرسال إشعارات جاهزية المعاملات وتحديثات الحالة فوراً للعملاء عبر واتساب رسمي',
    category: 'communication',
    iconEmoji: '💬',
    isInstalled: true,
    isEnabled: true,
    priceEgpMonthly: 199,
    version: 'v2.4.0'
  },
  {
    id: 'p-ai-ocr',
    nameAr: 'قارئ بطاقات الرقم القومي الذكي OCR',
    nameEn: 'AI Document OCR Reader',
    descriptionAr: 'استخراج جميع بيانات البطاقة وشهادة الميلاد بالذكاء الاصطناعي تلقائياً في ثوانٍ',
    category: 'ai',
    iconEmoji: '👁️',
    isInstalled: true,
    isEnabled: true,
    priceEgpMonthly: 299,
    version: 'v3.1.2'
  },
  {
    id: 'p-thermal-pos',
    nameAr: 'محرك الطابعات الحرارية وإيصالات POS',
    nameEn: 'Thermal Printing & POS Engine',
    descriptionAr: 'طباعة سريعة لإيصالات التحصيل وتذاكر طابور الانتظار 80mm & 58mm',
    category: 'hardware',
    iconEmoji: '🖨️',
    isInstalled: true,
    isEnabled: true,
    priceEgpMonthly: 0,
    version: 'v1.8.0'
  },
  {
    id: 'p-fingerprint',
    nameAr: 'نظام المصادقة بالبصمة البيومترية للموظفين',
    nameEn: 'Biometric Fingerprint Auth',
    descriptionAr: 'تسجيل دخول الموظفين بالبصمة ومنع التلاعب بالخزينة والمعاملات',
    category: 'compliance',
    iconEmoji: '👆',
    isInstalled: false,
    isEnabled: false,
    priceEgpMonthly: 150,
    version: 'v1.0.5'
  },
  {
    id: 'p-zatca-tax',
    nameAr: 'موديول الفاتورة الإلكترونية الضريبية',
    nameEn: 'E-Invoicing & Tax Compliance',
    descriptionAr: 'ربط الفواتير والإيصالات تلقائياً مع مصلحة الضرائب وتوليد QR الضريبي',
    category: 'finance',
    iconEmoji: '🧾',
    isInstalled: false,
    isEnabled: false,
    priceEgpMonthly: 250,
    version: 'v2.0.1'
  }
];

// Initial Auto Update State
const INITIAL_AUTO_UPDATE: AutoUpdateState = {
  currentVersion: 'v10.0.0 Commercial SaaS Edition',
  latestVersion: 'v10.0.0 Commercial SaaS Edition',
  updateAvailable: false,
  releaseNotesAr: 'إصدار التجاري النهائي: دعم الكامل للتراخيص السحابية، تحويل الفروع، الموديولات الإضافية ونظام النشر السريع بـ Docker.',
  isUpdating: false,
  updateProgress: 100,
  pendingDatabaseMigrations: 0,
  lastCheckedAt: 'منذ 5 دقائق'
};

// Initial Diagnostic Errors
const INITIAL_DIAGNOSTICS: DiagnosticErrorReport[] = [
  {
    id: 'err-1',
    timestamp: '2026-07-24 11:20',
    severity: 'low',
    component: 'ThermalPrinterDriver',
    message: 'تم إعادة الاتصال بالطابعة الحرارية تلقائياً بعد انقطاع مؤقت',
    officeName: 'مكتب القاهرة الرئيسي',
    status: 'resolved'
  },
  {
    id: 'err-2',
    timestamp: '2026-07-24 09:15',
    severity: 'medium',
    component: 'WhatsAppGatewayAPI',
    message: 'تأخر في استجابة خادم الواتساب لمدة 2 ثانية، تم إعادة المحاولة بنجاح',
    officeName: 'مكتب الجيزة',
    status: 'resolved'
  }
];

// Initial Deployment Config
const INITIAL_DEPLOYMENT: DeploymentConfig = {
  domainName: 'office.eg-services.app',
  sslEnabled: true,
  dockerStatus: 'running',
  nginxStatus: 'active',
  postgresHost: 'postgres-db-cluster.internal:5432',
  postgresDb: 'db_eg_office_saas_production',
  backupSchedulerEnabled: true,
  backupFrequencyHours: 24,
  lastBackupAt: '2026-07-24 03:00'
};

export const SaaSCommercialHub: React.FC = () => {
  const [subTab, setSubTab] = useState<
    'license' | 'branding' | 'plans' | 'tenant' | 'billing' | 'plugins' | 'updates' | 'diagnostics' | 'admin_portal' | 'deployment'
  >('license');

  // State
  const [license, setLicense] = useState<SaaSLicense>(INITIAL_LICENSE);
  const [branding, setBranding] = useState<OfficeBrandingConfig>(INITIAL_BRANDING);
  const [tenants, setTenants] = useState<TenantInfo[]>(INITIAL_TENANTS);
  const [activeTenant, setActiveTenant] = useState<TenantInfo>(INITIAL_TENANTS[0]);
  const [invoices, setInvoices] = useState<SaaSBillingInvoice[]>(INITIAL_BILLING_INVOICES);
  const [plugins, setPlugins] = useState<SaaSPlugin[]>(INITIAL_PLUGINS);
  const [autoUpdate, setAutoUpdate] = useState<AutoUpdateState>(INITIAL_AUTO_UPDATE);
  const [diagnostics, setDiagnostics] = useState<DiagnosticErrorReport[]>(INITIAL_DIAGNOSTICS);
  const [deployment, setDeployment] = useState<DeploymentConfig>(INITIAL_DEPLOYMENT);

  // Input states
  const [inputLicenseKey, setInputLicenseKey] = useState('');
  const [verifyingOnline, setVerifyingOnline] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [updatingApp, setUpdatingApp] = useState(false);
  const [updateProgressVal, setUpdateProgressVal] = useState(0);

  // License Activation Handler
  const handleActivateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLicenseKey) return;

    setVerifyingOnline(true);
    setTimeout(() => {
      setLicense({
        ...license,
        licenseKey: inputLicenseKey,
        status: 'active',
        plan: inputLicenseKey.includes('ENT') ? 'enterprise' : 'professional',
        isVerifiedOnline: true,
        lastOnlineCheck: 'الان'
      });
      setVerifyingOnline(false);
      setInputLicenseKey('');
      alert('تم تفعيل وترخيص النسخة السحابية التجاري بنجاح! 🔑✨');
    }, 1200);
  };

  // Heartbeat Online Check
  const handleRunOnlineHeartbeat = () => {
    setVerifyingOnline(true);
    setTimeout(() => {
      setLicense(prev => ({ ...prev, isVerifiedOnline: true, lastOnlineCheck: 'الان (سليم 100%)' }));
      setVerifyingOnline(false);
      alert('تم التحقق من خادم التراخيص المركزي السحابي: الترخيص نشط وقانوني 🟢');
    }, 800);
  };

  // Toggle Plugin
  const handleTogglePlugin = (pluginId: string) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === pluginId) {
        return { ...p, isEnabled: !p.isEnabled };
      }
      return p;
    }));
  };

  // Install Plugin
  const handleInstallPlugin = (pluginId: string) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === pluginId) {
        return { ...p, isInstalled: true, isEnabled: true };
      }
      return p;
    }));
    alert('تم تثبيت وتفعيل الموديول بنجاح! 📦');
  };

  // Trigger Update
  const handleTriggerUpdate = () => {
    setUpdatingApp(true);
    setUpdateProgressVal(10);

    const interval = setInterval(() => {
      setUpdateProgressVal(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUpdatingApp(false);
          setAutoUpdate(a => ({ ...a, updateAvailable: false, lastCheckedAt: 'الان' }));
          alert('تم تحديث البرنامج وتشغيل هجرة قواعد البيانات بنجاح! 🚀');
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-5 dir-rtl font-['Cairo',sans-serif]">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-indigo-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/80 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            💎
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md uppercase">
                Commercial SaaS Edition
              </span>
              <span className="bg-emerald-900 text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>ترخيص نشط وموثق</span>
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">
              منظومة التجاري والتراخيص والموديولات البرمجية (SaaS Commercial Suite)
            </h2>
          </div>
        </div>

        {/* Upgrade / Sub Status Quick Pill */}
        <div className="bg-slate-900/90 border border-indigo-700/60 p-3 rounded-2xl flex items-center gap-3 self-end md:self-center shrink-0">
          <div>
            <div className="text-[10px] text-indigo-300 font-bold">باقة الاشتراك الحالية:</div>
            <div className="text-sm font-black text-amber-400 uppercase">{license.plan} Plan</div>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ترقية الباقة</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar for Phase 10 Modules */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold scrollbar-none border-b border-slate-200">
        
        <button
          onClick={() => setSubTab('license')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'license'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>1. التراخيص والتفعيل</span>
        </button>

        <button
          onClick={() => setSubTab('branding')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'branding'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span>2. الهوية المخصصة</span>
        </button>

        <button
          onClick={() => setSubTab('plans')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'plans'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>3. باقات الاشتراكات</span>
        </button>

        <button
          onClick={() => setSubTab('tenant')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'tenant'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>4. التعدد المستأجر (Multi-Tenant)</span>
        </button>

        <button
          onClick={() => setSubTab('billing')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'billing'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
          <span>5. الفواتير والتحصيل</span>
        </button>

        <button
          onClick={() => setSubTab('plugins')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'plugins'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Package className="w-3.5 h-3.5 text-purple-400" />
          <span>6. الموديولات والإضافات</span>
        </button>

        <button
          onClick={() => setSubTab('updates')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'updates'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
          <span>7. التحديث الآلي والمهاجرة</span>
        </button>

        <button
          onClick={() => setSubTab('diagnostics')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'diagnostics'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-rose-400" />
          <span>8. التشخيص والأخطاء</span>
        </button>

        <button
          onClick={() => setSubTab('admin_portal')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'admin_portal'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>9. بوابة Super Admin</span>
        </button>

        <button
          onClick={() => setSubTab('deployment')}
          className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
            subTab === 'deployment'
              ? 'bg-indigo-900 text-white font-black shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>10. النشر السريع (Deployment)</span>
        </button>

      </div>

      {/* MODULE 1: LICENSING SYSTEM */}
      {subTab === 'license' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-600" />
                <span>بيانات ومعلومات ترخيص المكتب السحابي</span>
              </h3>
              <button
                onClick={handleRunOnlineHeartbeat}
                disabled={verifyingOnline}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${verifyingOnline ? 'animate-spin' : ''}`} />
                <span>فحص الخادم المركزي</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 font-bold block">مفتاح الترخيص الرسمي (License Key):</span>
                <div className="font-mono font-black text-sm text-indigo-900 flex items-center justify-between">
                  <span>{license.licenseKey}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-sans">نشط 🟢</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 font-bold block">اسم المكتب المسجل بالترخيص:</span>
                <div className="font-bold text-xs text-slate-900">{license.officeName}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 font-bold block">تاريخ الاصدار والانتهاء:</span>
                <div className="font-bold text-xs text-slate-800">{license.issuedAt} حتى {license.expiresAt}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 font-bold block">حدود الاستخدام المصرحة:</span>
                <div className="font-bold text-xs text-slate-800">
                  حتى {license.maxCountersAllowed} شبابيك | حتى {license.maxBranchesAllowed} فروع
                </div>
              </div>
            </div>

            {/* Activate New License Key Form */}
            <form onSubmit={handleActivateLicense} className="bg-indigo-950 text-white p-4 rounded-2xl space-y-3">
              <h4 className="font-black text-xs text-indigo-200 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>تفعيل كود ترخيص جديد أو تجديد الاشتراك</span>
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputLicenseKey}
                  onChange={(e) => setInputLicenseKey(e.target.value)}
                  placeholder="أدخل كود الترخيص e.g. EG-SAAS-PRO-9900-X1"
                  className="flex-1 bg-slate-900 text-white border border-indigo-700 rounded-xl p-2.5 text-xs font-mono font-bold focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={verifyingOnline}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
                >
                  تفعيل الترخيص 🔑
                </button>
              </div>
            </form>

          </div>

          {/* Right Status Panel */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              حالة الأمان والتحقق اللحظي
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="font-bold">فحص الترخيص الأونلاين:</span>
                <span className="font-mono font-black">{license.lastOnlineCheck}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">وضع التجربة (Trial Mode):</span>
                <p className="text-[11px] text-slate-600">
                  النسخة مفعّلة بترخيص مدفوع تجاري بالكامل (Full Commercial Activated).
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 2: OFFICE BRANDING */}
      {subTab === 'branding' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-600" />
              <span>تخصيص الهوية التجارية وشعار المكتب والشكل العام</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              تغيير اسم المكتب، الشعار، الألوان الرئيسية، وتصميم الإيصالات الحرارية المعتمدة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-slate-700">اسم المكتب (باللغة العربية):</label>
              <input
                type="text"
                value={branding.officeNameAr}
                onChange={(e) => setBranding({ ...branding, officeNameAr: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">اسم المكتب (باللغة الإنجليزية):</label>
              <input
                type="text"
                value={branding.officeNameEn}
                onChange={(e) => setBranding({ ...branding, officeNameEn: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">الشعار / الأيقونة الرئيسية (Emoji):</label>
              <input
                type="text"
                value={branding.logoEmoji}
                onChange={(e) => setBranding({ ...branding, logoEmoji: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xl text-center"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">العبارة الترحيبية / الشعار اللفظي:</label>
              <input
                type="text"
                value={branding.taglineAr}
                onChange={(e) => setBranding({ ...branding, taglineAr: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">ترويسة الإيصال الحراري:</label>
              <input
                type="text"
                value={branding.receiptHeaderAr}
                onChange={(e) => setBranding({ ...branding, receiptHeaderAr: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">تذييل الإيصال الحراري:</label>
              <input
                type="text"
                value={branding.receiptFooterAr}
                onChange={(e) => setBranding({ ...branding, receiptFooterAr: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
              />
            </div>

          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{branding.logoEmoji}</span>
              <div>
                <h4 className="font-black text-sm">{branding.officeNameAr}</h4>
                <p className="text-xs text-slate-400">{branding.taglineAr}</p>
              </div>
            </div>
            <button
              onClick={() => alert('تم حفظ الهوية التجارية المخصصة للمكتب بنجاح! 🎨')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              حفظ التعديلات 💾
            </button>
          </div>
        </div>
      )}

      {/* MODULE 3: SUBSCRIPTION PLANS */}
      {subTab === 'plans' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="bg-slate-100 text-slate-800 font-bold text-[10px] px-2.5 py-1 rounded-md">BASIC</span>
                <h3 className="font-black text-lg text-slate-900">الباقة الأساسية</h3>
                <div className="text-2xl font-black text-indigo-900">499 ج.م <span className="text-xs text-slate-500 font-normal">/ شهرياً</span></div>
                <ul className="text-xs space-y-2 text-slate-600 pt-3 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> فرع واحد مصرح</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> حتى 3 شبابيك انتظار</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> حتى 500 معاملة شهرياً</li>
                </ul>
              </div>
              <button
                onClick={() => alert('أنت بالفعل مستخدم لباقة أعلى!')}
                className="w-full bg-slate-100 text-slate-700 font-bold text-xs py-2 rounded-xl"
              >
                اختيار الباقة
              </button>
            </div>

            {/* Professional Plan (Active) */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-2xl p-5 border-2 border-indigo-500 shadow-lg space-y-4 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-4 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                الباقة الحالية النَّشِطة
              </div>
              <div className="space-y-2">
                <span className="bg-indigo-800 text-indigo-200 font-bold text-[10px] px-2.5 py-1 rounded-md">PROFESSIONAL</span>
                <h3 className="font-black text-lg text-white">الباقة الاحترافية</h3>
                <div className="text-2xl font-black text-amber-300">1,299 ج.م <span className="text-xs text-indigo-200 font-normal">/ شهرياً</span></div>
                <ul className="text-xs space-y-2 text-indigo-100 pt-3 border-t border-indigo-800">
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> حتى 5 فروع مختلفة</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> حتى 10 شبابيك طابور</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> معاملات غير محدودة</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> موديول الواتساب والماسح OCR</li>
                </ul>
              </div>
              <button className="w-full bg-emerald-500 text-slate-950 font-black text-xs py-2.5 rounded-xl cursor-default">
                الباقة المفعلة حالياً 🟢
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="bg-purple-100 text-purple-900 font-bold text-[10px] px-2.5 py-1 rounded-md">ENTERPRISE</span>
                <h3 className="font-black text-lg text-slate-900">باقة المؤسسات الكبرى</h3>
                <div className="text-2xl font-black text-purple-950">2,999 ج.م <span className="text-xs text-slate-500 font-normal">/ شهرياً</span></div>
                <ul className="text-xs space-y-2 text-slate-600 pt-3 border-t border-slate-100">
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-purple-600" /> فروع وشبابيك غير محدودة</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-purple-600" /> نطاق مخصص White-Label</li>
                  <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-purple-600" /> خادم مستقل ونشر Docker</li>
                </ul>
              </div>
              <button
                onClick={() => alert('تم تسجيل طلب الترقية إلى باقة المؤسسات، سينسق مع مندوب المبيعات 🚀')}
                className="w-full bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs py-2.5 rounded-xl"
              >
                ترقية إلى المؤسسات
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODULE 4: MULTI-TENANT ARCHITECTURE */}
      {subTab === 'tenant' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>إدارة التعدد المستأجر وقواعد البيانات المعزولة (Multi-Tenant)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                كل مكتب أو فرع يمتلك قاعدة بيانات معزولة ومستقلة بالكامل لمنع اختلاط البيانات
              </p>
            </div>
            <span className="bg-blue-100 text-blue-900 font-bold text-xs px-3 py-1 rounded-full">
              عدد المستأجرين: {tenants.length}
            </span>
          </div>

          <div className="space-y-3">
            {tenants.map(t => (
              <div key={t.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-slate-900">{t.officeName}</span>
                    <span className="font-mono text-[11px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                      {t.subdomain}.eg-services.app
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-3">
                    <span>قاعدة البيانات: <strong className="font-mono text-slate-800">{t.databaseName}</strong></span>
                    <span>المعاملات: <strong className="text-emerald-700">{t.totalRequestsProcessed}</strong></span>
                    <span>المستخدمين: <strong className="text-indigo-700">{t.activeUsersCount}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTenant(t);
                    alert(`تم التبديل بنجاح إلى بيئة بيئة المستأجر: ${t.officeName}`);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    activeTenant.id === t.id
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-indigo-900 hover:bg-indigo-950 text-white'
                  }`}
                >
                  {activeTenant.id === t.id ? 'البيئة النشطة الحالية 🟢' : 'التبديل لهذه البيئة 🔀'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: BILLING SYSTEM */}
      {subTab === 'billing' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>فواتير اشتراك المنظومة وسجل الدفع السحابي</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">التجديد التلقائي: مفعّل 🔄</span>
          </div>

          <div className="space-y-3">
            {invoices.map(inv => (
              <div key={inv.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-black text-indigo-900">{inv.invoiceNumber}</div>
                  <div className="text-slate-600 mt-0.5">{inv.billingPeriod} ({inv.amountEgp} ج.م)</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
                    تم السداد ({inv.paymentMethod})
                  </span>
                  <button
                    onClick={() => alert(`جاري تنزيل فاتورة رقم ${inv.invoiceNumber}...`)}
                    className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 6: PLUGIN SYSTEM MARKETPLACE */}
      {subTab === 'plugins' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-purple-600" />
              <span>متجر الموديولات البرمجية والإضافات الاختيارية (SaaS Plugin System)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              تفعيل وإلغاء تفعيل الوظائف الإضافية حسب احتياج مكتبك بنقرة واحدة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plugins.map(plugin => (
              <div key={plugin.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{plugin.iconEmoji}</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {plugin.version}
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-slate-900">{plugin.nameAr}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{plugin.descriptionAr}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900">
                    {plugin.priceEgpMonthly === 0 ? 'مجداني مجاني' : `${plugin.priceEgpMonthly} ج.م / شهر`}
                  </span>

                  {plugin.isInstalled ? (
                    <button
                      onClick={() => handleTogglePlugin(plugin.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        plugin.isEnabled
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {plugin.isEnabled ? 'مفعّل وشغّال 🟢' : 'معطّل مؤقتاً ⏸️'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInstallPlugin(plugin.id)}
                      className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl"
                    >
                      تثبيت الموديول 📦
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 7: AUTO UPDATE & MIGRATIONS */}
      {subTab === 'updates' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-sky-600" />
                <span>نظام التحديث التلقائي ومدير هجرة قواعد البيانات (Auto Update & Drizzle Migrations)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                تطبيق تحديثات النظام وهيكلة قواعد البيانات دون فقدان البيانات
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span>الإصدار الحالي: <strong className="text-amber-300 font-mono">{autoUpdate.currentVersion}</strong></span>
              <span className="text-emerald-400 font-bold">الحالة: محدث لأحدث إصدار مستقر</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-2">
              {autoUpdate.releaseNotesAr}
            </p>

            {updatingApp && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-indigo-200 font-bold">
                  <span>جاري تطبيق التحديث وهجرة الجداول...</span>
                  <span>{updateProgressVal}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${updateProgressVal}%` }} />
                </div>
              </div>
            )}

            <button
              onClick={handleTriggerUpdate}
              disabled={updatingApp}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              فحص وتطبيق التحديثات الآلية 🚀
            </button>
          </div>
        </div>
      )}

      {/* MODULE 8: ERROR REPORTING & DIAGNOSTICS */}
      {subTab === 'diagnostics' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-600" />
              <span>تشخيصات الأخطاء وسجلات الأعطال عن بُعد (Remote Crash Diagnostics)</span>
            </h3>
          </div>

          <div className="space-y-2">
            {diagnostics.map(diag => (
              <div key={diag.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">[{diag.component}]</span>
                    <span className="text-slate-600">{diag.message}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{diag.timestamp} - {diag.officeName}</div>
                </div>

                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  تم المعالجة {diag.status === 'resolved' ? '✅' : '⏳'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 9: SAAS SUPER ADMIN PORTAL */}
      {subTab === 'admin_portal' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">إجمالي المكاتب المشتركة</span>
              <span className="text-2xl font-black text-amber-400">142 مكتباً</span>
            </div>
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">إجمالي المعاملات الكلي</span>
              <span className="text-2xl font-black text-emerald-400">89,420 معاملة</span>
            </div>
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">الإيراد المتكرر الشهري MRR</span>
              <span className="text-2xl font-black text-indigo-300">184,500 ج.م</span>
            </div>
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">نسبة الجاهزية Uptime</span>
              <span className="text-2xl font-black text-emerald-300">99.98%</span>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 10: DEPLOYMENT WIZARD */}
      {subTab === 'deployment' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" />
              <span>معالج النشر السريع (Docker, Nginx, PostgreSQL, SSL)</span>
            </h3>
          </div>

          <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-2xl space-y-2 overflow-x-auto dir-ltr">
            <p className="text-slate-400"># Docker Compose Production Stack</p>
            <p>version: '3.8'</p>
            <p>services:</p>
            <p className="pl-4">app:</p>
            <p className="pl-8">image: eg-services-office-saas:v10</p>
            <p className="pl-8">ports: ["3000:3000"]</p>
            <p className="pl-8">environment:</p>
            <p className="pl-12">- DATABASE_URL=postgres://user:pass@{deployment.postgresHost}/{deployment.postgresDb}</p>
          </div>

          <button
            onClick={() => alert('تم توليد ملف docker-compose.yml وتجهيز نص النشر السريع! 🐳')}
            className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>تنزيل حزمة النشر السحابية Docker & Nginx SSL 📦</span>
          </button>
        </div>
      )}

    </div>
  );
};
