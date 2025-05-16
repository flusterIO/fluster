import { Navigator } from "react-router";

export abstract class GlobalAction {
    label: string;

    constructor(label: string) {
        this.label = label;
    }

    abstract invoke(nav: Navigator): Promise<void>;
}
