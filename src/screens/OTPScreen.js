import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors, typography, spacing, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { verifyAuthCode, requestAuthCode } from '../services/authService';

const OTPScreen = ({ navigation, route }) => {
  const { isRTL, setIsAuthenticated, setUser } = useApp();
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const phone = route.params?.phone || '';
  const authMode = route.params?.authMode || 'login';
  const profile = route.params?.profile || {};

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      return;
    }

    setLoading(true);

    const { data, error } = await verifyAuthCode({
      phone,
      code: fullCode,
      mode: authMode,
      profile,
    });

    setLoading(false);

    if (error) {
      Alert.alert('تعذر التحقق', error.message || 'رمز التحقق غير صحيح.');
      return;
    }

    setUser(data?.user || null);
    setIsAuthenticated(true);
  };

  const handleResend = async () => {
    setTimer(30);
    setCode(['', '', '', '']);
    inputRefs.current[0]?.focus();

    const { data } = await requestAuthCode({
      phone,
      mode: authMode,
      profile,
    });

    Alert.alert('تم إرسال رمز جديد', `للاختبار الحالي استخدم الرمز: ${data?.code || '1234'}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{isRTL ? '→' : '←'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>تأكيد كود التفعيل</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          قم بإدخال الكود الذي وصلك عبر خدمة الرسائل القصيرة
        </Text>
        <Text style={styles.phoneText}>{phone}</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <Text style={styles.timer}>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</Text>

        <Text style={styles.resendText}>
          لم يصلك الكود؟ قم بإعادة ارسال الرمز بعد انتهاء الزمن
        </Text>

        <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
          <Text style={[styles.resendButton, timer > 0 && styles.resendButtonDisabled]}>
            إعادة ارسال الرمز
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.verifyButton, code.join('').length === 4 && styles.verifyButtonActive]}
          onPress={handleVerify}
          disabled={loading}
        >
          <Text style={[styles.verifyButtonText, code.join('').length === 4 && styles.verifyButtonTextActive]}>
            {loading ? 'جارٍ التحقق...' : 'تأكيد'}
          </Text>
        </TouchableOpacity>
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    marginHorizontal: spacing.md,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  phoneText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.lg,
    fontFamily: fonts.semiBold,
  },
  codeContainer: {
    flexDirection: 'row-reverse',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: colors.text,
    backgroundColor: colors.grayLight,
  },
  timer: {
    fontSize: 48,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  resendText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  resendButton: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
    marginBottom: spacing.xl,
  },
  resendButtonDisabled: {
    color: colors.gray,
  },
  verifyButton: {
    backgroundColor: colors.grayLight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  verifyButtonActive: {
    backgroundColor: colors.primary,
  },
  verifyButtonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.gray,
  },
  verifyButtonTextActive: {
    color: colors.white,
  },
});

export default OTPScreen;
