type OrderStatus = "COMPLETED" | "PENDING" | "ERROR";

export interface Order {
  id: string;
  products: string[];
  quantity: number;
  total: number;
  date: Date;
  status: OrderStatus;
  createdAt: string;
  updatedAt: Date;
}
