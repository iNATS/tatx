import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const WalletScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { formatCurrency, isRTL, rowDirection, textAlignStart } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  const balance = 2450.00;
  const points = 320;

  const transactions = [
    { id: '1', type: 'credit', title: 'إضافة رصيد', date: 'اليوم، 10:30 ص', amount: 500, icon: 'wallet' },
    { id: '2', type: 'debit', title: 'طلب #ORD-123', date: 'أمس، 2:15 م', amount: -85, icon: 'receipt' },
    { id: '3', type: 'debit', title: 'طلب #ORD-122', date: '15 مارس، 11:00 ص', amount: -120, icon: 'receipt' },
    { id: '4', type: 'credit', title: 'استرجاع مبلغ', date: '14 مارس، 4:30 م', amount: 45, icon: 'return-up-back' },
    { id: '5', type: 'debit', title: 'طلب #ORD-121', date: '12 مارس، 1:00 م', amount: -65, icon: 'receipt' },
  ];

  const quickActions = [
    { id: 'add', title: 'إضافة رصيد', icon: 'add-circle', color: colors.success },
    { id: 'transfer', title: 'تحويل', icon: 'swap-horizontal', color: colors.info },
    { id: 'withdraw', title: 'سحب', icon: 'arrow-up', color: colors.warning },
    { id: 'history', title: 'السجل', icon: 'time', color: colors.primary },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm), flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المحفظة</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Payment')}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.balanceGradient}>
            <View style={[styles.balanceHeader, { flexDirection: 'row-reverse' }]}>
              <Text style={[styles.balanceLabel, { textAlign: textAlignStart }]}>الرصيد الحالي</Text>
              <TouchableOpacity style={styles.infoButton} onPress={() => Alert.alert('المحفظة', 'يمكنك استخدام الرصيد في الطلبات أو استرداده وفق السياسة المعتمدة.')}>
                <Ionicons name="information-circle-outline" size={20} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
            <View style={[styles.balanceActions, { flexDirection: 'row-reverse' }]}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.balanceAction}
                  onPress={() => action.id === 'history' ? setActiveTab('all') : Alert.alert(action.title, `تم فتح خيار ${action.title}.`)}
                >
                  <View style={[styles.balanceActionIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Ionicons name={action.icon} size={22} color={colors.white} />
                  </View>
                  <Text style={styles.balanceActionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={[styles.pointsContent, { flexDirection: 'row-reverse' }]}>
            <View style={styles.pointsIcon}>
              <Ionicons name="star" size={28} color={colors.warning} />
            </View>
            <View style={styles.pointsInfo}>
              <Text style={[styles.pointsLabel, { textAlign: textAlignStart }]}>نقاط المكافآت</Text>
              <Text style={[styles.pointsAmount, { textAlign: textAlignStart }]}>{points} نقطة</Text>
            </View>
            <TouchableOpacity style={styles.pointsButton} onPress={() => Alert.alert('استبدال النقاط', 'سيتم إتاحة استبدال النقاط على الطلب القادم.')}>
              <Text style={styles.pointsButtonText}>استبدال</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={[styles.statsRow, { flexDirection: 'row-reverse' }]}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="arrow-down" size={20} color={colors.success} />
            </View>
            <Text style={styles.statLabel}>إيداع</Text>
            <Text style={styles.statValue}>{formatCurrency(500)}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.error + '15' }]}>
              <Ionicons name="arrow-up" size={20} color={colors.error} />
            </View>
            <Text style={styles.statLabel}>سحب</Text>
            <Text style={styles.statValue}>{formatCurrency(270)}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.info + '15' }]}>
              <Ionicons name="repeat" size={20} color={colors.info} />
            </View>
            <Text style={styles.statLabel}>تحويل</Text>
            <Text style={styles.statValue}>{formatCurrency(150)}</Text>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.transactionsCard}>
          <View style={[styles.transactionsHeader, { flexDirection: 'row-reverse' }]}>
            <Text style={styles.cardTitle}>المعاملات</Text>
            <TouchableOpacity onPress={() => setActiveTab('all')}>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false}>
            <View style={[styles.filterTabs, { flexDirection: 'row-reverse' }]}>
              {['all', 'credit', 'debit'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterTab, activeTab === tab && styles.filterTabActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      activeTab === tab && styles.filterTabTextActive,
                    ]}
                  >
                    {tab === 'all' ? 'الكل' : tab === 'credit' ? 'إيداع' : 'سحب'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Transactions List */}
          <View style={styles.transactionsList}>
            {transactions
              .filter((t) => activeTab === 'all' || t.type === activeTab)
              .map((transaction) => (
                <TouchableOpacity key={transaction.id} style={[styles.transactionItem, { flexDirection: 'row-reverse' }]} onPress={() => Alert.alert(transaction.title, `${transaction.date}\n${formatCurrency(transaction.amount)}`)}>
                  <View
                    style={[
                      styles.transactionIcon,
                      {
                        backgroundColor:
                          transaction.type === 'credit' ? colors.success + '15' : colors.error + '15',
                      },
                    ]}
                  >
                    <Ionicons
                      name={transaction.icon}
                      size={20}
                      color={transaction.type === 'credit' ? colors.success : colors.error}
                    />
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={[styles.transactionTitle, { textAlign: textAlignStart }]}>{transaction.title}</Text>
                    <Text style={[styles.transactionDate, { textAlign: textAlignStart }]}>{transaction.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: transaction.type === 'credit' ? colors.success : colors.error },
                    ]}
                  >
                    {formatCurrency(transaction.amount, { signed: true })}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
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
  // Balance Card
  balanceCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    direction: 'rtl',
    ...shadows.lg,
  },
  balanceGradient: {
    padding: spacing.md,
  },
  balanceHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
  },
  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  balanceActions: {
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  balanceAction: {
    alignItems: 'center',
  },
  balanceActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  balanceActionText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
    textAlign: 'right',
  },
  // Points Card
  pointsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    direction: 'rtl',
    ...shadows.sm,
  },
  pointsContent: {
    alignItems: 'center',
  },
  pointsIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.warning + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsInfo: {
    flex: 1,
    marginHorizontal: spacing.md,
    alignItems: 'flex-end',
  },
  pointsLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  pointsAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  pointsButton: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  pointsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'right',
  },
  // Stats Row
  statsRow: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    direction: 'rtl',
    ...shadows.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'right',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
  },
  // Transactions Card
  transactionsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    direction: 'rtl',
    ...shadows.sm,
  },
  transactionsHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
  filterTabs: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardSecondary,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'right',
  },
  filterTabTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  transactionsList: {
    gap: spacing.sm,
  },
  transactionItem: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default WalletScreen;
