import React, { useState } from 'react';
import { 
  ShieldCheck, RefreshCw, Globe, CheckCircle2, AlertTriangle, 
  XCircle, Clock, Lock, Server, Code, FileText, ArrowLeft, ExternalLink, Activity, Search
} from 'lucide-react';

export interface LiveVerificationDetail {
  url: string;
  httpStatus: number;
  sslValid: boolean;
  responseTimeMs: number;
  health: 'working' | 'needs_review' | 'broken';
  redirectDetected: boolean;
  redirectChain?: string[];
  lastModifiedHeader: string | null;
  etagHeader: string | null;
  rawHeaders: Record<string, string>;
  checkedAt: string;
  isOfficialDomain: boolean;
  verificationSource: string;
  errorMessage?: string;
}

const DEFAULT_OFFICIAL_TARGETS = [
  { name: 'بوابة مصر الرقمية الرسمية', url: 'https://digital.gov.eg' },
  { name: 'وزارة التربية والتعليم والتعليم الفني', url: 'https://moe.gov.eg' },
  { name: 'منصة التقديم الإلكتروني للرياض والأول الابتدائي', url: 'https://parent.emis.gov.eg' },
  { name: 'بوابة التنسيق الإلكتروني - وزارة التعليم العالي', url: 'https://tansik.digital.gov.eg' },
  { name: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري', url: 'https://shmff.gov.eg' },
  { name: 'بوابة الوظائف الحكومية - الجهاز المركزي للتنظيم والإدارة', url: 'https://jobs.caoa.gov.eg' },
  { name: 'إدارة التجنيد والتعبئة - القوات المسلحة المصرية', url: 'https://tagned.mod.gov.eg' },
  { name: 'مرور مصر - وزارة الداخلية', url: 'https://traffic.moi.gov.eg' },
  { name: 'مصلحة الأحوال المدنية - وزارة الداخلية', url: 'https://cso.moi.gov.eg' },
  { name: 'موقع التمويل والدعم التمويني', url: 'https://tamwin.com.eg' }
];

interface LiveVerificationTestPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveVerificationTestPage: React.FC<LiveVerificationTestPageProps> = ({ isOpen, onClose }) => {
  const [customUrl, setCustomUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'working' | 'issues'>('all');
  const [results, setResults] = useState<LiveVerificationDetail[]>([]);
  const [selectedResultForHeaders, setSelectedResultForHeaders] = useState<LiveVerificationDetail | null>(null);
  const [lastScannedAt, setLastScannedAt] = useState<string | null>(null);
  const [scanSummary, setScanSummary] = useState<{ total: number; working: number; issues: number; avgLatency: number } | null>(null);

  if (!isOpen) return null;

  // Real HTTP execution trigger via Node.js backend
  const handleRunLiveVerification = async (targetUrls?: string[]) => {
    setLoading(true);
    setSelectedResultForHeaders(null);

    const urlsToTest = targetUrls || DEFAULT_OFFICIAL_TARGETS.map(t => t.url);
    
    try {
      const res = await fetch('/api/sync-official', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: urlsToTest,
          verifiedBy: 'المحرك الآلي المباشر للتحقق عبر Node HTTP Response'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
        setLastScannedAt(data.timestamp || new Date().toLocaleString('ar-EG'));
        setScanSummary({
          total: data.totalChecked || 0,
          working: data.workingCount || 0,
          issues: (data.needsReviewCount || 0) + (data.brokenCount || 0),
          avgLatency: data.averageResponseTimeMs || 0
        });
      } else {
        alert('حدث خطأ أثناء إجراء الفحص الحي عبر الخادم');
      }
    } catch (err) {
      console.error('Error fetching live verification:', err);
      alert('فشل الاتصال بخادم المزامنة الحي');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCustomUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    let urlToFetch = customUrl.trim();
    if (!urlToFetch.startsWith('http')) {
      urlToFetch = 'https://' + urlToFetch;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/verify-link?url=${encodeURIComponent(urlToFetch)}`);
      if (res.ok) {
        const detail: LiveVerificationDetail = await res.json();
        setResults(prev => [detail, ...prev.filter(r => r.url !== detail.url)]);
        setSelectedResultForHeaders(detail);
      } else {
        alert('فشل الفحص الحي للرابط المرفق');
      }
    } catch (err) {
      alert('تعذر الاتصال بخادم الفحص');
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter(r => {
    if (activeTab === 'working') return r.health === 'working';
    if (activeTab === 'issues') return r.health !== 'working';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto dir-rtl">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-6xl text-white shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-amber-300">صفحة الاختبار والتحقق الحي للروابط الحكومية</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  بدون بيانات مؤقتة (No Cache / Real HTTP)
                </span>
              </div>
              <p className="text-xs text-slate-400">فحص كود الاستجابة ورؤوس HTTP وتشفير SSL وعناوين إعادة التوجيه مباشرة من خوادم الوزارات</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Custom URL Probe */}
        <div className="p-6 bg-slate-950/50 border-b border-slate-800 space-y-4 shrink-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Custom URL Tester Form */}
            <form onSubmit={handleVerifyCustomUrl} className="flex items-center gap-2 w-full md:w-auto flex-grow max-w-xl">
              <div className="relative flex-grow">
                <Globe className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="أدخل رابط خادم حكومي للاختبار الحي المباشر (مثال: https://digital.gov.eg)"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-xl pr-9 pl-3 py-2.5 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !customUrl.trim()}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>فحص الرابط</span>
              </button>
            </form>

            {/* Global Real HTTP Fetch Execution */}
            <button
              onClick={() => handleRunLiveVerification()}
              disabled={loading}
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>مزامنة وفحص حي الآن (Verify Now)</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          {scanSummary && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">إجمالي الروابط التي تم فحصها:</span>
                <span className="text-xl font-black text-white">{scanSummary.total} موقِع رسمي</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">روابط تعمل بكفاءة (200 OK):</span>
                <span className="text-xl font-black text-emerald-400">{scanSummary.working} موقِع</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">تحتاج مراجعة / متوقفة:</span>
                <span className="text-xl font-black text-amber-400">{scanSummary.issues} رابط</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">متوسط زَمَن الاستجابة الحقيقي:</span>
                <span className="text-xl font-black text-cyan-400">{scanSummary.avgLatency} ms</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          
          {results.length === 0 && !loading && (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-amber-400 border border-slate-700">
                <Server className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-200">لم يتم تشغيل الفحص الحي بعد</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">اضغط على زر "مزامنة وفحص حي الآن" لإرسال طلَبات HTTP حقيقية من الخادم وإظهار النتاَئِج المباشرة بدون أي تخزين مؤقت.</p>
              <button
                onClick={() => handleRunLiveVerification()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all"
              >
                بدء الفحص المباشر الآن ⚡
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-16 space-y-3">
              <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-200">جاري إرسال الطلبات المباشرة إلى خوادم الوزارات والجهات الحكومية...</p>
              <p className="text-xs text-slate-400">فحص SSL + HTTP Status + Response Time + Headers</p>
            </div>
          )}

          {results.length > 0 && !loading && (
            <div className="space-y-4">
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  الكل ({results.length})
                </button>
                <button
                  onClick={() => setActiveTab('working')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'working' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  🟢 تعمل (200 OK) ({results.filter(r => r.health === 'working').length})
                </button>
                <button
                  onClick={() => setActiveTab('issues')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'issues' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  🟡 مشاكل / مراجعة ({results.filter(r => r.health !== 'working').length})
                </button>
              </div>

              {/* Verified Links Grid */}
              <div className="grid grid-cols-1 gap-4">
                {filteredResults.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-4 hover:border-slate-500 transition-all">
                    
                    {/* Top Row: URL & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-white font-mono break-all">{item.url}</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-amber-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span>الجهة: {item.verificationSource}</span>
                          <span>•</span>
                          <span className="text-slate-400 font-mono">تاريخ الفحص: {item.checkedAt}</span>
                        </div>
                      </div>

                      {/* Health Badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        {item.health === 'working' ? (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            🟢 يعمل (200 OK)
                          </span>
                        ) : item.health === 'needs_review' ? (
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" />
                            🟡 يحتاج مراجعة (Status {item.httpStatus})
                          </span>
                        ) : (
                          <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5">
                            <XCircle className="w-4 h-4" />
                            🔴 غير متاح ({item.httpStatus})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inspection Details Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                      
                      {/* HTTP Status Code */}
                      <div>
                        <span className="text-slate-400 block text-[10px]">كود حالة HTTP:</span>
                        <span className="font-mono font-bold text-amber-300">{item.httpStatus}</span>
                      </div>

                      {/* SSL Status */}
                      <div>
                        <span className="text-slate-400 block text-[10px]">شهادة الأمان SSL:</span>
                        <span className={`font-bold flex items-center gap-1 ${item.sslValid ? 'text-emerald-400' : 'text-red-400'}`}>
                          <Lock className="w-3 h-3" />
                          {item.sslValid ? 'سارية وأمنة (HTTPS)' : 'غير مشفرة (HTTP)'}
                        </span>
                      </div>

                      {/* Response Time */}
                      <div>
                        <span className="text-slate-400 block text-[10px]">زمن الاستجابة الحقيقي:</span>
                        <span className="font-mono font-bold text-cyan-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {item.responseTimeMs} ms
                        </span>
                      </div>

                      {/* Redirect Detected */}
                      <div>
                        <span className="text-slate-400 block text-[10px]">إعادة التوجيه (Redirect):</span>
                        <span className="font-bold text-slate-300">
                          {item.redirectDetected ? '⚠️ يوجد توجيه تلقائي' : 'مباشر (No Redirect)'}
                        </span>
                      </div>
                    </div>

                    {/* Headers & Additional Metas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-slate-400 font-bold block">ترويسة Last-Modified:</span>
                        <span className="text-slate-200 font-mono text-[11px] block break-all">
                          {item.lastModifiedHeader || 'غير منشورة في الترويسة (N/A)'}
                        </span>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-slate-400 font-bold block">ترويسة ETag Validation:</span>
                        <span className="text-slate-200 font-mono text-[11px] block break-all">
                          {item.etagHeader || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Redirect Chain View */}
                    {item.redirectChain && item.redirectChain.length > 0 && (
                      <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl space-y-1 text-xs">
                        <span className="text-amber-300 font-bold block">سلسلة إعادة التوجيه (Redirect Chain):</span>
                        {item.redirectChain.map((chainUrl, cIdx) => (
                          <div key={cIdx} className="font-mono text-[11px] text-amber-200/80 flex items-center gap-2">
                            <span>➡️ step {cIdx + 1}:</span>
                            <span className="break-all">{chainUrl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Exact Error View */}
                    {item.errorMessage && (
                      <div className="bg-red-950/40 border border-red-800/50 p-3 rounded-xl text-xs space-y-1 text-red-300">
                        <span className="font-bold block">سبب العطل التفصيلي من الخادم:</span>
                        <p className="font-mono text-[11px]">{item.errorMessage}</p>
                      </div>
                    )}

                    {/* Raw HTTP Headers Toggle Button */}
                    <div className="pt-1 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedResultForHeaders(selectedResultForHeaders?.url === item.url ? null : item)}
                        className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>{selectedResultForHeaders?.url === item.url ? 'إخفاء رؤوس HTTP المباشرة' : 'عرض رؤوس HTTP المباشرة (Raw Response Headers)'}</span>
                      </button>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.isOfficialDomain ? 'نطاق حكومي رسمي موثق ✅' : 'نطاق مخصص'}
                      </span>
                    </div>

                    {/* Raw Response Headers Drawer */}
                    {selectedResultForHeaders?.url === item.url && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-700 space-y-2 font-mono text-xs dir-ltr text-slate-300">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-amber-400 font-sans font-bold">
                          <span>Raw HTTP Response Headers for {item.url}</span>
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{Object.keys(item.rawHeaders || {}).length} Headers</span>
                        </div>
                        <div className="max-h-52 overflow-y-auto space-y-1 text-[11px]">
                          {Object.keys(item.rawHeaders || {}).length > 0 ? (
                            Object.entries(item.rawHeaders).map(([k, v], hIdx) => (
                              <div key={hIdx} className="flex gap-2">
                                <span className="text-cyan-400 font-semibold">{k}:</span>
                                <span className="text-slate-200 break-all">{v}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-slate-500 italic">No header values available or request failed.</span>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>نظام المزامنة والتحقق المباشر من البوابات الرسمية © 2026 - جمهورية مصر العربية</span>
          {lastScannedAt && <span>آخر تحديث مباشر: {lastScannedAt}</span>}
        </div>

      </div>
    </div>
  );
};
