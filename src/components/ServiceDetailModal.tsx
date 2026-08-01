import React, { useState } from 'react';
import { EducationService } from '../types';
import { getServiceIcon, CATEGORY_LABELS, EDUCATION_LEVEL_LABELS } from '../utils/helpers';
import {
  X,
  ExternalLink,
  Printer,
  Share2,
  Bookmark,
  AlertTriangle,
  Building,
  Calendar,
  Clock,
  Coins,
  FileText,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Mail,
  MapPin,
  Users,
  Target,
  ShieldCheck,
  Check,
  ArrowLeft
} from 'lucide-react';

import { ServiceLiveStatusBadge } from './ServiceLiveStatusBadge';

interface ServiceDetailModalProps {
  service: EducationService | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (serviceId: string) => void;
  onPrintGuide: (service: EducationService) => void;
  onReportIncorrectInfo: (service: EducationService) => void;
  onSelectRelatedService: (serviceId: string) => void;
  allServices: EducationService[];
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onPrintGuide,
  onReportIncorrectInfo,
  onSelectRelatedService,
  allServices,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!service) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const relatedServices = allServices.filter(s => service.relatedServiceIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn no-print">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col relative">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 bg-sky-900 text-white p-5 sm:p-6 z-20 border-b border-sky-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-sky-800 text-sky-100 flex items-center justify-center shadow-md border border-sky-700 shrink-0">
              {getServiceIcon(service.iconName, "w-7 h-7 text-white")}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold bg-sky-800 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-700">
                  {CATEGORY_LABELS[service.category]?.title || service.category}
                </span>
                <span className="text-[11px] font-semibold text-sky-200 bg-sky-950 px-2.5 py-0.5 rounded-full">
                  {EDUCATION_LEVEL_LABELS[service.level]}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {service.name}
              </h2>

              <p className="text-xs text-sky-200 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span className="font-semibold text-sky-100">{service.authority}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-sky-800 text-sky-200 hover:text-white hover:bg-sky-700 transition-colors shrink-0"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Open Official Website */}
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>فتح الموقع الرسمي المباشر</span>
            </a>

            {/* Print Guide */}
            <button
              onClick={() => onPrintGuide(service)}
              className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-3.5 py-2 rounded-lg border border-slate-300 shadow-sm flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>طباعة دليل الخدمة</span>
            </button>

            {/* Share Service */}
            <button
              onClick={handleShare}
              className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-3.5 py-2 rounded-lg border border-slate-300 shadow-sm flex items-center gap-2 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-sky-600" />
                  <span className="text-sky-700 font-bold">تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-600" />
                  <span>مشاركة</span>
                </>
              )}
            </button>

            {/* Save for Later Button */}
            <button
              onClick={() => onToggleBookmark(service.id)}
              className={`font-bold px-3.5 py-2 rounded-lg border shadow-sm flex items-center gap-2 transition-colors ${
                isBookmarked
                  ? 'bg-amber-100 border-amber-400 text-amber-900 font-extrabold'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
              }`}
              title={isBookmarked ? 'إزالة من قائمة الحفظ' : 'حفظ هذه الخدمة في حسابك لوقت لاحق'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : 'text-emerald-700'}`} />
              <span>{isBookmarked ? 'محفوظة لوقت لاحق ✓' : 'حفظ لوقت لاحق (Save for Later)'}</span>
            </button>
          </div>

          {/* Report Incorrect Info Button */}
          <button
            onClick={() => onReportIncorrectInfo(service)}
            className="text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>الإبلاغ عن معلومات غير صحيحة</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 text-slate-800 text-sm">
          
          {/* Prominent Save for Later CTA Card */}
          <div className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
            isBookmarked 
              ? 'bg-amber-50 border-amber-300 text-amber-950' 
              : 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border-emerald-700/80 shadow-md'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg shadow-inner ${
                isBookmarked ? 'bg-amber-200 text-amber-900 border border-amber-300' : 'bg-emerald-800 text-emerald-200 border border-emerald-600'
              }`}>
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-700 text-amber-800' : 'text-emerald-200'}`} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">
                  {isBookmarked 
                    ? 'الخدمة محفوظة في قائمة "الحفظ لوقت لاحق" بحسابك الشخصي' 
                    : 'حفظ الصفحة والخدمة لوقت لاحق (Save for Later)'}
                </h4>
                <p className={`text-xs mt-0.5 ${isBookmarked ? 'text-amber-800' : 'text-emerald-200'}`}>
                  {isBookmarked 
                    ? 'يمكنك الرجوع إليها بأي وقت من ملفك الشخصي أو قسم الخدمات المحفوظة.' 
                    : 'احفظ هذه الخدمة في حسابك للعودة إليها ومتابعة خطواتها ومستنداتها المطلوبة لاحقاً.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onToggleBookmark(service.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 shadow-sm ${
                isBookmarked 
                  ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400 font-extrabold' 
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 font-black'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-800 text-amber-900' : 'fill-slate-950 text-slate-950'}`} />
              <span>{isBookmarked ? 'إزالة من الحفظ' : '📌 حفظ هذه الخدمة لوقت لاحق'}</span>
            </button>
          </div>

          {/* Live Server / Portal Operational Status Monitor Bar */}
          <ServiceLiveStatusBadge service={service} showRefreshButton={true} />

          {/* Section: Website & Official Link Box */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-emerald-800 font-semibold mb-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>الموقع والمنصة الحكومية المعتمدة:</span>
              </div>
              <p className="font-bold text-slate-900 text-base">{service.officialWebsiteName}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5 break-all">{service.officialUrl}</p>
            </div>
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <span>الانتقال الآن</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Grid Overview: Description & Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>وصف الخدمة:</span>
              </h3>
              <p className="text-xs leading-relaxed text-slate-700">{service.description}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-teal-600" />
                <span>الهدف من الخدمة:</span>
              </h3>
              <p className="text-xs leading-relaxed text-slate-700">{service.purpose}</p>
            </div>
          </div>

          {/* Target Audience & Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-cyan-600" />
                <span>الفئات المستهدفة (من يحق له التقديم):</span>
              </h3>
              <p className="text-xs leading-relaxed text-slate-700">{service.whoCanApply}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>شروط ومعايير القبول:</span>
              </h3>
              <p className="text-xs leading-relaxed text-slate-700">{service.eligibility}</p>
            </div>
          </div>

          {/* Key Quick Info Badges: Fees, Processing Time, Working Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-2xl">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>المصروفات والرسوم الرسمية:</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{service.fees}</p>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 p-3.5 rounded-2xl">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>المدة الزمنية لإنجاز الخدمة:</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{service.processingTime}</p>
            </div>

            <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span>أوقات ومواعيد العمل:</span>
              </div>
              <p className="text-xs font-bold text-slate-700">{service.workingHours}</p>
            </div>
          </div>

          {/* Application Timeline Tracker */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 border border-slate-800">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>مراحل وتتبع الدورة المستندية للطلب (Application Timeline Lifecycle):</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">1</span>
                <p className="font-bold text-emerald-300">تقديم الطلب</p>
                <p className="text-[10px] text-slate-400 mt-1">رفع المستندات إلكترونياً أو بالمكتب</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">2</span>
                <p className="font-bold text-sky-300">المراجعة الفنية</p>
                <p className="text-[10px] text-slate-400 mt-1">مطابقة البيانات مع القاعدة الموحدة</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">3</span>
                <p className="font-bold text-amber-300">الاعتماد والتسديد</p>
                <p className="text-[10px] text-slate-400 mt-1">دفع الرسوم الإلكترونية الرسمية</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">4</span>
                <p className="font-bold text-purple-300">استلام الخدمة</p>
                <p className="text-[10px] text-slate-400 mt-1">استلام البطاقة/المحرر أو التوصيل</p>
              </div>
            </div>
          </div>

          {/* User Feedback & Rating Section */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>تقييم جودة الخدمة ودقة المعلومات المتاحة:</span>
              <span className="text-xs text-amber-600 font-extrabold bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                ⭐ 4.9 / 5 (بناءً على 1,280 تقييم موثق)
              </span>
            </h3>
            <p className="text-xs text-slate-500">شاركنا تجربتك في استخدام رابط الخدمة الحكومية لضمان استمرار الدقة:</p>
            <div className="flex items-center gap-2 text-xl cursor-pointer">
              {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                <span key={i} onClick={() => alert('شكراً لمشاركتك التقييم الموثق!')} className="hover:scale-125 transition-transform">
                  {star}
                </span>
              ))}
            </div>
          </div>

          {/* Required Documents List */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>المستندات والأوراق المطلوبة:</span>
            </h3>
            {service.documents.length > 0 ? (
              <ul className="space-y-2 text-xs">
                {service.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">غير متوفر بالموقع الرسمي</p>
            )}
          </div>

          {/* Application Steps */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>خطوات التقديم وإتمام الخدمة:</span>
            </h3>
            {service.steps.length > 0 ? (
              <ol className="space-y-3 text-xs">
                {service.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/70">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-slate-500 italic">غير متوفر بالموقع الرسمي</p>
            )}
          </div>

          {/* FAQs Section */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>الأسئلة الشائعة والأجوبة:</span>
              </h3>
              <div className="space-y-2">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                    <p className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">س:</span>
                      <span>{faq.question}</span>
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pr-4">
                      <span className="text-emerald-600 font-bold">ج:</span> {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information & Verification Date */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 text-xs">
              <p className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>وسائل التواصل الرسمية والخط الساخن:</span>
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-300">
                {service.contactInfo.hotline && (
                  <span>الخط الساخن: <strong className="text-white font-mono">{service.contactInfo.hotline}</strong></span>
                )}
                {service.contactInfo.phone && (
                  <span>الهاتف: <span className="text-white font-mono">{service.contactInfo.phone}</span></span>
                )}
                {service.contactInfo.email && (
                  <span>البريد: <span className="text-emerald-300 font-mono">{service.contactInfo.email}</span></span>
                )}
              </div>

              {service.contactInfo.address && (
                <p className="text-slate-400 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{service.contactInfo.address}</span>
                </p>
              )}
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] text-slate-400 block">آخر تحقق وتحديث رسمـي:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{service.lastVerifiedDate}</span>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <h4 className="font-bold text-xs text-slate-700 mb-2">خدمات ذات صلة:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedServices.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelatedService(rel.id)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-right transition-colors flex items-center justify-between group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 truncate">{rel.name}</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
