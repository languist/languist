import { QueryClient, QueryClientProvider as OGQueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

export const queryClient = new QueryClient()

export const QueryClientProvider: FC<{children: React.ReactNode}> = ({children}) => {
  return <OGQueryClientProvider client={queryClient}>{children}</OGQueryClientProvider>
}
