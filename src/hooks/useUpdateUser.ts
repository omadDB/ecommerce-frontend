import { updateUser as updateUserApi } from '@/services/apiUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User info updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isPending, error };
}
