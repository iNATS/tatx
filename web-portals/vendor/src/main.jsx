import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Bell,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Phone,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Store,
  Wallet,
  X,
  TrendingUp,
  Users,
  Star,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  Eye,
} from 'lucide-react';
import './index.css';

// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

// API Helpers
const getHeaders = (extra = {}) => ({
  apikey: supabaseAnonKey,
  Authorization: `Bearer ` + supabaseAnonKey,
  'Content-Type': 'application/json',
  ...extra,
});

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
};

const fetchVendorPortalData = async (phone) => {
  if (!hasSupabaseConfig) {
    return {
      application: { status: 'pending', phone },
      profile: null,
      services: [],
      orders: [],
    };
  }

  const [application] = await fetchJson(
    `${supabaseUrl}/rest/v1/vendor_applications?select=*&phone=eq.${encodeURIComponent(phone)}&order=created_at.desc&limit=1`
  );

  let profile = null;
  let services = [];
  let orders = [];

  if (application?.status === 'approved') {
    [profile] = await fetchJson(
      `${supabaseUrl}/rest/v1/vendor_profiles?select=*&phone=eq.${encodeURIComponent(phone)}&limit=1`
    );

    if (profile?.id) {
      services = await fetchJson(
        `${supabaseUrl}/rest/v1/vendor_services?select=*&vendor_id=eq.${profile.id}&order=created_at.desc`
      );
    }

    if (profile?.store_name) {
      orders = await fetchJson(
        `${supabaseUrl}/rest/v1/customer_orders?select=*&vendor_name=eq.${encodeURIComponent(profile.store_name)}&order=created_at.desc`
      );
    }
  }

  return { application, profile, services, orders };
};

const upsertVendorService = async (service) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/vendor_services${service.id ? `?id=eq.${service.id}` : ''}`,
    {
      method: service.id ? 'PATCH' : 'POST',
      headers: getHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify(service.id ? service : [service]),
    }
  );

  if (!response.ok) {
    throw new Error(`Service save failed (${response.status})`);
  }

  const result = await response.json();
  return service.id ? result[0] || service : result[0];
};

const removeVendorService = async (id) => {
  const response = await fetch(`${supabaseUrl}/rest/v1/vendor_services?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Service delete failed (${response.status})`);
  }
};

// Modern UI Components
const Card = ({ children, className = '', hover = false }) => (
  <div className={`card ${hover ? 'transition-all hover:shadow-glow hover:-translate-y-1' : ''} ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', size = 'md', className = '', icon: Icon, ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    success: 'inline-flex items-center justify-center gap-2 rounded-2xl bg-success-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-success-500/30 transition-all hover:bg-success-600 hover:shadow-xl active:scale-95 disabled:opacity-50',
    danger: 'inline-flex items-center justify-center gap-2 rounded-2xl bg-error-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-error-500/30 transition-all hover:bg-error-600 hover:shadow-xl active:scale-95 disabled:opacity-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button className={`${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'slate' }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    slate: 'badge-slate',
    primary: 'badge bg-primary-100 text-primary-700',
  };

  return <span className={variants[variant]}>{children}</span>;
};

const Input = ({ label, error, icon: Icon, className = '', ...props }) => (
  <label className={`block ${className}`}>
    {label && <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>}
    <div className="relative">
      {Icon && (
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <input
        className={`input ${Icon ? 'pr-11' : ''} ${error ? 'border-error-300 focus:border-error-300 focus:ring-error-100' : ''}`}
        {...props}
      />
    </div>
    {error && <span className="mt-1 block text-xs text-error-600">{error}</span>}
  </label>
);

const StatCard = ({ title, value, note, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-3 text-4xl font-black text-slate-950">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className={`h-4 w-4 ${trend === 'up' ? 'text-success-500' : 'text-error-500'}`} />
              <span className={`text-xs font-bold ${trend === 'up' ? 'text-success-600' : 'text-error-600'}`}>
                {trendValue}
              </span>
            </div>
          )}
          {note && <p className="mt-2 text-xs text-slate-400">{note}</p>}
        </div>
        <div className={`rounded-3xl p-4 ${colors[color]}`}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </Card>
  );
};

