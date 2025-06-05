import { BundledTheme } from "shiki";

export interface CodeState {
  defaultLanguage: string;
  theme: {
    dark: BundledTheme;
    light: BundledTheme;
  };
}
