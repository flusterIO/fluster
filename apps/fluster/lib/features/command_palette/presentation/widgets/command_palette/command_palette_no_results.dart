import 'package:flutter/material.dart';

class CommandPaletteNoResults extends StatelessWidget {
  const CommandPaletteNoResults({super.key});
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 180,
      child: Center(child: const Text("No results found")),
    );
  }
}
