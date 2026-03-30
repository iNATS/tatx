export const vendorStores = {
  'مطاعم': [
    {
      id: 'r1',
      name: 'برجر السرايا',
      subtitle: 'برجر ووجبات سريعة',
      cuisine: 'برجر • وجبات سريعة',
      rating: 4.8,
      deliveryTime: '25-35 دقيقة',
      deliveryFee: 7,
      minimumOrder: 25,
      promo: 'خصم 20% على أول طلب',
      badges: ['الأكثر طلبًا', 'توصيل سريع'],
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900',
      menuGroups: [
        {
          id: 'burgers',
          title: 'البرجر',
          items: [
            { id: 'ri1', name: 'برجر دبل انجس', price: 29, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', description: 'وجبة كاملة مع بطاطس ومشروب', rating: 4.8, time: '25 دقيقة', tag: 'الأكثر طلبًا' },
            { id: 'ri2', name: 'تشيز برجر كلاسيك', price: 23, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', description: 'برجر لحم مع جبنة وصوص خاص', rating: 4.6, time: '21 دقيقة', tag: 'عرض اليوم' },
          ],
        },
        {
          id: 'chicken',
          title: 'الدجاج',
          items: [
            { id: 'ri3', name: 'تشيكن كرسبي', price: 24, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400', description: 'ساندوتش دجاج مقرمش مع صوص رانش', rating: 4.7, time: '22 دقيقة', tag: 'مميز' },
            { id: 'ri4', name: 'ستربس 6 قطع', price: 27, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', description: 'قطع دجاج مقلية مع صوصين', rating: 4.5, time: '20 دقيقة', tag: 'جديد' },
          ],
        },
        {
          id: 'sides',
          title: 'الإضافات',
          items: [
            { id: 'ri5', name: 'بطاطس متبلة', price: 12, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400', description: 'حجم كبير مع تتبيلة خاصة', rating: 4.5, time: '18 دقيقة' },
            { id: 'ri6', name: 'حلقات بصل', price: 13, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400', description: 'مقرمشة وخفيفة', rating: 4.4, time: '17 دقيقة' },
          ],
        },
      ],
    },
    {
      id: 'r2',
      name: 'بيتزا البيت',
      subtitle: 'بيتزا ومقبلات',
      cuisine: 'بيتزا • مقبلات',
      rating: 4.7,
      deliveryTime: '30-40 دقيقة',
      deliveryFee: 9,
      minimumOrder: 30,
      promo: 'اطلب 2 بيتزا والثالثة بنصف السعر',
      badges: ['عائلي', 'عروض مستمرة'],
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900',
      menuGroups: [
        {
          id: 'pizza',
          title: 'البيتزا',
          items: [
            { id: 'ri7', name: 'بيتزا مارجريتا', price: 34, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', description: 'حجم متوسط مع جبنة موزاريلا طازجة', rating: 4.6, time: '30 دقيقة', tag: 'اقتصادي' },
            { id: 'ri8', name: 'بيتزا بيبروني', price: 42, image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400', description: 'حجم كبير مع بيبروني ولحم بقري', rating: 4.8, time: '35 دقيقة', tag: 'الأكثر طلبًا' },
          ],
        },
        {
          id: 'appetizers',
          title: 'المقبلات',
          items: [
            { id: 'ri9', name: 'خبز بالثوم', price: 14, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400', description: 'خبز طازج مع صوص الجبن', rating: 4.5, time: '19 دقيقة' },
            { id: 'ri10', name: 'أجنحة حارة', price: 22, image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400', description: '6 قطع بصوص حار أو باربكيو', rating: 4.4, time: '24 دقيقة' },
          ],
        },
      ],
    },
    {
      id: 'r3',
      name: 'مذاق نجد',
      subtitle: 'أكلات سعودية',
      cuisine: 'أطباق سعودية • عائلي',
      rating: 4.9,
      deliveryTime: '35-50 دقيقة',
      deliveryFee: 11,
      minimumOrder: 40,
      promo: 'وجبات عائلية بعروض نهاية الأسبوع',
      badges: ['عائلي', 'مفضلة العملاء'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900',
      menuGroups: [
        {
          id: 'main',
          title: 'الأطباق الرئيسية',
          items: [
            { id: 'ri11', name: 'وجبة مندي', price: 58, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400', description: 'مندي لحم أو دجاج مع رز', rating: 4.9, time: '40 دقيقة', tag: 'توقيع المطعم' },
            { id: 'ri12', name: 'قرصان', price: 36, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400', description: 'وجبة فردية بطابع نجدي أصيل', rating: 4.5, time: '32 دقيقة', tag: 'محلي' },
          ],
        },
        {
          id: 'family',
          title: 'العائلي',
          items: [
            { id: 'ri13', name: 'صينية عائلية', price: 129, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', description: 'تكفي 4 إلى 5 أشخاص', rating: 4.8, time: '48 دقيقة', tag: 'عائلي' },
          ],
        },
      ],
    },
  ],
  'مقاهي': [
    {
      id: 'c1',
      name: 'كافيه الموج',
      subtitle: 'قهوة مختصة وحلويات',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900',
      menuGroups: [
        {
          id: 'hot',
          title: 'المشروبات الساخنة',
          items: [
            { id: 'ci1', name: 'لاتيه زعفران', price: 19, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', description: 'مشروب ساخن بنكهة الزعفران', rating: 4.7, time: '14 دقيقة' },
            { id: 'ci2', name: 'كابتشينو', price: 18, image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400', description: 'رغوة حليب كثيفة ونكهة متوازنة', rating: 4.8, time: '13 دقيقة' },
          ],
        },
        {
          id: 'desserts',
          title: 'الحلويات',
          items: [
            { id: 'ci3', name: 'كوكيز شوكولاتة', price: 12, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', description: 'مخبوزات يومية طازجة', rating: 4.6, time: '16 دقيقة' },
            { id: 'ci4', name: 'تشيز كيك', price: 17, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', description: 'قطعة يومية بطعم الفانيلا', rating: 4.5, time: '15 دقيقة' },
          ],
        },
      ],
    },
  ],
  'هدايا': [
    {
      id: 'g1',
      name: 'ورد نجد',
      subtitle: 'تنسيقات ورد وهدايا',
      image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=900',
      menuGroups: [
        {
          id: 'bouquets',
          title: 'الباقات',
          items: [
            { id: 'gi1', name: 'باقة ورد كلاسيك', price: 145, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400', description: 'تنسيق أنيق للمناسبات', rating: 4.9, time: '50 دقيقة' },
            { id: 'gi2', name: 'باقة مواليد', price: 220, image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400', description: 'ورد مع بطاقة تهنئة', rating: 4.8, time: '60 دقيقة' },
          ],
        },
        {
          id: 'gifts',
          title: 'الهدايا',
          items: [
            { id: 'gi3', name: 'بوكس شوكولاتة', price: 95, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', description: 'علبة أنيقة مع تنسيق فاخر', rating: 4.7, time: '40 دقيقة' },
          ],
        },
      ],
    },
  ],
};

export const flattenStoreItems = (store) => (store?.menuGroups || []).flatMap((group) => group.items || []);

export const getStoreItemCount = (store) => flattenStoreItems(store).length;
