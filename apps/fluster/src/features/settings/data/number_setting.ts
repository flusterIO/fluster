import { SettingItem } from "./settings_item";

export class NumberSetting extends SettingItem {
    value: number;
    constructor(label: string, value: number) {
        super(label);
        this.value = value;
    }
}
