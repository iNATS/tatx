import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

const PaymentScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('cash');

  const paymentMethods = [
    {
      id: 'cash',
      type: 'cash',
      title: 'الدفع نقداً',
      subtitle: 'عند الاستلام',
      icon: 'wallet',
      color: colors.success,
      isDefault: true,
    },
    {
      id: 'card1',
      type: 'card',
      title: 'بطاقة ائتمان',
      subtitle: '•••• •••• •••• 4532',
      icon: 'card',
      color: colors.primary,
      isDefault: false,
      cardBrand: 'visa',
    },
    {
      id: 'card2',
      type: 'card',
      title: 'مدى',
      subtitle: '•••• •••• •••• 8921',
      icon: 'card',
      color: colors.info,
      isDefault: false,
      cardBrand: 'mada',
    },
    {
      id: 'apple',
      type: 'wallet',
      title: 'Apple Pay',
      subtitle: 'دفع سريع وآمن',
      icon: 'logo-apple',
      color: colors.text,
      isDefault: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>طرق الدفع</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Current Payment Method Banner */}
        <View style={styles.currentMethodCard}>
          <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.currentMethodGradient}>
            <View style={styles.currentMethodHeader}>
              <Text style={styles.currentMethodLabel}>طريقة الدفع الحالية</Text>
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
            </View>
            <View style={styles.currentMethodContent}>
              <Ionicons name="wallet" size={32} color={colors.white} />
              <View style={styles.currentMethodInfo}>
                <Text style={styles.currentMethodTitle}>الدفع نقداً</Text>
                <Text style={styles.currentMethodSubtitle}>عند استلام الطلب</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Payment Methods List */}
        <Text style={styles.sectionTitle}>طرق الدفع المحفوظة</Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentCard}
            onPress={() => setSelectedMethod(method.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.paymentIcon, { backgroundColor: method.color + '15' }]}>
              <Ionicons name={method.icon} size={24} color={method.color} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>{method.title}</Text>
              <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
            </View>
            <View style={styles.paymentActions}>
              {method.type === 'card' && (
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="create-outline" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.radioButtonSelected,
                ]}
              >
                {selectedMethod === method.id && (
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add Payment Method Button */}
        <TouchableOpacity style={styles.addMethodButton} onPress={() => setShowAddModal(true)}>
          <Ionicons name="add-circle" size={24} color={colors.primary} />
          <Text style={styles.addMethodText}>إضافة طريقة دفع جديدة</Text>
        </TouchableOpacity>

        {/* Security Info */}
        <View style={styles.securityCard}>
          <Ionicons name="shield-checkmark" size={24} color={colors.success} />
          <View style={styles.securityInfo}>
            <Text style={styles.securityTitle}>دفع آمن ومحمي</Text>
            <Text style={styles.securityText}>
              جميع عمليات الدفع مشفرة ومحمية بأحدث تقنيات الأمان
            </Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>إضافة بطاقة جديدة</Text>

            {/* Card Preview */}
            <View style={styles.cardPreview}>
              <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.cardGradient}>
                <View style={styles.cardPreviewHeader}>
                  <Text style={styles.cardChip}>💳</Text>
                  <Ionicons name="wifi" size={20} color="rgba(255,255,255,0.8)" />
                </View>
                <Text style={styles.cardNumber}>•••• •••• •••• ••••</Text>
                <View style={styles.cardPreviewFooter}>
                  <View>
                    <Text style={styles.cardPreviewLabel}>اسم حامل البطاقة</Text>
                    <Text style={styles.cardPreviewValue}>YOUR NAME</Text>
                  </View>
                  <View>
                    <Text style={styles.cardPreviewLabel}>تنتهي في</Text>
                    <Text style={styles.cardPreviewValue}>MM/YY</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>رقم البطاقة</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color={colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 1234 5678"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>اسم حامل البطاقة</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="الاسم كما على البطاقة"
                  placeholderTextColor={colors.textTertiary}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>تاريخ الانتهاء</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="calendar-outline" size={20} color={colors.textTertiary} />
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor={colors.textTertiary}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>رمز الأمان</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.textTertiary} />
                  <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    placeholderTextColor={colors.textTertiary}
                    keyboardType="number-pad"
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            <View style={styles.saveCardOption}>
              <TouchableOpacity style={styles.checkbox}>
                <Ionicons name="square-outline" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>حفظ البطاقة للدفع السريع</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]}>
                <Text style={styles.saveButtonText}>حفظ البطاقة</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.md,
  },
  // Current Method Card
  currentMethodCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  currentMethodGradient: {
    padding: spacing.md,
  },
  currentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  currentMethodLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  currentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentMethodInfo: {
    marginLeft: spacing.md,
  },
  currentMethodTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
  },
  currentMethodSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  // Payment Cards
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  paymentSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  paymentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  // Add Method Button
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  addMethodText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  // Security Card
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '10',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.md,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 2,
  },
  securityText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.md,
    maxHeight: '95%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  // Card Preview
  cardPreview: {
    height: 180,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  cardGradient: {
    flex: 1,
    padding: spacing.md,
  },
  cardPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  cardChip: {
    fontSize: 32,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  cardPreviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardPreviewLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  cardPreviewValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  // Form
  formGroup: {
    marginBottom: spacing.md,
  },
  formGroupHalf: {
    flex: 1,
    marginBottom: spacing.md,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  saveCardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  checkbox: {
    marginLeft: spacing.sm,
  },
  checkboxText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.cardSecondary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});

export default PaymentScreen;
