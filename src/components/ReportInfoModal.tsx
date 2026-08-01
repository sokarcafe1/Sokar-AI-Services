import React, { useState } from 'react';
import { EducationService, IncorrectInfoReport } from '../types';
import { AlertTriangle, X, CheckCircle2, Send } from 'lucide-react';

interface ReportInfoModalProps {
  service: EducationService | null;
  onClose: () => void;
  onSubmitReport: (report: Omit<IncorrectInfoReport, 'id' | 'createdAt' | 'status'>) => void;
}

export const ReportInfoModal: React.FC<ReportInfoModalProps> = ({
  service,
  onClose,
  onSubmitReport,
}) => {
  const [reportType, setReportType] = useState<IncorrectInfoReport['reportType']>('outdated_link');
  const [details, setDetails] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    onSubmitReport({
      serviceId: service.id,
      serviceName: service.name,
      reportType,
      details,
      userEmail,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative text-slate-800">
        
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>الإبلاغ عن معلومات غير صحيحة أو محدثة</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">شكرًا لتعاونك وملاحظتك!</h3>
            <p className="text-xs text-slate-600">
              تم تسجيل بلاغك بنجاح وسيقوم فريق مراجعة البيانات بالتحقق من الموقع الرسمي وتحديث المعلومة.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block mb-1">الخدمة المستهدفة بالبلاغ:</span>
              <p className="font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {service.name}
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">نوع الخطأ أو التحديث:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
              >
                <option value="outdated_link">🔗 رابط الموقع الرسمي المباشر لا يعمل أو تغير</option>
                <option value="wrong_documents">📄 تغير في المستندات أو الأوراق المطلوبة</option>
                <option value="wrong_fees">💰 تغير في المصروفات والرسوم المعتمدة</option>
                <option value="changed_steps">📑 تغير في خطوات التقديم والمواعيد</option>
                <option value="other">⚠️ خطأ آخر في التفاصيل أو الوصف</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">تفاصيل البلاغ والمعلومة الصحيحة بالموقع الرسمي:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="يرجى توضيح الخطأ أو التحديث الجديد المعلن بالموقع الرسمي..."
                rows={4}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">البريد الإلكتروني للتواصل (اختياري):</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="اسمك@example.com"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 font-bold text-white shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال البلاغ</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
