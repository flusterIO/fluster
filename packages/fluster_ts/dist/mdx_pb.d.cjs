var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/generated/grpc/proto/mdx_pb.d.ts
var mdx_pb_d_exports = {};
__export(mdx_pb_d_exports, {
  File: () => File,
  FrontMatter: () => FrontMatter,
  MdxNote: () => MdxNote,
  MdxNoteResponse: () => MdxNoteResponse,
  NoteSummary: () => NoteSummary,
  PathRequest: () => PathRequest
});
module.exports = __toCommonJS(mdx_pb_d_exports);
var jspb = __toESM(require("google-protobuf"), 1);
var FrontMatter = class extends jspb.Message {
  static extensions;
  static extensionsBinary;
};
var File = class extends jspb.Message {
  static extensions;
  static extensionsBinary;
};
var MdxNote = class extends jspb.Message {
  static extensions;
  static extensionsBinary;
};
var NoteSummary = class extends jspb.Message {
  static extensions;
  static extensionsBinary;
};
var PathRequest = class extends jspb.Message {
  static extensions;
  static extensionsBinary;
};
var MdxNoteResponse = class extends jspb.Message {
  static extensions;
  static extensionsBinary;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  File,
  FrontMatter,
  MdxNote,
  MdxNoteResponse,
  NoteSummary,
  PathRequest
});
