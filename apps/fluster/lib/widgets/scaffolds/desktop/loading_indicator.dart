import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:loading_indicator/loading_indicator.dart';

class DesktopLoadingWidgetIndicator extends StatelessWidget {
  const DesktopLoadingWidgetIndicator({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context).extension<ShadTheme>();
    return LoadingIndicator(
      indicatorType: Indicator.ballPulse,
      colors: [theme!.foreground, theme.primary],
      strokeWidth: 2,
      backgroundColor: Colors.transparent,
      pathBackgroundColor: theme.primary,
    );
  }
}
