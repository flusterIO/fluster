import 'package:fluster/static/enums/navigation_item_id.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// ignore: constant_identifier_names
enum IconType { FontAwesome, Flutter }

class NavigationItem {
  const NavigationItem({
    required this.icon,
    required this.title,
    required this.navigate,
    required this.iconType,
    this.id,
  });
  final IconType iconType;
  final IconData icon;
  final String title;
  final NavigationItemId? id;
  final Function(BuildContext, WidgetRef) navigate;
}
