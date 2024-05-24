import { useAuth } from '@languist/auth'

/**
 * Use this hook to load all required data for the app to function.
 * Like user data, billing subscription, feature flags, etc.
 */
export const useInitApp = () => {
  const { isLoading, isAuthenticated, isLoggingIn, user } = useAuth()

  return {
    isInitializing: isLoading || isLoggingIn || (isAuthenticated && !user),
    isAuthenticated,
  }
}
