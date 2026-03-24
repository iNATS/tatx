import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'تنقل واضح وسهل من أول لحظة',
    subtitle: 'الوصول إلى الخدمات الأساسية والطلبات يتم بخطوات بسيطة وواضحة.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
  },
  {
    id: '2',
    title: 'خدمات يومية للسوق السعودي',
    subtitle: 'مطاعم، مشاوير، ومتاجر محلية بعملة الريال ومحتوى مناسب للمستخدم السعودي.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800',
  },
  {
    id: '3',
    title: 'متابعة أسهل للطلبات والحساب',
    subtitle: 'العناوين، الدفع، والطلبات محفوظة في مكان واحد لتجربة استخدام أكثر سلاسة.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
      return;
    }
    navigation.replace('Login');
  };

  return (
    <LinearGradient colors={['#F5F9FF', '#FFFFFF']} style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item) => (
          <View key={item.id} style={[styles.slide, { width }]}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textBlock}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.ghostButton} activeOpacity={0.8}>
          <Text style={styles.ghostButtonText}>تخطي</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {onboardingData.map((item, index) => (
            <View key={item.id} style={[styles.dot, index === currentIndex && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.primaryButton} activeOpacity={0.9}>
          <Text style={styles.primaryButtonText}>{currentIndex === onboardingData.length - 1 ? 'ابدأ' : 'التالي'}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 36,
    overflow: 'hidden',
    ...shadows.xl,
  },
  image: {
    width: '100%',
    height: '58%',
  },
  textBlock: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'space-between',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'right',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.md,
  },
  footer: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ghostButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  ghostButtonText: {
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  pagination: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: '#D4D9E3',
  },
  dotActive: {
    width: 26,
    backgroundColor: colors.primary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderRadius: borderRadius.full,
    ...shadows.md,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
});

export default OnboardingScreen;
