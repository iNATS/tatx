# Standard Header - Tatx SA App

## Overview
The Tatx SA app now uses a **single, standard header component** across all screens, following Apple HIG RTL guidelines for iOS 26+ with flat design (no shadows).

---

## ✅ Standard Header Components

### 1. PageHeader (For In-Screen Use)

**File:** `src/components/PageHeader.js`

**Usage:** Use this header inside screens that are part of the main tab navigation or don't have navigation headers.

```javascript
import PageHeader from '../components/PageHeader';

function MyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="عنوان الشاشة"
        subtitle="وصف اختياري"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      {/* Screen content */}
    </View>
  );
}
```

**Features:**
- ✅ Back button on RIGHT (→) for RTL
- ✅ Title **centered** in the header
- ✅ Actions on LEFT
- ✅ No shadows (iOS 26+ flat design)
- ✅ 44pt minimum touch targets
- ✅ Optional search bar
- ✅ Optional filter chips
- ✅ Safe area aware
- ✅ Large title option (34pt) or standard (20pt)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navigation` | object | required | Navigation object |
| `title` | string | required | Header title |
| `subtitle` | string | optional | Header subtitle |
| `showBack` | boolean | `true` | Show/hide back button |
| `onBackPress` | function | optional | Custom back action |
| `actionIcon` | string | optional | Left action icon (Ionicons name) |
| `onActionPress` | function | optional | Left action handler |
| `onSearchChange` | function | optional | Search input handler |
| `searchValue` | string | optional | Search input value |
| `filters` | array | `[]` | Filter chips |
| `selectedFilter` | string | optional | Selected filter ID |
| `onSelectFilter` | function | optional | Filter select handler |
| `largeTitle` | boolean | `false` | Use large title (34pt) |

---

### 2. StandardHeader (For Navigation Options)

**File:** `src/components/StandardHeader.js`

**Usage:** Use this header in navigation screen options.

```javascript
import StandardHeader from '../components/StandardHeader';

<Stack.Screen 
  name="MyScreen" 
  options={({ navigation }) => ({
    header: () => (
      <StandardHeader
        navigation={navigation}
        title="عنوان الشاشة"
        subtitle="وصف اختياري"
      />
    )
  })}
/>
```

**Features:**
- Same as PageHeader
- Designed for navigation header integration
- Simpler API (no search/filters)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navigation` | object | required | Navigation object |
| `title` | string | required | Header title |
| `subtitle` | string | optional | Header subtitle |
| `showBack` | boolean | `true` | Show/hide back button |
| `onBackPress` | function | optional | Custom back action |
| `actionIcon` | string | optional | Left action icon |
| `onActionPress` | function | optional | Left action handler |
| `rightIcon` | string | optional | Right icon (alternative to back) |
| `onRightPress` | function | optional | Right icon handler |

---

## 📐 Design Specifications

### Layout
```
┌─────────────────────────────────┐
│ [Action]    Title    [Back →]  │ ← 44pt height
│           Subtitle              │
│                                 │
│ [Search Bar]                    │ ← Optional
│                                 │
│ [Filter] [Filter] [Filter]     │ ← Optional
└─────────────────────────────────┘
```

### Dimensions
- **Header Height:** 44pt minimum (Apple HIG)
- **Touch Targets:** 44×44pt
- **Button Size:** 44×44pt (22pt radius)
- **Safe Area:** Top + 8pt padding
- **Horizontal Padding:** 16pt (lg)

### Typography
- **Title:** 20pt Bold (Cairo)
- **Large Title:** 34pt Bold (Cairo)
- **Subtitle:** 13pt Regular (Cairo)
- **All text:** `writingDirection: 'rtl'`

