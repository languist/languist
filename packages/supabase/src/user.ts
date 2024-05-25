import { supabaseClient } from "./client/client";

export async function getCurrentUser() {
  return (await supabaseClient.auth.getUser()).data.user
}
