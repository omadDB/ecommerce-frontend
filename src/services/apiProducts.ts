import { axiosInstance } from '@/lib/axios/axios';
import { Product } from '@/types/productModel';

export interface PaginatedProducts {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getAllProducts(page = 1, limit = 200) {
  try {
    const res = await axiosInstance.get<PaginatedProducts>(
      `/products?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getProduct(id: number | null) {
  try {
    const res = await axiosInstance.get<Product>(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
