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
  { id: 'food', name: 'مطاعم تاتكس', icon: 'Utensils' },
  { id: 'taxi', name: 'تاكسي تاتكس', icon: 'Car' },
  { id: 'services', name: 'خدمات تاتكس', icon: 'Wrench' },
  { id: 'halls', name: 'قاعات تاتكس', icon: 'PartyPopper' },
  { id: 'chalets', name: 'شاليهات تاتكس', icon: 'Home' },
  { id: 'market', name: 'سوبر ماركت تاتكس', icon: 'Store' },
  { id: 'pharmacy', name: 'صيدلية تاتكس', icon: 'Pill' },
];

export const PROVIDERS: Provider[] = [
  // --- سوبر ماركت (حصري لتاتكس) ---
  {
    id: 'market-tatx',
    name: 'سوبر ماركت تاتكس',
    description: 'كل مستلزمات منزلك بجودة عالية وسعر السوق - البائع المباشر تاتكس',
    rating: 4.9,
    deliveryTime: '15-25 دقيقة',
    minOrder: 20,
    image: 'https://picsum.photos/seed/tatxmarket/600/400',
    category: 'market',
    isPopular: true
  },

  // --- مطاعم ---
  {
    id: 'rest-1',
    name: 'مطعم قصر المندي',
    description: 'أجود أنواع اللحوم والمندي الشعبي',
    rating: 4.8,
    deliveryTime: '30-45 دقيقة',
    minOrder: 30,
    image: 'https://picsum.photos/seed/mandi-rest/600/400',
    category: 'food',
    isPopular: true
  },
  {
    id: 'rest-2',
    name: 'برجر ستيشن',
    description: 'برجر لحم ودجاج طازج يومياً',
    rating: 4.7,
    deliveryTime: '20-35 دقيقة',
    minOrder: 25,
    image: 'https://picsum.photos/seed/burger-rest/600/400',
    category: 'food'
  },

  // --- صيدليات ---
  {
    id: 'pharma-1',
    name: 'صيدلية الشفاء',
    description: 'رعايتكم الصحية هي أولويتنا',
    rating: 4.9,
    image: 'https://picsum.photos/seed/pharma1/600/400',
    category: 'pharmacy',
    isPopular: true
  },

  // --- خدمات ---
  {
    id: 'serv-1',
    name: 'تاتكس للخدمات المنزلية',
    description: 'سباكة، كهرباء، صيانة مكيفات بضمان تاتكس',
    rating: 4.8,
    image: 'https://picsum.photos/seed/services/600/400',
    category: 'services'
  },

  // --- شاليهات ---
  {
    id: 'chalet-1',
    name: 'منتجعات تاتكس الفاخرة',
    description: 'أفضل الشاليهات للاستجمام العائلي',
    rating: 4.9,
    image: 'https://picsum.photos/seed/chalet/600/400',
    category: 'chalets'
  },

  // --- قاعات ---
  {
    id: 'hall-1',
    name: 'قاعات تاتكس للمناسبات',
    description: 'قاعات فخمة لجميع مناسباتكم السعيدة',
    rating: 5.0,
    image: 'https://picsum.photos/seed/halls/600/400',
    category: 'halls'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- السوبر ماركت ---
  { id: 's1', providerId: 'market-tatx', name: 'بيبسي كرتون (30 علبة)', description: 'علب 325 مل الأصلية', price: 65, image: 'https://picsum.photos/seed/pepsi/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's2', providerId: 'market-tatx', name: 'أرز الشعلان 5 كجم', description: 'أرز بسمتي أبيض هندي', price: 42.5, image: 'https://picsum.photos/seed/rice/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's3', providerId: 'market-tatx', name: 'حليب المراعي 1 لتر', description: 'حليب طازج كامل الدسم', price: 6, image: 'https://picsum.photos/seed/milk/400/400', category: 'market', subCategory: 'ألبان' },

  // --- المطاعم ---
  { id: 'm1', providerId: 'rest-1', name: 'نصف حبة مندي دجاج', description: 'تقدم مع الأرز والسلطة الحارة', price: 38, image: 'https://picsum.photos/seed/mandi/400/300', category: 'food', subCategory: 'مندي', isFeatured: true },
  { id: 'm3', providerId: 'rest-2', name: 'برجر تاتكس دبل', description: 'قطعتين لحم مع الجبن', price: 45, image: 'https://picsum.photos/seed/burger/400/300', category: 'food', subCategory: 'برجر' },

  // --- الصيدلية ---
  { id: 'p1', providerId: 'pharma-1', name: 'بندول إكسترا 24 قرص', description: 'مسكن للآلام وخافض حرارة', price: 12.5, image: 'https://picsum.photos/seed/panadol/400/400', category: 'pharmacy', subCategory: 'مسكنات', isFeatured: true },
  
  // --- خدمات ---
  { id: 'ser1', providerId: 'serv-1', name: 'تنظيف مكيف سبليت', description: 'تنظيف شامل مع فحص الفريون', price: 150, image: 'https://picsum.photos/seed/ac/400/400', category: 'services', subCategory: 'تكييف' },
  
  // --- شاليهات ---
  { id: 'ch1', providerId: 'chalet-1', name: 'شاليه تاتكس رويال', description: 'مسبح خاص، مسطحات خضراء، صالة ألعاب', price: 1200, image: 'https://picsum.photos/seed/chalet1/400/400', category: 'chalets', subCategory: 'شاليهات' }
];

export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS.filter(item => item.isFeatured);

export const Taxis = [
  { id: 'eco', name: 'توفير', price: 1.5, image: 'https://picsum.photos/seed/car-eco/100/100', time: '3 دقائق' },
  { id: 'comfort', name: 'مريح', price: 2.2, image: 'https://picsum.photos/seed/car-comfort/100/100', time: '5 دقائق' },
  { id: 'vip', name: 'VIP', price: 4.5, image: 'https://picsum.photos/seed/car-vip/100/100', time: '7 دقائق' },
  { id: 'family', name: 'عائلي', price: 3.0, image: 'https://picsum.photos/seed/car-family/100/100', time: '4 دقائق' },
];
