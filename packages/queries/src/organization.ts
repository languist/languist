import { UpdateOrganizationVariables, getOrganization, getOrganizations, updateOrganization } from "@languist/supabase/organization";
import { createServerClient } from "@languist/supabase/server-client";
import { createClient as createBrowserClient } from "@languist/supabase/client";
import { SupabaseClient } from "@languist/supabase/type";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

export const organizationQueries = createQueryKeys('organization', {
  list: (client: SupabaseClient) => ({
    queryKey: ['list'],
    queryFn: () => getOrganizations(client),
  }),
  detail: (client: SupabaseClient, slug: string) => ({
    queryKey: [slug],
    queryFn: () => getOrganization(client, {slug}),
  }),
})

export function useOrganizations() {
  const supabase = createBrowserClient()
  
  return useQuery(organizationQueries.list(supabase))
}

export const getCachedOrganizations = async () => {
  const supabase = await createServerClient();

  return unstable_cache(
    async () => getOrganizations(supabase),
    organizationQueries.list(supabase).queryKey as any,
    {
      tags: organizationQueries.list(supabase).queryKey as any,
      revalidate: 3600,
    }
  )()
}

export function useOrganization(slug: string) {
  const supabase = createBrowserClient()

  return useQuery(organizationQueries.detail(supabase, slug))
}

export const getCachedOrganization = async (slug: string) => {
  const supabase = await createServerClient();

  return unstable_cache(
    async () => getOrganization(supabase, { slug }),
    organizationQueries.detail(supabase, slug).queryKey as any,
    {
      tags: organizationQueries.detail(supabase, slug).queryKey as any,
      revalidate: 3600,
    }
  )()
}

export function useUpdateOrganization(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateOrganizationVariables>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  const supabase = createBrowserClient()
  return useMutation({
    mutationFn: updateOrganization,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      if (data?.slug) {
        queryClient.setQueryData(organizationQueries.detail(supabase, data.slug).queryKey, data)
      }
      queryClient.invalidateQueries({
        queryKey: organizationQueries._def,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}
