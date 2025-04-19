// package: settings.v1
// file: proto/settings.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as proto_database_pb from "../proto/database_pb";

export class SettingItem extends jspb.Message {
  getLabel(): string;
  setLabel(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): google_protobuf_any_pb.Any | undefined;
  setValue(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingItem.AsObject;
  static toObject(includeInstance: boolean, msg: SettingItem): SettingItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingItem;
  static deserializeBinaryFromReader(message: SettingItem, reader: jspb.BinaryReader): SettingItem;
}

export namespace SettingItem {
  export type AsObject = {
    label: string,
    description: string,
    value?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class SettingField extends jspb.Message {
  getLabel(): string;
  setLabel(value: string): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): google_protobuf_any_pb.Any | undefined;
  setValue(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingField.AsObject;
  static toObject(includeInstance: boolean, msg: SettingField): SettingField.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingField, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingField;
  static deserializeBinaryFromReader(message: SettingField, reader: jspb.BinaryReader): SettingField;
}

export namespace SettingField {
  export type AsObject = {
    label: string,
    value?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class GetUserSettingsResponse extends jspb.Message {
  clearSettingsList(): void;
  getSettingsList(): Array<SettingField>;
  setSettingsList(value: Array<SettingField>): void;
  addSettings(value?: SettingField, index?: number): SettingField;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserSettingsResponse): GetUserSettingsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserSettingsResponse;
  static deserializeBinaryFromReader(message: GetUserSettingsResponse, reader: jspb.BinaryReader): GetUserSettingsResponse;
}

export namespace GetUserSettingsResponse {
  export type AsObject = {
    settingsList: Array<SettingField.AsObject>,
  }
}

