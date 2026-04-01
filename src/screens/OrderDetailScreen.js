import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '../constants/theme';
import { useApp } from '../context/AppContext';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params || {};
  const insets = useSafeAreaInsets();
  const { addToCart, formatCurrency, rowDirection, textAlignStart, isRTL } = useApp();
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back';

  const [activeStep] = useState(2);

  const timelineSteps = [
    { id: 0, title: 'تم استلام الطلب', time: '10:30 ص', completed: true },
    { id: 1, title: 'قيد التحضير', time: '10:35 ص', completed: true },
    { id: 2, title: 'في طريقه إليك', time: '11:00 ص', completed: true, current: true },
    { id: 3, title: 'تم التوصيل', time: '-', completed: false },
  ];

  const driver = {
    name: 'أحمد محمد',
    rating: 4.9,
    phone: '+966 50 123 4567',
    vehicle: 'تويوتا كامري',
    plate: 'أ ب ج 1234',
  };

  if (!order) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={64} color={colors.textTertiary} />
          <Text style={styles.emptyTitle}>الطلب غير موجود</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm), flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name={backIcon} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تفاصيل الطلب</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => Share.share({ message: `تفاصيل الطلب ${order.id} - ${order.address}` })}
        >
          <Ionicons name="share-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Order Status Card */}
        <View style={styles.statusCard}>
          <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.statusGradient}>
            <View style={[styles.statusHeader, { flexDirection: rowDirection }]}>
              <Text style={styles.statusTitle}>رقم الطلب: {order.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{order.statusAr || 'قيد التوصيل'}</Text>
              </View>
            </View>
            <Text style={styles.statusSubtitle}>
              {order.restaurantName} • {order.items.length} منتجات
            </Text>
            <Text style={styles.statusTotal}>المجموع: {formatCurrency(order.total)}</Text>
          </LinearGradient>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.cardTitle}>حالة الطلب</Text>
          <View style={styles.timeline}>
            {timelineSteps.map((step, index) => (
              <View key={step.id} style={[styles.timelineItem, { flexDirection: rowDirection }]}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      step.completed && styles.timelineDotActive,
                      step.current && styles.timelineDotCurrent,
                    ]}
                  >
                    {step.completed && (
                      <Ionicons name="checkmark" size={14} color={colors.white} />
                    )}
                  </View>
                  {index < timelineSteps.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        step.completed && styles.timelineLineActive,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineRight}>
                  <Text style={[styles.timelineTitle, step.completed && styles.timelineTitleActive, { textAlign: textAlignStart }]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.timelineTime, { textAlign: textAlignStart }]}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <Text style={styles.cardTitle}>معلومات السائق</Text>
          <View style={[styles.driverInfo, { flexDirection: rowDirection }]}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>{driver.name.charAt(0)}</Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={[styles.driverName, { textAlign: textAlignStart }]}>{driver.name}</Text>
              <View style={[styles.driverRating, { flexDirection: rowDirection }]}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.driverRatingText}>{driver.rating}</Text>
              </View>
            </View>
            <View style={[styles.driverActions, { flexDirection: rowDirection }]}>
              <TouchableOpacity style={[styles.driverActionButton, { backgroundColor: colors.success }]} onPress={() => Alert.alert('اتصال', `يمكنك التواصل مع السائق على ${driver.phone}`)}>
                <Ionicons name="call" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.driverActionButton, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Chat')}>
                <Ionicons name="chatbubble" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.vehicleInfo, { flexDirection: rowDirection }]}>
            <View style={[styles.vehicleDetail, { flexDirection: rowDirection }]}>
              <Ionicons name="car" size={18} color={colors.textSecondary} />
              <Text style={styles.vehicleText}>{driver.vehicle}</Text>
            </View>
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>{driver.plate}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.addressCard}>
          <Text style={styles.cardTitle}>عنوان التوصيل</Text>
          <View style={[styles.addressInfo, { flexDirection: rowDirection }]}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={[styles.addressText, { textAlign: textAlignStart }]}>{order.address}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.cardTitle}>المنتجات ({order.items.length})</Text>
          {order.items.map((item, index) => (
            <View key={index} style={[styles.orderItem, { flexDirection: rowDirection }]}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, { textAlign: textAlignStart }]}>{item.name}</Text>
                <Text style={[styles.itemQuantity, { textAlign: textAlignStart }]}>الكمية: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>ملخص الدفع</Text>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
            <Text style={styles.summaryValue}>{formatCurrency(order.subtotal || order.total)}</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryLabel}>رسوم التوصيل</Text>
            <Text style={styles.summaryValue}>{formatCurrency(order.deliveryFee || 0)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryTotalLabel}>المجموع الكلي</Text>
            <Text style={styles.summaryTotalValue}>{formatCurrency(order.total)}</Text>
          </View>
          <View style={[styles.paymentMethod, { flexDirection: rowDirection }]}>
            <Ionicons name="wallet" size={18} color={colors.textSecondary} />
            <Text style={styles.paymentText}>{order.paymentMethod || 'آبل باي'}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionButtons, { flexDirection: rowDirection }]}>
          <TouchableOpacity
            style={[styles.actionButton, { flexDirection: rowDirection }]}
            onPress={() => {
              order.items.forEach((item) => addToCart(item));
              navigation.navigate('Cart');
            }}
          >
            <Ionicons name="refresh" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>إعادة الطلب</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { flexDirection: rowDirection }]} onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>الدعم</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  // Status Card
  statusCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  statusGradient: {
    padding: spacing.md,
  },
  statusHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    backdropFilter: 'blur(10px)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  statusSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.xs,
  },
  statusTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
  },
  // Timeline
  timelineCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  timeline: {
    paddingRight: spacing.sm,
  },
  timelineItem: {
    paddingBottom: spacing.md,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.cardSecondary,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  timelineDotCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.cardSecondary,
    marginTop: 2,
  },
  timelineLineActive: {
    backgroundColor: colors.success,
  },
  timelineRight: {
    flex: 1,
    paddingTop: 2,
  },
  timelineTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  timelineTitleActive: {
    color: colors.text,
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  // Driver Card
  driverCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  driverInfo: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverAvatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  driverDetails: {
    flex: 1,
    marginRight: spacing.md,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  driverRating: {
    alignItems: 'center',
    gap: 4,
  },
  driverRatingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  driverActions: {
    gap: spacing.sm,
  },
  driverActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  vehicleDetail: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  vehicleText: {
    fontSize: 14,
    color: colors.text,
  },
  plateBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  plateText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  // Address Card
  addressCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  addressInfo: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  // Items Card
  itemsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  orderItem: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.cardSecondary,
  },
  itemInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  // Summary Card
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  summaryRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  paymentMethod: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  paymentText: {
    fontSize: 14,
    color: colors.text,
  },
  // Action Buttons
  actionButtons: {
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.xs,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default OrderDetailScreen;
