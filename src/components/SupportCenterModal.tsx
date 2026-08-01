import React, { useState } from 'react';
import {
  X,
  LifeBuoy,
  MessageSquare,
  PlusCircle,
  Paperclip,
  CheckCircle2,
  Clock,
  Send,
  Upload,
  Monitor,
  Video,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  category: 'PRINTER' | 'SYSTEM' | 'BILLING' | 'GOV_LINK' | 'HARDWARE';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  lastReply: string;
  hasAttachment?: boolean;
}

interface SupportCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportCenterModal: React.FC<SupportCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'new_ticket' | 'remote_desk' | 'live_chat'>('tickets');

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-9012',
      subject: 'طلب ضبط تعريف طابعة الإيصالات الحرارية 80mm',
      category: 'PRINTER',
      status: 'OPEN',
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      lastReply: 'جاري التنسيق مع مهندس الدعم الفني لمراجعة برامج التشغيل.',
      hasAttachment: true
    },
    {
      id: 'TCK-8901',
      subject: 'استفسار عن تفعيل خاصية OCR لاستخراج الرقم القومي',
      category: 'SYSTEM',
      status: 'RESOLVED',
      createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
      lastReply: 'تم شرح وتفعيل الموديول بنجاح لحسابكم.',
      hasAttachment: false
    }
  ]);

  // Form states for New Ticket
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('SYSTEM');
  const [newDescription, setNewDescription] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [ticketSuccessMsg, setTicketSuccessMsg] = useState('');

  // Remote Desk states
  const [anydeskCode, setAnydeskCode] = useState('');
  const [teamviewerCode, setTeamviewerCode] = useState('');
  const [remoteSuccessMsg, setRemoteSuccessMsg] = useState('');

  // Chatbot states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'أهلاً بك في مركز الدعم المباشر لنظام Sokar Office OS. كيف يمكنني مساعدتك اليوم؟', time: 'الآن' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newDescription) return;

    const created: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject,
      category: newCategory,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      lastReply: 'تم استلام التذكرة وبانتظار مراجعة الفريق الفني.',
      hasAttachment: !!attachedFile
    };

    setTickets([created, ...tickets]);
    setTicketSuccessMsg(`تم إنشاء تذكرة الدعم رقم (${created.id}) بنجاح!`);
    setNewSubject('');
    setNewDescription('');
    setAttachedFile(null);
    setTimeout(() => {
      setTicketSuccessMsg('');
      setActiveTab('tickets');
    }, 2500);
  };

  const handleRemoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anydeskCode && !teamviewerCode) return;
    setRemoteSuccessMsg('تم إرسال كود الدعم عن بُعد لمهندسي النظام، سيتم الاتصال بجهازك خلال دقائق.');
    setTimeout(() => setRemoteSuccessMsg(''), 4000);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    const timeStr = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: timeStr }]);
    setInputMessage('');

    // Simulate instant AI Support response
    setTimeout(() => {
      let botResponse = 'تم استقبال استفسارك. يبدو أن المشكلة تتعلق بإعدادات الجهاز، يمكنك فتح تذكرة دعم أو إرسال كود AnyDesk للمتابعة المباشرة.';
      if (userMsg.includes('طابعة') || userMsg.includes('طباعة')) {
        botResponse = 'تأكد من اختيار منفذ USB الصحيح وتفعيل خيار Thermal 80mm في صفحة إعدادات المكتب.';
      } else if (userMsg.includes('اشتراك') || userMsg.includes('دفع')) {
        botResponse = 'يمكنك مراجعة الاشتراكات وتوليد كود الترخيص من خلال مركز المبيعات والاشتراكات أونلاين.';
      }
      setChatMessages(prev => [...prev, { sender: 'agent', text: botResponse, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-sky-500/30 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl shadow-lg">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز الدعم الفني والمساعدة المباشرة - Support Center</h2>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  24/7 Support
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تذاكر الدعم، المساعدة عن بُعد (AnyDesk/TeamViewer) والدردشة المباشرة
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

        {/* Navigation Tabs */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'tickets', label: 'تذاكر الدعم الحالية', icon: FileText },
            { id: 'new_ticket', label: 'فتح تذكرة جديدة', icon: PlusCircle },
            { id: 'remote_desk', label: 'دعم عن بُعد (AnyDesk)', icon: Monitor },
            { id: 'live_chat', label: 'شات مباشر مع الدعم', icon: MessageSquare }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 space-y-4 text-xs">
          {/* TAB 1: TICKETS LIST */}
          {activeTab === 'tickets' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300">سجل التذاكر الخاصة بمكتبك:</span>
                <button
                  onClick={() => setActiveTab('new_ticket')}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>تذكرة جديدة</span>
                </button>
              </div>

              <div className="space-y-3">
                {tickets.map(tck => (
                  <div key={tck.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sky-400">{tck.id}</span>
                        <h4 className="font-bold text-white text-sm">{tck.subject}</h4>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        tck.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {tck.status === 'RESOLVED' ? 'تم الحل المغلق' : 'مفتوحة وقيد المراجعة'}
                      </span>
                    </div>

                    <p className="text-slate-400 leading-relaxed text-xs">{tck.lastReply}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-2 font-mono">
                      <span>تاريخ الفتح: {new Date(tck.createdAt).toLocaleDateString('ar-EG')}</span>
                      {tck.hasAttachment && <span className="text-sky-400 font-bold">📎 تحتوي على مرفقات</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: NEW TICKET */}
          {activeTab === 'new_ticket' && (
            <form onSubmit={handleCreateTicket} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="font-bold text-white text-base">تقديم تذكرة بلاغ أو استفسار جديد</h3>

              {ticketSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold">
                  {ticketSuccessMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">موضوع المشكلة أو الاستفسار</label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    placeholder="مثال: عطل في سحب بطاقة الرقم القومي..."
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">تصنيف المشكلة</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 font-bold"
                  >
                    <option value="SYSTEM">مشكلة بالنظام أو البرمجيات</option>
                    <option value="PRINTER">الطابعات الحرارية والإيصالات</option>
                    <option value="GOV_LINK">بوابات مصر الرقمية والسجل</option>
                    <option value="BILLING">الاشتراكات والمدفوعات</option>
                    <option value="HARDWARE">الأجهزة والماسح الضوئي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">تفاصيل المشكلة والخطوات للوصول إليها</label>
                <textarea
                  rows={4}
                  required
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="اشرح المشكلة بالتفصيل لمساعدة المهندس المختص..."
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5"
                />
              </div>

              {/* Upload Simulation */}
              <div className="border border-dashed border-slate-700 p-4 rounded-xl text-center space-y-2">
                <Paperclip className="w-6 h-6 mx-auto text-sky-400" />
                <span className="text-slate-400 block">إرفاق صورة للمشكلة أو فيديو توضيحي (صورة الشاشة):</span>
                <input
                  type="file"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachedFile(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                  id="ticket-file-upload"
                />
                <label
                  htmlFor="ticket-file-upload"
                  className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-1.5 rounded-lg cursor-pointer"
                >
                  اختر ملفاً من جهازك
                </label>
                {attachedFile && <span className="block font-bold text-emerald-400 text-xs mt-1">المرفق: {attachedFile}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-black py-3 rounded-xl shadow-lg"
              >
                إرسال تذكرة الدعم الفني
              </button>
            </form>
          )}

          {/* TAB 3: REMOTE DESK */}
          {activeTab === 'remote_desk' && (
            <form onSubmit={handleRemoteSubmit} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <div className="flex items-center gap-3">
                <Monitor className="w-8 h-8 text-sky-400" />
                <div>
                  <h3 className="font-bold text-white text-base">طلب الدعم الفني المباشر عن بُعد (Remote Assistance)</h3>
                  <p className="text-slate-400">أدخل كود AnyDesk أو TeamViewer ليقوم مهندس الدعم بالاتصال بجهازك مباشرة.</p>
                </div>
              </div>

              {remoteSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold">
                  {remoteSuccessMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-red-400 block">AnyDesk Address Code</span>
                  <input
                    type="text"
                    value={anydeskCode}
                    onChange={e => setAnydeskCode(e.target.value)}
                    placeholder="e.g. 982 301 445"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-mono font-bold text-center text-sm"
                  />
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-blue-400 block">TeamViewer ID</span>
                  <input
                    type="text"
                    value={teamviewerCode}
                    onChange={e => setTeamviewerCode(e.target.value)}
                    placeholder="e.g. 1 092 841 229"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-mono font-bold text-center text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-black py-3 rounded-xl shadow-lg"
              >
                إرسال الطلب والبدء بالاتصال عن بُعد
              </button>
            </form>
          )}

          {/* TAB 4: LIVE CHAT */}
          {activeTab === 'live_chat' && (
            <div className="bg-slate-950 rounded-2xl border border-slate-800 flex flex-col h-[400px] overflow-hidden animate-in fade-in">
              <div className="bg-slate-900 p-3 px-4 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>مساعد الدعم الفني المباشر Live AI Support</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Response Time: Immediate</span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[80%] ${
                      msg.sender === 'user' ? 'mr-auto items-end' : 'ml-auto items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky-600 text-white rounded-tl-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChatMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="اكتب استفسارك هنا..."
                  className="flex-1 bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5 font-bold"
                />
                <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2.5 rounded-xl font-bold">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
