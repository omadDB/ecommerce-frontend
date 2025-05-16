import { axiosPrivate } from '@/lib/axios/axios';
import { User } from '@/types/userModel';

export async function getCurrentUser() {
  try {
    const res = await axiosPrivate.get<User>('/user/me');
    return res.data;
  } catch (err) {
    // Return null instead of undefined on error
    return null;
  }
}
