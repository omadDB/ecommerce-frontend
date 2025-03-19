import { Product } from './productModel';
export interface CartItem {
  id?: number;
  productId: number;
  cartId?: number;
  count: number;
  sum: number;
  images?: Product['images'];
  product: Product;
}
