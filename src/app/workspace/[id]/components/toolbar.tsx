"use client";

import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { Info, Search } from "lucide-react";

export function Toolbar({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading } = useGetWorkspace(workspaceId);

  return (
    <nav className="bg-[#481349] flex items-center justify-between min-h-10 p-1.5 ">
      <div className="flex-1"></div>
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex flex-1 items-center justify-end">
        <Button variant="transparent">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
}
