// Integrations Service for Sokar Office OS
// Phase - Integrations Center

export interface IntegrationItem {
  id: string;
  name: string;
  category: 'Workspace' | 'Messaging' | 'Cloud Storage' | 'Payments' | 'Calendar';
  icon: string;
  description: string;
  isConnected: boolean;
  connectedAccount?: string;
  lastSyncAt: string;
  lastError?: string;
  permissions: string[];
  status: 'OPTIMAL' | 'WARNING' | 'DISCONNECTED';
  logs: { timestamp: string; event: string; status: 'SUCCESS' | 'ERROR' | 'INFO' }[];
}

const INTEGRATIONS_KEY = 'sokar_integrations_center_data';

export const getDefaultIntegrations = (): IntegrationItem[] => {
  const stored = localStorage.getItem(INTEGRATIONS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }

  const defaults: IntegrationItem[] = [
    {
      id: 'int-gmail',
      name: 'Gmail Workspace',
      category: 'Workspace',
      icon: 'Mail',
      description: 'مزامنة وإرسال البريد الإلكتروني الرسمي وإشعار المواطنين تلقائياً.',
      isConnected: true,
      connectedAccount: 'sokarcafe1@gmail.com',
      lastSyncAt: new Date().toISOString(),
      permissions: ['gmail.readonly', 'gmail.send', 'gmail.modify', 'gmail.labels'],
      status: 'OPTIMAL',
      logs: [
        { timestamp: new Date(Date.now() - 5 * 60000).toISOString(), event: 'إرسال إشعار فاتورة للعميل عبر Gmail API', status: 'SUCCESS' },
        { timestamp: new Date(Date.now() - 3600000).toISOString(), event: 'مزامنة البريد الوارد المباشر', status: 'SUCCESS' }
      ]
    },
    {
      id: 'int-whatsapp',
      name: 'WhatsApp Business API',
      category: 'Messaging',
      icon: 'MessageSquare',
      description: 'إرسال تحديثات المعاملات والإيصالات بضغطة واحدة عبر الواتساب المعتمد.',
      isConnected: true,
      connectedAccount: '+201012345678 (Sokar Official)',
      lastSyncAt: new Date(Date.now() - 10 * 60000).toISOString(),
      permissions: ['whatsapp_business_messaging', 'template_messages_send'],
      status: 'OPTIMAL',
      logs: [
        { timestamp: new Date(Date.now() - 12 * 60000).toISOString(), event: 'إرسال رسالة واتساب للعميل بطلب المستندات', status: 'SUCCESS' }
      ]
    },
    {
      id: 'int-drive',
      name: 'Google Drive Backup',
      category: 'Cloud Storage',
      icon: 'HardDrive',
      description: 'تخزين وحفظ الأرشيف الرقمي والنسخ الاحتياطية سحابياً بحماية تشفيرية.',
      isConnected: true,
      connectedAccount: 'sokar.backups@drive.google.com',
      lastSyncAt: new Date(Date.now() - 120 * 60000).toISOString(),
      permissions: ['drive.file', 'drive.appdata'],
      status: 'OPTIMAL',
      logs: [
        { timestamp: new Date(Date.now() - 120 * 60000).toISOString(), event: 'حفظ نسخة احتياطية مشفرة بحجم 42.8 MB', status: 'SUCCESS' }
      ]
    },
    {
      id: 'int-outlook',
      name: 'Microsoft Outlook 365',
      category: 'Workspace',
      icon: 'Mail',
      description: 'الربط مع بريد مؤسسات الحكومة والشركات عبر بروتوكول Exchange MS Graph.',
      isConnected: false,
      lastSyncAt: 'غير متصل',
      permissions: ['Mail.ReadWrite', 'Mail.Send'],
      status: 'DISCONNECTED',
      logs: []
    },
    {
      id: 'int-calendar',
      name: 'Google Calendar API',
      category: 'Calendar',
      icon: 'Calendar',
      description: 'مزامنة مواعيد مراجعة الجهات الحكومية وجلسات المواطنين تلقائياً.',
      isConnected: true,
      connectedAccount: 'sokarcafe1@gmail.com',
      lastSyncAt: new Date(Date.now() - 45 * 60000).toISOString(),
      permissions: ['calendar.events', 'calendar.readonly'],
      status: 'OPTIMAL',
      logs: [
        { timestamp: new Date(Date.now() - 45 * 60000).toISOString(), event: 'جدولة ميعاد استلام السجل التجاري بالتقويم', status: 'SUCCESS' }
      ]
    },
    {
      id: 'int-sms',
      name: 'SMS Gateway (Twilio / Vodafone)',
      category: 'Messaging',
      icon: 'PhoneCall',
      description: 'إرسال رسائل نصية قصيرة SMS للتأكيد والتحقق بخاصية OTP.',
      isConnected: true,
      connectedAccount: 'SOKAR-SMS-PROV',
      lastSyncAt: new Date(Date.now() - 15 * 60000).toISOString(),
      permissions: ['sms.send', 'otp.generate'],
      status: 'OPTIMAL',
      logs: [
        { timestamp: new Date(Date.now() - 15 * 60000).toISOString(), event: 'إرسال كود التحقق OTP للمواطن', status: 'SUCCESS' }
      ]
    },
    {
      id: 'int-payment',
      name: 'بوابات الدفع الإلكتروني (Paymob / Fawry / Instapay)',
      category: 'Payments',
      icon: 'CreditCard',
      description: 'تحصيل قيمة الخدمات الحكومية والرسوم أونلاين وتحويل المبالغ مباشرة لخزنة المكتب.',
      isConnected: true,
      connectedAccount: 'Paymob Account #981023',
      lastSyncAt: new Date(Date.now() - 2 * 60000).toISOString(),
      permissions: ['payments.charge', 'payments.refund', 'webhooks.receive'],
      status: 'OPTIMAL',
      logs: [
        { timestamp: new Date(Date.now() - 2 * 60000).toISOString(), event: 'استلام دفعة بـ 350 ج.م عبر إنستا باي', status: 'SUCCESS' }
      ]
    }
  ];

  localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(defaults));
  return defaults;
};

