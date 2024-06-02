import { ProjectLanguages } from '@/modules/project/components/project-languages'

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string }
}) {
  return (
    <main className="relative isolate w-full flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl gap-4 px-5 py-8 pb-20 lg:gap-6 lg:px-16 lg:py-10">
        <ProjectLanguages projectId={params.projectId} />
      </div>
    </main>
  )
}
