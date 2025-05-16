'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';

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

export default function NavbarList() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 lg:gap-8">
      <Image src="/favicon.ico" width={50} height={50} alt="Logo" />
      <nav>
        <ul className="flex gap-4 lg:gap-6 font-normal text-white items-center">
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
