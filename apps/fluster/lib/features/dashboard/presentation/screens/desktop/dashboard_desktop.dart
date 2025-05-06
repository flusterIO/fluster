import 'dart:math';

import 'package:fluster/core/static/styles/static_styles.dart';
import 'package:fluster/features/brand/presentation/widgets/fluster_logo.dart';
import 'package:fluster/features/dashboard/presentation/widgets/desktop/note_summary/note_summary_list.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart';
import 'package:flutter/widgets.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;

class DashbboardDesktop extends StatefulWidget {
  final bool hasInitialized = false;
  const DashbboardDesktop({super.key});
  @override
  State<DashbboardDesktop> createState() => _DashbboardDesktopState();
}

class _DashbboardDesktopState extends State<DashbboardDesktop> {
  SummaryListResults summaryData = SummaryListResults(mdxNotes: []);
  void getDashboardData() async {
    final x = await SummaryListQuery.default_();
    final data = await native.getSummaryList(query: x);
    setState(() {
      summaryData = data;
    });
  }

  @override
  void initState() {
    super.initState();
    getDashboardData();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);

    return SingleChildScrollView(
      child: Padding(
        padding: centerPagePadding,
        child: Column(
          children: <Widget>[
            Text("Dashboarddddddd"),
            SizedBox(height: 10),
            FlusterLogo(),
            FlusterWideLogo(),
            SizedBox(
              width: min(size.width * 0.7, 600),
              height: 600,
              child: NoteSummaryList(items: summaryData.mdxNotes),
            ),
          ],
        ),
      ),
    );
  }
}
