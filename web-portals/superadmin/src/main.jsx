import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Activity,
  Bell,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileWarning,
  Filter,
  Gift,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store,
  Tag,
  TrendingDown,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import './index.css';

const appSummary = {
  market: 'الرياض - السعودية',
  currency: 'ر.س',
  uptime: '99.94%',
  activeServices: 8,
  pendingApprovals: 14,
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

// Authentication functions
const requestAdminOTP = async (phone) => {
  console.log('📤 Requesting OTP for admin:', phone);
  
  if (!hasSupabaseConfig) {
    return {
      data: { phone, code: '1234' },
      error: null,
    };
  }

  try {
    const code = '1234'; // Test OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const { data, error } = await fetch(
      `${supabaseUrl}/rest/v1/auth_verifications`,
      {
        method: 'POST',
        headers: getSupabaseHeaders({ Prefer: 'return=representation' }),
        body: JSON.stringify({
          phone,
          auth_mode: 'admin_login',
          code,
          expires_at: expiresAt,
          is_used: false,
        }),
      }
    ).then(res => res.json());

    if (error) {
      console.error('OTP request error:', error);
      return { data: { phone, code: '1234' }, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error('OTP request failed:', err);
    return { data: { phone, code: '1234' }, error: null };
  }
};

const verifyAdminOTP = async (phone, code) => {
  console.log('🔐 Verifying admin OTP:', code, 'for', phone);
  
  if (!hasSupabaseConfig) {
    const isValid = code === '1234' && code.length === 4;
    return {
      data: { 
        user: { 
          phone, 
          name: 'المشرف العام', 
          role: 'superadmin',
          email: 'admin@tatx.sa'
        } 
      },
      error: isValid ? null : new Error('رمز التحقق غير صحيح'),
    };
  }

  try {
    const { data: verification, error } = await fetch(
      `${supabaseUrl}/rest/v1/auth_verifications?select=*&phone=eq.${encodeURIComponent(phone)}&code=eq.${code}&is_used=eq.false&order=created_at.desc&limit=1`,
      {
        headers: getSupabaseHeaders(),
      }
    ).then(res => res.json()).then(data => ({ data: data[0], error: null }));

    if (error || !verification) {
      return { data: null, error: new Error('رمز التحقق غير صحيح') };
    }

    if (new Date(verification.expires_at).getTime() < Date.now()) {
      return { data: null, error: new Error('رمز التحقق منتهي الصلاحية') };
    }

    return {
      data: { 
        user: { 
          phone, 
          name: 'المشرف العام', 
          role: 'superadmin',
          email: 'admin@tatx.sa'
        } 
      },
      error: null,
    };
  } catch (err) {
    console.error('OTP verification failed:', err);
    return {
      data: { user: { phone, name: 'المشرف العام', role: 'superadmin' } },
      error: code === '1234' ? null : new Error('رمز التحقق غير صحيح'),
    };
  }
};

const getSupabaseHeaders = (extra = {}) => ({
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
  ...extra,
});

const expectedContentSections = [
  'demoAccounts',
  'demoMarket',
  'homeServices',
  'homeOffers',
  'landingPage',
  'medicalBookingContent',
  'onboardingSlides',
  'notifications',
  'restaurants',
  'products',
  'orders',
  'paymentMethods',
  'stayBookingOptions',
  'supportTopics',
  'taxiContent',
  'wholesaleContent',
  'walletTransactions',
  'user',
];

const fetchContentSections = async () => {
  if (!hasSupabaseConfig) {
    throw new Error('Missing Supabase configuration.');
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/app_content_sections?select=section_key,payload,is_active,updated_at&order=section_key.asc`,
    {
      headers: getSupabaseHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to load content sections (${response.status}).`);
  }

  const rows = await response.json();
  const rowMap = new Map(rows.map((row) => [row.section_key, row]));

  return expectedContentSections.map((sectionKey) => {
    const existing = rowMap.get(sectionKey);

    return (
      existing || {
        section_key: sectionKey,
        payload: {},
        is_active: true,
        updated_at: null,
      }
    );
  });
};

const upsertContentSection = async (section) => {
  if (!hasSupabaseConfig) {
    throw new Error('Missing Supabase configuration.');
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/app_content_sections?on_conflict=section_key`,
    {
      method: 'POST',
      headers: getSupabaseHeaders({
        Prefer: 'resolution=merge-duplicates,return=representation',
      }),
      body: JSON.stringify([
        {
          section_key: section.section_key,
          payload: section.payload,
          is_active: section.is_active,
        },
      ]),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to save section (${response.status}).`);
  }

  const result = await response.json();
  return result[0];
};

const fetchVendorApplications = async () => {
  if (!hasSupabaseConfig) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/vendor_applications?select=*&order=created_at.desc`,
    { headers: getSupabaseHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Failed to load vendor applications (${response.status}).`);
  }

  return response.json();
};

const fetchVendorProfiles = async () => {
  if (!hasSupabaseConfig) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/vendor_profiles?select=*&order=created_at.desc`,
    { headers: getSupabaseHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Failed to load vendor profiles (${response.status}).`);
  }

  return response.json();
};

const fetchVendorServices = async () => {
  if (!hasSupabaseConfig) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/vendor_services?select=*&order=created_at.desc`,
    { headers: getSupabaseHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Failed to load vendor services (${response.status}).`);
  }

  return response.json();
};

const fetchOrders = async () => {
  if (!hasSupabaseConfig) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/customer_orders?select=*&order=created_at.desc`,
    { headers: getSupabaseHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Failed to load orders (${response.status}).`);
  }

  return response.json();
};

