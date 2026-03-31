# RTL Implementation - Apple HIG Compliance

## Overview
This document describes the complete RTL (Right-to-Left) implementation for Tatx SA following **Apple's Human Interface Guidelines** for RTL languages.

---

## Apple HIG RTL Principles Applied

### 1. **Text Alignment** ✅
- All Arabic text is **right-aligned**
- Text alignment matches the interface direction
- Paragraphs align based on their language (Arabic = right)
- Consistent alignment throughout all lists

**Implementation:**
```javascript
// All text styles include
textAlign: 'right',
writingDirection: 'rtl'
```

### 2. **Layout Mirroring** ✅
- Interface flows from **right to left**
- Flex rows use `flexDirection: 'row-reverse'`
- Start = Right, End = Left
- Navigation slides from right

**Implementation:**
```javascript
// RTL constants
ROW: 'row-reverse',
ALIGN_START: 'flex-end', // Right side in RTL
SLIDE_FROM: 'right',
```

### 3. **Controls & Navigation** ✅
- **Back button** points **right** (→) in RTL
- Progress indicators reverse direction
- Sliders flow right-to-left
- Tab bar items start from right

**Implementation:**
```javascript
// Back arrow
getBackArrow = () => '→' // Points right

// Navigation
animation: 'slide_from_right'

// Tab bar
flexDirection: 'row-reverse'
```

### 4. **Numbers** ✅ (Apple HIG Critical)
- **Digit order is NEVER reversed**
- Numbers maintain LTR digit sequence: `12345`
- Progress/rating numerals reverse position, not digits
- Number formatting uses Arabic-Indic digits where appropriate

**Implementation:**
```javascript
// OTP inputs maintain LTR for digits
writingDirection: 'ltr' // Numbers stay LTR

// Timer display
writingDirection: 'ltr' // 12:34 not reversed

// Number formatting
formatNumber = (num) => new Intl.NumberFormat('ar-SA').format(num)
```

### 5. **Images** ✅
- **Photographs and illustrations are NOT flipped**
- Image positions reverse when order is meaningful
- Logos remain in original form
- Universal symbols (checkmarks) not flipped

**Implementation:**
```javascript
// Images maintain original direction
<Image source={...} resizeMode="contain" />
// No flipping applied

// Horizontal scrolls invert for RTL
<ScrollView horizontal inverted={true} />
```

### 6. **Interface Icons** ✅
- **Directional icons flip** (arrows, back buttons)
- **Non-directional icons don't flip** (home, settings)
- SF Symbols variants used where available
- Custom icons follow same rules

**Implementation:**
```javascript
// Back arrow flips
<Ionicons name="arrow-forward" /> // Points right in RTL

// Non-directional icons stay same
<Ionicons name="home" /> // Same in RTL
```

---

## File Structure

### Core RTL Files

#### `/src/utils/rtl.js`
Main RTL configuration and utilities:
- RTL constants
- Direction helpers
- Style helpers
- Number formatting

```javascript
export const RTL = {
  IS_RTL: true,
  DIRECTION: 'rtl',
  TEXT_ALIGN: 'right',
  ROW: 'row-reverse',
  BACK_ARROW: '→',
  SLIDE_FROM: 'right',
  // ... more constants
}
```

#### `/src/utils/rtlHelpers.js`
Helper functions for RTL implementation:
- Validation functions (phone, name, OTP)
- Style helpers
- Text direction detection
- Number formatting

```javascript
export const validateSaudiPhone = (phone) => {...}
export const validateName = (name) => {...}
export const validateOTP = (code) => {...}
export const getBackArrow = () => '→'
```

### Updated Screens

#### `App.js`
- RTL configuration at app level
- Web RTL CSS injection
- HTML direction attributes

```javascript
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Web RTL
document.documentElement.setAttribute('dir', 'rtl');
document.body.style.direction = 'rtl';
document.body.style.textAlign = 'right';
```

#### `AppNavigator.js`
- RTL navigation direction
- Slide from right animation
- Tab bar RTL layout

```javascript
<NavigationContainer 
  direction={RTL.DIRECTION}
>
  <Stack.Navigator 
    screenOptions={{ animation: RTL.SLIDE_FROM }}
  >
```

#### `LoginScreen.js`
- All text right-aligned
- Input fields RTL
- Error messages RTL
- Centered hero section

**Key RTL styles:**
```javascript
input: { 
  textAlign: 'right', 
  writingDirection: 'rtl' 
},
errorText: { 
  textAlign: 'right', 
  writingDirection: 'rtl' 
},
hero: { alignItems: 'center' },
```

#### `OTPScreen.js`
- Header RTL (back button on right)
- OTP inputs centered
- Numbers maintain LTR (Apple HIG)
- All text RTL

**Key RTL styles:**
```javascript
header: { flexDirection: 'row-reverse' },
codeInput: { 
  writingDirection: 'ltr' // Numbers stay LTR
},
timer: { 
  writingDirection: 'ltr' // Numbers stay LTR
},
```

---

## RTL Checklist (Apple HIG)

### Text & Typography
- [x] All Arabic text right-aligned
- [x] writingDirection set to 'rtl' for Arabic
- [x] Numbers maintain LTR digit order
- [x] Consistent alignment in lists
- [x] Arabic font (Cairo) used throughout

### Layout & Spacing
- [x] Flex rows use 'row-reverse'
- [x] Margins/padding swapped (start = right)
- [x] Horizontal scrolls inverted
- [x] Content flows right-to-left

