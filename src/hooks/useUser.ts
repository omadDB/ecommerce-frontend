import { getCurrentUser } from '@/services/apiUser';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/lib/authToken';
import { useEffect } from 'react';

export default function useUser() {
  const token = getAccessToken();

  const {
    data: user,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!token, // Only fetch if we have a token
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount
    refetchOnReconnect: false, // Don't refetch on reconnect
  });

  // Only refetch if we have a token but no user data
  useEffect(() => {
    if (token && !user && !isPending) {
      refetch();
    }
  }, [token, user, isPending, refetch]);

  return { user: user || null, isPending, error };
}
