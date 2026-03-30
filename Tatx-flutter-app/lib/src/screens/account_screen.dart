import 'package:flutter/material.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text('سارة القحطاني', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800)),
                const SizedBox(height: 6),
                Text('عميلة • الرياض', textAlign: TextAlign.right, style: theme.textTheme.bodyMedium),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        ...[
          'الطلبات',
          'العناوين',
          'المحفظة',
          'الإشعارات',
          'الدعم',
        ].map(
          (item) => Card(
            child: ListTile(
              title: Text(item, textAlign: TextAlign.right),
              trailing: const Icon(Icons.chevron_left),
            ),
          ),
        ),
      ],
    );
  }
}
