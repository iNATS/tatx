# Tatx Database - Quick Reference Card

## 🚀 Quick Commands

```bash
# Start everything
pnpm install && pnpm docker:dev && pnpm db:generate && pnpm db:migrate && pnpm db:seed

# Database operations
pnpm db:generate    # Generate Prisma Client
pnpm db:migrate     # Create & apply migration
pnpm db:seed        # Seed database
pnpm db:studio      # Open Prisma Studio GUI
pnpm db:reset       # Reset & reseed database
```

---

## 📦 Core Models Cheat Sheet

### Users
```typescript
User → Customer, Driver, Merchant, Admin, Support
Customer → Wallet, Address[], Subscription
Driver → Vehicle, DriverDocument[], Earning[]
Merchant → Restaurant[], Warehouse[]
```

### Rides
```typescript
Ride → Rider (Customer), Driver, Payment
RideRequest → Pending requests
RideShare → Multiple passengers
SurgePricing → Dynamic pricing
```

### Orders
```typescript
Order → Customer, Restaurant, Driver, Payment
OrderItem → MenuItem, Modifiers
MenuItem → Category, Inventory
Modifier → ModifierGroup
```

### Payments
```typescript
Payment → User, Transaction[], Refund[]
Wallet → WalletTransaction[]
Earning → Driver
InstallmentPlan → BNPL (Tabby/Tamara)
```

---

## 🔑 Key Enums

```typescript
UserRole: CUSTOMER, DRIVER, MERCHANT, ADMIN, SUPPORT
RideStatus: REQUESTED → SEARCHING_DRIVER → DRIVER_ASSIGNED → 
            DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
OrderStatus: PENDING → CONFIRMED → PREPARING → READY_FOR_PICKUP → 
             PICKED_UP → IN_TRANSIT → DELIVERED
PaymentMethod: MADA, CREDIT_CARD, DEBIT_CARD, APPLE_PAY, 
               GOOGLE_PAY, STC_PAY, WALLET, CASH, TABBY, TAMARA
VehicleType: ECONOMY, COMFORT, PREMIUM, LUXURY, VAN, MOTORCYCLE
OrderType: FOOD, GROCERY, COURIER, PHARMACY
```

---

## 🇸🇦 Saudi-Specific Fields

All user-facing text has Arabic variants:
- `nameAr`, `descriptionAr`, `addressAr`, etc.
- Default currency: **SAR**
- Default timezone: **Asia/Riyadh**
- Default language: **ar** (Arabic)
- Saudi payment methods: **MADA**, **STC Pay**, **Tabby**, **Tamara**

---

## 💰 Payment Fields

```typescript
Payment {
  amount: Decimal
  currency: "SAR" | "USD" | "EUR"
  status: PENDING | PROCESSING | COMPLETED | FAILED | REFUNDED
  method: PaymentMethod
  provider: "STRIPE" | "HYPERPAY" | "MOYASAR" | ...
  rideId?: String
  orderId?: String
}

Wallet {
  balance: Decimal
  pendingBalance: Decimal
  autoTopup: Boolean
  autoTopupThreshold?: Decimal
  autoTopupAmount?: Decimal
}
```

---

## 📍 Location Fields

```typescript
Location {
  latitude: Decimal   // Precision: 65,30
  longitude: Decimal
  heading?: Decimal   // 0-360 degrees
  speed?: Decimal     // km/h
  accuracy?: Decimal  // meters
  battery?: Int       // percentage
}

Address {
  address: String
  addressAr?: String
  city: String        // Riyadh, Jeddah, Dammam
  district?: String
  districtAr?: String
  latitude?: Decimal
  longitude?: Decimal
}
```

---

## 🎯 Common Queries

### Find User by Email or Phone
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  // OR
  where: { phone: '+966500000000' }
});
```

### Get Customer with Relations
```typescript
const customer = await prisma.customer.findUnique({
  where: { userId },
  include: {
    user: true,
    wallet: true,
    rides: { take: 10, orderBy: { createdAt: 'desc' } },
    orders: { take: 10, orderBy: { createdAt: 'desc' } },
    addresses: true,
  }
});
```

### Find Nearby Drivers
```typescript
const drivers = await prisma.driver.findMany({
  where: {
    status: 'ONLINE',
    canAcceptRides: true,
    currentLocation: {
      latitude: { gte: minLat, lte: maxLat },
      longitude: { gte: minLng, lte: maxLng }
    }
  },
  include: { vehicle: true, currentLocation: true }
});
```

### Get Active Orders
```typescript
const orders = await prisma.order.findMany({
  where: {
    status: { in: ['CONFIRMED', 'PREPARING', 'IN_TRANSIT'] },
    restaurantId
  },
  include: {
    customer: true,
    driver: true,
    items: { include: { menuItem: true } }
  }
});
```

---

## 🔐 Test Credentials

```
Admin:     admin@tatx.sa     / password123
Support:   support@tatx.sa   / password123
Driver:    driver@tatx.sa    / password123
Merchant:  merchant@tatx.sa  / password123
Customer:  customer@tatx.sa  / password123
```

⚠️ **Change these in production!**

---

## 📊 Database Schema

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    User     │────▶│   Customer   │────▶│    Wallet   │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                    │
       │                    ▼                    ▼
       │              ┌──────────────┐     ┌─────────────┐
       │              │     Ride     │     │ Transaction │
       │              └──────────────┘     └─────────────┘
       │                    │
       ▼              ┌──────────────┐
┌─────────────┐      │     Order    │
│    Driver   │◀─────┤  (Food/etc)  │
└─────────────┘      └──────────────┘
       │                    │
       ▼                    ▼
┌─────────────┐     ┌──────────────┐
│   Vehicle   │     │   Payment    │
└─────────────┘     └──────────────┘
```

---

## 🎁 Promo Code Types

```typescript
PERCENTAGE      // 20% off
FIXED          // 10 SAR off
FREE_DELIVERY  // Waive delivery fee
```

### Usage Limits
```typescript
usageLimit: 1000           // Total uses
usageLimitPerUser: 3       // Per user limit
minOrderAmount: 50         // Minimum order
maxDiscount: 30            // Cap discount amount
```

---

## 🚨 Important Defaults

```typescript
User {
  language: "ar"
  timezone: "Asia/Riyadh"
  phoneVerified: true  // KSA uses phone primarily
}

Currency {
  default: "SAR"
}

Driver {
  maxDeliveryRadius: 10.0  // km
  status: "OFFLINE"
}

Restaurant {
  deliveryRadius: 5.0      // km
  minOrderAmount: 10.0
  deliveryFee: 3.99
  commissionRate: 0.15     // 15%
}
```

---

## 📝 Migration Workflow

```bash
# 1. Edit schema.prisma
# 2. Create migration
pnpm db:migrate

# 3. Review generated SQL
# 4. Test locally
pnpm db:seed

# 5. Commit migration files
git add prisma/migrations/

# 6. Deploy to production
pnpm db:migrate:prod
```

---

## 🔍 Useful Prisma Studio Queries

Open Prisma Studio:
```bash
pnpm db:studio
```

Filter examples:
```
# Active drivers
status = "ONLINE"

# Orders today
createdAt >= "2024-01-01" AND status != "DELIVERED"

# High-value customers
totalSpent > 1000
```

---

## 📞 Support

**Documentation**: `/packages/database/SCHEMA_DOCS.md`  
**Migration Guide**: `/packages/database/MIGRATION_GUIDE.md`  
**Customization**: `/packages/database/CUSTOMIZATION_SUMMARY.md`

---

**Version**: 2.0.0 | **Updated**: 2026-03-12 | **Platform**: Tatx
