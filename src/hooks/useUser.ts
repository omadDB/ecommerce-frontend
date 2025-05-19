import { getCurrentUser } from '@/services/apiUser';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/lib/authToken';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return getAccessToken();
    }
    return null;
  });

  useEffect(() => {
    const currentToken = getAccessToken();
    if (currentToken !== token) {
      setToken(currentToken);
    }
  }, [token]);

  const {
    data: user,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', token],
    queryFn: getCurrentUser,
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Only refetch if we have a token but no user data
  useEffect(() => {
    if (token && !user && !isPending) {
      refetch();
    }
  }, [token, user, isPending, refetch]);

  return { user: user || null, isPending, error };
}
