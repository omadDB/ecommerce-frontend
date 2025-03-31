import { Product } from './productModel';

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  count: number;
  sum: number;
};
