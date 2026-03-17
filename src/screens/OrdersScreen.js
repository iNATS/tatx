import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { orders } from '../data/staticData';
import { useApp } from '../context/AppContext';

const OrdersScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { addToCart } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const orderFilters = [
    { id: 'all', label: 'الكل', icon: 'apps' },
    { id: 'pending', label: 'قيد المعالجة', icon: 'time' },
    { id: 'preparing', label: 'قيد التحضير', icon: 'restaurant' },
    { id: 'delivery', label: 'في التوصيل', icon: 'bicycle' },
    { id: 'completed', label: 'مكتمل', icon: 'checkmark-done' },
  ];

  const orderStatusConfig = {
    pending: { color: colors.warning, bg: colors.warning + '15', label: 'قيد المعالجة' },
    preparing: { color: colors.info, bg: colors.info + '15', label: 'قيد التحضير' },
    delivery: { color: colors.primary, bg: colors.primary + '15', label: 'في التوصيل' },
    completed: { color: colors.success, bg: colors.success + '15', label: 'مكتمل' },
    cancelled: { color: colors.error, bg: colors.error + '15', label: 'ملغي' },
  };

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      });
    });
  };

  const handleTrackOrder = (order) => {
    navigation.navigate('OrderDetail', { order });
  };

  const renderOrderCard = (order) => {
    const statusConfig = orderStatusConfig[order.status] || orderStatusConfig.pending;
    
    return (
      <TouchableOpacity
        key={order.id}
        style={styles.orderCard}
        onPress={() => handleTrackOrder(order)}
        activeOpacity={0.8}
      >
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <View style={styles.orderRestaurant}>
            <Image source={{ uri: order.restaurantLogo }} style={styles.orderLogo} />
            <View style={styles.orderRestaurantInfo}>
              <Text style={styles.orderRestaurantName}>{order.restaurantName}</Text>
              <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.orderItems}>
          {order.items.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.orderItemImage} />
              <View style={styles.orderItemInfo}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemQuantity}>الكمية: {item.quantity}</Text>
              </View>
              <Text style={styles.orderItemPrice}>{item.price} ر.س</Text>
            </View>
          ))}
          {order.items.length > 3 && (
            <View style={styles.moreItems}>
              <Text style={styles.moreItemsText}>+{order.items.length - 3} منتجات أخرى</Text>
            </View>
          )}
        </View>

        {/* Order Footer */}
        <View style={styles.orderFooter}>
          <View style={styles.orderTotal}>
            <Text style={styles.orderTotalLabel}>المجموع</Text>
            <Text style={styles.orderTotalValue}>{order.total} ر.س</Text>
          </View>
          <View style={styles.orderActions}>
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <TouchableOpacity 
                style={styles.trackButton}
                onPress={() => handleTrackOrder(order)}
              >
                <Ionicons name="location" size={18} color={colors.primary} />
                <Text style={styles.trackButtonText}>تتبع</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.reorderButton}
              onPress={() => handleReorder(order)}
            >
              <Ionicons name="refresh" size={18} color={colors.text} />
              <Text style={styles.reorderButtonText}>إعادة الطلب</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Filter orders based on selected filter
  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>طلباتي</Text>
          <Text style={styles.headerSubtitle}>تابع جميع طلباتك في مكان واحد</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="filter" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {orderFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={filter.icon} 
              size={18} 
              color={selectedFilter === filter.id ? colors.white : colors.textSecondary} 
            />
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive,
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersContent}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map(renderOrderCard)
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="receipt-outline" size={48} color={colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>لا توجد طلبات</Text>
            <Text style={styles.emptySubtitle}>ابدأ بالتسوق الآن</Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => navigation.navigate('Shop')}
            >
              <Text style={styles.shopButtonText}>تسوق الآن</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
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
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    ...shadows.md,
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
  ordersContent: {
    padding: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  orderRestaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.cardSecondary,
  },
  orderRestaurantInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  orderRestaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderItems: {
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.cardSecondary,
  },
  orderItemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  orderItemQuantity: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  moreItems: {
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginTop: spacing.sm,
  },
  moreItemsText: {
    fontSize: 13,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  orderTotal: {
    flexDirection: 'column',
  },
  orderTotalLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  orderTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  orderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  reorderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default OrdersScreen;
