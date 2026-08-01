import { GovernmentMinistry } from '../types';

export const INITIAL_MINISTRIES: GovernmentMinistry[] = [
  {
    id: 'moi',
    name: 'وزارة الداخلية (قطاع الأحوال المدنية المرور الجوازات)',
    logoEmoji: '🆔',
    description: 'الجهة المسؤولة عن إصدار وتحديث بطاقات الرقم القومي، وثائق الميلاد، رخص القيادة والسيارات، وجوازات السفر وتصاريح العمل.',
    officialWebsite: 'https://moi.gov.eg',
    officialEmail: 'info@moi.gov.eg',
    hotline: '15388',
    address: 'القاهرة - التجمع الخامس - قطاع الأحوال المدنية',
    workingHours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً (بعض المراكز تعمل لفترة مسائية)',
    governoratesServed: ['جميع محافظات الجمهورية (27 محافظة)'],
    relatedServicesCount: 28,
    latestAnnouncement: 'ميكنة خدمات السجل المدني وتفعيل استخراج الوثائق عبر بوابات مصر الرقمية والسجل الذكي 24/7',
    socialLinks: {
      facebook: 'https://facebook.com/MoiEgy',
      twitter: 'https://twitter.com/MOIEgy',
      youtube: 'https://youtube.com/MOIEgy'
    }
  },
  {
    id: 'moe',
    name: 'وزارة التربية والتعليم والتعليم الفني',
    logoEmoji: '🏫',
    description: 'الجهة الرسمية القائمة على إشراف وتنظيم التعليم المدرسى بجميع مراحله وتطوير المناهج وتنسيق رياض الأطفال والامتحانات.',
    officialWebsite: 'https://moe.gov.eg',
    officialEmail: 'contact@moe.gov.eg',
    hotline: '19368',
    address: 'العاصمة الإدارية الجديدة - الحي الحكومي - مبنى وزارة التربية والتعليم',
    workingHours: 'الأحد - الخميس: 8:30 صباحاً - 3:30 مساءً',
    governoratesServed: ['جميع محافظات الجمهورية'],
    relatedServicesCount: 35,
    latestAnnouncement: 'إتاحة نتائج الامتحانات الإلكترونية واستمارة الثانوية العامة وتظلمات الامتحانات إلكترونياً.',
    socialLinks: {
      facebook: 'https://facebook.com/egypt.moe',
      youtube: 'https://youtube.com/MOEEgypt'
    }
  },
  {
    id: 'mohesr',
    name: 'وزارة التعليم العالي والبحث العلمي (مكتب التنسيق)',
    logoEmoji: '🎓',
    description: 'الجهة المباشرة عن قبول الطلاب بالجامعات والمعاهد الحكومية والأهلية والخاصة وإدارة موقع التنسيق الإلكتروني الرسمي.',
    officialWebsite: 'https://mohesr.gov.eg',
    officialEmail: 'support@tansik.egypt.gov.eg',
    hotline: '19468',
    address: 'العاصمة الإدارية الجديدة - مجمع الوزارات - وزارة التعليم العالي',
    workingHours: 'الأحد - الخميس: 9:00 صباحاً - 4:00 مساءً',
    governoratesServed: ['جميع المحافظات'],
    relatedServicesCount: 18,
    latestAnnouncement: 'فتح مراحل التنسيق الإلكتروني للكليات والمعاهد واختبارات القدرات للطلاب.',
    socialLinks: {
      facebook: 'https://facebook.com/MOHESREGYPT'
    }
  },
  {
    id: 'moh',
    name: 'وزارة الإسكان والمرافق والمجتمعات العمرانية (صندوق الإسكان الاجتماعي)',
    logoEmoji: '🏠',
    description: 'توفير وحدات إسكان لكل المصريين وتطوير المدن الجديدة وحجز أراضي وشقق سكن مصر ودار مصر وجنة.',
    officialWebsite: 'https://mhuc.gov.eg',
    officialEmail: 'info@shmff.gov.eg',
    hotline: '1188',
    address: 'القاهرة - مدينة نصر - شارع المخيم الدائم',
    workingHours: 'الأحد - الخميس: 8:30 صباحاً - 3:00 مساءً',
    governoratesServed: ['جميع المحافظات والتجمعات العمرانية'],
    relatedServicesCount: 15,
    latestAnnouncement: 'طرح كراسات شروط سكن لكل المصريين وحجز شقق التمويل العقاري عبر المنصة الإلكترونية.',
    socialLinks: {
      facebook: 'https://facebook.com/SHMFFEG'
    }
  },
  {
    id: 'moj',
    name: 'وزارة العدل (مصلحة الشهر العقاري والتوثيق)',
    logoEmoji: '⚖️',
    description: 'توثيق العقود والتوكيلات وتراخيص السيارات والشهر العقاري الذكي عبر تطبيق أرغب في عمل توكيل وبوابة مصر الرقمية.',
    officialWebsite: 'https://jp.gov.eg',
    officialEmail: 'info@jp.gov.eg',
    hotline: '15929',
    address: 'القاهرة - لاظوغلي - مبنى وزارة العدل',
    workingHours: 'الأحد - الخميس: 9:00 صباحاً - 4:00 مساءً (تتوفر سيارات توثيق متنقلة)',
    governoratesServed: ['جميع المحافظات'],
    relatedServicesCount: 22,
    latestAnnouncement: 'إطلاق خدمة التوثيق المتنقل وحجز المواعيد المسبق لتجنب الازدحام بالمقرات.',
    socialLinks: {
      facebook: 'https://facebook.com/MOJEgy'
    }
  },
  {
    id: 'moit',
    name: 'وزارة الاتصالات وتكنولوجيا المعلومات (منصة مصر الرقمية)',
    logoEmoji: '📱',
    description: 'الجهة المسؤولة عن تطوير البنية الرقمية ومبادرة التحول الرقمي وإدارة بوابة مصر الرقمية الشاملة.',
    officialWebsite: 'https://mcit.gov.eg',
    officialEmail: 'digital.egypt@mcit.gov.eg',
    hotline: '15999',
    address: 'القرية الذكية - الكيلو 28 طريق القاهرة الإسكندرية الصحراوي',
    workingHours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
    governoratesServed: ['جميع المحافظات (خدمات أونلاين)'],
    relatedServicesCount: 40,
    latestAnnouncement: 'توفير أكثر من 165 خدمة حكومية رقمية معتمدة ومربوطة بالرقم القومي.',
    socialLinks: {
      facebook: 'https://facebook.com/MCITEgypt'
    }
  },
  {
    id: 'msit',
    name: 'وزارة التموين والتجارة الداخلية',
    logoEmoji: '🌾',
    description: 'إدارة منظومة الدعم السلعي، الخبز البلدي، بطاقات التموين الذكية، وتطوير السجل التجاري والعلامات التجارية.',
    officialWebsite: 'https://msit.gov.eg',
    officialEmail: 'info@msit.gov.eg',
    hotline: '19959',
    address: 'القاهرة - قصر العيني - وزارة التموين',
    workingHours: 'الأحد - الخميس: 8:30 صباحاً - 3:00 مساءً',
    governoratesServed: ['جميع المحافظات'],
    relatedServicesCount: 16,
    latestAnnouncement: 'تسهيل إضافة الأبناء وفصل الاجتماعي عبر بوابة مصر الرقمية ومكاتب التموين المطورة.',
    socialLinks: {
      facebook: 'https://facebook.com/MSITEgypt'
    }
  },
  {
    id: 'moee',
    name: 'وزارة الكهرباء والطاقة المتجددة (المنصة الموحدة لخدمات الكهرباء)',
    logoEmoji: '⚡',
    description: 'الاستعلام عن الفواتير، تركيب العدادات الكودية والذكية، دفع الشحن وتسجيل قراءات العدادات إلكترونياً.',
    officialWebsite: 'https://moee.gov.eg',
    officialEmail: 'support@eehc.gov.eg',
    hotline: '121',
    address: 'القاهرة - العباسية - مجمع الكهرباء',
    workingHours: '24 ساعة طوال الأسبوع للخط الساخن والمراكز الإلكترونية',
    governoratesServed: ['جميع شركات التوزيع بمحافظات مصر'],
    relatedServicesCount: 12,
    latestAnnouncement: 'إتاحة شحن كروت العدادات بالهاتف المحمول ودفع الفواتير عبر المحافظ الإلكترونية.',
    socialLinks: {
      facebook: 'https://facebook.com/MOEEEgypt'
    }
  }
];
