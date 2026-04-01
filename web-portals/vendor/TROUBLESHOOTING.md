# Vendor Portal - Troubleshooting Guide

## ✅ Fixed Issues

### 1. CSS Error: `border-border` class
**Error:**
```
The `border-border` class does not exist
```

**Solution:**
Removed the invalid `@apply border-border;` from `src/index.css`.

**File:** `src/index.css`
```css
/* BEFORE (WRONG) */
@layer base {
  * {
    @apply border-border; /* ❌ This class doesn't exist */
  }
}

/* AFTER (CORRECT) */
@layer base {
  body {
    @apply font-sans;
  }
}
```

---

## 🔧 Supabase Connection

### Environment Variables
Make sure `.env` file exists with correct values:

```env
VITE_SUPABASE_URL=https://api.tatx.com
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Verify Connection

1. **Open Browser Console** (F12)
2. **Look for logs:**
   ```
   🔧 Supabase Config: {url: "...", hasKey: true}
   📞 Fetching vendor data for: 0555000000
   📋 Application: {...}
   👤 Profile: {...}
   📦 Services: 5
   🛍 Orders: 12
   ```

### Common Issues

#### Issue 1: Supabase URL not found
**Error:** `VITE_SUPABASE_URL is undefined`

**Solution:**
1. Check `.env` file exists
2. Restart dev server: `npm run dev`
3. Clear cache: `rm -rf node_modules/.vite`

#### Issue 2: CORS Error
**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
1. Go to Supabase Dashboard
2. Settings → API
3. Add `http://localhost:3002` to allowed origins

#### Issue 3: Permission Denied
**Error:** `permission denied for table vendor_applications`

**Solution:**
1. Go to Supabase Dashboard
2. Authentication → Policies
3. Enable RLS for tables
4. Add policy for anon users to read

---

## 🧪 Test Authentication Flow

### Test Phone Number
Use test numbers to verify authentication:

```
0555000001 - User account
0555000002 - Vendor account  
0555000003 - Admin account
```

### Expected Flow

1. **Login Screen**
   - Enter phone: `0555000002`
   - Click "التحقق من الحساب"
   - Console: `📞 Fetching vendor data for: 0555000002`

2. **Pending State** (if not approved)
   - Shows: "تحت المراجعة"
   - Click "تحديث الحالة" to refresh

3. **Approved State** (if approved)
   - Shows dashboard
   - Sidebar with menu
   - Statistics cards

---

## 📊 Database Tables

Required Supabase tables:

### 1. vendor_applications
```sql
- id (uuid, primary key)
- phone (text)
- owner_name (text)
- store_name (text)
- city (text)
- status (text: pending/approved/rejected)
- review_notes (text)
- created_at (timestamp)
```

### 2. vendor_profiles
```sql
- id (uuid, primary key)
- phone (text)
- owner_name (text)
- store_name (text)
- city (text)
- commission_rate (number)
- created_at (timestamp)
```

### 3. vendor_services
```sql
- id (uuid, primary key)
- vendor_id (uuid, foreign key)
- title (text)
- description (text)
- category (text)
- price (number)
- compare_price (number)
- image_url (text)
- inventory_count (number)
- preparation_time_minutes (number)
- is_active (boolean)
- created_at (timestamp)
```

### 4. customer_orders
```sql
- id (uuid, primary key)
- order_number (text)
- customer_name (text)
- vendor_name (text)
- total (number)
- discount (number)
- status (text)
- created_at (timestamp)
```

---

## 🔍 Debug Mode

### Enable Verbose Logging

Add to `main.jsx`:
```javascript
const DEBUG = true;

const fetchVendorPortalData = async (phone) => {
  if (DEBUG) {
    console.log('🔍 DEBUG:', { phone, supabaseUrl, hasSupabaseConfig });
  }
  // ... rest of code
};
```

### Check Network Requests

1. Open DevTools → Network tab
2. Filter: `vendor_`
3. Look for:
   - `vendor_applications` - Should return 200 OK
   - `vendor_profiles` - Should return 200 OK
   - `vendor_services` - Should return 200 OK
   - `customer_orders` - Should return 200 OK

---

## 🚨 Quick Fixes

### Reset Everything
```bash
cd web-portals/vendor
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### Clear Vite Cache
```bash
rm -rf node_modules/.vite
npm run dev
```

### Check Environment
```bash
# In browser console
console.log(import.meta.env)
# Should show VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

---

## ✅ Verification Checklist

- [ ] `.env` file exists with correct values
- [ ] Dev server starts without errors
- [ ] Browser console shows Supabase config
- [ ] Login screen appears
- [ ] Enter phone number works
- [ ] API calls visible in Network tab
- [ ] No CORS errors in console
- [ ] Dashboard loads for approved accounts
- [ ] Services can be added/edited/deleted
- [ ] Orders table shows data

---

## 📞 Support

If issues persist:

1. Check Supabase dashboard for errors
2. Verify RLS policies are correct
3. Check network requests in DevTools
4. Review console logs for error messages
5. Test with demo phone numbers

**Status:** ✅ CSS Fixed, ✅ Supabase Connected, ✅ Auth Working
