import { docsSource } from '#/core/mdx/sources/docs_source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(docsSource);
