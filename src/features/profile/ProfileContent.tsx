'use client';

import Container from '@/components/Container';
import Sidebar from '@/components/Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { UserIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
// import SignOutButton from '@/components/SignOutButton';

const navLinks = [
  {
    name: 'Profile',
    href: '/profile',
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    name: 'Orders',
    href: '/profile/orders',
    icon: <ShoppingBagIcon className="w-5 h-5" />,
  },
];

export default function ProfileContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Container>
      {/* Tabs for mobile/tablet */}
      <div className="block mt-4 md:hidden">
        <div className="flex">
          <div className="flex gap-1 p-1 border border-gray-200 rounded-lg">
            {navLinks.map((tab) => (
              <button
                key={tab.href}
                onClick={() => router.push(tab.href)}
                className={`px-5 py-2 rounded-md font-semibold text-base flex items-center gap-2 transition-all ${
                  pathname === tab.href
                    ? 'bg-blue-100 text-blue-700 shadow'
                    : 'text-gray-400 hover:bg-[#f7f5f5]'
                }`}
                aria-current={pathname === tab.href ? 'page' : undefined}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-center mt-4">
          <div className="w-full max-w-xs">
            <SignOutButton />

          </div>
        </div> */}
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden md:grid grid-cols-[20%_1fr] gap-8 my-8 h-[calc(100vh-160px)]">
        <div className="sticky top-24">
          <Sidebar />
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
      {/* Main content for mobile/tablet */}
      <div className="block my-4 md:hidden">{children}</div>
    </Container>
  );
}
