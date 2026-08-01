import {
  SubscriptionState,
  SubscriptionPlanTier,
  FeatureKey,
  PLAN_FEATURE_PERMISSIONS,
  PLAN_LIMITS_MAP,
  SubscriptionHistoryRecord,
  PaymentRecord,
} from '../types/subscription';

const LOCAL_STORAGE_SUB_KEY = 'sokar_office_subscription_v1';
const LOCAL_STORAGE_HISTORY_KEY = 'sokar_office_sub_history_v1';
const LOCAL_STORAGE_PAYMENTS_KEY = 'sokar_office_sub_payments_v1';

// Initial Demo License
const DEFAULT_INITIAL_SUB: SubscriptionState = {
  tenantId: 'tenant-cairo-01',
  officeName: 'مكتب مصر الرقمية - الفرع الرئيسي بالقاهرة',
  licenseKey: 'EG-SOKAR-PRO-8891-2026',
  plan: 'professional',
  status: 'active',
  issuedAt: '2026-01-01',
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ahead
  autoRenew: true,
  limits: PLAN_LIMITS_MAP.professional,
  permissions: PLAN_FEATURE_PERMISSIONS.professional,
  daysRemaining: 30,
  expirationAlertLevel: 'warning_30',
};

// In-Memory 5-Minute Cache for Performance
let cachedSubscription: SubscriptionState | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 Minutes Cache

function calculateDaysRemaining(expiresAtStr: string): number {
  try {
    const exp = new Date(expiresAtStr).getTime();
    const now = Date.now();
    const diffMs = exp - now;
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  } catch (e) {
    return 0;
  }
}

function computeAlertLevel(days: number, status: string): SubscriptionState['expirationAlertLevel'] {
  if (status === 'expired' || status === 'suspended' || status === 'cancelled' || days <= 0) {
    return 'expired';
  }
  if (days <= 1) return 'warning_1';
  if (days <= 3) return 'warning_3';
  if (days <= 7) return 'warning_7';
  if (days <= 15) return 'warning_15';
  if (days <= 30) return 'warning_30';
  return 'none';
}

export function getActiveSubscription(forceRefresh = false): SubscriptionState {
  const now = Date.now();
  if (!forceRefresh && cachedSubscription && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return cachedSubscription;
  }

  let sub: SubscriptionState = DEFAULT_INITIAL_SUB;

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_SUB_KEY);
    if (saved) {
      sub = JSON.parse(saved);
    } else {
      localStorage.setItem(LOCAL_STORAGE_SUB_KEY, JSON.stringify(DEFAULT_INITIAL_SUB));
    }
  } catch (e) {
    sub = DEFAULT_INITIAL_SUB;
  }

  // Recalculate remaining days and status dynamically
  const days = calculateDaysRemaining(sub.expiresAt);
  let effectiveStatus = sub.status;

  if (days <= 0 && effectiveStatus === 'active') {
    effectiveStatus = 'expired';
  }

  const alertLevel = computeAlertLevel(days, effectiveStatus);

  // If expired or suspended, turn off feature permissions
  const activePermissions = (effectiveStatus === 'active' || effectiveStatus === 'trial')
    ? PLAN_FEATURE_PERMISSIONS[sub.plan]
    : PLAN_FEATURE_PERMISSIONS.trial; // Fallback to basic non-premium

  const updatedState: SubscriptionState = {
    ...sub,
    status: effectiveStatus,
    daysRemaining: days,
    expirationAlertLevel: alertLevel,
    permissions: activePermissions,
    limits: PLAN_LIMITS_MAP[sub.plan],
  };

  cachedSubscription = updatedState;
  cacheTimestamp = now;

  return updatedState;
}

export function hasFeaturePermission(featureKey: FeatureKey): boolean {
  const sub = getActiveSubscription();
  if (sub.status !== 'active' && sub.status !== 'trial') {
    return false; // Expired or suspended
  }
  return Boolean(sub.permissions[featureKey]);
}

