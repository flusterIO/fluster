// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'command_palette_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$CommandPaletteState {
  bool get open => throw _privateConstructorUsedError;
  String get query => throw _privateConstructorUsedError;
  List<CommandPaletteItem> get filteredItems =>
      throw _privateConstructorUsedError;
  List<CommandPaletteEntry> get navigationStack =>
      throw _privateConstructorUsedError;
  int get selectedIndex => throw _privateConstructorUsedError;

  /// Create a copy of CommandPaletteState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CommandPaletteStateCopyWith<CommandPaletteState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CommandPaletteStateCopyWith<$Res> {
  factory $CommandPaletteStateCopyWith(
    CommandPaletteState value,
    $Res Function(CommandPaletteState) then,
  ) = _$CommandPaletteStateCopyWithImpl<$Res, CommandPaletteState>;
  @useResult
  $Res call({
    bool open,
    String query,
    List<CommandPaletteItem> filteredItems,
    List<CommandPaletteEntry> navigationStack,
    int selectedIndex,
  });
}

/// @nodoc
class _$CommandPaletteStateCopyWithImpl<$Res, $Val extends CommandPaletteState>
    implements $CommandPaletteStateCopyWith<$Res> {
  _$CommandPaletteStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CommandPaletteState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? open = null,
    Object? query = null,
    Object? filteredItems = null,
    Object? navigationStack = null,
    Object? selectedIndex = null,
  }) {
    return _then(
      _value.copyWith(
            open:
                null == open
                    ? _value.open
                    : open // ignore: cast_nullable_to_non_nullable
                        as bool,
            query:
                null == query
                    ? _value.query
                    : query // ignore: cast_nullable_to_non_nullable
                        as String,
            filteredItems:
                null == filteredItems
                    ? _value.filteredItems
                    : filteredItems // ignore: cast_nullable_to_non_nullable
                        as List<CommandPaletteItem>,
            navigationStack:
                null == navigationStack
                    ? _value.navigationStack
                    : navigationStack // ignore: cast_nullable_to_non_nullable
                        as List<CommandPaletteEntry>,
            selectedIndex:
                null == selectedIndex
                    ? _value.selectedIndex
                    : selectedIndex // ignore: cast_nullable_to_non_nullable
                        as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CommandPaletteStateImplCopyWith<$Res>
    implements $CommandPaletteStateCopyWith<$Res> {
  factory _$$CommandPaletteStateImplCopyWith(
    _$CommandPaletteStateImpl value,
    $Res Function(_$CommandPaletteStateImpl) then,
  ) = __$$CommandPaletteStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    bool open,
    String query,
    List<CommandPaletteItem> filteredItems,
    List<CommandPaletteEntry> navigationStack,
    int selectedIndex,
  });
}

/// @nodoc
class __$$CommandPaletteStateImplCopyWithImpl<$Res>
    extends _$CommandPaletteStateCopyWithImpl<$Res, _$CommandPaletteStateImpl>
    implements _$$CommandPaletteStateImplCopyWith<$Res> {
  __$$CommandPaletteStateImplCopyWithImpl(
    _$CommandPaletteStateImpl _value,
    $Res Function(_$CommandPaletteStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of CommandPaletteState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? open = null,
    Object? query = null,
    Object? filteredItems = null,
    Object? navigationStack = null,
    Object? selectedIndex = null,
  }) {
    return _then(
      _$CommandPaletteStateImpl(
        open:
            null == open
                ? _value.open
                : open // ignore: cast_nullable_to_non_nullable
                    as bool,
        query:
            null == query
                ? _value.query
                : query // ignore: cast_nullable_to_non_nullable
                    as String,
        filteredItems:
            null == filteredItems
                ? _value._filteredItems
                : filteredItems // ignore: cast_nullable_to_non_nullable
                    as List<CommandPaletteItem>,
        navigationStack:
            null == navigationStack
                ? _value._navigationStack
                : navigationStack // ignore: cast_nullable_to_non_nullable
                    as List<CommandPaletteEntry>,
        selectedIndex:
            null == selectedIndex
                ? _value.selectedIndex
                : selectedIndex // ignore: cast_nullable_to_non_nullable
                    as int,
      ),
    );
  }
}

/// @nodoc

class _$CommandPaletteStateImpl extends _CommandPaletteState {
  const _$CommandPaletteStateImpl({
    this.open = true,
    this.query = "",
    final List<CommandPaletteItem> filteredItems = const [],
    final List<CommandPaletteEntry> navigationStack = const [],
    this.selectedIndex = 0,
  }) : _filteredItems = filteredItems,
       _navigationStack = navigationStack,
       super._();

  @override
  @JsonKey()
  final bool open;
  @override
  @JsonKey()
  final String query;
  final List<CommandPaletteItem> _filteredItems;
  @override
  @JsonKey()
  List<CommandPaletteItem> get filteredItems {
    if (_filteredItems is EqualUnmodifiableListView) return _filteredItems;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_filteredItems);
  }

  final List<CommandPaletteEntry> _navigationStack;
  @override
  @JsonKey()
  List<CommandPaletteEntry> get navigationStack {
    if (_navigationStack is EqualUnmodifiableListView) return _navigationStack;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_navigationStack);
  }

  @override
  @JsonKey()
  final int selectedIndex;

  @override
  String toString() {
    return 'CommandPaletteState(open: $open, query: $query, filteredItems: $filteredItems, navigationStack: $navigationStack, selectedIndex: $selectedIndex)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CommandPaletteStateImpl &&
            (identical(other.open, open) || other.open == open) &&
            (identical(other.query, query) || other.query == query) &&
            const DeepCollectionEquality().equals(
              other._filteredItems,
              _filteredItems,
            ) &&
            const DeepCollectionEquality().equals(
              other._navigationStack,
              _navigationStack,
            ) &&
            (identical(other.selectedIndex, selectedIndex) ||
                other.selectedIndex == selectedIndex));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    open,
    query,
    const DeepCollectionEquality().hash(_filteredItems),
    const DeepCollectionEquality().hash(_navigationStack),
    selectedIndex,
  );

  /// Create a copy of CommandPaletteState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CommandPaletteStateImplCopyWith<_$CommandPaletteStateImpl> get copyWith =>
      __$$CommandPaletteStateImplCopyWithImpl<_$CommandPaletteStateImpl>(
        this,
        _$identity,
      );
}

abstract class _CommandPaletteState extends CommandPaletteState {
  const factory _CommandPaletteState({
    final bool open,
    final String query,
    final List<CommandPaletteItem> filteredItems,
    final List<CommandPaletteEntry> navigationStack,
    final int selectedIndex,
  }) = _$CommandPaletteStateImpl;
  const _CommandPaletteState._() : super._();

  @override
  bool get open;
  @override
  String get query;
  @override
  List<CommandPaletteItem> get filteredItems;
  @override
  List<CommandPaletteEntry> get navigationStack;
  @override
  int get selectedIndex;

  /// Create a copy of CommandPaletteState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CommandPaletteStateImplCopyWith<_$CommandPaletteStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
