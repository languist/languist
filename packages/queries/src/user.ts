import { createClient } from "@languist/supabase/client";
import { SupabaseClient } from "@languist/supabase/type";
import { getCurrentUser } from "@languist/supabase/user";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/react-query";

export const userQueries = createQueryKeys('user', {
  current: (client: SupabaseClient) => ({
    queryKey: ['current'],
    queryFn: () => getCurrentUser(client)
  }),
})

export function useCurrentUser() {
  const client = createClient()
  return useQuery(userQueries.current(client))
}
