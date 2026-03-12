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
  isFeatured?: boolean;
}

export const CATEGORIES = [
  { id: 'food', name: 'طعام', icon: 'Utensils' },
  { id: 'taxi', name: 'تاكسي', icon: 'Car' },
  { id: 'services', name: 'خدمات', icon: 'Wrench' },
  { id: 'halls', name: 'قاعات', icon: 'PartyPopper' },
  { id: 'chalets', name: 'شاليهات', icon: 'Home' },
  { id: 'market', name: 'ماركت', icon: 'Store' },
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
    name: 'قاعة الزمردة',
    description: 'أفخم القاعات لمناسباتكم السعيدة',
    rating: 4.7,
    image: 'https://picsum.photos/seed/hall/600/400',
    category: 'halls'
  },
  {
    id: '4',
    name: 'شاليه لافندر',
    description: 'استرخاء وهدوء مع مسبح خاص',
    rating: 4.6,
    image: 'https://picsum.photos/seed/chalet/600/400',
    category: 'chalets'
  },
  {
    id: '5',
    name: 'ماركت تاتكس',
    description: 'كل احتياجاتك المنزلية في مكان واحد',
    rating: 4.5,
    image: 'https://picsum.photos/seed/market/600/400',
    category: 'market'
  },
  {
    id: '6',
    name: 'صيدلية الشفاء',
    description: 'رعاية صحية وتوصيل سريع للأدوية',
    rating: 4.9,
    image: 'https://picsum.photos/seed/pharmacy/600/400',
    category: 'pharmacy',
    isPopular: true
  }
];

export const FEATURED_ITEMS: MenuItem[] = [
  {
    id: 'f1',
    providerId: '1',
    name: 'وجبة البرجر الكلاسيكي',
    description: 'قطعة لحم فاخرة مع الجبن والخضروات الطازجة',
    price: 35,
    image: 'https://picsum.photos/seed/f1/400/300',
    category: 'food',
    isFeatured: true
  },
  {
    id: 'f2',
    providerId: '5',
    name: 'صندوق الفواكه الطازجة',
    description: 'تشكيلة مختارة من فواكه الموسم',
    price: 45,
    image: 'https://picsum.photos/seed/f2/400/300',
    category: 'market',
    isFeatured: true
  },
  {
    id: 'f3',
    providerId: '2',
    name: 'رحلة داخل المدينة',
    description: 'توصيل مريح إلى أي نقطة في الرياض',
    price: 25,
    image: 'https://picsum.photos/seed/f3/400/300',
    category: 'taxi',
    isFeatured: true
  }
];