import Spinner from '@/components/Spinner';
import UpdateCartItemQuantity from '@/components/UpdateCartItemQuantity';
import useCartActions from '@/hooks/useCartActions';
import { CartItem as CartItemModel } from '@/types/cartItemModel';
import { formatCurrency } from '@/utils/helpers';
import { TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

function CartItem({ cartItem }: { cartItem: CartItemModel }) {
  const { removeMutation } = useCartActions();

  function handleRemove() {
    removeMutation.mutate(cartItem.productId);
    // dispatch(removeFromCart(product.productId));
  }

  if (!cartItem) return <Spinner />;
  if (!cartItem.product) return null;

  return (
    <tr key={cartItem.productId} className="">
      {/* Product and Image */}
      <td className="p-4" colSpan={2}>
        <div className="flex items-center gap-4">
          <div className="w-[80px] h-[80px] relative">
            <Image
              src="/example-product.webp"
              fill
              className="object-cover"
              alt="Product image"
            />
          </div>
          <div>
            <h4 className="font-medium">{cartItem.product.name}</h4>
            <p className="text-gray-500">
              {formatCurrency(cartItem.product.price)}
            </p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <UpdateCartItemQuantity cartItem={cartItem} />
          <button className="cursor-pointer" onClick={handleRemove}>
            <TrashIcon
              width={20}
              height={20}
              stroke="#DC2626"
              className="ml-4 duration-300 hover:scale-110"
              fill="none"
            />
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="p-4 text-center">
        <p className="text-lg tracking-widest">
          {formatCurrency(cartItem.product.price! * cartItem.count!)}
        </p>
      </td>
    </tr>
  );
}

export default CartItem;
