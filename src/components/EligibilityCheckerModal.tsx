import React, { useState } from 'react';
import { EducationService } from '../types';
import { X, CheckCircle2, XCircle, AlertTriangle, Printer, FileCheck, HelpCircle, ArrowRight } from 'lucide-react';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: EducationService[];
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  services
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  
  // Interactive Survey state
  const [age, setAge] = useState<number>(25);
  const [isEgyptian, setIsEgyptian] = useState<boolean>(true);
  const [hasNationalId, setHasNationalId] = useState<boolean>(true);
  const [hasMedicalCheck, setHasMedicalCheck] = useState<boolean>(true);
  const [selectedGov, setSelectedGov] = useState<string>('القاهرة');

  // Generated Checklist State
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);

  if (!isOpen) return null;

  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleToggleDoc = (doc: string) => {
    if (checkedDocs.includes(doc)) {
      setCheckedDocs(prev => prev.filter(d => d !== doc));
    } else {
      setCheckedDocs(prev => [...prev, doc]);
    }
  };

  const isEligible = isEgyptian && hasNationalId;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-5 flex items-center justify-between border-b border-emerald-800/50 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 flex items-center justify-center text-xl shadow-inner border border-emerald-700/60">
              📋
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">حاسبة الاستحقاق ومولد قائمة المستندات الشخصية</h2>
              <p className="text-xs text-emerald-200">تحقق من أهليتك للخدمة واستخرج قائمة المستندات الجاهزة للطباعة والتجهيز</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5 bg-slate-50">
          
          {/* Service Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 print:hidden">
            <label className="block text-xs font-bold text-slate-800">اختر الخدمة الحكومية للتحقق وطباعة القائمة:</label>
            <select
              value={selectedServiceId}
              onChange={(e) => {
                setSelectedServiceId(e.target.value);
                setCheckedDocs([]);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.authority})
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Eligibility Questions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:hidden">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" /> أسئلة تحديد شروط الأهلية السريعة:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">هل تحمل الجنسية المصرية؟</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEgyptian(true)}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${isEgyptian ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-700'}`}
                  >
                    نعم
                  </button>
                  <button
                    onClick={() => setIsEgyptian(false)}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${!isEgyptian ? 'bg-rose-800 text-white border-rose-800' : 'bg-slate-100 text-slate-700'}`}
                  >
                    أجنبي / غير مصري
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">هل يمتلك المتقدم بطاقة رقم قومي سارية؟</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setHasNationalId(true)}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${hasNationalId ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-700'}`}
                  >
                    نعم سارية
                  </button>
                  <button
                    onClick={() => setHasNationalId(false)}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${!hasNationalId ? 'bg-amber-800 text-white border-amber-800' : 'bg-slate-100 text-slate-700'}`}
                  >
                    منتهية / غير موجودة
                  </button>
                </div>
              </div>
            </div>

            {/* Result banner */}
            <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
              isEligible ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {isEligible ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-extrabold">مستوفي لجميع الشروط الأساسية (مؤهل للتقديم)</p>
                    <p className="font-normal text-[11px] text-emerald-800">يمكنك التوجه مباشرة للبوابة الرسمية أو تسليم المستندات المطلوبة أدناه.</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <p className="text-sm font-extrabold">غير مستوفي للشروط الحالية</p>
                    <p className="font-normal text-[11px] text-rose-800">يلزم تجديد بطاقة الرقم القومي أو إتاحة الجنسية المطلوبة قبل التقديم.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Printable Document Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:border-none print:shadow-none">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[11px] text-slate-500 font-bold block">Sokar Ai Services - قائمة المستندات المجهزة (دليل استرشادي)</span>
                <h3 className="font-extrabold text-slate-900 text-base">{activeService.name}</h3>
                <p className="text-xs text-sky-800 font-bold">الجهة الحكومية: {activeService.authority}</p>
              </div>
              <button
                onClick={handlePrint}
                className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 print:hidden shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة القائمة</span>
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-800">المستندات الواجب تحضيرها (حدد الأوراق التي تم تجهيزها):</p>
              <div className="space-y-2 text-xs">
                {activeService.documents.map((doc, i) => {
                  const isChecked = checkedDocs.includes(doc);
                  return (
                    <div
                      key={i}
                      onClick={() => handleToggleDoc(doc)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'}`}>
                          {isChecked && '✓'}
                        </div>
                        <span>{doc}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {isChecked ? 'تم التجهيز' : 'في الإعداد'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t text-[11px] text-slate-500 flex justify-between">
              <span>المصروفات الرسمية: {activeService.fees}</span>
              <span>تاريخ استخراج القائمة: 2026-07-24</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
