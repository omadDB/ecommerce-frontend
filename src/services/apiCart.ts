import axiosInstance from "@/lib/axios"
import { Product } from "@/types/productModel"

export async function addCartItem() {
  try {
    const response = await axiosInstance.post<Product>("/cart/items")

    return response.data
  } catch (err) {
    console.error(err)
  }
}

export async function removeCartItem(id: number) {
  try {
    const response = await axiosInstance.delete<Product>(`/cart/items/${id}`)

    return response.data
  } catch (err) {
    console.error(err)
  }
}

export async function updateCartItem(id: number) {
  try {
    const response = await axiosInstance.put<Product>(`/cart/items/${id}`)

    return response
  } catch (err) {
    console.error(err)
  }
}
