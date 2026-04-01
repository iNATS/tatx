# Standard RTL Card Components - Tatx SA

## Overview

Complete set of standardized card components following **Apple HIG for RTL languages** with **no shadows** (iOS 26+ flat design).

---

## 📦 Available Card Components

### 1. RTLCard (Base Container)

**Usage:**
```javascript
import { RTLCard } from '../components/RTL';

<RTLCard variant="default" padding="md">
  <Text>Card content</Text>
</RTLCard>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'default'` | `default`, `elevated`, `filled`, `outline` |
| `padding` | string | `'md'` | `none`, `sm`, `md`, `lg` |
| `onPress` | function | - | Makes card tappable |
| `style` | object | - | Additional styles |

**Variants:**
- `default` - White background with light border
- `elevated` - White background with darker border
- `filled` - Secondary background, no border
- `outline` - Transparent background with border

---

### 2. RTLServiceCard

**Usage:**
```javascript
import { RTLServiceCard } from '../components/RTL';

<RTLServiceCard
  icon={<Ionicons name="restaurant" size={20} color={colors.primary} />}
  iconColor={colors.primary}
  title="مطاعم"
  subtitle="اطعم من أفضل المطاعم"
  onPress={() => navigation.navigate('Category')}
  size="default"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | React Node | - | Icon component |
| `iconColor` | string | `colors.primary` | Icon color for background tint |
| `title` | string | required | Card title |
| `subtitle` | string | - | Card subtitle |
| `onPress` | function | - | Tap handler |
| `size` | string | `'default'` | `small`, `default`, `large` |

**Sizes:**
- `small` - 80×80pt, 16pt icon
- `default` - 96×96pt, 20pt icon
- `large` - 120×120pt, 24pt icon

---

### 3. RTLProductCard

**Usage:**
```javascript
import { RTLProductCard } from '../components/RTL';

<RTLProductCard
  image={{ uri: 'https://example.com/product.jpg' }}
  title="منتج مميز"
  subtitle="وصف قصير"
  price={99}
  currency="ر.س"
  onPress={() => navigation.navigate('Product')}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | object | required | Image source |
| `title` | string | required | Product title |
| `subtitle` | string | - | Product subtitle |
| `price` | number/string | - | Price value |
| `currency` | string | `'ر.س'` | Currency symbol |
| `onPress` | function | - | Tap handler |

**Dimensions:**
- Width: 176pt
- Image: 120pt height
- Border radius: 24pt

---

### 4. RLTRestaurantCard

**Usage:**
```javascript
import { RLTRestaurantCard } from '../components/RTL';

<RLTRestaurantCard
  image={{ uri: 'https://example.com/restaurant.jpg' }}
  name="مطعم المذاق الأصيل"
  category="مأكولات سعودية"
  deliveryTime={25}
  tags={['عائلي', 'واي فاي']}
  isHot={true}
  onPress={() => navigation.navigate('Restaurant')}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | object | required | Restaurant image |
| `name` | string | required | Restaurant name |
| `category` | string | required | Cuisine type |
| `deliveryTime` | number | - | Delivery time in minutes |
| `tags` | array | `[]` | Feature tags (max 2 shown) |
| `isHot` | boolean | `false` | Show "Hot" badge |
| `onPress` | function | - | Tap handler |

**Layout:**
- Image on RIGHT (88×88pt)
- Content flows RIGHT to LEFT
- Hot badge, delivery time, tags included

---

### 5. RTLOfferCard

**Usage:**
```javascript
import { RTLOfferCard } from '../components/RTL';

<RTLOfferCard
  image={{ uri: 'https://example.com/offer.jpg' }}
  vendor="مطاعم شاورما"
  title="خصم 30% على جميع الطلبات"
  subtitle="لفترة محدودة"
  onPress={() => navigation.navigate('Offer')}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | object | required | Offer image (full bleed) |
