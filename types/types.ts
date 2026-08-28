import { Doc, Id } from "@/convex/_generated/dataModel";
import { z } from "zod";

export type Option = {
  id: Id<"options">;
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: Doc<"options">["optionType"];
  tradingType: Doc<"options">["tradingType"];
  openFee: number;
  openDate: string;
  closePrice?: number;
  closeFee?: number;
  closeDate?: string;
};

export const optionTypeValues = ["call", "put"] as const;
export const tradingTypeValues = ["long", "short"] as const;

const priceSchema = z
  .string()
  .min(1, { message: "Required" })
  .refine((value) => !Number.isNaN(Number(value)), "Must be a valid number")
  .regex(/^\d+(?:\.\d{0,2})?$/, {
    message: "Invalid format (max 2 decimals)",
  })
  .refine((value) => Number(value) > 0, {
    message: "Must be greater than 0",
  });

const dateSchema = z.date({
  error: "Required",
});

export const optionFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  premium: priceSchema,
  strikePrice: priceSchema,
  expirationDate: dateSchema,
  openFee: priceSchema,
  openDate: dateSchema,
  optionType: z.enum(optionTypeValues),
  tradingType: z.enum(tradingTypeValues),
  closePrice: priceSchema.optional(),
  closeFee: priceSchema.optional(),
  closeDate: z.date().optional(),
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;

export type OptionFormSection = "option" | "trading";
