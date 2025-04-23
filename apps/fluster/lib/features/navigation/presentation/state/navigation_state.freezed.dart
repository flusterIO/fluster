// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'navigation_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$NavigationState {
  /// This key is used to navigate within the settings page.
  SettingPageId get settingPageId => throw _privateConstructorUsedError;

  /// This navigation key describes the outtermost navigator.
  NavigationItemId get navigationId => throw _privateConstructorUsedError;

  /// Create a copy of NavigationState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NavigationStateCopyWith<NavigationState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NavigationStateCopyWith<$Res> {
  factory $NavigationStateCopyWith(
    NavigationState value,
    $Res Function(NavigationState) then,
  ) = _$NavigationStateCopyWithImpl<$Res, NavigationState>;
  @useResult
  $Res call({SettingPageId settingPageId, NavigationItemId navigationId});
}

/// @nodoc
class _$NavigationStateCopyWithImpl<$Res, $Val extends NavigationState>
    implements $NavigationStateCopyWith<$Res> {
  _$NavigationStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NavigationState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? settingPageId = null, Object? navigationId = freezed}) {
    return _then(
      _value.copyWith(
            settingPageId:
                null == settingPageId
                    ? _value.settingPageId
                    : settingPageId // ignore: cast_nullable_to_non_nullable
                        as SettingPageId,
            navigationId:
                freezed == navigationId
                    ? _value.navigationId
                    : navigationId // ignore: cast_nullable_to_non_nullable,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$NavigationStateImplCopyWith<$Res>
    implements $NavigationStateCopyWith<$Res> {
  factory _$$NavigationStateImplCopyWith(
    _$NavigationStateImpl value,
    $Res Function(_$NavigationStateImpl) then,
  ) = __$$NavigationStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({SettingPageId settingPageId, NavigationItemId navigationId});
}

/// @nodoc
class __$$NavigationStateImplCopyWithImpl<$Res>
    extends _$NavigationStateCopyWithImpl<$Res, _$NavigationStateImpl>
    implements _$$NavigationStateImplCopyWith<$Res> {
  __$$NavigationStateImplCopyWithImpl(
    _$NavigationStateImpl _value,
    $Res Function(_$NavigationStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of NavigationState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? settingPageId = null, Object? navigationId = freezed}) {
    return _then(
      _$NavigationStateImpl(
        settingPageId:
            null == settingPageId
                ? _value.settingPageId
                : settingPageId // ignore: cast_nullable_to_non_nullable
                    as SettingPageId,
        navigationId:
            freezed == navigationId
                ? _value.navigationId
                : navigationId // ignore: cast_nullable_to_non_nullable
                    as NavigationItemId,
      ),
    );
  }
}

/// @nodoc

class _$NavigationStateImpl extends _NavigationState {
  const _$NavigationStateImpl({
    required this.settingPageId,
    required this.navigationId,
  }) : super._();

  /// This key is used to navigate within the settings page.
  @override
  final SettingPageId settingPageId;

  /// This navigation key describes the outtermost navigator.
  @override
  final NavigationItemId navigationId;

  @override
  String toString() {
    return 'NavigationState(settingPageId: $settingPageId, navigationId: $navigationId)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NavigationStateImpl &&
            (identical(other.settingPageId, settingPageId) ||
                other.settingPageId == settingPageId) &&
            const DeepCollectionEquality().equals(
              other.navigationId,
              navigationId,
            ));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    settingPageId,
    const DeepCollectionEquality().hash(navigationId),
  );

  /// Create a copy of NavigationState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NavigationStateImplCopyWith<_$NavigationStateImpl> get copyWith =>
      __$$NavigationStateImplCopyWithImpl<_$NavigationStateImpl>(
        this,
        _$identity,
      );
}

abstract class _NavigationState extends NavigationState {
  const factory _NavigationState({
    required final SettingPageId settingPageId,
    required final NavigationItemId navigationId,
  }) = _$NavigationStateImpl;
  const _NavigationState._() : super._();

  /// This key is used to navigate within the settings page.
  @override
  SettingPageId get settingPageId;

  /// This navigation key describes the outtermost navigator.
  @override
  NavigationItemId get navigationId;

  /// Create a copy of NavigationState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NavigationStateImplCopyWith<_$NavigationStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
