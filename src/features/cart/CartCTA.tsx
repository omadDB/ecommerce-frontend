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
        <div className="flex justify-end w-full px-4 mt-4 sm:px-12">
          <div className="w-full max-w-md p-4 bg-white rounded-lg sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h4 className="text-base font-semibold text-gray-700 sm:text-lg">
                  Total Amount
                </h4>
                <p className="text-xl font-bold sm:text-2xl text-primary-700">
                  {formatCurrency(totalPrice)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  Taxes, discounts and shipping costs are calculated at
                  checkout.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-4 py-2 text-sm font-medium text-white duration-200 rounded-lg sm:py-3 sm:text-base bg-primary-600 hover:bg-primary-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
