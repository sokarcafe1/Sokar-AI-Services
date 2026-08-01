import React from 'react';
import { AlertTriangle, Clock, Zap, RefreshCw, X, ShieldAlert } from 'lucide-react';
import { SubscriptionState } from '../types/subscription';

interface SubscriptionAlertBannerProps {
  subscription: SubscriptionState;
  onRenewClick: () => void;
  onDismiss?: () => void;
}

export const SubscriptionAlertBanner: React.FC<SubscriptionAlertBannerProps> = ({
  subscription,
  onRenewClick,
  onDismiss,
}) => {
  const { status, daysRemaining, expirationAlertLevel, plan } = subscription;

  if (expirationAlertLevel === 'none' && status === 'active') {
    return null; // No warning needed
  }

  let bgClass = 'bg-amber-950/90 border-amber-500/60 text-amber-200';
  let icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
  let title = `تنبيه قرب انتهاء الاشتراك (متبقي ${daysRemaining} يوماً)`;
  let message = `ينتهي اشتراكك في الباقة ${plan === 'enterprise' ? 'المؤسسات' : 'الاحترافية'} قريباً. جدد الآن لتجنب توقف التقارير والتصدير والخدمات.`;

  if (status === 'expired' || expirationAlertLevel === 'expired') {
    bgClass = 'bg-rose-950/95 border-rose-500/80 text-rose-100';
    icon = <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />;
    title = '⚠️ انتهت صلاحية اشتراكك المالي والمكتبي!';
    message = 'تم إيقاف الميزات المتقدمة وتوليد التقارير والتصدير مؤقتاً. يرجى تجديد الاشتراك فوراً لاستعادة كافة الصلاحيات.';
  } else if (expirationAlertLevel === 'warning_1') {
    bgClass = 'bg-rose-950/90 border-rose-500/60 text-rose-200';
    title = '🚨 متبقي يوم واحد فقط على انتهاء الاشتراك!';
  } else if (expirationAlertLevel === 'warning_3') {
    bgClass = 'bg-amber-950/90 border-amber-500/60 text-amber-200';
    title = '⚠️ متبقي 3 أيام على انتهاء اشتراك المكتب!';
  } else if (expirationAlertLevel === 'warning_7') {
    bgClass = 'bg-amber-950/80 border-amber-600/50 text-amber-300';
    title = '🗓️ متبقي أسبوع واحد (7 أيام) على موعد تجديد الاشتراك';
  } else if (status === 'trial') {
    bgClass = 'bg-indigo-950/90 border-indigo-500/60 text-indigo-200';
    icon = <Clock className="w-5 h-5 text-indigo-400 shrink-0" />;
    title = `الفترة التجريبية المجانية (متبقي ${daysRemaining} يوماً)`;
    message = 'أنت تعمل حالياً بالنسخة التجريبية. اشترك في الباقة الاحترافية لفتح التقارير اليومية والتصدير وتعدد المستخدمين.';
  }

  return (
    <div className={`p-3.5 sm:p-4 rounded-2xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 dir-rtl text-right transition-all mb-4 ${bgClass}`}>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {icon}
        <div>
          <strong className="block text-xs sm:text-sm font-black">{title}</strong>
          <p className="text-[11px] sm:text-xs opacity-90 mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
        <button
          onClick={onRenewClick}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{status === 'expired' ? 'تجديد الاشتراك فوراً' : 'تجديد / ترقية الباقة'}</span>
        </button>

        {onDismiss && status !== 'expired' && (
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
            title="إغلاق التنبيه مؤقتاً"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
