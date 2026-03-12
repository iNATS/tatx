# Tatx Platform - Database Schema Documentation

## Overview

The Tatx database schema is designed for a **super-app platform** combining ride-hailing (Uber-like), food delivery (HungerStation-like), grocery delivery, and courier services. The schema is optimized for the **Saudi Arabian market** with full Arabic language support.

---

## Key Features

### 🌍 Localization
- **Bilingual Support**: All user-facing text has Arabic translations (`*Ar` fields)
- **Saudi-Specific**: SAR currency, Asia/Riyadh timezone, Saudi cities and districts
- **Payment Methods**: MADA, STC Pay, Tabby, Tamara integration

### 📱 Multi-Service Architecture
- **Ride Service**: Economy, Comfort, Premium, Luxury, Van, Motorcycle
- **Food Delivery**: Restaurants, menus, modifiers, inventory tracking
- **Grocery Delivery**: Warehouses, cloud kitchens, dark stores
- **Courier Service**: Package sizes, pickup/delivery tracking

### 💳 Payment & Wallet
- **Multiple Providers**: Stripe, HyperPay, Moyasar
- **Installment Plans**: Tabby, Tamara BNPL integration
- **Digital Wallet**: Auto top-up, transactions, cashback

### 🎯 Subscription & Loyalty
- **Tatx Pro**: Membership tiers (Regular, Silver, Gold, Platinum)
- **Loyalty Points**: Earn and redeem points
- **Referral Program**: Rewards for both referrer and referee

### 🔐 Security & Compliance
- **2FA Support**: TOTP-based two-factor authentication
- **Device Management**: Trusted devices, push tokens
- **Audit Logging**: Complete audit trail for all actions
- **Rate Limiting**: Per-user and per-API key rate limiting

---

## Core Models by Domain

### 👥 User Management

| Model | Description | Key Fields |
|-------|-------------|------------|
| `User` | Core user account | email, phone, role, 2FA |
| `Customer` | Customer profile | wallet, loyalty points, VIP level |
| `Driver` | Driver profile | status, rating, service areas |
| `Merchant` | Business account | tax info, commission, payout |
| `Admin` | Admin user | permissions, department |
| `Device` | User devices | push token, trust status |

### 🏠 Location & Address

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Address` | Saved addresses | lat/lng, district, Arabic labels |
| `Location` | Real-time driver location | heading, speed, battery |
| `LocationHistory` | Historical tracking | entity tracking |
| `GeoFence` | Geographic boundaries | polygon, radius |
| `City` | City configuration | timezone, currency, settings |

### 🚗 Ride Service

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Ride` | Ride booking | status, fare, route, ratings |
| `RideRequest` | Pending ride requests | nearby drivers, expiry |
| `RideShare` | Shared ride passengers | pickup/dropoff order |
| `SurgePricing` | Dynamic pricing | multiplier, area, time window |

### 🍔 Food & Order Service

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Restaurant` | Restaurant profile | cuisine, delivery zones, badges |
| `Category` | Menu categories | sortOrder, modifiers |
| `MenuItem` | Menu items | nutrition, allergens, inventory |
| `MenuItemInventory` | Stock tracking | quantity, low stock threshold |
| `Modifier` | Item customizations | price, selection limits |
| `Order` | Customer orders | type (food/grocery/courier), tracking |
| `OrderItem` | Order line items | modifiers, special instructions |

### 💰 Payment Service

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Payment` | Payment transactions | provider, status, installments |
| `Transaction` | Payment transactions | type, gateway response |
| `Refund` | Refund processing | reason, approval workflow |
| `Wallet` | Digital wallet | balance, auto top-up |
| `WalletTransaction` | Wallet movements | category, reference |
| `Earning` | Driver earnings | type, payout status |
| `InstallmentPlan` | BNPL plans | provider, schedule |

### 📦 Delivery & Logistics

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Warehouse` | Fulfillment centers | type, radius, coverage |
| `DeliveryZone` | Delivery areas | polygon, fees, min order |
| `Vehicle` | Driver vehicles | type, capacity, features |
| `DriverDocument` | Driver credentials | status, expiry, verification |
| `VehicleDocument` | Vehicle papers | insurance, registration |

### 🎁 Marketing & Promotions

| Model | Description | Key Fields |
|-------|-------------|------------|
| `PromoCode` | Discount codes | type, limits, targeting |
| `PromoCampaign` | Marketing campaigns | budget, acquisition |
| `UserPromoCode` | User promo eligibility | usage tracking |
| `Referral` | Referral program | status, rewards |
| `Subscription` | Membership plans | billing cycle, benefits |
| `SubscriptionPlan` | Plan definitions | pricing, discounts |

### 🔔 Notification Service

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Notification` | User notifications | type, channel, delivery status |
| `NotificationTemplate` | Message templates | bilingual, variables |

### ⭐ Reviews & Support

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Review` | Ratings and reviews | categories, response, helpfulness |
| `SupportTicket` | Customer support | priority, status, assignment |
| `SupportMessage` | Ticket messages | attachments, internal notes |

### 📊 Analytics & System

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Analytics` | Event tracking | properties, value |
| `AuditLog` | System audit trail | action, changes, IP |
| `SystemSetting` | Configuration | category, public flag |
| `ApiKey` | API credentials | hash, scopes, rate limit |
| `RateLimit` | Rate limiting | count, window, reset |
| `FeatureFlag` | Feature toggles | rollout, conditions |

---

## Key Relationships

