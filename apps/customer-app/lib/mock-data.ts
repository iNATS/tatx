// Mock Data for Tatx Platform
// Use this for demo/testing without database

export const mockUser = {
  id: 'user-1',
  email: 'demo@tatx.sa',
  phone: '+966500000000',
  firstName: 'Ahmed',
  firstNameAr: 'أحمد',
  lastName: 'Al-Rashid',
  lastNameAr: 'الراشد',
  avatar: null,
  role: 'CUSTOMER',
  emailVerified: true,
  phoneVerified: true,
  language: 'ar',
};

export const mockDrivers = [
  {
    id: 'driver-1',
    userId: 'user-d1',
    firstName: 'Mohammed',
    firstNameAr: 'محمد',
    lastName: 'Al-Otaibi',
    rating: 4.8,
    totalRides: 1250,
    vehicle: {
      type: 'COMFORT',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      color: 'White',
      licensePlate: 'ABC-1234',
    },
    location: { latitude: 24.7136, longitude: 46.6753 },
  },
  {
    id: 'driver-2',
    userId: 'user-d2',
    firstName: 'Khalid',
    firstNameAr: 'خالد',
    lastName: 'Al-Zahrani',
    rating: 4.9,
    totalRides: 2100,
    vehicle: {
      type: 'PREMIUM',
      make: 'Mercedes',
      model: 'C-Class',
      year: 2024,
      color: 'Black',
      licensePlate: 'XYZ-5678',
    },
    location: { latitude: 24.7150, longitude: 46.6760 },
  },
];

export const mockRestaurants = [
  {
    id: 'rest-1',
    name: 'Al-Baik',
    nameAr: 'البيك',
    slug: 'al-baik',
    description: 'Famous Saudi fried chicken restaurant',
    descriptionAr: 'مطعم دجاج مشهور سعودي',
    cuisine: ['Fast Food', 'Arabic', 'Chicken'],
    logo: '/images/restaurants/al-baik.jpg',
    banner: '/images/restaurants/al-baik-banner.jpg',
    address: 'King Fahd Road, Riyadh',
    addressAr: 'طريق الملك فهد، الرياض',
    city: 'Riyadh',
    rating: 4.5,
    totalReviews: 1250,
    deliveryTime: 30,
    deliveryFee: 3.99,
    minOrder: 15.0,
    isOpen: true,
    badges: ['POPULAR', 'FAST_DELIVERY'],
    categories: [
      {
        id: 'cat-1',
        name: 'Main Meals',
        nameAr: 'الوجبات الرئيسية',
        items: [
          {
            id: 'item-1',
            name: 'Chicken Meal (8pcs)',
            nameAr: 'وجبة دجاج 8 قطع',
            description: '8 pieces fried chicken with fries and sauce',
            descriptionAr: '8 قطع دجاج مقلي مع بطاطس وصوص',
            price: 25.0,
            image: '/images/items/chicken-meal.jpg',
            isPopular: true,
            isAvailable: true,
            prepTime: 10,
            calories: 850,
          },
          {
            id: 'item-2',
            name: 'Shrimp Meal (12pcs)',
            nameAr: 'وجبة روبيان 12 قطعة',
            description: '12 pieces fried shrimp with fries and sauce',
            descriptionAr: '12 قطعة روبيان مقلي مع بطاطس وصوص',
            price: 35.0,
            image: '/images/items/shrimp-meal.jpg',
            isPopular: true,
            isAvailable: true,
            prepTime: 12,
            calories: 650,
          },
        ],
      },
      {
        id: 'cat-2',
        name: 'Sides',
        nameAr: 'الأطباق الجانبية',
        items: [
          {
            id: 'item-3',
            name: 'French Fries',
            nameAr: 'بطاطس مقلية',
            description: 'Crispy golden fries',
            descriptionAr: 'بطاطس مقلية مقرمشة',
            price: 6.0,
            image: '/images/items/fries.jpg',
            isAvailable: true,
            prepTime: 5,
            calories: 350,
          },
          {
            id: 'item-4',
            name: 'Coleslaw',
            nameAr: 'سلطة كول سلو',
            description: 'Fresh cabbage salad',
            descriptionAr: 'سلطة كرنب طازجة',
            price: 5.0,
            image: '/images/items/coleslaw.jpg',
            isAvailable: true,
            prepTime: 2,
            calories: 150,
          },
        ],
      },
      {
        id: 'cat-3',
        name: 'Beverages',
        nameAr: 'المشروبات',
        items: [
          {
            id: 'item-5',
            name: 'Pepsi 330ml',
            nameAr: 'بيبسي 330مل',
            description: 'Cold Pepsi can',
            descriptionAr: 'علبة بيبسي باردة',
            price: 3.0,
            image: '/images/items/pepsi.jpg',
            isAvailable: true,
            prepTime: 1,
            calories: 140,
          },
        ],
      },
    ],
  },
  {
    id: 'rest-2',
    name: 'Herfy',
    nameAr: 'هرفي',
    slug: 'herfy',
    description: 'Saudi burger chain',
    descriptionAr: 'مطعم برجر سعودي',
    cuisine: ['Fast Food', 'Burgers'],
    logo: '/images/restaurants/herfy.jpg',
    rating: 4.3,
    totalReviews: 890,
    deliveryTime: 25,
    deliveryFee: 2.99,
    minOrder: 10.0,
    isOpen: true,
    badges: ['NEW'],
    categories: [],
  },
  {
    id: 'rest-3',
    name: 'Al Tazaj',
    nameAr: 'الطازج',
    slug: 'al-tazaj',
    description: 'Fresh grilled chicken',
    descriptionAr: 'دجاج طازج مشوي',
    cuisine: ['Arabic', 'Grilled'],
    logo: '/images/restaurants/al-tazaj.jpg',
    rating: 4.6,
    totalReviews: 2100,
    deliveryTime: 35,
    deliveryFee: 4.99,
    minOrder: 20.0,
    isOpen: true,
    badges: ['POPULAR'],
    categories: [],
  },
];

