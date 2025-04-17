import 'package:fluster/static/styles/brand/brand_styles.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class FlusterLogo extends StatelessWidget {
  final bool colored;
  final double size;
  const FlusterLogo({super.key, this.colored = true, this.size = 120});

  ColorFilter _getColorFilter() {
    return colored
        ? ColorFilter.mode(flusterBlue, BlendMode.srcIn)
        : ColorFilter.mode(Colors.white, BlendMode.srcIn);
  }

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      "lib/static/assets/images/logo/fluster.svg",
      width: size,
      height: size,
      colorFilter: _getColorFilter(),
    );
  }
}

class FlusterWideLogo extends StatelessWidget {
  final double height;
  const FlusterWideLogo({super.key, this.height = 120});
  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final theme = t.extension<ShadTheme>();
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      spacing: 4,
      children: [
        FlusterLogo(
          colored: true,
          // TODO: Figure out how to pass props without this fucking constant error.
          size: height * 0.8,
        ),
        Container(
          decoration: BoxDecoration(color: theme?.foreground),
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
              "Be less dum",
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
