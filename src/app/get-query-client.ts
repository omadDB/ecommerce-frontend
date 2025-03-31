import { isServer, QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchInterval: 10000,
      },
    },
  });
}
// function makeQueryClient() {
//   const queryClient = new QueryClient({
//     mutationCache: new MutationCache({
//       onSuccess: () => {
//         queryClient.invalidateQueries();
//       },
//     }),
//   });

//   return queryClient;
// }

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
