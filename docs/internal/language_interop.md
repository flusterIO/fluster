# Language Interop

- [ ] We're going to have to sync the bibliography using a typescript or python library for the easy of json serialization and optional types. The biblatex library in rust was showing promise, but the struct won't be serializable in surrealDb without a custom serde serializer.

- [ ] Likewise, in order to use mdx plugins the mdx parsing has to be offloaded to `@mdx-js/mdx`. This might be resolvable in the future but for now this needs to be handled by node.
