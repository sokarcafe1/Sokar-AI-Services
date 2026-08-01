import React from 'react';
import { EducationService } from '../types';
import { Printer, X, ShieldCheck } from 'lucide-react';

interface PrintGuideModalProps {
  service: EducationService | null;
  onClose: () => void;
}

export const PrintGuideModal: React.FC<PrintGuideModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Container */}
      <div className="bg-white text-slate-900 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-300">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800 text-sm">معاينة دليل الخدمة للطباعة والتنزيل (PDF)</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ PDF</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold px-3 py-1.5 rounded-xl text-xs"
            >
              إغلاق
            </button>
          </div>
        </div>

        {/* Formal Printable Document Area */}
        <div id="printable-guide" className="p-4 sm:p-6 bg-white border border-slate-300 rounded-xl space-y-5">
          
          {/* Document Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 text-center sm:text-right">
            <div>
              <p className="font-extrabold text-sm text-slate-900">جمهورية مصر العربية</p>
              <p className="font-bold text-xs text-slate-700">{service.authority}</p>
              <p className="text-[11px] text-slate-500 font-mono">Sokar AI Services - دليل الخدمات الالكترونية</p>
            </div>

            <div className="text-left font-mono text-[11px] text-slate-600">
              <p>تاريخ الطباعة: {new Date().toLocaleDateString('ar-EG')}</p>
              <p>تاريخ التوثيق: {service.lastVerifiedDate}</p>
              <p className="text-emerald-700 font-bold">دليل موثق رسمياً</p>
            </div>
          </div>

          {/* Service Title */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 text-center">
            <h1 className="text-lg font-black text-slate-900 mb-1">{service.name}</h1>
            <p className="text-xs text-slate-700">{service.description}</p>
          </div>

          {/* Website Info */}
          <div className="text-xs space-y-1 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <p className="font-bold text-slate-900">المنصة الإلكترونية الرسمية للخدمة:</p>
            <p className="font-bold text-emerald-800">{service.officialWebsiteName}</p>
            <p className="font-mono text-[11px] text-slate-700 break-all">{service.officialUrl}</p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold block text-slate-700">المصروفات:</span>
              <span className="font-bold text-slate-900">{service.fees}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold block text-slate-700">زمن الإنجاز:</span>
              <span className="font-bold text-slate-900">{service.processingTime}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold block text-slate-700">الفئة المستهدفة:</span>
              <span className="font-bold text-slate-900 truncate block">{service.whoCanApply}</span>
            </div>
          </div>

          {/* Required Documents */}
          <div className="text-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300 pb-1">المستندات والأوراق المطلوبة:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-800">
              {service.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="text-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300 pb-1">خطوات التقديم:</h3>
            <ol className="list-decimal list-inside space-y-1 text-slate-800">
              {service.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Contact */}
          <div className="border-t border-slate-300 pt-3 text-[11px] text-slate-600 flex justify-between items-center">
            <div>
              <span>الخط الساخن: <strong>{service.contactInfo.hotline || '16001'}</strong></span>
            </div>
            <div>
              <span>تم استخراج هذا الدليل من Sokar AI Services - دليل الخدمات الالكترونية</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
