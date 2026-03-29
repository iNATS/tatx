import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { stayBookingOptions } from '../data/staticData';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const bookingFilters = [
  { id: 'all', label: 'الكل', icon: 'apps-outline' },
  { id: 'hotel', label: 'فندق', icon: 'bed-outline' },
  { id: 'chalet', label: 'شالية', icon: 'home-outline' },
  { id: 'hall', label: 'قاعة', icon: 'business-outline' },
];

const StayBookingScreen = ({ navigation, route }) => {
  const { formatCurrency, rowDirection, textAlignStart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(route.params?.bookingType || 'all');

  const filteredOptions = useMemo(() => {
    return stayBookingOptions.filter((option) => {
      const matchesFilter = selectedFilter === 'all' || option.type === selectedFilter;
      const matchesSearch =
        !searchQuery ||
        option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.area.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleBooking = (option) => {
    navigation.navigate('StayBookingDetail', { booking: option });
  };

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="حجوزات الإقامة والمناسبات"
        subtitle="فندق، شالية، وقاعة داخل المملكة"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث عن فندق أو شالية أو قاعة"
        filters={bookingFilters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.card} activeOpacity={0.92} onPress={() => handleBooking(option)}>
            <Image source={{ uri: option.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <View style={[styles.topRow, { flexDirection: rowDirection }]}>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={14} color={colors.warning} />
                  <Text style={styles.ratingText}>{option.rating}</Text>
                </View>
                <View style={styles.titleWrap}>
                  <Text style={[styles.title, { textAlign: textAlignStart }]}>{option.title}</Text>
                  <Text style={[styles.subtitle, { textAlign: textAlignStart }]}>{option.area} • حتى {option.guests} ضيوف</Text>
                </View>
              </View>

              <View style={[styles.featuresRow, { flexDirection: rowDirection }]}>
                {option.features.map((feature) => (
                  <View key={feature} style={styles.featureChip}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <View style={[styles.bottomRow, { flexDirection: rowDirection }]}>
                <TouchableOpacity style={styles.bookButton} onPress={() => handleBooking(option)}>
                  <Text style={styles.bookButtonText}>احجز الآن</Text>
                </TouchableOpacity>
                <View style={styles.priceWrap}>
                  <Text style={[styles.price, { textAlign: textAlignStart }]}>{formatCurrency(option.price)}</Text>
                  <Text style={[styles.priceLabel, { textAlign: textAlignStart }]}>لكل {option.priceUnit}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {!filteredOptions.length && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={44} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>لا توجد نتائج مطابقة</Text>
            <Text style={styles.emptySubtitle}>جرّب تغيير البحث أو نوع الحجز.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: 48,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: 190,
    backgroundColor: colors.cardSecondary,
  },
  cardBody: {
    padding: spacing.md,
    gap: spacing.md,
  },
  topRow: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  ratingPill: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  ratingText: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  featuresRow: {
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  featureChip: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fonts.semiBold,
  },
  bottomRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  priceLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: 14,
    borderRadius: borderRadius.full,
  },
  bookButtonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    marginTop: spacing.md,
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  emptySubtitle: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default StayBookingScreen;
