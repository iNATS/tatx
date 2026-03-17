import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { orders } from '../data/staticData';

const OrdersScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return colors.green;
      case 'preparing':
        return colors.warning;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray;
    }
  };

  const renderOrder = (order) => (
    <TouchableOpacity
      key={order.id}
      style={[styles.orderCard, shadows.sm]}
      onPress={() => navigation.navigate('OrderDetail', { order })}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderRestaurant}>
          <Image source={{ uri: order.restaurantLogo }} style={styles.orderLogo} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.orderRestaurantName}>{order.restaurantName}</Text>
            <View style={styles.orderMeta}>
              <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
              <Text style={styles.orderDate}>{order.date}</Text>
              <Text style={styles.orderDivider}>•</Text>
              <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
              <Text style={styles.orderDate}>{order.time}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '15' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.statusAr}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.slice(0, 2).map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.orderItemImage} />
            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemName}>{item.name}</Text>
              <Text style={styles.orderItemQuantity}>الكمية: {item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>المجموع</Text>
          <Text style={styles.orderTotal}>{order.total} ر.س</Text>
        </View>
        <TouchableOpacity style={styles.reorderButton} activeOpacity={0.8}>
          <Ionicons name="refresh" size={18} color={colors.primary} />
          <Text style={styles.reorderButtonText}>إعادة الطلب</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <Text style={styles.title}>الطلبات</Text>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <Ionicons name="filter" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            {['الكل', 'قيد التحضير', 'تم التوصيل', 'ملغاة'].map((tab, index) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, index === 0 && styles.tabActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabText, index === 0 && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersContent}
      >
        {orders.length > 0 ? (
          orders.map(renderOrder)
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="bag-outline" size={48} color={colors.gray} />
            </View>
            <Text style={styles.emptyTitle}>لا توجد طلبات</Text>
            <Text style={styles.emptySubtitle}>ابدأ بالتسوق الآن</Text>
            <TouchableOpacity style={styles.shopButton}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.grayLight,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
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
    backgroundColor: colors.grayLight,
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
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderRestaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderLogo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.grayLight,
  },
  restaurantInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  orderRestaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  orderDivider: {
    fontSize: 12,
    color: colors.textSecondary,
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
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.grayLight,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    marginBottom: 2,
  },
  orderItemQuantity: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingTop: spacing.md,
  },
  totalInfo: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  reorderButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default OrdersScreen;
