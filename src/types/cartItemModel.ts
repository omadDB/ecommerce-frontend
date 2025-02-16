import { Product } from "./productModel"

export interface CartItem extends Pick<Product, "price" | "name" | "stock"> {
  productId: number
  cartId?: number
  count: number
  sum: number
  images?: Product["images"]
}
