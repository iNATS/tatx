import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

/**
 * SafeAreaWrapper - Provides consistent safe area handling across all screens
 * Wraps content with SafeAreaView for proper notch/status bar handling
 */
const SafeAreaWrapper = ({ children, style, backgroundColor = '#FAFAFA' }) => {
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor }, style]} 
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
