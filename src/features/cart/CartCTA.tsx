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
        <div className="flex justify-end w-full pr-12 mt-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-700">
                  Total Amount
                </h4>
                <p className="text-2xl font-bold text-primary-700">
                  {formatCurrency(totalPrice)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
                className="w-full py-3.5 px-6 text-base font-medium text-white transition-all duration-200 bg-primary-700 rounded-lg hover:bg-primary-800 hover:shadow-lg hover:shadow-primary-700/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
