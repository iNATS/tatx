import 'package:flutter/material.dart';

import '../data/mock_data.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الإشعارات')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: appNotifications.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final notification = appNotifications[index];
          return Card(
            child: ListTile(
              title: Text(notification.title, textAlign: TextAlign.right),
              subtitle: Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Text(notification.body, textAlign: TextAlign.right),
              ),
              trailing: Text(notification.timeLabel, style: Theme.of(context).textTheme.labelSmall),
            ),
          );
        },
      ),
    );
  }
}
