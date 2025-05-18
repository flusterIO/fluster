import { DictionaryEntry } from "./dictionary_entry";

export const letters = ["#", "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"] as const;


export class DictionaryLetterData {
    letter: typeof letters[number]
    entries: DictionaryEntry[] = []
    constructor(letter: typeof letters[number], entries: DictionaryEntry[]){
        this.letter = letter;
        this.entries = entries;
    }
}
