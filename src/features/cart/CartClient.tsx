'use client';
import { CartHeader } from '@/features/cart/CartHeader';
import { CartList } from '@/features/cart/CartList';
import { useCart } from '@/hooks/useCart';
import Spinner from '@/components/Spinner';

export default function CartClient() {
  const userId = 2;
  const { cart, isLoading, error } = useCart(userId);
  console.log(cart);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!cart) return null;

  return (
    <div className="flex flex-col my-8">
      <CartHeader />
      <CartList cart={cart} />
    </div>
  );
}
