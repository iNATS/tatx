# 🎉 Deploy Tatx Frontend-Only (No Database Required!)

## ✅ Quick Deployment - Demo Mode

This deployment uses **demo mode** with static data - perfect for testing the UI without needing a database or backend!

---

## 🚀 Deploy with Docker Compose

### Step 1: Clone Repository (Dokploy will do this automatically)

### Step 2: Use Frontend-Only Compose File

In Dokploy dashboard:
1. Go to your application
2. Change Compose File to: `docker-compose.frontend.yml`
3. Click **Redeploy**

Or via command line:
```bash
docker compose -f docker-compose.frontend.yml up -d --build
```

### Step 3: Access Your Apps

- **Customer App**: http://YOUR_VPS_IP:3100
- **Admin Dashboard**: http://YOUR_VPS_IP:3103 (or port 8080)
- **Nginx Proxy**: http://YOUR_VPS_IP:80

---

## 🎯 What You Get

### ✅ Working Features:
- Customer App UI with demo data
- Ride booking interface (mock)
- Food ordering interface (mock)
- Demo banner showing demo mode
- Sample data pre-loaded
- No database required
- No backend required

### ⚠️ Limitations:
- All data is static/mock
- Changes don't persist
- No real authentication
- No real API calls

---

## 📊 Demo Data Included

- **User**: Ahmed Al-Rashid (demo@tatx.sa)
- **Wallet**: 250.50 SAR balance
- **Rides**: 2 sample rides
- **Orders**: 2 sample orders
- **Restaurants**: 3 restaurants with menus
- **Addresses**: Home & Work in Riyadh

---

## 🔧 Demo Credentials

```
Email: demo@tatx.sa
Password: demo123
```

(Or just browse - demo data loads automatically!)

---

## 📝 Files Used

| File | Purpose |
|------|---------|
| `docker-compose.frontend.yml` | Frontend-only deployment |
| `nginx/nginx.frontend.conf` | Nginx config for frontend |
| `apps/customer-app/lib/mock-data.ts` | All mock data |
| `apps/customer-app/hooks/useMockData.ts` | Demo hooks |
| `apps/customer-app/lib/demo-config.ts` | Demo configuration |
| `apps/customer-app/components/DemoBanner.tsx` | Demo banner |

---

## 🎨 Demo Banner

You'll see a blue banner at the top:
```
🎉 Demo Mode Active
Running with static demo data • No database required
```

**To hide**: Click X button  
**To exit**: Click "Exit Demo" button

---

## 📱 Test the Demo

### 1. Test Ride Booking
1. Go to `/rides`
2. Enter pickup: "King Fahd Road, Riyadh"
3. Enter dropoff: "Riyadh Airport"
4. Select vehicle type
5. See fare estimate
6. Click "Book Ride"

### 2. Test Food Ordering
1. Go to `/food`
2. Click "Al-Baik" restaurant
3. Browse menu
4. Add items to cart
5. Go to cart
6. Click "Place Order"

---

## 🔄 Switch to Full Deployment (Later)

When you're ready for the full platform with database:

### 1. Fix Prisma Schema
Follow fixes in `FIXES.md`

### 2. Update Dokploy
Change compose file to: `docker-compose.prod.yml`

### 3. Add Environment Variables
```
DB_PASSWORD=your_password
REDIS_PASSWORD=your_password
JWT_SECRET=your_secret
```

### 4. Redeploy
Click **Redeploy** in Dokploy

---

## 📊 Deployment Comparison

| Feature | Frontend-Only | Full Platform |
|---------|--------------|---------------|
| **Setup Time** | 5 minutes | 30+ minutes |
| **Database** | ❌ Not required | ✅ Required |
| **Backend** | ❌ Not required | ✅ Required |
| **Demo Data** | ✅ Included | ⚠️ Need to seed |
| **Real API** | ❌ Mock only | ✅ Full API |
| **Persistence** | ❌ No | ✅ Yes |
| **Best For** | Testing UI | Production |

---

## 🆘 Troubleshooting

### App Won't Start
```bash
# Check logs
docker logs tatx-customer-app

# Restart
docker compose -f docker-compose.frontend.yml restart
```

### Port Already in Use
```bash
# Change port in docker-compose.frontend.yml
ports:
  - "3100:3000"  # Change 3100 to another port
```

### Demo Data Not Loading
```bash
# Check browser console
# Make sure demo mode is enabled
# localStorage.getItem('tatx_demo_mode') === 'true'
```

---

## ✅ Success Checklist

After deployment:

- [ ] Customer app accessible at port 3100
- [ ] Admin dashboard accessible at port 3103
- [ ] Demo banner visible
- [ ] Can navigate to /rides
- [ ] Can navigate to /food
- [ ] Demo data loading
- [ ] No errors in console

---

**Status**: ✅ **Ready to Deploy**  
**Database**: ❌ Not Required  
**Backend**: ❌ Not Required  
**Demo Mode**: ✅ Active  

🎉 **Deploy in 5 minutes - No database needed!**
