import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

const CartScreen = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, isRTL } = useApp();

  const deliveryFee = 40;
  const total = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>السلة</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color={colors.gray} />
          <Text style={styles.emptyText}>السلة فارغة</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>تصفح المطاعم</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>السلة</Text>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <View style={styles.deliveryInfoRow}>
          <Ionicons name="cash-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.deliveryInfoText}>سعر التوصيل : {deliveryFee} ر.س</Text>
        </View>
        <View style={styles.deliveryInfoRow}>
          <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.deliveryInfoText}>وقت التوصيل : 60-40 دقيقة</Text>
        </View>
      </View>

      {/* Cart Items */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.itemsContainer}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Ionicons name="trash-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>الكمية :</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={16} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Ionicons name="add" size={16} color={colors.white} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemPrice}>السعر : {item.price * item.quantity} ر.س</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          </View>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.continueButtonText}>أستمرار</Text>
        <Text style={styles.continueTotal}>{total} ر.س</Text>
        <Text style={styles.continueCount}>{cart.reduce((sum, i) => sum + i.quantity, 0)}</Text>
      </TouchableOpacity>
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  deliveryInfo: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  deliveryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  deliveryInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  itemsContainer: {
    flex: 1,
    padding: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  quantityLabel: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'right',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.grayLight,
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  continueTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginHorizontal: spacing.md,
  },
  continueCount: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
});

export default CartScreen;
