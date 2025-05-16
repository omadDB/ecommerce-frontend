import { OrderItem } from './orderItemModel';

export type Order = {
  id: number;
  userId: number;
  status: 'pending' | 'confirmed' | 'declined' | 'delivered'; // Default: "pending"
  totalPrice: number;
  shippingAddress: string;
  createdAt: Date;
  confirmedAt?: Date;
  deliveredAt?: Date;
  deductedFromStock: boolean;
  items: OrderItem[];
};
