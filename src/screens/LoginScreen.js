import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    navigation.navigate('OTP', { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تسجيل الدخول</Text>
        <Text style={styles.subtitle}>أدخل رقم هاتفك للمتابعة</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d25?w=300' }}
            style={styles.image}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>رقم الهاتف</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+966</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="5xxxxxxxx"
              placeholderTextColor={colors.gray}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={9}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, phoneNumber.length === 9 && styles.buttonActive]}
            onPress={handleSendCode}
            disabled={phoneNumber.length !== 9}
          >
            <Text style={[styles.buttonText, phoneNumber.length === 9 && styles.buttonTextActive]}>
              إرسال الرمز
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    gap: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  countryCode: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    textAlign: 'right',
  },
  button: {
    backgroundColor: colors.grayLight,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray,
  },
  buttonTextActive: {
    color: colors.white,
  },
});

export default LoginScreen;
