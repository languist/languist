import type { SupabaseClient } from "@supabase/supabase-js";
// import { logActivities } from "./activity";
import { supabaseClient as supabase } from "./client/client";
import { Database, Tables } from "./types";

export type ProjectLanguage = {
  language: string
  file_count: number
  phrase_count: number
  translated_count: number
}

export type Project = Tables<'projects'> & {
  user: Tables<'profiles'> | null
  languages: Array<ProjectLanguage>
  last_translation: Tables<'translations'>[] | null
}

export async function getOrganizationProjects(client: SupabaseClient<Database>, organizationId: string) {
  const { data, error } = await client
    .from('projects')
    .select(`
      *,
      user: profiles (*),
      last_translation: translations (*) 
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false, referencedTable: 'translations' })
    .limit(1, { referencedTable: 'translations' })
    .throwOnError()

  const { data: orgLanguages } = await client.rpc('get_organization_languages', {
    organization_id: organizationId,
  })

  if (error) {
    throw error
  }

  const result = data?.map(project => ({
    ...project,
    languages: orgLanguages
      ?.filter(l => l.project_id === project.id)
      ?.map((l) => ({
        language: l.language,
        file_count: l.file_count,
        phrase_count: l.phrase_count,
        translated_count: l.translated_count,
      })) || [],
    }))

  return result
}

export async function getProject(client: SupabaseClient<Database>, projectId: string) {
  const { data, error } = await client
    .from('projects')
    .select(`
      *,
      user: profiles (*),
      last_translation: translations (*) 
    `)
    .eq('id', projectId)
    .order('created_at', { ascending: false, referencedTable: 'translations' })
    .limit(1, { referencedTable: 'translations' })
    .throwOnError()
    .single()

  const { data: languages } = await client.rpc('get_project_languages', {
    project_id: projectId,
  })

  if (error) {
    throw error
  }

  const result = {
    ...data,
    languages: languages || [],
  }

  return result
}

export async function getLastEditedTranslationByProjectLanguage(client: SupabaseClient<Database>, projectId: string, language: string) {
  const { data, error } = await client
    .from('translations')
    .select(`*`)
    .eq('project_id', projectId)
    .eq('language', language)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    // throw error
  }

  return data
}

export type CreateProjectValues = Pick<Tables<'projects'>, 'name' | 'source_language' | 'organization_id' | 'user_id'>

export async function createProject({
  client,
  project,
} : {
  client: SupabaseClient<Database>
  project: CreateProjectValues
}) {
  const { data, error } = await client
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
  
  // await logActivities([{
  //   organization_id: project.organization_id,
  //   user_id: project.user_id,
  //   action: 'created',
  //   target_type: 'project',
  //   target_id: data.id,
  //   extra: null,
  // }])

  return data
}

export type UpdateProjectValues = Partial<Tables<'projects'>> & { id: string }

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

  // await logActivities([{
  //   organization_id: data.organization_id,
  //   user_id: data.user_id,
  //   action: 'updated',
  //   target_type: 'project',
  //   target_id: data.id,
  //   extra: null,
  // }])

  return data
}

export async function deleteProject({
  client,
  projectId,
} : {
  client: SupabaseClient<Database>
  projectId: string
}) {
  const project = await getProject(client, projectId)

  if (!project) {
    throw new Error('Project not found')
  }

  const { error } = await client
    .from('projects')
    .delete()
    .eq('id', projectId)
    .throwOnError()

  if (error) {
    throw error
  }
  
  // await logActivities([{
  //   organization_id: project.organization_id,
  //   user_id: project.user_id,
  //   action: 'deleted',
  //   target_type: 'project',
  //   target_id: projectId,
  //   extra: null,
  // }])

  return project
}
