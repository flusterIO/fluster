import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/command_palette_tree/command_palette_root.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';


class SetCommandPaletteOpenAction extends FlusterAction {
  final bool open;
  final CommandPaletteCategory initialCategory;
  SetCommandPaletteOpenAction(
    this.open, {
    this.initialCategory = const CommandPaletteRoot(),
  });

  @override
  GlobalAppState reduce() {
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        open: open,
        navigationStack: <CommandPaletteCategory>[initialCategory],
      ),
    );
  }
}
