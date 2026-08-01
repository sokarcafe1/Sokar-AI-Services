import React, { useState } from 'react';
import { EducationService, UserProfile, Language } from '../types';
import { X, Bookmark, Clock, Download, Bell, User, Calendar, CheckCircle, Trash2, ArrowRight, ExternalLink } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  services: EducationService[];
  onSelectService: (service: EducationService) => void;
  onOpenPdfGuide: (service: EducationService) => void;
  onToggleBookmark?: (serviceId: string) => void;
  lang?: Language;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  services,
  onSelectService,
  onOpenPdfGuide,
  onToggleBookmark,
  lang = 'ar'
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'reminders' | 'profile'>('bookmarks');
  const [savedSearchQuery, setSavedSearchQuery] = useState('');
  const [reminders, setReminders] = useState(userProfile.reminders || [
    { id: '1', serviceTitle: 'تجديد رخصة القيادة الشخصية', dueDate: '2026-08-15', note: 'متبقي 22 يوماً على موعد التجديد' },
    { id: '2', serviceTitle: 'التقديم في مرحلة رياض الأطفال', dueDate: '2026-06-30', note: 'تم تقديم الطلب إلكترونياً بنجاح عبر البوابة' }
  ]);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const bookmarkedServices = services.filter(s => userProfile.savedServices.includes(s.id));
  const filteredBookmarkedServices = bookmarkedServices.filter(s => 
    !savedSearchQuery ||
    s.name.toLowerCase().includes(savedSearchQuery.toLowerCase()) ||
    s.authority.toLowerCase().includes(savedSearchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(savedSearchQuery.toLowerCase())
  );
  const recentlyViewedServices = services.filter(s => (userProfile.recentlyViewedServices || []).includes(s.id));

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 flex items-center justify-center text-xl shadow-inner border border-emerald-600/60">
              👤
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {isAr ? 'بوابة المواطن الشخصية (لوحة المتابعة وتتبع المعاملات)' : 'Citizen Dashboard & Reminders'}
              </h2>
              <p className="text-xs text-emerald-200">
                {isAr ? `أهلاً بك، ${userProfile.name} • متابعة الخدمات المحفوظة والمواعيد الهامة` : `Welcome, ${userProfile.name}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-4 pt-3 gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'bookmarks'
                ? 'border-emerald-600 text-emerald-900 font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? `الخدمات المحفوظة (${bookmarkedServices.length})` : `Saved Services (${bookmarkedServices.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-emerald-600 text-emerald-900 font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-sky-600" />
            <span>{isAr ? 'السجل والأخيرة مشاهدة' : 'Recently Viewed'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reminders'
                ? 'border-emerald-600 text-emerald-900 font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>{isAr ? `التنبيهات والمواعيد (${reminders.length})` : `Reminders (${reminders.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-900 font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-purple-600" />
            <span>{isAr ? 'بيانات المواطن والمحافظة' : 'Profile Settings'}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50">

          {/* Bookmarks / Saved Services Tab */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-4">
              {/* Header Info Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>{isAr ? 'قائمة الحفظ لوقت لاحق (Saved Services List)' : 'Saved Services for Later'}</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    {isAr
                      ? `تم حفظ ${bookmarkedServices.length} خدمة في حسابك الشخصي للرجوع السريع وتتبع الخطوات`
                      : `You have ${bookmarkedServices.length} saved services in your account`}
                  </p>
                </div>

                {bookmarkedServices.length > 0 && (
                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      value={savedSearchQuery}
                      onChange={(e) => setSavedSearchQuery(e.target.value)}
                      placeholder={isAr ? 'تصفية المحفوظات...' : 'Filter saved services...'}
                      className="w-full text-xs px-3 py-1.5 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>

              {bookmarkedServices.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-xs">
                  <span className="text-4xl">📌</span>
                  <p className="font-extrabold text-sm text-slate-800">
                    {isAr ? 'لا توجد خدمات محفوظة لوقت لاحق حالياً' : 'No saved services yet'}
                  </p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    {isAr
                      ? 'يمكنك حفظ أي خدمة حكومية بالضغط على زر "حفظ لوقت لاحق" (📌) الموجود في بطاقة الخدمة أو في صفحة التفاصيل للعودة إليها بسهولة.'
                      : 'Click the "Save for Later" button on any service to store it in your account.'}
                  </p>
                </div>
              ) : filteredBookmarkedServices.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                  <p className="font-extrabold text-sm text-slate-800">لا توجد نتائج تطابق "{savedSearchQuery}" في المحفوظات</p>
                  <button onClick={() => setSavedSearchQuery('')} className="text-xs text-emerald-700 font-bold hover:underline">
                    إلغاء التصفية
                  </button>
                </div>
              ) : (
                filteredBookmarkedServices.map(service => (
                  <div key={service.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {service.authority}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">آخر توثيق: {service.lastVerifiedDate}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">{service.name}</h3>
                      <p className="text-xs text-slate-600 line-clamp-1">{service.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectService(service);
                        }}
                        className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                      >
                        {isAr ? 'عرض الإجراءات' : 'View Details'}
                      </button>
                      
                      <button
                        onClick={() => onOpenPdfGuide(service)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isAr ? 'دليل PDF' : 'PDF Guide'}</span>
                      </button>

                      {onToggleBookmark && (
                        <button
                          onClick={() => onToggleBookmark(service.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
                          title="إزالة الخدمة من قائمة المحفوظات"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isAr ? 'إزالة' : 'Remove'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {recentlyViewedServices.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                  <span className="text-4xl">🕒</span>
                  <p className="font-extrabold text-sm text-slate-800">
                    {isAr ? 'سجل المشاهدات الأخيرة فارغ' : 'No recently viewed services'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'تصفح الخدمات الحكومية ليتم حفظها تلقائياً في السجل السريع' : 'Services you inspect will automatically appear here'}
                  </p>
                </div>
              ) : (
                recentlyViewedServices.map(service => (
                  <div key={service.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{service.name}</h4>
                      <p className="text-[11px] text-slate-500">{service.authority}</p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectService(service);
                      }}
                      className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      <span>{isAr ? 'فتح' : 'Open'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Reminders Tab */}
          {activeTab === 'reminders' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
                <span>💡 {isAr ? 'تذكير آلي بالمواعيد النهائية للتجديد والتقديم الحكومي' : 'Automated deadline reminders'}</span>
                <button
                  onClick={() => {
                    const title = prompt(isAr ? 'اسم المعاملة أو التذكير:' : 'Reminder Title:');
                    if (title) {
                      setReminders(prev => [...prev, {
                        id: Date.now().toString(),
                        serviceTitle: title,
                        dueDate: '2026-09-01',
                        note: isAr ? 'مواعيد مستحقة متاحة للتنبيه' : 'Custom user reminder'
                      }]);
                    }
                  }}
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-3 py-1 rounded-xl text-xs"
                >
                  + {isAr ? 'إضافة موعد' : 'Add Reminder'}
                </button>
              </div>

              {reminders.map(rem => (
                <div key={rem.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-amber-300">
                        🗓️ {rem.dueDate}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">{rem.serviceTitle}</h4>
                    </div>
                    <p className="text-xs text-slate-600">{rem.note}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteReminder(rem.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'بيانات الملف الشخصي والمحافظة:' : 'User Profile Details'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isAr ? 'الاسم بالكامل:' : 'Full Name:'}</label>
                  <input
                    type="text"
                    defaultValue={userProfile.name}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isAr ? 'البريد الإلكتروني:' : 'Email Address:'}</label>
                  <input
                    type="email"
                    defaultValue={userProfile.email}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isAr ? 'المحافظة الحالية:' : 'Governorate:'}</label>
                  <input
                    type="text"
                    defaultValue={userProfile.governorate}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isAr ? 'الرقم القومي (اختياري للتذكير):' : 'National ID (Optional):'}</label>
                  <input
                    type="text"
                    defaultValue={userProfile.nationalId || '29801011234567'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(isAr ? 'تم حفظ بيانات الملف الشخصي بنجاح!' : 'Profile updated successfully!')}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-xs"
                >
                  {isAr ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
