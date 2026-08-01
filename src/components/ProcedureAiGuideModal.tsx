import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FileCheck,
  Clock,
  DollarSign,
  AlertCircle,
  Search,
  BookOpen,
  CheckCircle2,
  Building2,
  Bot
} from 'lucide-react';

interface ProcedureGuide {
  id: string;
  title: string;
  category: string;
  feesEgp: number;
  durationDays: string;
  requiredDocs: string[];
  steps: string[];
  warnings: string[];
}

interface ProcedureAiGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProcedureAiGuideModal: React.FC<ProcedureAiGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState<string>('national-id');

  const [guides] = useState<ProcedureGuide[]>([
    {
      id: 'national-id',
      title: 'تجديد واستخراج بطاقة الرقم القومي (مستعجل / عادي)',
      category: 'الأحوال المدنية والجوازات',
      feesEgp: 175,
      durationDays: '24 ساعة (مستعجل) / 15 يوماً (عادي)',
      requiredDocs: [
        'استمارة بطاقة الرقم القومي من السجل المدني',
        'أصل بطاقة الرقم القومي القديمة أو ضامن درجة أولى',
        'مستند إثبات المهنة (مؤهل دراسي أو كارنيه نقابة أو خطاب عمل معتمد)',
        'إثبات محل الإقامة (عقد إيجار/ملكية أو إيصال مرافق حديث)'
      ],
      steps: [
        'شراء وتعبئة استمارة الرقم القومي واعتماد البيانات من جهة العمل.',
        'توجه المواطن لمقر السجل المدني لالتقاط الصورة والبصمة الرقمية.',
        'استلام الإيصال الحراري المؤرخ بموعد التسليم الرسمي.'
      ],
      warnings: [
        'تفرض غرامة 50 جنيهاً في حالة تأخير تجديد البطاقة بعد مرور 3 أشهر من انتهاء صلاحيتها.',
        'يجب تأكيد مهنة الزوج/الزوجة في حالة التغيير بتقديم قيد عائلي حديث.'
      ]
    },
    {
      id: 'commercial-register',
      title: 'استخراج قيد فردي بالسجل التجاري وتأسيس منشأة',
      category: 'السجل التجاري والضرائب',
      feesEgp: 350,
      durationDays: '2 - 3 أيام عمل',
      requiredDocs: [
        'أصل وصورة بطاقة الرقم القومي لصاحب المنشأة',
        'أصل عقد إيجار موثق بالشهر العقاري أو عقد ملكية المقر',
        'أصل البطاقة الضريبية المُميكنة للمنشأة',
        'شهادة مزاولة المهنة من الغرفة التجارية'
      ],
      steps: [
        'التقدم بطلب المعاينة وحجز الاسم التجاري بالغرفة التجارية.',
        'استلام شهادة المزاولة وسداد الرسوم المقررة.',
        'التوجه لمكتب السجل التجاري واستلام القيد الفردي المُميكن.'
      ],
      warnings: [
        'يلزم إجراء المعاينة الفلية للمقر التجاري قبل إصدار القيد النهائي.',
        'صلاحية شهادة الغرفة التجارية 30 يوماً فقط من تاريخ الإصدار.'
      ]
    },
    {
      id: 'passport',
      title: 'استخراج وتجديد جواز السفر المميكن',
      category: 'الجوازات والهجرة',
      feesEgp: 1110,
      durationDays: '3 أيام عمل (مستعجل) / 7 أيام (عادي)',
      requiredDocs: [
        'بطاقة الرقم القومي سارية (أو شهادة الميلاد لمن هم دون 16 سنة)',
        'عدد 4 صور شخصية حديثة خلفية بيضاء 4*6',
        'جواز السفر السابق (في حالة التجديد)',
        'الموقف من التجنيد للذكور (أصل شهادة التأجيل أو المعافاة)'
      ],
      steps: [
        'ملء نموذج طلب جواز السفر بفرع الجوازات التابع للمحافظة.',
        'تقديم المستندات ودفع الرسوم المقررة لشباك التحصيل.',
        'استلام الجواز بالإيصال المُميكن.'
      ],
      warnings: [
        'لا يتم قبول بطاقات الرقم القومي منتهية الصلاحية إطلاقاً.'
      ]
    }
  ]);

  if (!isOpen) return null;

  const filteredGuides = guides.filter(g =>
    g.title.includes(searchQuery) || g.category.includes(searchQuery)
  );

  const activeGuide = guides.find(g => g.id === selectedGuideId) || guides[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-indigo-500/30 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border border-indigo-400 rounded-xl shadow-lg">
              <Bot className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مساعد الذكاء الاصطناعي للإجراءات الحكومية (Procedure AI Guide)</h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  AI Knowledge Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                دليل المستندات، والرسوم، والمدد الزمنية الرسمية لتسهيل خدمة المواطنين بالشبابيك
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden bg-slate-900/90 text-xs">
          {/* Sidebar Search & List */}
          <div className="border-l border-slate-800 p-4 space-y-3 bg-slate-950 overflow-y-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث عن اسم الخدمة أو المعاملة..."
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pr-9 pl-3 py-2 text-xs font-bold"
              />
            </div>

            <div className="space-y-2 pt-1">
              {filteredGuides.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGuideId(g.id)}
                  className={`w-full text-right p-3 rounded-xl border transition-all ${
                    selectedGuideId === g.id
                      ? 'bg-indigo-950 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] text-amber-400 font-bold block">{g.category}</span>
                  <span className="font-bold text-xs text-white block mt-0.5">{g.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guide Detail View */}
          <div className="lg:col-span-2 p-6 overflow-y-auto space-y-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded text-[10px] border border-amber-500/30">
                {activeGuide.category}
              </span>
              <h3 className="text-xl font-black text-white">{activeGuide.title}</h3>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">الرسوم الحكومية المقررة</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">{activeGuide.feesEgp} ج.م</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">مدة الإنجاز الرسمية</span>
                    <span className="font-bold text-slate-200 text-xs">{activeGuide.durationDays}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-400" />
                <span>المستندات والأوراق المطلوبة لاستكمال المعاملة:</span>
              </h4>
              <ul className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                {activeGuide.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>خطوات التنفيذ والإجراءات داخل المكتب:</span>
              </h4>
              <ol className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 list-decimal pr-5 text-slate-300">
                {activeGuide.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            {/* Warnings */}
            {activeGuide.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>تنبيهات هامة وغرامات يجب إبلاغ المواطن بها:</span>
                </h4>
                <ul className="space-y-1.5 bg-rose-950/30 border border-rose-500/30 p-4 rounded-xl text-rose-200">
                  {activeGuide.warnings.map((warn, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>يتم تحديث الدليل التفاعلي دورياً طبقاً للقرارات الوزارية الصادرة</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
