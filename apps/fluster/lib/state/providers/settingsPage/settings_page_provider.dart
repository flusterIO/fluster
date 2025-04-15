import 'package:fluster/data_models/setting/setting_pages.dart';
import 'package:fluster/state/providers/settingsPage/settings_page_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<SettingsPageState> settingsPageProvider = StateProvider<SettingsPageState>((Ref<SettingsPageState> ref) => SettingsPageState(activeCategoryId: SettingPageId.general));
