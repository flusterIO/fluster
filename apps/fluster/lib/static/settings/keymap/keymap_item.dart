import 'package:fluster/static/settings/keymap/keymap_id.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class KeymapItem extends SingleActivator {
    final KeymapId id;
   const KeymapItem(super.trigger, {required this.id, super.alt, super.meta, super.shift, super.control, super.numLock, super.includeRepeats});
}

class Keymap {
   final Map<KeymapId, KeymapItem> keys = {
    KeymapId.toggleRightPanel: KeymapItem(LogicalKeyboardKey.keyP, id: KeymapId.toggleRightPanel, meta: true),
    KeymapId.toggleLeftPanel: KeymapItem(LogicalKeyboardKey.keyB, id: KeymapId.toggleLeftPanel, meta: true)
    };
}
