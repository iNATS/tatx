import React from 'react';
import { I18nManager, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';

/**
 * SafeAreaWrapper - Provides consistent safe area handling across all screens
 * Wraps content with SafeAreaView for proper notch/status bar handling
 */
const SafeAreaWrapper = ({ children, style, backgroundColor = colors.background }) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor,
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          textAlign: I18nManager.isRTL ? 'right' : 'left',
        },
        style,
      ]}
      edges={['top', 'bottom']}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
