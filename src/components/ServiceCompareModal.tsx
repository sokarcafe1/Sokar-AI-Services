import React, { useState } from 'react';
import { ArrowLeftRight, FileText, DollarSign, Clock, ShieldCheck, Check, ExternalLink, X } from 'lucide-react';
import { EducationService } from '../types';

interface ServiceCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: EducationService[];
  initialServiceId?: string;
}

export const ServiceCompareModal: React.FC<ServiceCompareModalProps> = ({
  isOpen,
  onClose,
  services,
  initialServiceId,
}) => {
  const [service1Id, setService1Id] = useState<string>(
    initialServiceId || (services[0]?.id ?? '')
  );
  const [service2Id, setService2Id] = useState<string>(
    services.find((s) => s.id !== service1Id)?.id || (services[1]?.id ?? '')
  );

  if (!isOpen) return null;

  const service1 = services.find((s) => s.id === service1Id);
  const service2 = services.find((s) => s.id === service2Id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[780px] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-sky-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-700 border border-sky-500 flex items-center justify-center shadow-inner">
              <ArrowLeftRight className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">مقارنة الخدمات الحكومية جنباً إلى جنب</h2>
              <p className="text-xs text-sky-200">قارن بين الأوراق والمصروفات والشروط ومدة استخراج المستندات</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-sky-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection Pickers */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الخدمة الأولى (المقارنة أ):</label>
            <select
              value={service1Id}
              onChange={(e) => setService1Id(e.target.value)}
              className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-600"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.authority})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الخدمة الثانية (المقارنة ب):</label>
            <select
              value={service2Id}
              onChange={(e) => setService2Id(e.target.value)}
              className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-600"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.authority})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50 space-y-4">
          {!service1 || !service2 ? (
            <p className="text-center py-8 text-slate-500">اختر خدمتين لعرض المقارنة التكتيكية التفصيلية.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Service 1 Column */}
              <div className="bg-white rounded-xl border-2 border-sky-200 p-4 space-y-4 shadow-xs">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md mb-1 inline-block">
                    {service1.authority}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">{service1.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{service1.purpose}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> المصروفات والرسوم:
                    </span>
                    <p className="p-2 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-lg font-semibold">
                      {service1.fees}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> مدة التنفيذ والاستخراج:
                    </span>
                    <p className="p-2 bg-amber-50 text-amber-950 border border-amber-200 rounded-lg">
                      {service1.processingTime}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> الشروط والمستحقين:
                    </span>
                    <p className="p-2 bg-sky-50 text-sky-950 border border-sky-100 rounded-lg">
                      {service1.whoCanApply}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-600" /> المستندات والأوراق المطلوبة ({service1.documents.length}):
                    </span>
                    <ul className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {service1.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={service1.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 bg-sky-800 hover:bg-sky-900 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>انتقل للموقع الرسمي</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Service 2 Column */}
              <div className="bg-white rounded-xl border-2 border-slate-300 p-4 space-y-4 shadow-xs">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md mb-1 inline-block">
                    {service2.authority}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">{service2.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{service2.purpose}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> المصروفات والرسوم:
                    </span>
                    <p className="p-2 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-lg font-semibold">
                      {service2.fees}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> مدة التنفيذ والاستخراج:
                    </span>
                    <p className="p-2 bg-amber-50 text-amber-950 border border-amber-200 rounded-lg">
                      {service2.processingTime}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> الشروط والمستحقين:
                    </span>
                    <p className="p-2 bg-sky-50 text-sky-950 border border-sky-100 rounded-lg">
                      {service2.whoCanApply}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-600" /> المستندات والأوراق المطلوبة ({service2.documents.length}):
                    </span>
                    <ul className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {service2.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={service2.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>انتقل للموقع الرسمي</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
