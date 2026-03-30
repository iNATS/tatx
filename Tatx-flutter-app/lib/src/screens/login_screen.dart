import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({
    super.key,
    required this.onLogin,
  });

  final VoidCallback onLogin;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final phoneController = TextEditingController(text: '0555000001');

  @override
  void dispose() {
    phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            const SizedBox(height: 24),
            Center(child: Image.asset('assets/images/logo.png', width: 84)),
            const SizedBox(height: 28),
            Text('تسجيل الدخول', textAlign: TextAlign.right, style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            Text('ادخل رقم الجوال للمتابعة إلى التطبيق.', textAlign: TextAlign.right, style: theme.textTheme.bodyMedium),
            const SizedBox(height: 20),
            TextField(
              controller: phoneController,
              keyboardType: TextInputType.phone,
              textAlign: TextAlign.left,
              decoration: const InputDecoration(
                labelText: 'رقم الجوال',
                hintText: '05XXXXXXXX',
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: widget.onLogin,
                child: const Text('دخول'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
