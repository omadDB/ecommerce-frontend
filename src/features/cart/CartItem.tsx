import Spinner from '@/components/Spinner';
import UpdateProductQuantity from '@/components/UpdateItemQuantity';
import useCartActions from '@/hooks/useCartActions';
import { getCurrentQuantityById, removeFromCart } from '@/lib/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { CartItem as CartItemModel } from '@/types/cartItemModel';
import { formatCurrency } from '@/utils/helpers';
import { TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

function CartItem({ product }: { product: CartItemModel }) {
  const dispatch = useAppDispatch();
  const { removeMutation } = useCartActions();

  const currentQuantity =
    useAppSelector((state) =>
      getCurrentQuantityById(product.productId)(state)
    ) || 1;

  function handleRemove() {
    removeMutation.mutate(product.productId);
    // dispatch(removeFromCart(product.productId));
  }

  if (!product) return <Spinner />;
  if (!product.product) return null;

  return (
    <tr key={product.productId} className="">
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
            <h4 className="font-medium">{product.product.name}</h4>
            <p className="text-gray-500">
              {formatCurrency(product.product.price)}
            </p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="p-4  text-center">
        <div className="flex items-center justify-center gap-2">
          <UpdateProductQuantity
            productId={product.productId}
            stock={product.product.stock!}
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
          {formatCurrency(product.product.price! * currentQuantity)}
        </p>
      </td>
    </tr>
  );
}

export default CartItem;
