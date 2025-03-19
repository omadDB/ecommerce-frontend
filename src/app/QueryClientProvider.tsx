'use client';

import { ReactNode } from 'react';
import { getQueryClient } from './get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Hydrate>
    </QueryClientProvider>
  );
}
