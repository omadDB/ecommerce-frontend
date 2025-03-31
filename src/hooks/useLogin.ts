import { useAuth } from '@/lib/AuthContext';
import { loginService } from '@/services/apiAuth';
import { IUserLoggedIn } from '@/types/userModel';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useLogin() {
  const { setAuth } = useAuth();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginService,
    onSuccess: (data: IUserLoggedIn) => {
      toast.success('Logged in successfully!');

      console.log(data);
      setAuth({ userId: data.user.id!, accessToken: data.accessToken });
      console.log(data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isPending, error };
}
