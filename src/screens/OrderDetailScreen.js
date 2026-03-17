import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styles.helpLink}>المساعدة</Text>
        </TouchableOpacity>
        <Text style={styles.title}>تفاصيل الطلب</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات الطلب</Text>
          
          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{order.restaurantName}</Text>
              <View style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={16}
                    color={i < order.rating ? colors.warning : colors.gray}
                  />
                ))}
              </View>
              <Text style={styles.status}>{order.statusAr}</Text>
            </View>
            <Image source={{ uri: order.restaurantLogo }} style={styles.restaurantLogo} />
          </View>

          <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText}>تقييم</Text>
          </TouchableOpacity>

          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="hash" size={20} color={colors.primary} />
              <Text style={styles.detailText}>{order.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="location" size={20} color={colors.primary} />
              <Text style={styles.detailText}>{order.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text style={styles.detailText}>
                {order.date} | {order.time}
              </Text>
            </View>
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المنتجات</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productQuantity}>الكمية : {item.quantity}</Text>
                <Text style={styles.productPrice}>السعر : {item.price * item.quantity} ر.س</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>قيمة المنتجات</Text>
            <Text style={styles.summaryValue}>{order.subtotal} ر.س</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>قيمة التوصيل</Text>
            <Text style={styles.summaryValue}>{order.deliveryFee} ر.س</Text>
          </View>
          {order.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountLabel]}>قيمة الخصم</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                {order.discount} ر.س
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>المجموع</Text>
            <Text style={styles.totalValue}>{order.total} ر.س</Text>
          </View>
        </View>
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
    padding: spacing.md,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  helpLink: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  section: {
    backgroundColor: colors.white,
    marginVertical: spacing.sm,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  restaurantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
    gap: 2,
  },
  status: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '600',
    textAlign: 'right',
  },
  restaurantLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.grayLight,
  },
  rateButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing.md,
  },
  rateButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  orderDetails: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    textAlign: 'right',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    gap: spacing.md,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: 2,
  },
  productQuantity: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'right',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.grayLight,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  discountLabel: {
    color: colors.primary,
  },
  discountValue: {
    color: colors.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default OrderDetailScreen;
