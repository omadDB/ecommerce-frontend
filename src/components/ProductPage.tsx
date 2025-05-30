'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UpdateProductOneQuantity from './UpdateProductOneQuantity';
import Spinner from './Spinner';
import { useCart } from '@/hooks/useCart';
import { useProduct } from '@/hooks/useProduct';
import useCartActions from '@/hooks/useCartActions';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/helpers';

export default function ProductPage({
  id,
  userId,
}: {
  id: number;
  userId: number | null;
}) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    // cart: { cartItems },
    isLoading: isFetchingCart,
    error: cartError,
  } = useCart(userId);
  const {
    product,
    isLoading: isFetchingProduct,
    error: productError,
  } = useProduct(Number(id));
  const { addMutation } = useCartActions();
  const [localQuantity, setLocalQuantity] = useState<number>(1);

  function handleAddToCart() {
    if (!userId) {
      router.push('/login');
      return;
    }
    addMutation.mutate({
      productId: product!.id,
      countForUpdate: localQuantity,
      product: product!,
    });
  }

  if (isFetchingCart || isFetchingProduct) return <Spinner />;
  if (cartError || productError)
    return <p>{cartError ? cartError.message : productError?.message}</p>;
  if (!product) return null;

  return (
    <div className="min-h-screen">
      {/* Navigation breadcrumb */}
      {/* <div className="bg-white border-b">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500">
            <span>Home</span> / <span>Furniture</span> /{' '}
            <span>Dining Tables</span> /{' '}
            <span className="text-gray-900">Solid Oak Dining Table</span>
          </nav>
        </div>
      </div> */}

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="overflow-hidden bg-white border rounded-lg aspect-square">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.stock >= 0 ? 'In Stock' : 'Out of Stock'}
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              {/* <p className="mb-4 text-sm text-gray-600">SKU: DOT-2024-001</p> */}

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {/* <span className="text-lg text-gray-500 line-through">
                  $1,599.00
                </span>
                <Badge variant="destructive" className="text-xs">
                  19% OFF
                </Badge> */}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <UpdateProductOneQuantity
                  localQuantity={localQuantity}
                  onQuantityChange={setLocalQuantity}
                  product={product}
                />

                <p className="text-sm text-gray-500">
                  Доступно: {product?.stock} шт.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={
                    localQuantity > product.stock || addMutation.isPending
                  }
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addMutation.isPending
                    ? 'Добавление...'
                    : 'Добавить в корзину'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'text-red-600 border-red-600' : ''}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </Button>
                {/* <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button> */}
              </div>

              {/* <Button variant="outline" className="w-full" size="lg">
                Buy Now
              </Button> */}
            </div>

            {/* Shipping and Return Info */}
            <div className="pt-4 space-y-3 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <span>
                  5.000.000 сўмдан ортиқ барча буюртмалар учун бепул етказиб
                  бериш
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span>30-day return policy</span>
              </div>
            </div>

            {/* Delivery Information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Delivery Information</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• Standard delivery: 5-7 business days</p>
                  <p>• White glove delivery available</p>
                  <p>• Assembly service available for additional fee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
