import { FC } from "react";

export const flusterColors = {
  primary: "--primary",
  secondary: "--secondary",
  "secondary-foreground": "--secondary-foreground",
  muted: "--muted",
  "muted-foreground": "--muted-foreground",
  accent: "--accent",
  "accent-foreground": "--accent-foreground",
  destructive: "--destructive",
  "destructive-foreground": "--destructive-foreground",
  warning: "--warning",
  success: "--success",
  info: "--info",
};

/// Add an InlineMdx prop to pass the mdx component in as a prop through the component map.
export interface WithInlineMdxProp {
  InlineMdxContent: FC<{
    mdx: string;
  }>;
}

interface WithColorPropsColorKeys {
  primary: boolean | undefined;
  secondary: boolean | undefined;
  secondaryForeground: boolean | undefined;
  muted: boolean | undefined;
  mutedForeground: boolean | undefined;
  accent: boolean | undefined;
  accentForeground: boolean | undefined;
  destructive: boolean | undefined;
  destructiveForeground: boolean | undefined;
  warning: boolean | undefined;
  success: boolean | undefined;
  info: boolean | undefined;
}

export interface WithColorProps extends WithColorPropsColorKeys {
  color?: string;
}

export const colorMap: { [K in keyof WithColorPropsColorKeys]: string } = {
  primary: `hsl(var(${flusterColors.primary}))`,
  secondary: `hsl(var(${flusterColors.secondary}))`,
  secondaryForeground: `hsl(var(${flusterColors["secondary-foreground"]}))`,
  muted: `hsl(var(${flusterColors.muted}))`,
  mutedForeground: `hsl(var(${flusterColors["muted-foreground"]}))`,
  accent: `hsl(var(${flusterColors.accent}))`,
  accentForeground: `hsl(var(${flusterColors["accent-foreground"]}))`,
  destructive: `hsl(var(${flusterColors.destructive}))`,
  destructiveForeground: `hsl(var(${flusterColors["destructive-foreground"]}))`,
  warning: `hsl(var(${flusterColors.warning}))`,
  success: `hsl(var(${flusterColors.success}))`,
  info: `hsl(var(${flusterColors.info}))`,
};

export const withColorPropToColor = (
  props: WithColorProps,
  defaultColor: string
): string => {
  if (props.color) {
    return props.color;
  }
  for (const k in props) {
    if (props[k as keyof typeof props]) {
      if (k in colorMap) {
        return colorMap[k as keyof typeof colorMap];
      }
    }
  }
  return defaultColor;
};

export const getColorVariable = (c: string): string | undefined => {
  return c in flusterColors
    ? `hsl(var(${flusterColors[c as keyof typeof flusterColors]}))`
    : c;
};

export type FlusterColor = keyof typeof flusterColors;
