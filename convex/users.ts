import { auth } from "./auth";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const currentUserId = await getAuthUserId(ctx);

    if (currentUserId === null) {
      return currentUserId;
    }

    return await ctx.db.get(currentUserId);
  },
});
