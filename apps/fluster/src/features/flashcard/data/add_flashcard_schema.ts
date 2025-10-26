import { z } from "zod";

export const flashcardDataSchema = z.object({
    id: z.string().nullish(),
    label: z.string(),
    subject: z.string(),
    topic: z.string(),
    answer_description: z.string(),
    question_description: z.string(),
    answer: z.string(),
    question: z.string(),
    tags: z.string().array(),
});

export type FlashcardDataSchema = z.infer<typeof flashcardDataSchema>;
