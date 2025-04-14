import 'package:fluster/state/providers/database/database_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<DatabaseState> databaseProvider =
    StateProvider<DatabaseState>(
      (Ref<DatabaseState> ref) => DatabaseState(syncing: false),
    );
