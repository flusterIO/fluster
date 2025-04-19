// package: mdx.v1
// file: mdx.proto

import * as jspb from "google-protobuf";

export class FrontMatter extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  hasSummary(): boolean;
  clearSummary(): void;
  getSummary(): string;
  setSummary(value: string): void;

  getCreatedAt(): string;
  setCreatedAt(value: string): void;

  getUpdatedAt(): string;
  setUpdatedAt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FrontMatter.AsObject;
  static toObject(includeInstance: boolean, msg: FrontMatter): FrontMatter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FrontMatter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FrontMatter;
  static deserializeBinaryFromReader(message: FrontMatter, reader: jspb.BinaryReader): FrontMatter;
}

export namespace FrontMatter {
  export type AsObject = {
    title: string,
    summary: string,
    createdAt: string,
    updatedAt: string,
  }
}

export class File extends jspb.Message {
  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): File.AsObject;
  static toObject(includeInstance: boolean, msg: File): File.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): File;
  static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
  export type AsObject = {
    path: string,
  }
}

export class MdxNote extends jspb.Message {
  hasMatter(): boolean;
  clearMatter(): void;
  getMatter(): FrontMatter | undefined;
  setMatter(value?: FrontMatter): void;

  getBody(): string;
  setBody(value: string): void;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MdxNote.AsObject;
  static toObject(includeInstance: boolean, msg: MdxNote): MdxNote.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MdxNote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MdxNote;
  static deserializeBinaryFromReader(message: MdxNote, reader: jspb.BinaryReader): MdxNote;
}

export namespace MdxNote {
  export type AsObject = {
    matter?: FrontMatter.AsObject,
    body: string,
    path: string,
  }
}

export class NoteSummary extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  getCreatedAt(): string;
  setCreatedAt(value: string): void;

  getUpdatedAt(): string;
  setUpdatedAt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NoteSummary.AsObject;
  static toObject(includeInstance: boolean, msg: NoteSummary): NoteSummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NoteSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NoteSummary;
  static deserializeBinaryFromReader(message: NoteSummary, reader: jspb.BinaryReader): NoteSummary;
}

export namespace NoteSummary {
  export type AsObject = {
    title: string,
    summary: string,
    createdAt: string,
    updatedAt: string,
  }
}

export class PathRequest extends jspb.Message {
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

export namespace PathRequest {
  export type AsObject = {
    path: string,
  }
}

export class MdxNoteResponse extends jspb.Message {
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

export namespace MdxNoteResponse {
  export type AsObject = {
    note?: MdxNote.AsObject,
  }
}

