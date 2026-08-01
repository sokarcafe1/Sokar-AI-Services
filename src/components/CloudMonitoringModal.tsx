import React, { useState } from 'react';
import {
  X,
  Server,
  Activity,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  Clock,
  Building,
  Users,
  Database,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface OfficeNode {
  id: string;
  name: string;
  subdomain: string;
  isOnline: boolean;
  lastSyncAt: string;
  lastBackupStatus: 'SUCCESS' | 'PENDING';
  activeStaffCount: number;
  todayRequestsCount: number;
}

interface CloudMonitoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudMonitoringModal: React.FC<CloudMonitoringModalProps> = ({
  isOpen,
  onClose
}) => {
  const [nodes, setNodes] = useState<OfficeNode[]>([
    {
      id: 'node-1',
      name: 'مكتب القاهرة الرئيسي - مجمع التحرير',
      subdomain: 'cairo-main',
      isOnline: true,
      lastSyncAt: 'منذ دقيقة واحدة',
      lastBackupStatus: 'SUCCESS',
      activeStaffCount: 8,
      todayRequestsCount: 142
    },
    {
      id: 'node-2',
      name: 'مكتب الجيزة - شارع الهرم',
      subdomain: 'giza-pyramids',
      isOnline: true,
      lastSyncAt: 'منذ 3 دقائق',
      lastBackupStatus: 'SUCCESS',
      activeStaffCount: 5,
      todayRequestsCount: 98
    },
    {
      id: 'node-3',
      name: 'مكتب الإسكندرية - محطة الرمل',
      subdomain: 'alex-station',
      isOnline: true,
      lastSyncAt: 'منذ 5 دقائق',
      lastBackupStatus: 'SUCCESS',
      activeStaffCount: 4,
      todayRequestsCount: 65
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleManualSyncCheck = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setNodes(prev => prev.map(n => ({ ...n, lastSyncAt: 'الآن' })));
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-indigo-500/30 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl shadow-lg">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">سحابة المراقبة المباشرة للمكاتب - Cloud Monitoring</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  All Systems Operational
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تتبع حالة الاتصال والمزامنة، النسخ الاحتياطي ونشاط الموظفين عبر جميع الفروع
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

        {/* Global Stats bar */}
        <div className="bg-slate-950/70 p-4 border-b border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-bold">الفروع المتصلة بالشبكة</span>
            <span className="text-lg font-black text-emerald-400 font-mono">3 / 3 Online 🟢</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-bold">إجمالي معاملات اليوم</span>
            <span className="text-lg font-black text-indigo-400 font-mono">305 معاملة</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-bold">حالة النسخ الاحتياطي</span>
            <span className="text-lg font-black text-amber-400 font-mono">مكتمل ومستقر</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">الخادم الرئيسي</span>
              <span className="text-xs font-black text-slate-200 font-mono">Ping: 18ms</span>
            </div>
            <button
              onClick={handleManualSyncCheck}
              disabled={isRefreshing}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Nodes List */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-4 text-xs">
          <h3 className="font-bold text-white text-sm">مراكز المراقبة والمستأجرين المتصلين:</h3>

          <div className="space-y-3">
            {nodes.map(node => (
              <div key={node.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="font-bold text-white text-sm">{node.name}</h4>
                    <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {node.subdomain}.sokar-cloud.eg
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-4 pt-1">
                    <span>آخر مزامنة: <strong className="text-slate-200 font-mono">{node.lastSyncAt}</strong></span>
                    <span>الموظفون النشطون: <strong className="text-indigo-400 font-mono">{node.activeStaffCount} موظف</strong></span>
                    <span>المعاملات: <strong className="text-emerald-400 font-mono">{node.todayRequestsCount}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-xl text-[10px] border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>النسخ الاحتياطي: ناجح 🟢</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>يتم تحديث المؤشرات تلقائياً كل 30 ثانية</span>
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
