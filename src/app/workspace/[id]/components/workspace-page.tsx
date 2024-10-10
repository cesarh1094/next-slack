"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export function WorkspacePage({ id }: { id: string }) {
  const { data } = useGetWorkspace(id);

  return <div>Data: {JSON.stringify(data, null, "\n")}</div>;
}
