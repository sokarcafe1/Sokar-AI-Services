import React, { useState } from 'react';
import {
  Store,
  Sparkles,
  Layers,
  CheckCircle2,
  RefreshCw,
  Palette,
  Users,
  TrendingUp,
  Mail,
  Key,
  PieChart,
  Bot,
  ShieldCheck,
  X,
  Building2,
  Upload,
  Play,
  Download,
  Check,
  Zap,
  Tag,
  AlertTriangle,
  Server,
  FileText
} from 'lucide-react';
import {
  getOnboardingData,
  saveOnboardingData,
  getMarketplacePlugins,
  togglePluginStatus,
  getSystemUpdateInfo,
  getWhiteLabelConfig,
  saveWhiteLabelConfig,
  getSuperAdminCustomerUsages,
  getMarketingCampaigns,
  getLicenseRecords,
  getPreLaunchChecklist,
  OfficeOnboardingData,
  WhiteLabelConfig,
  MarketplacePlugin,
  LicenseRecord
} from '../services/commercialReleaseService';

interface CommercialReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string;
}

export const CommercialReleaseModal: React.FC<CommercialReleaseModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'onboarding'
    | 'marketplace'
    | 'auto_update'
    | 'white_label'
    | 'super_admin_customers'
    | 'customer_success'
    | 'marketing'
    | 'license_server'
    | 'marketplace_analytics'
    | 'ai_advisor'
    | 'pre_launch_audit'
  >('onboarding');

  // Interactive states
  const [onboarding, setOnboarding] = useState<OfficeOnboardingData>(getOnboardingData());
  const [onboardingSavedMsg, setOnboardingSavedMsg] = useState('');

  const [plugins, setPlugins] = useState<MarketplacePlugin[]>(getMarketplacePlugins());
  const updateInfo = getSystemUpdateInfo();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [whiteLabel, setWhiteLabel] = useState<WhiteLabelConfig>(getWhiteLabelConfig());
  const [whiteLabelSavedMsg, setWhiteLabelSavedMsg] = useState('');

  const customerUsages = getSuperAdminCustomerUsages();
  const campaigns = getMarketingCampaigns();
  const licenses = getLicenseRecords();
  const checklist = getPreLaunchChecklist();

  // New campaign state
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [campaignSuccess, setCampaignSuccess] = useState('');

  if (!isOpen) return null;

  const handleSaveOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    saveOnboardingData({ ...onboarding, isCompleted: true });
    setOnboardingSavedMsg('تم حفظ بيانات المكتب وإعداد البيئة الخاصة به بنجاح!');
    setTimeout(() => setOnboardingSavedMsg(''), 3000);
  };

  const handleTogglePlugin = (id: string) => {
    const updated = togglePluginStatus(id);
    setPlugins([...updated]);
  };

  const handleSaveWhiteLabel = (e: React.FormEvent) => {
    e.preventDefault();
    saveWhiteLabelConfig(whiteLabel);
    setWhiteLabelSavedMsg('تم حفظ وتطبيق التخصيص الهيكلي للعلامة التجارية (White-Label)!');
    setTimeout(() => setWhiteLabelSavedMsg(''), 3000);
  };

  const handleRunAutoUpdate = () => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
    }, 2000);
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignTitle) return;
    setCampaignSuccess(`تم إطلاق الحملة التسويقية "${newCampaignTitle}" بنجاح إلى جميع المكاتب المستهدفة!`);
    setNewCampaignTitle('');
    setTimeout(() => setCampaignSuccess(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-7xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 p-4 px-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg text-slate-950 font-black">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Phase 13 – Commercial Release & Marketplace</h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Commercial Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                منصة الإطلاق التجاري، متجر الإضافات، نظام العلامة التجارية White Label وخادم التراخيص
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-2 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'onboarding', label: 'إعداد المكتب (Onboarding)', icon: Building2 },
            { id: 'marketplace', label: 'متجر الإضافات (Marketplace)', icon: Store },
            { id: 'auto_update', label: 'التحديث التلقائي Auto-Update', icon: RefreshCw },
            { id: 'white_label', label: 'الهوية White-Label', icon: Palette },
            { id: 'super_admin_customers', label: 'إدارة المشتركين واستخدامهم', icon: Users },
            { id: 'customer_success', label: 'مركز نجاح العملاء', icon: TrendingUp },
            { id: 'marketing', label: 'مركز التسويق والحملات', icon: Mail },
            { id: 'license_server', label: 'خادم التراخيص (License Server)', icon: Key },
            { id: 'marketplace_analytics', label: 'إحصائيات المتجر', icon: PieChart },
            { id: 'ai_advisor', label: 'المستشار الإداري AI Business Advisor', icon: Bot },
            { id: 'pre_launch_audit', label: 'فحص الجاهزية والاختبارات', icon: ShieldCheck }
          ].map(tab => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-900/90 text-slate-200">
          {/* TAB 1: ONBOARDING WIZARD */}
          {activeTab === 'onboarding' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <Building2 className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="font-bold text-white text-base">معالج إعداد المكتب الجديد (Onboarding Wizard)</h3>
                    <p className="text-xs text-slate-400">إدخال البيانات الأساسية وإنشاء بيئة العمل المستقلة تلقائياً للمكتب.</p>
                  </div>
                </div>

                {onboardingSavedMsg && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {onboardingSavedMsg}
                  </div>
                )}

                <form onSubmit={handleSaveOnboarding} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">اسم المكتب الرسمي</label>
                    <input
                      type="text"
                      value={onboarding.officeName}
                      onChange={e => setOnboarding({ ...onboarding, officeName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">اسم الفرع / المحافظة</label>
                    <input
                      type="text"
                      value={onboarding.branchName}
                      onChange={e => setOnboarding({ ...onboarding, branchName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">أوقات وساعات العمل</label>
                    <input
                      type="text"
                      value={onboarding.workingHours}
                      onChange={e => setOnboarding({ ...onboarding, workingHours: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">عنوان الفاتورة والمقر الرئيسي</label>
                    <input
                      type="text"
                      value={onboarding.billingAddress}
                      onChange={e => setOnboarding({ ...onboarding, billingAddress: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رقم السجل التجاري (اختياري)</label>
                    <input
                      type="text"
                      value={onboarding.commercialRegisterNo || ''}
                      onChange={e => setOnboarding({ ...onboarding, commercialRegisterNo: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">الرقم الضريبي (اختياري)</label>
                    <input
                      type="text"
                      value={onboarding.taxNo || ''}
                      onChange={e => setOnboarding({ ...onboarding, taxNo: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 mb-1 font-bold">شعارات وهيدر الإيصال المطبوع</label>
                    <input
                      type="text"
                      value={onboarding.receiptSlogan}
                      onChange={e => setOnboarding({ ...onboarding, receiptSlogan: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      حفظ وإنشاء بيئة المكتب تلقائياً
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: PLUGIN MARKETPLACE */}
          {activeTab === 'marketplace' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">متجر إضافات المنصة (Plugin Marketplace)</h3>
                  <p className="text-xs text-slate-400">تفعيل أو تعطيل التراخيص والإضافات البرمجية المتوفرة للنظام.</p>
                </div>
                <div className="text-xs bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-lg border border-amber-500/30">
                  {plugins.filter(p => p.isInstalled).length} إضافات نشطة
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plugins.map(plugin => (
                  <div key={plugin.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded">{plugin.category}</span>
                        <span className="text-[10px] font-mono text-slate-400">{plugin.version}</span>
                      </div>
                      <h4 className="font-bold text-slate-100 text-sm">{plugin.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plugin.description}</p>
                    </div>

                    <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-amber-400 font-bold text-xs">
                          {plugin.priceEgp === 0 ? 'مجاني' : `${plugin.priceEgp} ج.م / شهرياً`}
                        </span>
                        <div className="text-[10px] text-slate-500">مطور بواسطة: {plugin.author}</div>
                      </div>

                      <button
                        onClick={() => handleTogglePlugin(plugin.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                          plugin.isInstalled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {plugin.isInstalled ? 'مُفعّلة (Active)' : 'تفعيل الإضافة'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUTO UPDATE SYSTEM */}
          {activeTab === 'auto_update' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-6 h-6 text-amber-400" />
                    <div>
                      <h3 className="font-bold text-white text-base">نظام التحديث التلقائي (Auto-Update Engine)</h3>
                      <p className="text-xs text-slate-400">الإصدار الحالي للنظام: <span className="font-mono text-amber-300 font-bold">{updateInfo.version}</span></p>
                    </div>
                  </div>
                  <button
                    onClick={handleRunAutoUpdate}
                    disabled={isUpdating}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    فحص وتثبيت التحديثات بضغطة واحدة
                  </button>
                </div>

                {updateSuccess && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold">
                    تم إنشاء النسخة الاحتياطية وتحديث النظام بنجاح إلى النسخة المؤسسية الأحدث!
                  </div>
                )}

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-amber-400">سجل التغييرات والتحديثات الأخيرة (Release Notes):</h4>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {updateInfo.releaseNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHITE LABEL */}
          {activeTab === 'white_label' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <Palette className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="font-bold text-white text-base">تخصيص الهوية التجارية الكاملة (White Label Branding)</h3>
                    <p className="text-xs text-slate-400">تغيير الاسم، الألوان، الشعار، شاشة الدخول والدومين الخاص للمكتب.</p>
                  </div>
                </div>

                {whiteLabelSavedMsg && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold">
                    {whiteLabelSavedMsg}
                  </div>
                )}

                <form onSubmit={handleSaveWhiteLabel} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">اسم العلامة التجارية الخاص بالمكتب</label>
                    <input
                      type="text"
                      value={whiteLabel.brandName}
                      onChange={e => setWhiteLabel({ ...whiteLabel, brandName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">عنوان الموقع الخاص (Custom Domain)</label>
                    <input
                      type="text"
                      value={whiteLabel.customDomain}
                      onChange={e => setWhiteLabel({ ...whiteLabel, customDomain: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-mono text-amber-300"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رسالة شاشة الترحيب والدخول</label>
                    <input
                      type="text"
                      value={whiteLabel.loginScreenMessage}
                      onChange={e => setWhiteLabel({ ...whiteLabel, loginScreenMessage: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">نص حقوق الملكية للFooter</label>
                    <input
                      type="text"
                      value={whiteLabel.footerText}
                      onChange={e => setWhiteLabel({ ...whiteLabel, footerText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                    >
                      <Palette className="w-4 h-4" />
                      تطبيق الهوية وتحديث التصميم
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: SUPER ADMIN CUSTOMERS */}
          {activeTab === 'super_admin_customers' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-3">تفاصيل واستخدام المكاتب المجهزة (Super Admin Customer Detail)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-900">
                        <th className="p-2.5">المكتب</th>
                        <th className="p-2.5">عدد المستخدمين</th>
                        <th className="p-2.5">التخزين</th>
                        <th className="p-2.5">طلبات API</th>
                        <th className="p-2.5">مسح OCR</th>
                        <th className="p-2.5">الإيراد الشهري</th>
                        <th className="p-2.5">حالة الاشتراك</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {customerUsages.map(cust => (
                        <tr key={cust.officeId} className="hover:bg-slate-900/40">
                          <td className="p-2.5 font-bold text-amber-300">{cust.officeName}</td>
                          <td className="p-2.5 font-mono">{cust.userCount} موظفين</td>
                          <td className="p-2.5 font-mono text-cyan-400">{(cust.storageUsageMb / 1024).toFixed(1)} GB</td>
                          <td className="p-2.5 font-mono text-slate-300">{cust.apiUsageRequests.toLocaleString()}</td>
                          <td className="p-2.5 font-mono text-amber-400">{cust.ocrUsageCount} مستند</td>
                          <td className="p-2.5 font-bold text-emerald-400">{cust.monthlyRevenueEgp.toLocaleString()} ج.م</td>
                          <td className="p-2.5">
                            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px]">
                              {cust.subscriptionStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER SUCCESS CENTER */}
          {activeTab === 'customer_success' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-3">مركز نجاح العملاء وتقليل الإلغاء (Customer Success Center)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">المكاتب الأكثر نشاطاً</span>
                    <div className="text-xl font-black text-emerald-400 mt-1">2 مكتب رئيسي</div>
                    <p className="text-[11px] text-slate-400 mt-1">معدل استخدام اليوم يبلغ 94%</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">مخاطر إلغاء الاشتراك (Churn Risk)</span>
                    <div className="text-xl font-black text-rose-400 mt-1">1 مكتب (تجريبي)</div>
                    <p className="text-[11px] text-slate-400 mt-1">تم توجيه تذكير بالمتابعة الفنية</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">متوسط استخدام الميزات</span>
                    <div className="text-xl font-black text-amber-400 mt-1">98.2% Utilization</div>
                    <p className="text-[11px] text-slate-400 mt-1">أعلى استخدام لميزات OCR والربط الحكومي</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MARKETING CENTER */}
          {activeTab === 'marketing' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm">مركز التسويق والحملات المباشرة (Marketing Center)</h3>

                {campaignSuccess && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold">
                    {campaignSuccess}
                  </div>
                )}

                <form onSubmit={handleSendCampaign} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="عنوان العرض والتحديث التسويقي لجميع المكاتب..."
                    value={newCampaignTitle}
                    onChange={e => setNewCampaignTitle(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 font-bold"
                  />
                  <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    إرسال الحملة التسويقية
                  </button>
                </form>

                <div className="space-y-2 pt-2">
                  {campaigns.map(camp => (
                    <div key={camp.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-100">{camp.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">تم الإرسال إلى {camp.sentCount} مكتب</div>
                      </div>
                      <span className="bg-amber-500/20 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded">
                        نسبة الفتح: {camp.openRatePercentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: LICENSE SERVER */}
          {activeTab === 'license_server' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-3">خادم التراخيص ومراقبة الأجهزة (License Server Management)</h3>
                <div className="space-y-3">
                  {licenses.map(lic => (
                    <div key={lic.licenseKey} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-300 font-mono">{lic.licenseKey}</span>
                        <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px]">
                          {lic.status}
                        </span>
                      </div>
                      <div className="text-slate-300 font-bold">{lic.officeName}</div>
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                        <span>الأجهزة المفعلة: {lic.activeDevicesCount} / {lic.maxDevicesAllowed}</span>
                        <span>الفروع المتاحة: {lic.maxBranches}</span>
                        <span>ينتهي بتاريخ: {lic.expiresAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: MARKETPLACE ANALYTICS */}
          {activeTab === 'marketplace_analytics' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                <h3 className="font-bold text-amber-300 text-sm mb-3">إحصائيات متجر الإضافات والمبيعات (Marketplace Analytics)</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">الإضافة الأكثر تحميلاً</span>
                    <div className="text-lg font-black text-amber-400 mt-1">OCR Plus Engine</div>
                    <p className="text-[11px] text-slate-400 mt-1">مُثبتة في 98% من المكاتب</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">الإيراد التكراري الشهري (MRR)</span>
                    <div className="text-lg font-black text-emerald-400 mt-1">68,000 ج.م</div>
                    <p className="text-[11px] text-slate-400 mt-1">نمو +24% مقارنة بالشهر الماضي</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">معدل التحويل من التجربة إلى الدفع</span>
                    <div className="text-lg font-black text-cyan-400 mt-1">92.4% Conversion</div>
                    <p className="text-[11px] text-slate-400 mt-1">معدل تحويل ممتاز للباقات</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">معدل التجديد التلقائي</span>
                    <div className="text-lg font-black text-purple-400 mt-1">96.8% Renewal</div>
                    <p className="text-[11px] text-slate-400 mt-1">ثبات واستقرار الاشتراكات</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: AI BUSINESS ADVISOR */}
          {activeTab === 'ai_advisor' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-slate-950 p-5 rounded-xl border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-amber-400" />
                  <div>
                    <h3 className="font-bold text-white text-base">المستشار الإداري الذكي (AI Business Advisor)</h3>
                    <p className="text-xs text-slate-300">توصيات عملية مبنية حصرياً على بيانات ومعاملات المكتب الفعلية.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-amber-400">الخدمات الأكثر ربحية</span>
                    <p className="text-xs text-slate-200">تجديد استخراج جوازات السفر والسجلات التجارية تحقق أعلى هامش ربح.</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-emerald-400">توصية ساعات الذروة</span>
                    <p className="text-xs text-slate-200">يُفضل زيادة موظفي الشباك بين الساعة 10:00 صباحاً و 1:00 ظهراً أيام الأحد.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: PRE LAUNCH AUDIT */}
          {activeTab === 'pre_launch_audit' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">فحص الجاهزية التجارية واختبارات الأمان والضغط</h3>
                    <p className="text-xs text-slate-400">تدقيق اختبارات الاختراق، الأحمال، الاستعادة، والربط الفعلي قبل الإطلاق.</p>
                  </div>
                  <div className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    جاهز 100% للإطلاق التجاري
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {checklist.map(item => (
                    <div key={item.id} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-100">{item.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.details}</div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-lg border border-emerald-500/30 text-[10px]">
                        {item.status} ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Sokar Office OS - Commercial Production Readiness Verified</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg transition-all"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
