import * as React from 'react';
import { getServerAuth } from '@/app/_lib/serverAuth';
import { NavbarContent } from './NavbarContent';

export default async function Navbar() {
  const { userId } = await getServerAuth();

  return <NavbarContent userId={userId} />;
}
