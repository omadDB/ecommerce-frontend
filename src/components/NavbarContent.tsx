'use client';

import React, { useRef } from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  Heart,
  Package,
  Settings,
  LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/productModel';
import { axiosInstance } from '@/lib/axios/axios';
import { PaginatedProducts } from '@/services/apiProducts';
import SearchResults from './SearchResults';
import AuthModal from '@/features/authentication/AuthModal';
import { useCategories } from '@/hooks/useCategories';
import SignOutButton from './SignOutButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// Mock data for categories
// const categories = [
//   {
//     name: 'Electronics',
//     slug: 'electronics',
//     subcategories: [
//       { name: 'Smartphones', slug: 'smartphones' },
//       { name: 'Laptops', slug: 'laptops' },
//       { name: 'Headphones', slug: 'headphones' },
//       { name: 'Cameras', slug: 'cameras' },
//       { name: 'Accessories', slug: 'electronics-accessories' },
//     ],
//     featured: [
//       { name: 'New Arrivals', slug: 'electronics-new' },
//       { name: 'Best Sellers', slug: 'electronics-best-sellers' },
//       { name: 'Deals', slug: 'electronics-deals' },
//     ],
//   },
//   {
//     name: 'Home & Kitchen',
//     slug: 'home-kitchen',
//     subcategories: [
//       { name: 'Furniture', slug: 'furniture' },
//       { name: 'Appliances', slug: 'appliances' },
//       { name: 'Cookware', slug: 'cookware' },
//       { name: 'Decor', slug: 'decor' },
//       { name: 'Bedding', slug: 'bedding' },
//     ],
//     featured: [
//       { name: 'New Arrivals', slug: 'home-new' },
//       { name: 'Best Sellers', slug: 'home-best-sellers' },
//       { name: 'Deals', slug: 'home-deals' },
//     ],
//   },
//   {
//     name: 'Fashion',
//     slug: 'fashion',
//     subcategories: [
//       { name: "Men's Clothing", slug: 'mens-clothing' },
//       { name: "Women's Clothing", slug: 'womens-clothing' },
//       { name: 'Shoes', slug: 'shoes' },
//       { name: 'Accessories', slug: 'fashion-accessories' },
//       { name: 'Jewelry', slug: 'jewelry' },
//     ],
//     featured: [
//       { name: 'New Arrivals', slug: 'fashion-new' },
//       { name: 'Best Sellers', slug: 'fashion-best-sellers' },
//       { name: 'Deals', slug: 'fashion-deals' },
//     ],
//   },
//   {
//     name: 'Beauty',
//     slug: 'beauty',
//     subcategories: [
//       { name: 'Skincare', slug: 'skincare' },
//       { name: 'Makeup', slug: 'makeup' },
//       { name: 'Hair Care', slug: 'hair-care' },
//       { name: 'Fragrance', slug: 'fragrance' },
//       { name: 'Personal Care', slug: 'personal-care' },
//     ],
//     featured: [
//       { name: 'New Arrivals', slug: 'beauty-new' },
//       { name: 'Best Sellers', slug: 'beauty-best-sellers' },
//       { name: 'Deals', slug: 'beauty-deals' },
//     ],
//   },
// ];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

interface NavbarContentProps {
  userId: number | null;
}

