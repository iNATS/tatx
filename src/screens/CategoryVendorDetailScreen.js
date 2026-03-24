import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import ItemDetailModal from '../components/ItemDetailModal';
import PriceDisplay from '../components/PriceDisplay';

const CategoryVendorDetailScreen = ({ route, navigation }) => {
  const { store, categoryName } = route.params || {};
  const { addToCart, rowDirection, textAlignStart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return (store?.items || []).filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, store]);

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
        searchPlaceholder={categoryName === 'مطاعم' ? 'ابحث عن وجبة داخل المطعم' : 'ابحث عن هدية داخل المتجر'}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Image source={{ uri: store.image }} style={styles.cover} />

        {filteredItems.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.itemRow, { flexDirection: rowDirection }]} activeOpacity={0.92} onPress={() => setSelectedItem(item)}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemBody}>
              <Text style={[styles.itemName, { textAlign: textAlignStart }]}>{item.name}</Text>
              <Text style={[styles.itemDescription, { textAlign: textAlignStart }]}>{item.description}</Text>
              <View style={[styles.itemBottom, { flexDirection: rowDirection }]}>
                <TouchableOpacity style={styles.button} onPress={() => setSelectedItem(item)}>
                  <Ionicons name="bag-add-outline" size={18} color={colors.white} />
                  <Text style={styles.buttonText}>عرض</Text>
                </TouchableOpacity>
                <PriceDisplay value={item.price} color={colors.primary} size={18} iconSize={14} bold />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ItemDetailModal visible={!!selectedItem} item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  cover: { width: '100%', height: 200, borderRadius: 26, backgroundColor: colors.cardSecondary, marginBottom: spacing.md },
  itemRow: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm },
  itemImage: { width: 100, height: 100, borderRadius: 20, backgroundColor: colors.cardSecondary },
  itemBody: { flex: 1, marginHorizontal: spacing.md, justifyContent: 'space-between' },
  itemName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  itemDescription: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: spacing.xs },
  itemBottom: { justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  button: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: 14, paddingVertical: 10 },
  buttonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13 },
});

export default CategoryVendorDetailScreen;
