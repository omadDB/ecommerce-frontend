'use client';

import AuthModal from '@/features/authentication/AuthModal';
import { ShoppingBagIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '@/lib/axios/axios';
import { Product } from '@/types/productModel';
import { PaginatedProducts } from '@/services/apiProducts';
import SearchResults from './SearchResults';
import { useCart } from '@/hooks/useCart';

interface NavbarControlsProps {
  userId: number | null;
  onlySearch?: boolean;
  onlyAuth?: boolean;
}

export default function NavbarControls({
  userId,
  onlySearch = false,
  onlyAuth = false,
}: NavbarControlsProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const { cart } = useCart(userId);

  // Watch for cart changes to trigger animation
  useEffect(() => {
    if (cart?.cartItems?.length) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cart?.cartItems?.length]);

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

  if (onlySearch) {
    return (
      <div className="flex items-center justify-center w-full text-white">
        <div className="relative w-full max-w-xs" ref={searchRef}>
          <input
            type="text"
            className="w-full px-4 py-1 duration-300 border rounded-lg outline-none text-primary-950 border--gray-500 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      </div>
    );
  }
  if (onlyAuth) {
    return (
      <div className="flex items-center gap-3 text-white">
        {userId ? (
          <>
            <Link href="/cart" className="relative">
              <ShoppingBagIcon
                className={`duration-300 md:w-[20px] md:h-[20px]  lg:w-[24px] lg:h-[24px] hover:scale-110 ${
                  cartAnimation ? 'animate-bounce' : ''
                }`}
                width={24}
                height={24}
                fill="none"
                stroke="white"
              />
              {cart?.cartItems?.length > 0 && (
                <span className="absolute flex items-center justify-center sm:w-4 sm:h-4 lg:w-5 lg:h-5 sm:text-[10px] lg:text-[12px] text-white bg-red-500 rounded-full -top-2 -right-2">
                  {cart.cartItems.length}
                </span>
              )}
            </Link>
            <Link href="/profile">
              <UserIcon
                className="duration-300  md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] hover:scale-110"
                width={24}
                height={24}
                fill="none"
                stroke="white"
              />
            </Link>
          </>
        ) : (
          <div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-5 py-1 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-md md:py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <UserIcon className="w-5 h-5" />
              Sign in
            </button>
            <AuthModal
              isAuthModalOpen={isAuthModalOpen}
              setIsAuthModalOpen={setIsAuthModalOpen}
              defaultForm="login"
            />
          </div>
        )}
      </div>
    );
  }
  // Default: render both
  return (
    <div className="flex items-center gap-3 text-white sm:gap-3 md:gap-4 lg:gap-5">
      <div className="relative" ref={searchRef}>
        <input
          type="text"
          className="px-4 py-1 duration-300 border rounded-lg outline-none text-primary-950 border--gray-500 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700 w-44 md:w-44 md:focus:w-48 lg:w-52 lg:focus:w-56 sm:focus:w-48"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {userId ? (
        <>
          <Link href="/cart" className="relative">
            <ShoppingBagIcon
              className={`duration-300 md:w-[20px] md:h-[20px]  lg:w-[24px] lg:h-[24px] hover:scale-110 ${
                cartAnimation ? 'animate-bounce' : ''
              }`}
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
            {cart?.cartItems?.length > 0 && (
              <span className="absolute flex items-center justify-center sm:w-4 sm:h-4 lg:w-5 lg:h-5 sm:text-[10px] lg:text-[12px] text-white bg-red-500 rounded-full -top-2 -right-2">
                {cart.cartItems.length}
              </span>
            )}
          </Link>
          <Link href="/profile">
            <UserIcon
              className="duration-300  md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] hover:scale-110"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
          </Link>
        </>
      ) : (
        <div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 px-5 py-1 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-md md:py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <UserIcon className="w-5 h-5" />
            Sign in
          </button>
          <AuthModal
            isAuthModalOpen={isAuthModalOpen}
            setIsAuthModalOpen={setIsAuthModalOpen}
            defaultForm="login"
          />
        </div>
      )}
    </div>
  );
}
