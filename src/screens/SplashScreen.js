import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const useCaseCards = [
  {
    id: 'customer',
    title: 'للعميل اليومي',
    price: 'ابدأ مجاناً',
    description: 'كل احتياجاتك اليومية داخل تجربة واحدة: مشوار، مطاعم، وماركت.',
    points: ['طلب سريع بالعربية', 'عروض محلية يومية', 'متابعة الطلبات والمحفظة'],
    tone: ['#F6F0FF', '#FFFFFF'],
    accent: '#7C5CFF',
  },
  {
    id: 'vendor',
    title: 'لمقدم الخدمة',
    price: 'بوابة مفعلة',
    description: 'بعد موافقة المشرف العام، يدير البائع خدماته وأسعاره وتوفره من لوحة واحدة.',
    points: ['انضمام من التطبيق', 'اعتماد من المشرف العام', 'إدارة الخدمات والطلبات'],
    tone: ['#7C5CFF', '#A276FF'],
    accent: '#FFFFFF',
    featured: true,
  },
  {
    id: 'superadmin',
    title: 'للتشغيل والإدارة',
    price: 'تحكم كامل',
    description: 'المحتوى، طلبات الانضمام، والعروض يتم ضبطها من البوابة وربطها بقاعدة البيانات.',
    points: ['مراجعة واعتماد البائعين', 'التحكم في المحتوى', 'رؤية تشغيلية وطلبات مباشرة'],
    tone: ['#F4F7FF', '#FFFFFF'],
    accent: '#2E3A59',
  },
];

const testimonials = [
  {
    id: '1',
    name: 'سارة القحطاني',
    role: 'عميلة نشطة',
    body: 'التطبيق واضح جداً. أتنقل بين المطاعم والماركت والمشاوير بدون ما أحس أني أغيّر منصة.',
  },
  {
    id: '2',
    name: 'متجر نجد المختصر',
    role: 'بائع معتمد',
    body: 'بعد الموافقة دخلنا مباشرة على بوابة البائع وصار تحديث الخدمات والأسعار أسرع بكثير.',
  },
  {
    id: '3',
    name: 'مشرف العمليات',
    role: 'إدارة المنصة',
    body: 'أفضل شيء أن المحتوى والتفعيل وطلبات البائعين كلها أصبحت مربوطة في نفس التدفق.',
  },
];