export function updateSubscriptionPlan(
  newPlan: SubscriptionPlanTier,
  durationMonths = 12,
  performedBy = 'مدير النظام'
): SubscriptionState {
  const current = getActiveSubscription(true);
  const newExpDate = new Date();
  newExpDate.setMonth(newExpDate.getMonth() + durationMonths);

  const expiresAtStr = newExpDate.toISOString().split('T')[0];
  const days = calculateDaysRemaining(expiresAtStr);

  const updated: SubscriptionState = {
    ...current,
    plan: newPlan,
    status: 'active',
    issuedAt: new Date().toISOString().split('T')[0],
    expiresAt: expiresAtStr,
    limits: PLAN_LIMITS_MAP[newPlan],
    permissions: PLAN_FEATURE_PERMISSIONS[newPlan],
    daysRemaining: days,
    expirationAlertLevel: computeAlertLevel(days, 'active'),
  };

  localStorage.setItem(LOCAL_STORAGE_SUB_KEY, JSON.stringify(updated));
  cachedSubscription = updated;
  cacheTimestamp = Date.now();

  // Record History
  recordHistory({
    id: 'hist-' + Date.now(),
    action: newPlan === 'trial' ? 'downgraded' : 'upgraded',
    previousPlan: current.plan,
    newPlan,
    amountEgp: newPlan === 'professional' ? 1299 : newPlan === 'enterprise' ? 2999 : 0,
    licenseKey: updated.licenseKey,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    performedBy,
    notes: `تم التغيير إلى باقة ${newPlan.toUpperCase()} لمدة ${durationMonths} شهراً`,
  });

  return updated;
}

export function renewCurrentSubscription(durationMonths = 12, performedBy = 'صاحب المكتب'): SubscriptionState {
  const current = getActiveSubscription(true);
  const currentExp = new Date(current.expiresAt).getTime() > Date.now() ? new Date(current.expiresAt) : new Date();
  currentExp.setMonth(currentExp.getMonth() + durationMonths);

  const expiresAtStr = currentExp.toISOString().split('T')[0];
  const days = calculateDaysRemaining(expiresAtStr);

  const updated: SubscriptionState = {
    ...current,
    status: 'active',
    expiresAt: expiresAtStr,
    daysRemaining: days,
    expirationAlertLevel: computeAlertLevel(days, 'active'),
    permissions: PLAN_FEATURE_PERMISSIONS[current.plan],
  };

  localStorage.setItem(LOCAL_STORAGE_SUB_KEY, JSON.stringify(updated));
  cachedSubscription = updated;
  cacheTimestamp = Date.now();

  // Record History
  recordHistory({
    id: 'hist-' + Date.now(),
    action: 'renewed',
    previousPlan: current.plan,
    newPlan: current.plan,
    amountEgp: current.plan === 'professional' ? 1299 : current.plan === 'enterprise' ? 2999 : 0,
    licenseKey: current.licenseKey,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    performedBy,
    notes: `تم تجديد الاشتراك بانتظام لمدة ${durationMonths} شهراً`,
  });

  return updated;
}

export function activateLicenseKey(licenseKey: string): SubscriptionState {
  const cleanKey = licenseKey.trim().toUpperCase();

  let targetPlan: SubscriptionPlanTier = 'professional';
  if (cleanKey.includes('ENT') || cleanKey.includes('VIP')) {
    targetPlan = 'enterprise';
  } else if (cleanKey.includes('PRO')) {
    targetPlan = 'professional';
  }

  const current = getActiveSubscription(true);
  const expDate = new Date();
  expDate.setFullYear(expDate.getFullYear() + 1);

  const updated: SubscriptionState = {
    ...current,
    licenseKey: cleanKey,
    plan: targetPlan,
    status: 'active',
    issuedAt: new Date().toISOString().split('T')[0],
    expiresAt: expDate.toISOString().split('T')[0],
    limits: PLAN_LIMITS_MAP[targetPlan],
    permissions: PLAN_FEATURE_PERMISSIONS[targetPlan],
    daysRemaining: 365,
    expirationAlertLevel: 'none',
  };

  localStorage.setItem(LOCAL_STORAGE_SUB_KEY, JSON.stringify(updated));
  cachedSubscription = updated;
  cacheTimestamp = Date.now();

  return updated;
}

export function setSubscriptionTrialMode(): SubscriptionState {
  const current = getActiveSubscription(true);
  const trialExp = new Date();
  trialExp.setDate(trialExp.getDate() + 14);

  const updated: SubscriptionState = {
    ...current,
    plan: 'trial',
    status: 'trial',
    expiresAt: trialExp.toISOString().split('T')[0],
    limits: PLAN_LIMITS_MAP.trial,
    permissions: PLAN_FEATURE_PERMISSIONS.trial,
    daysRemaining: 14,
    expirationAlertLevel: 'none',
  };

  localStorage.setItem(LOCAL_STORAGE_SUB_KEY, JSON.stringify(updated));
  cachedSubscription = updated;
  cacheTimestamp = Date.now();

  return updated;
}

