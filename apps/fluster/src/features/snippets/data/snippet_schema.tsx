import { z } from "zod";

export const snippetSchema = z.object({
    lang: z.string(),
    label: z
        .string()
        .min(2, "Your label needs to be at least 2 characters long."),
    body: z.string().min(3, "Please add a body to this snippet."),
    desc: z.string(),
    tags: z.string().array(),
    ctime: z.number().int(),
    utime: z.number().int(),
    id: z.string().uuid().nullable(),
});

export type SnippetSchema = z.infer<typeof snippetSchema>;
