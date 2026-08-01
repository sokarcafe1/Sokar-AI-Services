import React, { useState } from 'react';
import { Bell, CheckCircle2, Sparkles, ExternalLink, ShieldCheck, X } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [subscribed, setSubscribed] = useState({
    results: true,
    schools: true,
    tansik: true,
    housing: true,
    jobs: false,
    electricity: false,
  });

  const [toastMsg, setToastMsg] = useState('');

  if (!isOpen) return null;

  const toggleSub = (key: keyof typeof subscribed) => {
    setSubscribed((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      setToastMsg('تم تحديث تفضيلات التنبيهات بنجاح!');
      setTimeout(() => setToastMsg(''), 2000);
      return next;
    });
  };

  const sampleAlerts = [
    {
      id: 'a1',
      title: 'صدور نتائج الشهادة الإعدادية بمحافظة القاهرة والدقهلية والجيزة',
      time: 'منذ ساعتين',
      category: 'نتائج الامتحانات',
      url: 'https://cairo.gov.eg',
    },
    {
      id: 'a2',
      title: 'فتح باب حجز شقق سكن لكل المصريين المرحلة الخامسة',
      time: 'منذ 5 ساعات',
      category: 'الإسكان الاجتماعي',
      url: 'https://shmff.gov.eg',
    },
    {
      id: 'a3',
      title: 'بدء المرحلة الأولى لتنسيق الكليات والمعاهد الحكومية',
      time: 'منذ يوم واحد',
      category: 'التنسيق الإلكتروني',
      url: 'https://tansik.digital.gov.eg',
    },
    {
      id: 'a4',
      title: 'تخصيص مسابقة معلم مادة للتعليم الأساسي بكافة المحافظات',
      time: 'منذ يومين',
      category: 'الوظائف الحكومية',
      url: 'https://jobs.caoa.gov.eg',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white p-4 flex items-center justify-between border-b border-sky-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-700 border border-sky-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base">مركز التنبيهات والإشعارات الرسمية</h2>
              <p className="text-[11px] text-sky-200">تابع المواعيد الهامة ونتائج الامتحانات وحجوزات الإسكان</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-sky-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {toastMsg && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Alert Toggles */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" /> تخصيص قطاعات التنبيهات الفورية:
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribed.results}
                  onChange={() => toggleSub('results')}
                  className="rounded text-sky-800 focus:ring-sky-600"
                />
                <span className="font-semibold text-slate-800">🎯 نتائج الامتحانات</span>
              </label>

              <label className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribed.housing}
                  onChange={() => toggleSub('housing')}
                  className="rounded text-sky-800 focus:ring-sky-600"
                />
                <span className="font-semibold text-slate-800">🏠 شقق الإسكان</span>
              </label>

              <label className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribed.schools}
                  onChange={() => toggleSub('schools')}
                  className="rounded text-sky-800 focus:ring-sky-600"
                />
                <span className="font-semibold text-slate-800">🏫 قبول المدارس</span>
              </label>

              <label className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribed.jobs}
                  onChange={() => toggleSub('jobs')}
                  className="rounded text-sky-800 focus:ring-sky-600"
                />
                <span className="font-semibold text-slate-800">💼 الوظائف الحكومية</span>
              </label>
            </div>
          </div>

          {/* Sample Active Alerts */}
          <div>
            <h3 className="font-bold text-xs text-slate-800 mb-2">أحدث الإشعارات والتنبيهات المباشرة:</h3>
            <div className="space-y-2">
              {sampleAlerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {alt.category}
                    </span>
                    <span className="text-slate-400">{alt.time}</span>
                  </div>
                  <p className="font-bold text-xs text-slate-900 leading-snug">{alt.title}</p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3 h-3" /> تم التحقق من المصدر
                    </span>
                    <a
                      href={alt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-800 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>الانتقال للموقع</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
