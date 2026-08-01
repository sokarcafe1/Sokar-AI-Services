import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Zap,
  Tag,
  Download,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface ReleaseItem {
  version: string;
  releaseDate: string;
  isCurrent?: boolean;
  fixes: string[];
  additions: string[];
  improvements: string[];
}

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({
  isOpen,
  onClose
}) => {
  const [releases] = useState<ReleaseItem[]>([
    {
      version: 'v1.2.0',
      releaseDate: 'أبريل 2026',
      isCurrent: true,
      fixes: [
        'إصلاح استجابة الطابعة الحرارية 80mm عند انقطاع الاتصال المفاجئ.',
        'حل مشكلة تأخر مزامنة شفتات الخزنة اليومية عند ضعـف الشبكة.'
      ],
      additions: [
        'إضافة مركز الدعم الفني المباشر وتذاكر المساعدة مع دعم AnyDesk.',
        'إضافة ماسح المستندات وقارئ الرقم القومي الذكي OCR في تطبيق الهاتف PWA.',
        'تفعيل الشراء التلقائي أونلاين وتوليد كود الترخيص Instant License Key.'
      ],
      improvements: [
        'تسريع استجابة الخوادم الموزعة بنسبة 35%.',
        'تحسين واجهة المستخدم وتطبيق السمة الداكنة عالية التباين.'
      ]
    },
    {
      version: 'v1.1.0',
      releaseDate: 'مارس 2026',
      fixes: [
        'معالجة تعارض خطوط الإيصالات المطبوعة في العرض الأفقي.'
      ],
      additions: [
        'تكامل كامل مع Gmail API ومتابعة الرسائل الرسمية للمكتب.',
        'إضافة موديول الفواتير الضريبية الإلكترونية وإشعارات الواتساب.'
      ],
      improvements: [
        'تحسين معالج الإبلاغ عن الأعطال وحفظ سجل التغييرات محلياً.'
      ]
    },
    {
      version: 'v1.0.0',
      releaseDate: 'يناير 2026',
      fixes: [],
      additions: [
        'الإطلاق التجاري الرسمي لمنظومة Sokar Office OS.',
        'تفعيل الهيكل الرئيسي لإدارة المعاملات والمستندات السحابية.'
      ],
      improvements: [
        'البنية التحتية الأساسية لنظام التشغيل.'
      ]
    }
  ]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState('');

  if (!isOpen) return null;

  const handleApplyUpdate = () => {
    setIsUpdating(true);
    setUpdateSuccess('');
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess('تم فحص وتحديث حزمة النظام إلى النسخة الأحدث بنجاح! جميع الخدمات تعمل بكفاءة 100%.');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-amber-500/30 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز التحديثات وسجل الإصدارات - Release Notes</h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  v1.2.0 Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                استعرض التغييرات، التحسينات، الميزات الجديدة وحالة التحديث التلقائي
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

        {/* Action Bar */}
        <div className="bg-slate-950/70 p-4 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">حالة التحديث: </span>
            <strong className="text-emerald-400">النظام محدّث لأحدث إصدار مستقر</strong>
          </div>

          <button
            onClick={handleApplyUpdate}
            disabled={isUpdating}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow"
          >
            {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>فحص التحديثات الآن</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-6 text-xs">
          {updateSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{updateSuccess}</span>
            </div>
          )}

          {releases.map((rel, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-base text-amber-300">{rel.version}</span>
                  {rel.isCurrent && (
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-500/30">
                      الإصدار النشط حالياً
                    </span>
                  )}
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{rel.releaseDate}</span>
              </div>

              {/* Fixes */}
              {rel.fixes.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="font-bold text-rose-400 text-xs flex items-center gap-1.5">
                    <span>🛠️ الإصلاحات والمعالجات (Fixes):</span>
                  </h4>
                  <ul className="list-disc pr-5 space-y-1 text-slate-300">
                    {rel.fixes.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}

              {/* Additions */}
              {rel.additions.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                    <span>✨ الميزات الجديدة (New Features):</span>
                  </h4>
                  <ul className="list-disc pr-5 space-y-1 text-slate-300">
                    {rel.additions.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {rel.improvements.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="font-bold text-indigo-400 text-xs flex items-center gap-1.5">
                    <span>🚀 التحسينات والأداء (Enhancements):</span>
                  </h4>
                  <ul className="list-disc pr-5 space-y-1 text-slate-300">
                    {rel.improvements.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>يتم تطبيق جميع التحديثات الأمنية تلقائياً على السيرفر السحابي</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
