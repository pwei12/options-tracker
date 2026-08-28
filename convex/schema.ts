import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const optionFields = v.object({
  name: v.string(),
  premium: v.number(),
  strikePrice: v.number(),
  expirationDate: v.string(),
  optionType: v.union(v.literal("put"), v.literal("call")),
  tradingType: v.union(v.literal("long"), v.literal("short")),
  openFee: v.number(),
  closeFee: v.optional(v.number()),
  openDate: v.string(),
  closeDate: v.optional(v.string()),
  closePrice: v.optional(v.number()),
});

export default defineSchema({
  options: defineTable(optionFields)
    .index("by_name", ["name"])
    .index("by_openDate", ["openDate"])
    .index("by_expirationDate", ["expirationDate"])
    .index("by_name_expirationDate", ["name", "expirationDate"]),
});
