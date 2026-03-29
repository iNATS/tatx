import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import AppListCard from '../components/AppListCard';

const providerFilters = [
  { id: 'restaurant', label: 'مطاعم', icon: 'restaurant-outline' },
  { id: 'wholesale', label: 'جملة', icon: 'layers-outline' },
];

const providerConfigs = {
  restaurant: {
    title: 'لوحة المطعم',
    subtitle: 'إدارة الطلبات، أوقات التحضير، والقائمة',
    stats: [
      { label: 'طلبات اليوم', value: '32' },
      { label: 'متوسط التحضير', value: '18 د' },
      { label: 'تقييم المتجر', value: '4.8' },
    ],
    tasks: ['8 طلبات جديدة بانتظار القبول', '4 عناصر تحتاج تحديث السعر', 'ذروة الطلب تبدأ خلال 30 دقيقة'],
    actions: [
      { id: 'orders', label: 'إدارة الطلبات', icon: 'receipt-outline', screen: 'Orders' },
      { id: 'menu', label: 'عرض المتجر', icon: 'storefront-outline', screen: 'Shop' },
      { id: 'support', label: 'الدعم', icon: 'chatbubble-ellipses-outline', screen: 'Chat' },
    ],
  },
  wholesale: {
    title: 'لوحة الجملة',
    subtitle: 'الأسعار، المخزون، والطلبات الكبيرة',
    stats: [
      { label: 'طلبات الجملة', value: '21' },
      { label: 'أصناف تحتاج إعادة تعبئة', value: '8' },
      { label: 'متوسط قيمة الطلب', value: '1,250' },
    ],
    tasks: ['تحديث سعر 3 أصناف', 'مراجعة طلب شركة جديدة', 'جدولة شحنة صباحية'],
    actions: [
      { id: 'wholesale', label: 'عرض خدمة الجملة', icon: 'layers-outline', screen: 'Wholesale' },
      { id: 'orders', label: 'إدارة الطلبات', icon: 'receipt-outline', screen: 'Orders' },
      { id: 'support', label: 'الدعم', icon: 'chatbubble-ellipses-outline', screen: 'Chat' },
    ],
  },
};

const VendorAppScreen = ({ navigation, route }) => {
  const { isRTL, rowDirection, textAlignStart } = useApp();
  const [selectedProvider, setSelectedProvider] = useState(route.params?.providerType || 'restaurant');
  const providerName = route.params?.providerName || 'واجهة مقدم الخدمة';
  const isOnboarded = route.params?.onboarded ?? false;

  const config = useMemo(
    () => providerConfigs[selectedProvider] || providerConfigs.restaurant,
    [selectedProvider]
  );

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="تطبيق مقدم الخدمة"
        subtitle="واجهة واحدة تتغيّر حسب نوع النشاط داخل التطبيق"
        filters={providerFilters}
        selectedFilter={selectedProvider}
        onSelectFilter={setSelectedProvider}
        actionIcon="add-outline"
        onActionPress={() => navigation.navigate('VendorSignup')}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={[styles.heroEyebrow, { textAlign: textAlignStart }]}>{providerName}</Text>
          <Text style={[styles.heroTitle, { textAlign: textAlignStart }]}>{config.title}</Text>
          <Text style={[styles.heroSubtitle, { textAlign: textAlignStart }]}>{config.subtitle}</Text>

          {!isOnboarded && (
            <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate('VendorSignup')}>
              <Text style={styles.heroButtonText}>ابدأ تسجيل النشاط</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.statsRow, { flexDirection: 'row-reverse' }]}>
          {config.stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>مهام اليوم</Text>
          {config.tasks.map((task) => (
            <View key={task} style={[styles.taskRow, { flexDirection: 'row-reverse' }]}>
              <Ionicons name="ellipse" size={8} color={colors.primary} />
              <Text style={[styles.taskText, { textAlign: textAlignStart }]}>{task}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>أدوات الإدارة</Text>
          {config.actions.map((action) => (
            <AppListCard
              key={action.id}
              title={action.label}
              subtitle="افتح واجهة النشاط كما تظهر للمستخدم وراجع الأداء اليومي"
              mediaIcon={action.icon}
              mediaColor={colors.primary}
              metaLabel="TOOL"
              metaValue={config.title}
              actionLabel="فتح الأداة"
              onPress={() => navigation.navigate(action.screen, action.params)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  heroEyebrow: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'right', alignSelf: 'stretch' },
  heroTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 24, marginTop: spacing.sm, textAlign: 'right', alignSelf: 'stretch' },
  heroSubtitle: { color: colors.textSecondary, fontSize: 14, marginTop: spacing.sm, lineHeight: 22, textAlign: 'right', alignSelf: 'stretch' },
  heroButton: { marginTop: spacing.md, alignSelf: 'flex-end', backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: 13, borderRadius: borderRadius.full },
  heroButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 14 },
  statsRow: { gap: spacing.sm, marginBottom: spacing.lg },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: 22, padding: spacing.md, writingDirection: 'rtl', ...shadows.sm },
  statValue: { color: colors.text, fontFamily: fonts.bold, fontSize: 20, textAlign: 'right' },
  statLabel: { color: colors.textSecondary, fontSize: 12, marginTop: spacing.xs, textAlign: 'right' },
  section: { marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 18, marginBottom: spacing.md, textAlign: 'right' },
  taskRow: { alignItems: 'center', gap: spacing.sm, backgroundColor: colors.card, borderRadius: 20, padding: spacing.md, writingDirection: 'rtl', ...shadows.sm },
  taskText: { flex: 1, color: colors.textSecondary, fontSize: 14, lineHeight: 21, textAlign: 'right' },
});

export default VendorAppScreen;
