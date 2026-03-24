import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const specialtyFilters = [
  { id: 'all', label: 'الكل', icon: 'apps-outline' },
  { id: 'طب أسرة', label: 'أسرة', icon: 'medkit-outline' },
  { id: 'باطنية', label: 'باطنية', icon: 'pulse-outline' },
  { id: 'جلدية', label: 'جلدية', icon: 'sparkles-outline' },
  { id: 'أسنان', label: 'أسنان', icon: 'fitness-outline' },
];

const consultationFilters = [
  { id: 'all', label: 'كل الزيارات' },
  { id: 'clinic', label: 'داخل العيادة' },
  { id: 'online', label: 'أونلاين' },
];

const doctors = [
  {
    id: '1',
    name: 'د. نورة السبيعي',
    specialty: 'طب أسرة',
    clinic: 'مجمع الندى الطبي',
    location: 'الصحافة',
    fee: 120,
    rating: 4.9,
    experience: '12 سنة خبرة',
    consultationType: 'clinic',
    slots: ['05:30 م', '06:00 م', '07:00 م'],
  },
  {
    id: '2',
    name: 'د. خالد الشهري',
    specialty: 'باطنية',
    clinic: 'عيادات الصفوة',
    location: 'العليا',
    fee: 150,
    rating: 4.8,
    experience: '15 سنة خبرة',
    consultationType: 'clinic',
    slots: ['04:00 م', '05:15 م', '07:45 م'],
  },
  {
    id: '3',
    name: 'د. ريم العتيبي',
    specialty: 'جلدية',
    clinic: 'مركز العناية المتقدمة',
    location: 'الياسمين',
    fee: 180,
    rating: 4.9,
    experience: '10 سنوات خبرة',
    consultationType: 'online',
    slots: ['06:30 م', '08:00 م', '09:00 م'],
  },
  {
    id: '4',
    name: 'د. عبدالعزيز الدوسري',
    specialty: 'أسنان',
    clinic: 'ابتسامة الرياض',
    location: 'الندى',
    fee: 220,
    rating: 4.7,
    experience: '14 سنة خبرة',
    consultationType: 'clinic',
    slots: ['03:30 م', '04:30 م', '06:30 م'],
  },
];

const DoctorBookingScreen = ({ navigation }) => {
  const { formatCurrency, rowDirection, textAlignStart } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedConsultation, setSelectedConsultation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      const matchesConsultation =
        selectedConsultation === 'all' || doctor.consultationType === selectedConsultation;
      const matchesSearch =
        !searchQuery ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSpecialty && matchesConsultation && matchesSearch;
    });
  }, [searchQuery, selectedConsultation, selectedSpecialty]);

  const bookSlot = (doctor, slot) => {
    Alert.alert('تم حجز الموعد', `تم تأكيد موعد ${doctor.name} الساعة ${slot}.`);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="حجز موعد دكتور"
        subtitle="ابحث حسب التخصص واختر الموعد المناسب مثل تطبيقات الحجز الطبي"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث باسم الطبيب أو العيادة"
        filters={specialtyFilters}
        selectedFilter={selectedSpecialty}
        onSelectFilter={setSelectedSpecialty}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.insuranceCard}>
          <Text style={[styles.insuranceTitle, { textAlign: textAlignStart }]}>ابحث مع التأمين أو الزيارة المباشرة</Text>
          <Text style={[styles.insuranceSubtitle, { textAlign: textAlignStart }]}>
            اختر نمط الزيارة أولًا ثم راجع المواعيد المتاحة فورًا.
          </Text>

          <View style={[styles.consultationRow, { flexDirection: rowDirection }]}>
            {consultationFilters.map((filter) => {
              const isActive = selectedConsultation === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[styles.consultationChip, isActive && styles.consultationChipActive]}
                  onPress={() => setSelectedConsultation(filter.id)}
                >
                  <Text style={[styles.consultationText, isActive && styles.consultationTextActive]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {filteredDoctors.map((doctor) => (
          <View key={doctor.id} style={styles.card}>
            <View style={[styles.topRow, { flexDirection: rowDirection }]}>
              <View style={styles.avatarShell}>
                <Ionicons
                  name={doctor.consultationType === 'online' ? 'videocam-outline' : 'medkit-outline'}
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.infoWrap}>
                <Text style={[styles.name, { textAlign: textAlignStart }]}>{doctor.name}</Text>
                <Text style={[styles.metaLine, { textAlign: textAlignStart }]}>
                  {doctor.specialty} • {doctor.clinic}
                </Text>
                <Text style={[styles.metaLine, { textAlign: textAlignStart }]}>
                  {doctor.location} • {doctor.experience}
                </Text>
              </View>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
            </View>

            <View style={[styles.priceRow, { flexDirection: rowDirection }]}>
              <View style={styles.priceMeta}>
                <Ionicons name="wallet-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.priceText}>{formatCurrency(doctor.fee)}</Text>
              </View>
              <View style={styles.priceMeta}>
                <Ionicons
                  name={doctor.consultationType === 'online' ? 'videocam-outline' : 'business-outline'}
                  size={16}
                  color={colors.textSecondary}
                />
                <Text style={styles.priceText}>
                  {doctor.consultationType === 'online' ? 'استشارة أونلاين' : 'زيارة بالعيادة'}
                </Text>
              </View>
            </View>

            <Text style={[styles.slotsTitle, { textAlign: textAlignStart }]}>أقرب المواعيد</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.slotsRow, { flexDirection: rowDirection }]}>
              {doctor.slots.map((slot) => (
                <TouchableOpacity key={slot} style={styles.slotChip} onPress={() => bookSlot(doctor, slot)}>
                  <Text style={styles.slotText}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.bookButton} onPress={() => bookSlot(doctor, doctor.slots[0])}>
              <Text style={styles.bookButtonText}>احجز أقرب موعد</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  insuranceCard: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  insuranceTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 17 },
  insuranceSubtitle: { color: colors.textSecondary, fontSize: 13, marginTop: spacing.xs, lineHeight: 21 },
  consultationRow: { gap: spacing.sm, marginTop: spacing.md },
  consultationChip: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  consultationChipActive: { backgroundColor: colors.primary },
  consultationText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  consultationTextActive: { color: colors.white },
  card: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  topRow: { alignItems: 'center' },
  avatarShell: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrap: { flex: 1, marginHorizontal: spacing.md },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  metaLine: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  ratingText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12 },
  priceRow: { justifyContent: 'space-between', marginTop: spacing.md },
  priceMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  priceText: { color: colors.textSecondary, fontSize: 13 },
  slotsTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14, marginTop: spacing.md },
  slotsRow: { gap: spacing.sm, paddingTop: spacing.sm },
  slotChip: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  slotText: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 13 },
  bookButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bookButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default DoctorBookingScreen;
