import React, { useState } from 'react';
import { Newspaper, ExternalLink, Calendar, ShieldCheck, Tag, X, Search, Sparkles } from 'lucide-react';
import { GovernmentNews, CategoryType } from '../types';

interface NewsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsList: GovernmentNews[];
}

export const NewsCenterModal: React.FC<NewsCenterModalProps> = ({
  isOpen,
  onClose,
  newsList,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'interior', label: '🆔 الأحوال المدنية والداخلية' },
    { id: 'housing', label: '🏠 الإسكان والتمويل' },
    { id: 'electricity', label: '⚡ الكهرباء والطاقة' },
    { id: 'traffic', label: '🚗 المرور والنيابة' },
    { id: 'employment', label: '💼 الوظائف الحكومية' },
    { id: 'tansik', label: '🏛️ تنسيق الجامعات' },
    { id: 'results', label: '🎯 نتائج الامتحانات' },
  ];

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[780px] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-sky-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-700 border border-sky-500 flex items-center justify-center shadow-inner">
              <Newspaper className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">آخر الأخبار والبيانات الحكومية الرسمية</h2>
                <span className="bg-sky-700/80 text-sky-200 border border-sky-600 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  محدث يومياً
                </span>
              </div>
              <p className="text-xs text-sky-200">القرارات والبيانات الرسمية الصادرة عن الوزارات والجهات الحكومية</p>
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
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الأخبار والبيانات الرسمية..."
                className="w-full pr-9 pl-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Newspaper className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-sm">لا توجد أخبار حكومية مطابقة للبحث حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {news.imageUrl && (
                      <div className="h-40 w-full overflow-hidden relative">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {news.isImportant && (
                          <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> عاجل ومهم
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                          <Tag className="w-3 h-3 text-sky-600" />
                          {news.sourceName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {news.publishDate}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {news.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {news.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> مصدر رسمى
                    </span>
                    <a
                      href={news.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-800 hover:text-sky-950 hover:underline"
                    >
                      <span>قراءة الخبر بالمصدر</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
