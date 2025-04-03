import { axiosPublic } from '@/lib/axios/axios';
import { Product } from '@/types/productModel';

export async function getProduct(id: number | null) {
  try {
    const res = await axiosPublic.get<Product>(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
