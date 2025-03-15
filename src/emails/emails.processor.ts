/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { EmailService } from './emails.service';

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
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    // Generate a secure JWT token for the discount code
    const discountCode = jwt.sign(
      { userId, discount: '10%' },
      process.env.JWT_SECRET, // Secret key for JWT
      { expiresIn: '7d' }, // Expiry time for the discount code
    );

    // Fetch recommended products for the user based on their preferences
    let recommendedProducts = await this.prisma.product.findMany({
      where: { userProductPreference: { some: { user_id: userId } } },
      take: 3, // Limit to 3 products
    });

    if (recommendedProducts.length === 0) {
      // If no products are found, recommend default products
      recommendedProducts = await this.prisma.product.findMany({
        where: { price: { lte: 50 } }, // Default to cheaper products
        take: 3,
      });
    }

    // Construct the email content
    const emailContent = {
      to: user.email,
      subject: `🎉 Happy Birthday, ${user.email.split('@')[0]}! Here's a special gift for you 🎁`,
      html: `
        <h2>Happy Birthday, ${user.email.split('@')[0]}! 🎉</h2>
        <p>We have a special discount just for you! Use this code at checkout:</p>
        <h3 style="color:blue;">${discountCode}</h3>
        <p>Here are some products we think you'll love:</p>
        <ul style="list-style-type: none; padding: 0;">
          ${recommendedProducts.map((p) => `<li style="margin-bottom: 10px;">${p.name} - $${p.price}</li>`).join('')}
        </ul>
        <p>Enjoy your birthday shopping! 🛍️</p>
      `,
    };

    // Send the email using the EmailService
    await this.emailService.sendEmail(emailContent);

    console.log(`🎉 Birthday email sent to ${user.email}`);
  }
}
