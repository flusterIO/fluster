// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'panel_right_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$PanelRightState {
  bool get open => throw _privateConstructorUsedError;

  /// Create a copy of PanelRightState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PanelRightStateCopyWith<PanelRightState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PanelRightStateCopyWith<$Res> {
  factory $PanelRightStateCopyWith(
    PanelRightState value,
    $Res Function(PanelRightState) then,
  ) = _$PanelRightStateCopyWithImpl<$Res, PanelRightState>;
  @useResult
  $Res call({bool open});
}

/// @nodoc
class _$PanelRightStateCopyWithImpl<$Res, $Val extends PanelRightState>
    implements $PanelRightStateCopyWith<$Res> {
  _$PanelRightStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PanelRightState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? open = null}) {
    return _then(
      _value.copyWith(
            open:
                null == open
                    ? _value.open
                    : open // ignore: cast_nullable_to_non_nullable
                        as bool,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$PanelRightStateImplCopyWith<$Res>
    implements $PanelRightStateCopyWith<$Res> {
  factory _$$PanelRightStateImplCopyWith(
    _$PanelRightStateImpl value,
    $Res Function(_$PanelRightStateImpl) then,
  ) = __$$PanelRightStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({bool open});
}

/// @nodoc
class __$$PanelRightStateImplCopyWithImpl<$Res>
    extends _$PanelRightStateCopyWithImpl<$Res, _$PanelRightStateImpl>
    implements _$$PanelRightStateImplCopyWith<$Res> {
  __$$PanelRightStateImplCopyWithImpl(
    _$PanelRightStateImpl _value,
    $Res Function(_$PanelRightStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PanelRightState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? open = null}) {
    return _then(
      _$PanelRightStateImpl(
        open:
            null == open
                ? _value.open
                : open // ignore: cast_nullable_to_non_nullable
                    as bool,
      ),
    );
  }
}

/// @nodoc

class _$PanelRightStateImpl implements _PanelRightState {
  const _$PanelRightStateImpl({required this.open});

  @override
  final bool open;

  @override
  String toString() {
    return 'PanelRightState(open: $open)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PanelRightStateImpl &&
            (identical(other.open, open) || other.open == open));
  }

  @override
  int get hashCode => Object.hash(runtimeType, open);

  /// Create a copy of PanelRightState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PanelRightStateImplCopyWith<_$PanelRightStateImpl> get copyWith =>
      __$$PanelRightStateImplCopyWithImpl<_$PanelRightStateImpl>(
        this,
        _$identity,
      );
}

abstract class _PanelRightState implements PanelRightState {
  const factory _PanelRightState({required final bool open}) =
      _$PanelRightStateImpl;

  @override
  bool get open;

  /// Create a copy of PanelRightState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PanelRightStateImplCopyWith<_$PanelRightStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
