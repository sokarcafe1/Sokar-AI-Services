import React, { useState, useEffect } from 'react';
import {
  Mail,
  X,
  RefreshCw,
  Send,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Inbox,
  FileText,
  UserCheck,
  LogOut,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Clock,
  ArrowRight
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initGmailAuth,
  signInWithGoogleGmail,
  getGmailAccessToken,
  logoutGmail
} from '../services/gmailAuthService';
import {
  fetchGmailMessages,
  fetchGmailMessageDetail,
  sendGmailEmail,
  trashGmailMessage,
  GmailMessageSummary,
  GmailMessageDetail
} from '../services/gmailApiService';

interface GmailIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string;
}

export const GmailIntegrationModal: React.FC<GmailIntegrationModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Messages state
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose' | 'templates'>('inbox');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Compose Form
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatusMsg, setSendStatusMsg] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Mandatory User Confirmation Modals
  const [pendingAction, setPendingAction] = useState<{
    type: 'SEND_EMAIL' | 'TRASH_MESSAGE';
    data?: any;
  } | null>(null);

  // Initialize Auth
  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initGmailAuth(
      (authUser, authToken) => {
        setUser(authUser);
        setToken(authToken);
        setNeedsAuth(false);
        loadMessages(authToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const res = await signInWithGoogleGmail();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setNeedsAuth(false);
        loadMessages(res.accessToken);
      }
    } catch (err: any) {
      console.error('Google Sign in failed:', err);
      setAuthError(err?.message || 'فشل تسجيل الدخول باستخدام حساب Google');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGmail();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
    setMessages([]);
    setSelectedMessage(null);
  };

  const loadMessages = async (accessToken?: string) => {
    const tok = accessToken || token || getGmailAccessToken();
    if (!tok) return;

    setLoadingMessages(true);
    try {
      const list = await fetchGmailMessages(tok, 15, searchQuery);
      setMessages(list);
    } catch (err: any) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleOpenDetail = async (msgId: string) => {
    const tok = token || getGmailAccessToken();
    if (!tok) return;

    setLoadingDetail(true);
    try {
      const detail = await fetchGmailMessageDetail(tok, msgId);
      setSelectedMessage(detail);
    } catch (err) {
      console.error('Error fetching detail:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Triggers confirmation dialog before sending (mandatory rule)
  const requestSendConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !subject || !body) return;
    setPendingAction({
      type: 'SEND_EMAIL',
      data: { recipient, subject, body }
    });
  };

  const executeSendEmail = async () => {
    if (!pendingAction || pendingAction.type !== 'SEND_EMAIL') return;
    const { recipient: to, subject: sub, body: content } = pendingAction.data;

    const tok = token || getGmailAccessToken();
    if (!tok) return;

    setIsSending(true);
    setSendStatusMsg(null);
    setPendingAction(null);

    try {
      await sendGmailEmail(tok, to, sub, content);
      setSendStatusMsg({
        type: 'success',
        msg: `تم إرسال الرسالة بنجاح إلى ${to}`
      });
      setRecipient('');
      setSubject('');
      setBody('');
      setTimeout(() => setSendStatusMsg(null), 4000);
      loadMessages(tok);
    } catch (err: any) {
      setSendStatusMsg({
        type: 'error',
        msg: err?.message || 'فشل في إرسال البريد الإلكتروني'
      });
    } finally {
      setIsSending(false);
    }
  };

  // Triggers confirmation dialog before deleting/trashing (mandatory rule)
  const requestTrashConfirmation = (msgId: string, msgSubject?: string) => {
    setPendingAction({
      type: 'TRASH_MESSAGE',
      data: { msgId, msgSubject: msgSubject || 'هذه الرسالة' }
    });
  };

  const executeTrashMessage = async () => {
    if (!pendingAction || pendingAction.type !== 'TRASH_MESSAGE') return;
    const { msgId } = pendingAction.data;

    const tok = token || getGmailAccessToken();
    if (!tok) return;

    setPendingAction(null);
    try {
      await trashGmailMessage(tok, msgId);
      if (selectedMessage?.id === msgId) {
        setSelectedMessage(null);
      }
      loadMessages(tok);
    } catch (err) {
      console.error('Failed to trash message:', err);
    }
  };

  const applyTemplate = (tplSubject: string, tplBody: string) => {
    setSubject(tplSubject);
    setBody(tplBody);
    setActiveTab('compose');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-xl shadow-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">تكامل Gmail الموحد - Sokar Office OS</h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Official Integration
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                متابعة المراسلات الرسمية وإرسال التنبيهات والإيصالات للعملاء مباشرة من حساب Gmail
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200">
          {needsAuth ? (
            /* Sign-in View */
            <div className="max-w-md mx-auto my-8 text-center space-y-6 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <div className="p-4 bg-rose-500/10 text-rose-400 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-rose-500/20">
                <Mail className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">تسجيل الدخول باستخدام Google Gmail</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  يتطلب النظام إذن الوصول للبريد الإلكتروني لإرسال التنبيهات، متابعة طلبات المواطنين، وإصدار الخطابات الرسمية مع الحفاظ الكامل على الأمان.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-2 text-right">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Standard Material Google Sign-in Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-bold py-3 px-6 rounded-xl border border-slate-300 shadow-md transition-all flex items-center gap-3 dir-ltr"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isLoggingIn ? 'جاري الاتصال بـ Google...' : 'Sign in with Google'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                🔒 متوافق مع معايير الأمان وتفويض OAuth المعتمد من Google Workspace.
              </div>
            </div>
          ) : (
            /* Authenticated Workspace View */
            <div className="space-y-6">
              {/* User Bar */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-700" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 font-black flex items-center justify-center border border-rose-500/30">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{user?.displayName || 'حساب Gmail المتصل'}</span>
                      <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-500/30">
                        متصل وجاهز
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">{user?.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 font-bold text-xs px-3 py-2 rounded-lg border border-slate-700 hover:border-rose-500/40 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  تبديل الحساب / تسجيل الخروج
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs">
                <button
                  onClick={() => {
                    setActiveTab('inbox');
                    setSelectedMessage(null);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'inbox'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  بريد المكتب (Inbox)
                </button>

                <button
                  onClick={() => setActiveTab('compose')}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'compose'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  إنشاء رسالة جديدة (Compose)
                </button>

                <button
                  onClick={() => setActiveTab('templates')}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'templates'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  قوالب الخطابات والإشعارات
                </button>
              </div>

              {/* TAB 1: INBOX */}
              {activeTab === 'inbox' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {selectedMessage ? (
                    /* Detailed Message View */
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <button
                          onClick={() => setSelectedMessage(null)}
                          className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                        >
                          <ChevronRight className="w-4 h-4" />
                          العودة إلى القائمة
                        </button>

                        <button
                          onClick={() => requestTrashConfirmation(selectedMessage.id, selectedMessage.subject)}
                          className="text-rose-400 hover:bg-rose-950/60 text-xs font-bold px-3 py-1.5 rounded-lg border border-rose-500/30 flex items-center gap-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                          نقل إلى المهملات
                        </button>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-black text-white">{selectedMessage.subject}</h3>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4 border-b border-slate-800/80 pb-3">
                          <span>من: <strong className="text-slate-200">{selectedMessage.from}</strong></span>
                          {selectedMessage.to && <span>إلى: <strong className="text-slate-200">{selectedMessage.to}</strong></span>}
                          <span className="font-mono text-slate-500">{selectedMessage.date}</span>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                        {selectedMessage.body || selectedMessage.snippet}
                      </div>
                    </div>
                  ) : (
                    /* Messages List */
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
                          <input
                            type="text"
                            placeholder="بحث في البريد الوارد حسب المرسل أو الموضوع..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && loadMessages()}
                            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl pr-9 pl-3 py-2.5"
                          />
                        </div>
                        <button
                          onClick={() => loadMessages()}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl transition-all"
                          title="تحديث الرسائل"
                        >
                          <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} />
                        </button>
                      </div>

                      {loadingMessages ? (
                        <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-rose-400" />
                          <p>جاري جلب الرسائل الأخيرة من حساب Gmail...</p>
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="py-12 text-center text-xs text-slate-500 space-y-2 bg-slate-950 rounded-2xl border border-slate-800">
                          <Inbox className="w-8 h-8 mx-auto text-slate-600" />
                          <p>لا توجد رسائل مطابقة في البريد الوارد.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {messages.map(msg => (
                            <div
                              key={msg.id}
                              onClick={() => handleOpenDetail(msg.id)}
                              className="bg-slate-950 hover:bg-slate-800/80 p-3.5 rounded-xl border border-slate-800 cursor-pointer transition-all flex items-center justify-between gap-4 text-xs"
                            >
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-200 truncate">{msg.from}</span>
                                  {msg.unread && (
                                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                  )}
                                </div>
                                <div className="font-bold text-rose-300 truncate">{msg.subject}</div>
                                <p className="text-slate-400 text-[11px] truncate">{msg.snippet}</p>
                              </div>

                              <div className="text-[10px] text-slate-500 font-mono whitespace-nowrap shrink-0">
                                {msg.date ? new Date(msg.date).toLocaleDateString('ar-EG') : ''}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: COMPOSE */}
              {activeTab === 'compose' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="font-bold text-white text-sm">إنشاء وإرسال بريد إلكتروني رسمي</h3>
                      <span className="text-[10px] text-slate-400">سيتم الإرسال مباشرة عبر Gmail API مع أخذ موافقة قبل الإرسال.</span>
                    </div>

                    {sendStatusMsg && (
                      <div
                        className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                          sendStatusMsg.type === 'success'
                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                            : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                        }`}
                      >
                        {sendStatusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span>{sendStatusMsg.msg}</span>
                      </div>
                    )}

                    <form onSubmit={requestSendConfirmation} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">البريد الإلكتروني للعميل / الجهة (To)</label>
                        <input
                          type="email"
                          required
                          placeholder="client@example.com"
                          value={recipient}
                          onChange={e => setRecipient(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">موضوع الرسالة (Subject)</label>
                        <input
                          type="text"
                          required
                          placeholder="إشعار بشأن المعاملة الحكومية..."
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">محتوى الخطاب والرسالة (Body)</label>
                        <textarea
                          rows={6}
                          required
                          placeholder="السيد/ة المحترم/ة... نود إحاطتكم علماً..."
                          value={body}
                          onChange={e => setBody(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={isSending}
                          className="bg-rose-500 hover:bg-rose-400 text-white font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all"
                        >
                          <Send className="w-4 h-4" />
                          مراجعة وإرسال الخطاب
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: TEMPLATES */}
              {activeTab === 'templates' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {[
                      {
                        title: 'إشعار جاهزية المستندات الحكومية',
                        subj: 'مكتب السكر - مستنداتك الحكومية جاهزة للاستلام',
                        body: 'عزيزي العميل،\n\nنود إفادتكم بأنه قد تم إنجاز معاملتكم الحكومية بنجاح ومستنداتكم الآن جاهزة للاستلام بمقر المكتب الرئيسي.\n\nيرجى إحضار أصل بطاقة الرقم القومي أو إيصال السداد عند الاستلام.\n\nمع تحيات إدارة مكتب السكر للخدمات الشاملة.'
                      },
                      {
                        title: 'تذكير بالنواقص والمستندات المطلوبة',
                        subj: 'تنبيه هامة - استكمال مستندات المعاملة الحكومية',
                        body: 'السيد/ة المحترم/ة،\n\nنسترعي عنايتكم بأنه يلزم استكمال بعض المستندات الرسمية لإتمام طلبكم المرفوع لدى الجهات الحكومية المختصة.\n\nالمستندات المطلوب توفيرها:\n- صورة بطاقة الرقم القومي سارية\n- شهادة الميلاد المميكنة الحديثة\n\nيرجى التواصل معنا أو زيارة المكتب في أقرب وقت لتفادي أي تأخير.'
                      },
                      {
                        title: 'إرسال فاتورة وسند سداد المعاملة',
                        subj: 'فاتورة سداد إلكترونية - مكتب السكر',
                        body: 'عزيزي العميل،\n\nمرفق لكم تفاصيل الفاتورة وسند السداد المالي الخاص بالخدمات الحكومية المؤداة.\n\nقيمة المعاملة الإجمالية: شاملة الرسوم الحكومية ومقابل الخدمة.\n\nنشكركم على ثقتكم الغالية بمكتب السكر OS.'
                      }
                    ].map((tpl, idx) => (
                      <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-rose-300 text-sm mb-1">{tpl.title}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{tpl.body}</p>
                        </div>
                        <button
                          onClick={() => applyTemplate(tpl.subj, tpl.body)}
                          className="bg-slate-900 hover:bg-rose-950/60 text-slate-200 hover:text-rose-300 font-bold text-[11px] px-3 py-2 rounded-lg border border-slate-800 hover:border-rose-500/40 transition-all flex items-center justify-between mt-2"
                        >
                          <span>استخدام هذا القالب</span>
                          <ArrowRight className="w-3.5 h-3.5 dir-ltr" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Gmail API OAuth 2.0 Client Connected</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Modal for Destructive or Email Mutating Actions */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 dir-rtl font-sans">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <ShieldAlert className="w-7 h-7 shrink-0" />
              <h3 className="font-black text-white text-base">تأكيد الإجراء المطلوب (User Confirmation)</h3>
            </div>

            {pendingAction.type === 'SEND_EMAIL' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                هل أنت متأكد من رغبتك في إرسال هذا البريد الإلكتروني رسمياً عبر حسابك إلى{' '}
                <strong className="text-amber-300 font-mono">{pendingAction.data.recipient}</strong> بخصوص "{pendingAction.data.subject}"؟
              </p>
            )}

            {pendingAction.type === 'TRASH_MESSAGE' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                هل أنت متأكد من نقل البريد الإلكتروني <strong className="text-amber-300 font-bold">"{pendingAction.data.msgSubject}"</strong> إلى سلة المهملات؟
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPendingAction(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2 rounded-xl"
              >
                إلغاء الإجراء
              </button>

              <button
                onClick={pendingAction.type === 'SEND_EMAIL' ? executeSendEmail : executeTrashMessage}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2 rounded-xl shadow-lg"
              >
                تأكيد وتنفيذ الإجراء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
