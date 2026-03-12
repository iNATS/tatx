/**
 * Tatx Platform - Database Seed Script
 * 
 * This script populates the database with initial data for:
 * - Saudi Arabian cities
 * - Subscription plans
 * - Sample users (admin, driver, merchant, customer)
 * - Sample restaurants and menu items
 * - Promo codes
 * - System settings
 */

import { PrismaClient, UserRole, VehicleType, OrderType, PaymentMethod } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ===========================================
// Helper Functions
// ===========================================

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function createUser({
  email,
  phone,
  firstName,
  firstNameAr,
  lastName,
  lastNameAr,
  password,
  role,
  language = 'ar',
}: {
  email: string;
  phone: string;
  firstName: string;
  firstNameAr?: string;
  lastName: string;
  lastNameAr?: string;
  password: string;
  role: UserRole;
  language?: string;
}) {
  const hashedPassword = await hashPassword(password);
  
  return prisma.user.create({
    data: {
      email,
      phone,
      password: hashedPassword,
      firstName,
      firstNameAr,
      lastName,
      lastNameAr,
      role,
      language,
      emailVerified: true,
      phoneVerified: true,
    },
  });
}

// ===========================================
// Seed Data
// ===========================================

async function seedCities() {
  console.log('🏙️  Seeding cities...');

  const cities = [
    {
      name: 'Riyadh',
      nameAr: 'الرياض',
      slug: 'riyadh',
      latitude: 24.7136,
      longitude: 46.6753,
      isLaunch: true,
    },
    {
      name: 'Jeddah',
      nameAr: 'جدة',
      slug: 'jeddah',
      latitude: 21.5433,
      longitude: 39.1728,
      isLaunch: true,
    },
    {
      name: 'Dammam',
      nameAr: 'الدمام',
      slug: 'dammam',
      latitude: 26.4207,
      longitude: 50.0888,
      isLaunch: true,
    },
    {
      name: 'Makkah',
      nameAr: 'مكة المكرمة',
      slug: 'makkah',
      latitude: 21.3891,
      longitude: 39.8579,
      isLaunch: false,
    },
    {
      name: 'Madinah',
      nameAr: 'المدينة المنورة',
      slug: 'madinah',
      latitude: 24.5247,
      longitude: 39.5692,
      isLaunch: false,
    },
    {
      name: 'Khobar',
      nameAr: 'الخبر',
      slug: 'khobar',
      latitude: 26.2172,
      longitude: 50.1971,
      isLaunch: false,
    },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        ...city,
        country: 'Saudi Arabia',
        timezone: 'Asia/Riyadh',
        currency: 'SAR',
        language: 'ar',
        isActive: true,
        settings: {
          deliveryFee: 3.99,
          minOrderAmount: 10.0,
          surgeMultiplier: 1.0,
        },
      },
    });
  }

  console.log(`✅ Seeded ${cities.length} cities`);
}

