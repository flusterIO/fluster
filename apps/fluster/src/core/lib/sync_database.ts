import { commands } from "./bindings.ts";

// FIX: Replace these imports when bindings can be generated.
export const syncDatabase = async (): Promise<void> => {
  const res = await commands.syncLocalDatabase({
    dir_path: "/Users/bigsexy/notes",
    bib_path: "citations.bib",
    n_threads: 8,
  });
  console.log("res: ", res);
};
