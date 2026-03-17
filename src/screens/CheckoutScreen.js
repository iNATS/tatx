import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { user, paymentMethods } from '../data/staticData';

const CheckoutScreen = ({ navigation }) => {
  const { isRTL, cartTotal, clearCart, setCurrentOrder } = useApp();
  const [selectedAddress, setSelectedAddress] = useState('المنزل');
  const [selectedPayment, setSelectedPayment] = useState('Apple Pay');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [notes, setNotes] = useState('');

  const deliveryFee = 60;
  const discount = discountApplied ? 60 : 0;
  const total = cartTotal + deliveryFee - discount;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handlePlaceOrder = () => {
    navigation.navigate('OrderSuccess');
    clearCart();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>ارسال الطلب</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Kitchen Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المطبخ</Text>
          <View style={styles.kitchenContainer}>
            <Text style={styles.kitchenText}>لم يتم إضافة مطبخ لتسويه الذبيحة</Text>
            <TouchableOpacity style={styles.addKitchenButton}>
              <Text style={styles.addKitchenButtonText}>إضافة مطبخ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>وقت التوصيل</Text>
          <TextInput
            style={styles.input}
            placeholder="الوقت المفضل للتوصيل"
            placeholderTextColor={colors.gray}
          />
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
          <View style={styles.addressButtons}>
            <TouchableOpacity style={styles.addressButton}>
              <Ionicons name="add" size={24} color={colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addressButton, selectedAddress === 'العمل' && styles.addressButtonActive]}
              onPress={() => setSelectedAddress('العمل')}
            >
              <Text style={styles.addressButtonText}>العمل</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addressButton, selectedAddress === 'المنزل' && styles.addressButtonActive]}
              onPress={() => setSelectedAddress('المنزل')}
            >
              <Text style={styles.addressButtonText}>المنزل</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressDetails}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.addressText}>
              شارع الملك فهد تقاطع الرياض السعودية
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.name && styles.paymentMethodActive,
                ]}
                onPress={() => setSelectedPayment(method.name)}
              >
                {method.logo === 'mada' ? (
                  <View style={styles.madaLogo}>
                    <Text style={styles.madaText}>mada</Text>
                  </View>
                ) : (
                  <Ionicons name={method.icon} size={24} color={colors.textSecondary} />
                )}
                <Text style={styles.paymentMethodText}>{method.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Wallet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المحفظة</Text>
          <View style={styles.walletContainer}>
            <Text style={styles.walletBalance}>
              لديك <Text style={styles.walletAmount}>300</Text> رس
            </Text>
            <TouchableOpacity style={styles.topupButton}>
              <Text style={styles.topupButtonText}>شحن</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Discount Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>كود الخصم</Text>
          <View style={styles.discountContainer}>
            <TextInput
              style={styles.discountInput}
              placeholder="كود الخصم"
              placeholderTextColor={colors.gray}
              value={discountCode}
              onChangeText={setDiscountCode}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleApplyDiscount}>
              <Text style={styles.sendButtonText}>ارسال</Text>
            </TouchableOpacity>
          </View>
          {discountApplied && (
            <View style={styles.discountSuccess}>
              <Text style={styles.discountSuccessText}>🎉 مبروك لقد حصلت على الخصم</Text>
            </View>
          )}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الملاحظات</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="أخبرنا ما تفكر فية"
            placeholderTextColor={colors.gray}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>قيمة المنتجات</Text>
            <Text style={styles.summaryValue}>{cartTotal} ر.س</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>قيمة التوصيل</Text>
            <Text style={styles.summaryValue}>{deliveryFee} ر.س</Text>
          </View>
          {discountApplied && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountLabel]}>قيمة الخصم</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>{discount} ر.س</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>المجموع</Text>
            <Text style={styles.totalValue}>{total} ر.س</Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handlePlaceOrder}>
          <Text style={styles.submitButtonText}>ارسال</Text>
        </TouchableOpacity>
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
  kitchenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kitchenText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  addKitchenButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  addKitchenButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
  },
  addressButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  addressButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  addressButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  addressButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  addressDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  paymentMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    gap: spacing.xs,
  },
  paymentMethodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  paymentMethodText: {
    fontSize: 12,
    color: colors.text,
  },
  madaLogo: {
    backgroundColor: '#0065B7',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  madaText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletBalance: {
    fontSize: 16,
    color: colors.text,
  },
  walletAmount: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  topupButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
  },
  topupButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  discountContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  discountSuccess: {
    backgroundColor: colors.greenLight,
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  discountSuccessText: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '600',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
    minHeight: 80,
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
  submitButton: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default CheckoutScreen;
