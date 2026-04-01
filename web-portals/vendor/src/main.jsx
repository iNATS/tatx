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

console.log('🔧 Supabase Config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

// API Helpers
const getHeaders = (extra = {}) => ({
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
  ...extra,
});

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      throw new Error(`Request failed (${response.status}): ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
};

const fetchVendorPortalData = async (phone) => {
  console.log('📞 Fetching vendor data for:', phone);
  
  if (!hasSupabaseConfig) {
    console.warn('⚠️ Supabase not configured, using demo mode');
    return {
      application: { status: 'pending', phone },
      profile: null,
      services: [],
      orders: [],
    };
  }

  try {
    // Fetch vendor application
    const applications = await fetchJson(
      `${supabaseUrl}/rest/v1/vendor_applications?select=*&phone=eq.${encodeURIComponent(phone)}&order=created_at.desc&limit=1`
    );
    
    const application = applications && applications[0] ? applications[0] : null;
    console.log('📋 Application:', application);

    let profile = null;
    let services = [];
    let orders = [];

    if (application?.status === 'approved') {
      // Fetch vendor profile
      const profiles = await fetchJson(
        `${supabaseUrl}/rest/v1/vendor_profiles?select=*&phone=eq.${encodeURIComponent(phone)}&limit=1`
      );
      profile = profiles && profiles[0] ? profiles[0] : null;
      console.log('👤 Profile:', profile);

      if (profile?.id) {
        // Fetch vendor services
        services = await fetchJson(
          `${supabaseUrl}/rest/v1/vendor_services?select=*&vendor_id=eq.${profile.id}&order=created_at.desc`
        );
        console.log('📦 Services:', services.length);
      }

      if (profile?.store_name) {
        // Fetch orders
        orders = await fetchJson(
          `${supabaseUrl}/rest/v1/customer_orders?select=*&vendor_name=eq.${encodeURIComponent(profile.store_name)}&order=created_at.desc`
        );
        console.log('🛍 Orders:', orders.length);
      }
    }

    return { application, profile, services, orders };
  } catch (error) {
    console.error('❌ Error fetching vendor data:', error);
    throw error;
  }
};

const upsertVendorService = async (service) => {
  console.log('💾 Saving service:', service);
  
  const url = service.id 
    ? `${supabaseUrl}/rest/v1/vendor_services?id=eq.${service.id}`
    : `${supabaseUrl}/rest/v1/vendor_services`;
  
  const response = await fetch(url, {
    method: service.id ? 'PATCH' : 'POST',
    headers: getHeaders({ Prefer: 'return=representation' }),
    body: JSON.stringify(service.id ? service : [service]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Save error:', response.status, errorText);
    throw new Error(`Service save failed (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  console.log('✅ Service saved:', result[0]);
  return service.id ? result[0] || service : result[0];
};

const removeVendorService = async (id) => {
  console.log('🗑 Deleting service:', id);
  
  const response = await fetch(`${supabaseUrl}/rest/v1/vendor_services?id=eq.${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Delete error:', response.status, errorText);
    throw new Error(`Service delete failed (${response.status}): ${errorText}`);
  }
  
  console.log('✅ Service deleted');
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

const OrderRow = ({ order, onViewDetails, onUpdateStatus }) => {
  const statusColors = {
    pending: 'warning',
    preparing: 'primary',
    ready: 'slate',
    on_way: 'primary',
    completed: 'success',
    cancelled: 'error',
  };

  const statusLabels = {
    pending: 'قيد الانتظار',
    preparing: 'قيد التحضير',
    ready: 'جاهز للاستلام',
    on_way: 'في الطريق',
    completed: 'مكتمل',
    cancelled: 'ملغى',
  };

  return (
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
        <Badge variant={statusColors[order.status] || 'slate'}>
          {statusLabels[order.status] || order.status}
        </Badge>
      </td>
      <td className="px-4 py-4 text-slate-500">
        {order.created_at ? new Date(order.created_at).toLocaleString('ar-SA') : '-'}
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => onViewDetails(order)}>
            <Eye className="h-4 w-4" />
          </Button>
          {order.status === 'pending' && (
            <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'preparing')}>
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
          {order.status === 'preparing' && (
            <Button variant="primary" size="sm" onClick={() => onUpdateStatus(order.id, 'ready')}>
              <Package className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

// Order Details Modal
const OrderDetailsModal = ({ order, isOpen, onClose, onUpdateStatus }) => {
  if (!order) return null;

  const statusColors = {
    pending: 'warning',
    preparing: 'primary',
    ready: 'slate',
    on_way: 'primary',
    completed: 'success',
    cancelled: 'error',
  };

  const statusLabels = {
    pending: 'قيد الانتظار',
    preparing: 'قيد التحضير',
    ready: 'جاهز للاستلام',
    on_way: 'في الطريق',
    completed: 'مكتمل',
    cancelled: 'ملغى',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`تفاصيل الطلب - ${order.order_number}`}>
      <div className="space-y-6">
        {/* Order Status */}
        <div className="rounded-3xl bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">حالة الطلب</div>
              <div className="mt-2">
                <Badge variant={statusColors[order.status] || 'slate'}>
                  {statusLabels[order.status] || order.status}
                </Badge>
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-500">رقم الطلب</div>
              <div className="mt-1 font-bold text-slate-950">{order.order_number}</div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h4 className="font-bold text-slate-950 mb-3">معلومات العميل</h4>
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="text-xs text-slate-400">اسم العميل</div>
                <div className="font-semibold text-slate-950">{order.customer_name || 'عميل التطبيق'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">رقم الجوال</div>
                <div className="font-semibold text-slate-950">{order.customer_phone || 'غير متوفر'}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-xs text-slate-400">العنوان</div>
                <div className="font-semibold text-slate-950">{order.address || 'غير متوفر'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="font-bold text-slate-950 mb-3">المنتجات</h4>
          <div className="space-y-2">
            {(order.items || []).map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 font-bold text-sm">
                    {item.quantity}x
                  </div>
                  <div>
                    <div className="font-semibold text-slate-950">{item.name}</div>
                    {item.description && <div className="text-xs text-slate-500">{item.description}</div>}
                  </div>
                </div>
                <div className="font-bold text-slate-950">{item.price} ر.س</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="rounded-2xl bg-slate-50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">المجموع الجزئي</span>
            <span className="font-semibold text-slate-950">{order.subtotal} ر.س</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">الخصم</span>
              <span className="font-semibold text-error-600">-{order.discount} ر.س</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">رسوم التوصيل</span>
            <span className="font-semibold text-slate-950">{order.delivery_fee} ر.س</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between">
            <span className="font-bold text-slate-950">الإجمالي</span>
            <span className="font-bold text-primary-600">{order.total} ر.س</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-100">
          {order.status === 'pending' && (
            <Button 
              className="flex-1" 
              onClick={() => {
                onUpdateStatus(order.id, 'preparing');
                onClose();
              }}
            >
              ابدأ التحضير
            </Button>
          )}
          {order.status === 'preparing' && (
            <Button 
              className="flex-1" 
              variant="success"
              onClick={() => {
                onUpdateStatus(order.id, 'ready');
                onClose();
              }}
            >
              جاهز للاستلام
            </Button>
          )}
          <Button variant="secondary" className="flex-1" onClick={onClose}>إغلاق</Button>
        </div>
      </div>
    </Modal>
  );
};

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

// Login Screen Component with OTP
const LoginScreen = ({ phone, setPhone, onLogin, loading, error, otpMode, setOtpMode, otpCode, setOtpCode, onVerifyOtp, verifyingOtp }) => {
  const [localError, setLocalError] = useState('');

  const handleSendOTP = async () => {
    if (!phone.trim() || !/^05[0-9]{8}$/.test(phone)) {
      setLocalError('أدخل رقم جوال سعودي صحيح (يبدأ بـ 05)');
      return;
    }
    setLocalError('');
    await onLogin();
  };

  const handleVerifyOTP = () => {
    if (!otpCode || otpCode.length !== 4) {
      setLocalError('أدخل رمز التحقق المكون من 4 أرقام');
      return;
    }
    setLocalError('');
    onVerifyOtp();
  };

  if (otpMode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-rose-50/30 to-slate-50 p-6" dir="rtl">
        <Card className="max-w-md w-full">
          <div className="p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-100 text-primary-600 mx-auto">
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
                    type="text"
                    maxLength={1}
                    value={otpCode[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value && !/^\d$/.test(value)) return;
                      const newCode = otpCode.split('');
                      newCode[index] = value;
                      setOtpCode(newCode.join(''));
                      if (value && index < 3) {
                        document.getElementById(`otp-${index + 1}`)?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
                        document.getElementById(`otp-${index - 1}`)?.focus();
                      }
                    }}
                    id={`otp-${index}`}
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
              
              <Button className="w-full" onClick={handleVerifyOTP} disabled={verifyingOtp}>
                {verifyingOtp ? 'جارٍ التحقق...' : 'تأكيد'}
              </Button>
              
              <Button variant="ghost" className="w-full" onClick={() => setOtpMode(false)}>
                تغيير رقم الجوال
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
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
            <p className="mt-3 text-sm leading-7 text-slate-500">أدخل رقم الجوال المسجل في بوابة البائع</p>
            
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
                جرب: 0555000002 (حساب بائع معتمد)
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

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
  
  // OTP State
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  
  // Order State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('📤 Sending OTP to:', phone);
      
      // Fetch vendor data to check if account exists
      const result = await fetchVendorPortalData(phone);
      setData(result);
      
      // Generate OTP (in production, send via SMS)
      const otp = '1234'; // Test OTP
      setGeneratedOtp(otp);
      
      console.log('✅ OTP sent:', otp);
      
      // Show OTP screen
      setOtpMode(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setVerifyingOtp(true);
      console.log('🔐 Verifying OTP:', otpCode);

      // Check OTP
      if (otpCode !== generatedOtp) {
        setError('رمز التحقق غير صحيح');
        setVerifyingOtp(false);
        return;
      }

      console.log('✅ OTP verified');

      // For demo/testing - allow login even without approved status
      // In production, check: if (data.application?.status !== 'approved')
      if (data.application?.status === 'rejected') {
        setError('الطلب مرفوض. يرجى التواصل مع الدعم');
        setVerifyingOtp(false);
        return;
      }

      // Login successful - allow access even if pending (for testing)
      console.log('✅ Login successful');
      setIsAuthenticated(true);
      setOtpMode(false);
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message);
    } finally {
      setVerifyingOtp(false);
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

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    console.log('📦 Updating order status:', orderId, '→', newStatus);
    
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/customer_orders?id=eq.${orderId}`, {
        method: 'PATCH',
        headers: getHeaders({ Prefer: 'return=representation' }),
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      // Update local state
      setData((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ),
      }));
      
      console.log('✅ Order status updated');
    } catch (error) {
      console.error('❌ Error updating order:', error);
      alert('فشل تحديث حالة الطلب');
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };

  // Render authenticated vendor portal
  if (isAuthenticated) {
    const activeServices = data.services ? data.services.filter((s) => s.is_active).length : 0;
    const totalSales = data.orders ? data.orders.reduce((sum, o) => sum + Number(o.total || 0), 0) : 0;
    const servicesCount = data.services ? data.services.length : 0;
    const ordersCount = data.orders ? data.orders.length : 0;
    const profile = data.profile || { 
      store_name: 'متجر تجريبي', 
      owner_name: 'مستخدم تجريبي', 
      city: 'الرياض', 
      commission_rate: 10,
      phone: phone
    };

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
                  <StatCard title="إجمالي الخدمات" value={servicesCount} note="قابلة للإدارة" icon={Store} color="primary" />
                  <StatCard title="الطلبات" value={ordersCount} note="كل الطلبات" icon={ShoppingBag} trend="up" trendValue="+12% هذا الشهر" color="warning" />
                  <StatCard title="المبيعات" value={`${totalSales.toFixed(0)} ر.س`} note="إجمالي المبيعات" icon={Wallet} trend="up" trendValue="+25% هذا الأسبوع" color="success" />
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                  <Card className="xl:col-span-2">
                    <div className="border-b border-slate-100 px-6 py-5">
                      <h3 className="text-lg font-bold text-slate-950">آخر الخدمات</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {data.services && data.services.length > 0 ? (
                        data.services.slice(0, 5).map((service) => (
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
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-slate-500">لا توجد خدمات بعد</div>
                      )}
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
                  {data.services && data.services.length > 0 ? (
                    data.services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={(s) => { setEditingService(s); setServiceModalOpen(true); }}
                        onDelete={handleDeleteService}
                      />
                    ))
                  ) : (
                    <div className="xl:col-span-2">
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
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <>
                <Card>
                  <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-black text-slate-950">الطلبات</h2>
                        <p className="mt-1 text-sm text-slate-500">جميع الطلبات المرتبطة بمتجرك</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" icon={Filter}>تصفية</Button>
                        <Badge variant="primary">{ordersCount} طلب</Badge>
                      </div>
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
                        {data.orders && data.orders.length > 0 ? (
                          data.orders.map((order) => (
                            <OrderRow 
                              key={order.id} 
                              order={order}
                              onViewDetails={handleViewOrderDetails}
                              onUpdateStatus={handleUpdateOrderStatus}
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="p-12 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                                  <ShoppingBag className="h-10 w-10" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-slate-950">لا توجد طلبات بعد</h3>
                                <p className="mt-2 text-sm text-slate-500">ستظهر الطلبات هنا عند بدء استقبالها</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
                
                {/* Order Details Modal */}
                <OrderDetailsModal 
                  order={selectedOrder}
                  isOpen={orderModalOpen}
                  onClose={() => {
                    setOrderModalOpen(false);
                    setSelectedOrder(null);
                  }}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              </>
            )}

            {activeTab === 'settings' && (
              <Card>
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-2xl font-black text-slate-950">إعدادات المتجر</h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Store Information */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-4">معلومات المتجر</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input 
                        label="اسم المتجر" 
                        defaultValue={profile?.store_name || ''}
                        icon={Store}
                      />
                      <Input 
                        label="اسم المالك" 
                        defaultValue={profile?.owner_name || ''}
                        icon={Users}
                      />
                      <Input 
                        label="المدينة" 
                        defaultValue={profile?.city || ''}
                        icon={ChevronLeft}
                      />
                      <Input 
                        label="نسبة العمولة" 
                        defaultValue={`${profile?.commission_rate || 0}%`}
                        icon={Wallet}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Store Hours */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-4">ساعات العمل</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input 
                        label="وقت الفتح" 
                        type="time"
                        defaultValue="09:00"
                      />
                      <Input 
                        label="وقت الإغلاق" 
                        type="time"
                        defaultValue="23:00"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-4">معلومات الاتصال</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input 
                        label="رقم الجوال" 
                        defaultValue={profile?.phone || ''}
                        icon={Phone}
                        disabled
                      />
                      <Input 
                        label="البريد الإلكتروني" 
                        type="email"
                        placeholder="example@mail.com"
                        icon={Bell}
                      />
                    </div>
                  </div>

                  {/* Notifications */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-4">الإشعارات</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                        <div>
                          <div className="font-bold text-slate-950">إشعارات الطلبات الجديدة</div>
                          <div className="text-xs text-slate-500">استلم إشعار عند وصول طلب جديد</div>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5" />
                      </label>
                      <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                        <div>
                          <div className="font-bold text-slate-950">إشعارات التحديثات</div>
                          <div className="text-xs text-slate-500">استلم إشعار بتحديثات النظام</div>
                        </div>
                        <input type="checkbox" className="h-5 w-5" />
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <Button className="flex-1">حفظ التغييرات</Button>
                    <Button variant="secondary">إلغاء</Button>
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

  // Show login screen (removed pending check - allows demo mode)
  return (
    <LoginScreen 
      phone={phone} 
      setPhone={setPhone} 
      onLogin={handleSendOTP} 
      loading={loading} 
      error={error}
      otpMode={otpMode}
      setOtpMode={setOtpMode}
      otpCode={otpCode}
      setOtpCode={setOtpCode}
      onVerifyOtp={handleVerifyOTP}
      verifyingOtp={verifyingOtp}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VendorPortal />
  </React.StrictMode>
);
