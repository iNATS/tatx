# Apple HIG RTL Design System
# Tatx SA - Arabic iOS Interface

## Overview
Complete RTL-first design system following Apple Human Interface Guidelines for Arabic users.

---

## 🎯 Core Principles

### 1. RTL-First Mindset
- NOT mirrored LTR - designed RTL from scratch
- Natural Arabic reading flow: Right → Left, Top → Bottom
- All spacing, alignment, and hierarchy optimized for Arabic

### 2. Apple HIG Compliance
- 8pt grid system
- 44pt minimum touch targets
- SF Arabic typography
- Native iOS patterns

### 3. Cultural Localization
- Arabic numerals where appropriate
- Saudi date/time formats
- Culturally relevant icons
- Proper Arabic terminology

---

## 📐 Spacing System (8pt Grid)

```javascript
export const spacing = {
  xs: 4,   // Half grid (rare)
  sm: 8,   // 1 grid
  md: 16,  // 2 grid
  lg: 24,  // 3 grid
  xl: 32,  // 4 grid
  xxl: 48, // 6 grid
  xxxl: 64 // 8 grid
};
```

### Safe Area Padding
```javascript
horizontal: 16pt (md)
vertical: 12pt (between sm and md)
```

### Touch Targets
```javascript
minimum: 44pt × 44pt
recommended: 48pt × 48pt
```

---

## 🔤 Typography (SF Arabic)

### Font Sizes (Dynamic Type Support)
```javascript
export const typography = {
  // Large Title (Page headers)
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: 'Cairo_700Bold',
  },
  
  // Title 1 (Section headers)
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'Cairo_700Bold',
  },
  
  // Title 2 (Card titles)
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Cairo_600SemiBold',
  },
  
  // Title 3 (Subtitles)
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'Cairo_600SemiBold',
  },
  
  // Headline (Important text)
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Cairo_600SemiBold',
  },
  
  // Body (Main content)
  body: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: 'Cairo_400Regular',
  },
  
  // Callout (Secondary content)
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'Cairo_400Regular',
  },
  
  // Subhead (Captions, labels)
  subhead: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Cairo_400Regular',
  },
  
  // Footnote (Small text)
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Cairo_400Regular',
  },
  
  // Caption 1
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Cairo_400Regular',
  },
  
  // Caption 2
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Cairo_400Regular',
  },
  
  // Button
  button: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Cairo_600SemiBold',
  },
};
```

