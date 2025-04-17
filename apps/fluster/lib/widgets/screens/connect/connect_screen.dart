import 'package:fluster/widgets/wrappers/page_container.dart';
import 'package:flutter/widgets.dart';

class ConnectScreen extends StatefulWidget {
  const ConnectScreen({super.key});
  @override
  State<ConnectScreen> createState() => _ConnectScreenState();
}

class _ConnectScreenState extends State<ConnectScreen> {
  @override
  Widget build(buildContext) {
    return PageContainer(child: Text("Connect"));
  }
}
