// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'theme_settings.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$ThemeSettings {
  FlexScheme get lightTheme => throw _privateConstructorUsedError;
  FlexScheme get darkTheme => throw _privateConstructorUsedError;

  /// Create a copy of ThemeSettings
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ThemeSettingsCopyWith<ThemeSettings> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ThemeSettingsCopyWith<$Res> {
  factory $ThemeSettingsCopyWith(
    ThemeSettings value,
    $Res Function(ThemeSettings) then,
  ) = _$ThemeSettingsCopyWithImpl<$Res, ThemeSettings>;
  @useResult
  $Res call({FlexScheme lightTheme, FlexScheme darkTheme});
}

/// @nodoc
class _$ThemeSettingsCopyWithImpl<$Res, $Val extends ThemeSettings>
    implements $ThemeSettingsCopyWith<$Res> {
  _$ThemeSettingsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ThemeSettings
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? lightTheme = null, Object? darkTheme = null}) {
    return _then(
      _value.copyWith(
            lightTheme:
                null == lightTheme
                    ? _value.lightTheme
                    : lightTheme // ignore: cast_nullable_to_non_nullable
                        as FlexScheme,
            darkTheme:
                null == darkTheme
                    ? _value.darkTheme
                    : darkTheme // ignore: cast_nullable_to_non_nullable
                        as FlexScheme,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ThemeSettingsImplCopyWith<$Res>
    implements $ThemeSettingsCopyWith<$Res> {
  factory _$$ThemeSettingsImplCopyWith(
    _$ThemeSettingsImpl value,
    $Res Function(_$ThemeSettingsImpl) then,
  ) = __$$ThemeSettingsImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({FlexScheme lightTheme, FlexScheme darkTheme});
}

/// @nodoc
class __$$ThemeSettingsImplCopyWithImpl<$Res>
    extends _$ThemeSettingsCopyWithImpl<$Res, _$ThemeSettingsImpl>
    implements _$$ThemeSettingsImplCopyWith<$Res> {
  __$$ThemeSettingsImplCopyWithImpl(
    _$ThemeSettingsImpl _value,
    $Res Function(_$ThemeSettingsImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ThemeSettings
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? lightTheme = null, Object? darkTheme = null}) {
    return _then(
      _$ThemeSettingsImpl(
        lightTheme:
            null == lightTheme
                ? _value.lightTheme
                : lightTheme // ignore: cast_nullable_to_non_nullable
                    as FlexScheme,
        darkTheme:
            null == darkTheme
                ? _value.darkTheme
                : darkTheme // ignore: cast_nullable_to_non_nullable
                    as FlexScheme,
      ),
    );
  }
}

/// @nodoc

class _$ThemeSettingsImpl extends _ThemeSettings {
  const _$ThemeSettingsImpl({
    required this.lightTheme = const [FlexScheme.deepBlue],
    required this.darkTheme = const [FlexScheme.indigo],
  }) : super._();

  @override
  @JsonKey()
  final FlexScheme lightTheme;
  @override
  @JsonKey()
  final FlexScheme darkTheme;

  @override
  String toString() {
    return 'ThemeSettings(lightTheme: $lightTheme, darkTheme: $darkTheme)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ThemeSettingsImpl &&
            (identical(other.lightTheme, lightTheme) ||
                other.lightTheme == lightTheme) &&
            (identical(other.darkTheme, darkTheme) ||
                other.darkTheme == darkTheme));
  }

  @override
  int get hashCode => Object.hash(runtimeType, lightTheme, darkTheme);

  /// Create a copy of ThemeSettings
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ThemeSettingsImplCopyWith<_$ThemeSettingsImpl> get copyWith =>
      __$$ThemeSettingsImplCopyWithImpl<_$ThemeSettingsImpl>(this, _$identity);
}

abstract class _ThemeSettings extends ThemeSettings {
  const factory _ThemeSettings({
    required final FlexScheme lightTheme,
    required final FlexScheme darkTheme,
  }) = _$ThemeSettingsImpl;
  const _ThemeSettings._() : super._();

  @override
  FlexScheme get lightTheme;
  @override
  FlexScheme get darkTheme;

  /// Create a copy of ThemeSettings
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ThemeSettingsImplCopyWith<_$ThemeSettingsImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
