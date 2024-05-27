import { UpdateProfileAvatarVariables, UpdateProfileVariables, getProfile, updateProfile, updateProfileAvatar } from "@languist/supabase/profile";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const profileQueries = createQueryKeys('profile', {
  detail: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => getProfile(userId),
  }),
});

export function useProfile(userId: string) {
  return useQuery(profileQueries.detail(userId))
}

export function useUpdateProfile(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateProfileVariables>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProfile,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: profileQueries.detail(variables.id).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}

export function useUpdateProfileAvatar(mutationOptions?: Omit<UseMutationOptions<any, Error, UpdateProfileAvatarVariables>, 'mutationFn'>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProfileAvatar,
    ...mutationOptions,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: profileQueries.detail(variables.userId).queryKey,
      })
      mutationOptions?.onSuccess?.(data, variables, context)
    },
  })
}
