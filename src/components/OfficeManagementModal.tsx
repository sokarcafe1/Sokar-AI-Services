import React, { useState, useRef, useEffect } from 'react';
import { 
  EducationService, 
  OfficeEmployee, 
  OfficeCustomer, 
  OfficeServiceRequest, 
  OfficeInvoice, 
  OfficeAppointment, 
  OfficeAuditLog,
  OfficeExpense,
  OfficeInventoryItem,
  OfficeNotificationLog,
  OfficeSecurityDevice,
  QueueTicket,
  OfficeBranch,
  DigitalSignatureRecord,
  CloudSyncState,
  ThermalPrintConfig,
  RequiredDocumentItem,
  RequestCompletionStatus,
  Language
} from '../types';
import { 
  X, Search, Plus, User, Users, FileText, CheckCircle, AlertCircle, Clock, 
  DollarSign, Calendar, ShieldCheck, Printer, Download, Eye, Upload, 
  Filter, Trash2, Edit3, Barcode, QrCode, RefreshCw, FileSpreadsheet, Lock, ChevronDown, Check, PhoneCall,
  TrendingUp, TrendingDown, Package, Bell, Smartphone, Mail, ShieldAlert, Key, Laptop, Activity, PieChart, Send,
  Camera, FileCheck, PenTool, Server, HardDrive, Cloud, CloudOff, Layers, Tv, Volume2, ArrowRightLeft, Copy, ExternalLink, Cpu
} from 'lucide-react';

import { SaaSCommercialHub } from './SaaSCommercialHub';
import { SubscriptionLockedGate } from './SubscriptionLockedGate';
import { SubscriptionAlertBanner } from './SubscriptionAlertBanner';
import { SubscriptionCenterModal } from './SubscriptionCenterModal';
import { getActiveSubscription, hasFeaturePermission } from '../services/subscriptionService';
import { SubscriptionState } from '../types/subscription';

interface OfficeManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: EducationService[];
  lang?: Language;
}

// Initial Employees
const INITIAL_EMPLOYEES: OfficeEmployee[] = [
  {
    id: 'emp-1',
    name: 'أ. محمود الفقي',
    role: 'manager',
    roleTitleAr: 'مدير المكتب والمشرف العام',
    email: 'm.elfeqy@office.gov.eg',
    phone: '01001234567',
    avatarEmoji: '👨‍💼',
    completedRequestsCount: 142,
    activeRequestsCount: 5
  },
  {
    id: 'emp-2',
    name: 'م. سارة أحمد',
    role: 'agent',
    roleTitleAr: 'أخصائية تنفيذ معاملات المرور والأحوال المدنية',
    email: 'sara.ahmed@office.gov.eg',
    phone: '01112223344',
    avatarEmoji: '👩‍💻',
    completedRequestsCount: 98,
    activeRequestsCount: 8
  },
  {
    id: 'emp-3',
    name: 'أ. مصطفى الشريف',
    role: 'cashier',
    roleTitleAr: 'مسؤول الخزينة والتحصيل والمالية',
    email: 'm.elsherif@office.gov.eg',
    phone: '01223334455',
    avatarEmoji: '💰',
    completedRequestsCount: 215,
    activeRequestsCount: 2
  }
];

// Initial Customers
const INITIAL_CUSTOMERS: OfficeCustomer[] = [
  {
    id: 'cust-101',
    name: 'حسام الدين السيد عبد الرحمن',
    nationalId: '29508151203456',
    phone: '01098765432',
    email: 'hossam.elsayed@gmail.com',
    governorate: 'الجيزة',
    address: 'شارع الهرم، الجيزة',
    notes: 'عميل مميز - يفضل التنسيق هاتفياً قبل موعد التسليم',
    totalRequests: 3,
    totalSpent: 850,
    createdAt: '2026-01-15',
    documents: [
      { id: 'doc-1', name: 'بطاقة الرقم القومي (وجهان)', fileType: 'PDF', uploadDate: '2026-01-15' },
      { id: 'doc-2', name: 'شهادة الميلاد الكمبيوتر', fileType: 'JPG', uploadDate: '2026-02-10' }
    ]
  },
  {
    id: 'cust-102',
    name: 'منى محمد علي حسن',
    nationalId: '28803120104889',
    phone: '01288776655',
    email: 'mona.aly@yahoo.com',
    governorate: 'القاهرة',
    address: 'مدينة نصر، القاهرة',
    notes: 'معاملة تجديد جواز سفر مستعجل',
    totalRequests: 1,
    totalSpent: 450,
    createdAt: '2026-03-01',
    documents: [
      { id: 'doc-3', name: 'جواز السفر القديم', fileType: 'PDF', uploadDate: '2026-03-01' }
    ]
  }
];

// Initial Requests
const INITIAL_REQUESTS: OfficeServiceRequest[] = [
  {
    id: 'req-1',
    requestNumber: 'OFF-2026-9041',
    customerId: 'cust-101',
    customerName: 'حسام الدين السيد عبد الرحمن',
    nationalId: '29508151203456',
    phoneNumber: '01098765432',
    serviceId: 'kg-admission',
    serviceName: 'التقديم في مرحلة رياض الأطفال والصف الأول الابتدائي',
    authority: 'وزارة التربية والتعليم والتعليم الفني',
    requiredDocumentsChecklist: [
      { docName: 'شهادة الميلاد المميكنة للطفل', isReceived: true, receivedDate: '2026-07-20' },
      { docName: 'بطاقة الرقم القومي لولي الأمر (سارية)', isReceived: true, receivedDate: '2026-07-20' },
      { docName: 'إثبات محل الإقامة (إيصال مرافق حديث)', isReceived: true, receivedDate: '2026-07-20' },
      { docName: 'طابع تعليمي وطابع مهن تعليمية', isReceived: false }
    ],
    paymentStatus: 'paid',
    governmentFees: 150,
    officeServiceFee: 100,
    totalAmount: 250,
    amountPaid: 250,
    assignedEmployeeId: 'emp-2',
    assignedEmployeeName: 'م. سارة أحمد',
    notes: 'تم تقديم الأوراق إلكترونياً وبانتظار نتيجة التنسيق الأولية',
    completionStatus: 'processing',
    deliveryDate: '2026-07-28',
    createdDate: '2026-07-20 10:15',
    updatedDate: '2026-07-22 14:30',
    customerDocuments: [
      { id: 'd1', name: 'شهادة الميلاد المميكنة', fileType: 'PDF', uploadDate: '2026-07-20' }
    ],
    qrBarcode: 'EG-OFF-9041'
  },
  {
    id: 'req-2',
    requestNumber: 'OFF-2026-9042',
    customerId: 'cust-102',
    customerName: 'منى محمد علي حسن',
    nationalId: '28803120104889',
    phoneNumber: '01288776655',
    serviceId: 'national-id-issuance',
    serviceName: 'تجديد أو استخراج بطاقة الرقم القومي (مستعجل)',
    authority: 'قطاع الأحوال المدنية - وزارة الداخلية',
    requiredDocumentsChecklist: [
      { docName: 'استمارة بطاقة الرقم القومي المستعجلة', isReceived: true, receivedDate: '2026-07-22' },
      { docName: 'مستند إثبات المهنة أو المؤهل', isReceived: true, receivedDate: '2026-07-22' },
      { docName: 'وثيقة الزواج المعتمدة', isReceived: true, receivedDate: '2026-07-22' }
    ],
    paymentStatus: 'paid',
    governmentFees: 175,
    officeServiceFee: 75,
    totalAmount: 250,
    amountPaid: 250,
    assignedEmployeeId: 'emp-1',
    assignedEmployeeName: 'أ. محمود الفقي',
    notes: 'جاهزة للتسليم في مقر الأحوال المدنية',
    completionStatus: 'ready_for_delivery',
    deliveryDate: '2026-07-23',
    createdDate: '2026-07-22 11:00',
    updatedDate: '2026-07-24 09:00',
    customerDocuments: [],
    qrBarcode: 'EG-OFF-9042'
  }
];

