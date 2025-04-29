import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_entry.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:fluster/features/navigation/business/entities/router/router.dart';
import 'package:go_router/go_router.dart';

class GoRouteCommandPaletteOption extends CommandPaletteEntry {
  final String url;
  const GoRouteCommandPaletteOption({
    required this.url,
    required super.category,
    required super.items,
    required super.desc,
    required super.label,
  });

  @override
  void callAction() {
    mainAppScaffoldKey.currentContext?.go(url);
    globalReduxStore.dispatch(SetCommandPaletteOpenAction(false, initialCategory: null));
  }
}
