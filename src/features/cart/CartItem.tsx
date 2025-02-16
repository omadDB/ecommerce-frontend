import UpdateProductQuantity from "@/components/UpdateItemQuantity"
import { getCurrentQuantityById, removeItem } from "@/lib/store/cartSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { CartItem as CartItemModel } from "@/types/cartItemModel"
import { formatCurrency } from "@/utils/helpers"
import { TrashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export default function CartItem({ product }: { product: CartItemModel }) {
  const dispatch = useAppDispatch()

  const currentQuantity =
    useAppSelector((state) =>
      getCurrentQuantityById(product.productId)(state)
    ) || 1

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
            <h4 className="font-medium">{product.name}</h4>
            <p className="text-gray-500">{formatCurrency(product.price)}</p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="p-4  text-center">
        <div className="flex items-center justify-center gap-2">
          <UpdateProductQuantity
            productId={product.productId}
            stock={product.stock}
            currentQuantity={currentQuantity}
          />
          <button
            className="cursor-pointer"
            onClick={() => dispatch(removeItem(product.productId))}
          >
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
          {formatCurrency(product.price * currentQuantity)}
        </p>
      </td>
    </tr>
  )
}
