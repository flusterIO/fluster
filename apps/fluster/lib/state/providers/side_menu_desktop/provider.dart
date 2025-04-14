import 'package:fluster/static/data/navigation_items.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';


final StateProvider<SideMenuState> sideMenuProvider =
    StateProvider<SideMenuState>(
      (StateProviderRef<SideMenuState> ref) => SideMenuState(),
    );
