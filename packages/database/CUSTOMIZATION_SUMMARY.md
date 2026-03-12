# Tatx Platform - Database Schema Customization Summary

## 🎯 Overview

The Tatx database schema has been **comprehensively customized** for a production-ready super-app platform targeting the **Saudi Arabian market** and beyond.

---

## 📊 Schema Statistics

| Metric | Count |
|--------|-------|
| **Total Models** | 65+ |
| **Enums** | 11 |
| **Relationships** | 100+ |
| **Indexes** | 150+ |
| **Languages Supported** | 2 (Arabic, English) |

---

## 🆕 What's New vs. Standard Schema

### 1. **Saudi Arabia Localization** 🇸🇦

**Added:**
- Arabic name fields for all entities (`firstNameAr`, `lastNameAr`, `nameAr`, etc.)
- Saudi payment methods: `MADA`, `STC_PAY`, `TABBY`, `TAMARA`
- SAR currency as default
- Asia/Riyadh timezone
- Saudi city structure (Riyadh, Jeddah, Dammam, Makkah, Madinah)
- District-level addressing with Arabic support
- Saudi tax compliance (VAT number, Commercial Registration)

**Example:**
```prisma
model Address {
  address     String
  addressAr   String?  // Arabic address
  city        String   // Riyadh, Jeddah, Dammam
  district    String   // Neighborhood
  districtAr  String?  // Arabic district name
  country     String   @default("Saudi Arabia")
}
```

---

### 2. **Enhanced User Management** 👥

**Added:**
- `Device` model for device tracking and push notifications
- `twoFactorSecret`, `twoFactorStatus` for 2FA
- `backupCodes` for account recovery
- `isBlocked`, `blockReason` for user moderation
- `language` preference (ar/en)
- `timezone` configuration
- `lastActiveAt` tracking
- `vipLevel` for loyalty tiers

**Example:**
```prisma
model User {
  twoFactorSecret   String?
  twoFactorStatus   TwoFactorStatus @default(DISABLED)
  backupCodes       String[]
  language          String    @default("ar")
  timezone          String    @default("Asia/Riyadh")
  devices           Device[]
}
```

---

### 3. **Subscription & Membership** 💎

**New Models:**
- `Subscription` - User subscriptions
- `SubscriptionPlan` - Plan definitions
- Benefits tracking (ride discounts, delivery discounts, free deliveries)

**Features:**
- Trial periods (14 days default)
- Multiple billing cycles (weekly, monthly, yearly)
- Automatic renewal
- Savings tracking
- VIP levels (Regular, Silver, Gold, Platinum)

---

### 4. **Advanced Ride Service** 🚗

**Enhanced `Ride` Model:**
- Ride categories (Regular, Express, Scheduled, Shared, Business, Family)
- Detailed pickup/dropoff information with Arabic support
- Passenger and luggage count
- Ride-for-someone-else feature
- Separate driver/rider ratings
- Tip tracking
- Comprehensive fare breakdown (base, distance, time, surge, tax, service fee)
- Promo code support
- Driver earnings tracking

**New Models:**
- `RideShare` - For shared rides with multiple passengers
- `SurgePricing` - Dynamic pricing by area and time
- `RideRequest` - Pending ride requests with nearby driver notification

**Example:**
```prisma
model Ride {
  category        RideCategory @default(REGULAR)
  pickupAddressAr String?
  dropoffAddressAr String?
  passengerCount  Int       @default(1)
  luggageCount    Int       @default(0)
  isForSomeoneElse Boolean  @default(false)
  surgeMultiplier Decimal   @default(1.0)
  driverEarnings  Decimal?
  tip             Decimal   @default(0)
}
```

---

### 5. **Comprehensive Food Ordering** 🍔

**Enhanced Models:**
- `Restaurant` - Delivery zones, badges, featured status, holiday hours
- `Category` - Modifier groups support
- `MenuItem` - Nutrition info, allergens, ingredients, spiciness, inventory tracking
- `Order` - Multi-type support (food, grocery, courier, pharmacy)

**New Models:**
- `ModifierGroup` - Customizable options (extra cheese, no onions, etc.)
- `Modifier` - Individual modifier items
- `MenuItemInventory` - Stock tracking with low-stock alerts
- `DeliveryZone` - Polygon-based delivery areas
- `RestaurantPromotion` - Restaurant-specific promotions
- `Warehouse` - Cloud kitchens, grocery hubs, dark stores

