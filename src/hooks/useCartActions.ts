import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  updateCartItem,
  removeFromCart,
} from '@/lib/store/cartSlice';
import { CartItem } from '@/types/cartItemModel';
import axiosInstance from '@/lib/axios';

const addCartItem = async (item: CartItem) => {
  try {
    const res = await axiosInstance.post<CartItem>('/cart/add', item);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const updateCartItemAPI = async (item: CartItem) => {
  try {
    const res = await axiosInstance.put<CartItem>('/cart/update', item);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const removeCartItemAPI = async (productId: number) => {
  try {
    console.log('Adding to cart:', productId);
    const res = await axiosInstance.delete<CartItem>(
      `/cart/remove/${productId}`
    );
  } catch (err) {
    console.error(err);
  }
};

export const useCartActions = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addCartItem,
    onMutate: (newItem) => {
      queryClient.setQueryData(['cart'], (oldCart: CartItem[] = []) => [
        ...oldCart,
        newItem,
      ]);
      dispatch(addToCart(newItem));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      }),
  });

  const updateMutation = useMutation({
    mutationFn: updateCartItemAPI,
    onMutate: (updatedItem) => {
      queryClient.setQueryData(['cart'], (oldCart: CartItem[] = []) =>
        oldCart.map((item) =>
          item.productId === updatedItem.productId ? updatedItem : item
        )
      );
      dispatch(updateCartItem(updatedItem));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      }),
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItemAPI,
    onMutate: (productId) => {
      queryClient.setQueryData(['cart'], (oldCart: CartItem[] = []) =>
        oldCart.filter((oldItem) => productId !== oldItem.productId)
      );
      dispatch(removeFromCart(productId));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      }),
  });

  return { addMutation, updateMutation, removeMutation };
};

export default useCartActions;
