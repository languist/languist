import { UpdateProjectValues, deleteProject, getOrganizationProjects, getProject, updateProject } from "@languist/supabase/project";
import { SupabaseClient } from "@languist/supabase/type";
import { createClient as createBrowserClient } from "@languist/supabase/client";
import { createServerClient } from "@languist/supabase/server-client";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

export const projectQueries = createQueryKeys('project', {
  listByOrganization: (organizationId: string) => ({
    queryKey: ['list-by-organization', organizationId],
    queryFn: (client: SupabaseClient) => getOrganizationProjects(client, organizationId),
  }),
  detail: (client: SupabaseClient, id: string) => ({
    queryKey: ['detail', id],
    queryFn: () => getProject(client, id),
  }),
});

export function useOrganizationProjects(organizationId?: string) {
  return useQuery({
    ...projectQueries.listByOrganization(organizationId!),
    enabled: !!organizationId,
  })
}

export const getCachedOrganizationProjects = async (organizationId: string) => {
  const supabase = await createServerClient();

  return unstable_cache(
    async (organizationId: string) => getOrganizationProjects(supabase, organizationId),
    projectQueries.listByOrganization(organizationId).queryKey as any,
    {
      tags: projectQueries.listByOrganization(organizationId).queryKey as any,
      revalidate: 180,
    }
  )(organizationId)
}

export function useProject(projectId: string) {
  const supabase = createBrowserClient()

  return useQuery(projectQueries.detail(supabase, projectId))
}

export function useUpdateProject(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateProjectValues>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  const supabase = createBrowserClient()
  return useMutation({
    mutationFn: updateProject,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.setQueryData(projectQueries.detail(supabase, data.id).queryKey, data)
      queryClient.invalidateQueries({
        queryKey: projectQueries.listByOrganization(data.organization_id).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useDeleteProject(mutationOptions?: Omit<UseMutationOptions<any, Error, string>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  const supabase = createBrowserClient()
  return useMutation({
    mutationFn: (projectId) => deleteProject({
      client: supabase,
      projectId,
    }),
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: projectQueries.listByOrganization(data.organization_id).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}