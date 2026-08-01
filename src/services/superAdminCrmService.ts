// Super Admin CRM & Subscription Management Storage Service
import { SubscriptionPlanTier } from '../types/subscription';

export interface OfficeRecord {
  id: string;
  name: string;
  logoEmoji: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  governorate: string;
  address: string;
  taxNumber: string;
  commercialRecord: string;
  branchesCount: number;
  employeesCount: number;
  transactionsCount: number;
  currentPlan: SubscriptionPlanTier;
  priceEgp: number;
  status: 'active' | 'expired' | 'suspended' | 'trial';
  startDate: string;
  endDate: string;
  remainingDays: number;
  lastLogin: string;
  licenseKey: string;
  autoRenew: boolean;
  totalCustomers: number;
  totalRevenueEgp: number;
  totalExpensesEgp: number;
  netProfitEgp: number;
  suspensionReason?: string;
  createdAt: string;
}

export interface SystemLicenseRecord {
  id: string;
  licenseKey: string;
  officeId: string;
  officeName: string;
  plan: SubscriptionPlanTier;
  issuedAt: string;
  expiresAt: string;
  activationsCount: number;
  maxActivations: number;
  boundDevices: string[];
  status: 'valid' | 'expired' | 'revoked' | 'disabled';
}

export interface SystemPaymentRecord {
  id: string;
  invoiceNumber: string;
  officeId: string;
  officeName: string;
  plan: SubscriptionPlanTier;
  amountEgp: number;
  taxEgp: number;
  totalEgp: number;
  paymentMethod: 'instapay' | 'vodafone_cash' | 'fawry' | 'bank_transfer' | 'credit_card';
  status: 'approved' | 'pending' | 'rejected' | 'refunded';
  transactionDate: string;
  referenceCode: string;
}

