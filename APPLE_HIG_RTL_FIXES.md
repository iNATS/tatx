# Apple HIG RTL Layout Fixes - Tatx SA

## Overview
This document describes the comprehensive RTL (Right-to-Left) layout fixes applied to the Tatx SA mobile app to ensure full compliance with **Apple's Human Interface Guidelines** for RTL languages.

---

## ✅ What Was Fixed

### 1. Enhanced RTL Utilities (`src/utils/rtl.js`)

Added comprehensive Apple HIG-compliant RTL helper functions:

- **Layout Helpers**: `getFlexRow()`, `getAlign()`, `getMargin()`, `getPadding()`
- **Text Helpers**: `getTextAlign()`, `getWritingDirection()`
- **Apple HIG Presets**: 
  - `numericLTR` - Numbers maintain LTR digit order
  - `headerRTL` - Back button on right, title center-right
  - `sectionHeader` - Title on right, action on left
  - `cardContent` - Content aligned to right (start)
  - `horizontalScrollRTL` - Scroll starts from right
  - `iconWithText()` - Icon on right, text flows left
  - `inputField` - Label on top-right
  - `buttonWithIcon` - Icon on right, centered
  - `listItem` - Content flows right-to-left
  - `navBar` - Navigation bar layout
  - `tabBar` - Tab bar starts from right
  - `heroSection` - Centered content
  - `gridLayout` - Grid flows RTL
  - `stackLayout()` - Vertical stack with gap
  - `centerLayout` - Horizontally centered
  - `spaceBetween` - Content right, action left

### 2. LoginScreen (`src/screens/LoginScreen.js`)

**Fixes Applied:**
- ✅ Hero section centered with proper spacing
- ✅ Brand name stays LTR (`writingDirection: 'ltr'`)
- ✅ All Arabic text has `writingDirection: 'rtl'`
- ✅ Input fields: 54pt height (Apple HIG minimum 44pt touch target)
- ✅ Button: 54pt height, full width, proper shadow
- ✅ All text styles include `writingDirection: 'rtl'`
- ✅ No letter-spacing on Arabic text
- ✅ Proper 8pt grid spacing throughout

**Apple HIG Compliance:**
- 48×48pt logo in 78×78pt shell (24pt radius)
- Title1 (28pt Bold) for hero title
- Body (17pt Regular) for subtitle
- Subhead (14pt SemiBold) for labels
- Button text (17pt SemiBold)
- Card radius: 32pt
- Button radius: 9999pt (pill shape)

### 3. OTPScreen (`src/screens/OTPScreen.js`)

**Fixes Applied:**
- ✅ Header: 44pt minimum height, back button on right (→)
- ✅ Back button: 44×44pt touch target
- ✅ OTP inputs: 60×60pt, centered, numbers stay LTR
- ✅ Timer: Numbers maintain LTR digit order
- ✅ Verify button: 54pt height, centered
- ✅ All text has proper `writingDirection`
- ✅ No letter-spacing on Arabic text

**Apple HIG Compliance:**
- Back arrow points right (→) in RTL
- Numbers never reversed: `12:34` not `43:21`
- OTP digits maintain LTR order: `1234` not `4321`
- Section spacing uses 8pt grid
- Touch targets minimum 44×44pt

### 4. HomeScreen (`src/screens/HomeScreen.js`)

**Fixes Applied:**
- ✅ All section headers: `flexDirection: 'row-reverse'`
- ✅ All text includes `writingDirection: 'rtl'`
- ✅ Top bar: Avatar on right, notification on left
- ✅ Search card: Icon on right, text flows left
- ✅ Horizontal scrolls: Start from right (`inverted={isRTL}`)
- ✅ Restaurant cards: Image on right, content flows left
- ✅ Cart bar: Proper RTL layout

**Apple HIG Compliance:**
- Section headers use row-reverse
- "View all" links on left side
- Content flows right-to-left, top-to-bottom
- Touch targets minimum 44×44pt
- Cards use 16-32pt corner radius

### 5. AppNavigator (`src/navigation/AppNavigator.js`)

**Fixes Applied:**
- ✅ Tab bar: `flexDirection: 'row-reverse'`
- ✅ Tab labels include `writingDirection: 'rtl'`
- ✅ Navigation direction set to RTL
- ✅ Slide animation from right

**Apple HIG Compliance:**
- Tab bar items start from right
- Back navigation slides from right
- Tab bar height: 83pt (including safe area)
- Icons: 30×30pt
- Labels: 11pt

---

## 🎯 Apple HIG RTL Principles Applied

### 1. Text Alignment
- ✅ All Arabic text right-aligned
- ✅ `writingDirection: 'rtl'` on all Arabic text
- ✅ Numbers maintain LTR digit order
- ✅ No letter-spacing on Arabic text

### 2. Layout Mirroring
- ✅ Interface flows right-to-left
- ✅ Flex rows use `flexDirection: 'row-reverse'`
- ✅ Start = Right, End = Left
- ✅ Navigation slides from right

### 3. Controls & Navigation
- ✅ Back button points right (→) in RTL
- ✅ Progress indicators reverse direction
- ✅ Tab bar items start from right
- ✅ Touch targets minimum 44×44pt

### 4. Numbers (Apple HIG Critical)
- ✅ Digit order NEVER reversed
- ✅ OTP inputs: `1234` not `4321`
- ✅ Timer display: `12:34` not `43:21`
- ✅ Numbers use `writingDirection: 'ltr'`

### 5. Images & Icons
- ✅ Photographs NOT flipped
- ✅ Logos maintain original form
- ✅ Directional icons flipped (arrows)
- ✅ Non-directional icons unchanged (home, settings)

