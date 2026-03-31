import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

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
import PaymentScreen from '../screens/PaymentScreen';
import TaxiScreen from '../screens/TaxiScreen';
import CategoryScreen from '../screens/CategoryScreen';
import VendorSignupScreen from '../screens/VendorSignupScreen';
import WholesaleScreen from '../screens/WholesaleScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import VendorAppScreen from '../screens/VendorAppScreen';
import CategoryVendorDetailScreen from '../screens/CategoryVendorDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.text,
    border: 'transparent',
    primary: colors.primary,
  },
};

const tabConfig = {
  Home: { label: 'الرئيسية', active: 'home', inactive: 'home-outline' },
  Taxi: { label: 'مشوار', active: 'car', inactive: 'car-outline' },
  Shop: { label: 'المتجر', active: 'bag', inactive: 'bag-outline' },
  Orders: { label: 'طلباتي', active: 'receipt', inactive: 'receipt-outline' },
  Account: { label: 'حسابي', active: 'person', inactive: 'person-outline' },
};

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const focusedRoute = state.routes[state.index];
  const focusedOptions = descriptors[focusedRoute.key]?.options || {};

  if (focusedOptions.tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <View style={[styles.tabBarWrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route) => {
          const config = tabConfig[route.name];
          const isFocused = focusedRoute.key === route.key;

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
            <TouchableOpacity key={route.key} style={styles.tabItem} activeOpacity={0.9} onPress={onPress}>
              <View style={[styles.tabPill, isFocused && styles.tabPillFocused]}>
                <Ionicons
                  name={isFocused ? config.active : config.inactive}
                  size={20}
                  color={isFocused ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>{config.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MainTabs = () => (
  <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: tabConfig.Home.label }} />
    <Tab.Screen name="Taxi" component={TaxiScreen} options={{ tabBarLabel: tabConfig.Taxi.label }} />
    <Tab.Screen name="Shop" component={ProductScreen} options={{ tabBarLabel: tabConfig.Shop.label }} />
    <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: tabConfig.Orders.label }} />
    <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: tabConfig.Account.label }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, isRTL } = useApp();
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === 'web' && width >= 768;

  return (
    <View style={[styles.appShell, isWideWeb && styles.appShellWeb]}>
      <View style={[styles.appFrame, isWideWeb && styles.appFrameWeb]}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: isRTL ? 'slide_from_left' : 'slide_from_right' }}>
            {!isAuthenticated ? (
              <>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ animation: 'slide_from_bottom' }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
                <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
                <Stack.Screen name="Wallet" component={WalletScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="Services" component={ServicesScreen} />
                <Stack.Screen name="Location" component={LocationScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="Wholesale" component={WholesaleScreen} />
                <Stack.Screen name="Search" component={ProductScreen} />
                <Stack.Screen name="RestaurantDetail" component={HomeScreen} />
                <Stack.Screen name="Help" component={ChatScreen} />
                <Stack.Screen name="Category" component={CategoryScreen} />
                <Stack.Screen name="CategoryVendorDetail" component={CategoryVendorDetailScreen} />
                <Stack.Screen name="VendorSignup" component={VendorSignupScreen} />
                <Stack.Screen name="VendorApp" component={VendorAppScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBarWrap: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xs,
    backgroundColor: colors.card,
  },
  tabItem: {
    flex: 1,
  },
  tabPill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    gap: 4,
  },
  tabPillFocused: {
    backgroundColor: colors.cardSecondary,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: fonts.regular,
  },
  tabLabelFocused: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appShellWeb: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
  },
  appFrame: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appFrameWeb: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 28,
    overflow: 'hidden',
  },
});
