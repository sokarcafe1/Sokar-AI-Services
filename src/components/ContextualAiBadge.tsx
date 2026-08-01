import React from 'react';
import { Sparkles, AlertCircle, TrendingDown, Package, ShieldAlert } from 'lucide-react';

interface ContextualAiBadgeProps {
  type: 'customers' | 'treasury' | 'inventory' | 'subscriptions';
  customMessage?: string;
}

export const ContextualAiBadge: React.FC<ContextualAiBadgeProps> = ({ type, customMessage }) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'customers':
        return {
          icon: AlertCircle,
          text: customMessage || 'تحليل الذكاء الاصطناعي: هذا العميل تأخر في استلام مستنداته 3 مرات سابقة.',
          bg: 'bg-amber-950/60 border-amber-500/40 text-amber-300'
        };
      case 'treasury':
        return {
          icon: TrendingDown,
          text: customMessage || 'تنبيه ذكي للخزنة: تحصيل الإيرادات اليومي أقل بـ 12% مقارنة بنفس اليوم من الأسبوع الماضي.',
          bg: 'bg-rose-950/60 border-rose-500/40 text-rose-300'
        };
      case 'inventory':
        return {
          icon: Package,
          text: customMessage || 'تنبيه مخزون الأوراق: مخزون الورق المميكن A4 ينتهي خلال يومين بالاستهلاك الحالي.',
          bg: 'bg-orange-950/60 border-orange-500/40 text-orange-300'
        };
      case 'subscriptions':
        return {
          icon: ShieldAlert,
          text: customMessage || 'تحليل الاشتراكات: يوجد 12 مكتباً معرَّضاً لإلغاء الاشتراك لعدم التجديد خلال 5 أيام.',
          bg: 'bg-purple-950/60 border-purple-500/40 text-purple-300'
        };
      default:
        return {
          icon: Sparkles,
          text: customMessage || 'توجيه الذكاء الاصطناعي المباشر',
          bg: 'bg-slate-900 border-slate-700 text-slate-200'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 shadow-md ${config.bg} transition-all`}>
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-black/20 shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <span className="leading-relaxed">{config.text}</span>
      </div>

      <div className="flex items-center gap-1 text-[10px] bg-black/30 px-2 py-1 rounded-md shrink-0 font-mono">
        <Sparkles className="w-3 h-3 text-amber-300" />
        <span>Sokar AI</span>
      </div>
    </div>
  );
};
