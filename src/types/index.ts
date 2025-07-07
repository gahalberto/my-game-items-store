import { Product, Order, User, CartItem, OrderItem } from '@prisma/client';

export type ProductWithDetails = Product;

export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    product: Product;
  })[];
  user?: User;
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export interface CartState {
  items: CartItemWithProduct[];
  total: number;
  count: number;
}

export interface CreateOrderData {
  userId?: string;
  userName?: string;
  userEmail?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 