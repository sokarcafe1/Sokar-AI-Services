import React, { useState } from 'react';
import {
  X,
  Info,
  Shield,
  FileText,
  Phone,
  Cookie,
  AlertOctagon,
  Building,
  CheckCircle2,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';

interface LegalAndAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies';
}

export const LegalAndAboutModal: React.FC<LegalAndAboutModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'about'
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl shadow-lg">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">عن النظام والصفحات القانونية - Sokar Office OS</h2>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Legal & Info
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                معلومات النظام، الشروط والأحكام، سياسة الخصوصية وتفاصيل الاتصال الرسمية
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

        {/* Tab Header */}
        <div className="bg-slate-950/60 p-3 px-6 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'about', label: 'عن النظام (About)', icon: Info },
            { id: 'contact', label: 'اتصل بنا (Contact)', icon: Phone },
            { id: 'privacy', label: 'سياسة الخصوصية (Privacy)', icon: Shield },
            { id: 'terms', label: 'الشروط والأحكام (Terms)', icon: FileText },
            { id: 'disclaimer', label: 'إخلاء المسؤولية (Disclaimer)', icon: AlertOctagon },
            { id: 'cookies', label: 'ملفات الكوكيز (Cookies)', icon: Cookie }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-4 text-xs leading-relaxed">
          {activeTab === 'about' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>حول نظام Sokar Office OS الإصدار المؤسسي</span>
              </h3>
              <p className="text-slate-300">
                Sokar Office OS هو النظام التشغيلي الشامل والأول المخصص لإدارة مكاتب الخدمات الحكومية والمعاملات الميكنة بالمملكة والجمهورية. يهدف إلى توفير دورة عمل رقمية كاملة بدون أوراق، بداية من استقبال المواطن وتسجيل المعاملة، وحتى الطباعة والسداد وحفظ الأرشيف الرقمي.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-slate-300">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <strong className="text-indigo-400 block mb-1">✓ إدارة المعاملات الحكومية</strong>
                  ربط وتتبع معاملات السجل التجاري، البطاقات، الجوازات، والضرائب بدقة متناهية.
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <strong className="text-indigo-400 block mb-1">✓ المكونات الأمنية والتكاملات</strong>
                  تكامل رسمي مع Gmail API وربط بوابات الدفع الإلكترونية وواتساب الأعمال.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="text-base font-black text-white">تواصل مع إدارة النظام والدعم الفني المباشر</h3>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">الخط الساخن للدعم الفني</span>
                    <span className="font-bold text-white font-mono">01012345678 / 01298765432</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <Mail className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">البريد الإلكتروني الرسمي</span>
                    <span className="font-bold text-white font-mono">sokarcafe1@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">المقر الرئيسي للمكتب</span>
                    <span className="font-bold text-white">شارع الجلاء الرئيسي - برج المصالح الحكومية - الدور الثاني</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="text-base font-black text-white">سياسة الخصوصية وحماية بيانات المواطنين</h3>
              <p className="text-slate-300">
                يلتزم نظام Sokar Office OS بأعلى معايير التشفير والسرية لحماية كافة المستندات والبيانات الشخصية المسجلة داخل النظام. لا يتم مشاركة أرقام القومي أو بيانات المعاملات المالية مع أي جهة خارجية غير مصرح لها.
              </p>
              <ul className="list-disc pr-5 space-y-1 text-slate-400">
                <li>تشفير جميع المستندات المخزنة بدقة 256-bit SSL/TLS.</li>
                <li>صلاحيات مشاهدة البيانات مقيدة بـ Role-Based Access Control للموظفين.</li>
                <li>توفير خيار الحذف الكامل لبيانات العميل عند طلب التصفية.</li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="text-base font-black text-white">الشروط والأحكام لاستخدام الخدمة (Terms of Service)</h3>
              <p className="text-slate-300">
                باستخدامك لنظام Sokar Office OS، فإنك توافق على الالتزام بالقوانين المنظمة للخدمات الحكومية الإلكترونية وعدم استخدام المنصة لإجراء معاملات غير رسمية أو إدخال مستندات مزورة.
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="text-base font-black text-white">إخلاء المسؤولية القانونية (Disclaimer)</h3>
              <p className="text-slate-300">
                النظام هو أداة تنظيمية مساعدة لإدارة المكاتب، والمسؤولية الكاملة عن صحة البيانات المدخلة والمستندات المرفوعة تقع على عاتق المكتب والمواطن صاحب الطلب.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="text-base font-black text-white">سياسة ملفات تعريف الارتباط (Cookie Policy)</h3>
              <p className="text-slate-300">
                نستخدم ملفات الكوكيز المحلية فقط لحفظ حالة تسجيل الدخول، تفضيلات اللغات، وربط رموز Access Tokens الخاصة بـ Gmail API للعمل بشكل سلس وبدون انقطاع.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Sokar Office OS - جميع الحقوق محفوظة</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
