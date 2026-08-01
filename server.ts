import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Known Official Egyptian Government Domains Whitelist
const OFFICIAL_GOVT_DOMAINS = [
  'gov.eg',
  'edu.eg',
  'digital.gov.eg',
  'moe.gov.eg',
  'emis.gov.eg',
  'parent.emis.gov.eg',
  'g12.emis.gov.eg',
  'tansik.digital.gov.eg',
  'scu.eg',
  'azhar.eg',
  'moi.gov.eg',
  'traffic.moi.gov.eg',
  'cso.moi.gov.eg',
  'jp.gov.eg',
  'tamwin.com.eg',
  'mohp.gov.eg',
  'moss.gov.eg',
  'eta.gov.eg',
  'gafi.gov.eg',
  'shmff.gov.eg',
  'ppo.gov.eg',
  'pmo.gov.eg',
  'nosi.gov.eg',
  'tagned.mod.gov.eg',
  'jobs.caoa.gov.eg',
  'cabinet.gov.eg'
];

interface LiveLinkCheckResult {
  url: string;
  httpStatus: number;
  sslValid: boolean;
  responseTimeMs: number;
  health: 'working' | 'needs_review' | 'broken';
  redirectDetected: boolean;
  redirectChain?: string[];
  lastModifiedHeader: string | null;
  etagHeader: string | null;
  rawHeaders: Record<string, string>;
  checkedAt: string;
  isOfficialDomain: boolean;
  verificationSource: string;
  errorMessage?: string;
}

