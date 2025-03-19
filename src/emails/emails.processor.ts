/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { EmailService } from './emails.service';
import { suggestionProductsSortedByWeight } from 'src/utils/sortUserProducts';

/**
 * Processor for handling email-related jobs in the 'emailQueue'.
 * Specifically, it processes the 'sendBirthdayEmail' job to send birthday emails to users.
 */
@Processor('emailQueue')
@Injectable()
export class EmailProcessor {
  constructor(
    private prisma: PrismaService, // Inject PrismaService for database access
    private emailService: EmailService, // Inject EmailService for sending emails
  ) {}

  /**
   * Processes the 'sendBirthdayEmail' job, sending a personalized birthday email with a discount code and recommended products.
   *
   * This method is triggered when a job of type 'sendBirthdayEmail' is added to the emailQueue.
   * It fetches the user data, generates a discount code, recommends products, and sends the email.
   *
   * @param job - The Bull job containing the data for the user to receive the birthday email.
   * @returns A promise indicating the completion of the email sending process.
   *
   * @example
   * // This method is automatically triggered when a 'sendBirthdayEmail' job is added to the 'emailQueue'.
   */
  @Process('sendBirthdayEmail') // Listens for the 'sendBirthdayEmail' job
  async sendBirthdayEmail(job: Job<{ userId: number }>) {
    const { userId } = job.data;

    // Fetch user details from the database
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { suggestions: { include: { product: true } } },
    });
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    // if user has suggestions sort them else fetch some products and add them
    const sortedProducts =
      user.suggestions.length > 0
        ? suggestionProductsSortedByWeight(user.suggestions)
        : await this.prisma.product.findMany({
            take: 3,
            orderBy: { price: 'asc' },
          });

    // Generate a secure JWT token for the discount code
    const discountCode = jwt.sign(
      { userId, discount: '10%' },
      process.env.JWT_SECRET, // Secret key for JWT
      { expiresIn: '7d' }, // Expiry time for the discount code
    );

    if (!discountCode) {
      throw new Error('Missing discount code in email');
    }

    // Construct the email content
    const emailContent = {
      to: user.email,
      subject: `🎉 Happy Birthday, ${user.email.split('@')[0]}! Here's a special gift for you 🎁`,
      html: `
        <h2>Happy Birthday, ${user.email.split('@')[0]}! 🎉</h2>
        <p style="font-size: 16px;">We have a special discount just for you! Use this code at checkout:</p>
        <h5 style="color:blue;">${discountCode}</h5>
        <h3 style="color: green;">Here are some products we think you'll love:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${sortedProducts.map((p) => `<li style="margin-bottom: 10px; font-size: 16px;">${p.name} - $${p.price}</li>`).join('')}
        </ul>
        <p style="font-size: 14px;">Enjoy your birthday shopping! 🛍️</p>
      `,
    };

    // Send the email using the EmailService
    await this.emailService.sendEmail(emailContent);

    console.log(`🎉 Birthday email sent to ${user.email}`);
  }
}
