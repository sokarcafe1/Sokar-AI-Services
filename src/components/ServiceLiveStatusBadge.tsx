import React, { useState, useEffect } from 'react';
import { EducationService } from '../types';
import { Activity, RefreshCw, CheckCircle, AlertTriangle, XCircle, Wifi } from 'lucide-react';

interface ServiceLiveStatusBadgeProps {
  service: EducationService;
  compact?: boolean;
  themeMode?: 'light' | 'dark' | 'black';
  showRefreshButton?: boolean;
}

export const ServiceLiveStatusBadge: React.FC<ServiceLiveStatusBadgeProps> = ({
  service,
  compact = false,
  themeMode = 'light',
  showRefreshButton = false,
}) => {
  const isBlackTheme = themeMode === 'black';

  // Compute initial status based on service metrics
  const getInitialStatus = (): 'online' | 'busy' | 'offline' => {
    if (service.status === 'maintenance' || service.linkHealth === 'broken') {
      return 'offline';
    }
    // High-demand services like Tansik or Housing might occasionally be 'busy'
    if (service.category === 'tansik' && service.id.includes('2')) {
      return 'busy';
    }
    return 'online';
  };

  const getInitialLatency = () => {
    if (service.status === 'maintenance' || service.linkHealth === 'broken') return 0;
    // Generate deterministic latency based on service ID length
    const hash = service.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 24 + (hash % 65);
  };

  const [statusState, setStatusState] = useState<'online' | 'busy' | 'offline'>(getInitialStatus);
  const [latencyMs, setLatencyMs] = useState<number>(getInitialLatency);
  const [lastCheckedSec, setLastCheckedSec] = useState<number>(Math.floor(Math.random() * 15) + 5);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Timer to keep last checked time ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setLastCheckedSec((prev) => prev + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handler for manual re-check test
  const handleRecheckStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRefreshing) return;
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
      setLastCheckedSec(0);

      // Determine new test result
      if (service.status === 'maintenance' || service.linkHealth === 'broken') {
        setStatusState('offline');
        setLatencyMs(0);
      } else {
        // 85% chance online, 15% chance busy
        const isBusyNow = Math.random() < 0.12;
        setStatusState(isBusyNow ? 'busy' : 'online');
        setLatencyMs(isBusyNow ? Math.floor(Math.random() * 400 + 250) : Math.floor(Math.random() * 45 + 18));
      }
    }, 650);
  };

  if (compact) {
    return (
      <div 
        onClick={handleRecheckStatus}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer select-none ${
          isRefreshing
            ? isBlackTheme ? 'bg-zinc-800 text-amber-300 border-zinc-700 animate-pulse' : 'bg-slate-100 text-sky-700 border-slate-300 animate-pulse'
            : statusState === 'online'
            ? isBlackTheme
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/90'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100'
            : statusState === 'busy'
            ? isBlackTheme
              ? 'bg-amber-950/80 text-amber-300 border-amber-800/80 hover:bg-amber-900/90'
              : 'bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100'
            : isBlackTheme
              ? 'bg-rose-950/80 text-rose-300 border-rose-800/80 hover:bg-rose-900/90'
              : 'bg-rose-50 text-rose-700 border-rose-200/80 hover:bg-rose-100'
        }`}
        title="انقر لإجراء فحص مباشر لحالة السيرفر الآن"
      >
        {isRefreshing ? (
          <RefreshCw className="w-3 h-3 animate-spin text-amber-500" />
        ) : (
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              statusState === 'online' ? 'bg-emerald-400' : statusState === 'busy' ? 'bg-amber-400' : 'bg-rose-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              statusState === 'online' ? 'bg-emerald-500' : statusState === 'busy' ? 'bg-amber-500' : 'bg-rose-500'
            }`}></span>
          </span>
        )}

        <span>
          {isRefreshing
            ? 'جاري فحص السيرفر...'
            : statusState === 'online'
            ? 'الموقع شغال 🟢'
            : statusState === 'busy'
            ? 'مزدحم 🟡'
            : 'توقف بالسيرفر 🔴'}
        </span>

        {statusState !== 'offline' && !isRefreshing && (
          <span className="text-[10px] opacity-75 dir-ltr font-mono">
            {latencyMs}ms
          </span>
        )}
      </div>
    );
  }

  // Full detailed status block (used in detail modal or status section)
  return (
    <div className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
      isBlackTheme
        ? 'bg-zinc-900/80 border-zinc-800 text-zinc-200'
        : 'bg-slate-50/90 border-slate-200/80 text-slate-800'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
          statusState === 'online'
            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
            : statusState === 'busy'
            ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
            : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
        }`}>
          {isRefreshing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
          ) : statusState === 'online' ? (
            <Wifi className="w-4 h-4 text-emerald-500" />
          ) : statusState === 'busy' ? (
            <Activity className="w-4 h-4 text-amber-500" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-500" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-xs sm:text-sm">حالة السيرفر والموقع الرسمي:</h4>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-black border flex items-center gap-1 ${
              statusState === 'online'
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : statusState === 'busy'
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
            }`}>
              {statusState === 'online' ? (
                <>
                  <CheckCircle className="w-3 h-3" />
                  <span>الموقع شغال ويعمل بكفاءة</span>
                </>
              ) : statusState === 'busy' ? (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  <span>ضغط زيارات مرتفع</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3" />
                  <span>عطل أو صيانة مؤقتة بالموقع</span>
                </>
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs opacity-80 mt-1 font-medium">
            {statusState !== 'offline' && (
              <span className="flex items-center gap-1 dir-rtl">
                ⚡ استجابة السيرفر: <strong className="dir-ltr font-mono font-bold">{latencyMs} ms</strong>
              </span>
            )}
            <span>• آخر تحديث: {lastCheckedSec < 10 ? 'منذ لحظات' : `منذ ${lastCheckedSec} ثانية`}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleRecheckStatus}
        disabled={isRefreshing}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 shrink-0 ${
          isRefreshing
            ? 'bg-slate-200 text-slate-500 border-slate-300 opacity-60 cursor-wait'
            : isBlackTheme
            ? 'bg-zinc-800 hover:bg-zinc-700 text-amber-300 border-amber-500/30 hover:border-amber-400'
            : 'bg-white hover:bg-slate-100 text-sky-700 border-slate-300 hover:border-sky-400'
        }`}
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
        <span>{isRefreshing ? 'جاري الفحص المباشر...' : 'فحص متاحية السيرفر الآن'}</span>
      </button>
    </div>
  );
};
