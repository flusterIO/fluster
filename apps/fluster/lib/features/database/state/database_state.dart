import 'package:freezed_annotation/freezed_annotation.dart';

part "database_state.freezed.dart";

enum DatabaseStatus {
   notInitialized,
   notConnected,
   connected
}



@freezed
class DatabaseState with _$DatabaseState {
  const DatabaseState._();
  const factory DatabaseState({
    /// Use this key to onboard the user, and use this time to iinitialize the database.
    required DatabaseStatus status,
    // required FocusIndices layoutDimensions,
  }) = _DatabaseState;

  static DatabaseState initialState() => DatabaseState(
    status: DatabaseStatus.notConnected,
  );

  DatabaseState withSettingsPageReset() => DatabaseState.initialState();
}
