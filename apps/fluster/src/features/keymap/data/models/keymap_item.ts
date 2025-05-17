export class KeymapItem {
  shift: boolean;
  meta: boolean;
  ctrl: boolean;
  alt: boolean;
  key: string;
  constructor(
    shift: boolean,
    meta: boolean,
    ctrl: boolean,
    alt: boolean,
    key: string,
  ) {
    this.shift = shift;
    this.meta = meta;
    this.ctrl = ctrl;
    this.alt = alt;
    this.key = key;
  }

  toString(): string {
    return `${this.key}-${this.alt ? "true" : "false"}-${this.shift ? "true" : "false"}-${this.meta ? "true" : "false"}-${this.ctrl ? "true" : "false"}`;
  }

  static fromString(val: string): KeymapItem {
    const [keyCode, alt, shift, meta, ctrl] = val.split("-");
    return new KeymapItem(
      shift == "true",
      meta == "true",
      ctrl === "true",
      alt === "true",
      keyCode,
    );
  }
}
