import { SettingItem } from "./settings_item";

export class BoolSetting extends SettingItem {
    value: boolean;
    constructor(label: string, value: boolean) {
        super(label);
        this.value = value;
    }
}