// Initial Invoices
const INITIAL_INVOICES: OfficeInvoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-001',
    requestId: 'req-1',
    requestNumber: 'OFF-2026-9041',
    customerName: 'حسام الدين السيد عبد الرحمن',
    nationalId: '29508151203456',
    serviceName: 'التقديم في مرحلة رياض الأطفال',
    governmentFees: 150,
    officeFee: 100,
    totalAmount: 250,
    amountPaid: 250,
    paymentMethod: 'cash',
    paymentDate: '2026-07-20 10:20',
    cashierName: 'أ. مصطفى الشريف',
    receiptType: 'receipt'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-002',
    requestId: 'req-2',
    requestNumber: 'OFF-2026-9042',
    customerName: 'منى محمد علي حسن',
    nationalId: '28803120104889',
    serviceName: 'تجديد بطاقة الرقم القومي (مستعجل)',
    governmentFees: 175,
    officeFee: 75,
    totalAmount: 250,
    amountPaid: 250,
    paymentMethod: 'fawry',
    paymentDate: '2026-07-22 11:05',
    cashierName: 'أ. مصطفى الشريف',
    receiptType: 'invoice'
  }
];

// Initial Expenses
const INITIAL_EXPENSES: OfficeExpense[] = [
  {
    id: 'exp-1',
    title: 'شراء ورق A4 وحبر طابعة ليزر',
    amount: 320,
    category: 'paper_ink',
    categoryAr: 'مستلزمات ورق وحبر',
    date: '2026-07-21',
    registeredBy: 'أ. مصطفى الشريف',
    receiptNumber: 'EXP-8801'
  },
  {
    id: 'exp-2',
    title: 'فاتورة الكهرباء والانترنت للمكتب',
    amount: 450,
    category: 'utilities',
    categoryAr: 'مرافق وانترنت',
    date: '2026-07-23',
    registeredBy: 'أ. محمود الفقي',
    receiptNumber: 'EXP-8802'
  }
];

// Initial Inventory Items
const INITIAL_INVENTORY: OfficeInventoryItem[] = [
  {
    id: 'inv-item-1',
    itemName: 'ورق طباعة A4 فاخر (كرتونة 5 رزم)',
    category: 'paper',
    categoryAr: 'ورق وطباعة',
    currentStock: 4,
    minStockAlert: 5,
    unit: 'كرتونة',
    unitCost: 280,
    lastRestocked: '2026-07-10'
  },
  {
    id: 'inv-item-2',
    itemName: 'حبر طابعة ليزر أسود HP LaserJet 85A',
    category: 'ink',
    categoryAr: 'أحبار وطابعات',
    currentStock: 2,
    minStockAlert: 2,
    unit: 'خرطوشة',
    unitCost: 450,
    lastRestocked: '2026-07-15'
  },
  {
    id: 'inv-item-3',
    itemName: 'طابعة ليزر متعددة الوظائف HP LaserJet Pro',
    category: 'printers',
    categoryAr: 'أجهزة أصلية',
    currentStock: 3,
    minStockAlert: 1,
    unit: 'جهاز',
    unitCost: 8500,
    lastRestocked: '2026-01-01'
  },
  {
    id: 'inv-item-4',
    itemName: 'دباسات وخوارم وأختام مكتبية',
    category: 'supplies',
    categoryAr: 'أدوات مكتبية',
    currentStock: 12,
    minStockAlert: 5,
    unit: 'قطعة',
    unitCost: 45,
    lastRestocked: '2026-06-01'
  }
];

// Initial Queue Tickets
const INITIAL_QUEUE_TICKETS: QueueTicket[] = [
  {
    id: 't-1',
    ticketNumber: 'A-101',
    customerName: 'حسام الدين السيد عبد الرحمن',
    serviceName: 'التقديم في رياض الأطفال',
    issueTime: '10:15 AM',
    status: 'in_progress',
    counterNumber: 1,
    estimatedWaitMinutes: 0
  },
  {
    id: 't-2',
    ticketNumber: 'A-102',
    customerName: 'منى محمد علي حسن',
    serviceName: 'تجديد بطاقة الرقم القومي',
    issueTime: '10:30 AM',
    status: 'called',
    counterNumber: 2,
    estimatedWaitMinutes: 2
  },
  {
    id: 't-3',
    ticketNumber: 'A-103',
    customerName: 'طارق عبد الفتاح عمر',
    serviceName: 'استخراج شهادة ميلاد كمبيوتر',
    issueTime: '10:45 AM',
    status: 'waiting',
    estimatedWaitMinutes: 10
  },
  {
    id: 't-4',
    ticketNumber: 'B-201',
    customerName: 'نادية إبراهيم القاضي',
    serviceName: 'توثيق عقد بيع مركب',
    issueTime: '11:00 AM',
    status: 'waiting',
    estimatedWaitMinutes: 18
  }
];

// Initial Branches
const INITIAL_BRANCHES: OfficeBranch[] = [
  {
    id: 'branch-cairo',
    nameAr: 'فرع القاهرة الرئيسي - مجمع التحرير',
    code: 'CAI-01',
    address: 'ميدان التحرير، وسط البلد، القاهرة',
    phone: '0227900100',
    managerName: 'أ. محمود الفقي',
    activeCountersCount: 4,
    requestsCountToday: 48,
    status: 'active'
  },
  {
    id: 'branch-giza',
    nameAr: 'فرع الجيزة - شارع الهرم',
    code: 'GZA-02',
    address: 'شارع الهرم الرئيسي، الجيزة',
    phone: '0235800200',
    managerName: 'م. عصام عبد المطلب',
    activeCountersCount: 3,
    requestsCountToday: 32,
    status: 'busy'
  },
  {
    id: 'branch-alex',
    nameAr: 'فرع الإسكندرية - محطة الرمل',
    code: 'ALX-03',
    address: 'شارع سعد زغلول، محطة الرمل، الإسكندرية',
    phone: '034800300',
    managerName: 'أ. داليا عبد اللطيف',
    activeCountersCount: 2,
    requestsCountToday: 21,
    status: 'active'
  }
];

// Initial Notification Logs
const INITIAL_NOTIFICATIONS: OfficeNotificationLog[] = [
  {
    id: 'notif-1',
    requestId: 'req-1',
    requestNumber: 'OFF-2026-9041',
    customerName: 'حسام الدين السيد عبد الرحمن',
    phone: '01098765432',
    channel: 'whatsapp',
    templateType: 'request_received',
    sentAt: '2026-07-20 10:22',
    status: 'delivered',
    messageBody: 'عزيزي حسام الدين، تم استقبال طلبك رقم OFF-2026-9041 بنجاح بالمكتب. سنتواصل معك فور التحديث.'
  },
  {
    id: 'notif-2',
    requestId: 'req-2',
    requestNumber: 'OFF-2026-9042',
    customerName: 'منى محمد علي حسن',
    phone: '01288776655',
    channel: 'sms',
    templateType: 'ready_for_pickup',
    sentAt: '2026-07-24 09:05',
    status: 'sent',
    messageBody: 'عزيزتي منى، معاملتك رقم OFF-2026-9042 جاهزة الآن للاستلام من مقر المكتب.'
  }
];

