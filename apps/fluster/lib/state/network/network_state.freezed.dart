// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'network_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$NetworkState {
  dynamic get loading => throw _privateConstructorUsedError;
  dynamic get loadingSources => throw _privateConstructorUsedError;

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NetworkStateCopyWith<NetworkState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NetworkStateCopyWith<$Res> {
  factory $NetworkStateCopyWith(
    NetworkState value,
    $Res Function(NetworkState) then,
  ) = _$NetworkStateCopyWithImpl<$Res, NetworkState>;
  @useResult
  $Res call({dynamic loading, dynamic loadingSources});
}

/// @nodoc
class _$NetworkStateCopyWithImpl<$Res, $Val extends NetworkState>
    implements $NetworkStateCopyWith<$Res> {
  _$NetworkStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? loading = freezed, Object? loadingSources = freezed}) {
    return _then(
      _value.copyWith(
            loading:
                freezed == loading
                    ? _value.loading
                    : loading // ignore: cast_nullable_to_non_nullable
                        as dynamic,
            loadingSources:
                freezed == loadingSources
                    ? _value.loadingSources
                    : loadingSources // ignore: cast_nullable_to_non_nullable
                        as dynamic,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$NetworkStateImplCopyWith<$Res>
    implements $NetworkStateCopyWith<$Res> {
  factory _$$NetworkStateImplCopyWith(
    _$NetworkStateImpl value,
    $Res Function(_$NetworkStateImpl) then,
  ) = __$$NetworkStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({dynamic loading, dynamic loadingSources});
}

/// @nodoc
class __$$NetworkStateImplCopyWithImpl<$Res>
    extends _$NetworkStateCopyWithImpl<$Res, _$NetworkStateImpl>
    implements _$$NetworkStateImplCopyWith<$Res> {
  __$$NetworkStateImplCopyWithImpl(
    _$NetworkStateImpl _value,
    $Res Function(_$NetworkStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? loading = freezed, Object? loadingSources = freezed}) {
    return _then(
      _$NetworkStateImpl(
        loading: freezed == loading ? _value.loading! : loading,
        loadingSources:
            freezed == loadingSources ? _value.loadingSources! : loadingSources,
      ),
    );
  }
}

/// @nodoc

class _$NetworkStateImpl implements _NetworkState {
  const _$NetworkStateImpl({
    this.loading = true,
    this.loadingSources = const [],
  });

  @override
  @JsonKey()
  final dynamic loading;
  @override
  @JsonKey()
  final dynamic loadingSources;

  @override
  String toString() {
    return 'NetworkState(loading: $loading, loadingSources: $loadingSources)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NetworkStateImpl &&
            const DeepCollectionEquality().equals(other.loading, loading) &&
            const DeepCollectionEquality().equals(
              other.loadingSources,
              loadingSources,
            ));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(loading),
    const DeepCollectionEquality().hash(loadingSources),
  );

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NetworkStateImplCopyWith<_$NetworkStateImpl> get copyWith =>
      __$$NetworkStateImplCopyWithImpl<_$NetworkStateImpl>(this, _$identity);
}

abstract class _NetworkState implements NetworkState {
  const factory _NetworkState({
    final dynamic loading,
    final dynamic loadingSources,
  }) = _$NetworkStateImpl;

  @override
  dynamic get loading;
  @override
  dynamic get loadingSources;

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NetworkStateImplCopyWith<_$NetworkStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
