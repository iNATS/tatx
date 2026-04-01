# Saudi Arabia Real Data - SQL Script Guide

## 📁 File Location
```
/supabase/tatx_saudi_real_data.sql
```

## 🎯 What's Included

### 1. **Vendor Applications** (11 Records)
- ✅ 8 Approved vendors (ready to login)
- ⏳ 2 Pending applications
- ❌ 1 Rejected application

**Real Saudi Restaurants:**
- مطعم المذاق الأصيل (Riyadh - Saudi Food)
- برجر السرايا (Riyadh - Burgers)
- مطعم ليالي بغداد (Riyadh - Iraqi Food)
- مطعم sushiwa (Riyadh - Japanese Food)
- مطعم البيت اللبناني (Riyadh - Lebanese Food)
- مطعم الصياد (Jeddah - Seafood)
- مطعم أصالة (Jeddah - Saudi Food)
- مطعم الخليج (Dammam - Gulf Food)
- مقهى القهوة العربية (Pending)
- متجر التمور الفاخرة (Pending)
- مطعم سريع (Rejected)

### 2. **Vendor Profiles** (8 Records)
All approved vendors with:
- Store information
- Owner details
- Commission rates (10-15%)
- Contact information

### 3. **Vendor Services** (50+ Menu Items)
Real menu items with:
- Arabic names and descriptions
- Realistic prices (SAR)
- High-quality images (Unsplash)
- Inventory counts
- Preparation times

**Examples:**
- مندي لحم - 58 ر.س
- برجر دبل انجس - 38 ر.س
- سوشي مشكل - 85 ر.س
- مشاوي مشكلة - 75 ر.س

### 4. **Customer Orders** (6 Records)
Real orders with:
- Saudi customer names
- Real Riyadh addresses
- Various statuses (pending, preparing, ready, on_way, completed)
- Order items with quantities
- Payment methods (Apple Pay, mada, Visa)

### 5. **App Users** (8 Records)
Real Saudi customer accounts with:
- Saudi names (القحطاني, الدوسري, الغامدي, etc.)
- Real phone numbers (0555XXXXXX)
- Email addresses (.sa domains)
- Wallet balances
- District information

### 6. **User Addresses** (4 Records)
Real Saudi addresses:
- Riyadh districts (الياسمين, الملقا, الورود, حطين)
- Street names (الملك عبدالعزيز, التخصصي, التحلية)
- Building numbers
- Additional details

---

## 🚀 How to Run

### Option 1: Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy & Paste SQL**
   - Open `supabase/tatx_saudi_real_data.sql`
   - Copy entire content
   - Paste into SQL Editor

4. **Run Script**
   - Click "Run" button (or Ctrl+Enter / Cmd+Enter)
   - Wait for success message

5. **Verify Data**
   ```sql
   -- Check counts
   SELECT COUNT(*) as vendor_applications FROM vendor_applications;
   SELECT COUNT(*) as vendor_profiles FROM vendor_profiles;
   SELECT COUNT(*) as vendor_services FROM vendor_services;
   SELECT COUNT(*) as customer_orders FROM customer_orders;
   ```

### Option 2: psql Command Line

```bash
# Connect to your Supabase database
psql -h db.<project-ref>.supabase.co -U postgres -d postgres

# Run the SQL file
\i /path/to/tatx_saudi_real_data.sql
```

### Option 3: Supabase CLI

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Run the SQL file
supabase db execute --file supabase/tatx_saudi_real_data.sql
```

---

## 📊 Data Overview

### Vendors by City
| City | Count |
|------|-------|
| Riyadh | 6 |
| Jeddah | 2 |
| Dammam | 1 |

### Vendors by Category
| Category | Count |
|----------|-------|
| مطاعم | 8 |
| مقاهي | 1 (pending) |
| هدايا | 1 (pending) |

### Services by Vendor
| Vendor | Services Count |
|--------|----------------|
| المذاق الأصيل | 12 |
| برجر السرايا | 11 |
| ليالي بغداد | 8 |
| sushiwa | 10 |
| البيت اللبناني | 13 |

### Orders by Status
| Status | Count |
|--------|-------|
| completed | 2 |
| preparing | 1 |
| pending | 1 |
| ready | 1 |
| on_way | 1 |

---

## 🧪 Test Login After Inserting Data

### Approved Vendor Login
```
Phone: 0555000002
OTP: 1234
Status: ✅ Approved
Store: مطعم المذاق الأصيل
```

### What You'll See:
1. **Dashboard** with:
   - 12 services
   - 6 orders
   - Real statistics

2. **Services Tab** with:
   - مندي لحم (58 ر.س)
   - كبسة دجاج (32 ر.س)
   - مظبي لحم (62 ر.س)
   - And 9 more items

3. **Orders Tab** with:
   - 6 real orders
   - Various statuses
   - Saudi customer names
   - Real addresses

---

## 🔍 Useful Queries

### View All Vendors
```sql
SELECT 
  store_name,
  owner_name,
  phone,
  city,
  category,
  status
