import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';
import { products } from '../data/staticData';
import { useApp } from '../context/AppContext';

const ProductScreen = ({ navigation }) => {
  const { isRTL, addToCart, cartCount } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['الكل', 'اطعمة', 'البان', 'عنايه شخصية'];

  const filteredProducts = products.filter((product) => {
    const matchesFilter = selectedFilter === 'الكل' || product.category === selectedFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cartTotal = filteredProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>أسواق النخبة</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartButton}>
            <Ionicons name="cart" size={24} color={colors.white} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="البحث عن المنتج بالأسم"
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.tabActive}>السوبرماركت</Text>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filter, selectedFilter === filter && styles.filterActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.productsScroll}>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>ر.س {product.price}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    });
                  }}
                >
                  <Ionicons name="cart-outline" size={20} color={colors.white} />
                  <Text style={styles.addButtonText}>اضف الى السلة</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.cartSummary}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartSummaryText}>
            {cartCount} منتج
          </Text>
          <Text style={styles.cartSummaryText}>عرض السلة</Text>
          <Text style={styles.cartSummaryText}>ر.س {cartTotal}</Text>
        </TouchableOpacity>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  tabs: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  tabActive: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'right',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.sm,
  },
  filtersContainer: {
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filter: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.grayLight,
    marginHorizontal: spacing.xs,
  },
  filterActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  productsScroll: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    gap: spacing.sm,
  },
  productCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.grayLight,
  },
  productInfo: {
    padding: spacing.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'right',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.md,
    paddingBottom: spacing.lg + 10,
  },
  cartSummaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default ProductScreen;
