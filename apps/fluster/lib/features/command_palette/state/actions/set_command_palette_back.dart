import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_item.dart';

class CommandPaletteBackAction extends FlusterAction {
  CommandPaletteBackAction();

  @override
  GlobalAppState reduce() {
    final hasStack = state.commandPaletteState.navigationStack.isNotEmpty;
    final navStack = hasStack
        ? state.commandPaletteState.navigationStack.sublist(
            0,
            state.commandPaletteState.navigationStack.length - 1,
          )
        : <String>[];
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        navigationStack: navStack,
        open: !hasStack,
        query: hasStack ? state.commandPaletteState.query : "",
        items: hasStack
            ? state.commandPaletteState.items
            : <CommandPaletteItem>[],
      ),
    );
  }
}
