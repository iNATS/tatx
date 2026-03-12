/**
 * Database Seed Script
 * Populates the database with initial data for development
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tatx.com' },
    update: {},
    create: {
      email: 'admin@tatx.com',
      phone: '+1234567890',
      password: '$2b$10$hashedpassword', // Will be set properly
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      emailVerified: true,
      phoneVerified: true,
      admin: {
        create: {
          permissions: ['ALL'],
          department: 'SYSTEM',
        },
      },
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create system settings
  const settings = [
    {
      key: 'platform_settings',
      value: {
        maintenanceMode: false,
        registrationEnabled: true,
        minDriverRating: 4.0,
        maxRideDistance: 50,
      },
      category: 'PLATFORM',
      description: 'Platform-wide settings',
    },
    {
      key: 'pricing_settings',
      value: {
        baseRideFare: 2.5,
        perKmRate: 1.5,
        perMinuteRate: 0.35,
        minimumFare: 5.0,
        deliveryFee: 3.99,
        serviceFeePercent: 0.15,
      },
      category: 'PRICING',
      description: 'Pricing configuration',
    },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }

  console.log('✅ Created system settings');

  // Create sample promo codes
  const promoCodes = [
    {
      code: 'WELCOME10',
      description: 'Welcome discount for new users',
      type: 'PERCENTAGE',
      value: 10,
      minOrderAmount: 20,
      maxDiscount: 15,
      usageLimit: 1000,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      applicableServices: ['RIDE', 'FOOD_DELIVERY'],
      newUserOnly: true,
    },
    {
      code: 'FIRSTORDER',
      description: 'First order discount',
      type: 'FIXED',
      value: 5,
      minOrderAmount: 15,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      applicableServices: ['FOOD_DELIVERY'],
      newUserOnly: true,
    },
  ];

  for (const promo of promoCodes) {
    await prisma.promoCode.upsert({
      where: { code: promo.code },
      update: {},
      create: promo,
    });
  }

  console.log('✅ Created promo codes');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
