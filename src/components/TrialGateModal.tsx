import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Clock, Zap, Sparkles, CheckCircle2, Lock, User, Mail, Phone, MapPin, 
  CreditCard, ArrowLeft, AlertCircle, RefreshCw, KeyRound
} from 'lucide-react';
import { EGYPT_GOVERNORATES } from '../data/centersData';
import { AnimatedBackground } from './AnimatedBackground';

export interface TrialSession {
  name: string;
  email: string;
  phone: string;
  governorate: string;
  registeredAt: number; // timestamp in ms
  isSubscribed?: boolean;
  planName?: string;
}

interface TrialGateModalProps {
  isOpen: boolean;
  trialSession: TrialSession | null;
  onRegisterTrial: (session: TrialSession) => void;
  onOpenSubscriptions: () => void;
  onOpenAdminAuth: () => void;
  themeMode?: 'light' | 'dark' | 'black';
}

export const TrialGateModal: React.FC<TrialGateModalProps> = ({
  isOpen,
  trialSession,
  onRegisterTrial,
  onOpenSubscriptions,
  onOpenAdminAuth,
  themeMode = 'light',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isBlackTheme = themeMode === 'black';

  // Check if trial is expired (24 hours = 24 * 60 * 60 * 1000 ms)
  const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const isTrialExpired = trialSession && !trialSession.isSubscribed && (now - trialSession.registeredAt > TRIAL_DURATION_MS);

  if (!isOpen) return null;

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('يرجى تعبئة كافة البيانات المطلوبة لإنشاء الفترة التجريبية (24 ساعة).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newSession: TrialSession = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        governorate,
        registeredAt: Date.now(),
        isSubscribed: false,
      };

      onRegisterTrial(newSession);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/92 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto dir-rtl animate-in fade-in relative">
      {/* Animated Professional Pre-Registration Background */}
      <AnimatedBackground themeMode={isBlackTheme ? 'black' : 'dark'} isPreAuth={true} />

      <div className={`w-full max-w-lg rounded-3xl shadow-2xl border overflow-hidden my-auto relative z-10 ${
        isBlackTheme
          ? 'bg-zinc-950/95 border-amber-500/50 text-zinc-100 shadow-amber-950/50'
          : 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-2xl'
      }`}>

        {/* Top Header */}
        <div className={`p-6 border-b text-center relative ${
          isTrialExpired
            ? 'bg-gradient-to-r from-red-950 via-red-900 to-slate-950 text-white border-red-800'
            : isBlackTheme
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white border-sky-800'
        }`}>
          <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center border shadow-lg bg-white/10 backdrop-blur-md border-white/20">
            {isTrialExpired ? (
              <Clock className="w-7 h-7 text-red-400 animate-pulse" />
            ) : (
              <Zap className="w-7 h-7 text-amber-400" />
            )}
          </div>

          <h2 className="font-black text-xl sm:text-2xl mb-1">
            {isTrialExpired ? 'انتهت الفترة التجريبية المجانية (24 ساعة)' : 'التسجيل لتفعيل الفترة التجريبية (24 ساعة)'}
          </h2>
          <p className="text-xs text-sky-200 opacity-90 max-w-sm mx-auto">
            {isTrialExpired
              ? 'لقد استمتعت بـ 24 ساعة تجريبية كاملة. يرجى الاشتراك بمبلغ رمزي لمتابعة المزامنة والخدمات اللحظية.'
              : 'قم بتسجيل بياناتك البسيطة لتجربة المنصة وكافة الخدمات الرقمية مجاناً لمدة 24 ساعة دون أي قيود!'}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-5">

          {/* If Trial Expired -> Show Paywall */}
          {isTrialExpired ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                isBlackTheme ? 'bg-red-950/30 border-red-500/30 text-red-200' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>تنبيه انتهاء التجربة:</span>
                </div>
                <span>
                  تم إغلاق التصفح تلقائياً بعد مرور 24 ساعة على تسجيلك التجريبي ({trialSession?.email}). للاستمرار في تصفح المعاملات والمزامنة اللحظية، اختر إحدى باقات الاشتراك.
                </span>
              </div>

              {/* Subscriptions Options CTA */}
              <button
                type="button"
                onClick={onOpenSubscriptions}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isBlackTheme
                    ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-950/50'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>الاشتراك الآن (باقات شهرية وسنوية تبدأ من 99 ج.م)</span>
              </button>

              <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={onOpenAdminAuth}
                  className="text-red-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>تسجيل دخول كمدير النظام (Admin)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form for 24h Free Trial */
            <form onSubmit={handleStartTrial} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>تحصل فور التسجيل على 24 ساعة تجريبية كاملة لمتابعة كافة الخدمات الرقمية!</span>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>
                  الاسم بالكامل
                </label>
                <div className="relative">
                  <User className={`w-4 h-4 absolute right-3 top-3 ${isBlackTheme ? 'text-zinc-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك الكريم"
                    className={`w-full pr-9 pl-3 py-2.5 rounded-xl border text-xs font-bold ${
                      isBlackTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute right-3 top-3 ${isBlackTheme ? 'text-zinc-500' : 'text-slate-400'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className={`w-full pr-9 pl-3 py-2.5 rounded-xl border text-xs font-bold ${
                      isBlackTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>
                  رقم الموبايل
                </label>
                <div className="relative">
                  <Phone className={`w-4 h-4 absolute right-3 top-3 ${isBlackTheme ? 'text-zinc-500' : 'text-slate-400'}`} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01012345678"
                    className={`w-full pr-9 pl-3 py-2.5 rounded-xl border text-xs font-bold ${
                      isBlackTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>
                  المحافظة
                </label>
                <div className="relative">
                  <MapPin className={`w-4 h-4 absolute right-3 top-3 ${isBlackTheme ? 'text-zinc-500' : 'text-slate-400'}`} />
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className={`w-full pr-9 pl-3 py-2.5 rounded-xl border text-xs font-bold ${
                      isBlackTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {EGYPT_GOVERNORATES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isBlackTheme
                    ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-950/40'
                    : 'bg-sky-900 hover:bg-sky-800 text-white shadow-sky-900/30'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري تفعيل التجربة المجانية (24 ساعة)...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>بدء الفترة التجريبية الآن (مجاناً لمدة 24 ساعة)</span>
                  </>
                )}
              </button>

              <div className="pt-3 border-t border-slate-200/60 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    onOpenSubscriptions();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold transition-all border border-amber-500/30 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                  <span>💳 تريد الاشتراك مباشرة دون انتظار؟</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenAdminAuth();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-bold transition-all border border-slate-300 dark:border-zinc-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  <span>🛡️ دخول الأدمن</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className={`p-4 border-t text-[11px] text-center ${
          isBlackTheme ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <span>Sokar AI Services — نظام المزامنة والربط المباشر اللحظي 🇪🇬</span>
        </div>

      </div>
    </div>
  );
};
