import 'package:fluster/static/styles/static_styles.dart';
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
            Text("Dashboard goes here")
          ],
        ),
      ),
    );
  }
}