const ServiceCard = ({ service, onEdit, onDelete }) => (
  <Card hover className="group">
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-950">{service.title}</h3>
            <Badge variant={service.is_active ? 'success' : 'warning'}>
              {service.is_active ? 'نشط' : 'موقوف'}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">{service.description || 'بدون وصف'}</p>
        </div>
        {service.image_url && (
          <img src={service.image_url} alt={service.title} className="h-20 w-20 rounded-2xl object-cover shadow-md" />
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="text-xs text-slate-400">السعر</div>
          <div className="mt-1 font-bold text-slate-950">{service.price} ر.س</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="text-xs text-slate-400">المخزون</div>
          <div className="mt-1 font-bold text-slate-950">{service.inventory_count}</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="text-xs text-slate-400">التصنيف</div>
          <div className="mt-1 font-bold text-slate-950">{service.category || 'غير محدد'}</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="text-xs text-slate-400">التجهيز</div>
          <div className="mt-1 font-bold text-slate-950">{service.preparation_time_minutes} دقيقة</div>
        </div>
      </div>

      <div className="mt-5 flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="secondary" size="sm" className="flex-1" icon={Edit2} onClick={() => onEdit(service)}>
          تعديل
        </Button>
        <Button variant="danger" size="sm" className="flex-1" icon={Trash2} onClick={() => onDelete(service.id)}>
          حذف
        </Button>
      </div>
    </div>
  </Card>
);

const OrderRow = ({ order }) => (
  <tr className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
    <td className="px-4 py-4 font-bold text-slate-900">{order.order_number}</td>
    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <Users className="h-4 w-4" />
        </div>
        <span className="font-semibold">{order.customer_name || 'عميل التطبيق'}</span>
      </div>
    </td>
    <td className="px-4 py-4">
      <div className="font-bold text-slate-950">{order.total} ر.س</div>
      {order.discount > 0 && <div className="text-xs text-error-600">خصم: {order.discount} ر.س</div>}
    </td>
    <td className="px-4 py-4">
      <Badge variant={order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'slate'}>
        {order.status === 'completed' ? 'مكتمل' : order.status === 'pending' ? 'قيد الانتظار' : order.status}
      </Badge>
    </td>
    <td className="px-4 py-4 text-slate-500">
      {order.created_at ? new Date(order.created_at).toLocaleString('ar-SA') : '-'}
    </td>
    <td className="px-4 py-4">
      <Button variant="ghost" size="sm" icon={Eye}>
        عرض
      </Button>
    </td>
  </tr>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h3 className="text-xl font-bold text-slate-950">{title}</h3>
          <button onClick={onClose} className="rounded-2xl p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </Card>
    </div>
  );
};

const ServiceModal = ({ service, isOpen, onClose, onSave, vendorId }) => {
  const [form, setForm] = useState(
    service || {
      title: '',
      description: '',
      category: '',
      price: '',
      compare_price: '',
      image_url: '',
      inventory_count: 0,
      preparation_time_minutes: 20,
      is_active: true,
      vendor_id: vendorId,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError('');
      await onSave({
        ...form,
        price: Number(form.price || 0),
        compare_price: form.compare_price ? Number(form.compare_price) : null,
        inventory_count: Number(form.inventory_count || 0),
        preparation_time_minutes: Number(form.preparation_time_minutes || 20),
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="اسم الخدمة" value={form.title} onChange={(e) => updateField('title', e.target.value)} placeholder="مثال: برجر دبل" />
        <Input label="التصنيف" value={form.category} onChange={(e) => updateField('category', e.target.value)} placeholder="مثال: مطاعم" />
        <Input label="السعر" type="number" value={form.price} onChange={(e) => updateField('price', e.target.value)} placeholder="0" />
        <Input label="السعر قبل الخصم" type="number" value={form.compare_price || ''} onChange={(e) => updateField('compare_price', e.target.value)} placeholder="0" />
        <Input label="رابط الصورة" value={form.image_url || ''} onChange={(e) => updateField('image_url', e.target.value)} placeholder="https://..." />
        <Input label="المخزون" type="number" value={form.inventory_count} onChange={(e) => updateField('inventory_count', e.target.value)} placeholder="0" />
        <Input label="وقت التجهيز (دقائق)" type="number" value={form.preparation_time_minutes} onChange={(e) => updateField('preparation_time_minutes', e.target.value)} placeholder="20" />
        
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
          <input type="checkbox" checked={form.is_active} onChange={(e) => updateField('is_active', e.target.checked)} className="h-4 w-4" />
          الخدمة نشطة
        </label>
        
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-bold text-slate-700">الوصف</span>
          <textarea
            className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
            value={form.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="اكتب وصف الخدمة..."
          />
        </label>
        
        {error && (
          <div className="md:col-span-2 rounded-2xl bg-error-50 px-4 py-3 text-sm text-error-700">
            {error}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
        <Button variant="secondary" onClick={onClose}>إلغاء</Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? 'جارٍ الحفظ...' : 'حفظ الخدمة'}
        </Button>
      </div>
    </Modal>
  );
};

// Login Screen Component
const LoginScreen = ({ phone, setPhone, onLogin, loading, error }) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-rose-50/30 to-slate-50 p-6" dir="rtl">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Side - Info */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-8 text-white shadow-2xl">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary-100">Tatx SA Vendor</p>
          <h1 className="mt-4 text-5xl font-black leading-tight">بوابة البائع</h1>
          <p className="mt-5 text-sm leading-8 text-white/80">
            من هنا يراجع البائع حالة الطلب القادم من تطبيق Expo، وبعد الموافقة يدير خدماته وأسعاره وتوفره وطلباته من مكان واحد.
          </p>
          
          <div className="mt-8 grid gap-4">
            {[
              ['إدارة الخدمات', 'إضافة وتعديل الخدمات والمنتجات'],
              ['متابعة الطلبات', 'عرض الطلبات الواردة وتحديث حالتها'],
              ['تحليل المبيعات', 'تقارير شاملة عن أداء متجرك'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-xs text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
      </Card>

      {/* Right Side - Login Form */}
      <Card className="flex flex-col justify-center p-8">
        <div>
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-100 text-primary-600">
            <Store className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-950">دخول البائع</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">أدخل رقم الجوال المستخدم في تسجيل الدخول</p>
          
          <div className="mt-8 space-y-4">
            <Input 
              label="رقم الجوال" 
              placeholder="05xxxxxxxx" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              icon={Phone}
            />
            
            {error && (
              <div className="rounded-2xl bg-error-50 px-4 py-3 text-sm text-error-700">
                {error}
              </div>
            )}
            
            <Button className="w-full" onClick={onLogin} disabled={loading || !phone.trim()} icon={Phone}>
              {loading ? 'جارٍ التحقق...' : 'التحقق من الحساب'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

// Main App Component
const VendorPortal = () => {
  const [phone, setPhone] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({ application: null, profile: null, services: [], orders: [] });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await fetchVendorPortalData(phone);
      setData(result);
      
      if (result.application?.status === 'approved') {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = async (service) => {
    const saved = await upsertVendorService(service);
    setData((prev) => ({
      ...prev,
      services: prev.services.some((s) => s.id === saved.id)
        ? prev.services.map((s) => (s.id === saved.id ? saved : s))
        : [saved, ...prev.services],
    }));
  };

  const handleDeleteService = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      await removeVendorService(id);
      setData((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s.id !== id),
      }));
    }
  };

  // Render pending or approved state
  if (isAuthenticated && data.profile) {
    const activeServices = data.services.filter((s) => s.is_active).length;
    const totalSales = data.orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-slate-50" dir="rtl">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 right-0 z-40 w-72 transform border-l border-white/60 bg-gradient-to-b from-white via-rose-50/50 to-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-primary-100 px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                  <Store className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-950">{data.profile.store_name || 'بوابة البائع'}</p>
                  <p className="text-xs text-slate-400">Vendor Portal</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-6">
              {[
                { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
                { id: 'services', label: 'الخدمات', icon: Package },
                { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
                { id: 'settings', label: 'الإعدادات', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-right transition-all ${
                      active
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'text-slate-600 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className={`rounded-2xl p-2 ${active ? 'bg-white/20' : 'bg-primary-100 text-primary-600'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-slate-100 p-5">
              <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100/50 p-4">
                <div className="font-bold text-slate-950">{data.profile.owner_name}</div>
                <div className="mt-1 text-sm text-slate-500">{data.profile.phone}</div>
                <button onClick={() => setIsAuthenticated(false)} className="mt-3 flex items-center gap-2 text-xs font-bold text-error-600 hover:text-error-700">
                  <LogOut className="h-3 w-3" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:pr-72">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div className="relative hidden md:block">
                  <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input className="h-12 w-80 rounded-2xl border border-slate-200 bg-white pr-11 pl-4 text-sm outline-none focus:border-primary-300 focus:ring-4 focus:ring-primary-100" placeholder="ابحث..." />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="primary">{phone}</Badge>
                <Button variant="ghost" icon={Bell} />
                <Button variant="ghost" icon={LogOut} onClick={() => setIsAuthenticated(false)} />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard title="الخدمات النشطة" value={activeServices} note="المعروضة الآن" icon={Package} trend="up" trendValue="+2 هذا الأسبوع" color="success" />
                  <StatCard title="إجمالي الخدمات" value={data.services.length} note="قابلة للإدارة" icon={Store} color="primary" />
                  <StatCard title="الطلبات" value={data.orders.length} note="كل الطلبات" icon={ShoppingBag} trend="up" trendValue="+12% هذا الشهر" color="warning" />
                  <StatCard title="المبيعات" value={`${totalSales.toFixed(0)} ر.س`} note="إجمالي المبيعات" icon={Wallet} trend="up" trendValue="+25% هذا الأسبوع" color="success" />
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                  <Card className="xl:col-span-2">
                    <div className="border-b border-slate-100 px-6 py-5">
                      <h3 className="text-lg font-bold text-slate-950">آخر الخدمات</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {data.services.slice(0, 5).map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                          <div className="flex items-center gap-4">
                            {service.image_url ? (
                              <img src={service.image_url} alt={service.title} className="h-12 w-12 rounded-xl object-cover" />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                <Package className="h-5 w-5" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-slate-950">{service.title}</div>
                              <div className="text-xs text-slate-400">{service.category} • {service.inventory_count} بالمخزون</div>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-slate-950">{service.price} ر.س</div>
                            <Badge variant={service.is_active ? 'success' : 'warning'}>{service.is_active ? 'نشط' : 'موقوف'}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <div className="border-b border-slate-100 px-6 py-5">
                      <h3 className="text-lg font-bold text-slate-950">حالة الحساب</h3>
                    </div>
                    <div className="space-y-3 p-6">
                      <div className="rounded-3xl bg-success-50 p-4 text-success-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          <div className="font-bold">الحساب معتمد</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-400">المتجر</div>
                        <div className="mt-1 font-bold text-slate-950">{data.profile.store_name}</div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-400">المدينة</div>
                        <div className="mt-1 font-bold text-slate-950">{data.profile.city}</div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-400">العمولة</div>
                        <div className="mt-1 font-bold text-slate-950">{data.profile.commission_rate}%</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">إدارة الخدمات</h2>
                    <p className="mt-1 text-sm text-slate-500">أضف وعدّل الخدمات المعروضة للعملاء</p>
                  </div>
                  <Button icon={Plus} onClick={() => { setEditingService(null); setServiceModalOpen(true); }}>
                    إضافة خدمة
                  </Button>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  {data.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onEdit={(s) => { setEditingService(s); setServiceModalOpen(true); }}
                      onDelete={handleDeleteService}
                    />
                  ))}
                </div>

                {data.services.length === 0 && (
                  <Card>
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-100 text-primary-600">
                        <Package className="h-10 w-10" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-slate-950">لا توجد خدمات بعد</h3>
                      <p className="mt-2 text-sm text-slate-500">ابدأ بإضافة أول خدمة لمتجرك</p>
                      <Button className="mt-6" icon={Plus} onClick={() => { setEditingService(null); setServiceModalOpen(true); }}>
                        إضافة خدمة
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <Card>
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950">الطلبات</h2>
                      <p className="mt-1 text-sm text-slate-500">جميع الطلبات المرتبطة بمتجرك</p>
                    </div>
                    <Button variant="secondary" icon={Filter}>تصفية</Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-right text-xs font-bold uppercase text-slate-400">
                        <th className="px-4 py-3 first:pr-0">رقم الطلب</th>
                        <th className="px-4 py-3">العميل</th>
                        <th className="px-4 py-3">الإجمالي</th>
                        <th className="px-4 py-3">الحالة</th>
                        <th className="px-4 py-3">الوقت</th>
                        <th className="px-4 py-3 last:pl-0">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                      ))}
                    </tbody>
                  </table>
                  {data.orders.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                        <ShoppingBag className="h-10 w-10" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-slate-950">لا توجد طلبات بعد</h3>
                      <p className="mt-2 text-sm text-slate-500">ستظهر الطلبات هنا عند بدء استقبالها</p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card>
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-2xl font-black text-slate-950">إعدادات المتجر</h2>
                </div>
                <div className="p-6">
                  <div className="rounded-3xl bg-primary-50 p-6 text-center">
                    <Settings className="mx-auto h-16 w-16 text-primary-500" />
                    <h3 className="mt-4 text-xl font-bold text-slate-950">قريباً</h3>
                    <p className="mt-2 text-sm text-slate-500">سيتم إضافة إعدادات المتجر قريباً</p>
                  </div>
                </div>
              </Card>
            )}
          </main>
        </div>

        {/* Service Modal */}
        <ServiceModal
          service={editingService}
          isOpen={serviceModalOpen}
          onClose={() => setServiceModalOpen(false)}
          onSave={handleSaveService}
          vendorId={data.profile.id}
        />
      </div>
    );
  }

  // Show pending state
  if (data.application && data.application.status !== 'approved') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-amber-50/30 to-slate-50 p-6" dir="rtl">
        <Card className="max-w-2xl text-center">
          <div className="p-8">
            <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] ${data.application.status === 'rejected' ? 'bg-error-100 text-error-600' : 'bg-warning-100 text-warning-600'}`}>
              {data.application.status === 'rejected' ? <X className="h-9 w-9" /> : <Clock3 className="h-9 w-9" />}
            </div>
            <h1 className="mt-6 text-3xl font-black text-slate-950">
              {data.application.status === 'rejected' ? 'الطلب يحتاج تحديث' : 'تحت المراجعة'}
            </h1>
            <p className="mt-4 text-sm leading-8 text-slate-500">
              {data.application.status === 'rejected'
                ? 'راجع ملاحظات المشرف ثم عد إلى التطبيق لتحديث الطلب.'
                : 'سيتم فتح البوابة فور اعتماد المشرف لطلبك.'}
            </p>
            {data.application.review_notes && (
              <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-right">
                <div className="text-sm font-bold text-slate-950">ملاحظة المشرف</div>
                <div className="mt-2 text-sm leading-7 text-slate-500">{data.application.review_notes}</div>
              </div>
            )}
            <div className="mt-8 flex justify-center gap-3">
              <Button variant="secondary" onClick={() => setIsAuthenticated(false)} icon={LogOut}>خروج</Button>
              <Button onClick={handleLogin} icon={Clock3}>تحديث الحالة</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show login screen
  return <LoginScreen phone={phone} setPhone={setPhone} onLogin={handleLogin} loading={loading} error={error} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VendorPortal />
  </React.StrictMode>
);
