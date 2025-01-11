import { Cart } from "./cartModel"
import { Order } from "./orderModel"

export type User = {
  id: number
  name: string
  email: string
  password: string
  phoneNumber?: string | null
  address?: string | null
  role: string // Default: "customer"
  createdAt: Date
  updatedAt: Date
  orders: Order[]
  cart?: Cart | null
}
