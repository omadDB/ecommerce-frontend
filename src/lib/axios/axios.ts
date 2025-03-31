// lib/api.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create the base axios instances
const axiosPublic = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

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
