import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { colors, spacing } from '../constants/theme';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'اهلا بكم',
    subtitle: 'شكرا لتحميلكم تاتكس',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d25?w=400',
  },
  {
    id: '2',
    title: 'دائما معك',
    subtitle: 'خدمات متعددة في شاشة واحدة',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
  },
  {
    id: '3',
    title: 'اطلب الآن',
    subtitle: 'توصيل سريع وطعام لذيذ',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {onboardingData.map((item, index) => (
          <View key={item.id} style={[styles.slide, { width }]}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            </View>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>تخطي</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === onboardingData.length - 1 ? 'ابدأ' : 'التالي'}
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    backgroundColor: colors.grayLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.lg,
  },
  skipButton: {
    padding: spacing.sm,
  },
  skipText: {
    fontSize: 16,
    color: colors.primary,
  },
  pagination: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.grayLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  nextButton: {
    padding: spacing.sm,
  },
  nextText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
