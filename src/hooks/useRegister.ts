import { registerService } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useRegister() {
  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      toast.success('Registered successfully!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { register, isPending, error };
}
