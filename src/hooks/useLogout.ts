import { useAuth } from '@/lib/AuthContext';
import { logoutService } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useLogout() {
  const { setAuth } = useAuth();

  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success('Logged out successfully');
      setAuth({ accessToken: null, userId: null });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isPending, error };
}
