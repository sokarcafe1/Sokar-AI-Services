import React, { useState, useEffect } from 'react';
import {
  X,
  Building,
  Image,
  Receipt,
  Percent,
  Clock,
  ShieldCheck,
  Users,
  PenTool,
  Mail,
  Save,
  CheckCircle2,
  Globe,
  Database,
  Lock,
  DollarSign,
  FileCheck
} from 'lucide-react';
import {
  getDefaultOfficeSettings,
  saveOfficeSettings,
  ComprehensiveOfficeSettings
} from '../services/officeSettingsService';

interface ComprehensiveSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComprehensiveSettingsModal: React.FC<ComprehensiveSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [settings, setSettings] = useState<ComprehensiveOfficeSettings>(getDefaultOfficeSettings());
  const [activeTab, setActiveTab] = useState<'profile' | 'invoicing' | 'shifts' | 'security' | 'signature'>('profile');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getDefaultOfficeSettings());
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveOfficeSettings(settings);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 rounded-xl shadow-lg">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">إعدادات المكتب الكاملة - Sokar Office OS</h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  System Settings
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تكوين بيانات الفواتير، ساعات العمل، التوقيعات، والنسخ الاحتياطي التلقائي
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 text-xs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building className="w-4 h-4" />
              بيانات المكتب والشعار
            </button>

            <button
              onClick={() => setActiveTab('invoicing')}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'invoicing'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Receipt className="w-4 h-4" />
              الفواتير والإيصالات والضرائب
            </button>

            <button
              onClick={() => setActiveTab('shifts')}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'shifts'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              ساعات العمل والمنطقة الزمنية
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'security'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              الأمان والنسخ الاحتياطي
            </button>

            <button
              onClick={() => setActiveTab('signature')}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'signature'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-4 h-4" />
              التوقيع والبريد المباشر
            </button>
          </div>

          {saveSuccessMsg && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم حفظ كافة إعدادات المكتب بنجاح في قاعدة بيانات النظام!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* TAB 1: PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  البيانات الرسمية للمكتب
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">اسم المكتب الرسمي</label>
                    <input
                      type="text"
                      required
                      value={settings.officeName}
                      onChange={e => setSettings({ ...settings, officeName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">اسم المدير المسؤول</label>
                    <input
                      type="text"
                      required
                      value={settings.managerName}
                      onChange={e => setSettings({ ...settings, managerName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رقم التسجيل الضريبي</label>
                    <input
                      type="text"
                      value={settings.taxRegistrationNumber}
                      onChange={e => setSettings({ ...settings, taxRegistrationNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رقم السجل التجاري</label>
                    <input
                      type="text"
                      value={settings.commercialRegisterNumber}
                      onChange={e => setSettings({ ...settings, commercialRegisterNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">الهاتف الرئيسي للمكتب</label>
                    <input
                      type="text"
                      value={settings.phonePrimary}
                      onChange={e => setSettings({ ...settings, phonePrimary: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">البريد الإلكتروني الرسمي</label>
                    <input
                      type="email"
                      value={settings.emailOfficial}
                      onChange={e => setSettings({ ...settings, emailOfficial: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 mb-1 font-bold">العنوان التفصيلي للمكتب</label>
                    <input
                      type="text"
                      value={settings.addressFull}
                      onChange={e => setSettings({ ...settings, addressFull: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 mb-1 font-bold">رابط شعار المكتب (Logo URL)</label>
                    <input
                      type="text"
                      value={settings.logoUrl}
                      onChange={e => setSettings({ ...settings, logoUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVOICING */}
            {activeTab === 'invoicing' && (
              <div className="space-y-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  تكوين الطباعة، الضرائب والإيصالات
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">عنوان رأس الفاتورة / الإيصال</label>
                    <input
                      type="text"
                      value={settings.invoiceHeaderTitle}
                      onChange={e => setSettings({ ...settings, invoiceHeaderTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">العملة الافتراضية</label>
                    <input
                      type="text"
                      value={settings.currency}
                      onChange={e => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">نسبة ضريبة القيمة المضافة (%)</label>
                    <input
                      type="number"
                      value={settings.vatPercentage}
                      onChange={e => setSettings({ ...settings, vatPercentage: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="enableVat"
                      checked={settings.enableVat}
                      onChange={e => setSettings({ ...settings, enableVat: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <label htmlFor="enableVat" className="text-slate-200 font-bold cursor-pointer">
                      تفعيل إضافة ضريبة القيمة المضافة على المعاملات
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 mb-1 font-bold">ملاحظة التذييل للإيصالات</label>
                    <textarea
                      rows={2}
                      value={settings.invoiceFooterNote}
                      onChange={e => setSettings({ ...settings, invoiceFooterNote: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SHIFTS */}
            {activeTab === 'shifts' && (
              <div className="space-y-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  مواعيد الشفتات واللغة والمنطقة الزمنية
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">بداية الشفت اليومي</label>
                    <input
                      type="time"
                      value={settings.workShiftStart}
                      onChange={e => setSettings({ ...settings, workShiftStart: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">نهاية الشفت اليومي</label>
                    <input
                      type="time"
                      value={settings.workShiftEnd}
                      onChange={e => setSettings({ ...settings, workShiftEnd: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">المنطقة الزمنية (Timezone)</label>
                    <input
                      type="text"
                      value={settings.timezone}
                      onChange={e => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">لغة الواجهة الرئيسية</label>
                    <select
                      value={settings.language}
                      onChange={e => setSettings({ ...settings, language: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold"
                    >
                      <option value="ar">العربية (Arabic - Default)</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY */}
            {activeTab === 'security' && (
              <div className="space-y-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  سياسات الأمان وتكرار النسخ الاحتياطي
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">معدل النسخ الاحتياطي التلقائي</label>
                    <select
                      value={settings.autoBackupInterval}
                      onChange={e => setSettings({ ...settings, autoBackupInterval: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold"
                    >
                      <option value="daily">يومي (Daily Cloud Sync)</option>
                      <option value="weekly">أسبوعي (Weekly Archive)</option>
                      <option value="manual">يدوي فقط (Manual)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">مهلة إنهاء الجلسة تلقائياً (بالدقائق)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeoutMinutes}
                      onChange={e => setSettings({ ...settings, sessionTimeoutMinutes: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="twoFA"
                      checked={settings.twoFactorAuthEnabled}
                      onChange={e => setSettings({ ...settings, twoFactorAuthEnabled: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <label htmlFor="twoFA" className="text-slate-200 font-bold cursor-pointer">
                      تفعيل المصادقة الثنائية 2FA لجميع المشرفين
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SIGNATURE */}
            {activeTab === 'signature' && (
              <div className="space-y-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  التوقيع الرقمي وإعدادات خادم SMTP
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">خادم SMTP الرئيسي</label>
                    <input
                      type="text"
                      value={settings.smtpServer}
                      onChange={e => setSettings({ ...settings, smtpServer: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">منفذ SMTP Port</label>
                    <input
                      type="number"
                      value={settings.smtpPort}
                      onChange={e => setSettings({ ...settings, smtpPort: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 mb-1 font-bold">حساب بريد SMTP</label>
                    <input
                      type="text"
                      value={settings.smtpUser}
                      onChange={e => setSettings({ ...settings, smtpUser: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Save className="w-4 h-4" />
                حفظ كافة التغييرات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
