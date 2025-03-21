'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { formatCurrency } from '@/utils/helpers';

export default function CartCta() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  if (!items) return null;

  return (
    <>
      {items.length > 0 && (
        <div className="w-full mt-6 flex justify-end">
          <div className="w-[30%] flex flex-col gap-5">
            <div className="flex gap-6">
              <h4>Ориентировочная общая сумма</h4>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
            <p>
              Налоги, скидки и стоимость доставки рассчитываются при оформлении
              заказа.
            </p>
            <button className="w-full mt-5 py-3 text-center bg-primary-700 text-white hover:bg-white hover:text-primary-950 duration-200 rounded-md border-transparent border hover:border-primary-700">
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </>
  );
}
