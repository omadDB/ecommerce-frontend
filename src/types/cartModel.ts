import { CartItem } from "./cartItemModel"
import { User } from "./userModel"

export type Cart = {
  id?: number
  userId?: number
  user?: User
  createdAt?: Date
  updatedAt?: Date
  cartItems: CartItem[]
  totalPrice: number
  totalQuantity: number
}