// SSRF Protection Helper: Ensure target URL host is valid public target
function isSafePublicTarget(targetUrl: string): boolean {
  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }
    const host = parsed.hostname.toLowerCase();
    
    // Block localhost & loopback
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1') {
      return false;
    }
    
    // Block AWS / GCP / Cloud Metadata IP
    if (host === '169.254.169.254' || host.startsWith('169.254.')) {
      return false;
    }

    // Block private IP ranges (10.x.x.x, 172.16.x.x-172.31.x.x, 192.168.x.x)
    if (
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host))
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Function to perform real HTTP verification against official government server
async function performLiveHttpVerification(targetUrl: string): Promise<LiveLinkCheckResult> {
  const startTime = Date.now();
  const checkedAt = new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString('ar-EG');
  
  if (!targetUrl || targetUrl === '#' || !targetUrl.startsWith('http') || !isSafePublicTarget(targetUrl)) {
    return {
      url: targetUrl || '',
      httpStatus: 400,
      sslValid: false,
      responseTimeMs: 0,
      health: 'broken',
      redirectDetected: false,
      lastModifiedHeader: null,
      etagHeader: null,
      rawHeaders: {},
      checkedAt,
      isOfficialDomain: false,
      verificationSource: 'رابط غير صالح أو محظور (SSRF Protection)',
      errorMessage: 'عنوان URL غير متاح أو محظور لأسباب أمنية'
    };
  }

  let isOfficialDomain = false;
  try {
    const parsedUrl = new URL(targetUrl);
    isOfficialDomain = OFFICIAL_GOVT_DOMAINS.some(domain => parsedUrl.hostname.endsWith(domain));
  } catch (e) {
    isOfficialDomain = false;
  }

  const sslValid = targetUrl.startsWith('https://');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    // Perform actual real HTTP fetch request
    const response = await fetch(targetUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'EgyptGovernmentPortalLinkVerifier/1.0 (+https://digital.gov.eg)'
      },
      signal: controller.signal
    }).catch(async () => {
      // Fallback to GET if HEAD method is blocked by government firewall
      return await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'EgyptGovernmentPortalLinkVerifier/1.0 (+https://digital.gov.eg)'
        },
        signal: controller.signal
      });
    });

    clearTimeout(timeoutId);

    const responseTimeMs = Date.now() - startTime;
    const httpStatus = response.status;
    const redirectDetected = response.redirected || (httpStatus >= 300 && httpStatus < 400);

    let health: 'working' | 'needs_review' | 'broken' = 'working';
    if (httpStatus >= 200 && httpStatus < 300) {
      health = 'working';
    } else if (httpStatus === 301 || httpStatus === 302 || httpStatus === 403) {
      health = 'needs_review';
    } else {
      health = 'broken';
    }

    const rawHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      rawHeaders[key] = val;
    });

    const lastModifiedHeader = response.headers.get('last-modified');
    const etagHeader = response.headers.get('etag');

    const redirectChain = [];
    if (redirectDetected) {
      redirectChain.push(targetUrl);
      if (response.url && response.url !== targetUrl) {
        redirectChain.push(response.url);
      }
    }

    let verificationSource = 'بوابة مصر الرقمية (digital.gov.eg)';
    if (targetUrl.includes('moe.gov.eg') || targetUrl.includes('emis.gov.eg')) {
      verificationSource = 'خادم وزارة التربية والتعليم والتعليم الفني (moe.gov.eg)';
    } else if (targetUrl.includes('shmff.gov.eg')) {
      verificationSource = 'خادم صندوق الإسكان الاجتماعي ودعم التمويل العقاري';
    } else if (targetUrl.includes('jobs.caoa.gov.eg')) {
      verificationSource = 'خادم الجهاز المركزي للتنظيم والإدارة - بوابة الوظائف';
    } else if (targetUrl.includes('tansik.digital.gov.eg')) {
      verificationSource = 'خادم بوابة التنسيق الإلكتروني - وزارة التعليم العالي';
    } else if (targetUrl.includes('mod.gov.eg')) {
      verificationSource = 'خادم البوابة الإلكترونية لوزارة الدفاع المصرية';
    } else if (targetUrl.includes('moi.gov.eg')) {
      verificationSource = 'خادم البوابة الرسمية لوزارة الداخلية';
    }

    return {
      url: targetUrl,
      httpStatus,
      sslValid,
      responseTimeMs,
      health,
      redirectDetected,
      redirectChain,
      lastModifiedHeader,
      etagHeader,
      rawHeaders,
      checkedAt,
      isOfficialDomain,
      verificationSource
    };

  } catch (err: any) {
    const responseTimeMs = Date.now() - startTime;
    return {
      url: targetUrl,
      httpStatus: err.name === 'AbortError' ? 504 : 503,
      sslValid,
      responseTimeMs,
      health: 'broken',
      redirectDetected: false,
      lastModifiedHeader: null,
      etagHeader: null,
      rawHeaders: {},
      checkedAt,
      isOfficialDomain,
      verificationSource: 'فشل الاتصال بالخادم الحكومي',
      errorMessage: err.message || (err.name === 'AbortError' ? 'تجاوز مهلة الاستجابة 8 ثواني' : 'فشل الربط بالخادم / DNS Error')
    };
  }
}

// API Route 1: Single Real Link Verification
app.get("/api/verify-link", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing required 'url' parameter" });
  }

  const result = await performLiveHttpVerification(targetUrl);
  return res.json(result);
});

// Authentication & Security APIs
app.post("/api/auth/system-config", (req, res) => {
  const superAdminEmail = process.env.SUPERADMIN_EMAIL || "admin@egypt.gov.eg";
  res.json({
    authRequired: true,
    supportedRoles: ['super_admin', 'office_owner', 'branch_manager', 'employee', 'cashier', 'customer'],
    superAdminEmail,
    rateLimitMaxAttempts: 5,
    lockoutDurationMinutes: 15,
    serverTime: new Date().toISOString()
  });
});

// Server-Side Subscription State & Protection Engine
interface ServerSubscription {
  tenantId: string;
  officeName: string;
  licenseKey: string;
  plan: 'trial' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'suspended';
  expiresAt: string;
  maxUsers: number;
  maxBranches: number;
}

