// lib/api.ts
import axios from 'axios';
import { getAccessToken, setAccessToken } from '../authToken';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosPublic = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Enable sending cookies
});

// Request interceptor for adding the auth token
axiosPrivate.interceptors.request.use(
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
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    // Don't retry if it's already a refresh token request
    if (prevRequest?.url === '/refresh') {
      return Promise.reject(error);
    }

    // Only attempt refresh if we haven't tried before and it's a 401/403 error
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      try {
        const response = await axiosPrivate.get('/refresh');
        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else {
          // If no new token received, clear the current token
          setAccessToken(null);
          return Promise.reject(error);
        }
      } catch (error) {
        console.error(error);
        // If refresh fails, clear the token and reject
        setAccessToken(null);
        return Promise.reject(error);
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

export { axiosPublic, axiosPrivate };
