import { z } from "zod";
import { getColorVariable } from "../embeddable_components/types";

export const colorProp = z
    .string()
    .nullish()
    .transform((x) => (x ? getColorVariable(x) : undefined));
