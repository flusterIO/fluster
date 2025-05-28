import React from "react";
import { IoLogoAndroid } from "react-icons/io5";
import { IconProps } from "../types";

export const KotlinIcon = (props: IconProps) => {
  return <IoLogoAndroid {...props} />;
};

KotlinIcon.displayName = "KotlinIcon";

export default KotlinIcon;
