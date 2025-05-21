// lib/api.ts
import axios, { AxiosError } from 'axios';
import { getAccessToken, setAccessToken } from '../authToken';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : 'http://localhost:7000/api/v1';

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor for adding the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (!config.headers['Authorization'] && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;

    // Only attempt refresh if we haven't tried before and it's a 401/403 error
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !prevRequest._retry &&
      !prevRequest.url?.includes('/refresh') // Don't retry refresh endpoint
    ) {
      prevRequest._retry = true;

      try {
        console.log('Attempting to refresh token...');
        // Use a new axios instance for refresh to avoid interceptors
        const response = await axios.get(`${baseURL}/refresh`, {
          withCredentials: true,
        });

        console.log('Refresh response:', response.data);
        const newAccessToken = response.data.accessToken;
        if (newAccessToken) {
          console.log('New access token received');
          setAccessToken(newAccessToken);
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        } else {
          console.log('No access token in refresh response');
          setAccessToken(null);
          return Promise.reject(error);
        }
      } catch (refreshError: unknown) {
        const axiosError = refreshError as AxiosError;
        console.error(
          'Refresh token error:',
          axiosError.response?.data || axiosError.message
        );
        // If refresh fails, clear the token and reject
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Request interceptor for adding the auth token
// axiosPrivate.interceptors.request.use(
//   (config) => {
//     const {
//       auth: { accessToken },
//     } = useAuth();
//     if (!config.headers['Authorization']) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Create a refresh function
// const refreshToken = async () => {
//   const {} = useAuth()
//   try {
//     const response = await axiosPublic.get('/refresh', {
//       withCredentials: true,
//     });
//     setAuthToken(response.data.accessToken);
//     return response.data.accessToken;
//   } catch (error) {
//     console.error('Failed to refresh token', error);
//     throw error;
//   }
// };

// Response interceptor for handling token refresh
// axiosPrivate.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error?.config;
//     if (error?.response?.status === 403 && !prevRequest?._retry) {
//       prevRequest._retry = true;
//       try {
//         const newToken = await refreshToken();
//         prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosPrivate(prevRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance };
