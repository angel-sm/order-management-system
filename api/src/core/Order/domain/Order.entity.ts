import { v4 as uuid, UUIDTypes } from 'uuid';

type OrderStatus = 'COMPLETED' | 'PENDING' | 'ERROR';

export interface PrimitiveOrder {
  id: UUIDTypes;
  products: UUIDTypes[];
  quantity: number;
  total: number;
  date: Date;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Order {
  constructor(private attibutes: PrimitiveOrder) {}

  static create(data: {
    id?: UUIDTypes;
    products: UUIDTypes[];
    quantity: number;
    total: number;
    date: Date;
    status: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Order({
      id: data.id ?? uuid(),
      products: data.products,
      quantity: data.quantity,
      total: data.total,
      date: data.date,
      status: data.status,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    });
  }

  get toPrimitive(): PrimitiveOrder {
    return this.attibutes;
  }
}
