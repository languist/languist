import { supabaseClient as supabase } from "./client/client";
import { Tables } from "./types";

export type Activity = Tables<'activities'>

export async function getOrganizationActivities(organizationId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      user: profiles (*)
    `)
    .eq('organization_id', organizationId)
    .throwOnError()

  if (error) {
    throw error
  }

  return data
}

export type LogActivitiesValues = Omit<Activity, 'id' | 'created_at'>

export async function logActivities(activities: LogActivitiesValues[]) {
  const { data, error } = await supabase
    .from('activities')
    .insert(activities)
    .select(`
      *,
      user: profiles (*)
    `)
    .throwOnError()

  if (error) {
    throw error
  }

  return data
}
