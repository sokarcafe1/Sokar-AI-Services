export type SystemRole = 
  | 'super_admin'
  | 'office_owner'
  | 'branch_manager'
  | 'employee'
  | 'cashier'
  | 'customer';

export type AccountStatus = 'active' | 'pending_approval' | 'locked' | 'suspended';

export interface UserSessionDevice {
  id: string;
  device: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: SystemRole;
  roleTitleAr: string;
  nationalId?: string; // 14 digits
  phoneNumber?: string;
  governorate?: string;
  status: AccountStatus;
  createdAt: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin?: string;
  avatarEmoji?: string;
  trialEndsAt?: string; // ISO date string for 24-hour trial period
  officeId?: string;
  branchId?: string;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  user: AuthUser;
  expiresAt: number; // Unix timestamp ms
  rememberMe: boolean;
  activeSessions: UserSessionDevice[];
}

export interface LoginCredentials {
  identifier: string; // Email or Username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCustomerData {
  fullName: string;
  phoneNumber: string;
  password: string;
  nationalId?: string; // 14 digits (optional/auto-generated)
  email?: string;
  confirmPassword?: string;
  governorate?: string;
  acceptTerms?: boolean;
  verificationCode?: string;
}

export interface RateLimitState {
  failedAttempts: number;
  isLocked: boolean;
  lockUntil: number | null; // Unix timestamp ms
  remainingTimeSeconds?: number;
}

export interface RolePermissions {
  canAccessDashboard: boolean;
  canAccessAdmin: boolean;
  canAccessCustomers: boolean;
  canAccessRequests: boolean;
  canAccessServices: boolean;
  canEditServices: boolean;
  canAccessReports: boolean;
  canAccessFinancials: boolean;
  canAccessSettings: boolean;
  canManageUsers: boolean;
  canAccessSuperAdmin: boolean;
  canViewOnlyOwnData: boolean;
}

export const ROLE_PERMISSIONS: Record<SystemRole, RolePermissions> = {
  super_admin: {
    canAccessDashboard: true,
    canAccessAdmin: true,
    canAccessCustomers: true,
    canAccessRequests: true,
    canAccessServices: true,
    canEditServices: true,
    canAccessReports: true,
    canAccessFinancials: true,
    canAccessSettings: true,
    canManageUsers: true,
    canAccessSuperAdmin: true,
    canViewOnlyOwnData: false,
  },
  office_owner: {
    canAccessDashboard: true,
    canAccessAdmin: true,
    canAccessCustomers: true,
    canAccessRequests: true,
    canAccessServices: true,
    canEditServices: true,
    canAccessReports: true,
    canAccessFinancials: true,
    canAccessSettings: false,
    canManageUsers: true,
    canAccessSuperAdmin: false,
    canViewOnlyOwnData: false,
  },
  branch_manager: {
    canAccessDashboard: true,
    canAccessAdmin: true,
    canAccessCustomers: true,
    canAccessRequests: true,
    canAccessServices: true,
    canEditServices: false,
    canAccessReports: true,
    canAccessFinancials: false,
    canAccessSettings: false,
    canManageUsers: false,
    canAccessSuperAdmin: false,
    canViewOnlyOwnData: false,
  },
  employee: {
    canAccessDashboard: true,
    canAccessAdmin: false,
    canAccessCustomers: true,
    canAccessRequests: true,
    canAccessServices: true,
    canEditServices: false,
    canAccessReports: false,
    canAccessFinancials: false,
    canAccessSettings: false,
    canManageUsers: false,
    canAccessSuperAdmin: false,
    canViewOnlyOwnData: false,
  },
  cashier: {
    canAccessDashboard: true,
    canAccessAdmin: false,
    canAccessCustomers: true,
    canAccessRequests: true,
    canAccessServices: true,
    canEditServices: false,
    canAccessReports: false,
    canAccessFinancials: true,
    canAccessSettings: false,
    canManageUsers: false,
    canAccessSuperAdmin: false,
    canViewOnlyOwnData: false,
  },
  customer: {
    canAccessDashboard: true,
    canAccessAdmin: false,
    canAccessCustomers: false,
    canAccessRequests: true,
    canAccessServices: true,
    canEditServices: false,
    canAccessReports: false,
    canAccessFinancials: false,
    canAccessSettings: false,
    canManageUsers: false,
    canAccessSuperAdmin: false,
    canViewOnlyOwnData: true,
  },
};

export const ROLE_LABELS_AR: Record<SystemRole, string> = {
  super_admin: 'مسؤول النظام الأعلى (Super Admin)',
  office_owner: 'صاحب المكتب (Office Owner)',
  branch_manager: 'مدير الفرع (Branch Manager)',
  employee: 'موظف تنفيذ المعاملات (Employee)',
  cashier: 'أمين الخزينة والكاشير (Cashier)',
  customer: 'مواطن / متلقي الخدمة (Customer)',
};
