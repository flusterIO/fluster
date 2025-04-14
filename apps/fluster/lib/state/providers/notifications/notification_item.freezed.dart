// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'notification_item.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$NotificationItem {
  String get title => throw _privateConstructorUsedError;
  String get body => throw _privateConstructorUsedError;
  NotificationId get id => throw _privateConstructorUsedError;
  Duration? get duration => throw _privateConstructorUsedError;
  IconData? get icon => throw _privateConstructorUsedError;
  IconWidgetFunction? get iconFunction => throw _privateConstructorUsedError;

  /// Create a copy of NotificationItem
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NotificationItemCopyWith<NotificationItem> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NotificationItemCopyWith<$Res> {
  factory $NotificationItemCopyWith(
    NotificationItem value,
    $Res Function(NotificationItem) then,
  ) = _$NotificationItemCopyWithImpl<$Res, NotificationItem>;
  @useResult
  $Res call({
    String title,
    String body,
    NotificationId id,
    Duration? duration,
    IconData? icon,
    IconWidgetFunction? iconFunction,
  });
}

/// @nodoc
class _$NotificationItemCopyWithImpl<$Res, $Val extends NotificationItem>
    implements $NotificationItemCopyWith<$Res> {
  _$NotificationItemCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NotificationItem
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? body = null,
    Object? id = null,
    Object? duration = freezed,
    Object? icon = freezed,
    Object? iconFunction = freezed,
  }) {
    return _then(
      _value.copyWith(
            title:
                null == title
                    ? _value.title
                    : title // ignore: cast_nullable_to_non_nullable
                        as String,
            body:
                null == body
                    ? _value.body
                    : body // ignore: cast_nullable_to_non_nullable
                        as String,
            id:
                null == id
                    ? _value.id
                    : id // ignore: cast_nullable_to_non_nullable
                        as NotificationId,
            duration:
                freezed == duration
                    ? _value.duration
                    : duration // ignore: cast_nullable_to_non_nullable
                        as Duration?,
            icon:
                freezed == icon
                    ? _value.icon
                    : icon // ignore: cast_nullable_to_non_nullable
                        as IconData?,
            iconFunction:
                freezed == iconFunction
                    ? _value.iconFunction
                    : iconFunction // ignore: cast_nullable_to_non_nullable
                        as IconWidgetFunction?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$NotificationItemImplCopyWith<$Res>
    implements $NotificationItemCopyWith<$Res> {
  factory _$$NotificationItemImplCopyWith(
    _$NotificationItemImpl value,
    $Res Function(_$NotificationItemImpl) then,
  ) = __$$NotificationItemImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String title,
    String body,
    NotificationId id,
    Duration? duration,
    IconData? icon,
    IconWidgetFunction? iconFunction,
  });
}

/// @nodoc
class __$$NotificationItemImplCopyWithImpl<$Res>
    extends _$NotificationItemCopyWithImpl<$Res, _$NotificationItemImpl>
    implements _$$NotificationItemImplCopyWith<$Res> {
  __$$NotificationItemImplCopyWithImpl(
    _$NotificationItemImpl _value,
    $Res Function(_$NotificationItemImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of NotificationItem
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? body = null,
    Object? id = null,
    Object? duration = freezed,
    Object? icon = freezed,
    Object? iconFunction = freezed,
  }) {
    return _then(
      _$NotificationItemImpl(
        title:
            null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                    as String,
        body:
            null == body
                ? _value.body
                : body // ignore: cast_nullable_to_non_nullable
                    as String,
        id:
            null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                    as NotificationId,
        duration:
            freezed == duration
                ? _value.duration
                : duration // ignore: cast_nullable_to_non_nullable
                    as Duration?,
        icon:
            freezed == icon
                ? _value.icon
                : icon // ignore: cast_nullable_to_non_nullable
                    as IconData?,
        iconFunction:
            freezed == iconFunction
                ? _value.iconFunction
                : iconFunction // ignore: cast_nullable_to_non_nullable
                    as IconWidgetFunction?,
      ),
    );
  }
}

/// @nodoc

class _$NotificationItemImpl implements _NotificationItem {
  const _$NotificationItemImpl({
    required this.title,
    required this.body,
    required this.id,
    this.duration,
    this.icon,
    this.iconFunction,
  });

  @override
  final String title;
  @override
  final String body;
  @override
  final NotificationId id;
  @override
  final Duration? duration;
  @override
  final IconData? icon;
  @override
  final IconWidgetFunction? iconFunction;

  @override
  String toString() {
    return 'NotificationItem(title: $title, body: $body, id: $id, duration: $duration, icon: $icon, iconFunction: $iconFunction)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NotificationItemImpl &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.body, body) || other.body == body) &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.duration, duration) ||
                other.duration == duration) &&
            (identical(other.icon, icon) || other.icon == icon) &&
            (identical(other.iconFunction, iconFunction) ||
                other.iconFunction == iconFunction));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, title, body, id, duration, icon, iconFunction);

  /// Create a copy of NotificationItem
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NotificationItemImplCopyWith<_$NotificationItemImpl> get copyWith =>
      __$$NotificationItemImplCopyWithImpl<_$NotificationItemImpl>(
        this,
        _$identity,
      );
}

abstract class _NotificationItem implements NotificationItem {
  const factory _NotificationItem({
    required final String title,
    required final String body,
    required final NotificationId id,
    final Duration? duration,
    final IconData? icon,
    final IconWidgetFunction? iconFunction,
  }) = _$NotificationItemImpl;

  @override
  String get title;
  @override
  String get body;
  @override
  NotificationId get id;
  @override
  Duration? get duration;
  @override
  IconData? get icon;
  @override
  IconWidgetFunction? get iconFunction;

  /// Create a copy of NotificationItem
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NotificationItemImplCopyWith<_$NotificationItemImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
