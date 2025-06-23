export abstract class CommandPaletteAnyEntry {
    label: string;
    id: string;
    itemClasses?: string;
    constructor(label: string, id: string) {
        this.label = label;
        this.id = id;
    }
}
