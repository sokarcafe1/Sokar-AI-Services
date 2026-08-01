import React, { useState } from 'react';
import { Code, Copy, Check, ExternalLink, Database, Layers, X } from 'lucide-react';
import { EducationService } from '../types';

interface ApiExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: EducationService[];
}

export const ApiExplorerModal: React.FC<ApiExplorerModalProps> = ({
  isOpen,
  onClose,
  services,
}) => {
  const [activeEndpoint, setActiveEndpoint] = useState<'services' | 'news' | 'centers'>('services');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getEndpointData = () => {
    if (activeEndpoint === 'services') {
      return {
        status: 200,
        total: services.length,
        version: 'v1.0',
        timestamp: new Date().toISOString(),
        data: services.slice(0, 3).map((s) => ({
          id: s.id,
          name: s.name,
          authority: s.authority,
          category: s.category,
          officialUrl: s.officialUrl,
          fees: s.fees,
          processingTime: s.processingTime,
          documents: s.documents,
          status: s.status,
        })),
      };
    }
    if (activeEndpoint === 'news') {
      return {
        status: 200,
        total: 6,
        version: 'v1.0',
        timestamp: new Date().toISOString(),
        endpoint: '/api/v1/news',
        data: [
          { id: 'news-1', title: 'تجديد بطاقة الرقم القومي أونلاين', category: 'interior', source: 'وزارة الداخلية' },
          { id: 'news-2', title: 'شقق سكن لكل المصريين المرحلة الجديدة', category: 'housing', source: 'صندوق الإسكان' },
        ],
      };
    }
    return {
      status: 200,
      total: 8,
      version: 'v1.0',
      timestamp: new Date().toISOString(),
      endpoint: '/api/v1/centers',
      data: [
        { id: 'center-1', name: 'سجل مدني العباسية', governorate: 'القاهرة', phone: '16582' },
        { id: 'center-3', name: 'مرور الدقي', governorate: 'الجيزة', phone: '0233370000' },
      ],
    };
  };

  const jsonString = JSON.stringify(getEndpointData(), null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] max-h-[700px] flex flex-col border border-slate-700 text-white overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-900 border border-sky-600 flex items-center justify-center">
              <Code className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base">مستكشف واجهة البرمجة (REST API Hub)</h2>
              <p className="text-[11px] text-slate-400">للمطورين وتطبيقات الهاتف الذكي المستقبلية (iOS & Android)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveEndpoint('services')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeEndpoint === 'services'
                  ? 'bg-sky-700 text-white border-sky-500 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              GET /api/v1/services
            </button>
            <button
              onClick={() => setActiveEndpoint('news')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeEndpoint === 'news'
                  ? 'bg-sky-700 text-white border-sky-500 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              GET /api/v1/news
            </button>
            <button
              onClick={() => setActiveEndpoint('centers')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeEndpoint === 'centers'
                  ? 'bg-sky-700 text-white border-sky-500 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              GET /api/v1/centers
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
            <span>{copied ? 'تم النسخ' : 'نسخ JSON'}</span>
          </button>
        </div>

        {/* Code Output Viewer */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-xs text-emerald-400 leading-relaxed dir-ltr text-left">
          <pre className="whitespace-pre-wrap break-all">{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-sky-400" />
            <span>قاعدة بيانات مصممة لاستيعاب أكثر من 5,000 خدمة حكومية</span>
          </span>
          <span className="font-mono text-emerald-400">Response Status: 200 OK</span>
        </div>
      </div>
    </div>
  );
};