### Colors
- **Background:** `colors.background` (#F2F2F7)
- **Buttons:** `colors.card` (#FFFFFF)
- **Border:** `colors.borderLight` (#E5E5EA)
- **Icons:** `colors.primary` (#DA3C57) or `colors.text`
- **Title:** `colors.text` (#000000)
- **Subtitle:** `colors.textSecondary` (#3C3C4399)

### Borders
- **Button Border:** 1pt, `colors.borderLight`
- **Button Radius:** 22pt (circular)
- **No Shadows:** iOS 26+ flat design

---

## 🎯 Usage Examples

### Basic Header (No Back Button)
```javascript
<PageHeader
  navigation={navigation}
  title="حسابي"
  subtitle="بياناتك وإدارة خدماتك"
  showBack={false}
/>
```

### Header with Back Button
```javascript
<PageHeader
  navigation={navigation}
  title="تفاصيل الطلب"
  showBack={true}
/>
```

### Header with Action Icon
```javascript
<PageHeader
  navigation={navigation}
  title="الإشعارات"
  actionIcon="trash-outline"
  onActionPress={handleDelete}
/>
```

### Header with Search
```javascript
<PageHeader
  navigation={navigation}
  title="المنتجات"
  searchValue={search}
  onSearchChange={setSearch}
  onSearchPress={handleSearch}
/>
```

### Header with Filters
```javascript
<PageHeader
  navigation={navigation}
  title="التصنيفات"
  filters={[
    { id: 'all', label: 'الكل', icon: 'apps' },
    { id: 'food', label: 'طعام', icon: 'restaurant' },
  ]}
  selectedFilter={selectedFilter}
  onSelectFilter={setSelectedFilter}
/>
```

### Large Title Header
```javascript
<PageHeader
  navigation={navigation}
  title="الرئيسية"
  largeTitle={true}
/>
```

---

## 📱 Screens Using Standard Header

### Main Tabs (No Header - Use PageHeader Inside)
- HomeScreen (الرئيسية)
- TaxiScreen (مشوار)
- Shop/ProductScreen (المتجر)
- OrdersScreen (طلباتي)
- AccountScreen (حسابي)

### Stack Screens (Use StandardHeader in Options)
- CartScreen
- CheckoutScreen
- OrderDetailScreen
- WalletScreen
- ChatScreen
- NotificationsScreen
- ServicesScreen
- LocationScreen
- PaymentScreen
- WholesaleScreen
- CategoryScreen
- VendorAppScreen
- All booking screens

---

## 🔧 Migration Guide

### Before (Inconsistent Headers)
```javascript
// Some screens had custom headers
<View style={styles.customHeader}>
  <Text>{title}</Text>
  <TouchableOpacity onPress={goBack}>
    <Icon name="arrow-back" />
  </TouchableOpacity>
</View>
```

### After (Standard Header)
```javascript
// All screens use PageHeader
<PageHeader
  navigation={navigation}
  title={title}
  showBack={true}
/>
```

---

## ✅ Checklist for New Screens

When creating a new screen:

- [ ] Import `PageHeader` component
- [ ] Add header at top of screen
- [ ] Set `title` prop
- [ ] Set `showBack={false}` for main screens
- [ ] Add `subtitle` if needed
- [ ] Add `actionIcon` for actions (optional)
- [ ] Add `search` props if search needed
- [ ] Add `filters` if filtering needed
- [ ] Test RTL layout
- [ ] Test touch targets (44×44pt)

---

## 🎨 Best Practices

### DO ✅
- Use `PageHeader` consistently across all screens
- Keep titles short (1 line)
- Use `subtitle` for context
- Use `actionIcon` for primary actions
- Use `largeTitle` only on main screens
- Test with safe area (notch devices)

### DON'T ❌
- Create custom headers
- Use shadows
- Make titles too long
- Put too many actions in header
- Forget RTL layout
- Use small touch targets (< 44pt)

---

## 📚 Related Documentation

- [NO_SHADOW_APPLE_HIG_IOS26.md](NO_SHADOW_APPLE_HIG_IOS26.md) - No shadow design
- [APPLE_HIG_RTL_FIXES.md](APPLE_HIG_RTL_FIXES.md) - RTL implementation
- [HOME_SCREEN_CARDS_REDESIGN.md](HOME_SCREEN_CARDS_REDESIGN.md) - Card designs

---

## 🧪 Testing

### Visual Testing
- [ ] Back button on RIGHT (→)
- [ ] Title centered
- [ ] Actions on LEFT
- [ ] No shadows visible
- [ ] Borders on buttons (1pt)
- [ ] Proper spacing (44pt height)
- [ ] Safe area respected

### Functional Testing
- [ ] Back button works
- [ ] Action buttons work
- [ ] Search works (if present)
- [ ] Filters work (if present)
- [ ] Touch targets responsive
- [ ] No layout overflow

---

## Summary

The Tatx SA app now has a **single, standard header** used consistently across all screens:

✅ **PageHeader** - For in-screen use (main tabs)
✅ **StandardHeader** - For navigation options
✅ **RTL Compliant** - Back on right (→)
✅ **No Shadows** - iOS 26+ flat design
✅ **44pt Touch Targets** - Apple HIG compliant
✅ **Centered Titles** - Clean, modern look
✅ **Optional Features** - Search, filters, actions

**All screens now use the same standard header!**
