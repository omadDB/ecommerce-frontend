import { useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/app/get-query-client';
import { cartApi } from '@/services/apiCart';
import toast from 'react-hot-toast';
import useAxiosPrivate from '@/lib/axios/useAxiosPrivate';

export const useCartActions = () => {
  const axiosPrivate = useAxiosPrivate();
  const { addCartItem, removeCartItemAPI, updateCartItemAPI } =
    cartApi(axiosPrivate);
  const queryClient = getQueryClient();

  const addMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      toast.success('Item successfully added to cart!');

      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateCartItemAPI,
    onSuccess: () => {
      toast.success('Cart item successfully updated!');

      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItemAPI,
    onSuccess: () => {
      toast.success('Item successfully removed from cart!');
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addMutation, updateMutation, removeMutation };
};

export default useCartActions;
