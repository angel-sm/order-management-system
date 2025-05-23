type Entities = 'Order';

export class CreateDocumentError extends Error {
  constructor(id: string, entity: Entities) {
    super(`Occurred error to try insert ${entity} with id ${id}.`);
    this.name = 'UserNotFoundError';
  }
}
