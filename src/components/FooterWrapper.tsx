'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith('/profile');

  if (isProfilePage) {
    return null;
  }

  return <Footer />;
}
