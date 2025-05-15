import 'package:async_redux/async_redux.dart';
import 'package:fluster/core/state/store.dart';
import 'package:fluster/features/command_palette/data/models/command_palette_category.dart';
import 'package:fluster/features/command_palette/presentation/widgets/command_palette/command_palette.dart';
import 'package:fluster/features/command_palette/state/actions/set_command_palette_open.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

@immutable
class CommandPalette extends HookWidget {
  final TextEditingController controller = TextEditingController();
  final List<int> selections = [];
  final CommandPaletteCategory initialCategory;
  // final KeyEventResultjV
  CommandPalette({super.key, required this.initialCategory});

  @override
  Widget build(BuildContext context) {
    final hasAnimated = useState(false);
    useEffect(() {
      hasAnimated.value = true;
      return () {};
    }, []);

    return GestureDetector(
      onTap: () {
        context.dispatch(
          SetCommandPaletteOpenAction(false, initialCategory: null),
        );
      },
      child: Expanded(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 64, horizontal: 64),
          // For some reason the click listener only works with this decoration applied.
          decoration: BoxDecoration(color: Colors.transparent),
          child: Positioned(top: 96, child: CommandPaletteWidget()),
        ),
      ),
    );
  }
}
