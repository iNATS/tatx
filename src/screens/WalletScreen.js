import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { walletTransactions } from '../data/staticData';

const WalletScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const totalBalance = 200.00;

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return { name: 'arrow-down', color: colors.success, bg: colors.success + '15' };
      case 'payment':
        return { name: 'arrow-up', color: colors.primary, bg: colors.primary + '15' };
      case 'refund':
        return { name: 'return-up-back', color: colors.warning, bg: colors.warning + '15' };
      default:
        return { name: 'cash', color: colors.gray, bg: colors.gray + '15' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>المحفظة</Text>
        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>الرصيد الاجمالي</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>{totalBalance.toFixed(2)}</Text>
          <Text style={styles.balanceCurrency}>ر.س</Text>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceAction} activeOpacity={0.8}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="add" size={22} color={colors.white} />
              </View>
              <Text style={styles.actionText}>شحن</Text>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.balanceAction} activeOpacity={0.8}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="arrow-up" size={22} color={colors.white} />
              </View>
              <Text style={styles.actionText}>سحب</Text>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.balanceAction} activeOpacity={0.8}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="swap-horizontal" size={22} color={colors.white} />
              </View>
              <Text style={styles.actionText}>تحويل</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, shadows.sm]}>
            <View style={[styles.statIcon, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="arrow-down" size={20} color={colors.success} />
            </View>
            <Text style={styles.statLabel}>ايداع</Text>
            <Text style={styles.statValue}>500 ر.س</Text>
          </View>
          <View style={[styles.statCard, shadows.sm]}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="arrow-up" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statLabel}>سحب</Text>
            <Text style={styles.statValue}>300 ر.س</Text>
          </View>
        </View>

        {/* Transactions */}
        <View style={[styles.transactionsCard, shadows.sm]}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>سجل المعاملات</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          
          {walletTransactions.map((transaction) => {
            const iconConfig = getTransactionIcon(transaction.type);
            return (
              <TouchableOpacity 
                key={transaction.id} 
                style={styles.transactionItem}
                activeOpacity={0.7}
              >
                <View style={[styles.transactionIcon, { backgroundColor: iconConfig.bg }]}>
                  <Ionicons name={iconConfig.name} size={20} color={iconConfig.color} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionType}>{transaction.typeAr}</Text>
                  <Text style={styles.transactionOrder}>طلب #{transaction.orderId}</Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.isCredit ? colors.success : colors.text },
                  ]}
                >
                  {transaction.isCredit ? '+' : '-'} {transaction.amount.toFixed(2)} ر.س
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Top-up Button */}
      <TouchableOpacity 
        style={[styles.topupButton, { bottom: spacing.md }]}
        activeOpacity={0.8}
      >
        <Ionicons name="wallet" size={22} color={colors.white} />
        <Text style={styles.topupButtonText}>شحن الرصيد</Text>
        <Ionicons name="arrow-forward" size={22} color={colors.white} />
      </TouchableOpacity>
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
    paddingBottom: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 120,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl * 1.5,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  balanceLabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  infoButton: {
    marginLeft: spacing.xs,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  balanceCurrency: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginTop: -8,
    marginBottom: spacing.lg,
  },
  balanceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  balanceAction: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '600',
  },
  actionDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  transactionsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
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
    marginLeft: spacing.md,
  },
  transactionType: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  transactionOrder: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: colors.gray,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  topupButton: {
    position: 'absolute',
    bottom: 0,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
    ...shadows.lg,
  },
  topupButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
});

export default WalletScreen;
