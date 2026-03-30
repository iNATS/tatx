import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { getStoreItemCount } from '../data/vendorCatalog';
import PageHeader from '../components/PageHeader';
import ItemDetailModal from '../components/ItemDetailModal';
import AppListCard from '../components/AppListCard';

const CategoryVendorDetailScreen = ({ route, navigation }) => {
  const { store, categoryName } = route.params || {};
  const { addToCart, rowDirection, textAlignStart, formatCurrency } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('all');

  const groups = useMemo(() => {
    if (!store?.menuGroups?.length) {
      return [];
    }

    return [
      { id: 'all', label: 'الكل', icon: 'apps-outline' },
      ...store.menuGroups.map((group) => ({
        id: group.id,
        label: group.title,
      })),
    ];
  }, [store]);

  const filteredGroups = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return (store?.menuGroups || [])
      .map((group) => ({
        ...group,
        items: (group.items || []).filter((item) => {
          const matchesSearch =
            !normalizedSearch ||
            item.name.toLowerCase().includes(normalizedSearch) ||
            (item.description || '').toLowerCase().includes(normalizedSearch);
          const matchesGroup = selectedGroup === 'all' || selectedGroup === group.id;
          return matchesSearch && matchesGroup;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, selectedGroup, store]);

  if (!store) {
    return <View style={styles.container}><PageHeader navigation={navigation} title="التفاصيل" subtitle="لا توجد بيانات" /></View>;
  }

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title={store.name}
        subtitle={`${categoryName} • ${store.cuisine || store.subtitle}`}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={groups}
        selectedFilter={selectedGroup}
        onSelectFilter={setSelectedGroup}
        searchPlaceholder={categoryName === 'مطاعم' ? 'ابحث عن وجبة داخل المطعم' : categoryName === 'مقاهي' ? 'ابحث عن مشروب أو حلوى' : 'ابحث عن منتج داخل المتجر'}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.coverCard}>
          <Image source={{ uri: store.image }} style={styles.cover} />
          <LinearGradient colors={['rgba(17,24,39,0.1)', 'rgba(17,24,39,0.72)']} style={styles.coverOverlay} />
          <View style={styles.coverContent}>
            {!!store.badges?.length && (
              <ScrollView horizontal inverted showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesRow}>
                {store.badges.map((badge) => (
                  <View key={badge} style={styles.badgeChip}>
                    <Text style={styles.badgeChipText}>{badge}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
            <Text style={styles.coverTitle}>{store.name}</Text>
            <Text style={styles.coverSubtitle}>{store.cuisine || store.subtitle}</Text>
          </View>
        </View>

        <View style={styles.promoCard}>
          <Text style={styles.promoLabel}>عرض المطعم</Text>
          <Text style={styles.promoValue}>{store.promo || 'منيو كامل مع عروض يومية داخل التطبيق'}</Text>
        </View>

        <View style={[styles.metricsRow, { flexDirection: rowDirection }]}>
          <View style={styles.metricCard}>
            <Ionicons name="star" size={18} color={colors.warning} />
            <Text style={styles.metricValue}>{store.rating || 4.7}</Text>
            <Text style={styles.metricLabel}>التقييم</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.metricValue}>{store.deliveryTime || '25-35 دقيقة'}</Text>
            <Text style={styles.metricLabel}>الوقت</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="bicycle-outline" size={18} color={colors.success} />
            <Text style={styles.metricValue}>{formatCurrency(store.deliveryFee || 0)}</Text>
            <Text style={styles.metricLabel}>التوصيل</Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { flexDirection: rowDirection }]}>
          <View style={styles.summaryBadge}>
            <Ionicons name={categoryName === 'مطاعم' ? 'restaurant-outline' : categoryName === 'مقاهي' ? 'cafe-outline' : 'storefront-outline'} size={20} color={colors.primary} />
          </View>
          <View style={styles.summaryText}>
            <Text style={[styles.summaryTitle, { textAlign: textAlignStart }]}>قائمة المطعم</Text>
            <Text style={[styles.summarySubtitle, { textAlign: textAlignStart }]}>
              {store.menuGroups?.length || 0} مجموعات • {getStoreItemCount(store)} صنف • الحد الأدنى {formatCurrency(store.minimumOrder || 0)}
            </Text>
          </View>
        </View>

        {filteredGroups.map((group) => (
          <View key={group.id} style={styles.groupSection}>
            <View style={[styles.groupHeader, { flexDirection: rowDirection }]}>
              <Text style={styles.groupCount}>{group.items.length} أصناف</Text>
              <Text style={[styles.groupTitle, { textAlign: textAlignStart }]}>{group.title}</Text>
            </View>

            {group.items.map((item) => (
              <AppListCard
                key={item.id}
                title={item.name}
                subtitle={item.description}
                secondaryMeta={item.time}
                badge={item.tag}
                metaLabel={item.rating ? `التقييم ${item.rating}` : 'السعر'}
                metaValue={formatCurrency(item.price)}
                imageUri={item.image}
                actionLabel="إضافة"
                actionIcon="bag-add-outline"
                onPress={() => setSelectedItem(item)}
                onActionPress={() => setSelectedItem(item)}
              />
            ))}
          </View>
        ))}

        {!filteredGroups.length && (
          <View style={styles.emptyCard}>
            <Ionicons name="search-outline" size={28} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>لا توجد نتائج مطابقة</Text>
            <Text style={styles.emptySubtitle}>جرّب البحث باسم صنف آخر أو اختر مجموعة مختلفة.</Text>
          </View>
        )}
      </ScrollView>

      <ItemDetailModal visible={!!selectedItem} item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  coverCard: { height: 220, borderRadius: 28, overflow: 'hidden', marginBottom: spacing.md, ...shadows.md },
  cover: { width: '100%', height: '100%', backgroundColor: colors.cardSecondary, position: 'absolute' },
  coverOverlay: { ...StyleSheet.absoluteFillObject },
  coverContent: { flex: 1, justifyContent: 'space-between', padding: spacing.md, paddingTop: spacing.lg },
  badgesRow: { gap: spacing.sm },
  badgeChip: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: borderRadius.full, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  badgeChipText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 11, textAlign: 'right' },
  coverTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 26, textAlign: 'right' },
  coverSubtitle: { color: 'rgba(255,255,255,0.86)', fontSize: 13, textAlign: 'right', marginTop: 6 },
  promoCard: { backgroundColor: '#FFF0F3', borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderLight },
  promoLabel: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12, textAlign: 'right' },
  promoValue: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right', marginTop: 6, lineHeight: 22 },
  metricsRow: { gap: spacing.sm, marginBottom: spacing.md },
  metricCard: { flex: 1, backgroundColor: colors.card, borderRadius: 22, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.borderLight, ...shadows.sm },
  metricValue: { color: colors.text, fontFamily: fonts.bold, fontSize: 13, textAlign: 'center', marginTop: 8 },
  metricLabel: { color: colors.textSecondary, fontSize: 11, textAlign: 'center', marginTop: 4 },
  summaryCard: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, alignItems: 'center', marginBottom: spacing.lg, ...shadows.sm },
  summaryBadge: { width: 52, height: 52, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  summaryText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  summaryTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 16, alignSelf: 'stretch' },
  summarySubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, alignSelf: 'stretch' },
  groupSection: { marginBottom: spacing.lg },
  groupHeader: { justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  groupTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 20 },
  groupCount: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12 },
  emptyCard: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, alignItems: 'center', ...shadows.sm },
  emptyTitle: { marginTop: spacing.md, color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  emptySubtitle: { marginTop: 6, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
});

export default CategoryVendorDetailScreen;
