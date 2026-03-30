import '../models/app_models.dart';

const appCategories = <AppCategory>[
  AppCategory(id: 'ride', name: 'مشوار', icon: 'drive_eta', colorHex: 0xFFDA3C57),
  AppCategory(id: 'restaurants', name: 'مطاعم', icon: 'restaurant', colorHex: 0xFF34C759),
  AppCategory(id: 'cafes', name: 'مقاهي', icon: 'local_cafe', colorHex: 0xFFAF8F6F),
  AppCategory(id: 'market', name: 'سوبرماركيت', icon: 'shopping_basket', colorHex: 0xFFF28CA0),
  AppCategory(id: 'wholesale', name: 'سوق الجملة', icon: 'layers', colorHex: 0xFF9B5068),
  AppCategory(id: 'toys', name: 'العاب اطفال', icon: 'toys', colorHex: 0xFF5E5CE6),
  AppCategory(id: 'gifts', name: 'عطور وهدايا', icon: 'redeem', colorHex: 0xFFAF52DE),
  AppCategory(id: 'pharmacy', name: 'صيدلية', icon: 'medication', colorHex: 0xFFFF453A),
];

const homeOffers = <OfferBanner>[
  OfferBanner(
    id: 'o1',
    title: 'خصم 30%',
    subtitle: 'على الوجبات العائلية حتى 11 مساءً',
    vendor: 'برجر السرايا',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900',
  ),
  OfferBanner(
    id: 'o2',
    title: 'توصيل مجاني',
    subtitle: 'على الطلبات فوق 120 ريال',
    vendor: 'سلة الرياض',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900',
  ),
];

const restaurants = <Restaurant>[
  Restaurant(
    id: 'r1',
    name: 'برجر السرايا',
    subtitle: 'برجر ووجبات سريعة',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900',
    rating: 4.8,
    deliveryTime: '25-35 دقيقة',
    deliveryFee: 7,
    minimumOrder: 25,
    promo: 'خصم 20% على أول طلب',
    groups: [
      MenuGroup(
        id: 'g1',
        title: 'البرجر',
        items: [
          MenuItem(
            id: 'm1',
            name: 'برجر دبل انجس',
            description: 'وجبة كاملة مع بطاطس ومشروب',
            price: 29,
            imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
            time: '25 دقيقة',
            tag: 'الأكثر طلبًا',
          ),
          MenuItem(
            id: 'm2',
            name: 'تشيز برجر كلاسيك',
            description: 'برجر لحم مع جبنة وصوص خاص',
            price: 23,
            imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
            time: '21 دقيقة',
          ),
        ],
      ),
      MenuGroup(
        id: 'g2',
        title: 'الإضافات',
        items: [
          MenuItem(
            id: 'm3',
            name: 'بطاطس متبلة',
            description: 'حجم كبير مع تتبيلة خاصة',
            price: 12,
            imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500',
            time: '18 دقيقة',
          ),
        ],
      ),
    ],
  ),
  Restaurant(
    id: 'r2',
    name: 'بيتزا البيت',
    subtitle: 'بيتزا ومقبلات',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900',
    rating: 4.7,
    deliveryTime: '30-40 دقيقة',
    deliveryFee: 9,
    minimumOrder: 30,
    promo: 'اطلب 2 بيتزا والثالثة بنصف السعر',
    groups: [
      MenuGroup(
        id: 'g3',
        title: 'البيتزا',
        items: [
          MenuItem(
            id: 'm4',
            name: 'بيتزا مارجريتا',
            description: 'حجم متوسط مع جبنة موزاريلا طازجة',
            price: 34,
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
            time: '30 دقيقة',
          ),
          MenuItem(
            id: 'm5',
            name: 'بيتزا بيبروني',
            description: 'حجم كبير مع بيبروني ولحم بقري',
            price: 42,
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500',
            time: '35 دقيقة',
            tag: 'الأكثر طلبًا',
          ),
        ],
      ),
    ],
  ),
  Restaurant(
    id: 'r3',
    name: 'مذاق نجد',
    subtitle: 'أكلات سعودية وعائلية',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900',
    rating: 4.9,
    deliveryTime: '35-50 دقيقة',
    deliveryFee: 11,
    minimumOrder: 40,
    promo: 'وجبات عائلية بعروض نهاية الأسبوع',
    groups: [
      MenuGroup(
        id: 'g4',
        title: 'الأطباق الرئيسية',
        items: [
          MenuItem(
            id: 'm6',
            name: 'وجبة مندي',
            description: 'مندي لحم أو دجاج مع رز',
            price: 58,
            imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500',
            time: '40 دقيقة',
            tag: 'توقيع المطعم',
          ),
        ],
      ),
    ],
  ),
];

const wholesaleGroups = <WholesaleGroup>[
  WholesaleGroup(id: 'w1', title: 'توريدات الجملة', subtitle: 'أسعار خاصة للشراء المتكرر'),
  WholesaleGroup(id: 'w2', title: 'توريدات مطاعم', subtitle: 'مواد تشغيل وضيافة ومواد غذائية'),
  WholesaleGroup(id: 'w3', title: 'توريدات فنادق', subtitle: 'مستهلكات وضيافة وتشغيل يومي'),
];

const onboardingPages = <({String title, String body, String imageUrl})>[
  (
    title: 'كل خدماتك اليومية في تطبيق واحد',
    body: 'تنقل، اطلب مطاعم، تسوق، وادخل سوق الجملة بتجربة عربية حديثة.',
    imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1000'
  ),
  (
    title: 'مطاعم ومنيو منظم بالمجموعات',
    body: 'افتح المطعم، تصفح المجموعات، وأضف الأصناف للسلة بسرعة.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000'
  ),
  (
    title: 'واجهة Flutter بMaterial 3 واتجاه RTL',
    body: 'تجربة حديثة مبنية لتكون سريعة وواضحة وقابلة للتوسع.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000'
  ),
];

const appNotifications = <AppNotification>[
  AppNotification(
    id: 'n1',
    title: 'تم قبول طلبك',
    body: 'مطعم برجر السرايا بدأ تجهيز الطلب الخاص بك.',
    timeLabel: 'منذ 5 دقائق',
  ),
  AppNotification(
    id: 'n2',
    title: 'عرض جديد في سوق الجملة',
    body: 'توريدات مطاعم بعقود شهرية وأسعار خاصة اليوم.',
    timeLabel: 'منذ 20 دقيقة',
  ),
  AppNotification(
    id: 'n3',
    title: 'تمت إضافة عنصر إلى السلة',
    body: 'يمكنك الآن متابعة الطلب أو إكمال التسوق.',
    timeLabel: 'الآن',
  ),
];
