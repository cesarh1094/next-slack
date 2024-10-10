import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUserId = await getAuthUserId(ctx);

    // User must be authenticated in order to create workspace
    if (!currentUserId) {
      throw new Error("Unauthorized");
    }

    // TODO: create proper method for join code
    const joinCode = "12345";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId: currentUserId,
      joinCode,
    });

    return workspaceId;
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});
