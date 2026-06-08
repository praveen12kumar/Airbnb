import { Queue } from "bullmq";
import { serverConfig } from "../config";

export const redisConfig = {
  host: serverConfig.REDIS_HOST,
  port: serverConfig.REDIS_PORT,
};

export const MAILER_QUEUE = "mailer-queue";

export const mailerQueue = new Queue(MAILER_QUEUE, {
  connection: redisConfig,
});
