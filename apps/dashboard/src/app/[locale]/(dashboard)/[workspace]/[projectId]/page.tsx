export default async function ProjectPage({
  params,
}: {
  params: { projectId: string }
}) {
  return <div>Project dashboard {params.projectId}</div>
}
