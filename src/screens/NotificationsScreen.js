import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const initialNotifications = [
  { id: '1', type: 'order', title: 'تم قبول طلبك', message: 'مطعم برجر السرايا بدأ تجهيز الطلب الآن.', time: 'قبل 8 دقائق', unread: true, icon: 'bag-handle-outline' },
  { id: '2', type: 'ride', title: 'السائق في الطريق', message: 'الكابتن أحمد يبعد 4 دقائق عن موقعك.', time: 'قبل 15 دقيقة', unread: true, icon: 'car-outline' },
  { id: '3', type: 'offer', title: 'عرض جديد', message: 'خصم 20% على طلبات الجملة اليوم فقط.', time: 'اليوم', unread: false, icon: 'pricetag-outline' },
  { id: '4', type: 'booking', title: 'تأكيد الموعد', message: 'تم تأكيد موعدك مع د. نورة غدًا الساعة 7:00 م.', time: 'اليوم', unread: false, icon: 'medkit-outline' },
  { id: '5', type: 'booking', title: 'حجز الشاليه جاهز للمراجعة', message: 'تم حفظ تفاصيل الحجز بانتظار تأكيدك النهائي.', time: 'أمس', unread: false, icon: 'home-outline' },
];

const filters = [
  { id: 'all', label: 'الكل', icon: 'apps-outline' },
  { id: 'order', label: 'الطلبات', icon: 'receipt-outline' },
  { id: 'ride', label: 'المشاوير', icon: 'car-outline' },
  { id: 'booking', label: 'الحجوزات', icon: 'calendar-outline' },
  { id: 'offer', label: 'العروض', icon: 'pricetag-outline' },
];

const NotificationsScreen = ({ navigation }) => {
  const { rowDirection, textAlignStart } = useApp();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [notifications, searchQuery, selectedFilter]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const openNotification = (item) => {
    setNotifications((prev) => prev.map((entry) => (entry.id === item.id ? { ...entry, unread: false } : entry)));

    if (item.type === 'ride') {
      navigation.navigate('Taxi');
      return;
    }

    if (item.type === 'order') {
      navigation.navigate('Orders');
      return;
    }

    if (item.type === 'offer') {
      navigation.navigate('Wholesale');
      return;
    }

    navigation.navigate('DoctorBooking');
  };

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title="الإشعارات"
        subtitle="كل تحديثات الطلبات والمشاوير والحجوزات في مكان واحد"
        actionIcon="checkmark-done-outline"
        onActionPress={markAllRead}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث داخل الإشعارات"
        filters={filters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredNotifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.notificationCard,
              { flexDirection: rowDirection },
              item.unread && styles.notificationCardUnread,
            ]}
            onPress={() => openNotification(item)}
            activeOpacity={0.9}
          >
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.notificationText}>
              <View style={[styles.notificationHeader, { flexDirection: rowDirection }]}>
                <Text style={styles.notificationTime}>{item.time}</Text>
                <Text style={[styles.notificationTitle, { textAlign: textAlignStart }]}>{item.title}</Text>
              </View>
              <Text style={[styles.notificationMessage, { textAlign: textAlignStart }]}>{item.message}</Text>
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
  notificationCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  notificationCardUnread: {
    borderWidth: 1,
    borderColor: '#F3C6CF',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  notificationHeader: { justifyContent: 'space-between', alignItems: 'center' },
  notificationTitle: { flex: 1, color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  notificationTime: { color: colors.textTertiary, fontSize: 12, marginHorizontal: spacing.sm },
  notificationMessage: { color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 21 },
});

export default NotificationsScreen;
