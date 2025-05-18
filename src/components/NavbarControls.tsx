'use client';

import AuthModal from '@/features/authentication/AuthModal';
import { ShoppingBagIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { axiosPublic } from '@/lib/axios/axios';
import { Product } from '@/types/productModel';
import { PaginatedProducts } from '@/services/apiProducts';
import SearchResults from './SearchResults';
import { useCart } from '@/hooks/useCart';

export default function NavbarControls({ userId }: { userId: number | null }) {
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
        const response = await axiosPublic.get<PaginatedProducts>(
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
    <div className="flex items-center gap-4 text-white">
      <div className="relative" ref={searchRef}>
        <input
          type="text"
          className="px-4 py-1 duration-300 border rounded-lg outline-none text-primary-950 border--gray-500 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700 sm:w-64 sm:focus:w-72"
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
              className={`duration-300 hover:scale-110 ${
                cartAnimation ? 'animate-bounce' : ''
              }`}
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
            {cart?.cartItems?.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                {cart.cartItems.length}
              </span>
            )}
          </Link>
          <Link href="/profile">
            <UserIcon
              className="duration-300 hover:scale-110"
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
            // onClick={() => router.push("/login")}
            onClick={() => setIsAuthModalOpen(true)}
            className="rounded-lg bg-[#5575d4] hover:bg-[#3e5cb4] duration-300 cursor-pointer py-1.5 px-4 text-white"
          >
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
