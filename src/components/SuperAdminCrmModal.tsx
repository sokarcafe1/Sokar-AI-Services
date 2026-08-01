import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Building2,
  Users,
  CreditCard,
  Key,
  TrendingUp,
  Bell,
  Activity,
  Search,
  Filter,
  Download,
  Printer,
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Eye,
  LogOut,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Copy,
  Clock,
  Slash
} from 'lucide-react';
import {
  OfficeRecord,
  SystemLicenseRecord,
  SystemPaymentRecord,
  SystemAuditLogRecord,
  BroadcastNotificationRecord,
  getAllOffices,
  getAllLicenses,
  getAllPayments,
  getAllAuditLogs,
  getAllBroadcasts,
  updateOfficeSubscription,
  setOfficeSuspension,
  generateNewLicense,
  addPaymentRecord,
  addAuditLog,
  sendBroadcastNotification,
  calcDaysRemaining,
  registerNewOfficeSubscriber
} from '../services/superAdminCrmService';
import { SubscriptionPlanTier } from '../types/subscription';

interface SuperAdminCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string;
  onImpersonateOffice?: (office: OfficeRecord) => void;
}

export const SuperAdminCrmModal: React.FC<SuperAdminCrmModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail,
  onImpersonateOffice
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'subscribers' | 'licensing' | 'payments' | 'reports' | 'notifications' | 'audit'
  >('dashboard');

  // Reload trigger state for reactivity
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  // Data fetching
  const offices = useMemo(() => getAllOffices(), [refreshKey]);
  const licenses = useMemo(() => getAllLicenses(), [refreshKey]);
  const payments = useMemo(() => getAllPayments(), [refreshKey]);
  const auditLogs = useMemo(() => getAllAuditLogs(), [refreshKey]);
  const broadcasts = useMemo(() => getAllBroadcasts(), [refreshKey]);

  // Selected Office for Detailed Drawer View
  const [selectedOffice, setSelectedOffice] = useState<OfficeRecord | null>(null);

  // Search & Filter State for Subscribers
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterGovernorate, setFilterGovernorate] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterExpiration, setFilterExpiration] = useState<string>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected Offices for Bulk Actions
  const [selectedOfficeIds, setSelectedOfficeIds] = useState<string[]>([]);

  // Suspension Modal State
  const [suspensionModalOffice, setSuspensionModalOffice] = useState<OfficeRecord | null>(null);
  const [suspensionReasonInput, setSuspensionReasonInput] = useState('');

  // Subscription Renewal Modal State
  const [renewModalOffice, setRenewModalOffice] = useState<OfficeRecord | null>(null);
  const [renewPlan, setRenewPlan] = useState<SubscriptionPlanTier>('professional');
  const [renewMonths, setRenewMonths] = useState<number>(12);

  // Add New Subscriber Modal State
  const [showAddSubscriberModal, setShowAddSubscriberModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubOwner, setNewSubOwner] = useState('');
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubPhone, setNewSubPhone] = useState('');
  const [newSubGov, setNewSubGov] = useState('القاهرة');
  const [newSubAddress, setNewSubAddress] = useState('');
  const [newSubPlan, setNewSubPlan] = useState<SubscriptionPlanTier>('professional');
  const [newSubDuration, setNewSubDuration] = useState<number>(12);
  const [newSubPrice, setNewSubPrice] = useState<number>(1299);

  const handleCreateSubscriberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim() || !newSubOwner.trim() || !newSubEmail.trim()) {
      alert('يرجى كتابة اسم المكتب، اسم المالك، والبريد الإلكتروني.');
      return;
    }

    const created = registerNewOfficeSubscriber({
      name: newSubName.trim(),
      ownerName: newSubOwner.trim(),
      ownerEmail: newSubEmail.trim(),
      ownerPhone: newSubPhone.trim() || '01000000000',
      governorate: newSubGov,
      address: newSubAddress.trim() || 'العنوان الرئيسي للمكتب',
      plan: newSubPlan,
      durationMonths: newSubDuration,
      priceEgp: newSubPrice,
      performedBy: currentUserEmail
    });

    showToast(`تم إضافة المشترك الجديد (${created.name}) وتوليد كود الترخيص ${created.licenseKey} بنجاح! 🎉`);
    setShowAddSubscriberModal(false);
    setNewSubName('');
    setNewSubOwner('');
    setNewSubEmail('');
    setNewSubPhone('');
    setNewSubAddress('');
    handleRefresh();
  };

  // Broadcast Notification Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastFilter, setBroadcastFilter] = useState('all');
  const [broadcastChannels, setBroadcastChannels] = useState<('whatsapp' | 'sms' | 'email' | 'in_app')[]>([
    'whatsapp',
    'in_app'
  ]);
  const [broadcastSuccessMsg, setBroadcastSuccessMsg] = useState('');

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // KPI Calculations
  const totalOffices = offices.length;
  const activeSubsCount = offices.filter(o => o.status === 'active' || o.status === 'trial').length;
  const expiredSubsCount = offices.filter(o => o.status === 'expired').length;
  const suspendedSubsCount = offices.filter(o => o.status === 'suspended').length;

  // Expiration Tier Counts
  const expiring30d = offices.filter(o => o.remainingDays <= 30 && o.remainingDays > 15).length;
  const expiring15d = offices.filter(o => o.remainingDays <= 15 && o.remainingDays > 7).length;
  const expiring7d = offices.filter(o => o.remainingDays <= 7 && o.remainingDays > 3).length;
  const expiring3d = offices.filter(o => o.remainingDays <= 3 && o.remainingDays > 0).length;
  const expiringToday = offices.filter(o => o.remainingDays === 0).length;

  // Financial Revenue KPIs
  const mrrEgp = useMemo(() => {
    return offices.reduce((sum, o) => {
      if (o.status === 'active') {
        return sum + (o.currentPlan === 'enterprise' ? 2999 : o.currentPlan === 'professional' ? 1299 : 0);
      }
      return sum;
    }, 0);
  }, [offices]);

  const arrEgp = mrrEgp * 12;

  const totalUsersCount = offices.reduce((sum, o) => sum + o.totalCustomers, 0);
  const totalBranchesCount = offices.reduce((sum, o) => sum + o.branchesCount, 0);
  const totalEmployeesCount = offices.reduce((sum, o) => sum + o.employeesCount, 0);

  // Filtered Subscribers Logic
  const filteredOffices = useMemo(() => {
    return offices.filter(o => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.ownerName.toLowerCase().includes(q) ||
        o.ownerEmail.toLowerCase().includes(q) ||
        o.ownerPhone.includes(q) ||
        o.licenseKey.toLowerCase().includes(q) ||
        o.taxNumber.includes(q);

      const matchesPlan = filterPlan === 'all' || o.currentPlan === filterPlan;
      const matchesGov = filterGovernorate === 'all' || o.governorate === filterGovernorate;
      const matchesStatus = filterStatus === 'all' || o.status === filterStatus;

      let matchesExp = true;
      if (filterExpiration === '30d') matchesExp = o.remainingDays <= 30 && o.remainingDays > 0;
      if (filterExpiration === '7d') matchesExp = o.remainingDays <= 7 && o.remainingDays > 0;
      if (filterExpiration === 'expired') matchesExp = o.remainingDays <= 0 || o.status === 'expired';

      return matchesSearch && matchesPlan && matchesGov && matchesStatus && matchesExp;
    });
  }, [offices, searchQuery, filterPlan, filterGovernorate, filterStatus, filterExpiration]);

  // Paginated Offices
  const totalPages = Math.ceil(filteredOffices.length / itemsPerPage) || 1;
  const paginatedOffices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOffices.slice(start, start + itemsPerPage);
  }, [filteredOffices, currentPage, itemsPerPage]);

  // Handle Checkbox Selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOfficeIds(paginatedOffices.map(o => o.id));
    } else {
      setSelectedOfficeIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedOfficeIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkSuspend = () => {
    if (selectedOfficeIds.length === 0) return;
    selectedOfficeIds.forEach(id => {
      setOfficeSuspension(id, true, 'إيقاف جماعي بقرار من مدير عام النظام', currentUserEmail);
    });
    showToast(`تم إيقاف ${selectedOfficeIds.length} مكاتب بنجاح`);
    setSelectedOfficeIds([]);
    handleRefresh();
  };

  const handleBulkRenew = () => {
    if (selectedOfficeIds.length === 0) return;
    selectedOfficeIds.forEach(id => {
      updateOfficeSubscription(id, 'professional', 1, currentUserEmail);
    });
    showToast(`تم التجديد الشامل لمساحة ${selectedOfficeIds.length} مكتب بنجاح`);
    setSelectedOfficeIds([]);
    handleRefresh();
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'اسم المكتب',
      'المالك',
      'الهاتف',
      'البريد',
      'المحافظة',
      'الباقة',
      'الحالة',
      'تاريخ الانتهاء',
      'الأيام المتبقية',
      'مفتاح الترخيص'
    ];
    const rows = filteredOffices.map(o => [
      `"${o.name}"`,
      `"${o.ownerName}"`,
      `"${o.ownerPhone}"`,
      `"${o.ownerEmail}"`,
      `"${o.governorate}"`,
      `"${o.currentPlan}"`,
      `"${o.status}"`,
      `"${o.endDate}"`,
      o.remainingDays,
      `"${o.licenseKey}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `superadmin_subscribers_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('تم تصدير تقرير المشتركين بصيغة CSV بنجاح 📊');
  };

  // Handle Single Office Actions
  const handleExecuteRenewalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewModalOffice) return;

    updateOfficeSubscription(renewModalOffice.id, renewPlan, renewMonths, currentUserEmail);
    showToast(`تم تجديد اشتراك (${renewModalOffice.name}) بنجاح!`);
    setRenewModalOffice(null);
    handleRefresh();
  };

  const handleExecuteSuspensionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspensionModalOffice) return;

    const isSuspended = suspensionModalOffice.status === 'suspended';
    setOfficeSuspension(
      suspensionModalOffice.id,
      !isSuspended,
      suspensionReasonInput || 'تغيير الإدارية من قبل مدير النظام',
      currentUserEmail
    );

    showToast(isSuspended ? `تم إعادة تفعيل (${suspensionModalOffice.name})` : `تم إيقاف (${suspensionModalOffice.name})`);
    setSuspensionModalOffice(null);
    setSuspensionReasonInput('');
    handleRefresh();
  };

  const handleGenerateLicenseKeyClick = (office: OfficeRecord) => {
    const newLic = generateNewLicense(office.id, office.currentPlan, currentUserEmail);
    if (newLic) {
      showToast(`تم توليد مفتاح ترخيص جديد: ${newLic.licenseKey}`);
      handleRefresh();
    }
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;

    sendBroadcastNotification({
      sender: currentUserEmail,
      targetFilter: broadcastFilter,
      channels: broadcastChannels,
      title: broadcastTitle,
      message: broadcastBody
    });

    setBroadcastSuccessMsg('🎉 تم إرسال الإشعار وتوجيه التنبيهات لجميع المكاتب المحددة بنجاح!');
    setBroadcastTitle('');
    setBroadcastBody('');
    setTimeout(() => setBroadcastSuccessMsg(''), 4000);
    handleRefresh();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto dir-rtl font-sans text-slate-100">
      {/* Toast Floating Alert */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-amber-950/90 via-slate-950 to-slate-900 p-4 sm:p-5 border-b border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <ShieldAlert className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  لوحة التحكم العليا وإدارة الاشتراك والعملاء (Super Admin CRM)
                </h2>
                <span className="bg-amber-400/20 text-amber-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  Enterprise OS v4.8
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                متابعة الاشتراكات المباشرة، التراخيص، الإيرادات MRR/ARR، ومراقبة المكاتب المعالجة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleRefresh}
              title="تحديث البيانات"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">تحديث</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-500/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs Bar */}
        <div className="bg-slate-950 border-b border-slate-800/90 px-3 py-2 flex items-center gap-1 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>الإحصائيات الشاملة</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'subscribers'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>المشتركين والمكاتب</span>
            <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 rounded-full font-mono">
              {totalOffices}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('licensing')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'licensing'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>مركز التراخيص</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'payments'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>المدفوعات والفواتير</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>التقارير المالية MRR/ARR</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>الإشعارات والتنبيهات</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2.5 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>سجل الرقابة (Audit)</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Primary KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                
                {/* Total Offices */}
                <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>إجمالي المكاتب</span>
                    <Building2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{totalOffices}</div>
                  <div className="text-[10px] text-slate-400">{activeSubsCount} نشط / {expiredSubsCount} منتهي</div>
                </div>

                {/* Active Subscriptions */}
                <div className="bg-slate-800/90 border border-emerald-500/30 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 text-xs font-bold">
                    <span>الاشتراكات النشطة</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-300">{activeSubsCount}</div>
                  <div className="text-[10px] text-emerald-200/80">تشمل التجريبي والمحترف</div>
                </div>

                {/* Expired Subscriptions */}
                <div className="bg-slate-800/90 border border-red-500/30 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-red-400 text-xs font-bold">
                    <span>الاشتراكات المنتهية</span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-2xl font-black text-red-300">{expiredSubsCount}</div>
                  <div className="text-[10px] text-red-200/80">بحاجة للتجديد والمتابعة</div>
                </div>

                {/* MRR */}
                <div className="bg-slate-800/90 border border-amber-500/30 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-amber-300 text-xs font-bold">
                    <span>الإيراد الشهري (MRR)</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-300">{mrrEgp.toLocaleString()} ج.م</div>
                  <div className="text-[10px] text-amber-200/80">صافي الإيراد الدوري الشغفي</div>
                </div>

                {/* ARR */}
                <div className="bg-slate-800/90 border border-sky-500/30 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-sky-300 text-xs font-bold">
                    <span>الإيراد السنوي (ARR)</span>
                    <TrendingUp className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-sky-300">{arrEgp.toLocaleString()} ج.م</div>
                  <div className="text-[10px] text-sky-200/80">التوقع المالي السنوي المتكرر</div>
                </div>

                {/* Total System Users */}
                <div className="bg-slate-800/90 border border-purple-500/30 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-purple-300 text-xs font-bold">
                    <span>إجمالي العملاء والموظفين</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-purple-300">{totalUsersCount + totalEmployeesCount}</div>
                  <div className="text-[10px] text-purple-200/80">{totalBranchesCount} فرع تشغيلي</div>
                </div>

              </div>

              {/* Expiration Early Warning Bar (30d, 15d, 7d, 3d, Today) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-amber-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>شرائح التنبيه المبكر لانتهاء الاشتراكات:</span>
                  </span>
                  <span className="text-slate-400 text-[11px]">متابعة التجديدات الدورية قبل الانقطاع</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
                    <div className="text-slate-400 text-[10px] mb-1">خلال 30 يوماً</div>
                    <div className="text-lg font-black text-amber-200">{expiring30d}</div>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-amber-500/30">
                    <div className="text-amber-400 text-[10px] mb-1">خلال 15 يوماً</div>
                    <div className="text-lg font-black text-amber-300">{expiring15d}</div>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-orange-500/40">
                    <div className="text-orange-400 text-[10px] mb-1">خلال 7 أيام</div>
                    <div className="text-lg font-black text-orange-300">{expiring7d}</div>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-rose-500/50">
                    <div className="text-rose-400 text-[10px] mb-1">خلال 3 أيام ⚡</div>
                    <div className="text-lg font-black text-rose-300">{expiring3d}</div>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-red-500/60 bg-red-950/20">
                    <div className="text-red-400 text-[10px] font-bold mb-1">تنتهي اليوم (0)</div>
                    <div className="text-lg font-black text-red-300">{expiringToday}</div>
                  </div>
                </div>
              </div>

              {/* Recent Offices & Recent Payments Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Recent Registered Offices */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>أحدث المكاتب المسجلة بالمنظومة</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('subscribers')}
                      className="text-amber-400 hover:underline text-[11px]"
                    >
                      عرض الكل
                    </button>
                  </div>

                  <div className="space-y-2">
                    {offices.slice(0, 4).map(off => (
                      <div
                        key={off.id}
                        onClick={() => setSelectedOffice(off)}
                        className="bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{off.logoEmoji}</span>
                          <div>
                            <div className="font-bold text-slate-100">{off.name}</div>
                            <div className="text-[10px] text-slate-400">{off.ownerName} • {off.governorate}</div>
                          </div>
                        </div>

                        <div className="text-left space-y-0.5">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            off.currentPlan === 'enterprise'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : off.currentPlan === 'professional'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            {off.currentPlan.toUpperCase()}
                          </span>
                          <div className="text-[10px] text-slate-400 font-mono">متبقي {off.remainingDays} يوم</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Payments Ledger */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span>آخر عمليات الدفع والتحصيل</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('payments')}
                      className="text-emerald-400 hover:underline text-[11px]"
                    >
                      إدارة المدفوعات
                    </button>
                  </div>

                  <div className="space-y-2">
                    {payments.slice(0, 4).map(pay => (
                      <div
                        key={pay.id}
                        className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-200">{pay.officeName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {pay.invoiceNumber} • {pay.paymentMethod.toUpperCase()}
                          </div>
                        </div>

                        <div className="text-left space-y-0.5">
                          <div className="font-extrabold text-emerald-400">{pay.totalEgp.toLocaleString()} ج.م</div>
                          <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[9px] px-1.5 py-0.5 rounded">
                            {pay.status === 'approved' ? 'مقبولة' : pay.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SUBSCRIBERS TABLE & MANAGEMENT */}
          {activeTab === 'subscribers' && (
            <div className="space-y-4">
              
              {/* Search & Filter Toolbar */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  
                  {/* Search Bar */}
                  <div className="relative md:col-span-2">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="بحث باسم المكتب، المالك، الهاتف، البريد، أو مفتاح الترخيص..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  {/* Plan Filter */}
                  <div>
                    <select
                      value={filterPlan}
                      onChange={(e) => {
                        setFilterPlan(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value="all">كل الباقات</option>
                      <option value="enterprise">Enterprise (المؤسسات)</option>
                      <option value="professional">Professional (المحترف)</option>
                      <option value="trial">Free Trial (تجريبي)</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value="all">كل الحالات التشغيلية</option>
                      <option value="active">نشط (Active)</option>
                      <option value="trial">فترة تجريبية</option>
                      <option value="expired">منتهي (Expired)</option>
                      <option value="suspended">موقوف (Suspended)</option>
                    </select>
                  </div>

                </div>

                {/* Bulk Actions & Export Buttons Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold text-[11px]">
                      محدد: ({selectedOfficeIds.length})
                    </span>

                    <button
                      type="button"
                      disabled={selectedOfficeIds.length === 0}
                      onClick={handleBulkRenew}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition-all flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>تجديد المحددة (+شهر)</span>
                    </button>

                    <button
                      type="button"
                      disabled={selectedOfficeIds.length === 0}
                      onClick={handleBulkSuspend}
                      className="bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition-all flex items-center gap-1"
                    >
                      <Slash className="w-3.5 h-3.5" />
                      <span>إيقاف المحددة</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSubscriberModal(true)}
                      className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 px-3.5 py-1.5 rounded-lg text-[11px] font-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-950/40"
                    >
                      <Plus className="w-4 h-4 text-slate-950" />
                      <span>+ إضافة مشترك جديد</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>تصدير تقرير Excel/CSV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Subscribers Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto shadow-lg">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3 w-8 text-center">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            paginatedOffices.length > 0 &&
                            paginatedOffices.every(o => selectedOfficeIds.includes(o.id))
                          }
                          className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-0"
                        />
                      </th>
                      <th className="p-3">اسم المكتب / المركز</th>
                      <th className="p-3">اسم المالك والتواصل</th>
                      <th className="p-3">المحافظة</th>
                      <th className="p-3 text-center">الفروع/الموظفين</th>
                      <th className="p-3">الباقة الحالية</th>
                      <th className="p-3">تاريخ الانتهاء</th>
                      <th className="p-3 text-center">الأيام المتبقية</th>
                      <th className="p-3 text-center">حالة الحساب</th>
                      <th className="p-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {paginatedOffices.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="p-8 text-center text-slate-500 font-bold">
                          لا توجد مكاتب مطابقة لمعايير البحث الحالية.
                        </td>
                      </tr>
                    ) : (
                      paginatedOffices.map((off) => {
                        const isSelected = selectedOfficeIds.includes(off.id);
                        return (
                          <tr
                            key={off.id}
                            className={`hover:bg-slate-900/80 transition-all ${
                              isSelected ? 'bg-amber-950/20' : ''
                            }`}
                          >
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectOne(off.id)}
                                className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-0"
                              />
                            </td>

                            <td className="p-3">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl">{off.logoEmoji}</span>
                                <div>
                                  <button
                                    onClick={() => setSelectedOffice(off)}
                                    className="font-bold text-slate-100 hover:text-amber-300 text-right transition-colors"
                                  >
                                    {off.name}
                                  </button>
                                  <div className="text-[10px] text-slate-500 font-mono">
                                    سجل: {off.commercialRecord}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="font-semibold text-slate-200">{off.ownerName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{off.ownerPhone}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{off.ownerEmail}</div>
                            </td>

                            <td className="p-3 font-semibold text-slate-300">{off.governorate}</td>

                            <td className="p-3 text-center">
                              <span className="bg-slate-800 text-slate-200 font-bold px-2 py-0.5 rounded-md text-[11px]">
                                {off.branchesCount} فروع / {off.employeesCount} موظف
                              </span>
                            </td>

                            <td className="p-3">
                              <span
                                className={`px-2.5 py-1 rounded-lg font-black text-[10px] border ${
                                  off.currentPlan === 'enterprise'
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                    : off.currentPlan === 'professional'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                {off.currentPlan.toUpperCase()}
                              </span>
                            </td>

                            <td className="p-3 font-mono text-slate-300">{off.endDate}</td>

                            <td className="p-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full font-black text-[11px] ${
                                  off.remainingDays > 15
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : off.remainingDays > 3
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-red-500/20 text-red-300'
                                }`}
                              >
                                {off.remainingDays} يوم
                              </span>
                            </td>

                            <td className="p-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                  off.status === 'active'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : off.status === 'trial'
                                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                    : off.status === 'suspended'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}
                              >
                                {off.status === 'active'
                                  ? 'نشط'
                                  : off.status === 'trial'
                                  ? 'تجريبي'
                                  : off.status === 'suspended'
                                  ? 'موقوف'
                                  : 'منتهي'}
                              </span>
                            </td>

                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedOffice(off)}
                                  title="عرض التفاصيل الكلية"
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    setRenewModalOffice(off);
                                    setRenewPlan(off.currentPlan);
                                  }}
                                  title="تجديد الاشتراك"
                                  className="p-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 rounded-lg transition-all"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setSuspensionModalOffice(off)}
                                  title={off.status === 'suspended' ? 'إعادة التفعيل' : 'تجميد / إيقاف'}
                                  className="p-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-lg transition-all"
                                >
                                  <Slash className="w-3.5 h-3.5" />
                                </button>

                                {onImpersonateOffice && (
                                  <button
                                    onClick={() => onImpersonateOffice(off)}
                                    title="الدخول باسم المكتب (Impersonation)"
                                    className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-black transition-all"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>
                  عرض {paginatedOffices.length} من أصل {filteredOffices.length} مكتب
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-1.5 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg border border-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-slate-200">
                    صفحة {currentPage} من {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-1.5 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg border border-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: LICENSING CENTER */}
          {activeTab === 'licensing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>مركز توليد وتوثيق مفاتيح التراخيص (System Licensing)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    إدارة مفاتيح التشغيل الرقمية والأجهزة المسموحة لكل مكتب
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3">مفتاح الترخيص (License Key)</th>
                      <th className="p-3">اسم المكتب</th>
                      <th className="p-3">الباقة</th>
                      <th className="p-3">التفعيل والأجهزة</th>
                      <th className="p-3">تاريخ الانتهاء</th>
                      <th className="p-3 text-center">الحالة</th>
                      <th className="p-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {licenses.map(lic => (
                      <tr key={lic.id} className="hover:bg-slate-900/80">
                        <td className="p-3 font-mono font-bold text-amber-300 select-all">
                          {lic.licenseKey}
                        </td>
                        <td className="p-3 font-semibold text-slate-200">{lic.officeName}</td>
                        <td className="p-3">
                          <span className="bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
                            {lic.plan.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">
                          <div>{lic.activationsCount} / {lic.maxActivations} أجهزة مفعلة</div>
                          <div className="text-[10px] text-slate-500">{lic.boundDevices.join(', ')}</div>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{lic.expiresAt}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            lic.status === 'valid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {lic.status === 'valid' ? 'صالح' : lic.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(lic.licenseKey);
                              showToast('تم نسخ مفتاح الترخيص للحافظة 📋');
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <Copy className="w-3.5 h-3.5 text-amber-400" />
                            <span>نسخ</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENT CENTER */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>مركز التحصيل المالي وإصدار الفواتير الضريبية</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    متابعة عمليات التحصيل عبر InstaPay، فودافون كاش، وفوري
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3">رقم الفاتورة</th>
                      <th className="p-3">اسم المكتب</th>
                      <th className="p-3">الباقة</th>
                      <th className="p-3">المبلغ الصافي</th>
                      <th className="p-3">الضريبة (14%)</th>
                      <th className="p-3">الإجمالي (ج.م)</th>
                      <th className="p-3">طريقة الدفع</th>
                      <th className="p-3 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {payments.map(pay => (
                      <tr key={pay.id} className="hover:bg-slate-900/80">
                        <td className="p-3 font-mono font-bold text-slate-200">{pay.invoiceNumber}</td>
                        <td className="p-3 font-semibold text-slate-200">{pay.officeName}</td>
                        <td className="p-3">
                          <span className="bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
                            {pay.plan.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{pay.amountEgp.toLocaleString()} ج.م</td>
                        <td className="p-3 font-mono text-slate-400">{pay.taxEgp.toFixed(2)} ج.م</td>
                        <td className="p-3 font-mono font-extrabold text-emerald-300">
                          {pay.totalEgp.toLocaleString()} ج.م
                        </td>
                        <td className="p-3 font-mono text-slate-300 uppercase">{pay.paymentMethod}</td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                            مقبولة ⚡
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REPORTS & ANALYTICS */}
          {activeTab === 'reports' && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>التقارير التحليلية والمالية الشاملة (MRR & ARR Analytics)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  مؤشرات الأداء المالي، معدلات تجديد الاشتراكات (Renewal Rate) ونسب النمو
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
                  <div className="text-xs text-slate-400 font-bold">الإيراد الشهري المكرر (MRR)</div>
                  <div className="text-3xl font-black text-emerald-400">{mrrEgp.toLocaleString()} ج.م</div>
                  <div className="text-[11px] text-emerald-300">▲ +18.4% مقارنة بالشهر السابق</div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
                  <div className="text-xs text-slate-400 font-bold">معدل التجديد والاحتفاظ (Retention Rate)</div>
                  <div className="text-3xl font-black text-sky-400">94.2%</div>
                  <div className="text-[11px] text-sky-300">ثبات عالي في اشتراكات باقة المحترف</div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
                  <div className="text-xs text-slate-400 font-bold">معدل الانفصال (Churn Rate)</div>
                  <div className="text-3xl font-black text-amber-400">2.1%</div>
                  <div className="text-[11px] text-amber-300">أدنى من النسبة المستهدفة بالمنظومة</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS CENTER */}
          {activeTab === 'notifications' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Broadcast Form */}
              <form onSubmit={handleBroadcastSubmit} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>إرسال إشعار جماعي للمشتركين</span>
                </h3>

                {broadcastSuccessMsg && (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded-xl text-xs text-emerald-300 font-bold">
                    {broadcastSuccessMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الفئة المستهدفة:</label>
                  <select
                    value={broadcastFilter}
                    onChange={(e) => setBroadcastFilter(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-slate-200"
                  >
                    <option value="all">جميع المشتركين والمكاتب</option>
                    <option value="enterprise">أصحاب باقة المؤسسات (Enterprise)</option>
                    <option value="professional">أصحاب باقة المحترف (Professional)</option>
                    <option value="expiring_3d">الاشتراكات المنتهية خلال 3 أيام</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">عنوان التنبيه والإشعار:</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="مثال: تنبيه بخصوص تحديث المنظومة وتجديد الاشتراك..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نص الرسالة والإشعار:</label>
                  <textarea
                    required
                    rows={4}
                    value={broadcastBody}
                    onChange={(e) => setBroadcastBody(e.target.value)}
                    placeholder="اكتب نص التنبيه الموجه لأصحاب المكاتب والمراكز هنا..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md shadow-amber-950/40 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال وتوجيه الإشعار للجميع</span>
                </button>
              </form>

              {/* Broadcast History */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-black text-slate-200 border-b border-slate-800 pb-2">
                  سجل الإشعارات المرسلة سابقاً
                </h3>

                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {broadcasts.length === 0 ? (
                    <div className="text-xs text-slate-500 text-center py-8">لا توجد إشعارات مرسلة سابقاً</div>
                  ) : (
                    broadcasts.map(b => (
                      <div key={b.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-amber-300">
                          <span>{b.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(b.timestamp).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{b.message}</p>
                        <div className="text-[10px] text-slate-500">
                          الفئة: {b.targetFilter} • استلمها {b.sentCount} مكتب
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>سجل الرقابة والعمليات الأمنية (Super Admin Audit Logs)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    توثيق كامل لكافة إجراءات مدير النظام (تعديل الباقات، التراخيص، الدخول باسم المكتب)
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3">الوقت والتاريخ</th>
                      <th className="p-3">منفذ الإجراء</th>
                      <th className="p-3">نوع الإجراء</th>
                      <th className="p-3">المستهدف</th>
                      <th className="p-3">تفاصيل الإجراء</th>
                      <th className="p-3 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {auditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 font-bold">
                          لا توجد سجلات رقابة مسجلة حالياً.
                        </td>
                      </tr>
                    ) : (
                      auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-900/80">
                          <td className="p-3 font-mono text-[11px] text-slate-400">
                            {new Date(log.timestamp).toLocaleString('ar-EG')}
                          </td>
                          <td className="p-3 font-bold text-amber-300">{log.performedBy}</td>
                          <td className="p-3 font-mono text-slate-200">{log.action}</td>
                          <td className="p-3 font-semibold text-slate-300">{log.targetOfficeOrEmail}</td>
                          <td className="p-3 text-slate-300 text-[11px]">{log.details}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* OFFICE DETAILED FULL DRAWER MODAL */}
      {selectedOffice && (
        <div className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto dir-rtl font-sans">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 space-y-6 text-slate-100 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedOffice.logoEmoji}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">{selectedOffice.name}</h3>
                  <p className="text-xs text-slate-400">
                    كود التعريف: {selectedOffice.id} • المحافظة: {selectedOffice.governorate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOffice(null)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Office Info Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Box 1: Owner & Contacts */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>بيانات مالك المكتب والتواصل</span>
                </div>
                <div><strong className="text-slate-400">الاسم بالكامل:</strong> {selectedOffice.ownerName}</div>
                <div><strong className="text-slate-400">الهاتف:</strong> {selectedOffice.ownerPhone}</div>
                <div><strong className="text-slate-400">البريد الإلكتروني:</strong> {selectedOffice.ownerEmail}</div>
                <div><strong className="text-slate-400">العنوان التفصيلي:</strong> {selectedOffice.address}</div>
              </div>

              {/* Box 2: Subscription & Licensing */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span>تفاصيل الاشتراك والترخيص</span>
                </div>
                <div><strong className="text-slate-400">الباقة الحالية:</strong> <span className="text-amber-300 font-bold uppercase">{selectedOffice.currentPlan}</span></div>
                <div><strong className="text-slate-400">تاريخ الانتهاء:</strong> {selectedOffice.endDate} ({selectedOffice.remainingDays} يوم متبقي)</div>
                <div><strong className="text-slate-400">مفتاح الترخيص:</strong> <span className="font-mono text-emerald-300">{selectedOffice.licenseKey}</span></div>
                <div><strong className="text-slate-400">التجديد التلقائي:</strong> {selectedOffice.autoRenew ? 'مفعل ⚡' : 'غير مفعل'}</div>
              </div>

            </div>

            {/* Action Bar inside Drawer */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300">الإجراءات المباشرة لمدير النظام:</div>
              <div className="flex flex-wrap gap-2 text-xs">
                
                <button
                  onClick={() => {
                    setRenewModalOffice(selectedOffice);
                    setRenewPlan(selectedOffice.currentPlan);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>تجديد / تمديد الاشتراك</span>
                </button>

                <button
                  onClick={() => handleGenerateLicenseKeyClick(selectedOffice)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>توليد مفتاح ترخيص جديد</span>
                </button>

                {onImpersonateOffice && (
                  <button
                    onClick={() => {
                      onImpersonateOffice(selectedOffice);
                      setSelectedOffice(null);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-950/40"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>الدخول باسم هذا المكتب (Impersonate)</span>
                  </button>
                )}

                <button
                  onClick={() => setSuspensionModalOffice(selectedOffice)}
                  className="bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/50 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Slash className="w-4 h-4 text-rose-400" />
                  <span>{selectedOffice.status === 'suspended' ? 'إعادة التفعيل' : 'إيقاف / تجميد'}</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* RENEWAL MODAL */}
      {renewModalOffice && (
        <div className="fixed inset-0 z-[350] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 dir-rtl font-sans">
          <form
            onSubmit={handleExecuteRenewalSubmit}
            className="bg-slate-900 border border-slate-700 p-6 rounded-3xl w-full max-w-md space-y-4 text-slate-100 shadow-2xl"
          >
            <h3 className="text-base font-black text-amber-300 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-amber-400" />
              <span>تجديد اشتراك: {renewModalOffice.name}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">اختر الباقة:</label>
              <select
                value={renewPlan}
                onChange={(e) => setRenewPlan(e.target.value as SubscriptionPlanTier)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="professional">Professional (1299 ج.م)</option>
                <option value="enterprise">Enterprise (2999 ج.م)</option>
                <option value="trial">Free Trial (مجاني)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">مدة التجديد (بالأشهر):</label>
              <select
                value={renewMonths}
                onChange={(e) => setRenewMonths(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              >
                <option value={1}>شهر واحد (1 Month)</option>
                <option value={3}>3 أشهر (Quarterly)</option>
                <option value={6}>6 أشهر (Semi-annual)</option>
                <option value={12}>سنة كاملة (12 Months)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                تأكيد التجديد الآن
              </button>
              <button
                type="button"
                onClick={() => setRenewModalOffice(null)}
                className="px-4 bg-slate-800 text-slate-400 hover:text-white py-2.5 rounded-xl text-xs"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUSPENSION MODAL */}
      {suspensionModalOffice && (
        <div className="fixed inset-0 z-[350] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 dir-rtl font-sans">
          <form
            onSubmit={handleExecuteSuspensionSubmit}
            className="bg-slate-900 border border-slate-700 p-6 rounded-3xl w-full max-w-md space-y-4 text-slate-100 shadow-2xl"
          >
            <h3 className="text-base font-black text-rose-300 flex items-center gap-2">
              <Slash className="w-5 h-5 text-rose-400" />
              <span>
                {suspensionModalOffice.status === 'suspended' ? 'إعادة تفعيل المكتب' : 'تجميد وإيقاف المكتب'}
              </span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              المكتب: <strong>{suspensionModalOffice.name}</strong>
            </p>

            {suspensionModalOffice.status !== 'suspended' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">سبب الإيقاف أو التجميد:</label>
                <textarea
                  required
                  rows={3}
                  value={suspensionReasonInput}
                  onChange={(e) => setSuspensionReasonInput(e.target.value)}
                  placeholder="مثال: انتهاء الترخيص، عدم سداد المستحقات المالية، مخالفة للشروط..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                تأكيد القرار
              </button>
              <button
                type="button"
                onClick={() => setSuspensionModalOffice(null)}
                className="px-4 bg-slate-800 text-slate-400 hover:text-white py-2.5 rounded-xl text-xs"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD NEW SUBSCRIBER MODAL */}
      {showAddSubscriberModal && (
        <div className="fixed inset-0 z-[350] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 dir-rtl font-sans overflow-y-auto">
          <form
            onSubmit={handleCreateSubscriberSubmit}
            className="bg-slate-900 border border-amber-500/40 p-6 rounded-3xl w-full max-w-lg space-y-4 text-slate-100 shadow-2xl animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">إضافة وتسجيل مشترك جديد في المنظومة</h3>
                  <p className="text-[11px] text-slate-400">إدخال بيانات مكتب الخدمة وتوليد الترخيص الفوري والتفعيل السحابي</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSubscriberModal(false)}
                className="text-slate-400 hover:text-white p-1.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">اسم المكتب / المركز الحكومي *</label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="مثال: مكتب النور للخدمات الحكومية وسداد الفواتير"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم المالك / المسؤول *</label>
                <input
                  type="text"
                  required
                  value={newSubOwner}
                  onChange={(e) => setNewSubOwner(e.target.value)}
                  placeholder="مثال: أ. محمد أحمد محمود"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني (حساب الدخول) *</label>
                <input
                  type="email"
                  required
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                  placeholder="office@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">رقم الهاتف / الواتساب</label>
                <input
                  type="text"
                  value={newSubPhone}
                  onChange={(e) => setNewSubPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">المحافظة</label>
                <select
                  value={newSubGov}
                  onChange={(e) => setNewSubGov(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500 font-bold"
                >
                  <option value="القاهرة">القاهرة</option>
                  <option value="الجيزة">الجيزة</option>
                  <option value="الإسكندرية">الإسكندرية</option>
                  <option value="الدقهلية">الدقهلية</option>
                  <option value="الشرقية">الشرقية</option>
                  <option value="المنوفية">المنوفية</option>
                  <option value="القليوبية">القليوبية</option>
                  <option value="الغربية">الغربية</option>
                  <option value="أسيوط">أسيوط</option>
                  <option value="سوهاج">سوهاج</option>
                  <option value="البحيرة">البحيرة</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">العنوان بالتفصيل</label>
                <input
                  type="text"
                  value={newSubAddress}
                  onChange={(e) => setNewSubAddress(e.target.value)}
                  placeholder="شارع الجمهورية - بجوار السجل المدني"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">باقة الاشتراك</label>
                <select
                  value={newSubPlan}
                  onChange={(e) => {
                    const p = e.target.value as SubscriptionPlanTier;
                    setNewSubPlan(p);
                    setNewSubPrice(p === 'enterprise' ? 2999 : p === 'professional' ? 1299 : 0);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500 font-bold"
                >
                  <option value="professional">Professional (1299 ج.م - 5 أجهزة)</option>
                  <option value="enterprise">Enterprise (2999 ج.م - 10 أجهزة + أجهزة متعددة)</option>
                  <option value="trial">Free Trial (مجاني تجريبي - 14 يوم)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مدة الاشتراك (أشهر)</label>
                <select
                  value={newSubDuration}
                  onChange={(e) => setNewSubDuration(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500 font-bold"
                >
                  <option value={1}>1 شهر</option>
                  <option value={3}>3 أشهر</option>
                  <option value={6}>6 أشهر</option>
                  <option value={12}>12 شهر (سنة كاملة)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold">قيمة الاشتراك المحصلة:</span>
                <span className="text-amber-300 font-black text-sm">{newSubPrice.toLocaleString()} ج.م</span>
              </div>
              <p className="text-[10px] text-slate-400">
                سيتم إصدار كود الترخيص السحابي وتوثيق العملية في سجل المدفوعات والـ Audit Log تلقائياً.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-lg transition-all"
              >
                تأكيد وتسجيل المشترك الجديد (+Add Office)
              </button>
              <button
                type="button"
                onClick={() => setShowAddSubscriberModal(false)}
                className="px-4 bg-slate-800 text-slate-400 hover:text-white py-2.5 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
