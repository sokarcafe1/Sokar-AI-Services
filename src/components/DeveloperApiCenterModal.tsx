import React, { useState } from 'react';
import {
  X,
  Code2,
  Key,
  Globe,
  PlusCircle,
  Copy,
  Check,
  Trash2,
  Zap,
  Terminal,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface ApiKeyItem {
  id: string;
  name: string;
  keySecret: string;
  createdAt: string;
  lastUsedAt: string;
}

interface WebhookItem {
  id: string;
  url: string;
  event: string;
  status: 'ACTIVE' | 'DISABLED';
}

interface DeveloperApiCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperApiCenterModal: React.FC<DeveloperApiCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'api_keys' | 'webhooks' | 'swagger'>('api_keys');

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: 'key-1',
      name: 'ERP & Accounting Integration Key',
      keySecret: 'sk_live_sokar_982310491823901',
      createdAt: '2026-02-10',
      lastUsedAt: 'منذ 10 دقائق'
    }
  ]);

  const [webhooks, setWebhooks] = useState<WebhookItem[]>([
    {
      id: 'wh-1',
      url: 'https://my-office-erp.com/api/sokar-webhook',
      event: 'payment.received',
      status: 'ACTIVE'
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // New Webhook inputs
  const [newWhUrl, setNewWhUrl] = useState('');
  const [newWhEvent, setNewWhEvent] = useState('ticket.created');

  if (!isOpen) return null;

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    const randHex = Math.random().toString(36).substring(2, 12);
    const created: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      keySecret: `sk_live_sokar_${randHex}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsedAt: 'لم يُستخدم بعد'
    };

    setApiKeys([...apiKeys, created]);
    setNewKeyName('');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  const handleAddWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhUrl) return;

    const created: WebhookItem = {
      id: `wh-${Date.now()}`,
      url: newWhUrl,
      event: newWhEvent,
      status: 'ACTIVE'
    };

    setWebhooks([...webhooks, created]);
    setNewWhUrl('');
  };

  const copyKey = (secret: string, id: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-indigo-500/30 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl shadow-lg">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز المطورين وربط الأنظمة - Developer API & Webhooks</h2>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  REST & Webhooks v1
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                توليد مفاتيح الربط، إعداد الـ Webhooks وتوثيق REST API مع برامج الحسابات الخارجية
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

        {/* Tabs */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 text-xs">
          {[
            { id: 'api_keys', label: 'مفاتيح API Keys', icon: Key },
            { id: 'webhooks', label: 'اشتراكات Webhooks', icon: Globe },
            { id: 'swagger', label: 'توثيق REST Endpoints', icon: BookOpen }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-4 text-xs">
          {/* TAB 1: API KEYS */}
          {activeTab === 'api_keys' && (
            <div className="space-y-4 animate-in fade-in">
              <form onSubmit={handleGenerateKey} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <input
                  type="text"
                  required
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  placeholder="اسم المفتاح e.g. ERP Integration Server..."
                  className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 font-bold"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1">
                  <PlusCircle className="w-4 h-4" />
                  <span>توليد مفتاح جديد</span>
                </button>
              </form>

              <div className="space-y-3">
                {apiKeys.map(k => (
                  <div key={k.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{k.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-indigo-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">{k.keySecret}</span>
                        <button
                          onClick={() => copyKey(k.keySecret, k.id)}
                          className="p-1 bg-slate-800 text-slate-300 rounded hover:text-white"
                        >
                          {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRevokeKey(k.id)}
                      className="p-2 bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-800/50 rounded-xl"
                      title="إلغاء المفتاح"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WEBHOOKS */}
          {activeTab === 'webhooks' && (
            <div className="space-y-4 animate-in fade-in">
              <form onSubmit={handleAddWebhook} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">رابط المستقبل (Endpoint URL)</label>
                    <input
                      type="url"
                      required
                      value={newWhUrl}
                      onChange={e => setNewWhUrl(e.target.value)}
                      placeholder="https://your-system.com/webhook"
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">الحدث المطلوب (Event Trigger)</label>
                    <select
                      value={newWhEvent}
                      onChange={e => setNewWhEvent(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 font-bold"
                    >
                      <option value="ticket.created">معاملة جديدة تم إنشاؤها (ticket.created)</option>
                      <option value="payment.received">دفعة مالية تم تحصيلها (payment.received)</option>
                      <option value="client.registered">عميل جديد تم تسجيله (client.registered)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl">
                  تفعيل رابط الـ Webhook
                </button>
              </form>

              <div className="space-y-3">
                {webhooks.map(w => (
                  <div key={w.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between font-mono">
                    <div>
                      <span className="text-white font-bold block">{w.url}</span>
                      <span className="text-amber-400 text-[10px] block">{w.event}</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REST ENDPOINTS */}
          {activeTab === 'swagger' && (
            <div className="space-y-3 font-mono text-slate-300 animate-in fade-in">
              <h3 className="font-bold text-white text-sm font-sans">وثائق المطورين التفاعلية (REST API Docs):</h3>

              {[
                { method: 'GET', path: '/api/v1/tickets', desc: 'جلب جميع المعاملات الحالية للمكتب' },
                { method: 'POST', path: '/api/v1/tickets/create', desc: 'إنشاء معاملة جديدة برقم مرجعي' },
                { method: 'GET', path: '/api/v1/treasury/balance', desc: 'جلب رصيد الخزينة المباشر' }
              ].map((api, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${api.method === 'GET' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                      {api.method}
                    </span>
                    <span className="text-white font-bold">{api.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{api.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
