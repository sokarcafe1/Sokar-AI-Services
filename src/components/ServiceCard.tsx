import React from 'react';
import { EducationService } from '../types';
import { getServiceIcon, CATEGORY_LABELS } from '../utils/helpers';
import { ExternalLink, Eye, Bookmark, Building2 } from 'lucide-react';
import { ServiceLiveStatusBadge } from './ServiceLiveStatusBadge';

interface ServiceCardProps {
  service: EducationService;
  onOpenDetails: (service: EducationService) => void;
  isBookmarked: boolean;
  onToggleBookmark: (serviceId: string) => void;
  themeMode?: 'light' | 'dark' | 'black';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onOpenDetails,
  isBookmarked,
  onToggleBookmark,
  themeMode = 'light',
}) => {
  const categoryInfo = CATEGORY_LABELS[service.category] || { title: service.category, emoji: '📑' };
  const isBlackTheme = themeMode === 'black';

  return (
    <div className={`rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative ${
      isBlackTheme
        ? service.status === 'active'
          ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 hover:border-amber-400/80 shadow-black'
          : 'bg-zinc-900/50 border-amber-900/40 text-zinc-300'
        : service.status === 'active' 
          ? 'bg-white border-slate-200/90 text-slate-900 hover:border-sky-400' 
          : 'bg-amber-50/20 border-amber-200/70 text-slate-800'
    }`}>
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          
          {/* Service Icon Box */}
          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs transition-all ${
            isBlackTheme
              ? 'bg-zinc-950 text-amber-300 border-zinc-800 group-hover:bg-amber-400 group-hover:text-black'
              : 'bg-sky-50 text-sky-700 border-sky-100 group-hover:bg-sky-600 group-hover:text-white'
          }`}>
            {getServiceIcon(service.iconName, "w-5 h-5")}
          </div>

          {/* Status Badges & Live Monitor & Bookmark Button */}
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {service.status === 'active' && (['tansik', 'housing', 'employment', 'schools', 'academies'].includes(service.category) || service.featured) && (
              <span className="bg-amber-400 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-2xs animate-pulse">
                🔥 فتح التقديم اليوم
              </span>
            )}

            {/* Live Server Status Monitor Pill */}
            <ServiceLiveStatusBadge service={service} compact={true} themeMode={themeMode} />

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(service.id);
              }}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isBookmarked
                  ? 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-2xs'
                  : isBlackTheme
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-amber-300 hover:border-amber-400/60'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200'
              }`}
              title={isBookmarked ? 'إزالة من قائمة الحفظ لوقت لاحق' : 'حفظ لوقت لاحق (Save for Later)'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Service Title */}
        <h3 
          onClick={() => onOpenDetails(service)}
          className={`font-extrabold mb-2 text-base transition-colors cursor-pointer leading-snug line-clamp-2 ${
            isBlackTheme ? 'text-zinc-100 hover:text-amber-300' : 'text-slate-900 hover:text-sky-700'
          }`}
        >
          {service.name}
        </h3>

        {/* Description */}
        <p className={`text-xs mb-4 line-clamp-2 leading-relaxed ${isBlackTheme ? 'text-zinc-400' : 'text-slate-600'}`}>
          {service.description}
        </p>

        {/* Authority & Category Info */}
        <div className={`flex flex-wrap items-center justify-between gap-2 mb-4 text-[11px] border-t pt-3 ${
          isBlackTheme ? 'border-zinc-800/80 text-zinc-400' : 'border-slate-100 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5 truncate max-w-[65%]">
            <Building2 className={`w-3.5 h-3.5 shrink-0 ${isBlackTheme ? 'text-amber-400/80' : 'text-slate-400'}`} />
            <span className={`font-semibold truncate ${isBlackTheme ? 'text-zinc-300' : 'text-slate-700'}`}>{service.authority}</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] shrink-0 border ${
            isBlackTheme ? 'bg-zinc-950 text-amber-300 border-zinc-800' : 'bg-slate-100/80 text-slate-700 border-slate-200/60'
          }`}>
            {categoryInfo.emoji} {categoryInfo.title}
          </span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center gap-2 pt-1 mt-auto">
        <button
          onClick={() => onOpenDetails(service)}
          className={`flex-1 text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            isBlackTheme
              ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-2xs'
              : 'bg-sky-600 hover:bg-sky-700 text-white shadow-2xs'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>عرض خطوات الخدمة</span>
        </button>

        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3.5 py-2.5 border rounded-xl text-xs flex items-center justify-center transition-all ${
            isBlackTheme
              ? 'border-zinc-800 hover:border-amber-400 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300'
              : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-600 hover:text-sky-700'
          }`}
          title={`الانتقال للموقع الرسمي: ${service.officialWebsiteName}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
