import 'package:fluster/core/static/styles/static_styles.dart';
import 'package:fluster/features/brand/presentation/widgets/fluster_logo.dart';
import 'package:flutter/widgets.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({super.key});
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: centerPagePadding,
        child: const Column(
          children: <Widget>[
            SizedBox(height: 18),
            Text("Dashboardddddd"),
            SizedBox(height: 10),
            FlusterLogo(),
            FlusterWideLogo(),
          ],
        ),
      ),
    );
  }
}