const updateVendorApplicationStatus = async (application, status) => {
  if (!hasSupabaseConfig) {
    throw new Error('Missing Supabase configuration.');
  }

  const now = new Date().toISOString();
  const payload = {
    status,
    approved_at: status === 'approved' ? now : null,
    rejected_at: status === 'rejected' ? now : null,
    review_notes:
      status === 'approved'
        ? 'تمت الموافقة من المشرف العام. تم تفعيل بوابة البائع.'
        : 'تم رفض الطلب مؤقتاً. يرجى تحديث البيانات أو المستندات وإعادة التقديم.',
  };

  const applicationResponse = await fetch(
    `${supabaseUrl}/rest/v1/vendor_applications?id=eq.${application.id}`,
    {
      method: 'PATCH',
      headers: getSupabaseHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify(payload),
    }
  );

  if (!applicationResponse.ok) {
    throw new Error(`Failed to update application (${applicationResponse.status}).`);
  }

  const [updatedApplication] = await applicationResponse.json();

  if (status === 'approved') {
    const profilePayload = {
      application_id: application.id,
      store_name: application.store_name,
      owner_name: application.owner_name,
      phone: application.phone,
      email: application.email,
      category: application.category,
      description: application.description,
      address: application.address,
      city: application.city,
      status: 'approved',
      is_active: true,
    };

    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/vendor_profiles?on_conflict=phone`,
      {
        method: 'POST',
        headers: getSupabaseHeaders({
          Prefer: 'resolution=merge-duplicates,return=representation',
        }),
        body: JSON.stringify([profilePayload]),
      }
    );

    if (!profileResponse.ok) {
      throw new Error(`Failed to activate vendor profile (${profileResponse.status}).`);
    }
  }

  return updatedApplication;
};

const formatSarAmount = (value) =>
  `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 0 }).format(Number(value || 0))} ر.س`;

const normalizeOrderStatus = (status) => {
  const value = String(status || '').toLowerCase();

  if (value.includes('deliver')) return 'في التوصيل';
  if (value.includes('prepar') || value.includes('progress')) return 'قيد التحضير';
  if (value.includes('complete') || value.includes('success')) return 'مكتمل';
  if (value.includes('cancel') || value.includes('reject')) return 'ملغي';
  return 'بانتظار التنفيذ';
};

const getRiskLabel = (order) => {
  if (Number(order.total || 0) >= 300) return 'مرتفع';
  if (Number(order.total || 0) >= 120) return 'متوسط';
  return 'منخفض';
};

const dashboardStats = [
  { id: 'gmv', title: 'إجمالي المبيعات', value: '248,540 ر.س', change: '+14.2%', trend: 'up', icon: CreditCard, color: 'from-rose-500 to-pink-500' },
  { id: 'orders', title: 'الطلبات اليوم', value: '1,284', change: '+8.5%', trend: 'up', icon: ShoppingBag, color: 'from-sky-500 to-cyan-500' },
  { id: 'vendors', title: 'البائعون النشطون', value: '186', change: '+12', trend: 'up', icon: Store, color: 'from-emerald-500 to-green-500' },
  { id: 'users', title: 'المستخدمون النشطون', value: '24,870', change: '-1.3%', trend: 'down', icon: Users, color: 'from-violet-500 to-purple-500' },
];

const serviceHealth = [
  { id: 'taxi', name: 'مشوار', status: 'مستقر', orders: '342 طلب', issueCount: 1, fill: 86, tone: 'emerald' },
  { id: 'food', name: 'مطاعم', status: 'ضغط مرتفع', orders: '518 طلب', issueCount: 5, fill: 73, tone: 'amber' },
  { id: 'market', name: 'سوبرماركيت', status: 'مستقر', orders: '266 طلب', issueCount: 2, fill: 79, tone: 'sky' },
  { id: 'wholesale', name: 'سوق الجملة', status: 'متابعة مطلوبة', orders: '94 طلب', issueCount: 6, fill: 58, tone: 'rose' },
];

const usersSeed = [
  { id: 'USR-1001', name: 'سارة القحطاني', phone: '0555000001', city: 'الرياض', orders: 28, wallet: '420 ر.س', status: 'نشط', segment: 'VIP' },
  { id: 'USR-1002', name: 'محمد العتيبي', phone: '0555000345', city: 'جدة', orders: 14, wallet: '85 ر.س', status: 'نشط', segment: 'عادي' },
  { id: 'USR-1003', name: 'ريم الحربي', phone: '0555000876', city: 'الدمام', orders: 4, wallet: '0 ر.س', status: 'مقيد', segment: 'جديد' },
  { id: 'USR-1004', name: 'فيصل الدوسري', phone: '0555000194', city: 'الرياض', orders: 9, wallet: '140 ر.س', status: 'نشط', segment: 'عادي' },
];

const vendorsSeed = [
  { id: 'VND-2001', name: 'برجر السرايا', type: 'مطاعم', city: 'الرياض', orders: 234, payout: '12,450 ر.س', status: 'نشط', compliance: 'مكتمل' },
  { id: 'VND-2002', name: 'سلة الرياض', type: 'سوبرماركيت', city: 'الرياض', orders: 189, payout: '8,920 ر.س', status: 'نشط', compliance: 'مكتمل' },
  { id: 'VND-2003', name: 'ورد نجد', type: 'عطور وهدايا', city: 'الرياض', orders: 76, payout: '3,180 ر.س', status: 'مراجعة', compliance: 'ينقصه مستند' },
  { id: 'VND-2004', name: 'مستودع الشمال', type: 'سوق الجملة', city: 'الرياض', orders: 42, payout: '17,600 ر.س', status: 'موقوف مؤقتا', compliance: 'مكتمل' },
];

const ordersSeed = [
  { id: 'ORD-9401', customer: 'سارة القحطاني', vendor: 'برجر السرايا', service: 'مطاعم', total: '84 ر.س', status: 'في التوصيل', risk: 'منخفض' },
  { id: 'ORD-9402', customer: 'محمد العتيبي', vendor: 'سلة الرياض', service: 'سوبرماركيت', total: '232 ر.س', status: 'قيد التحضير', risk: 'متوسط' },
  { id: 'ORD-9403', customer: 'ريم الحربي', vendor: 'ورد نجد', service: 'عطور وهدايا', total: '145 ر.س', status: 'ملغي', risk: 'مرتفع' },
  { id: 'ORD-9404', customer: 'فيصل الدوسري', vendor: 'مشوار سريع', service: 'مشوار', total: '26 ر.س', status: 'مكتمل', risk: 'منخفض' },
];

const contentSeed = [
  { id: 'CNT-1', section: 'العروض', title: 'خصم 30% على الوجبات العائلية', owner: 'برجر السرايا', state: 'منشور', updatedAt: 'قبل 20 دقيقة' },
  { id: 'CNT-2', section: 'التصنيفات', title: 'العاب اطفال', owner: 'فريق المحتوى', state: 'منشور', updatedAt: 'اليوم' },
  { id: 'CNT-3', section: 'العروض', title: 'توصيل مجاني فوق 120 ر.س', owner: 'سلة الرياض', state: 'مراجعة', updatedAt: 'قبل ساعة' },
  { id: 'CNT-4', section: 'الخدمات', title: 'سوق الجملة', owner: 'فريق العمليات', state: 'منشور', updatedAt: 'أمس' },
];

const financeSeed = [
  { id: 'FIN-1', label: 'رصيد محافظ العملاء', value: '94,800 ر.س', note: 'يشمل الأرصدة المعلقة' },
  { id: 'FIN-2', label: 'مستحقات البائعين', value: '62,300 ر.س', note: 'دفعة هذا الأسبوع' },
  { id: 'FIN-3', label: 'عمولات المنصة', value: '18,420 ر.س', note: 'حتى الآن هذا الشهر' },
];

const supportSeed = [
  { id: 'SUP-1', title: 'زيادة شكاوى التأخير في المطاعم', owner: 'فريق العمليات', severity: 'حرج', sla: '15 دقيقة', status: 'قيد المعالجة' },
  { id: 'SUP-2', title: 'متجر بانتظار مراجعة المستندات', owner: 'امتثال البائعين', severity: 'متوسط', sla: '4 ساعات', status: 'بانتظار القرار' },
  { id: 'SUP-3', title: 'طلب استرجاع مبلغ لمحفظة عميل', owner: 'الدعم المالي', severity: 'منخفض', sla: '8 ساعات', status: 'تم الحل' },
];

const settingsSeed = [
  { id: 'set-1', title: 'العمولة الأساسية', value: '12%', description: 'تطبّق على المطاعم والسوبرماركيت' },
  { id: 'set-2', title: 'الحد الأدنى للطلب', value: '20 ر.س', description: 'للخدمات اللوجستية والطلبات السريعة' },
  { id: 'set-3', title: 'تنبيه الوثائق', value: '7 أيام', description: 'قبل انتهاء مستندات البائعين' },
  { id: 'set-4', title: 'تفعيل المراجعة اليدوية', value: 'نشط', description: 'على الطلبات عالية المخاطر' },
];

const menuItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, hint: 'الرؤية التشغيلية الشاملة' },
  { id: 'users', label: 'المستخدمون', icon: Users, hint: 'الحسابات والمحافظ والسلوك' },
  { id: 'vendors', label: 'البائعون', icon: Store, hint: 'التفعيل والامتثال والجودة' },
  { id: 'orders', label: 'الطلبات', icon: ShoppingBag, hint: 'المتابعة والتدخلات الفورية' },
  { id: 'content', label: 'المحتوى والخدمات', icon: Tag, hint: 'العروض والتصنيفات والأقسام' },
  { id: 'finance', label: 'المالية', icon: Wallet, hint: 'المستحقات والعمولات والمحافظ' },
  { id: 'support', label: 'الدعم والامتثال', icon: ShieldCheck, hint: 'الشكاوى والمخاطر والتذاكر' },
  { id: 'settings', label: 'إعدادات النظام', icon: Settings, hint: 'السياسات العامة والتحكم' },
];

const toneClasses = {
  rose: 'bg-rose-100 text-rose-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  sky: 'bg-sky-100 text-sky-700',
  slate: 'bg-slate-100 text-slate-700',
};

const statusClasses = {
  'نشط': 'bg-emerald-100 text-emerald-700',
  'مكتمل': 'bg-emerald-100 text-emerald-700',
  'منشور': 'bg-emerald-100 text-emerald-700',
  'مراجعة': 'bg-amber-100 text-amber-700',
  'بانتظار الموافقة': 'bg-amber-100 text-amber-700',
  'ينقصه مستند': 'bg-amber-100 text-amber-700',
  'قيد التحضير': 'bg-sky-100 text-sky-700',
  'في التوصيل': 'bg-violet-100 text-violet-700',
  'بانتظار القرار': 'bg-amber-100 text-amber-700',
  'قيد المعالجة': 'bg-sky-100 text-sky-700',
  'تم الحل': 'bg-emerald-100 text-emerald-700',
  'ملغي': 'bg-rose-100 text-rose-700',
  'مرفوض': 'bg-rose-100 text-rose-700',
  'موقوف مؤقتا': 'bg-rose-100 text-rose-700',
  'مقيد': 'bg-rose-100 text-rose-700',
  'حرج': 'bg-rose-100 text-rose-700',
  'متوسط': 'bg-amber-100 text-amber-700',
  'منخفض': 'bg-emerald-100 text-emerald-700',
};

const Card = ({ children, className = '' }) => (
  <section className={`rounded-[28px] border border-white/70 bg-white/95 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur ${className}`}>
    {children}
  </section>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-start justify-between gap-3 px-6 pt-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-slate-900 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`mt-1 text-sm leading-6 text-slate-500 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 pt-5 ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'bg-slate-950 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    soft: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-11 px-4 text-sm',
    icon: 'h-11 w-11',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, tone = 'slate', className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone] || statusClasses[children] || toneClasses.slate} ${className}`}>
    {children}
  </span>
);

const Avatar = ({ label, className = '' }) => (
  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-pink-50 text-sm font-bold text-rose-700 ${className}`}>
    {label}
  </div>
);

