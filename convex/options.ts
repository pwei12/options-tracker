import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { optionFields } from "./schema";

/* Queries */
export const getPaginatedList = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("options")
      .withIndex("by_openDate")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getLatestOptions = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("options")
      .withIndex("by_openDate")
      .order("desc")
      .take(args.limit);
  },
});

export const getAllOptions = query({
  handler: async (ctx) => {
    return await ctx.db.query("options").order("desc").collect();
  },
});

export const getSoonestExpiringOptions = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().slice(0, 10);

    return await ctx.db
      .query("options")
      .withIndex("by_expirationDate", (q) => q.gte("expirationDate", today))
      .order("asc")
      .take(args.limit);
  },
});

export const getOptionById = query({
  args: { id: v.id("options") },
  handler: async (ctx, args) => {
    return await ctx.db.get("options", args.id);
  },
});

/* Mutations */
export const createOption = mutation({
  args: optionFields.omit("closeDate", "closePrice"),
  handler: async (ctx, args) => {
    const newOptionId = await ctx.db.insert("options", args);
    return newOptionId;
  },
});

export const updateOption = mutation({
  args: {
    id: v.id("options"),
    update: optionFields.partial(),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch("options", id, fields.update);
  },
});

export const deleteOption = mutation({
  args: {
    id: v.id("options"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete("options", args.id);
  },
});
