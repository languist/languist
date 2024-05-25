import { getCurrentUser } from "@languist/supabase/user";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/react-query";

export const userQueries = createQueryKeys('user', {
  current: () => ({
    queryKey: ['current'],
    queryFn: getCurrentUser
  }),
})

export function useCurrentUser() {
  return useQuery(userQueries.current())
}
