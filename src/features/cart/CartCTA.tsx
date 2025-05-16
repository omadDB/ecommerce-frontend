'use client';

import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

export default function CartCta({ userId }: { userId: number }) {
  const router = useRouter();
  const {
    cart: { cartItems, totalPrice },
  } = useCart(userId);

  if (!cartItems) return null;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div className="flex justify-end w-full mt-6">
          <div className="w-[30%] flex flex-col gap-5">
            <div className="flex gap-6">
              <h4>Total Amount</h4>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
            <p>
              Taxes, discounts and shipping costs are calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              className="w-full py-3 mt-5 text-center text-white duration-200 border border-transparent rounded-md bg-primary-700 hover:bg-white hover:text-primary-950 hover:border-primary-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
