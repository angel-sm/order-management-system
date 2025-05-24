import { v4 as uuid } from 'uuid';

interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface PrimitiveUser extends IUser {
  createdAt: Date;
  updatedAt: Date;
}

interface PgDocument extends IUser {
  created_at: Date;
  updated_at: Date;
}

export class User {
  constructor(private attibutes: PrimitiveUser) {}

  static create(data: {
    id?: string;
    email: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new User({
      id: data.id ?? uuid(),
      email: data.email,
      name: data.name,
      password: '',
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    });
  }

  get id() {
    return this.attibutes.id;
  }

  set password(password: string) {
    this.attibutes.password = password;
  }

  get toPgDocument(): PgDocument {
    return {
      id: this.attibutes.id,
      email: this.attibutes.email,
      name: this.attibutes.name,
      password: this.attibutes.password,
      created_at: this.attibutes.createdAt,
      updated_at: this.attibutes.updatedAt,
    };
  }

  get toPrimitive(): PrimitiveUser {
    return this.attibutes;
  }
}
