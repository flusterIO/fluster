import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';

class FlusterLogo extends StatelessWidget {
  final bool colored;
  final double size;
  const FlusterLogo({super.key, this.colored = true, this.size = 120});

  @override
  Widget build(BuildContext context) {
    return Icon(FluentIcons.brain_circuit_24_filled);
  }
}

class FlusterWideLogo extends StatelessWidget {
  final double height;
  const FlusterWideLogo({super.key, this.height = 120});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      spacing: 4,
      children: [
        FlusterLogo(
          colored: true,
          size: height * 0.8,
        ),
        Container(
          decoration: BoxDecoration(color: theme.textTheme.bodyMedium!.color!),
          height: height,
          width: 2,
        ),
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Fluster",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 1,
                fontSize: height * 0.35,
              ),
            ),
            Text(
              "Be less dum.",
              style: TextStyle(
                fontWeight: FontWeight.w300,
                height: 1,
                fontSize: height * 0.15,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
