import { SnippetItem } from "../../src/core/lib/bindings";
import { BundledLanguage } from "shiki";
import { faker } from "@faker-js/faker";

const snippets: { lang: BundledLanguage; body: string }[] = [];
export const getFakeSnippetItem = (): SnippetItem => {
  const item = snippets[Math.ceil(Math.random() * snippets.length)];
  return {
    id: null,
    label: faker.lorem.words({
      min: 1,
      max: 10,
    }),
    lang: "Ts",
    body: item.body,
    desc: faker.lorem.paragraphs({
      min: 1,
      max: 5,
    }),
  };
};
