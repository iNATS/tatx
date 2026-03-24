import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import PriceDisplay from '../components/PriceDisplay';

const checkInOptions = ['20 مارس', '21 مارس', '22 مارس', 'حسب الطلب'];
const checkOutOptions = ['21 مارس', '22 مارس', '24 مارس', 'حسب الطلب'];
const guestOptions = ['2 ضيوف', '4 ضيوف', '8 ضيوف', '12+'];
const contactOptions = ['واتساب', 'اتصال', 'داخل التطبيق'];

const packageMap = {
  hotel: [
    { id: 'standard', name: 'قياسي', note: 'إلغاء مرن حتى 24 ساعة', extra: 0 },
    { id: 'breakfast', name: 'مع إفطار', note: 'بوفيه صباحي شامل', extra: 60 },
  ],
  chalet: [
    { id: 'day', name: 'يومي', note: 'دخول 3 م - خروج 12 ظ', extra: 0 },
    { id: 'full', name: 'إقامة كاملة', note: 'خصوصية وخدمات إضافية', extra: 180 },
  ],
  hall: [
    { id: 'basic', name: 'أساسي', note: 'حجز القاعة فقط', extra: 0 },
    { id: 'premium', name: 'تنسيق متكامل', note: 'ضيافة وتجهيزات وعرض', extra: 950 },
  ],
};