**Example:**
```prisma
model MenuItem {
  nameAr        String?
  descriptionAr String?
  salePrice     Decimal?
  isHalal       Boolean    @default(true)
  calories      Int?
  protein       Int?       // grams
  carbs         Int?       // grams
  fat           Int?       // grams
  allergens     String[]   // ["NUTS", "DAIRY", "GLUTEN"]
  spiciness     Int?       // 0-5 scale
  inventory     MenuItemInventory?
}
```

---

### 6. **Advanced Payment System** 💳

**Enhanced Models:**
- `Payment` - Installment plans, multiple providers, IP tracking
- `Wallet` - Auto top-up, pending balance, Arabic descriptions
- `WalletTransaction` - Category tracking (ride, order, topup, refund, promo, cashback)
- `Earning` - Support for both ride and delivery earnings

**New Models:**
- `InstallmentPlan` - BNPL integration (Tabby, Tamara)
- `Refund` - Enhanced with approval workflow, reason codes

**Example:**
```prisma
model Wallet {
  balance       Decimal  @default(0)
  pendingBalance Decimal @default(0)
  autoTopup     Boolean  @default(false)
  autoTopupThreshold Decimal?
  autoTopupAmount Decimal?
}

model InstallmentPlan {
  provider        String   // "TABBY", "TAMARA"
  installments    Int
  installmentAmount Decimal
  frequency       String   // "WEEKLY", "BIWEEKLY", "MONTHLY"
}
```

---

### 7. **Courier & Package Delivery** 📦

**New Features:**
- `OrderType` enum: FOOD, GROCERY, COURIER, PHARMACY
- `PackageSize` enum: SMALL, MEDIUM, LARGE, EXTRA_LARGE
- `DeliveryPriority` enum: STANDARD, EXPRESS, SCHEDULED

**Enhanced `Order` Model:**
- Package dimensions and weight
- Declared value for insurance
- Pickup and delivery contact information
- Signature and ID requirements
- Separate contact person from delivery address

**Example:**
```prisma
model Order {
  type            OrderType   @default(FOOD)
  packageSize     PackageSize?
  packageWeight   Decimal?    // in kg
  packageValue    Decimal?    // Declared value
  pickupContact   String?
  pickupPhone     String?
  signatureRequired Boolean @default(false)
  idRequired      Boolean @default(false)
}
```

---

### 8. **Enhanced Driver Management** 🚴

**Enhanced `Driver` Model:**
- Service area definitions
- Background check tracking
- Insurance and medical expiry
- Separate ride/delivery acceptance flags
- Maximum delivery radius
- Hourly rate option
- Verification tracking

**New Models:**
- `DriverServiceArea` - Cities and districts where driver operates
- Enhanced `Vehicle` with capacity, features, photos

**Example:**
```prisma
model Driver {
  backgroundCheckStatus String @default("PENDING")
  canAcceptRides        Boolean @default(false)
  canAcceptDelivery     Boolean @default(false)
  maxDeliveryRadius     Decimal @default(10.0)
  serviceAreas          DriverServiceArea[]
}
```

---

### 9. **Advanced Notifications** 🔔

**Enhanced `Notification` Model:**
- Arabic title and message support
- Channel selection (email, SMS, push, in-app, WhatsApp)
- Priority levels (normal, high)
- Delivery tracking (sent, delivered, read timestamps)
- Retry logic with count and max retries
- Image attachments
- Deep link actions
- Expiry dates

**New Models:**
- `NotificationTemplate` - Reusable templates with variables

**Example:**
```prisma
model Notification {
  titleAr       String?
  messageAr     String?
  channel       NotificationType @default(PUSH)
  priority      String           @default("NORMAL")
  retryCount    Int              @default(0)
  maxRetries    Int              @default(3)
  imageUrl      String?
  action        String?          // Deep link
}
```

---

### 10. **Enhanced Reviews** ⭐

**Enhanced `Review` Model:**
- Category-specific ratings (cleanliness, driving, punctuality)
- Arabic comment support
- Response with Arabic
- Image attachments
- Helpful/reported counts
- Verified review flag
- Link to specific ride or order

**Example:**
```prisma
model Review {
  categories      Json?    // { cleanliness: 5, driving: 4 }
  commentAr       String?
  responseAr      String?
  isVerified      Boolean  @default(false)
  helpfulCount    Int      @default(0)
  reportedCount   Int      @default(0)
}
```

---

### 11. **Marketing & Promotions** 🎁

**Enhanced `PromoCode` Model:**
- Arabic code and description
- Multiple types: PERCENTAGE, FIXED, FREE_DELIVERY
- Usage limits (total and per user)
- Service-specific applicability
- City-specific applicability
- Vehicle type inclusions/exclusions
- Restaurant exclusions
- Campaign association

