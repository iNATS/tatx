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
  {
    id: 'rest-1',
    name: 'مطعم قصر المندي',
    description: 'أجود أنواع اللحوم والمندي الشعبي الأصيل بضمان جودة تاتكس',
    rating: 4.8,
    deliveryTime: '30-45 دقيقة',
    minOrder: 30,
    image: 'https://picsum.photos/seed/mandi-rest/600/400',
    category: 'food',
    isPopular: true
  },
  {
    id: 'pharma-1',
    name: 'صيدلية تاتكس المركزية',
    description: 'رعايتكم الصحية هي أولويتنا، توفر جميع الأدوية والمستلزمات',
    rating: 4.9,
    image: 'https://picsum.photos/seed/pharma1/600/400',
    category: 'pharmacy',
    isPopular: true
  },
  {
    id: 'serv-1',
    name: 'تاتكس للخدمات المنزلية',
    description: 'سباكة، كهرباء، صيانة مكيفات بضمان تاتكس المباشر',
    rating: 4.8,
    image: 'https://picsum.photos/seed/services/600/400',
    category: 'services'
  },
  {
    id: 'chalet-1',
    name: 'منتجعات تاتكس الفاخرة',
    description: 'أفضل الشاليهات للاستجمام العائلي والخصوصية التامة',
    rating: 4.9,
    image: 'https://picsum.photos/seed/chalet/600/400',
    category: 'chalets'
  },
  {
    id: 'hall-1',
    name: 'قاعات تاتكس للمناسبات',
    description: 'قاعات فخمة لجميع مناسباتكم السعيدة بتنظيم احترافي',
    rating: 5.0,
    image: 'https://picsum.photos/seed/halls/600/400',
    category: 'halls'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- السوبر ماركت (12 items) ---
  { id: 's1', providerId: 'market-tatx', name: 'بيبسي كرتون (30 علبة)', description: 'علب 325 مل الأصلية', price: 65, image: 'https://picsum.photos/seed/pepsi/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's2', providerId: 'market-tatx', name: 'أرز الشعلان 5 كجم', description: 'أرز بسمتي أبيض هندي', price: 42.5, image: 'https://picsum.photos/seed/rice/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's3', providerId: 'market-tatx', name: 'حليب المراعي 1 لتر', description: 'حليب طازج كامل الدسم', price: 6, image: 'https://picsum.photos/seed/milk/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's4', providerId: 'market-tatx', name: 'بيض طازج (30 حبة)', description: 'بيض مزارع وطني', price: 18, image: 'https://picsum.photos/seed/eggs/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's5', providerId: 'market-tatx', name: 'زيت دوار الشمس 1.5 لتر', description: 'زيت قلي نقي', price: 14, image: 'https://picsum.photos/seed/oil/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's6', providerId: 'market-tatx', name: 'سكر الأسرة 5 كجم', description: 'سكر ناعم نقي', price: 22, image: 'https://picsum.photos/seed/sugar/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's7', providerId: 'market-tatx', name: 'خبز توست أبيض', description: 'خبز طازج يومي', price: 5, image: 'https://picsum.photos/seed/bread/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's8', providerId: 'market-tatx', name: 'جبنة فيتا 500 جم', description: 'جبنة بيضاء مملحة', price: 12, image: 'https://picsum.photos/seed/cheese/400/400', category: 'market', subCategory: 'ألبان' },
  { id: 's9', providerId: 'market-tatx', name: 'مكرونة قودي 500 جم', description: 'مكرونة إيطالية الجودة', price: 4.5, image: 'https://picsum.photos/seed/pasta-m/400/400', category: 'market', subCategory: 'أغذية' },
  { id: 's10', providerId: 'market-tatx', name: 'شاي ليبتون 100 كيس', description: 'شاي أسود كلاسيك', price: 15, image: 'https://picsum.photos/seed/tea/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's11', providerId: 'market-tatx', name: 'قهوة نسكافيه 200 جم', description: 'قهوة سريعة التحضير', price: 28, image: 'https://picsum.photos/seed/coffee/400/400', category: 'market', subCategory: 'مشروبات' },
  { id: 's12', providerId: 'market-tatx', name: 'لبن عيران 1.5 لتر', description: 'لبن طازج ومنعش', price: 8, image: 'https://picsum.photos/seed/ayran/400/400', category: 'market', subCategory: 'ألبان' },

  // --- المطاعم (10 items) ---
  { id: 'm1', providerId: 'rest-1', name: 'نصف حبة مندي دجاج', description: 'تقدم مع الأرز والسلطة الحارة', price: 38, image: 'https://picsum.photos/seed/mandi/400/300', category: 'food', subCategory: 'مندي', isFeatured: true },
  { id: 'm2', providerId: 'rest-1', name: 'مندي لحم نفر', description: 'لحم بلدي طازج مع الأرز', price: 75, image: 'https://picsum.photos/seed/mandi-meat/400/300', category: 'food', subCategory: 'مندي' },
  { id: 'm3', providerId: 'rest-1', name: 'مندي دجاج حبة كاملة', description: 'دجاج متبل بخلطة خاصة', price: 70, image: 'https://picsum.photos/seed/chicken-whole/400/300', category: 'food', subCategory: 'مندي' },
  { id: 'm4', providerId: 'rest-1', name: 'جريش سعودي', description: 'طبق شعبي أصيل باللبن', price: 25, image: 'https://picsum.photos/seed/jareesh/400/300', category: 'food', subCategory: 'شعبي' },
  { id: 'm5', providerId: 'rest-1', name: 'قرصان فاخر', description: 'خبز القرصان مع الخضار والمرق', price: 25, image: 'https://picsum.photos/seed/qursan/400/300', category: 'food', subCategory: 'شعبي' },
  { id: 'm6', providerId: 'rest-1', name: 'سلطة خضراء طازجة', description: 'خضروات موسمية يومية', price: 12, image: 'https://picsum.photos/seed/salad/400/300', category: 'food', subCategory: 'مقبلات' },
  { id: 'm7', providerId: 'rest-1', name: 'كنافة بالقشطة ساخنة', description: 'حلى شعبي أصيل', price: 15, image: 'https://picsum.photos/seed/kunafa/400/300', category: 'food', subCategory: 'حلويات' },
  { id: 'm8', providerId: 'rest-1', name: 'بيبسي بارد', description: 'مشروب غازي منعش', price: 3, image: 'https://picsum.photos/seed/pepsi-s/400/300', category: 'food', subCategory: 'مشروبات' },
  { id: 'm9', providerId: 'rest-1', name: 'أرز مندي سادة', description: 'أرز طويل الحبة مطهو بالحطب', price: 15, image: 'https://picsum.photos/seed/rice-plain/400/300', category: 'food', subCategory: 'مندي' },
  { id: 'm10', providerId: 'rest-1', name: 'سمبوسة لحم (6 حبات)', description: 'مقرمشة ومحشوة باللحم الطازج', price: 18, image: 'https://picsum.photos/seed/sambosa/400/300', category: 'food', subCategory: 'مقبلات' },

  // --- الصيدلية (10 items) ---
  { id: 'p1', providerId: 'pharma-1', name: 'بندول إكسترا 24 قرص', description: 'مسكن للآلام وخافض حرارة', price: 12.5, image: 'https://picsum.photos/seed/panadol/400/400', category: 'pharmacy', subCategory: 'مسكنات', isFeatured: true },
  { id: 'p2', providerId: 'pharma-1', name: 'فيتامين سي فوار', description: 'لتعزيز المناعة اليومية', price: 25, image: 'https://picsum.photos/seed/vitc/400/400', category: 'pharmacy', subCategory: 'فيتامينات' },
  { id: 'p3', providerId: 'pharma-1', name: 'مطهر يدين 500 مل', description: 'حماية فعالة ضد الجراثيم', price: 15, image: 'https://picsum.photos/seed/sanitizer/400/400', category: 'pharmacy', subCategory: 'عناية' },
  { id: 'p4', providerId: 'pharma-1', name: 'كمامات طبية 50 حبة', description: 'حماية تنفسية عالية الجودة', price: 20, image: 'https://picsum.photos/seed/mask/400/400', category: 'pharmacy', subCategory: 'عناية' },
  { id: 'p5', providerId: 'pharma-1', name: 'لاصق جروح مشكل', description: 'أحجام متنوعة للجروح البسيطة', price: 10, image: 'https://picsum.photos/seed/bandaid/400/400', category: 'pharmacy', subCategory: 'عناية' },
  { id: 'p6', providerId: 'pharma-1', name: 'أوميغا 3 مكمل غذائي', description: 'لصحة القلب والتركيز', price: 45, image: 'https://picsum.photos/seed/omega/400/400', category: 'pharmacy', subCategory: 'فيتامينات' },
  { id: 'p7', providerId: 'pharma-1', name: 'جهاز قياس الضغط', description: 'جهاز رقمي دقيق للاستخدام المنزلي', price: 195, image: 'https://picsum.photos/seed/bp-monitor/400/400', category: 'pharmacy', subCategory: 'أجهزة' },
  { id: 'p8', providerId: 'pharma-1', name: 'شامبو طبي للقشرة', description: 'علاج فعال ومجرب لقشرة الرأس', price: 42, image: 'https://picsum.photos/seed/shampoo/400/400', category: 'pharmacy', subCategory: 'عناية' },
  { id: 'p9', providerId: 'pharma-1', name: 'كريم مرطب بيبانثين', description: 'للبشرة الجافة والمتهيجة', price: 35, image: 'https://picsum.photos/seed/bephanten/400/400', category: 'pharmacy', subCategory: 'عناية' },
  { id: 'p10', providerId: 'pharma-1', name: 'شرائط قياس السكر', description: 'لأجهزة قياس السكر المنزلية', price: 85, image: 'https://picsum.photos/seed/test-strips/400/400', category: 'pharmacy', subCategory: 'أجهزة' },

  // --- خدمات (10 items) ---
  { id: 'ser1', providerId: 'serv-1', name: 'تنظيف مكيف سبليت', description: 'تنظيف شامل بضمان تاتكس', price: 150, image: 'https://picsum.photos/seed/ac/400/400', category: 'services', subCategory: 'تكييف' },
  { id: 'ser2', providerId: 'serv-1', name: 'صيانة سباكة عامة', description: 'إصلاح التسريبات والتركيبات', price: 100, image: 'https://picsum.photos/seed/plumbing/400/400', category: 'services', subCategory: 'سباكة' },
  { id: 'ser3', providerId: 'serv-1', name: 'فحص كهرباء منزلي', description: 'كشف الأعطال وتغيير الأفياش', price: 120, image: 'https://picsum.photos/seed/electric/400/400', category: 'services', subCategory: 'كهرباء' },
  { id: 'ser4', providerId: 'serv-1', name: 'تنظيف سجاد عميق', description: 'تنظيف بالبخار لإزالة البقع', price: 200, image: 'https://picsum.photos/seed/carpet/400/400', category: 'services', subCategory: 'نظافة' },
  { id: 'ser5', providerId: 'serv-1', name: 'مكافحة الحشرات المنزلية', description: 'رش مبيدات آمنة وفعالة', price: 350, image: 'https://picsum.photos/seed/pest/400/400', category: 'services', subCategory: 'نظافة' },
  { id: 'ser6', providerId: 'serv-1', name: 'تلميع سيارة متنقل', description: 'تلميع خارجي وداخلي في موقعك', price: 400, image: 'https://picsum.photos/seed/car-polish/400/400', category: 'services', subCategory: 'سيارات' },
  { id: 'ser7', providerId: 'serv-1', name: 'تغيير زيت سيارة منزلي', description: 'نأتي إليك لتغيير الزيت والفلتر', price: 250, image: 'https://picsum.photos/seed/oil-change/400/400', category: 'services', subCategory: 'سيارات' },
  { id: 'ser8', providerId: 'serv-1', name: 'تنظيف خزانات مياه', description: 'تعقيم وتنظيف شامل للخزانات', price: 300, image: 'https://picsum.photos/seed/tank/400/400', category: 'services', subCategory: 'نظافة' },
  { id: 'ser9', providerId: 'serv-1', name: 'صيانة غسالات ملابس', description: 'إصلاح جميع الأعطال المنزلية', price: 150, image: 'https://picsum.photos/seed/washer/400/400', category: 'services', subCategory: 'صيانة' },
  { id: 'ser10', providerId: 'serv-1', name: 'تركيب شاشات جدارية', description: 'تركيب احترافي مع حامل جداري', price: 80, image: 'https://picsum.photos/seed/tv-mount/400/400', category: 'services', subCategory: 'صيانة' },

  // --- شاليهات (10 items) ---
  { id: 'ch1', providerId: 'chalet-1', name: 'شاليه تاتكس رويال', description: 'مسبح خاص، مسطحات خضراء واسعة', price: 1200, image: 'https://picsum.photos/seed/chalet1/400/400', category: 'chalets', subCategory: 'شاليهات' },
  { id: 'ch2', providerId: 'chalet-1', name: 'شاليه اللافندر الهادئ', description: 'خصوصية تامة واستجمام عائلي', price: 900, image: 'https://picsum.photos/seed/chalet2/400/400', category: 'chalets', subCategory: 'شاليهات' },
  { id: 'ch3', providerId: 'chalet-1', name: 'منتجع تاتكس سكاي', description: 'إطلالة بانورامية ومسبح تدفئة', price: 1800, image: 'https://picsum.photos/seed/chalet3/400/400', category: 'chalets', subCategory: 'منتجعات' },
  { id: 'ch4', providerId: 'chalet-1', name: 'شاليه الياسمين للعائلات', description: 'ألعاب مائية للأطفال وجلسات خارجية', price: 850, image: 'https://picsum.photos/seed/chalet4/400/400', category: 'chalets', subCategory: 'شاليهات' },
  { id: 'ch5', providerId: 'chalet-1', name: 'استراحة الواحة الكبرى', description: 'قسمين للرجال والنساء وملعب كرة', price: 1500, image: 'https://picsum.photos/seed/chalet5/400/400', category: 'chalets', subCategory: 'استراحات' },
  { id: 'ch6', providerId: 'chalet-1', name: 'شاليه النرجس المودرن', description: 'تصميم عصري وسينما منزلية', price: 1100, image: 'https://picsum.photos/seed/chalet6/400/400', category: 'chalets', subCategory: 'شاليهات' },
  { id: 'ch7', providerId: 'chalet-1', name: 'شاليه المالديف الصغير', description: 'تصميم بحري وجلسات رملية', price: 1300, image: 'https://picsum.photos/seed/chalet7/400/400', category: 'chalets', subCategory: 'منتجعات' },
  { id: 'ch8', providerId: 'chalet-1', name: 'مخيم الشتاء الفاخر', description: 'تجربة برية مع كافة الخدمات الفندقية', price: 700, image: 'https://picsum.photos/seed/chalet8/400/400', category: 'chalets', subCategory: 'مخيمات' },
  { id: 'ch9', providerId: 'chalet-1', name: 'شاليه الريم الريفي', description: 'أجواء ريفية هادئة وجلسات تراثية', price: 950, image: 'https://picsum.photos/seed/chalet9/400/400', category: 'chalets', subCategory: 'شاليهات' },
  { id: 'ch10', providerId: 'chalet-1', name: 'استراحة البركة الخاصة', description: 'مسبح داخلي وجلسات عائلية مغلقة', price: 1000, image: 'https://picsum.photos/seed/chalet10/400/400', category: 'chalets', subCategory: 'استراحات' },

  // --- قاعات (10 items) ---
  { id: 'h1', providerId: 'hall-1', name: 'قاعة الأساطير الكبرى', description: 'فخامة لا توصف للمناسبات الكبيرة', price: 15000, image: 'https://picsum.photos/seed/hall1/400/400', category: 'halls', subCategory: 'أعراس' },
  { id: 'h2', providerId: 'hall-1', name: 'قاعة ليلة العمر الصغرى', description: 'مناسبة للمناسبات العائلية الخاصة', price: 8000, image: 'https://picsum.photos/seed/hall2/400/400', category: 'halls', subCategory: 'أعراس' },
  { id: 'h3', providerId: 'hall-1', name: 'قاعة تاتكس بيزنس', description: 'مجهزة للاجتماعات والمؤتمرات الذكية', price: 3000, image: 'https://picsum.photos/seed/hall3/400/400', category: 'halls', subCategory: 'مؤتمرات' },
  { id: 'h4', providerId: 'hall-1', name: 'خيمة المناسبات الملكية', description: 'تصميم تراثي فخم وتجهيزات كاملة', price: 12000, image: 'https://picsum.photos/seed/hall4/400/400', category: 'halls', subCategory: 'احتفالات' },
  { id: 'h5', providerId: 'hall-1', name: 'قاعة المها للخطوبة', description: 'أجواء حميمية وتنسيق ورد طبيعي', price: 6000, image: 'https://picsum.photos/seed/hall5/400/400', category: 'halls', subCategory: 'احتفالات' },
  { id: 'h6', providerId: 'hall-1', name: 'قاعة المؤتمرات الدولية', description: 'ترجمة فورية وأحدث أنظمة الصوت', price: 18000, image: 'https://picsum.photos/seed/hall6/400/400', category: 'halls', subCategory: 'مؤتمرات' },
  { id: 'h7', providerId: 'hall-1', name: 'ديوانية تاتكس للمناسبات', description: 'مكان تراثي للمناسبات الرجالية', price: 1500, image: 'https://picsum.photos/seed/hall7/400/400', category: 'halls', subCategory: 'احتفالات' },
  { id: 'h8', providerId: 'hall-1', name: 'قاعة تدريب وتطوير', description: 'كراسي مريحة وسبورات ذكية', price: 2500, image: 'https://picsum.photos/seed/hall8/400/400', category: 'halls', subCategory: 'مؤتمرات' },
  { id: 'h9', providerId: 'hall-1', name: 'قاعة حفلات التخرج', description: 'منصة عرض واسعة وإضاءة احترافية', price: 7000, image: 'https://picsum.photos/seed/hall9/400/400', category: 'halls', subCategory: 'احتفالات' },
  { id: 'h10', providerId: 'hall-1', name: 'قاعة لؤلؤة تاتكس', description: 'إطلالة خلابة وخدمة فندقية 5 نجوم', price: 20000, image: 'https://picsum.photos/seed/hall10/400/400', category: 'halls', subCategory: 'أعراس' },
];

export const FEATURED_ITEMS: MenuItem[] = MENU_ITEMS.filter(item => item.isFeatured);

export const Taxis = [
  { id: 'eco', name: 'توفير', price: 1.5, image: 'https://picsum.photos/seed/car-eco/100/100', time: '3 دقائق' },
  { id: 'comfort', name: 'مريح', price: 2.2, image: 'https://picsum.photos/seed/car-comfort/100/100', time: '5 دقائق' },
  { id: 'vip', name: 'VIP', price: 4.5, image: 'https://picsum.photos/seed/car-vip/100/100', time: '7 دقائق' },
  { id: 'family', name: 'عائلي', price: 3.0, image: 'https://picsum.photos/seed/car-family/100/100', time: '4 دقائق' },
];
