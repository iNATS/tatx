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
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

const getHeaders = (extra = {}) => ({
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
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

const Card = ({ children, className = '' }) => (
  <section className={`rounded-[28px] border border-white/70 bg-white/95 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.28)] ${className}`}>
    {children}
  </section>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-slate-950 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    soft: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, tone = 'slate' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    amber: 'bg-amber-100 text-amber-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    rose: 'bg-rose-100 text-rose-700',
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
};

const StatCard = ({ title, value, note, icon: Icon, tone }) => (
  <Card>
    <div className="flex items-start justify-between gap-4 p-6">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
        <p className="mt-2 text-xs text-slate-400">{note}</p>
      </div>
      <div className={`rounded-3xl p-4 ${tone}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </Card>
);

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
    <input
      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
      {...props}
    />
  </label>
);

const ServiceModal = ({ service, onClose, onSave, vendorId }) => {
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
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setErrorMessage('');
      await onSave({
        ...form,
        price: Number(form.price || 0),
        compare_price: form.compare_price ? Number(form.compare_price) : null,
        inventory_count: Number(form.inventory_count || 0),
        preparation_time_minutes: Number(form.preparation_time_minutes || 20),
      });
    } catch (error) {
      setErrorMessage(error.message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h3 className="text-xl font-bold text-slate-950">{service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h3>
          <button onClick={onClose} className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          <Input label="اسم الخدمة" value={form.title} onChange={(event) => updateField('title', event.target.value)} />
          <Input label="التصنيف" value={form.category} onChange={(event) => updateField('category', event.target.value)} />
          <Input label="السعر" type="number" value={form.price} onChange={(event) => updateField('price', event.target.value)} />
          <Input label="السعر قبل الخصم" type="number" value={form.compare_price || ''} onChange={(event) => updateField('compare_price', event.target.value)} />
          <Input label="رابط الصورة" value={form.image_url || ''} onChange={(event) => updateField('image_url', event.target.value)} />
          <Input label="المخزون" type="number" value={form.inventory_count} onChange={(event) => updateField('inventory_count', event.target.value)} />
          <Input label="وقت التجهيز بالدقائق" type="number" value={form.preparation_time_minutes} onChange={(event) => updateField('preparation_time_minutes', event.target.value)} />
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={form.is_active} onChange={(event) => updateField('is_active', event.target.checked)} />
            الخدمة نشطة
          </label>
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">الوصف</span>
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              value={form.description || ''}
              onChange={(event) => updateField('description', event.target.value)}
            />
          </label>
          {errorMessage ? <div className="md:col-span-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</div> : null}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={saving}>{saving ? 'جارٍ الحفظ...' : 'حفظ الخدمة'}</Button>
        </div>
      </Card>
    </div>
  );
};

const LoginScreen = ({ phone, setPhone, onLogin, loading, errorMessage }) => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#ffe7ef_0%,#fff8fb_20%,#f8fafc_56%,#ffffff_100%)] px-6 py-10" dir="rtl">
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[36px] border border-white/60 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_48%,#881337_100%)] p-8 text-white shadow-[0_35px_90px_-55px_rgba(15,23,42,0.7)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">Tatx SA Vendor</p>
          <h1 className="mt-4 text-5xl font-black leading-[1.1]">بوابة البائع بعد اعتماد المشرف العام</h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-white/75">
            من هنا يراجع البائع حالة الطلب القادم من تطبيق Expo، وبعد الموافقة يدير خدماته وأسعاره وتوفره وطلباته من مكان واحد.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['مراجعة مباشرة', 'كل طلب انضمام يصل من التطبيق ينتظر موافقة المشرف العام قبل التفعيل.'],
              ['إدارة الخدمات', 'إضافة وتعديل الخدمات والمنتجات وربطها بالحساب المعتمد.'],
              ['متابعة الطلبات', 'عرض الطلبات الواردة المرتبطة باسم المتجر المعتمد.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl bg-white/10 p-4">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="self-center">
          <div className="p-8">
            <h2 className="text-2xl font-black text-slate-950">دخول البائع</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">أدخل رقم الجوال نفسه المستخدم في طلب الانضمام من التطبيق.</p>
            <div className="mt-6 space-y-4">
              <Input label="رقم الجوال" placeholder="05xxxxxxxx" value={phone} onChange={(event) => setPhone(event.target.value)} />
              {errorMessage ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</div> : null}
              <Button className="w-full" onClick={onLogin} disabled={loading || !phone.trim()}>
                <Phone className="h-4 w-4" />
                {loading ? 'جارٍ التحقق...' : 'التحقق من حالة الحساب'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const PendingScreen = ({ application, onRefresh, onLogout, loading }) => {
  const isRejected = application?.status === 'rejected';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#fff4e6_0%,#fffaf5_26%,#f8fafc_100%)] px-6 py-10" dir="rtl">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <div className="p-8 text-center">
            <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] ${isRejected ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
              {isRejected ? <X className="h-9 w-9" /> : <Clock3 className="h-9 w-9" />}
            </div>
            <h1 className="mt-6 text-3xl font-black text-slate-950">
              {isRejected ? 'الطلب يحتاج تحديثاً قبل التفعيل' : 'طلب الانضمام ما زال تحت المراجعة'}
            </h1>
            <p className="mt-4 text-sm leading-8 text-slate-500">
              {isRejected
                ? 'راجع ملاحظات المشرف العام ثم عد إلى تطبيق Expo لتحديث الطلب وإرساله من جديد.'
                : 'سيتم فتح بوابة البائع بالكامل فور اعتماد المشرف العام للطلب القادم من التطبيق.'}
            </p>
            {application?.review_notes ? (
              <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-right">
                <div className="text-sm font-bold text-slate-950">ملاحظة المشرف العام</div>
                <div className="mt-2 text-sm leading-7 text-slate-500">{application.review_notes}</div>
              </div>
            ) : null}
            <div className="mt-8 flex justify-center gap-3">
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                خروج
              </Button>
              <Button onClick={onRefresh}>{loading ? 'جارٍ التحديث...' : 'تحديث الحالة'}</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, profile }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'services', label: 'الخدمات', icon: Package },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'settings', label: 'إعدادات النشاط', icon: Settings },
  ];

  return (
    <>
      {sidebarOpen ? <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setSidebarOpen(false)} /> : null}
      <aside className={`fixed inset-y-0 right-0 z-50 w-[310px] border-l border-white/60 bg-[linear-gradient(180deg,#fff7f9_0%,#ffffff_48%,#fff8fb_100%)] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-rose-100/70 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-950">{profile?.store_name || 'بوابة البائع'}</p>
                <p className="text-xs text-slate-400">Vendor Control</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="rounded-2xl p-2 text-slate-500 hover:bg-white lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`mb-2 flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-right transition ${active ? 'bg-slate-950 text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-white'}`}
                >
                  <div className={`rounded-2xl p-2 ${active ? 'bg-white/10 text-white' : 'bg-rose-50 text-rose-500'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold">{item.label}</div>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-5 text-sm text-slate-500">
            <div className="font-semibold text-slate-900">{profile?.owner_name}</div>
            <div className="mt-1">{profile?.phone}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ setSidebarOpen, phone, onLogout }) => (
  <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
    <div className="flex items-center justify-between px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="h-12 w-80 rounded-2xl border border-slate-200 bg-white pr-11 pl-4 text-sm outline-none" placeholder="ابحث داخل البوابة" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="hidden md:inline-flex">{phone}</Button>
        <Button variant="outline"><Bell className="h-4 w-4" /></Button>
        <Button variant="ghost" onClick={onLogout}><LogOut className="h-4 w-4" /></Button>
      </div>
    </div>
  </header>
);

const DashboardTab = ({ profile, services, orders }) => {
  const activeServices = services.filter((service) => service.is_active).length;
  const todaySales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="الخدمات النشطة" value={activeServices} note="المعروضة الآن في المنصة" icon={Package} tone="bg-emerald-100 text-emerald-700" />
        <StatCard title="إجمالي الخدمات" value={services.length} note="خدماتك القابلة للإدارة" icon={Store} tone="bg-sky-100 text-sky-700" />
        <StatCard title="إجمالي الطلبات" value={orders.length} note="مرتبطة باسم المتجر الحالي" icon={ShoppingBag} tone="bg-amber-100 text-amber-700" />
        <StatCard title="إجمالي المبيعات" value={`${todaySales.toFixed(0)} ر.س`} note="من الطلبات المسجلة حالياً" icon={Wallet} tone="bg-rose-100 text-rose-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="border-b border-slate-100 px-6 py-5">
            <h3 className="text-lg font-bold text-slate-950">آخر الخدمات المضافة</h3>
          </div>
          <div className="space-y-3 p-6">
            {services.length ? services.slice(0, 5).map((service) => (
              <div key={service.id} className="flex items-center justify-between rounded-3xl border border-slate-100 p-4">
                <div>
                  <div className="font-semibold text-slate-950">{service.title}</div>
                  <div className="mt-1 text-xs text-slate-400">{service.category || 'بدون تصنيف'} • {service.inventory_count} بالمخزون</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-950">{service.price} ر.س</div>
                  <Badge tone={service.is_active ? 'emerald' : 'amber'}>{service.is_active ? 'نشط' : 'موقوف'}</Badge>
                </div>
              </div>
            )) : <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">لا توجد خدمات بعد. أضف أول خدمة من تبويب الخدمات.</div>}
          </div>
        </Card>

        <Card>
          <div className="border-b border-slate-100 px-6 py-5">
            <h3 className="text-lg font-bold text-slate-950">حالة الحساب</h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-700">
              <div className="font-bold">الحساب معتمد</div>
              <div className="mt-2 text-sm leading-7">يمكنك الآن إدارة خدمات {profile?.store_name} وتحديث الأسعار والتوافر.</div>
            </div>
            <div className="rounded-3xl border border-slate-100 p-4">
              <div className="text-xs text-slate-400">المالك</div>
              <div className="mt-2 font-semibold text-slate-950">{profile?.owner_name}</div>
            </div>
            <div className="rounded-3xl border border-slate-100 p-4">
              <div className="text-xs text-slate-400">المدينة</div>
              <div className="mt-2 font-semibold text-slate-950">{profile?.city}</div>
            </div>
            <div className="rounded-3xl border border-slate-100 p-4">
              <div className="text-xs text-slate-400">نسبة العمولة</div>
              <div className="mt-2 font-semibold text-slate-950">{profile?.commission_rate}%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ServicesTab = ({ services, onCreate, onEdit, onDelete }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-black text-slate-950">إدارة الخدمات</h2>
        <p className="mt-1 text-sm text-slate-500">أضف وعدّل الخدمات التي تظهر للعملاء بعد اعتماد الحساب.</p>
      </div>
      <Button onClick={onCreate}>
        <Plus className="h-4 w-4" />
        إضافة خدمة
      </Button>
    </div>

    <div className="grid gap-4 xl:grid-cols-2">
      {services.map((service) => (
        <Card key={service.id}>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-slate-950">{service.title}</div>
                <div className="mt-2 text-sm text-slate-500">{service.description || 'بدون وصف'}</div>
              </div>
              <Badge tone={service.is_active ? 'emerald' : 'amber'}>{service.is_active ? 'نشط' : 'موقوف'}</Badge>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">السعر</div><div className="mt-1 font-bold text-slate-950">{service.price} ر.س</div></div>
              <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">المخزون</div><div className="mt-1 font-bold text-slate-950">{service.inventory_count}</div></div>
              <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">التصنيف</div><div className="mt-1 font-bold text-slate-950">{service.category || 'غير محدد'}</div></div>
              <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">التجهيز</div><div className="mt-1 font-bold text-slate-950">{service.preparation_time_minutes} دقيقة</div></div>
            </div>

            <div className="mt-5 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => onEdit(service)}>تعديل</Button>
              <Button variant="danger" className="flex-1" onClick={() => onDelete(service.id)}>حذف</Button>
            </div>
          </div>
        </Card>
      ))}
      {!services.length ? <Card><div className="p-8 text-center text-sm text-slate-500">لا توجد خدمات حتى الآن.</div></Card> : null}
    </div>
  </div>
);

const OrdersTab = ({ orders }) => (
  <Card>
    <div className="border-b border-slate-100 px-6 py-5">
      <h2 className="text-2xl font-black text-slate-950">الطلبات</h2>
      <p className="mt-1 text-sm text-slate-500">الطلبات الحالية المرتبطة باسم المتجر داخل قاعدة البيانات.</p>
    </div>
    <div className="overflow-x-auto p-6">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-right text-xs font-semibold text-slate-400">
            <th className="px-4 py-3 first:pr-0">رقم الطلب</th>
            <th className="px-4 py-3">العميل</th>
            <th className="px-4 py-3">الإجمالي</th>
            <th className="px-4 py-3">الحالة</th>
            <th className="px-4 py-3 last:pl-0">الوقت</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-slate-50 text-slate-700">
              <td className="px-4 py-4 font-semibold text-slate-900 first:pr-0">{order.order_number}</td>
              <td className="px-4 py-4">{order.customer_name || 'عميل التطبيق'}</td>
              <td className="px-4 py-4 font-semibold">{order.total} ر.س</td>
              <td className="px-4 py-4"><Badge tone={order.status === 'completed' ? 'emerald' : order.status === 'pending' ? 'amber' : 'slate'}>{order.status}</Badge></td>
              <td className="px-4 py-4 last:pl-0">{order.created_at ? new Date(order.created_at).toLocaleString('ar-EG') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!orders.length ? <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">لا توجد طلبات مرتبطة بهذا المتجر حتى الآن.</div> : null}
    </div>
  </Card>
);

const SettingsTab = ({ profile }) => (
  <div className="grid gap-6 xl:grid-cols-2">
    <Card>
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-950">بيانات النشاط</h2>
      </div>
      <div className="space-y-4 p-6">
        {[
          ['اسم المتجر', profile?.store_name],
          ['المالك', profile?.owner_name],
          ['رقم الجوال', profile?.phone],
          ['البريد', profile?.email || 'غير مضاف'],
          ['النوع', profile?.category],
          ['المدينة', profile?.city],
          ['العنوان', profile?.address || 'غير مضاف'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs text-slate-400">{label}</div>
            <div className="mt-2 font-semibold text-slate-950">{value}</div>
          </div>
        ))}
      </div>
    </Card>

    <Card>
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-950">حالة الحساب</h2>
      </div>
      <div className="space-y-4 p-6">
        <div className="rounded-3xl bg-emerald-50 p-5 text-emerald-700">
          <div className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5" /> الحساب نشط</div>
          <div className="mt-2 text-sm leading-7">تم ربط هذا الحساب بطلب الانضمام المعتمد من المشرف العام.</div>
        </div>
        <div className="rounded-3xl border border-slate-100 p-5">
          <div className="text-xs text-slate-400">تم الإنشاء</div>
          <div className="mt-2 font-semibold text-slate-950">{profile?.created_at ? new Date(profile.created_at).toLocaleString('ar-EG') : '-'}</div>
        </div>
      </div>
    </Card>
  </div>
);

const PortalApp = ({ phone, setPhone, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [portalData, setPortalData] = useState({
    application: null,
    profile: null,
    services: [],
    orders: [],
  });
  const [editingService, setEditingService] = useState(null);

  const loadPortal = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await fetchVendorPortalData(phone);
      setPortalData(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortal();
  }, [phone]);

  const handleSaveService = async (service) => {
    const saved = await upsertVendorService(service);
    setPortalData((prev) => {
      const existing = prev.services.find((item) => item.id === saved.id);
      return {
        ...prev,
        services: existing
          ? prev.services.map((item) => (item.id === saved.id ? saved : item))
          : [saved, ...prev.services],
      };
    });
    setEditingService(null);
  };

  const handleDeleteService = async (id) => {
    await removeVendorService(id);
    setPortalData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
  };

  if (loading) {
    return <PendingScreen application={{ status: 'pending' }} onRefresh={loadPortal} onLogout={onLogout} loading />;
  }

  if (errorMessage) {
    return <PendingScreen application={{ status: 'rejected', review_notes: errorMessage }} onRefresh={loadPortal} onLogout={onLogout} />;
  }

  if (!portalData.application || portalData.application.status !== 'approved' || !portalData.profile) {
    return <PendingScreen application={portalData.application} onRefresh={loadPortal} onLogout={onLogout} loading={loading} />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[radial-gradient(circle_at_top_right,#ffe7ef_0%,#fff8fb_20%,#f8fafc_56%,#ffffff_100%)] text-right">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} profile={portalData.profile} />
      <div className="lg:pr-[310px]">
        <Header setSidebarOpen={setSidebarOpen} phone={phone} onLogout={onLogout} />
        <main className="px-4 py-6 sm:px-6">
          <div className="mb-8 rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_30px_80px_-50px_rgba(244,63,94,0.5)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Vendor Workspace</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">{portalData.profile.store_name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">إدارة مباشرة للخدمات المقدمة بعد موافقة المشرف العام على طلب الانضمام القادم من التطبيق.</p>
          </div>

          {activeTab === 'dashboard' && <DashboardTab profile={portalData.profile} services={portalData.services} orders={portalData.orders} />}
          {activeTab === 'services' && (
            <ServicesTab
              services={portalData.services}
              onCreate={() => setEditingService({ vendor_id: portalData.profile.id })}
              onEdit={(service) => setEditingService(service)}
              onDelete={handleDeleteService}
            />
          )}
          {activeTab === 'orders' && <OrdersTab orders={portalData.orders} />}
          {activeTab === 'settings' && <SettingsTab profile={portalData.profile} />}
        </main>
      </div>

      {editingService ? (
        <ServiceModal
          service={editingService.id ? editingService : null}
          vendorId={portalData.profile.id}
          onClose={() => setEditingService(null)}
          onSave={handleSaveService}
        />
      ) : null}
    </div>
  );
};

const App = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionPhone, setSessionPhone] = useState('');

  const handleLogin = async () => {
    if (!hasSupabaseConfig) {
      setErrorMessage('بيئة Supabase غير مهيأة داخل بوابة البائع.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const data = await fetchVendorPortalData(phone);

      if (!data.application) {
        setErrorMessage('لا يوجد طلب انضمام بهذا الرقم. قدّم الطلب أولاً من تطبيق Expo.');
        return;
      }

      setSessionPhone(phone);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!sessionPhone) {
    return <LoginScreen phone={phone} setPhone={setPhone} onLogin={handleLogin} loading={loading} errorMessage={errorMessage} />;
  }

  return <PortalApp phone={sessionPhone} setPhone={setPhone} onLogout={() => setSessionPhone('')} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
