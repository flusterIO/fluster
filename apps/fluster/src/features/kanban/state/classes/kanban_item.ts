import { v4 as uuid } from "uuid";

export class KanbanItemManager {
    label: string;
    id: string;
    constructor(label: string, id?: string) {
        this.label = label;
        this.id = id ?? uuid();
    }
}