let mockServerSubscription: ServerSubscription = {
  tenantId: 'tenant-cairo-01',
  officeName: 'مكتب مصر الرقمية - الفرع الرئيسي',
  licenseKey: 'EG-SOKAR-PRO-8891-2026',
  plan: 'professional',
  status: 'active',
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  maxUsers: 15,
  maxBranches: 5
};

// Feature Permission Matrix Server Helper
const SERVER_FEATURE_MATRIX: Record<string, Record<string, boolean>> = {
  trial: {
    'reports.daily': false,
    'reports.monthly': false,
    'reports.financial': false,
    'reports.export_pdf': false,
    'reports.export_excel': false,
    'analytics.dashboard': false,
    'analytics.kpi': false,
  },
  professional: {
    'reports.daily': true,
    'reports.monthly': true,
    'reports.financial': true,
    'reports.export_pdf': true,
    'reports.export_excel': true,
    'analytics.dashboard': true,
    'analytics.kpi': true,
  },
  enterprise: {
    'reports.daily': true,
    'reports.monthly': true,
    'reports.financial': true,
    'reports.export_pdf': true,
    'reports.export_excel': true,
    'analytics.dashboard': true,
    'analytics.kpi': true,
  }
};

function isServerSubscriptionValid(sub: ServerSubscription): boolean {
  if (sub.status !== 'active' && sub.status !== 'trial') return false;
  const expTime = new Date(sub.expiresAt).getTime();
  if (expTime < Date.now()) return false;
  return true;
}

// API Route: Check Subscription Status
app.get("/api/subscription/status", (req, res) => {
  const isValid = isServerSubscriptionValid(mockServerSubscription);
  const expTime = new Date(mockServerSubscription.expiresAt).getTime();
  const daysRemaining = Math.max(0, Math.ceil((expTime - Date.now()) / (1000 * 60 * 60 * 24)));

  res.json({
    subscription: mockServerSubscription,
    isValid,
    daysRemaining,
    permissions: SERVER_FEATURE_MATRIX[isValid ? mockServerSubscription.plan : 'trial']
  });
});

// Protected API Route: Reports Server Endpoint
app.post("/api/reports/query", (req, res) => {
  const { featureKey, licenseKey } = req.body;
  const isValid = isServerSubscriptionValid(mockServerSubscription);

  if (!isValid) {
    return res.status(403).json({
      error: "Subscription Expired or Invalid",
      locked: true,
      messageAr: "🔒 هذه الميزة غير متاحة نظراً لانتهاء أو عدم صلاحية اشتراك المكتب.",
      requiredPlan: "professional"
    });
  }

  const allowed = SERVER_FEATURE_MATRIX[mockServerSubscription.plan]?.[featureKey];
  if (!allowed) {
    return res.status(403).json({
      error: "Feature Locked in Current Plan",
      locked: true,
      messageAr: "🔒 هذه الميزة متاحة فقط للمشتركين في الباقات الأعلى.",
      requiredPlan: "enterprise"
    });
  }

  // Return protected report data
  return res.json({
    status: "success",
    timestamp: new Date().toISOString(),
    reportData: {
      totalTransactions: 142,
      totalRevenueEgp: 35500,
      governmentFeesEgp: 21300,
      officeCommissionEgp: 14200,
      activeEmployees: 3,
      customerSatisfactionRate: "98.5%"
    }
  });
});

// Protected API Route: Analytics Server Endpoint
app.post("/api/analytics/query", (req, res) => {
  const isValid = isServerSubscriptionValid(mockServerSubscription);

  if (!isValid) {
    return res.status(403).json({
      error: "Subscription Required for Analytics",
      locked: true,
      messageAr: "🔒 الوصول للتحليلات وإحصائيات الأداء حائل للمشتركين فقط."
    });
  }

  return res.json({
    status: "success",
    analytics: {
      peakHours: ["10:00 AM - 12:00 PM", "01:00 PM - 03:00 PM"],
      averageProcessingTimeMinutes: 8.5,
      branchPerformance: [
        { branch: "القاهرة الرئيسي", requests: 48, revenue: 12000 },
        { branch: "الجيزة - الهرم", requests: 32, revenue: 8000 }
      ]
    }
  });
});

