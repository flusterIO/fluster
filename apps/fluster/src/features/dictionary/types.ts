import { DictionaryEntryModel } from "@/lib/bindings";

export type DictionaryEntryWithIdx = DictionaryEntryModel & { idx: number };

export type GroupedDictionaryEntries = Record<string, DictionaryEntryWithIdx[]>;
