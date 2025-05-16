'use client';

import useOrders from '@/hooks/useOrders';
import { formatCurrency } from '@/utils/helpers';
import { format } from 'date-fns';
import Spinner from '@/components/Spinner';

export default function OrdersTab({ userId }: { userId: number }) {
  const { orders, isLoading, error } = useOrders(userId);

  console.log('Orders data:', orders);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading orders</p>;
  if (!orders.length) return <p>No orders found</p>;

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        console.log('Order items:', order.items);
        return (
          <div
            key={order.id}
            className="p-6 space-y-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), 'PPP')}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'confirmed'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === 'declined'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => {
                console.log('Item data:', item);
                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="mr-2 text-black">
                        {item.product?.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-500">
                        × <span className="mr-2"></span>
                        {item.count}
                      </span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(item.sum)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Shipping address: {order.shippingAddress}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
