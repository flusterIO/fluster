import 'dart:math';

import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:loading_indicator/loading_indicator.dart';

class DesktopLoadingWidgetIndicator extends StatelessWidget {
  const DesktopLoadingWidgetIndicator({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context).extension<ShadTheme>();
    final size = MediaQuery.sizeOf(context);
    return Center(
      child: SizedBox(
        width: min(size.width - 64, 350),
        child: LoadingIndicator(
          indicatorType: Indicator.orbit,
          colors: [
            theme?.foreground ?? Colors.blue,
            theme?.primary ?? Colors.yellow,
          ],
          strokeWidth: 2,
          backgroundColor: Colors.transparent,
          pathBackgroundColor: theme?.primary,
        ),
      ),
    );
  }
}
