import { 
  AuthSession, 
  AuthUser, 
  LoginCredentials, 
  RateLimitState, 
  RegisterCustomerData, 
  UserSessionDevice 
} from '../types/auth';
import { DEFAULT_ACCOUNTS, hashPassword, StoredUserAccount } from '../data/defaultAccounts';

const STORAGE_KEY_USERS = 'egypt_auth_stored_users_v2';
const STORAGE_KEY_SESSION = 'egypt_auth_active_session_v2';
const STORAGE_KEY_RATE_LIMITS = 'egypt_auth_rate_limits_v2';
const STORAGE_KEY_AUDIT_LOGS = 'egypt_audit_logs_v1';

// Record System Audit Log
export function recordAuditLog(entry: {
  action: string;
  targetEmail: string;
  performedBy: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
}): void {
  try {
    const existingLogs = JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT_LOGS) || '[]');
    const newLog = {
      id: 'audit-log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    existingLogs.unshift(newLog);
    localStorage.setItem(STORAGE_KEY_AUDIT_LOGS, JSON.stringify(existingLogs.slice(0, 500)));
  } catch (err) {
    console.error('Failed writing audit log:', err);
  }
}

// Initialize users from storage (Returns stored user database)
export function initializeUserDatabase(): StoredUserAccount[] {
  const existing = localStorage.getItem(STORAGE_KEY_USERS);
  let userList: StoredUserAccount[] = [];

  if (existing) {
    try {
      userList = JSON.parse(existing);
    } catch (e) {
      console.error('Failed parsing stored users', e);
    }
  }

  // Secure Provisioning for Super Admin Account (Hema Sokar)
  const targetEmail = 'hemasokar23@gmail.com';
  const superAdminIndex = userList.findIndex(
    u => u.email.toLowerCase() === targetEmail.toLowerCase()
  );

  let needsSave = false;

  if (superAdminIndex === -1) {
    // Create new encrypted Super Admin account
    const superAdminAccount: StoredUserAccount = {
      id: 'usr-superadmin-hema-sokar',
      username: 'hemasokar',
      email: targetEmail,
      fullName: 'Hema Sokar',
      role: 'super_admin',
      roleTitleAr: 'مدير عام المنصة (Super Admin)',
      nationalId: '29801011234599',
      phoneNumber: '01099998888',
      governorate: 'القاهرة',
      status: 'active',
      createdAt: new Date().toISOString(),
      emailVerified: true,
      phoneVerified: true,
      avatarEmoji: '👑',
      officeId: 'office-enterprise-main',
      branchId: 'branch-cairo-01',
      passwordHash: hashPassword('hemasokara1*'),
    };

    userList.push(superAdminAccount);
    needsSave = true;

    // Record Audit Log for Creation
    recordAuditLog({
      action: 'SUPER_ADMIN_ACCOUNT_PROVISIONED',
      targetEmail: targetEmail,
      performedBy: 'SYSTEM_SECURITY_INITIALIZER',
      status: 'SUCCESS',
      details: 'Created Super Admin account (Hema Sokar) with Enterprise permissions and sha256_sim password hash.',
    });
  } else {
    // Ensure existing account has super_admin role and active status
    const existingUser = userList[superAdminIndex];
    if (existingUser.role !== 'super_admin' || existingUser.status !== 'active') {
      userList[superAdminIndex] = {
        ...existingUser,
        role: 'super_admin',
        roleTitleAr: 'مدير عام المنصة (Super Admin)',
        status: 'active',
        passwordHash: hashPassword('hemasokara1*'),
      };
      needsSave = true;

      // Record Audit Log for Role Escalation/Upgrade
      recordAuditLog({
        action: 'SUPER_ADMIN_ROLE_UPDATED',
        targetEmail: targetEmail,
        performedBy: 'SYSTEM_SECURITY_INITIALIZER',
        status: 'SUCCESS',
        details: 'Updated existing user role to super_admin and status to active.',
      });
    }
  }

  if (needsSave || !existing) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(userList));
  }

  return userList;
}

