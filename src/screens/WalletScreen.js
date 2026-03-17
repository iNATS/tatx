import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';
import { walletTransactions } from '../data/staticData';

const WalletScreen = ({ navigation }) => {
  const totalBalance = 200.00;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>المحفظة الالكترونية</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>الرصيد الاجمالي</Text>
        <Text style={styles.balanceAmount}>ر.س {totalBalance.toFixed(2)}</Text>
      </View>

      {/* Transactions */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>سجل المعاملات</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {walletTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>{transaction.typeAr}</Text>
                <Text style={styles.transactionOrder}>#{transaction.orderId}</Text>
                <Text style={styles.transactionDate}>
                  {transaction.date} {transaction.time}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: transaction.isCredit ? colors.green : colors.primary },
                ]}
              >
                {transaction.isCredit ? '+' : '-'} ر.س {transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Top-up Button */}
      <TouchableOpacity style={styles.topupButton}>
        <Ionicons name="add-circle" size={24} color={colors.white} />
        <Text style={styles.topupButtonText}>شحن الرصيد</Text>
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
    padding: spacing.md,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  balanceContainer: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    margin: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    marginBottom: 4,
  },
  transactionOrder: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'right',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topupButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  topupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});

export default WalletScreen;
