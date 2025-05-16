import { useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/app/get-query-client';
import toast from 'react-hot-toast';
import {
  addCartItem,
  removeCartItemAPI,
  updateCartItemAPI,
} from '@/services/apiCart';

export const useCartActions = () => {
  const queryClient = getQueryClient();

  const addMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      toast.success('Товар добавлен в корзину', {
        duration: 1000,
      });

      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateCartItemAPI,
    onSuccess: () => {
      toast.success('Количество товара обновлено', {
        duration: 1000,
      });

      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItemAPI,
    onSuccess: () => {
      toast.success('Товар удален из корзины', {
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addMutation, updateMutation, removeMutation };
};

export default useCartActions;
