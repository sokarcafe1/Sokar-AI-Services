import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Phone, 
  CheckCircle2, 
  Building2, 
  Sun, 
  Moon, 
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import { AuthSession } from '../../types/auth';
import { loginUser, registerCustomer, getRateLimitState } from '../../services/authService';
import { AnimatedBackground } from '../AnimatedBackground';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface AuthPageProps {
  onLoginSuccess: (session: AuthSession) => void;
  themeMode: 'light' | 'dark' | 'black';
  onToggleTheme: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLoginSuccess,
  themeMode,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'admin'>('login');

  // Login Form State - Default empty for security
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Customer Register Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Modals & UI Alerts
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState<number | null>(null);

  // Monitor Lockout Timer
  useEffect(() => {
    if (!identifier) return;
    const rateLimit = getRateLimitState(identifier);
    if (rateLimit.isLocked && rateLimit.remainingTimeSeconds) {
      setLockoutCountdown(rateLimit.remainingTimeSeconds);
    } else {
      setLockoutCountdown(null);
    }
  }, [identifier]);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!identifier.trim() || !password) {
      setErrorMsg('يرجى كتابة اسم المستخدم/رقم الهاتف المحمول وكلمة المرور.');
      return;
    }

    try {
      setLoading(true);
      const session = loginUser({
        identifier: identifier.trim(),
        password: password,
        rememberMe: true,
      });

      const roleBadge = session.user.role === 'super_admin' ? '👑 مدير النظام' : session.user.role === 'office_owner' ? '👔 مدير المكتب' : '🧑 مواطن';
      setSuccessMsg(`تم تسجيل الدخول بنجاح! مرحباً بك (${session.user.fullName}) [${roleBadge}]`);
      setTimeout(() => {
        onLoginSuccess(session);
      }, 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'فشلت عملية تسجيل الدخول. تحقق من صحة البيانات.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Customer Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      setLoading(true);
      const cleanPhone = phoneNumber.trim();

      if (!fullName.trim() || fullName.trim().length < 3) {
        throw new Error('يرجى كتابة الاسم بالكامل (الثنائي على الأقل).');
      }

      if (!/^(010|011|012|015)\d{8}$/.test(cleanPhone)) {
        throw new Error('رقم الهاتف المحمول يجب أن يكون مصرياً صحيحاً (11 رقماً يبدأ بـ 010 أو 011 أو 012 أو 015).');
      }

      if (!regPassword || regPassword.length < 6) {
        throw new Error('كلمة المرور يجب ألا تقل عن 6 أحرف أو أرقام.');
      }

      // Register new user
      registerCustomer({
        fullName: fullName.trim(),
        phoneNumber: cleanPhone,
        password: regPassword,
        acceptTerms: true,
      });

      // Auto login immediately
      const session = loginUser({
        identifier: cleanPhone,
        password: regPassword,
        rememberMe: true,
      });

      setSuccessMsg(`🎉 تم إنشاء الحساب بنجاح وتفعيل الفترة التجريبية المجانية (24 ساعة)! جاري التوجيه للوحة التحكم...`);
      setTimeout(() => {
        onLoginSuccess(session);
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'فشلت عملية إنشاء الحساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-slate-950 text-slate-100 selection:bg-emerald-600 selection:text-white font-['Cairo',sans-serif]">
      {/* Background Glow */}
      <AnimatedBackground themeMode={themeMode} isPreAuth={true} />

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-950/40 overflow-hidden relative z-10 transition-all dir-rtl">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 p-5 border-b border-slate-800 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-0.5 shadow-lg shadow-emerald-900/50 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  منظومة sokar office os
                </span>
                <h1 className="font-black text-lg text-white mt-0.5 flex items-center gap-2">
                  بوابة الخدمات الإلكترونية
                </h1>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title="تغيير المظهر"
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {themeMode === 'light' ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            تسجيل الدخول الآمن للمواطنين والمسؤولين وإدارة المنصة
          </p>
        </div>

        {/* Auth Mode Tabs Switcher */}
        <div className="grid grid-cols-3 bg-slate-950/80 p-1.5 border-b border-slate-800/80 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>تسجيل الدخول</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1 relative ${
              activeTab === 'register'
                ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>حساب جديد</span>
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-black text-[9px] px-1 rounded-full shadow-xs">
              24س تجريبي
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>دخول الأدمن</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-4">
          {/* Status Alerts */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-950/90 border border-rose-600/70 text-rose-200 text-xs rounded-2xl flex items-start gap-2.5 animate-in fade-in">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">تنبيه:</p>
                <p className="leading-relaxed text-rose-300">{errorMsg}</p>
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-950/90 border border-emerald-600/70 text-emerald-200 text-xs rounded-2xl flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold font-semibold">{successMsg}</p>
              </div>
            </div>
          )}

          {/* Rate Lock Alert */}
          {lockoutCountdown && (
            <div className="p-3.5 bg-amber-950/90 border border-amber-600/70 text-amber-200 text-xs rounded-2xl flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-amber-300">الحساب قيد الحظر المؤقت</p>
                <p className="text-[11px] text-amber-200">
                  متبقي {Math.ceil(lockoutCountdown / 60)} دقيقة لحين إعادة تفعيل محاولات الدخول.
                </p>
              </div>
            </div>
          )}

          {/* LOGIN VIEW */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الهاتف المحمول أو البريد الإلكتروني:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="01012345678 أو admin@egypt.gov.eg"
                    autoComplete="username"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 rounded-xl pr-10 pl-3 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة المرور:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 rounded-xl pr-10 pl-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !!lockoutCountdown}
                className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-sky-700 hover:from-emerald-500 hover:to-sky-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول</span>
              </button>

              {/* Sub Links */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>إنشاء حساب جديد (24س تجريبي)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            </form>
          )}

          {/* REGISTER VIEW WITH 24-HOUR TRIAL NOTICE */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Prominent 24-Hour Free Trial Banner */}
              <div className="bg-gradient-to-br from-amber-950/80 via-amber-900/40 to-slate-900 border border-amber-500/60 p-3.5 rounded-2xl text-amber-200 text-xs space-y-1 shadow-md">
                <div className="flex items-center gap-2 font-black text-amber-300 text-sm">
                  <span className="text-base">🎁</span>
                  <span>عرض الفترة التجريبية المجانية (24 ساعة)</span>
                </div>
                <p className="leading-relaxed text-[11px] text-amber-100/90">
                  عند إنشاء حسابك الجديد الآن، يمنحك النظام تلقائياً **فترة تجريبية مجانية لمدة 24 ساعة** للوصول الشامل وإمكانية الاستعلام عن الخدمات وحفظ المعاملات وطباعة أدلة PDF مجاناً دون أي رسوم!
                </p>
              </div>

              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم بالكامل:</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="الاسم الثنائي أو الثلاثي"
                    autoComplete="name"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 rounded-xl pr-10 pl-3 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف المصري (11 رقم):</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type="tel"
                    maxLength={11}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="01012345678"
                    autoComplete="tel"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 rounded-xl pr-10 pl-3 py-3 text-xs text-white placeholder-slate-500 focus:outline-none font-mono transition-all"
                  />
                </div>
              </div>

              {/* 3. Password */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة المرور:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 rounded-xl pr-10 pl-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-sky-700 hover:from-emerald-500 hover:to-sky-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>إنشاء الحساب وتفعيل التجربة 24 ساعة</span>
              </button>

              <div className="pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
                <span>لديك حساب بالفعل؟ </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
          )}

          {/* ADMIN LOGIN VIEW (صفحة دخول الأدمن والمسؤولين) */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border border-amber-500/50 p-3.5 rounded-2xl space-y-1 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-black">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>بوابة دخول مسؤول الإدارة والمنظومة (Admin Access)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  هذه البوابة مخصصة للإدارة العليا ومسؤولي النظام المعتمدين لمتابعة الإحصائيات والمعاملات وإدارة المستخدمين.
                </p>
              </div>

              {/* Clean Admin Form - Requires registered database credentials */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني أو اسم المستخدم:</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="اسم المستخدم أو البريد الإلكتروني للمسؤول"
                      autoComplete="username"
                      className="w-full bg-slate-800/90 border border-slate-700 focus:border-amber-500 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">كلمة المرور الإدارية:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full bg-slate-800/90 border border-slate-700 focus:border-amber-500 rounded-xl pr-10 pl-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-amber-950/40 flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{loading ? 'جاري التحقق من الصلاحيات...' : 'تسجيل الدخول كمسؤول نظام'}</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 text-center flex items-center justify-between px-5">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Building2 className="w-3.5 h-3.5" /> Sokar Office OS
          </span>
          <span className="text-slate-500 font-mono">v4.8 Secured SSL</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        initialIdentifier={identifier}
      />
    </div>
  );
};
