export type SubscriptionPlanTier = 'trial' | 'professional' | 'enterprise';

export type SubscriptionStatus = 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled' | 'invalid';

export type FeatureKey =
  | 'dashboard.overview'
  | 'customers.manage'
  | 'requests.manage'
  | 'services.browse'
  | 'search.basic'
  | 'reports.daily'
  | 'reports.monthly'
  | 'reports.financial'
  | 'reports.employee'
  | 'reports.customer'
  | 'reports.inventory'
  | 'reports.government'
  | 'reports.multibranch'
  | 'reports.custom'
  | 'reports.whitelabel'
  | 'reports.export_pdf'
  | 'reports.export_excel'
  | 'reports.export_csv'
  | 'reports.scheduled'
  | 'reports.auto_email'
  | 'analytics.dashboard'
  | 'analytics.kpi'
  | 'analytics.business'
  | 'analytics.charts_advanced'
  | 'analytics.executive'
  | 'api.access';

export type FeaturePermissionMatrix = Record<FeatureKey, boolean>;

export interface PlanLimits {
  maxUsers: number;
  maxBranches: number;
  maxCounters: number;
  maxMonthlyRequests: number;
  dataRetentionDays: number;
}

export interface SubscriptionState {
  tenantId: string;
  officeName: string;
  licenseKey: string;
  plan: SubscriptionPlanTier;
  status: SubscriptionStatus;
  issuedAt: string;
  expiresAt: string;
  autoRenew: boolean;
  limits: PlanLimits;
  permissions: FeaturePermissionMatrix;
  daysRemaining: number;
  expirationAlertLevel: 'none' | 'warning_30' | 'warning_15' | 'warning_7' | 'warning_3' | 'warning_1' | 'expired';
}

export interface SubscriptionHistoryRecord {
  id: string;
  action: 'created' | 'upgraded' | 'renewed' | 'downgraded' | 'suspended' | 'expired';
  previousPlan?: SubscriptionPlanTier;
  newPlan: SubscriptionPlanTier;
  amountEgp: number;
  licenseKey: string;
  timestamp: string;
  performedBy: string;
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  amountEgp: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'fawry' | 'credit_card' | 'vodafone_cash' | 'bank_transfer';
  paidAt?: string;
  billingPeriod: string;
  receiptUrl?: string;
}

export const PLAN_FEATURE_PERMISSIONS: Record<SubscriptionPlanTier, FeaturePermissionMatrix> = {
  trial: {
    'dashboard.overview': true,
    'customers.manage': true,
    'requests.manage': true,
    'services.browse': true,
    'search.basic': true,
    'reports.daily': false,
    'reports.monthly': false,
    'reports.financial': false,
    'reports.employee': false,
    'reports.customer': false,
    'reports.inventory': false,
    'reports.government': false,
    'reports.multibranch': false,
    'reports.custom': false,
    'reports.whitelabel': false,
    'reports.export_pdf': false,
    'reports.export_excel': false,
    'reports.export_csv': false,
    'reports.scheduled': false,
    'reports.auto_email': false,
    'analytics.dashboard': false,
    'analytics.kpi': false,
    'analytics.business': false,
    'analytics.charts_advanced': false,
    'analytics.executive': false,
    'api.access': false,
  },
  professional: {
    'dashboard.overview': true,
    'customers.manage': true,
    'requests.manage': true,
    'services.browse': true,
    'search.basic': true,
    'reports.daily': true,
    'reports.monthly': true,
    'reports.financial': true,
    'reports.employee': true,
    'reports.customer': true,
    'reports.inventory': true,
    'reports.government': true,
    'reports.multibranch': false,
    'reports.custom': false,
    'reports.whitelabel': false,
    'reports.export_pdf': true,
    'reports.export_excel': true,
    'reports.export_csv': true,
    'reports.scheduled': false,
    'reports.auto_email': false,
    'analytics.dashboard': true,
    'analytics.kpi': true,
    'analytics.business': false,
    'analytics.charts_advanced': false,
    'analytics.executive': false,
    'api.access': false,
  },
  enterprise: {
    'dashboard.overview': true,
    'customers.manage': true,
    'requests.manage': true,
    'services.browse': true,
    'search.basic': true,
    'reports.daily': true,
    'reports.monthly': true,
    'reports.financial': true,
    'reports.employee': true,
    'reports.customer': true,
    'reports.inventory': true,
    'reports.government': true,
    'reports.multibranch': true,
    'reports.custom': true,
    'reports.whitelabel': true,
    'reports.export_pdf': true,
    'reports.export_excel': true,
    'reports.export_csv': true,
    'reports.scheduled': true,
    'reports.auto_email': true,
    'analytics.dashboard': true,
    'analytics.kpi': true,
    'analytics.business': true,
    'analytics.charts_advanced': true,
    'analytics.executive': true,
    'api.access': true,
  },
};

export const PLAN_LIMITS_MAP: Record<SubscriptionPlanTier, PlanLimits> = {
  trial: {
    maxUsers: 3,
    maxBranches: 1,
    maxCounters: 2,
    maxMonthlyRequests: 50,
    dataRetentionDays: 14,
  },
  professional: {
    maxUsers: 15,
    maxBranches: 5,
    maxCounters: 10,
    maxMonthlyRequests: 5000,
    dataRetentionDays: 365,
  },
  enterprise: {
    maxUsers: 999,
    maxBranches: 99,
    maxCounters: 100,
    maxMonthlyRequests: 999999,
    dataRetentionDays: 3650,
  },
};
