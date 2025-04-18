// This file is automatically generated, so please do not edit it.
// @generated by `flutter_rust_bridge`@ 2.9.0.

// ignore_for_file: unused_import, unused_element, unnecessary_import, duplicate_ignore, invalid_use_of_internal_member, annotate_overrides, non_constant_identifier_names, curly_braces_in_flow_control_structures, prefer_const_literals_to_create_immutables, unused_field

import 'api/services/mdx_service/server.dart';
import 'api/services/mdx_service/server/mdx_proto.dart';
import 'api/services/settings_service/server.dart';
import 'api/services/settings_service/server/settings_proto.dart';
import 'dart:async';
import 'dart:convert';
import 'frb_generated.dart';
import 'frb_generated.io.dart'
    if (dart.library.js_interop) 'frb_generated.web.dart';
import 'package:flutter_rust_bridge/flutter_rust_bridge_for_generated.dart';

/// Main entrypoint of the Rust API
class RustLib extends BaseEntrypoint<RustLibApi, RustLibApiImpl, RustLibWire> {
  @internal
  static final instance = RustLib._();

  RustLib._();

  /// Initialize flutter_rust_bridge
  static Future<void> init({
    RustLibApi? api,
    BaseHandler? handler,
    ExternalLibrary? externalLibrary,
  }) async {
    await instance.initImpl(
      api: api,
      handler: handler,
      externalLibrary: externalLibrary,
    );
  }

  /// Initialize flutter_rust_bridge in mock mode.
  /// No libraries for FFI are loaded.
  static void initMock({required RustLibApi api}) {
    instance.initMockImpl(api: api);
  }

  /// Dispose flutter_rust_bridge
  ///
  /// The call to this function is optional, since flutter_rust_bridge (and everything else)
  /// is automatically disposed when the app stops.
  static void dispose() => instance.disposeImpl();

  @override
  ApiImplConstructor<RustLibApiImpl, RustLibWire> get apiImplConstructor =>
      RustLibApiImpl.new;

  @override
  WireConstructor<RustLibWire> get wireConstructor =>
      RustLibWire.fromExternalLibrary;

  @override
  Future<void> executeRustInitializers() async {}

  @override
  ExternalLibraryLoaderConfig get defaultExternalLibraryLoaderConfig =>
      kDefaultExternalLibraryLoaderConfig;

  @override
  String get codegenVersion => '2.9.0';

  @override
  int get rustContentHash => 430384359;

  static const kDefaultExternalLibraryLoaderConfig =
      ExternalLibraryLoaderConfig(
        stem: 'fluster_grpc',
        ioDirectory: 'rust/target/release/',
        webPrefix: 'pkg/',
      );
}

abstract class RustLibApi extends BaseApi {
  Future<File> crateApiServicesMdxServiceServerMdxProtoFileDefault();

  Future<FrontMatter>
  crateApiServicesMdxServiceServerMdxProtoFrontMatterDefault();

  Future<void> crateApiServicesMdxServiceServerMdxProtoFrontMatterSummary({
    required FrontMatter that,
  });

  Future<GetUserSettingsResponse>
  crateApiServicesSettingsServiceServerSettingsProtoGetUserSettingsResponseDefault();

  Future<MdxNote> crateApiServicesMdxServiceServerMdxProtoMdxNoteDefault();

  Future<MdxNoteResponse>
  crateApiServicesMdxServiceServerMdxProtoMdxNoteResponseDefault();

  Future<MdxServiceHandler>
  crateApiServicesMdxServiceServerMdxServiceHandlerDefault();

  Future<NoteSummary>
  crateApiServicesMdxServiceServerMdxProtoNoteSummaryDefault();

  Future<PathRequest>
  crateApiServicesMdxServiceServerMdxProtoPathRequestDefault();

  Future<SettingField>
  crateApiServicesSettingsServiceServerSettingsProtoSettingFieldDefault();

  Future<SettingServiceHandler>
  crateApiServicesSettingsServiceServerSettingServiceHandlerDefault();

