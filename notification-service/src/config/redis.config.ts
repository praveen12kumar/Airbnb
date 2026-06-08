import Redis from "ioredis";
import { serverConfig } from "./index";

// Singleton pattern to ensure only one Redis connection is created and reused across the app
let connection: Redis | null = null;
export function getRedisConnectionObject() {

  const redisConfig = {
    port: serverConfig.REDIS_PORT,
    host: serverConfig.REDIS_HOST,
    maxRetriesPerRequest: null, // Disable retrying failed commands
  };

  if (!connection) {
    connection = new Redis(redisConfig);
    return connection;
  }
  return connection;
}

/***
 * x = getRedisConnection(); x -> Redis connection instance
 *
 * y = getRedisConnection(); y -> same Redis connection instance as x
 *
 * This ensures that the same Redis connection is reused across the app,
 * preventing multiple connections from being created.
 * The closure keeps the connection variable alive after connectToRedis() finishes.
 * Since all future calls to getRedisConnection() share that same remembered connection
 * variable, the Redis instance is created only once and reused forever, which makes this
 * function behave like a Singleton pattern.
 */
