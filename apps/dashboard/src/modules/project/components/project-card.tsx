import { ArrowRight, ProjectBulk } from "@languist/icons"
import { Project } from "@languist/supabase/project"
import { Card, CardContent, CardFooter } from "@languist/ui/card"
import Link from "next/link"

export type ProjectCardProps = {
  data: Project
}

export const ProjectCard = ({ data }: ProjectCardProps) => {
  return (
    <Link href="" className="grid">
      <Card className="bg-muted flex group flex-col border-none p-1 pb-0 shadow-none">
        <CardContent className="flex flex-col shadow-sm relative flex-1 bg-background rounded-lg justify-end px-3 py-2">
          <ProjectBulk className="absolute top-3 left-3 size-8 text-primary" />
          <p className="text-sm text-muted-foreground">{data.languages?.join(', ')}</p>
          <h3 className="text-lg font-semibold">{data.name}</h3>
        </CardContent>
        <CardFooter className="flex justify-between overflow-hidden px-3 py-2 text-xs text-muted-foreground">
          <span className="transition ease-[cubic-bezier(0.2,0.4,0,1)] group-hover:-translate-x-[calc(100%+theme(spacing.4))] group-has-[a:focus-visible]:-translate-x-[calc(100%+theme(spacing.4))] motion-reduce:duration-0">
            Updated 2 days ago
          </span>
          <span className="flex font-medium translate-x-[calc(100%+theme(spacing.4))] items-center gap-1 transition ease-[cubic-bezier(0.2,0.4,0,1)] group-hover:translate-x-0 group-has-[a:focus-visible]:translate-x-0 motion-reduce:duration-0">
            Go to project
            <ArrowRight className="size-3" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
