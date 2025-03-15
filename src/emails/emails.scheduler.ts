// src/email/email.scheduler.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobService } from 'src/jobs/jobs.service';

/**
 * Service responsible for scheduling and handling email-related tasks.
 * Specifically, it manages the scheduling of birthday emails.
 */
@Injectable()
export class EmailScheduler {
  constructor(private jobService: JobService) {}

  /**
   * Cron job that triggers every day at midnight to handle sending birthday emails.
   *
   * This method will fetch all users with upcoming birthdays and schedule an email for each user.
   *
   * @returns A promise indicating the completion of the email scheduling task.
   *
   * @example
   * // This method is automatically triggered at midnight every day.
   */
  @Cron('0 0 0 * * *') // Run at midnight every day
  async handleBirthdayEmails() {
    const upcomingUsers = await this.jobService.getUsersWithUpcomingBirthdays();
    for (const user of upcomingUsers) {
      await this.jobService.scheduleBirthdayEmail(user.id);
    }
  }
}
