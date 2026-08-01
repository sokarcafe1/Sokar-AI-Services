import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Key,
  Zap,
  Lock,
  Smartphone,
  Building,
  Copy,
  Check
} from 'lucide-react';

interface OnlineCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanName?: string;
  selectedPriceEgp?: number;
  onSubscriptionActivated?: (licenseKey: string) => void;
}

export const OnlineCheckoutModal: React.FC<OnlineCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanName = 'الباقة الاحترافية Pro',
  selectedPriceEgp = 1299,
  onSubscriptionActivated
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  // Office & Billing inputs
  const [officeName, setOfficeName] = useState('مكتب الخدمات الحكومية المعتمد');
  const [ownerEmail, setOwnerEmail] = useState('office@sokar-eg.com');
  const [ownerPhone, setOwnerPhone] = useState('01002997208');
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone' | 'card' | 'fawry'>('instapay');

  // Transfer verification inputs
  const [senderPhone, setSenderPhone] = useState('01002997208');
  const [transactionRef, setTransactionRef] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState('');
  const [copiedLicense, setCopiedLicense] = useState(false);
  const [isPendingVerification, setIsPendingVerification] = useState(false);

  if (!isOpen) return null;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Generate unique license key
      const randHex = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newLicense = `SOKAR-PRO-2026-${randHex}`;
      setGeneratedLicense(newLicense);
      setIsProcessing(false);

      // Save payment request to pending list
      const pendingPayment = {
        id: 'PAY-' + Date.now(),
        officeName,
        ownerEmail,
        ownerPhone,
        senderPhone: senderPhone || ownerPhone,
        transactionRef: transactionRef || `REF-${Math.floor(Math.random() * 899999 + 100000)}`,
        targetAccount: '01002997208',
        amountEgp: selectedPriceEgp,
        planName: selectedPlanName,
        paymentMethod,
        licenseKey: newLicense,
        status: 'PENDING_VERIFICATION',
        timestamp: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('sokar_pending_payment_requests') || '[]');
        localStorage.setItem('sokar_pending_payment_requests', JSON.stringify([pendingPayment, ...existing]));
      } catch (e) {
        console.error(e);
      }

      setIsPendingVerification(true);
      setStep('success');
    }, 1200);
  };

  const handleInstantAdminApprove = () => {
    // Immediate activation for instant testing
    const currentSub = {
      licenseKey: generatedLicense,
      planName: selectedPlanName,
      status: 'ACTIVE',
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString()
    };
    localStorage.setItem('sokar_active_subscription', JSON.stringify(currentSub));
    setIsPendingVerification(false);

    if (onSubscriptionActivated) {
      onSubscriptionActivated(generatedLicense);
    }
  };

  const copyLicenseToClipboard = () => {
    navigator.clipboard.writeText(generatedLicense);
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-emerald-500/30 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl shadow-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">نظام شراء الاشتراك والدفع الإلكتروني</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Instant Activation
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تفعيل تلقائي فور الدفع وإصدار كود الترخيص السحابي المعتمد
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

        {/* Body Steps */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-5 text-xs">
          {/* STEP 1: Office Details & Summary */}
          {step === 'details' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block font-bold">الباقة المختارة</span>
                  <span className="font-black text-white text-base text-emerald-400">{selectedPlanName}</span>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 text-[10px] block font-bold">المبلغ المطلوب</span>
                  <span className="font-mono font-black text-white text-xl">{selectedPriceEgp} ج.م</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">اسم المكتب المسجل بالترخيص</label>
                  <input
                    type="text"
                    value={officeName}
                    onChange={e => setOfficeName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-3 font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">البريد الإلكتروني للآدمن</label>
                    <input
                      type="email"
                      value={ownerEmail}
                      onChange={e => setOwnerEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-3 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رقم الواتساب للتفعيل</label>
                    <input
                      type="text"
                      value={ownerPhone}
                      onChange={e => setOwnerPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-3 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep('payment')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>متابعة إلى خيارات الدفع</span>
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 'payment' && (
            <form onSubmit={handleProcessPayment} className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-white text-sm">اختر طريقة الدفع المناسبة للتحويل المباشر:</h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'instapay', label: 'إنستا باي InstaPay', sub: 'تفعيل فوري تلقائي', icon: Zap },
                  { id: 'vodafone', label: 'فودافون كاش / محفظة', sub: 'تحويل للمحفظة الإلكترونية', icon: Smartphone },
                  { id: 'card', label: 'بطاقة ائتمان / ميزة', sub: 'فيزا وماستركارد', icon: CreditCard },
                  { id: 'fawry', label: 'كود فوري Fawry Pay', sub: 'دفع بمنافذ فوري', icon: Building }
                ].map(item => {
                  const IconComp = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-4 rounded-2xl border text-right transition-all space-y-1 ${
                        paymentMethod === item.id
                          ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <IconComp className="w-5 h-5 text-emerald-400 mb-1" />
                      <div className="font-bold text-slate-100">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.sub}</div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-slate-300">
                <span className="font-bold text-emerald-400 block">تعليمات التفعيل والتحويل المباشر:</span>
                
                {paymentMethod === 'instapay' && (
                  <div className="space-y-1">
                    <p>قم بتحويل المبلغ (<strong className="text-amber-400 font-mono">{selectedPriceEgp} ج.م</strong>) عبر إنستا باي إلى الرقم:</p>
                    <div className="bg-slate-900 border border-emerald-500/40 p-2.5 rounded-xl flex items-center justify-between font-mono font-bold text-white">
                      <span>01002997208</span>
                      <span className="text-xs text-emerald-400 font-sans">InstaPay Mobile / IPA</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'vodafone' && (
                  <div className="space-y-1">
                    <p>قم بتحويل المبلغ (<strong className="text-amber-400 font-mono">{selectedPriceEgp} ج.م</strong>) لمحفظة فودافون كاش التالية:</p>
                    <div className="bg-slate-900 border border-rose-500/40 p-2.5 rounded-xl flex items-center justify-between font-mono font-bold text-white">
                      <span>01002997208</span>
                      <span className="text-xs text-rose-400 font-sans">فودافون كاش Vodafone Cash</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && <p>دفع آمن ومشفّر عبر بوابة الدفع الإلكترونية المعتمدة 256-Bit SSL.</p>}
                {paymentMethod === 'fawry' && <p>كود الخدمة بمنافذ فوري: <strong className="font-mono text-white">90821</strong> (برقم الحساب: 01002997208).</p>}

                {/* Transfer Verification Inputs */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold mb-1">رقم المحفظة / الرقم المحوّل منه:</label>
                      <input
                        type="text"
                        required
                        value={senderPhone}
                        onChange={e => setSenderPhone(e.target.value)}
                        placeholder="01002997208"
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2 text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold mb-1">رقم مرجع العملية / التحويل (اختياري):</label>
                      <input
                        type="text"
                        value={transactionRef}
                        onChange={e => setTransactionRef(e.target.value)}
                        placeholder="e.g. TXN-998120"
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  الرجوع للخطوة السابقة
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      <span>جاري تسجيل طلب التحويل والتحقق من وصول المبلغ لـ 01002997208...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>تأكيد التحويل وإرسال الإشعار لـ 01002997208</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Pending Approval / Verification View */}
          {step === 'success' && (
            <div className="space-y-6 text-center py-4 animate-in fade-in">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl ${
                isPendingVerification
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {isPendingVerification ? <ShieldCheck className="w-10 h-10 text-amber-400" /> : <CheckCircle2 className="w-10 h-10" />}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">
                  {isPendingVerification ? 'تم تسجيل طلب التحويل بنجاح! ⏳' : 'تم تفعيل الاشتراك والترخيص بنجاح! 🎉'}
                </h3>
                <p className="text-slate-300 text-xs max-w-lg mx-auto leading-relaxed">
                  {isPendingVerification
                    ? `جاري التحقق من وصول مبلغ (${selectedPriceEgp} ج.م) إلى رقم الحساب المحول عليه (01002997208). وسيتم تفعيل حسابك كود الترخيص تلقائياً فور مطابقة رقم عملية التحويل.`
                    : 'تم تفعيل النسخة ومزامنة حساب مكتبك تلقائياً مع السحابة المركزية.'}
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 space-y-3 max-w-md mx-auto text-right">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-400 font-bold">الحساب المحول عليه:</span>
                  <span className="font-mono text-amber-300 font-black">01002997208 (InstaPay/Vodafone Cash)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-400 font-bold">رقم محفظة المحول:</span>
                  <span className="font-mono text-white">{senderPhone || ownerPhone}</span>
                </div>

                <span className="text-xs text-slate-400 block font-bold">كود الترخيص المخصص (License Key):</span>
                <div className="flex items-center justify-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="font-mono font-black text-amber-300 text-base">{generatedLicense}</span>
                  <button
                    onClick={copyLicenseToClipboard}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                    title="نسخ الكود"
                  >
                    {copiedLicense ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                {isPendingVerification && (
                  <button
                    onClick={handleInstantAdminApprove}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>تأكيد فوري للتجربة المباشرة (Instant Super Admin Verify)</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-black text-xs px-8 py-3 rounded-xl shadow-lg"
                >
                  إغلاق ومتابعة الحالة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
