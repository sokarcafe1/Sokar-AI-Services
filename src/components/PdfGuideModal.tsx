import React from 'react';
import { EducationService, Language } from '../types';
import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode, ExternalLink, Globe } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface PdfGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: EducationService | null;
  lang?: Language;
}

export const PdfGuideModal: React.FC<PdfGuideModalProps> = ({
  isOpen,
  onClose,
  service,
  lang = 'ar'
}) => {
  if (!isOpen || !service) return null;

  const isAr = lang === 'ar';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(service.officialUrl)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Top Actions */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <Printer className="w-5 h-5" />
            <span>{isAr ? 'دليل الخدمة الحكومية التفاعلي الموثق (جاهز للطباعة / PDF)' : 'Official Government Service PDF Guide'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white text-slate-900 print:p-0 print:overflow-visible">
          
          {/* Document Header with Coat of Arms / Official Branding */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-2xl">🇪🇬</span>
                <h1 className="text-base sm:text-lg font-black text-slate-900">جمهورية مصر العربية</h1>
              </div>
              <p className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg inline-block border border-amber-200">
                {service.authority}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {isAr ? 'منصة الخدمات الحكومية الموحدة • بطاقة معلومات خدمة رسمية' : 'Unified Egypt Government Services • Official Data Sheet'}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
              <img 
                src={qrCodeUrl} 
                alt="Service QR Code" 
                className="w-24 h-24 rounded-lg bg-white p-1 border border-slate-200 shadow-2xs" 
                loading="lazy"
              />
              <span className="text-[10px] font-bold text-slate-600 mt-1 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-emerald-600" />
                {isAr ? 'امسح للفتح المباشر' : 'Scan for Direct Access'}
              </span>
            </div>
          </div>

          {/* Service Title & Core Meta */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {service.name}
            </h2>
            {service.nameEn && (
              <p className="text-xs text-slate-500 font-sans font-medium">{service.nameEn}</p>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-lg border border-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'مستند خدمة موثق رسمياً' : 'Officially Verified Service'}
              </span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 font-mono">
                {isAr ? `تاريخ آخر توثيق: ${service.lastVerifiedDate}` : `Verified: ${service.lastVerifiedDate}`}
              </span>
              <span className="bg-sky-50 text-sky-900 font-bold px-3 py-1 rounded-lg border border-sky-200">
                {isAr ? `الجهة: ${service.officialWebsiteName}` : service.officialWebsiteName}
              </span>
            </div>
          </div>

          {/* Summary Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[11px]">{isAr ? 'الرسوم الرسمية المقرر نشرها:' : 'Official Fees:'}</span>
              <span className="font-bold text-slate-900 text-xs">
                {service.fees || (isAr ? 'غير منشور رسميًا' : 'Officially Not Published')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">{isAr ? 'زمن إنجاز الخدمة المعتمد:' : 'Processing Time:'}</span>
              <span className="font-bold text-slate-900 text-xs">
                {service.processingTime || (isAr ? 'غير منشور رسميًا' : 'Officially Not Published')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">{isAr ? 'مواعيد وطريقة العمل:' : 'Working Hours:'}</span>
              <span className="font-bold text-slate-900 text-xs">{service.workingHours}</span>
            </div>
          </div>

          {/* Service Description */}
          <div className="space-y-1 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm border-r-4 border-amber-600 pr-2">
              {isAr ? 'الوصف والهدف من الخدمة الحكومية:' : 'Service Overview:'}
            </h3>
            <p className="text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              {service.description}
            </p>
          </div>

          {/* Required Documents */}
          <div className="space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm border-r-4 border-emerald-600 pr-2">
              {isAr ? 'المستندات والأوراق المعتمدة المطلوبة:' : 'Required Official Documents:'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800 leading-tight">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Procedure */}
          <div className="space-y-2 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm border-r-4 border-sky-600 pr-2">
              {isAr ? 'خطوات وإجراءات إنجاز المعاملة:' : 'Step-by-Step Procedure:'}
            </h3>
            <ol className="space-y-2">
              {service.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Official Direct URL Footer Box */}
          <div className="p-4 bg-emerald-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-emerald-800">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs font-bold text-emerald-400 block">🌐 الرابط الحكومي المباشر الموثق:</span>
              <a 
                href={service.officialUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-emerald-200 underline break-all font-mono hover:text-white"
              >
                {service.officialUrl}
              </a>
            </div>
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isAr ? 'فتح المباشر بالموقع الرسمى' : 'Open Official Portal'}</span>
            </a>
          </div>

          {/* Document Footer Disclaimer */}
          <div className="text-center pt-2 text-[10px] text-slate-400 border-t border-slate-200 font-mono">
            تم استخراج هذا الدليل آلياً من منصة دليل الخدمات الالكترونية الرسمية بمصر • جميع الحقوق محفوظة للجهات الحكومية الرسمية 2026.
          </div>

        </div>

      </div>
    </div>
  );
};
