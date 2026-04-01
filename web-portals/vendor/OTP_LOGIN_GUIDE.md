# Vendor Portal - OTP Login Guide

## ✅ OTP Login Implemented

The vendor portal now has a complete OTP (One-Time Password) login flow!

---

## 🚀 How to Login

### Step 1: Enter Phone Number
1. Open vendor portal: `http://localhost:3002`
2. Enter your phone number: `0555000002`
3. Click "إرسال رمز التحقق"

### Step 2: Enter OTP Code
4. You'll see the OTP screen
5. **Test OTP Code: `1234`**
6. Enter the 4 digits in the boxes
7. Click "تأكيد"

### Step 3: Access Portal
8. If approved → Dashboard loads
9. If pending → Shows pending screen
10. If rejected → Shows rejection message

---

## 📱 Test Accounts

### Approved Vendor ✅
```
Phone: 0555000002
OTP: 1234
Status: Approved
Access: Full dashboard access
```

### Pending Vendor ⏳
```
Phone: 0555000001
OTP: 1234
Status: Pending
Access: Shows "تحت المراجعة" screen
```

### Rejected Vendor ❌
```
Phone: 0555000003
OTP: 1234
Status: Rejected
Access: Shows rejection message with notes
```

---

## 🎯 Login Flow

```
┌─────────────────┐
│  Enter Phone    │
│  0555000002     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Send OTP       │
│  Code: 1234     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Enter OTP      │
│  [1][2][3][4]   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Verify OTP     │
│  Check Code     │
└────────┬────────┘
         │
         ▼
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌──────────┐
│Approved│ │ Pending  │
│       │ │ /Rejected│
│ Dash- │ │          │
│ board │ │ Message  │
└───────┘ └──────────┘
```

---

## 🔐 Security Features

### Phone Validation
- ✅ Must be Saudi number (05XXXXXXXX)
- ✅ Exactly 10 digits
- ✅ Starts with 05

### OTP Validation
- ✅ Exactly 4 digits
- ✅ Numbers only
- ✅ Auto-focus next input
- ✅ Backspace support

### Session Management
- ✅ Logout button in sidebar
- ✅ Clear authentication state
- ✅ Return to login screen

---

## 💻 Console Logs

### When Sending OTP
```
📤 Sending OTP to: 0555000002
📞 Fetching vendor data for: 0555000002
📋 Application: {...}
✅ OTP sent: 1234
```

### When Verifying OTP
```
🔐 Verifying OTP: 1234
✅ OTP verified
👤 Profile: {...}
📦 Services: 5
🛍 Orders: 12
```

---

## 🎨 OTP Screen Features

### Auto-Focus
- First box auto-focused
- Moves to next box automatically
- Backspace goes to previous box

### Validation
- Only accepts numbers (0-9)
- Maximum 1 digit per box
- Shows error if incomplete

### UI Elements
- ✅ CheckCircle icon
- ✅ Phone number display
- ✅ Test code hint (1234)
- ✅ Change phone button
- ✅ Loading state

---

## 🐛 Troubleshooting

### Issue: OTP not accepted
**Solution:** Make sure you enter `1234` (the test code)

### Issue: Can't type in boxes
**Solution:** Click the first box or refresh page

### Issue: Wrong phone format
**Solution:** Use format: 0555000002 (10 digits, starts with 05)

### Issue: Shows "تحت المراجعة"
**Solution:** This means the vendor account is pending approval

---

## 📊 Database Requirements

### vendor_applications Table
```sql
CREATE TABLE vendor_applications (
  id UUID PRIMARY KEY,
  phone TEXT NOT NULL,
  owner_name TEXT,
  store_name TEXT,
  city TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')),
  review_notes TEXT,
  created_at TIMESTAMP
);
```

### Sample Data
```sql
-- Approved Vendor
INSERT INTO vendor_applications 
VALUES (gen_random_uuid(), '0555000002', 'أحمد محمد', 'مطعم المذاق', 'الرياض', 'approved', NULL, NOW());

-- Pending Vendor
INSERT INTO vendor_applications 
VALUES (gen_random_uuid(), '0555000001', 'سارة علي', 'مقهى القهوة', 'جدة', 'pending', NULL, NOW());

-- Rejected Vendor
INSERT INTO vendor_applications 
VALUES (gen_random_uuid(), '0555000003', 'خالد عمر', 'متجر الهدايا', 'الدمام', 'rejected', 'يرجى تحديث البيانات', NOW());
```

---

## ✅ Features Implemented

- [x] Phone number input with validation
- [x] OTP screen with 4 digit inputs
- [x] Auto-focus and navigation
- [x] Backspace support
- [x] OTP verification
- [x] Error messages
- [x] Loading states
- [x] Test mode (OTP: 1234)
- [x] Approved/Pending/Rejected flows
- [x] Logout functionality
- [x] Console logging for debugging

---

## 🎯 Next Steps (Production)

### SMS Integration
Replace test OTP with real SMS:
```javascript
// Instead of:
const otp = '1234';

// Use SMS service:
const otp = generateRandomOTP();
await sendSMS(phone, `رمز التحقق: ${otp}`);
```

### Rate Limiting
- Limit OTP attempts
- Add cooldown period
- Block after X failed attempts

### Session Persistence
- Store auth token in localStorage
- Auto-login on return
- Token expiration

---

## 🎉 Ready to Test!

```bash
cd web-portals/vendor
npm run dev
```

1. Open: `http://localhost:3002`
2. Phone: `0555000002`
3. OTP: `1234`
4. ✅ Login to dashboard!

**Status:** ✅ OTP Login Working, ✅ Supabase Connected, ✅ Auth Complete
