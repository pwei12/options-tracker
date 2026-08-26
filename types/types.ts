import { z } from "zod";

export enum OptionType {
  CALL = "call",
  PUT = "put",
}

export enum TradingType {
  LONG = "long",
  SHORT = "short",
}

export type Option = {
  id: string;
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  tradingType: TradingType;
  openDate: string;
  closeDate?: string;
  closePrice?: number;
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
  fee: priceSchema,
  optionType: z.enum(optionTypeValues),
  tradingType: z.enum(tradingTypeValues),
  openDate: dateSchema,
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;
