import { z } from "zod";

export const addEquationSchema = z.object({
    id: z.string().nullable(),
    user_provided_id: z.string(),
    label: z
        .string()
        .min(2, "Your label needs to be at least 2 characters long."),
    tags: z.string().array(),
    desc: z.string(),
    body: z.string().min(3, "Please add a body to this equation."),
    snippet_ids: z.number().int().array().default([]),
});

export type EquationSchemaData = z.infer<typeof addEquationSchema>;
