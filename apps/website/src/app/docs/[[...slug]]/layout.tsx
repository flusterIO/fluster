import { baseOptions } from '#/core/mdx/base_options';
import { docsSource } from '#/core/mdx/sources/docs_source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={docsSource.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
