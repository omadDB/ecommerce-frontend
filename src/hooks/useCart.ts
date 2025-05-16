import { getCart } from '@/services/apiCart';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/lib/authToken';

export function useCart(userId: number | null) {
  const token = getAccessToken();

  const fetchCart = async () => {
    if (userId && token) {
      return await getCart(userId);
    } else {
      return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    }
  };

  const {
    data: cart = { cartItems: [], totalQuantity: 0, totalPrice: 0 },
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart', userId, token],
    queryFn: fetchCart,
    enabled: !!userId && !!token,
  });

  return { cart, isSuccess, isLoading, error };
}
