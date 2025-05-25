import { BundledTheme } from "shiki";

export interface CodeState {
  theme: {
    dark: BundledTheme;
    light: BundledTheme;
  };
}
