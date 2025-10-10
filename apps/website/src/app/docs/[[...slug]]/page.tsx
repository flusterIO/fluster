import { getMDXComponents } from "#/core/mdx/mdx_component_map";
import { source } from "#/core/mdx/sources/fumadocs_mdx/docs";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    console.log("source: ", source.getPages());
    const page = source.getPage(params.slug);
    if (!page) {
        notFound();
    }
    const MDX = page.data.body;
    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody className="prose dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:bg-[--shiki-light-bg] dark:prose-code:bg-[--shiki-dark-bg] [&_code_*]:text-[--shiki-light] dark:[&_code_*]:text-[--shiki-dark]">
                <MDX components={getMDXComponents()} />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();
    return {
        title: page.data.title,
        description: page.data.description,
    };
}
