import { OrderItem } from "./orderItemModel"
import { User } from "./userModel"

export type Order = {
  id: number
  userId: number
  user: User
  status: string // Default: "pending"
  totalAmount: number
  shippingAddress: string
  createdAt: Date
  updatedAt: Date
  orderItems: OrderItem[]
}
