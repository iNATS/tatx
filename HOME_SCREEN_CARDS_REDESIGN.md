# Home Screen Card Redesign - Apple HIG RTL Compliance

## Overview
Complete redesign of all Home screen cards following Apple Human Interface Guidelines for RTL (Right-to-Left) layouts.

---

## ✅ Cards Redesigned

### 1. Service Chip Cards

**Before:** Basic icon chips with minimal styling
**After:** Apple HIG-compliant service chips

**Changes:**
- ✅ Size: 96×96pt (proper touch target)
- ✅ Icon: 48×48pt in 16pt radius container
- ✅ Card radius: 20pt
- ✅ Centered text with `writingDirection: 'rtl'`
- ✅ Proper shadow (sm)
- ✅ Color-coded icon backgrounds

**Apple HIG Compliance:**
- Minimum 44×44pt touch target ✓
- 8pt grid spacing ✓
- Arabic text right-aligned ✓
- No letter-spacing ✓

---

### 2. Restaurant Cards

**Before:** Basic horizontal cards
**After:** Enhanced RTL restaurant cards with proper layout

**Changes:**
- ✅ Image on RIGHT (88×88pt, 20pt radius)
- ✅ Content flows right-to-left
- ✅ Added gap between elements (spacing.md)
- ✅ Hot badge with shadow
- ✅ Delivery pill with icon
- ✅ Featured card with border
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌─────────────────────────────────┐
│ [Image]  Name           [Hot]   │
│  88×88    Category              │
│           [🕐 25min] [Tags]     │
└─────────────────────────────────┘
```

**Apple HIG Compliance:**
- Image on right (RTL start) ✓
- Content flows right-to-left ✓
- Proper touch targets ✓
- Shadow depth appropriate ✓

---

### 3. Wholesale/Mini Rail Cards

**Before:** Icon cards with right-aligned text
**After:** Centered icon cards with proper spacing

**Changes:**
- ✅ Width: 160pt
- ✅ Icon: 56×56pt in 20pt radius container
- ✅ Card radius: 24pt
- ✅ Centered text (title and subtitle)
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌────────┐
│ [Icon] │
│ 56×56  │
│ Name   │
│ Sub    │
└────────┘
```

**Apple HIG Compliance:**
- Centered layout ✓
- Proper icon size ✓
- Arabic text centered ✓

---

### 4. Market Product Cards

**Before:** Product cards with right-aligned info
**After:** Enhanced product cards with centered title

**Changes:**
- ✅ Width: 176pt
- ✅ Image: 120pt height
- ✅ Card radius: 24pt
- ✅ Centered product title
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌──────────┐
│ [Image]  │
│  120pt   │
│  Name    │
│ [Price]  │
└──────────┘
```

**Apple HIG Compliance:**
- Centered content ✓
- Proper image ratio ✓
- Arabic text centered ✓

---

### 5. Market Luxury Cards

**Before:** Large cards with right-aligned info
**After:** Refined luxury cards with proper hierarchy

**Changes:**
- ✅ Width: 220pt
- ✅ Image: 154pt height
- ✅ Card radius: 28pt
- ✅ Info aligned to right (RTL start)
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌────────────┐
│  [Image]   │
│   154pt    │
│ Category   │
│ Name       │
│ [Price]    │
└────────────┘
```

**Apple HIG Compliance:**
- Right alignment (RTL) ✓
- Proper hierarchy ✓
- Shadow depth ✓

---

### 6. Taxi Promo Card

**Before:** Basic promo card
**After:** Enhanced overlay card with badge

