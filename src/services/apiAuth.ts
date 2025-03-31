import { axiosPublic } from '@/lib/axios/axios';
import {
  IUserLoggedIn,
  IUserLogin,
  IUserRegister,
  User,
} from '@/types/userModel';
import { AxiosError } from 'axios';

export async function registerService(newUser: IUserRegister) {
  try {
    const res = await axiosPublic.post<IUserRegister>(
      '/auth/register',
      newUser
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function loginService(newUser: IUserLogin) {
  try {
    const res = await axiosPublic.post<IUserLoggedIn>('/auth/login', newUser, {
      withCredentials: true,
    });

    // if (!res.data) throw new Error('Login failed: no user data received!');

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // Handle Axios-specific errors
      const errorMessage =
        err.response?.data?.message || err.message || 'Login request failed!';
      console.error('Axios error:', errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handle any other unexpected errors
      console.error('Unexpected error:', err);
      throw new Error('An unexpected error occurred during login.');
    }
  }
}

export async function logoutService() {
  try {
    const res = await axiosPublic.post<User>('/auth/logout');
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
