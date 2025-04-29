// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'database_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$DatabaseState {
  /// Use this key to onboard the user, and use this time to iinitialize the database.
  native.FlusterDatabaseStatus get status => throw _privateConstructorUsedError;

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $DatabaseStateCopyWith<DatabaseState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DatabaseStateCopyWith<$Res> {
  factory $DatabaseStateCopyWith(
    DatabaseState value,
    $Res Function(DatabaseState) then,
  ) = _$DatabaseStateCopyWithImpl<$Res, DatabaseState>;
  @useResult
  $Res call({native.FlusterDatabaseStatus status});
}

/// @nodoc
class _$DatabaseStateCopyWithImpl<$Res, $Val extends DatabaseState>
    implements $DatabaseStateCopyWith<$Res> {
  _$DatabaseStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? status = null}) {
    return _then(
      _value.copyWith(
            status:
                null == status
                    ? _value.status
                    : status // ignore: cast_nullable_to_non_nullable
                        as native.FlusterDatabaseStatus,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$DatabaseStateImplCopyWith<$Res>
    implements $DatabaseStateCopyWith<$Res> {
  factory _$$DatabaseStateImplCopyWith(
    _$DatabaseStateImpl value,
    $Res Function(_$DatabaseStateImpl) then,
  ) = __$$DatabaseStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({native.FlusterDatabaseStatus status});
}

/// @nodoc
class __$$DatabaseStateImplCopyWithImpl<$Res>
    extends _$DatabaseStateCopyWithImpl<$Res, _$DatabaseStateImpl>
    implements _$$DatabaseStateImplCopyWith<$Res> {
  __$$DatabaseStateImplCopyWithImpl(
    _$DatabaseStateImpl _value,
    $Res Function(_$DatabaseStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? status = null}) {
    return _then(
      _$DatabaseStateImpl(
        status:
            null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                    as native.FlusterDatabaseStatus,
      ),
    );
  }
}

/// @nodoc

class _$DatabaseStateImpl extends _DatabaseState {
  const _$DatabaseStateImpl({required this.status}) : super._();

  /// Use this key to onboard the user, and use this time to iinitialize the database.
  @override
  final native.FlusterDatabaseStatus status;

  @override
  String toString() {
    return 'DatabaseState(status: $status)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DatabaseStateImpl &&
            (identical(other.status, status) || other.status == status));
  }

  @override
  int get hashCode => Object.hash(runtimeType, status);

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$DatabaseStateImplCopyWith<_$DatabaseStateImpl> get copyWith =>
      __$$DatabaseStateImplCopyWithImpl<_$DatabaseStateImpl>(this, _$identity);
}

abstract class _DatabaseState extends DatabaseState {
  const factory _DatabaseState({
    required final native.FlusterDatabaseStatus status,
  }) = _$DatabaseStateImpl;
  const _DatabaseState._() : super._();

  /// Use this key to onboard the user, and use this time to iinitialize the database.
  @override
  native.FlusterDatabaseStatus get status;

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$DatabaseStateImplCopyWith<_$DatabaseStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
