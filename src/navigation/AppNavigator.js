import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
import DoctorBookingScreen from '../screens/DoctorBookingScreen';
import StayBookingScreen from '../screens/StayBookingScreen';
import StayBookingDetailScreen from '../screens/StayBookingDetailScreen';
import VendorAppScreen from '../screens/VendorAppScreen';

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
  Taxi: { label: 'المشاوير', active: 'car', inactive: 'car-outline' },
  Shop: { label: 'المتجر', active: 'bag', inactive: 'bag-outline' },
  Orders: { label: 'طلباتي', active: 'receipt', inactive: 'receipt-outline' },
  Account: { label: 'حسابي', active: 'person', inactive: 'person-outline' },
};

const FloatingTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarWrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const config = tabConfig[route.name];
          const isFocused = state.index === index;

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
  <Tab.Navigator tabBar={(props) => <FloatingTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: tabConfig.Home.label }} />
    <Tab.Screen name="Taxi" component={TaxiScreen} options={{ tabBarLabel: tabConfig.Taxi.label }} />
    <Tab.Screen name="Shop" component={ProductScreen} options={{ tabBarLabel: tabConfig.Shop.label }} />
    <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: tabConfig.Orders.label }} />
    <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: tabConfig.Account.label }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useApp();

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
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
            <Stack.Screen name="DoctorBooking" component={DoctorBookingScreen} />
            <Stack.Screen name="StayBooking" component={StayBookingScreen} />
            <Stack.Screen name="StayBookingDetail" component={StayBookingDetailScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Wholesale" component={WholesaleScreen} />
            <Stack.Screen name="Search" component={ProductScreen} />
            <Stack.Screen name="RestaurantDetail" component={HomeScreen} />
            <Stack.Screen name="Help" component={ChatScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="VendorSignup" component={VendorSignupScreen} />
            <Stack.Screen name="VendorApp" component={VendorAppScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  tabBar: {
    marginHorizontal: spacing.lg,
    padding: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 28,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    ...shadows.float,
  },
  tabItem: {
    flex: 1,
  },
  tabPill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    paddingVertical: 10,
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
});
