import 'package:fluster/state/providers/settings/settings_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<SettingsState> settingsProvider =
    StateProvider<SettingsState>((Ref<SettingsState> ref) => SettingsState());
