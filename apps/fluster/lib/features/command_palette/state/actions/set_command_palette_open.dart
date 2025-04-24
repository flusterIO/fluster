import 'package:fluster/core/state/global_state.dart';
import 'package:fluster/core/types/state_types.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

@freezed
class SetCommandPaletteOpenAction extends FlusterAction {
  final bool open;
  final CommandPaletteCategory? initialCategory;
  SetCommandPaletteOpenAction(this.open, {required this.initialCategory});

  @override
  GlobalAppState reduce() {
    assert(!(open && initialCategory == null), "Received a SetCommandPaletteOpenAction request without an initial category.");
    return state.copyWith(
      commandPaletteState: state.commandPaletteState.copyWith(
        open: open,
        navigationStack: initialCategory != null ? <CommandPaletteCategory>[initialCategory!] : [],
      ),
    );
  }
}
