# Tatx SA - مشروع تطبيق متعدد الخدمات

## نظرة عامة على المشروع

**Tatx SA** هو تطبيق "Super App" متعدد الخدمات مبني باستخدام **React Native/Expo** مع دعم كامل للغة العربية (RTL). يوفر التطبيق منصة موحدة لخدمات متعددة تشمل الطعام، التاكسي، التسوق، الصيدلية، حجز الإقامة، والحجوزات الطبية.

### الإصدار الحالي: 1.1.0

---

## البنية التقنية

### التقنيات الأساسية

| المكون | التقنية |
|--------|---------|
| **Framework** | Expo SDK 54.0.9 / React Native 0.81.5 |
| **React** | 19.1.0 |
| **Navigation** | React Navigation 7.x |
| **Backend/DB** | Supabase |
| **State Management** | React Context API |
| **الخطوط** | Cairo (Arabic) |
| **الاتجاه** | RTL (Right-to-Left) |
| **Web Server** | Node.js Custom HTTP Server |
| **Build System** | EAS Build |
| **Package Manager** | npm@10.9.2 |

### المكتبات الرئيسية

- `@react-navigation/native` - التنقل بين الشاشات
- `@react-navigation/bottom-tabs` - شريط التنقل السفلي
- `@react-navigation/native-stack` - التنقل الهرمي
- `@supabase/supabase-js` - التكامل مع قاعدة البيانات
- `expo-location` - خدمات الموقع
- `expo-font` - تحميل الخطوط المخصصة
- `expo-linear-gradient` - التدرجات اللونية
- `react-native-safe-area-context` - إدارة مناطق الأمان

---

## هيكل المشروع

```
tatx-app/
├── src/                          # الكود المصدري الرئيسي
│   ├── screens/                  # 30 شاشة للتطبيق
│   ├── navigation/               # نظام التنقل (AppNavigator.js)
│   ├── context/                  # إدارة الحالة (AppContext.js)
│   ├── services/                 # خدمات Supabase والمصادقة
│   ├── lib/                      # مكتبات مساعدة (supabase.js)
│   ├── constants/                # الثيم والألوان (theme.js)
│   ├── data/                     # البيانات الثابتة
│   ├── components/               # مكونات UI المشتركة
│   ├── utils/                    # دوال مساعدة
│   └── assets/                   # الأصول والصور
├── web-portals/                  # بوابات الويب
│   ├── superadmin/               # بوابة المشرف الرئيسي
│   └── vendor/                   # بوابة البائعين
├── Tatx-flutter-app/             # نسخة Flutter أولية
├── supabase/                     # مخطط قاعدة البيانات
│   └── tatx_schema.sql
├── scripts/                      # سكريبتات البناء
│   ├── copy-pwa-assets.js
│   ├── fix-broken-debug.js
│   └── fix-web-rtl.js
├── assets/                       # أيقونات وشاشات تحميل
├── dist/                         # ملفات الويب المبنية
├── App.js                        # نقطة الدخول الرئيسية
├── server.js                     # خادم الويب للإنتاج
├── package.json                  # تبعيات المشروع
├── app.json                      # إعدادات Expo
├── eas.json                      # إعدادات EAS Build
├── babel.config.js               # إعدادات Babel
├── metro.config.js               # إعدادات Metro Bundler
└── nixpacks.toml                 # إعدادات النشر على VPS
```

---

## الشاشات المتوفرة (30 شاشة)

### المصادقة والتجربة الأولية
- `SplashScreen` - شاشة البداية
- `OnboardingScreen` - شاشة التعريف بالتطبيق
- `LoginScreen` - تسجيل الدخول
- `OTPScreen` - التحقق برمز OTP

### الخدمات الرئيسية
- `HomeScreen` - الصفحة الرئيسية
- `CategoryScreen` - تصنيفات الخدمات
- `ProductScreen` - تفاصيل المنتج
- `CartScreen` - سلة التسوق
- `CheckoutScreen` - إتمام الطلب
- `OrderSuccessScreen` - تأكيد الطلب الناجح

### إدارة الطلبات
- `OrdersScreen` - قائمة الطلبات
- `OrderDetailScreen` - تفاصيل الطلب

### الخدمات المتخصصة
- `TaxiScreen` - خدمة التاكسي
- `ServicesScreen` - قائمة الخدمات
- `WholesaleScreen` - سوق الجملة
- `DoctorBookingScreen` - حجز المواعيد الطبية
- `DoctorBookingPatientScreen` - بيانات المريض
- `DoctorBookingScheduleScreen` - جدولة الموعد
- `DoctorBookingConfirmScreen` - تأكيد الحجز
- `StayBookingScreen` - حجز الإقامة
- `StayBookingDetailScreen` - تفاصيل الإقامة

### البائعين
- `VendorSignupScreen` - تسجيل بائع جديد
- `VendorAppScreen` - تطبيق البائع
- `CategoryVendorDetailScreen` - تفاصيل بائع حسب التصنيف

### الحساب والإعدادات
- `AccountScreen` - الحساب الشخصي
- `WalletScreen` - المحفظة الإلكترونية
- `LocationScreen` - إدارة العناوين
- `PaymentScreen` - طرق الدفع
- `NotificationsScreen` - الإشعارات
- `ChatScreen` - الدردشة والدعم

---

## أوامر التشغيل والبناء

### التطوير

```bash
# تثبيت التبعيات
npm install

# تشغيل Expo (تطوير)
npm start

# تشغيل Expo مع وضع Tunnel
npm run start:tunnel

# تشغيل تطوير الويب
npm run web:dev

# تشغيل أندرويد (تطوير)
npm run android

# تشغيل iOS (تطوير)
npm run ios
```

### البناء والإنتاج

