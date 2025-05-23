import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType, RedisArgument } from 'redis';
import { CacheRepository } from 'src/shared/domain/cache.respository';

@Injectable()
export class RedisRepository extends CacheRepository {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {
    super();
  }

  async get(key: string): Promise<any> {
    return await this.redisClient.get(key);
  }

  async getAll(key: string = '*'): Promise<any> {
    const keys = await this.redisClient.keys(key);
    if (keys.length === 0) return [];

    return await this.redisClient.mGet(keys);
  }

  async setMany<T extends { id: string }>(
    documents: T[],
    key: string,
  ): Promise<void> {
    const entries = documents.flatMap((document) => [
      `${key}:${document.id}`,
      JSON.stringify(document),
    ]);

    await this.redisClient.mSet(entries);
  }

  async set(key: string, value: RedisArgument): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
