import React from "react";
import { Toolbar } from "./components/toolbar";
import { SideBar } from "./components/sidebar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="h-full flex flex-col">
      <Toolbar workspaceId={params.id} />
      <div className="flex-grow flex">
        <SideBar workspaceId={params.id} />
        {children}
      </div>
    </div>
  );
}
