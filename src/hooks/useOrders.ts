import { getUserOrders } from '@/services/apiOrder';
import { useQuery } from '@tanstack/react-query';

export default function useOrders(userId: number | null) {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getUserOrders(),
    enabled: !!userId,
  });

  return {
    orders,
    isLoading,
    error,
  };
}
