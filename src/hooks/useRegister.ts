import { registerService } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { setAccessToken } from '@/lib/authToken';
import { useRouter } from 'next/navigation';

export default function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      if (!data?.accessToken) {
        toast.error('Registration failed - no access token received');
        return;
      }

      // Set the access token
      setAccessToken(data.accessToken);

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });

      console.log(data);
      toast.success('Registered and logged in successfully!');
      router.refresh();
      router.push('/');
    },
    onError: (err) => {
      setAccessToken(null);
      toast.error(err.message);
    },
  });

  return { register, isPending, error };
}
