export abstract class CacheRepository {
  abstract get<T>(key: string): Promise<T>;
  abstract getAll<T>(key: string): Promise<T[]>;
  abstract set(key: string, value: any): Promise<void>;
  abstract setMany<T extends { id: string }>(
    documents: T[],
    key: string,
  ): Promise<void>;
  abstract delete(key: string): Promise<void>;
}