**Changes:**
- ✅ Image height: 180pt
- ✅ Content card overlaps image (-32pt margin)
- ✅ Badge: 56×56pt
- ✅ Card radius: 24pt
- ✅ Stronger shadow (lg)
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌─────────────────────┐
│    [Image 180pt]    │
│  ┌─────────────┐    │
│  │[Badge] Text │    │
│  │     Title   │    │
│  │   Subtitle  │    │
│  └─────────────┘    │
└─────────────────────┘
```

**Apple HIG Compliance:**
- Overlapping elements ✓
- Visual hierarchy ✓
- Arabic text right-aligned ✓

---

### 7. Pharmacy/Specialty Cards

**Before:** Category cards with badge
**After:** Refined specialty cards with larger badge

**Changes:**
- ✅ Width: 200pt
- ✅ Image: 140pt height
- ✅ Card radius: 28pt
- ✅ Badge: 40×40pt (increased from 34pt)
- ✅ Info aligned to right
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌──────────┐
│ [Image]  │
│  140pt   │
│ [Badge]  │
│  Name    │
│ Subtitle │
└──────────┘
```

**Apple HIG Compliance:**
- Right alignment (RTL) ✓
- Badge prominence ✓
- Proper spacing ✓

---

### 8. Offer Cards

**Before:** Standard offer cards
**After:** Enhanced full-bleed offer cards

**Changes:**
- ✅ Width: 280pt, Height: 200pt
- ✅ Full-bleed image
- ✅ Card radius: 28pt
- ✅ Gradient overlay improved
- ✅ Better text contrast
- ✅ All text has `writingDirection: 'rtl'`

**Layout:**
```
┌────────────────────┐
│  [Full Image]      │
│  [Gradient]        │
│  Vendor            │
│  Title             │
│  Subtitle          │
└────────────────────┘
```

**Apple HIG Compliance:**
- Full-bleed image ✓
- Text contrast ✓
- Gradient overlay ✓

---

## 📐 Common Design Patterns

### Card Radius
- Small cards: 20-24pt
- Large cards: 28pt
- Pills: 9999pt (full)

### Shadows
- Light depth: `shadows.sm` (service chips)
- Medium depth: `shadows.md` (most cards)
- Strong depth: `shadows.lg` (overlay cards)

### Spacing (8pt Grid)
- Card padding: 16pt (md)
- Between elements: 8-16pt
- Section margins: 24-32pt

### Typography
- Titles: 16-22pt Bold
- Subtitles: 11-13pt Regular
- All Arabic: `writingDirection: 'rtl'`
- No letter-spacing

### Touch Targets
- Minimum: 44×44pt
- Service chips: 96×96pt
- Icons: 48-56pt

---

## 🎨 Visual Hierarchy

### Elevation Levels
1. **Service Chips** - Lowest (sm shadow)
2. **Restaurant/Market Cards** - Medium (md shadow)
3. **Taxi Promo** - Highest (lg shadow, overlay)

### Content Flow
- **RTL Layout:** Content starts from right
- **Images:** Positioned on right (RTL start)
- **Text:** Right-aligned or centered
- **Actions:** Left side (RTL end)

---

## 🧪 Testing Checklist

### Visual Testing
- [ ] All cards have proper RTL layout
- [ ] Text flows right-to-left
- [ ] Images on right side
- [ ] Touch targets minimum 44×44pt
- [ ] Shadows appropriate for depth
- [ ] Typography hierarchy clear

### Functional Testing
- [ ] Cards tappable
- [ ] Horizontal scrolls work
- [ ] Navigation on press
- [ ] No layout overflow
- [ ] Proper spacing on all screen sizes

---

## 📊 Summary

All Home screen cards now follow **Apple HIG RTL guidelines**:

✅ **Layout:** Right-to-left flow
✅ **Images:** Positioned on right (RTL start)
✅ **Text:** Right-aligned or centered with `writingDirection: 'rtl'`
✅ **Touch Targets:** Minimum 44×44pt
✅ **Spacing:** 8pt grid system
✅ **Shadows:** Appropriate depth for hierarchy
✅ **Typography:** Cairo font, proper sizes, no letter-spacing
✅ **Radius:** 20-28pt for cards, 9999pt for pills

**Result:** A beautiful, native-feeling RTL interface that follows Apple's design guidelines!
