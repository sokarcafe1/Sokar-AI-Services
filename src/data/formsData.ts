import { OfficialForm } from '../types';

export const INITIAL_FORMS: OfficialForm[] = [
  {
    id: 'form-passport',
    title: 'نموذج (29 جوازات) طلب إصدار/تجديد جواز السفر المصري',
    authority: 'مصلحة الجوازات والهجرة والجنسية - وزارة الداخلية',
    category: 'travel',
    description: 'استمارة طلب استخراج أو تجديد جواز السفر المميكن لمن أتم 16 عاماً أو أقل.',
    prerequisites: ['بطاقة الرقم القومي سارية', '4 صور شخصية خلفية بيضاء', 'الموقف من التجنيد للذكور', 'المؤهل الدراسي'],
    fileSize: '850 KB',
    fileFormat: 'PDF',
    downloadUrl: 'https://moi.gov.eg',
    lastUpdated: '2026-02-15',
    downloadsCount: 98000
  },
  {
    id: 'form-driving-licence',
    title: 'نموذج (256 مرور) طلب استخراج / تجديد رخصة قيادة خاصة',
    authority: 'الإدارة العامة للمرور - وزارة الداخلية',
    category: 'traffic',
    description: 'النموذج المعتمد لتقديم طلب الفحص الطبي واختبارات القيادة واستخراج رخصة القيادة.',
    prerequisites: ['شهادة براءة الذمة (شهادة المخالفات)', 'الكشف الطبي بدمين ونظر', 'مؤهل دراسي وبطاقة رقم قومي سارية'],
    fileSize: '1.5 MB',
    fileFormat: 'PDF',
    downloadUrl: 'https://pbr.pki.gov.eg',
    lastUpdated: '2026-03-01',
    downloadsCount: 115000
  },
  {
    id: 'form-housing-apply',
    title: 'استمارة حجز وحدات الإسكان الاجتماعي (سكن لكل المصريين)',
    authority: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري',
    category: 'housing',
    description: 'نموذج الإقرار والإفصاح عن الدخل السنوي والأسري لحجز شقق الإسكان الاجتماعي.',
    prerequisites: ['مفردات مرتب أو شهادة دخل معتمدة', 'صورة الرقم القومي للزوجين', 'إيصال مرافق حديث للعين'],
    fileSize: '2.1 MB',
    fileFormat: 'PDF',
    downloadUrl: 'https://shmff.gov.eg',
    lastUpdated: '2026-04-12',
    downloadsCount: 88000
  },
  {
    id: 'form-school-transfer',
    title: 'نموذج طلب طلب التحويل ونقل القيد بين المدارس الرسمية',
    authority: 'وزارة التربية والتعليم والتعليم الفني',
    category: 'schools',
    description: 'استمارة موحدة لنقل الطالب بين الإدارات والمدارس الرسمية والخاصة معتمدة من مديرية التربية والتعليم.',
    prerequisites: ['موافقة المدرسة المنقول إليها', 'بيان نجاح مميكن معتمد', 'إثبات محل السكن الجديد للوالدين'],
    fileSize: '620 KB',
    fileFormat: 'PDF',
    downloadUrl: 'https://moe.gov.eg',
    lastUpdated: '2026-05-20',
    downloadsCount: 75000
  },
  {
    id: 'form-tax-card',
    title: 'استمارة طلب استخراج البطاقة الضريبية وتأسيس النشاط',
    authority: 'مصلحة الضرائب المصرية - وزارة المالية',
    category: 'taxes',
    description: 'نموذج تسجيل منشأة جديدة أو مهنة حرة للحصول على الرقم الضريبي الموحد والبطاقة الضريبية.',
    prerequisites: ['عقد إيجار أو ملكية مثبت الشركاء والشهر العقاري', 'صورة بطاقة الرقم القومي', 'إيصال كهرباء باسم المنشأة'],
    fileSize: '1.8 MB',
    fileFormat: 'PDF',
    downloadUrl: 'https://eta.gov.eg',
    lastUpdated: '2026-01-25',
    downloadsCount: 62000
  }
];