async function seedSubscriptionPlans() {
  console.log('💎 Seeding subscription plans...');

  const plans = [
    {
      name: 'Tatx Pro',
      nameAr: 'تطكس برو',
      description: 'Unlimited benefits for frequent users',
      descriptionAr: 'مزايا غير محدودة للمستخدمين الدائمين',
      price: 29.99,
      billingCycle: 'MONTHLY',
      trialDays: 14,
      rideDiscount: 0.10,
      deliveryDiscount: 0.15,
      freeDeliveries: 10,
      benefits: {
        freeDelivery: true,
        rideDiscount: 0.10,
        deliveryDiscount: 0.15,
        prioritySupport: true,
        earlyAccess: false,
      },
      isPopular: true,
    },
    {
      name: 'Tatx Pro Annual',
      nameAr: 'تطكس برو سنوي',
      description: 'Save 20% with annual subscription',
      descriptionAr: 'وفر 20% مع الاشتراك السنوي',
      price: 299.99,
      billingCycle: 'YEARLY',
      trialDays: 14,
      rideDiscount: 0.15,
      deliveryDiscount: 0.20,
      freeDeliveries: 15,
      benefits: {
        freeDelivery: true,
        rideDiscount: 0.15,
        deliveryDiscount: 0.20,
        prioritySupport: true,
        earlyAccess: true,
      },
      isPopular: false,
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.create({
      data: plan,
    });
  }

  console.log(`✅ Seeded ${plans.length} subscription plans`);
}

async function seedUsers() {
  console.log('👥 Seeding users...');

  // Admin User
  const admin = await createUser({
    email: 'admin@tatx.sa',
    phone: '+966500000001',
    firstName: 'Tatx',
    firstNameAr: 'تطكس',
    lastName: 'Admin',
    lastNameAr: 'مدير',
    password: 'password123',
    role: UserRole.ADMIN,
  });

  await prisma.admin.create({
    data: {
      userId: admin.id,
      permissions: ['*'],
      department: 'TECH',
    },
  });

  // Support User
  const support = await createUser({
    email: 'support@tatx.sa',
    phone: '+966500000002',
    firstName: 'Support',
    firstNameAr: 'دعم',
    lastName: 'Team',
    lastNameAr: 'فريق',
    password: 'password123',
    role: UserRole.SUPPORT,
  });

  await prisma.admin.create({
    data: {
      userId: support.id,
      permissions: ['support.read', 'support.write', 'users.read'],
      department: 'SUPPORT',
    },
  });

  // Driver User
  const driverUser = await createUser({
    email: 'driver@tatx.sa',
    phone: '+966500000003',
    firstName: 'Ahmed',
    firstNameAr: 'أحمد',
    lastName: 'Al-Rashid',
    lastNameAr: 'الراشد',
    password: 'password123',
    role: UserRole.DRIVER,
  });

  await prisma.driver.create({
    data: {
      userId: driverUser.id,
      status: 'ONLINE',
      rating: 4.8,
      totalRides: 150,
      canAcceptRides: true,
      canAcceptDelivery: true,
      verifiedAt: new Date(),
      backgroundCheckStatus: 'APPROVED',
    },
  });

  await prisma.vehicle.create({
    data: {
      driverId: driverUser.id,
      type: VehicleType.COMFORT,
      category: 'REGULAR',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      color: 'White',
      colorAr: 'أبيض',
      licensePlate: 'ABC1234',
      licensePlateAr: 'أ ب ج 1234',
      registrationNo: 'REG123456',
      capacity: 4,
      features: ['AC', 'WIFI'],
      isActive: true,
      isVerified: true,
      insuranceExpiry: new Date('2025-12-31'),
    },
  });

  // Merchant User
  const merchantUser = await createUser({
    email: 'merchant@tatx.sa',
    phone: '+966500000004',
    firstName: 'Mohammed',
    firstNameAr: 'محمد',
    lastName: 'Al-Otaibi',
    lastNameAr: 'العتيبي',
    password: 'password123',
    role: UserRole.MERCHANT,
  });

  await prisma.merchant.create({
    data: {
      userId: merchantUser.id,
      businessName: 'Al-Baik Restaurant',
      businessNameAr: 'مطعم البيك',
      businessType: 'RESTAURANT',
      taxNumber: '300000000000003',
      crNumber: '1010000000',
      phone: '+966500000004',
      email: 'merchant@tatx.sa',
      isActive: true,
      verifiedAt: new Date(),
      commissionRate: 0.15,
      payoutAccount: 'SA0000000000000000000000',
      payoutBankName: 'Al Rajhi Bank',
      payoutSchedule: 'WEEKLY',
    },
  });

  // Customer User
  const customerUser = await createUser({
    email: 'customer@tatx.sa',
    phone: '+966500000005',
    firstName: 'Fatima',
    firstNameAr: 'فاطمة',
    lastName: 'Al-Zahrani',
    lastNameAr: 'الزهراني',
    password: 'password123',
    role: UserRole.CUSTOMER,
  });

  await prisma.customer.create({
    data: {
      userId: customerUser.id,
      loyaltyPoints: 500,
      totalSpent: 1500,
      totalRides: 20,
      totalOrders: 35,
      vipLevel: 'GOLD',
    },
  });

  await prisma.wallet.create({
    data: {
      customerId: customerUser.id,
      balance: 250.00,
      currency: 'SAR',
    },
  });

  await prisma.address.create({
    data: {
      customerId: customerUser.id,
      label: 'Home',
      labelAr: 'المنزل',
      address: '123 King Fahd Road, Riyadh',
      addressAr: '123 طريق الملك فهد، الرياض',
      city: 'Riyadh',
      district: 'Al Olaya',
      districtAr: 'العليا',
      country: 'Saudi Arabia',
      postalCode: '12211',
      latitude: 24.7136,
      longitude: 46.6753,
      isDefault: true,
      type: 'RESIDENTIAL',
      isVerified: true,
    },
  });

  console.log('✅ Seeded 5 users (admin, support, driver, merchant, customer)');
}

async function seedRestaurants() {
  console.log('🍔 Seeding restaurants...');

  const merchant = await prisma.merchant.findFirst();
  if (!merchant) {
    console.log('⚠️  No merchant found, skipping restaurants');
    return;
  }

  const restaurants = [
    {
      name: 'Al-Baik',
      nameAr: 'البيك',
      slug: 'al-baik',
      cuisine: ['FAST_FOOD', 'ARABIC'],
      description: 'Famous Saudi fried chicken restaurant',
      descriptionAr: 'مطعم دجاج مشهور سعودي',
      address: 'King Fahd Road, Riyadh',
      addressAr: 'طريق الملك فهد، الرياض',
      city: 'Riyadh',
      district: 'Al Olaya',
      latitude: 24.7136,
      longitude: 46.6753,
      deliveryFee: 3.99,
      minOrderAmount: 15.0,
      estimatedDeliveryTime: 30,
      rating: 4.5,
      isFeatured: true,
      badges: ['POPULAR', 'FAST_DELIVERY'],
    },
    {
      name: 'Herfy',
      nameAr: 'هرفي',
      slug: 'herfy',
      cuisine: ['FAST_FOOD', 'BURGERS'],
      description: 'Saudi burger chain',
      descriptionAr: 'مطعم برجر سعودي',
      address: 'Tahlia Street, Riyadh',
      addressAr: 'شارع التحلية، الرياض',
      city: 'Riyadh',
      district: 'Al Tahlia',
      latitude: 24.7050,
      longitude: 46.6800,
      deliveryFee: 2.99,
      minOrderAmount: 10.0,
      estimatedDeliveryTime: 25,
      rating: 4.3,
      isFeatured: false,
      badges: ['NEW'],
    },
  ];

  for (const restaurantData of restaurants) {
    const restaurant = await prisma.restaurant.create({
      data: {
        ...restaurantData,
        merchantId: merchant.id,
        country: 'Saudi Arabia',
        postalCode: '12211',
        deliveryRadius: 5.0,
        isOpen: true,
        isActive: true,
        isVerified: true,
        openingHours: {
          monday: { open: '10:00', close: '23:00' },
          tuesday: { open: '10:00', close: '23:00' },
          wednesday: { open: '10:00', close: '23:00' },
          thursday: { open: '10:00', close: '00:00' },
          friday: { open: '14:00', close: '00:00' },
          saturday: { open: '10:00', close: '00:00' },
          sunday: { open: '10:00', close: '23:00' },
        },
      },
    });

    // Create categories
    const categories = [
      {
        name: 'Main Meals',
        nameAr: 'الوجبات الرئيسية',
        description: 'Signature meals',
        descriptionAr: 'وجبات مميزة',
      },
      {
        name: 'Sides',
        nameAr: 'الأطباق الجانبية',
        description: 'Fries, coleslaw, etc.',
        descriptionAr: 'بطاطس، سلطة، إلخ',
      },
      {
        name: 'Beverages',
        nameAr: 'المشروبات',
        description: 'Soft drinks and juices',
        descriptionAr: 'مشروبات غازية وعصائر',
      },
    ];

    for (const categoryData of categories) {
      await prisma.category.create({
        data: {
          ...categoryData,
          restaurantId: restaurant.id,
        },
      });
    }

    // Create menu items
    const menuItems = [
      {
        name: 'Chicken Meal',
        nameAr: 'وجبة دجاج',
        description: '8 pieces fried chicken with fries and sauce',
        descriptionAr: '8 قطع دجاج مقلي مع بطاطس وصوص',
        price: 25.00,
        isPopular: true,
        isHalal: true,
        prepTime: 10,
        calories: 850,
      },
      {
        name: 'Shrimp Meal',
        nameAr: 'وجبة روبيان',
        description: '12 pieces fried shrimp with fries and sauce',
        descriptionAr: '12 قطعة روبيان مقلي مع بطاطس وصوص',
        price: 35.00,
        isPopular: true,
        isHalal: true,
        prepTime: 12,
        calories: 650,
      },
      {
        name: 'French Fries',
        nameAr: 'بطاطس مقلية',
        description: 'Crispy golden fries',
        descriptionAr: 'بطاطس مقلية مقرمشة',
        price: 6.00,
        isPopular: false,
        isHalal: true,
        prepTime: 5,
        calories: 350,
      },
      {
        name: 'Coleslaw',
        nameAr: 'سلطة كول سلو',
        description: 'Fresh cabbage salad',
        descriptionAr: 'سلطة كرنب طازجة',
        price: 5.00,
        isPopular: false,
        isHalal: true,
        prepTime: 2,
        calories: 150,
      },
      {
        name: 'Pepsi',
        nameAr: 'بيبسي',
        description: '330ml can',
        descriptionAr: 'علبة 330مل',
        price: 3.00,
        isPopular: false,
        isHalal: true,
        prepTime: 1,
        calories: 140,
      },
    ];

    const createdCategories = await prisma.category.findMany({
      where: { restaurantId: restaurant.id },
    });

    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: {
          ...item,
          restaurantId: restaurant.id,
          categoryId: createdCategories[0].id,
          isAvailable: true,
        },
      });
    }
  }

  console.log(`✅ Seeded ${restaurants.length} restaurants`);
}

