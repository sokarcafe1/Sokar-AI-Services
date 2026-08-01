import { DeadlineEvent } from '../types';

export const INITIAL_DEADLINES: DeadlineEvent[] = [
  {
    id: 'dl-kg-admission',
    title: 'التقديم الإلكتروني لرياض الأطفال والصف الأول الابتدائي بالمدارس الرسمية',
    authority: 'وزارة التربية والتعليم',
    category: 'admission',
    categoryLabelAr: 'تقديمات المدارس',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    description: 'فتح الموعد السنوي الموحد للتقديم للطلاب الجدد بمدارس الجمهورية الرسمية والرسمية لغات عبر البوابة الإلكترونية.',
    status: 'open_now',
    officialUrl: 'https://emis.gov.eg'
  },
  {
    id: 'dl-tansik-phase1',
    title: 'تنسيق الثانوية العامة المرحلة الأولى وتسجيل الرغبات',
    authority: 'مكتب التنسيق - وزارة التعليم العالي',
    category: 'tansik',
    categoryLabelAr: 'تنسيق الجامعات',
    startDate: '2026-07-30',
    endDate: '2026-08-04',
    description: 'انطلق اليوم رسمياً فتح مرحلة التنسيق الإلكتروني للطلاب الحاصلين على الحد الأدنى للمرحلة الأولى لتسجيل 75 رغبة (اليوم الأول - متبقي 5 أيام).',
    status: 'open_now',
    officialUrl: 'https://tansik.digital.gov.eg'
  },
  {
    id: 'dl-housing-sakan',
    title: 'آخر موعد لشراء كراسات الشروط وتقديم شقق سكن لكل المصريين',
    authority: 'صندوق الإسكان الاجتماعي',
    category: 'housing',
    categoryLabelAr: 'الإسكان الاجتماعي',
    startDate: '2026-05-15',
    endDate: '2026-07-31',
    description: 'شراء كراسة الشروط ودفع مقدم جدية الحجز بمكاتب البريد المميكنة وررفع المستندات على الموقع.',
    status: 'closing_soon',
    officialUrl: 'https://shmff.gov.eg'
  },
  {
    id: 'dl-tax-declaration',
    title: 'تقديم الإقرارات الضريبية السنوية للأشخاص الطبيعيين والشركات',
    authority: 'مصلحة الضرائب المصرية',
    category: 'taxes',
    categoryLabelAr: 'الإقرارات الضريبية',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    description: 'التسجيل الإجباري لجميع الممولين وأصحاب المهن الحرة والتجارة الإلكترونية على منظومة الفاتورة والإقرار الإلكتروني.',
    status: 'closed',
    officialUrl: 'https://eta.gov.eg'
  },
  {
    id: 'dl-thanaweya-results',
    title: 'اعتماد وإعلان نتائج امتحان الثانوية العامة وفتح باب التظلمات',
    authority: 'وزارة التربية والتعليم',
    category: 'results',
    categoryLabelAr: 'نتائج الامتحانات',
    startDate: '2026-07-28',
    endDate: '2026-08-15',
    description: 'الإعلان الرسمي عن أسماء الأوائل والنتائج بالرقم القومي ورقم الجلوس إلكترونياً.',
    status: 'upcoming',
    officialUrl: 'https://g3a.emis.gov.eg'
  }
];