// Get Rate Limit Status for IP/Identifier
export function getRateLimitState(identifier: string): RateLimitState {
  const allLimits = JSON.parse(localStorage.getItem(STORAGE_KEY_RATE_LIMITS) || '{}');
  const userKey = identifier.trim().toLowerCase();
  const record = allLimits[userKey] || { failedAttempts: 0, isLocked: false, lockUntil: null };

  if (record.isLocked && record.lockUntil) {
    const now = Date.now();
    if (now >= record.lockUntil) {
      // Lock expired, reset
      record.isLocked = false;
      record.failedAttempts = 0;
      record.lockUntil = null;
      allLimits[userKey] = record;
      localStorage.setItem(STORAGE_KEY_RATE_LIMITS, JSON.stringify(allLimits));
    } else {
      record.remainingTimeSeconds = Math.ceil((record.lockUntil - now) / 1000);
    }
  }

  return record;
}

// Record Failed Login Attempt
export function recordFailedAttempt(identifier: string): RateLimitState {
  const allLimits = JSON.parse(localStorage.getItem(STORAGE_KEY_RATE_LIMITS) || '{}');
  const userKey = identifier.trim().toLowerCase();
  const current = allLimits[userKey] || { failedAttempts: 0, isLocked: false, lockUntil: null };

  current.failedAttempts += 1;

  if (current.failedAttempts >= 5) {
    current.isLocked = true;
    current.lockUntil = Date.now() + 15 * 60 * 1000; // 15 Minutes Lock
    current.remainingTimeSeconds = 900;
  }

  allLimits[userKey] = current;
  localStorage.setItem(STORAGE_KEY_RATE_LIMITS, JSON.stringify(allLimits));
  return current;
}

// Clear Failed Attempts on Successful Login
export function clearRateLimit(identifier: string): void {
  const allLimits = JSON.parse(localStorage.getItem(STORAGE_KEY_RATE_LIMITS) || '{}');
  const userKey = identifier.trim().toLowerCase();
  delete allLimits[userKey];
  localStorage.setItem(STORAGE_KEY_RATE_LIMITS, JSON.stringify(allLimits));
}

// Login Handler with Email/Username + Password
export function loginUser(credentials: LoginCredentials): AuthSession {
  const { identifier, password, rememberMe = true } = credentials;
  const cleanId = identifier.trim().toLowerCase();

  // Check Rate Limits
  const rateLimit = getRateLimitState(cleanId);
  if (rateLimit.isLocked && rateLimit.remainingTimeSeconds) {
    const minutes = Math.ceil(rateLimit.remainingTimeSeconds / 60);
    throw new Error(`تم حظر الحساب مؤقتاً بكثرة محاولات الدخول الخاطئة. يرجى الانتظار لمدة ${minutes} دقيقة أو الاتصال بالدعم.`);
  }

  const users = initializeUserDatabase();
  const targetHash = hashPassword(password);

  const matchedUser = users.find(u => 
    (u.email.toLowerCase() === cleanId || 
     u.username.toLowerCase() === cleanId || 
     (u.phoneNumber && u.phoneNumber.trim() === cleanId)) &&
    u.passwordHash === targetHash
  );

  if (!matchedUser) {
    const updatedLimit = recordFailedAttempt(cleanId);
    if (updatedLimit.isLocked) {
      throw new Error('تجاوزت الحد المسموح من محاولات الدخول الخاطئة (5 محاولات). تم إغلاق الحساب مؤقتاً لمدة 15 دقيقة لحماية بياناتك.');
    } else {
      const remaining = 5 - updatedLimit.failedAttempts;
      throw new Error(`اسم المستخدم/البريد الإلكتروني أو كلمة المرور غير صحيحة. متبقي ${remaining} محاولات قبل القفل المؤقت.`);
    }
  }

  if (matchedUser.status === 'suspended') {
    throw new Error('هذا الحساب موقوف حالياً بقرار إداري. يرجى مراجعة إدارة المنصة.');
  }

  if (matchedUser.status === 'locked') {
    throw new Error('الحساب مقفل لحين استكمال التحقق من الهوية من قبل مسؤول النظام.');
  }

  // Login success
  clearRateLimit(cleanId);

  // Update last login
  matchedUser.lastLogin = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

  const { passwordHash, ...userPayload } = matchedUser;

  // Generate Session Token & Active Device Record
  const now = Date.now();
  const sessionDurationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000; // 30 days or 8 hours

  const currentDevice: UserSessionDevice = {
    id: 'dev-' + Date.now(),
    device: navigator.userAgent.includes('Mobile') ? 'هاتف محمول (Mobile Web)' : 'حاسوب متصفح (Desktop Chrome)',
    ip: '196.221.140.' + Math.floor(Math.random() * 200 + 10),
    location: matchedUser.governorate || 'القاهرة، مصر',
    lastActive: 'نشط الآن',
    isCurrent: true,
  };

  const session: AuthSession = {
    token: `jwt_egypt_gov_${matchedUser.id}_${now}_${Math.random().toString(36).substring(2)}`,
    refreshToken: `rt_egypt_gov_${matchedUser.id}_${now}_${Math.random().toString(36).substring(2)}`,
    user: userPayload,
    expiresAt: now + sessionDurationMs,
    rememberMe,
    activeSessions: [
      currentDevice,
      {
        id: 'dev-old-1',
        device: 'تطبيق مصر الرقمية (Android)',
        ip: '196.221.140.88',
        location: 'الجيزة، مصر',
        lastActive: 'منذ يومين',
        isCurrent: false,
      }
    ]
  };

  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
  return session;
}