```
User (1:1) Customer ─┬─ (1:N) Ride
                    ├─ (1:N) Order
                    └─ (1:1) Wallet

User (1:1) Driver ───┬─ (1:1) Vehicle
                     ├─ (1:N) DriverDocument
                     └─ (1:N) Earning

User (1:1) Merchant ─┬─ (1:N) Restaurant
                     └─ (1:N) Warehouse

Restaurant ─┬─ (1:N) Category ─ (1:N) MenuItem
            ├─ (1:N) Order
            └─ (1:N) DeliveryZone

Order ─┬─ (1:N) OrderItem
       ├─ (1:1) Payment
       └─ (1:1) Driver (delivery)

Ride ─┬─ (1:1) Payment
      └─ (1:1) Driver
```

---

## Indexes & Performance

### Critical Indexes

**User Queries:**
- `User.email`, `User.phone` - Authentication lookups
- `User.role`, `User.isActive` - Filtering

**Location Queries:**
- `Location.driverId`, `Location.timestamp` - Real-time tracking
- `Location.latitude, Location.longitude` - Geo queries
- `LocationHistory.entityType, LocationHistory.entityId` - Tracking

**Order/Ride Queries:**
- `Order.status`, `Order.createdAt` - Dashboard queries
- `Ride.status`, `Ride.scheduledAt` - Dispatch queries
- `Order.customerId`, `Ride.riderId` - User history

**Geospatial:**
- All location models have `(latitude, longitude)` composite indexes
- Consider PostGIS extension for advanced geo-queries

---

## Data Types Used

| Type | Usage |
|------|-------|
| `String` | Text fields, IDs (cuid) |
| `Decimal` | Money, coordinates (precision 65,30) |
| `Int` | Counts, durations |
| `Boolean` | Flags |
| `DateTime` | Timestamps |
| `Json` | Flexible structured data |
| `String[]` | Arrays (tags, features) |

---

## Enums Reference

### User & Roles
- `UserRole`: CUSTOMER, DRIVER, MERCHANT, ADMIN, SUPPORT
- `TwoFactorStatus`: ENABLED, DISABLED, BACKUP

### Ride Service
- `RideStatus`: REQUESTED → SEARCHING_DRIVER → DRIVER_ASSIGNED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
- `VehicleType`: ECONOMY, COMFORT, PREMIUM, LUXURY, VAN, MOTORCYCLE, BICYCLE, TRUCK
- `RideCategory`: REGULAR, EXPRESS, SCHEDULED, SHARED, BUSINESS, FAMILY
- `DriverStatus`: OFFLINE, ONLINE, BUSY, INACTIVE, SUSPENDED

### Order Service
- `OrderStatus`: PENDING → CONFIRMED → PREPARING → READY_FOR_PICKUP → PICKED_UP → IN_TRANSIT → DELIVERED
- `OrderType`: FOOD, GROCERY, COURIER, PHARMACY
- `DeliveryPriority`: STANDARD, EXPRESS, SCHEDULED
- `PackageSize`: SMALL, MEDIUM, LARGE, EXTRA_LARGE

### Payment
- `PaymentStatus`: PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED, PARTIALLY_REFUNDED, CHARGEBACK
- `PaymentMethod`: CREDIT_CARD, DEBIT_CARD, CASH, WALLET, APPLE_PAY, GOOGLE_PAY, MADA, STC_PAY, TABBY, TAMARA

### Documents & Verification
- `DocumentStatus`: PENDING, APPROVED, REJECTED, EXPIRED, VERIFIED

### Subscription
- `SubscriptionStatus`: ACTIVE, INACTIVE, EXPIRED, CANCELLED, TRIAL

### Notifications
- `NotificationType`: EMAIL, SMS, PUSH, IN_APP, WHATSAPP
- `NotificationStatus`: PENDING, SENT, DELIVERED, READ, FAILED

---

## Saudi Arabia Specifics

### Payment Compliance
- **MADA**: Saudi debit card network
- **STC Pay**: Mobile wallet
- **Tabby/Tamara**: Sharia-compliant BNPL

### Address Format
```
- City: Riyadh, Jeddah, Dammam, Makkah, Madinah
- District: Al Olaya, Al Malqa, Hittin (with Arabic names)
- Postal Code: 5-digit format
- National Address: Integrated with Saudi Post
```

### Business Requirements
- **Tax Number**: VAT registration (15%)
- **CR Number**: Commercial Registration
- **IBAN**: Saudi bank account format

### Language
- **Primary**: Arabic (ar)
- **Secondary**: English (en)
- **All user-facing text**: Bilingual fields

---

## Migration Strategy

### Development
```bash
pnpm prisma migrate dev --name init
```

### Production
```bash
pnpm prisma migrate deploy
pnpm prisma generate
```

### Seed Data
```bash
pnpm prisma db seed
```

---

## Best Practices

### 1. Soft Deletes
Use `isActive` flags instead of hard deletes for audit trail.

### 2. Money Handling
Always use `Decimal` type, never `Float`. Store in SAR (local currency).

### 3. Geolocation
Store coordinates as `Decimal(65, 30)` for precision. Consider PostGIS for production.

### 4. Timestamps
All models have `createdAt` and `updatedAt`. Use `now()` for defaults.

### 5. Relations
Use `onDelete: Cascade` for child records, `onDelete: SetNull` for optional references.

### 6. Indexing
Add indexes on frequently queried fields (status, userId, createdAt).

### 7. JSON Fields
Use for flexible data but avoid querying inside JSON for performance.

### 8. Bilingual Content
Always provide `*Ar` fields for Arabic translations.

---

## Future Enhancements

1. **PostGIS Integration**: Advanced geospatial queries
2. **Time-series Database**: For location history and analytics
3. **Redis Caching**: For real-time driver locations
4. **Elasticsearch**: For restaurant/menu search
5. **Data Warehousing**: For analytics and reporting

---

## Support

For schema questions or modifications:
- Review this documentation
- Check existing migrations in `/packages/database/prisma/migrations`
- Consult with the backend team before making breaking changes