// API Route 2: Batch Synchronization & Live Verification Scan
app.post("/api/sync-official", async (req, res) => {
  const { urls, verifiedBy } = req.body;
  const urlList: string[] = Array.isArray(urls) && urls.length > 0 ? urls : [
    'https://digital.gov.eg',
    'https://moe.gov.eg',
    'https://parent.emis.gov.eg',
    'https://tansik.digital.gov.eg',
    'https://shmff.gov.eg',
    'https://jobs.caoa.gov.eg',
    'https://tagned.mod.gov.eg',
    'https://traffic.moi.gov.eg',
    'https://cso.moi.gov.eg',
    'https://tamwin.com.eg'
  ];

  const results: LiveLinkCheckResult[] = [];
  for (const url of urlList) {
    const check = await performLiveHttpVerification(url);
    results.push(check);
  }

  const workingCount = results.filter(r => r.health === 'working').length;
  const needsReviewCount = results.filter(r => r.health === 'needs_review').length;
  const brokenCount = results.filter(r => r.health === 'broken').length;
  const sslCount = results.filter(r => r.sslValid).length;

  const totalChecked = results.length;
  const avgLatency = totalChecked > 0 ? Math.round(results.reduce((acc, r) => acc + r.responseTimeMs, 0) / totalChecked) : 0;
  const sslHealthPercentage = totalChecked > 0 ? Math.round((sslCount / totalChecked) * 100) : 100;

  const report = {
    reportId: 'LIVE-SYNC-' + Date.now(),
    timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString('ar-EG'),
    totalChecked,
    workingCount,
    needsReviewCount,
    brokenCount,
    averageResponseTimeMs: avgLatency,
    sslHealthPercentage,
    verifiedBy: verifiedBy || 'المحرك الآلي للتحقق المباشر من الخوادم الحكومية (Node Live HTTP)',
    results
  };

  return res.json(report);
});

// API Route 3: Official Government Announcements Health Check
app.get("/api/announcements-check", async (_req, res) => {
  const portalUrls = [
    { title: 'بوابة مصر الرقمية', url: 'https://digital.gov.eg' },
    { title: 'وزارة التربية والتعليم', url: 'https://moe.gov.eg' },
    { title: 'منصة التنسيق الإلكتروني', url: 'https://tansik.digital.gov.eg' },
    { title: 'صندوق الإسكان الاجتماعي', url: 'https://shmff.gov.eg' },
    { title: 'بوابة الوظائف الحكومية', url: 'https://jobs.caoa.gov.eg' }
  ];

  const checks = await Promise.all(
    portalUrls.map(async p => {
      const live = await performLiveHttpVerification(p.url);
      return {
        portalName: p.title,
        url: p.url,
        status: live.httpStatus,
        health: live.health,
        responseTimeMs: live.responseTimeMs,
        checkedAt: live.checkedAt
      };
    })
  );

  return res.json({
    status: 'ok',
    scanDate: new Date().toISOString(),
    portals: checks
  });
});

// Daily Automated Background Sync Worker (Runs once every 24 hours)
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
setInterval(async () => {
  console.log('[AUTO-SYNC-ENGINE] Executing 24-Hour Scheduled Official Government Verification Scan...');
  try {
    const testUrls = ['https://digital.gov.eg', 'https://moe.gov.eg', 'https://shmff.gov.eg'];
    for (const u of testUrls) {
      await performLiveHttpVerification(u);
    }
    console.log('[AUTO-SYNC-ENGINE] Scheduled Verification Scan Completed Successfully.');
  } catch (err) {
    console.error('[AUTO-SYNC-ENGINE] Scheduled Verification Scan Error:', err);
  }
}, TWENTY_FOUR_HOURS_MS);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[EGYPT-GOVT-HUB] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
