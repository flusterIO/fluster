import { faker } from "@faker-js/faker";
import { DictionaryEntry } from "../../src/core/lib/bindings";

export const getFakeDictionaryEntry = (): DictionaryEntry => {
    return {
        label: faker.word.words({
            count: Math.ceil(Math.random() * 5),
        }),
        body: faker.lorem.paragraphs({
            min: 1,
            max: 3,
        }),
    };
};

export const getFakeDictionaryEntries = (nEntries: number) => {
    return Array(nEntries)
        .fill(0)
        .map(() => getFakeDictionaryEntry());
};
