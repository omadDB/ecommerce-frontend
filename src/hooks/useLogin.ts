import { setAccessToken } from '@/lib/authToken';
import { loginService } from '@/services/apiAuth';
import { IUserLoggedIn } from '@/types/userModel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginService,
    onSuccess: (data: IUserLoggedIn) => {
      if (!data?.accessToken) {
        toast.error('Login failed - no access token received');
        return;
      }

      // Set the access token
      setAccessToken(data.accessToken);

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('Logged in successfully!');
      router.refresh();
    },
    onError: (err) => {
      setAccessToken(null);
      toast.error(err.message);
    },
  });

  return { login, isPending, error };
}
