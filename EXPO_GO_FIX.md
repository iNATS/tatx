# Expo Go Crash Fix

## Problem
App was crashing on Expo Go but worked fine before the RTL changes.

## Root Cause
**I18nManager was being imported and called at the module level in `src/utils/rtl.js`**

This causes Expo Go to crash because:
1. I18nManager must ONLY be called at the top level of App.js
2. Module-level imports run before React Native is fully initialized
3. Expo Go is more strict about I18nManager usage than simulators

## Solution Applied

### File: `src/utils/rtl.js`
**REMOVED** these lines:
```javascript
import { I18nManager } from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
if (typeof I18nManager.swapLeftAndRightInRTL === 'function') {
  I18nManager.swapLeftAndRightInRTL(true);
}
```

**Why**: I18nManager should NEVER be imported in utility files. It must only be called once in App.js.

### File: `App.js`
**MOVED** RTL import AFTER I18nManager calls:
```javascript
// BEFORE (WRONG)
import { RTL } from './src/utils/rtl';
I18nManager.allowRTL(true); // ← Too late, rtl.js already crashed

// AFTER (CORRECT)
I18nManager.allowRTL(true); // ← First, before any imports
I18nManager.forceRTL(true);
import { RTL } from './src/utils/rtl'; // ← Now safe to import
```

### Files: `LoginScreen.js`, `OTPScreen.js`
**REMOVED** unused I18nManager import:
```javascript
// BEFORE
import { ..., I18nManager } from 'react-native';

// AFTER
import { ... } from 'react-native';
```

---

## Testing

### Start Expo Go
```bash
npm start
```

Then scan QR code with Expo Go app.

### Expected Behavior
✅ App loads without crashing  
✅ RTL layout works (all text right-aligned)  
✅ Login/Signup works with OTP code `1234`  
✅ Navigation slides from right  
✅ Back button points right (→)

---

## Important Rules for Expo Go

### ✅ DO
- Call I18nManager ONLY in App.js
- Call I18nManager at the TOP level (before any component code)
- Import utilities AFTER I18nManager calls
- Use RTL constants from utility files

### ❌ DON'T
- Import I18nManager in utility files
- Call I18nManager in components
- Call I18nManager inside useEffect
- Import I18nManager before calling it in App.js

---

## Why This Happened

The RTL implementation was working fine in:
- ✅ iOS Simulator
- ✅ Android Emulator  
- ✅ Web browser

But crashed on:
- ❌ Expo Go (iOS/Android)

**Reason**: Expo Go has stricter initialization requirements than simulators. Module-level I18nManager calls work in simulators but crash Expo Go.

---

## Files Modified

1. `/src/utils/rtl.js` - Removed I18nManager calls
2. `/App.js` - Reordered imports (I18nManager first)
3. `/src/screens/LoginScreen.js` - Removed unused I18nManager import
4. `/src/screens/OTPScreen.js` - Removed unused I18nManager import

---

## Quick Test

```bash
# Clear cache and start
npm start -- --clear

# Scan QR code with Expo Go
# App should load without crashing!
```

---

## If Still Crashing

1. **Clear Expo cache completely**:
   ```bash
   rm -rf .expo
   npm start -- --clear
   ```

2. **Restart Expo Go app**:
   - Close Expo Go completely
   - Reopen Expo Go
   - Scan QR code again

3. **Check console for errors**:
   ```bash
   npm start
   # Watch for red error screens
   ```

4. **Verify I18nManager is only in App.js**:
   ```bash
   grep -r "I18nManager" src/
   # Should only show App.js
   ```

---

## Summary

✅ **Fixed**: Removed I18nManager from utility files  
✅ **Fixed**: Reordered App.js imports  
✅ **Fixed**: Removed unused imports  
✅ **Tested**: Syntax validation passed  

**App should now work on Expo Go!** 🎉

Scan the QR code and test:
- Login with phone: `0555123456`
- OTP code: `1234`
- All RTL layout working
