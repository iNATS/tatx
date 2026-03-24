import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { getCategoryImage } from '../utils/placeholderImages';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';

const categoryItems = {
  'طعام': [
    { id: '1', name: 'وجبة برجر', price: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', rating: 4.5, time: '30 دقيقة', description: 'وجبة برجر لذيذة مع بطاطس ومشروب' },
    { id: '2', name: 'بيتزا كبيرة', price: 45, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rating: 4.8, time: '40 دقيقة', description: 'بيتزا كبيرة بـ 8 قطع' },
    { id: '3', name: 'شاورما عربي', price: 18, image: 'https://images.unsplash.com/photo-1626777552726-456c5ca36c25?w=400', rating: 4.4, time: '20 دقيقة', description: 'شاورما دجاج مع بطاطس' },
  ],
  'صيدلية': [
    { id: '1', name: 'مسكن ألم', price: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', rating: 4.6, time: '20 دقيقة', description: 'مسكن ألم سريع المفعول' },
    { id: '2', name: 'فيتامينات', price: 45, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400', rating: 4.8, time: '20 دقيقة', description: 'فيتامينات متعددة' },
  ],
  'هدايا': [
    { id: '1', name: 'باقة ورد', price: 150, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ee0?w=400', rating: 4.9, time: '60 دقيقة', description: 'باقة ورد طازج' },
    { id: '2', name: 'صندوق شوكولاتة', price: 85, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', rating: 4.7, time: '45 دقيقة', description: 'صندوق شوكولاتة فاخرة' },
  ],
};

const sorters = [
  { id: 'all', label: 'الكل' },
  { id: 'popular', label: 'الأعلى تقييماً' },
  { id: 'price_low', label: 'السعر الأقل' },
  { id: 'price_high', label: 'السعر الأعلى' },
];

const CategoryScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { addToCart, formatCurrency, rowDirection, textAlignStart, isRTL } = useApp();
  const { name = 'طعام' } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSorter, setSelectedSorter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back';

  const items = categoryItems[name] || categoryItems['طعام'];

  const filteredItems = useMemo(() => {
    const base = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedSorter === 'popular') return [...base].sort((a, b) => b.rating - a.rating);
    if (selectedSorter === 'price_low') return [...base].sort((a, b) => a.price - b.price);
    if (selectedSorter === 'price_high') return [...base].sort((a, b) => b.price - a.price);
    return base;
  }, [items, searchQuery, selectedSorter]);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image source={{ uri: getCategoryImage(name) }} style={styles.heroImage} />
        <LinearGradient colors={['rgba(0,0,0,0.58)', 'rgba(0,0,0,0.24)']} style={styles.heroOverlay} />
        <View style={[styles.heroContent, { paddingTop: insets.top + spacing.sm }]}>
          <View style={styles.heroTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.heroButton}>
              <Ionicons name={backIcon} size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedSorter('all')} style={styles.heroButton}>
              <Ionicons name="options-outline" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.heroTitle}>{name}</Text>
          <Text style={styles.heroSubtitle}>{items.length} عناصر متاحة</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, { flexDirection: rowDirection }]}>
          <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { textAlign: textAlignStart }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="ابحث داخل القسم"
            placeholderTextColor={colors.textTertiary}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.sortersRow, { flexDirection: rowDirection }]}>
        {sorters.map((sorter) => (
          <TouchableOpacity
            key={sorter.id}
            style={[styles.sorterChip, selectedSorter === sorter.id && styles.sorterChipActive]}
            onPress={() => setSelectedSorter(sorter.id)}
          >
            <Text style={[styles.sorterText, selectedSorter === sorter.id && styles.sorterTextActive]}>{sorter.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredItems.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.itemRow, { flexDirection: rowDirection }]} onPress={() => setSelectedItem(item)} activeOpacity={0.9}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemBody}>
              <View style={[styles.itemTop, { flexDirection: rowDirection }]}>
                <TouchableOpacity onPress={() => Alert.alert('المفضلة', 'تمت إضافة العنصر إلى المفضلة.')}>
                  <Ionicons name="heart-outline" size={20} color={colors.textTertiary} />
                </TouchableOpacity>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { textAlign: textAlignStart }]}>{item.name}</Text>
                  <Text style={[styles.itemDescription, { textAlign: textAlignStart }]}>{item.description}</Text>
                </View>
              </View>
              <View style={[styles.itemBottom, { flexDirection: rowDirection }]}>
                <TouchableOpacity style={styles.addButton} onPress={() => setSelectedItem(item)}>
                  <Ionicons name="add" size={18} color={colors.white} />
                </TouchableOpacity>
                <View style={styles.metaWrap}>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <View style={[styles.ratingWrap, { flexDirection: rowDirection }]}>
                    <Ionicons name="star" size={13} color={colors.warning} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ItemDetailModal
        visible={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { height: 210 },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  heroContent: { flex: 1, paddingHorizontal: spacing.md, justifyContent: 'space-between', paddingBottom: spacing.lg },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between' },
  heroButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 28, textAlign: 'right' },
  heroSubtitle: { color: 'rgba(255,255,255,0.88)', textAlign: 'right' },
  searchWrap: { paddingHorizontal: spacing.md, marginTop: -18 },
  searchBar: { backgroundColor: colors.card, borderRadius: 22, minHeight: 52, paddingHorizontal: spacing.md, flexDirection: 'row-reverse', alignItems: 'center', ...shadows.sm },
  searchInput: { flex: 1, textAlign: 'right', color: colors.text, marginHorizontal: spacing.sm },
  sortersRow: { gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  sorterChip: { backgroundColor: colors.card, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10 },
  sorterChipActive: { backgroundColor: colors.primary },
  sorterText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  sorterTextActive: { color: colors.white },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  itemRow: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, flexDirection: 'row-reverse', ...shadows.sm },
  itemImage: { width: 94, height: 94, borderRadius: 20, backgroundColor: colors.cardSecondary },
  itemBody: { flex: 1, marginRight: spacing.md, justifyContent: 'space-between' },
  itemTop: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
  itemInfo: { flex: 1, alignItems: 'flex-end', marginLeft: spacing.sm },
  itemName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, textAlign: 'right' },
  itemDescription: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', lineHeight: 18 },
  itemBottom: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  addButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  metaWrap: { alignItems: 'flex-end' },
  timeText: { color: colors.textSecondary, fontSize: 12 },
  ratingWrap: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: 4, gap: 4 },
  ratingText: { color: colors.textSecondary, fontSize: 12 },
  price: { color: colors.primary, fontFamily: fonts.bold, fontSize: 17, marginTop: 4 },
});

export default CategoryScreen;
