import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Search, Filter, Building2, Navigation, X } from 'lucide-react';
import { ServiceCenter } from '../types';
import { EGYPT_GOVERNORATES } from '../data/centersData';

interface ServiceCentersModalProps {
  isOpen: boolean;
  onClose: () => void;
  centers: ServiceCenter[];
}

export const ServiceCentersModal: React.FC<ServiceCentersModalProps> = ({
  isOpen,
  onClose,
  centers,
}) => {
  const [selectedGov, setSelectedGov] = useState<string>('الكل (جميع المحافظات)');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const typesList = [
    { id: 'all', label: 'جميع المراكز والقطاعات' },
    { id: 'civil_registry', label: '🆔 الأحوال المدنية والسجل المدني' },
    { id: 'traffic', label: '🚗 وحدات وإدارات المرور' },
    { id: 'post_office', label: '📮 مكاتب البريد المصري' },
    { id: 'electricity', label: '⚡ مراكز خدمة الكهرباء' },
    { id: 'passports', label: '✈️ مصلحة الجوازات' },
    { id: 'housing', label: '🏠 مديريات الإسكان' },
  ];

  const filteredCenters = centers.filter((center) => {
    const matchesGov =
      selectedGov === 'الكل (جميع المحافظات)' || center.governorate === selectedGov;
    const matchesType = selectedType === 'all' || center.type === selectedType;
    const matchesSearch =
      searchQuery.trim() === '' ||
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGov && matchesType && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[780px] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-sky-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-700 border border-sky-500 flex items-center justify-center shadow-inner">
              <MapPin className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">دليل خريطة ومراكز الخدمات الحكومية</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  موقع ومواعيد العمل
                </span>
              </div>
              <p className="text-xs text-sky-200">مواقع السجل المدني والمرور ومكاتب البريد والكهرباء بمحافظات مصر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-sky-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="relative sm:col-span-1">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم أو الشارع أو الحي..."
                className="w-full pr-9 pl-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <div>
              <select
                value={selectedGov}
                onChange={(e) => setSelectedGov(e.target.value)}
                className="w-full py-1.5 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 font-semibold text-slate-800"
              >
                {EGYPT_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>
                    📍 {gov}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-1.5 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 font-semibold text-slate-800"
              >
                {typesList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Centers List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50 space-y-3">
          {filteredCenters.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Building2 className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-sm">لا توجد مراكز خدمات مطابقة لخيارات البحث المحددة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCenters.map((center) => (
                <div
                  key={center.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs bg-sky-100 text-sky-900 border border-sky-200 px-2.5 py-0.5 rounded-full font-bold">
                        {center.typeNameAr}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        📍 {center.governorate} - {center.city}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {center.name}
                    </h3>

                    <p className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{center.address}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                      {center.phone && (
                        <span className="flex items-center gap-1 font-mono font-semibold text-sky-800">
                          <Phone className="w-3.5 h-3.5 text-sky-600" />
                          {center.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {center.workingHours}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={center.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-sky-800 hover:bg-sky-900 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>فتح في خرائط جوجل للحصول على الاتجاهات</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
