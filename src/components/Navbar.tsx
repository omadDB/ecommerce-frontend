'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import ContainerBig from './ContainerBig';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import * as React from 'react';
import AuthModal from '../features/authentication/AuthModal';

// Define your categories (replace with your actual data)
const categories = [
  {
    title: 'Electronics',
    href: '/categories/electronics',
    description: 'Explore the latest gadgets and devices.',
  },
  {
    title: 'Fashion',
    href: '/categories/fashion',
    description: 'Discover trendy clothing and accessories.',
  },
  {
    title: 'Home & Kitchen',
    href: '/categories/home-kitchen',
    description: 'Find everything for your home and kitchen.',
  },
  {
    title: 'Beauty',
    href: '/categories/beauty',
    description: 'Shop for skincare, makeup, and more.',
  },
  {
    title: 'Sports',
    href: '/categories/sports',
    description: 'Gear up for your favorite sports and activities.',
  },
  {
    title: 'Books',
    href: '/categories/books',
    description: 'Browse a wide selection of books.',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isAuthModalOpen, setisAuthModalOpen] = React.useState<boolean>(false);

  return (
    <header className="flex justify-center items-center bg-[#1E3A8A]">
      <ContainerBig className="flex w-full justify-between !py-4">
        <div className="flex items-center gap-8">
          <Image src="/favicon.ico" width={50} height={50} alt="Logo" />
          <nav>
            <ul className="flex gap-6 font-normal text-white items-center">
              <li>
                <Link
                  className={`${
                    pathname === '/'
                      ? 'text-white underline-offset-4 underline'
                      : 'text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400'
                  } `}
                  href="/"
                >
                  Homepage
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    pathname === '/categories/all'
                      ? 'text-white underline-offset-4 underline'
                      : 'text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400'
                  } `}
                  href="/categories/all"
                >
                  All products
                </Link>
              </li>
              <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          'bg-transparent hover:bg-transparent p-0 data-[state=open]:bg-transparent focus:bg-transparent text-md',

                          'text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400'
                        )}
                      >
                        <span
                          className={`${'text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400'}`}
                        >
                          Categories
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {categories.map((category) => (
                            <ListItem
                              key={category.title}
                              title={category.title}
                              href={category.href}
                            >
                              {category.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
              <li>
                <Link
                  className={`${
                    pathname === '/contacts'
                      ? 'text-white underline-offset-4 underline'
                      : 'text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400'
                  } `}
                  href="/contacts"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-white">
          <input
            type="text"
            className="text-primary-950 outline-none border--gray-500 border rounded-lg px-4 py-1 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700 duration-300 sm:w-64 sm:focus:w-72"
            placeholder="Search..."
          />
          <Link href="/profile">
            <UserIcon
              className="hover:scale-110 duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
          </Link>
          <Link href="/cart">
            <ShoppingBagIcon
              className="hover:scale-110 duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
          </Link>
          <div>
            <button
              // onClick={() => router.push("/login")}
              onClick={() => setisAuthModalOpen(true)}
              className="rounded-lg bg-[#5575d4] hover:bg-[#3e5cb4] duration-300 cursor-pointer py-1.5 px-4 text-white"
            >
              Sign in
            </button>
            <AuthModal
              isAuthModalOpen={isAuthModalOpen}
              setIsAuthModalOpen={setisAuthModalOpen}
              defaultForm="login"
            />
          </div>
        </div>
      </ContainerBig>
    </header>
  );
}

// Reusable ListItem component for the mega menu
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="h-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block h-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