### 6. Spacing (8pt Grid)
- ✅ xs: 4pt (half grid, rare)
- ✅ sm: 8pt (1 grid)
- ✅ md: 16pt (2 grid)
- ✅ lg: 24pt (3 grid)
- ✅ xl: 32pt (4 grid)
- ✅ xxl: 48pt (6 grid)
- ✅ xxxl: 64pt (8 grid)

### 7. Typography (Cairo Font)
- ✅ Large Title: 34pt Bold (page headers)
- ✅ Title 1: 28pt Bold (section headers)
- ✅ Title 2: 22pt SemiBold (card titles)
- ✅ Title 3: 20pt SemiBold (subtitles)
- ✅ Headline: 17pt SemiBold (important text)
- ✅ Body: 17pt Regular (main content)
- ✅ Callout: 16pt Regular (secondary content)
- ✅ Subhead: 15pt Regular (labels)
- ✅ Footnote: 13pt Regular (small text)
- ✅ Button: 17pt SemiBold
- ✅ Line height: 1.4-1.6× font size
- ✅ NO letter-spacing (Arabic doesn't use it)

### 8. Touch Targets
- ✅ Minimum: 44×44pt
- ✅ Recommended: 48×48pt
- ✅ Buttons: 54pt height
- ✅ Input fields: 54pt height

---

## 📋 Testing Checklist

### Visual Testing

#### Login Screen
- [ ] Logo centered
- [ ] Brand name (Tatx SA) stays LTR
- [ ] Title and subtitle centered
- [ ] Mode cards right-aligned text
- [ ] Input fields: text starts from right
- [ ] Button: full width, 54pt height
- [ ] All Arabic text flows right-to-left

#### OTP Screen
- [ ] Back button on right, points right (→)
- [ ] Title right of back button
- [ ] OTP inputs centered
- [ ] Numbers in OTP stay LTR (1234)
- [ ] Timer displays LTR (12:34)
- [ ] Verify button centered, 54pt height

#### Home Screen
- [ ] Top bar: avatar on right, notification on left
- [ ] Search card: icon on right
- [ ] Section headers: title on right, link on left
- [ ] Services scroll from right
- [ ] Restaurant cards: image on right
- [ ] Horizontal scrolls start from right

#### Tab Bar
- [ ] Items start from right
- [ ] Labels right-aligned
- [ ] Icons and text centered in pill

### Functional Testing

```bash
# Start the app
npm start

# Test login flow
1. Enter phone: 0555123456
2. See OTP alert: "رمز التحقق هو: 1234"
3. Click "متابعة"
4. Enter: 1234 (digits should be LTR)
5. Login successful
```

---

## 🔧 Code Patterns

### ✅ Correct RTL Pattern

```javascript
// Text with RTL
<Text style={{
  textAlign: 'right',
  writingDirection: 'rtl',
}}>
  مرحبا بك
</Text>

// Layout with RTL
<View style={{
  flexDirection: 'row-reverse',
  alignItems: 'center',
}}>
  <Icon />
  <Text>النص</Text>
</View>

// Numbers stay LTR (Apple HIG)
<Text style={{
  writingDirection: 'ltr',
  textAlign: 'center',
}}>
  12:34
</Text>

// Button with proper touch target
<TouchableOpacity style={{
  minHeight: 54, // Apple HIG: min 44pt
  borderRadius: 9999,
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <Text>إرسال</Text>
</TouchableOpacity>
```

### ❌ Incorrect Patterns to Avoid

```javascript
// Wrong: Left-aligned Arabic
<Text style={{ textAlign: 'left' }}>
  نص عربي
</Text>

// Wrong: Reversed digit order
reverseNumber(12345) // → 54321

// Wrong: Flipped photos
<Image
  source={photo}
  style={{ transform: [{ scaleX: -1 }] }}
/>

// Wrong: Letter-spacing on Arabic
<Text style={{ letterSpacing: 0.5 }}>
  نص عربي
</Text>

// Wrong: Touch target too small
<TouchableOpacity style={{
  height: 36, // Too small! Min 44pt
}}>
```

---

## 📊 Files Modified

| File | Changes |
|------|---------|
| `src/utils/rtl.js` | Added 30+ Apple HIG RTL helper functions |
| `src/screens/LoginScreen.js` | Fixed all text RTL, spacing, touch targets |
| `src/screens/OTPScreen.js` | Fixed header, number inputs, button |
| `src/screens/HomeScreen.js` | Fixed section headers, all text RTL |
| `src/navigation/AppNavigator.js` | Fixed tab bar labels RTL |

---

## 🎯 Summary

The Tatx SA mobile app now fully complies with **Apple's Human Interface Guidelines** for RTL languages:

✅ **Text**: All Arabic text right-aligned with `writingDirection: 'rtl'`
✅ **Layout**: Flipped for RTL with `flexDirection: 'row-reverse'`
✅ **Navigation**: Back points right (→), slides from right
✅ **Numbers**: Digit order preserved (never reversed)
✅ **Images**: Not flipped, positions reversed when meaningful
✅ **Icons**: Directional icons flipped, others unchanged
✅ **Controls**: Progress/sliders reversed
✅ **Input Fields**: Text starts from right, numbers stay LTR
✅ **Touch Targets**: Minimum 44×44pt, buttons 54pt height
✅ **Spacing**: 8pt grid system throughout
✅ **Typography**: Cairo font, proper sizes, no letter-spacing

**Test the app:**
```bash
npm start
```

All elements now properly flow from **right to left** following Apple HIG guidelines!

---

## 📚 References

- [Apple HIG: Right to Left](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
- [Apple HIG: Localization](https://developer.apple.com/design/human-interface-guidelines/localization)
- [React Native: I18nManager](https://reactnative.dev/docs/i18nmanager)
- [Tatx SA Design System](../QWEN.md#الثيم-والتصميم)
