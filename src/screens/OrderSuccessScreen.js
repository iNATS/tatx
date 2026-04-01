import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const OrderSuccessScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { currentOrder, formatCurrency, rowDirection, textAlignStart, orders } = useApp();
  const order = route.params?.order || currentOrder || orders[0];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark" size={34} color={colors.white} />
        </View>
        <Text style={styles.title}>تم تأكيد طلبك</Text>
        <Text style={styles.subtitle}>سنعمل على تجهيزه وإرساله إلى العنوان المحدد.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={[styles.orderHeader, { flexDirection: rowDirection }]}>
            <Image source={{ uri: order.restaurantLogo || order.items?.[0]?.image }} style={styles.logo} />
            <View style={styles.orderInfo}>
              <Text style={[styles.orderName, { textAlign: textAlignStart }]}>{order.restaurantName || 'طلب جديد'}</Text>
              <Text style={[styles.orderMeta, { textAlign: textAlignStart }]}>رقم الطلب {order.id}</Text>
              <Text style={[styles.orderMeta, { textAlign: textAlignStart }]}>{order.date} • {order.time}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { flexDirection: rowDirection }]}><Text style={styles.infoLabel}>عنوان التوصيل</Text><Text style={styles.infoValue}>{order.address}</Text></View>
          <View style={[styles.infoRow, { flexDirection: rowDirection }]}><Text style={styles.infoLabel}>طريقة الدفع</Text><Text style={styles.infoValue}>{order.paymentMethod || 'آبل باي'}</Text></View>
          <View style={[styles.infoRow, { flexDirection: rowDirection }]}><Text style={styles.infoLabel}>وقت الوصول</Text><Text style={styles.infoValue}>{order.deliveryWindow || 'خلال 25 - 40 دقيقة'}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          {order.items.map((item) => (
            <View key={item.id || item.name} style={[styles.itemRow, { flexDirection: rowDirection }]}>
              <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
              <Text style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={[styles.itemRow, { flexDirection: rowDirection }]}><Text style={styles.itemName}>قيمة المنتجات</Text><Text style={styles.itemPrice}>{formatCurrency(order.subtotal)}</Text></View>
          <View style={[styles.itemRow, { flexDirection: rowDirection }]}><Text style={styles.itemName}>رسوم التوصيل</Text><Text style={styles.itemPrice}>{formatCurrency(order.deliveryFee)}</Text></View>
          {!!order.discount && <View style={[styles.itemRow, { flexDirection: rowDirection }]}><Text style={styles.itemName}>الخصم</Text><Text style={[styles.itemPrice, styles.discountText]}>- {formatCurrency(order.discount)}</Text></View>}
          <View style={[styles.itemRow, { flexDirection: rowDirection }]}><Text style={styles.totalText}>الإجمالي</Text><Text style={styles.totalText}>{formatCurrency(order.total)}</Text></View>
        </View>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert('شكراً لك', 'يمكنك تقييم الطلب بعد اكتمال التوصيل.')}>
          <Text style={styles.secondaryButtonText}>تقييم الطلب لاحقاً</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.replace('MainTabs', { screen: 'Orders' })}>
          <Text style={styles.ghostButtonText}>عرض الطلبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('OrderDetail', { order })}>
          <Text style={styles.primaryButtonText}>تتبع الطلب</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  iconWrap: { width: 82, height: 82, borderRadius: 28, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.borderLight },
  title: { marginTop: spacing.lg, fontSize: 28, fontFamily: fonts.bold, color: colors.text },
  subtitle: { marginTop: spacing.sm, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  content: { padding: spacing.md, paddingBottom: 140 },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderLight },
  orderHeader: { alignItems: 'center', marginBottom: spacing.md },
  logo: { width: 64, height: 64, borderRadius: 18, backgroundColor: colors.cardSecondary },
  orderInfo: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  orderName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 17 },
  orderMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  infoRow: { justifyContent: 'space-between', marginBottom: spacing.sm },
  infoLabel: { color: colors.textSecondary, fontSize: 13 },
  infoValue: { color: colors.text, fontSize: 13, fontFamily: fonts.semiBold, flex: 1, textAlign: 'right' },
  sectionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, marginBottom: spacing.md, textAlign: 'right' },
  itemRow: { justifyContent: 'space-between', marginBottom: spacing.sm },
  itemName: { color: colors.text, fontSize: 14 },
  itemPrice: { color: colors.textSecondary, fontSize: 14, fontFamily: fonts.semiBold },
  totalText: { color: colors.primary, fontSize: 16, fontFamily: fonts.bold },
  discountText: { color: colors.success },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.sm },
  secondaryButton: { backgroundColor: colors.card, borderRadius: borderRadius.full, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.borderLight },
  secondaryButtonText: { color: colors.text, fontFamily: fonts.semiBold },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, paddingHorizontal: spacing.lg, paddingTop: spacing.md, flexDirection: 'row-reverse', gap: spacing.sm, borderWidth: 1, borderColor: colors.borderLight },
  primaryButton: { flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 16 },
  primaryButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
  ghostButton: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 16 },
  ghostButtonText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default OrderSuccessScreen;
