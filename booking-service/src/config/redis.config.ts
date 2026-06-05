import  IORedis from "ioredis";
import { serverConfig } from "./index.js";
import Redlock, { type CompatibleRedisClient } from "redlock";

const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL);

export const redlock = new Redlock([redisClient as unknown as CompatibleRedisClient], {
    driftFactor: 0.01, // time in ms
    retryCount: 10,
    retryDelay: 200, // time in ms
    retryJitter: 200, // time in ms
})