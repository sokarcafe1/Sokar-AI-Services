export type CategoryType = 
  | 'moe'          // وزارة التربية والتعليم
  | 'schools'      // المدارس
  | 'universities' // الجامعات
  | 'technical'    // التعليم الفني
  | 'tansik'       // تنسيق الجامعات
  | 'results'      // نتائج الامتحانات
  | 'teachers'     // خدمات المعلمين
  | 'portals'      // المنصات الرقمية التعليمية
  | 'interior'     // وزارة الداخلية والأحوال المدنية
  | 'traffic'      // خدمات المرور والنيابة العامة
  | 'housing'      // الإسكان والتمويل والشهر العقاري
  | 'electricity'  // خدمات الكهرباء
  | 'water'        // خدمات المياه والصرف الصحي
  | 'gas'          // خدمات الغاز الطبيعي
  | 'healthcare'   // الصحة والتأمين الصحي
  | 'employment'   // التوظيف والعمل
  | 'taxes'        // الضرائب والسجل التجاري والاستثمار
  | 'academies'    // الكليات العسكرية وأكاديمية الشرطة
  | 'travel'       // السفر والمصريون بالخارج
  | 'social';      // الدعم الاجتماعي والتموين ومصر الرقمية

export type EducationLevel = 
  | 'kg'           // رياض الأطفال
  | 'primary'      // الابتدائي
  | 'preparatory'  // الإعدادي
  | 'secondary'    // الثانوي العام
  | 'technical'    // التعليم الفني
  | 'university'   // الجامعي
  | 'postgraduate' // الدراسات العليا
  | 'teachers'     // المعلمين
  | 'citizens'     // للمواطنين عموماً
  | 'youth'        // للشباب والطلاب
  | 'investors'    // للمستثمرين وأصحاب الأعمال
  | 'all';         // جميع الفئات والمراحل

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  hotline?: string;
  phone?: string;
  email?: string;
  address?: string;
  supportUrl?: string;
}

export type Language = 'ar' | 'en';

export interface EducationService {
  id: string;
  name: string;
  nameEn?: string;
  iconName: string;
  authority: string; // الجهة الحكومية الرسمية
  authorityEn?: string;
  category: CategoryType;
  level: EducationLevel;
  officialWebsiteName: string;
  officialWebsiteNameEn?: string;
  officialUrl: string; // URL رسمي مباشر
  description: string;
  descriptionEn?: string;
  purpose: string;
  whoCanApply: string;
  eligibility: string;
  documents: string[];
  steps: string[];
  fees: string; // المصروفات الرسمية أو "غير منشور رسميًا"
  processingTime: string;
  workingHours: string;
  faqs: FAQItem[];
  relatedServiceIds: string[];
  contactInfo: ContactInfo;
  lastVerifiedDate: string;
  status: 'active' | 'maintenance' | 'unavailable' | 'coming_soon';
  featured?: boolean;
  keywords?: string[];
  seoSlug?: string;
  seoMetaDescription?: string;
  linkHealth?: 'working' | 'needs_review' | 'broken';
  governorates?: string[];
  district?: string;
  viewCount?: number;
  qrCodeUrl?: string;
  videoTutorialUrl?: string;
  videoTutorialEmbedUrl?: string;
  videoTutorialTitle?: string;
  videoTutorialDuration?: string;
}

export interface GovernmentNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: CategoryType | 'announcements' | 'jobs' | 'housing' | 'results';
  sourceName: string;
  sourceUrl: string;
  publishDate: string;
  imageUrl?: string;
  isImportant?: boolean;
}

export interface ServiceCenter {
  id: string;
  name: string;
  type: 'civil_registry' | 'traffic' | 'post_office' | 'electricity' | 'passports' | 'housing' | 'hospital';
  typeNameAr: string;
  governorate: string;
  city: string;
  address: string;
  phone?: string;
  googleMapsUrl: string;
  workingHours: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  governorate: string;
  nationalId?: string;
  savedServices: string[];
  savedSearches: string[];
  subscribedCategories: string[];
  recentlyViewedServices?: string[];
  downloadedGuides?: string[];
  reminders?: {
    id: string;
    serviceTitle: string;
    dueDate: string;
    note: string;
  }[];
}

export interface AuditLog {
  id: string;
  action: string;
  adminUser: string;
  timestamp: string;
  details: string;
}

