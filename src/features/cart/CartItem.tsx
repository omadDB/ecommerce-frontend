import Spinner from '@/components/Spinner';
import UpdateItemQuantity from '@/components/UpdateItemQuantity';
import useCartActions from '@/hooks/useCartActions';
import { getCurrentQuantityById } from '@/lib/store/cartSlice';
import { useAppSelector } from '@/lib/store/hooks';
import { CartItem as CartItemModel } from '@/types/cartItemModel';
import { formatCurrency } from '@/utils/helpers';
import { TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

function CartItem({ cartItem }: { cartItem: CartItemModel }) {
  const { removeMutation } = useCartActions();

  const currentQuantity =
    useAppSelector((state) =>
      getCurrentQuantityById(cartItem.productId)(state)
    ) || 1;

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
      <td className="p-4  text-center">
        <div className="flex items-center justify-center gap-2">
          <UpdateItemQuantity
            cartItem={cartItem}
            currentQuantity={currentQuantity}
          />
          <button className="cursor-pointer" onClick={handleRemove}>
            <TrashIcon
              width={20}
              height={20}
              stroke="#DC2626"
              className="ml-4 hover:scale-110 duration-300"
              fill="none"
            />
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="p-4 text-center">
        <p className="tracking-widest text-lg">
          {formatCurrency(cartItem.product.price! * currentQuantity)}
        </p>
      </td>
    </tr>
  );
}

export default CartItem;
