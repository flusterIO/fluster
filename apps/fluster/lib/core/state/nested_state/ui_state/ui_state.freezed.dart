// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'ui_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$GlobalUIState {
  PanelLeftState get panelLeftState => throw _privateConstructorUsedError;
  PanelRightState get panelRightState => throw _privateConstructorUsedError;
  ThemeMode get themeMode => throw _privateConstructorUsedError;
  FlexScheme get colorScheme => throw _privateConstructorUsedError;

  /// Create a copy of GlobalUIState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $GlobalUIStateCopyWith<GlobalUIState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $GlobalUIStateCopyWith<$Res> {
  factory $GlobalUIStateCopyWith(
    GlobalUIState value,
    $Res Function(GlobalUIState) then,
  ) = _$GlobalUIStateCopyWithImpl<$Res, GlobalUIState>;
  @useResult
  $Res call({
    PanelLeftState panelLeftState,
    PanelRightState panelRightState,
    ThemeMode themeMode,
    FlexScheme colorScheme,
  });

  $PanelLeftStateCopyWith<$Res> get panelLeftState;
}

/// @nodoc
class _$GlobalUIStateCopyWithImpl<$Res, $Val extends GlobalUIState>
    implements $GlobalUIStateCopyWith<$Res> {
  _$GlobalUIStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of GlobalUIState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? panelLeftState = null,
    Object? panelRightState = freezed,
    Object? themeMode = null,
    Object? colorScheme = null,
  }) {
    return _then(
      _value.copyWith(
            panelLeftState:
                null == panelLeftState
                    ? _value.panelLeftState
                    : panelLeftState // ignore: cast_nullable_to_non_nullable
                        as PanelLeftState,
            panelRightState:
                freezed == panelRightState
                    ? _value.panelRightState
                    : panelRightState // ignore: cast_nullable_to_non_nullable
                        as PanelRightState,
            themeMode:
                null == themeMode
                    ? _value.themeMode
                    : themeMode // ignore: cast_nullable_to_non_nullable
                        as ThemeMode,
            colorScheme:
                null == colorScheme
                    ? _value.colorScheme
                    : colorScheme // ignore: cast_nullable_to_non_nullable
                        as FlexScheme,
          )
          as $Val,
    );
  }

  /// Create a copy of GlobalUIState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $PanelLeftStateCopyWith<$Res> get panelLeftState {
    return $PanelLeftStateCopyWith<$Res>(_value.panelLeftState, (value) {
      return _then(_value.copyWith(panelLeftState: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$GlobalUIStateImplCopyWith<$Res>
    implements $GlobalUIStateCopyWith<$Res> {
  factory _$$GlobalUIStateImplCopyWith(
    _$GlobalUIStateImpl value,
    $Res Function(_$GlobalUIStateImpl) then,
  ) = __$$GlobalUIStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    PanelLeftState panelLeftState,
    PanelRightState panelRightState,
    ThemeMode themeMode,
    FlexScheme colorScheme,
  });

  @override
  $PanelLeftStateCopyWith<$Res> get panelLeftState;
}

/// @nodoc
class __$$GlobalUIStateImplCopyWithImpl<$Res>
    extends _$GlobalUIStateCopyWithImpl<$Res, _$GlobalUIStateImpl>
    implements _$$GlobalUIStateImplCopyWith<$Res> {
  __$$GlobalUIStateImplCopyWithImpl(
    _$GlobalUIStateImpl _value,
    $Res Function(_$GlobalUIStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of GlobalUIState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? panelLeftState = null,
    Object? panelRightState = freezed,
    Object? themeMode = null,
    Object? colorScheme = null,
  }) {
    return _then(
      _$GlobalUIStateImpl(
        panelLeftState:
            null == panelLeftState
                ? _value.panelLeftState
                : panelLeftState // ignore: cast_nullable_to_non_nullable
                    as PanelLeftState,
        panelRightState:
            freezed == panelRightState
                ? _value.panelRightState
                : panelRightState // ignore: cast_nullable_to_non_nullable
                    as PanelRightState,
        themeMode:
            null == themeMode
                ? _value.themeMode
                : themeMode // ignore: cast_nullable_to_non_nullable
                    as ThemeMode,
        colorScheme:
            null == colorScheme
                ? _value.colorScheme
                : colorScheme // ignore: cast_nullable_to_non_nullable
                    as FlexScheme,
      ),
    );
  }
}

/// @nodoc

class _$GlobalUIStateImpl extends _GlobalUIState {
  const _$GlobalUIStateImpl({
    required this.panelLeftState,
    required this.panelRightState,
    required this.themeMode,
    this.colorScheme = FlexScheme.shadBlue,
  }) : super._();

  @override
  final PanelLeftState panelLeftState;
  @override
  final PanelRightState panelRightState;
  @override
  final ThemeMode themeMode;
  @override
  @JsonKey()
  final FlexScheme colorScheme;

  @override
  String toString() {
    return 'GlobalUIState(panelLeftState: $panelLeftState, panelRightState: $panelRightState, themeMode: $themeMode, colorScheme: $colorScheme)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$GlobalUIStateImpl &&
            (identical(other.panelLeftState, panelLeftState) ||
                other.panelLeftState == panelLeftState) &&
            const DeepCollectionEquality().equals(
              other.panelRightState,
              panelRightState,
            ) &&
            (identical(other.themeMode, themeMode) ||
                other.themeMode == themeMode) &&
            (identical(other.colorScheme, colorScheme) ||
                other.colorScheme == colorScheme));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    panelLeftState,
    const DeepCollectionEquality().hash(panelRightState),
    themeMode,
    colorScheme,
  );

  /// Create a copy of GlobalUIState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$GlobalUIStateImplCopyWith<_$GlobalUIStateImpl> get copyWith =>
      __$$GlobalUIStateImplCopyWithImpl<_$GlobalUIStateImpl>(this, _$identity);
}

abstract class _GlobalUIState extends GlobalUIState {
  const factory _GlobalUIState({
    required final PanelLeftState panelLeftState,
    required final PanelRightState panelRightState,
    required final ThemeMode themeMode,
    final FlexScheme colorScheme,
  }) = _$GlobalUIStateImpl;
  const _GlobalUIState._() : super._();

  @override
  PanelLeftState get panelLeftState;
  @override
  PanelRightState get panelRightState;
  @override
  ThemeMode get themeMode;
  @override
  FlexScheme get colorScheme;

  /// Create a copy of GlobalUIState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$GlobalUIStateImplCopyWith<_$GlobalUIStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
