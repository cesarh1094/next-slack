"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function WorkspaceSwitcher({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [_, setCreateWorkspaceModalOpen] = useCreateWorkSpaceModal();
  const { data: currentWorkspace, isLoading: isCurrentWorkspaceLoading } =
    useGetWorkspace(workspaceId);
  const { data: allWorkspaces } = useGetWorkspaces();

  const restOfWorkspaces = allWorkspaces?.filter(
    (workspace) => workspace?._id !== currentWorkspace?._id
  );

  function handleWorkspaceSwitch(workspaceId: string) {
    router.push(`/workspace/${workspaceId}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-slackGray hover:bg-slackGray/80 text-slate-800 font-semibold text-xl">
          {isCurrentWorkspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            currentWorkspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() =>
            currentWorkspace && handleWorkspaceSwitch(currentWorkspace?._id)
          }
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          {currentWorkspace?.name}
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {restOfWorkspaces?.map((workspace) => {
          return (
            <DropdownMenuItem
              onClick={() => handleWorkspaceSwitch(workspace._id)}
              className="cursor-pointer flex gap-2 items-center capitalize overflow-hidden"
            >
              <span className="shrink-0 size-9 relative overflow-hidden bg-slackDarkGray text-white font-semibold text-xl flex items-center rounded-md justify-center">
                {workspace.name.charAt(0).toUpperCase()}
              </span>
              <p className="truncate">{workspace.name}</p>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          className="cursor-pointer flex gap-2"
          onClick={() => setCreateWorkspaceModalOpen(true)}
        >
          <span className="size-9 relative overflow-hidden bg-slackOffWhite text-slate-800 flex items-center justify-center rounded-md">
            <Plus />
          </span>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
