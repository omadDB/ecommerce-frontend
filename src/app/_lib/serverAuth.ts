// getServerAuth.js (server-side only)
'use server';

import { verify, JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export async function getServerAuth() {
  console.log('getServerAuth called');
  const cookieStore = await cookies();
  console.log(cookieStore);
  const token = cookieStore.get('jwt')?.value || '';
  console.log('Cookie token exists:', !!token);

  if (token) {
    try {
      // Token verification happens here on the server, safely using your secret.
      const decoded = verify(
        token,
        process.env.REFRESH_TOKEN_SECRET!
      ) as CustomJwtPayload;

      console.log('Token decoded successfully:', decoded);
      return {
        token,
        userId: decoded.id,
      };
    } catch (err) {
      console.error('Token verification failed:', err);
      return { userId: null, token: null };
    }
  }
  console.log('No token found in cookies');
  return { userId: null, token: null };
}
