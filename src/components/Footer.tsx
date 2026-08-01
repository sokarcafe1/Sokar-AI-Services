import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, PhoneCall, ExternalLink, Heart, Scale, Lock, FileText } from 'lucide-react';
import { TermsAndPrivacyModal } from './TermsAndPrivacyModal';

export const Footer: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalTab, setModalTab] = useState<'terms' | 'privacy'>('terms');

  const openModal = (tab: 'terms' | 'privacy') => {
    setModalTab(tab);
    setShowTermsModal(true);
  };

  return (
    <footer className="bg-sky-950 text-sky-200/80 text-xs border-t border-sky-900 mt-6 no-print">
      
      {/* Top Banner Disclaimer */}
      <div className="bg-sky-900/80 border-b border-sky-800 py-2.5 px-4">
        <div className="w-full px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sky-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="leading-tight">
              <strong>تنويه هام:</strong> هذا <span className="text-amber-300 font-bold">موقع استرشادي وتوجيهي خاص بـ Sokar Ai Services وغير تابع للحكومة المصرية</span>، ينقلك مباشرة للمواقع والمنصات الرسمية الحكومية دون أي معالجة للبيانات الشخصية.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sky-300 font-mono font-bold">100% روابط استرشادية موثوقة ومباشرة</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full px-3 sm:px-6 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Col 1: Platform identity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white text-sky-900 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-sky-900" />
            </div>
            <span className="font-extrabold text-base">Sokar Ai Services</span>
          </div>

          <p className="text-sky-200/80 text-xs leading-relaxed">
            موقع استرشادي خاص بـ Sokar Ai Services وغير تابع للحكومة المصرية. يهدف لتسهيل الوصول والتوجيه لكافة خدمات الأحوال المدنية والمرور والإسكان والكهرباء والتعليم عبر مصادر وبوابات رسمية معتمدة.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="inline-block bg-sky-900 text-sky-200 px-3 py-1 rounded-lg border border-sky-800 font-mono text-[11px]">
              جمهورية مصر العربية 🇪🇬
            </span>
            <span className="inline-block bg-amber-950 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-700/60 font-bold text-[10px]">
              موقع استرشادي غير حكومي
            </span>
          </div>
        </div>

        {/* Col 2: Official Portals */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm mb-3">المنصات والمواقع الرسمية:</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://digital.gov.eg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>بوابة مصر الرقمية (Digital Egypt)</span>
              </a>
            </li>
            <li>
              <a href="https://moi.gov.eg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>موقع وزارة الداخلية - خدمات قطاع الأحوال المدنية</span>
              </a>
            </li>
            <li>
              <a href="https://ppo.gov.eg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>بوابة النيابة العامة لخدمات المرور والمخالفات</span>
              </a>
            </li>
            <li>
              <a href="https://moe.gov.eg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>وزارة التربية والتعليم والتعليم الفني</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Policies */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm mb-3">الاتفاقيات والسياسات:</h4>
          <ul className="space-y-2.5">
            <li>
              <button
                onClick={() => openModal('terms')}
                className="text-sky-300 hover:text-white transition-colors flex items-center gap-2 font-bold text-xs group"
              >
                <FileText className="w-4 h-4 text-sky-400 group-hover:text-sky-200" />
                <span>الشروط والأحكام (Terms & Conditions)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => openModal('privacy')}
                className="text-sky-300 hover:text-white transition-colors flex items-center gap-2 font-bold text-xs group"
              >
                <Lock className="w-4 h-4 text-sky-400 group-hover:text-sky-200" />
                <span>سياسة الخصوصية (Privacy Policy)</span>
              </button>
            </li>
            <li className="pt-1">
              <span className="text-[11px] text-slate-400 leading-normal block">
                تلتزم Sokar Ai Services بأعلى معايير الخصوصية والشروط القانونية للاسترشاد الخدمي.
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Official Helplines */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm mb-3">الخط الساخن والشكاوى الرسمية:</h4>
          
          <div className="bg-sky-900/90 p-3 rounded-xl border border-sky-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-sky-200">وزارة التربية والتعليم:</span>
              <strong className="text-white font-mono text-sm">16001</strong>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-sky-800/80 pt-2">
              <span className="text-sky-200">وزارة التعليم العالي والتنسيق:</span>
              <strong className="text-white font-mono text-sm">15300</strong>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-sky-800/80 pt-2">
              <span className="text-sky-200">بوابة الشكاوى الحكومية:</span>
              <strong className="text-white font-mono text-sm">16528</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="border-t border-sky-900 py-4 px-4 text-center text-sky-300/70 text-[11px]">
        <div className="w-full px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Sokar Ai Services - موقع استرشادي خاص وغير تابع للحكومة المصرية. جميع الحقوق محفوظة.</p>
          
          <div className="flex items-center gap-4 text-xs font-bold text-sky-300">
            <button onClick={() => openModal('terms')} className="hover:text-white transition-colors underline">
              الشروط والأحكام
            </button>
            <span>•</span>
            <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors underline">
              سياسة الخصوصية
            </button>
          </div>
        </div>
      </div>

      {/* Modal Render */}
      <TermsAndPrivacyModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        defaultTab={modalTab}
      />

    </footer>
  );
};

