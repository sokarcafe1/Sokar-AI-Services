import { OfficialAnnouncement } from '../types';

export const INITIAL_OFFICIAL_ANNOUNCEMENTS: OfficialAnnouncement[] = [
  {
    id: 'ann-kg-2026',
    titleAr: 'التقديم الإلكتروني لرياض الأطفال والصف الأول الابتدائي بالمدارس الرسمية والرسمية لغات',
    titleEn: 'Kindergarten & 1st Primary Online Registration 2026/2027',
    category: 'education',
    officialAuthorityAr: 'وزارة التربية والتعليم والتعليم الفني - بوابة مركز معلومات الوزارة',
    officialAuthorityEn: 'Ministry of Education and Technical Education',
    openingDate: '2026-06-01',
    closingDate: '2026-07-31',
    remainingDays: 1,
    officialUrl: 'https://emis.gov.eg',
    requiredDocumentsAr: [
      'شهادة الميلاد الكمبيوتر الأصلية للطفل + 4 صور منها',
      'عدد 6 صور شخصية حديثة للطفل خلفية بيضاء (4×6)',
      'صورة بطاقة الرقم القومي لولي الأمر (سارية)',
      'إيصال مرافق حديث (كهرباء / مياه / غاز) باسم ولي الأمر لإثبات السكن',
      'طابع مهن تعليمية + طابع دعم مشاريع تعليمية'
    ],
    eligibilityAr: [
      'ألا يقل سن الطفل عن 4 سنوات ولا يزيد عن 6 سنوات لرياض الأطفال في 1 أكتوبر 2026',
      'ألا يقل سن الطفل عن 6 سنوات ولا يزيد عن 9 سنوات للصف الأول الابتدائي في 1 أكتوبر 2026',
      'الالتزام بالتوزيع الجغرافي والمربع السكني للمدرسة حسب إيصال المرافق'
    ],
    applicationStepsAr: [
      'الدخول على البوابة الإلكترونية لمركز معلومات وزارة التربية والتعليم emis.gov.eg',
      'إنشاء حساب جديد لولي الأمر باستخدام الرقم القومي وكلمة المرور',
      'اختيار المربع السكني والمحافظة والإدارة التعليمية التابع لها',
      'تسجيل بيانات الطفل ورغبات المدارس مرتبة حسب الأفضلية (حتى 5 مدارس)',
      'طباعة استمارة التقدم المبدئية وحفظ الرقم المرجعي لمتابعة النتيجة'
    ],
    officialPdfUrl: 'https://emis.gov.eg/docs/kg_registration_guide_2026.pdf',
    officialPdfTitleAr: 'النشرة الرسمية لشروط وقواعد التقدم لرياض الأطفال والابتدائي 2026.pdf',
    lastOfficialUpdate: '2026-07-30 (تأكيد الإغلاق النهائى غداً 31 يوليو)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'بوابة مركز معلومات وزارة التربية والتعليم (emis.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-tansiq-2026',
    titleAr: 'تنسيق القبول بالجامعات والمعاهد المصرية - المرحلة الأولى لطلاب الثانوية العامة',
    titleEn: 'Egyptian University Coordination Portal - Phase 1',
    category: 'coordination',
    officialAuthorityAr: 'وزارة التعليم العالي والبحث العلمي - مكتب تنسيق القبول بالجامعات',
    officialAuthorityEn: 'Ministry of Higher Education and Scientific Research',
    openingDate: '2026-07-30',
    closingDate: '2026-08-04',
    remainingDays: 5,
    officialUrl: 'https://tansik.digital.gov.eg',
    requiredDocumentsAr: [
      'استمارة نجاح الثانوية العامة الأصلية المطبوعة برقم الجلوس والرقم السري',
      'شهادة الميلاد الكمبيوتر الأصلية حديثة',
      'بطاقة الرقم القومي للطالب وولي الأمر',
      'عدد 6 صور شخصية (4×6)',
      'نموذج 2 جند للذكور + بطاقة 6 جند أو 7 جند'
    ],
    eligibilityAr: [
      'الحصول على شهادة الثانوية العامة المصرية للعام الدراسي الحالي 2025/2026',
      'استيفاء الحد الأدنى للدرجات المحدد للمرحلة الأولى (علوم / رياضة / أدبي)',
      'التسجيل المباشر برقم الجلوس والرقم السري المطبوع على الاستمارة'
    ],
    applicationStepsAr: [
      'الدخول إلى موقع التنسيق الإلكتروني الرسمي tansik.digital.gov.eg',
      'إدخال رقم الجلوس والرقم السري المطبوع على استمارة النجاح',
      'ترتيب رغبات الكليات والجامعات (حتى 75 رغبة) مع مراعاة التوزيع الجغرافي (أ - ب - ج)',
      'مراجعة قائمة الرغبات والتأكد من ترتيبها حسب الرغبة الحقيقية للطالب',
      'ضغط حفظ وطباعة الاستمارة النهائية متضمنة رقم الإيصال والتاريخ'
    ],
    officialPdfUrl: 'https://tansik.digital.gov.eg/docs/tansik_guide_phase1_2026.pdf',
    officialPdfTitleAr: 'دليل التنسيق الرسمي وقواعد توزيع الرغبات والجغرافية 2026.pdf',
    lastOfficialUpdate: '2026-07-30 (انطلاق اليوم الأول لشريحة المرحلة الأولى رسمياً اليوم)',
    status: 'open_now',
    announcedToday: true,
    verificationSource: 'موقع التنسيق الإلكتروني - بوابة مصر الرقمية (tansik.digital.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-housing-sakan-2026',
    titleAr: 'مبادرة سكن لكل المصريين (الإعلان الـ 19) - شقق منخفضي ومتوسطي الدخل',
    titleEn: 'Sakan for All Egyptians - Social Housing Initiative 19',
    category: 'housing',
    officialAuthorityAr: 'وزارة الإسكان والمرافق والمجتمعات العمرانية - صندوق الإسكان الاجتماعي ودعم التمويل العقاري',
    officialAuthorityEn: 'Ministry of Housing - Social Housing & Mortgage Support Fund',
    openingDate: 'قريباً (قيد الإعداد والتجهيز الرسمى)',
    closingDate: 'لم يبدأ التقديم بعد',
    remainingDays: null,
    officialUrl: 'https://shmff.gov.eg',
    requiredDocumentsAr: [
      'استمارة الحجز للوحدة السكنية والمقادمة بكراسة الشروط (عند طرحها)',
      'إيصال سداد مقدم جدية الحجز والمصروفات الإدارية بمكاتب البريد (عند بدء التقديم)',
      'صورة بطاقة الرقم القومي للأعزب / الزوج والزوجة (سارية)',
      'شهادة إثبات الدخل السنوي أو الشهري معتمدة من جهة العمل أو محاسب قانوني',
      'قيد عائلي مميكن للمتزوجين + شهادات ميلاد الأبناء القصر'
    ],
    eligibilityAr: [
      'أن يكون المتقدم شخصاً طبيعياً مصري الجنسية ولا يقل سنه عن 21 عاماً',
      'ألا يزيد صافي الدخل الشهري للأعزب عن 12,000 ج.م وللأسرة عن 15,000 ج.م',
      'ألا يكون قد سبق التخصيص للمتقدم أو لأسرته وحدة سكنية أو قطعة أرض بالمدن الجديدة'
    ],
    applicationStepsAr: [
      'متابعة الإعلان الرسمي الصادر عن وزارة الإسكان وصندوق التمويل العقاري',
      'شراء كراسة الشروط وسداد مقدم جدية الحجز بمكاتب البريد فور الإعلان الرسمي',
      'الدخول على البوابة الإلكترونية للصندوق shmff.gov.eg وإنشاء حساب برقم القومي',
      'رفع المستندات المطلوبة وصورة إيصال سداد جدية الحجز بصيغة PDF كملف واحد',
      'تأكيد الطلب واستلام رقم التسجيل للمتابعة ومتابعة حالة الفرز المبدئي'
    ],
    officialPdfUrl: 'https://shmff.gov.eg/docs/brochure_sakan_19_2026.pdf',
    officialPdfTitleAr: 'كراسة الشروط الرسمية للإعلان الـ 19 (تتاح فور الطرح الرسمي).pdf',
    lastOfficialUpdate: '2026-07-30 (قيد المراجعة والإعداد للطرح الرسمى)',
    status: 'opening_soon',
    portalStatusNoteAr: '🟡 الإعلان لم يفتح بعد للتقديم: الإعلان الـ 19 لسكن لكل المصريين قيد التجهيز والإعداد الرسمي من وزارة الإسكان وصندوق التمويل العقاري، وسيتم تحديث الرابط ورابط كراسة الشروط فور فتح التقديم رسمياً.',
    announcedToday: false,
    verificationSource: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري (shmff.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-jobs-gov-2026',
    titleAr: 'مسابقة تعيين 30 ألف معلم مساعد + وظائف البريد والهيئات الحكومية 2026',
    titleEn: 'Central Agency for Organization and Administration - Civil Service Jobs 2026',
    category: 'jobs',
    officialAuthorityAr: 'الجهاز المركزي للتنظيم والإدارة - بوابة الوظائف الحكومية المصرية',
    officialAuthorityEn: 'Central Agency for Organization and Administration',
    openingDate: '2026-07-10',
    closingDate: '2026-08-10',
    remainingDays: 11,
    officialUrl: 'https://jobs.caoa.gov.eg',
    requiredDocumentsAr: [
      'صورة شخصية حديثة خلفية بيضاء (4×6)',
      'بطاقة الرقم القومي سارية (وجهين)',
      'المؤهل الدراسي + المؤهل الأعلى إن وجد + الدبلوم التربوي للمدرسين',
      'موقف الخدمة العسكرية للذكور أو الخدمة العامة للإناث',
      'إيصال الإيداع البنكي للرسوم بالبنك الأهلي أو بنك مصر أو بنك القاهرة باسم الجهاز'
    ],
    eligibilityAr: [
      'أن يكون المتقدم متمتعاً بالجنسية المصرية وحسن السير والسلوك',
      'ألا يزيد سن المتقدم عن 40 عاماً في تاريخ نشر الإعلان الرسمية',
      'ألا يقل التقدير العام التراكمي عن (مقبول) أو (جيد) حسب التخصص المعلم',
      'اجتياز الامتحانات الإلكترونية والمقابلة الشخصية بمركز الإدارة العامة بالتنظيم والإدارة'
    ],
    applicationStepsAr: [
      'الدخول إلى بوابة الوظائف الحكومية jobs.caoa.gov.eg',
      'البحث عن المسابقة المطلوبة (معلم مساعد / وظائف الهيئة القومية للبريد)',
      'تعبئة البيانات الشخصية والأكاديمية بدقة وطبقاً للمستندات الرسمية',
      'رفع المرفقات والمستندات أصلية ملونة بصيغة JPG عالية الوضوح',
      'حفظ رقم الاستمارة والرقم المرجعي للاستعلام عن موعد الامتحان الإلكتروني'
    ],
    officialPdfUrl: 'https://jobs.caoa.gov.eg/docs/jobs_announcement_july_2026.pdf',
    officialPdfTitleAr: 'الإعلان الرسمي رقم 1 لسنة 2026 للتعيينات بالتربية والتعليم والبريد.pdf',
    lastOfficialUpdate: '2026-07-30 (انتظام تسجيل المتقدمين وتحديث المواعيد)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'بوابة الوظائف الحكومية الرسمية (jobs.caoa.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-stem-japanese-2026',
    titleAr: 'التقديم للمدارس المصرية اليابانية ومدارس STEM للمتفوقين في العلوم والتكنولوجيا',
    titleEn: 'Egyptian-Japanese Schools & STEM Schools Admissions 2026',
    category: 'education',
    officialAuthorityAr: 'وزارة التربية والتعليم والتعليم الفني - وحدة المدارس اليابانية والـ STEM',
    officialAuthorityEn: 'EJS & STEM Units - Ministry of Education',
    openingDate: '2026-07-05',
    closingDate: '2026-08-05',
    remainingDays: 6,
    officialUrl: 'https://ejs.moe.gov.eg',
    requiredDocumentsAr: [
      'شهادة إتمام مرحلة التعليم الأساسي (الإعدادية) بنسبة 98% أو ما يعادلها لـ STEM',
      'شهادة الميلاد المميكنة للطفل للتقديم في اليابانية',
      'بطاقة الرقم القومي لولي الأمر سارية',
      'إقرار ولي الأمر بالالتزام بنظام النموذج الياباني والأنشطة التوكاتسو'
    ],
    eligibilityAr: [
      'المدارس اليابانية: القبول من مرحلة رياض الأطفال حتى الابتدائي طبقا للسن والتوزيع',
      'مدارس STEM: حصول الطالب على 98% في الإعدادية + الدرجة النهائية في مادة واحدة على الأقل (علوم/رياضيات/لغة إنجليزية)',
      'اجتياز اختبارات القبول الإلكترونية والمقابلة الشخصية للطفل وولي الأمر'
    ],
    applicationStepsAr: [
      'التسجيل المباشر عبر البوابة الرسمية ejs.moe.gov.eg أو stem.moe.gov.eg',
      'إدخال الرقم القومي للطالب ورقم الجلوس في الإعدادية',
      'سداد مقابل أداء اختبارات القبول عبر منافذ فوري أو البنك الأهلي',
      'طباعة بطاقات أداء الامتحان وموعد المقابلات بالمركز المعتمد'
    ],
    officialPdfUrl: 'https://ejs.moe.gov.eg/docs/stem_and_ejs_rules_2026.pdf',
    officialPdfTitleAr: 'دليل التقدم الشامل للمدارس اليابانية ومدارس المتفوقين STEM 2026.pdf',
    lastOfficialUpdate: '2026-07-21 (إعلان مواعيد المقابلات التفاعلية)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'البوابة الرسمية للمدارس اليابانية وSTEM (moe.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-military-police-2026',
    titleAr: 'دفعة الكليات العسكرية (الحربية - البحرية - الجوية - الدفاع الجوي) وكلية الشرطة 2026',
    titleEn: 'Egyptian Military & Police Academies Admissions 2026',
    category: 'military',
    officialAuthorityAr: 'وزارة الدفاع - مكتب تنسيق القبول بالكليات العسكرية / وزارة الداخلية - كلية الشرطة',
    officialAuthorityEn: 'Ministry of Defense & Ministry of Interior',
    openingDate: '2026-07-18',
    closingDate: '2026-08-25',
    remainingDays: 32,
    officialUrl: 'https://tansiq.mod.gov.eg',
    requiredDocumentsAr: [
      'القيد العائلي للوالد والجد للوالد والجد للوالدة حتى الدرجة الرابعة',
      'شهادة النجاح بالثانوية العامة أو الثانوية الأزهرية أو المؤهل الجامعي',
      'شهادة الميلاد المميكنة + بطاقة الرقم القومي للطالب وولي الأمر',
      'شهادة حسن السير والسلوك + الفيش والتشبيه حديث موجه للكليات العسكرية / الشرطة'
    ],
    eligibilityAr: [
      'أن يكون الطالب مصري الجنسية ومن أباوين وجدين يتمتعان بجميع حقوقهم الوطنية',
      'ألا يقل المجموع في الثانوية العامة عن النسبة المئوية المحددة للكلية الحربية والشرطة',
      'ألا يقل طول الطالب عن 170 سم للكليات العسكرية و 170 سم لكلية الشرطة مع تناسق الوزن',
      'اجتياز جميع الفحوصات الطبية، الاختبارات الرياضية، السمات الشخصية، واختبار الهيئة'
    ],
    applicationStepsAr: [
      'التسجيل المبدئي الإلكتروني عبر موقع tansiq.mod.gov.eg (العسكرية) أو moi.gov.eg (الشرطة)',
      'سداد رسوم الملف الإلكتروني واستلام كلمة المرور الخاصة بالطالب',
      'تحديد موعد سحب الملف الورقي ومقر أداء الكشف الطبي المبدئي',
      'حضور الاختبارات بالزي الرياضي المحدد وطبقاً للجدول الزمني المعلن'
    ],
    officialPdfUrl: 'https://tansiq.mod.gov.eg/docs/military_academies_guide_2026.pdf',
    officialPdfTitleAr: 'كراسة تعليمات التقدم للكليات العسكرية وكلية الشرطة 2026.pdf',
    lastOfficialUpdate: '2026-07-24 (بدء سحب الملفات بمقر الكلية الحربية بالظاهر)',
    status: 'open_now',
    announcedToday: true,
    verificationSource: 'موقع تنسيق الكليات والمعاهد العسكرية (tansiq.mod.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-applied-tech-2026',
    titleAr: 'مدارس التكنولوجيا التطبيقية والتعليم المزدوج والدبلومات الفنية 2026',
    titleEn: 'Applied Technology Schools & Technical Education Admissions',
    category: 'education',
    officialAuthorityAr: 'وزارة التربية والتعليم والتعليم الفني - وحدة مدارس التكنولوجيا التطبيقية',
    officialAuthorityEn: 'Applied Technology Schools Unit - MoETE',
    openingDate: '2026-07-01',
    closingDate: '2026-08-01',
    remainingDays: 8,
    officialUrl: 'https://tech.moe.gov.eg',
    requiredDocumentsAr: [
      'استمارة نجاح الشهادة الإعدادية للعام الدراسي 2025/2026',
      'شهادة الميلاد الكمبيوتر + صور شخصية حديثة للطالب',
      'صورة بطاقة الرقم القومي لولي الأمر',
      'إيصال سداد المقابل المالي لأداء اختبار القبول (250 ج.م)'
    ],
    eligibilityAr: [
      'أن يكون الطالب حاصلاً على الشهادة الإعدادية بمجموع لا يقل عن الحد الأدنى المحدد للمدرسة (غالباً 210 - 230 درجة)',
      'ألا يزيد سن الطالب عن 18 عاماً في أول أكتوبر 2026',
      'اجتياز اختبارات القبول في اللغتين العربية والإنجليزية والرياضيات والكشف الطبي والمقابلة الشخصية'
    ],
    applicationStepsAr: [
      'تسجيل الدخول بالبريد الموحد للطالب على منصة tech.moe.gov.eg',
      'اختيار المدارس التكنولوجية الراغب في الالتحاق بها (مثل مدرسة WE، توشيبا العربي، السويدي، إلخ)',
      'دفع رسوم الاختبار عبر منافذ الدفع الإلكتروني المعتمدة',
      'متابعة موعد ومقر الاختبار والمقابلة الشخصية الشفوية'
    ],
    officialPdfUrl: 'https://tech.moe.gov.eg/docs/applied_tech_guide_2026.pdf',
    officialPdfTitleAr: 'دليل مدارس التكنولوجيا التطبيقية والشروط الخاصة بكل مدرسة 2026.pdf',
    lastOfficialUpdate: '2026-07-22 (تأكيد فتح اختبارات المرحلة الثانية)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'منصة التعليم الفني والمدارس التكنولوجية (tech.moe.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-national-universities-2026',
    titleAr: 'الجامعات الأهلية المصرية (الجلالة - العلمين - الملك سلمان - المنصورة الجديدة)',
    titleEn: 'National Universities Central Admissions 2026',
    category: 'coordination',
    officialAuthorityAr: 'وزارة التعليم العالي - المجلس الأعلى للجامعات الأهلية',
    officialAuthorityEn: 'Council of National Universities',
    openingDate: '2026-07-12',
    closingDate: '2026-08-20',
    remainingDays: 27,
    officialUrl: 'https://pnu.gov.eg',
    requiredDocumentsAr: [
      'شهادة الثانوية العامة / الأجنبية (IGCSE, SAT, American Diploma) معتمدة وموثقة',
      'شهادة الميلاد المميكنة + بطاقة الرقم القومي أو جواز السفر للوافدين',
      'نموذج 2 جند و 6 جند للطلاب الذكور',
      'شهادة أداء اختبارات القدرات للقطاعات الطبية والتمريض والفنون إن وجدت'
    ],
    eligibilityAr: [
      'استيفاء الحدود الأدنى المقررة من المجلس الأعلى للجامعات الأهلية للقطاعات المخلتفة (الطبية، الهندسة، الحاسبات، العلوم الإنسانية)',
      'اجتياز اختبارات القبول الإلكترونية المنعقدة بمراكز الاختبارات الإلكترونية بالجامعة'
    ],
    applicationStepsAr: [
      'التسجيل على المنصة المركزية للجامعات الأهلية pnu.gov.eg',
      'إدخال البيانات الأكاديمية ورفع صورتها الضوئية واختيار الكليات المتاحة',
      'حجز موعد أداء اختبارات الشمول الإلكتروني في التفكير النظري واللغات',
      'متابعة حالة النتيجة وسداد المصروفات الدراسية لحجز المقعد'
    ],
    officialPdfUrl: 'https://pnu.gov.eg/docs/national_univ_fees_and_terms_2026.pdf',
    officialPdfTitleAr: 'بيان مصاريف وشروط القبول بالجامعات الأهلية الأربع للعام 2026.pdf',
    lastOfficialUpdate: '2026-07-23 (تحديث شريحة شهادات الثانوية الإنجليزية والأمريكية)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'بوابة الجامعات الأهلية المصرية (pnu.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-expats-cars-2026',
    titleAr: 'مبادرة تيسير استيراد سيارات المصريين بالخارج - الجولة التكميلية الرسمية',
    titleEn: 'Egyptian Expats Duty-Free Car Import Initiative 2026',
    category: 'migration',
    officialAuthorityAr: 'وزارة الدولة للهجرة وشئون المصريين بالخارج - بالتعاون مع مصلحة الجمارك المصرية',
    officialAuthorityEn: 'Ministry of Emigration & Egyptian Customs Authority',
    openingDate: '2026-06-15',
    closingDate: '2026-09-15',
    remainingDays: 53,
    officialUrl: 'https://cars.expats.gov.eg',
    requiredDocumentsAr: [
      'إقامة سارية للمواطن بالخارج مثبتة بجواز السفر أو بطاقة الهوية الوطنية للدولة الإقليمية',
      'كشف حساب بنكي عن 6 أشهر أسبق على تاريخ التحويل مقيداً بالعملة الأجنبية',
      'رخصة قيادة سارية ورخصة السيارة الأصلية بالخارج',
      'إيصال سداد وديعة الوديعة الدولارية المحولة للحساب البنكي المعتمد للبنك المركزي المصري'
    ],
    eligibilityAr: [
      'أن يكون المتقدم مصرياً أو يحتفظ بالجنسية المصرية وقت سداد الوديعة',
      'ألا يقل عمر المتقدم عن 16 عاماً',
      'أن تكون السيارة من الموديلات المسموح بها (ألا يتجاوز عمرها 3 سنوات من سنة الصنع بالنسبة لغير المالك الأول)'
    ],
    applicationStepsAr: [
      'تنزيل التطبيق الرسمي "سيارات المصريين بالخارج" أو الدخول لموقع cars.expats.gov.eg',
      'تسجيل حساب جديد بالبريد الإلكتروني ورقم جواز السفر المصري والإقامة',
      'إدخال بيانات السيارة المراد استيرادها لاستخراج القيمة الرسمية المطلوبة للوديعة الدولارية',
      'تحويل المبلغ المحدد إلكترونياً وتلقي أمر الشحن الجمركي وتراخيص الإفراج'
    ],
    officialPdfUrl: 'https://cars.expats.gov.eg/docs/expats_cars_customs_law_2026.pdf',
    officialPdfTitleAr: 'الجدول الجمركي الرسمي الشامل للسيارات المتاحة والوديعة المقابلة.pdf',
    lastOfficialUpdate: '2026-07-20 (تأكيد استمرار تلقي التحويلات حتى سبتمبر)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'تطبيق وبوابة سيارات المصريين بالخارج (cars.expats.gov.eg)',
    isOfficialVerified: true
  },
  {
    id: 'ann-conscription-e-services-2026',
    titleAr: 'بوابة إدارة التجنيد والتعبئة - استخراج تصاريح السفر والشهادات واستثناءات التجنيد',
    titleEn: 'Conscription & Mobilization Department Electronic Services',
    category: 'military',
    officialAuthorityAr: 'وزارة الدفاع - هيئة التنظيم والإدارة - إدارة التجنيد والتعبئة',
    officialAuthorityEn: 'Conscription & Mobilization Department',
    openingDate: '2026-01-01',
    closingDate: 'غير معلن رسمياً',
    isClosingUnannounced: true,
    remainingDays: null,
    officialUrl: 'https://tagned.mod.gov.eg',
    requiredDocumentsAr: [
      'بطاقة الرقم القومي سارية للطالب أو المواطن',
      'بطاقة 6 جند أو نموذج 7 جند أو النمرة العسكرية',
      'جواز السفر الساري في حالة طلب تصريح السفر إلكترونياً',
      'شهادة التأجيل الدراسي أو القيد المعتمد من الجامعة للطلاب'
    ],
    eligibilityAr: [
      'الخدمة متاحة لجميع الذكور المصريين الذين بلغوا سن التكليف والتجنيد (18 إلى 30 عاماً)',
      'سداد الرسوم المقررة للخدمة عبر وسائل الدفع الإلكتروني فور الاعتماد'
    ],
    applicationStepsAr: [
      'الدخول لموقع إدارة التجنيد والتعبئة tagned.mod.gov.eg',
      'اختيار الخدمة المطلوبة (استخراج تصريح سفر / شهادة المعاملة / تجديد الاستثناء)',
      'تعبئة الرقم القومي والنمرة العسكرية والبيانات المطلوبة بدقة',
      'اختيار مكان استلام الورقية الرسمية (مندوب التجنيد بالمحافظة أو التوصيل للمنزل)'
    ],
    officialPdfUrl: 'https://tagned.mod.gov.eg/docs/conscription_guidelines_2026.pdf',
    officialPdfTitleAr: 'دليل ومعايير استخراج تصاريح السفر والمعاملات التجنيدية الإلكترونية.pdf',
    lastOfficialUpdate: '2026-07-24 (تفعيل خدمات الاستخراج اللحظي بالربط مع الجوازات)',
    status: 'open_now',
    announcedToday: false,
    verificationSource: 'موقع إدارة التجنيد والتعبئة التابع لوزارة الدفاع (tagned.mod.gov.eg)',
    isOfficialVerified: true
  }
];
