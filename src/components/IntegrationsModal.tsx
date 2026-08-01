import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  Shield,
  Activity,
  Layers,
  Power,
  Sliders,
  FileText,
  Mail,
  MessageSquare,
  HardDrive,
  Calendar,
  PhoneCall,
  CreditCard,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  getDefaultIntegrations,
  toggleIntegrationConnection,
  testIntegrationConnection,
  IntegrationItem
} from '../services/integrationsService';

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGmailWorkspace?: () => void;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({
  isOpen,
  onClose,
  onOpenGmailWorkspace
}) => {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationItem | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; msg: string; success: boolean } | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIntegrations(getDefaultIntegrations());
    }
  }, [isOpen]);

  const handleToggleConnect = (id: string) => {
    const updated = toggleIntegrationConnection(id);
    setIntegrations(updated);
    if (selectedIntegration?.id === id) {
      setSelectedIntegration(updated.find(i => i.id === id) || null);
    }
  };

  const handleTestConnection = (id: string) => {
    setTestingId(id);
    setTestResult(null);
    setTimeout(() => {
      const res = testIntegrationConnection(id);
      setTestResult({ id, msg: res.message, success: res.success });
      setTestingId(null);
      setIntegrations(getDefaultIntegrations());
    }, 800);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="w-5 h-5 text-rose-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-sky-400" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-amber-400" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-indigo-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-teal-400" />;
      default: return <Zap className="w-5 h-5 text-purple-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl shadow-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز التكاملات الإلكترونية الموحد (Integrations Hub)</h2>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Central Gate
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ربط الخدمات السحابية وبوابات المراسلة والتخزين والدفع الإلكتروني بمكتب السكر
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200">
          {selectedIntegration ? (
            /* Detailed View for an Integration */
            <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                  العودة إلى مركز التكاملات
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTestConnection(selectedIntegration.id)}
                    disabled={testingId === selectedIntegration.id || !selectedIntegration.isConnected}
                    className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingId === selectedIntegration.id ? 'animate-spin' : ''}`} />
                    اختبار الاتصال (Test Connection)
                  </button>

                  <button
                    onClick={() => handleToggleConnect(selectedIntegration.id)}
                    className={`text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all ${
                      selectedIntegration.isConnected
                        ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    {selectedIntegration.isConnected ? 'قطع الاتصال (Disconnect)' : 'توصيل الخدمة (Connect)'}
                  </button>
                </div>
              </div>

              {/* Title Header */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
                  {renderIcon(selectedIntegration.icon)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-black text-white">{selectedIntegration.name}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      selectedIntegration.isConnected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {selectedIntegration.isConnected ? 'متصل وحي (Connected)' : 'غير متصل (Disconnected)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedIntegration.description}</p>
                </div>
              </div>

              {/* Details Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">الحساب المتصل</div>
                  <div className="font-bold font-mono text-slate-200">
                    {selectedIntegration.connectedAccount || 'غير محدد'}
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">آخر مزامنة ناجحة</div>
                  <div className="font-bold text-slate-200">
                    {selectedIntegration.lastSyncAt ? new Date(selectedIntegration.lastSyncAt).toLocaleString('ar-EG') : 'لا يوجد'}
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">حالة الاستجابة والأخطاء</div>
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>0 أخطاء مسجلة مؤخراً</span>
                  </div>
                </div>
              </div>

              {/* Permissions List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  الصلاحيات والتصاريح المعطاة (Permissions & Scopes)
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedIntegration.permissions.map((perm, i) => (
                    <span key={i} className="bg-slate-900 text-slate-300 font-mono text-[11px] px-3 py-1 rounded-lg border border-slate-800">
                      ✓ {perm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Logs Activity Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  سجل الأحداث والمزامنة (Activity Logs)
                </h4>
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                  {selectedIntegration.logs.length === 0 ? (
                    <div className="text-xs text-slate-500 text-center py-4">لا توجد سجلات بعد هذه الجلسة</div>
                  ) : (
                    selectedIntegration.logs.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-slate-200">{log.event}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString('ar-EG')}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Main Integrations Grid */
            <div className="space-y-6">
              {/* Quick Status Bar */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-xs">
                    <span className="font-bold text-white">
                      {integrations.filter(i => i.isConnected).length} من أصل {integrations.length} خدمات متصلة وتعمل بكفاءة
                    </span>
                    <p className="text-slate-400 text-[11px]">يتم تشغيل المزامنة الخلفية كل 15 دقيقة مع خوادم API المعتمدة</p>
                  </div>
                </div>

                {onOpenGmailWorkspace && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGmailWorkspace();
                    }}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl border border-rose-400 shadow-md flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    فتح منصة Gmail المباشرة
                  </button>
                )}
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
                  testResult.success
                    ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/70 border border-rose-500/40 text-rose-300'
                }`}>
                  {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{testResult.msg}</span>
                </div>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map(item => (
                  <div
                    key={item.id}
                    className="bg-slate-950 hover:border-slate-700 p-5 rounded-2xl border border-slate-800 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
                            {renderIcon(item.icon)}
                          </div>
                          <div>
                            <h3 className="font-black text-white text-sm">{item.name}</h3>
                            <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          item.isConnected
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {item.isConnected ? 'متصل' : 'غير متصل'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                        {item.description}
                      </p>

                      {item.isConnected && item.connectedAccount && (
                        <div className="text-[11px] text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg font-mono border border-slate-800 truncate">
                          👤 {item.connectedAccount}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedIntegration(item)}
                        className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 text-[11px]"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        الإعدادات والسجلات
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTestConnection(item.id)}
                          disabled={testingId === item.id || !item.isConnected}
                          className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-bold flex items-center gap-1"
                        >
                          <RefreshCw className={`w-3 h-3 ${testingId === item.id ? 'animate-spin' : ''}`} />
                          اختبار
                        </button>

                        <button
                          onClick={() => handleToggleConnect(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                            item.isConnected
                              ? 'bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 border border-slate-700'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                          }`}
                        >
                          {item.isConnected ? 'قطع الاتصال' : 'توصيل'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>جميع بروتوكولات الاتصال محمية بتشفير 256-bit SSL/TLS</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl transition-all"
          >
            إغلاق المركز
          </button>
        </div>
      </div>
    </div>
  );
};
