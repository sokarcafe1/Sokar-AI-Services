import { AuthUser } from '../types/auth';

// Helper password hash simulator (In production Node server, bcrypt / argon2 is used)
export function hashPassword(plainText: string): string {
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'sha256_sim_' + Math.abs(hash).toString(16) + '_secure_v1';
}

export interface StoredUserAccount extends AuthUser {
  passwordHash: string;
}

// Default System Accounts - Kept empty in production environment for security.
// Admin users and office accounts must be created dynamically via database or system owner provisioning.
export const DEFAULT_ACCOUNTS: StoredUserAccount[] = [];

