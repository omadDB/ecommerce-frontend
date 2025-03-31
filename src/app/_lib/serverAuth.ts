'use server';

import { decode, JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface CustomJwtPayload extends JwtPayload {
  id: number;
}
export async function getServerAuth() {
  const token = (await cookies()).get('jwt')?.value;

  let decoded;
  if (token) {
    // Decode the token (no verification)
    decoded = decode(token) as CustomJwtPayload;
    console.log(token, decoded);
    return {
      token,
      userId: decoded.id, // Extract userId if it exists
    };
  }
}
