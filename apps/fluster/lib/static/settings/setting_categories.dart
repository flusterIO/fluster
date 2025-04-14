enum SettingCategory { webInterface, styles, keymap, general }

class SettingsPageCategory {
  final SettingCategory id;
  final String label;
  final String desc;
  const SettingsPageCategory({
    required this.id,
    required this.label,
    required this.desc,
  });
}

class SettingPageCategories {
  static const items = <SettingsPageCategory>[
    SettingsPageCategory(
      id: SettingCategory.general,
      label: "General",
      desc: "General purpose settings.",
    ),
    SettingsPageCategory(
      id: SettingCategory.styles,
      label: "Styles",
      desc: "Change the appearance of your application.",
    ),
    SettingsPageCategory(
      id: SettingCategory.keymap,
      label: "Shortcuts",
      desc: "Change or view your keyboard shortcuts.",
    ),
    SettingsPageCategory(
      id: SettingCategory.webInterface,
      label: "Web Interface",
      desc:
          "Change the way your application interacts with the embedded ULLD web interface. Only modify this if you know what you're doing.",
    ),
  ];
}
