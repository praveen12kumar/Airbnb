import { Worker, Job } from "bullmq";
import { MAILER_QUEUE, redisConfig } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";
import { MAILER_PAYLOAD } from "../producers/email.producer";

export const setupMailerWorker = () => {
  const emailProcessor = new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job: Job) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error(`Unknown job name: ${job.name}`);
      }
      // call the service layer from here to send the email using the data in job.data
    },
    {
      connection: redisConfig,
    },
  );

  emailProcessor.on("completed", (job) => {
    console.log(`Email job completed for recipient: ${job.data.to}`);
  });

  emailProcessor.on("failed", () => {
    console.error(`Email job failed`);
  });
};
