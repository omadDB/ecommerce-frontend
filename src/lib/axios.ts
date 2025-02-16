// lib/axios.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios"

// Define the base URL from environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // You can modify the request config here (e.g., add auth tokens)
//     const token = localStorage.getItem("token") // Example: Get token from localStorage
//     if (token) {
//       config.headers = config.headers || {}
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error)
//   }
// )

// Add response interceptor
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Handle successful responses
//     return response
//   },
//   (error: AxiosError) => {
//     // Handle errors globally
//     if (error.response?.status === 401) {
//       // Redirect to login if unauthorized
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstance
