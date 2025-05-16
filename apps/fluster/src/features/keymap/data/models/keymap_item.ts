class KeymapItem {
    shift: boolean;
    cmd: boolean;
    ctrl: boolean;
    keyCode: number;
    constructor(shift: boolean, cmd: boolean, ctrl: boolean, keyCode: number) {
        this.shift = shift;
        this.cmd = cmd;
        this.ctrl = ctrl;
        this.keyCode = keyCode;
    }

    toString(): string {
        return `${this.keyCode}-${this.shift ? "true" : "false"}-${this.cmd ? "true" : "false"}-${this.ctrl ? "true" : "false"}`;
    }

    static fromString(val: string): KeymapItem {
        const [keyCode, shift, cmd, ctrl] = val.split("-");
        return new KeymapItem(
            shift == "true",
            cmd == "true",
            ctrl === "true",
            parseInt(keyCode),
        );
    }
}
