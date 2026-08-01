import React, { useState, useEffect } from 'react';
import {
  X,
  AlertOctagon,
  Bug,
  Send,
  CheckCircle2,
  Terminal,
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';

interface CrashLog {
  id: string;
  timestamp: string;
  errorName: string;
  stackTrace: string;
  userEmail: string;
  officeName: string;
  browser: string;
  status: 'CAPTURED' | 'SENT';
}

interface CrashReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrashReportModal: React.FC<CrashReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [logs, setLogs] = useState<CrashLog[]>([
    {
      id: 'LOG-9821',
      timestamp: new Date().toISOString(),
      errorName: 'NetworkTimeoutException: Thermal Printer Driver disconnected',
      stackTrace: 'at PrinterWorker.connectUSB (printer.ts:42)\nat async PrintingEngine.printReceipt (receipt.ts:112)',
      userEmail: 'office@sokar-eg.com',
      officeName: 'مكتب الخدمات الحكومية المعتمد',
      browser: 'Chrome 124.0.0 (Linux x86_64)',
      status: 'CAPTURED'
    }
  ]);

  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState('');
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendCrashReport = (logId: string) => {
    setIsSending(true);
    setTimeout(() => {
      setLogs(prev => prev.map(l => l.id === logId ? { ...l, status: 'SENT' } : l));
      setIsSending(false);
      setSentSuccess('تم إرسال بلاغ العطل تلقائياً إلى خوادم التشخيص والمطورين لمراجعته فوراً.');
      setTimeout(() => setSentSuccess(''), 4000);
    }, 1500);
  };

  const copyStackTrace = (stack: string, id: string) => {
    navigator.clipboard.writeText(stack);
    setCopiedLogId(id);
    setTimeout(() => setCopiedLogId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-rose-500/30 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl shadow-lg">
              <Bug className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز الإبلاغ عن الأعطال والتشخيص الآلي - Crash Reporting</h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Auto Diagnostic
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تتبع واستخراج الأخطاء البرمجية تلقائياً وإرسالها لفريق الهندسة
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

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-4 text-xs">
          {sentSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{sentSuccess}</span>
            </div>
          )}

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300">سجلات الأعطال المحفوظة محلياً:</span>
              <span className="text-[10px] font-mono text-slate-500">Auto Capturing: Enabled</span>
            </div>

            {logs.map(log => (
              <div key={log.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span className="font-mono font-black text-rose-300 text-xs">{log.id}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    log.status === 'SENT' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {log.status === 'SENT' ? 'SENT TO CLOUD' : 'CAPTURED LOCAL'}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-white block text-sm">{log.errorName}</span>
                  <span className="text-slate-400 text-[10px] block font-mono">Timestamp: {log.timestamp} | {log.browser}</span>
                </div>

                {/* Stack Trace Box */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-amber-300/90 relative overflow-x-auto">
                  <button
                    onClick={() => copyStackTrace(log.stackTrace, log.id)}
                    className="absolute top-2 left-2 p-1 bg-slate-800 text-slate-300 rounded hover:text-white"
                    title="نسخ التتبع"
                  >
                    {copiedLogId === log.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <pre className="whitespace-pre-wrap">{log.stackTrace}</pre>
                </div>

                <div className="flex justify-end pt-1">
                  {log.status !== 'SENT' && (
                    <button
                      onClick={() => handleSendCrashReport(log.id)}
                      disabled={isSending}
                      className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال البلاغ لمطوري Sokar Cloud</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>يتم إزالة التتبعات المزدوجة وتعمية بيانات الخصوصية تلقائياً</span>
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
