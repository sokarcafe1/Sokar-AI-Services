import React, { useState } from 'react';
import { 
  CreditCard, Check, Sparkles, ShieldCheck, Zap, X, Star, Calendar, CheckCircle2, 
  Smartphone, Building2, HelpCircle, AlertCircle, ArrowLeft
} from 'lucide-react';
import { updateSubscriptionPlan } from '../services/subscriptionService';

interface SubscriptionPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenClientLogin?: () => void;
  themeMode?: 'light' | 'dark' | 'black';
}

export const SubscriptionPlansModal: React.FC<SubscriptionPlansModalProps> = ({
  isOpen,
  onClose,
  onOpenClientLogin,
  themeMode = 'light',
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone' | 'fawry' | 'card'>('instapay');
  const [phoneOrCard, setPhoneOrCard] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const isBlackTheme = themeMode === 'black';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');

    const targetTier = selectedPlan === 'enterprise' ? 'enterprise' : 'professional';
    updateSubscriptionPlan(targetTier, billingCycle === 'yearly' ? 12 : 1);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`تم تفعيل اشتراكك بنجاح في الباقة البروفيشينال (${billingCycle === 'yearly' ? 'السنوية - توفير 25%' : 'الشهرية'}) وسرعة ربط المزامنة اللحظية وموديل التقارير والإحصائيات! ✨`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[160] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto dir-rtl animate-in fade-in">
      <div className={`w-full max-w-4xl rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[92vh] ${
        isBlackTheme 
          ? 'bg-zinc-950 border-amber-500/30 text-zinc-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
          isBlackTheme 
            ? 'bg-zinc-900 border-zinc-800' 
            : 'bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white border-sky-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-md ${
              isBlackTheme 
                ? 'bg-amber-400 text-black border-amber-300' 
                : 'bg-white text-sky-900 border-sky-200'
            }`}>
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-lg sm:text-xl">باقات الاشتراك في Sokar AI Services</h2>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                  isBlackTheme ? 'bg-amber-400/20 text-amber-300 border-amber-400/50' : 'bg-sky-800 text-sky-200 border-sky-600'
                }`}>
                  مزايا البوابة الرقمية المعتمدة
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isBlackTheme ? 'text-zinc-400' : 'text-sky-200'}`}>
                اختر الباقة المناسبة لك للاستفادة من التحديثات اللحظية والتنبيهات المباشرة لمعاملاتك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Cycle Switcher (Monthly vs Yearly) */}
          <div className="flex justify-center">
            <div className={`p-1 rounded-2xl border inline-flex items-center gap-1 ${
              isBlackTheme ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                  billingCycle === 'monthly'
                    ? isBlackTheme
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'bg-white text-sky-900 shadow-xs'
                    : isBlackTheme ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📅 اشتراك شهري
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? isBlackTheme
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'bg-sky-900 text-white shadow-xs'
                    : isBlackTheme ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🚀 اشتراك سنوي</span>
                <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">خصم 25%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Free Plan */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              selectedPlan === 'free'
                ? isBlackTheme ? 'border-amber-400 bg-zinc-900/90' : 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20'
                : isBlackTheme ? 'border-zinc-800 bg-zinc-900/40' : 'border-slate-200 bg-white'
            }`}>
              <div>
                <h3 className="font-extrabold text-base mb-1">المجانية / زائر البوابة</h3>
                <p className={`text-xs mb-4 ${isBlackTheme ? 'text-zinc-400' : 'text-slate-500'}`}>للبحث والاستعلام الأساسي</p>
                
                <div className="mb-4">
                  <span className="text-2xl font-black">مجاناً</span>
                  <span className={`text-xs mr-1 ${isBlackTheme ? 'text-zinc-400' : 'text-slate-500'}`}>/ دائماً</span>
                </div>

                <ul className="space-y-2.5 text-xs mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>تصفح دليل الخدمات الالكترونية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>معرفة المستندات والرسوم الرسمية</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <X className="w-4 h-4 shrink-0 text-slate-400" />
                    <span>التنبيهات اللحظية المباشرة</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlan('free')}
                className={`w-full py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  selectedPlan === 'free'
                    ? isBlackTheme ? 'bg-amber-400 text-black border-amber-400' : 'bg-sky-700 text-white border-sky-700'
                    : isBlackTheme ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {selectedPlan === 'free' ? 'الباقة المحددة حالياً' : 'اختيار الباقة المجانية'}
              </button>
            </div>

            {/* Pro Plan (Most Popular) */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between relative transition-all ${
              selectedPlan === 'pro'
                ? isBlackTheme ? 'border-amber-400 bg-zinc-900 ring-2 ring-amber-400/30' : 'border-sky-600 bg-white ring-2 ring-sky-600/30 shadow-lg'
                : isBlackTheme ? 'border-zinc-800 bg-zinc-900/60' : 'border-slate-200 bg-white'
            }`}>
              <div className="absolute -top-3 right-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-xs">
                ⭐ الأكثر طلباً للمواطنين
              </div>

              <div>
                <h3 className="font-extrabold text-base mb-1">الباقة الاحترافية (Pro المواطن)</h3>
                <p className={`text-xs mb-4 ${isBlackTheme ? 'text-zinc-400' : 'text-slate-500'}`}>للمتابعة اللحظية والتنبيهات المباشرة</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-black text-amber-500">
                    {billingCycle === 'monthly' ? '99' : '899'}
                  </span>
                  <span className="text-sm font-bold mr-1">ج.م</span>
                  <span className={`text-xs mr-1 ${isBlackTheme ? 'text-zinc-400' : 'text-slate-500'}`}>
                    / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-bold">مزامنة لحظية 24/7 من المواقع الرسمية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>إشعارات المواعيد والنتائج والقرارات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>حفظ أكثر من 50 خدمة بالمفضلة الشخصية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>تحميل وتصدير أدلة PDF الرسمية</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlan('pro')}
                className={`w-full py-2.5 rounded-xl font-black text-xs transition-all shadow-md ${
                  selectedPlan === 'pro'
                    ? isBlackTheme ? 'bg-amber-400 text-black' : 'bg-sky-900 text-white'
                    : isBlackTheme ? 'border border-amber-400/50 text-amber-300 hover:bg-amber-400/10' : 'bg-sky-600 text-white hover:bg-sky-700'
                }`}
              >
                {selectedPlan === 'pro' ? 'الباقة المحددة (الاحترافية)' : 'اختيار الباقة الاحترافية'}
              </button>
            </div>

            {/* Enterprise / Office Plan */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              selectedPlan === 'enterprise'
                ? isBlackTheme ? 'border-amber-400 bg-zinc-900' : 'border-sky-600 bg-sky-50/50'
                : isBlackTheme ? 'border-zinc-800 bg-zinc-900/40' : 'border-slate-200 bg-white'
            }`}>
              <div>
                <h3 className="font-extrabold text-base mb-1">باقة المكاتب والشركات</h3>
                <p className={`text-xs mb-4 ${isBlackTheme ? 'text-zinc-400' : 'text-slate-500'}`}>لمكاتب تقديم الخدمات والمعاملات</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-black">
                    {billingCycle === 'monthly' ? '499' : '4,499'}
                  </span>
                  <span className="text-sm font-bold mr-1">ج.م</span>
                  <span className={`text-xs mr-1 ${isBlackTheme ? 'text-zinc-400' : 'text-slate-500'}`}>
                    / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>لوحة تحكم كاملة لإدارة المكاتب والفروع</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ربط API ومزامنة المندوبين</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>طباعة الفواتير مع اسم وشعار مكتبك</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlan('enterprise')}
                className={`w-full py-2.5 rounded-xl font-bold text-xs border transition-all ${
                  selectedPlan === 'enterprise'
                    ? isBlackTheme ? 'bg-amber-400 text-black border-amber-400' : 'bg-slate-900 text-white border-slate-900'
                    : isBlackTheme ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {selectedPlan === 'enterprise' ? 'الباقة المحددة' : 'اختيار باقة المكاتب'}
              </button>
            </div>

          </div>

          {/* Payment Section if not free */}
          {selectedPlan !== 'free' && (
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isBlackTheme ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className="font-extrabold text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>طريقة الدفع وتأكيد الاشتراك ({billingCycle === 'yearly' ? 'اشتراك سنوي' : 'اشتراك شهري'})</span>
              </h4>

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'instapay'
                        ? isBlackTheme ? 'bg-amber-400 text-black border-amber-300' : 'bg-sky-900 text-white border-sky-800'
                        : isBlackTheme ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  >
                    ⚡ انستا باي (Instapay)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vodafone')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'vodafone'
                        ? isBlackTheme ? 'bg-amber-400 text-black border-amber-300' : 'bg-sky-900 text-white border-sky-800'
                        : isBlackTheme ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  >
                    📱 فودافون كاش
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('fawry')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'fawry'
                        ? isBlackTheme ? 'bg-amber-400 text-black border-amber-300' : 'bg-sky-900 text-white border-sky-800'
                        : isBlackTheme ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  >
                    💛 منافذ فوري (Fawry)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'card'
                        ? isBlackTheme ? 'bg-amber-400 text-black border-amber-300' : 'bg-sky-900 text-white border-sky-800'
                        : isBlackTheme ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  >
                    💳 بطاقة بنكية (Visa/Mastercard)
                  </button>
                </div>

                {(paymentMethod === 'instapay' || paymentMethod === 'vodafone') && (
                  <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    isBlackTheme ? 'bg-zinc-950 border-amber-500/30 text-zinc-300' : 'bg-sky-50 border-sky-200 text-sky-950'
                  }`}>
                    <span className="font-extrabold text-amber-500 block">تعليمات تحويل المبلغ:</span>
                    <p>يرجى تحويل المبلغ المطلوب إلى رقم الحساب / المحفظة التالي:</p>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 text-white font-mono font-black border border-amber-500/40">
                      <span>01002997208</span>
                      <span className="text-[11px] font-sans text-amber-400">
                        {paymentMethod === 'instapay' ? 'InstaPay Mobile / Account' : 'فودافون كاش Vodafone Cash'}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 pt-1">
                      سيتم التحقق من وصول المبلغ لـ <strong className="font-mono">01002997208</strong> وتفعيل الاشتراك فور التأكيد.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold mb-1">
                    {paymentMethod === 'vodafone' || paymentMethod === 'instapay'
                      ? 'رقم المحفظة / الرقم المحوّل منه'
                      : paymentMethod === 'fawry'
                      ? 'رقم الموبايل لاستلام كود فوري'
                      : 'رقم البطاقة البنكية'}
                  </label>
                  <input
                    type="text"
                    value={phoneOrCard}
                    onChange={(e) => setPhoneOrCard(e.target.value)}
                    placeholder={paymentMethod === 'card' ? '4532 •••• •••• 8912' : '01002997208'}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold font-mono ${
                      isBlackTheme ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  {onOpenClientLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenClientLogin();
                      }}
                      className="text-xs font-bold text-sky-500 hover:underline"
                    >
                      لديك حساب مواطن بالفعل؟ تسجيل الدخول
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                      isBlackTheme
                        ? 'bg-amber-400 hover:bg-amber-300 text-black'
                        : 'bg-sky-900 hover:bg-sky-800 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>جاري المعالجة والتفعيل...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>تأكيد الاشتراك بـ ({selectedPlan === 'pro' ? (billingCycle === 'yearly' ? '899' : '99') : (billingCycle === 'yearly' ? '4,499' : '499')} ج.م)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className={`p-4 border-t text-xs text-center ${
          isBlackTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <span>جميع باقات Sokar AI Services تشمل الدعم الفني وضمان المزامنة المباشرة المعايير الرسمية 🇪🇬</span>
        </div>
      </div>
    </div>
  );
};
