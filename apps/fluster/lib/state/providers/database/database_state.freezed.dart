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
  bool get syncing => throw _privateConstructorUsedError;

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
  $Res call({bool syncing});
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
  $Res call({Object? syncing = null}) {
    return _then(
      _value.copyWith(
            syncing:
                null == syncing
                    ? _value.syncing
                    : syncing // ignore: cast_nullable_to_non_nullable
                        as bool,
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
  $Res call({bool syncing});
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
  $Res call({Object? syncing = null}) {
    return _then(
      _$DatabaseStateImpl(
        syncing:
            null == syncing
                ? _value.syncing
                : syncing // ignore: cast_nullable_to_non_nullable
                    as bool,
      ),
    );
  }
}

/// @nodoc

class _$DatabaseStateImpl implements _DatabaseState {
  const _$DatabaseStateImpl({required this.syncing});

  @override
  final bool syncing;

  @override
  String toString() {
    return 'DatabaseState(syncing: $syncing)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DatabaseStateImpl &&
            (identical(other.syncing, syncing) || other.syncing == syncing));
  }

  @override
  int get hashCode => Object.hash(runtimeType, syncing);

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$DatabaseStateImplCopyWith<_$DatabaseStateImpl> get copyWith =>
      __$$DatabaseStateImplCopyWithImpl<_$DatabaseStateImpl>(this, _$identity);
}

abstract class _DatabaseState implements DatabaseState {
  const factory _DatabaseState({required final bool syncing}) =
      _$DatabaseStateImpl;

  @override
  bool get syncing;

  /// Create a copy of DatabaseState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$DatabaseStateImplCopyWith<_$DatabaseStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
