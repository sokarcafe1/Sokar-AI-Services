import React, { useState } from 'react';
import { GovernmentMinistry } from '../types';
import { X, Search, ExternalLink, PhoneCall, Mail, MapPin, Clock, Globe, Share2, Building2 } from 'lucide-react';

interface MinistriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  ministries: GovernmentMinistry[];
}

export const MinistriesModal: React.FC<MinistriesModalProps> = ({
  isOpen,
  onClose,
  ministries
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState<GovernmentMinistry | null>(null);

  if (!isOpen) return null;

  const filtered = ministries.filter(m => 
    m.name.includes(searchQuery) ||
    m.description.includes(searchQuery) ||
    m.hotline.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white p-5 flex items-center justify-between border-b border-sky-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-800/80 flex items-center justify-center text-xl shadow-inner border border-sky-700/60">
              🏛️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">دليل الوزارات والهيئات الحكومية الموحد</h2>
              <p className="text-xs text-sky-200">دليل موثق للجهات الرسمية، المواقع الحكومية، الخط الساخن، والمواعيد</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5 bg-slate-50">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وزارة أو هيئة حكومية أو رقم الخط الساخن..."
              className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-600 shadow-xs"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-2 bg-slate-100 rounded-xl border border-slate-200">{m.logoEmoji}</span>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{m.name}</h3>
                        <p className="text-[11px] text-sky-700 font-bold mt-0.5 flex items-center gap-1">
                          <PhoneCall className="w-3 h-3 text-sky-600" /> الخط الساخن الرسمي: {m.hotline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    {m.description}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{m.workingHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{m.address}</span>
                    </div>
                    {m.latestAnnouncement && (
                      <div className="mt-2 text-[11px] font-medium text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
                        📢 {m.latestAnnouncement}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={m.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-sky-900 hover:bg-sky-950 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>الموقع الرسمي المباشر</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <button
                    onClick={() => setSelectedMinistry(m)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
                  >
                    التفاصيل الكاملة
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Detailed Modal view if selected */}
        {selectedMinistry && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs dir-rtl border shadow-2xl">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedMinistry.logoEmoji}</span>
                  <h3 className="font-extrabold text-slate-900 text-sm">{selectedMinistry.name}</h3>
                </div>
                <button onClick={() => setSelectedMinistry(null)} className="p-1 rounded text-slate-400 hover:text-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-700 leading-relaxed">{selectedMinistry.description}</p>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border">
                <p><strong>📞 الخط الساخن:</strong> {selectedMinistry.hotline}</p>
                <p><strong>✉️ البريد الإلكتروني الرسمي:</strong> {selectedMinistry.officialEmail}</p>
                <p><strong>📍 المقر والفرع الرئيسي:</strong> {selectedMinistry.address}</p>
                <p><strong>🕒 مواعيد العمل:</strong> {selectedMinistry.workingHours}</p>
                <p><strong>🗺️ المحافظات المغطاة:</strong> {selectedMinistry.governoratesServed.join(', ')}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedMinistry(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl"
                >
                  إغلاق
                </button>
                <a
                  href={selectedMinistry.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-sky-900 hover:bg-sky-950 text-white font-bold rounded-xl flex items-center gap-1"
                >
                  زيارة البوابة الرسمية <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
