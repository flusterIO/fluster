import 'package:fluster/state/global/global_state.dart';
import 'package:fluster/types/state_types.dart';
import 'package:fluster_ui/widgets/command_palette_item.dart';

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
