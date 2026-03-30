import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { getStoreItemCount } from '../data/vendorCatalog';
import PageHeader from '../components/PageHeader';
import ItemDetailModal from '../components/ItemDetailModal';
import PriceDisplay from '../components/PriceDisplay';

const CategoryVendorDetailScreen = ({ route, navigation }) => {
  const { store, categoryName } = route.params || {};
  const { addToCart, rowDirection, textAlignStart } = useApp();
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
        subtitle={`${categoryName} • ${store.subtitle}`}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={groups}
        selectedFilter={selectedGroup}
        onSelectFilter={setSelectedGroup}
        searchPlaceholder={categoryName === 'مطاعم' ? 'ابحث عن وجبة داخل المطعم' : categoryName === 'مقاهي' ? 'ابحث عن مشروب أو حلوى' : 'ابحث عن منتج داخل المتجر'}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Image source={{ uri: store.image }} style={styles.cover} />

        <View style={[styles.summaryCard, { flexDirection: rowDirection }]}>
          <View style={styles.summaryBadge}>
            <Ionicons name={categoryName === 'مطاعم' ? 'restaurant-outline' : categoryName === 'مقاهي' ? 'cafe-outline' : 'storefront-outline'} size={20} color={colors.primary} />
          </View>
          <View style={styles.summaryText}>
            <Text style={[styles.summaryTitle, { textAlign: textAlignStart }]}>منيو كامل منظم بالمجموعات</Text>
            <Text style={[styles.summarySubtitle, { textAlign: textAlignStart }]}>
              {store.menuGroups?.length || 0} مجموعات • {getStoreItemCount(store)} عناصر قابلة للإضافة للسلة
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
              <TouchableOpacity key={item.id} style={[styles.itemRow, { flexDirection: rowDirection }]} activeOpacity={0.92} onPress={() => setSelectedItem(item)}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemBody}>
                  <Text style={[styles.itemName, { textAlign: textAlignStart }]}>{item.name}</Text>
                  <Text style={[styles.itemDescription, { textAlign: textAlignStart }]}>{item.description}</Text>
                  <View style={[styles.itemBottom, { flexDirection: rowDirection }]}>
                    <PriceDisplay value={item.price} color={colors.primary} size={18} iconSize={14} bold />
                    <TouchableOpacity style={styles.button} onPress={() => setSelectedItem(item)}>
                      <Ionicons name="bag-add-outline" size={18} color={colors.white} />
                      <Text style={styles.buttonText}>عرض</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
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
  cover: { width: '100%', height: 200, borderRadius: 26, backgroundColor: colors.cardSecondary, marginBottom: spacing.md },
  summaryCard: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, alignItems: 'center', marginBottom: spacing.lg, ...shadows.sm },
  summaryBadge: { width: 52, height: 52, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  summaryText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  summaryTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 16, alignSelf: 'stretch' },
  summarySubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, alignSelf: 'stretch' },
  groupSection: { marginBottom: spacing.lg },
  groupHeader: { justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  groupTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 20 },
  groupCount: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12 },
  itemRow: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm },
  itemImage: { width: 100, height: 100, borderRadius: 20, backgroundColor: colors.cardSecondary },
  itemBody: { flex: 1, width: '100%', marginHorizontal: spacing.md, justifyContent: 'space-between', alignItems: 'flex-end' },
  itemName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, textAlign: 'right', alignSelf: 'stretch' },
  itemDescription: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: spacing.xs, textAlign: 'right', alignSelf: 'stretch' },
  itemBottom: { justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  button: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: 14, paddingVertical: 10 },
  buttonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13 },
  emptyCard: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, alignItems: 'center', ...shadows.sm },
  emptyTitle: { marginTop: spacing.md, color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  emptySubtitle: { marginTop: 6, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
});

export default CategoryVendorDetailScreen;
