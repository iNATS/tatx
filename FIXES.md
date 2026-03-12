# 🔧 Schema Fixes Required

The Prisma schema has 16 relation errors that need to be fixed. Here's what needs to be corrected:

## Issues Found

### 1. Missing Opposite Relation Fields

Several models reference other models without the opposite side being defined:

- `User.subscriptions` ↔ `Subscription` (missing relation field on Subscription)
- `MenuItem.modifierGroups` ↔ `ModifierGroup` (missing relation field)
- `MenuItem.reviews` ↔ `Review` (missing relation field)
- `RideShare.ride` ↔ `Ride` (missing relation field)
- `Order.driver` ↔ `Driver` (missing relation field)
- `Earning.ride` ↔ `Ride` (missing relation field)
- `Earning.order` ↔ `Order` (missing relation field)
- `Review.ride` ↔ `Ride` (missing relation field)
- `Review.order` ↔ `Order` (missing relation field)
- `SavedCard.user` ↔ `User` (missing relation field)

### 2. One-to-One Relations Need Unique Constraints

```prisma
// Payment model - lines 982-984
rideId              String?
ride                Ride?  @relation(fields: [rideId], references: [id], onDelete: SetNull)
orderId             String?
order               Order? @relation(fields: [orderId], references: [id], onDelete: SetNull)
```

**Fix**: Add `@unique` to rideId and orderId, or change to one-to-many

### 3. Missing Relation Attributes

```prisma
// Admin model - line 1321
roleId      String?
role        AdminRole?  // Missing @relation attributes
```

**Fix**: Add `@relation(fields: [roleId], references: [id])`

```prisma
// PromoCode model - line 1419
campaignId      String?
campaign        PromoCampaign?  // Missing @relation attributes
```

**Fix**: Add `@relation(fields: [campaignId], references: [id])`

## Quick Fix Commands

Run these commands to auto-fix some issues:

```bash
cd packages/database
npx prisma format
```

## Manual Fixes Required

Add these relation fields to the respective models:

### Subscription Model
```prisma
model Subscription {
  // ... existing fields
  plan SubscriptionPlan @relation(fields: [planId], references: [id])
  user User? @relation(fields: [customerId], references: [id])
}
```

### Ride Model
```prisma
model Ride {
  // ... existing fields
  rideShares RideShare[]
  earnings   Earning[]
  reviews    Review[]
}
```

### Order Model
```prisma
model Order {
  // ... existing fields
  earnings Earning[]
  reviews  Review[]
}
```

### Driver Model
```prisma
model Driver {
  // ... existing fields
  orders Order[]
}
```

### User Model
```prisma
model User {
  // ... existing fields
  subscriptions Subscription?
  savedCards    SavedCard[]
}
```

### ModifierGroup Model
```prisma
model ModifierGroup {
  // ... existing fields
  menuItems MenuItem[]
}
```

### Review Model
```prisma
model Review {
  // ... existing fields
  menuItem MenuItem? @relation(fields: [targetId], references: [id])
}
```

### Admin Model
```prisma
model Admin {
  roleId String?
  role   AdminRole? @relation(fields: [roleId], references: [id])
}
```

### PromoCode Model
```prisma
model PromoCode {
  campaignId String?
  campaign   PromoCampaign? @relation(fields: [campaignId], references: [id])
}
```

## Alternative: Use Simplified Schema

For quick testing, you can use a simplified schema without these complex relations. See `schema.simple.prisma` (to be created).

## Status

- ✅ Node.js installed (v20.11.0)
- ✅ npm installed (10.2.4)
- ✅ pnpm installed (9.15.0)
- ✅ Dependencies installed (1575 packages)
- ⚠️ Prisma schema needs fixes (16 relation errors)
- ⏸️ Database setup pending

## Next Steps

1. Fix the 16 relation errors in the schema
2. Run `npx prisma format`
3. Run `pnpm db:generate`
4. Start PostgreSQL
5. Run `pnpm db:migrate`
6. Run `pnpm db:seed`
7. Run `pnpm dev:all`
