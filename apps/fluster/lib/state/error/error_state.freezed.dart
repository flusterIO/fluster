// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'error_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$GlobalErrorState {
  List<FlusterError> get errors => throw _privateConstructorUsedError;

  /// Create a copy of GlobalErrorState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $GlobalErrorStateCopyWith<GlobalErrorState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $GlobalErrorStateCopyWith<$Res> {
  factory $GlobalErrorStateCopyWith(
    GlobalErrorState value,
    $Res Function(GlobalErrorState) then,
  ) = _$GlobalErrorStateCopyWithImpl<$Res, GlobalErrorState>;
  @useResult
  $Res call({List<FlusterError> errors});
}

/// @nodoc
class _$GlobalErrorStateCopyWithImpl<$Res, $Val extends GlobalErrorState>
    implements $GlobalErrorStateCopyWith<$Res> {
  _$GlobalErrorStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of GlobalErrorState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? errors = null}) {
    return _then(
      _value.copyWith(
            errors:
                null == errors
                    ? _value.errors
                    : errors // ignore: cast_nullable_to_non_nullable
                        as List<FlusterError>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$GlobalErrorStateImplCopyWith<$Res>
    implements $GlobalErrorStateCopyWith<$Res> {
  factory _$$GlobalErrorStateImplCopyWith(
    _$GlobalErrorStateImpl value,
    $Res Function(_$GlobalErrorStateImpl) then,
  ) = __$$GlobalErrorStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<FlusterError> errors});
}

/// @nodoc
class __$$GlobalErrorStateImplCopyWithImpl<$Res>
    extends _$GlobalErrorStateCopyWithImpl<$Res, _$GlobalErrorStateImpl>
    implements _$$GlobalErrorStateImplCopyWith<$Res> {
  __$$GlobalErrorStateImplCopyWithImpl(
    _$GlobalErrorStateImpl _value,
    $Res Function(_$GlobalErrorStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of GlobalErrorState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? errors = null}) {
    return _then(
      _$GlobalErrorStateImpl(
        errors:
            null == errors
                ? _value._errors
                : errors // ignore: cast_nullable_to_non_nullable
                    as List<FlusterError>,
      ),
    );
  }
}

/// @nodoc

class _$GlobalErrorStateImpl extends _GlobalErrorState {
  const _$GlobalErrorStateImpl({final List<FlusterError> errors = const []})
    : _errors = errors,
      super._();

  final List<FlusterError> _errors;
  @override
  @JsonKey()
  List<FlusterError> get errors {
    if (_errors is EqualUnmodifiableListView) return _errors;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_errors);
  }

  @override
  String toString() {
    return 'GlobalErrorState(errors: $errors)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$GlobalErrorStateImpl &&
            const DeepCollectionEquality().equals(other._errors, _errors));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(_errors));

  /// Create a copy of GlobalErrorState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$GlobalErrorStateImplCopyWith<_$GlobalErrorStateImpl> get copyWith =>
      __$$GlobalErrorStateImplCopyWithImpl<_$GlobalErrorStateImpl>(
        this,
        _$identity,
      );
}

abstract class _GlobalErrorState extends GlobalErrorState {
  const factory _GlobalErrorState({final List<FlusterError> errors}) =
      _$GlobalErrorStateImpl;
  const _GlobalErrorState._() : super._();

  @override
  List<FlusterError> get errors;

  /// Create a copy of GlobalErrorState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$GlobalErrorStateImplCopyWith<_$GlobalErrorStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
