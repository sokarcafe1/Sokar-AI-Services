import React, { useState } from 'react';
import { ShieldAlert, FileText, Lock, Scale, X, CheckCircle2, AlertTriangle, Building2, Info } from 'lucide-react';

interface TermsAndPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const TermsAndPrivacyModal: React.FC<TermsAndPrivacyModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto dir-rtl">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl text-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Scale className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-black text-sky-300">الاتفاقية القانونية وسياسات الاستخدام</h2>
              <p className="text-xs text-slate-400">موقع استرشادي خاص بـ Sokar Ai Services</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicit Non-Governmental Disclaimer Banner */}
        <div className="bg-amber-950/60 border-b border-amber-700/50 p-4 shrink-0">
          <div className="flex items-start gap-3 text-amber-200 text-xs sm:text-sm leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-amber-300 text-sm mb-1">
                ⚠️ إخلاء مسؤولية هامة وبيان تبعية رسمي:
              </p>
              <p>
                هذا الموقع هو <strong>موقع استرشادي وتوجيهي خاص بـ Sokar Ai Services</strong>، وهو <strong>غير تابع للحكومة المصرية أو أي جهة أو وزارة أو هيئة حكومية رسمية</strong>. هدف المنصة تقديم إرشادات وتجميع الروابط المباشرة للبوابات الرسمية لتسهيل وصول المواطن للخدمات بنفسه على المواقع الرسمية الحكومية.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-950 px-6 pt-3 border-b border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-slate-900 text-sky-300 border-t-2 border-sky-400 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>الشروط والأحكام (Terms & Conditions)</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-slate-900 text-sky-300 border-t-2 border-sky-400 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>سياسة الخصوصية (Privacy Policy)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed dir-rtl">
          
          {activeTab === 'terms' ? (
            /* TAB 1: TERMS AND CONDITIONS */
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <Building2 className="w-5 h-5 text-sky-400" />
                  <h3>1. طبيعة الموقع والملكية</h3>
                </div>
                <p>
                  هذا الموقع معلم ومعرف إلكتروني استرشادي مستقل مملوك ومدار بالكامل بواسطة <strong>Sokar Ai Services</strong>. ولا يمثل الموقع أي صفة رسمية أو حكومية، ولا ينوب عن أي مؤسسة أو وزارة بجمهورية مصر العربية.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <Info className="w-5 h-5 text-sky-400" />
                  <h3>2. الغرض من تقديم الخدمة</h3>
                </div>
                <p>
                  تم إنشاء الموقع بغرض الدليل والتوجيه وتوضيح الخطوات والأوراق والمستندات المطلوبة للخدمات والمعاملات اليومية، وتوفير روابط توجيهية مباشرة للبوابات والمنصات الحكومية الرسمية والمعتمدة (مثل بوابة مصر الرقمية، موقع وزارة الداخلية، بوابة النيابة العامة، وغيرها).
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-sky-400" />
                  <h3>3. حدود المسؤولية وإجراء المعاملات</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 pr-2">
                  <li>
                    الموقع <strong>لا يقدم أي معاملات أو خدمات حكومية مباشرة</strong> عبر خوادمه، ولا يتقاضى أي رسوم حكومية أو مالية مقابل تقديم الخدمات.
                  </li>
                  <li>
                    كافة طلبات استخراج المستندات أو الاستعلامات أو سداد الرسوم تتم عبر المواقع والمنصات الحكومية الرسمية التي يتم الانتقال إليها.
                  </li>
                  <li>
                    تخلي <strong>Sokar Ai Services</strong> مسؤوليتها عن أي تغيير في الرسوم أو القوانين واللوائح التنفيذية الصادرة من الجهات الحكومية، ويُنصح دائماً بالمراجعة المباشرة للجهات الرسمية.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-sky-400" />
                  <h3>4. حقوق الملكية الفكرية</h3>
                </div>
                <p>
                  جميع التصاميم والشعارات والمحتويات الاسترشادية الخاصة بـ <strong>Sokar Ai Services</strong> هي حقوق محفوظة للشركة. بينما تعود الشعارات والعلامات التجارية للجهات الحكومية إلى أصحابها الرسميين وتُستخدم فقط في سياق التوضيح والإرشاد المعتمد.
                </p>
              </div>
            </div>
          ) : (
            /* TAB 2: PRIVACY POLICY */
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <Lock className="w-5 h-5 text-sky-400" />
                  <h3>1. حماية البيانات الشخصية والسرية</h3>
                </div>
                <p>
                  تلتزم <strong>Sokar Ai Services</strong> بأعلى معايير الأمان والخصوصية. نؤكد بشكل صارم وقاطع أن الموقع <strong>لا يطلب ولا يخزن ولا يعالج أي بيانات شخصية أو حساسة</strong> مثل الرقم القومي، أرقام الرخص، أرقام البطاقات البنكية، أو كلمة السر الخاصة بالبوابات الحكومية.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <FileText className="w-5 h-5 text-sky-400" />
                  <h3>2. البيانات التقنية وملفات الكوكيز (Cookies)</h3>
                </div>
                <p>
                  قد يستخدم الموقع بعض ملفات تعريف الارتباط المحلية (Local Storage) على متصفحك فقط لحفظ تفضيلات التصفح الاسترشادية الخاصة بك (مثل تكبير الخط، وضع التباين العالي، أو وضع استعراض الخدمات)، دون إرسال أو مشاركة هذه البيانات مع أي أطراف خارجية.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <Building2 className="w-5 h-5 text-sky-400" />
                  <h3>3. الروابط للمواقع والمنصات الخارجية</h3>
                </div>
                <p>
                  يحتوي الموقع على روابط تحويلية تنقل المستخدم إلى مواقع رسمية حكومية أو خدمية خارجية. عند الانتقال إلى أي موقع خارجي، تسري سياسة الخصوصية وشروط الاستخدام الخاصة بذلك الموقع الخارجي، وتخلي <strong>Sokar Ai Services</strong> مسؤوليتها عن السياسات المتبعة في المواقع الخارجية.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-sky-400" />
                  <h3>4. التحديثات والتعديلات على السياسة</h3>
                </div>
                <p>
                  تحتفظ <strong>Sokar Ai Services</strong> بالحق في تعديل أو تحديث بنود سياسة الخصوصية والشروط والأحكام في أي وقت لضمان مطابقتها لأعلى المعايير الاسترشادية والقانونية.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <p className="text-slate-400 text-center sm:text-right">
            © {new Date().getFullYear()} Sokar Ai Services - موقع استرشادي خاص وغير تابع للحكومة المصرية.
          </p>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-6 py-2.5 rounded-xl transition-all text-sm shadow-lg shadow-sky-900/40"
          >
            موافق وفهمت البنود
          </button>
        </div>

      </div>
    </div>
  );
};
