import { faker } from "@faker-js/faker";
import { DictionaryEntryModel } from "../../src/core/lib/bindings";

export const getFakeDictionaryEntry = (): DictionaryEntryModel => {
  const now = new Date().valueOf();
  return {
    label: faker.word.words({
      count: Math.ceil(Math.random() * 5),
    }),
    body: faker.lorem.paragraphs({
      min: 1,
      max: 3,
    }),
    ctime: BigInt(now),
  };
};

export const getFakeDictionaryEntries = (nEntries: number) => {
  return Array(nEntries)
    .fill(0)
    .map(() => getFakeDictionaryEntry());
};
