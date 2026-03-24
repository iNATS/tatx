import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { homeServices } from '../data/staticData';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const serviceFilters = [
  { id: 'all', label: 'الكل', icon: 'apps-outline' },
  { id: 'mobility', label: 'التنقل', icon: 'car-outline' },
  { id: 'shopping', label: 'التسوق', icon: 'bag-outline' },
  { id: 'booking', label: 'الحجوزات', icon: 'calendar-outline' },
  { id: 'business', label: 'الأعمال', icon: 'briefcase-outline' },
  { id: 'support', label: 'الدعم', icon: 'help-buoy-outline' },
];

const extraServices = [
  { id: 'orders', name: 'طلباتي', subtitle: 'متابعة الطلبات وإعادة الطلب', icon: 'receipt-outline', screen: 'Orders', color: '#DA3C57', group: 'support' },
  { id: 'notifications', name: 'الإشعارات', subtitle: 'كل التحديثات والتنبيهات', icon: 'notifications-outline', screen: 'Notifications', color: '#FF8A5B', group: 'support' },
  { id: 'support-chat', name: 'الدعم', subtitle: 'محادثة ومساعدة مباشرة', icon: 'chatbubble-ellipses-outline', screen: 'Chat', color: '#0EA5A4', group: 'support' },
];

const serviceGroups = {
  taxi: 'mobility',
  food: 'shopping',
  market: 'shopping',
  pharmacy: 'shopping',
  gifts: 'shopping',
  wholesale: 'business',
  doctor: 'booking',
  hotel: 'booking',
  chalet: 'booking',
  hall: 'booking',
  'all-services': 'all',
};

const serviceSubtitles = {
  taxi: 'اطلب سيارة مع تتبع مباشر للخريطة',
  food: 'مطاعم ووجبات سريعة ومقاهي',
  market: 'طلبات المنزل والسوبرماركت',
  pharmacy: 'أدوية ومنتجات عناية موثوقة',
  gifts: 'هدايا وورد وتغليف مناسب للمناسبات',
  wholesale: 'توريد للكميات والمكاتب والمتاجر',
  doctor: 'حجز طبيب واختيار الموعد المناسب',
  hotel: 'حجز فنادق داخل المملكة',
  chalet: 'شاليهات للرحلات والويكند',
  hall: 'قاعات للمناسبات والاجتماعات',
  'all-services': 'استعرض كل أقسام التطبيق',
};

const ServicesScreen = ({ navigation }) => {
  const { isRTL, rowDirection, textAlignStart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const chevronIcon = isRTL ? 'chevron-back' : 'chevron-forward';

  const services = useMemo(() => {
    return [...homeServices, ...extraServices].map((service) => ({
      ...service,
      group: service.group || serviceGroups[service.id] || 'all',
      subtitle: service.subtitle || serviceSubtitles[service.id] || 'ابدأ الخدمة الآن',
    }));
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesFilter = selectedFilter === 'all' || service.group === selectedFilter;
      const matchesSearch =
        !searchQuery ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter, services]);

  const handleServicePress = (service) => {
    navigation.navigate(service.screen, service.params);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="جميع الخدمات"
        subtitle="تنقل، تسوق، احجز، وادِر طلباتك من نفس التطبيق"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث عن خدمة أو قسم"
        filters={serviceFilters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.heroCard, { flexDirection: rowDirection }]}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.heroText}>
            <Text style={[styles.heroTitle, { textAlign: textAlignStart }]}>دائما معك</Text>
            <Text style={[styles.heroSubtitle, { textAlign: textAlignStart }]}>
              تجربة موحدة للسوق السعودي تشمل المشاوير، التسوق، الحجوزات، والطلبات اليومية.
            </Text>
          </View>
        </View>

        {filteredServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.serviceCard, { flexDirection: rowDirection }]}
            onPress={() => handleServicePress(service)}
            activeOpacity={0.9}
          >
            <Ionicons name={chevronIcon} size={20} color={colors.textTertiary} />
            <View style={styles.serviceText}>
              <Text style={[styles.serviceTitle, { textAlign: textAlignStart }]}>{service.name}</Text>
              <Text style={[styles.serviceSubtitle, { textAlign: textAlignStart }]}>{service.subtitle}</Text>
            </View>
            <View style={[styles.iconShell, { backgroundColor: `${service.color}18` }]}>
              <Ionicons name={service.icon} size={24} color={service.color} />
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
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  logo: { width: 76, height: 76 },
  heroText: { flex: 1, marginHorizontal: spacing.md },
  heroTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 22 },
  heroSubtitle: { color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
  serviceCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  iconShell: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceText: { flex: 1, marginHorizontal: spacing.md },
  serviceTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  serviceSubtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 20 },
});

export default ServicesScreen;
