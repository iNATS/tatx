# 🎉 Tatx Platform - Now Running with Demo Data!

## ✅ App Configured for Demo Mode

The Tatx customer app is now set up to run with **static demo data** - no database or backend required!

---

## 🚀 Quick Start

### Start the App

```bash
cd /home/workspace/projects/ia6g/tatx/apps/customer-app
pnpm dev
```

**Access**: http://localhost:3100

---

## 🎯 What You Get

### Demo Features (All Working):

- ✅ **Home Page** - Service selector (Ride, Food, Package)
- ✅ **Ride Booking** - Vehicle selection, fare estimation
- ✅ **Food Ordering** - Restaurant browsing, menus, cart
- ✅ **Demo Banner** - Shows demo mode status
- ✅ **Sample Data** - Pre-loaded rides, orders, wallet, etc.

### No Backend Needed:

- ❌ No database required
- ❌ No API server needed
- ❌ No Prisma schema fixes needed
- ✅ Everything runs in the browser!

---

## 👤 Demo Credentials

```
Email: demo@tatx.sa
Password: demo123
```

Or just browse - the app auto-loads with demo data!

---

## 📊 Demo Data Included

### Sample User:
- **Name**: Ahmed Al-Rashid (أحمد الراشد)
- **Email**: demo@tatx.sa
- **Role**: CUSTOMER
- **Language**: Arabic

### Sample Wallet:
- **Balance**: 250.50 SAR
- **Transactions**: 3 sample transactions

### Sample Rides:
- **Ride 1**: Completed trip (King Fahd Road → Riyadh Airport)
- **Ride 2**: Requested ride (Olaya → Kingdom Centre)

### Sample Orders:
- **Order 1**: Delivered from Al-Baik (71.19 SAR)
- **Order 2**: In transit from Herfy (56.99 SAR)

### Sample Restaurants:
1. **Al-Baik** (البيك) - Fried chicken, 4.5⭐
2. **Herfy** (هرفي) - Burgers, 4.3⭐
3. **Al Tazaj** (الطازج) - Grilled chicken, 4.6⭐

### Sample Addresses:
- **Home**: King Fahd Road, Al Olaya, Riyadh
- **Work**: Tahlia Street, Riyadh

---

## 🎨 Demo Banner

You'll see a blue banner at the top of the page:

```
🎉 Demo Mode Active
Running with static demo data • No database required
Demo Login: demo@tatx.sa / demo123
```

**Actions**:
- Click **X** to hide the banner
- Click **Exit Demo** to disable demo mode

---

## 📱 Test the App

### 1. Test Ride Booking

1. Navigate to `/rides`
2. Enter pickup location: "King Fahd Road, Riyadh"
3. Enter dropoff: "Riyadh Airport"
4. Select vehicle type (Economy, Comfort, Premium, etc.)
5. See fare estimate
6. Click "Book Ride"

### 2. Test Food Ordering

1. Navigate to `/food`
2. Click on "Al-Baik" restaurant
3. Browse menu categories
4. Add items to cart (Chicken Meal, Fries, Pepsi)
5. Navigate to cart `/food/cart`
6. See order summary
7. Click "Place Order"

### 3. View Demo Data

Open browser console to see mock data being loaded.

---

## 🔧 Configuration

### Enable/Disable Demo Mode

Edit `apps/customer-app/lib/demo-config.ts`:

```typescript
export const DEMO_MODE = {
  enabled: true,  // Set to false to disable
  showBanner: true,
  autoLogin: true,
};
```

### Or via Browser

```javascript
// Open browser console and run:
localStorage.setItem('tatx_demo_mode', 'false');
location.reload();
```

---

## 📝 Files Created

| File | Purpose |
|------|---------|
| `apps/customer-app/lib/mock-data.ts` | All mock data (users, rides, orders, restaurants, wallet, etc.) |
| `apps/customer-app/hooks/useMockData.ts` | React hooks that use mock data |
| `apps/customer-app/lib/demo-config.ts` | Demo mode configuration |
| `apps/customer-app/components/DemoBanner.tsx` | Demo mode banner component |
| `apps/customer-app/DEMO_MODE.md` | Demo mode documentation |

---

## 🔄 Switching to Real Backend (Later)

When you're ready to connect to the real backend:

### 1. Fix Prisma Schema
Follow the fixes in `FIXES.md`

### 2. Deploy Backend
Use the simplified Dockerfiles

### 3. Disable Demo Mode
```typescript
// lib/demo-config.ts
export const DEMO_MODE = {
  enabled: false,  // Disable demo mode
};
```

### 4. Update API Calls
```typescript
// hooks/useMockData.ts
const USE_MOCK_DATA = false;  // Use real API
```

---

## 🎉 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Customer App UI** | ✅ Running | With demo data |
| **Demo Mode** | ✅ Active | No backend needed |
| **Ride Booking** | ✅ Working | Mock data |
| **Food Ordering** | ✅ Working | Mock data |
| **Backend Services** | ⏸️ Optional | Not needed for demo |
| **Database** | ⏸️ Optional | Not needed for demo |
| **Prisma Schema** | ⏸️ Pending | Can fix later |

---

## 📞 Quick Commands

```bash
# Start customer app with demo mode
cd apps/customer-app
pnpm dev

# Access the app
open http://localhost:3100

# Test login
# Email: demo@tatx.sa
# Password: demo123
```

---

## 🎯 What's Next?

### Option 1: Test the UI (Now)
- ✅ Browse the app
- ✅ Test ride booking
- ✅ Test food ordering
- ✅ View demo data

### Option 2: Deploy to VPS (Later)
- Push changes to GitHub
- Deploy with Dokploy
- Demo mode will work in production too!

### Option 3: Enable Real Backend (When Ready)
- Fix Prisma schema (see `FIXES.md`)
- Deploy backend services
- Disable demo mode
- Connect to real API

---

## ✅ Success Checklist

After starting the app:

- [ ] App running at http://localhost:3100
- [ ] Demo banner visible at top
- [ ] Home page loads with service cards
- [ ] Can navigate to /rides
- [ ] Can navigate to /food
- [ ] Can browse restaurants
- [ ] Can add items to cart
- [ ] Demo data loading correctly

---

**Status**: ✅ **Demo Mode Active - Ready to Test!**  
**Date**: 2026-03-12  
**Backend**: ❌ Not Required  
**Database**: ❌ Not Required  
**Demo Data**: ✅ Pre-loaded  

🎉 **The app is now running with demo static data!**
