import { SupabaseClient } from "./client/type";

export async function getCurrentUser(client: SupabaseClient) {
  return (await client.auth.getUser()).data.user
}