### Arabic Typography Rules
- NO letter-spacing (Arabic doesn't use it)
- Line height: 1.4-1.6× font size
- Right alignment always
- No justified text (creates ugly gaps)

---

## 🎨 Color System

### Semantic Colors
```javascript
export const colors = {
  // Primary brand (Pink/Coral)
  primary: '#DA3C57',
  primaryDark: '#B72249',
  primaryLight: '#F16A82',
  
  // System colors
  background: '#F2F2F7', // iOS system gray 6
  card: '#FFFFFF',
  separator: '#C6C6C8', // iOS system gray 4
  
  // Text colors
  text: '#000000',
  textSecondary: '#3C3C4399', // 60% opacity
  textTertiary: '#3C3C4361', // 38% opacity
  
  // Semantic
  success: '#34C759', // iOS green
  error: '#FF3B30', // iOS red
  warning: '#FF9500', // iOS orange
  info: '#007AFF', // iOS blue
  
  // Fills
  fillPrimary: '#000000',
  fillSecondary: '#3C3C434D', // 30% opacity
  fillTertiary: '#3C3C431F', // 12% opacity
  fillQuaternary: '#3C3C430C', // 5% opacity
};
```

### Dark Mode Support
```javascript
// Automatic via iOS system colors
// Use semantic color names, not hex values
```

---

## 📱 Screen Layouts

### 1. Login Screen (تسجيل الدخول)

```
┌─────────────────────────────────┐
│                                 │
│         [Logo] ٤٨×٤٨            │ ← Centered
│                                 │
│      Tatx SA (١٥pt Bold)        │ ← Centered
│                                 │
│  ابدأ باستخدام التطبيق          │ ← Centered
│  (٢٨pt Bold)                    │
│                                 │
│  سجّل أو أنشئ حسابًا أولًا      │ ← Centered
│  ثم فعّل رقم الجوال             │ ← Centered
│  (١٧pt Regular, 60% opacity)    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ ○ تسجيل الدخول            │  │ ← Selected
│  │   ادخل برقم الجوال...     │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ ○ إنشاء حساب              │  │
│  │   أنشئ حسابًا جديدًا...   │  │
│  └───────────────────────────┘  │
│                                 │
│  الاسم الكامل                   │ ← Right aligned
│  ┌───────────────────────────┐  │
│  │ أدخل الاسم الكامل         │  │ ← Right aligned
│  └───────────────────────────┘  │
│                                 │
│  رقم الجوال                     │ ← Right aligned
│  ┌───────────────────────────┐  │
│  │ ٠٥XXXXXXXX                │  │ ← Right aligned
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │      إرسال رمز التحقق     │  │ ← Full width
│  │         (زر أساسي)        │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Spacing:**
- Logo to title: 16pt
- Title to subtitle: 8pt
- Subtitle to cards: 32pt
- Between cards: 8pt
- Card to inputs: 24pt
- Between inputs: 16pt
- Input to button: 32pt
- Button height: 54pt (min 44pt touch)

---

### 2. OTP Screen (رمز التحقق)

```
┌─────────────────────────────────┐
│  →  تأكيد كود التفعيل          │ ← Nav header
│     (٢٠pt Bold)                 │
│                                 │
│                                 │
│  قم بإدخال الكود الذي وصلك     │
│  عبر خدمة الرسائل القصيرة      │ ← Centered
│  (١٧pt Regular)                 │
│                                 │
│  ٠٥٥٥١٢٣٤٥٦                    │ ← Centered
│  (١٧pt Semibold)                │
│                                 │
│      ┌─┐ ┌─┐ ┌─┐ ┌─┐           │ ← Centered
│      │ │ │ │ │ │ │ │           │ 60×60pt each
│      └─┘ └─┘ └─┘ └─┘           │ 16pt gap
│                                 │
│        ٠٢:٣٠ (٤٨pt Bold)        │ ← Timer
│                                 │
│  لم يصلك الكود؟ قم بإعادة      │
│  ارسال الرمز بعد انتهاء الزمن  │ ← Centered
│  (١٥pt Regular)                 │
│                                 │
│     إعادة ارسال الرمز           │ ← Link
│     (١٧pt, Underline)           │
│                                 │
│  ┌───────────────────────────┐  │
│  │          تأكيد            │  │ ← Disabled
│  │       (زر غير مفعل)       │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Spacing:**
- Header height: 44pt (iOS standard)
- Header to content: 24pt
- Subtitle to phone: 16pt
- Phone to OTP inputs: 32pt
- OTP inputs to timer: 24pt
- Timer to help text: 16pt
- Help text to resend: 8pt
- Resend to button: 32pt

---

### 3. Home Screen (الرئيسية)

```
┌─────────────────────────────────┐
│  مرحباً، سارة         [🔔] [💬] │ ← Nav header
│  (٢٨pt Bold)                    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ [عرض ترويجي]              │  │ ← Hero card
│  │ خصم ٣٠٪ على المطاعم       │  │ 160pt height
│  └───────────────────────────┘  │
│                                 │
│  الخدمات                        │ ← Section header
│  (٢٢pt Bold)                    │
│                                 │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │ ← Grid
│  │ 🚗  │ 🍽  │ ☕  │ 🛒  │       │ 80×80pt each
│  │مشوار│مطاعم│مقاهي│سوق │       │
│  └───┘ └───┘ └───┘ └───┘       │
│                                 │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ 💊  │ 🎮  │ 🎁  │ ✈️  │       │
│  │صيدلية│ألعاب│هدايا│حجز │       │
│  └───┘ └───┘ └───┘ └───┘       │
│                                 │
│  العروض النشطة                  │ ← Section header
│  (٢٢pt Bold)                    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ [عرض ١] [عرض ٢] [عرض ٣] → │  │ ← Horizontal scroll
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Tab Bar (Bottom)**
```
┌──────┬──────┬──────┬──────┬──────┐
│ 🏠   │ 🚗   │ 🛍   │ 📋   │ 👤   │
│الرئيسية│مشوار│المتجر│طلباتي│حسابي│
└──────┴──────┴──────┴──────┴──────┘
```

**Spacing:**
- Nav header: 44pt
- Header to hero: 16pt
- Hero card: 160pt height
- Hero to section: 32pt
- Section header to grid: 16pt
- Grid item gap: 16pt
- Section to section: 32pt
- Tab bar: 83pt (including safe area)

---

## 🧩 Component Specifications

### Buttons

#### Primary Button (زر أساسي)
```
┌─────────────────────────────┐
│       نص الزر               │
│    (١٧pt Semibold)          │
│    أبيض (#FFFFFF)           │
└─────────────────────────────┘
```
- Height: 54pt (min 44pt touch)
- Corner radius: 12pt (iOS standard)
- Background: Primary color
- Text: White, centered
- Padding: Horizontal 24pt

#### Secondary Button (زر ثانوي)
```
┌─────────────────────────────┐
│       نص الزر               │
│    (١٧pt Semibold)          │
│    أزرق (#007AFF)           │
└─────────────────────────────┘
```
- Height: 54pt
- Corner radius: 12pt
- Background: Transparent
- Border: 2pt primary color
- Text: Primary color, centered

#### Text Button (زر نصي)
```
      نص الزر
   (١٧pt Semibold)
   أزرق (#007AFF)
```
- Height: 44pt (min touch)
- No background
- No border
- Text: Primary color

---

### Input Fields (حقول الإدخال)

#### Default State
```
عنوان الحقل (١٥pt Semibold)
┌─────────────────────────────┐
│ نص الإدخال ←                │
│ (١٧pt Regular)              │
└─────────────────────────────┘
```
- Height: 54pt (min 44pt touch)
- Corner radius: 10pt
- Border: 1pt gray
- Background: System fill
- Padding: Horizontal 16pt
- Text alignment: Right

#### Focused State
```
عنوان الحقل (١٥pt Semibold)
┌─────────────────────────────┐
│ نص الإدخال ←                │
│ (١٧pt Regular)              │
└─────────────────────────────┘
  ↑ Border: 2pt primary color
```

#### Error State
```
عنوان الحقل (١٥pt Semibold)
┌─────────────────────────────┐
│ نص الإدخال ←                │
│ (١٧pt Regular)              │
└─────────────────────────────┘
  ↑ Border: 2pt error red
رسأ الخطأ (١٣pt Regular, أحمر)
```

---

### Cards (البطاقات)

#### Service Card (بطاقة خدمة)
```
┌─────────────────┐
│                 │
│      [أيقونة]   │ ← 48×48pt
│                 │
│    اسم الخدمة   │ ← 15pt Semibold
│    وصف قصير     │ ← 13pt Regular, 60%
│                 │
└─────────────────┘
```
- Size: 80×80pt
- Corner radius: 16pt
- Background: System card
- Padding: 12pt
- Shadow: iOS standard

#### Offer Card (بطاقة عرض)
```
┌─────────────────────────────┐
│                             │
│  [صورة الخلفية]             │
│                             │
│  ┌─────────────────────┐    │
│  │ عنوان العرض         │    │
│  │ وصف قصير            │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```
- Height: 160pt
- Corner radius: 16pt
- Full width - 32pt
- Gradient overlay
- Padding: 16pt

---

### Navigation (التنقل)

#### Navigation Bar
```
┌─────────────────────────────────┐
│  →  العنوان             [إجراء] │
│     (٢٠pt Bold)                 │
└─────────────────────────────────┘
```
- Height: 44pt
- Background: System background
- Back button: Right side (→)
- Title: Right of back button
- Actions: Left side

#### Tab Bar
```
┌──────┬──────┬──────┬──────┬──────┐
│ 🏠   │ 🚗   │ 🛍   │ 📋   │ 👤   │
│الرئيسية│مشوار│المتجر│طلباتي│حسابي│
│(١١pt)│(١١pt)│(١١pt)│(١١pt)│(١١pt)│
└──────┴──────┴──────┴──────┴──────┘
```
- Height: 83pt (including safe area)
- Icon: 30×30pt
- Label: 11pt
- Spacing: Equal distribution

---

## 👉 Gestures (الإيماءات)

### Swipe Actions (RTL)
```
← Swipe LEFT: Forward action (تحقيق، قبول)
→ Swipe RIGHT: Back action (رجوع، حذف)
```

### Pull to Refresh
- Pull DOWN: Refresh content
- Standard iOS animation

### Edge Swipe
- Swipe from RIGHT edge: Back navigation
- Swipe from LEFT edge: Forward (rare)

---

## 🎯 Accessibility

### Dynamic Type
```javascript
// Support all iOS text sizes
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    // React Native auto-scales with system settings
  },
});
```

### VoiceOver (TalkBack)
- All interactive elements labeled
- Proper reading order (RTL)
- Hints in Arabic

### Contrast Ratios
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

---

## 📊 Implementation Example

### Login Screen Component
```javascript
import { RTL, spacing, typography, colors } from '../utils/rtl';

const LoginScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Hero Section */}
      <View style={{ 
        alignItems: 'center',
        paddingTop: 64,
        paddingBottom: 32,
      }}>
        <Image 
          source={require('../../assets/logo.png')}
          style={{ width: 48, height: 48 }}
        />
        <Text style={[
          typography.title1,
          { color: colors.primary, marginTop: 16 }
        ]}>
          Tatx SA
        </Text>
        <Text style={[
          typography.headline,
          { color: colors.text, marginTop: 8, textAlign: 'center' }
        ]}>
          ابدأ باستخدام التطبيق
        </Text>
        <Text style={[
          typography.body,
          { color: colors.textSecondary, marginTop: 8, textAlign: 'center' }
        ]}>
          سجّل أو أنشئ حسابًا أولًا
        </Text>
      </View>

      {/* Auth Mode Cards */}
      <View style={{ 
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
      }}>
        <TouchableOpacity style={[
          styles.modeCard,
          isSelected && styles.modeCardSelected
        ]}>
          <Text style={typography.headline}>تسجيل الدخول</Text>
          <Text style={[
            typography.callout,
            { color: colors.textSecondary, marginTop: 4 }
          ]}>
            ادخل برقم الجوال إذا كان لديك حساب
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={{ 
        paddingHorizontal: spacing.md,
        marginTop: spacing.lg,
      }}>
        <Text style={[
          typography.subhead,
          { color: colors.text, marginBottom: spacing.sm }
        ]}>
          رقم الجوال
        </Text>
        <TextInput
          style={[
            styles.input,
            typography.body,
            { textAlign: 'right' }
          ]}
          placeholder="٠٥XXXXXXXX"
          keyboardType="phone-pad"
        />
      </View>

      {/* Primary Button */}
      <TouchableOpacity
        style={[
          styles.primaryButton,
          { marginTop: spacing.xl, marginHorizontal: spacing.md }
        ]}
      >
        <Text style={[
          typography.button,
          { color: colors.white, textAlign: 'center' }
        ]}>
          إرسال رمز التحقق
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.separator,
    minHeight: 54,
    paddingHorizontal: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minHeight: 54,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
