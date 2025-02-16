import { Order } from "./orderModel"
import { Product } from "./productModel"

export type OrderItem = {
  id: number
  orderId: number
  order: Order
  productId: number
  product: Product
  count: number
  sum: number
}
