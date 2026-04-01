import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const CheckoutScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    cart,
    cartTotal,
    clearCart,
    setCurrentOrder,
    user,
    formatCurrency,
    rowDirection,
    textAlignStart,
    paymentMethods,
    submitOrder,
  } = useApp();
  const addresses = user?.addresses || [];
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || null);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.id || null);
  const [deliveryWindow, setDeliveryWindow] = useState('خلال 25 - 40 دقيقة');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [notes, setNotes] = useState('');

  const deliveryFee = 12;
  const discount = discountApplied ? 10 : 0;
  const total = cartTotal + deliveryFee - discount;
  const addressDetails = addresses.find((address) => address.id === selectedAddress);
  const paymentDetails = paymentMethods.find((method) => method.id === selectedPayment);

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      Alert.alert('كود الخصم', 'أدخل كود الخصم أولاً.');
      return;
    }
    setDiscountApplied(true);
    Alert.alert('تم التطبيق', 'تم تطبيق كود الخصم على الطلب.');
  };

  const handlePlaceOrder = async () => {
    if (!cart.length) {
      Alert.alert('السلة فارغة', 'أضف عناصر إلى السلة قبل المتابعة.');
      navigation.goBack();
      return;
    }

    const nextOrder = {
      id: `طلب-${Date.now().toString().slice(-5)}`,
      restaurantName: cart[0]?.name || 'طلب جديد',
      restaurantLogo: cart[0]?.image,
      status: 'pending',
      statusAr: 'قيد المراجعة',
      rating: 0,
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      address: addressDetails?.address || 'الرياض',
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        quantity: item.quantity,
        price: item.finalPrice || item.price,
        image: item.image,
      })),
      subtotal: cartTotal,
      deliveryFee,
      discount,
      total,
      paymentMethod: paymentDetails?.name || 'آبل باي',
      notes,
      deliveryWindow,
      customerName: user?.name,
      customerPhone: user?.phone,
      user,
    };

    const { error } = await submitOrder(nextOrder);

    if (error) {
      Alert.alert('تعذر مزامنة الطلب', 'تم إنشاء الطلب محلياً، لكن لم نتمكن من حفظه في قاعدة البيانات حالياً.');
    }

    setCurrentOrder(nextOrder);
    clearCart();
    navigation.replace('OrderSuccess', { order: nextOrder });
  };

  const paymentLabel = useMemo(() => paymentDetails?.name || 'غير محدد', [paymentDetails]);

  return (
    <View style={styles.container}>
      <PageHeader navigation={navigation} title="إتمام الطلب" subtitle="راجع العنوان والدفع والملخص قبل التأكيد" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.checkoutHero, { flexDirection: rowDirection }]}>
          <View style={styles.checkoutHeroBadge}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.checkoutHeroText}>
            <Text style={[styles.checkoutHeroTitle, { textAlign: textAlignStart }]}>دفع آمن وتأكيد سريع</Text>
            <Text style={[styles.checkoutHeroSubtitle, { textAlign: textAlignStart }]}>
              سيتم إرسال الطلب بعد مراجعة العنوان وطريقة الدفع وتأكيد الملخص النهائي.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>موعد التوصيل</Text>
          <View style={[styles.inputShell, { flexDirection: rowDirection }]}>
            <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
            <TextInput
              style={[styles.input, { textAlign: textAlignStart }]}
              value={deliveryWindow}
              onChangeText={setDeliveryWindow}
              placeholder="حدد وقت التوصيل"
              placeholderTextColor={colors.textTertiary}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
            <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Location')}>
              <Text style={styles.linkText}>إدارة العناوين</Text>
            </TouchableOpacity>
          </View>
          {addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[styles.optionCard, { flexDirection: rowDirection }, selectedAddress === address.id && styles.optionCardSelected]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View style={styles.optionIndicator}>
                {selectedAddress === address.id && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
              </View>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, { textAlign: textAlignStart }]}>{address.label}</Text>
                <Text style={[styles.optionSubtitle, { textAlign: textAlignStart }]}>{address.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
            <Text style={styles.sectionTitle}>طريقة الدفع</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
              <Text style={styles.linkText}>إدارة الدفع</Text>
            </TouchableOpacity>
          </View>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.optionCard, { flexDirection: rowDirection }, selectedPayment === method.id && styles.optionCardSelected]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.optionIndicator}>
                {selectedPayment === method.id && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
              </View>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, { textAlign: textAlignStart }]}>{method.name}</Text>
                <Text style={[styles.optionSubtitle, { textAlign: textAlignStart }]}>{method.name === 'آبل باي' ? 'دفع سريع وآمن' : 'متاح لهذا الطلب'}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={[styles.selectedText, { textAlign: textAlignStart }]}>الطريقة المختارة: {paymentLabel}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>كود الخصم</Text>
          <View style={[styles.discountRow, { flexDirection: rowDirection }]}>
            <TouchableOpacity style={styles.discountButton} onPress={handleApplyDiscount}>
              <Text style={styles.discountButtonText}>تطبيق</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.discountInput, { textAlign: textAlignStart }]}
              value={discountCode}
              onChangeText={setDiscountCode}
              placeholder="أدخل كود الخصم"
              placeholderTextColor={colors.textTertiary}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ملاحظات الطلب</Text>
          <View style={[styles.inputShell, styles.notesShell, { flexDirection: rowDirection }]}>
            <TextInput
              style={[styles.input, styles.notesInput, { textAlign: textAlignStart }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="أضف أي تعليمات خاصة بالطلب أو التوصيل"
              placeholderTextColor={colors.textTertiary}
              multiline
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ملخص الدفع</Text>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}><Text style={styles.summaryLabel}>قيمة المنتجات</Text><Text style={styles.summaryValue}>{formatCurrency(cartTotal)}</Text></View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}><Text style={styles.summaryLabel}>رسوم التوصيل</Text><Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text></View>
          {discountApplied && <View style={[styles.summaryRow, { flexDirection: rowDirection }]}><Text style={styles.summaryLabel}>الخصم</Text><Text style={[styles.summaryValue, styles.discountValue]}>- {formatCurrency(discount)}</Text></View>}
          <View style={[styles.summaryRow, styles.totalRow, { flexDirection: rowDirection }]}><Text style={styles.totalLabel}>الإجمالي</Text><Text style={styles.totalValue}>{formatCurrency(total)}</Text></View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handlePlaceOrder}>
          <Text style={styles.submitButtonText}>تأكيد الطلب</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  checkoutHero: { backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, alignItems: 'center', marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderLight },
  checkoutHeroBadge: { width: 54, height: 54, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  checkoutHeroText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  checkoutHeroTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 17, alignSelf: 'stretch' },
  checkoutHeroSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 20, alignSelf: 'stretch' },
  card: { backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderLight },
  sectionHeader: { justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: 17, fontFamily: fonts.semiBold, color: colors.text, textAlign: 'right', marginBottom: spacing.md },
  linkText: { color: colors.primary, fontSize: 13, fontFamily: fonts.semiBold },
  inputShell: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, alignItems: 'center' },
  input: { flex: 1, minHeight: 52, color: colors.text, textAlign: 'right', fontFamily: fonts.regular },
  optionCard: { alignItems: 'center', backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: 'transparent' },
  optionCardSelected: { borderColor: 'rgba(218,60,87,0.22)', backgroundColor: colors.cardSecondary },
  optionIndicator: { width: 28, alignItems: 'center' },
  optionInfo: { flex: 1, alignItems: 'flex-end' },
  optionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  optionSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2, textAlign: 'right' },
  selectedText: { color: colors.textSecondary, fontSize: 12, textAlign: 'right', marginTop: spacing.sm },
  discountRow: { alignItems: 'center', gap: spacing.sm },
  discountInput: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md },
  discountButton: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: spacing.lg, paddingVertical: 14 },
  discountButtonText: { color: colors.white, fontFamily: fonts.semiBold },
  notesShell: { minHeight: 110, alignItems: 'flex-end', paddingVertical: spacing.sm },
  notesInput: { textAlignVertical: 'top' },
  summaryRow: { justifyContent: 'space-between', marginBottom: spacing.sm },
  summaryLabel: { color: colors.textSecondary, fontSize: 14 },
  summaryValue: { color: colors.text, fontSize: 14, fontFamily: fonts.semiBold },
  discountValue: { color: colors.success },
  totalRow: { marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderLight },
  totalLabel: { color: colors.text, fontSize: 16, fontFamily: fonts.semiBold },
  totalValue: { color: colors.primary, fontSize: 18, fontFamily: fonts.bold },
  submitButton: { backgroundColor: colors.primary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 16, borderWidth: 1, borderColor: colors.borderLight },
  submitButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 16 },
});

export default CheckoutScreen;
