import React, { useState } from 'react';
import { User, LogIn, UserPlus, Bookmark, Bell, MapPin, CheckCircle2, ShieldCheck, KeyRound, X } from 'lucide-react';
import { UserProfile, EducationService } from '../types';
import { EGYPT_GOVERNORATES } from '../data/centersData';
import { AnimatedBackground } from './AnimatedBackground';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  allServices: EducationService[];
  bookmarkedIds: string[];
  onSelectService: (service: EducationService) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  allServices,
  bookmarkedIds,
  onSelectService,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'profile'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [msg, setMsg] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg('يرجى ملء جميع الحقول المطلوب ورودها.');
      return;
    }

    const mockProfile: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || email.split('@')[0],
      email: email,
      governorate: governorate,
      savedServices: bookmarkedIds,
      savedSearches: ['رقم قومي', 'مخالفات المرور'],
      subscribedCategories: ['interior', 'housing', 'results', 'tansik'],
    };

    onLogin(mockProfile);
    setMsg('تم تسجيل الدخول وتوثيق الحساب بنجاح!');
    setTimeout(() => {
      setTab('profile');
      setMsg('');
    }, 800);
  };

  const favoriteServicesList = allServices.filter((s) => bookmarkedIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in relative">
      <AnimatedBackground themeMode="dark" isPreAuth={true} />

      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white p-4 flex items-center justify-between border-b border-sky-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-700 border border-sky-500 flex items-center justify-center">
              <User className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base">
                {currentUser ? 'حسابي وبوابة الخدمات المفضلة' : 'دخول / إنشاء حساب المواطن'}
              </h2>
              <p className="text-[11px] text-sky-200">حفظ الخدمات والتنبيهات المخصصة بمحافظتك</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-sky-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher if not logged in */}
        {!currentUser && (
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              onClick={() => {
                setTab('login');
                setMsg('');
              }}
              className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                tab === 'login'
                  ? 'bg-white text-sky-900 border-b-2 border-sky-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
            <button
              onClick={() => {
                setTab('register');
                setMsg('');
              }}
              className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                tab === 'register'
                  ? 'bg-white text-sky-900 border-b-2 border-sky-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>حساب جديد</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-5">
          {msg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{msg}</span>
            </div>
          )}

          {currentUser ? (
            /* Logged-In Profile View */
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sky-950 text-sm">{currentUser.name}</h3>
                  <p className="text-xs text-sky-800">{currentUser.email}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" /> المحافظة: <strong>{currentUser.governorate}</strong>
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  خروج
                </button>
              </div>

              {/* Saved Favorites */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-amber-500" /> الخدمات المفضلة المحفوظة ({favoriteServicesList.length}):
                </h4>
                {favoriteServicesList.length === 0 ? (
                  <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                    لم تقم بحفظ أي خدمات في قائمة المفضلة بعد. انقر على رمز النجمة بجانب أي خدمة لحفظها!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {favoriteServicesList.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => {
                          onSelectService(srv);
                          onClose();
                        }}
                        className="bg-white border border-slate-200 hover:border-sky-400 p-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-xs text-slate-900">{srv.name}</p>
                          <p className="text-[10px] text-slate-500">{srv.authority}</p>
                        </div>
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">
                          عرض
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subscriptions badge */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold flex items-center gap-1 text-sky-900">
                  <Bell className="w-3.5 h-3.5 text-sky-700" /> الاشتراكات والتنبيهات المفعّلة:
                </span>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                    نتائج الامتحانات
                  </span>
                  <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                    شقق الإسكان
                  </span>
                  <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                    الوظائف الحكومية
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Auth Form */
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد محمد علي"
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">كلمة المرور:</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>

              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المحافظة التابع لها:</label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 font-semibold text-slate-800"
                  >
                    {EGYPT_GOVERNORATES.filter((g) => !g.includes('الكل')).map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-sky-800 hover:bg-sky-900 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{tab === 'login' ? 'تأكيد ودخول الحساب' : 'إنشاء حساب المواطن الآن'}</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-bold">أو الدخول التجريبي 24 ساعة</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onLogin({
                    id: 'usr-demo-' + Date.now(),
                    name: 'عميل تجريبي (24 ساعة)',
                    email: 'client.trial24h@egypt-services.gov.eg',
                    governorate: 'القاهرة',
                    savedServices: bookmarkedIds,
                    savedSearches: ['رقم قومي', 'مخالفات المرور', 'سكن لكل المصريين'],
                    subscribedCategories: ['interior', 'housing', 'results', 'tansik'],
                  });
                  setMsg('تم الدخول بنجاح كعميل تجريبي لمدة 24 ساعة! ⏱️');
                  setTimeout(() => {
                    onClose();
                  }, 600);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>⏱️ دخول عميل تجريبي 24 ساعة مباشرة (بدون كلمة مرور)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
