// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'settings_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$SettingsState {
  Settings get settings => throw _privateConstructorUsedError;

  /// false initially, and set to true after the database is read and the settings have been set appropriately.
  bool get hasSeeded => throw _privateConstructorUsedError;

  /// Create a copy of SettingsState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $SettingsStateCopyWith<SettingsState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SettingsStateCopyWith<$Res> {
  factory $SettingsStateCopyWith(
    SettingsState value,
    $Res Function(SettingsState) then,
  ) = _$SettingsStateCopyWithImpl<$Res, SettingsState>;
  @useResult
  $Res call({Settings settings, bool hasSeeded});
}

/// @nodoc
class _$SettingsStateCopyWithImpl<$Res, $Val extends SettingsState>
    implements $SettingsStateCopyWith<$Res> {
  _$SettingsStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of SettingsState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? settings = null, Object? hasSeeded = null}) {
    return _then(
      _value.copyWith(
            settings:
                null == settings
                    ? _value.settings
                    : settings // ignore: cast_nullable_to_non_nullable
                        as Settings,
            hasSeeded:
                null == hasSeeded
                    ? _value.hasSeeded
                    : hasSeeded // ignore: cast_nullable_to_non_nullable
                        as bool,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$SettingsStateImplCopyWith<$Res>
    implements $SettingsStateCopyWith<$Res> {
  factory _$$SettingsStateImplCopyWith(
    _$SettingsStateImpl value,
    $Res Function(_$SettingsStateImpl) then,
  ) = __$$SettingsStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({Settings settings, bool hasSeeded});
}

/// @nodoc
class __$$SettingsStateImplCopyWithImpl<$Res>
    extends _$SettingsStateCopyWithImpl<$Res, _$SettingsStateImpl>
    implements _$$SettingsStateImplCopyWith<$Res> {
  __$$SettingsStateImplCopyWithImpl(
    _$SettingsStateImpl _value,
    $Res Function(_$SettingsStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of SettingsState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? settings = null, Object? hasSeeded = null}) {
    return _then(
      _$SettingsStateImpl(
        settings:
            null == settings
                ? _value.settings
                : settings // ignore: cast_nullable_to_non_nullable
                    as Settings,
        hasSeeded:
            null == hasSeeded
                ? _value.hasSeeded
                : hasSeeded // ignore: cast_nullable_to_non_nullable
                    as bool,
      ),
    );
  }
}

/// @nodoc

class _$SettingsStateImpl extends _SettingsState {
  const _$SettingsStateImpl({required this.settings, this.hasSeeded = false})
    : super._();

  @override
  final Settings settings;

  /// false initially, and set to true after the database is read and the settings have been set appropriately.
  @override
  @JsonKey()
  final bool hasSeeded;

  @override
  String toString() {
    return 'SettingsState(settings: $settings, hasSeeded: $hasSeeded)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SettingsStateImpl &&
            (identical(other.settings, settings) ||
                other.settings == settings) &&
            (identical(other.hasSeeded, hasSeeded) ||
                other.hasSeeded == hasSeeded));
  }

  @override
  int get hashCode => Object.hash(runtimeType, settings, hasSeeded);

  /// Create a copy of SettingsState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$SettingsStateImplCopyWith<_$SettingsStateImpl> get copyWith =>
      __$$SettingsStateImplCopyWithImpl<_$SettingsStateImpl>(this, _$identity);
}

abstract class _SettingsState extends SettingsState {
  const factory _SettingsState({
    required final Settings settings,
    final bool hasSeeded,
  }) = _$SettingsStateImpl;
  const _SettingsState._() : super._();

  @override
  Settings get settings;

  /// false initially, and set to true after the database is read and the settings have been set appropriately.
  @override
  bool get hasSeeded;

  /// Create a copy of SettingsState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$SettingsStateImplCopyWith<_$SettingsStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
