import React, { useState } from 'react';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ArrowRight,
  PhoneCall,
  Key,
  FileText,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Zap,
  Building2,
  Calendar,
  Check,
} from 'lucide-react';
import { SubscriptionPlanTier } from '../types/subscription';

interface SubscriptionLockedGateProps {
  featureTitleAr?: string;
  featureDescriptionAr?: string;
  onUpgradeClick: () => void;
  onContactSalesClick?: () => void;
  onActivateKeyClick?: () => void;
  currentPlan?: SubscriptionPlanTier;
}

export const SubscriptionLockedGate: React.FC<SubscriptionLockedGateProps> = ({
  featureTitleAr = 'وحدة التقارير والإحصائيات المتقدمة',
  featureDescriptionAr = 'تتطلب هذه الصفحة اشتراكاً سارياً في الباقة الاحترافية أو باقة المؤسسات للوصول إلى التحليلات المالية والتصدير والمؤشرات.',
  onUpgradeClick,
  onContactSalesClick,
  onActivateKeyClick,
  currentPlan = 'trial',
}) => {
  const [showComparisonTable, setShowComparisonTable] = useState(true);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 sm:p-6 dir-rtl">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-right space-y-6">
        {/* Background Gradient & Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Top Lock Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-800 pb-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 shadow-xl shadow-amber-950/40">
            <Lock className="w-10 h-10 animate-bounce" />
          </div>

          <div className="text-center sm:text-right space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-black">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>🔒 هذه الميزة متاحة فقط للمشتركين</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {featureTitleAr}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {featureDescriptionAr}
            </p>
          </div>
        </div>

        {/* Unlocked Features Bullet List */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>اشترك الآن للوصول الفوري إلى كافة هذه المزايا الحصرية:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-200 pt-1">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <BarChart3 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold">التقارير اليومية والشهرية</strong>
                <span className="text-[11px] text-slate-400">متابعة إنجاز المعاملات والإيرادات</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <TrendingUp className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold">التقارير المالية والمصروفات</strong>
                <span className="text-[11px] text-slate-400">حساب الأرباح الصافية وروم الخزينة</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <FileSpreadsheet className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold">تصدير PDF, Excel, CSV</strong>
                <span className="text-[11px] text-slate-400">تنزيل جميع البيانات والمستندات بضغطة</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Zap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold">مؤشرات الأداء KPI والذكاء</strong>
                <span className="text-[11px] text-slate-400">تحليلات سرعة الموظفين وساعات الذروة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onUpgradeClick}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black py-3 px-6 rounded-2xl text-sm transition-all shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>ترقية الاشتراك الآن</span>
            </button>

            {onContactSalesClick && (
              <button
                onClick={onContactSalesClick}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>التواصل مع المبيعات</span>
              </button>
            )}
          </div>

          {onActivateKeyClick && (
            <button
              onClick={onActivateKeyClick}
              className="text-amber-400 hover:text-amber-300 font-bold text-xs underline underline-offset-4 flex items-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              <span>تفعيل ترخيص برقم تسلسلي (License Key)</span>
            </button>
          )}
        </div>

        {/* Expandable Subscription Comparison Table */}
        <div className="border-t border-slate-800 pt-5">
          <button
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="text-xs font-extrabold text-slate-400 hover:text-white flex items-center gap-2 transition-colors mb-3"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>جدول مقارنة الباقات والمزايا (الباقة المجانية vs الاحترافية vs المؤسسات)</span>
          </button>

          {showComparisonTable && (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 text-xs">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-3 font-extrabold">الميزة / الصلاحية</th>
                    <th className="p-3 text-center text-slate-400 font-bold">التجريبية (Free Trial)</th>
                    <th className="p-3 text-center text-amber-400 font-black bg-amber-950/20 border-x border-amber-900/30">
                      الاحترافية (Professional)
                    </th>
                    <th className="p-3 text-center text-indigo-400 font-black">المؤسسات (Enterprise)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium">لوحة التحكم وإدارة الطلبات والعملاء</td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">التقارير اليومية والشهرية والمالية</td>
                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">تقارير الموظفين والمخزون والخدمات</td>
                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">تصدير PDF و Excel و CSV</td>
                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">تقارير الفروع المتعددة الموحدة</td>
                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">التقارير المجدولة والبريد الإلكتروني التلقائي</td>
                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">ربط واجهات البريد والتخصيص White Label</td>
                    <td className="p-3 text-center"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center bg-amber-950/20 border-x border-amber-900/30"><XCircle className="w-4 h-4 text-rose-500/80 mx-auto" /></td>
                    <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
