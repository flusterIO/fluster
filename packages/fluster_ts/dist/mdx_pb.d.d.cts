import * as jspb from 'google-protobuf';
import * as google_protobuf_descriptor_pb from 'google-protobuf/google/protobuf/descriptor_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

// package: mdx.v1
// file: proto/mdx.proto



declare class FrontMatter extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  hasSummary(): boolean;
  clearSummary(): void;
  getSummary(): string;
  setSummary(value: string): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasUpdatedAt(): boolean;
  clearUpdatedAt(): void;
  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FrontMatter.AsObject;
  static toObject(includeInstance: boolean, msg: FrontMatter): FrontMatter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FrontMatter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FrontMatter;
  static deserializeBinaryFromReader(message: FrontMatter, reader: jspb.BinaryReader): FrontMatter;
}

declare namespace FrontMatter {
  export type AsObject = {
    title: string,
    summary: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

declare class File extends jspb.Message {
  getPath(): string;
  setPath(value: string): void;

  hasDescriptor(): boolean;
  clearDescriptor(): void;
  getDescriptor(): google_protobuf_descriptor_pb.FileDescriptorSet | undefined;
  setDescriptor(value?: google_protobuf_descriptor_pb.FileDescriptorSet): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): File.AsObject;
  static toObject(includeInstance: boolean, msg: File): File.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): File;
  static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

declare namespace File {
  export type AsObject = {
    path: string,
    descriptor?: google_protobuf_descriptor_pb.FileDescriptorSet.AsObject,
  }
}

declare class MdxNote extends jspb.Message {
  hasMatter(): boolean;
  clearMatter(): void;
  getMatter(): FrontMatter | undefined;
  setMatter(value?: FrontMatter): void;

  getBody(): string;
  setBody(value: string): void;

  hasFile(): boolean;
  clearFile(): void;
  getFile(): File | undefined;
  setFile(value?: File): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MdxNote.AsObject;
  static toObject(includeInstance: boolean, msg: MdxNote): MdxNote.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MdxNote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MdxNote;
  static deserializeBinaryFromReader(message: MdxNote, reader: jspb.BinaryReader): MdxNote;
}

declare namespace MdxNote {
  export type AsObject = {
    matter?: FrontMatter.AsObject,
    body: string,
    file?: File.AsObject,
  }
}

declare class NoteSummary extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasUpdatedAt(): boolean;
  clearUpdatedAt(): void;
  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NoteSummary.AsObject;
  static toObject(includeInstance: boolean, msg: NoteSummary): NoteSummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NoteSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NoteSummary;
  static deserializeBinaryFromReader(message: NoteSummary, reader: jspb.BinaryReader): NoteSummary;
}

declare namespace NoteSummary {
  export type AsObject = {
    title: string,
    summary: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

declare class PathRequest extends jspb.Message {
  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PathRequest): PathRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathRequest;
  static deserializeBinaryFromReader(message: PathRequest, reader: jspb.BinaryReader): PathRequest;
}

declare namespace PathRequest {
  export type AsObject = {
    path: string,
  }
}

declare class MdxNoteResponse extends jspb.Message {
  hasNote(): boolean;
  clearNote(): void;
  getNote(): MdxNote | undefined;
  setNote(value?: MdxNote): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MdxNoteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MdxNoteResponse): MdxNoteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MdxNoteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MdxNoteResponse;
  static deserializeBinaryFromReader(message: MdxNoteResponse, reader: jspb.BinaryReader): MdxNoteResponse;
}

declare namespace MdxNoteResponse {
  export type AsObject = {
    note?: MdxNote.AsObject,
  }
}

export { File, FrontMatter, MdxNote, MdxNoteResponse, NoteSummary, PathRequest };
