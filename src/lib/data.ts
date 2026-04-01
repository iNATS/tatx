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
  { id: 'market', name: 'سوبر ماركت', icon: 'Store' },
  { id: 'beauty', name: 'سوق الجميلة', icon: 'Sparkles' },
  { id: 'taxi', name: 'مشاوير', icon: 'Car' },
  { id: 'food', name: 'مطاعم', icon: 'Utensils' },
  { id: 'pharmacy', name: 'صيدليات', icon: 'Pill' },
  { id: 'toys', name: 'لعب أطفال وهدايا', icon: 'Gift' },
];

export const PROVIDERS: Provider[] = [
  {
    id: 'market-tatx',
    name: 'سوبر ماركت Tatx',
    description: 'تسوق يومي سريع لجميع مستلزمات منزلك بأفضل الأسعار.',
    rating: 4.9,
    deliveryTime: '15-25 دقيقة',
    minOrder: 20,
    image: 'https://picsum.photos/seed/tatxmarket/600/400',
    category: 'market',
    isPopular: true
  },
  {
    id: 'beauty-1',
    name: 'سوق الجميلة',
    description: 'عالم متكامل للعناية والجمال يجمع أرقى الماركات العالمية.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/beauty/600/400',
    category: 'beauty',
    isPopular: true
  },
  {
    id: 'rest-1',
    name: 'مطعم قصر المندي',
    description: 'أجود أنواع اللحوم والمندي الشعبي الأصيل بضمان جودة Tatx.',
    rating: 4.8,
    deliveryTime: '30-45 دقيقة',
    minOrder: 30,
    image: 'https://picsum.photos/seed/mandi-rest/600/400',
    category: 'food',
    isPopular: true
  },
  {
    id: 'pharma-1',
    name: 'صيدلية Tatx',
    description: 'رعايتكم الصحية هي أولويتنا، جميع الأدوية والمستلزمات متوفرة.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/pharma1/600/400',
    category: 'pharmacy',
    isPopular: true
  },
  {
    id: 'toys-1',
    name: 'عالم الهدايا ولعب الأطفال',
    description: 'أجمل الهدايا وألعاب الأطفال التعليمية والترفيهية.',
    rating: 4.7,
    image: 'https://picsum.photos/seed/toys/600/400',
    category: 'toys'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- السوبر ماركت ---
  { id: 's1', providerId: 'market-tatx', name: 'بيبسي كرتون (30 علبة)', description: 'عرض التوفير الأسبوعي من تاتكس ماركت على المشروبات الباردة', price: 65, image: 'https://picsum.photos/seed/pepsi/400/400', category: 'market', subCategory: 'مشروبات', isFeatured: true },
  { id: 's2', providerId: 'market-tatx', name: 'أرز الشعلان 5 كجم', description: 'أرز بسمتي أبيض هندي', price: 42.5, image: 'https://picsum.photos/seed/rice/400/400', category: 'market', subCategory: 'أغذية' },
  
  // --- سوق الجميلة ---
  { id: 'b1', providerId: 'beauty-1', name: 'عطر فرنسي فاخر', description: 'رائحة تدوم طويلاً للمناسبات الخاصة', price: 350, image: 'https://picsum.photos/seed/perfume/400/400', category: 'beauty', subCategory: 'عطور' },
  { id: 'b2', providerId: 'beauty-1', name: 'مجموعة العناية بالبشرة', description: 'تنظيف وترطيب عميق للبشرة', price: 180, image: 'https://picsum.photos/seed/skincare/400/400', category: 'beauty', subCategory: 'عناية' },

  // --- المطاعم ---
  { id: 'm1', providerId: 'rest-1', name: 'نصف حبة مندي دجاج', description: 'تقدم مع الأرز والسلطة الحارة بخلطة قصر المندي السرية', price: 38, image: 'https://picsum.photos/seed/mandi/400/300', category: 'food', subCategory: 'مندي', isFeatured: true },
  
  // --- صيدلية ---
  { id: 'p1', providerId: 'pharma-1', name: 'بندول إكسترا 24 قرص', description: 'مسكن للآلام وخافض حرارة متوفر للتوصيل الفوري', price: 12.5, image: 'https://picsum.photos/seed/panadol/400/400', category: 'pharmacy', subCategory: 'مسكنات', isFeatured: true },

  // --- لعب اطفال ---
  { id: 't1', providerId: 'toys-1', name: 'ليجو تعليمي للأطفال', description: 'تنمية مهارات التفكير والتركيب', price: 120, image: 'https://picsum.photos/seed/lego/400/400', category: 'toys', subCategory: 'ألعاب' },
  { id: 't2', providerId: 'toys-1', name: 'دبدوب هدية كبير', description: 'هدية لطيفة ومناسبة لكافة الأعمار', price: 85, image: 'https://picsum.photos/seed/teddy/400/400', category: 'toys', subCategory: 'هدايا' },
];

export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS.filter(item => item.isFeatured);

export const Taxis = [
  { id: 'eco', name: 'توفير', price: 1.5, image: 'https://picsum.photos/seed/car-eco/100/100', time: '3 دقائق' },
  { id: 'comfort', name: 'مريح', price: 2.2, image: 'https://picsum.photos/seed/car-comfort/100/100', time: '5 دقائق' },
  { id: 'vip', name: 'VIP', price: 4.5, image: 'https://picsum.photos/seed/car-vip/100/100', time: '7 دقائق' },
  { id: 'family', name: 'عائلي', price: 3.0, image: 'https://picsum.photos/seed/car-family/100/100', time: '4 دقائق' },
];