```bash
# بناء تطبيق الويب
npm run build:web

# تشغيل خادم الويب للإنتاج
npm run serve:web

# بناء وتشغيل الويب (مدمج)
npm run web
```

### بوابات الويب

```bash
# بوابة المشرف الرئيسي (localhost:3001)
cd web-portals/superadmin
npm install
npm run dev

# بوابة البائعين (localhost:3002)
cd web-portals/vendor
npm install
npm run dev
```

### Flutter (نسخة أولية)

```bash
cd Tatx-flutter-app
flutter pub get
flutter run
```

---

## التكامل مع Supabase

### الجداول الرئيسية

| الجدول | الوصف |
|--------|-------|
| `app_content_sections` | محتوى التطبيق الديناميكي |
| `customer_orders` | طلبات العملاء |
| `app_users` | بيانات المستخدمين |
| `auth_verifications` | التحقق من المصادقة (OTP) |
| `user_addresses` | عناوين المستخدمين |
| `vendor_applications` | طلبات انضمام البائعين |
| `vendor_profiles` | ملفات البائعين المعتمدين |
| `vendor_services` | خدمات/منتجات البائعين |
| `support_conversations` | محادثات الدعم |
| `support_messages` | رسائل الدعم |

### إعدادات البيئة

```env
EXPO_PUBLIC_SUPABASE_URL=https://api.tatx.com
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

للحصول على التفاصيل الكاملة، راجع [`supabase/tatx_schema.sql`](supabase/tatx_schema.sql).

---

## الثيم والتصميم

### الألوان

```javascript
primary: '#DA3C57'      // وردي - اللون الأساسي
primaryDark: '#B72249'
primaryLight: '#F16A82'
success: '#34C759'      // أخضر - للطعام
error: '#FF453A'        // أحمر - للأخطاء
warning: '#FF9F0A'      // برتقالي - للتحذيرات
taxi: '#DA3C57'         // لون خدمة التاكسي
food: '#34C759'         // لون خدمة الطعام
market: '#F28CA0'       // لون خدمة السوق
```

### الخطوط

- **Cairo_400Regular** - النص العادي
- **Cairo_600SemiBold** - العناوين الفرعية
- **Cairo_700Bold** - العناوين الرئيسية

### دعم RTL

التطبيق يدعم الاتجاه من اليمين لليسار بشكل كامل:
- `I18nManager.allowRTL(true)`
- `I18nManager.forceRTL(true)`
- `document.documentElement.setAttribute('dir', 'rtl')` (للويب)

---

## النشر والإنتاج

### متطلبات ما قبل الإطلاق

1. تشغيل ملف SQL على قاعدة البيانات الإنتاجية:
   ```bash
   psql -h <host> -U <user> -d tatx < supabase/tatx_schema.sql
   ```

2. تحديث متغيرات البيئة للإنتاج:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_URL` (للبوابات)
   - `VITE_SUPABASE_ANON_KEY` (للبوابات)

3. بناء التطبيقات:
   - تطبيق Expo (iOS/Android/Web)
   - بوابة المشرف الرئيسي
   - بوابة البائعين

4. تعزيز الأمان:
   - استبدال صلاحيات RLS الواسعة بصلاحيات مقيدة
   - تفعيل المصادقة للبوابات
   - إضافة Rate Limiting
   - تفعيل النسخ الاحتياطي

### EAS Build Configurations

| التكوين | الوصف |
|---------|-------|
| `development` | عميل تطوير، توزيع داخلي |
| `preview` | معاينة، توزيع داخلي |
| `production` | إنتاج، زيادة تلقائية للإصدار |

---

## ملاحظات أمنية هامة

⚠️ **تحذير**: المخطط الحالي operational للاختبار والنشر المحدود، لكنه **غير مؤمن بالكامل للإنتاج العام** لأن بعض الجداول لا تزال تسمح بوصول anon واسع.

**قبل النشر العام:**
- استبدال صلاحيات RLS الواسعة بصلاحيات مقيدة
- تفعيل المصادقة الإلزامية للبوابات
- إضافة مراقبة (Monitoring)
- تفعيل النسخ الاحتياطي التلقائي
- إضافة Rate Limiting
- تطبيق حوكمة التخزين

---

## ملفات التكوين

| الملف | الوصف |
|-------|-------|
| `package.json` | التبعيات وأوامر npm |
| `app.json` | إعدادات Expo (الأيقونة، splash، iOS/Android config) |
| `eas.json` | تكوين EAS Build |
| `babel.config.js` | إعدادات Babel (babel-preset-expo) |
| `metro.config.js` | إعدادات Metro Bundler |
| `server.js` | خادم HTTP مخصص لخدمة ملفات الويب |
| `nixpacks.toml` | تكوين النشر على VPS (Node.js 22) |

---

## المساهمة والتطوير

### هيكل الكود

- **Context API**: لإدارة الحالة العامة (المستخدم، السلة، المحتوى)
- **Services Layer**: لعزل منطق التكامل مع Supabase
- **Constants**: للثيم والألوان والخطوط
- **Navigation**: هيكل تنقل هرمي مع Bottom Tabs

### الممارسات الموصى بها

- استخدام `useApp()` hook للوصول إلى Context
- استخدام `t()` function للترجمة
- احترام هيكل الثيم في `theme.js`
- الحفاظ على دعم RTL في جميع المكونات الجديدة

---

## روابط مفيدة

- [PRODUCTION_READY.md](PRODUCTION_READY.md) - دليل الجاهزية للإنتاج
- [web-portals/README.md](web-portals/README.md) - دليل البوابات الإلكترونية
- [Tatx-flutter-app/README.md](Tatx-flutter-app/README.md) - دليل نسخة Flutter
