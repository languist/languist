export default async function ProjectPage({
  params,
}: {
  params: { projectId: string }
}) {
  return <div>{params.projectId}</div>
}
