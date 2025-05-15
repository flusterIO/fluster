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
  bool get loading => throw _privateConstructorUsedError;
  List<LoadingSource> get loadingSources => throw _privateConstructorUsedError;

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
  $Res call({bool loading, List<LoadingSource> loadingSources});
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
  $Res call({Object? loading = null, Object? loadingSources = null}) {
    return _then(
      _value.copyWith(
            loading:
                null == loading
                    ? _value.loading
                    : loading // ignore: cast_nullable_to_non_nullable
                        as bool,
            loadingSources:
                null == loadingSources
                    ? _value.loadingSources
                    : loadingSources // ignore: cast_nullable_to_non_nullable
                        as List<LoadingSource>,
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
  $Res call({bool loading, List<LoadingSource> loadingSources});
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
  $Res call({Object? loading = null, Object? loadingSources = null}) {
    return _then(
      _$NetworkStateImpl(
        loading:
            null == loading
                ? _value.loading
                : loading // ignore: cast_nullable_to_non_nullable
                    as bool,
        loadingSources:
            null == loadingSources
                ? _value._loadingSources
                : loadingSources // ignore: cast_nullable_to_non_nullable
                    as List<LoadingSource>,
      ),
    );
  }
}

/// @nodoc

class _$NetworkStateImpl extends _NetworkState {
  const _$NetworkStateImpl({
    this.loading = true,
    final List<LoadingSource> loadingSources = const [],
  }) : _loadingSources = loadingSources,
       super._();

  @override
  @JsonKey()
  final bool loading;
  final List<LoadingSource> _loadingSources;
  @override
  @JsonKey()
  List<LoadingSource> get loadingSources {
    if (_loadingSources is EqualUnmodifiableListView) return _loadingSources;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_loadingSources);
  }

  @override
  String toString() {
    return 'NetworkState(loading: $loading, loadingSources: $loadingSources)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NetworkStateImpl &&
            (identical(other.loading, loading) || other.loading == loading) &&
            const DeepCollectionEquality().equals(
              other._loadingSources,
              _loadingSources,
            ));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    loading,
    const DeepCollectionEquality().hash(_loadingSources),
  );

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NetworkStateImplCopyWith<_$NetworkStateImpl> get copyWith =>
      __$$NetworkStateImplCopyWithImpl<_$NetworkStateImpl>(this, _$identity);
}

abstract class _NetworkState extends NetworkState {
  const factory _NetworkState({
    final bool loading,
    final List<LoadingSource> loadingSources,
  }) = _$NetworkStateImpl;
  const _NetworkState._() : super._();

  @override
  bool get loading;
  @override
  List<LoadingSource> get loadingSources;

  /// Create a copy of NetworkState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NetworkStateImplCopyWith<_$NetworkStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
