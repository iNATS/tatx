import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import AppListCard from '../components/AppListCard';
import { fetchVendorApplicationStatus } from '../services/vendorService';

const providerFilters = [
  { id: 'restaurant', label: 'مطاعم', icon: 'restaurant-outline' },
  { id: 'wholesale', label: 'جملة', icon: 'layers-outline' },
  { id: 'market', label: 'متجر', icon: 'bag-outline' },
];

const providerConfigs = {
  restaurant: {
    title: 'لوحة المطعم',
    subtitle: 'بعد الموافقة يمكنك إدارة الطلبات والقائمة والعناصر من بوابة البائع.',
  },
  wholesale: {
    title: 'لوحة الجملة',
    subtitle: 'تسعير الجملة، الكميات، والطلبات الكبيرة ستكون متاحة بعد التفعيل.',
  },
  market: {
    title: 'لوحة المتجر',
    subtitle: 'حدّث المنتجات، الصور، والتوفر مباشرة بعد قبول طلبك.',
  },
};

const statusConfig = {
  pending: {
    badge: 'بانتظار المراجعة',
    badgeColor: colors.warning,
    badgeBg: colors.warningLight,
    title: 'طلب الانضمام تحت المراجعة',
    description: 'تم استلام بيانات النشاط، وينتظر الآن موافقة المشرف العام قبل فتح بوابة البائع.',
    icon: 'time-outline',
  },
  approved: {
    badge: 'تمت الموافقة',
    badgeColor: colors.success,
    badgeBg: colors.successLight,
    title: 'النشاط مفعل ويمكنه دخول البوابة',
    description: 'تمت الموافقة على الطلب. يمكنك الآن استخدام بوابة البائع لإدارة الخدمات والمنتجات.',
    icon: 'checkmark-circle-outline',
  },
  rejected: {
    badge: 'مرفوض',
    badgeColor: colors.error,
    badgeBg: colors.errorLight,
    title: 'يتطلب الطلب تحديث البيانات',
    description: 'تمت إعادة الطلب للمراجعة. راجع ملاحظات المشرف العام ثم أعد التقديم ببيانات صحيحة.',
    icon: 'close-circle-outline',
  },
};

const VendorAppScreen = ({ navigation, route }) => {
  const { isRTL, textAlignStart } = useApp();
  const [selectedProvider, setSelectedProvider] = useState(route.params?.providerType || 'restaurant');
  const [statusLoading, setStatusLoading] = useState(Boolean(route.params?.vendorPhone));
  const [application, setApplication] = useState(null);
  const [statusError, setStatusError] = useState('');
  const providerName = route.params?.providerName || 'واجهة مقدم الخدمة';
  const vendorPhone = route.params?.vendorPhone || '';

  const config = useMemo(
    () => providerConfigs[selectedProvider] || providerConfigs.restaurant,
    [selectedProvider]
  );

  useEffect(() => {
    let cancelled = false;

    const loadStatus = async () => {
      if (!vendorPhone) {
        setStatusLoading(false);
        return;
      }

      const { data, error } = await fetchVendorApplicationStatus(vendorPhone);

      if (cancelled) {
        return;
      }

      setApplication(data);
      setStatusError(error ? 'تعذر تحميل حالة الطلب حالياً.' : '');
      setStatusLoading(false);
    };

    loadStatus();

    return () => {
      cancelled = true;
    };
  }, [vendorPhone]);

  const currentStatus = application?.status || 'pending';
  const currentStatusConfig = statusConfig[currentStatus] || statusConfig.pending;

  const managementActions = [
    {
      id: 'vendor-portal',
      label: 'بوابة البائع',
      icon: 'globe-outline',
      screen: null,
      subtitle: 'ادخل من الويب لإدارة الخدمات والطلبات والملف التجاري بعد الموافقة.',
    },
    {
      id: 'signup',
      label: currentStatus === 'rejected' ? 'إعادة التقديم' : 'طلب انضمام جديد',
      icon: 'document-text-outline',
      screen: 'VendorSignup',
      subtitle: 'حدّث بيانات النشاط أو قدّم طلباً جديداً إذا لزم الأمر.',
    },
    {
      id: 'support',
      label: 'الدعم',
      icon: 'chatbubble-ellipses-outline',
      screen: 'Chat',
      subtitle: 'تواصل مع الدعم لمتابعة حالة التفعيل أو المستندات المطلوبة.',
    },
  ];

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="تطبيق مقدم الخدمة"
        subtitle="طلب الانضمام، المتابعة، ثم إدارة الخدمات بعد الموافقة"
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

          {vendorPhone ? (
            <Text style={[styles.heroMeta, { textAlign: textAlignStart }]}>رقم المتابعة: {vendorPhone}</Text>
          ) : null}
        </View>

        <View style={styles.statusCard}>
          {statusLoading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.loadingText}>جارٍ التحقق من حالة الطلب...</Text>
            </View>
          ) : (
            <>
              <View style={styles.statusTopRow}>
                <View style={[styles.statusBadge, { backgroundColor: currentStatusConfig.badgeBg }]}>
                  <Text style={[styles.statusBadgeText, { color: currentStatusConfig.badgeColor }]}>
                    {currentStatusConfig.badge}
                  </Text>
                </View>
                <View style={styles.statusIcon}>
                  <Ionicons name={currentStatusConfig.icon} size={24} color={currentStatusConfig.badgeColor} />
                </View>
              </View>

              <Text style={[styles.statusTitle, { textAlign: textAlignStart }]}>{currentStatusConfig.title}</Text>
              <Text style={[styles.statusDescription, { textAlign: textAlignStart }]}>
                {statusError || currentStatusConfig.description}
              </Text>

              {!!application?.review_notes && (
                <View style={styles.reviewNoteCard}>
                  <Text style={[styles.reviewNoteLabel, { textAlign: textAlignStart }]}>ملاحظة المشرف العام</Text>
                  <Text style={[styles.reviewNoteText, { textAlign: textAlignStart }]}>{application.review_notes}</Text>
                </View>
              )}
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>أدوات النشاط</Text>
          {managementActions.map((action) => (
            <AppListCard
              key={action.id}
              title={action.label}
              subtitle={action.subtitle}
              mediaIcon={action.icon}
              mediaColor={colors.primary}
              metaLabel="STATUS"
              metaValue={currentStatusConfig.badge}
              actionLabel={action.screen ? 'فتح' : 'من خلال الويب'}
              onPress={() => {
                if (action.screen) {
                  navigation.navigate(action.screen);
                }
              }}
            />
          ))}
        </View>

        <View style={styles.portalHintCard}>
          <Text style={[styles.portalHintTitle, { textAlign: textAlignStart }]}>رابط بوابة البائع</Text>
          <Text style={[styles.portalHintText, { textAlign: textAlignStart }]}>
            بعد الموافقة من المشرف العام، يدخل البائع إلى بوابة الويب باستخدام رقم الجوال نفسه لإدارة الخدمات والأسعار والتوافر.
          </Text>
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
  heroEyebrow: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  heroTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 24,
    marginTop: spacing.sm,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.sm,
    lineHeight: 22,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  heroMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.md,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  statusTopRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  statusBadgeText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginTop: spacing.md,
    textAlign: 'right',
  },
  statusDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 23,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  reviewNoteCard: {
    marginTop: spacing.md,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    padding: spacing.md,
  },
  reviewNoteLabel: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: 'right',
  },
  reviewNoteText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 18,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  portalHintCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    ...shadows.sm,
  },
  portalHintTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 16,
    textAlign: 'right',
  },
  portalHintText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
});

export default VendorAppScreen;
