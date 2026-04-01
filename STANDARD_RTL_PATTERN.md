# Standard RTL Pattern - Tatx SA App

## Based on Correct Offer Card Implementation

The **offer cards** on the Home screen have the **correct RTL implementation**. This document defines the standard pattern to be used throughout the entire app.

---

## ✅ Correct RTL Pattern (From Offer Cards)

### Key Characteristics

1. **Text Alignment**: RIGHT
2. **Writing Direction**: `'rtl'`
3. **Layout Direction**: Natural row (LEFT to RIGHT)
4. **Content Flow**: RIGHT to LEFT
5. **No Shadows**: iOS 26+ flat design with borders

### Example from Offer Cards

```javascript
// ✅ CORRECT - Offer Card Pattern
<RTLCard>
  <Image source={...} />
  <View style={styles.offerGradient}>
    <Text style={{
      textAlign: 'right',           // ← RIGHT aligned
      writingDirection: 'rtl',      // ← RTL direction
    }}>
      نص العرض
    </Text>
  </View>
</RTLCard>
```

---

## 📐 Standard RTL Components

### 1. RTLText Component

**File:** `src/components/RTL/RTLText.js`

```javascript
import { RTLText } from '../components/RTL';

// Usage
<RTLText size="title3" align="right">
  العنوان
</RTLText>
```

**Props:**
- `size`: `largeTitle` | `title1` | `title2` | `title3` | `headline` | `body` | `callout` | `subhead` | `footnote` | `caption`
- `align`: `right` (default) | `left` | `center`
- `color`: Any color value
- `style`: Additional styles

**Always uses `writingDirection: 'rtl'`**

---

### 2. RTLContainer Component

```javascript
import { RTLContainer } from '../components/RTL';

<RTLContainer padding="lg">
  {/* Content flows RIGHT to LEFT */}
</RTLContainer>
```

---

### 3. RTLCard Component

```javascript
import { RTLCard } from '../components/RTL';

// Static card
<RTLCard width={280} height={200}>
  <Image source={...} />
  <RTLText>المحتوى</RTLText>
</RTLCard>

// Pressable card
<RTLCard onPress={() => navigation.navigate('Details')}>
  <RTLText>اضغط هنا</RTLText>
</RTLCard>
```

---

### 4. RTLSectionHeader Component

```javascript
import { RTLSectionHeader } from '../components/RTL';

<RTLSectionHeader 
  title="المطاعم"
  linkText="عرض الكل"
  onLinkPress={() => navigation.navigate('Category')}
/>
```

**Layout:**
```
┌─────────────────────────────────┐
│ المطاعم            عرض الكل     │
│ (RIGHT)           (LEFT)        │
└─────────────────────────────────┘
```

---

### 5. RTLHorizontalScroll Component

```javascript
import { RTLHorizontalScroll } from '../components/RTL';

<RTLHorizontalScroll>
  <Card1 />
  <Card2 />
  <Card3 />
</RTLHorizontalScroll>
```

---

## 🎯 RTL Layout Rules

### Rule 1: Use Natural Row Direction

```javascript
// ✅ CORRECT
<View style={{ flexDirection: 'row' }}>
  <RightElement />  {/* Visually on RIGHT */}
  <CenterElement />
  <LeftElement />   {/* Visually on LEFT */}
</View>

// ❌ WRONG - Don't use row-reverse!
<View style={{ flexDirection: 'row-reverse' }}>
  <Element />
</View>
```

### Rule 2: All Arabic Text Uses RTL

```javascript
// ✅ CORRECT
<RTLText align="right">نص عربي</RTLText>

// ❌ WRONG
<Text textAlign="left">نص عربي</Text>
```

### Rule 3: Section Headers

**Pattern:**
```javascript
<View style={styles.sectionHeader}>
  <RTLText size="title3" align="right">العنوان</RTLText>
  <RTLText size="caption" align="left" color={colors.primary}>
    رابط
  </RTLText>
</View>
```

**Styles:**
```javascript
sectionHeader: {
  flexDirection: 'row', // Natural LEFT to RIGHT
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: spacing.xl,
  marginBottom: spacing.md,
}
```

### Rule 4: Card Content

