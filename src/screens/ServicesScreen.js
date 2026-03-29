import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { homeServices } from '../data/staticData';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import AppListCard from '../components/AppListCard';

const serviceFilters = [
  { id: 'all', label: 'الكل', icon: 'apps-outline' },
  { id: 'mobility', label: 'التنقل', icon: 'car-outline' },
  { id: 'shopping', label: 'التسوق', icon: 'bag-outline' },
  { id: 'business', label: 'الأعمال', icon: 'briefcase-outline' },
  { id: 'support', label: 'الدعم', icon: 'help-buoy-outline' },
];

const serviceGroupLabels = {
  all: 'جميع الأقسام',
  mobility: 'التنقل',
  shopping: 'التسوق',
  business: 'الأعمال',
  support: 'الدعم',
};

const extraServices = [
  { id: 'orders', name: 'طلباتي', subtitle: 'متابعة الطلبات وإعادة الطلب', icon: 'receipt-outline', screen: 'Orders', color: '#DA3C57', group: 'support' },
  { id: 'notifications', name: 'الإشعارات', subtitle: 'كل التحديثات والتنبيهات', icon: 'notifications-outline', screen: 'Notifications', color: '#FF8A5B', group: 'support' },
  { id: 'support-chat', name: 'الدعم', subtitle: 'محادثة ومساعدة مباشرة', icon: 'chatbubble-ellipses-outline', screen: 'Chat', color: '#0EA5A4', group: 'support' },
];

const serviceGroups = {
  taxi: 'mobility',
  food: 'shopping',
  cafes: 'shopping',
  market: 'shopping',
  kids: 'shopping',
  pharmacy: 'shopping',
  gifts: 'shopping',
  wholesale: 'business',
  'all-services': 'all',
};

const serviceSubtitles = {
  taxi: 'احجز مشوارك بسرعة مع تتبع مباشر',
  food: 'مطاعم ووجبات متنوعة داخل مدينتك',
  cafes: 'قهوة مختصة ومخبوزات وحلويات',
  market: 'طلبات المنزل اليومية من السوبرماركيت',
  kids: 'منتجات وألعاب مختارة للأطفال',
  pharmacy: 'أدوية ومنتجات عناية موثوقة',
  gifts: 'عطور وهدايا وتغليف للمناسبات',
  wholesale: 'توريد منظم حسب مجموعات الشراء',
};

const ServicesScreen = ({ navigation }) => {
  const { rowDirection, textAlignStart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
        subtitle="تنقل، تسوق، وادِر طلباتك من نفس التطبيق"
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
              تصفح الأقسام الأساسية للتطبيق بالأسماء الجديدة التي تعكس الخدمات بشكل أوضح.
            </Text>
          </View>
        </View>

        {filteredServices.map((service) => (
          <AppListCard
            key={service.id}
            title={service.name}
            subtitle={service.subtitle}
            mediaIcon={service.icon}
            mediaColor={service.color}
            metaLabel="SECTION"
            metaValue={serviceGroupLabels[service.group] || 'خدمة'}
            actionLabel="فتح الخدمة"
            onPress={() => handleServicePress(service)}
          />
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
});

export default ServicesScreen;
