import { ShoppingBagIcon, TagIcon } from 'lucide-react';
import CartItem from './CartItem';
import Link from 'next/link';
import { CartData } from '@/types/cartItemModel';
import CartCta from './CartCTA';

export function CartList({ cart, userId }: { cart: CartData; userId: number }) {
  const cartItems = cart.cartItems;
  return (
    <div className="w-full mt-1">
      <table className="w-full border-collapse">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="p-4 text-left" colSpan={2}>
              Товар
            </th>
            <th className="p-4 text-center" colSpan={1}>
              Количество
            </th>
            <th className="p-4 text-center" colSpan={1}>
              Всего
            </th>
          </tr>
        </thead>
        <tbody
          className={`${
            cartItems?.length > 0 && 'border-b border-gray-300'
          } w-full`}
        >
          {cartItems?.length ? (
            cartItems
              .slice()
              .sort((a, b) => a.id! - b.id!)
              .map((cartItem) => (
                <CartItem cartItem={cartItem} key={cartItem.id} />
              ))
          ) : (
            <tr>
              <td colSpan={4} className="p-2">
                <div className="flex flex-col items-center justify-center w-full gap-4 text-center my-14">
                  <ShoppingBagIcon size={50} color="gray" />
                  <p className="text-xl font-semibold text-gray-600">
                    Корзина пуста
                  </p>
                  <Link
                    href="/categories/all"
                    className="flex items-center gap-3 px-4 py-2 mt-4 text-white duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Перейти в каталог <TagIcon width={18} height={18} />
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CartCta userId={userId} />
    </div>
  );
}