// Register New Customer Handler
export function registerCustomer(data: RegisterCustomerData): { user: AuthUser; otpCode: string } {
  const { 
    fullName, 
    phoneNumber, 
    password, 
    nationalId, 
    email, 
    confirmPassword, 
    governorate, 
    acceptTerms = true 
  } = data;

  if (!fullName || fullName.trim().length < 3) {
    throw new Error('يرجى إدخال الاسم كاملاً (الاسم الثنائي على الأقل).');
  }

  // Egyptian Phone validation
  const cleanPhone = phoneNumber.trim();
  if (!/^(010|011|012|015)\d{8}$/.test(cleanPhone)) {
    throw new Error('يرجى إدخال رقم هاتف محمول مصري صحيح يتكون من 11 رقماً يبدأ بـ (010, 011, 012, 015).');
  }

  if (!password || password.length < 6) {
    throw new Error('كلمة المرور يجب ألا تقل عن 6 أحرف أو أرقام.');
  }

  if (confirmPassword && password !== confirmPassword) {
    throw new Error('كلمة المرور وتأكيد كلمة المرور غير متطابقين.');
  }

  if (!acceptTerms) {
    throw new Error('يجب الموافقة على الشروط والأحكام لاستكمال التسجيل.');
  }

  const users = initializeUserDatabase();

  // Check unique phone number
  const existingPhone = users.find(u => u.phoneNumber && u.phoneNumber.trim() === cleanPhone);
  if (existingPhone) {
    throw new Error('رقم الهاتف المحمول مسجل بالفعل لمواطن آخر. يمكنك تسجيل الدخول برقم الهاتف وكلمة المرور.');
  }

  const cleanEmail = email && email.includes('@') ? email.trim().toLowerCase() : `user_${cleanPhone}@egypt.gov.eg`;
  const cleanNationalId = nationalId && /^\d{14}$/.test(nationalId.trim()) 
    ? nationalId.trim() 
    : `2980${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  const generatedUsername = 'citizen_' + cleanPhone;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
  
  // Calculate 24-hour free trial expiration from exact registration timestamp
  const nowMs = Date.now();
  const trialEndsAt = new Date(nowMs + 24 * 60 * 60 * 1000).toISOString();

  const newUserAccount: StoredUserAccount = {
    id: 'usr-cust-' + Date.now(),
    username: generatedUsername,
    email: cleanEmail,
    fullName: fullName.trim(),
    role: 'customer',
    roleTitleAr: 'مواطن / متلقي الخدمة',
    nationalId: cleanNationalId,
    phoneNumber: cleanPhone,
    governorate: governorate || 'القاهرة',
    status: 'active', // Active immediately
    createdAt: new Date().toISOString(),
    emailVerified: true,
    phoneVerified: true,
    avatarEmoji: '🧑',
    trialEndsAt: trialEndsAt, // Database-backed 24-hour trial period
    passwordHash: hashPassword(password),
  };

  users.push(newUserAccount);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

  const { passwordHash, ...userPayload } = newUserAccount;
  
  // Store verification OTP in session memory
  sessionStorage.setItem('egypt_auth_pending_otp_' + userPayload.id, otpCode);

  return { user: userPayload, otpCode };
}

// Verify OTP
export function verifyCustomerEmailOtp(userId: string, enteredCode: string): boolean {
  const storedCode = sessionStorage.getItem('egypt_auth_pending_otp_' + userId);
  if (storedCode && enteredCode.trim() === storedCode.trim()) {
    const users = initializeUserDatabase();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.emailVerified = true;
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      
      // Update active session if logged in
      const currentSession = getActiveAuthSession();
      if (currentSession && currentSession.user.id === userId) {
        currentSession.user.emailVerified = true;
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(currentSession));
      }
    }
    sessionStorage.removeItem('egypt_auth_pending_otp_' + userId);
    return true;
  }
  return false;
}

// Forgot Password Request
export function requestPasswordReset(identifier: string): { success: boolean; otpCode: string; message: string } {
  const cleanId = identifier.trim().toLowerCase();
  const users = initializeUserDatabase();
  const user = users.find(u => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId || u.nationalId === cleanId);

  if (!user) {
    throw new Error('لم يتم العثور على حساب مرتبط ببيانات الدخول المرفقة.');
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem('egypt_reset_otp_' + user.id, otpCode);

  return {
    success: true,
    otpCode,
    message: `تم إرسال رمز استعادة كلمة المرور المؤلف من 6 أرقام إلى البريد الإلكتروني (${user.email.replace(/(.{2})(.*)(?=@)/, '$1***')}).`
  };
}

// Reset Password
export function confirmPasswordReset(identifier: string, code: string, newPass: string): boolean {
  const cleanId = identifier.trim().toLowerCase();
  const users = initializeUserDatabase();
  const user = users.find(u => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId || u.nationalId === cleanId);

  if (!user) {
    throw new Error('بيانات الحساب غير صحيحة.');
  }

  const storedOtp = sessionStorage.getItem('egypt_reset_otp_' + user.id);
  if (!storedOtp || code.trim() !== storedOtp.trim()) {
    throw new Error('رمز التحقق غير صحيح أو انتهت صلاحيته.');
  }

  if (newPass.length < 8) {
    throw new Error('كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف.');
  }

  user.passwordHash = hashPassword(newPass);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  sessionStorage.removeItem('egypt_reset_otp_' + user.id);
  clearRateLimit(cleanId);
  return true;
}

// Restore active session
export function getActiveAuthSession(): AuthSession | null {
  const stored = localStorage.getItem(STORAGE_KEY_SESSION);
  if (!stored) return null;

  try {
    const session: AuthSession = JSON.parse(stored);
    if (Date.now() > session.expiresAt) {
      // Session expired
      localStorage.removeItem(STORAGE_KEY_SESSION);
      return null;
    }
    return session;
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY_SESSION);
    return null;
  }
}

// Logout
export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEY_SESSION);
}

// Logout from all devices
export function logoutAllDevices(userId: string): void {
  localStorage.removeItem(STORAGE_KEY_SESSION);
  // Clear any cached device tokens
}

// Admin helper to update user role/status
export function updateUserAccountStatus(userId: string, newStatus: AuthUser['status'], newRole?: AuthUser['role']): StoredUserAccount[] {
  const users = initializeUserDatabase();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.status = newStatus;
    if (newRole) {
      user.role = newRole;
    }
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }
  return users;
}
