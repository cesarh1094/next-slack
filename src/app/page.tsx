"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/modal";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] =
    useCreateWorkSpaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = React.useMemo(() => data?.[0]?._id, [data]);

  React.useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      // Redirect user
      router.replace(`/workspace/${workspaceId}`);
    } else if (!createWorkspaceModalOpen) {
      setCreateWorkspaceModalOpen(true);
    }
  }, [
    workspaceId,
    isLoading,
    createWorkspaceModalOpen,
    setCreateWorkspaceModalOpen,
    router,
  ]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
