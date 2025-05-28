import { DictionaryEntry } from "@/lib/bindings";

export type DictionaryEntryWithIdx = DictionaryEntry & { idx: number };

export type GroupedDictionaryEntries = Record<string, DictionaryEntryWithIdx[]>;
