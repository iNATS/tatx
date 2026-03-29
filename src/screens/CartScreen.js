import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const CartScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, formatCurrency, rowDirection, textAlignStart, isRTL } = useApp();
  const deliveryFee = cart.length ? 12 : 0;
  const total = cartTotal + deliveryFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const closeIcon = isRTL ? 'close' : 'close';

  const handleClearCart = () => {
    Alert.alert('تفريغ السلة', 'هل تريد حذف جميع العناصر من السلة؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: clearCart },
    ]);
  };

  const handleShareCart = async () => {
    const encodedItems = encodeURIComponent(
      cart.map((item) => `${item.name} x${item.quantity}`).join(' | ')
    );
    const shareUrl = `https://tatx.app/pay/cart?items=${encodedItems}&total=${encodeURIComponent(formatCurrency(total))}`;
    try {
      await Share.share({
        message: `رابط سداد السلة عبر تطبيق دائما معك:\n${shareUrl}`,
        url: shareUrl,
      });
    } catch (error) {
      Alert.alert('تعذر المشاركة', 'حدثت مشكلة أثناء إنشاء رابط مشاركة السلة.');
    }
  };

  if (!cart.length) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Ionicons name={closeIcon} size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>السلة</Text>
          <View style={styles.headerButton} />
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="bag-handle-outline" size={44} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>السلة فارغة</Text>
          <Text style={styles.emptySubtitle}>أضف بعض المنتجات أو الوجبات للمتابعة إلى الدفع.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.primaryButtonText}>ابدأ التسوق</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name={closeIcon} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>السلة</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShareCart} style={styles.headerButton}>
            <Ionicons name="share-social-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClearCart} style={styles.headerButton}>
            <Ionicons name="trash-outline" size={22} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <TouchableOpacity style={styles.sharePaymentCard} activeOpacity={0.9} onPress={handleShareCart}>
            <View>
              <Text style={styles.sharePaymentTitle}>مشاركة رابط الدفع</Text>
              <Text style={styles.sharePaymentSubtitle}>أرسل رابط السلة لشخص آخر ليدفع الطلب عنك.</Text>
            </View>
            <Ionicons name="share-social-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>{totalItems} عناصر</Text>
            <Text style={styles.summaryLabel}>عدد المنتجات</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
            <Text style={styles.summaryLabel}>رسوم التوصيل</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>25 - 40 دقيقة</Text>
            <Text style={styles.summaryLabel}>الوقت المتوقع</Text>
          </View>
        </View>

        {cart.map((item) => (
          <View key={item.id} style={[styles.itemCard, { flexDirection: 'row-reverse' }]}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { textAlign: textAlignStart }]}>{item.name}</Text>
              {!!item.description && <Text style={[styles.itemDescription, { textAlign: textAlignStart }]}>{item.description}</Text>}
              <Text style={styles.itemPrice}>{formatCurrency((item.finalPrice || item.price) * item.quantity)}</Text>
              <View style={[styles.actionsRow, { flexDirection: 'row-reverse' }]}>
                <TouchableOpacity style={styles.iconButton} onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={18} color={colors.error} />
                </TouchableOpacity>
                <View style={styles.quantityControl}>
                  <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Ionicons name="remove" size={16} color={colors.white} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Ionicons name="add" size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md), flexDirection: rowDirection }]}>
        <View>
          <Text style={styles.footerLabel}>الإجمالي</Text>
          <Text style={styles.footerTotal}>{formatCurrency(total)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutButtonText}>متابعة الدفع</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.card,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: { flexDirection: 'row-reverse', gap: spacing.xs },
  headerTitle: { fontSize: 20, fontFamily: fonts.bold, color: colors.text },
  content: { padding: spacing.md },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  sharePaymentCard: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3F6',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sharePaymentTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14, textAlign: 'right' },
  sharePaymentSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', lineHeight: 18 },
  summaryRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: { color: colors.textSecondary, fontFamily: fonts.regular, fontSize: 14, textAlign: 'right' },
  summaryValue: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14, textAlign: 'right' },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row-reverse',
    direction: 'rtl',
    ...shadows.sm,
  },
  itemImage: { width: 82, height: 82, borderRadius: 18, backgroundColor: colors.cardSecondary },
  itemInfo: { flex: 1, width: '100%', marginRight: spacing.md, alignItems: 'flex-end' },
  itemName: { fontSize: 16, fontFamily: fonts.semiBold, color: colors.text, textAlign: 'right', alignSelf: 'stretch' },
  itemDescription: { fontSize: 12, color: colors.textSecondary, marginTop: 4, textAlign: 'right', alignSelf: 'stretch' },
  itemPrice: { fontSize: 15, color: colors.primary, fontFamily: fonts.semiBold, marginTop: spacing.sm, textAlign: 'right', alignSelf: 'stretch' },
  actionsRow: { width: '100%', marginTop: spacing.md, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  iconButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.errorLight, alignItems: 'center', justifyContent: 'center' },
  quantityControl: { flexDirection: 'row-reverse', alignItems: 'center', gap: spacing.sm },
  qtyButton: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  qtyText: { minWidth: 20, textAlign: 'center', color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.float,
  },
  footerLabel: { color: colors.textSecondary, fontSize: 12, textAlign: 'right' },
  footerTotal: { color: colors.text, fontSize: 20, fontFamily: fonts.bold, textAlign: 'right' },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderRadius: borderRadius.full,
  },
  checkoutButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptyIcon: { width: 88, height: 88, borderRadius: 28, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { marginTop: spacing.lg, fontSize: 22, fontFamily: fonts.bold, color: colors.text },
  emptySubtitle: { marginTop: spacing.sm, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  primaryButton: { marginTop: spacing.lg, backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: 14, borderRadius: borderRadius.full },
  primaryButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default CartScreen;
