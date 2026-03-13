export interface Provider {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime?: string;
  minOrder?: number;
  image: string;
  category: string;
  isPopular?: boolean;
}

export interface MenuItem {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subCategory?: string;
  isFeatured?: boolean;
}

export const CATEGORIES = [
  { id: 'food', name: 'طعام', icon: 'Utensils' },
  { id: 'taxi', name: 'تاكسي', icon: 'Car' },
  { id: 'services', name: 'خدمات', icon: 'Wrench' },
  { id: 'halls', name: 'قاعات', icon: 'PartyPopper' },
  { id: 'chalets', name: 'شاليهات', icon: 'Home' },
  { id: 'market', name: 'سوبر ماركت', icon: 'Store' },
  { id: 'pharmacy', name: 'صيدلية', icon: 'Pill' },
];

export const PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'برجر كرافت',
    description: 'أفضل أنواع البرجر المشوي على اللهب',
    rating: 4.8,
    deliveryTime: '25-35 دقيقة',
    minOrder: 20,
    image: 'https://picsum.photos/seed/burger/600/400',
    category: 'food',
    isPopular: true
  },
  {
    id: '2',
    name: 'كابتن تاتكس',
    description: 'توصيل سريع وآمن في جميع أنحاء المدينة',
    rating: 4.9,
    image: 'https://picsum.photos/seed/taxi/600/400',
    category: 'taxi',
    isPopular: true
  },
  {
    id: '3',
    name: 'قاعة الزمردة الملكية',
    description: 'أفخم القاعات لمناسباتكم السعيدة مع تجهيز كامل',
    rating: 4.7,
    image: 'https://picsum.photos/seed/hall1/600/400',
    category: 'halls'
  },
  {
    id: '4',
    name: 'شاليه لافندر بريميم',
    description: 'استرخاء وهدوء مع مسبح خاص بنظام تدفئة',
    rating: 4.6,
    image: 'https://picsum.photos/seed/chalet1/600/400',
    category: 'chalets'
  },
  {
    id: '5',
    name: 'باندا هايبر ماركت',
    description: 'كل احتياجاتك المنزلية بأفضل الأسعار',
    rating: 4.5,
    image: 'https://picsum.photos/seed/market/600/400',
    category: 'market'
  },
  {
    id: '6',
    name: 'صيدلية النهدي',
    description: 'رعاية صحية وتوصيل سريع للأدوية والمستلزمات',
    rating: 4.9,
    image: 'https://picsum.photos/seed/pharmacy/600/400',
    category: 'pharmacy',
    isPopular: true
  },
  {
    id: '7',
    name: 'قصر الوليد للمناسبات',
    description: 'قاعات واسعة وخدمة فندقية متميزة',
    rating: 4.8,
    image: 'https://picsum.photos/seed/hall2/600/400',
    category: 'halls'
  },
  {
    id: '8',
    name: 'شاليهات أرياف',
    description: 'جو ريفي هادئ مع مساحات خضراء واسعة',
    rating: 4.7,
    image: 'https://picsum.photos/seed/chalet2/600/400',
    category: 'chalets'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // مطاعم - برجر
  { id: 'm1', providerId: '1', name: 'برجر دبل تشيز', description: 'قطعتين لحم، جبنة شيدر، صوص تاتكس الخاص', price: 45, image: 'https://picsum.photos/seed/m1/400/300', category: 'food', subCategory: 'برجر' },
  { id: 'm2', providerId: '1', name: 'كلاسيك برجر', description: 'لحم مشوي مع الخس والطماطم', price: 35, image: 'https://picsum.photos/seed/m2/400/300', category: 'food', subCategory: 'برجر' },
  { id: 'm3', providerId: '1', name: 'مندي دجاج', description: 'نصف حبة دجاج مع أرز المندي الأصلي', price: 38, image: 'https://picsum.photos/seed/m3/400/300', category: 'food', subCategory: 'مندي' },
  { id: 'm4', providerId: '1', name: 'بيتزا مارغريتا', description: 'عجينة ايطالية مع صوص الطماطم والريحان', price: 32, image: 'https://picsum.photos/seed/m4/400/300', category: 'food', subCategory: 'بيتزا' },
  { id: 'm5', providerId: '1', name: 'مكرونة بشاميل', description: 'مكرونة بالفرن مع اللحم المفروم والبشاميل', price: 28, image: 'https://picsum.photos/seed/m5/400/300', category: 'food', subCategory: 'مكرونات' },
  { id: 'm6', providerId: '1', name: 'شوربة عدس', description: 'شوربة عدس ساخنة مع الخبز المحمص', price: 15, image: 'https://picsum.photos/seed/m6/400/300', category: 'food', subCategory: 'شوربات' },
  
  // سوبر ماركت
  { id: 's1', providerId: '5', name: 'بيبسي 330 مل', description: 'مشروب غازي بارد', price: 3.5, image: 'https://picsum.photos/seed/s1/400/300', category: 'market', subCategory: 'مشروبات' },
  { id: 's2', providerId: '5', name: 'حليب المراعي 1 لتر', description: 'حليب طازج كامل الدسم', price: 6, image: 'https://picsum.photos/seed/s2/400/300', category: 'market', subCategory: 'ألبان' },
  { id: 's3', providerId: '5', name: 'أرز الشعلان 5 كجم', description: 'أرز بسمتي أبيض هندي', price: 42, image: 'https://picsum.photos/seed/s3/400/300', category: 'market', subCategory: 'أغذية' },
  { id: 's4', providerId: '5', name: 'تونا قودي 185 جرام', description: 'تونا في زيت دوار الشمس', price: 8.5, image: 'https://picsum.photos/seed/s4/400/300', category: 'market', subCategory: 'معلبات' },
  { id: 's5', providerId: '5', name: 'إندومي دجاج شعيرية', description: 'كرتون إندومي بنكهة الدجاج', price: 48, image: 'https://picsum.photos/seed/s5/400/300', category: 'market', subCategory: 'أغذية' },
  { id: 's6', providerId: '5', name: 'زبادي المراعي 170 جرام', description: 'زبادي طازج', price: 1.5, image: 'https://picsum.photos/seed/s6/400/300', category: 'market', subCategory: 'ألبان' },
  
  // صيدلية
  { id: 'p1', providerId: '6', name: 'بنادول إكسترا 24 قرص', description: 'مسكن للآلام وخافض للحرارة', price: 12.5, image: 'https://picsum.photos/seed/p1/400/300', category: 'pharmacy', subCategory: 'مسكنات' },
  { id: 'p2', providerId: '6', name: 'فيتامين سي 1000 مجم', description: 'فوار لتعزيز المناعة', price: 25, image: 'https://picsum.photos/seed/p2/400/300', category: 'pharmacy', subCategory: 'فيتامينات' },
  { id: 'p3', providerId: '6', name: 'فولتايرين جل 50 جرام', description: 'مسكن لآلام المفاصل والعضلات', price: 18, image: 'https://picsum.photos/seed/p3/400/300', category: 'pharmacy', subCategory: 'مسكنات' },
  { id: 'p4', providerId: '6', name: 'مطهر يدين ديتول', description: 'قاتل للجراثيم بنسبة 99.9%', price: 15, image: 'https://picsum.photos/seed/p4/400/300', category: 'pharmacy', subCategory: 'عناية' },
  
  // شاليهات وقاعات (منتجات الحجز)
  { id: 'h1', providerId: '3', name: 'حجز القاعة الملكية', description: 'تشمل العشاء لـ 100 شخص وتنسيق الورد', price: 15000, image: 'https://picsum.photos/seed/h1/400/300', category: 'halls' },
  { id: 'c1', providerId: '4', name: 'إيجار يومي (وسط الأسبوع)', description: 'دخول من 2 ظهراً حتى 2 صباحاً', price: 1200, image: 'https://picsum.photos/seed/c1/400/300', category: 'chalets' },
  { id: 'c2', providerId: '8', name: 'باقة نهاية الأسبوع', description: 'يومين شاملة المبيت', price: 2500, image: 'https://picsum.photos/seed/c2/400/300', category: 'chalets' }
];

export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS.filter(item => item.id === 'm1' || item.id === 's3' || item.id === 'p1');
