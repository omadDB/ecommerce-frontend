import ContainerBig from './ContainerBig';
import * as React from 'react';
import NavbarControls from './NavbarControls';
import NavbarList from './NavbarList';
import { getServerAuth } from '@/app/_lib/serverAuth';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default async function Navbar() {
  const { userId } = await getServerAuth();

  return (
    <header className="flex justify-center items-center bg-[#1E3A8A]">
      <ContainerBig className="flex w-full justify-between !py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavbarList />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] bg-[#1E3A8A] text-white"
            >
              <NavbarList />
            </SheetContent>
          </Sheet>
        </div>

        <NavbarControls userId={userId} />
      </ContainerBig>
    </header>
  );
}