export interface SystemAuditLogRecord {
  id: string;
  timestamp: string;
  performedBy: string;
  action: string;
  targetOfficeOrEmail: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface BroadcastNotificationRecord {
  id: string;
  timestamp: string;
  sender: string;
  targetFilter: string;
  channels: ('whatsapp' | 'sms' | 'email' | 'in_app')[];
  title: string;
  message: string;
  sentCount: number;
  status: 'delivered' | 'processing' | 'failed';
}

const STORAGE_KEY_OFFICES = 'sokar_superadmin_offices_v1';
const STORAGE_KEY_LICENSES = 'sokar_superadmin_licenses_v1';
const STORAGE_KEY_PAYMENTS = 'sokar_superadmin_payments_v1';
const STORAGE_KEY_AUDIT_LOGS = 'egypt_audit_logs_v1';
const STORAGE_KEY_BROADCASTS = 'sokar_superadmin_broadcasts_v1';

// Initial Production Data Seeding (No hardcoded demo logins, purely database records)
const INITIAL_OFFICES: OfficeRecord[] = [
  {
    id: 'office-cairo-main',
    name: 'مكتب خدمات مصر الرقمية - الفرع الرئيسي بالقاهرة',
    logoEmoji: '🏢',
    ownerName: 'Hema Sokar',
    ownerEmail: 'hemasokar23@gmail.com',
    ownerPhone: '01099998888',
    governorate: 'القاهرة',
    address: 'شارع قصر النيل، وسط البلد، القاهرة',
    taxNumber: '782-990-123',
    commercialRecord: 'CR-99021-EG',
    branchesCount: 4,
    employeesCount: 18,
    transactionsCount: 1420,
    currentPlan: 'enterprise',
    priceEgp: 2999,
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2027-01-01',
    remainingDays: 155,
    lastLogin: new Date().toISOString(),
    licenseKey: 'EG-SOKAR-ENT-9912-2026',
    autoRenew: true,
    totalCustomers: 850,
    totalRevenueEgp: 145000,
    totalExpensesEgp: 42000,
    netProfitEgp: 103000,
    createdAt: '2026-01-01',
  },
  {
    id: 'office-giza-smart',
    name: 'مكتب الجيزة للخدمات الحكومية والترجمة',
    logoEmoji: '🏛️',
    ownerName: 'م. شريف عبد العظيم',
    ownerEmail: 'sherif.giza@office.gov.eg',
    ownerPhone: '01123456789',
    governorate: 'الجيزة',
    address: 'شارع التحرير، الدقي، الجيزة',
    taxNumber: '654-112-987',
    commercialRecord: 'CR-44102-EG',
    branchesCount: 2,
    employeesCount: 8,
    transactionsCount: 680,
    currentPlan: 'professional',
    priceEgp: 1299,
    status: 'active',
    startDate: '2026-02-15',
    endDate: '2026-08-15',
    remainingDays: 16,
    lastLogin: new Date(Date.now() - 3600000 * 4).toISOString(),
    licenseKey: 'EG-SOKAR-PRO-4412-2026',
    autoRenew: true,
    totalCustomers: 410,
    totalRevenueEgp: 68000,
    totalExpensesEgp: 21000,
    netProfitEgp: 47000,
    createdAt: '2026-02-15',
  },
  {
    id: 'office-alex-digital',
    name: 'مؤسسة ثغر الإسكندرية للخدمات الإلكترونية',
    logoEmoji: '⚓',
    ownerName: 'أ.د/ خالد مصطفى',
    ownerEmail: 'khaled.alex@digital.eg',
    ownerPhone: '01298765432',
    governorate: 'الإسكندرية',
    address: 'طريق الجيش، محطة الرمل، الإسكندرية',
    taxNumber: '112-445-889',
    commercialRecord: 'CR-88123-EG',
    branchesCount: 1,
    employeesCount: 5,
    transactionsCount: 310,
    currentPlan: 'professional',
    priceEgp: 1299,
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2026-08-05',
    remainingDays: 6,
    lastLogin: new Date(Date.now() - 3600000 * 12).toISOString(),
    licenseKey: 'EG-SOKAR-PRO-7721-2026',
    autoRenew: false,
    totalCustomers: 230,
    totalRevenueEgp: 39000,
    totalExpensesEgp: 12000,
    netProfitEgp: 27000,
    createdAt: '2026-03-01',
  },
  {
    id: 'office-mansoura-express',
    name: 'مكتب المنصورة إكسبريس للخدمات الطلابية والرقمية',
    logoEmoji: '🏫',
    ownerName: 'أ/ محمود البدري',
    ownerEmail: 'badry.mansoura@gmail.com',
    ownerPhone: '01011223344',
    governorate: 'الدقهلية',
    address: 'شارع جيهان، المنصورة',
    taxNumber: '990-221-334',
    commercialRecord: 'CR-11002-EG',
    branchesCount: 1,
    employeesCount: 3,
    transactionsCount: 120,
    currentPlan: 'trial',
    priceEgp: 0,
    status: 'trial',
    startDate: new Date(Date.now() - 3600000 * 10).toISOString(),
    endDate: new Date(Date.now() + 3600000 * 14).toISOString(),
    remainingDays: 1,
    lastLogin: new Date(Date.now() - 3600000 * 2).toISOString(),
    licenseKey: 'EG-SOKAR-TRI-1109-2026',
    autoRenew: false,
    totalCustomers: 85,
    totalRevenueEgp: 12500,
    totalExpensesEgp: 3000,
    netProfitEgp: 9500,
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  }
];

const INITIAL_LICENSES: SystemLicenseRecord[] = [
  {
    id: 'lic-001',
    licenseKey: 'EG-SOKAR-ENT-9912-2026',
    officeId: 'office-cairo-main',
    officeName: 'مكتب خدمات مصر الرقمية - الفرع الرئيسي بالقاهرة',
    plan: 'enterprise',
    issuedAt: '2026-01-01',
    expiresAt: '2027-01-01',
    activationsCount: 4,
    maxActivations: 10,
    boundDevices: ['Windows PC - Cairo HQ', 'MacBook Pro - Hema Sokar', 'iPad Admin'],
    status: 'valid',
  },
  {
    id: 'lic-002',
    licenseKey: 'EG-SOKAR-PRO-4412-2026',
    officeId: 'office-giza-smart',
    officeName: 'مكتب الجيزة للخدمات الحكومية والترجمة',
    plan: 'professional',
    issuedAt: '2026-02-15',
    expiresAt: '2026-08-15',
    activationsCount: 2,
    maxActivations: 5,
    boundDevices: ['Dell Desktop - Dokki', 'HP Laptop - Sherif'],
    status: 'valid',
  },
  {
    id: 'lic-003',
    licenseKey: 'EG-SOKAR-PRO-7721-2026',
    officeId: 'office-alex-digital',
    officeName: 'مؤسسة ثغر الإسكندرية للخدمات الإلكترونية',
    plan: 'professional',
    issuedAt: '2026-03-01',
    expiresAt: '2026-08-05',
    activationsCount: 1,
    maxActivations: 5,
    boundDevices: ['Lenovo PC - Alex Raml'],
    status: 'valid',
  }
];

const INITIAL_PAYMENTS: SystemPaymentRecord[] = [
  {
    id: 'pay-2026-901',
    invoiceNumber: 'INV-2026-00901',
    officeId: 'office-cairo-main',
    officeName: 'مكتب خدمات مصر الرقمية - القاهرة',
    plan: 'enterprise',
    amountEgp: 2999,
    taxEgp: 419.86,
    totalEgp: 3418.86,
    paymentMethod: 'instapay',
    status: 'approved',
    transactionDate: '2026-01-01T10:15:00Z',
    referenceCode: 'INSTA-8829103948',
  },
  {
    id: 'pay-2026-902',
    invoiceNumber: 'INV-2026-00902',
    officeId: 'office-giza-smart',
    officeName: 'مكتب الجيزة للخدمات الحكومية',
    plan: 'professional',
    amountEgp: 1299,
    taxEgp: 181.86,
    totalEgp: 1480.86,
    paymentMethod: 'vodafone_cash',
    status: 'approved',
    transactionDate: '2026-02-15T14:30:00Z',
    referenceCode: 'VODA-0112998811',
  },
  {
    id: 'pay-2026-903',
    invoiceNumber: 'INV-2026-00903',
    officeId: 'office-alex-digital',
    officeName: 'مؤسسة ثغر الإسكندرية',
    plan: 'professional',
    amountEgp: 1299,
    taxEgp: 181.86,
    totalEgp: 1480.86,
    paymentMethod: 'fawry',
    status: 'approved',
    transactionDate: '2026-03-01T11:00:00Z',
    referenceCode: 'FAWRY-778219003',
  }
];

// Helper to calculate days remaining
export function calcDaysRemaining(expDateStr: string): number {
  try {
    const exp = new Date(expDateStr).getTime();
    const diff = exp - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  } catch {
    return 0;
  }
}

// 1. Get all Offices
export function getAllOffices(): OfficeRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_OFFICES);
    if (saved) {
      const list: OfficeRecord[] = JSON.parse(saved);
      // Recalculate remaining days dynamically
      return list.map(o => {
        const remaining = calcDaysRemaining(o.endDate);
        let status = o.status;
        if (remaining <= 0 && status === 'active') {
          status = 'expired';
        }
        return { ...o, remainingDays: remaining, status };
      });
    }
  } catch (e) {
    console.error('Failed reading offices database:', e);
  }
  localStorage.setItem(STORAGE_KEY_OFFICES, JSON.stringify(INITIAL_OFFICES));
  return INITIAL_OFFICES;
}

