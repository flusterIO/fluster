import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<ThemeMode> themeProvider = StateProvider<ThemeMode>((StateProviderRef<ThemeMode> ref) => ThemeMode.dark);