async function seedPromoCodes() {
  console.log('🎁 Seeding promo codes...');

  const promoCodes = [
    {
      code: 'WELCOME50',
      codeAr: 'أهلاً50',
      description: '50% off first order',
      descriptionAr: 'خصم 50% على الطلب الأول',
      type: 'PERCENTAGE',
      value: 50,
      maxDiscount: 30,
      minOrderAmount: 50,
      usageLimit: 1000,
      usageLimitPerUser: 1,
      newUserOnly: true,
      applicableServices: ['FOOD', 'GROCERY'],
    },
    {
      code: 'RIDE20',
      codeAr: 'رحلة20',
      description: '20% off rides',
      descriptionAr: 'خصم 20% على الرحلات',
      type: 'PERCENTAGE',
      value: 20,
      maxDiscount: 25,
      minOrderAmount: 30,
      usageLimit: 500,
      usageLimitPerUser: 3,
      applicableServices: ['RIDE'],
    },
    {
      code: 'FREEDELIVERY',
      codeAr: 'توصيل_مجاني',
      description: 'Free delivery on orders over 100 SAR',
      descriptionAr: 'توصيل مجاني للطلبات فوق 100 ريال',
      type: 'FREE_DELIVERY',
      value: 0,
      minOrderAmount: 100,
      usageLimit: 2000,
      usageLimitPerUser: 5,
      applicableServices: ['FOOD', 'GROCERY'],
    },
    {
      code: 'TATXPRO',
      codeAr: 'تطكس_برو',
      description: 'Free trial of Tatx Pro',
      descriptionAr: 'تجربة مجانية لتطكس برو',
      type: 'FIXED',
      value: 29.99,
      usageLimit: 5000,
      usageLimitPerUser: 1,
      applicableServices: ['RIDE', 'FOOD', 'GROCERY'],
    },
  ];

  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setMonth(validUntil.getMonth() + 3);

  for (const promo of promoCodes) {
    await prisma.promoCode.create({
      data: {
        ...promo,
        validFrom: now,
        validUntil,
        isActive: true,
      },
    });
  }

  console.log(`✅ Seeded ${promoCodes.length} promo codes`);
}