export const OfficeManagementModal: React.FC<OfficeManagementModalProps> = ({
  isOpen,
  onClose,
  services,
  lang = 'ar'
}) => {
  const [currentEmployee, setCurrentEmployee] = useState<OfficeEmployee>(INITIAL_EMPLOYEES[0]);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'reports_analytics' | 'saas_commercial' | 'queue' | 'requests' | 'finance' | 'branches' | 'notifications' | 'inventory' | 'customers' | 'portal' | 'deployment' | 'security'
  >('dashboard');

  // Subscription State Management
  const [subscription, setSubscription] = useState<SubscriptionState>(() => getActiveSubscription(true));
  const [showSubCenterModal, setShowSubCenterModal] = useState(false);

  // Sync subscription when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubscription(getActiveSubscription(true));
    }
  }, [isOpen]);

  // State Management
  const [requests, setRequests] = useState<OfficeServiceRequest[]>(INITIAL_REQUESTS);
  const [customers, setCustomers] = useState<OfficeCustomer[]>(INITIAL_CUSTOMERS);
  const [invoices, setInvoices] = useState<OfficeInvoice[]>(INITIAL_INVOICES);
  const [expenses, setExpenses] = useState<OfficeExpense[]>(INITIAL_EXPENSES);
  const [inventory, setInventory] = useState<OfficeInventoryItem[]>(INITIAL_INVENTORY);
  const [queueTickets, setQueueTickets] = useState<QueueTicket[]>(INITIAL_QUEUE_TICKETS);
  const [branches, setBranches] = useState<OfficeBranch[]>(INITIAL_BRANCHES);
  const [selectedBranch, setSelectedBranch] = useState<OfficeBranch>(INITIAL_BRANCHES[0]);
  const [notificationLogs, setNotificationLogs] = useState<OfficeNotificationLog[]>(INITIAL_NOTIFICATIONS);

  // Phase 9 Real Business Configurations
  const [cloudSync, setCloudSync] = useState<CloudSyncState>({
    isOnline: true,
    lastSyncedAt: 'منذ دقيقة واحدة',
    pendingSyncCount: 0,
    syncHealth: 'healthy'
  });

  const [thermalConfig, setThermalConfig] = useState<ThermalPrintConfig>({
    paperWidth: '80mm',
    printerName: 'Thermal Receipt Printer (POS-80)',
    autoPrintOnPayment: true,
    headerTextAr: 'مكتب الخدمات الحكومية المعتمد - جمهورية مصر العربية',
    footerTextAr: 'شكراً لزيارتكم مكتبنا - نعتز بخدمة المواطنين الكرام'
  });

  // Modals & Interactive States
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showQRScannerModal, setShowQRScannerModal] = useState(false);
  const [showDocScannerModal, setShowDocScannerModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showQueueDisplayScreen, setShowQueueDisplayScreen] = useState(false);
  const [showTransferBranchModal, setShowTransferBranchModal] = useState(false);

  // Active items selected for modals
  const [selectedRequestForSig, setSelectedRequestForSig] = useState<OfficeServiceRequest | null>(null);
  const [selectedRequestForTransfer, setSelectedRequestForTransfer] = useState<OfficeServiceRequest | null>(null);
  const [previewInvoiceForThermal, setPreviewInvoiceForThermal] = useState<OfficeInvoice | null>(null);

  // Digital Signatures Map
  const [signaturesMap, setSignaturesMap] = useState<Record<string, DigitalSignatureRecord>>({});

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form inputs
  const [selectedServiceForNewReq, setSelectedServiceForNewReq] = useState<EducationService | null>(null);
  const [newCustName, setNewCustName] = useState('');
  const [newCustNationalId, setNewCustNationalId] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newOfficeFee, setNewOfficeFee] = useState<number>(100);
  const [newNotes, setNewNotes] = useState('');

  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState<'rent' | 'utilities' | 'paper_ink' | 'salaries' | 'maintenance' | 'other'>('paper_ink');

  // Queue Form
  const [newTicketCustName, setNewTicketCustName] = useState('');
  const [newTicketService, setNewTicketService] = useState('الخدمات العامة وتجديد البطاقة');

  // Scanner WebCam Simulator State
  const [scannedQRCodeInput, setScannedQRCodeInput] = useState('');
  const [docScanSuccess, setDocScanSuccess] = useState(false);
  const [docFilter, setDocFilter] = useState<'normal' | 'bw' | 'high_contrast'>('high_contrast');

  // Digital Signature Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Citizen Portal Track input
  const [portalSearchQuery, setPortalSearchQuery] = useState('');
  const [portalResult, setPortalResult] = useState<OfficeServiceRequest | null>(null);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<OfficeAuditLog[]>([
    {
      id: 'log-1',
      timestamp: '2026-07-24 12:00',
      employeeName: 'أ. محمود الفقي',
      employeeRole: 'مدير المكتب المشرف العام',
      action: 'بدء تشغيل المكتب',
      details: 'تم ربط الحسابات الخزينة والمخزون مع الخادم السحابي'
    }
  ]);

  if (!isOpen) return null;

  // Helper log
  const logAction = (action: string, details: string) => {
    const newLog: OfficeAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('ar-EG'),
      employeeName: currentEmployee.name,
      employeeRole: currentEmployee.roleTitleAr,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Filtered Requests
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.customerName.includes(searchQuery) ||
      req.nationalId.includes(searchQuery) ||
      req.phoneNumber.includes(searchQuery) ||
      req.serviceName.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || req.completionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle Create Request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceForNewReq || !newCustName || !newCustNationalId || !newCustPhone) {
      alert('يرجى ملء جميع البيانات الأساسية للعميل والخدمة');
      return;
    }

    const govFees = parseInt(selectedServiceForNewReq.fees) || 100;
    const total = govFees + newOfficeFee;
    const reqNum = `OFF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const requiredDocs: RequiredDocumentItem[] = (selectedServiceForNewReq.documents || ['بطاقة الرقم القومي']).map(doc => ({
      docName: doc,
      isReceived: false
    }));

    const newReq: OfficeServiceRequest = {
      id: `req-${Date.now()}`,
      requestNumber: reqNum,
      customerId: `cust-${Date.now()}`,
      customerName: newCustName,
      nationalId: newCustNationalId,
      phoneNumber: newCustPhone,
      serviceId: selectedServiceForNewReq.id,
      serviceName: selectedServiceForNewReq.name,
      authority: selectedServiceForNewReq.authority,
      requiredDocumentsChecklist: requiredDocs,
      paymentStatus: 'paid',
      governmentFees: govFees,
      officeServiceFee: newOfficeFee,
      totalAmount: total,
      amountPaid: total,
      assignedEmployeeId: currentEmployee.id,
      assignedEmployeeName: currentEmployee.name,
      notes: newNotes || 'طلب جديد تم تسجيله بالمكتب',
      completionStatus: 'processing',
      deliveryDate: '2026-08-01',
      createdDate: new Date().toLocaleString('ar-EG'),
      updatedDate: new Date().toLocaleString('ar-EG'),
      customerDocuments: [],
      qrBarcode: `EG-${reqNum}`
    };

    setRequests(prev => [newReq, ...prev]);

    // Record invoice
    const newInv: OfficeInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      requestId: newReq.id,
      requestNumber: reqNum,
      customerName: newCustName,
      nationalId: newCustNationalId,
      serviceName: selectedServiceForNewReq.name,
      governmentFees: govFees,
      officeFee: newOfficeFee,
      totalAmount: total,
      amountPaid: total,
      paymentMethod: 'cash',
      paymentDate: new Date().toLocaleString('ar-EG'),
      cashierName: currentEmployee.name,
      receiptType: 'invoice'
    };
    setInvoices(prev => [newInv, ...prev]);

    // Auto notification
    const newNotif: OfficeNotificationLog = {
      id: `notif-${Date.now()}`,
      requestId: newReq.id,
      requestNumber: reqNum,
      customerName: newCustName,
      phone: newCustPhone,
      channel: 'whatsapp',
      templateType: 'request_received',
      sentAt: new Date().toLocaleString('ar-EG'),
      status: 'delivered',
      messageBody: `مرحباً ${newCustName}، تم إنشاء طلب المعاملة رقم ${reqNum} (${selectedServiceForNewReq.name}) بنجاح.`
    };
    setNotificationLogs(prev => [newNotif, ...prev]);

    logAction('إنشاء طلب معاملة جديد', `رقم الطلب ${reqNum} - العميل: ${newCustName}`);

    setShowAddRequestModal(false);
    setNewCustName('');
    setNewCustNationalId('');
    setNewCustPhone('');
    setSelectedServiceForNewReq(null);
    setNewNotes('');
    alert(`تم إنشاء الطلب بنجاح ورقم المعاملة: ${reqNum}`);
  };

  // Generate Queue Ticket
  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketCustName) return;

    const nextNum = `A-${101 + queueTickets.length}`;
    const newTicket: QueueTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: nextNum,
      customerName: newTicketCustName,
      serviceName: newTicketService,
      issueTime: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
      estimatedWaitMinutes: (queueTickets.filter(t => t.status === 'waiting').length + 1) * 5
    };

    setQueueTickets(prev => [...prev, newTicket]);
    setNewTicketCustName('');
    logAction('إصدار تذكرة انتظار', `رقم التذكرة ${nextNum} - العميل ${newTicketCustName}`);
    alert(`تم إصدار تذكرة رقم: ${nextNum} بنجاح!`);
  };

  // Call Next Ticket
  const handleCallNextTicket = (counterNum: number) => {
    const nextWaiting = queueTickets.find(t => t.status === 'waiting');
    if (!nextWaiting) {
      alert('لا توجد تذاكر انتظار متبقية في القائمة!');
      return;
    }

    setQueueTickets(prev => prev.map(t => {
      if (t.id === nextWaiting.id) {
        return { ...t, status: 'called', counterNumber: counterNum };
      }
      return t;
    }));

    logAction('نداء تذكرة انتظار', `نداء تذكرة ${nextWaiting.ticketNumber} إلى شباك رقم ${counterNum}`);
  };

  // Digital Signature Canvas
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    if (!selectedRequestForSig) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();

    const sigRecord: DigitalSignatureRecord = {
      id: `sig-${Date.now()}`,
      requestId: selectedRequestForSig.id,
      signerName: selectedRequestForSig.customerName,
      nationalId: selectedRequestForSig.nationalId,
      signedAt: new Date().toLocaleString('ar-EG'),
      signatureDataUrl: dataUrl
    };

    setSignaturesMap(prev => ({ ...prev, [selectedRequestForSig.id]: sigRecord }));
    logAction('توقيع رقمي إلكتروني', `تم حفظ توقيع العميل ${selectedRequestForSig.customerName} للطلب ${selectedRequestForSig.requestNumber}`);
    setShowSignatureModal(false);
    alert('تم حفظ التوقيع الإلكتروني وتوثيق المستند بنجاح!');
  };

  // QR Barcode WebCam Search Instant
  const handleScanQRCodeSearch = () => {
    if (!scannedQRCodeInput) return;
    const found = requests.find(r => 
      r.requestNumber.toLowerCase() === scannedQRCodeInput.toLowerCase() ||
      r.qrBarcode.toLowerCase() === scannedQRCodeInput.toLowerCase()
    );

    if (found) {
      setSearchQuery(found.requestNumber);
      setActiveTab('requests');
      setShowQRScannerModal(false);
      setScannedQRCodeInput('');
      alert(`تم قراءة كود الباريكود بنجاح وبث الطلب: ${found.requestNumber}`);
    } else {
      alert('لم يتم العثور على معاملة مطابقة لكود الباركود المدخل!');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvHeader = "رقم الطلب,اسم العميل,الرقم القومي,رقم الهاتف,اسم الخدمة,الجهة,إجمالي المبلغ,حالة الإنجاز,تاريخ الإنشاء\n";
    const csvRows = requests.map(r => 
      `"${r.requestNumber}","${r.customerName}","${r.nationalId}","${r.phoneNumber}","${r.serviceName}","${r.authority}",${r.totalAmount},"${r.completionStatus}","${r.createdDate}"`
    ).join("\n");

    const blob = new Blob(["\uFEFF" + csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Egypt_Services_Office_Requests_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Financial Ledger Calculations
  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalGovFees = invoices.reduce((acc, inv) => acc + inv.governmentFees, 0);
  const totalOfficeFees = invoices.reduce((acc, inv) => acc + inv.officeFee, 0);
  const totalExpensesAmount = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netProfit = totalOfficeFees - totalExpensesAmount;

  const lowStockCount = inventory.filter(i => i.currentStock <= i.minStockAlert).length;
  const overdueRequestsCount = requests.filter(r => r.completionStatus !== 'completed' && r.deliveryDate < '2026-07-24').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto dir-rtl font-['Cairo',sans-serif]">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-7xl overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-700/80 flex items-center justify-center text-2xl shadow-inner border border-indigo-500/60 shrink-0">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-indigo-900 text-indigo-200 text-[10px] font-black px-2 py-0.5 rounded-md border border-indigo-700">
                  نظام تشغيل المكتب v9.0
                </span>
                <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-700 flex items-center gap-1">
                  <Cloud className="w-3 h-3 text-emerald-400" />
                  <span>تزامن سحابي نَشِط</span>
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                  📍 {selectedBranch.nameAr}
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black text-white mt-0.5">
                منظومة إدارة مكتب الخدمات الحكومية المتكامل والربط الشبكي
              </h1>
            </div>
          </div>

          {/* Quick Actions & Employee Switch */}
          <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0 flex-wrap">
            
            {/* Subscription Center Modal Trigger */}
            <button
              onClick={() => setShowSubCenterModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Key className="w-4 h-4 text-slate-950" />
              <span>مركز الاشتراكات ({subscription.planTitleAr})</span>
            </button>

            {/* Quick WebCam Scanner Trigger */}
            <button
              onClick={() => setShowQRScannerModal(true)}
              className="bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 text-xs font-bold px-3 py-2 rounded-xl border border-indigo-600 flex items-center gap-1.5 transition-all shadow-xs"
            >
              <QrCode className="w-4 h-4 text-indigo-300" />
              <span>ماسح الباركود</span>
            </button>

            {/* Quick Document Camera Scanner Trigger */}
            <button
              onClick={() => setShowDocScannerModal(true)}
              className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-600 flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span>ماسح أوراق المستندات</span>
            </button>

            {/* Employee Switcher */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-1.5 flex items-center gap-2">
              <span className="text-xl">{currentEmployee.avatarEmoji}</span>
              <select
                value={currentEmployee.id}
                onChange={(e) => {
                  const emp = INITIAL_EMPLOYEES.find(x => x.id === e.target.value);
                  if (emp) {
                    setCurrentEmployee(emp);
                    logAction('تبديل حساب الموظف', `تم الدخول بحساب ${emp.name}`);
                  }
                }}
                className="bg-slate-900 text-white text-xs font-bold border border-slate-700 rounded-xl px-2 py-1 focus:outline-none"
              >
                {INITIAL_EMPLOYEES.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.roleTitleAr})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-4 pt-2.5 gap-1.5 overflow-x-auto text-xs font-bold scrollbar-none">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>لوحة المراقبة الحية</span>
          </button>

          {/* REPORTS & ANALYTICS TAB (Gated by Subscription) */}
          <button
            onClick={() => setActiveTab('reports_analytics')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reports_analytics'
                ? 'border-purple-600 text-purple-950 font-black bg-purple-50 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-4 h-4 text-purple-600" />
            <span>التقارير والإحصائيات</span>
            {!hasFeaturePermission('reports.daily') && (
              <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5 inline" />
                <span>مغلق</span>
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saas_commercial')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'saas_commercial'
                ? 'border-amber-500 text-indigo-950 font-black bg-amber-50 rounded-t-xl'
                : 'border-transparent text-amber-700 hover:text-amber-900 font-bold'
            }`}
          >
            <Key className="w-4 h-4 text-amber-500" />
            <span>SaaS التجاري والتراخيص 💎</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'queue'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tv className="w-4 h-4 text-amber-600" />
            <span>منظومة طابور الانتظار ({queueTickets.filter(t => t.status === 'waiting').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'requests'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>إدارة المعاملات ({requests.length})</span>
            {overdueRequestsCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                {overdueRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'finance'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>الحسابات والطابعة الحرارية</span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'branches'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4 text-blue-600" />
            <span>الفروع وتحويل الطلبات</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4 text-purple-600" />
            <span>واتساب وبوابة SMS API</span>
          </button>

          <button
            onClick={() => setActiveTab('portal')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'portal'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ExternalLink className="w-4 h-4 text-teal-600" />
            <span>بوابة متابعة المواطنين</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-amber-600" />
            <span>المخزون والطابعات</span>
          </button>

          <button
            onClick={() => setActiveTab('deployment')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'deployment'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-4 h-4 text-rose-600" />
            <span>النشر والتشغيل السحابي</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-950 font-black bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>الأمان والسجلات</span>
          </button>

        </div>

        {/* Tab Body Contents */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-slate-50 space-y-5">

          {/* Subscription Expiration Alert Banner */}
          <SubscriptionAlertBanner
            subscription={subscription}
            onRenewClick={() => setShowSubCenterModal(true)}
          />

          {/* TAB: COMMERCIAL SAAS EDITION MODULE */}
          {activeTab === 'saas_commercial' && <SaaSCommercialHub />}

          {/* TAB: REPORTS & ANALYTICS (GATED BY SUBSCRIPTION LOCK) */}
          {activeTab === 'reports_analytics' && (
            <div>
              {!hasFeaturePermission('reports.daily') ? (
                <SubscriptionLockedGate
                  featureTitleAr="وحدة التقارير والإحصائيات وتصدير البيانات"
                  onUpgradeClick={() => setShowSubCenterModal(true)}
                  onActivateKeyClick={() => setShowSubCenterModal(true)}
                />
              ) : (
                <div className="space-y-6">
                  {/* Header Actions & Export Controls */}
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-800 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-purple-200">
                          باقة {subscription.planTitleAr} 💎
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">متاح الوصول الكامل للتقارير والتحليلات</span>
                      </div>
                      <h2 className="text-lg font-black text-slate-900 mt-1">مركز التقارير والإحصائيات والتحليلات المالية والأداء</h2>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          if (hasFeaturePermission('reports.export_pdf')) {
                            alert('جاري إعداد تقرير PDF الشامل وتجهيز مستند الطباعة المعتمد...');
                          } else {
                            setShowSubCenterModal(true);
                          }
                        }}
                        className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <FileText className="w-4 h-4" />
                        <span>تصدير PDF المعتمد</span>
                      </button>

                      <button
                        onClick={() => {
                          if (hasFeaturePermission('reports.export_excel')) {
                            handleExportCSV();
                          } else {
                            setShowSubCenterModal(true);
                          }
                        }}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>تصدير اكسل CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 rounded-2xl border border-slate-800 space-y-2">
                      <p className="text-xs text-slate-300 font-bold">إجمالي إيرادات اليوم</p>
                      <p className="text-2xl font-black text-emerald-400">{totalRevenue} ج.م</p>
                      <p className="text-[11px] text-slate-400">عمولة المكتب الصافية: {totalOfficeFees} ج.م</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <p className="text-xs text-slate-500 font-bold">معاملات منجزة اليوم</p>
                      <p className="text-2xl font-black text-slate-900">{requests.filter(r => r.completionStatus === 'completed').length} / {requests.length}</p>
                      <p className="text-[11px] text-emerald-600 font-bold">نسبة إنجاز 88%</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <p className="text-xs text-slate-500 font-bold">متوسط زمن معالجة الطلب</p>
                      <p className="text-2xl font-black text-indigo-900">8.5 دقيقة</p>
                      <p className="text-[11px] text-indigo-600 font-bold">أسرع بنسبة 15% من المعدل</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <p className="text-xs text-slate-500 font-bold">معدل رضا المواطنين والعملاء</p>
                      <p className="text-2xl font-black text-amber-600">98.5% ⭐</p>
                      <p className="text-[11px] text-slate-500">بناءً على 120 تقييم مباشر</p>
                    </div>
                  </div>

                  {/* Detailed Financial & Employee Breakdown Table */}
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>تقرير إنتاجية ومبيعات الموظفين بالخزينة</span>
                    </h3>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-900 text-white font-bold">
                          <tr>
                            <th className="p-3">اسم الموظف</th>
                            <th className="p-3">المسمى الوظيفي</th>
                            <th className="p-3">عدد الطلبات المنفذة</th>
                            <th className="p-3">رسوم الحكومة المحصلة</th>
                            <th className="p-3">عمولات المكتب المحصلة</th>
                            <th className="p-3">تقييم الكفاءة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                          {INITIAL_EMPLOYEES.map(emp => (
                            <tr key={emp.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold flex items-center gap-2">
                                <span>{emp.avatarEmoji}</span>
                                <span>{emp.name}</span>
                              </td>
                              <td className="p-3 text-slate-600">{emp.roleTitleAr}</td>
                              <td className="p-3 font-bold text-indigo-900">{emp.completedRequestsCount} معاملة</td>
                              <td className="p-3 font-mono text-slate-700">{(emp.completedRequestsCount * 120).toLocaleString('ar-EG')} ج.م</td>
                              <td className="p-3 font-mono text-emerald-700 font-bold">{(emp.completedRequestsCount * 40).toLocaleString('ar-EG')} ج.م</td>
                              <td className="p-3">
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  ممتاز 99%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Multi-Branch Comparison */}
                  <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                        <div>
                          <h3 className="text-sm font-black text-white">تقرير المقارنة بين الفروع (Multi-Branch Analytics)</h3>
                          <p className="text-xs text-slate-400">ملاحظة: هذا التقرير مخصص للباقة المؤسسية Enterprise</p>
                        </div>
                      </div>

                      {!hasFeaturePermission('reports.multibranch') && (
                        <button
                          onClick={() => setShowSubCenterModal(true)}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition-all"
                        >
                          ترقية للتحليلات متعددة الفروع 🚀
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {INITIAL_BRANCHES.map(b => (
                        <div key={b.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-amber-300">{b.nameAr}</span>
                            <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md">{b.address}</span>
                          </div>
                          <div className="text-lg font-black text-white">{(b.requestsCountToday * 150).toLocaleString('ar-EG')} ج.م</div>
                          <div className="text-xs text-slate-400">{b.requestsCountToday} معاملة منفذة اليوم</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 0: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5">
              
              {/* Stat Overview Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-4 rounded-2xl shadow-xs border border-indigo-800 space-y-1">
                  <div className="flex items-center justify-between text-indigo-200 text-xs font-bold">
                    <span>إجمالي الإيرادات الخزينة</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black">{totalRevenue} ج.م</div>
                  <div className="text-[11px] text-indigo-300">
                    صافي الأرباح: <strong className="text-emerald-300">{netProfit} ج.م</strong>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 rounded-2xl shadow-xs border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
                    <span>المنتظرين في طابور الصالة</span>
                    <Tv className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-300">
                    {queueTickets.filter(t => t.status === 'waiting').length} مواطنين
                  </div>
                  <div className="text-[11px] text-slate-400">
                    متوسط وقت الانتظار: 7 دقائق
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-4 rounded-2xl shadow-xs border border-emerald-800 space-y-1">
                  <div className="flex items-center justify-between text-emerald-200 text-xs font-bold">
                    <span>جاهزة لتسليم المواطن</span>
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="text-2xl font-black text-emerald-200">
                    {requests.filter(r => r.completionStatus === 'ready_for_delivery').length} معاملة
                  </div>
                  <div className="text-[11px] text-emerald-300">
                    تم إخطار المواطنين بالوصول
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-900 to-amber-950 text-white p-4 rounded-2xl shadow-xs border border-amber-800 space-y-1">
                  <div className="flex items-center justify-between text-amber-200 text-xs font-bold">
                    <span>تنبيهات نواقص المخزون</span>
                    <Package className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="text-2xl font-black text-amber-300">
                    {lowStockCount} أصناف
                  </div>
                  <div className="text-[11px] text-amber-200">
                    تحتاج إلى إعادة طلب ورق/حبر
                  </div>
                </div>

              </div>

              {/* Main Dashboard Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Left Widget: Today's Appointments & Queue Status */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Tv className="w-4 h-4 text-amber-600" />
                      <span>حالة الشبابيك وطابور الانتظار المباشر</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('queue')}
                      className="text-xs text-indigo-600 font-bold hover:underline"
                    >
                      إدارة شاشة الانتظار ←
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {queueTickets.slice(0, 4).map(ticket => (
                      <div key={ticket.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                              {ticket.ticketNumber}
                            </span>
                            <span className="font-bold text-xs text-slate-800">{ticket.customerName}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">{ticket.serviceName}</p>
                        </div>

                        <div>
                          {ticket.status === 'called' && (
                            <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2 py-1 rounded border border-emerald-300 animate-pulse">
                              شباك {ticket.counterNumber} 🔔
                            </span>
                          )}
                          {ticket.status === 'waiting' && (
                            <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-1 rounded border border-amber-300">
                              في الانتظار ({ticket.estimatedWaitMinutes} دقيقة)
                            </span>
                          )}
                          {ticket.status === 'in_progress' && (
                            <span className="bg-sky-100 text-sky-900 font-bold text-[10px] px-2 py-1 rounded border border-sky-300">
                              جاري المعالجة
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Widget: Branch Network Overview */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                    <span>شبكة الفروع المربوطة</span>
                  </h3>

                  <div className="space-y-3">
                    {branches.map(b => (
                      <div key={b.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-black text-xs text-slate-900">{b.nameAr}</div>
                          <div className="text-[10px] text-slate-500">كود: {b.code} | الشبابيك: {b.activeCountersCount}</div>
                        </div>
                        <div className="text-left font-mono">
                          <span className="text-xs font-black text-emerald-800">{b.requestsCountToday} معاملة</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 1: CUSTOMER QUEUE SYSTEM */}
          {activeTab === 'queue' && (
            <div className="space-y-5">
              
              {/* Queue Controls Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Tv className="w-5 h-5 text-amber-600" />
                    <span>نظام إدارة طابور الانتظار الآلي وإصدار التذاكر</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    إصدار الرقم، نداء الشباك بصوت جرس، وربط شاشة الصالة الرئيسية
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowQueueDisplayScreen(true)}
                    className="bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-slate-700 shadow-xs"
                  >
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>فتح شاشة الصالة العامة 🖥️</span>
                  </button>
                </div>
              </div>

              {/* Call Next & Ticket Generator Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Column 1: Call Next Customer Form */}
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-800 space-y-4 shadow-md">
                  <h3 className="font-black text-sm text-indigo-200 flex items-center gap-2 border-b border-indigo-800 pb-2">
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>نداء المواطن التالي (شباك العمل)</span>
                  </h3>

                  <div className="space-y-3">
                    <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-700 space-y-1">
                      <span className="text-[11px] text-indigo-300 font-bold">التذكرة الحالية المناداة:</span>
                      <div className="text-3xl font-black text-amber-300 font-mono">
                        {queueTickets.find(t => t.status === 'called')?.ticketNumber || 'لا يوجد'}
                      </div>
                      <div className="text-xs text-indigo-200 font-bold">
                        {queueTickets.find(t => t.status === 'called')?.customerName || 'في انتظار النداء...'}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleCallNextTicket(1)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all"
                      >
                        🔔 نداء شباك 1
                      </button>
                      <button
                        onClick={() => handleCallNextTicket(2)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all"
                      >
                        🔔 نداء شباك 2
                      </button>
                    </div>
                  </div>
                </div>

                {/* Column 2: Issue New Ticket */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Printer className="w-4 h-4 text-indigo-600" />
                    <span>طابعة إصدار تذكرة صالة جديد</span>
                  </h3>

                  <form onSubmit={handleGenerateTicket} className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">اسم المواطن / الزائر:</label>
                      <input
                        type="text"
                        value={newTicketCustName}
                        onChange={(e) => setNewTicketCustName(e.target.value)}
                        placeholder="مثال: أحمد محمود علي"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">نوع المعاملة المطلوب:</label>
                      <select
                        value={newTicketService}
                        onChange={(e) => setNewTicketService(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                      >
                        <option value="الخدمات العامة وتجديد البطاقة">الخدمات العامة وتجديد البطاقة</option>
                        <option value="معاملات المرور ورخص القيادة">معاملات المرور ورخص القيادة</option>
                        <option value="استخراج شهادات الميلاد والوفاة">استخراج شهادات الميلاد والوفاة</option>
                        <option value="توثيق عقود الشهر العقاري">توثيق عقود الشهر العقاري</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>طباعة وتوزيع تذكرة الانتظار 🖨️</span>
                    </button>
                  </form>
                </div>

                {/* Column 3: Queue List */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>قائمة الانتظار الحالية بالصالة</span>
                  </h3>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {queueTickets.map(ticket => (
                      <div key={ticket.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-indigo-950 bg-indigo-100 px-2 py-0.5 rounded">
                              {ticket.ticketNumber}
                            </span>
                            <span className="font-bold text-xs text-slate-800">{ticket.customerName}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">{ticket.serviceName}</p>
                        </div>
                        <div className="text-left font-mono">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            ticket.status === 'called' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {ticket.status === 'called' ? `شباك ${ticket.counterNumber}` : 'في الانتظار'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: REQUESTS MANAGEMENT & WORKFLOW */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              
              {/* Search & Actions Header */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث برقم الطلب (مثلاً OFF-2026-9041)، اسم العميل، الرقم القومي، رقم الهاتف، أو اسم الخدمة..."
                    className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="processing">جاري التنفيذ</option>
                    <option value="ready_for_delivery">جاهز للتسليم</option>
                    <option value="completed">مكتمل ومستلم</option>
                    <option value="documents_needed">مستندات ناقصة</option>
                    <option value="cancelled">ملغى</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>تصدير Excel</span>
                  </button>

                  <button
                    onClick={() => setShowAddRequestModal(true)}
                    className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة طلب جديد +</span>
                  </button>
                </div>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                    <span className="text-4xl">📂</span>
                    <p className="font-extrabold text-sm text-slate-800">لا توجد طلبات مطابقة للبحث</p>
                  </div>
                ) : (
                  filteredRequests.map(req => {
                    const isOverdue = req.completionStatus !== 'completed' && req.deliveryDate < '2026-07-24';
                    const isSigned = !!signaturesMap[req.id];

                    return (
                      <div key={req.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 hover:border-indigo-300 transition-all">
                        
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="bg-indigo-950 text-indigo-200 font-mono font-black text-xs px-3 py-1 rounded-xl border border-indigo-800">
                              {req.requestNumber}
                            </span>
                            <div>
                              <h3 className="font-extrabold text-sm text-slate-900">{req.customerName}</h3>
                              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mt-0.5">
                                <span>🆔 {req.nationalId}</span>
                                <span>📱 {req.phoneNumber}</span>
                              </div>
                            </div>
                          </div>

                          {/* SLA & Status */}
                          <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                            {isSigned && (
                              <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2.5 py-1 rounded-xl border border-emerald-300 flex items-center gap-1">
                                <PenTool className="w-3.5 h-3.5 text-emerald-700" />
                                <span>موقع إلكترونياً ✍️</span>
                              </span>
                            )}

                            {isOverdue && (
                              <span className="bg-red-100 text-red-900 font-bold text-xs px-2.5 py-1 rounded-xl border border-red-300 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                                <span>تأخير SLA مع معالجة مستعجلة</span>
                              </span>
                            )}

                            {req.completionStatus === 'processing' && (
                              <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-xl border border-amber-300 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                                <span>جاري التنفيذ بالجهة الحكومية</span>
                              </span>
                            )}
                            {req.completionStatus === 'ready_for_delivery' && (
                              <span className="bg-sky-100 text-sky-900 font-bold text-xs px-3 py-1 rounded-xl border border-sky-300 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
                                <span>جاهز للتسليم للعميل 🟢</span>
                              </span>
                            )}
                            {req.completionStatus === 'completed' && (
                              <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1 rounded-xl border border-emerald-300 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>مكتمل ومستلم ✅</span>
                              </span>
                            )}

                            {/* Digital Signature Trigger */}
                            <button
                              onClick={() => {
                                setSelectedRequestForSig(req);
                                setShowSignatureModal(true);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-xl border border-slate-300 flex items-center gap-1"
                            >
                              <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                              <span>توقيع إلكتروني</span>
                            </button>

                            {/* Transfer Branch Trigger */}
                            <button
                              onClick={() => {
                                setSelectedRequestForTransfer(req);
                                setShowTransferBranchModal(true);
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-xl border border-slate-300 flex items-center gap-1"
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
                              <span>تحويل فرع</span>
                            </button>
                          </div>
                        </div>

                        {/* Service & Fees */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                          <div className="md:col-span-2 space-y-1">
                            <span className="font-bold text-slate-500">الخدمة والجهة:</span>
                            <p className="font-black text-slate-900">{req.serviceName}</p>
                            <span className="text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {req.authority}
                            </span>
                          </div>

                          <div className="space-y-1 border-r border-slate-200 pr-3">
                            <span className="font-bold text-slate-500">المبالغ المحصلة:</span>
                            <div className="font-black text-emerald-800 text-sm">
                              إجمالي: {req.totalAmount} ج.م
                            </div>
                            <div className="text-[11px] text-slate-600">
                              (رسوم حكومية: {req.governmentFees} ج.م + أتعاب مكتب: {req.officeServiceFee} ج.م)
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* TAB 3: ACCOUNTING & THERMAL RECEIPT PRINTER */}
          {activeTab === 'finance' && (
            <div className="space-y-5">
              
              {/* Financial Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-500">إجمالي المقبوضات للخزينة</span>
                  <div className="text-2xl font-black text-slate-900">{totalRevenue} ج.م</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-500">أرباح أتعاب المكتب الحقيقية</span>
                  <div className="text-2xl font-black text-indigo-700">{totalOfficeFees} ج.م</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-500">صافي الأرباح بعد المصروفات</span>
                  <div className="text-2xl font-black text-emerald-700">{netProfit} ج.م</div>
                </div>
              </div>

              {/* Thermal Printer Settings & Invoices List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Column 1: Thermal Printer Config */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Printer className="w-4 h-4 text-indigo-600" />
                    <span>إعدادات طابعة الفواتير الحرارية POS (58mm / 80mm)</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">عرض ورق الطابعة الحرارية:</label>
                      <select
                        value={thermalConfig.paperWidth}
                        onChange={(e) => setThermalConfig(prev => ({ ...prev, paperWidth: e.target.value as '58mm' | '80mm' }))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      >
                        <option value="80mm">80mm (مقاس الطابعات الحرارية الكبيرة Standard POS)</option>
                        <option value="58mm">58mm (مقاس الطابعات المحمولة الصغيرة Bluetooth POS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">اسم الطابعة المتصلة:</label>
                      <input
                        type="text"
                        value={thermalConfig.printerName}
                        onChange={(e) => setThermalConfig(prev => ({ ...prev, printerName: e.target.value }))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ترويسة الفاتورة الحرارية:</label>
                      <input
                        type="text"
                        value={thermalConfig.headerTextAr}
                        onChange={(e) => setThermalConfig(prev => ({ ...prev, headerTextAr: e.target.value }))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-bold">
                      ✅ وضع الطباعة التلقائية مفعل مع إيصالات التحصيل.
                    </div>
                  </div>
                </div>

                {/* Column 2 & 3: Invoices Ledger Table */}
                <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-black text-sm text-slate-900 flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>دفتر الإيصالات والفواتير المسجلة بالخزينة</span>
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{invoices.length} إيصال</span>
                  </h3>

                  <div className="space-y-2">
                    {invoices.map(inv => (
                      <div key={inv.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded">
                              {inv.invoiceNumber}
                            </span>
                            <span className="font-bold text-xs text-slate-900">{inv.customerName}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{inv.serviceName} | المحصل: {inv.cashierName}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-left font-mono">
                            <div className="text-xs font-black text-emerald-800">{inv.totalAmount} ج.م</div>
                            <div className="text-[10px] text-slate-500">{inv.paymentMethod}</div>
                          </div>

                          <button
                            onClick={() => setPreviewInvoiceForThermal(inv)}
                            className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>معاينة وطباعة حرارية</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: MULTI-BRANCH SUPPORT */}
          {activeTab === 'branches' && (
            <div className="space-y-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="font-black text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                  <span>شبكة إدارة الفروع وتحويل المعاملات بين المقرات</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {branches.map(b => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranch(b)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        selectedBranch.id === b.id ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-600/30' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-slate-900">{b.nameAr}</span>
                        <span className="font-mono text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">
                          {b.code}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <p>📍 العنوان: {b.address}</p>
                        <p>👤 المدير المسئول: {b.managerName}</p>
                        <p>☎️ رقم الهاتف: {b.phone}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">شبابيك العمل: {b.activeCountersCount}</span>
                        <span className="font-black text-indigo-900">{b.requestsCountToday} معاملة اليوم</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: WHATSAPP BUSINESS & SMS GATEWAY API */}
          {activeTab === 'notifications' && (
            <div className="space-y-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="font-black text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Send className="w-5 h-5 text-purple-600" />
                  <span>بوابة WhatsApp Business API وبوابة الرسائل النصية SMS</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  
                  {/* WhatsApp Business Cloud API Integration */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-black text-xs text-emerald-400">WhatsApp Business Cloud API v17.0</span>
                      <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded">CONNECTED 🟢</span>
                    </div>

                    <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-xl text-emerald-300 overflow-x-auto">
                      {JSON.stringify({
                        messaging_product: "whatsapp",
                        to: "201098765432",
                        type: "template",
                        template: {
                          name: "request_status_update",
                          language: { code: "ar" },
                          components: [{ type: "body", parameters: [{ type: "text", text: "OFF-2026-9041" }] }]
                        }
                      }, null, 2)}
                    </pre>
                  </div>

                  {/* SMS Gateway API Config */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-black text-xs text-sky-400">SMS Gateway Endpoint Ready</span>
                      <span className="bg-sky-900/80 text-sky-300 text-[10px] font-mono px-2 py-0.5 rounded">API ACTIVE 🟢</span>
                    </div>

                    <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-xl text-sky-300 overflow-x-auto">
                      {JSON.stringify({
                        endpoint: "https://api.sms-gateway.eg/v1/send",
                        auth_type: "Bearer Token",
                        supported_events: ["OTP_VERIFICATION", "SLA_ALERT", "PAYMENT_CONFIRMATION"]
                      }, null, 2)}
                    </pre>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 6: CITIZEN CUSTOMER PORTAL */}
          {activeTab === 'portal' && (
            <div className="space-y-5">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 max-w-3xl mx-auto">
                <div className="text-center space-y-1">
                  <span className="text-3xl">🏛️</span>
                  <h2 className="font-black text-lg text-slate-900">بوابة استعلام واستلام معاملات المواطن</h2>
                  <p className="text-xs text-slate-500">أدخل رقم المعاملة أو الرقم القومي لمتابعة حالة الطلب والتحميل الفوري</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={portalSearchQuery}
                    onChange={(e) => setPortalSearchQuery(e.target.value)}
                    placeholder="مثال: OFF-2026-9041 أو الرقم القومي..."
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    onClick={() => {
                      const res = requests.find(r => r.requestNumber.toLowerCase() === portalSearchQuery.toLowerCase() || r.nationalId === portalSearchQuery);
                      setPortalResult(res || null);
                      if (!res) alert('لم يتم العثور على معاملة مطابقة في النظام!');
                    }}
                    className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs"
                  >
                    استعلام الآن 🔍
                  </button>
                </div>

                {portalResult && (
                  <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                      <span className="font-black text-sm text-indigo-950">{portalResult.customerName}</span>
                      <span className="font-mono font-black text-xs bg-indigo-900 text-white px-2 py-0.5 rounded">
                        {portalResult.requestNumber}
                      </span>
                    </div>

                    <p className="font-bold text-slate-800">{portalResult.serviceName}</p>
                    <div className="text-slate-600">الجهة: {portalResult.authority}</div>

                    <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between font-bold text-emerald-800">
                      <span>الحالة الحالية: {portalResult.completionStatus}</span>
                      <span>موعد التسليم المتوقع: {portalResult.deliveryDate}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 7: INVENTORY & PRINTERS */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-sm text-slate-900 flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-amber-600" />
                    <span>سجل ومستودع مخزون الطابعات والورق والأدوات</span>
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {inventory.map(item => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="font-black text-xs text-slate-900">{item.itemName}</div>
                      <div className="text-[11px] text-slate-500">التصنيف: {item.categoryAr}</div>
                      <div className="text-sm font-black text-indigo-900">
                        الكمية المتوفرة: {item.currentStock} {item.unit}
                      </div>
                      {item.currentStock <= item.minStockAlert && (
                        <div className="text-[10px] bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded border border-red-300">
                          ⚠️ إعادة طلب فوري
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PRODUCTION DEPLOYMENT & CLOUD */}
          {activeTab === 'deployment' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="font-black text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Server className="w-5 h-5 text-rose-600" />
                  <span>تجهيزات النشر والحاويات Docker + Nginx + SSL</span>
                </h2>

                <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-3 overflow-x-auto">
                  <div className="text-emerald-400 font-bold"># production docker-compose.yml configuration</div>
                  <pre>{`version: '3.8'
services:
  office_platform:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@cloudsql:5432/office_db
      - WHATSAPP_API_KEY=env_wa_sec_key
      - SSL_CERT_PATH=/etc/ssl/certs/office.crt
    restart: always`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SECURITY & AUDIT LOGS */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="font-black text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  <span>سجل الأمان والتدقيق الشامل والأجهزة المتصلة</span>
                </h2>

                <div className="space-y-2">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{log.employeeName}</span>
                        <p className="text-slate-600 mt-0.5">{log.action}: {log.details}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: WEBCAM QR & BARCODE SCANNER */}
      {showQRScannerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-600" />
                <span>قارئ ومقترن كود الباركود للمعاملات</span>
              </h3>
              <button onClick={() => setShowQRScannerModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <div className="relative bg-slate-950 rounded-2xl h-48 flex items-center justify-center overflow-hidden border-2 border-indigo-500">
              <div className="absolute inset-x-0 h-1 bg-emerald-400 animate-pulse top-1/2 shadow-lg" />
              <div className="text-center text-slate-400 text-xs font-mono space-y-1">
                <Camera className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
                <p>وجه الكاميرا أو الباركود نحو الشاشة</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">أو أدخل كود الباركود يدوياً:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={scannedQRCodeInput}
                  onChange={(e) => setScannedQRCodeInput(e.target.value)}
                  placeholder="مثال: OFF-2026-9041"
                  className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                />
                <button
                  onClick={handleScanQRCodeSearch}
                  className="bg-indigo-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  فتح المعاملة 🔓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DOCUMENT CAMERA SCANNER */}
      {showDocScannerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>ماسح المستندات الأوتوماتيكي مع تصفية وتوليد PDF</span>
              </h3>
              <button onClick={() => setShowDocScannerModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-center space-y-3 text-white">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 mx-auto flex items-center justify-center text-2xl">
                📄
              </div>
              <p className="text-xs font-bold text-emerald-300">تم التقاط المستند وإجراء المحاذاة القص والتحسين الذاتي B&W</p>
            </div>

            <button
              onClick={() => {
                alert('تم توليد ملف PDF المفهرس والمستخرج بنجاح وإرفاقه بالطلب!');
                setShowDocScannerModal(false);
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl"
            >
              حفظ وتوليد ملف PDF المعتمد 📑
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: DIGITAL SIGNATURE PAD */}
      {showSignatureModal && selectedRequestForSig && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-600" />
                <span>لوحة التوقيع الإلكتروني للعميل</span>
              </h3>
              <button onClick={() => setShowSignatureModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-bold">
              وقع المواطن/المواطنة: {selectedRequestForSig.customerName}
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 p-1">
              <canvas
                ref={canvasRef}
                width={380}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full bg-white rounded-xl cursor-crosshair touch-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearSignature}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2 rounded-xl"
              >
                مسح التوقيع
              </button>
              <button
                onClick={saveSignature}
                className="flex-1 bg-indigo-800 hover:bg-indigo-900 text-white text-xs font-bold py-2 rounded-xl"
              >
                حفظ وحفظ التوثيق ✍️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: THERMAL RECEIPT PRINT PREVIEW */}
      {previewInvoiceForThermal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl font-mono text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-black text-xs">معاينة الإيصال الحراري ({thermalConfig.paperWidth})</span>
              <button onClick={() => setPreviewInvoiceForThermal(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-center text-xs">
              <p className="font-black">{thermalConfig.headerTextAr}</p>
              <p className="text-[10px]">إيصال تحصيل رسمي رقم: {previewInvoiceForThermal.invoiceNumber}</p>
              <div className="border-t border-dashed border-slate-400 my-2" />
              <div className="text-right text-[11px] space-y-1">
                <p>العميل: {previewInvoiceForThermal.customerName}</p>
                <p>الخدمة: {previewInvoiceForThermal.serviceName}</p>
                <p>إجمالي الرسوم: {previewInvoiceForThermal.totalAmount} ج.م</p>
                <p>التاريخ: {previewInvoiceForThermal.paymentDate}</p>
              </div>
              <div className="border-t border-dashed border-slate-400 my-2" />
              <p className="text-[10px]">{thermalConfig.footerTextAr}</p>
            </div>

            <button
              onClick={() => {
                window.print();
                setPreviewInvoiceForThermal(null);
              }}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>إرسال إمر طباعة للطابعة الحرارية 🖨️</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBSCRIPTION CENTER MODAL */}
      <SubscriptionCenterModal
        isOpen={showSubCenterModal}
        onClose={() => {
          setShowSubCenterModal(false);
          setSubscription(getActiveSubscription(true));
        }}
        isSuperAdmin={currentEmployee.role === 'admin' || currentEmployee.role === 'manager'}
      />

    </div>
  );
};
