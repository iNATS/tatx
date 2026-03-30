import 'package:flutter/material.dart';

import '../data/mock_data.dart';
import '../models/app_models.dart';
import 'account_screen.dart';
import 'cart_screen.dart';
import 'home_screen.dart';
import 'notifications_screen.dart';
import 'restaurant_detail_screen.dart';
import 'restaurants_screen.dart';
import 'wholesale_screen.dart';

class AppShellScreen extends StatefulWidget {
  const AppShellScreen({super.key});

  @override
  State<AppShellScreen> createState() => _AppShellScreenState();
}

class _AppShellScreenState extends State<AppShellScreen> {
  int selectedIndex = 0;
  final List<CartItem> cartItems = [];

  void _openRestaurant(Restaurant restaurant) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => RestaurantDetailScreen(
          restaurant: restaurant,
          onAddToCart: (item) {
            setState(() {
              final index = cartItems.indexWhere((entry) => entry.item.id == item.id);
              if (index >= 0) {
                cartItems[index] = cartItems[index].copyWith(quantity: cartItems[index].quantity + 1);
              } else {
                cartItems.add(CartItem(item: item, quantity: 1, restaurantName: restaurant.name));
              }
            });
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('تمت إضافة ${item.name} إلى السلة')),
            );
          },
        ),
      ),
    );
  }

  void _openCart() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => CartScreen(items: cartItems)),
    );
  }

  void _openNotifications() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const NotificationsScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeScreen(
        onOpenRestaurants: () => setState(() => selectedIndex = 1),
        onOpenRestaurant: _openRestaurant,
        onOpenWholesale: () => setState(() => selectedIndex = 2),
        onOpenNotifications: _openNotifications,
      ),
      RestaurantsScreen(onOpenRestaurant: _openRestaurant),
      const WholesaleScreen(),
      const AccountScreen(),
    ];

    final titles = ['Tatx', 'مطاعم', 'سوق الجملة', 'الحساب'];

    return Scaffold(
      appBar: AppBar(
        title: Text(titles[selectedIndex]),
        actions: [
          IconButton(
            onPressed: _openCart,
            icon: Badge.count(
              count: cartItems.fold<int>(0, (sum, item) => sum + item.quantity),
              isLabelVisible: cartItems.isNotEmpty,
              child: const Icon(Icons.shopping_bag_outlined),
            ),
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: SafeArea(child: pages[selectedIndex]),
      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedIndex,
        onDestinationSelected: (value) => setState(() => selectedIndex = value),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'الرئيسية'),
          NavigationDestination(icon: Icon(Icons.restaurant_outlined), selectedIcon: Icon(Icons.restaurant), label: 'مطاعم'),
          NavigationDestination(icon: Icon(Icons.layers_outlined), selectedIcon: Icon(Icons.layers), label: 'الجملة'),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'الحساب'),
        ],
      ),
    );
  }
}
