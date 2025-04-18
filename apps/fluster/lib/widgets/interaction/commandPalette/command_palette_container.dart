import 'dart:math';

import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_item.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_options.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_palette_search_input.dart';
import 'package:fluster/widgets/interaction/commandPalette/command_pallete_search_results.dart';
import 'package:flutter/material.dart';

final GlobalKey<CommandPaletteState> commandPaletteKey =
    GlobalKey<CommandPaletteState>(debugLabel: 'app shell');

class CommandPalette extends StatefulWidget {
  late CommandPaletteItem root;
  final TextEditingController controller = TextEditingController();
  final List<int> selections = [];

  CommandPalette({super.key});

  @override
  State<CommandPalette> createState() => CommandPaletteState();
}

void showCommandPalette(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext nestedContext) {
      return CommandPalette();
    },
  );
  // commandPaletteInputKey.currentState?.focus();
  // commandPaletteInputKey.currentState.focus();
}

class CommandPaletteState extends State<CommandPalette> {
  @override
  void initState() {
    widget.root = getCommandPaletteRootOption();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final inputValue = widget.controller.value;
    final category = widget.root.getSelectedCategory(widget.selections);
    final entries = category.filterEntries(inputValue.toString());
    final size = MediaQuery.sizeOf(context);
    final theme = Theme.of(context).extension<ShadTheme>();
    return Dialog(
      insetPadding: EdgeInsets.all(50),
      backgroundColor: theme?.background.withOpacity(0.3),
      // surfaceTintColor: theme?.popover.withOpacity(1),
      shape: Border.all(color: theme?.border ?? Colors.white),
      child: FocusTraversalGroup(
        policy: OrderedTraversalPolicy(),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxHeight: min(450, size.height - 120),
            maxWidth: min(980, size.width - 120),
          ),
          child: Column(
            spacing: 32,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CommandPaletteSearchInput(
                key: commandPaletteInputKey,
                controller: widget.controller,
              ),
              CommandPaletteResults(items: entries.toList()),
            ],
          ),
        ),
      ),
    );
  }
}
