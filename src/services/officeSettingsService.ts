// Office Settings Service for Sokar Office OS

export interface ComprehensiveOfficeSettings {
  // Office Details
  officeName: string;
  taxRegistrationNumber: string;
  commercialRegisterNumber: string;
  managerName: string;
  phonePrimary: string;
  phoneSecondary: string;
  emailOfficial: string;
  addressFull: string;
  governorate: string;
  logoUrl: string;

  // Invoice & Receipt Settings
  invoiceHeaderTitle: string;
  invoiceFooterNote: string;
  vatPercentage: number;
  enableVat: boolean;
  currency: string;
  printLogoOnReceipts: boolean;
  autoPrintReceiptOnPay: boolean;

  // Operating Hours & Regional
  language: 'ar' | 'en';
  timezone: string;
  workingDays: string[];
  workShiftStart: string;
  workShiftEnd: string;

  // Security & Backups
  autoBackupInterval: 'daily' | 'weekly' | 'manual';
  twoFactorAuthEnabled: boolean;
  sessionTimeoutMinutes: number;
  ipRestrictionEnabled: boolean;

  // Digital Signature & Email
  digitalSignatureUrl?: string;
  smtpServer: string;
  smtpPort: number;
  smtpUser: string;
}

const SETTINGS_KEY = 'sokar_comprehensive_office_settings';

export const getDefaultOfficeSettings = (): ComprehensiveOfficeSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }

  const defaults: ComprehensiveOfficeSettings = {
    officeName: 'مكتب السكر للخدمات الحكومية الشاملة والمعاملات',
    taxRegistrationNumber: '782-419-301',
    commercialRegisterNumber: '109482',
    managerName: 'أ / محمد السكر',
    phonePrimary: '01012345678',
    phoneSecondary: '01298765432',
    emailOfficial: 'sokarcafe1@gmail.com',
    addressFull: 'شارع الجلاء الرئيسي - برج المصالح الحكومية - الدور 2',
    governorate: 'القاهرة / مصر',
    logoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=200&q=80',

    invoiceHeaderTitle: 'إيصال استلام معاملات ومستندات رسمية',
    invoiceFooterNote: 'شكراً لتعاملكم مع مكتب السكر. يُرجى الاحتفاظ بهذا الإيصال للاستلام.',
    vatPercentage: 14,
    enableVat: true,
    currency: 'ج.م',
    printLogoOnReceipts: true,
    autoPrintReceiptOnPay: true,

    language: 'ar',
    timezone: 'Africa/Cairo (GMT+2)',
    workingDays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    workShiftStart: '09:00',
    workShiftEnd: '18:00',

    autoBackupInterval: 'daily',
    twoFactorAuthEnabled: true,
    sessionTimeoutMinutes: 60,
    ipRestrictionEnabled: false,

    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'sokarcafe1@gmail.com'
  };

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaults));
  return defaults;
};

export const saveOfficeSettings = (settings: ComprehensiveOfficeSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
