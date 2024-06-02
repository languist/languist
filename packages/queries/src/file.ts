import { createClient as createBrowserClient } from "@languist/supabase/client";
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { File, UpdateFileValues, UploadFilesValues, deleteFile, downloadFile, getFile, getProjectFiles, updateFile, uploadFiles } from "@languist/supabase/file";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { SupabaseClient } from "@languist/supabase/type";

export const fileQueries = createQueryKeys('file', {
  projectFiles: (client: SupabaseClient, projectId: string) => ({
    queryKey: ['project', projectId, 'files'],
    queryFn: () => getProjectFiles(client, projectId || ""),
  }),
  detail: (client: SupabaseClient, fileId: string) => ({
    queryKey: ['file', fileId],
    queryFn: () => getFile(client, fileId),
  }),
})

export function useProjectFiles(projectId: string) {
  const client = createBrowserClient()
  return useQuery({
    ...fileQueries.projectFiles(client, projectId),
    enabled: !!projectId,
  })
}

export function useFile(fileId: string) {
  const client = createBrowserClient()
  const queryClient = useQueryClient()
  return useQuery({
    ...fileQueries.detail(client, fileId),
    enabled: !!fileId,
    initialData: () => {
      return queryClient.getQueryData<File[]>(fileQueries.detail(client, fileId).queryKey)?.find((file) => file.id === fileId)
    }
  })
}

export function useUploadFiles(mutationOptions?: Omit<UseMutationOptions<any, Error, UploadFilesValues>, 'mutationFn'>) {
  const client = createBrowserClient()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: UploadFilesValues) => uploadFiles({client, values}),
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['project', variables.project_id],
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useDownloadFiles(mutationOptions?: Omit<UseMutationOptions<any, Error, string>, 'mutationFn'>) {
  const client = createBrowserClient()
  return useMutation({
    mutationFn: (fileId: string) => downloadFile({client, fileId}),
    ...mutationOptions,
    onSuccess(data, variables, context) {
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useUpdateFile(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateFileValues>, 'mutationFn'>) {
  const client = createBrowserClient()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: UpdateFileValues) => updateFile({client, values}),
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['project', variables.project_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['file', variables.id],
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useDeleteFile(mutationOptions?: Omit<UseMutationOptions<any, Error, string>, 'mutationFn'>) {
  const client = createBrowserClient()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (fileId: string) => deleteFile({client, fileId}),
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}
