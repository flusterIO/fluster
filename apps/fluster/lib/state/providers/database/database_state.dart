import 'package:freezed_annotation/freezed_annotation.dart';

part "database_state.freezed.dart";

@freezed
class DatabaseState with _$DatabaseState {
  const factory DatabaseState({required bool syncing}) = _DatabaseState;
}
