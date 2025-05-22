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
      <ContainerBig className="flex w-full items-center !py-4">
        {/* Desktop Navigation */}
        <div className="flex-1 hidden md:block">
          <NavbarList direction={'horizontal'} />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between w-full gap-3 md:hidden">
          {/* Left: Menu button */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-white"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[220px] bg-[#1E3A8A] border-none text-white"
              >
                <NavbarList direction={'vertical'} />
              </SheetContent>
            </Sheet>
          </div>
          {/* Center: Search input, flex-1 and centered */}
          <div className="flex justify-center flex-1">
            <NavbarControls userId={userId} onlySearch />
          </div>
          {/* Right: Sign in/user/cart */}
          <div className="flex items-center">
            <NavbarControls userId={userId} onlyAuth />
          </div>
        </div>

        {/* Desktop controls */}
        <div className="justify-end hidden md:flex">
          <NavbarControls userId={userId} />
        </div>
      </ContainerBig>
    </header>
  );
}