export function NavbarContent({ userId }: NavbarContentProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart(userId);
  const { data: categories } = useCategories();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const response = await axiosInstance.get<PaginatedProducts>(
          `/products?search=${searchQuery}`
        );
        setSearchResults(response.data.products);
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-border/60 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/60 backdrop-blur-lg'
      }`}
    >
      {/* Top bar - can include announcements, language selector, etc. */}
      <div className="py-2 text-sm text-center bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          Free shipping on all orders over $50 | Use code WELCOME10 for 10% off
          your first order
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] overflow-y-auto"
            >
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-4 space-y-4">
                <SheetClose asChild>
                  <Link
                    href="/categories/all"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-accent"
                  >
                    {t('navbar-all-products')}
                  </Link>
                </SheetClose>

                {/* Mobile Categories Accordion */}
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className="border-b border-border last:border-0"
                  >
                    <div className="flex items-center justify-between px-3 py-2">
                      <Link
                        href={`/categories/${category.id}`}
                        className="font-medium"
                      >
                        {category.name}
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Subcategories</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {category?.subCategories.map((subcategory) => (
                            <SheetClose key={subcategory.id} asChild>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/categories/${subcategory.id}`}
                                  className="w-full"
                                >
                                  {subcategory.name}
                                </Link>
                              </DropdownMenuItem>
                            </SheetClose>
                          ))}
                          <DropdownMenuSeparator />
                          {/* <DropdownMenuLabel>Featured</DropdownMenuLabel>
                          {category?.featured.map((item) => (
                            <SheetClose key={item.id} asChild>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/products?featured=${item.id}`}
                                  className="w-full"
                                >
                                  {item.name}
                                </Link>
                              </DropdownMenuItem>
                            </SheetClose>
                          ))} */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}

                <SheetClose asChild>
                  <Link
                    href="/contacts"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-accent"
                  >
                    Contact Us
                  </Link>
                </SheetClose>

                <div className="pt-4 mt-4 border-t border-border">
                  <SheetClose asChild>
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2 rounded-md hover:bg-accent"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/favorites"
                      aria-disabled={true}
                      className="flex items-center px-3 py-2 rounded-md pointer-events-none hover:bg-accent"
                      tabIndex={-1}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Favorites (soon)
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/cart"
                      className="flex items-center px-3 py-2 rounded-md hover:bg-accent"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart ({cart.cartItems.length})
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/next.svg"
                alt="Store Logo"
                width={120}
                height={40}
                className="w-auto h-8 md:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/categories/all" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] grid-cols-4 gap-3 p-4">
                    {categories?.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <Link
                          href={`/categories/${category.id}`}
                          className="block text-sm font-medium hover:text-primary"
                        >
                          {category.name}
                        </Link>
                        <ul className="space-y-1">
                          {category?.subCategories.map((subcategory) => (
                            <li key={subcategory.id}>
                              <Link
                                href={`/categories/${subcategory.id}`}
                                className="block py-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contacts" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - Search, Cart, Account */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden px-2 md:block">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pr-10"
              />
              {isSearching && (
                <div className="absolute left-0 w-[150%] p-4 mt-2 bg-white rounded-lg shadow-lg top-full">
                  Searching...
                </div>
              )}
              <SearchResults
                results={searchResults}
                onClose={() => {
                  setSearchResults([]);
                  setSearchQuery('');
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart */}
            {userId ? (
              <>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.cartItems.length > 0 && (
                      <Badge
                        className="absolute flex items-center justify-center w-5 h-5 p-0 -top-1 -right-1 bg-primary text-primary-foreground"
                        variant="default"
                      >
                        {cart.cartItems.length}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile/orders"
                        className="w-full cursor-pointer"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile/favorites"
                        className="w-full cursor-pointer pointer-events-none"
                        aria-disabled={true}
                        tabIndex={-1}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        <span>Favorites (soon)</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile/settings"
                        aria-disabled={true}
                        className="w-full cursor-pointer pointer-events-none"
                        tabIndex={-1}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Settings (soon)</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <SignOutButton isPopover={true} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
                  className="hidden md:flex"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <AuthModal
                  isAuthModalOpen={isAuthModalOpen}
                  setIsAuthModalOpen={setIsAuthModalOpen}
                  defaultForm="login"
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {isMobileSearchOpen && (
          <div className="px-2 pb-4 md:hidden">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              autoFocus
            />
            {isSearching && (
              <div className="absolute left-0 w-full p-4 mt-2 bg-white rounded-lg shadow-lg top-full">
                Searching...
              </div>
            )}
            <SearchResults
              results={searchResults}
              onClose={() => {
                setSearchResults([]);
                setSearchQuery('');
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
