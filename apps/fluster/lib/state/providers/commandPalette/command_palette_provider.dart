import 'package:fluster/state/providers/commandPalette/command_palette_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<CommandPaletteState> commandPaletteProvider =
    StateProvider<CommandPaletteState>(
      (Ref<CommandPaletteState> ref) => CommandPaletteState(syncing: false),
    );
