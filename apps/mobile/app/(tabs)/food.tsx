import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { CuisineCategories, FeaturedRestaurants } from '@/constants/Data';
import { CuisineCategory } from '@/components/CuisineCategory';
import { RestaurantCard } from '@/components/RestaurantCard';

export default function FoodScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Order Food</Text>
          <Text style={styles.headerSubtitle}>
            Discover delicious meals near you
          </Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search restaurants or cuisines"
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Address Selector */}
        <TouchableOpacity style={styles.addressSelector}>
          <Text style={styles.addressIcon}>📍</Text>
          <View style={styles.addressContent}>
            <Text style={styles.addressLabel}>Delivery to</Text>
            <Text style={styles.addressText}>King Fahd Road, Riyadh</Text>
          </View>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>

        {/* Cuisine Categories */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CuisineCategories.map((category) => (
              <CuisineCategory
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Promotional Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>50% Off</Text>
            <Text style={styles.promoSubtitle}>On your first food order</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.promoEmoji}>🍔</Text>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Restaurants</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {FeaturedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentOrder}>
            <View style={styles.recentOrderImage}>
              <Text style={styles.recentOrderEmoji}>🍗</Text>
            </View>
            <View style={styles.recentOrderContent}>
              <Text style={styles.recentOrderName}>Al Baik</Text>
              <Text style={styles.recentOrderItems}>2 items • Spicy Chicken</Text>
              <Text style={styles.recentOrderDate}>Yesterday, 8:15 PM</Text>
            </View>
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderButtonText}>Reorder</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentOrder}>
            <View style={styles.recentOrderImage}>
              <Text style={styles.recentOrderEmoji}>🍕</Text>
            </View>
            <View style={styles.recentOrderContent}>
              <Text style={styles.recentOrderName}>Pizza Hut</Text>
              <Text style={styles.recentOrderItems}>3 items • Pepperoni Pizza</Text>
              <Text style={styles.recentOrderDate}>Mar 10, 2024</Text>
            </View>
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderButtonText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Colors.Shadows.sm,
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    paddingHorizontal: 14,
    ...Colors.Shadows.sm,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 12,
  },
  clearIcon: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Colors.Shadows.sm,
  },
  filterIcon: {
    fontSize: 20,
  },
  addressSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addressIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  categoriesContainer: {
    paddingVertical: 4,
  },
  promoBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Colors.Shadows.lg,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textInverse,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: Colors.textInverse,
    opacity: 0.9,
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: Colors.textInverse,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  promoEmoji: {
    fontSize: 60,
    marginLeft: 16,
  },
  recentOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    ...Colors.Shadows.sm,
  },
  recentOrderImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  recentOrderEmoji: {
    fontSize: 28,
  },
  recentOrderContent: {
    flex: 1,
  },
  recentOrderName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  recentOrderItems: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  recentOrderDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  reorderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: `${Colors.primary}08`,
    borderRadius: 10,
  },
  reorderButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  bottomPadding: {
    height: 20,
  },
});
