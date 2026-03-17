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
      style={[styles.orderCard, shadows.md]}
      onPress={() => navigation.navigate('OrderDetail', { order })}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderRestaurant}>
          <Image source={{ uri: order.restaurantLogo }} style={styles.orderLogo} />
          <View>
            <Text style={styles.orderRestaurantName}>{order.restaurantName}</Text>
            <Text style={styles.orderDate}>{order.date} | {order.time}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
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
              <Text style={styles.orderItemQuantity}>الكمية : {item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.orderTotal}>{order.total} ر.س</Text>
          <Text style={styles.orderTotalLabel}>المجموع</Text>
        </View>
        <TouchableOpacity style={styles.reorderButton}>
          <Ionicons name="refresh" size={18} color={colors.primary} />
          <Text style={styles.reorderButtonText}>إعادة الطلب</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.md) }]}>
        <Text style={styles.title}>الطلبات</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}>
          <Text style={styles.tabTextActive}>الكل</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>قيد التحضير</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>تم التوصيل</Text>
        </TouchableOpacity>
      </View>

      {/* Empty State or Orders List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.ordersList}>
        {orders.length > 0 ? (
          orders.map(renderOrder)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="bag-outline" size={64} color={colors.gray} />
            <Text style={styles.emptyTitle}>لا توجد طلبات</Text>
            <Text style={styles.emptySubtitle}>ابدأ بالتسوق الآن</Text>
          </View>
        )}
        {/* Bottom padding for tab bar */}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    ...shadows.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    backgroundColor: colors.grayLight,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  ordersList: {
    flex: 1,
    padding: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.lg,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.grayLight,
  },
  orderRestaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    marginTop: 2,
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
    borderRadius: 12,
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
  },
  orderItemQuantity: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingTop: spacing.md,
  },
  totalContainer: {
    flexDirection: 'column',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  orderTotalLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
