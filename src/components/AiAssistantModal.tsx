import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, ExternalLink, FileText, CheckCircle2, ChevronLeft, RefreshCw, HelpCircle, X, Shield, CreditCard, Zap } from 'lucide-react';
import { EducationService } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: EducationService[];
  onSelectService: (service: EducationService) => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  matchedServices?: EducationService[];
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  services,
  onSelectService,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'أهلاً بك! أنا "المساعد الذكي لمنصة Sokar AI Services" 🤖. يسعدني إجابتك بشكل فوري ودقيق حول كافة الخدمات الإلكترونية في مصر، شروط المعاملات، الأوراق الرسمية، باقات الاشتراك، ودخول الكلينت والأدمن!',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'أريد استخراج بطاقة رقم قومي',
    'ما هي باقات الاشتراك الشهري والسنوي؟',
    'كيف أدخل كـ أدمن أو كلينت؟',
    'كيف تعمل المزامنة اللحظية للخدمات؟',
    'طريقة دفع مخالفات المرور',
    'شروط وأوراق شقق الإسكان',
    'استعلام عن فاتورة الكهرباء',
  ];

  const handleSend = (userText: string) => {
    const query = userText.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Fast, professional AI processing
    setTimeout(() => {
      const q = query.toLowerCase();

      // Platform System Knowledge Checks
      let systemResponse = '';
      if (q.includes('اشتراك') || q.includes('باقة') || q.includes('باقات') || q.includes('دفع') || q.includes('سعر') || q.includes('فلوس') || q.includes('شهري') || q.includes('سنوي')) {
        systemResponse = `💳 **معلومات باقات الاشتراك في Sokar AI Services:**\n\n- **الباقة المجانية**: متاحة دائماً للتصفح الأساسي والدليل الحكومي العام.\n- **الباقة الاحترافية (Pro المواطن)**: بـ 99 ج.م شهرياً (أو 899 ج.م سنوياً مع توفير 25%) — تشمل التحديثات المباشرة 24/7 والتنبيهات وحفظ المفضلة.\n- **باقة المكاتب والشركات**: بـ 499 ج.م شهرياً (أو 4,499 ج.م سنوياً) للمندوبين والربط البرمجي.\n- **وسائل الدفع المقبولة**: انستا باي (Instapay)، فودافون كاش، منافذ فوري، والبطاقات البنكية.\n\nيمكنك النقر على زر **"💳 باقات الاشتراك"** بالسطر العلوي للتفعيل المباشر!`;
      } else if (q.includes('أدمن') || q.includes('ادمن') || q.includes('مدير') || q.includes('لوحة التحكم') || q.includes('إدارة')) {
        systemResponse = `🛡️ **بوابة دخول الأدمن ومدير النظام:**\n\nتتيح لوحة تحكم الأدمن إدارة كامل دليل الخدمات، تحديث الرسوم والمستندات، مراجعة تقارير المواطنين، ومتابعة خوادم المزامنة اللحظية.\n\n- **طريقة الدخول**: انقر على زر **"🛡️ دخول الأدمن"** في الشريط العلوي للموقع.\n- **بيانات التجربة**: اسم المستخدم: \`admin\` | كلمة المرور: \`admin\`.`;
      } else if (q.includes('كلينت') || q.includes('مواطن') || q.includes('حساب') || q.includes('تسجيل') || q.includes('دخول')) {
        systemResponse = `👤 **بوابة دخول الكلينت (المواطن):**\n\nتسمح لك بحفظ معاملتك بمفضلتك، ضبط التنبيهات المباشرة لمواعيد الرخصة أو الامتحانات، وتصدير دليل PDF الرسمي.\n\n- **طريقة الدخول**: انقر على **"👤 دخول الكلينت (المواطن)"** أو **"👤 بوابة المواطن"** بأعلى الصفحة.`;
      } else if (q.includes('تحديث') || q.includes('مزامنة') || q.includes('لحظيا') || q.includes('لحظياً') || q.includes('مباشر')) {
        systemResponse = `⚡ **خدمة التحديث والمزامنة اللحظية:**\n\nنوفر خوارزمية ربط مباشر مع البوابات والوزارات الرسمية. يمكنك النقر على زر **"🔄 تحديث الخدمات لحظياً"** بالشريط العلوي ليقوم الموقع بفحص ومزامنة البيانات وتأكيد تحديثها 100% بدون انقطاع.`;
      }

      // Intelligent Search logic over services database
      const matched = services.filter((s) => {
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.purpose.toLowerCase().includes(q) ||
          s.authority.toLowerCase().includes(q) ||
          s.documents.some((d) => d.toLowerCase().includes(q)) ||
          s.keywords?.some((k) => k.toLowerCase().includes(q)) ||
          (q.length > 2 && s.category.toLowerCase().includes(q))
        );
      });

      let botText = '';
      let displayServices: EducationService[] = [];

      if (systemResponse) {
        botText = systemResponse;
        if (matched.length > 0) {
          displayServices = matched.slice(0, 3);
          botText += `\n\nإليك أيضاً خدمات حكومية مرتبطة باستفسارك:`;
        }
      } else if (matched.length > 0) {
        botText = `إليك التفاصيل والمعاملات الحكومية الرسمية المطابقة تماماً لاستفسارك من قاعدة بيانات المنصة:`;
        displayServices = matched.slice(0, 4);
      } else {
        // Courteous fallbacks with zero "عذراً"
        botText = `أهلاً بك! أنا في خدمتك دائماً لمساعدتك في الوصول لكافة المعاملات الحكومية الرسمية والبوابات الإلكترونية.\n\nإليك أشهر الخدمات المعاملاتية الأكثر طلباً واستخداماً الآن في مصر، ويمكنك اختيار أي منها أو كتابة استفسارك بشكل مباشر:`;
        displayServices = services.slice(0, 3);
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botText,
        matchedServices: displayServices,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in dir-rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] max-h-[680px] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white p-4 flex items-center justify-between border-b border-sky-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black border border-amber-300 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">المساعد الذكي للخدمات الإلكترونية</h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  فوري وسريع
                </span>
              </div>
              <p className="text-xs text-sky-200">إجابات كاملة وموثوقة لكافة بوابات ومعاملات المنصة 🇪🇬</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="bg-sky-50/80 border-b border-sky-100 p-2.5 px-4 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2 shrink-0">
          <span className="text-xs font-black text-sky-900 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            استفسارات شائعة:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-white text-sky-900 hover:bg-sky-900 hover:text-white border border-sky-200 font-bold rounded-lg px-2.5 py-1 transition-colors shrink-0 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  msg.sender === 'user' ? 'bg-sky-700' : 'bg-sky-950 border border-amber-400 text-amber-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-400" />}
              </div>

              <div className={`max-w-[88%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-sky-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Matched Services Cards */}
                {msg.matchedServices && msg.matchedServices.length > 0 && (
                  <div className="space-y-2.5 mt-2">
                    {msg.matchedServices.map((srv) => (
                      <div
                        key={srv.id}
                        className="bg-white border border-sky-200 rounded-xl p-3.5 shadow-xs hover:border-sky-500 transition-all text-right"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-extrabold text-sky-950 text-xs sm:text-sm">{srv.name}</h4>
                          <span className="text-[10px] bg-sky-100 text-sky-900 px-2 py-0.5 rounded-md font-bold shrink-0">
                            {srv.authority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">{srv.description}</p>
                        
                        <div className="flex flex-wrap items-center justify-between text-[11px] pt-2 border-t border-slate-100 gap-2">
                          <span className="text-slate-600 font-bold">💰 الرسوم: <strong className="text-emerald-700">{srv.fees}</strong></span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                onSelectService(srv);
                                onClose();
                              }}
                              className="text-sky-800 font-black hover:underline flex items-center gap-0.5 bg-sky-50 px-2.5 py-1 rounded border border-sky-200"
                            >
                              عرض خطوات الخدمة <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={srv.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-800 font-black hover:underline flex items-center gap-0.5 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200"
                            >
                              الموقع الرسمي <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block px-1">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-sky-800 font-bold text-xs p-2">
              <Bot className="w-4 h-4 text-amber-500 animate-spin" />
              <span>جاري صياغة الإجابة المباشرة...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب أي استفسار عن الخدمات، الاشتراكات، أو حسابات الموقع..."
            className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-sky-900 hover:bg-sky-800 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-xs flex items-center justify-center"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