export const mockRides = [
  {
    id: 'ride-1',
    rideNumber: 'RID-001',
    riderId: 'user-1',
    driverId: 'driver-1',
    status: 'COMPLETED',
    pickupAddress: 'King Fahd Road, Riyadh',
    pickupAddressAr: 'طريق الملك فهد، الرياض',
    dropoffAddress: 'Riyadh Airport',
    dropoffAddressAr: 'مطار الرياض',
    pickupLatitude: 24.7136,
    pickupLongitude: 46.6753,
    dropoffLatitude: 24.9576,
    dropoffLongitude: 46.6988,
    distance: 35.5,
    duration: 30,
    vehicleType: 'COMFORT',
    baseFare: 5.0,
    distanceFare: 25.0,
    timeFare: 5.0,
    surgeMultiplier: 1.0,
    totalFare: 35.0,
    finalFare: 35.0,
    paymentMethod: 'CREDIT_CARD',
    paymentStatus: 'COMPLETED',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    completedAt: new Date('2024-01-15T11:00:00Z'),
    rating: 5,
    tip: 5.0,
  },
  {
    id: 'ride-2',
    rideNumber: 'RID-002',
    riderId: 'user-1',
    driverId: null,
    status: 'REQUESTED',
    pickupAddress: 'Olaya District, Riyadh',
    pickupAddressAr: 'حي العليا، الرياض',
    dropoffAddress: 'Kingdom Centre',
    dropoffAddressAr: 'مركز المملكة',
    pickupLatitude: 24.7050,
    pickupLongitude: 46.6800,
    dropoffLatitude: 24.7120,
    dropoffLongitude: 46.6750,
    distance: 2.5,
    duration: 10,
    vehicleType: 'ECONOMY',
    baseFare: 5.0,
    distanceFare: 6.25,
    timeFare: 2.0,
    surgeMultiplier: 1.0,
    totalFare: 13.25,
    finalFare: 13.25,
    paymentMethod: 'WALLET',
    paymentStatus: 'PENDING',
    createdAt: new Date(),
  },
];

export const mockOrders = [
  {
    id: 'order-1',
    orderNumber: 'ORD-001',
    type: 'FOOD',
    customerId: 'user-1',
    restaurantId: 'rest-1',
    restaurant: mockRestaurants[0],
    status: 'DELIVERED',
    items: [
      {
        id: 'order-item-1',
        menuItemId: 'item-1',
        name: 'Chicken Meal (8pcs)',
        nameAr: 'وجبة دجاج 8 قطع',
        quantity: 2,
        unitPrice: 25.0,
        totalPrice: 50.0,
      },
      {
        id: 'order-item-2',
        menuItemId: 'item-5',
        name: 'Pepsi 330ml',
        nameAr: 'بيبسي 330مل',
        quantity: 2,
        unitPrice: 3.0,
        totalPrice: 6.0,
      },
    ],
    subtotal: 56.0,
    deliveryFee: 3.99,
    serviceFee: 2.80,
    tax: 8.40,
    total: 71.19,
    paymentMethod: 'CREDIT_CARD',
    paymentStatus: 'COMPLETED',
    deliveryAddress: 'Home - King Fahd Road, Riyadh',
    deliveryAddressAr: 'المنزل - طريق الملك فهد، الرياض',
    createdAt: new Date('2024-01-14T19:30:00Z'),
    deliveredAt: new Date('2024-01-14T20:00:00Z'),
    rating: 5,
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-002',
    type: 'FOOD',
    customerId: 'user-1',
    restaurantId: 'rest-2',
    status: 'IN_TRANSIT',
    items: [],
    subtotal: 45.0,
    deliveryFee: 2.99,
    serviceFee: 2.25,
    tax: 6.75,
    total: 56.99,
    paymentMethod: 'WALLET',
    paymentStatus: 'COMPLETED',
    createdAt: new Date(),
  },
];

