import React from 'react';
import { ShieldCheck, Monitor, Smartphone, Clock, MapPin, LogOut, X, AlertTriangle, Key } from 'lucide-react';
import { AuthSession } from '../../types/auth';

interface SessionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: AuthSession;
  onLogout: () => void;
  onLogoutAllDevices: () => void;
}

export const SessionManagerModal: React.FC<SessionManagerModalProps> = ({
  isOpen,
  onClose,
  session,
  onLogout,
  onLogoutAllDevices,
}) => {
  if (!isOpen || !session) return null;

  const user = session.user;
  const expiresDate = new Date(session.expiresAt).toLocaleString('ar-EG');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/80 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">إدارة الجلسات والأجهزة النشطة</h3>
              <p className="text-[11px] text-emerald-300">مراقبة الاتصالات الآمنة وجلسات التوثيق</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* User Badge */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 bg-slate-800 rounded-xl">{user.avatarEmoji || '👤'}</span>
              <div>
                <p className="font-bold text-sm text-white">{user.fullName}</p>
                <p className="text-xs text-emerald-400 font-semibold">{user.roleTitleAr}</p>
                <p className="text-[11px] text-slate-400">{user.email}</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 border border-emerald-600 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
              نشط الآن
            </span>
          </div>

          {/* Session Token Info */}
          <div className="space-y-1 text-xs text-slate-300 bg-slate-950/40 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> انتهاء صلاحية الجلسة:
              </span>
              <strong className="font-mono text-emerald-400">{expiresDate}</strong>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-amber-400" /> الرمز المشفر (JWT Token):
              </span>
              <strong className="font-mono text-[10px] text-slate-400 truncate max-w-[180px]">
                {session.token}
              </strong>
            </div>
          </div>

          {/* Active Devices List */}
          <div>
            <h4 className="font-bold text-xs text-slate-200 mb-2 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-sky-400" /> الأجهزة والاتصالات النشطة بحسابك ({session.activeSessions.length}):
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {session.activeSessions.map((dev) => (
                <div
                  key={dev.id}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                    dev.isCurrent
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {dev.device.includes('Mobile') ? (
                      <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Monitor className="w-4 h-4 text-sky-400 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold flex items-center gap-2">
                        <span>{dev.device}</span>
                        {dev.isCurrent && (
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">
                            الجهاز الحالي
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{dev.ip}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-rose-400" /> {dev.location}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium">{dev.lastActive}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2 border-t border-slate-800">
            <button
              onClick={() => {
                onLogoutAllDevices();
                onClose();
              }}
              className="flex-1 bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-200 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>إنهاء الجلسات من كافة الأجهزة</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>تسجيل الخروج الحالي</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
