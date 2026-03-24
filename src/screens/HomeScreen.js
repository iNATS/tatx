import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';
import {
  homeServices,
  homeOffers,
  restaurants,
  featuredProducts,
  products,
  demoMarket,
  stayBookingOptions,
} from '../data/staticData';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';
import PriceDisplay from '../components/PriceDisplay';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, addToCart, cartCount, rowDirection, textAlignStart } = useApp();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleServicePress = (service) => {
    if (service.screen === 'Shop') {
      navigation.navigate('Shop');
      return;
    }

    navigation.navigate(service.screen, service.params);
  };

  const handleProductPress = (product) => {
    setSelectedItem(product);
    setShowItemModal(true);
  };

  const bookingShowcase = stayBookingOptions.slice(0, 3);
  const marketHighlights = products.slice(0, 3);
  const pharmacyHighlights = [
    { id: 'ph1', name: 'مسكن ألم سريع', subtitle: 'توصيل خلال نفس اليوم', screen: 'Category', params: { name: 'صيدلية' } },
    { id: 'ph2', name: 'فيتامينات يومية', subtitle: 'منتجات عناية وصحة', screen: 'Category', params: { name: 'صيدلية' } },
  ];
  const doctorHighlights = [
    { id: 'd1', name: 'طب أسرة', subtitle: 'حجز كشف ومتابعة', action: () => navigation.navigate('DoctorBooking') },
    { id: 'd2', name: 'جلدية', subtitle: 'مواعيد حضوري وأونلاين', action: () => navigation.navigate('DoctorBooking') },
  ];
  const wholesaleHighlights = [
    { id: 'w1', name: 'مواد غذائية', subtitle: 'كميات للمطاعم والمكاتب', action: () => navigation.navigate('Wholesale') },
    { id: 'w2', name: 'مستهلكات وعناية', subtitle: 'توريد شهري ومنتظم', action: () => navigation.navigate('Wholesale') },
  ];
  const businessServices = [
    {
      id: 'vendor-app',
      title: 'تطبيق مقدم الخدمة',
      subtitle: 'واجهة واحدة تتبدل حسب نشاط المطعم، الفندق، الشاليه، القاعة، أو العيادة.',
      icon: 'storefront-outline',
      action: () => navigation.navigate('VendorApp'),
    },
    {
      id: 'wholesale-flow',
      title: 'حلول الجملة والأعمال',
      subtitle: 'طلب كميات كبيرة، متابعة العروض، وإدارة الاحتياجات التجارية اليومية.',
      icon: 'layers-outline',
      action: () => navigation.navigate('Wholesale'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: 140 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        <View style={[styles.topBar, { flexDirection: rowDirection }]}>
          <View style={styles.avatarShell}>
            <Image source={require('../../assets/logo.png')} style={styles.avatarLogo} resizeMode="contain" />
          </View>
          <View style={styles.topBarText}>
            <Text style={[styles.welcomeText, { textAlign: textAlignStart }]}>أهلاً، {user?.name || 'ضيفنا'}</Text>
            <Text style={[styles.locationText, { textAlign: textAlignStart }]}>دائما معك • {demoMarket.city}، {user?.district || demoMarket.district}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.85} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchCard} activeOpacity={0.85} onPress={() => navigation.navigate('Shop')}>
          <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
          <Text style={styles.searchPlaceholder}>ابحث عن مطعم، منتج، أو خدمة</Text>
          <View style={styles.searchChip}>
            <Text style={styles.searchChipText}>Apple Pay</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>الخدمات</Text>
          <Text style={styles.sectionLink}>اختصارات سريعة</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.servicesRow, { flexDirection: rowDirection }]}>
          {homeServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceChip} activeOpacity={0.88} onPress={() => handleServicePress(service)}>
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}15` }]}>
                <Ionicons name={service.icon} size={20} color={service.color} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>عروض مختارة</Text>
          <Text style={styles.sectionLink}>مخصصة للرياض</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {homeOffers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerCard} activeOpacity={0.88} onPress={() => navigation.navigate('Category', { name: 'طعام' })}>
              <Image source={{ uri: offer.image }} style={styles.offerImage} />
              <LinearGradient colors={offer.overlay} style={styles.offerOverlay}>
                <Text style={styles.offerVendor}>{offer.vendor}</Text>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                <Text style={styles.offerValid}>{offer.valid}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('StayBooking')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>قسم الحجوزات والإقامة</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {bookingShowcase.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('StayBookingDetail', { booking })}
            >
              <Image source={{ uri: booking.image }} style={styles.bookingImage} />
              <View style={styles.bookingOverlay}>
                <Text style={styles.bookingArea}>{booking.area}</Text>
                <Text style={styles.bookingTitle}>{booking.title}</Text>
                <PriceDisplay value={booking.price} color={colors.white} size={14} iconSize={12} bold align="row-reverse" style={styles.bookingPriceWrap} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('DoctorBooking')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>قسم الدكتور</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {doctorHighlights.map((item) => (
            <TouchableOpacity key={item.id} style={styles.quickSectionCard} onPress={item.action}>
              <View style={styles.quickSectionIcon}>
                <Ionicons name="medkit-outline" size={22} color={colors.primary} />
              </View>
              <Text style={styles.quickSectionTitle}>{item.name}</Text>
              <Text style={styles.quickSectionSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Wholesale')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>قسم الجملة</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {wholesaleHighlights.map((item) => (
            <TouchableOpacity key={item.id} style={styles.quickSectionCard} onPress={item.action}>
              <View style={styles.quickSectionIcon}>
                <Ionicons name="layers-outline" size={22} color={colors.primary} />
              </View>
              <Text style={styles.quickSectionTitle}>{item.name}</Text>
              <Text style={styles.quickSectionSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>قسم الماركت</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {marketHighlights.map((item) => (
            <TouchableOpacity key={item.id} style={styles.marketCard} onPress={() => handleProductPress(item)}>
              <Image source={{ uri: item.image }} style={styles.marketCardImage} />
              <Text style={styles.marketCardTitle} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.marketCardSubtitle}>{item.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Category', { name: 'صيدلية' })}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>قسم الصيدلية</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {pharmacyHighlights.map((item) => (
            <TouchableOpacity key={item.id} style={styles.quickSectionCard} onPress={() => navigation.navigate(item.screen, item.params)}>
              <View style={styles.quickSectionIcon}>
                <Ionicons name="medkit-outline" size={22} color={colors.primary} />
              </View>
              <Text style={styles.quickSectionTitle}>{item.name}</Text>
              <Text style={styles.quickSectionSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>متاجر موصى بها</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        {restaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={[styles.restaurantCard, { flexDirection: rowDirection }]} activeOpacity={0.85} onPress={() => navigation.navigate('Category', { name: restaurant.category })}>
            <Image source={{ uri: restaurant.logo }} style={styles.restaurantLogo} />
            <View style={styles.restaurantText}>
              <Text style={[styles.restaurantName, { textAlign: textAlignStart }]}>{restaurant.name}</Text>
              <Text style={[styles.restaurantMeta, { textAlign: textAlignStart }]}>{restaurant.category}</Text>
              <View style={[styles.tagRow, { flexDirection: rowDirection }]}>
                {restaurant.tags.slice(0, 2).map((tag) => (
                  <View key={tag} style={styles.tagPill}>
                    <Text style={styles.tagPillText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('VendorApp')}>
            <Text style={styles.sectionLink}>لوحة المزود</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>قسم الأعمال والمزودين</Text>
        </View>
        {businessServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.businessCard, { flexDirection: rowDirection }]}
            activeOpacity={0.9}
            onPress={service.action}
          >
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            <View style={styles.businessText}>
              <Text style={[styles.businessTitle, { textAlign: textAlignStart }]}>{service.title}</Text>
              <Text style={[styles.businessSubtitle, { textAlign: textAlignStart }]}>{service.subtitle}</Text>
            </View>
            <View style={styles.businessIconWrap}>
              <Ionicons name={service.icon} size={22} color={colors.primary} />
            </View>
          </TouchableOpacity>
        ))}

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>قسم المتجر</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalList, { flexDirection: rowDirection }]}>
          {featuredProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard} activeOpacity={0.88} onPress={() => handleProductPress(product)}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productContent}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <TouchableOpacity style={styles.productButton} activeOpacity={0.85} onPress={() => handleProductPress(product)}>
                  <PriceDisplay value={product.price} color={colors.primary} size={14} iconSize={12} bold align="row-reverse" />
                  <Ionicons name="add-circle" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={[styles.cartBar, { bottom: Math.max(insets.bottom, spacing.md) }]} activeOpacity={0.9} onPress={() => navigation.navigate('Cart')}>
          <View>
            <Text style={styles.cartBarTitle}>السلة جاهزة</Text>
            <Text style={styles.cartBarSubtitle}>{cartCount} عناصر مضافة</Text>
          </View>
          <Ionicons name="bag-handle-outline" size={22} color={colors.white} />
        </TouchableOpacity>
      )}

      <ItemDetailModal
        visible={showItemModal}
        item={selectedItem}
        onClose={() => setShowItemModal(false)}
        onAddToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  topBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarShell: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFF0F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  avatarLogo: {
    width: 28,
    height: 28,
  },
  topBarText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  welcomeText: {
    ...typography.h3,
    color: colors.text,
  },
  locationText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  heroCard: {
    borderRadius: 32,
    padding: spacing.lg,
    ...shadows.xl,
  },
  heroHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  heroBadgeText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 38,
    color: colors.white,
    textAlign: 'right',
    marginTop: spacing.lg,
  },
  heroSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  heroAction: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroActionText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  searchCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    ...shadows.sm,
  },
  searchPlaceholder: {
    flex: 1,
    ...typography.bodySmall,
    color: colors.textTertiary,
    textAlign: 'right',
    marginHorizontal: spacing.sm,
  },
  searchChip: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  searchChipText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 11,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: spacing.md,
    ...shadows.sm,
  },
  statValue: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'right',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  statNote: {
    ...typography.caption,
    color: colors.primary,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  sectionHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  sectionLink: {
    ...typography.caption,
    color: colors.primary,
  },
  servicesRow: {
    gap: spacing.sm,
    paddingBottom: spacing.xs,
  },
  serviceChip: {
    backgroundColor: colors.card,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    minWidth: 88,
    ...shadows.sm,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  serviceName: {
    ...typography.bodySmall,
    color: colors.text,
    fontFamily: fonts.semiBold,
  },
  horizontalList: {
    gap: spacing.md,
    paddingLeft: spacing.xs,
  },
  offerCard: {
    width: 280,
    height: 176,
    borderRadius: 28,
    overflow: 'hidden',
    ...shadows.lg,
  },
  offerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  offerOverlay: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  offerVendor: {
    color: 'rgba(255,255,255,0.86)',
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: 'right',
  },
  offerTitle: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.white,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  offerSubtitle: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  offerValid: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'right',
    marginTop: spacing.md,
  },
  bookingCard: {
    width: 250,
    height: 190,
    borderRadius: 28,
    overflow: 'hidden',
    ...shadows.lg,
  },
  bookingImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bookingOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    backgroundColor: 'rgba(17,24,39,0.18)',
  },
  bookingArea: {
    color: 'rgba(255,255,255,0.84)',
    fontFamily: fonts.semiBold,
    fontSize: 12,
    textAlign: 'right',
  },
  bookingTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  bookingPriceWrap: { marginTop: spacing.sm, alignSelf: 'flex-end' },
  quickSectionCard: {
    width: 190,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    ...shadows.sm,
  },
  quickSectionIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  quickSectionTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    textAlign: 'right',
  },
  quickSectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'right',
    lineHeight: 19,
    marginTop: 4,
  },
  marketCard: {
    width: 170,
    backgroundColor: colors.card,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.sm,
  },
  marketCardImage: {
    width: '100%',
    height: 110,
    backgroundColor: colors.cardSecondary,
  },
  marketCardTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    textAlign: 'right',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  marketCardSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'right',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    marginTop: 4,
  },
  restaurantCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  restaurantLogo: {
    width: 68,
    height: 68,
    borderRadius: 20,
  },
  restaurantText: {
    flex: 1,
    marginHorizontal: spacing.md,
    alignItems: 'flex-end',
  },
  restaurantName: {
    ...typography.label,
    color: colors.text,
  },
  restaurantMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
  tagRow: {
    flexDirection: 'row-reverse',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tagPill: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  tagPillText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  ratingShell: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF5E6',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  ratingText: {
    ...typography.caption,
    color: colors.text,
    fontFamily: fonts.semiBold,
  },
  businessCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  businessText: { flex: 1, marginHorizontal: spacing.md },
  businessTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  businessSubtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, marginTop: 4 },
  businessIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    width: 220,
    backgroundColor: colors.card,
    borderRadius: 28,
    overflow: 'hidden',
    ...shadows.md,
  },
  productImage: {
    width: '100%',
    height: 140,
  },
  productContent: {
    padding: spacing.md,
  },
  productName: {
    ...typography.label,
    color: colors.text,
    textAlign: 'right',
  },
  productMeta: {
    marginTop: spacing.sm,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  ratingInline: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  ratingInlineText: {
    ...typography.caption,
    color: colors.text,
  },
  productButton: {
    marginTop: spacing.md,
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartBar: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.text,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.float,
  },
  cartBarTitle: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 16,
    textAlign: 'right',
  },
  cartBarSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 2,
  },
});

export default HomeScreen;
