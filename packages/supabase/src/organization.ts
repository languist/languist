import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseClient as supabase } from "./client/client";
import { Database, Tables } from "./types";
import { getCurrentUser } from "./user";

export type Organization = Tables<'organizations'> & {
  members: {
    user: Tables<'profiles'>,
    roles: string[],
  }[]
}

export async function getOrganizations(client: SupabaseClient<Database>) {
  const currentUser = await getCurrentUser(client)
  if (!currentUser) return []
  return (await client.from('organizations_members')
  .select(`
    organizations (
      *,
      members: organizations_members (
        user: profiles (*),
        roles
      )
    )
  `)
  .throwOnError()
  .eq('user_id', currentUser.id)).data
  ?.map((org) => org.organizations) || []
}

export async function getOrganization(client: SupabaseClient<Database>, variables: { slug?: string | null }) {
  if (!variables.slug) return undefined
  return (await client.from('organizations')
  .select(`
    *,
    members: organizations_members (
      user: profiles (*),
      roles
    )
  `)
  .throwOnError()
  .eq('slug', variables.slug)).data?.[0] || undefined
}

export type CreateOrganizationVariables = Pick<Tables<'organizations'>, 'name' | 'slug'>

export async function createOrganization({
  client,
  variables,
}: {
  client: SupabaseClient<Database>
  variables: CreateOrganizationVariables
}) {
  const currentUser = await getCurrentUser(client)
  if (!currentUser) return null
  await
    client.from('organizations')
    .insert({
      name: variables.name,
      slug: variables.slug,
    }).throwOnError()
  const createdOrg = await getOrganization(client, { slug: variables.slug })
  if (!createdOrg) return null
  return createdOrg
}

export type UpdateOrganizationVariables = Pick<Tables<'organizations'>, 'id' | 'name' | 'openai_api_key'>

export async function updateOrganization(variables: UpdateOrganizationVariables) {
  return (await
    supabase.from('organizations')
    .update({
      name: variables.name,
      openai_api_key: variables.openai_api_key,
    }).eq('id', variables.id).select(`
      *,
      members: organizations_members (
        user: profiles (*),
        roles
      )
    `).throwOnError().single()).data
}

export type InviteToOrganizationVariables = {
  emails: string[]
  organizationId: string
  role: string
}

export async function inviteToOrganization(variables: InviteToOrganizationVariables) {
  return (await supabase.functions.invoke('invite-to-organization', {
    body: variables,
  })).data
}

export type AcceptInvitationVariables = {
  invitationId: string
}

export async function acceptInvitation(variables: AcceptInvitationVariables) {
  return (await supabase.functions.invoke('accept-invitation', {
    body: variables,
  })).data
}

export async function getOrganizationInvitations(variables: { organizationId: string }) {
  return (await
    supabase.from('organizations_invitations')
    .select('*')
    .eq('organization_id', variables.organizationId)
    .throwOnError()).data
}

export async function getMyInvitations(client: SupabaseClient<Database>) {
  const currentUser = await getCurrentUser(client)
  if (!currentUser?.email) return []
  return (await
    client.from('organizations_invitations')
    .select(`
      *,
      inviter: profiles (*)
    `)
    .eq('email', currentUser?.email)
    .throwOnError()).data
}

export async function cancelInvitation(variables: { id: string }) {
  return (await
    supabase.from('organizations_invitations')
    .delete()
    .eq('id', variables.id)
    .throwOnError()).data
}

export type RemoveUserFromOrganizationVariables = {
  userId: string
  organizationId: string
}

export async function removeUserFromOrganization(variables: RemoveUserFromOrganizationVariables) {
  return (await
    supabase.from('organizations_members')
    .delete()
    .eq('user_id', variables.userId)
    .eq('organization_id', variables.organizationId)
    .throwOnError()).data
}

export type UpdateMemberRolesVariables = {
  userId: string
  organizationId: string
  roles: string[]
}

export async function updateMemberRoles(variables: UpdateMemberRolesVariables) {
  return (await
    supabase.from('organizations_members')
    .update({
      roles: variables.roles,
    }).eq('user_id', variables.userId)
    .eq('organization_id', variables.organizationId)
    .throwOnError()).data
}