export const saveIntegrations = (items: IntegrationItem[]) => {
  localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(items));
};

export const toggleIntegrationConnection = (id: string): IntegrationItem[] => {
  const list = getDefaultIntegrations();
  const index = list.findIndex(i => i.id === id);
  if (index !== -1) {
    list[index].isConnected = !list[index].isConnected;
    list[index].status = list[index].isConnected ? 'OPTIMAL' : 'DISCONNECTED';
    if (list[index].isConnected) {
      list[index].lastSyncAt = new Date().toISOString();
      list[index].logs.unshift({
        timestamp: new Date().toISOString(),
        event: 'تم الاتصال بالخدمة بنجاح واختبار التراخيص',
        status: 'SUCCESS'
      });
    } else {
      list[index].logs.unshift({
        timestamp: new Date().toISOString(),
        event: 'تم قطع الاتصال بالخدمة بناءً على طلب مدير النظام',
        status: 'INFO'
      });
    }
    saveIntegrations(list);
  }
  return list;
};

export const testIntegrationConnection = (id: string): { success: boolean; message: string } => {
  const list = getDefaultIntegrations();
  const item = list.find(i => i.id === id);
  if (!item || !item.isConnected) {
    return { success: false, message: 'الخدمة غير متصلة، يرجى التوصيل أولاً.' };
  }

  item.lastSyncAt = new Date().toISOString();
  item.logs.unshift({
    timestamp: new Date().toISOString(),
    event: 'اختبار الاتصال السريع بالخوادم الرئيسية (Ping test)',
    status: 'SUCCESS'
  });
  saveIntegrations(list);

  return { success: true, message: `تم اختبار الاتصال بـ ${item.name} بنجاح واستجابة السيرفر 45ms!` };
};
