export interface CreateOrderDto {
  products: string[];
  quantity: number;
  total: number;
  status?: 'COMPLETED';
}
