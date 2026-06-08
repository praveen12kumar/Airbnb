export interface NotificationDTO {
  to: string; // Email address of the recipient
  subject: string; // Subject of the email
  templateId: string; // Identifier for the email template to use
  params: Record<string, any>; // Dynamic parameters to populate the email template
}