  Future<void>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeAsStrName({
    required SettingType that,
  });

  Future<SettingType>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeDefault();

  Future<SettingType?>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromI32({
    required int value,
  });

  Future<SettingType?>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromStrName({
    required String value,
  });

  Future<bool>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeIsValid({
    required int value,
  });
}

class RustLibApiImpl extends RustLibApiImplPlatform implements RustLibApi {
  RustLibApiImpl({
    required super.handler,
    required super.wire,
    required super.generalizedFrbRustBinding,
    required super.portManager,
  });

  @override
  Future<File> crateApiServicesMdxServiceServerMdxProtoFileDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 1,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_file,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoFileDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoFileDefaultConstMeta =>
      const TaskConstMeta(debugName: "file_default", argNames: []);

  @override
  Future<FrontMatter>
  crateApiServicesMdxServiceServerMdxProtoFrontMatterDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 2,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_front_matter,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoFrontMatterDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoFrontMatterDefaultConstMeta =>
      const TaskConstMeta(debugName: "front_matter_default", argNames: []);

  @override
  Future<void> crateApiServicesMdxServiceServerMdxProtoFrontMatterSummary({
    required FrontMatter that,
  }) {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          sse_encode_box_autoadd_front_matter(that, serializer);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 3,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_unit,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoFrontMatterSummaryConstMeta,
        argValues: [that],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoFrontMatterSummaryConstMeta =>
      const TaskConstMeta(
        debugName: "front_matter_summary",
        argNames: ["that"],
      );

  @override
  Future<GetUserSettingsResponse>
  crateApiServicesSettingsServiceServerSettingsProtoGetUserSettingsResponseDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 4,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_get_user_settings_response,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoGetUserSettingsResponseDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoGetUserSettingsResponseDefaultConstMeta =>
      const TaskConstMeta(
        debugName: "get_user_settings_response_default",
        argNames: [],
      );

  @override
  Future<MdxNote> crateApiServicesMdxServiceServerMdxProtoMdxNoteDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 5,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_mdx_note,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoMdxNoteDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoMdxNoteDefaultConstMeta =>
      const TaskConstMeta(debugName: "mdx_note_default", argNames: []);

  @override
  Future<MdxNoteResponse>
  crateApiServicesMdxServiceServerMdxProtoMdxNoteResponseDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 6,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_mdx_note_response,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoMdxNoteResponseDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoMdxNoteResponseDefaultConstMeta =>
      const TaskConstMeta(debugName: "mdx_note_response_default", argNames: []);

  @override
  Future<MdxServiceHandler>
  crateApiServicesMdxServiceServerMdxServiceHandlerDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 7,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_mdx_service_handler,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxServiceHandlerDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxServiceHandlerDefaultConstMeta =>
      const TaskConstMeta(
        debugName: "mdx_service_handler_default",
        argNames: [],
      );

  @override
  Future<NoteSummary>
  crateApiServicesMdxServiceServerMdxProtoNoteSummaryDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 8,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_note_summary,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoNoteSummaryDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoNoteSummaryDefaultConstMeta =>
      const TaskConstMeta(debugName: "note_summary_default", argNames: []);

  @override
  Future<PathRequest>
  crateApiServicesMdxServiceServerMdxProtoPathRequestDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 9,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_path_request,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesMdxServiceServerMdxProtoPathRequestDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesMdxServiceServerMdxProtoPathRequestDefaultConstMeta =>
      const TaskConstMeta(debugName: "path_request_default", argNames: []);

  @override
  Future<SettingField>
  crateApiServicesSettingsServiceServerSettingsProtoSettingFieldDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 10,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_setting_field,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoSettingFieldDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoSettingFieldDefaultConstMeta =>
      const TaskConstMeta(debugName: "setting_field_default", argNames: []);

  @override
  Future<SettingServiceHandler>
  crateApiServicesSettingsServiceServerSettingServiceHandlerDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 11,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_setting_service_handler,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingServiceHandlerDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingServiceHandlerDefaultConstMeta =>
      const TaskConstMeta(
        debugName: "setting_service_handler_default",
        argNames: [],
      );

  @override
  Future<void>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeAsStrName({
    required SettingType that,
  }) {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          sse_encode_setting_type(that, serializer);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 12,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_unit,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeAsStrNameConstMeta,
        argValues: [that],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeAsStrNameConstMeta =>
      const TaskConstMeta(
        debugName: "setting_type_as_str_name",
        argNames: ["that"],
      );

  @override
  Future<SettingType>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeDefault() {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 13,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_setting_type,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeDefaultConstMeta,
        argValues: [],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeDefaultConstMeta =>
      const TaskConstMeta(debugName: "setting_type_default", argNames: []);

  @override
  Future<SettingType?>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromI32({
    required int value,
  }) {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          sse_encode_i_32(value, serializer);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 14,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_opt_box_autoadd_setting_type,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromI32ConstMeta,
        argValues: [value],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromI32ConstMeta =>
      const TaskConstMeta(
        debugName: "setting_type_from_i32",
        argNames: ["value"],
      );

  @override
  Future<SettingType?>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromStrName({
    required String value,
  }) {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          sse_encode_String(value, serializer);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 15,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_opt_box_autoadd_setting_type,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromStrNameConstMeta,
        argValues: [value],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeFromStrNameConstMeta =>
      const TaskConstMeta(
        debugName: "setting_type_from_str_name",
        argNames: ["value"],
      );

  @override
  Future<bool>
  crateApiServicesSettingsServiceServerSettingsProtoSettingTypeIsValid({
    required int value,
  }) {
    return handler.executeNormal(
      NormalTask(
        callFfi: (port_) {
          final serializer = SseSerializer(generalizedFrbRustBinding);
          sse_encode_i_32(value, serializer);
          pdeCallFfi(
            generalizedFrbRustBinding,
            serializer,
            funcId: 16,
            port: port_,
          );
        },
        codec: SseCodec(
          decodeSuccessData: sse_decode_bool,
          decodeErrorData: null,
        ),
        constMeta:
            kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeIsValidConstMeta,
        argValues: [value],
        apiImpl: this,
      ),
    );
  }

  TaskConstMeta
  get kCrateApiServicesSettingsServiceServerSettingsProtoSettingTypeIsValidConstMeta =>
      const TaskConstMeta(
        debugName: "setting_type_is_valid",
        argNames: ["value"],
      );

  @protected
  String dco_decode_String(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw as String;
  }

  @protected
  bool dco_decode_bool(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw as bool;
  }

  @protected
  FrontMatter dco_decode_box_autoadd_front_matter(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return dco_decode_front_matter(raw);
  }

  @protected
  MdxNote dco_decode_box_autoadd_mdx_note(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return dco_decode_mdx_note(raw);
  }

  @protected
  SettingType dco_decode_box_autoadd_setting_type(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return dco_decode_setting_type(raw);
  }

  @protected
  File dco_decode_file(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 1)
      throw Exception('unexpected arr length: expect 1 but see ${arr.length}');
    return File(path: dco_decode_String(arr[0]));
  }

  @protected
  FrontMatter dco_decode_front_matter(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 4)
      throw Exception('unexpected arr length: expect 4 but see ${arr.length}');
    return FrontMatter(
      title: dco_decode_String(arr[0]),
      summary: dco_decode_opt_String(arr[1]),
      createdAt: dco_decode_String(arr[2]),
      updatedAt: dco_decode_String(arr[3]),
    );
  }

  @protected
  GetUserSettingsResponse dco_decode_get_user_settings_response(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 1)
      throw Exception('unexpected arr length: expect 1 but see ${arr.length}');
    return GetUserSettingsResponse(
      settings: dco_decode_list_setting_field(arr[0]),
    );
  }

  @protected
  int dco_decode_i_32(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw as int;
  }

  @protected
  Uint8List dco_decode_list_prim_u_8_strict(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw as Uint8List;
  }

  @protected
  List<SettingField> dco_decode_list_setting_field(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return (raw as List<dynamic>).map(dco_decode_setting_field).toList();
  }

  @protected
  MdxNote dco_decode_mdx_note(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 3)
      throw Exception('unexpected arr length: expect 3 but see ${arr.length}');
    return MdxNote(
      matter: dco_decode_opt_box_autoadd_front_matter(arr[0]),
      body: dco_decode_String(arr[1]),
      path: dco_decode_String(arr[2]),
    );
  }

  @protected
  MdxNoteResponse dco_decode_mdx_note_response(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 1)
      throw Exception('unexpected arr length: expect 1 but see ${arr.length}');
    return MdxNoteResponse(note: dco_decode_opt_box_autoadd_mdx_note(arr[0]));
  }

