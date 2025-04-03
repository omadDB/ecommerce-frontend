import { setAccessToken } from '@/lib/authToken';
import { loginService } from '@/services/apiAuth';
import { IUserLoggedIn } from '@/types/userModel';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useLogin() {
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginService,
    onSuccess: (data: IUserLoggedIn) => {
      toast.success('Logged in successfully!');

      console.log(data);
      setAccessToken(data.accessToken);
      console.log(data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isPending, error };
}
