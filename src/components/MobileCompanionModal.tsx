import React, { useState } from 'react';
import {
  X,
  Smartphone,
  DollarSign,
  TrendingUp,
  Users,
  Bell,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface MobileCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileCompanionModal: React.FC<MobileCompanionModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'notifications' | 'staff'>('dashboard');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-indigo-500/30 shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">تطبيق الموبايل لصاحب المكتب - Mobile Companion App</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                متابعة الإيرادات، الخزينة اليومية وحضور الموظفين مباشرة من الهاتف
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

        {/* Mobile Mockup Simulator View */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950 flex justify-center items-center">
          {/* Phone Frame */}
          <div className="w-[320px] h-[580px] bg-slate-900 rounded-[40px] border-4 border-slate-700 shadow-2xl flex flex-col overflow-hidden relative">
            {/* Phone Notch/Status Bar */}
            <div className="bg-slate-950 p-2 text-[10px] text-slate-400 flex items-center justify-between px-4 font-mono select-none">
              <span>09:41</span>
              <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto" />
              <span>5G 🔋</span>
            </div>

            {/* App Header */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-3 px-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-indigo-300 font-bold block uppercase">Sokar Owner App</span>
                <span className="font-bold text-xs text-white">مكتب خدمات مصر</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* App Body */}
            <div className="p-3 overflow-y-auto flex-1 space-y-3 text-[11px]">
              {/* Stat Cards */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">إيراد اليوم المباشر</span>
                <span className="text-xl font-black text-emerald-400 font-mono">14,250 ج.م</span>
                <span className="text-[9px] text-emerald-300 font-bold block">+18% مقارنة بالأمس</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-bold">رصيد الخزينة</span>
                  <span className="text-sm font-black text-amber-300 font-mono">8,900 ج.م</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-bold">المعاملات</span>
                  <span className="text-sm font-black text-indigo-300 font-mono">42 معاملة</span>
                </div>
              </div>

              {/* Staff Attendance Mini Log */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-200 block text-[10px]">سجل حضور الموظفين بالشبابيك:</span>
                {[
                  { name: 'أحمد محمود (شباك 1)', status: 'حاضر (08:30)' },
                  { name: 'سارة طارق (شباك 2)', status: 'حاضر (08:45)' }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] bg-slate-900 p-2 rounded-lg">
                    <span className="font-bold text-slate-300">{s.name}</span>
                    <span className="text-emerald-400 font-mono">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Bottom Nav Bar */}
            <div className="bg-slate-950 p-2 border-t border-slate-800 flex justify-around text-[10px] text-slate-400">
              <button className="text-indigo-400 font-bold">الرئيسية</button>
              <button className="hover:text-white">التقارير</button>
              <button className="hover:text-white">التنبيهات</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
