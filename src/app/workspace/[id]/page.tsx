export default function WorkspacePage({ params }: { params: { id: string } }) {
  console.log(params);

  return (
    <div>
      My first workspace: <span>{params.id}</span>
    </div>
  );
}