### Navigation & Controls
- [x] Back button points right (→)
- [x] Navigation slides from right
- [x] Tab bar items start from right
- [x] Progress indicators reversed

### Images & Icons
- [x] Photos not flipped
- [x] Illustrations not flipped
- [x] Logos in original form
- [x] Directional icons flipped
- [x] Universal symbols not flipped

### Numbers & Data
- [x] Digit order preserved
- [x] Phone numbers formatted correctly
- [x] Dates formatted for Arabic locale
- [x] Currency uses Arabic format

### Input Fields
- [x] Text starts from right
- [x] Cursor starts from right
- [x] Placeholder text RTL
- [x] Numbers in inputs stay LTR

---

## Testing Guide

### Visual Testing

1. **Launch App**
   - Splash screen centered ✓
   - All text right-aligned ✓

2. **Onboarding Flow**
   - Slides animate from right ✓
   - Text right-aligned ✓
   - Progress indicator RTL ✓

3. **Login Screen**
   - Logo centered ✓
   - Title/subtitle centered ✓
   - Mode cards RTL ✓
   - Input fields: text starts right ✓
   - Error messages right-aligned ✓
   - Button centered ✓

4. **OTP Screen**
   - Back button on right (→) ✓
   - Title right of back button ✓
   - OTP inputs centered ✓
   - Numbers maintain LTR ✓
   - Timer digits LTR ✓
   - Verify button centered ✓

5. **Main App**
   - Tab bar starts from right ✓
   - Home screen RTL ✓
   - Horizontal scrolls RTL ✓
   - All text right-aligned ✓

### Functional Testing

```bash
# Start the app
npm start

# Test login flow
1. Enter phone: 0555123456
2. See OTP alert: "رمز التحقق هو: 1234"
3. Click "متابعة"
4. Enter: 1234
5. Login successful
```

---

## Code Examples

### RTL Text Alignment
```javascript
// Correct ✓
<Text style={{ textAlign: 'right', writingDirection: 'rtl' }}>
  مرحبا بك
</Text>

// Incorrect ✗
<Text style={{ textAlign: 'left' }}>
  مرحبا بك
</Text>
```

### RTL Layout
```javascript
// Correct ✓
<View style={{ flexDirection: 'row-reverse' }}>
  <Icon />
  <Text>النص</Text>
</View>

// Incorrect ✗
<View style={{ flexDirection: 'row' }}>
  <Icon />
  <Text>النص</Text>
</View>
```

### Numbers (Apple HIG)
```javascript
// Correct ✓ - Digits stay LTR
<TextInput 
  style={{ writingDirection: 'ltr' }}
  keyboardType="number-pad"
/>

// Timer display
<Text style={{ writingDirection: 'ltr' }}>
  {minutes}:{seconds}
</Text>
```

### Navigation
```javascript
// Correct ✓
<NavigationContainer direction="rtl">
  <Stack.Navigator 
    screenOptions={{ animation: 'slide_from_right' }}
  >
```

---

## Common Mistakes to Avoid

### ❌ Don't reverse digit order
```javascript
// Wrong - Never do this
reverseNumber(12345) // → 54321 ✗

// Correct - Keep digit order
12345 // → 12345 ✓
```

### ❌ Don't flip images
```javascript
// Wrong - Don't flip photos
<Image 
  source={photo} 
  style={{ transform: [{ scaleX: -1 }] }} 
/> ✗

// Correct - Keep original
<Image source={photo} /> ✓
```

### ❌ Don't left-align Arabic text
```javascript
// Wrong
<Text style={{ textAlign: 'left' }}>
  نص عربي
</Text> ✗

// Correct
<Text style={{ textAlign: 'right' }}>
  نص عربي
</Text> ✓
```

### ❌ Don't use LTR back arrow
```javascript
// Wrong - Points left
const backArrow = '←' ✗

// Correct - Points right
const backArrow = '→' ✓
```

---

## Platform-Specific Notes

### iOS
- Native RTL support via I18nManager
- Automatic animation direction
- System icons auto-flip when appropriate

### Android
- Native RTL support via I18nManager
- May need explicit layout direction
- Test on physical device

### Web
- CSS direction property
- HTML dir attribute
- Custom RTL CSS injected

---

## Resources

### Apple HIG
- [Right to Left - Apple HIG](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
- [Localization - Apple HIG](https://developer.apple.com/design/human-interface-guidelines/localization)

### React Native
- [I18nManager Docs](https://reactnative.dev/docs/i18nmanager)
- [RTL Support Guide](https://reactnative.dev/docs/localization)

### Design
- Cairo Font: [Google Fonts](https://fonts.google.com/specimen/Cairo)
- SF Symbols: [Apple Developer](https://developer.apple.com/sf-symbols/)

---

## Summary

The Tatx SA app now fully complies with Apple HIG RTL guidelines:

✅ **Text**: All Arabic text right-aligned with `writingDirection: 'rtl'`  
✅ **Layout**: Flipped for RTL with `flexDirection: 'row-reverse'`  
✅ **Navigation**: Back points right, slides from right  
✅ **Numbers**: Digit order preserved (never reversed)  
✅ **Images**: Not flipped, positions reversed when meaningful  
✅ **Icons**: Directional icons flipped, others unchanged  
✅ **Controls**: Progress/sliders reversed  
✅ **Input Fields**: Text starts from right, numbers stay LTR  

**Test the app:**
```bash
npm start
```

All elements now properly flow from **right to left** following Apple's guidelines!
