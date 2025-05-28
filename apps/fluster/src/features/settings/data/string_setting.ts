import { SettingItem } from "./settings_item";

export class StringSetting extends SettingItem {
    value: string;
    constructor(label: string, value: string) {
        super(label);
        this.value = value;
    }
}
