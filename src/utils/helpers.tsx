import React from 'react';
import {
  Baby,
  School,
  ArrowLeftRight,
  FileCheck,
  UserCheck,
  ClipboardList,
  GraduationCap,
  Search,
  Award,
  FileText,
  Trophy,
  Wrench,
  Building2,
  Cog,
  Wheat,
  Hotel,
  Landmark,
  Building,
  Home,
  BookMarked,
  CheckCircle2,
  Globe,
  Sparkles,
  CreditCard,
  Library,
  Tv,
  Laptop,
  BookOpen,
  Shield,
  Car,
  Zap,
  Droplet,
  Flame,
  Activity,
  Briefcase,
  Receipt,
  Plane,
  HeartHandshake,
  Users,
  Phone,
  MapPin,
  Mail,
  Info,
  Layers,
  Compass,
  Clock,
  Coins,
  FileSpreadsheet,
  Share2,
  Printer,
  FolderCheck,
  Lock,
  BadgeCheck,
  Stethoscope,
  Scale,
  KeyRound,
  QrCode,
  User,
  Crosshair
} from 'lucide-react';
import { EducationService, FilterOptions, CategoryType, EducationLevel } from '../types';

export const getServiceIcon = (iconName: string, className: string = 'w-5 h-5') => {
  const props = { className };
  switch (iconName) {
    case 'Baby': return <Baby {...props} />;
    case 'School': return <School {...props} />;
    case 'ArrowLeftRight': return <ArrowLeftRight {...props} />;
    case 'FileCheck': return <FileCheck {...props} />;
    case 'UserCheck': return <UserCheck {...props} />;
    case 'ClipboardList': return <ClipboardList {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    case 'Search': return <Search {...props} />;
    case 'Award': return <Award {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'Trophy': return <Trophy {...props} />;
    case 'Wrench': return <Wrench {...props} />;
    case 'Building2': return <Building2 {...props} />;
    case 'Cog': return <Cog {...props} />;
    case 'Wheat': return <Wheat {...props} />;
    case 'Hotel': return <Hotel {...props} />;
    case 'Landmark': return <Landmark {...props} />;
    case 'Building': return <Building {...props} />;
    case 'Home': return <Home {...props} />;
    case 'BookMarked': return <BookMarked {...props} />;
    case 'CheckCircle2': return <CheckCircle2 {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'CreditCard': return <CreditCard {...props} />;
    case 'Library': return <Library {...props} />;
    case 'Tv': return <Tv {...props} />;
    case 'Laptop': return <Laptop {...props} />;
    case 'BookOpen': return <BookOpen {...props} />;
    case 'Shield': return <Shield {...props} />;
    case 'Car': return <Car {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Droplet': return <Droplet {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Briefcase': return <Briefcase {...props} />;
    case 'Receipt': return <Receipt {...props} />;
    case 'Plane': return <Plane {...props} />;
    case 'HeartHandshake': return <HeartHandshake {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Phone': return <Phone {...props} />;
    case 'MapPin': return <MapPin {...props} />;
    case 'Mail': return <Mail {...props} />;
    case 'Info': return <Info {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Compass': return <Compass {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'Coins': return <Coins {...props} />;
    case 'FileSpreadsheet': return <FileSpreadsheet {...props} />;
    case 'Share2': return <Share2 {...props} />;
    case 'Printer': return <Printer {...props} />;
    case 'FolderCheck': return <FolderCheck {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'BadgeCheck': return <BadgeCheck {...props} />;
    case 'Stethoscope': return <Stethoscope {...props} />;
    case 'Scale': return <Scale {...props} />;
    case 'KeyRound': return <KeyRound {...props} />;
    case 'QrCode': return <QrCode {...props} />;
    case 'User': return <User {...props} />;
    case 'Crosshair': return <Crosshair {...props} />;
    default: return <FileText {...props} />;
  }
};

export const CATEGORY_LABELS: Record<CategoryType, { title: string; icon: string; emoji: string }> = {
  moe: { title: 'وزارة التربية والتعليم', icon: 'Landmark', emoji: '📚' },
  schools: { title: 'المدارس والتقديمات', icon: 'School', emoji: '🏫' },
  universities: { title: 'الجامعات والمعاهد', icon: 'GraduationCap', emoji: '🎓' },
  technical: { title: 'التعليم الفني', icon: 'Wrench', emoji: '📖' },
  tansik: { title: 'تنسيق الجامعات', icon: 'Building', emoji: '🏛' },
  results: { title: 'نتائج الامتحانات', icon: 'Trophy', emoji: '🎯' },
  teachers: { title: 'خدمات المعلمين', icon: 'UserCheck', emoji: '👨‍🏫' },
  portals: { title: 'المنصات التعليمية', icon: 'Library', emoji: '🌐' },
  interior: { title: 'الأحوال المدنية والداخلية', icon: 'Shield', emoji: '🆔' },
  traffic: { title: 'خدمات المرور والنيابة', icon: 'Car', emoji: '🚗' },
  housing: { title: 'الإسكان والشهر العقاري', icon: 'Home', emoji: '🏠' },
  electricity: { title: 'خدمات الكهرباء', icon: 'Zap', emoji: '⚡' },
  water: { title: 'خدمات المياه والصرف', icon: 'Droplet', emoji: '💧' },
  gas: { title: 'خدمات الغاز الطبيعي', icon: 'Flame', emoji: '🔥' },
  healthcare: { title: 'الصحة والتأمين الصحي', icon: 'Activity', emoji: '🏥' },
  employment: { title: 'التوظيف وبوابة الوظائف', icon: 'Briefcase', emoji: '💼' },
  taxes: { title: 'الضرائب والسجل التجاري', icon: 'Receipt', emoji: '🧾' },
  academies: { title: 'الكليات العسكرية والشرطة', icon: 'Crosshair', emoji: '🛡️' },
  travel: { title: 'السفر والمصريون بالخارج', icon: 'Plane', emoji: '✈️' },
  social: { title: 'الدعم الاجتماعي والتموين', icon: 'HeartHandshake', emoji: '🤝' },
};

export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  all: 'جميع الفئات والمراحل',
  kg: 'رياض الأطفال',
  primary: 'المرحلة الابتدائية',
  preparatory: 'المرحلة الإعدادية',
  secondary: 'الثانوية العامة',
  technical: 'التعليم الفني (صناعي/تجاري/زراعي/فندقي)',
  university: 'المرحلة الجامعية والمعاهد',
  postgraduate: 'الدراسات العليا والماجستير',
  teachers: 'المعلمون والكوادر التعليمية',
  citizens: 'المواطنون وعامة الشعب',
  youth: 'الشباب والخريجون',
  investors: 'المستثمرون وأصحاب الأعمال'
};

export const filterServices = (services: EducationService[], filters: FilterOptions, bookmarks: string[]): EducationService[] => {
  return services.filter(service => {
    // Bookmarks check
    if (filters.onlyBookmarks && !bookmarks.includes(service.id)) {
      return false;
    }

    // Open Today / Immediate registration filter check
    if (filters.openTodayOnly) {
      const isOpenNow = service.status === 'active' && (
        service.featured ||
        ['tansik', 'housing', 'employment', 'schools', 'academies', 'results', 'interior', 'traffic'].includes(service.category) ||
        service.keywords?.some(k => k.includes('تنسيق') || k.includes('تقديم') || k.includes('حجز') || k.includes('مرحلة') || k.includes('نتيجة') || k.includes('وظائف'))
      );
      if (!isOpenNow) return false;
    }

    // Governorate check
    if (filters.governorate && filters.governorate !== 'all') {
      const g = filters.governorate;
      const hasGov = !service.governorates || service.governorates.length === 0 || service.governorates.includes('جميع المحافظات') || service.governorates.includes(g);
      if (!hasGov) return false;
    }

    // Category check
    if (filters.category !== 'all' && service.category !== filters.category) {
      return false;
    }

    // Level check
    if (filters.level !== 'all' && service.level !== filters.level && service.level !== 'all') {
      return false;
    }

    // Authority check
    if (filters.authority && filters.authority !== 'all' && !service.authority.includes(filters.authority)) {
      return false;
    }

    // Status check
    if (filters.status && filters.status !== 'all' && service.status !== filters.status) {
      return false;
    }

    // Has Fees check
    if (filters.hasFees && filters.hasFees !== 'all') {
      const isFree = service.fees.includes('مجاني') || service.fees.includes('دون مقابل') || service.fees === 'مجاناً';
      if (filters.hasFees === 'free' && !isFree) return false;
      if (filters.hasFees === 'paid' && isFree) return false;
    }

    // Comprehensive Search query check
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const nameMatch = service.name.toLowerCase().includes(q);
      const descMatch = service.description.toLowerCase().includes(q);
      const authMatch = service.authority.toLowerCase().includes(q);
      const docMatch = service.documents.some(d => d.toLowerCase().includes(q));
      const stepsMatch = service.steps.some(s => s.toLowerCase().includes(q));
      const purposeMatch = service.purpose.toLowerCase().includes(q);
      const whoMatch = service.whoCanApply.toLowerCase().includes(q);
      const eligMatch = service.eligibility.toLowerCase().includes(q);
      const categoryMatch = (CATEGORY_LABELS[service.category]?.title || '').toLowerCase().includes(q);
      const keywordMatch = service.keywords?.some(k => k.toLowerCase().includes(q)) ?? false;
      
      if (!nameMatch && !descMatch && !authMatch && !docMatch && !stepsMatch && !purposeMatch && !whoMatch && !eligMatch && !categoryMatch && !keywordMatch) {
        return false;
      }
    }

    return true;
  });
};

