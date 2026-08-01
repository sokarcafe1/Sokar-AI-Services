// Notification Center Service for Sokar Office OS

export interface SystemNotification {
  id: string;
  type: 'CLIENT' | 'SUBSCRIPTION' | 'PAYMENT' | 'GOV_LINK' | 'EMPLOYEE' | 'GMAIL' | 'WHATSAPP' | 'BACKUP_FAIL';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  actionUrl?: string;
}

const NOTIFICATIONS_KEY = 'sokar_system_notifications';

export const getDefaultNotifications = (): SystemNotification[] => {
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }

  const defaults: SystemNotification[] = [
    {
      id: 'notif-1',
      type: 'PAYMENT',
      title: 'دفعة جديدة استُلمت عبر إنستا باي',
      description: 'قام العميل "أحمد محمود علي" بسداد مبلغ 350 ج.م لحساب معاملة جواز السفر المميكن.',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      read: false,
      priority: 'HIGH'
    },
    {
      id: 'notif-2',
      type: 'GMAIL',
      title: 'رسالة بريد جديدة من مصلحة الجوازات',
      description: 'تم تلقي إشعار رسمي بضرورة تقديم شهادة التجنيد الأصلية للمعاملة #REG-901.',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      read: false,
      priority: 'HIGH'
    },
    {
      id: 'notif-3',
      type: 'GOV_LINK',
      title: 'تنبيه: عطل مؤقت في بوابة السجل التجاري',
      description: 'تظهر استجابة بطيئة في خوادم مصر الرقمية أثناء استخراج القيد الفردي.',
      timestamp: new Date(Date.now() - 40 * 60000).toISOString(),
      read: false,
      priority: 'MEDIUM'
    },
    {
      id: 'notif-4',
      type: 'CLIENT',
      title: 'تسجيل عميل جديد بالقاعدة',
      description: 'تم إضافة العميل "سارة إبراهيم الشريف" - رقم القومي: 29801011200391.',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      read: true,
      priority: 'LOW'
    },
    {
      id: 'notif-5',
      type: 'EMPLOYEE',
      title: 'تسجيل دخول موظف الاستقبال',
      description: 'قام الموظف "محمد علي" بتسجيل الدخول إلى الجهاز رقم #02 بالشفت الصباحي.',
      timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
      read: true,
      priority: 'LOW'
    },
    {
      id: 'notif-6',
      type: 'WHATSAPP',
      title: 'تم تسليم إشعار الواتساب بنجاح',
      description: 'تم إرسال إيصال السداد الإلكتروني ورابط تتبع الطلب للعميل عبر الواتساب.',
      timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
      read: true,
      priority: 'LOW'
    },
    {
      id: 'notif-7',
      type: 'SUBSCRIPTION',
      title: 'تنبيه اشتراك المكتب القريب من الانتهاء',
      description: 'متبقى 3 أيام على انتهاء اشتراك سيرفر السحابة السنوية لمكتبك.',
      timestamp: new Date(Date.now() - 360 * 60000).toISOString(),
      read: false,
      priority: 'HIGH'
    },
    {
      id: 'notif-8',
      type: 'BACKUP_FAIL',
      title: 'تنبيه: فشل جزئي في النسخ الاحتياطي اليدوي',
      description: 'تعذر الاتصال بخادم الأرشيف الثانوي بسبب انقطاع مؤقت بالشبكة (تمت إعادة المحاولة تلقائياً).',
      timestamp: new Date(Date.now() - 720 * 60000).toISOString(),
      read: true,
      priority: 'MEDIUM'
    }
  ];

  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(defaults));
  return defaults;
};

export const saveNotifications = (notifs: SystemNotification[]) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
};

export const markAllNotificationsAsRead = (): SystemNotification[] => {
  const list = getDefaultNotifications();
  const updated = list.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
  return updated;
};

export const clearNotifications = (): SystemNotification[] => {
  saveNotifications([]);
  return [];
};
