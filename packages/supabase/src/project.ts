import { logActivities } from "./activity";
import { supabaseClient as supabase } from "./client/client";
import { Tables } from "./types";

export type Project = Tables<'projects'> & {
  languages?: string[]
}

export async function getOrganizationProjects(organizationId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      user: profiles (*)
    `)
    .eq('organization_id', organizationId)
    .throwOnError()

  const { data: orgLanguages } = await supabase.rpc('get_organization_languages', {
    organization_id: organizationId,
  })

  if (error) {
    throw error
  }

  const result = data?.map(project => ({
    ...project,
    languages: orgLanguages?.find(l => l.project_id === project.id)?.languages || [],
  }))

  return result
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      user: profiles (*)
    `)
    .eq('id', projectId)
    .throwOnError()
    .single()

  const { data: projectLanguages } = await supabase.rpc('get_project_languages', {
    project_id: projectId,
  })

  if (error) {
    throw error
  }

  const result = {
    ...data,
    languages: projectLanguages?.[0]?.languages || [],
  }

  return result
}

export type CreateProjectValues = Pick<Project, 'name' | 'source_language' | 'organization_id' | 'user_id'>

export async function createProject(project: CreateProjectValues) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select(`
      *,
      user: profiles (*)
    `)
    .throwOnError()
    .single()

  if (error) {
    throw error
  }
  
  await logActivities([{
    organization_id: project.organization_id,
    user_id: project.user_id,
    action: 'created',
    target_type: 'project',
    target_id: data.id,
    extra: null,
  }])

  return data
}

export type UpdateProjectValues = Partial<Project> & { id: string }

export async function updateProject({id, ...project}: UpdateProjectValues) {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select(`
      *,
      user: profiles (*)
    `)
    .throwOnError()
    .single()

  if (error) {
    throw error
  }

  await logActivities([{
    organization_id: data.organization_id,
    user_id: data.user_id,
    action: 'updated',
    target_type: 'project',
    target_id: data.id,
    extra: null,
  }])

  return data
}

export async function deleteProject(projectId: string) {
  const project = await getProject(projectId)

  if (!project) {
    throw new Error('Project not found')
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .throwOnError()

  if (error) {
    throw error
  }
  
  await logActivities([{
    organization_id: project.organization_id,
    user_id: project.user_id,
    action: 'deleted',
    target_type: 'project',
    target_id: projectId,
    extra: null,
  }])

  return project
}