const arabicNumber = (value) => new Intl.NumberFormat('ar-SA').format(Number(value || 0));

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const {
    demoMarket,
    homeServices = [],
    homeOffers = [],
    restaurants = [],
    products = [],
  } = useApp();

  const isDesktop = width >= 1080;
  const isTablet = width >= 760;
  const heroServices = homeServices.slice(0, 6);
  const featureServices = homeServices.slice(0, 4);
  const topRestaurants = restaurants.slice(0, 3);
  const marketPicks = products.slice(0, 4);
  const primaryOffer = homeOffers[0];

  const headlineLines = useMemo(
    () => ['إدارة يومك من', 'تطبيق واحد', 'مصمم للسعودية'],
    []
  );

  return (
    <LinearGradient colors={['#FFF8F2', '#FBFBFF', '#FFFFFF']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: Math.max(insets.bottom + spacing.xxl, spacing.xxxl),
          },
        ]}
      >
        <View style={[styles.navbar, isDesktop && styles.navbarDesktop]}>
          <View style={styles.brandBlock}>
            <View style={styles.brandLogoShell}>
              <Image source={require('../../assets/logo.png')} style={styles.brandLogo} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.brandTitle}>Tatx SA</Text>
              <Text style={styles.brandCaption}>الخدمات اليومية، دائماً معك</Text>
            </View>
          </View>

          <View style={[styles.navActions, isTablet && styles.navActionsTablet]}>
            <TouchableOpacity style={styles.ghostButton} activeOpacity={0.88} onPress={() => navigation.navigate('Onboarding')}>
              <Text style={styles.ghostButtonText}>استكشف المنصة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.darkButton} activeOpacity={0.9} onPress={() => navigation.replace('Login')}>
              <Text style={styles.darkButtonText}>دخول التطبيق</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
          <View style={[styles.heroCopy, isDesktop && styles.heroCopyDesktop]}>
            <View style={styles.heroPill}>
              <Ionicons name="sparkles-outline" size={14} color="#7C5CFF" />
              <Text style={styles.heroPillText}>منصة خدمات محلية في {demoMarket?.city || 'السعودية'}</Text>
            </View>

            <View>
              {headlineLines.map((line) => (
                <Text key={line} style={styles.heroTitle}>{line}</Text>
              ))}
            </View>

            <Text style={styles.heroSubtitle}>
              نفس روح التصميم في المرجع، لكن بمحتوى Tatx الحقيقي: مشاوير، مطاعم، سوبرماركت، جملة، هدايا، وصيدلية ضمن تجربة عربية مرنة على الويب والجوال.
            </Text>

            <View style={[styles.ctaRow, isTablet && styles.ctaRowTablet]}>
              <TouchableOpacity style={styles.primaryCta} activeOpacity={0.9} onPress={() => navigation.replace('Login')}>
                <Text style={styles.primaryCtaText}>ابدأ الآن</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryCta} activeOpacity={0.9} onPress={() => navigation.navigate('Onboarding')}>
                <Ionicons name="play-circle-outline" size={18} color="#7C5CFF" />
                <Text style={styles.secondaryCtaText}>شاهد كيف تعمل</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.metricRow, isTablet && styles.metricRowTablet]}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>+{arabicNumber(heroServices.length)}</Text>
                <Text style={styles.metricLabel}>خدمات رئيسية</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>+{arabicNumber(restaurants.length)}</Text>
                <Text style={styles.metricLabel}>وجهات ومتاجر</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>24/7</Text>
                <Text style={styles.metricLabel}>جاهزية وتشغيل</Text>
              </View>
            </View>
          </View>

          <View style={[styles.heroVisual, isDesktop && styles.heroVisualDesktop]}>
            <LinearGradient colors={['#EFE7FF', '#FFF7F1']} style={styles.visualBackdrop}>
              <View style={styles.floatingLabelLeft}>
                <Text style={styles.floatingNumber}>+84</Text>
                <Text style={styles.floatingText}>طلباً نشطاً</Text>
              </View>

              <View style={styles.floatingLabelRight}>
                <Text style={styles.floatingText}>عروض مباشرة</Text>
                <View style={styles.pulseDot} />
              </View>

              <View style={[styles.mockupRow, isTablet && styles.mockupRowTablet]}>
                <View style={[styles.phoneMockup, styles.phoneMain]}>
                  <View style={styles.phoneNotch} />
                  <Text style={styles.phoneScreenLabel}>الرئيسية</Text>
                  <Text style={styles.phoneHeading}>كل خدماتك في شاشة واحدة</Text>

                  <View style={styles.serviceGrid}>
                    {heroServices.map((service) => (
                      <View key={service.id} style={styles.serviceMiniCard}>
                        <View style={[styles.serviceMiniIcon, { backgroundColor: `${service.color || colors.primary}16` }]}>
                          <Ionicons name={service.icon} size={17} color={service.color || colors.primary} />
                        </View>
                        <Text style={styles.serviceMiniText}>{service.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.phoneMockup, styles.phoneSide]}>
                  <Text style={styles.phoneScreenLabel}>العروض</Text>
                  {primaryOffer ? (
                    <>
                      <Image source={{ uri: primaryOffer.image }} style={styles.offerThumb} />
                      <Text style={styles.sideCardTitle}>{primaryOffer.title}</Text>
                      <Text style={styles.sideCardSubtitle}>{primaryOffer.subtitle}</Text>
                    </>
                  ) : null}
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>كل ما تحتاجه</Text>
          <Text style={styles.sectionTitle}>خدمات منظمة تحت منصة واحدة</Text>
        </View>

        <View style={[styles.featureGrid, isDesktop && styles.featureGridDesktop]}>
          {featureServices.map((service, index) => (
            <View key={service.id} style={[styles.featureInfoCard, isDesktop && styles.featureInfoCardDesktop]}>
              <View style={styles.featureIconRow}>
                <View style={[styles.featureIconShell, { backgroundColor: `${service.color || colors.primary}16` }]}>
                  <Ionicons name={service.icon} size={20} color={service.color || colors.primary} />
                </View>
                <Text style={styles.featureIndex}>0{index + 1}</Text>
              </View>
              <Text style={styles.featureInfoTitle}>{service.name}</Text>
              <Text style={styles.featureInfoBody}>
                {service.name === 'مشوار'
                  ? 'تنقل سريع ومباشر مع تجربة طلب مختصرة وواضحة.'
                  : service.name === 'مطاعم'
                    ? 'وجبات، عروض، ومتاجر جاهزة للطلب في دقائق.'
                    : service.name === 'سوبرماركيت'
                      ? 'منتجات يومية وصور وأسعار واضحة من شاشة متجر واحدة.'
                      : 'خدمات متخصصة تناسب التوسع المحلي والإدارة المركزية.'}
              </Text>
            </View>
          ))}
        </View>

        <LinearGradient colors={['#F4EEFF', '#FFFFFF']} style={styles.trustSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>لماذا يثقون في Tatx</Text>
            <Text style={styles.sectionTitle}>تصميم أوضح، محتوى حقيقي، وتدفق تشغيلي مترابط</Text>
          </View>

          <View style={[styles.previewRail, isDesktop && styles.previewRailDesktop]}>
            {topRestaurants.map((restaurant) => (
              <View key={restaurant.id} style={[styles.previewTile, isDesktop && styles.previewTileDesktop]}>
                <View style={styles.previewTileTop}>
                  <Image source={{ uri: restaurant.logo }} style={styles.previewAvatar} />
                  <View style={styles.previewMeta}>
                    <Text style={styles.previewName}>{restaurant.name}</Text>
                    <Text style={styles.previewCategory}>{restaurant.category}</Text>
                  </View>
                </View>
                <View style={styles.previewTags}>
                  {restaurant.tags.slice(0, 2).map((tag) => (
                    <View key={tag} style={styles.previewTag}>
                      <Text style={styles.previewTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.previewTiming}>التوصيل خلال {restaurant.deliveryTime} دقيقة</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>مرونة لكل مستخدم</Text>
          <Text style={styles.sectionTitle}>تدفقات مختلفة لنفس المنصة</Text>
        </View>

        <View style={[styles.pricingGrid, isDesktop && styles.pricingGridDesktop]}>
          {useCaseCards.map((card) => {
            const isFeatured = Boolean(card.featured);
            return (
              <LinearGradient
                key={card.id}
                colors={card.tone}
                style={[styles.planCard, isFeatured && styles.planCardFeatured, isDesktop && styles.planCardDesktop]}
              >
                <Text style={[styles.planTitle, isFeatured && styles.planTitleFeatured]}>{card.title}</Text>
                <Text style={[styles.planPrice, isFeatured && styles.planPriceFeatured]}>{card.price}</Text>
                <Text style={[styles.planDescription, isFeatured && styles.planDescriptionFeatured]}>{card.description}</Text>

                <View style={styles.planPoints}>
                  {card.points.map((point) => (
                    <View key={point} style={styles.planPointRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={isFeatured ? '#FFFFFF' : card.accent}
                      />
                      <Text style={[styles.planPointText, isFeatured && styles.planPointTextFeatured]}>{point}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            );
          })}
        </View>

        <LinearGradient colors={['#7C5CFF', '#AA7DFF']} style={styles.downloadBanner}>
          <View style={[styles.downloadBannerInner, isDesktop && styles.downloadBannerInnerDesktop]}>
            <View style={[styles.downloadCopy, isDesktop && styles.downloadCopyDesktop]}>
              <Text style={styles.downloadTitle}>حمّل Tatx SA وخلك مسيطر على يومك</Text>
              <Text style={styles.downloadBody}>
                افتح نفس الصفحة كتجربة تسويقية، ثم ادخل مباشرة إلى التطبيق لتبدأ الطلب أو الانضمام كمقدم خدمة أو إدارة المنصة.
              </Text>

              <View style={styles.downloadActions}>
                <TouchableOpacity style={styles.storeButtonDark} activeOpacity={0.9} onPress={() => navigation.replace('Login')}>
                  <Ionicons name="logo-apple" size={18} color={colors.white} />
                  <Text style={styles.storeButtonDarkText}>App Store</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storeButtonLight} activeOpacity={0.9} onPress={() => navigation.navigate('Onboarding')}>
                  <Ionicons name="logo-google-playstore" size={18} color="#7C5CFF" />
                  <Text style={styles.storeButtonLightText}>Google Play</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.qrCard}>
              <View style={styles.qrBox}>
                <View style={styles.qrPixelLarge} />
                <View style={styles.qrPixelSmall} />
                <View style={styles.qrPixelBottom} />
              </View>
              <Text style={styles.qrCaption}>امسح للدخول السريع</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>نتائج حقيقية</Text>
          <Text style={styles.sectionTitle}>آراء من داخل المنصة نفسها</Text>
        </View>

        <View style={[styles.testimonialGrid, isDesktop && styles.testimonialGridDesktop]}>
          {testimonials.map((item) => (
            <View key={item.id} style={[styles.testimonialCard, isDesktop && styles.testimonialCardDesktop]}>
              <View style={styles.testimonialHead}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarLetter}>{item.name.slice(0, 1)}</Text>
                </View>
                <View style={styles.testimonialMeta}>
                  <Text style={styles.testimonialName}>{item.name}</Text>
                  <Text style={styles.testimonialRole}>{item.role}</Text>
                </View>
              </View>
              <Text style={styles.testimonialBody}>{item.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={[styles.footerTop, isDesktop && styles.footerTopDesktop]}>
            <View style={styles.footerBrand}>
              <View style={styles.footerLogoShell}>
                <Image source={require('../../assets/logo.png')} style={styles.footerLogo} resizeMode="contain" />
              </View>
              <View>
                <Text style={styles.footerBrandTitle}>Tatx SA</Text>
                <Text style={styles.footerBrandCaption}>منصة خدمات يومية للسوق السعودي</Text>
              </View>
            </View>

            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.footerActionButton} activeOpacity={0.9} onPress={() => navigation.replace('Login')}>
                <Text style={styles.footerActionText}>ابدأ الآن</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.footerLinks, isTablet && styles.footerLinksTablet]}>
            {['الرئيسية', 'الخدمات', 'البائعون', 'المنصة'].map((item) => (
              <Text key={item} style={styles.footerLinkText}>{item}</Text>
            ))}
          </View>

          <Text style={styles.footerNote}>تجربة عربية متجاوبة على الويب والجوال مع محتوى حي من المنصة.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  navbar: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 28,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.08)',
  },
  navbarDesktop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  brandBlock: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  brandLogoShell: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
    ...shadows.md,
  },
  brandLogo: {
    width: 36,
    height: 36,
  },
  brandTitle: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 24,
    textAlign: 'right',
  },
  brandCaption: {
    color: '#7D7598',
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  },
  navActions: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  navActionsTablet: {
    marginBottom: 0,
  },
  ghostButton: {
    height: 44,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#E8E0FF',
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginLeft: spacing.sm,
  },
  ghostButtonText: {
    color: '#6E58E9',
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  darkButton: {
    height: 44,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121326',
  },
  darkButtonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  hero: {
    marginBottom: spacing.xxl,
  },
  heroDesktop: {
    flexDirection: 'row-reverse',
    alignItems: 'stretch',
  },
  heroCopy: {
    marginBottom: spacing.xl,
  },
  heroCopyDesktop: {
    flex: 1.05,
    marginLeft: spacing.lg,
    marginBottom: 0,
    justifyContent: 'center',
  },
  heroPill: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F1EDFF',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginBottom: spacing.lg,
  },
  heroPillText: {
    color: '#6E58E9',
    fontFamily: fonts.semiBold,
    fontSize: 12,
    marginRight: spacing.xs,
  },
  heroTitle: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 42,
    lineHeight: 48,
    textAlign: 'right',
  },
  heroSubtitle: {
    color: '#6F6987',
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'right',
    marginTop: spacing.lg,
  },
  ctaRow: {
    marginTop: spacing.lg,
  },
  ctaRowTablet: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  primaryCta: {
    height: 54,
    borderRadius: 20,
    backgroundColor: '#6E58E9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  primaryCtaText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  secondaryCta: {
    height: 54,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E6DEFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    flexDirection: 'row-reverse',
  },
  secondaryCtaText: {
    color: '#6E58E9',
    fontFamily: fonts.semiBold,
    fontSize: 15,
    marginRight: spacing.xs,
  },
  metricRow: {
    marginTop: spacing.lg,
  },
  metricRowTablet: {
    flexDirection: 'row-reverse',
  },
  metricCard: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#EFEAFF',
    ...shadows.sm,
  },
  metricValue: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 24,
    textAlign: 'right',
  },
  metricLabel: {
    color: '#7D7598',
    fontFamily: fonts.regular,
    fontSize: 13,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  heroVisual: {
    minHeight: 520,
  },
  heroVisualDesktop: {
    flex: 1,
  },
  visualBackdrop: {
    flex: 1,
    borderRadius: 36,
    padding: spacing.lg,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  floatingLabelLeft: {
    position: 'absolute',
    left: 12,
    top: 86,
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.md,
  },
  floatingLabelRight: {
    position: 'absolute',
    right: 14,
    top: 160,
    backgroundColor: '#7C5CFF',
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    ...shadows.md,
  },
  floatingNumber: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'center',
  },
  floatingText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    textAlign: 'center',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: spacing.xs,
  },
  mockupRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupRowTablet: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  phoneMockup: {
    backgroundColor: '#16172B',
    borderRadius: 32,
    padding: spacing.sm,
    ...shadows.float,
  },
  phoneMain: {
    width: 248,
    minHeight: 430,
    zIndex: 2,
  },
  phoneSide: {
    width: 170,
    minHeight: 310,
    marginTop: spacing.lg,
    marginRight: -20,
    zIndex: 1,
  },
  phoneNotch: {
    alignSelf: 'center',
    width: 92,
    height: 20,
    borderRadius: 12,
    backgroundColor: '#252742',
    marginBottom: spacing.sm,
  },
  phoneScreenLabel: {
    color: '#A49CC7',
    fontFamily: fonts.semiBold,
    fontSize: 11,
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
  phoneHeading: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  serviceGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceMiniCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceMiniIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceMiniText: {
    color: '#171435',
    fontFamily: fonts.semiBold,
    fontSize: 12,
    textAlign: 'center',
  },
  offerThumb: {
    width: '100%',
    height: 120,
    borderRadius: 18,
    marginBottom: spacing.sm,
  },
  sideCardTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: 'right',
  },
  sideCardSubtitle: {
    color: '#C9C5E3',
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionEyebrow: {
    color: '#6E58E9',
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'center',
    maxWidth: 760,
  },
  featureGrid: {
    marginBottom: spacing.xxl,
  },
  featureGridDesktop: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureInfoCard: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#EFEAFF',
    ...shadows.sm,
  },
  featureInfoCardDesktop: {
    width: '48%',
  },
  featureIconRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  featureIconShell: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIndex: {
    color: '#B0AAC8',
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  featureInfoTitle: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  featureInfoBody: {
    color: '#746D8E',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
  },
  trustSection: {
    borderRadius: 40,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xxl,
  },
  previewRail: {},
  previewRailDesktop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  previewTile: {
    backgroundColor: colors.white,
    borderRadius: 26,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E8E0FF',
    ...shadows.sm,
  },
  previewTileDesktop: {
    width: '31.5%',
    marginBottom: 0,
  },
  previewTileTop: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  previewAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    marginLeft: spacing.sm,
  },
  previewMeta: {
    flex: 1,
  },
  previewName: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: 'right',
  },
  previewCategory: {
    color: '#8E87A9',
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 2,
  },
  previewTags: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  previewTag: {
    backgroundColor: '#F4F1FF',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginLeft: spacing.xs,
    marginBottom: spacing.xs,
  },
  previewTagText: {
    color: '#6E58E9',
    fontFamily: fonts.semiBold,
    fontSize: 11,
  },
  previewTiming: {
    color: '#595274',
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'right',
  },
  pricingGrid: {
    marginBottom: spacing.xxl,
  },
  pricingGridDesktop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  planCard: {
    borderRadius: 34,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#ECE6FF',
    ...shadows.md,
  },
  planCardDesktop: {
    width: '31.5%',
    marginBottom: 0,
  },
  planCardFeatured: {
    transform: [{ scale: 1.02 }],
  },
  planTitle: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'right',
  },
  planTitleFeatured: {
    color: colors.white,
  },
  planPrice: {
    color: '#6E58E9',
    fontFamily: fonts.bold,
    fontSize: 28,
    textAlign: 'right',
    marginTop: spacing.md,
  },
  planPriceFeatured: {
    color: colors.white,
  },
  planDescription: {
    color: '#746D8E',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  planDescriptionFeatured: {
    color: 'rgba(255,255,255,0.82)',
  },
  planPoints: {
    marginTop: spacing.lg,
  },
  planPointRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  planPointText: {
    color: '#352F52',
    fontFamily: fonts.regular,
    fontSize: 14,
    marginRight: spacing.sm,
    flex: 1,
    textAlign: 'right',
  },
  planPointTextFeatured: {
    color: colors.white,
  },
  downloadBanner: {
    borderRadius: 34,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    ...shadows.float,
  },
  downloadBannerInner: {},
  downloadBannerInnerDesktop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadCopy: {},
  downloadCopyDesktop: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  downloadTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'center',
  },
  downloadBody: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  downloadActions: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  storeButtonDark: {
    height: 48,
    borderRadius: 18,
    backgroundColor: '#18142E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    flexDirection: 'row-reverse',
    marginLeft: spacing.sm,
  },
  storeButtonDarkText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    marginRight: spacing.xs,
  },
  storeButtonLight: {
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    flexDirection: 'row-reverse',
  },
  storeButtonLightText: {
    color: '#6E58E9',
    fontFamily: fonts.semiBold,
    fontSize: 14,
    marginRight: spacing.xs,
  },
  qrCard: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  qrBox: {
    width: 112,
    height: 112,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  qrPixelLarge: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#7C5CFF',
  },
  qrPixelSmall: {
    position: 'absolute',
    top: 24,
    left: 22,
    width: 14,
    height: 14,
    borderRadius: 5,
    backgroundColor: '#171435',
  },
  qrPixelBottom: {
    position: 'absolute',
    bottom: 18,
    left: 30,
    width: 36,
    height: 20,
    borderRadius: 7,
    backgroundColor: '#A276FF',
  },
  qrCaption: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    marginTop: spacing.sm,
  },
  testimonialGrid: {
    marginBottom: spacing.xxl,
  },
  testimonialGridDesktop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  testimonialCard: {
    backgroundColor: colors.white,
    borderRadius: 26,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#EFEAFF',
    ...shadows.sm,
  },
  testimonialCardDesktop: {
    width: '31.5%',
    marginBottom: 0,
  },
  testimonialHead: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#F2EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  avatarLetter: {
    color: '#6E58E9',
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  testimonialMeta: {
    flex: 1,
  },
  testimonialName: {
    color: '#171435',
    fontFamily: fonts.bold,
    fontSize: 15,
    textAlign: 'right',
  },
  testimonialRole: {
    color: '#8D86A6',
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  },
  testimonialBody: {
    color: '#6E6787',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
  },
  footer: {
    backgroundColor: '#11131F',
    borderRadius: 34,
    padding: spacing.lg,
  },
  footerTop: {
    marginBottom: spacing.lg,
  },
  footerTopDesktop: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBrand: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  footerLogoShell: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  footerLogo: {
    width: 32,
    height: 32,
  },
  footerBrandTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22,
    textAlign: 'right',
  },
  footerBrandCaption: {
    color: 'rgba(255,255,255,0.64)',
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  },
  footerActions: {
    alignItems: 'flex-end',
  },
  footerActionButton: {
    height: 46,
    borderRadius: borderRadius.full,
    backgroundColor: '#7C5CFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  footerActionText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  footerLinks: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  footerLinksTablet: {
    justifyContent: 'flex-start',
  },
  footerLinkText: {
    color: 'rgba(255,255,255,0.72)',
    fontFamily: fonts.regular,
    fontSize: 13,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  footerNote: {
    color: 'rgba(255,255,255,0.48)',
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SplashScreen;
