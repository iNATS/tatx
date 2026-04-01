import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const { isRTL, onboardingSlides } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const slides = onboardingSlides?.length ? onboardingSlides : [];

  const handleScroll = (event) => {
    const rawIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    const index = isRTL ? slides.length - 1 - rawIndex : rawIndex;
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      const targetX = isRTL ? (slides.length - 1 - nextIndex) * width : nextIndex * width;
      scrollViewRef.current?.scrollTo({ x: targetX, animated: true });
      return;
    }
    navigation.replace('Login');
  };

  return (
    <LinearGradient colors={['#F5F9FF', '#FFFFFF']} style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        inverted={isRTL}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((item) => (
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
          {slides.map((item, index) => (
            <View key={item.id} style={[styles.dot, index === currentIndex && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.primaryButton} activeOpacity={0.9}>
          <Text style={styles.primaryButtonText}>{currentIndex === slides.length - 1 ? 'ابدأ' : 'التالي'}</Text>
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
    borderWidth: 1, borderColor: colors.borderLight,
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
    flexDirection: 'row-reverse',
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
    flexDirection: 'row-reverse',
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
    borderWidth: 1, borderColor: colors.borderLight,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
});

export default OnboardingScreen;
