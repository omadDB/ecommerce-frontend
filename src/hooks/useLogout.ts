import { setAccessToken } from '@/lib/authToken';
import { logoutService } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.clear();

      // Clear the access token
      setAccessToken(null);

      // Show success message
      toast.success('Logged out successfully');

      // Redirect to homepage and refresh
      router.push('/');
      router.refresh();
    },
    onError: (err) => {
      // Even if the server request fails, clear local state
      queryClient.clear();
      setAccessToken(null);
      router.push('/');
      router.refresh();

      toast.error(err.message || 'Failed to logout');
    },
  });

  return { logout, isPending, error };
}
