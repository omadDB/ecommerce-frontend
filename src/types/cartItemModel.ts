import { Cart } from "./cartModel"
import { Product } from "./productModel"

export type CartItem = {
  id: number
  cartId: number
  cart: Cart
  productId: number
  product: Product
  quantity: number
}
