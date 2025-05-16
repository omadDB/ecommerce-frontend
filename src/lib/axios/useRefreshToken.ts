import { setAccessToken } from '../authToken';
import { axiosPrivate } from './axios';

const useRefreshToken = () => {
  const refresh = async () => {
    const res = await axiosPrivate.get('/refresh', { withCredentials: true });

    setAccessToken(res.data.accessToken);

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
