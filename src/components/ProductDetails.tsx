'use client';

import { formatCurrency } from '@/utils/helpers';
import { ShoppingBagIcon } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types/productModel';
import useCartActions from '@/hooks/useCartActions';
import UpdateProductOneQuantity from './UpdateProductOneQuantity';
import AuthModal from '@/features/authentication/AuthModal';

export function ProductDetails({
  product,
  userId,
}: {
  product: Product;
  userId: number | null;
}) {
  const { addMutation } = useCartActions();
  const [localQuantity, setLocalQuantity] = useState<number>(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  function handleAddToCart() {
    if (!userId) {
      setIsAuthModalOpen(true);
      return;
    }
    addMutation.mutate({
      productId: product.id,
      countForUpdate: localQuantity,
      product,
    });
  }

  if (!product) return;

  return (
    <div className="flex flex-col max-w-2xl gap-10">
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        defaultForm="login"
      />

      <div className="space-y-6">
        <div>
          <h2 className="text-4xl font-bold text-[#1c284b] leading-tight">
            {product?.name}
          </h2>
        </div>

        <div className="flex items-baseline gap-3">
          <p className="text-2xl font-medium text-gray-600">
            Цена: {formatCurrency(product?.price)}
          </p>
          {product.stock > 0 && (
            <span className="text-sm font-medium text-green-600">
              В наличии
            </span>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {product.stock > 0 ? (
          <>
            <div className="p-6 space-y-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-700">Количество</p>
                <p className="text-sm text-gray-500">
                  Доступно: {product?.stock} шт.
                </p>
              </div>

              <UpdateProductOneQuantity
                onQuantityChange={setLocalQuantity}
                localQuantity={localQuantity}
                product={product}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
                <p className="text-xl font-medium text-gray-700">
                  Итого к оплате:
                </p>
                <p className="text-3xl font-bold text-[#1c284b]">
                  {formatCurrency(localQuantity * product.price)}
                </p>
              </div>

              <button
                className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#1c284b] text-white rounded-xl hover:bg-[#2a3a6a] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
                onClick={handleAddToCart}
                disabled={
                  localQuantity > product.stock || addMutation.isPending
                }
              >
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="text-lg font-medium">
                  {addMutation.isPending
                    ? 'Добавление...'
                    : 'Добавить в корзину'}
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="w-full px-8 py-6 text-center rounded-xl bg-gray-50">
            <p className="text-lg font-medium text-gray-600">Нет в наличии</p>
            <p className="mt-2 text-sm text-gray-500">
              Ожидаем поступление товара
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