  @protected
  MdxServiceHandler dco_decode_mdx_service_handler(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.isNotEmpty)
      throw Exception('unexpected arr length: expect 0 but see ${arr.length}');
    return MdxServiceHandler();
  }

  @protected
  NoteSummary dco_decode_note_summary(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 4)
      throw Exception('unexpected arr length: expect 4 but see ${arr.length}');
    return NoteSummary(
      title: dco_decode_String(arr[0]),
      summary: dco_decode_String(arr[1]),
      createdAt: dco_decode_String(arr[2]),
      updatedAt: dco_decode_String(arr[3]),
    );
  }

  @protected
  String? dco_decode_opt_String(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw == null ? null : dco_decode_String(raw);
  }

  @protected
  FrontMatter? dco_decode_opt_box_autoadd_front_matter(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw == null ? null : dco_decode_box_autoadd_front_matter(raw);
  }

  @protected
  MdxNote? dco_decode_opt_box_autoadd_mdx_note(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw == null ? null : dco_decode_box_autoadd_mdx_note(raw);
  }

  @protected
  SettingType? dco_decode_opt_box_autoadd_setting_type(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw == null ? null : dco_decode_box_autoadd_setting_type(raw);
  }

  @protected
  PathRequest dco_decode_path_request(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 1)
      throw Exception('unexpected arr length: expect 1 but see ${arr.length}');
    return PathRequest(path: dco_decode_String(arr[0]));
  }

  @protected
  SettingField dco_decode_setting_field(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.length != 2)
      throw Exception('unexpected arr length: expect 2 but see ${arr.length}');
    return SettingField(
      label: dco_decode_String(arr[0]),
      value: dco_decode_String(arr[1]),
    );
  }

  @protected
  SettingServiceHandler dco_decode_setting_service_handler(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    final arr = raw as List<dynamic>;
    if (arr.isNotEmpty)
      throw Exception('unexpected arr length: expect 0 but see ${arr.length}');
    return SettingServiceHandler();
  }

  @protected
  SettingType dco_decode_setting_type(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return SettingType.values[raw as int];
  }

  @protected
  int dco_decode_u_8(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return raw as int;
  }

  @protected
  void dco_decode_unit(dynamic raw) {
    // Codec=Dco (DartCObject based), see doc to use other codecs
    return;
  }

  @protected
  String sse_decode_String(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var inner = sse_decode_list_prim_u_8_strict(deserializer);
    return utf8.decoder.convert(inner);
  }

  @protected
  bool sse_decode_bool(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return deserializer.buffer.getUint8() != 0;
  }

  @protected
  FrontMatter sse_decode_box_autoadd_front_matter(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return (sse_decode_front_matter(deserializer));
  }

  @protected
  MdxNote sse_decode_box_autoadd_mdx_note(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return (sse_decode_mdx_note(deserializer));
  }

  @protected
  SettingType sse_decode_box_autoadd_setting_type(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return (sse_decode_setting_type(deserializer));
  }

  @protected
  File sse_decode_file(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_path = sse_decode_String(deserializer);
    return File(path: var_path);
  }

  @protected
  FrontMatter sse_decode_front_matter(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_title = sse_decode_String(deserializer);
    var var_summary = sse_decode_opt_String(deserializer);
    var var_createdAt = sse_decode_String(deserializer);
    var var_updatedAt = sse_decode_String(deserializer);
    return FrontMatter(
      title: var_title,
      summary: var_summary,
      createdAt: var_createdAt,
      updatedAt: var_updatedAt,
    );
  }

  @protected
  GetUserSettingsResponse sse_decode_get_user_settings_response(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_settings = sse_decode_list_setting_field(deserializer);
    return GetUserSettingsResponse(settings: var_settings);
  }

  @protected
  int sse_decode_i_32(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return deserializer.buffer.getInt32();
  }

  @protected
  Uint8List sse_decode_list_prim_u_8_strict(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var len_ = sse_decode_i_32(deserializer);
    return deserializer.buffer.getUint8List(len_);
  }

  @protected
  List<SettingField> sse_decode_list_setting_field(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    var len_ = sse_decode_i_32(deserializer);
    var ans_ = <SettingField>[];
    for (var idx_ = 0; idx_ < len_; ++idx_) {
      ans_.add(sse_decode_setting_field(deserializer));
    }
    return ans_;
  }

  @protected
  MdxNote sse_decode_mdx_note(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_matter = sse_decode_opt_box_autoadd_front_matter(deserializer);
    var var_body = sse_decode_String(deserializer);
    var var_path = sse_decode_String(deserializer);
    return MdxNote(matter: var_matter, body: var_body, path: var_path);
  }

  @protected
  MdxNoteResponse sse_decode_mdx_note_response(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_note = sse_decode_opt_box_autoadd_mdx_note(deserializer);
    return MdxNoteResponse(note: var_note);
  }

  @protected
  MdxServiceHandler sse_decode_mdx_service_handler(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return MdxServiceHandler();
  }

  @protected
  NoteSummary sse_decode_note_summary(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_title = sse_decode_String(deserializer);
    var var_summary = sse_decode_String(deserializer);
    var var_createdAt = sse_decode_String(deserializer);
    var var_updatedAt = sse_decode_String(deserializer);
    return NoteSummary(
      title: var_title,
      summary: var_summary,
      createdAt: var_createdAt,
      updatedAt: var_updatedAt,
    );
  }

  @protected
  String? sse_decode_opt_String(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    if (sse_decode_bool(deserializer)) {
      return (sse_decode_String(deserializer));
    } else {
      return null;
    }
  }

  @protected
  FrontMatter? sse_decode_opt_box_autoadd_front_matter(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    if (sse_decode_bool(deserializer)) {
      return (sse_decode_box_autoadd_front_matter(deserializer));
    } else {
      return null;
    }
  }

  @protected
  MdxNote? sse_decode_opt_box_autoadd_mdx_note(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    if (sse_decode_bool(deserializer)) {
      return (sse_decode_box_autoadd_mdx_note(deserializer));
    } else {
      return null;
    }
  }

  @protected
  SettingType? sse_decode_opt_box_autoadd_setting_type(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    if (sse_decode_bool(deserializer)) {
      return (sse_decode_box_autoadd_setting_type(deserializer));
    } else {
      return null;
    }
  }

  @protected
  PathRequest sse_decode_path_request(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_path = sse_decode_String(deserializer);
    return PathRequest(path: var_path);
  }

  @protected
  SettingField sse_decode_setting_field(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var var_label = sse_decode_String(deserializer);
    var var_value = sse_decode_String(deserializer);
    return SettingField(label: var_label, value: var_value);
  }

  @protected
  SettingServiceHandler sse_decode_setting_service_handler(
    SseDeserializer deserializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return SettingServiceHandler();
  }

  @protected
  SettingType sse_decode_setting_type(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    var inner = sse_decode_i_32(deserializer);
    return SettingType.values[inner];
  }

  @protected
  int sse_decode_u_8(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    return deserializer.buffer.getUint8();
  }

  @protected
  void sse_decode_unit(SseDeserializer deserializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
  }

  @protected
  void sse_encode_String(String self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_list_prim_u_8_strict(utf8.encoder.convert(self), serializer);
  }

  @protected
  void sse_encode_bool(bool self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    serializer.buffer.putUint8(self ? 1 : 0);
  }

  @protected
  void sse_encode_box_autoadd_front_matter(
    FrontMatter self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_front_matter(self, serializer);
  }

  @protected
  void sse_encode_box_autoadd_mdx_note(MdxNote self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_mdx_note(self, serializer);
  }

  @protected
  void sse_encode_box_autoadd_setting_type(
    SettingType self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_setting_type(self, serializer);
  }

  @protected
  void sse_encode_file(File self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_String(self.path, serializer);
  }

  @protected
  void sse_encode_front_matter(FrontMatter self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_String(self.title, serializer);
    sse_encode_opt_String(self.summary, serializer);
    sse_encode_String(self.createdAt, serializer);
    sse_encode_String(self.updatedAt, serializer);
  }

  @protected
  void sse_encode_get_user_settings_response(
    GetUserSettingsResponse self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_list_setting_field(self.settings, serializer);
  }

  @protected
  void sse_encode_i_32(int self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    serializer.buffer.putInt32(self);
  }

  @protected
  void sse_encode_list_prim_u_8_strict(
    Uint8List self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_i_32(self.length, serializer);
    serializer.buffer.putUint8List(self);
  }

  @protected
  void sse_encode_list_setting_field(
    List<SettingField> self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_i_32(self.length, serializer);
    for (final item in self) {
      sse_encode_setting_field(item, serializer);
    }
  }

  @protected
  void sse_encode_mdx_note(MdxNote self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_opt_box_autoadd_front_matter(self.matter, serializer);
    sse_encode_String(self.body, serializer);
    sse_encode_String(self.path, serializer);
  }

  @protected
  void sse_encode_mdx_note_response(
    MdxNoteResponse self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_opt_box_autoadd_mdx_note(self.note, serializer);
  }

  @protected
  void sse_encode_mdx_service_handler(
    MdxServiceHandler self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
  }

  @protected
  void sse_encode_note_summary(NoteSummary self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_String(self.title, serializer);
    sse_encode_String(self.summary, serializer);
    sse_encode_String(self.createdAt, serializer);
    sse_encode_String(self.updatedAt, serializer);
  }

  @protected
  void sse_encode_opt_String(String? self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    sse_encode_bool(self != null, serializer);
    if (self != null) {
      sse_encode_String(self, serializer);
    }
  }

  @protected
  void sse_encode_opt_box_autoadd_front_matter(
    FrontMatter? self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    sse_encode_bool(self != null, serializer);
    if (self != null) {
      sse_encode_box_autoadd_front_matter(self, serializer);
    }
  }

  @protected
  void sse_encode_opt_box_autoadd_mdx_note(
    MdxNote? self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    sse_encode_bool(self != null, serializer);
    if (self != null) {
      sse_encode_box_autoadd_mdx_note(self, serializer);
    }
  }

  @protected
  void sse_encode_opt_box_autoadd_setting_type(
    SettingType? self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs

    sse_encode_bool(self != null, serializer);
    if (self != null) {
      sse_encode_box_autoadd_setting_type(self, serializer);
    }
  }

  @protected
  void sse_encode_path_request(PathRequest self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_String(self.path, serializer);
  }

  @protected
  void sse_encode_setting_field(SettingField self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_String(self.label, serializer);
    sse_encode_String(self.value, serializer);
  }

  @protected
  void sse_encode_setting_service_handler(
    SettingServiceHandler self,
    SseSerializer serializer,
  ) {
    // Codec=Sse (Serialization based), see doc to use other codecs
  }

  @protected
  void sse_encode_setting_type(SettingType self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    sse_encode_i_32(self.index, serializer);
  }

  @protected
  void sse_encode_u_8(int self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
    serializer.buffer.putUint8(self);
  }

  @protected
  void sse_encode_unit(void self, SseSerializer serializer) {
    // Codec=Sse (Serialization based), see doc to use other codecs
  }
}
