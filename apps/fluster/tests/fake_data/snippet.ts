import {
    SnippetItem,
    SyntaxSupportedLanguage,
} from "../../src/core/lib/bindings";
import { faker } from "@faker-js/faker";

const snippets: { lang: SyntaxSupportedLanguage; body: string }[] = [];
export const getFakeSnippetItem = (): SnippetItem => {
    let item = snippets[Math.ceil(Math.random() * snippets.length)];
    return {
        lang: "Ts",
        body: item.body,
        desc: faker.lorem.paragraphs({
            min: 1,
            max: 5,
        }),
    };
};