export function setSubscriptionExpiredForTesting(): SubscriptionState {
  const current = getActiveSubscription(true);
  const expiredDate = new Date();
  expiredDate.setDate(expiredDate.getDate() - 1);

  const updated: SubscriptionState = {
    ...current,
    status: 'expired',
    expiresAt: expiredDate.toISOString().split('T')[0],
    daysRemaining: 0,
    expirationAlertLevel: 'expired',
    permissions: PLAN_FEATURE_PERMISSIONS.trial,
  };

  localStorage.setItem(LOCAL_STORAGE_SUB_KEY, JSON.stringify(updated));
  cachedSubscription = updated;
  cacheTimestamp = Date.now();

  return updated;
}

// History & Payment Persistence
function recordHistory(rec: SubscriptionHistoryRecord) {
  try {
    const existing = getSubscriptionHistory();
    const updated = [rec, ...existing];
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    // Ignore error
  }
}

export function getSubscriptionHistory(): SubscriptionHistoryRecord[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // Ignore
  }
  return [
    {
      id: 'h-1',
      action: 'upgraded',
      newPlan: 'professional',
      amountEgp: 1299,
      licenseKey: 'EG-SOKAR-PRO-8891-2026',
      timestamp: '2026-01-01 10:00',
      performedBy: 'أ. محمود الفقي (صاحب المكتب)',
      notes: 'الاشتراك في الباقة الاحترافية السنوية',
    },
  ];
}

export function getPaymentRecords(): PaymentRecord[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PAYMENTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // Ignore
  }
  return [
    {
      id: 'p-101',
      invoiceNumber: 'INV-SUB-2026-01',
      amountEgp: 1299,
      status: 'paid',
      paymentMethod: 'fawry',
      paidAt: '2026-01-01 10:05',
      billingPeriod: 'يناير 2026 - يناير 2027',
      receiptUrl: '#',
    },
  ];
}

// Hardware ID (HWID) & Multi-Seat Device Binding Management
export interface BoundDeviceRecord {
  id: string;
  hwid: string;
  deviceName: string;
  os: string;
  browser: string;
  boundAt: string;
  lastActive: string;
  isPrimary: boolean;
  status: 'AUTHORIZED' | 'BLOCKED';
}

const LOCAL_STORAGE_HWID_DEVICES_KEY = 'sokar_office_bound_devices_v1';

export function getDeviceHardwareId(): string {
  let hwid = localStorage.getItem('sokar_device_hwid');
  if (!hwid) {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'NodeServer';
    const rand = Math.floor(Math.random() * 89999 + 10000);
    hwid = `HWID-EG-${btoa(userAgent.substring(0, 15)).replace(/[^A-Z0-9]/gi, '').substring(0, 6)}-${rand}`;
    localStorage.setItem('sokar_device_hwid', hwid);
  }
  return hwid;
}

export function getBoundDevices(): BoundDeviceRecord[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_HWID_DEVICES_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }

  const currentHwid = getDeviceHardwareId();
  const defaultDevices: BoundDeviceRecord[] = [
    {
      id: 'dev-primary-1',
      hwid: currentHwid,
      deviceName: 'جهاز المكتب الرئيسي (Primary Workstation PC)',
      os: 'Windows 11 Pro 64-Bit',
      browser: 'Google Chrome / Edge',
      boundAt: '2026-01-01',
      lastActive: 'الآن (النشاط الحالي)',
      isPrimary: true,
      status: 'AUTHORIZED'
    }
  ];
  localStorage.setItem(LOCAL_STORAGE_HWID_DEVICES_KEY, JSON.stringify(defaultDevices));
  return defaultDevices;
}

export function addBoundDeviceSeat(deviceName: string): BoundDeviceRecord[] {
  const current = getBoundDevices();
  const randHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  const newDev: BoundDeviceRecord = {
    id: `dev-${Date.now()}`,
    hwid: `HWID-EG-ADDITIONAL-${randHex}`,
    deviceName: deviceName || `كمبيوتر إضافي (${current.length + 1})`,
    os: 'Windows / Web Browser',
    browser: 'Chrome / Edge / Firefox',
    boundAt: new Date().toISOString().split('T')[0],
    lastActive: 'منذ دقائق',
    isPrimary: false,
    status: 'AUTHORIZED'
  };

  const updated = [...current, newDev];
  localStorage.setItem(LOCAL_STORAGE_HWID_DEVICES_KEY, JSON.stringify(updated));
  return updated;
}

export function removeBoundDeviceSeat(deviceId: string): BoundDeviceRecord[] {
  const current = getBoundDevices();
  const updated = current.filter(d => d.id !== deviceId || d.isPrimary);
  localStorage.setItem(LOCAL_STORAGE_HWID_DEVICES_KEY, JSON.stringify(updated));
  return updated;
}

