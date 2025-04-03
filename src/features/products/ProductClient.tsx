'use client';

import { ProductDetails } from '@/components/ProductDetails';
import ProductImage from './ProductImage';
import Spinner from '@/components/Spinner';
import { useProduct } from '@/hooks/useProduct';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types/cartItemModel';

export default function ProductClient({
  id,
  userId,
}: {
  id: number;
  userId: number;
}) {
  const {
    cart: { cartItems },
    isLoading: isFetchingCart,
    error: cartError,
  } = useCart(userId);
  const {
    product,
    isLoading: isFetchingProduct,
    error: productError,
  } = useProduct(Number(id));

  let cartItem;
  if (cartItems?.length > 0) {
    cartItem = (cartItems || []).find(
      (item: CartItem) => item.productId === product?.id
    );
  }

  if (isFetchingCart || isFetchingProduct) return <Spinner />;
  if (cartError || productError)
    return <p>{cartError ? cartError.message : productError?.message}</p>;
  if (!product) return null;

  return (
    <div className="grid grid-cols-[50%_1fr] gap-12 my-8">
      <ProductImage />
      <ProductDetails userId={userId} product={product} cartItem={cartItem} />
    </div>
  );
}