async function seedSystemSettings() {
  console.log('⚙️  Seeding system settings...');

  const settings = [
    {
      key: 'platform.commission_rate',
      value: { default: 0.15, min: 0.10, max: 0.25 },
      category: 'GENERAL',
      description: 'Default commission rate for merchants',
      isPublic: false,
    },
    {
      key: 'ride.base_fare',
      value: { economy: 5.0, comfort: 8.0, premium: 12.0, luxury: 20.0 },
      category: 'RIDE',
      description: 'Base fare by vehicle type (SAR)',
      isPublic: false,
    },
    {
      key: 'ride.per_km_rate',
      value: { economy: 2.5, comfort: 3.5, premium: 5.0, luxury: 8.0 },
      category: 'RIDE',
      description: 'Per kilometer rate by vehicle type (SAR)',
      isPublic: false,
    },
    {
      key: 'ride.surge_threshold',
      value: { low: 1.2, medium: 1.5, high: 2.0, extreme: 3.0 },
      category: 'RIDE',
      description: 'Surge pricing multipliers',
      isPublic: false,
    },
    {
      key: 'delivery.radius_limit',
      value: { min: 1.0, max: 15.0, default: 5.0 },
      category: 'FOOD',
      description: 'Delivery radius limits in km',
      isPublic: false,
    },
    {
      key: 'payment.currencies',
      value: ['SAR', 'USD', 'EUR'],
      category: 'PAYMENT',
      description: 'Supported currencies',
      isPublic: true,
    },
    {
      key: 'payment.methods',
      value: ['MADA', 'CREDIT_CARD', 'DEBIT_CARD', 'APPLE_PAY', 'GOOGLE_PAY', 'STC_PAY', 'WALLET', 'CASH'],
      category: 'PAYMENT',
      description: 'Available payment methods',
      isPublic: true,
    },
    {
      key: 'notifications.welcome_enabled',
      value: true,
      category: 'NOTIFICATION',
      description: 'Enable welcome notifications',
      isPublic: false,
    },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log(`✅ Seeded ${settings.length} system settings`);
}

async function seedFeatureFlags() {
  console.log('🚩 Seeding feature flags...');

  const flags = [
    {
      name: 'ride_sharing',
      description: 'Enable ride sharing feature',
      isEnabled: false,
      rollout: 0,
      environments: ['development', 'staging'],
    },
    {
      name: 'grocery_delivery',
      description: 'Enable grocery delivery service',
      isEnabled: true,
      rollout: 1,
      environments: ['development', 'staging', 'production'],
    },
    {
      name: 'scheduled_rides',
      description: 'Enable scheduled ride booking',
      isEnabled: true,
      rollout: 1,
      environments: ['development', 'staging', 'production'],
    },
    {
      name: 'wallet_auto_topup',
      description: 'Enable automatic wallet top-up',
      isEnabled: false,
      rollout: 0.5,
      environments: ['development', 'staging'],
    },
    {
      name: 'arabic_first',
      description: 'Show Arabic as primary language',
      isEnabled: true,
      rollout: 1,
      environments: ['development', 'staging', 'production'],
    },
  ];

  for (const flag of flags) {
    await prisma.featureFlag.create({
      data: flag,
    });
  }

  console.log(`✅ Seeded ${flags.length} feature flags`);
}

// ===========================================
// Main Seed Function
// ===========================================

async function main() {
  console.log('🌱 Starting Tatx database seed...\n');

  try {
    await seedCities();
    await seedSubscriptionPlans();
    await seedUsers();
    await seedRestaurants();
    await seedPromoCodes();
    await seedSystemSettings();
    await seedFeatureFlags();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('   Admin:    admin@tatx.sa / password123');
    console.log('   Support:  support@tatx.sa / password123');
    console.log('   Driver:   driver@tatx.sa / password123');
    console.log('   Merchant: merchant@tatx.sa / password123');
    console.log('   Customer: customer@tatx.sa / password123');
    console.log('\n⚠️  Remember to change passwords in production!\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
