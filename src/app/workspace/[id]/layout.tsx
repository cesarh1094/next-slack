import React from "react";
import { Toolbar } from "./components/toolbar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="h-full">
      <Toolbar workspaceId={params.id} />
      {children}
    </div>
  );
}