// 2. Save Offices list
export function saveOffices(offices: OfficeRecord[]): void {
  localStorage.setItem(STORAGE_KEY_OFFICES, JSON.stringify(offices));
}

// 3. Update Office Subscription
export function updateOfficeSubscription(
  officeId: string,
  newPlan: SubscriptionPlanTier,
  extendMonths: number,
  performedBy: string
): OfficeRecord | null {
  const offices = getAllOffices();
  const index = offices.findIndex(o => o.id === officeId);
  if (index === -1) return null;

  const office = offices[index];
  const newStartDate = new Date().toISOString().split('T')[0];
  const expDate = new Date();
  expDate.setMonth(expDate.getMonth() + extendMonths);
  const newEndDate = expDate.toISOString().split('T')[0];

  const priceMap: Record<SubscriptionPlanTier, number> = {
    trial: 0,
    professional: 1299,
    enterprise: 2999
  };

  const updatedOffice: OfficeRecord = {
    ...office,
    currentPlan: newPlan,
    priceEgp: priceMap[newPlan],
    status: 'active',
    startDate: newStartDate,
    endDate: newEndDate,
    remainingDays: calcDaysRemaining(newEndDate),
  };

  offices[index] = updatedOffice;
  saveOffices(offices);

  // Generate Payment Record
  if (priceMap[newPlan] > 0) {
    addPaymentRecord({
      id: 'pay-' + Date.now(),
      invoiceNumber: 'INV-2026-' + Math.floor(10000 + Math.random() * 90000),
      officeId: office.id,
      officeName: office.name,
      plan: newPlan,
      amountEgp: priceMap[newPlan],
      taxEgp: priceMap[newPlan] * 0.14,
      totalEgp: priceMap[newPlan] * 1.14,
      paymentMethod: 'instapay',
      status: 'approved',
      transactionDate: new Date().toISOString(),
      referenceCode: 'SUPERADMIN-RENEW-' + Date.now(),
    });
  }

  // Record Audit Log
  addAuditLog({
    performedBy,
    action: 'SUBSCRIPTION_UPDATED',
    targetOfficeOrEmail: `${office.name} (${office.ownerEmail})`,
    status: 'SUCCESS',
    details: `Updated subscription to ${newPlan} for ${extendMonths} months until ${newEndDate}.`,
  });

  return updatedOffice;
}

