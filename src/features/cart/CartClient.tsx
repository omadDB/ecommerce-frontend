'use client';
import { CartHeader } from '@/features/cart/CartHeader';
import { CartList } from '@/features/cart/CartList';
import { useEffect } from 'react';
import { setCart } from '@/lib/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useCart } from '@/hooks/useCart';

export default function CartClient() {
  const { userId } = useAppSelector((state) => state.auth);
  const { cart, isSuccess, isLoading, error } = useCart(userId);
  console.log(cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && cart) dispatch(setCart(cart));
  }, [cart, dispatch, isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cart) return null;

  return (
    <div className="flex flex-col my-8">
      <CartHeader />
      <CartList cart={cart} />
    </div>
  );
}
