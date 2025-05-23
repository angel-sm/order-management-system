type Entities = 'Order';

export class NotFoundError extends Error {
  constructor(id: string, entity: Entities) {
    super(`Not found any ${entity} with id ${id}.`);
    this.name = 'NotFoundError';
  }
}
