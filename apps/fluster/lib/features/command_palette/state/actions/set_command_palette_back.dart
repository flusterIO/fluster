import 'package:fluster/core/global_actions/global_action_map.dart';
import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/state/command_palette_state.dart';

class CommandPaletteBackAction extends FlusterAction {
  CommandPaletteBackAction();

  @override
  Future<GlobalAppState> reduce() async {
    final hasStack = state.commandPaletteState.navigationStack.length >= 2;
    final newStack = hasStack
        ? state.commandPaletteState.navigationStack.sublist(
            0,
            state.commandPaletteState.navigationStack.length - 1,
          )
        : <CommandPaletteCategory>[];
    final newFilteredItems = newStack.isNotEmpty
        ? await (newStack[newStack.length - 1] as CommandPaletteCategory)
              .getItemsOnEnter()
        : <CommandPaletteEntry>[];
    if (newStack.isEmpty) {
      closeCommandPalette();
    }
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        navigationStack: newStack,
        open: newStack.isNotEmpty,
        filteredItems: newFilteredItems,
        selectedIndex: 0,
        view: (newStack[newStack.length - 1] as CommandPaletteCategory?)?.layout ?? CommandPaletteView.list
      ),
    );
  }
}
