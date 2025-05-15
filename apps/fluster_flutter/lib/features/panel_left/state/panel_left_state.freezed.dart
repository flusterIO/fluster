// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'panel_left_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$PanelLeftState {
  bool get open => throw _privateConstructorUsedError;

  /// Create a copy of PanelLeftState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PanelLeftStateCopyWith<PanelLeftState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PanelLeftStateCopyWith<$Res> {
  factory $PanelLeftStateCopyWith(
    PanelLeftState value,
    $Res Function(PanelLeftState) then,
  ) = _$PanelLeftStateCopyWithImpl<$Res, PanelLeftState>;
  @useResult
  $Res call({bool open});
}

/// @nodoc
class _$PanelLeftStateCopyWithImpl<$Res, $Val extends PanelLeftState>
    implements $PanelLeftStateCopyWith<$Res> {
  _$PanelLeftStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PanelLeftState
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
abstract class _$$PanelLeftStateImplCopyWith<$Res>
    implements $PanelLeftStateCopyWith<$Res> {
  factory _$$PanelLeftStateImplCopyWith(
    _$PanelLeftStateImpl value,
    $Res Function(_$PanelLeftStateImpl) then,
  ) = __$$PanelLeftStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({bool open});
}

/// @nodoc
class __$$PanelLeftStateImplCopyWithImpl<$Res>
    extends _$PanelLeftStateCopyWithImpl<$Res, _$PanelLeftStateImpl>
    implements _$$PanelLeftStateImplCopyWith<$Res> {
  __$$PanelLeftStateImplCopyWithImpl(
    _$PanelLeftStateImpl _value,
    $Res Function(_$PanelLeftStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PanelLeftState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? open = null}) {
    return _then(
      _$PanelLeftStateImpl(
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

class _$PanelLeftStateImpl extends _PanelLeftState {
  const _$PanelLeftStateImpl({this.open = true}) : super._();

  @override
  @JsonKey()
  final bool open;

  @override
  String toString() {
    return 'PanelLeftState(open: $open)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PanelLeftStateImpl &&
            (identical(other.open, open) || other.open == open));
  }

  @override
  int get hashCode => Object.hash(runtimeType, open);

  /// Create a copy of PanelLeftState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PanelLeftStateImplCopyWith<_$PanelLeftStateImpl> get copyWith =>
      __$$PanelLeftStateImplCopyWithImpl<_$PanelLeftStateImpl>(
        this,
        _$identity,
      );
}

abstract class _PanelLeftState extends PanelLeftState {
  const factory _PanelLeftState({final bool open}) = _$PanelLeftStateImpl;
  const _PanelLeftState._() : super._();

  @override
  bool get open;

  /// Create a copy of PanelLeftState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PanelLeftStateImplCopyWith<_$PanelLeftStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
