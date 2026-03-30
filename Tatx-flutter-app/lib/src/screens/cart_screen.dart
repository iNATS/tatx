import 'package:flutter/material.dart';

import '../models/app_models.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({
    super.key,
    required this.items,
  });

  final List<CartItem> items;

  @override
  Widget build(BuildContext context) {
    final total = items.fold<double>(0, (sum, item) => sum + (item.item.price * item.quantity));

    return Scaffold(
      appBar: AppBar(title: const Text('السلة')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ...items.map(
            (entry) => Card(
              child: ListTile(
                title: Text(entry.item.name, textAlign: TextAlign.right),
                subtitle: Text('${entry.restaurantName} • ${entry.quantity}x', textAlign: TextAlign.right),
                leading: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(entry.item.imageUrl, width: 56, height: 56, fit: BoxFit.cover),
                ),
                trailing: Text('${(entry.item.price * entry.quantity).toStringAsFixed(0)} ر.س'),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text('الإجمالي', style: TextStyle(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 6),
                  Text('${total.toStringAsFixed(0)} ر.س', style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800)),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton(
                      onPressed: () {},
                      child: const Text('متابعة الدفع'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
