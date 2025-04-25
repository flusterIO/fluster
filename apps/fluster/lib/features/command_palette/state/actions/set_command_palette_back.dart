import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';

class CommandPaletteBackAction extends FlusterAction {
  CommandPaletteBackAction();

  @override
  GlobalAppState reduce() {
    final hasStack = state.commandPaletteState.navigationStack.length >= 2;
    final newStack = hasStack
        ? state.commandPaletteState.navigationStack.sublist(
            0,
            state.commandPaletteState.navigationStack.length - 1,
          )
        : <CommandPaletteCategory>[];
    final newFilteredItems = newStack.isNotEmpty
        ? newStack[newStack.length - 1].items
        : <CommandPaletteEntry>[];
    if(newStack.isEmpty) {
      closeCommandPalette();
    }
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        navigationStack: newStack,
        open: newStack.isNotEmpty,
        filteredItems: newFilteredItems,
        selectedIndex: 0
      ),
    );
  }
}
