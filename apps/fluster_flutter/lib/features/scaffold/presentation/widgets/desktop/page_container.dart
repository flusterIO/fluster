import 'package:fluster/core/static/styles/static_styles.dart';
import 'package:flutter/material.dart';

class PageContainer extends StatelessWidget {
  final Widget child;
  const PageContainer({super.key, required this.child});
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(padding: centerPagePadding, child: child),
    );
  }
}
