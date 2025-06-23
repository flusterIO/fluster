import * as jspb from 'google-protobuf';

// package: database.v1
// file: proto/database.proto



declare class DatabaseCredentialsRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getSecureKey(): string;
  setSecureKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DatabaseCredentialsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DatabaseCredentialsRequest): DatabaseCredentialsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DatabaseCredentialsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DatabaseCredentialsRequest;
  static deserializeBinaryFromReader(message: DatabaseCredentialsRequest, reader: jspb.BinaryReader): DatabaseCredentialsRequest;
}

declare namespace DatabaseCredentialsRequest {
  export type AsObject = {
    username: string,
    secureKey: string,
  }
}

export { DatabaseCredentialsRequest };
