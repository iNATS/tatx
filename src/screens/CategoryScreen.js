import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

// Demo data for categories
const categoryItems = {
  'طعام': [
    { id: '1', name: 'وجبة برجر', price: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', rating: 4.5, time: '30 دق' },
    { id: '2', name: 'بيتزا كبيرة', price: 45, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300', rating: 4.8, time: '40 دق' },
    { id: '3', name: 'أرز بختي', price: 35, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300', rating: 4.6, time: '35 دق' },
    { id: '4', name: 'شاورما', price: 18, image: 'https://images.unsplash.com/photo-1626777552726-456c5ca36c25?w=300', rating: 4.4, time: '20 دق' },
  ],
  'سوبرماركت': [
    { id: '1', name: 'حليب طازج', price: 8, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300', rating: 4.7, time: '15 دق' },
    { id: '2', name: 'خبز توست', price: 6, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', rating: 4.5, time: '15 دق' },
    { id: '3', name: 'بيض طازج', price: 12, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300', rating: 4.8, time: '15 دق' },
  ],
  'صيدلية': [
    { id: '1', name: 'مسكن ألم', price: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', rating: 4.6, time: '20 دق' },
    { id: '2', name: 'فيتامينات', price: 45, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300', rating: 4.8, time: '20 دق' },
  ],
  'بقالة': [
    { id: '1', name: 'أرز بسمتي', price: 35, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300', rating: 4.5, time: '25 دق' },
    { id: '2', name: 'زيت طهي', price: 22, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300', rating: 4.4, time: '25 دق' },
  ],
  'هدايا': [
    { id: '1', name: 'باقة ورد', price: 150, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ee0?w=300', rating: 4.9, time: '60 دق' },
    { id: '2', name: 'صندوق شوكولاتة', price: 85, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300', rating: 4.7, time: '45 دق' },
  ],
  'إلكترونيات': [
    { id: '1', name: 'سماعة بلوتوث', price: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', rating: 4.6, time: '30 دق' },
    { id: '2', name: 'شاحن سريع', price: 79, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300', rating: 4.5, time: '30 دق' },
  ],
  'أزياء': [
    { id: '1', name: 'قميص رجالي', price: 120, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', rating: 4.4, time: '40 دق' },
    { id: '2', name: 'حذاء رياضي', price: 299, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', rating: 4.7, time: '45 دق' },
  ],
  'المنزل': [
    { id: '1', name: 'طقم مناشف', price: 89, image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=300', rating: 4.5, time: '35 دق' },
    { id: '2', name: 'وسادة مريحة', price: 65, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=300', rating: 4.6, time: '35 دق' },
  ],
};

const CategoryScreen = ({ route, navigation }) => {
  const { name, icon, color } = route.params || { name: 'الكل', icon: 'apps', color: colors.primary };
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('الكل');

  const items = categoryItems[name] || categoryItems['طعام'] || [];
  
  const filters = ['الكل', 'الأكثر شعبية', 'السعر: الأقل', 'السعر: الأعلى'];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm), backgroundColor: color || colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerSubtitle}>{items.length} منتج متاح</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="filter" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن منتج..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive,
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContent}
      >
        <View style={styles.productsGrid}>
          {filteredItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              activeOpacity={0.8}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistBtn}>
                  <Ionicons name="heart-outline" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <View style={styles.productMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color={colors.warning} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <View style={styles.time}>
                    <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{item.price} ر.س</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={18} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  filtersContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  productsContent: {
    padding: spacing.sm,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.grayLight,
  },
  wishlistBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    minHeight: 36,
    textAlign: 'right',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
});

export default CategoryScreen;
