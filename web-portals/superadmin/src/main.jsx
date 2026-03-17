import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  ShoppingBag, 
  Wallet, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Package,
  CreditCard,
  Activity
} from 'lucide-react';

// shadcn Arabic UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  const variants = {
    default: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  };
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base',
    icon: 'w-10 h-10',
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-primary-100 text-primary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Avatar = ({ src, fallback, className = '' }) => (
  <div className={`w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden ${className}`}>
    {src ? (
      <img src={src} alt={fallback} className="w-full h-full object-cover" />
    ) : (
      <span className="text-primary-700 font-semibold">{fallback}</span>
    )}
  </div>
);

const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="flex items-center mt-1">
        {changeType === 'up' ? (
          <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
        )}
        <span className={`text-xs ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="text-xs text-gray-400 mr-1">من الشهر الماضي</span>
      </div>
    </CardContent>
  </Card>
);

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'vendors', label: 'المتاجر', icon: Store },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'customers', label: 'العملاء', icon: Users },
    { id: 'finance', label: 'المالية', icon: Wallet },
    { id: 'analytics', label: 'التحليلات', icon: Activity },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 z-50 h-full w-72 bg-white border-l border-gray-100 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">تاتكس</h1>
                <p className="text-xs text-gray-400">لوحة التحكم</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`sidebar-link w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeTab === item.id ? 'active' : 'text-gray-600'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${activeTab === item.id ? 'text-primary-600' : ''}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <Avatar fallback="م" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">مدير النظام</p>
                <p className="text-xs text-gray-400">admin@tatx.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onMenuClick }) => (
  <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن..."
            className="pr-10 pl-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        <Avatar fallback="م" />
      </div>
    </div>
  </header>
);

const DashboardContent = () => {
  const stats = [
    { title: 'إجمالي المبيعات', value: '٢٤,٥٨٠ ر.س', change: '+١٢.٥%', changeType: 'up', icon: CreditCard, color: 'bg-primary-500' },
    { title: 'الطلبات الجديدة', value: '١٨٤', change: '+٨.٢%', changeType: 'up', icon: Package, color: 'bg-blue-500' },
    { title: 'المتاجر النشطة', value: '٤٨', change: '+٣', changeType: 'up', icon: Store, color: 'bg-green-500' },
    { title: 'العملاء الجدد', value: '٣٢١', change: '-٢.١%', changeType: 'down', icon: Users, color: 'bg-purple-500' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'أحمد محمد', store: 'مطعم البركة', amount: '٨٥ ر.س', status: 'مكتمل', statusVariant: 'success' },
    { id: '#ORD-002', customer: 'فاطمة علي', store: 'سوبرماركت النخبة', amount: '٢٣٠ ر.س', status: 'قيد التحضير', statusVariant: 'warning' },
    { id: '#ORD-003', customer: 'محمد سعيد', store: 'صيدلية الشفاء', amount: '٤٥ ر.س', status: 'في الطريق', statusVariant: 'default' },
    { id: '#ORD-004', customer: 'نورة خالد', store: 'مخبز البركة', amount: '٦٥ ر.س', status: 'مكتمل', statusVariant: 'success' },
    { id: '#ORD-005', customer: 'عمر حسن', store: 'تاكسي سريع', amount: '٢٥ ر.س', status: 'ملغي', statusVariant: 'error' },
  ];

  const topVendors = [
    { name: 'مطعم البركة', orders: ٢٣٤, revenue: '١٢,٤٥٠ ر.س', rating: 4.8 },
    { name: 'سوبرماركت النخبة', orders: ١٨٩, revenue: '٨,٩٢٠ ر.س', rating: 4.7 },
    { name: 'صيدلية الشفاء', orders: ١٥٦, revenue: '٦,٣٤٠ ر.س', rating: 4.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Orders & Top Vendors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">رقم الطلب</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">العميل</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">المتجر</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">المبلغ</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.store}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.amount}</td>
                      <td className="py-3 px-4">
                        <Badge variant={order.statusVariant}>{order.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Vendors */}
        <Card>
          <CardHeader>
            <CardTitle>أفضل المتاجر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Store className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-xs text-gray-400">{vendor.orders} طلب</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{vendor.revenue}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-yellow-500">★</span>
                      <span className="text-xs text-gray-600">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="lg:pr-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-400 mt-1">مرحباً بك في لوحة تحكم تاتكس</p>
          </div>
          
          {activeTab === 'dashboard' && <DashboardContent />}
          
          {activeTab !== 'dashboard' && (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">قريباً</h2>
                <p className="text-gray-400">هذه الصفحة قيد التطوير وستكون متاحة قريباً</p>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
