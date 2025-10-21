import { z } from "zod";

export const aiStateSettingSchema = z.object({
    defaultLanguageModel: z.string(),
    defaultTemperature: z.number(),
    defaultTopP: z.number(),
    defaultTopK: z.number(),
    defaultRepeatPenalty: z.number(),
    ollamaConnectionUrl: z.string(),
    ollamaConnectionPort: z.coerce.number().int().min(1),
    useOllamaConnection: z.boolean(),
});

export type AiStateSettingSchema = z.infer<typeof aiStateSettingSchema>;
