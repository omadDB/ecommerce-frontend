import { CartItem } from "./cartItemModel"
import { Category } from "./categoryModel"
import { OrderItem } from "./orderItemModel"

export type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  sku: string
  images: string[]
  createdAt: Date
  updatedAt: Date
  categoryId: number
  category: Category
  orderItems: OrderItem[]
  cartItems: CartItem[]
}
