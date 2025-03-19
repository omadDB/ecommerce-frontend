import { useSyncCartWithRedux } from '@/hooks/useCart';

export function CartList() {
  const { items, totalPrice } = useSyncCartWithRedux();

  return (
    <div className="mt-1 w-full">
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
          className={`${items.length > 0 && 'border-b border-gray-300'} w-full`}
        >
          {items.length ? (
            items
              .slice()
              .sort((a, b) => a.id! - b.id!)
              .map((product) => <CartItem product={product} key={product.id} />)
          ) : (
            <tr>
              <td colSpan={4} className="p-2">
                <div className="flex flex-col justify-center items-center w-full text-center gap-4 my-14">
                  <ShoppingBagIcon size={50} color="gray" />
                  <p className="text-xl font-semibold text-gray-600">
                    Корзина пуста
                  </p>
                  <Link
                    href="/categories/all"
                    className="mt-4 py-2 px-4 text-white bg-primary-600 rounded-lg hover:bg-primary-700 duration-200 flex items-center gap-3"
                  >
                    Перейти в каталог <TagIcon width={18} height={18} />
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
    </div>
  );
}
