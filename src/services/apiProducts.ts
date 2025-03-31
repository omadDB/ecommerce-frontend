import axiosInstance from '@/lib/axios/axios';
import { Product } from '@/types/productModel';

export async function getProduct(id: number | null) {
  try {
    const res = await axiosInstance.get<Product>(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
