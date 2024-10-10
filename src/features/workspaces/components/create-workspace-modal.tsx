"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateWorkSpaceModal } from "../store/modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateWorkspaceModal() {
  const [name, setName] = React.useState("");
  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] =
    useCreateWorkSpaceModal();
  const router = useRouter();

  const { mutate, isPending } = useCreateWorkspace();

  function handleClose() {
    setCreateWorkspaceModalOpen(false);
    setName("");
  }

  // TODO: use Zod and @conform-to to handle the form validation
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      mutate(
        { name },
        {
          onSuccess: (workspaceId) => {
            toast.success("Workspace created");
            router.push(`/workspace/${workspaceId}`);

            handleClose();
          },
        }
      );
    } catch (error) {}
  }

  return (
    <Dialog open={createWorkspaceModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            disabled={isPending}
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Person', 'Home'"
          />
          <div className="flex justify-end">
            <Button variant={"default"} disabled={isPending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