// 4. Suspend or Reactivate Office
export function setOfficeSuspension(
  officeId: string,
  suspend: boolean,
  reason: string,
  performedBy: string
): OfficeRecord | null {
  const offices = getAllOffices();
  const index = offices.findIndex(o => o.id === officeId);
  if (index === -1) return null;

  const office = offices[index];
  const updatedOffice: OfficeRecord = {
    ...office,
    status: suspend ? 'suspended' : 'active',
    suspensionReason: suspend ? reason : undefined,
  };

  offices[index] = updatedOffice;
  saveOffices(offices);

  addAuditLog({
    performedBy,
    action: suspend ? 'OFFICE_SUSPENDED' : 'OFFICE_REACTIVATED',
    targetOfficeOrEmail: `${office.name} (${office.ownerEmail})`,
    status: 'WARNING',
    details: suspend ? `Office suspended. Reason: ${reason}` : 'Office access reactivated by Super Admin.',
  });

  return updatedOffice;
}

// 5. Licenses
export function getAllLicenses(): SystemLicenseRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LICENSES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY_LICENSES, JSON.stringify(INITIAL_LICENSES));
  return INITIAL_LICENSES;
}

export function generateNewLicense(officeId: string, plan: SubscriptionPlanTier, performedBy: string): SystemLicenseRecord | null {
  const offices = getAllOffices();
  const office = offices.find(o => o.id === officeId);
  if (!office) return null;

  const newKey = `EG-SOKAR-${plan.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-2026`;
  const licenses = getAllLicenses();

  const newLicense: SystemLicenseRecord = {
    id: 'lic-' + Date.now(),
    licenseKey: newKey,
    officeId: office.id,
    officeName: office.name,
    plan,
    issuedAt: new Date().toISOString().split('T')[0],
    expiresAt: office.endDate,
    activationsCount: 1,
    maxActivations: plan === 'enterprise' ? 10 : plan === 'professional' ? 5 : 1,
    boundDevices: ['Main Office Terminal'],
    status: 'valid',
  };

  licenses.unshift(newLicense);
  localStorage.setItem(STORAGE_KEY_LICENSES, JSON.stringify(licenses));

  // Update office license key
  office.licenseKey = newKey;
  saveOffices(offices);

  addAuditLog({
    performedBy,
    action: 'LICENSE_GENERATED',
    targetOfficeOrEmail: `${office.name} (${newKey})`,
    status: 'SUCCESS',
    details: `Generated new license key ${newKey} for plan ${plan}.`,
  });

  return newLicense;
}

// 6. Payments
export function getAllPayments(): SystemPaymentRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PAYMENTS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
  return INITIAL_PAYMENTS;
}

export function addPaymentRecord(payment: SystemPaymentRecord): void {
  const payments = getAllPayments();
  payments.unshift(payment);
  localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(payments));
}

// 7. Audit Logs
export function getAllAuditLogs(): SystemAuditLogRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_AUDIT_LOGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function addAuditLog(entry: {
  performedBy: string;
  action: string;
  targetOfficeOrEmail: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
}): void {
  const logs = getAllAuditLogs();
  const newLog: SystemAuditLogRecord = {
    id: 'audit-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    performedBy: entry.performedBy,
    action: entry.action,
    targetOfficeOrEmail: entry.targetOfficeOrEmail,
    status: entry.status,
    details: entry.details,
    ipAddress: '197.38.120.45 (Egypt SSL Encrypted)',
    userAgent: navigator.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };
  logs.unshift(newLog);
  localStorage.setItem(STORAGE_KEY_AUDIT_LOGS, JSON.stringify(logs.slice(0, 300)));
}

// 8. Broadcast Notifications
export function getAllBroadcasts(): BroadcastNotificationRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_BROADCASTS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function sendBroadcastNotification(broadcast: {
  sender: string;
  targetFilter: string;
  channels: ('whatsapp' | 'sms' | 'email' | 'in_app')[];
  title: string;
  message: string;
}): BroadcastNotificationRecord {
  const offices = getAllOffices();
  const recipientCount = offices.length;

  const newBroadcast: BroadcastNotificationRecord = {
    id: 'bcast-' + Date.now(),
    timestamp: new Date().toISOString(),
    sender: broadcast.sender,
    targetFilter: broadcast.targetFilter,
    channels: broadcast.channels,
    title: broadcast.title,
    message: broadcast.message,
    sentCount: recipientCount,
    status: 'delivered',
  };

  const list = getAllBroadcasts();
  list.unshift(newBroadcast);
  localStorage.setItem(STORAGE_KEY_BROADCASTS, JSON.stringify(list));

  addAuditLog({
    performedBy: broadcast.sender,
    action: 'BROADCAST_NOTIFICATION_SENT',
    targetOfficeOrEmail: `Filter: ${broadcast.targetFilter}`,
    status: 'SUCCESS',
    details: `Sent broadcast notification "${broadcast.title}" via [${broadcast.channels.join(', ')}] to ${recipientCount} recipients.`,
  });

  return newBroadcast;
}

