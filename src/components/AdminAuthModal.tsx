import React, { useState } from 'react';
import { Shield, Lock, KeyRound, User, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { loginUser } from '../services/authService';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess: () => void;
  themeMode?: 'light' | 'dark' | 'black';
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAdminLoginSuccess,
  themeMode = 'light',
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isBlackTheme = themeMode === 'black';

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const session = loginUser({
        identifier: username.trim(),
        password: password,
      });

      if (
        session.user.role === 'super_admin' || 
        session.user.role === 'office_owner' || 
        session.user.role === 'branch_manager'
      ) {
        setSuccessMsg(`تم التوثيق وتأكيد صلاحيات مدير النظام بنجاح 🛡️ (${session.user.fullName})`);
        setTimeout(() => {
          setLoading(false);
          onAdminLoginSuccess();
          onClose();
        }, 600);
      } else {
        setLoading(false);
        setErrorMsg('الحساب المدخل لا يملك صلاحيات مدير النظام أو مشرف الإدارة.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'خطأ في بيانات الدخول الإدارية!');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in dir-rtl">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border transition-all ${
        isBlackTheme 
          ? 'bg-zinc-950 border-amber-500/40 text-zinc-100 shadow-amber-950/20' 
          : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/30'
      }`}>
        
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isBlackTheme 
            ? 'bg-zinc-900 border-zinc-800' 
            : 'bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isBlackTheme 
                ? 'bg-amber-400 text-black border-amber-300' 
                : 'bg-sky-600 text-white border-sky-400'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base leading-tight">تسجيل دخول مدير النظام</h2>
              <p className={`text-xs ${isBlackTheme ? 'text-zinc-400' : 'text-sky-200'}`}>
                التحكم بالخدمات، إدارة الاشتراكات، وسجلات المزامنة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleAdminAuth} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>
              رقم الهاتف المحمول أو البريد الإلكتروني للمدير
            </label>
            <div className="relative">
              <User className={`w-4 h-4 absolute right-3 top-3 ${isBlackTheme ? 'text-zinc-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="01012345678"
                className={`w-full pr-9 pl-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isBlackTheme 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-amber-400 focus:outline-hidden' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-600 focus:outline-hidden'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>
              كلمة المرور الإدارية
            </label>
            <div className="relative">
              <KeyRound className={`w-4 h-4 absolute right-3 top-3 ${isBlackTheme ? 'text-zinc-500' : 'text-slate-400'}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pr-9 pl-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isBlackTheme 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-amber-400 focus:outline-hidden' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-600 focus:outline-hidden'
                }`}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              isBlackTheme
                ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-950/40'
                : 'bg-sky-900 hover:bg-sky-800 text-white shadow-sky-900/30'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>جاري التحقق من صلاحيات المدير...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>تسجيل الدخول إلى لوحة التحكم الإدارية</span>
              </>
            )}
          </button>

          <div className="relative flex py-1 items-center">
            <div className={`flex-grow border-t ${isBlackTheme ? 'border-zinc-800' : 'border-slate-200'}`}></div>
            <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-bold">تجربة الدخول الإداري السريع</span>
            <div className={`flex-grow border-t ${isBlackTheme ? 'border-zinc-800' : 'border-slate-200'}`}></div>
          </div>

          <button
            type="button"
            onClick={() => {
              setUsername('hemasokar23@gmail.com');
              setPassword('hemasokara1*');
              setSuccessMsg('تم ملء بيانات المدير التجريبي بنجاح 👑 (اضغط دخول للتوثيق)');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <span>👑 تعبئة بيانات حساب المدير التجريبي 24 ساعة (hemasokar23@gmail.com)</span>
          </button>
        </form>

        {/* Footer info */}
        <div className={`p-4 border-t text-[11px] text-center ${
          isBlackTheme ? 'bg-zinc-900/50 border-zinc-800 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <span>منظومة الحماية وتشفير صلاحيات Sokar AI Services v4.8 🔒</span>
        </div>
      </div>
    </div>
  );
};
