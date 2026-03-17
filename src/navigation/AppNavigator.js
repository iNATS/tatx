import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import WalletScreen from '../screens/WalletScreen';
import ChatScreen from '../screens/ChatScreen';
import LocationScreen from '../screens/LocationScreen';
import TaxiScreen from '../screens/TaxiScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Floating Tab Bar
const FloatingTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
          const isFocused = state.index === index;
          
          const iconName = isFocused
            ? route.name === 'Home' ? 'home' 
              : route.name === 'Taxi' ? 'taxi'
              : route.name === 'Orders' ? 'list'
              : route.name === 'Offers' ? 'pricetag'
              : 'person'
            : route.name === 'Home' ? 'home-outline'
              : route.name === 'Taxi' ? 'taxi-outline'
              : route.name === 'Orders' ? 'list-outline'
              : route.name === 'Offers' ? 'pricetag-outline'
              : 'person-outline';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={route.key} style={styles.tabItem}>
              <TouchableOpacity
                onPress={onPress}
                style={[
                  styles.tabButton,
                  isFocused && styles.tabButtonFocused,
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.tabContent}>
                  <Ionicons 
                    name={iconName} 
                    size={24} 
                    color={isFocused ? colors.white : colors.textSecondary} 
                  />
                  <Text 
                    style={[
                      styles.tabLabel,
                      isFocused && styles.tabLabelFocused,
                    ]}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </View>
                {isFocused && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'الرئيسية' }}
      />
      <Tab.Screen
        name="Taxi"
        component={TaxiScreen}
        options={{ tabBarLabel: 'تاكسي' }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarLabel: 'الطلبات' }}
      />
      <Tab.Screen
        name="Offers"
        component={ProductScreen}
        options={{ tabBarLabel: 'العروض' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ tabBarLabel: 'حسابي' }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* Stack screens accessible from tabs */}
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Search" component={ProductScreen} />
        <Stack.Screen name="RestaurantDetail" component={HomeScreen} />
        <Stack.Screen name="Help" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.xl * 1.5,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    ...shadows.lg,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.xl,
    minWidth: 60,
  },
  tabButtonFocused: {
    backgroundColor: colors.primary,
  },
  tabContent: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  tabLabelFocused: {
    color: colors.white,
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    opacity: 0.3,
  },
});
