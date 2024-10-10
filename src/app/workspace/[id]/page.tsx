import { WorkspacePage } from "./components/workspace-page";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <WorkspacePage id={params.id} />
    </>
  );
}
