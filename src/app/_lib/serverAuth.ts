// getServerAuth.js (server-side only)
'use server';

import { verify, JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export async function getServerAuth() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('jwt')?.value || '';

  if (token) {
    try {
      // Token verification happens here on the server, safely using your secret.
      const decoded = verify(
        token,
        process.env.REFRESH_TOKEN_SECRET!
      ) as CustomJwtPayload;

      console.log(decoded);
      return {
        token,
        userId: decoded.id,
      };
    } catch (err) {
      console.error('Token verification failed:', err);
      return { userId: null, token: null };
    }
  }
  return { userId: null, token: null };
}
