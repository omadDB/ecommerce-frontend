'use client';

import Link from 'next/link';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';

function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: 'Profile',
      href: '/profile',
      icon: (
        <UserIcon
          className={`h-5 w-5 text-gray-400 group-hover:text-primary-600 ${
            pathname === '/profile' ? 'text-primary-600' : ''
          }`}
        />
      ),
    },
    // {
    //   name: 'Account info',
    //   href: '/profile/account',
    //   icon: (
    //     <Shield
    //       className={`h-5 w-5 text-gray-400 group-hover:text-primary-600 ${
    //         pathname === '/profile/account' ? 'text-primary-600' : ''
    //       }`}
    //     />
    //   ),
    // },
    {
      name: 'Orders',
      href: '/profile/orders',
      icon: (
        <ShoppingBagIcon
          className={`h-5 w-5 text-gray-400 group-hover:text-primary-600 ${
            pathname === '/profile/orders' ? 'text-primary-600' : ''
          }`}
        />
      ),
    },
  ];

  return (
    <div className="rounded-lg p-4 border border-gray-200 h-full flex flex-col">
      <ul className="flex flex-col gap-2 text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-gray-400 group rounded-lg ${
                pathname === link.href ? 'bg-primary-900 text-primary-100' : ''
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <SignOutButton />
      </div>
    </div>
  );
}

export default Sidebar;
