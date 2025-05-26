# Fluster UI

Common UI components used throughout [Fluster](ulld.vercel.app). All plugin developers should be encouraged to use as many of these components as possible, and submit pull requests with improvements if applicable so user's have a relatively uniform UI.

## Note on Inputs

All inputs are intended to be used as a child of a `Form` component. See the ShadCN documentation with more details. Instead of taking a value, they take the name of a field and a form provided to `react-hook-form`. Each input then manages that field on the form directly.

Using the above appraoch makes sure that all inputs use best practices as far as error handling.

Using zod, this looks like:

```tsx
import { z } from "zod";

const mySchema = z.object({
  myField: z.string().min(4, "This needs to be longer!"),
});

const MyComponent = () => {
  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      myField: "",
    },
  });

  return <InputFromThisPackage form={form} name="myField" />;
};
```
