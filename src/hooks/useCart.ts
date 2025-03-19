import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCart } from '@/lib/store/cartSlice';
import { CartItem } from '@/types/cartItemModel';
import { useEffect } from 'react';

const fetchCart = async (userId: number): Promise<CartItem[]> => {
  const res = await fetch(`/api/cart/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
};

export const useCart = (userId: number) => {
  const dispatch = useDispatch();

  const cartQuery = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => fetchCart(userId),
  });

  // Sync Redux state when data changes
  useEffect(() => {
    if (cartQuery.data) {
      dispatch(setCart(cartQuery.data));
    }
  }, [cartQuery.data, dispatch]);

  return cartQuery;
};
