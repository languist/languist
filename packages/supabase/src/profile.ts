import { supabaseClient as supabase } from "./client/client";
import { Tables } from "./types";

export type Profile = Tables<'profiles'>

export async function getProfile(userId: string) {
  return await supabase.from('profiles').select('*').eq('id', userId).single()
}

export type UpdateProfileVariables = Pick<Tables<'profiles'>, 'id' | 'first_name' | 'last_name'>

export async function updateProfile(variables: UpdateProfileVariables) {
  return (await supabase.from('profiles').update(variables).eq('id', variables.id).select('*').throwOnError().single()).data
}

export type UpdateProfileAvatarVariables = {userId: string; buffer: ArrayBuffer}

export async function updateProfileAvatar(variables: UpdateProfileAvatarVariables) {
  const result = await supabase.storage.from('avatars').upload(`${variables.userId}/${Number(new Date())}.jpeg`, variables.buffer, {
    contentType: 'image/jpeg',
    upsert: true,
  })
  if (result.error) throw new Error(result.error.message)
  const publicUrlRes = supabase.storage.from('avatars').getPublicUrl(result.data.path)
  return (await supabase.from('profiles').update({avatar_url: publicUrlRes.data.publicUrl}).eq('id', variables.userId).select('*').throwOnError().single()).data
}
