'use client';

import { formatCurrency } from '@/utils/helpers';
import { ChevronRight, ShoppingBagIcon } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { CartItem } from '@/types/cartItemModel';
import { Product } from '@/types/productModel';
import useCartActions from '@/hooks/useCartActions';
import UpdateProductOneQuantity from './UpdateProductOneQuantity';

export function ProductDetails({
  product,
  cartItem,
}: {
  product: Product;
  cartItem: CartItem;
}) {
  const { addMutation } = useCartActions();
  const [size, setSize] = useState('s');

  const [localQuantity, setLocalQuantity] = useState<number>(1);

  function handleAddToCart() {
    console.log(localQuantity);
    addMutation.mutate({
      productId: product.id,
      countForUpdate: localQuantity,
      product,
    });
  }

  if (!product) return;

  return (
    <div>
      <h2 className="text-[#1c284b] font-medium text-3xl">{product?.name}</h2>
      <div className="mt-6">
        <p className="tracking-tight text-[#1c284b] font-bold text-4xl">
          {formatCurrency(product?.price)}
        </p>
        <p className="mt-4">
          Стоимость доставки расчитывается при оформлении заказа
        </p>
      </div>
      <div className=" relative flex flex-col gap-2 mt-8 pt-6 before:w-[95%] before:content-[''] before:absolute before:top-0 before:left-[2.5%] before:bg-gray-300 before:h-[1px]">
        <div className="flex items-center gap-3">
          <p className="font-medium">Size</p>
          <span className="text-gray-400 font-normal">
            <ChevronRight width={18} />
          </span>
          <p className="text-gray-400 font-normal">
            {size === 's' ? 'Small' : 'Medium'}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className={clsx(
              'border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white',
              size.toLowerCase() === 's' ? 'bg-[#1c284b] text-white' : ''
            )}
            onClick={() => setSize('s')}
          >
            S
          </button>
          <button
            className={clsx(
              'border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white',
              size.toLowerCase() === 'm' ? 'bg-[#1c284b] text-white' : ''
            )}
            onClick={() => setSize('m')}
          >
            M
          </button>
        </div>
      </div>
      <div className="relative mt-6 pb-6 mb-8 flex flex-col items-start gap-3 after:w-[95%] after:content-[''] after:absolute after:bottom-0 after:left-[2.5%] after:bg-gray-300 after:h-[1px]">
        {product.stock > 0 ? (
          <>
            <div className="flex items-center gap-3">
              <p className="font-medium">Количество</p>
              <span className="text-gray-400 font-normal">
                <ChevronRight width={18} />
              </span>
              <p className="text-gray-400 font-normal">
                {product?.stock} in stock
              </p>
            </div>

            <UpdateProductOneQuantity
              onQuantityChange={setLocalQuantity}
              localQuantity={localQuantity}
              product={product}
            />
          </>
        ) : (
          <div className="w-[100%] rounded-md flex items-center justify-center bg-gray-300 py-5 px-4">
            Out of stock
          </div>
        )}
      </div>

      <div className="relative pb-8 mt-4 after:w-[95%] after:content-[''] after:absolute after:bottom-0 after:left-[2.5%] after:bg-gray-300 after:h-[1px]">
        <h5 className="">Многофункциональный инструмент HandyFix Pro</h5>
        <ul className="flex flex-col gap-2 !list-disc pl-6 mt-3">
          <li>Надежный металлический корпус и эргономичная ручка.</li>
          <li>Идеально подходит для работы с трубами и фитингами.</li>
          <li>Удобный механизм регулировки для различных диаметров.</li>
          <li>
            Компактный размер, легко помещается в сумку или ящик для
            инструментов.
          </li>
          <li>
            Поставляется в фирменной упаковке HandyFix с набором наклеек в
            подарок.
          </li>
        </ul>
      </div>
      {product.stock > 0 ? (
        <>
          <div className="flex flex-col gap-3 justify-between items-center my-8">
            <p className="font-bold text-4xl text-right">Total: </p>
            <h3 className="text-primary-800  font-bold text-[44px] text-right">
              {formatCurrency(localQuantity * product.price)}
            </h3>
          </div>
          <button
            className="flex items-center disabled:border-transparent disabled:text-white  disabled:bg-slate-300 justify-center gap-2 w-full mt-5 py-3 text-center bg-primary-800 text-white hover:bg-white group hover:text-primary-950 duration-200 rounded-md border-transparent border hover:border-[#1c284b]"
            onClick={handleAddToCart}
            disabled={localQuantity > product.stock || addMutation.isPending}
          >
            <ShoppingBagIcon
              className=" group-disabled:group-hover:stroke-white group-hover:stroke-[#1c284b] duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />{' '}
            Добавить в корзину
          </button>
        </>
      ) : null}
    </div>
  );
}
