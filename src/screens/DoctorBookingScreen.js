import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import PriceDisplay from '../components/PriceDisplay';

const DoctorBookingScreen = ({ navigation }) => {
  const { rowDirection, textAlignStart, medicalBookingContent } = useApp();
  const specialtyFilters = medicalBookingContent?.specialtyFilters || [];
  const consultationFilters = medicalBookingContent?.consultationFilters || [];
  const doctors = medicalBookingContent?.doctors || [];
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

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="حجز موعد دكتور"
        subtitle="اختر الطبيب أولًا ثم أكمل الحجز على خطوات منفصلة"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث باسم الطبيب أو العيادة"
        filters={specialtyFilters}
        selectedFilter={selectedSpecialty}
        onSelectFilter={setSelectedSpecialty}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topBanner}>
          <Text style={[styles.topBannerTitle, { textAlign: textAlignStart }]}>حجز طبي مرتب مثل تطبيقات المواعيد</Text>
          <Text style={[styles.topBannerSubtitle, { textAlign: textAlignStart }]}>
            1. الطبيب  2. اليوم والموعد  3. بيانات المريض  4. مراجعة  5. تأكيد
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
          <TouchableOpacity
            key={doctor.id}
            style={styles.card}
            activeOpacity={0.92}
            onPress={() => navigation.navigate('DoctorBookingSchedule', { doctor })}
          >
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
              <Ionicons name={rowDirection === 'row-reverse' ? 'chevron-back' : 'chevron-forward'} size={18} color={colors.textTertiary} />
            </View>

            <View style={[styles.priceRow, { flexDirection: rowDirection }]}>
              <View style={[styles.priceMeta, { flexDirection: rowDirection }]}>
                <Ionicons
                  name={doctor.consultationType === 'online' ? 'videocam-outline' : 'business-outline'}
                  size={16}
                  color={colors.textSecondary}
                />
                <Text style={styles.priceText}>
                  {doctor.consultationType === 'online' ? 'استشارة أونلاين' : 'زيارة بالعيادة'}
                </Text>
              </View>
              <PriceDisplay value={doctor.fee} color={colors.primary} size={16} iconSize={13} bold align={rowDirection} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  topBanner: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  topBannerTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 17 },
  topBannerSubtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 21 },
  consultationRow: { gap: spacing.sm, marginTop: spacing.md },
  consultationChip: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10 },
  consultationChipActive: { backgroundColor: colors.primary },
  consultationText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  consultationTextActive: { color: colors.white },
  card: { backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderLight },
  topRow: { alignItems: 'center' },
  avatarShell: { width: 58, height: 58, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  infoWrap: { flex: 1, marginHorizontal: spacing.md },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  metaLine: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  priceRow: { justifyContent: 'space-between', marginTop: spacing.md, alignItems: 'center' },
  priceMeta: { alignItems: 'center', gap: spacing.xs },
  priceText: { color: colors.textSecondary, fontSize: 13 },
});

export default DoctorBookingScreen;
