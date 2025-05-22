import { getServerAuth } from '@/app/_lib/serverAuth';
import { ProfileFormData } from '@/app/profile/page';
import { axiosInstance } from '@/lib/axios/axios';
import { User } from '@/types/userModel';

export async function getCurrentUser() {
  try {
    const res = await axiosInstance.get<User>('/user/me');
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateUser(updateInfo: ProfileFormData) {
  const { userId } = await getServerAuth();

  try {
    const res = await axiosInstance.put<User>(`/user/${userId}`, updateInfo);

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
