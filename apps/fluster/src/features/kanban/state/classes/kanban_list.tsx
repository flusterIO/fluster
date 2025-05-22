import { KanbanItemManager } from "./kanban_item";
import { v4 as uuid } from "uuid";

export class KanbanListManager {
    label: string;
    items: KanbanItemManager[] = [];
    id: string;
    constructor(label: string, items: KanbanItemManager[] = [], id?: string) {
        this.label = label;
        this.items = items;
        this.id = id ?? uuid();
    }

    /// Returns a new class with the specified item appended.
    withAppendedItem(item: KanbanItemManager): KanbanListManager {
        return new KanbanListManager(this.label, [...this.items, item]);
    }

    /// Returns a new class without items with the specified id.
    withItemRemoved(itemId: string): KanbanListManager {
        return new KanbanListManager(
            this.label,
            this.items.filter((f) => f.id !== itemId),
        );
    }
}