FROM vendor_applications
ORDER BY created_at DESC;
```

### View All Services with Prices
```sql
SELECT 
  vp.store_name,
  vs.title,
  vs.description,
  vs.price,
  vs.inventory_count,
  vs.is_active
FROM vendor_services vs
JOIN vendor_profiles vp ON vs.vendor_id = vp.id
ORDER BY vp.store_name, vs.price DESC;
```

### View Orders by Status
```sql
SELECT 
  order_number,
  customer_name,
  customer_phone,
  vendor_name,
  status,
  total,
  created_at
FROM customer_orders
ORDER BY created_at DESC;
```

### View Top Selling Items
```sql
SELECT 
  item_name,
  SUM(quantity) as total_sold,
  SUM(quantity * price) as total_revenue
FROM (
  SELECT 
    jsonb_array_elements(items)->>'name' as item_name,
    (jsonb_array_elements(items)->>'quantity')::int as quantity,
    (jsonb_array_elements(items)->>'price')::numeric as price
  FROM customer_orders
) as order_items
GROUP BY item_name
ORDER BY total_sold DESC
LIMIT 10;
```

---

## 🎨 Images Used

All images are from Unsplash (free to use):
- Food images: High-quality restaurant photos
- Arabic cuisine: Traditional Saudi/Iraqi/Lebanese food
- International: Sushi, burgers, etc.

---

## 💡 Tips

### 1. **Test Different Scenarios**
- Login with approved vendor (0555000002)
- Try pending vendor (0555000050) - won't access portal
- Try rejected vendor (0555000060) - shows rejection message

### 2. **Update Order Statuses**
- Use vendor portal to update order status
- Watch statistics update in real-time

### 3. **Add More Services**
- Use vendor portal to add new services
- They'll be linked to the correct vendor

### 4. **Create New Orders**
- Use the main Tatx app to create orders
- They'll appear in vendor portal

---

## 🐛 Troubleshooting

### Issue: "relation already exists"
**Solution**: Data already inserted. Script uses `ON CONFLICT` to prevent duplicates.

### Issue: "foreign key violation"
**Solution**: Run `tatx_schema.sql` first to create tables.

### Issue: "permission denied"
**Solution**: Make sure you're logged in as admin/owner in Supabase.

### Issue: Images not loading
**Solution**: Check internet connection. Images are hosted on Unsplash.

---

## 📝 Notes

1. **Phone Numbers**: All use Saudi format (0555XXXXXX)
2. **Prices**: In Saudi Riyals (SAR)
3. **Addresses**: Real Riyadh districts
4. **Names**: Real Saudi names
5. **Emails**: Use .sa domain for Saudi emails

---

## 🎯 Next Steps

After running this script:

1. ✅ Login to vendor portal with `0555000002` / OTP `1234`
2. ✅ View 12 services from المذاق الأصيل
3. ✅ View 6 orders with various statuses
4. ✅ Update order statuses
5. ✅ Add/edit/delete services
6. ✅ Test all portal features

---

## 📞 Support

If you encounter any issues:
1. Check Supabase logs
2. Verify tables were created
3. Check RLS policies are enabled
4. Ensure foreign keys are correct

**Status**: ✅ Ready to Use
**Data**: Real Saudi Arabia vendor data
**Images**: High-quality Unsplash photos
**Addresses**: Real Riyadh districts
