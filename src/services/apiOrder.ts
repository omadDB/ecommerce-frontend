import { axiosInstance } from '@/lib/axios/axios';
import { Order } from '@/types/orderModel';

export const createOrder = async (orderInfo: { shippingAddress: string }) => {
  try {
    const res = await axiosInstance.post<Order>('/orders', orderInfo);
    return res.data;
  } catch (err) {
    console.error('Error creating order:', err);
    throw err;
  }
};

export const getUserOrders = async () => {
  try {
    const res = await axiosInstance.get<Order[]>(`/orders/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching user orders:', err);
    throw err;
  }
};
