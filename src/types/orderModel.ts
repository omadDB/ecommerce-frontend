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

export type OrderItem = {
  productId: number;
  name: string;
  price: number;
  count: number;
};
