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

  // --- مطاعم (متعددة التجار) ---
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
  {
    id: 'rest-3',
    name: 'بيتزا إيتاليا',
    description: 'بيتزا على الحطب بالطريقة التقليدية',
    rating: 4.6,
    deliveryTime: '25-40 دقيقة',
    minOrder: 40,
    image: 'https://picsum.photos/seed/pizza-rest/600/400',
    category: 'food'
  },

  // --- صيدليات (متعددة التجار) ---
  {
    id: 'pharma-1',
    name: 'صيدلية الشفاء',
    description: 'رعايتكم الصحية هي أولويتنا',
    rating: 4.9,
    image: 'https://picsum.photos/seed/pharma1/600/400',
    category: 'pharmacy',
    isPopular: true
  },
  {
    id: 'pharma-2',
    name: 'صيدلية الدواء الماسي',
    description: 'توفير كافة الأدوية والمستلزمات',
    rating: 4.8,
    image: 'https://picsum.photos/seed/pharma2/600/400',
    category: 'pharmacy'
  },

  // --- تاكسي (متعددة التجار) ---
  {
    id: 'taxi-1',
    name: 'كابتن محمد - تويوتا كامري',
    description: 'توصيل آمن وسريع داخل الرياض',
    rating: 5.0,
    image: 'https://picsum.photos/seed/taxi1/600/400',
    category: 'taxi',
    isPopular: true
  },
  {
    id: 'taxi-2',
    name: 'كابتن أحمد - هيونداي إلنترا',
    description: 'رحلات مريحة بأسعار مناسبة',
    rating: 4.9,
    image: 'https://picsum.photos/seed/taxi2/600/400',
    category: 'taxi'
  },

  // --- قاعات (متعددة التجار) ---
  {
    id: 'hall-1',
    name: 'قاعة الملكة للمناسبات',
    description: 'فخامة تناسب ليلة العمر',
    rating: 4.9,
    image: 'https://picsum.photos/seed/hall1/600/400',
    category: 'halls',
    isPopular: true
  },
  {
    id: 'hall-2',
    name: 'قاعة السلطانة',
    description: 'إطلالة ساحرة وخدمة متميزة',
    rating: 4.7,
    image: 'https://picsum.photos/seed/hall2/600/400',
    category: 'halls'
  },

  // --- شاليهات (متعددة التجار) ---
  {
    id: 'chalet-1',
    name: 'شاليهات نرجس الفاخرة',
    description: 'خصوصية تامة ومسابح خاصة',
    rating: 4.8,
    image: 'https://picsum.photos/seed/chalet1/600/400',
    category: 'chalets',
    isPopular: true
  },
  {
    id: 'chalet-2',
    name: 'منتجع اللافندر',
    description: 'استجمام حقيقي بعيداً عن صخب المدينة',
    rating: 4.9,
    image: 'https://picsum.photos/seed/chalet2/600/400',
    category: 'chalets'
  },

  // --- خدمات (متعددة التجار) ---
  {
    id: 'service-1',
    name: 'شركة إتقان للسباكة',
    description: 'حلول سباكة متكاملة وضمان معتمد',
    rating: 4.8,
    image: 'https://picsum.photos/seed/service1/600/400',
    category: 'services',
    isPopular: true
  },
  {
    id: 'service-2',
    name: 'كهربائي الرياض المحترف',
    description: 'صيانة وتمديدات كهربائية آمنة',
    rating: 4.7,
    image: 'https://picsum.photos/seed/service2/600/400',
    category: 'services'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- السوبر ماركت (30+ منتج) ---
  { id: 's1', providerId: 'market-tatx', name: 'بيبسي كرتون (30 علبة)', description: 'علب 325 مل الأصلية', price: 65, image: 'https://picsum.photos/seed/pepsi/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's2', providerId: 'market-tatx', name: 'أرز الشعلان 5 كجم', description: 'أرز بسمتي أبيض هندي', price: 42.5, image: 'https://picsum.photos/seed/rice/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's3', providerId: 'market-tatx', name: 'حليب المراعي 1 لتر', description: 'حليب طازج كامل الدسم', price: 6, image: 'https://picsum.photos/seed/milk/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's4', providerId: 'market-tatx', name: 'مياه هنا (40 حبة)', description: 'مياه شرب نقية 330 مل', price: 18, image: 'https://picsum.photos/seed/water/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's5', providerId: 'market-tatx', name: 'زيت عافية 1.5 لتر', description: 'زيت ذرة نقي للطبخ', price: 24.95, image: 'https://picsum.photos/seed/oil/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's6', providerId: 'market-tatx', name: 'تونا قودي (185 جرام)', description: 'تونا خفيفة في زيت دوار الشمس', price: 8.75, image: 'https://picsum.photos/seed/tuna/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's7', providerId: 'market-tatx', name: 'إندومي كرتون دجاج', description: 'نكهة الدجاج الخاصة (40 كيس)', price: 48, image: 'https://picsum.photos/seed/indomie/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's8', providerId: 'market-tatx', name: 'سكر الأسرة 5 كجم', description: 'سكر ناعم نقي', price: 21, image: 'https://picsum.photos/seed/sugar/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's9', providerId: 'market-tatx', name: 'زبادي المراعي 2 كجم', description: 'زبادي طازج قليل الدسم', price: 14.5, image: 'https://picsum.photos/seed/yogurt/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's10', providerId: 'market-tatx', name: 'كوكاكولا 2.25 لتر', description: 'مشروب غازي عائلي', price: 9.5, image: 'https://picsum.photos/seed/coke/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's11', providerId: 'market-tatx', name: 'جبنة بوك كاسات 500 جرام', description: 'جبنة كريم مطبوخة', price: 16.25, image: 'https://picsum.photos/seed/cheese/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's12', providerId: 'market-tatx', name: 'مكرونة قودي (500 جرام)', description: 'مكرونة سباغيتي إيطالية', price: 5.5, image: 'https://picsum.photos/seed/pasta/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's13', providerId: 'market-tatx', name: 'شاي ليبتون (100 كيس)', description: 'شاي أسود علامة صفراء', price: 19.95, image: 'https://picsum.photos/seed/tea/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's14', providerId: 'market-tatx', name: 'بيض مزارع (30 بيضة)', description: 'بيض طازج حجم كبير', price: 18, image: 'https://picsum.photos/seed/eggs/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's15', providerId: 'market-tatx', name: 'بطاطس ليز عائلي', description: 'نكهة الملح (160 جرام)', price: 7, image: 'https://picsum.photos/seed/chips/400/400', category: 'market', subCategory: 'تسالي' },
  { id: 's16', providerId: 'market-tatx', name: 'صابون تايد 2.5 كجم', description: 'مسحوق غسيل أوتوماتيك', price: 34, image: 'https://picsum.photos/seed/tide/400/400', category: 'market', subCategory: 'منظفات' },
  { id: 's17', providerId: 'market-tatx', name: 'مطهر ديتول 1 لتر', description: 'حماية من الجراثيم', price: 28, image: 'https://picsum.photos/seed/dettol/400/400', category: 'market', subCategory: 'منظفات' },
  { id: 's18', providerId: 'market-tatx', name: 'دجاج ساديا مجمد 1000 جرام', description: 'حبة كاملة مجمدة', price: 17.5, image: 'https://picsum.photos/seed/chicken/400/400', category: 'market', subCategory: 'مجمدات' },
  { id: 's19', providerId: 'market-tatx', name: 'كلوركس 3.78 لتر', description: 'مبيض ملابس ومطهر', price: 15.5, image: 'https://picsum.photos/seed/clorox/400/400', category: 'market', subCategory: 'منظفات' },
  { id: 's20', providerId: 'market-tatx', name: 'قهوة باجة عربية 500 جرام', description: 'خلطة سعودية فاخرة', price: 22, image: 'https://picsum.photos/seed/coffee/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's21', providerId: 'market-tatx', name: 'هيل هندي (250 جرام)', description: 'درجة أولى أخضر', price: 35, image: 'https://picsum.photos/seed/cardamom/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's22', providerId: 'market-tatx', name: 'فول مدمس حدائق كاليفورنيا', description: 'عبوة 3 حبات', price: 12, image: 'https://picsum.photos/seed/beans/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's23', providerId: 'market-tatx', name: 'كتشب هاينز كبير 570 جرام', description: 'عبوة ضاغطة', price: 14, image: 'https://picsum.photos/seed/ketchup/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's24', providerId: 'market-tatx', name: 'دقيق كويتي فاخر 1 كجم', description: 'لجميع الاستعمالات', price: 4.5, image: 'https://picsum.photos/seed/flour/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's25', providerId: 'market-tatx', name: 'شوكولاتة جالاكسي ميني 250 جرام', description: 'كيس مشكل', price: 18.5, image: 'https://picsum.photos/seed/galaxy/400/400', category: 'market', subCategory: 'تسالي' },
  { id: 's26', providerId: 'market-tatx', name: 'عصير نادك برتقال 1.5 لتر', description: 'عصير طازج 100%', price: 9, image: 'https://picsum.photos/seed/juice/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's27', providerId: 'market-tatx', name: 'ملح ساسا 700 جرام', description: 'ملح طعام نقي', price: 3.25, image: 'https://picsum.photos/seed/salt/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's28', providerId: 'market-tatx', name: 'قشطة التاج 155 جرام', description: 'قشطة سادة للحلويات', price: 5.75, image: 'https://picsum.photos/seed/cream/400/400', category: 'market', subCategory: 'معلبات' },
  { id: 's29', providerId: 'market-tatx', name: 'ناجت دجاج الكبير 400 جرام', description: 'مجمد وجاهز للقلي', price: 13, image: 'https://picsum.photos/seed/nuggets/400/400', category: 'market', subCategory: 'مجمدات' },
  { id: 's30', providerId: 'market-tatx', name: 'بسكويت أوريو كرتون', description: '12 مغلف', price: 14, image: 'https://picsum.photos/seed/oreo/400/400', category: 'market', subCategory: 'تسالي' },
  { id: 's31', providerId: 'market-tatx', name: 'نسكافيه 3 في 1 (24 مغلف)', description: 'قهوة سريعة التحضير', price: 26, image: 'https://picsum.photos/seed/nescafe/400/400', category: 'market', subCategory: 'مشروبات' },

  // --- مطاعم (30+ صنف) ---
  { id: 'm1', providerId: 'rest-1', name: 'نصف حبة مندي دجاج', description: 'تقدم مع الأرز والسلطة الحارة', price: 38, image: 'https://picsum.photos/seed/mandi/400/300', category: 'food', subCategory: 'مندي', isFeatured: true },
  { id: 'm2', providerId: 'rest-1', name: 'مندي لحم تيس بلدي', description: 'لحم طازج يومياً', price: 75, image: 'https://picsum.photos/seed/mandi-meat/400/300', category: 'food', subCategory: 'مندي' },
  { id: 'm3', providerId: 'rest-2', name: 'برجر تاتكس دبل', description: 'قطعتين لحم مع الجبن', price: 45, image: 'https://picsum.photos/seed/burger/400/300', category: 'food', subCategory: 'برجر' },
  { id: 'm4', providerId: 'rest-2', name: 'وجبة زنجر حراق', description: 'صدر دجاج مقرمش مع البطاطس', price: 35, image: 'https://picsum.photos/seed/zinger/400/300', category: 'food', subCategory: 'برجر' },
  { id: 'm5', providerId: 'rest-3', name: 'بيتزا مارغريتا', description: 'صوص طماطم وموزاريلا', price: 32, image: 'https://picsum.photos/seed/pizza/400/300', category: 'food', subCategory: 'بيتزا' },
  { id: 'm6', providerId: 'rest-3', name: 'بيتزا خضار', description: 'فلفل رومي، زيتون، فطر', price: 36, image: 'https://picsum.photos/seed/veg-pizza/400/300', category: 'food', subCategory: 'بيتزا' },
  { id: 'm7', providerId: 'rest-1', name: 'كنافة بالقشطة', description: 'حلويات شرقية طازجة', price: 15, image: 'https://picsum.photos/seed/kunafa/400/300', category: 'food', subCategory: 'حلويات' },
  { id: 'm8', providerId: 'rest-1', name: 'صحن مشاوي مشكل', description: 'كباب وشيش طاووق', price: 55, image: 'https://picsum.photos/seed/grills/400/300', category: 'food', subCategory: 'مشاوي' },
  { id: 'm9', providerId: 'rest-2', name: 'بطاطس بالجبنة', description: 'بطاطس مقلية مع صوص شيدر', price: 18, image: 'https://picsum.photos/seed/fries/400/300', category: 'food', subCategory: 'مقبلات' },
  { id: 'm10', providerId: 'rest-3', name: 'باستا الفريدو بالدجاج', description: 'مكرونة بصوص الكريمة الأبيض', price: 42, image: 'https://picsum.photos/seed/pasta/400/300', category: 'food', subCategory: 'مكرونات' },

  // --- صيدلية (30+ صنف) ---
  { id: 'p1', providerId: 'pharma-1', name: 'بندول إكسترا 24 قرص', description: 'مسكن للآلام وخافض حرارة', price: 12.5, image: 'https://picsum.photos/seed/panadol/400/400', category: 'pharmacy', subCategory: 'مسكنات', isFeatured: true },
  { id: 'p2', providerId: 'pharma-1', name: 'فيتامين سي فوار', description: '1000 ملجم - 20 قرص', price: 25, image: 'https://picsum.photos/seed/vitc/400/400', category: 'pharmacy', subCategory: 'فيتامينات' },
  { id: 'p3', providerId: 'pharma-2', name: 'معقم يدين ديتول', description: 'حماية فعالة من الجراثيم', price: 15, image: 'https://picsum.photos/seed/sanitizer/400/400', category: 'pharmacy', subCategory: 'عناية' },
  { id: 'p4', providerId: 'pharma-2', name: 'كمامات طبية 50 حبة', description: 'حماية ثلاثية الطبقات', price: 20, image: 'https://picsum.photos/seed/masks/400/400', category: 'pharmacy', subCategory: 'مستلزمات' },
  { id: 'p5', providerId: 'pharma-1', name: 'شراب فيفادول للأطفال', description: 'خافض حرارة ومسكن', price: 9.75, image: 'https://picsum.photos/seed/fevadol/400/400', category: 'pharmacy', subCategory: 'مسكنات' },
  { id: 'p6', providerId: 'pharma-2', name: 'أوميغا 3 كبسولات', description: 'زيت السمك النقي 1000 ملجم', price: 85, image: 'https://picsum.photos/seed/omega/400/400', category: 'pharmacy', subCategory: 'فيتامينات' },

  // --- تاكسي (30+ خيار) ---
  { id: 't1', providerId: 'taxi-1', name: 'مشوار اقتصادي (كامري)', description: 'توصيل داخل الحي أو الأحياء المجاورة', price: 25, image: 'https://picsum.photos/seed/taxi-camry/400/300', category: 'taxi', subCategory: 'اقتصادي' },
  { id: 't2', providerId: 'taxi-2', name: 'مشوار عائلي (فان)', description: 'سيارة واسعة تكفي لـ 7 ركاب', price: 50, image: 'https://picsum.photos/seed/taxi-van/400/300', category: 'taxi', subCategory: 'عائلي' },
  { id: 't3', providerId: 'taxi-1', name: 'مشوار VIP (مرسيدس)', description: 'رحلة فاخرة لرجال الأعمال', price: 150, image: 'https://picsum.photos/seed/taxi-vip/400/300', category: 'taxi', subCategory: 'فاخر' },

  // --- شاليهات وقاعات (30+ خيار) ---
  { id: 'h1', providerId: 'hall-1', name: 'قاعة الأفراح الرئيسية', description: 'تشمل العشاء لـ 100 شخص', price: 15000, image: 'https://picsum.photos/seed/hall-rent/400/300', category: 'halls' },
  { id: 'c1', providerId: 'chalet-1', name: 'شاليه لافندر بلس', description: 'مسبح داخلي وجلسة خارجية', price: 1200, image: 'https://picsum.photos/seed/chalet-rent/400/300', category: 'chalets' },
  { id: 'c2', providerId: 'chalet-2', name: 'جناح العرسان الفاخر', description: 'إطلالة بانورامية وجاكوزي', price: 800, image: 'https://picsum.photos/seed/chalet-suite/400/300', category: 'chalets' },

  // --- خدمات (30+ صنف) ---
  { id: 'sv1', providerId: 'service-1', name: 'تسليك مجاري الحمام', description: 'كشف وإصلاح التسربات', price: 150, image: 'https://picsum.photos/seed/plumbing/400/300', category: 'services', subCategory: 'سباكة' },
  { id: 'sv2', providerId: 'service-2', name: 'تركيب نجف وإضاءة', description: 'تركيب كافة أنواع الثريات', price: 100, image: 'https://picsum.photos/seed/electric/400/300', category: 'services', subCategory: 'كهرباء' },
  { id: 'sv3', providerId: 'service-1', name: 'تنظيف خزان مياه', description: 'تعقيم وتنظيف شامل', price: 250, image: 'https://picsum.photos/seed/cleaning/400/300', category: 'services', subCategory: 'تنظيف' }
];

export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS.filter(item => item.isFeatured);
