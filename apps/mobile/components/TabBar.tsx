import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const getIconForRoute = (routeName: string) => {
    const icons: Record<string, string> = {
      index: '🏠',
      rides: '🚗',
      food: '🍔',
      profile: '👤',
    };
    return icons[routeName] || '⭐';
  };

  const getLabelForRoute = (routeName: string) => {
    const labels: Record<string, string> = {
      index: 'Home',
      rides: 'Ride',
      food: 'Food',
      profile: 'Profile',
    };
    return labels[routeName] || routeName;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
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

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.iconContainerFocused,
                ]}
              >
                <Text
                  style={[
                    styles.icon,
                    { color: isFocused ? Colors.tabActive : Colors.tabInactive },
                  ]}
                >
                  {getIconForRoute(route.name)}
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? Colors.tabActive : Colors.tabInactive },
                ]}
              >
                {getLabelForRoute(route.name)}
              </Text>
              {isFocused && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
      {Platform.OS === 'ios' && <View style={styles.homeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconContainerFocused: {
    backgroundColor: `${Colors.primary}08`,
  },
  icon: {
    fontSize: 24,
    fontWeight: '600',
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.tabActive,
  },
  homeIndicator: {
    height: 4,
    backgroundColor: Colors.borderLight,
  },
});

export default TabBar;