**Pattern (from offer cards):**
```javascript
<RTLCard>
  <Image source={...} />
  <View style={styles.cardContent}>
    <RTLText size="subhead">البائع</RTLText>
    <RTLText size="title2">العنوان</RTLText>
    <RTLText size="callout">الوصف</RTLText>
  </View>
</RTLCard>
```

**Styles:**
```javascript
cardContent: {
  padding: spacing.lg,
  alignItems: 'flex-end', // RIGHT aligned
}
```

---

## 📱 Screen Patterns

### Home Screen Pattern

```javascript
import { 
  RTLContainer, 
  RTLSectionHeader, 
  RTLHorizontalScroll,
  RTLCard,
  RTLText,
} from '../components/RTL';

function HomeScreen({ navigation }) {
  return (
    <RTLContainer padding="lg">
      {/* Hero Offer */}
      <RTLCard onPress={handleOfferPress}>
        <Image source={...} />
        <View style={styles.offerGradient}>
          <RTLText size="subhead" color="white">البائع</RTLText>
          <RTLText size="title2" color="white">العنوان</RTLText>
        </View>
      </RTLCard>

      {/* Section */}
      <RTLSectionHeader 
        title="القسم"
        linkText="عرض الكل"
        onLinkPress={handleLinkPress}
      />

      {/* Horizontal Scroll */}
      <RTLHorizontalScroll>
        {items.map(item => (
          <RTLCard key={item.id}>
            <RTLText>{item.name}</RTLText>
          </RTLCard>
        ))}
      </RTLHorizontalScroll>
    </RTLContainer>
  );
}
```

---

## 🔧 Migration Guide

### Before (Incorrect RTL)

```javascript
// ❌ WRONG - Using row-reverse
<View style={{ flexDirection: 'row-reverse' }}>
  <Text style={{ textAlign: 'right' }}>نص</Text>
</View>

// ❌ WRONG - Inconsistent text alignment
<Text>عنوان</Text> // No writingDirection
```

### After (Correct RTL - Offer Card Pattern)

```javascript
// ✅ CORRECT - Natural row direction
<View style={{ flexDirection: 'row' }}>
  <RTLText align="right">نص</RTLText>
</View>

// ✅ CORRECT - Consistent RTL
<RTLText align="right">عنوان</RTLText>
```

---

## ✅ Checklist for All Screens

### Layout
- [ ] Uses `flexDirection: 'row'` (not row-reverse)
- [ ] Content flows RIGHT to LEFT
- [ ] Section headers use standard pattern
- [ ] Cards based on offer card pattern

### Text
- [ ] All Arabic text uses `RTLText` component
- [ ] `writingDirection: 'rtl'` on all Arabic text
- [ ] Text aligned RIGHT (except links)
- [ ] No letter-spacing on Arabic text

### Cards
- [ ] No shadows (borders only)
- [ ] Content aligned RIGHT
- [ ] Proper touch targets (44×44pt min)
- [ ] Consistent border radius (24-28pt)

### Spacing
- [ ] Uses 8pt grid system
- [ ] Section margins: 32pt top, 16pt bottom
- [ ] Card gaps: 16pt
- [ ] Horizontal padding: 16pt

---

## 📊 Summary

**Standard RTL Pattern based on offer cards:**

| Aspect | Value |
|--------|-------|
| **Text Alignment** | RIGHT |
| **Writing Direction** | `'rtl'` |
| **Layout Direction** | Natural row (LEFT to RIGHT) |
| **Section Headers** | Title RIGHT, Link LEFT |
| **Cards** | Content RIGHT aligned |
| **Shadows** | None (borders only) |
| **Touch Targets** | 44×44pt minimum |

**Files Updated:**
- `src/components/RTL/RTLComponents.js` - Standard RTL components
- `src/components/RTL/index.js` - Export file
- `src/screens/HomeScreen.js` - Updated with RTLText

**Next Steps:**
1. Update all screens to use RTL components
2. Remove all `row-reverse` usage
3. Replace all `<Text>` with `<RTLText>`
4. Verify all cards match offer card pattern

---

## 📚 References

- [Offer Cards (Correct Pattern)](src/screens/HomeScreen.js#offerCard)
- [RTL Components](src/components/RTL/)
- [Apple HIG RTL](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
