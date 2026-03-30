import 'package:flutter/material.dart';

import 'app_root.dart';
import '../theme/app_theme.dart';

class TatxFlutterApp extends StatelessWidget {
  const TatxFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tatx Flutter App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      builder: (context, child) {
        return Directionality(
          textDirection: TextDirection.rtl,
          child: child ?? const SizedBox.shrink(),
        );
      },
      home: const AppRoot(),
    );
  }
}