**New Models:**
- `PromoCampaign` - Marketing campaign tracking with budget and acquisition
- `UserPromoCode` - User-specific promo eligibility and usage

**Example:**
```prisma
model PromoCode {
  codeAr              String?
  applicableServices  String[] // ["RIDE", "FOOD", "GROCERY"]
  applicableCities    String[]
  usageLimitPerUser   Int?     @default(1)
  includedVehicles    String[]
  excludedRestaurants String[]
  campaign            PromoCampaign?
}
```

---

### 12. **System & Analytics** 📊

**New Models:**
- `RateLimit` - API rate limiting tracking
- `FeatureFlag` - Feature toggles with rollout percentages
- `Analytics` - Event tracking with properties
- `GeoFence` - Geographic boundaries for cities/areas
- `City` - City-level configuration
- `AdminRole` - Role-based admin permissions
- `SupportTicket` - Customer support system
- `SupportMessage` - Ticket messages

**Example:**
```prisma
model FeatureFlag {
  name         String   @unique
  isEnabled    Boolean  @default(false)
  rollout      Decimal  @default(1) // 0-1, percentage
  conditions   Json?    // Targeting conditions
  environments String[] // ["development", "staging", "production"]
}
```

---

## 🔧 Technical Enhancements

### 1. **Indexing Strategy**

- All foreign keys indexed
- Composite indexes for common queries
- Geospatial indexes on latitude/longitude
- Status and timestamp indexes for filtering
- Full-text search ready fields

### 2. **Data Integrity**

- Cascade deletes for child records
- SetNull for optional references
- Unique constraints where appropriate
- Check constraints via enums

### 3. **Performance Optimization**

- Decimal precision for money (65,30)
- JSON fields for flexible data
- Array fields for simple lists
- Separate history tables

### 4. **Security**

- Password hashing (bcrypt)
- 2FA support
- Device tracking
- Audit logging
- API key hashing
- Rate limiting

---

## 📈 Scalability Considerations

### Current Design Supports:

- **Millions of users** - Efficient indexing, partitioning-ready
- **High-frequency location updates** - Redis-ready architecture
- **Real-time tracking** - WebSocket integration points
- **Multi-city expansion** - City model, geo-fencing
- **Multi-tenant** - Merchant isolation, service areas
- **International expansion** - Currency, timezone, language support

### Future Enhancements:

1. **PostGIS** - Advanced geospatial queries
2. **TimescaleDB** - Time-series data for location history
3. **Elasticsearch** - Full-text search, restaurant discovery
4. **Redis** - Caching, real-time driver locations
5. **Data Warehouse** - Analytics, reporting

---

## 🌍 Multi-Country Ready

The schema supports expansion beyond Saudi Arabia:

- **Currency**: Per-city currency configuration
- **Timezone**: Per-city timezone support
- **Language**: Bilingual fields (expandable to more languages)
- **Cities**: City model with independent settings
- **Compliance**: Tax numbers, business registration per country

---

## 📝 Migration Path

### From Existing Schema

1. **Backup database**
   ```bash
   pg_dump -h localhost -U tatx tatx_db > backup.sql
   ```

2. **Generate migration**
   ```bash
   pnpm db:migrate
   ```

3. **Test thoroughly**
   ```bash
   pnpm db:seed
   pnpm test
   ```

4. **Deploy to production**
   ```bash
   pnpm db:migrate:prod
   ```

---

## ✅ Production Checklist

Before going to production:

- [ ] All migrations applied
- [ ] Database backup completed
- [ ] Indexes verified for performance
- [ ] Test data removed
- [ ] Admin passwords changed
- [ ] API keys rotated
- [ ] Monitoring configured
- [ ] Rollback plan prepared
- [ ] Load testing completed
- [ ] Security audit passed

---

## 📚 Documentation

- **SCHEMA_DOCS.md** - Complete schema documentation
- **MIGRATION_GUIDE.md** - Migration procedures
- **README.md** - Getting started guide

---

## 🎯 Next Steps

1. **Generate Prisma Client**
   ```bash
   pnpm db:generate
   ```

2. **Run migrations**
   ```bash
   pnpm db:migrate
   ```

3. **Seed database**
   ```bash
   pnpm db:seed
   ```

4. **Start development**
   ```bash
   pnpm dev:all
   ```

---

**Schema Version**: 2.0.0  
**Last Updated**: 2026-03-12  
**Platform**: Tatx Super-App  
**Market**: Saudi Arabia (GCC-ready)
