import { KeyCode, KeyMod } from "monaco-editor";

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
        key: string
    ) {
        this.shift = shift;
        this.meta = meta;
        this.ctrl = ctrl;
        this.alt = alt;
        this.key = key;
    }

    toString(): string {
        return `${this.key}-${this.alt ? "true" : "false"}-${this.shift ? "true" : "false"
            }-${this.meta ? "true" : "false"}-${this.ctrl ? "true" : "false"}`;
    }

    static fromString(val: string): KeymapItem {
        const [key, alt, shift, meta, ctrl] = val.split("-");
        return new KeymapItem(
            shift == "true",
            meta == "true",
            ctrl === "true",
            alt === "true",
            key
        );
    }

    matches(e: KeyboardEvent): boolean {
        return (
            e.shiftKey === this.shift &&
            e.metaKey === this.meta &&
            e.altKey === this.alt &&
            e.ctrlKey === this.ctrl &&
            e.key === this.key
        );
    }

    toMonacoKeyMap() {
        const items: number[] = [];
        if (this.meta) {
            items.push(KeyMod.CtrlCmd);
        }
        if (this.shift) {
            items.push(KeyMod.Shift);
        }
        if (this.alt) {
            items.push(KeyMod.Alt);
        }
        if (this.ctrl) {
            items.push(KeyMod.WinCtrl);
        }
        const n = KeyCode[
            `Key${this.key.toUpperCase()}` as keyof typeof KeyCode
        ] as number;
        if (n) {
            items.push(n);
        }
        return [items.reduce((a, b) => a + b)];
    }
}
