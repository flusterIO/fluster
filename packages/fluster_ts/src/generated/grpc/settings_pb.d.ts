// package: settings.v1
// file: settings.proto

import * as jspb from "google-protobuf";
import * as database_pb from "./database_pb";

export class SettingItem extends jspb.Message {
  getLabel(): string;
  setLabel(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPage(): string;
  setPage(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getSettingUniqueKey(): string;
  setSettingUniqueKey(value: string): void;

  getType(): SettingTypeMap[keyof SettingTypeMap];
  setType(value: SettingTypeMap[keyof SettingTypeMap]): void;

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
    page: string,
    value: string,
    settingUniqueKey: string,
    type: SettingTypeMap[keyof SettingTypeMap],
  }
}

export class SettingField extends jspb.Message {
  getLabel(): string;
  setLabel(value: string): void;

  getValue(): string;
  setValue(value: string): void;

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
    value: string,
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

export interface SettingTypeMap {
  SETTING_TYPE_STRING_UNSPECIFIED: 0;
  SETTING_TYPE_INT: 1;
  SETTING_TYPE_FLOAT: 2;
  SETTING_TYPE_BOOL: 3;
}

export const SettingType: SettingTypeMap;

