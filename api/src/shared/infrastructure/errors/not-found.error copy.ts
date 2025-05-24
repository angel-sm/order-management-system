type Entities = 'Order' | 'User';

export class NotFoundError extends Error {
  constructor(id: string, entity: Entities, message?: string) {
    super(message ?? `Not found any ${entity} with id ${id}.`);
    this.name = 'NotFoundError';
  }
}