| `vendor` | string | required | Vendor name |
| `title` | string | required | Offer title |
| `subtitle` | string | - | Offer subtitle |
| `onPress` | function | - | Tap handler |

**Dimensions:**
- Width: 280pt
- Height: 200pt
- Gradient overlay for text readability

---

### 6. RTLMenuItemCard

**Usage:**
```javascript
import { RTLMenuItemCard } from '../components/RTL';

<RTLMenuItemCard
  icon={<Ionicons name="fast-food" size={24} color={colors.primary} />}
  title="برجر دجاج"
  subtitle="مع بطاطس ومشروب"
  price={25}
  currency="ر.س"
  onPress={() => addToCart(item)}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | React Node | - | Menu item icon |
| `title` | string | required | Item name |
| `subtitle` | string | - | Item description |
| `price` | number/string | - | Item price |
| `currency` | string | `'ر.س'` | Currency symbol |
| `onPress` | function | - | Tap handler |

**Layout:**
- Icon on RIGHT (56×56pt)
- Content in MIDDLE
- Price on LEFT

---

### 7. RTLStatCard

**Usage:**
```javascript
import { RTLStatCard } from '../components/RTL';

<RTLStatCard
  value="12"
  label="طلبات مكتملة"
  icon={<Ionicons name="checkmark-circle" size={24} color={colors.success} />}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string/number | required | Stat value |
| `label` | string | required | Stat label |
| `icon` | React Node | - | Optional icon |
| `onPress` | function | - | Tap handler |

**Layout:**
- Icon (optional) on top
- Value in center
- Label below
- Used in stats/overview sections

---

### 8. RTLFilterChip

**Usage:**
```javascript
import { RTLFilterChip } from '../components/RTL';

<RTLFilterChip
  label="الكل"
  icon={<Ionicons name="apps" size={16} color={colors.textSecondary} />}
  isActive={activeFilter === 'all'}
  onPress={() => setActiveFilter('all')}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | required | Filter label |
| `icon` | React Node | - | Optional icon |
| `isActive` | boolean | `false` | Active state |
| `onPress` | function | - | Tap handler |

**States:**
- Inactive: White background, gray text
- Active: Primary background, white text

---

### 9. RTLProfileCard

**Usage:**
```javascript
import { RTLProfileCard } from '../components/RTL';

<RTLProfileCard
  avatar={require('../../assets/avatar.png')}
  name="أحمد محمد"
  subtitle="+966 55 500 0000"
  action={<Ionicons name="settings-outline" size={20} color={colors.primary} />}
  onActionPress={() => navigation.navigate('Settings')}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatar` | object | required | Profile image |
| `name` | string | required | User name |
| `subtitle` | string | - | User subtitle (phone, email) |
| `action` | React Node | - | Action icon (optional) |
| `onActionPress` | function | - | Action handler |
| `onPress` | function | - | Card tap handler |

**Layout:**
- Avatar on RIGHT (56×56pt)
- Info in MIDDLE
- Action on LEFT (optional)

---

### 10. RTLEmptyCard

**Usage:**
```javascript
import { RTLEmptyCard } from '../components/RTL';

<RTLEmptyCard
  icon={<Ionicons name="inbox-outline" size={40} color={colors.textSecondary} />}
  title="لا توجد طلبات"
  subtitle="ابدأ بالتسوق الآن"
  action="تصفح المنتجات"
  onActionPress={() => navigation.navigate('Shop')}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | React Node | required | Empty state icon |
| `title` | string | required | Main message |
| `subtitle` | string | - | Secondary message |
| `action` | string | - | Action button text |
| `onActionPress` | function | - | Action handler |

**Use Cases:**
- Empty order history
- No search results
- No notifications
- Empty cart

---

## 🎨 Design Specifications

