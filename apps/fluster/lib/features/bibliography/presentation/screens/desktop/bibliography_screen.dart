import 'package:fluster/features/scaffold/presentation/widgets/desktop/page_container.dart';
import 'package:flutter/widgets.dart';

class BibliographyScreen extends StatefulWidget {
  const BibliographyScreen({super.key});
  @override
  State<BibliographyScreen> createState() => _BibliographyScreenState();
}

class _BibliographyScreenState extends State<BibliographyScreen> {
  @override
  Widget build(buildContext) {
    return PageContainer(child: Text("Bibliography"));
  }
}
