import { CartItem } from './cartItemModel';
import { Category } from './categoryModel';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  category: Category;
  cartItems: CartItem[];
};