const SectionHeading = ({ title, subtitle, actionLabel }) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
    {actionLabel ? <Button variant="outline">{actionLabel}</Button> : null}
  </div>
);

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <Card className="overflow-hidden">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{value}</p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-500" />
            )}
            <span className={trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}>{change}</span>
            <span className="text-slate-400">مقارنة بالأسبوع الماضي</span>
          </div>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${color} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const SearchField = ({ value, onChange, placeholder }) => (
  <div className="relative w-full md:max-w-md">
    <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-2xl border border-slate-200 bg-white pr-11 pl-4 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
    />
  </div>
);

const TableCard = ({ title, subtitle, columns, rows, renderRow, actionLabel }) => (
  <Card>
    <CardHeader>
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </div>
      {actionLabel ? <Button variant="outline">{actionLabel}</Button> : null}
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-right text-xs font-semibold text-slate-400">
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap px-4 py-3 first:pr-0 last:pl-0">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => renderRow(row))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => (
  <>
    {isOpen ? <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={onClose} /> : null}
    <aside className={`fixed inset-y-0 right-0 z-50 w-[310px] border-l border-white/60 bg-[linear-gradient(180deg,#fff7f9_0%,#ffffff_48%,#fff8fb_100%)] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-rose-100/70 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-lg font-black text-white shadow-lg shadow-rose-200">
              T
            </div>
            <div>
              <p className="text-lg font-black text-slate-950">TATX Admin</p>
              <p className="text-xs text-slate-400">تشغيل وإدارة المنصة</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-2xl p-2 text-slate-500 hover:bg-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pt-6">
          <Card className="border-rose-100 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Avatar label="م" className="bg-white/10 text-white" />
                <div>
                  <p className="font-bold">مشرف العمليات</p>
                  <p className="text-xs text-white/70">admin@tatx.com</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-white/60">الخدمات</p>
                  <p className="mt-1 text-lg font-bold">{appSummary.activeServices}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-white/60">اعتمادات</p>
                  <p className="mt-1 text-lg font-bold">{appSummary.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`mb-2 flex w-full items-start gap-3 rounded-3xl px-4 py-4 text-right transition ${active ? 'bg-slate-950 text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-white'}`}
              >
                <div className={`mt-0.5 rounded-2xl p-2 ${active ? 'bg-white/10 text-white' : 'bg-rose-50 text-rose-500'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.label}</div>
                  <div className={`mt-1 text-xs ${active ? 'text-white/70' : 'text-slate-400'}`}>{item.hint}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  </>
);

const Header = ({ onMenuClick, search, setSearch, title, adminUser, onLogout }) => (
  <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
    <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-500">Superadmin</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950">{title}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchField value={search} onChange={setSearch} placeholder="ابحث عن مستخدم، متجر، طلب، أو تذكرة" />
        
        {adminUser && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-950">{adminUser.name}</p>
              <p className="text-xs text-slate-500">{adminUser.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-error-600 hover:text-error-700">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <Button variant="outline" size="icon" className="relative shrink-0">
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </Button>
      </div>
    </div>
  </header>
);

const DashboardTab = () => {
  const [state, setState] = useState({
    loading: hasSupabaseConfig,
    error: '',
    stats: dashboardStats,
    services: serviceHealth,
    interventions: [],
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!hasSupabaseConfig) {
        return;
      }

      try {
        const [orders, applications, profiles, services, sections] = await Promise.all([
          fetchOrders(),
          fetchVendorApplications(),
          fetchVendorProfiles(),
          fetchVendorServices(),
          fetchContentSections(),
        ]);

        if (cancelled) {
          return;
        }

        const totalSales = orders.reduce((sum, item) => sum + Number(item.total || 0), 0);
        const pendingApprovals = applications.filter((item) => item.status === 'pending').length;
        const recentOrders = orders.filter((item) => {
          const createdAt = new Date(item.created_at).getTime();
          return Number.isFinite(createdAt) && Date.now() - createdAt <= 24 * 60 * 60 * 1000;
        }).length;
        const activeVendors = profiles.filter((item) => item.is_active).length;
        const uniqueCustomers = new Set(
          orders.map((item) => item.customer_phone || item.customer_name).filter(Boolean)
        ).size;

        const serviceMap = new Map();
        services.forEach((item) => {
          const key = item.category || 'غير مصنف';
          const current = serviceMap.get(key) || { id: key, name: key, serviceCount: 0, activeCount: 0 };
          current.serviceCount += 1;
          current.activeCount += item.is_active ? 1 : 0;
          serviceMap.set(key, current);
        });

        const serviceRows = Array.from(serviceMap.values()).map((item) => {
          const fill = item.serviceCount ? Math.round((item.activeCount / item.serviceCount) * 100) : 0;
          return {
            id: item.id,
            name: item.name,
            status: fill >= 80 ? 'مستقر' : fill >= 50 ? 'ضغط مرتفع' : 'متابعة مطلوبة',
            orders: `${item.serviceCount} خدمة`,
            issueCount: item.serviceCount - item.activeCount,
            fill,
            tone: fill >= 80 ? 'emerald' : fill >= 50 ? 'amber' : 'rose',
          };
        });

        setState({
          loading: false,
          error: '',
          stats: [
            { id: 'gmv', title: 'إجمالي المبيعات', value: formatSarAmount(totalSales), change: `${orders.length} طلب`, trend: 'up', icon: CreditCard, color: 'from-rose-500 to-pink-500' },
            { id: 'orders', title: 'الطلبات الحالية', value: String(recentOrders), change: `${orders.length} إجمالي الطلبات`, trend: 'up', icon: ShoppingBag, color: 'from-sky-500 to-cyan-500' },
            { id: 'vendors', title: 'البائعون النشطون', value: String(activeVendors), change: `${services.length} خدمة مسجلة`, trend: 'up', icon: Store, color: 'from-emerald-500 to-green-500' },
            { id: 'users', title: 'العملاء النشطون', value: String(uniqueCustomers), change: `${pendingApprovals} طلب اعتماد`, trend: pendingApprovals ? 'up' : 'down', icon: Users, color: 'from-violet-500 to-purple-500' },
          ],
          services: serviceRows.length ? serviceRows : serviceHealth,
          interventions: [
            { title: `${pendingApprovals} طلب اعتماد بائع جديد`, tone: pendingApprovals ? 'amber' : 'emerald', icon: Store },
            { title: `${sections.filter((section) => !section.updated_at).length} أقسام محتوى تحتاج تعبئة`, tone: 'sky', icon: Gift },
            { title: `${orders.filter((item) => getRiskLabel(item) === 'مرتفع').length} طلبات عالية القيمة تحتاج متابعة`, tone: 'rose', icon: LifeBuoy },
            { title: `إجمالي عمولات تقديري ${formatSarAmount(totalSales * 0.12)}`, tone: 'emerald', icon: Wallet },
          ],
        });
      } catch (error) {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: error.message }));
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeading title="الرؤية العامة" subtitle="متابعة الأداء الحي للتطبيق والمستخدمين والبائعين من شاشة واحدة" actionLabel="تصدير التقرير اليومي" />
      {state.error ? (
        <Card>
          <CardContent className="pt-6 text-sm text-rose-600">{state.error}</CardContent>
        </Card>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {state.stats.map((item) => (
          <StatCard key={item.id} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>صحة الخدمات</CardTitle>
              <CardDescription>تعطيك مؤشرا مباشرا عن الضغط التشغيلي، جودة التنفيذ، وعدد المشاكل الحالية.</CardDescription>
            </div>
            <Button variant="outline">{state.loading ? 'جارٍ المزامنة...' : 'بيانات مباشرة'}</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.services.map((service) => (
              <div key={service.id} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">{service.name}</p>
                      <Badge tone={service.tone}>{service.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{service.orders} • {service.issueCount} عناصر غير نشطة</p>
                  </div>
                  <div className="w-full max-w-xs">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                      <span>جاهزية التشغيل</span>
                      <span>{service.fill}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-200">
                      <div className={`h-2.5 rounded-full ${service.tone === 'emerald' ? 'bg-emerald-500' : service.tone === 'amber' ? 'bg-amber-500' : service.tone === 'sky' ? 'bg-sky-500' : 'bg-rose-500'}`} style={{ width: `${service.fill}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>نقاط تحتاج تدخل</CardTitle>
              <CardDescription>العناصر التي تستحق مراجعة فورية من الإدارة.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {state.interventions.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 rounded-3xl border border-slate-100 p-4">
                  <div className={`rounded-2xl p-3 ${toneClasses[item.tone]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-sm font-medium text-slate-700">{item.title}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const UsersTab = ({ search }) => {
  const [dbRows, setDbRows] = useState([]);
  const [loading, setLoading] = useState(hasSupabaseConfig);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!hasSupabaseConfig) {
        setLoading(false);
        return;
      }

      try {
        const orders = await fetchOrders();
        const customerMap = new Map();

        orders.forEach((item, index) => {
          const key = item.customer_phone || item.customer_name || `guest-${index}`;
          const current = customerMap.get(key) || {
            id: `USR-${String(customerMap.size + 1).padStart(4, '0')}`,
            name: item.customer_name || 'عميل التطبيق',
            phone: item.customer_phone || 'غير متوفر',
            city: item.raw_order?.user?.city || item.raw_order?.city || 'غير محدد',
            orders: 0,
            wallet: '0 ر.س',
            status: 'نشط',
            segment: 'عادي',
            totalSpent: 0,
          };
          current.orders += 1;
          current.totalSpent += Number(item.total || 0);
          current.segment = current.orders >= 5 ? 'VIP' : current.orders >= 2 ? 'متكرر' : 'جديد';
          customerMap.set(key, current);
        });

        if (!cancelled) {
          setDbRows(
            Array.from(customerMap.values()).map((item) => ({
              ...item,
              wallet: formatSarAmount(item.totalSpent),
            }))
          );
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    const source = hasSupabaseConfig ? dbRows : usersSeed;
    return source.filter((item) => [item.id, item.name, item.phone, item.city].join(' ').includes(search));
  }, [dbRows, search]);

  return (
    <div className="space-y-6">
      <SectionHeading title="إدارة المستخدمين" subtitle="عرض الحسابات، حالة النشاط، الرصيد، وعدد الطلبات مع إجراءات الإدارة." actionLabel="إضافة مستخدم" />
      {loading ? (
        <Card>
          <CardContent className="pt-6 text-sm text-slate-500">جارٍ تحميل المستخدمين من الطلبات المسجلة...</CardContent>
        </Card>
      ) : null}
      {errorMessage ? (
        <Card>
          <CardContent className="pt-6 text-sm text-rose-600">{errorMessage}</CardContent>
        </Card>
      ) : null}
      <TableCard
        title="قائمة المستخدمين"
        subtitle="إدارة الحسابات الفردية، الحالة، والمحفظة."
        actionLabel="تصدير CSV"
        columns={['المعرف', 'المستخدم', 'المدينة', 'الطلبات', 'المحفظة', 'الشريحة', 'الحالة', 'الإجراءات']}
        rows={rows}
        renderRow={(user) => (
          <tr key={user.id} className="border-b border-slate-50 text-slate-700">
            <td className="px-4 py-4 font-semibold text-slate-900 first:pr-0">{user.id}</td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar label={user.name.slice(0, 1)} />
                <div>
                  <div className="font-semibold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.phone}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4">{user.city}</td>
            <td className="px-4 py-4">{user.orders}</td>
            <td className="px-4 py-4 font-semibold">{user.wallet}</td>
            <td className="px-4 py-4">{user.segment}</td>
            <td className="px-4 py-4"><Badge>{user.status}</Badge></td>
            <td className="px-4 py-4 pl-0">
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">عرض</Button>
                <Button size="sm" variant="soft">تقييد</Button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

const VendorsTab = ({ search }) => {
  const [dbRows, setDbRows] = useState([]);
  const [loading, setLoading] = useState(hasSupabaseConfig);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!hasSupabaseConfig) {
        setLoading(false);
        return;
      }

      try {
        const applications = await fetchVendorApplications();

        if (!cancelled) {
          setDbRows(applications);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    if (!hasSupabaseConfig) {
      return vendorsSeed.filter((item) => [item.id, item.name, item.type, item.city].join(' ').includes(search));
    }

    return dbRows
      .filter((item) =>
        [item.id, item.store_name, item.owner_name, item.phone, item.city, item.category]
          .join(' ')
          .includes(search)
      )
      .map((item) => ({
        id: item.id.slice(0, 8).toUpperCase(),
        name: item.store_name,
        owner: item.owner_name,
        type: item.category,
        city: item.city,
        phone: item.phone,
        orders: '0',
        payout: '0 ر.س',
        compliance: item.cr_number ? 'مكتمل' : 'ينقصه مستند',
        status: item.status === 'approved' ? 'نشط' : item.status === 'rejected' ? 'مرفوض' : 'بانتظار الموافقة',
        raw: item,
      }));
  }, [dbRows, search]);

  const handleApplicationAction = async (vendor, status) => {
    try {
      const updated = await updateVendorApplicationStatus(vendor.raw, status);

      setDbRows((prev) =>
        prev.map((row) => (row.id === updated.id ? updated : row))
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeading title="إدارة البائعين" subtitle="التحكم في اعتماد البائعين، حالة الامتثال، المستحقات، ونشاط المتاجر." actionLabel="اعتماد بائع جديد" />
      {loading ? (
        <Card>
          <CardContent className="pt-6 text-sm text-slate-500">جارٍ تحميل طلبات الانضمام الحالية...</CardContent>
        </Card>
      ) : null}
      {errorMessage ? (
        <Card>
          <CardContent className="pt-6 text-sm text-rose-600">{errorMessage}</CardContent>
        </Card>
      ) : null}
      <TableCard
        title="البائعون والمتاجر"
        subtitle={hasSupabaseConfig ? 'طلبات الانضمام من التطبيق مع إجراءات الموافقة والتفعيل.' : 'مراجعة المتاجر حسب النوع والحالة والالتزام.'}
        actionLabel="فلترة متقدمة"
        columns={['المعرف', 'البائع', 'النوع', 'المدينة', 'الطلبات', 'المستحقات', 'الامتثال', 'الحالة']}
        rows={rows}
        renderRow={(vendor) => (
          <tr key={vendor.id} className="border-b border-slate-50 text-slate-700">
            <td className="px-4 py-4 font-semibold text-slate-900 first:pr-0">{vendor.id}</td>
            <td className="px-4 py-4">
              <div className="font-semibold">{vendor.name}</div>
              {vendor.owner ? <div className="mt-1 text-xs text-slate-400">{vendor.owner} • {vendor.phone}</div> : null}
            </td>
            <td className="px-4 py-4">{vendor.type}</td>
            <td className="px-4 py-4">{vendor.city}</td>
            <td className="px-4 py-4">{vendor.orders}</td>
            <td className="px-4 py-4 font-semibold">{vendor.payout}</td>
            <td className="px-4 py-4"><Badge>{vendor.compliance}</Badge></td>
            <td className="px-4 py-4 pl-0">
              <div className="flex items-center justify-end gap-2">
                <Badge>{vendor.status}</Badge>
                {hasSupabaseConfig && vendor.raw?.status === 'pending' ? (
                  <>
                    <Button size="sm" variant="soft" onClick={() => handleApplicationAction(vendor, 'approved')}>موافقة</Button>
                    <Button size="sm" variant="outline" onClick={() => handleApplicationAction(vendor, 'rejected')}>رفض</Button>
                  </>
                ) : null}
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

const OrdersTab = ({ search }) => {
  const [dbRows, setDbRows] = useState([]);
  const [loading, setLoading] = useState(hasSupabaseConfig);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!hasSupabaseConfig) {
        setLoading(false);
        return;
      }

      try {
        const orders = await fetchOrders();

        if (!cancelled) {
          setDbRows(
            orders.map((item) => ({
              id: item.order_number || item.id.slice(0, 8).toUpperCase(),
              customer: item.customer_name || 'عميل التطبيق',
              vendor: item.vendor_name || 'غير محدد',
              service: item.raw_order?.serviceType || item.raw_order?.category || 'خدمة عامة',
              total: formatSarAmount(item.total),
              status: normalizeOrderStatus(item.status),
              risk: getRiskLabel(item),
            }))
          );
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    const source = hasSupabaseConfig ? dbRows : ordersSeed;
    return source.filter((item) => [item.id, item.customer, item.vendor, item.service].join(' ').includes(search));
  }, [dbRows, search]);

  return (
    <div className="space-y-6">
      <SectionHeading title="إدارة الطلبات" subtitle="مراقبة الطلبات لحظيا، معرفة مستوى الخطورة، والتدخل السريع عند الحاجة." actionLabel="تشغيل المراقبة الحية" />
      {loading ? (
        <Card>
          <CardContent className="pt-6 text-sm text-slate-500">جارٍ تحميل الطلبات الحالية...</CardContent>
        </Card>
      ) : null}
      {errorMessage ? (
        <Card>
          <CardContent className="pt-6 text-sm text-rose-600">{errorMessage}</CardContent>
        </Card>
      ) : null}
      <TableCard
        title="سجل الطلبات"
        subtitle="يشمل حالة الطلب الحالية ومؤشر الخطورة."
        columns={['رقم الطلب', 'العميل', 'البائع', 'الخدمة', 'الإجمالي', 'الحالة', 'الخطورة', 'الإجراء']}
        rows={rows}
        renderRow={(order) => (
          <tr key={order.id} className="border-b border-slate-50 text-slate-700">
            <td className="px-4 py-4 font-semibold text-slate-900 first:pr-0">{order.id}</td>
            <td className="px-4 py-4">{order.customer}</td>
            <td className="px-4 py-4">{order.vendor}</td>
            <td className="px-4 py-4">{order.service}</td>
            <td className="px-4 py-4 font-semibold">{order.total}</td>
            <td className="px-4 py-4"><Badge>{order.status}</Badge></td>
            <td className="px-4 py-4"><Badge>{order.risk}</Badge></td>
            <td className="px-4 py-4 pl-0"><Button size="sm" variant="outline">تفاصيل</Button></td>
          </tr>
        )}
      />
    </div>
  );
};

const ContentTab = ({ search }) => {
  const [dbSections, setDbSections] = useState([]);
  const [selectedSectionKey, setSelectedSectionKey] = useState('');
  const [jsonValue, setJsonValue] = useState('');
  const [loading, setLoading] = useState(hasSupabaseConfig);
  const [saveState, setSaveState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!hasSupabaseConfig) {
        setLoading(false);
        return;
      }

      try {
        const sections = await fetchContentSections();

        if (cancelled) {
          return;
        }

        setDbSections(sections);

        if (sections[0]) {
          setSelectedSectionKey(sections[0].section_key);
          setJsonValue(JSON.stringify(sections[0].payload, null, 2));
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedSection = dbSections.find((section) => section.section_key === selectedSectionKey);
  const rows = useMemo(() => {
    if (!hasSupabaseConfig) {
      return contentSeed.filter((item) => [item.id, item.title, item.owner, item.section].join(' ').includes(search));
    }

    return dbSections
      .map((section, index) => ({
        id: `CNT-${index + 1}`,
        section: section.section_key,
        title: section.section_key,
        owner: 'بوابة المشرف',
        state: section.is_active ? 'منشور' : 'مراجعة',
        updatedAt: section.updated_at ? new Date(section.updated_at).toLocaleString('ar-EG') : 'بدون تحديث',
      }))
      .filter((item) => [item.id, item.title, item.owner, item.section].join(' ').includes(search));
  }, [dbSections, search]);

  const handleSectionChange = (sectionKey) => {
    setSelectedSectionKey(sectionKey);
    const section = dbSections.find((item) => item.section_key === sectionKey);
    setJsonValue(section ? JSON.stringify(section.payload, null, 2) : '');
    setSaveState('');
    setErrorMessage('');
  };

  const handleSave = async () => {
    if (!selectedSection) {
      return;
    }

    try {
      const nextPayload = JSON.parse(jsonValue);
      setSaveState('saving');
      setErrorMessage('');

      const updatedSection = await upsertContentSection({
        section_key: selectedSection.section_key,
        payload: nextPayload,
        is_active: selectedSection.is_active,
      });

      setDbSections((prev) =>
        prev.map((section) =>
          section.section_key === updatedSection.section_key ? updatedSection : section
        )
      );
      setJsonValue(JSON.stringify(updatedSection.payload, null, 2));
      setSaveState('saved');
    } catch (error) {
      setSaveState('');
      setErrorMessage(error.message.includes('JSON') ? 'تأكد من صحة تنسيق JSON قبل الحفظ.' : error.message);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeading title="المحتوى والخدمات" subtitle="إدارة الأقسام، العروض، والتنبيهات التحريرية الخاصة بالتطبيق." actionLabel="إنشاء حملة جديدة" />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>ربط محتوى التطبيق بقاعدة البيانات</CardTitle>
            <CardDescription>عدل أي قسم JSON هنا، ثم احفظه ليظهر داخل تطبيق Expo مباشرة من جدول `app_content_sections`.</CardDescription>
          </div>
          <Button variant="outline" onClick={handleSave} disabled={!selectedSection || saveState === 'saving'}>
            {saveState === 'saving' ? 'جارٍ الحفظ...' : 'حفظ القسم'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasSupabaseConfig ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              أضف `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` داخل بيئة البوابة لتفعيل الربط المباشر.
            </div>
          ) : loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">جارٍ تحميل أقسام قاعدة البيانات...</div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
              <div className="space-y-2">
                {dbSections.map((section) => (
                  <button
                    key={section.section_key}
                    onClick={() => handleSectionChange(section.section_key)}
                    className={`w-full rounded-3xl border px-4 py-4 text-right transition ${selectedSectionKey === section.section_key ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'}`}
                  >
                    <div className="font-semibold">{section.section_key}</div>
                    <div className={`mt-1 text-xs ${selectedSectionKey === section.section_key ? 'text-white/70' : 'text-slate-400'}`}>
                      {section.updated_at ? new Date(section.updated_at).toLocaleString('ar-EG') : 'بدون تحديثات'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <textarea
                  value={jsonValue}
                  onChange={(event) => setJsonValue(event.target.value)}
                  spellCheck={false}
                  className="min-h-[420px] w-full rounded-[28px] border border-slate-200 bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none focus:border-rose-300"
                />
                {saveState === 'saved' ? (
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">تم حفظ القسم في قاعدة البيانات.</div>
                ) : null}
                {errorMessage ? (
                  <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</div>
                ) : null}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <TableCard
        title="العناصر التحريرية"
        subtitle="العروض والتصنيفات والأقسام النشطة داخل التطبيق."
        columns={['المعرف', 'القسم', 'العنوان', 'المالك', 'الحالة', 'آخر تحديث', 'الإجراء']}
        rows={rows}
        renderRow={(item) => (
          <tr key={item.id} className="border-b border-slate-50 text-slate-700">
            <td className="px-4 py-4 font-semibold text-slate-900 first:pr-0">{item.id}</td>
            <td className="px-4 py-4">{item.section}</td>
            <td className="px-4 py-4 font-semibold">{item.title}</td>
            <td className="px-4 py-4">{item.owner}</td>
            <td className="px-4 py-4"><Badge>{item.state}</Badge></td>
            <td className="px-4 py-4">{item.updatedAt}</td>
            <td className="px-4 py-4 pl-0"><Button size="sm" variant="outline">تحرير</Button></td>
          </tr>
        )}
      />
    </div>
  );
};

const FinanceTab = () => (
  <div className="space-y-6">
    <SectionHeading title="المالية" subtitle="إدارة المحافظ، المستحقات، والعمولات على مستوى المنصة كاملة." actionLabel="تسوية أسبوعية" />
    <div className="grid gap-4 xl:grid-cols-3">
      {financeSeed.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.note}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <div>
          <CardTitle>ملخص التشغيل المالي</CardTitle>
          <CardDescription>أهم الإجراءات المالية التي يمكن للإدارة التحكم بها مباشرة.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          'اعتماد دفعات البائعين',
          'تجميد محفظة مستخدم',
          'إصدار استرداد مالي',
          'مراجعة عمولات الأقسام',
        ].map((item) => (
          <div key={item} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm font-medium text-slate-700">{item}</div>
        ))}
      </CardContent>
    </Card>
  </div>
);

const SupportTab = () => (
  <div className="space-y-6">
    <SectionHeading title="الدعم والامتثال" subtitle="التذاكر الحساسة، الشكاوى المفتوحة، وحالات المخاطر التي تحتاج قرارا إداريا." actionLabel="تعيين فريق مناوب" />
    <div className="grid gap-4 xl:grid-cols-3">
      {supportSeed.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-3">
              <Badge>{item.severity}</Badge>
              <span className="text-xs text-slate-400">SLA: {item.sla}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.owner}</p>
            <div className="mt-4 flex items-center justify-between">
              <Badge>{item.status}</Badge>
              <Button size="sm" variant="outline">فتح</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const SettingsTab = () => (
  <div className="space-y-6">
    <SectionHeading title="إعدادات النظام" subtitle="مفاتيح التحكم العليا للمنصة: عمولات، حدود، وسياسات تشغيل." actionLabel="حفظ التعديلات" />
    <div className="grid gap-4 xl:grid-cols-2">
      {settingsSeed.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm text-slate-500">{item.description}</p>
              </div>
              <Badge tone="rose">{item.value}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const pageMeta = {
  dashboard: { title: 'لوحة التحكم', subtitle: 'متابعة الأداء والإشراف الكامل على التطبيق' },
  users: { title: 'المستخدمون', subtitle: 'إدارة العملاء والحسابات والمحافظ' },
  vendors: { title: 'البائعون', subtitle: 'الاعتمادات والامتثال وجودة المتاجر' },
  orders: { title: 'الطلبات', subtitle: 'سير التنفيذ ومتابعة الحالات التشغيلية' },
  content: { title: 'المحتوى والخدمات', subtitle: 'العروض والتصنيفات والخدمات الرئيسية' },
  finance: { title: 'المالية', subtitle: 'التسويات والعمولات والتحكم المالي' },
  support: { title: 'الدعم والامتثال', subtitle: 'الشكاوى والتذاكر والتصعيدات' },
  settings: { title: 'إعدادات النظام', subtitle: 'سياسات المنصة والتحكم العام' },
};

// Login Screen Component
const AdminLoginScreen = ({ phone, setPhone, onLogin, loading, error }) => {
  const [localError, setLocalError] = useState('');

  const handleSendOTP = async () => {
    if (!phone.trim() || !/^05[0-9]{8}$/.test(phone)) {
      setLocalError('أدخل رقم جوال سعودي صحيح (يبدأ بـ 05)');
      return;
    }
    setLocalError('');
    await onLogin();
  };

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-rose-50/30 to-slate-50 p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info Side */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-400">TATX SuperAdmin</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">بوابة المشرف الرئيسي</h1>
            <p className="mt-5 text-sm leading-8 text-white/70">
              لوحة التحكم الرئيسية لإدارة تطبيق تاتكس بالكامل.
            </p>
            
            <div className="mt-8 grid gap-4">
              {[
                ['إدارة المستخدمين', 'التحكم في حسابات العملاء والبائعين'],
                ['متابعة الطلبات', 'عرض جميع الطلبات وتحديث حالتها'],
                ['إدارة المحتوى', 'تحديث المحتوى والإعدادات العامة'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 text-xs text-white/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
        </Card>

        {/* Login Form */}
        <Card className="flex flex-col justify-center p-8">
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-3xl font-black text-slate-950">دخول المشرف</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">أدخل رقم الجوال المسجل كمشرف عام</p>
            
            <div className="mt-8 space-y-4">
              <Input 
                label="رقم الجوال" 
                placeholder="05xxxxxxxx" 
                value={phone} 
                onChange={(e) => {
                  setPhone(e.target.value);
                  setLocalError('');
                }}
                icon={Phone}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
              />
              
              {error && (
                <div className="rounded-2xl bg-error-50 px-4 py-3 text-sm text-error-700">
                  {error}
                </div>
              )}
              
              <Button className="w-full" onClick={handleSendOTP} disabled={loading || !phone.trim()} icon={Phone}>
                {loading ? 'جارٍ الإرسال...' : 'إرسال رمز التحقق'}
              </Button>
              
              <div className="text-center text-xs text-slate-400 mt-4">
                جرب: 0555000003 (حساب مشرف)
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// OTP Verification Screen
const AdminOTPScreen = ({ phone, otpCode, setOtpCode, onVerify, verifying, onBack }) => {
  const [localError, setLocalError] = useState('');
  const inputRefs = useRef([]);

  const handleVerifyOTP = () => {
    if (!otpCode || otpCode.length !== 4) {
      setLocalError('أدخل رمز التحقق المكون من 4 أرقام');
      return;
    }
    setLocalError('');
    onVerify();
  };

  const handleCodeChange = (value, index) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = otpCode.split('');
    newCode[index] = value;
    setOtpCode(newCode.join(''));
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-rose-50/30 to-slate-50 p-6">
      <Card className="max-w-md w-full">
        <div className="p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-success-100 text-success-600 mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-black text-center text-slate-950">رمز التحقق</h2>
          <p className="mt-3 text-sm text-center leading-7 text-slate-500">
            أدخل رمز التحقق المرسل إلى {phone}
          </p>
          <p className="mt-2 text-xs text-center text-primary-600 font-bold">
            رمز الاختبار: 1234
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength={1}
                  value={otpCode[index] || ''}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className="input w-14 h-16 text-center text-2xl font-bold"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            
            {localError && (
              <div className="rounded-2xl bg-error-50 px-4 py-3 text-sm text-error-700 text-center">
                {localError}
              </div>
            )}
            
            <Button className="w-full" onClick={handleVerifyOTP} disabled={verifying}>
              {verifying ? 'جارٍ التحقق...' : 'تأكيد'}
            </Button>
            
            <Button variant="ghost" className="w-full" onClick={onBack}>
              تغيير رقم الجوال
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const App = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authStep, setAuthStep] = useState('login'); // 'login', 'otp'
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // App state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Handle OTP request
  const handleRequestOTP = async () => {
    setAuthLoading(true);
    setAuthError('');
    
    const { data, error } = await requestAdminOTP(phone);
    
    setAuthLoading(false);
    
    if (error) {
      setAuthError(error.message);
      return;
    }
    
    console.log('✅ OTP sent:', data.code);
    setAuthStep('otp');
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    setAuthLoading(true);
    setAuthError('');
    
    const { data, error } = await verifyAdminOTP(phone, otpCode);
    
    setAuthLoading(false);
    
    if (error) {
      setAuthError(error.message);
      return;
    }
    
    console.log('✅ Admin authenticated:', data.user);
    setAdminUser(data.user);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    setAuthStep('login');
    setPhone('');
    setOtpCode('');
    setAuthError('');
  };

  // Show login screen
  if (!isAuthenticated) {
    if (authStep === 'otp') {
      return (
        <AdminOTPScreen
          phone={phone}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          onVerify={handleVerifyOTP}
          verifying={authLoading}
          onBack={() => {
            setAuthStep('login');
            setOtpCode('');
            setAuthError('');
          }}
        />
      );
    }
    
    return (
      <AdminLoginScreen
        phone={phone}
        setPhone={setPhone}
        onLogin={handleRequestOTP}
        loading={authLoading}
        error={authError}
      />
    );
  }

  const currentMeta = pageMeta[activeTab] || pageMeta.dashboard;

  return (
    <div dir="rtl" className="min-h-screen bg-[radial-gradient(circle_at_top_right,#ffe7ef_0%,#fff8fb_20%,#f8fafc_56%,#ffffff_100%)] text-right">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="lg:pr-[310px]">
        <Header onMenuClick={() => setSidebarOpen(true)} search={search} setSearch={setSearch} title={currentMeta.title} adminUser={adminUser} onLogout={handleLogout} />

        <main className="px-4 py-6 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_30px_80px_-50px_rgba(244,63,94,0.5)] backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">TATX Platform Control</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">{currentMeta.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">{currentMeta.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white">
                <p className="text-xs text-white/60">السوق</p>
                <p className="mt-1 font-bold">{appSummary.market}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-slate-400">التوفر</p>
                <p className="mt-1 font-bold text-slate-900">{appSummary.uptime}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-slate-400">خدمات نشطة</p>
                <p className="mt-1 font-bold text-slate-900">{appSummary.activeServices}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-slate-400">اعتمادات</p>
                <p className="mt-1 font-bold text-slate-900">{appSummary.pendingApprovals}</p>
              </div>
            </div>
          </div>

          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'users' && <UsersTab search={search} />}
          {activeTab === 'vendors' && <VendorsTab search={search} />}
          {activeTab === 'orders' && <OrdersTab search={search} />}
          {activeTab === 'content' && <ContentTab search={search} />}
          {activeTab === 'finance' && <FinanceTab />}
          {activeTab === 'support' && <SupportTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
