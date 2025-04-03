import { setAccessToken } from '../authToken';
import { axiosPublic } from './axios';

const useRefreshToken = () => {
  const refresh = async () => {
    const res = await axiosPublic.get('/refresh', { withCredentials: true });

    setAccessToken(res.data.accessToken);

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
