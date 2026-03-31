# Web Alert Fix - OTP Navigation

## Problem
OTP code was generated successfully (visible in console: `code: 9310`) but Alert dialog wasn't showing on **web browser**, preventing navigation to OTP screen.

## Root Cause
`Alert.alert()` is a **React Native API** that only works on mobile (iOS/Android). It doesn't work on web browsers.

## Solution
Added platform-specific alert handling:
- **Web**: Use `window.alert()` (browser native alert)
- **Mobile**: Use `Alert.alert()` (React Native API)

## Files Modified

### 1. `/src/screens/LoginScreen.js`
```javascript
if (Platform.OS === 'web') {
  // Web: Use browser alert and redirect
  window.alert(`تم إرسال رمز التحقق\n\nرمز التحقق هو: ${testCode}`);
  navigation.navigate('OTP', { ... });
} else {
  // Mobile: Use React Native Alert with button
  Alert.alert('تم إرسال رمز التحقق', `رمز التحقق هو: ${testCode}`, [
    { text: 'متابعة', onPress: () => navigation.navigate('OTP', {...}) }
  ]);
}
```

### 2. `/src/screens/OTPScreen.js`
```javascript
// OTP verification alerts
if (Platform.OS === 'web') {
  window.alert('خطأ: ' + error.message);
} else {
  Alert.alert('خطأ', error.message);
}

// Resend OTP alerts
if (Platform.OS === 'web') {
  window.alert(`تم إرسال رمز جديد\n\nرمز التحقق هو: ${testCode}`);
} else {
  Alert.alert('تم إرسال رمز جديد', `الرمز: ${testCode}`);
}
```

---

## Testing on Web

### 1. Start the app
```bash
npm run web:dev
```

### 2. Login Flow
1. Enter phone: `0555123456`
2. Click "إرسال رمز التحقق"
3. **Browser alert shows**:
   ```
   تم إرسال رمز التحقق
   
   رمز التحقق هو: 9310
   (للاختبار استخدم هذا الرمز)
   ```
4. Click "OK" on alert
5. **Automatically navigates to OTP screen**
6. Enter code: `9310` (or any 4 digits)
7. Click "تأكيد"
8. ✅ Login successful

### 3. Signup Flow
1. Select "إنشاء حساب"
2. Enter name, phone, city
3. Click "إرسال رمز التحقق"
4. **Browser alert shows OTP code**
5. Click "OK"
6. Enter OTP code
7. ✅ Signup successful

---

## Testing on Mobile (Expo Go)

Behavior unchanged on mobile:
- Alert dialog with "متابعة" button
- Click button to navigate to OTP screen
- Works exactly as before

---

## Key Differences

### Web Browser
- ✅ Uses `window.alert()`
- ✅ Single "OK" button
- ✅ Auto-navigates after alert closes
- ✅ No cancel option

### Mobile (React Native)
- ✅ Uses `Alert.alert()`
- ✅ Custom "متابعة" button
- ✅ Navigates on button press
- ✅ Better UX with custom buttons

---

## Console Logs (Web)

You should see:
```
[Auth] Requesting OTP code for: 0555123456 mode: login
[Auth] Attempting to insert OTP into Supabase...
[Auth] OTP inserted successfully, code: 9310
```

Then browser alert appears → Click OK → Navigate to OTP screen.

---

## Common Issues

### Issue: Alert doesn't show on web
**Solution**: Check browser pop-up blocker settings. Allow alerts for localhost.

### Issue: Alert shows but doesn't navigate
**Solution**: Navigation happens after alert closes. Make sure to click "OK".

### Issue: Works on web but not mobile
**Solution**: Mobile uses different Alert API. Check if Platform.OS detection is working.

---

## Summary

✅ **Web**: Now uses `window.alert()` with auto-navigation  
✅ **Mobile**: Still uses `Alert.alert()` with custom buttons  
✅ **OTP Flow**: Works on both platforms  
✅ **Error Messages**: Platform-specific alerts  

**Test now:**
```bash
npm run web:dev
```

Login with phone `0555123456` → Get OTP alert → Navigate to OTP screen! 🎉
