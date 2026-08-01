import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  Zap,
  Clock,
  Key,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
  FileText,
  Download,
  Building2,
  Lock,
  Plus,
  Ban,
  TrendingUp,
  Sparkles,
  Layers,
  Copy,
  Check,
  Laptop,
  HardDrive,
  Smartphone,
  PlusCircle,
  Trash2,
  Users
} from 'lucide-react';
import {
  SubscriptionState,
  SubscriptionPlanTier,
  FeatureKey,
  PLAN_FEATURE_PERMISSIONS,
} from '../types/subscription';
import {
  getActiveSubscription,
  renewCurrentSubscription,
  updateSubscriptionPlan,
  activateLicenseKey,
  getSubscriptionHistory,
  getPaymentRecords,
  setSubscriptionExpiredForTesting,
  setSubscriptionTrialMode,
  getDeviceHardwareId,
  getBoundDevices,
  addBoundDeviceSeat,
  removeBoundDeviceSeat,
  BoundDeviceRecord
} from '../services/subscriptionService';

interface SubscriptionCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuperAdmin?: boolean;
  onOpenSuperAdminCrm?: () => void;
}

export const SubscriptionCenterModal: React.FC<SubscriptionCenterModalProps> = ({
  isOpen,
  onClose,
  isSuperAdmin = false,
  onOpenSuperAdminCrm,
}) => {

  const [subState, setSubState] = useState<SubscriptionState>(() => getActiveSubscription(true));
  const [inputKey, setInputKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'invoices' | 'superadmin'>('overview');

  // Super Admin Form States
  const [saOfficeName, setSaOfficeName] = useState('مكتب خدمات جديد - فرع طنطا');
  const [saPlan, setSaPlan] = useState<SubscriptionPlanTier>('professional');
  const [saDurationMonths, setSaDurationMonths] = useState(12);
  const [generatedLicense, setGeneratedLicense] = useState('');

  // Hardware ID Device Binding State
  const [boundDevices, setBoundDevices] = useState<BoundDeviceRecord[]>(() => getBoundDevices());
  const [newDeviceNameInput, setNewDeviceNameInput] = useState('');
  const currentHwid = getDeviceHardwareId();

  const handleAddDeviceSeatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceNameInput.trim()) return;
    const updated = addBoundDeviceSeat(newDeviceNameInput.trim());
    setBoundDevices(updated);
    setNewDeviceNameInput('');
    setFeedbackMsg('تم إضافة مقعد كمبيوتر جديد وتوثيق كود الهاردوير (HWID) بنجاح!');
  };

  const handleRemoveDeviceSeat = (devId: string) => {
    const updated = removeBoundDeviceSeat(devId);
    setBoundDevices(updated);
    setFeedbackMsg('تم إزالة ربط الكمبيوتر ويمكن الآن إضافة جهاز بديل.');
  };


  useEffect(() => {
    if (isOpen) {
      setSubState(getActiveSubscription(true));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const history = getSubscriptionHistory();
  const payments = getPaymentRecords();

  const handleRenew = () => {
    const updated = renewCurrentSubscription(12, 'مدير المكتب');
    setSubState(updated);
    setFeedbackMsg('تم تجديد اشتراك المكتب بنجاح لمدة 12 شهراً إضافية!');
  };

  const handleUpgrade = (plan: SubscriptionPlanTier) => {
    const updated = updateSubscriptionPlan(plan, 12, 'مدير المكتب');
    setSubState(updated);
    setFeedbackMsg(`تم ترقية الاشتراك بنجاح إلى الباقة ${plan === 'enterprise' ? 'المؤسسات' : 'الاحترافية'}!`);
  };

  const handleActivateKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    try {
      const updated = activateLicenseKey(inputKey);
      setSubState(updated);
      setInputKey('');
      setFeedbackMsg('تم تفعيل رقم الترخيص بنجاح وفتح كافة المزايا المشمولة!');
    } catch (err: any) {
      setFeedbackMsg('رقم الترخيص المدخل غير صحيح.');
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(subState.licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleGenerateSuperAdminLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = saPlan === 'enterprise' ? 'EG-SOKAR-ENT' : 'EG-SOKAR-PRO';
    const rand = Math.floor(1000 + Math.random() * 9000);
    const key = `${prefix}-${rand}-2026`;
    setGeneratedLicense(key);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in dir-rtl">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-black text-white text-base sm:text-lg flex items-center gap-2">
                <span>مركز إدارة الاشتراكات والتراخيص</span>
                <span className="text-[10px] bg-amber-950 border border-amber-500/60 text-amber-300 font-extrabold px-2 py-0.5 rounded-full">
                  SOKAR OS Subscription Center
                </span>
              </h3>
              <p className="text-xs text-slate-400">متابعة حالة الترخيص والتجديد وفواتير الاشتراك</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Feedback Banner */}
        {feedbackMsg && (
          <div className="bg-emerald-950 border-b border-emerald-500/50 p-3 text-emerald-200 text-xs font-bold flex items-center justify-between px-6">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {feedbackMsg}
            </span>
            <button onClick={() => setFeedbackMsg('')} className="text-emerald-400 text-xs hover:underline">
              تجاهل
            </button>
          </div>
        )}

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-slate-800 bg-slate-950/40 shrink-0 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ملخص الاشتراك والترخيص</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>مصفوفة الصلاحيات والمزايا</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>سجل الفواتير والمدفوعات ({payments.length})</span>
          </button>

          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab('superadmin')}
              className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'superadmin'
                  ? 'border-purple-400 text-purple-300'
                  : 'border-transparent text-purple-400/70 hover:text-purple-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>إدارة التراخيص (Super Admin)</span>
            </button>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-right">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Current Subscription Card */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-600/50 px-3 py-1 rounded-full">
                      الباقة الحالية: {subState.plan.toUpperCase()}
                    </span>
                    <h4 className="text-xl font-black text-white mt-2">{subState.officeName}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">
                      كود المستأجر (Tenant ID): <strong className="text-slate-300">{subState.tenantId}</strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right bg-slate-950/90 border border-slate-800 p-3 rounded-2xl shrink-0">
                    <span className="text-[11px] text-slate-400 block">الأيام المتبقية في الاشتراك</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {subState.daysRemaining} يوماً
                    </span>
                  </div>
                </div>

                {/* Status Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">حالة الاشتراك</span>
                    <strong className={`font-extrabold text-sm ${subState.status === 'active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {subState.status === 'active' ? 'ساري ونشط 🟢' : 'منتهي / متوقف 🔴'}
                    </strong>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">تاريخ التفعيل</span>
                    <strong className="text-slate-200 font-mono text-xs">{subState.issuedAt}</strong>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">تاريخ الانتهاء</span>
                    <strong className="text-amber-300 font-mono text-xs">{subState.expiresAt}</strong>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">الحد الأقصى للفروع</span>
                    <strong className="text-sky-300 font-bold">{subState.limits.maxBranches} فروع</strong>
                  </div>
                </div>

                {/* License Key Box */}
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-400 font-bold">مفتاح الترخيص (License Key):</span>
                    <strong className="font-mono text-amber-300 text-sm">{subState.licenseKey}</strong>
                  </div>

                  <button
                    onClick={handleCopyKey}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'تم النسخ' : 'نسخ المفتاح'}</span>
                  </button>
                </div>

                {/* Renewal & Upgrade Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRenew}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>تجديد الاشتراك لعام إضافي (1,299 ج.م)</span>
                  </button>

                  <button
                    onClick={() => handleUpgrade('enterprise')}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>ترقية إلى باقة المؤسسات (Enterprise)</span>
                  </button>
                </div>
              </div>

              {/* Enter License Key Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>تفعيل ترخيص برقم تسلسلي جديد (Serial Activation Key)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newRand = `SOKAR-PRO-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                      setInputKey(newRand);
                    }}
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1 rounded-lg font-bold border border-slate-700 transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>توليد كود تلقائي</span>
                  </button>
                </div>

                <form onSubmit={handleActivateKeySubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="أدخل كود الترخيص e.g. SOKAR-PRO-FULL-2026"
                    className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono font-bold"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>تفعيل المفتاح فوراً</span>
                  </button>
                </form>

                {/* Quick Ready License Keys for testing */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] text-slate-400 font-bold block">أكواد تراخيص صالحة جاهزة للتفعيل المباشر (انقر للتجربة):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { code: 'SOKAR-PRO-FULL-2026', label: 'ترخيص سنوي احترافي Pro (365 يوم)' },
                      { code: 'SOKAR-ENT-VIP-2026', label: 'ترخيص باقة المؤسسات Enterprise' },
                      { code: 'SOKAR-TRIAL-30D-2026', label: 'ترخيص تجريبي ممتد (30 يوم)' }
                    ].map((k) => (
                      <button
                        key={k.code}
                        type="button"
                        onClick={() => {
                          setInputKey(k.code);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 p-2 rounded-xl text-right transition-all group"
                      >
                        <span className="font-mono text-amber-300 font-black text-xs block group-hover:text-amber-400">{k.code}</span>
                        <span className="text-[10px] text-slate-400 block font-sans">{k.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hardware ID (HWID) Device Lock & Binding Section */}
              <div className="bg-slate-950/90 border border-amber-500/40 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-white">ربط الأجهزة المعتمدة ومعرّف الهاردوير (Hardware ID - HWID)</h4>
                      <p className="text-slate-400 text-[11px]">يُفتح الحساب على جهاز كمبيوتر رئيسي 1 مع إمكانية إضافة أجهزة أخرى من داخل الموقع</p>
                    </div>
                  </div>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>مقتصر على 1 جهاز رئيسي</span>
                  </span>
                </div>

                {/* Current PC HWID Identifier */}
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold block">كود الهاردوير الخاص بالمشغّل الحالي (Current PC HWID):</span>
                    <span className="font-mono font-black text-amber-300 text-xs block">{currentHwid}</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-bold">
                    💻 الجهاز الحالي متصل وموثق
                  </span>
                </div>

                {/* List of Bound Devices */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-300 block">الأجهزة المقترنة حالياً بحساب هذا المكتب ({boundDevices.length} أجهزة):</span>
                  <div className="grid grid-cols-1 gap-2">
                    {boundDevices.map((dev) => (
                      <div
                        key={dev.id}
                        className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          {dev.isPrimary ? (
                            <Laptop className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-white font-bold">{dev.deviceName}</strong>
                              {dev.isPrimary && (
                                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-1.5 py-0.2 rounded font-black">
                                  رئيسي Primary
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[10px] text-slate-400 block">{dev.hwid} • {dev.os}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono">{dev.lastActive}</span>
                          {!dev.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleRemoveDeviceSeat(dev.id)}
                              className="p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-lg text-[10px]"
                              title="إزالة ربط هذا الكمبيوتر"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form to Add Device Seat */}
                <form onSubmit={handleAddDeviceSeatSubmit} className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newDeviceNameInput}
                    onChange={(e) => setNewDeviceNameInput(e.target.value)}
                    placeholder="اسم الكمبيوتر / اللابتوب الجديد (مثال: كمبيوتر المحاسب / لابتوب المتابعة)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-bold"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-black px-4 py-2 rounded-xl text-xs border border-slate-700 flex items-center justify-center gap-1 shrink-0"
                  >
                    <PlusCircle className="w-4 h-4 text-amber-400" />
                    <span>ربط كمبيوتر إضافي للحساب (+Add Seat)</span>
                  </button>
                </form>
              </div>

              {/* Registered Accounts & Super Admin CRM Direct Button */}
              <div className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-amber-950/60 border border-amber-500/50 p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-amber-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>صفحة إدارة وتجديد حسابات كافة المشتركين (Super Admin CRM)</span>
                  </h4>
                  <p className="text-slate-300 text-xs">
                    تتيح لمالك النظام عرض جميع الحسابات المسجلة، إضافة وتجديد الاشتراكات، إصدار التراخيص، ومتابعة الأداء.
                  </p>
                </div>
                {onOpenSuperAdminCrm && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSuperAdminCrm();
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all shadow-lg shrink-0 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>فتح قائمة الحسابات والتراخيص (CRM)</span>
                  </button>
                )}
              </div>

              {/* Developer Test Tools */}
              <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">أدوات تجربة النظام والاشتراك:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => setSubState(setSubscriptionTrialMode())}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-bold"
                  >
                    تجربة وضع Trial (مجاني)
                  </button>
                  <button
                    onClick={() => setSubState(setSubscriptionExpiredForTesting())}
                    className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700 px-3 py-1.5 rounded-xl font-bold"
                  >
                    محاكاة انتهاء الاشتراك Expired
                  </button>
                  <button
                    onClick={() => setSubState(getActiveSubscription(true))}
                    className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-3 py-1.5 rounded-xl font-bold"
                  >
                    إعادة المزامنة
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES MATRIX */}
          {activeTab === 'features' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <strong className="text-sm font-bold text-white block">مصفوفة صلاحيات الباقة الحالية ({subState.plan.toUpperCase()})</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">تفاصيل الميزات المفعلة والمغلقة حسب مستوى الترخيص</p>
                </div>
                <span className="bg-amber-950 border border-amber-500/60 text-amber-300 font-bold px-3 py-1 rounded-full text-[11px]">
                  {subState.plan === 'enterprise' ? 'كامل المزايا مفتوحة' : 'مزايا محددة'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(subState.permissions).map(([featKey, isEnabled]) => (
                  <div
                    key={featKey}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      isEnabled
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isEnabled ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <div>
                        <strong className="block text-xs font-bold font-mono">{featKey}</strong>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isEnabled
                          ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isEnabled ? 'مُفعل' : 'مُغلق 🔒'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INVOICES & PAYMENTS */}
          {activeTab === 'invoices' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-sm text-slate-200">سجل فواتير الاشتراكات والتحصيل</h4>

              <div className="space-y-2">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-bold">{p.invoiceNumber}</strong>
                        <span className="text-[10px] bg-emerald-950 border border-emerald-600 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                          مدفوعة ({p.paymentMethod})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        الفترة: {p.billingPeriod} • تاريخ الدفع: {p.paidAt}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-amber-400 font-mono font-black text-base">{p.amountEgp} ج.م</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SUPER ADMIN TOOLS */}
          {activeTab === 'superadmin' && isSuperAdmin && (
            <div className="space-y-5 text-xs">
              <div className="bg-purple-950/40 border border-purple-500/40 p-4 rounded-2xl text-purple-200">
                <h4 className="font-bold text-sm text-purple-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>توليد وتخصيص التراخيص والمكاتب (Super Admin Dashboard)</span>
                </h4>
                <p className="text-[11px] opacity-80 mt-1">
                  خاص بمشرفي النظام لإصدار أكواد تراخيص جديدة للمكاتب وتمديد أو إيقاف السيرفرات.
                </p>
              </div>

              <form onSubmit={handleGenerateSuperAdminLicense} className="bg-slate-950/80 border border-slate-800 p-5 rounded-3xl space-y-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم المكتب أو الفرع المستهدف:</label>
                  <input
                    type="text"
                    required
                    value={saOfficeName}
                    onChange={(e) => setSaOfficeName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">الباقة:</label>
                    <select
                      value={saPlan}
                      onChange={(e) => setSaPlan(e.target.value as SubscriptionPlanTier)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    >
                      <option value="professional">الاحترافية (Professional)</option>
                      <option value="enterprise">المؤسسات (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">المدة (أشهر):</label>
                    <input
                      type="number"
                      value={saDurationMonths}
                      onChange={(e) => setSaDurationMonths(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>توليد كود مفتاح ترخيص جديد (Generate License)</span>
                </button>
              </form>

              {generatedLicense && (
                <div className="bg-slate-950 border border-purple-500/60 p-4 rounded-2xl text-center space-y-2">
                  <span className="text-slate-400 block text-[11px]">مفتاح الترخيص المولد حديثاً:</span>
                  <p className="font-mono text-xl font-black text-amber-400 select-all">{generatedLicense}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
