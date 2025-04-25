import 'dart:math';

import 'package:flutter/material.dart';
import 'package:loading_indicator/loading_indicator.dart';

class DesktopLoadingWidgetIndicator extends StatelessWidget {
  const DesktopLoadingWidgetIndicator({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.sizeOf(context);
    return Center(
      child: SizedBox(
        width: min(size.width - 64, 350),
        child: LoadingIndicator(
          indicatorType: Indicator.orbit,
          colors: [theme.primaryColorDark, theme.primaryColorLight],
          strokeWidth: 2,
          backgroundColor: Colors.transparent,
          pathBackgroundColor: theme.primaryColor,
        ),
      ),
    );
  }
}
