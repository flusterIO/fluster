import 'package:flutter/material.dart';

class CommandPaletteNoResults extends StatelessWidget {
  final double width;
  const CommandPaletteNoResults({super.key, required this.width});
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 180,
      width: width,
      child: Center(child: const Text("No results found")),
    );
  }
}