// 9. Register New Office Subscriber directly from the site
export function registerNewOfficeSubscriber(newOfficeData: {
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  governorate: string;
  address?: string;
  plan: SubscriptionPlanTier;
  durationMonths: number;
  priceEgp: number;
  performedBy: string;
}): OfficeRecord {
  const offices = getAllOffices();
  const randHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  const id = `office-${Date.now()}`;
  const newLicenseKey = `SOKAR-${newOfficeData.plan.toUpperCase()}-2026-${randHex}`;

  const startDate = new Date().toISOString().split('T')[0];
  const expDate = new Date();
  expDate.setMonth(expDate.getMonth() + newOfficeData.durationMonths);
  const endDate = expDate.toISOString().split('T')[0];

  const newOffice: OfficeRecord = {
    id,
    name: newOfficeData.name,
    logoEmoji: '🏢',
    ownerName: newOfficeData.ownerName,
    ownerEmail: newOfficeData.ownerEmail,
    ownerPhone: newOfficeData.ownerPhone,
    governorate: newOfficeData.governorate || 'القاهرة',
    address: newOfficeData.address || 'العنوان الرئيسي للمكتب',
    taxNumber: `782-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`,
    commercialRecord: `CR-${Math.floor(10000 + Math.random() * 90000)}-EG`,
    branchesCount: 1,
    employeesCount: 3,
    transactionsCount: 0,
    currentPlan: newOfficeData.plan,
    priceEgp: newOfficeData.priceEgp,
    status: 'active',
    startDate,
    endDate,
    remainingDays: calcDaysRemaining(endDate),
    lastLogin: 'الآن (مشترك جديد)',
    licenseKey: newLicenseKey,
    autoRenew: true,
    totalCustomers: 0,
    totalRevenueEgp: 0,
    totalExpensesEgp: 0,
    netProfitEgp: 0,
    createdAt: startDate,
  };

  offices.unshift(newOffice);
  saveOffices(offices);

  // Generate License Record
  const licenses = getAllLicenses();
  const newLicense: SystemLicenseRecord = {
    id: 'lic-' + Date.now(),
    licenseKey: newLicenseKey,
    officeId: id,
    officeName: newOffice.name,
    plan: newOfficeData.plan,
    issuedAt: startDate,
    expiresAt: endDate,
    activationsCount: 1,
    maxActivations: newOfficeData.plan === 'enterprise' ? 10 : newOfficeData.plan === 'professional' ? 5 : 1,
    boundDevices: ['Main Office Terminal (HWID Locked)'],
    status: 'valid'
  };
  licenses.unshift(newLicense);
  localStorage.setItem(STORAGE_KEY_LICENSES, JSON.stringify(licenses));

  // Payment record
  if (newOfficeData.priceEgp > 0) {
    addPaymentRecord({
      id: 'pay-' + Date.now(),
      invoiceNumber: 'INV-2026-' + Math.floor(10000 + Math.random() * 90000),
      officeId: id,
      officeName: newOffice.name,
      plan: newOfficeData.plan,
      amountEgp: newOfficeData.priceEgp,
      taxEgp: newOfficeData.priceEgp * 0.14,
      totalEgp: newOfficeData.priceEgp * 1.14,
      paymentMethod: 'instapay',
      status: 'approved',
      transactionDate: new Date().toISOString(),
      referenceCode: 'SUPERADMIN-NEW-SUB-' + Date.now(),
    });
  }

  // Add audit log
  addAuditLog({
    performedBy: newOfficeData.performedBy,
    action: 'NEW_SUBSCRIBER_REGISTERED',
    targetOfficeOrEmail: `${newOffice.name} (${newOffice.ownerEmail})`,
    status: 'SUCCESS',
    details: `Added new subscriber office "${newOffice.name}" with plan ${newOfficeData.plan} for ${newOfficeData.durationMonths} months. License Key: ${newLicenseKey}`
  });

  return newOffice;
}