### Borders (No Shadows)
- **All cards:** 1pt border
- **Default:** `colors.borderLight` (#E5E5EA)
- **Elevated:** `colors.border` (#C6C6C8)
- **Active/Filled:** No border or primary color

### Border Radius
- **Large cards:** 24pt (xl)
- **Medium cards:** 20pt (lg)
- **Small cards:** 16pt (md)
- **Pills/Chips:** 9999pt (full)

### Spacing
- **Card padding:** 16pt (md) default
- **Content gap:** 8-16pt
- **Section margin:** 16pt

### Typography
- **Titles:** 20pt SemiBold
- **Headlines:** 17pt SemiBold
- **Body:** 17pt Regular
- **Subtitles:** 15pt Regular
- **Captions:** 12pt Regular
- **All RTL:** `writingDirection: 'rtl'`

### Touch Targets
- **Minimum:** 44×44pt
- **Recommended:** 48×48pt
- **Hit slop:** 8pt on all sides

---

## 📋 Usage Guidelines

### DO ✅
```javascript
// Use standard card components
<RTLServiceCard title="مطاعم" icon={icon} />

// Use consistent spacing
<RTLCard padding="md">

// Use proper RTL text
<Text style={{ writingDirection: 'rtl', textAlign: 'right' }}>

// Use border-based design
borderWidth: 1,
borderColor: colors.borderLight,
```

### DON'T ❌
```javascript
// Don't use shadows
...shadows.sm  // ❌

// Don't use row-reverse for RTL
flexDirection: 'row-reverse'  // ❌ (use natural row)

// Don't left-align Arabic text
textAlign: 'left'  // ❌ (for Arabic)

// Don't use inconsistent radius
borderRadius: 23  // ❌ (use standard: 16, 20, 24)
```

---

## 📦 Import All Components

```javascript
import {
  // Base
  RTLCard,
  RTLCardHeader,
  
  // Specialized
  RTLServiceCard,
  RTLProductCard,
  RLTRestaurantCard,
  RTLOfferCard,
  RTLMenuItemCard,
  
  // Utility
  RTLStatCard,
  RTLFilterChip,
  RTLProfileCard,
  RTLEmptyCard,
} from '../components/RTL';
```

---

## 🔄 Migration Example

### Before (Inconsistent)
```javascript
<View style={{
  backgroundColor: colors.card,
  borderRadius: 24,
  ...shadows.sm,  // ❌ Shadow
}}>
  <Text style={{ textAlign: 'right' }}>مطاعم</Text>
</View>
```

### After (Standard)
```javascript
<RTLServiceCard
  icon={<Ionicons name="restaurant" size={20} color={colors.primary} />}
  title="مطاعم"
  subtitle="اطعم من أفضل المطاعم"
  onPress={() => navigation.navigate('Category')}
/>
```

---

## 📊 Component Matrix

| Component | Use Case | Size | Interactive |
|-----------|----------|------|-------------|
| `RTLCard` | Generic container | Custom | Optional |
| `RTLServiceCard` | Service categories | 96×96pt | Yes |
| `RTLProductCard` | Product listing | 176×auto | Yes |
| `RLTRestaurantCard` | Restaurant listing | Auto | Yes |
| `RTLOfferCard` | Promotional offers | 280×200pt | Yes |
| `RTLMenuItemCard` | Menu items | Auto | Yes |
| `RTLStatCard` | Statistics display | Auto | Optional |
| `RTLFilterChip` | Filter selection | Auto | Yes |
| `RTLProfileCard` | User profile | Auto | Optional |
| `RTLEmptyCard` | Empty states | Auto | Optional |

---

## 🎯 Summary

All card components follow:
- ✅ **Apple HIG RTL guidelines**
- ✅ **No shadows** (iOS 26+ flat design)
- ✅ **Border-based** visual separation
- ✅ **Consistent** spacing and typography
- ✅ **Proper RTL** text alignment
- ✅ **Standard** touch targets (44×44pt minimum)

**Result:** A unified, modern card system that works beautifully for Arabic RTL interfaces!
