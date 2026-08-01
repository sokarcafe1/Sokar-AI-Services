import React, { useState } from 'react';
import {
  X,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Phone,
  Mail,
  HelpCircle,
  Play,
  Download,
  Building,
  Users,
  CreditCard,
  Layers,
  Cpu,
  Star,
  MessageSquare
} from 'lucide-react';

interface LandingWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout?: (planName: string, priceEgp: number) => void;
}

export const LandingWebsiteModal: React.FC<LandingWebsiteModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'pricing' | 'demo' | 'faq' | 'contact'>('home');
  const [calculatedUsers, setCalculatedUsers] = useState(3);
  const [calculatedMonths, setCalculatedMonths] = useState(12);

  // Demo request form
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoOffice, setDemoOffice] = useState('');
  const [demoSuccessMsg, setDemoSuccessMsg] = useState('');

  if (!isOpen) return null;

  const basePricePerMonth = calculatedUsers > 5 ? 1299 : 499;
  const discountMultiplier = calculatedMonths === 12 ? 0.8 : 1.0; // 20% off for annual
  const calculatedTotalEgp = Math.round(basePricePerMonth * calculatedMonths * discountMultiplier);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoPhone) return;
    setDemoSuccessMsg(`شكراً لك أ/ ${demoName}! تم استلام طلب التجربة المجانية، وسيتواصل معك مهندس النظام فوراً.`);
    setDemoName('');
    setDemoPhone('');
    setDemoOffice('');
    setTimeout(() => setDemoSuccessMsg(''), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-2 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-indigo-500/30 shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Navigation Top Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-lg border border-indigo-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Sokar Office OS - الموقع الرسمي لبيع وتراخيص النظام</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Official Store
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                منظومة تشغيل مكاتب الخدمات الحكومية والمعاملات الميكنة بالمملكة والجمهورية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCheckout && (
              <button
                onClick={() => onOpenCheckout('المؤسسية الاحترافية', 1299)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>شراء الاشتراك أونلاين</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-2 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Website Navigation Bar */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'home', label: 'الرئيسية (Home)' },
            { id: 'features', label: 'المميزات والتطبيقات' },
            { id: 'pricing', label: 'الأسعار والحاسبة' },
            { id: 'demo', label: 'اطلب تجربة مجانية' },
            { id: 'faq', label: 'الأسئلة الشائعة FAQ' },
            { id: 'contact', label: 'اتصل بمبيعات النظام' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 space-y-8">
          {/* TAB 1: HOME PAGE */}
          {activeTab === 'home' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Hero Showcase Section */}
              <div className="bg-gradient-to-r from-indigo-950 via-slate-950 to-slate-950 p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8 text-right">
                <div className="space-y-4 max-w-xl">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 font-black text-xs px-3 py-1 rounded-full">
                    ⚡ النظام التشغيلي الأقوى والأحدث لعام 2026
                  </span>
                  <h1 className="text-3xl font-black text-white leading-tight">
                    حوّل مكتب الخدمات الحكومية إلى بيئة عمل ميكنة، سريعة وبدون أوراق!
                  </h1>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    إدارة المعاملات، الأرشيف الرقمي، قراءة بطاقات الرقم القومي بالذكاء الاصطناعي، طباعة الإيصالات الحرارية، وإرسال تنبيهات الواتساب التلقائية في منصة سحابية واحدة معتمدة.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('pricing')}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                    >
                      <span>استعرض الباقات والأسعار</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => setActiveTab('demo')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 text-emerald-400" />
                      <span>اطلب تجربة حيّة (Demo)</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="font-bold text-slate-300">مؤشرات الأداء المباشرة</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">Live Server</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">المكاتب النشطة</span>
                      <span className="text-xl font-black text-emerald-400 font-mono">148+</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">المعاملات المنفذة</span>
                      <span className="text-xl font-black text-indigo-400 font-mono">1.2M</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">دقة قراءة OCR</span>
                      <span className="text-xl font-black text-amber-400 font-mono">99.4%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">زمن الإنجاز</span>
                      <span className="text-xl font-black text-rose-400 font-mono">-65%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  <h3 className="font-black text-white text-sm">أمان مشدد وتشفير كامل</h3>
                  <p className="text-xs text-slate-400">تشفير 256-bit للبيانات الحساسة وأرشيف المستندات السحابي لحماية خصوصية المواطنين.</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <Zap className="w-8 h-8 text-amber-400" />
                  <h3 className="font-black text-white text-sm">سرعة فائقة في الخدمة</h3>
                  <p className="text-xs text-slate-400">إدخال بيانات المعاملة في ثوانٍ معدودة مع التوليد التلقائي للإيصالات والأرقام المرجعية.</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <Cpu className="w-8 h-8 text-indigo-400" />
                  <h3 className="font-black text-white text-sm">مساعد الذكاء الاصطناعي</h3>
                  <p className="text-xs text-slate-400">إرشادات حية للموظفين بشأن المستندات والرسوم الحكومية المطلوبة لكل نوع معاملة.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">
                المميزات الرئيسية والتطبيقات المدمجة بالنظام
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { title: 'إدارة المعاملات الحكومية', desc: 'تتبع السجل التجاري، الجوازات، البطاقات، الضرائب والخدمات الميكنة.', icon: Layers, color: 'text-indigo-400' },
                  { title: 'قارئ البطاقات الذكي OCR', desc: 'استخراج تلقائي لبيانات الرقم القومي والشهادات بدون إدخال يدوي.', icon: Sparkles, color: 'text-amber-400' },
                  { title: 'إشعارات الواتساب المباشرة', desc: 'إرسال التحديثات والإيصالات الإلكترونية للعملاء عبر الواتساب فوراً.', icon: MessageSquare, color: 'text-teal-400' },
                  { title: 'محرك الطباعة الحرارية POS', desc: 'دعم كامل لطابعات الإيصالات 80mm وتذاكر الشباك والـ QR الضريبي.', icon: Download, color: 'text-cyan-400' },
                  { title: 'الخزينة الحية والتحصيل الإلكتروني', desc: 'تكامل مع InstaPay وVodafone Cash وسجل الخزينة اليومي المحكم.', icon: CreditCard, color: 'text-emerald-400' },
                  { title: 'النسخ الاحتياطي والمزامنة السحابية', desc: 'نسخ احتياطي تلقائي مشفر بدون انقطاع لحماية أرشيفك.', icon: ShieldCheck, color: 'text-purple-400' }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                      <IconComp className={`w-6 h-6 ${item.color}`} />
                      <h4 className="font-black text-white text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PRICING & CALCULATOR */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white">خطط الأسعار وحاسبة التكلفة المباشرة</h3>
                  <p className="text-xs text-slate-400">اختر الباقة المناسبة لحجم مكتبك وعدد الموظفين</p>
                </div>

                <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setCalculatedMonths(1)}
                    className={`px-3 py-1.5 rounded-lg font-bold ${calculatedMonths === 1 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    دفع شهري
                  </button>
                  <button
                    onClick={() => setCalculatedMonths(12)}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 ${calculatedMonths === 12 ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                  >
                    <span>دفع سنوي (خصم 20%)</span>
                    <Star className="w-3 h-3 text-amber-300" />
                  </button>
                </div>
              </div>

              {/* Calculator Panel */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/30 space-y-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>حاسبة التكلفة التفاعلية للمكاتب</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2">
                    <label className="text-slate-300 font-bold block">عدد أجهزة الموظفين بالشباك: ({calculatedUsers})</label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={calculatedUsers}
                      onChange={e => setCalculatedUsers(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2"
                    />
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-xs block">التكلفة التقديرية الإجمالية:</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">{calculatedTotalEgp.toLocaleString()} ج.م</span>
                      <span className="text-[10px] text-slate-500 block">شاملة الدعم التلقائي والترخيص</span>
                    </div>
                    {onOpenCheckout && (
                      <button
                        onClick={() => onOpenCheckout('باقة مخصصة بالحاسبة', calculatedTotalEgp)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2.5 rounded-xl shadow"
                      >
                        شراء التخصيص الآن
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Plans Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="bg-slate-800 text-slate-300 font-bold px-2.5 py-1 rounded text-[10px]">البداية Basic</span>
                    <h4 className="font-black text-white text-lg">باقة المكاتب الناشئة</h4>
                    <div className="text-2xl font-black text-indigo-400 font-mono">499 ج.م <span className="text-xs text-slate-500">/شهرياً</span></div>
                    <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> فرع واحد مصرح</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 شبابيك انتظار</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> الأرشيف الأساسي</li>
                    </ul>
                  </div>
                  {onOpenCheckout && (
                    <button
                      onClick={() => onOpenCheckout('باقة البداية الناشئة', 499)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl"
                    >
                      شراء الباقة
                    </button>
                  )}
                </div>

                <div className="bg-gradient-to-b from-indigo-950 to-slate-950 p-6 rounded-2xl border-2 border-indigo-500 flex flex-col justify-between space-y-4 relative">
                  <span className="absolute -top-3 left-4 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full">
                    الأكثر طلباً ومبيعات
                  </span>
                  <div className="space-y-2">
                    <span className="bg-indigo-600 text-white font-bold px-2.5 py-1 rounded text-[10px]">الاحترافية Pro</span>
                    <h4 className="font-black text-white text-lg">باقة المكاتب الكبرى</h4>
                    <div className="text-2xl font-black text-amber-300 font-mono">1,299 ج.م <span className="text-xs text-indigo-200">/شهرياً</span></div>
                    <ul className="space-y-2 text-indigo-100 pt-3 border-t border-indigo-900">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> فروع متعددة</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> شبابيك طابور غير محدودة</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> ماسح OCR الذكي المتقدم</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> ربط الواتساب والإيميل</li>
                    </ul>
                  </div>
                  {onOpenCheckout && (
                    <button
                      onClick={() => onOpenCheckout('الباقة الاحترافية Pro', 1299)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl shadow"
                    >
                      شراء الباقة الاحترافية
                    </button>
                  )}
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="bg-purple-950 text-purple-300 font-bold px-2.5 py-1 rounded text-[10px]">المؤسسية Enterprise</span>
                    <h4 className="font-black text-white text-lg">باقة سلاسل المكاتب</h4>
                    <div className="text-2xl font-black text-purple-400 font-mono">2,999 ج.م <span className="text-xs text-slate-500">/شهرياً</span></div>
                    <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> سيرفر سحابي منفصل</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> White-Label باسم مكتبك</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> دعم مباشر 24/7</li>
                    </ul>
                  </div>
                  {onOpenCheckout && (
                    <button
                      onClick={() => onOpenCheckout('باقة المؤسسية Enterprise', 2999)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl"
                    >
                      طلب باقة المؤسسات
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEMO REQUEST */}
          {activeTab === 'demo' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl mx-auto">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-emerald-400" />
                  <span>طلب تجربة مجانية حيّة مع فريق الدعم</span>
                </h3>

                {demoSuccessMsg && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold">
                    {demoSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">الاسم الكريم</label>
                    <input
                      type="text"
                      required
                      value={demoName}
                      onChange={e => setDemoName(e.target.value)}
                      placeholder="أدخل اسمك بالكامل..."
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رقم الهاتف / الواتساب</label>
                    <input
                      type="text"
                      required
                      value={demoPhone}
                      onChange={e => setDemoPhone(e.target.value)}
                      placeholder="01012345678"
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">اسم المكتب / المحافظة</label>
                    <input
                      type="text"
                      value={demoOffice}
                      onChange={e => setDemoOffice(e.target.value)}
                      placeholder="مكتب خدمات القاهرة - الفرع الرئيسي..."
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs p-3 rounded-xl shadow-lg"
                  >
                    تأكيد طلب التجربة المجانية
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-200 text-xs">
              <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">الأسئلة الشائعة والإجابات الرسمية</h3>

              <div className="space-y-3">
                {[
                  { q: 'هل يعمل النظام بدون الاتصال بالإنترنت (Offline)؟', a: 'نعم! يعتمد Sokar Office OS على تقنية PWA المخزنة محلياً، حيث يمكنك إدخال المعاملات وطباعة الإيصالات حتى عند انقطاع الشبكة، وسيتم المزامنة تلقائياً بمجرد استعادة الاتصال.' },
                  { q: 'كيف يتم تسليم وتفعيل كود الترخيص بعد الدفع؟', a: 'يتم توليد كود الترخيص فوراً وتفعيله تلقائياً داخل حاسوبك فور إتمام عملية التحويل أو الدفع الإلكتروني بـ 0 انتظار.' },
                  { q: 'هل يمكن ربط النظام مع طابعة الإيصالات الحرارية 80mm؟', a: 'بالتأكيد، يدعم النظام جميع طابعات الفواتير الحرارية وطابعات الملصقات الباركود بدون الحاجة لتعريفات معقدة.' },
                  { q: 'ما مدى أمان بيانات العملاء وأرشيف المستندات؟', a: 'تخضع البيانات للتشفير العسكري 256-bit SSL، ولا يمكن الاطلاع على أرشيف مستنداتك إلا من خلال حساب الأدمن الخاص بالمكتب.' }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-slate-300 leading-relaxed pr-6">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs animate-in fade-in">
              <h3 className="text-lg font-black text-white">تواصل مع فريق مبيعات Sokar Office OS</h3>
              <p className="text-slate-400">يسعدنا استقبال استفسارات المكاتب وسلاسل الخدمات في أي وقت:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Phone className="w-6 h-6 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">مبيعات المكاتب والاشتراكات</span>
                    <span className="font-mono font-bold text-white text-sm">01012345678 / 01298765432</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">البريد الإلكتروني المباشر</span>
                    <span className="font-mono font-bold text-white text-sm">sales@sokar-os.eg</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Sokar Office OS Commercial Sales Portal</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl"
          >
            إغلاق الموقع
          </button>
        </div>
      </div>
    </div>
  );
};
