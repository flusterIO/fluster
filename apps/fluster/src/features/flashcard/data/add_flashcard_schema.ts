import { z } from "zod";

export const flashcardDataSchema = z.object({
    id: z.string().nullish(),
    label: z.string().min(1, "Label cannot be empty"),
    subject: z.string(),
    topic: z.string(),
    answer_description: z.string(),
    question_description: z.string(),
    answer: z.string().min(1, "Answer cannot be empty"),
    question: z.string().min(1, "Question cannot be empty"),
    tags: z.string().array(),
    correct_count: z.number().int().min(0),
    incorrect_count: z.number().int().min(0),
});

export type FlashcardDataSchema = z.infer<typeof flashcardDataSchema>;
export type FlashcardDataSchemaWithId = FlashcardDataSchema & { id: string };
