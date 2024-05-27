import { CreateProjectValues, UpdateProjectValues, createProject, deleteProject, getOrganizationProjects, getProject, updateProject } from "@languist/supabase/project";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const projectQueries = createQueryKeys('project', {
  listByOrganization: (organizationId: string) => ({
    queryKey: ['list-by-organization', organizationId],
    queryFn: () => getOrganizationProjects(organizationId),
  }),
  detail: (id: string) => ({
    queryKey: ['detail', id],
    queryFn: () => getProject(id),
  }),
});

export function useOrganizationProjects(organizationId?: string) {
  return useQuery({
    ...projectQueries.listByOrganization(organizationId!),
    enabled: !!organizationId,
  })
}

export function useProject(projectId: string) {
  return useQuery(projectQueries.detail(projectId))
}

export function useCreateProject(mutationOptions?: Omit<UseMutationOptions<any, Error, CreateProjectValues>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProject,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.setQueryData(projectQueries.detail(data.id).queryKey, data)
      queryClient.invalidateQueries({
        queryKey: projectQueries.listByOrganization(data.organization_id).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useUpdateProject(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateProjectValues>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProject,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.setQueryData(projectQueries.detail(data.id).queryKey, data)
      queryClient.invalidateQueries({
        queryKey: projectQueries.listByOrganization(data.organization_id).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useDeleteProject(mutationOptions?: Omit<UseMutationOptions<any, Error, string>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProject,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: projectQueries.listByOrganization(data.organization_id).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}