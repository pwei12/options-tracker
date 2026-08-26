import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { optionFields } from "./schema";

/* Queries */
export const getPaginatedList = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const options = await ctx.db
      .query("options")
      .order("desc")
      .paginate(args.paginationOpts);
    return options;
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
