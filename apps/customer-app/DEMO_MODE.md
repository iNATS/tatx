# 🎉 Tatx Platform - Demo Mode

## ✅ Running with Demo Data

The app is now configured to run with **static demo data** - no database or backend required!

---

## 🚀 Quick Start

### Start the App

```bash
cd apps/customer-app
pnpm dev
```

**Access**: http://localhost:3100

---

## 🎯 Demo Features

### ✅ What Works:

- **Home Page** - Service cards (Ride, Food, Package)
- **Ride Booking** - Browse vehicles, get fare estimates
- **Food Ordering** - Browse restaurants, view menus, add to cart
- **Demo Banner** - Shows you're in demo mode
- **Mock Data** - Sample rides, orders, wallet, notifications

### ⚠️ What's Limited:

- **No Real Backend** - All data is static/mock
- **No Database** - Changes don't persist
- **No Real API** - Simulated responses only

---

## 👤 Demo Credentials

Use these to "login" (mock):

```
Email: demo@tatx.sa
Password: demo123
```

Or just browse - the app auto-loads demo data!

---

## 📊 Demo Data Included

### Sample Data:

- **User**: Ahmed Al-Rashid (demo user)
- **Wallet**: 250.50 SAR balance
- **Rides**: 2 sample rides (1 completed, 1 requested)
- **Orders**: 2 sample orders (1 delivered, 1 in transit)
- **Restaurants**: 3 restaurants (Al-Baik, Herfy, Al Tazaj)
- **Addresses**: Home & Work in Riyadh
- **Notifications**: 2 sample notifications

---

## 🎨 Demo Banner

You'll see a blue banner at the top:

```
🎉 Demo Mode Active
Running with static demo data • No database required
Demo Login: demo@tatx.sa / demo123
```

**To hide the banner**: Click the X button  
**To exit demo mode**: Click "Exit Demo" button

---

## 🔧 Configuration

### Enable/Disable Demo Mode

In `apps/customer-app/lib/demo-config.ts`:

```typescript
export const DEMO_MODE = {
  enabled: true,  // Change to false to disable
  showBanner: true,
  autoLogin: true,
};
```

### Or via Browser Console

```javascript
// Disable demo mode
localStorage.setItem('tatx_demo_mode', 'false');
location.reload();

// Enable demo mode
localStorage.setItem('tatx_demo_mode', 'true');
location.reload();
```

---

## 📱 Pages Available

### Working Pages:

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | ✅ Working |
| Rides | `/rides` | ✅ Working (mock data) |
| Food | `/food` | ✅ Working (mock data) |
| Restaurant Detail | `/food/restaurant/[id]` | ✅ Working (mock data) |
| Cart | `/food/cart` | ✅ Working (mock data) |

---

## 🎯 Testing the Demo

### 1. Test Ride Booking

1. Go to `/rides`
2. Enter pickup: "King Fahd Road, Riyadh"
3. Enter dropoff: "Riyadh Airport"
4. Select vehicle type
5. Click "Book Ride"

### 2. Test Food Ordering

1. Go to `/food`
2. Click on "Al-Baik" restaurant
3. Add items to cart
4. Go to cart `/food/cart`
5. Click "Place Order"

### 3. View Demo Data

Check the browser console to see mock data being loaded.

---

## 🔄 Switching to Real Backend

When you're ready to connect to the real backend:

### 1. Update Demo Config

```typescript
// apps/customer-app/lib/demo-config.ts
export const DEMO_MODE = {
  enabled: false,  // Disable demo mode
};
```

### 2. Update API Calls

In `hooks/useMockData.ts`, change:

```typescript
const USE_MOCK_DATA = false;  // Use real API
```

### 3. Set API URL

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📝 Files Created

| File | Purpose |
|------|---------|
| `lib/mock-data.ts` | All mock data (users, rides, orders, etc.) |
| `hooks/useMockData.ts` | React hooks using mock data |
| `lib/demo-config.ts` | Demo mode configuration |
| `components/DemoBanner.tsx` | Demo mode banner |
| `DEMO_MODE.md` | This documentation |

---

## 🎉 Enjoy Testing!

The app is now running with full demo data. You can:

- ✅ Browse the UI
- ✅ Test navigation
- ✅ Simulate ride booking
- ✅ Simulate food ordering
- ✅ View sample data

**No database or backend needed!**

---

**Demo Mode Version**: 1.0.0  
**Status**: ✅ Active  
**Database**: ❌ Not Required  
**Backend**: ❌ Not Required
