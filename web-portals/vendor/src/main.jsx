import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Wallet, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Store,
  Users,
  Clock,
  CheckCircle
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
    success: 'bg-green-600 text-white hover:bg-green-700',
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
    info: 'bg-blue-100 text-blue-700',
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
        <span className="text-xs text-gray-400 mr-1">من الأسبوع الماضي</span>
      </div>
    </CardContent>
  </Card>
);

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'wallet', label: 'المحفظة', icon: Wallet },
    { id: 'settings', label: 'إعدادات المتجر', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={`fixed top-0 right-0 z-50 h-full w-72 bg-white border-l border-gray-100 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">متجري</h1>
                <p className="text-xs text-gray-400">بوحة البائع</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

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

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <Avatar fallback="م" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">مطعم البركة</p>
                <p className="text-xs text-gray-400">نشط الآن</p>
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
            placeholder="ابحث عن طلب أو منتج..."
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
    { title: 'مبيعات اليوم', value: '٢,٤٥٠ ر.س', change: '+١٨.٥%', changeType: 'up', icon: Wallet, color: 'bg-green-500' },
    { title: 'الطلبات الجديدة', value: '٢٤', change: '+٥', changeType: 'up', icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'قيد التحضير', value: '٨', change: 'حالي', changeType: 'up', icon: Clock, color: 'bg-yellow-500' },
    { title: 'التقييم', value: '٤.٨', change: '+٠.٢', changeType: 'up', icon: Users, color: 'bg-purple-500' },
  ];

  const orders = [
    { id: '#ORD-101', customer: 'أحمد محمد', items: '٢ وجبة برجر + بطاطس', amount: '٨٥ ر.س', status: 'جديد', statusVariant: 'default', time: 'منذ ٥ دقائق' },
    { id: '#ORD-102', customer: 'فاطمة علي', items: '١ بيتزا كبيرة + مشروب', amount: '٦٥ ر.س', status: 'قيد التحضير', statusVariant: 'warning', time: 'منذ ١٠ دقائق' },
    { id: '#ORD-103', customer: 'محمد سعيد', items: '٣ وجبات دجاج', amount: '١٢٠ ر.س', status: 'جاهز', statusVariant: 'success', time: 'منذ ١٥ دقيقة' },
    { id: '#ORD-104', customer: 'نورة خالد', items: '١ وجبة سمك + أرز', amount: '٥٥ ر.س', status: 'مكتمل', statusVariant: 'info', time: 'منذ ٣٠ دقيقة' },
  ];

  const popularProducts = [
    { name: 'وجبة برجر', orders: ١٥٦, revenue: '٣,٩٠٠ ر.س' },
    { name: 'بيتزا كبيرة', orders: ١٣٤, revenue: '٦,٠٣٠ ر.س' },
    { name: 'وجبة دجاج', orders: ٩٨, revenue: '٤,٩٠٠ ر.س' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>الطلبات الأخيرة</CardTitle>
            <Button variant="outline" size="sm">عرض الكل</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-400">{order.customer} • {order.time}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                    <Badge variant={order.statusVariant}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Button className="flex-1">
                <CheckCircle className="w-4 h-4 ml-2" />
                قبول الكل
              </Button>
              <Button variant="outline" className="flex-1">
                عرض جميع الطلبات
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الأكثر مبيعاً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.orders} طلب</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
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
            <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المتجر</h1>
            <p className="text-gray-400 mt-1">إدارة طلباتك ومبيعاتك بسهولة</p>
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
