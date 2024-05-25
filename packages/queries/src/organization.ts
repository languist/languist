import { CreateOrganizationVariables, UpdateOrganizationVariables, createOrganization, getOrganization, getOrganizations, updateOrganization } from "@languist/supabase/organization";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const organizationQueries = createQueryKeys('organization', {
  list: () => ({
    queryKey: ['list'],
    queryFn: getOrganizations,
  }),
  detail: (slug: string) => ({
    queryKey: [slug],
    queryFn: () => getOrganization({slug}),
  }),
});

export function useOrganizations() {
  return useQuery(organizationQueries.list())
}

export function useOrganization(slug: string) {
  return useQuery(organizationQueries.detail(slug))
}

export function useCreateOrganization(mutationOptions?: Omit<UseMutationOptions<any, Error, CreateOrganizationVariables>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createOrganization,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      if (data?.slug) {
        queryClient.setQueryData(organizationQueries.detail(data.slug).queryKey, data)
      }
      queryClient.invalidateQueries({
        queryKey: organizationQueries._def,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useUpdateOrganization(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateOrganizationVariables>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateOrganization,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      if (data?.slug) {
        queryClient.setQueryData(organizationQueries.detail(data.slug).queryKey, data)
      }
      queryClient.invalidateQueries({
        queryKey: organizationQueries._def,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}
