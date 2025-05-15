import "package:fluent_ui/fluent_ui.dart";
import "package:fluster/core/global_actions/global_action.dart";
import "package:fluster/core/global_actions/global_action_ids.dart";
import "package:flutter/services.dart";
import "package:flutter_test/flutter_test.dart";

void main() {
  late GlobalAction sut;

  setUp(() {
    sut = GlobalAction(
      globalActionId: GlobalActionId.selectItemUp,
      activator: SingleActivator(
        LogicalKeyboardKey.keyG,
        alt: true,
        meta: false,
        control: true,
        shift: false,
      ),
    );
  });
  group("Global Action", () {
    test("Parses activator to and from strings successfully.", () {
      final s = sut.toString();

      final sut2 = GlobalAction(globalActionId: GlobalActionId.selectItemUp);
      sut2.applyActivatorString(s);
      expect(
        sut2.activator!.trigger.keyId,
        sut.activator!.trigger.keyId,
        reason: "Key id's match",
      );

      expect(
        sut2.activator!.shift,
        sut.activator!.shift,
        reason: "Shift key matches",
      );
      expect(
        sut2.activator!.alt,
        sut.activator!.alt,
        reason: "Alt key matches",
      );
      expect(
        sut2.activator!.meta,
        sut.activator!.meta,
        reason: "Meta key matches",
      );
      expect(
        sut2.activator!.control,
        sut.activator!.control,
        reason: "Control key matches",
      );
    });
  });
}
