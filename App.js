import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, ActivityIndicator, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { loadFonts } from './src/utils/loadFonts';

// Allow RTL layouts without forcing them globally so English can stay LTR.
I18nManager.allowRTL(true);

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
      <StatusBar style="dark" />
      <AppNavigator />
    </AppProvider>
  );
}
