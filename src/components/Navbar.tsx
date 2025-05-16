import ContainerBig from './ContainerBig';

import * as React from 'react';
import NavbarControls from './NavbarControls';
import NavbarList from './NavbarList';
import { getServerAuth } from '@/app/_lib/serverAuth';

export default async function Navbar() {
  const { userId } = await getServerAuth();

  return (
    <header className="flex justify-center items-center bg-[#1E3A8A]">
      <ContainerBig className="flex w-full justify-between !py-4">
        <NavbarList />

        <NavbarControls userId={userId} />
      </ContainerBig>
    </header>
  );
}
