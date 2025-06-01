'use client';

import Link from 'next/link';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation('home');

  const navLinks = [
    {
      name: `${t('navbar-account-profile')}`,
      href: '/profile',
      icon: (
        <UserIcon
          className={`h-5 w-5 group-hover:text-primary-600 ${
            pathname === '/profile' ? 'text-primary-600' : 'text-gray-400'
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
      name: `${t('navbar-account-orders')}`,
      href: '/profile/orders',
      icon: (
        <ShoppingBagIcon
          className={`h-5 w-5 group-hover:text-primary-600 ${
            pathname === '/profile/orders' ? 'text-blue-600' : 'text-gray-400'
          }`}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 border border-gray-200 rounded-lg">
      <ul className="flex flex-col gap-2 text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 flex items-center gap-4 font-semibold group rounded-lg transition-colors
                ${
                  pathname === link.href
                    ? 'bg-primary-50 border-l-4 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:bg-neutral-100'
                }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pt-4 mt-auto">
        <SignOutButton isPopover={false} />
      </div>
    </div>
  );
}

export default Sidebar;
