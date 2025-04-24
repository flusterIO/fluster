import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';

class CommandPaletteBackAction extends FlusterAction {
  CommandPaletteBackAction();

  @override
  GlobalAppState reduce() {
    final hasStack = state.commandPaletteState.navigationStack.length >= 2;
    final newStack = hasStack
        ? state.commandPaletteState.navigationStack.sublist(
            0,
            state.commandPaletteState.navigationStack.length - 2,
          )
        : <CommandPaletteCategory>[];
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        navigationStack: newStack,
        open: newStack.isNotEmpty,
        query: hasStack ? state.commandPaletteState.query : "",
        items: hasStack
            ? state.commandPaletteState.items
            : <CommandPaletteItem>[],
      ),
    );
  }
}
