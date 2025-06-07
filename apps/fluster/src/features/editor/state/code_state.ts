import { BundledTheme } from "shiki";

export interface CodeState {
    keymap: "vim" | "standard";
  defaultLanguage: string;
  theme: {
    dark: BundledTheme;
    light: BundledTheme;
  };
}