export const mockWallet = {
  id: 'wallet-1',
  customerId: 'user-1',
  balance: 250.50,
  currency: 'SAR',
  transactions: [
    {
      id: 'txn-1',
      type: 'CREDIT',
      category: 'TOPUP',
      amount: 100.0,
      balance: 250.50,
      description: 'Wallet top-up',
      descriptionAr: 'شحن المحفظة',
      createdAt: new Date('2024-01-15T09:00:00Z'),
    },
    {
      id: 'txn-2',
      type: 'DEBIT',
      category: 'RIDE',
      amount: 35.0,
      balance: 150.50,
      description: 'Ride payment - RID-001',
      descriptionAr: 'دفع رحلة - RID-001',
      referenceId: 'ride-1',
      createdAt: new Date('2024-01-15T11:00:00Z'),
    },
    {
      id: 'txn-3',
      type: 'DEBIT',
      category: 'ORDER',
      amount: 71.19,
      balance: 115.50,
      description: 'Order payment - ORD-001',
      descriptionAr: 'دفع طلب - ORD-001',
      referenceId: 'order-1',
      createdAt: new Date('2024-01-14T20:00:00Z'),
    },
  ],
};

export const mockAddresses = [
  {
    id: 'addr-1',
    customerId: 'user-1',
    label: 'Home',
    labelAr: 'المنزل',
    address: '123 King Fahd Road, Al Olaya, Riyadh',
    addressAr: '123 طريق الملك فهد، العليا، الرياض',
    city: 'Riyadh',
    district: 'Al Olaya',
    districtAr: 'العليا',
    country: 'Saudi Arabia',
    postalCode: '12211',
    latitude: 24.7136,
    longitude: 46.6753,
    isDefault: true,
    type: 'RESIDENTIAL',
  },
  {
    id: 'addr-2',
    customerId: 'user-1',
    label: 'Work',
    labelAr: 'العمل',
    address: '456 Tahlia Street, Riyadh',
    addressAr: '456 شارع التحلية، الرياض',
    city: 'Riyadh',
    district: 'Al Tahlia',
    districtAr: 'التحلية',
    country: 'Saudi Arabia',
    postalCode: '12214',
    latitude: 24.7050,
    longitude: 46.6800,
    isDefault: false,
    type: 'COMMERCIAL',
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'PUSH',
    title: 'Your ride is on the way!',
    titleAr: 'رحلتك في الطريق!',
    message: 'Driver Mohammed is arriving in 3 minutes',
    messageAr: 'السائق محمد سيصل خلال 3 دقائق',
    status: 'READ',
    readAt: new Date(),
    createdAt: new Date('2024-01-15T10:27:00Z'),
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'PUSH',
    title: 'Order confirmed!',
    titleAr: 'تم تأكيد الطلب!',
    message: 'Al-Baik is preparing your order',
    messageAr: 'البيك يحضر طلبك',
    status: 'UNREAD',
    createdAt: new Date('2024-01-15T19:35:00Z'),
  },
];

export const mockStats = {
  totalRides: 24,
  totalOrders: 56,
  totalSpent: 2450.75,
  walletBalance: 250.50,
  loyaltyPoints: 1250,
  favoriteRestaurants: ['rest-1', 'rest-2'],
  recentSearches: ['Al-Baik', 'Herfy', 'Riyadh Airport'],
};

// Helper functions to simulate API calls
export const mockApi = {
  // Auth
  login: async (email: string, password: string) => {
    await delay(500);
    if (email === 'demo@tatx.sa' && password === 'demo123') {
      return { user: mockUser, accessToken: 'mock-token-123', refreshToken: 'mock-refresh-456' };
    }
    throw new Error('Invalid credentials');
  },

  // Rides
  getRides: async () => {
    await delay(300);
    return mockRides;
  },

  createRide: async (rideData: any) => {
    await delay(500);
    return { ...rideData, id: `ride-${Date.now()}`, status: 'REQUESTED' };
  },

  estimateFare: async (pickup: any, dropoff: any, vehicleType: string) => {
    await delay(200);
    const distance = 10; // mock distance
    const baseFare = vehicleType === 'ECONOMY' ? 5 : vehicleType === 'COMFORT' ? 8 : 12;
    return {
      distance,
      duration: Math.round(distance * 2),
      baseFare,
      distanceFare: distance * 2.5,
      timeFare: 5,
      totalFare: baseFare + distance * 2.5 + 5,
    };
  },

  // Food
  getRestaurants: async () => {
    await delay(300);
    return mockRestaurants;
  },

  getRestaurant: async (id: string) => {
    await delay(200);
    return mockRestaurants.find((r) => r.id === id);
  },

  // Orders
  getOrders: async () => {
    await delay(300);
    return mockOrders;
  },

  createOrder: async (orderData: any) => {
    await delay(500);
    return { ...orderData, id: `order-${Date.now()}`, status: 'PENDING' };
  },

  // Wallet
  getWallet: async () => {
    await delay(200);
    return mockWallet;
  },

  // Addresses
  getAddresses: async () => {
    await delay(200);
    return mockAddresses;
  },

  // Notifications
  getNotifications: async () => {
    await delay(200);
    return mockNotifications;
  },

  // Stats
  getStats: async () => {
    await delay(200);
    return mockStats;
  },
};

// Helper function to simulate network delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