```

---

## ✅ Checklist

### Layout
- [ ] All text right-aligned
- [ ] Spacing uses 8pt grid
- [ ] Touch targets min 44pt
- [ ] Safe area respected

### Typography
- [ ] Arabic font (Cairo)
- [ ] Proper line heights
- [ ] No letter-spacing on Arabic
- [ ] Dynamic type supported

### Colors
- [ ] Semantic color names
- [ ] Dark mode ready
- [ ] Contrast ratios met
- [ ] System colors used

### Navigation
- [ ] Back button on right (→)
- [ ] Tab bar mirrored
- [ ] Gestures RTL-aware
- [ ] Native iOS patterns

### Components
- [ ] Buttons 54pt height
- [ ] Inputs 54pt height
- [ ] Cards 16pt radius
- [ ] Proper shadows

### Accessibility
- [ ] VoiceOver labels
- [ ] Dynamic type
- [ ] Contrast ratios
- [ ] RTL reading order

---

## 🎯 Summary

This design system provides:
- ✅ True RTL-first design (not mirrored LTR)
- ✅ Apple HIG compliance
- ✅ Arabic typography optimized
- ✅ Native iOS patterns
- ✅ Cultural localization
- ✅ Accessibility built-in

**Result**: An interface that feels native to Arabic users, not just translated.
