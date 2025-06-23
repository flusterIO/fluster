import { z } from "zod";

export const contactTypes = [
    "Email",
    "Phone",
    "Text Message",
    "Other (mention in message)",
] as const;

export const contactPurposes = [
    "Long term partnership",
    "Short term sponsorship",
    "Sponsor specific feature",
    "Official brand affiliation",
    "Individual job offer",
    "Other",
] as const;

export const defaultContactPurpose =
    contactPurposes[contactPurposes.length - 1];

export const defaultContactType = contactTypes[0];

export const businessContactFormDefaultValues = {
    companyName: "",
    contactName: "",
    contactPreference: defaultContactType,
    message: "",
    email: "",
    phone: "",
    purpose: defaultContactPurpose,
};

export const businessInterestFormSchema = z.object({
    companyName: z.string().min(3, "Please provide a company name."),
    contactName: z.string().min(3, "Who is the person reaching out?"),
    contactPreference: z.enum(contactTypes).default(defaultContactType),
    message: z.string().min(20, "Please provide more information."),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    purpose: z.enum(contactPurposes).default(defaultContactPurpose),
});

export type BusinessInterestData = z.infer<typeof businessInterestFormSchema>;

export type ValidatedBusinessInterest = z.output<
    typeof businessInterestFormSchema
>;
