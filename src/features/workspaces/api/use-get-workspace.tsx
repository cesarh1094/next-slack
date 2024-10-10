import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetWorkspace = (id: string) => {
  const data = useQuery(api.workspaces.getById, { id } as {
    id: Id<"workspaces">;
  });
  const isLoading = data === undefined;

  return { data, isLoading };
};
