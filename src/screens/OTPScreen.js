import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, fonts, borderRadius } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { verifyAuthCode, requestAuthCode } from '../services/authService';

const OTPScreen = ({ navigation, route }) => {
  const { isRTL, setIsAuthenticated, setUser } = useApp();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const inputRefs = useRef([]);
  const phone = route.params?.phone || '';
  const authMode = route.params?.authMode || 'login';
  const profile = route.params?.profile || {};
  const otpCode = route.params?.otpCode || '1234';

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

  const isCodeComplete = code.join('').length === 4;

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      return;
    }

    setButtonPressed(true);
    setLoading(true);

    try {
      const { data, error } = await verifyAuthCode({
        phone,
        code: fullCode,
        mode: authMode,
        profile,
      });

      if (error) {
        Alert.alert('تعذر التحقق', error.message || 'رمز التحقق غير صحيح.');
        setLoading(false);
        setButtonPressed(false);
        return;
      }

      setUser(data?.user || null);
      setIsAuthenticated(true);
    } catch (err) {
      Alert.alert('حدث خطأ', 'يرجى المحاولة مرة أخرى.');
      setLoading(false);
      setButtonPressed(false);
    }
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={insets.top}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.lg }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
                returnKeyType={index < 3 ? 'next' : 'done'}
                selectTextOnFocus
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
            style={[styles.verifyButton, isCodeComplete && styles.verifyButtonActive, buttonPressed && styles.verifyButtonPressed]}
            onPress={handleVerify}
            disabled={loading || !isCodeComplete}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isCodeComplete ? colors.primaryGradient : [colors.grayLight, colors.grayLight]}
              style={styles.verifyButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={[styles.verifyButtonText, isCodeComplete && styles.verifyButtonTextActive]}>
                  تأكيد
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
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
    borderRadius: borderRadius.full,
    minWidth: 200,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  verifyButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  verifyButtonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  verifyButtonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.gray,
    letterSpacing: 0.5,
  },
  verifyButtonTextActive: {
    color: colors.white,
  },
});

export default OTPScreen;
