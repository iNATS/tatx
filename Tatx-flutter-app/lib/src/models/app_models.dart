class AppCategory {
  const AppCategory({
    required this.id,
    required this.name,
    required this.icon,
    required this.colorHex,
  });

  final String id;
  final String name;
  final String icon;
  final int colorHex;
}

class OfferBanner {
  const OfferBanner({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.vendor,
    required this.imageUrl,
  });

  final String id;
  final String title;
  final String subtitle;
  final String vendor;
  final String imageUrl;
}

class Restaurant {
  const Restaurant({
    required this.id,
    required this.name,
    required this.subtitle,
    required this.imageUrl,
    required this.rating,
    required this.deliveryTime,
    required this.deliveryFee,
    required this.minimumOrder,
    required this.promo,
    required this.groups,
  });

  final String id;
  final String name;
  final String subtitle;
  final String imageUrl;
  final double rating;
  final String deliveryTime;
  final double deliveryFee;
  final double minimumOrder;
  final String promo;
  final List<MenuGroup> groups;
}

class MenuGroup {
  const MenuGroup({
    required this.id,
    required this.title,
    required this.items,
  });

  final String id;
  final String title;
  final List<MenuItem> items;
}

class MenuItem {
  const MenuItem({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
    required this.time,
    this.tag,
  });

  final String id;
  final String name;
  final String description;
  final double price;
  final String imageUrl;
  final String time;
  final String? tag;
}

class WholesaleGroup {
  const WholesaleGroup({
    required this.id,
    required this.title,
    required this.subtitle,
  });

  final String id;
  final String title;
  final String subtitle;
}

class CartItem {
  const CartItem({
    required this.item,
    required this.quantity,
    required this.restaurantName,
  });

  final MenuItem item;
  final int quantity;
  final String restaurantName;

  CartItem copyWith({
    MenuItem? item,
    int? quantity,
    String? restaurantName,
  }) {
    return CartItem(
      item: item ?? this.item,
      quantity: quantity ?? this.quantity,
      restaurantName: restaurantName ?? this.restaurantName,
    );
  }
}

class AppNotification {
  const AppNotification({
    required this.id,
    required this.title,
    required this.body,
    required this.timeLabel,
  });

  final String id;
  final String title;
  final String body;
  final String timeLabel;
}
