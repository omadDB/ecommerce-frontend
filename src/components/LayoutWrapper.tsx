'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith('/profile');

  return (
    <div
      className={`grid ${
        isProfilePage ? 'grid-rows-[90px_1fr]' : 'grid-rows-[90px_1fr_400px] grid-cols-1'
      }`}
    >
      {children}
    </div>
  );
}
