import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

/**
 * Service responsible for sending emails using Nodemailer.
 * It is configured to use Gmail's SMTP server by default, but can be adapted to any SMTP provider.
 */
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  /**
   * Initializes the email transporter using the provided SMTP provider and authentication credentials.
   * In this case, it uses Gmail's SMTP service.
   *
   * @example
   * // The transporter is configured using the email and password from environment variables.
   * const emailService = new EmailService();
   * emailService.sendEmail({ ... }); // Use this service to send emails
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to use another SMTP provider (e.g., Outlook, SendGrid, etc.)
      auth: {
        user: process.env.EMAIL_USER, // The email address used to send emails (e.g., 'youremail@gmail.com')
        pass: process.env.EMAIL_PASS, // The email app-specific password or regular password
      },
    });
  }

  /**
   * Sends an email to the specified recipient with the provided content.
   *
   * @param to - The recipient's email address.
   * @param subject - The subject of the email.
   * @param html - The HTML content to be included in the body of the email.
   *
   * @returns A promise indicating the completion of the email sending process.
   *
   * @example
   * const emailContent = {
   *   to: "recipient@example.com",
   *   subject: "Welcome to our service",
   *   html: "<h1>Welcome to our platform!</h1><p>We're glad to have you.</p>",
   * };
   * emailService.sendEmail(emailContent);
   */
  async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    try {
      // Send the email using Nodemailer's transport
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender's email address
        to, // Recipient's email address
        subject, // Email subject line
        html, // HTML content for the email body
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
    }
  }
}