export interface IncorrectInfoReport {
  id: string;
  serviceId: string;
  serviceName: string;
  reportType: 'outdated_link' | 'wrong_documents' | 'wrong_fees' | 'changed_steps' | 'other';
  details: string;
  userEmail?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface FilterOptions {
  searchQuery: string;
  category: CategoryType | 'all';
  level: EducationLevel | 'all';
  authority: string;
  status: string;
  governorate?: string;
  onlyBookmarks?: boolean;
  openTodayOnly?: boolean;
  hasFees?: 'all' | 'free' | 'paid';
}

// Phase 4 Enterprise Data Types
export interface GovernmentMinistry {
  id: string;
  name: string;
  logoEmoji: string;
  description: string;
  officialWebsite: string;
  officialEmail: string;
  hotline: string;
  address: string;
  workingHours: string;
  governoratesServed: string[];
  relatedServicesCount: number;
  latestAnnouncement?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface OfficialForm {
  id: string;
  title: string;
  authority: string;
  category: CategoryType;
  description: string;
  prerequisites: string[];
  fileSize: string;
  fileFormat: 'PDF' | 'DOCX' | 'Online Form';
  downloadUrl: string;
  lastUpdated: string;
  downloadsCount: number;
}

export interface DeadlineEvent {
  id: string;
  title: string;
  authority: string;
  category: 'admission' | 'tansik' | 'housing' | 'jobs' | 'renewals' | 'taxes' | 'results' | 'general';
  categoryLabelAr: string;
  startDate: string;
  endDate: string;
  description: string;
  status: 'upcoming' | 'open_now' | 'closing_soon' | 'closed';
  officialUrl?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  simplifiedExplanation: string;
  commonUseCases: string[];
  relatedServices?: string[];
}

export interface ServiceFeedback {
  id: string;
  serviceId: string;
  accuracyRating: number; // 1-5
  easeOfUseRating: number; // 1-5
  officialSiteRating: number; // 1-5
  userComment?: string;
  createdAt: string;
}

export interface ServiceVersionHistory {
  version: string;
  updatedAt: string;
  updatedBy: string;
  summaryOfChanges: string;
  previousFees?: string;
}

// Phase 7 Electronic Services Office Management System Types
export type OfficeRole = 'manager' | 'agent' | 'cashier' | 'admin';

export interface OfficeEmployee {
  id: string;
  name: string;
  role: OfficeRole;
  roleTitleAr: string;
  email: string;
  phone: string;
  avatarEmoji: string;
  completedRequestsCount: number;
  activeRequestsCount: number;
}

export interface CustomerDocument {
  id: string;
  name: string;
  fileType: string;
  uploadDate: string;
  fileUrl?: string;
  notes?: string;
}

export interface OfficeCustomer {
  id: string;
  name: string;
  nationalId: string;
  phone: string;
  email?: string;
  governorate: string;
  address?: string;
  notes?: string;
  totalRequests: number;
  totalSpent: number;
  createdAt: string;
  documents: CustomerDocument[];
}

export interface RequiredDocumentItem {
  docName: string;
  isReceived: boolean;
  receivedDate?: string;
}

export type RequestCompletionStatus = 
  | 'pending'
  | 'documents_needed'
  | 'processing'
  | 'ready_for_delivery'
  | 'completed'
  | 'cancelled';

export interface OfficeServiceRequest {
  id: string;
  requestNumber: string; // e.g. OFF-2026-8841
  customerId: string;
  customerName: string;
  nationalId: string;
  phoneNumber: string;
  serviceId: string;
  serviceName: string;
  authority: string;
  requiredDocumentsChecklist: RequiredDocumentItem[];
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  governmentFees: number;
  officeServiceFee: number;
  totalAmount: number;
  amountPaid: number;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  notes: string;
  completionStatus: RequestCompletionStatus;
  deliveryDate: string;
  createdDate: string;
  updatedDate: string;
  customerDocuments: CustomerDocument[];
  qrBarcode: string;
}

export interface OfficeInvoice {
  id: string;
  invoiceNumber: string;
  requestId: string;
  requestNumber: string;
  customerName: string;
  nationalId: string;
  serviceName: string;
  governmentFees: number;
  officeFee: number;
  totalAmount: number;
  amountPaid: number;
  paymentMethod: 'cash' | 'vodafone_cash' | 'fawry' | 'visa';
  paymentDate: string;
  cashierName: string;
  receiptType: 'receipt' | 'invoice';
}

export interface OfficeAppointment {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  purpose: string;
  assignedEmployee: string;
  status: 'scheduled' | 'attended' | 'cancelled';
}

export interface OfficeAuditLog {
  id: string;
  timestamp: string;
  employeeName: string;
  employeeRole: string;
  action: string;
  details: string;
}

// Phase 8 Office Operations & Accounting Types
export interface OfficeExpense {
  id: string;
  title: string;
  amount: number;
  category: 'rent' | 'utilities' | 'paper_ink' | 'salaries' | 'maintenance' | 'other';
  categoryAr: string;
  date: string;
  registeredBy: string;
  receiptNumber?: string;
  notes?: string;
}

export interface OfficeInventoryItem {
  id: string;
  itemName: string;
  category: 'printers' | 'paper' | 'ink' | 'supplies';
  categoryAr: string;
  currentStock: number;
  minStockAlert: number;
  unit: string;
  unitCost: number;
  lastRestocked: string;
}

export interface OfficeNotificationLog {
  id: string;
  requestId: string;
  requestNumber: string;
  customerName: string;
  phone: string;
  channel: 'sms' | 'whatsapp' | 'email';
  templateType: 'request_received' | 'ready_for_pickup' | 'reminder';
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
  messageBody: string;
}

export interface OfficeSecurityDevice {
  id: string;
  deviceName: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface RequestActivityLog {
  id: string;
  requestId: string;
  timestamp: string;
  actor: string;
  statusFrom: string;
  statusTo: string;
  comment: string;
}

// Phase 9 Real Business Integration Types
export interface QueueTicket {
  id: string;
  ticketNumber: string; // e.g., A-101
  customerName: string;
  serviceName: string;
  issueTime: string;
  status: 'waiting' | 'called' | 'in_progress' | 'completed' | 'cancelled';
  counterNumber?: number;
  estimatedWaitMinutes: number;
}

export interface OfficeBranch {
  id: string;
  nameAr: string;
  code: string;
  address: string;
  phone: string;
  managerName: string;
  activeCountersCount: number;
  requestsCountToday: number;
  status: 'active' | 'busy' | 'closed';
}

export interface DigitalSignatureRecord {
  id: string;
  requestId: string;
  signerName: string;
  nationalId: string;
  signedAt: string;
  signatureDataUrl: string;
}

export interface CloudSyncState {
  isOnline: boolean;
  lastSyncedAt: string;
  pendingSyncCount: number;
  syncHealth: 'healthy' | 'syncing' | 'offline' | 'conflict';
}

export interface ThermalPrintConfig {
  paperWidth: '58mm' | '80mm';
  printerName: string;
  autoPrintOnPayment: boolean;
  headerTextAr: string;
  footerTextAr: string;
}

// Phase 10 Commercial SaaS Edition Types
export type SubscriptionTier = 'basic' | 'professional' | 'enterprise';

export interface SaaSLicense {
  licenseKey: string;
  officeName: string;
  plan: SubscriptionTier;
  status: 'active' | 'trial' | 'expired' | 'suspended';
  issuedAt: string;
  expiresAt: string;
  trialDaysLeft?: number;
  maxCountersAllowed: number;
  maxBranchesAllowed: number;
  isVerifiedOnline: boolean;
  lastOnlineCheck: string;
}

export interface OfficeBrandingConfig {
  officeNameAr: string;
  officeNameEn: string;
  taglineAr: string;
  logoEmoji: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  receiptHeaderAr: string;
  receiptFooterAr: string;
  customWatermarkText: string;
  showGovBadge: boolean;
}

export interface TenantInfo {
  id: string;
  subdomain: string;
  officeName: string;
  databaseName: string;
  createdAt: string;
  plan: SubscriptionTier;
  status: 'active' | 'maintenance' | 'disabled';
  totalRequestsProcessed: number;
  activeUsersCount: number;
  dbSizeBytes: number;
}

export interface SaaSBillingInvoice {
  id: string;
  invoiceNumber: string;
  officeName: string;
  plan: SubscriptionTier;
  billingPeriod: string;
  amountEgp: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidAt?: string;
  paymentMethod: 'credit_card' | 'fawry' | 'bank_transfer' | 'vodafone_cash';
}

export interface SaaSPlugin {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  category: 'communication' | 'hardware' | 'ai' | 'compliance' | 'finance';
  iconEmoji: string;
  isInstalled: boolean;
  isEnabled: boolean;
  priceEgpMonthly: number;
  version: string;
}

export interface AutoUpdateState {
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;
  releaseNotesAr: string;
  isUpdating: boolean;
  updateProgress: number;
  pendingDatabaseMigrations: number;
  lastCheckedAt: string;
}

export interface DiagnosticErrorReport {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  component: string;
  message: string;
  stackTrace?: string;
  officeName: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface DeploymentConfig {
  domainName: string;
  sslEnabled: boolean;
  dockerStatus: 'running' | 'stopped' | 'configuring';
  nginxStatus: 'active' | 'error';
  postgresHost: string;
  postgresDb: string;
  backupSchedulerEnabled: boolean;
  backupFrequencyHours: number;
  lastBackupAt: string;
}

// Phase 11 Official Link Verification & Smart Updates Types
export interface LinkVerificationLog {
  id: string;
  serviceId: string;
  serviceTitleAr: string;
  officialUrl: string;
  httpStatus: number;
  sslValid: boolean;
  responseTimeMs: number;
  health: 'working' | 'needs_review' | 'broken';
  checkedAt: string;
  lastWorkingDate: string;
  verificationSource: string;
  redirectDetected?: boolean;
  dnsError?: boolean;
  timeoutError?: boolean;
}

export interface OfficialAnnouncement {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'education' | 'housing' | 'jobs' | 'military' | 'migration' | 'coordination' | 'other';
  officialAuthorityAr: string;
  officialAuthorityEn?: string;
  openingDate: string; // e.g. '2026-07-01' or 'غير معلن رسمياً'
  closingDate: string; // e.g. '2026-08-31' or 'غير معلن رسمياً'
  isOpeningUnannounced?: boolean;
  isClosingUnannounced?: boolean;
  remainingDays: number | null;
  officialUrl: string;
  requiredDocumentsAr: string[];
  eligibilityAr: string[];
  applicationStepsAr: string[];
  officialPdfUrl?: string;
  officialPdfTitleAr?: string;
  lastOfficialUpdate: string;
  status: 'open_now' | 'opening_soon' | 'closed' | 'extended';
  portalStatus?: 'working' | 'server_down' | 'heavy_traffic';
  portalStatusNoteAr?: string;
  announcedToday?: boolean;
  verificationSource: string;
  isOfficialVerified: boolean;
}

export interface LinkVerificationReport {
  reportId: string;
  timestamp: string;
  totalChecked: number;
  workingCount: number;
  needsReviewCount: number;
  brokenCount: number;
  averageResponseTimeMs: number;
  sslHealthPercentage: number;
  verifiedBy: string;
  logs: LinkVerificationLog[];
}

// Phase 12.5 Production Safe Synchronization Types
export interface GovernmentConnectorInfo {
  connectorId: 'EducationConnector' | 'HousingConnector' | 'TrafficConnector' | 'DigitalEgyptConnector' | 'CAOAConnector' | 'MOIConnector';
  nameAr: string;
  officialDomain: string;
  authorityNameAr: string;
  status: 'active' | 'syncing' | 'offline_cached' | 'error';
  lastSuccessSyncAt: string;
  responseTimeMs: number;
  verificationMethod: 'Live HTTP Headers + ETag + SHA256 PDF Watcher';
}

export interface PdfWatchItem {
  id: string;
  titleAr: string;
  url: string;
  officialAuthorityAr: string;
  sha256Hash: string;
  fileSizeBytes: number;
  lastModifiedHeader: string;
  status: 'verified_unchanged' | 'updated_hash' | 'new_pdf' | 'removed';
  lastCheckedAt: string;
}

export interface PendingVerificationRecord {
  id: string;
  titleAr: string;
  sourceUrl: string;
  category: string;
  detectedAt: string;
  officialAuthorityAr: string;
  proposedChanges: string[];
  oldDataJson?: string;
  newDataJson?: string;
  status: 'pending_review' | 'approved' | 'rejected';
}

export interface VersionHistoryRecord {
  id: string;
  entityId: string;
  entityTitleAr: string;
  entityType: 'service' | 'announcement' | 'pdf' | 'fees' | 'dates';
  versionNumber: number;
  changedAt: string;
  sourceUrl: string;
  oldValue: string;
  newValue: string;
  changeReason: string;
  sha256Hash: string;
  verifiedBy: string;
}

export interface SyncSchedulerLog {
  id: string;
  executedAt: string;
  executionType: 'daily_24h' | 'cron_6h' | 'manual_sync';
  status: 'completed_success' | 'partial_success' | 'failed';
  connectorsRunCount: number;
  recordsVerifiedCount: number;
  pendingApprovalsCreatedCount: number;
  executionDurationMs: number;
  verifiedBy: string;
}









