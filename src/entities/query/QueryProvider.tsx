import { QueryClient, QueryClientProvider } from 'react-query';
import React, { ReactNode } from 'react';

export const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
