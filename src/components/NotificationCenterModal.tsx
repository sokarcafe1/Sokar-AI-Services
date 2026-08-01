import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  CreditCard,
  WifiOff,
  UserCheck,
  Mail,
  MessageSquare,
  HardDrive,
  Trash2,
  Check
} from 'lucide-react';
import {
  getDefaultNotifications,
  markAllNotificationsAsRead,
  clearNotifications,
  SystemNotification
} from '../services/notificationsService';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  useEffect(() => {
    if (isOpen) {
      setNotifications(getDefaultNotifications());
    }
  }, [isOpen]);

  const handleMarkAllRead = () => {
    setNotifications(markAllNotificationsAsRead());
  };

  const handleClearAll = () => {
    setNotifications(clearNotifications());
  };

  const renderNotifIcon = (type: SystemNotification['type']) => {
    switch (type) {
      case 'CLIENT': return <UserPlus className="w-5 h-5 text-sky-400" />;
      case 'PAYMENT': return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'GOV_LINK': return <WifiOff className="w-5 h-5 text-amber-400" />;
      case 'EMPLOYEE': return <UserCheck className="w-5 h-5 text-indigo-400" />;
      case 'GMAIL': return <Mail className="w-5 h-5 text-rose-400" />;
      case 'WHATSAPP': return <MessageSquare className="w-5 h-5 text-teal-400" />;
      case 'SUBSCRIPTION': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'BACKUP_FAIL': return <HardDrive className="w-5 h-5 text-red-400" />;
      default: return <Bell className="w-5 h-5 text-purple-400" />;
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl shadow-lg relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز الإشعارات والتنبيهات المباشرة</h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live Feed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تتبع العمليات، التحويلات المالية، حالة الوصلات الحكومية والرسائل
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

        {/* Action Toolbar */}
        <div className="bg-slate-950/60 p-3 px-6 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-bold">
            إجمالي التنبيهات: <strong className="text-white">{notifications.length}</strong> ({unreadCount} غير مقروء)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              تحديد الكل كمقروء
            </button>
            <button
              onClick={handleClearAll}
              className="bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              مسح الكل
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <Bell className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-sm font-bold">لا توجد إشعارات جديدة حالياً.</p>
            </div>
          ) : (
            notifications.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 text-xs ${
                  item.read
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                    : 'bg-slate-950 border-rose-500/30 shadow-md text-white'
                }`}
              >
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
                  {renderNotifIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-sm text-slate-100 flex items-center gap-2">
                      <span>{item.title}</span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      )}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleTimeString('ar-EG')}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>يتم الحفظ والمزامنة تلقائياً مع خادم الإشعارات المباشر</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
