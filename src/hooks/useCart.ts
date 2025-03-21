import { useQuery } from '@tanstack/react-query';
import { getCart } from './useCartActions';

export function useCart(userId: number | null) {
  const fetchCart = async () => {
    if (userId) {
      return await getCart(userId); // Fetch from backend if logged in
    } else {
      // Retrieve guest cart from localStorage
      const guestCart = localStorage.getItem('guestCart');
      return guestCart ? JSON.parse(guestCart) : [];
    }
  };

  const {
    data: cart = [], // Default to an empty array
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart', userId],
    queryFn: fetchCart,
    enabled: userId !== undefined || typeof window !== 'undefined',
  });

  return { cart, isSuccess, isLoading, error };
}
