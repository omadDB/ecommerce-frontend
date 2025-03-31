import { useAuth } from '../AuthContext';
import { axiosPublic } from './axios';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axiosPublic.get('/refresh', { withCredentials: true });

    setAuth((prev) => {
      console.log(prev);
      console.log(res);
      return { ...prev, accessToken: res.data.accessToken };
    });

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
