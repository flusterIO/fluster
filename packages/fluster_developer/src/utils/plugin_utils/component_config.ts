import { z } from "zod";

export const componentConfig = z.object({
  componentName: z.string().describe(`Example: "MyComponent"
The name of the component must follow React rules (start with a capital letter). This is the name your component will be available as within the user's note.`),
});

export type ComponentConfig = z.input<typeof componentConfig>;
