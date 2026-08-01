import React from 'react';
import { ShieldAlert, ArrowRight, ShieldCheck, Lock, UserCheck } from 'lucide-react';
import { AuthSession, RolePermissions, SystemRole, ROLE_LABELS_AR } from '../../types/auth';
import { AuthPage } from './AuthPage';

interface ProtectedRouteProps {
  session: AuthSession | null;
  onLoginSuccess: (session: AuthSession) => void;
  requiredPermission?: keyof RolePermissions;
  allowedRoles?: SystemRole[];
  themeMode: 'light' | 'dark' | 'black';
  onToggleTheme: () => void;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  session,
  onLoginSuccess,
  requiredPermission,
  allowedRoles,
  themeMode,
  onToggleTheme,
  children,
}) => {
  // 1. Mandatory Entry Gate Check: Must be logged in
  if (!session || !session.user) {
    return (
      <AuthPage
        onLoginSuccess={onLoginSuccess}
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
      />
    );
  }

  const user = session.user;

  // 2. Role Check if specific roles or permission specified
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-rose-950/80 border border-rose-600/50 flex items-center justify-center mx-auto text-rose-400 shadow-xl">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-800">
              صلاحيات غير كافية (403 Unauthorized)
            </span>
            <h2 className="font-extrabold text-xl text-white mt-2">غير مصرح بالدخول إلى قسم النظام</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              عفواً، حسابك ذو الصفة (<strong>{user.roleTitleAr}</strong>) لا يملك تصريح الوصول إلى هذا الموديول.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-right space-y-1.5 text-xs text-slate-300">
            <p className="font-bold text-slate-200">فئات الحسابات المصرح لها بدخول هذه الصفحة:</p>
            <ul className="list-disc list-inside space-y-1 text-emerald-400 font-medium">
              {allowedRoles.map((r) => (
                <li key={r}>{ROLE_LABELS_AR[r]}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={onToggleTheme}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>العودة إلى لوحة التحكم المتاحة لحسابك</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Permitted -> Render children
  return <>{children}</>;
};
