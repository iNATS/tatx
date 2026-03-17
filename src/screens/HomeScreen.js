import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { categories, restaurants } from '../data/staticData';
import { useApp } from '../context/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { isRTL, user } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Quick services with screens
  const quickServices = [
    { id: 'taxi', name: 'تاكسي', icon: 'taxi', color: colors.primary, screen: 'Taxi' },
    { id: 'food', name: 'طعام', icon: 'fast-food', color: colors.success, screen: 'Category', params: { name: 'طعام' } },
    { id: 'market', name: 'سوبرماركت', icon: 'cart', color: colors.info, screen: 'Category', params: { name: 'سوبرماركت' } },
    { id: 'pharmacy', name: 'صيدلية', icon: 'medkit', color: colors.error, screen: 'Category', params: { name: 'صيدلية' } },
    { id: 'grocery', name: 'بقالة', icon: 'basket', color: colors.green, screen: 'Category', params: { name: 'بقالة' } },
    { id: 'gifts', name: 'هدايا', icon: 'gift', color: colors.warning, screen: 'Category', params: { name: 'هدايا' } },
    { id: 'electronics', name: 'إلكترونيات', icon: 'phone-portrait', color: colors.secondary, screen: 'Category', params: { name: 'إلكترونيات' } },
    { id: 'fashion', name: 'أزياء', icon: 'shirt', color: colors.accent, screen: 'Category', params: { name: 'أزياء' } },
    { id: 'home', name: 'المنزل', icon: 'home', color: colors.info, screen: 'Category', params: { name: 'المنزل' } },
  ];

  // Hero banners
  const heroBanners = [
    { 
      id: '1', 
      title: 'تاتكس ماركت', 
      subtitle: 'تسوق بخصم يصل إلى 50%', 
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600',
      color: colors.primary,
      screen: 'Product'
    },
    { 
      id: '2', 
      title: 'توصيل مجاني', 
      subtitle: 'للطلبات فوق 100 ر.س', 
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      color: colors.success,
      screen: 'Product'
    },
    { 
      id: '3', 
      title: 'عروض حصرية', 
      subtitle: 'لأعضاء تاتكس فقط', 
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600',
      color: colors.accent,
      screen: 'Product'
    },
  ];

  // Featured categories
  const featuredCategories = categories.slice(0, 6);

  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { name: category.name, icon: category.icon, color: category.color });
  };

  const handleQuickService = (service) => {
    if (service.screen === 'Taxi') {
      navigation.navigate('Taxi');
    } else if (service.screen === 'Category') {
      navigation.navigate('Category', service.params);
    } else if (service.screen === 'Product') {
      navigation.navigate('Product');
    }
  };

  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.navigate('Location')} style={styles.locationBtn}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={18} color={colors.white} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>التوصيل إلى</Text>
              <Text style={styles.locationText} numberOfLines={1}>الدمام، شارع الملك عبد العزيز</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Product')} style={styles.actionBtn}>
            <Ionicons name="search" size={22} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.actionBtn}>
            <Ionicons name="notifications" size={22} color={colors.white} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Banner Carousel */}
        <View style={styles.heroSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={SCREEN_WIDTH - spacing.md * 2}
            decelerationRate="fast"
          >
            {heroBanners.map((banner) => (
              <TouchableOpacity
                key={banner.id}
                style={[styles.heroBanner, { backgroundColor: banner.color }]}
                onPress={() => navigation.navigate(banner.screen)}
              >
                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>{banner.title}</Text>
                  <Text style={styles.heroSubtitle}>{banner.subtitle}</Text>
                  <TouchableOpacity style={styles.heroButton}>
                    <Text style={styles.heroButtonText}>تسوق الآن</Text>
                    <Ionicons name="arrow-forward" size={18} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <Image source={{ uri: banner.image }} style={styles.heroImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.heroIndicators}>
            {heroBanners.map((_, index) => (
              <View key={index} style={[styles.indicator, index === 0 && styles.indicatorActive]} />
            ))}
          </View>
        </View>

        {/* Quick Services Grid */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>خدمات تاتكس</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {quickServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceItem}
                onPress={() => handleQuickService(service)}
                activeOpacity={0.8}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon} size={28} color={service.color} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>التصنيفات</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category', { name: 'الكل' })}>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {featuredCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
                    <Ionicons name={category.icon} size={28} color={category.color} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Special Offers Section */}
        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>عروض خاصة</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.offersGrid}>
            <TouchableOpacity style={[styles.offerCard, styles.offerCardLarge, { backgroundColor: colors.primary }]}>
              <View style={styles.offerContent}>
                <Text style={styles.offerPercent}>50%</Text>
                <Text style={styles.offerText}>خصم على المطاعم</Text>
                <Text style={styles.offerSubtext}>لفترة محدودة</Text>
              </View>
              <Ionicons name="fast-food" size={60} color="rgba(255,255,255,0.2)" />
            </TouchableOpacity>
            <View style={styles.offerCardsRight}>
              <TouchableOpacity style={[styles.offerCard, styles.offerCardSmall, { backgroundColor: colors.success }]}>
                <View style={styles.offerContentSmall}>
                  <Text style={styles.offerTextSmall}>توصيل مجاني</Text>
                  <Text style={styles.offerSubtextSmall}>الطلبات فوق 100 ر.س</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.offerCard, styles.offerCardSmall, { backgroundColor: colors.warning }]}>
                <View style={styles.offerContentSmall}>
                  <Text style={styles.offerTextSmall}>عرض اليوم</Text>
                  <Text style={styles.offerSubtextSmall}>خصم 30%</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Popular Restaurants */}
        <View style={styles.restaurantsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المطاعم الشهيرة</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.restaurantCards}>
              {restaurants.slice(0, 5).map((restaurant, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.restaurantCard}
                  onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
                >
                  <Image source={{ uri: restaurant.logo }} style={styles.restaurantCardImage} />
                  <View style={styles.restaurantCardInfo}>
                    <Text style={styles.restaurantCardName}>{restaurant.name}</Text>
                    <View style={styles.restaurantCardMeta}>
                      <Ionicons name="star" size={14} color={colors.warning} />
                      <Text style={styles.restaurantCardRating}>{restaurant.rating}</Text>
                      <Text style={styles.restaurantCardDot}>•</Text>
                      <Text style={styles.restaurantCardTime}>{restaurant.deliveryTime} دق</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Download App Banner */}
        <View style={styles.downloadBanner}>
          <View style={styles.downloadContent}>
            <View style={styles.downloadIcon}>
              <Ionicons name="download" size={32} color={colors.white} />
            </View>
            <View style={styles.downloadText}>
              <Text style={styles.downloadTitle}>حمّل تطبيق تاتكس</Text>
              <Text style={styles.downloadSubtitle}>واحصل على خصم 20% على أول طلب</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadBtnText}>تحميل</Text>
          </TouchableOpacity>
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
    backgroundColor: colors.primary,
    paddingBottom: spacing.md,
  },
  headerTop: {
    paddingHorizontal: spacing.md,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  locationTextContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  actionBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Hero Section
  heroSection: {
    marginVertical: spacing.md,
  },
  heroBanner: {
    width: SCREEN_WIDTH - spacing.md * 2,
    height: 180,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    ...shadows.md,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  heroImage: {
    width: 140,
    height: '100%',
    borderRadius: borderRadius.lg,
  },
  heroIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray,
  },
  indicatorActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
  // Services Section
  servicesSection: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '23%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  serviceName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  // Categories Section
  categoriesSection: {
    marginBottom: spacing.lg,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  categoryItem: {
    alignItems: 'center',
    padding: spacing.sm,
    minWidth: 85,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Offers Section
  offersSection: {
    marginBottom: spacing.lg,
  },
  offersGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  offerCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.md,
  },
  offerCardLarge: {
    flex: 1.5,
    height: 140,
  },
  offerCardSmall: {
    flex: 1,
    height: 66,
    marginBottom: spacing.sm,
  },
  offerCardsRight: {
    flex: 1,
  },
  offerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  offerPercent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
  },
  offerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  offerSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  offerContentSmall: {
    justifyContent: 'center',
  },
  offerTextSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  offerSubtextSmall: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  // Restaurants Section
  restaurantsSection: {
    marginBottom: spacing.lg,
  },
  restaurantCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  restaurantCard: {
    width: 170,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  restaurantCardImage: {
    width: '100%',
    height: 110,
    backgroundColor: colors.grayLight,
  },
  restaurantCardInfo: {
    padding: spacing.sm,
  },
  restaurantCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  restaurantCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  restaurantCardRating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  restaurantCardDot: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  restaurantCardTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  // Download Banner
  downloadBanner: {
    backgroundColor: colors.secondary,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.md,
  },
  downloadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  downloadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  downloadText: {
    flex: 1,
  },
  downloadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  downloadSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  downloadBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
  },
  downloadBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
});

export default HomeScreen;
