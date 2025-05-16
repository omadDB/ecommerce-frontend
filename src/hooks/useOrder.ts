import { createOrder } from '@/services/apiOrder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: createNewOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      orderInfo,
    }: {
      orderInfo: {
        shippingAddress: string;
        phone: string;
        email: string;
        fullName: string;
        additionalNotes: string;
      };
    }) => createOrder(orderInfo),
    onSuccess: () => {
      toast.success('Order created successfully!');
      // Invalidate cart query to refresh cart data
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create order');
    },
  });

  return {
    createNewOrder,
    isPending,
    error,
  };
}
