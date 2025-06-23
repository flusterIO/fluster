import { ReactNode } from "react";

export type FeatureImageGalleryKey =
  | "plotting"
  | "bibliography"
  | "taskManager"
  | "organization"
  | "insertDataFromApis"
  | "inputs";

export type MiniFeature = {
  title: ReactNode;
  desc: ReactNode;
  icon: ({ className }: { className: string }) => ReactNode;
  featureKey?: FeatureImageGalleryKey;
  seeMoreHref?: string;
};
