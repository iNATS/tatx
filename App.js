import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, ActivityIndicator, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { loadFonts } from './src/utils/loadFonts';
import { RTL } from './src/utils/rtl';

// Configure RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
if (typeof I18nManager.swapLeftAndRightInRTL === 'function') {
  I18nManager.swapLeftAndRightInRTL(true);
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();
      } catch (error) {
        console.error('Error loading fonts:', error);
      } finally {
        setFontsLoaded(true);
      }
    };

    loadAppFonts();
  }, []);

  // Configure web RTL
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    // Set RTL direction on HTML element
    document.documentElement.setAttribute('dir', RTL.DIRECTION);
    document.documentElement.setAttribute('lang', 'ar');
    
    // Set RTL direction on body
    document.body.setAttribute('dir', RTL.DIRECTION);
    document.body.style.direction = RTL.DIRECTION;
    document.body.style.textAlign = RTL.TEXT_ALIGN;
    
    // Add RTL class for CSS targeting
    document.documentElement.classList.add('rtl');
    
    // Inject RTL CSS if not exists
    if (!document.getElementById('rtl-styles')) {
      const style = document.createElement('style');
      style.id = 'rtl-styles';
      style.textContent = `
        .rtl {
          direction: rtl !important;
          text-align: right !important;
        }
        .rtl * {
          direction: rtl;
          text-align: right;
        }
        .rtl input, .rtl textarea {
          text-align: right;
          direction: rtl;
        }
        .rtl .horizontal-scroll {
          direction: rtl;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E91E63' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
