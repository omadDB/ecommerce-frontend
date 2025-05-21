import { cookies, headers } from 'next/headers';

export async function middleware() {
  console.log('Headers:', headers());
  console.log('Cookies:', cookies());
}
