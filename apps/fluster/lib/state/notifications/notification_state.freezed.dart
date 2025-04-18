// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'notification_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$GlobalNotificationState {
  List<ToastNotificationItem> get toasts => throw _privateConstructorUsedError;

  /// Create a copy of GlobalNotificationState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $GlobalNotificationStateCopyWith<GlobalNotificationState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $GlobalNotificationStateCopyWith<$Res> {
  factory $GlobalNotificationStateCopyWith(
    GlobalNotificationState value,
    $Res Function(GlobalNotificationState) then,
  ) = _$GlobalNotificationStateCopyWithImpl<$Res, GlobalNotificationState>;
  @useResult
  $Res call({List<ToastNotificationItem> toasts});
}

/// @nodoc
class _$GlobalNotificationStateCopyWithImpl<
  $Res,
  $Val extends GlobalNotificationState
>
    implements $GlobalNotificationStateCopyWith<$Res> {
  _$GlobalNotificationStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of GlobalNotificationState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? toasts = null}) {
    return _then(
      _value.copyWith(
            toasts:
                null == toasts
                    ? _value.toasts
                    : toasts // ignore: cast_nullable_to_non_nullable
                        as List<ToastNotificationItem>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$GlobalNotificationStateImplCopyWith<$Res>
    implements $GlobalNotificationStateCopyWith<$Res> {
  factory _$$GlobalNotificationStateImplCopyWith(
    _$GlobalNotificationStateImpl value,
    $Res Function(_$GlobalNotificationStateImpl) then,
  ) = __$$GlobalNotificationStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<ToastNotificationItem> toasts});
}

/// @nodoc
class __$$GlobalNotificationStateImplCopyWithImpl<$Res>
    extends
        _$GlobalNotificationStateCopyWithImpl<
          $Res,
          _$GlobalNotificationStateImpl
        >
    implements _$$GlobalNotificationStateImplCopyWith<$Res> {
  __$$GlobalNotificationStateImplCopyWithImpl(
    _$GlobalNotificationStateImpl _value,
    $Res Function(_$GlobalNotificationStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of GlobalNotificationState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? toasts = null}) {
    return _then(
      _$GlobalNotificationStateImpl(
        toasts:
            null == toasts
                ? _value._toasts
                : toasts // ignore: cast_nullable_to_non_nullable
                    as List<ToastNotificationItem>,
      ),
    );
  }
}

/// @nodoc

class _$GlobalNotificationStateImpl extends _GlobalNotificationState {
  const _$GlobalNotificationStateImpl({
    final List<ToastNotificationItem> toasts = const [],
  }) : _toasts = toasts,
       super._();

  final List<ToastNotificationItem> _toasts;
  @override
  @JsonKey()
  List<ToastNotificationItem> get toasts {
    if (_toasts is EqualUnmodifiableListView) return _toasts;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_toasts);
  }

  @override
  String toString() {
    return 'GlobalNotificationState(toasts: $toasts)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$GlobalNotificationStateImpl &&
            const DeepCollectionEquality().equals(other._toasts, _toasts));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(_toasts));

  /// Create a copy of GlobalNotificationState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$GlobalNotificationStateImplCopyWith<_$GlobalNotificationStateImpl>
  get copyWith => __$$GlobalNotificationStateImplCopyWithImpl<
    _$GlobalNotificationStateImpl
  >(this, _$identity);
}

abstract class _GlobalNotificationState extends GlobalNotificationState {
  const factory _GlobalNotificationState({
    final List<ToastNotificationItem> toasts,
  }) = _$GlobalNotificationStateImpl;
  const _GlobalNotificationState._() : super._();

  @override
  List<ToastNotificationItem> get toasts;

  /// Create a copy of GlobalNotificationState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$GlobalNotificationStateImplCopyWith<_$GlobalNotificationStateImpl>
  get copyWith => throw _privateConstructorUsedError;
}
