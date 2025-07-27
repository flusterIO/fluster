export abstract class CommandPaletteAnyEntry {
    label: string;
    id: string;
    itemClasses?: string;
    asHtml?: boolean;
    constructor(label: string, id: string, asHtml: boolean = false) {
        this.label = label;
        this.id = id;
        this.asHtml = asHtml;
    }
}
