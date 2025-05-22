'use client';
import { CartHeader } from '@/features/cart/CartHeader';
import { CartList } from '@/features/cart/CartList';
import { useCart } from '@/hooks/useCart';
import Spinner from '@/components/Spinner';

export default function CartClient({ userId }: { userId: number }) {
  const { cart, isLoading, error } = useCart(userId);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!cart) return null;

  return (
    <div className="flex flex-col my-4 sm:my-6 md:my-8">
      <CartHeader />
      <CartList cart={cart} userId={userId} />
    </div>
  );
}
