import React, { useState } from 'react';
import { GovernmentMinistry, ServiceCenter, Language } from '../types';
import { X, Search, Building2, PhoneCall, Mail, Globe, MapPin, Clock, ExternalLink } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface GovernmentDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ministries: GovernmentMinistry[];
  lang?: Language;
}

export const GovernmentDirectoryModal: React.FC<GovernmentDirectoryModalProps> = ({
  isOpen,
  onClose,
  ministries,
  lang = 'ar'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const governorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'القليوبية', 'الدقهلية', 
    'الشرقية', 'المنوفية', 'الغربية', 'البحيرة', 'أسيوط', 'سوهاج', 'أسوان'
  ];

  const filteredMinistries = ministries.filter(m => {
    const matchesSearch = 
      m.name.includes(searchQuery) ||
      m.hotline.includes(searchQuery) ||
      m.officialEmail.includes(searchQuery) ||
      m.description.includes(searchQuery);

    const matchesGov = selectedGovernorate === 'all' || m.governoratesServed.includes(selectedGovernorate) || m.governoratesServed.includes('جميع المحافظات');

    return matchesSearch && matchesGov;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white p-5 flex items-center justify-between border-b border-sky-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-800/80 flex items-center justify-center text-xl shadow-inner border border-sky-700/60">
              🏛️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {isAr ? 'الدليل الوطني الموحد للجهات والوزارات والمحافظات' : 'National Government Directory'}
              </h2>
              <p className="text-xs text-sky-200">
                {isAr ? 'عناوين، خطوط ساخنة، مواقع رسمية، إيميلات معتمدة، وأوقات عمل الوزارات والمحافظات' : 'Official contact directory for all ministries, authorities, and governorates'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Governorate Filters */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? "ابحث بـاسم الوزارة، الخط الساخن (مثلاً 16001)، البريد المعتمد..." : "Search by ministry name, hotline, email..."}
              className="w-full pl-4 pr-10 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-600 shadow-xs"
            />
          </div>

          <div>
            <select
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-bold focus:outline-none focus:border-sky-600 shadow-xs"
            >
              <option value="all">{isAr ? 'جميع المحافظات والنطاقات' : 'All Governorates'}</option>
              {governorates.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid of Ministries & Authorities */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMinistries.map(min => (
              <div key={min.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 hover:border-sky-300 transition-all flex flex-col justify-between">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-2 bg-sky-50 rounded-xl border border-sky-100">{min.logoEmoji}</span>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{min.name}</h3>
                        <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                          {min.hotline ? `الخط الساخن: ${min.hotline}` : 'جهة حكومية'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {min.description}
                  </p>
                </div>

                {/* Contact List */}
                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2 text-slate-700">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold">الخط الساخن:</span>
                    <a href={`tel:${min.hotline}`} className="font-mono font-bold text-emerald-800 hover:underline">{min.hotline}</a>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="font-bold">البريد الرسمي:</span>
                    <a href={`mailto:${min.officialEmail}`} className="font-mono text-sky-800 underline truncate">{min.officialEmail}</a>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-bold">المقر الرئيسي:</span>
                    <span className="text-slate-800 truncate">{min.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="font-bold">أوقات العمل:</span>
                    <span className="text-slate-800">{min.workingHours}</span>
                  </div>
                </div>

                {/* Website Link Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-bold">
                    {min.relatedServicesCount} خدمة حكومية موثقة
                  </span>
                  <a
                    href={min.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                    <span>البوابة الرسمية</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
