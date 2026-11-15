import { z } from "zod";

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date.");
const positiveQuantity = z
  .string()
  .trim()
  .regex(/^\d{1,9}(?:\.\d{1,3})?$/, "Use a positive quantity with up to 3 decimal places.")
  .refine((value) => Number(value) > 0, "Quantity must be greater than zero.");
const positivePrice = z
  .string()
  .trim()
  .regex(/^\d{1,10}(?:\.\d{1,2})?$/, "Use a positive KES price with up to 2 decimal places.")
  .refine((value) => Number(value) > 0, "Price must be greater than zero.");

export const PRODUCE_UNITS = ["KG", "CRATE", "BAG", "BUNCH"] as const;
export const PRODUCE_UNIT_LABELS: Record<(typeof PRODUCE_UNITS)[number], string> = {
  KG: "Kilogram (kg)",
  CRATE: "Crate",
  BAG: "Bag",
  BUNCH: "Bunch",
};

export const listingInputSchema = z
  .object({
    produceName: z.string().trim().min(2).max(100),
    variety: z.string().trim().max(100).optional().or(z.literal("")),
    description: z.string().trim().max(1000).optional().or(z.literal("")),
    quantity: positiveQuantity,
    unit: z.enum(PRODUCE_UNITS),
    pricePerUnit: positivePrice,
    county: z.string().trim().min(2).max(80),
    collectionArea: z.string().trim().min(2).max(120),
    availableFrom: dateOnly,
    availableUntil: z.union([dateOnly, z.literal("")]).optional(),
  })
  .superRefine((value, context) => {
    if (!isCalendarDate(value.availableFrom)) {
      context.addIssue({ code: "custom", path: ["availableFrom"], message: "Enter a real calendar date." });
    }

    if (value.availableUntil && !isCalendarDate(value.availableUntil)) {
      context.addIssue({ code: "custom", path: ["availableUntil"], message: "Enter a real calendar date." });
    }

    if (
      value.availableUntil &&
      isCalendarDate(value.availableFrom) &&
      isCalendarDate(value.availableUntil) &&
      value.availableUntil < value.availableFrom
    ) {
      context.addIssue({ code: "custom", path: ["availableUntil"], message: "Available until must be on or after the available-from date." });
    }
  });

export type ListingInput = z.infer<typeof listingInputSchema>;

export function isCalendarDate(value: string): boolean {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function formDataToListingInput(formData: FormData) {
  return {
    produceName: formData.get("produceName"),
    variety: formData.get("variety"),
    description: formData.get("description"),
    quantity: formData.get("quantity"),
    unit: formData.get("unit"),
    pricePerUnit: formData.get("pricePerUnit"),
    county: formData.get("county"),
    collectionArea: formData.get("collectionArea"),
    availableFrom: formData.get("availableFrom"),
    availableUntil: formData.get("availableUntil") ?? "",
  };
}

export function toUtcDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}
