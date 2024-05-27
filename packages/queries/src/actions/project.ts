'use server'

import { createServerClient } from "@languist/supabase/server-client";
import { CreateProjectValues, createProject } from "@languist/supabase/project"
import { revalidateTag } from "next/cache";

export async function createProjectAction(values: CreateProjectValues) {
  const supabase = await createServerClient()

  const result = await createProject({
    client: supabase,
    project: values,
  })

  revalidateTag('project')

  return result
}
