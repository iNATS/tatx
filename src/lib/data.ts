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
  { id: 'food', name: 'طعام تاتكس', icon: 'Utensils' },
  { id: 'taxi', name: 'تاكسي تاتكس', icon: 'Car' },
  { id: 'services', name: 'خدمات تاتكس', icon: 'Wrench' },
  { id: 'halls', name: 'قاعات تاتكس', icon: 'PartyPopper' },
  { id: 'chalets', name: 'شاليهات تاتكس', icon: 'Home' },
  { id: 'market', name: 'سوبر ماركت تاتكس', icon: 'Store' },
  { id: 'pharmacy', name: 'صيدلية تاتكس', icon: 'Pill' },
];

export const PROVIDERS: Provider[] = [
  {
    id: 'food',
    name: 'مطعم تاتكس المركزي',
    description: 'أشهى المأكولات الطازجة من مطابخنا إليكم مباشرة',
    rating: 4.9,
    deliveryTime: '20-30 دقيقة',
    minOrder: 15,
    image: 'https://picsum.photos/seed/tatxfood/600/400',
    category: 'food',
    isPopular: true
  },
  {
    id: 'market',
    name: 'سوبر ماركت تاتكس',
    description: 'كل مستلزمات منزلك بجودة عالية وسعر السوق',
    rating: 4.8,
    deliveryTime: '15-25 دقيقة',
    minOrder: 20,
    image: 'https://picsum.photos/seed/tatxmarket/600/400',
    category: 'market',
    isPopular: true
  },
  {
    id: 'pharmacy',
    name: 'صيدلية تاتكس',
    description: 'رعايتكم الصحية هي أولويتنا',
    rating: 4.9,
    image: 'https://picsum.photos/seed/tatxpharmacy/600/400',
    category: 'pharmacy',
    isPopular: true
  },
  {
    id: 'taxi',
    name: 'كابتن تاتكس',
    description: 'تنقل بأمان وراحة مع أسطولنا',
    rating: 4.9,
    image: 'https://picsum.photos/seed/tatxtaxi/600/400',
    category: 'taxi',
    isPopular: true
  },
  {
    id: 'halls',
    name: 'قاعات تاتكس للمناسبات',
    description: 'نحول مناسباتكم إلى ذكريات لا تنسى',
    rating: 4.7,
    image: 'https://picsum.photos/seed/tatxhalls/600/400',
    category: 'halls'
  },
  {
    id: 'chalets',
    name: 'شاليهات تاتكس الفاخرة',
    description: 'خصوصية تامة واستجمام مثالي',
    rating: 4.8,
    image: 'https://picsum.photos/seed/tatxchalets/600/400',
    category: 'chalets'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- سوبر ماركت تاتكس (30+ منتج) ---
  { id: 's1', providerId: 'market', name: 'بيبسي كرتون (30 علبة)', description: 'علب 325 مل الأصلية', price: 65, image: 'https://picsum.photos/seed/pepsi/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's2', providerId: 'market', name: 'أرز الشعلان 5 كجم', description: 'أرز بسمتي أبيض هندي', price: 42.5, image: 'https://picsum.photos/seed/rice/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's3', providerId: 'market', name: 'حليب المراعي 1 لتر', description: 'حليب طازج كامل الدسم', price: 6, image: 'https://picsum.photos/seed/milk/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's4', providerId: 'market', name: 'مياه هنا (40 حبة)', description: 'مياه شرب نقية 330 مل', price: 18, image: 'https://picsum.photos/seed/water/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's5', providerId: 'market', name: 'زيت عافية 1.5 لتر', description: 'زيت ذرة نقي للطبخ', price: 24.95, image: 'https://picsum.photos/seed/oil/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's6', providerId: 'market', name: 'تونا قودي (185 جرام)', description: 'تونا خفيفة في زيت دوار الشمس', price: 8.75, image: 'https://picsum.photos/seed/tuna/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's7', providerId: 'market', name: 'إندومي كرتون دجاج', description: 'نكهة الدجاج الخاصة (40 كيس)', price: 48, image: 'https://picsum.photos/seed/indomie/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's8', providerId: 'market', name: 'سكر الأسرة 5 كجم', description: 'سكر ناعم نقي', price: 21, image: 'https://picsum.photos/seed/sugar/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's9', providerId: 'market', name: 'زبادي المراعي كبير', description: 'زبادي طازج 2 كجم', price: 14.5, image: 'https://picsum.photos/seed/yogurt/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's10', providerId: 'market', name: 'كوكاكولا 2.25 لتر', description: 'مشروب غازي عائلي', price: 9.5, image: 'https://picsum.photos/seed/coke/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's11', providerId: 'market', name: 'جبنة بوك كاسات', description: 'جبنة كريم مطبوخة 500 جرام', price: 16.25, image: 'https://picsum.photos/seed/cheese/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's12', providerId: 'market', name: 'مكرونة قودي (500 جرام)', description: 'مكرونة سباغيتي إيطالية', price: 5.5, image: 'https://picsum.photos/seed/pasta/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's13', providerId: 'market', name: 'شاي ليبتون (100 كيس)', description: 'شاي أسود علامة صفراء', price: 19.95, image: 'https://picsum.photos/seed/tea/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's14', providerId: 'market', name: 'بيض مزارع (30 بيضة)', description: 'بيض طازج حجم كبير', price: 18, image: 'https://picsum.photos/seed/eggs/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's15', providerId: 'market', name: 'بطاطس ليز عائلي', description: 'نكهة الملح (160 جرام)', price: 7, image: 'https://picsum.photos/seed/chips/400/400', category: 'market', subCategory: 'تسالي' },
  { id: 's16', providerId: 'market', name: 'صلصة طماطم نادك', description: 'عبوة 8 حبات (135 جرام)', price: 11, image: 'https://picsum.photos/seed/sauce/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's17', providerId: 'market', name: 'دجاج ساديا مجمد', description: '1000 جرام - حبة كاملة', price: 17.5, image: 'https://picsum.photos/seed/chicken/400/400', category: 'market', subCategory: 'مجمدات' },
  { id: 's18', providerId: 'market', name: 'صابون تايد 2.5 كجم', description: 'مسحوق غسيل أوتوماتيك', price: 34, image: 'https://picsum.photos/seed/tide/400/400', category: 'market', subCategory: 'منظفات' },
  { id: 's19', providerId: 'market', name: 'مطهر ديتول 1 لتر', description: 'حماية من الجراثيم', price: 28, image: 'https://picsum.photos/seed/dettol/400/400', category: 'market', subCategory: 'منظفات' },
  { id: 's20', providerId: 'market', name: 'كلوركس 3.78 لتر', description: 'مبيض ملابس ومطهر', price: 15.5, image: 'https://picsum.photos/seed/clorox/400/400', category: 'market', subCategory: 'منظفات' },
  { id: 's21', providerId: 'market', name: 'قهوة عربية باجة', description: 'خلطة سعودية 500 جرام', price: 22, image: 'https://picsum.photos/seed/coffee/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's22', providerId: 'market', name: 'هيل هندي (250 جرام)', description: 'هيل أخضر درجة أولى', price: 35, image: 'https://picsum.photos/seed/cardamom/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's23', providerId: 'market', name: 'فول مدمس حدائق كاليفورنيا', description: 'عبوة 3 حبات (450 جرام)', price: 12, image: 'https://picsum.photos/seed/beans/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's24', providerId: 'market', name: 'كتشب هاينز كبير', description: 'عبوة ضاغطة (570 جرام)', price: 14, image: 'https://picsum.photos/seed/ketchup/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's25', providerId: 'market', name: 'دقيق كويتي 1 كجم', description: 'دقيق فاخر لجميع الاستعمالات', price: 4.5, image: 'https://picsum.photos/seed/flour/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's26', providerId: 'market', name: 'شوكولاتة جالاكسي ميني', description: 'كيس مشكل 250 جرام', price: 18.5, image: 'https://picsum.photos/seed/galaxy/400/400', category: 'market', subCategory: 'تسالي' },
  { id: 's27', providerId: 'market', name: 'عصير نادك برتقال', description: 'عبوة 1.5 لتر طازج', price: 9, image: 'https://picsum.photos/seed/juice/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's28', providerId: 'market', name: 'ملح ساسا', description: 'علبة بلاستيك 700 جرام', price: 3.25, image: 'https://picsum.photos/seed/salt/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's29', providerId: 'market', name: 'قشطة التاج (155 جرام)', description: 'قشطة سادة للحلويات', price: 5.75, image: 'https://picsum.photos/seed/cream/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's30', providerId: 'market', name: 'ناجت دجاج الكبير', description: '400 جرام مجمد', price: 13, image: 'https://picsum.photos/seed/nuggets/400/400', category: 'market', subCategory: 'مجمدات' },
  { id: 's31', providerId: 'market', name: 'بسكويت أوريو', description: 'كرتون 12 مغلف', price: 14, image: 'https://picsum.photos/seed/oreo/400/400', category: 'market', subCategory: 'تسالي' },
  { id: 's32', providerId: 'market', name: 'نسكافيه 3 في 1', description: 'علبة 24 مغلف', price: 26, image: 'https://picsum.photos/seed/nescafe/400/400', category: 'market', subCategory: 'مشروبات' },

  // --- مطعم تاتكس ---
  { id: 'm1', providerId: 'food', name: 'مندي دجاج تاتكس', description: 'نصف حبة مع الأرز المندي المدخن والسلطة الحارة', price: 38, image: 'https://picsum.photos/seed/mandi/400/300', category: 'food', subCategory: 'مندي', isFeatured: true },
  { id: 'm2', providerId: 'food', name: 'برجر تاتكس دبل', description: 'قطعتين لحم طازج، جبنة شيدر، صوص تاتكس المميز', price: 45, image: 'https://picsum.photos/seed/burger-item/400/300', category: 'food', subCategory: 'برجر' },
  { id: 'm3', providerId: 'food', name: 'بيتزا مارغريتا إيطالية', description: 'صوص طماطم، ريحان، موزاريلا طبيعية', price: 32, image: 'https://picsum.photos/seed/pizza-item/400/300', category: 'food', subCategory: 'بيتزا' },
  { id: 'm4', providerId: 'food', name: 'مشاوي مشكلة تاتكس', description: 'كباب، شيش طاووق، ريش - تقدم مع البطاطس', price: 55, image: 'https://picsum.photos/seed/grill/400/300', category: 'food', subCategory: 'مشاوي' },
  { id: 'm5', providerId: 'food', name: 'فتوش لبناني', description: 'خضار طازجة مع دبس الرمان والخبز المحمص', price: 18, image: 'https://picsum.photos/seed/fattoush/400/300', category: 'food', subCategory: 'مقبلات' },

  // --- صيدلية تاتكس ---
  { id: 'p1', providerId: 'pharmacy', name: 'بندول إكسترا 24 قرص', description: 'مسكن للألم وخافض للحرارة', price: 12.5, image: 'https://picsum.photos/seed/panadol/400/400', category: 'pharmacy', subCategory: 'مسكنات', isFeatured: true },
  { id: 'p2', providerId: 'pharmacy', name: 'فيتامين سي فوار', description: '1000 مجم لتعزيز المناعة', price: 25, image: 'https://picsum.photos/seed/vitc/400/400', category: 'pharmacy', subCategory: 'فيتامينات' },
  { id: 'p3', providerId: 'pharmacy', name: 'معقم يدين ديتول', description: 'قتل الجراثيم بنسبة 99.9%', price: 15, image: 'https://picsum.photos/seed/sanitizer/400/400', category: 'pharmacy', subCategory: 'عناية' },

  // --- قاعات وشاليهات تاتكس ---
  { id: 'h1', providerId: 'halls', name: 'حجز القاعة الكبرى', description: 'تشمل العشاء لـ 100 شخص وتنسيق الورد الفاخر', price: 15000, image: 'https://picsum.photos/seed/hall-item/400/300', category: 'halls' },
  { id: 'c1', providerId: 'chalets', name: 'شاليه لافندر (يومي)', description: 'مسبح خاص، مساحات خضراء، منطقة شواء', price: 1200, image: 'https://picsum.photos/seed/chalet-item/400/300', category: 'chalets' }
];

export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS.filter(item => item.isFeatured);
