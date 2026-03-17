import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, ActivityIndicator, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { loadFonts } from './src/utils/loadFonts';
import { fonts } from './src/constants/theme';

// Enable RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue even if fonts fail to load
      }
    };
    loadAppFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <AppProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AppProvider>
  );
}
