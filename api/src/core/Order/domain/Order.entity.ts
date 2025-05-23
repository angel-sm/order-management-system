import { v4 as uuid } from 'uuid';

type OrderStatus = 'COMPLETED' | 'PENDING' | 'ERROR';

interface IOrder {
  id: string;
  products: string[];
  quantity: number;
  total: number;
  date: Date;
  status: OrderStatus;
}

export interface PrimitiveOrder extends IOrder {
  createdAt: Date;
  updatedAt: Date;
}

interface PgDocument extends IOrder {
  created_at: Date;
  updated_at: Date;
}

export class Order {
  constructor(private attibutes: PrimitiveOrder) {}

  static create(data: {
    id?: string;
    products: string[];
    quantity: number;
    total: number;
    date?: Date;
    status?: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Order({
      id: data.id ?? uuid(),
      products: data.products,
      quantity: data.quantity,
      total: data.total,
      date: data.date ?? new Date(),
      status: data.status ?? 'PENDING',
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    });
  }

  get id() {
    return this.attibutes.id;
  }

  get toPgDocument(): PgDocument {
    return {
      id: this.attibutes.id,
      products: this.attibutes.products,
      quantity: this.attibutes.quantity,
      total: this.attibutes.total,
      date: this.attibutes.date,
      status: this.attibutes.status,
      created_at: this.attibutes.createdAt,
      updated_at: this.attibutes.updatedAt,
    };
  }

  get toPrimitive(): PrimitiveOrder {
    return this.attibutes;
  }
}
