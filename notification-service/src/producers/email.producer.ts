import { mailerQueue } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";

export const MAILER_PAYLOAD  = 'payload:mail'

 // producer function to add email notification tasks to the mailer queue
export const addEmailToQueue = async (payload: NotificationDTO) => {  
  await mailerQueue.add(MAILER_PAYLOAD, payload);
  console.log(`Email added to queue for recipient: ${payload}`);
};