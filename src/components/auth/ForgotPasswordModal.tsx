import React, { useState } from 'react';
import { KeyRound, Mail, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { requestPasswordReset, confirmPasswordReset } from '../../services/authService';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIdentifier?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialIdentifier = '',
}) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [demoOtpCode, setDemoOtpCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!identifier.trim()) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني أو اسم المستخدم أو الرقم القومي.');
      return;
    }

    try {
      setLoading(true);
      const res = requestPasswordReset(identifier);
      setDemoOtpCode(res.otpCode);
      setSuccessMsg(res.message);
      setStep('verify');
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ أثناء معالجة الطلب.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otpCode.trim()) {
      setErrorMsg('يرجى إدخال رمز التحقق المؤلف من 6 أرقام.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg('كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('كلمتا المرور غير متطابقتين.');
      return;
    }

    try {
      setLoading(true);
      confirmPasswordReset(identifier, otpCode, newPassword);
      setSuccessMsg('تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.');
      setTimeout(() => {
        onClose();
        setStep('request');
        setIdentifier('');
        setOtpCode('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccessMsg('');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'رمز التحقق غير صحيح.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-sky-900 p-4 border-b border-emerald-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-500 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">استعادة كلمة المرور الرسمية</h3>
              <p className="text-[11px] text-emerald-200">التحقق الآمن من هوية مالك الحساب</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800/50 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-600/50 text-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleRequestSubmit} className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                أدخل البريد الإلكتروني أو اسم المستخدم أو الرقم القومي المرتبط بحسابك لاستلام رمز التحقق الفوري:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">بيانات الحساب:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="البريد الإلكتروني أو الرقم القومي (14 رقماً)"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>إرسال رمز التحقق الفوري</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-3">
              {demoOtpCode && (
                <div className="p-3 bg-amber-950/60 border border-amber-600/50 rounded-xl text-xs text-amber-200 flex items-center justify-between">
                  <span>رمز التحقق التجريبي للاستعادة:</span>
                  <strong className="font-mono text-sm tracking-widest text-amber-300 bg-amber-900/80 px-2 py-0.5 rounded border border-amber-500">{demoOtpCode}</strong>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">رمز التحقق (6 أرقام):</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full text-center font-mono text-base tracking-widest bg-slate-800/90 border border-slate-700 rounded-xl py-2 text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">كلمة المرور الجديدة:</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">تأكيد كلمة المرور الجديدة:</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2.5 rounded-xl font-medium"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>تأكيد وحفظ كلمة المرور الجديدة</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
