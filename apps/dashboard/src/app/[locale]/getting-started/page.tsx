import { CreateWorkspaceForm } from '@/modules/workspace/components/create-workspace-form'

export default function GettingStartedPage() {
  return (
    <div className="relative mx-auto flex w-full max-w-96 flex-1 flex-col items-center justify-center gap-4 pb-16">
      <CreateWorkspaceForm />
    </div>
  )
}