const StayBookingDetailScreen = ({ route, navigation }) => {
  const { booking } = route.params || {};
  const { formatCurrency, rowDirection, textAlignStart } = useApp();
  const [selectedCheckIn, setSelectedCheckIn] = useState(checkInOptions[0]);
  const [selectedCheckOut, setSelectedCheckOut] = useState(checkOutOptions[1]);
  const [selectedGuests, setSelectedGuests] = useState(guestOptions[0]);
  const [selectedContact, setSelectedContact] = useState(contactOptions[0]);

  const packages = useMemo(() => packageMap[booking?.type] || packageMap.hotel, [booking]);
  const [selectedPackage, setSelectedPackage] = useState(packages[0]?.id || 'standard');

  if (!booking) {
    return (
      <View style={styles.container}>
        <PageHeader navigation={navigation} title="تفاصيل الحجز" subtitle="لم يتم العثور على تفاصيل هذا الحجز" />
      </View>
    );
  }

  const selectedPackageData = packages.find((item) => item.id === selectedPackage) || packages[0];
  const finalPrice = booking.price + (selectedPackageData?.extra || 0);

  const confirmBooking = () => {
    Alert.alert(
      'تم تأكيد طلب الحجز',
      `تم استلام طلب ${booking.title} من ${selectedCheckIn} إلى ${selectedCheckOut} لعدد ${selectedGuests}.`
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title={booking.title}
        subtitle={`${booking.area} • ${booking.type === 'hall' ? 'قاعات مناسبات' : 'حجوزات إقامة'} داخل المملكة`}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Image source={{ uri: booking.image }} style={styles.heroImage} />

        <View style={styles.card}>
          <View style={[styles.titleRow, { flexDirection: rowDirection }]}>
            <View style={styles.ratingPill}>
              <Ionicons name="star" size={14} color={colors.warning} />
              <Text style={styles.ratingText}>{booking.rating}</Text>
            </View>
            <View style={styles.titleWrap}>
              <Text style={[styles.title, { textAlign: textAlignStart }]}>{booking.title}</Text>
              <Text style={[styles.subtitle, { textAlign: textAlignStart }]}>
                {booking.area} • حتى {booking.guests} ضيوف
              </Text>
            </View>
          </View>

          <View style={[styles.featuresRow, { flexDirection: rowDirection }]}>
            {booking.features.map((feature) => (
              <View key={feature} style={styles.featureChip}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>تاريخ الوصول</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.chipsRow, { flexDirection: rowDirection }]}>
            {checkInOptions.map((date) => (
              <TouchableOpacity
                key={date}
                style={[styles.selectChip, selectedCheckIn === date && styles.selectChipActive]}
                onPress={() => setSelectedCheckIn(date)}
              >
                <Text style={[styles.selectChipText, selectedCheckIn === date && styles.selectChipTextActive]}>{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.sectionTitle, { textAlign: textAlignStart, marginTop: spacing.md }]}>تاريخ المغادرة / نهاية الحجز</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.chipsRow, { flexDirection: rowDirection }]}>
            {checkOutOptions.map((date) => (
              <TouchableOpacity
                key={date}
                style={[styles.selectChip, selectedCheckOut === date && styles.selectChipActive]}
                onPress={() => setSelectedCheckOut(date)}
              >
                <Text style={[styles.selectChipText, selectedCheckOut === date && styles.selectChipTextActive]}>{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.sectionTitle, { textAlign: textAlignStart, marginTop: spacing.md }]}>عدد الضيوف أو الحضور</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.chipsRow, { flexDirection: rowDirection }]}>
            {guestOptions.map((guest) => (
              <TouchableOpacity
                key={guest}
                style={[styles.selectChip, selectedGuests === guest && styles.selectChipActive]}
                onPress={() => setSelectedGuests(guest)}
              >
                <Text style={[styles.selectChipText, selectedGuests === guest && styles.selectChipTextActive]}>{guest}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.sectionTitle, { textAlign: textAlignStart, marginTop: spacing.md }]}>طريقة التواصل للتأكيد</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.chipsRow, { flexDirection: rowDirection }]}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.selectChip, selectedContact === option && styles.selectChipActive]}
                onPress={() => setSelectedContact(option)}
              >
                <Text style={[styles.selectChipText, selectedContact === option && styles.selectChipTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>اختر الباقة</Text>
          {packages.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.packageCard, selectedPackage === item.id && styles.packageCardSelected, { flexDirection: rowDirection }]}
              onPress={() => setSelectedPackage(item.id)}
            >
              <View style={styles.packageIndicator}>
                {selectedPackage === item.id && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
              </View>
              <View style={styles.packageInfo}>
                <Text style={[styles.packageName, { textAlign: textAlignStart }]}>{item.name}</Text>
                <Text style={[styles.packageNote, { textAlign: textAlignStart }]}>{item.note}</Text>
              </View>
              {item.extra ? (
                <PriceDisplay value={item.extra} color={colors.primary} size={14} iconSize={12} bold align="row-reverse" />
              ) : (
                <Text style={styles.packagePrice}>مشمول</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>آلية الحجز والتأكيد</Text>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>{selectedCheckIn}</Text>
            <Text style={styles.summaryLabel}>الوصول / بداية الحجز</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>{selectedCheckOut}</Text>
            <Text style={styles.summaryLabel}>المغادرة / نهاية الحجز</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>{selectedGuests}</Text>
            <Text style={styles.summaryLabel}>الضيوف / الحضور</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>{selectedContact}</Text>
            <Text style={styles.summaryLabel}>طريقة التأكيد</Text>
          </View>
          <View style={[styles.summaryRow, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>خلال 15 - 30 دقيقة</Text>
            <Text style={styles.summaryLabel}>زمن مراجعة الطلب</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowLast, { flexDirection: rowDirection }]}>
            <Text style={styles.summaryValue}>قد يُطلب عربون لتثبيت الموعد</Text>
            <Text style={styles.summaryLabel}>سياسة التثبيت</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { flexDirection: rowDirection }]}>
        <View style={styles.footerPriceWrap}>
          <Text style={styles.footerLabel}>السعر المتوقع</Text>
          <PriceDisplay value={finalPrice} color={colors.primary} size={20} iconSize={16} bold align="row-reverse" />
        </View>
        <TouchableOpacity style={styles.footerButton} onPress={confirmBooking}>
          <Text style={styles.footerButtonText}>تأكيد الحجز</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: 160 },
  heroImage: {
    width: '100%',
    height: 230,
    borderRadius: 28,
    backgroundColor: colors.cardSecondary,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  titleRow: { alignItems: 'center' },
  titleWrap: { flex: 1, marginHorizontal: spacing.md },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 20 },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
  },
  ratingText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12 },
  featuresRow: { flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  featureChip: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: 12, paddingVertical: 8 },
  featureText: { color: colors.textSecondary, fontSize: 12, fontFamily: fonts.semiBold },
  sectionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, marginBottom: spacing.sm },
  chipsRow: { gap: spacing.sm },
  selectChip: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10 },
  selectChipActive: { backgroundColor: colors.primary },
  selectChipText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  selectChipTextActive: { color: colors.white },
  packageCard: {
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  packageCardSelected: { borderColor: 'rgba(218,60,87,0.22)', backgroundColor: '#FFF3F6' },
  packageIndicator: { width: 28, alignItems: 'center' },
  packageInfo: { flex: 1, marginHorizontal: spacing.md },
  packageName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  packageNote: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  packagePrice: { color: colors.primary, fontFamily: fonts.bold, fontSize: 14 },
  summaryRow: {
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  summaryLabel: { color: colors.textSecondary, fontSize: 13 },
  summaryValue: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13, maxWidth: '58%', textAlign: 'left' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.float,
  },
  footerPriceWrap: { flex: 1 },
  footerLabel: { color: colors.textSecondary, fontSize: 12 },
  footerButton: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: spacing.xl, paddingVertical: 15 },
  footerButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default StayBookingDetailScreen;
