import React from 'react';
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
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const marketingStats = [
  { id: '1', value: '24/7', label: 'دعم وتشغيل مستمر' },
  { id: '2', value: '20m', label: 'متوسط التنفيذ السريع' },
  { id: '3', value: 'SA', label: 'تجربة مصممة للسعودية' },
];

const marketingFeatures = [
  {
    id: 'f1',
    icon: 'sparkles-outline',
    title: 'تطبيق واحد لليوم كله',
    subtitle: 'مشاوير، مطاعم، ماركت، وعروض موسمية داخل تجربة موحدة وواضحة.',
  },
  {
    id: 'f2',
    icon: 'shield-checkmark-outline',
    title: 'واجهة مناسبة للتشغيل الحقيقي',
    subtitle: 'تجربة مرتبة للمستخدم، وقابلة للإدارة من البوابة والقاعدة الخلفية.',
  },
  {
    id: 'f3',
    icon: 'phone-portrait-outline',
    title: 'مصمم للجوال والويب',
    subtitle: 'نفس الرسالة التسويقية تفتح أولاً على iOS وAndroid والويب كصفحة هبوط.',
  },
];

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { homeServices = [] } = useApp();

  const isWide = width >= 920;
  const featuredServices = homeServices.slice(0, 6);

  return (
    <LinearGradient colors={['#FFF4F1', '#FFF9F4', '#FFFDFC']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.xxxl),
          },
        ]}
      >
        <View style={[styles.topBar, isWide && styles.topBarWide]}>
          <View style={styles.brandWrap}>
            <View style={styles.logoShell}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.brandName}>Tatx SA</Text>
              <Text style={styles.brandSubline}>Daily services, always with you</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.topBarButton} activeOpacity={0.85} onPress={() => navigation.replace('Login')}>
            <Text style={styles.topBarButtonText}>دخول التطبيق</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.heroSection, isWide && styles.heroSectionWide]}>
          <View style={[styles.heroCopy, isWide && styles.heroCopyWide]}>
            <View style={styles.eyebrow}>
              <Ionicons name="location-outline" size={14} color="#A3472F" />
              <Text style={styles.eyebrowText}>منصة خدمات وتسوق محلية للسوق السعودي</Text>
            </View>

            <Text style={styles.heroTitle}>Tatx SA</Text>
            <Text style={styles.heroHeadline}>
              صفحة هبوط تسويقية تفتح أولاً على الويب والجوال وتحوّل الزائر مباشرة إلى تجربة التطبيق.
            </Text>
            <Text style={styles.heroBody}>
              اعرض القيمة بوضوح من أول ثانية: خدمات يومية، تجربة عربية أنيقة، وربط مباشر مع قاعدة البيانات ولوحة الإدارة.
            </Text>

            <View style={styles.ctaRow}>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={() => navigation.replace('Login')}>
                <Text style={styles.primaryButtonText}>ابدأ الآن</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.9} onPress={() => navigation.navigate('Onboarding')}>
                <Text style={styles.secondaryButtonText}>استكشف التجربة</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsGrid}>
              {marketingStats.map((item) => (
                <View key={item.id} style={styles.statCard}>
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.heroVisualWrap, isWide && styles.heroVisualWrapWide]}>
            <LinearGradient colors={['#A3472F', '#D76643', '#F09A62']} style={styles.phoneFrame}>
              <View style={styles.phoneGlass}>
                <View style={styles.phoneHeader}>
                  <Text style={styles.phoneBadge}>Marketing Landing</Text>
                  <Ionicons name="planet-outline" size={18} color="#A3472F" />
                </View>

                <Text style={styles.phoneTitle}>دائماً معك</Text>
                <Text style={styles.phoneSubtitle}>من الهبوط إلى الطلب خلال تجربة واحدة مرتبة وواضحة.</Text>

                <View style={styles.serviceCloud}>
                  {featuredServices.map((service) => (
                    <View key={service.id} style={styles.serviceChip}>
                      <Ionicons name={service.icon} size={16} color={service.color || colors.primary} />
                      <Text style={styles.serviceChipText}>{service.name}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.previewCard}>
                  <Text style={styles.previewLabel}>قيمة الصفحة الأولى</Text>
                  <Text style={styles.previewHeading}>عرض الفكرة قبل الدخول</Text>
                  <Text style={styles.previewCopy}>
                    أقسام أوضح، رسالة أقوى، وأزرار تحويل تقود المستخدم إلى التطبيق الحقيقي.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={[styles.featuresSection, isWide && styles.featuresSectionWide]}>
          {marketingFeatures.map((feature) => (
            <View key={feature.id} style={[styles.featureCard, isWide && styles.featureCardWide]}>
              <View style={styles.featureIconWrap}>
                <Ionicons name={feature.icon} size={22} color="#A3472F" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F4',
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  topBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  topBarWide: {
    marginBottom: spacing.xxl,
  },
  brandWrap: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoShell: {
    width: 60,
    height: 60,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  logo: {
    width: 38,
    height: 38,
  },
  brandName: {
    color: '#2F180F',
    fontFamily: fonts.bold,
    fontSize: 24,
    textAlign: 'right',
  },
  brandSubline: {
    color: '#8C5B4A',
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'right',
  },
  topBarButton: {
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(163,71,47,0.08)',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  topBarButtonText: {
    color: '#A3472F',
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  heroSection: {
    gap: spacing.xl,
  },
  heroSectionWide: {
    flexDirection: 'row-reverse',
    alignItems: 'stretch',
  },
  heroCopy: {
    gap: spacing.lg,
  },
  heroCopyWide: {
    flex: 1.05,
    justifyContent: 'center',
    paddingLeft: spacing.lg,
  },
  eyebrow: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(163,71,47,0.1)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  eyebrowText: {
    color: '#A3472F',
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  heroTitle: {
    color: '#2F180F',
    fontFamily: fonts.bold,
    fontSize: 54,
    lineHeight: 58,
    textAlign: 'right',
  },
  heroHeadline: {
    color: '#2F180F',
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 40,
    textAlign: 'right',
  },
  heroBody: {
    color: '#6D4C41',
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'right',
    maxWidth: 620,
    alignSelf: 'flex-end',
  },
  ctaRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'flex-start',
  },
  primaryButton: {
    minWidth: 170,
    borderRadius: 22,
    backgroundColor: '#A3472F',
    paddingHorizontal: spacing.lg,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  secondaryButton: {
    minWidth: 170,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(163,71,47,0.18)',
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingHorizontal: spacing.lg,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#6D3B2C',
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    minWidth: 120,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(163,71,47,0.08)',
    ...shadows.sm,
  },
  statValue: {
    color: '#A3472F',
    fontFamily: fonts.bold,
    fontSize: 24,
    textAlign: 'right',
  },
  statLabel: {
    color: '#7E6258',
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  heroVisualWrap: {
    minHeight: 460,
  },
  heroVisualWrapWide: {
    flex: 0.95,
  },
  phoneFrame: {
    flex: 1,
    borderRadius: 36,
    padding: spacing.md,
    ...shadows.float,
  },
  phoneGlass: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: 'rgba(255,250,247,0.92)',
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  phoneHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  phoneBadge: {
    color: '#A3472F',
    fontFamily: fonts.semiBold,
    fontSize: 12,
    backgroundColor: 'rgba(240,154,98,0.16)',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  phoneTitle: {
    color: '#2F180F',
    fontFamily: fonts.bold,
    fontSize: 32,
    textAlign: 'right',
  },
  phoneSubtitle: {
    color: '#7E6258',
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  serviceCloud: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  serviceChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  serviceChipText: {
    color: '#55342A',
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  previewCard: {
    marginTop: spacing.lg,
    borderRadius: 24,
    backgroundColor: '#2F180F',
    padding: spacing.lg,
  },
  previewLabel: {
    color: '#F6B897',
    fontFamily: fonts.semiBold,
    fontSize: 12,
    textAlign: 'right',
  },
  previewHeading: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  previewCopy: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  featuresSection: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  featuresSectionWide: {
    flexDirection: 'row-reverse',
    alignItems: 'stretch',
  },
  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 28,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(163,71,47,0.08)',
    ...shadows.sm,
  },
  featureCardWide: {
    flex: 1,
  },
  featureIconWrap: {
    alignSelf: 'flex-end',
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(240,154,98,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    color: '#2F180F',
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'right',
  },
  featureSubtitle: {
    color: '#6D4C41',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
});

export default SplashScreen;
