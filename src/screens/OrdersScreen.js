import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { orders } from '../data/staticData';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const orderFilters = [
  { id: 'all', label: 'الكل', icon: 'apps' },
  { id: 'pending', label: 'قيد المعالجة', icon: 'time-outline' },
  { id: 'preparing', label: 'قيد التحضير', icon: 'restaurant-outline' },
  { id: 'delivery', label: 'في التوصيل', icon: 'car-outline' },
  { id: 'completed', label: 'مكتمل', icon: 'checkmark-done-outline' },
];

const orderStatusConfig = {
  pending: { color: colors.warning, bg: colors.warningLight, label: 'قيد المعالجة' },
  preparing: { color: colors.info, bg: colors.infoLight, label: 'قيد التحضير' },
  delivery: { color: colors.primary, bg: colors.cardSecondary, label: 'في التوصيل' },
  completed: { color: colors.success, bg: colors.successLight, label: 'مكتمل' },
  cancelled: { color: colors.error, bg: colors.errorLight, label: 'ملغي' },
};

const OrdersScreen = ({ navigation }) => {
  const { addToCart, formatCurrency, rowDirection, textAlignStart } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
      const matchesSearch =
        !searchQuery ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        description: item.description,
      });
    });
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        showBack={false}
        title="طلباتي"
        subtitle="تتبع الطلبات الحالية وراجع الطلبات السابقة"
        actionIcon="notifications-outline"
        onActionPress={() => navigation.navigate('Notifications')}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث برقم الطلب أو اسم المتجر"
        filters={orderFilters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredOrders.length ? (
          filteredOrders.map((order) => {
            const statusConfig = orderStatusConfig[order.status] || orderStatusConfig.pending;

            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                activeOpacity={0.92}
                onPress={() => navigation.navigate('OrderDetail', { order })}
              >
                <View style={[styles.orderHeader, { flexDirection: rowDirection }]}>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
                  </View>
                  <View style={styles.restaurantWrap}>
                    <Text style={[styles.restaurantName, { textAlign: textAlignStart }]}>{order.restaurantName}</Text>
                    <Text style={[styles.orderMeta, { textAlign: textAlignStart }]}>{order.date} • {order.time}</Text>
                  </View>
                  <Image source={{ uri: order.restaurantLogo }} style={styles.orderLogo} />
                </View>

                <View style={styles.itemsWrap}>
                  {order.items.slice(0, 2).map((item) => (
                    <View key={`${order.id}-${item.id}`} style={[styles.itemRow, { flexDirection: rowDirection }]}>
                      <Text style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
                      <Text style={[styles.itemName, { textAlign: textAlignStart }]} numberOfLines={1}>
                        {item.quantity}x {item.name}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={[styles.footerRow, { flexDirection: rowDirection }]}>
                  <TouchableOpacity style={styles.secondaryButton} onPress={() => handleReorder(order)}>
                    <Ionicons name="refresh-outline" size={18} color={colors.primary} />
                    <Text style={styles.secondaryButtonText}>إعادة الطلب</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('OrderDetail', { order })}
                  >
                    <Text style={styles.primaryButtonText}>تتبع الطلب</Text>
                  </TouchableOpacity>
                  <View style={styles.totalWrap}>
                    <Text style={[styles.totalLabel, { textAlign: textAlignStart }]}>الإجمالي</Text>
                    <Text style={[styles.totalValue, { textAlign: textAlignStart }]}>{formatCurrency(order.total)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>لا توجد طلبات مطابقة</Text>
            <Text style={styles.emptySubtitle}>جرّب تغيير الفلتر أو ابدأ طلبًا جديدًا.</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Shop')}>
              <Text style={styles.emptyButtonText}>اذهب إلى المتجر</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: 140 },
  orderCard: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  orderHeader: { alignItems: 'center' },
  orderLogo: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
  },
  restaurantWrap: { flex: 1, marginHorizontal: spacing.md },
  restaurantName: { color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  orderMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  statusText: { fontSize: 12, fontFamily: fonts.semiBold },
  itemsWrap: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  itemRow: { justifyContent: 'space-between', alignItems: 'center' },
  itemName: { flex: 1, color: colors.textSecondary, fontSize: 13 },
  itemPrice: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13, marginHorizontal: spacing.md },
  footerRow: { alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  totalWrap: { minWidth: 78 },
  totalLabel: { color: colors.textSecondary, fontSize: 12 },
  totalValue: { color: colors.primary, fontFamily: fonts.bold, fontSize: 16, marginTop: 4 },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: borderRadius.full,
  },
  primaryButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 14 },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: borderRadius.full,
  },
  secondaryButtonText: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 14 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxxl },
  emptyTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, marginTop: spacing.md },
  emptySubtitle: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  emptyButton: { marginTop: spacing.lg, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: spacing.xl, paddingVertical: 14 },
  emptyButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default OrdersScreen;
