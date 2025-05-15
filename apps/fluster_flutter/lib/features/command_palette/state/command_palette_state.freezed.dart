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
  List<CommandPaletteEntry> get filteredItems =>
      throw _privateConstructorUsedError;
  List<CommandPaletteEntry> get navigationStack =>
      throw _privateConstructorUsedError;
  int get selectedIndex => throw _privateConstructorUsedError;
  CommandPaletteView get view => throw _privateConstructorUsedError;

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
    List<CommandPaletteEntry> filteredItems,
    List<CommandPaletteEntry> navigationStack,
    int selectedIndex,
    CommandPaletteView view,
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
    Object? filteredItems = null,
    Object? navigationStack = null,
    Object? selectedIndex = null,
    Object? view = null,
  }) {
    return _then(
      _value.copyWith(
            open:
                null == open
                    ? _value.open
                    : open // ignore: cast_nullable_to_non_nullable
                        as bool,
            filteredItems:
                null == filteredItems
                    ? _value.filteredItems
                    : filteredItems // ignore: cast_nullable_to_non_nullable
                        as List<CommandPaletteEntry>,
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
            view:
                null == view
                    ? _value.view
                    : view // ignore: cast_nullable_to_non_nullable
                        as CommandPaletteView,
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
    List<CommandPaletteEntry> filteredItems,
    List<CommandPaletteEntry> navigationStack,
    int selectedIndex,
    CommandPaletteView view,
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
    Object? filteredItems = null,
    Object? navigationStack = null,
    Object? selectedIndex = null,
    Object? view = null,
  }) {
    return _then(
      _$CommandPaletteStateImpl(
        open:
            null == open
                ? _value.open
                : open // ignore: cast_nullable_to_non_nullable
                    as bool,
        filteredItems:
            null == filteredItems
                ? _value._filteredItems
                : filteredItems // ignore: cast_nullable_to_non_nullable
                    as List<CommandPaletteEntry>,
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
        view:
            null == view
                ? _value.view
                : view // ignore: cast_nullable_to_non_nullable
                    as CommandPaletteView,
      ),
    );
  }
}

/// @nodoc

class _$CommandPaletteStateImpl extends _CommandPaletteState {
  const _$CommandPaletteStateImpl({
    this.open = true,
    final List<CommandPaletteEntry> filteredItems = const [],
    final List<CommandPaletteEntry> navigationStack = const [],
    this.selectedIndex = 0,
    this.view = CommandPaletteView.list,
  }) : _filteredItems = filteredItems,
       _navigationStack = navigationStack,
       super._();

  @override
  @JsonKey()
  final bool open;
  final List<CommandPaletteEntry> _filteredItems;
  @override
  @JsonKey()
  List<CommandPaletteEntry> get filteredItems {
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
  @JsonKey()
  final CommandPaletteView view;

  @override
  String toString() {
    return 'CommandPaletteState(open: $open, filteredItems: $filteredItems, navigationStack: $navigationStack, selectedIndex: $selectedIndex, view: $view)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CommandPaletteStateImpl &&
            (identical(other.open, open) || other.open == open) &&
            const DeepCollectionEquality().equals(
              other._filteredItems,
              _filteredItems,
            ) &&
            const DeepCollectionEquality().equals(
              other._navigationStack,
              _navigationStack,
            ) &&
            (identical(other.selectedIndex, selectedIndex) ||
                other.selectedIndex == selectedIndex) &&
            (identical(other.view, view) || other.view == view));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    open,
    const DeepCollectionEquality().hash(_filteredItems),
    const DeepCollectionEquality().hash(_navigationStack),
    selectedIndex,
    view,
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
    final List<CommandPaletteEntry> filteredItems,
    final List<CommandPaletteEntry> navigationStack,
    final int selectedIndex,
    final CommandPaletteView view,
  }) = _$CommandPaletteStateImpl;
  const _CommandPaletteState._() : super._();

  @override
  bool get open;
  @override
  List<CommandPaletteEntry> get filteredItems;
  @override
  List<CommandPaletteEntry> get navigationStack;
  @override
  int get selectedIndex;
  @override
  CommandPaletteView get view;

  /// Create a copy of CommandPaletteState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CommandPaletteStateImplCopyWith<_$CommandPaletteStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
