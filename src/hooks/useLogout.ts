import { setAccessToken } from '@/lib/authToken';
import { logoutService } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useLogout() {
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success('Logged out successfully');
      setAccessToken(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isPending, error };
}
