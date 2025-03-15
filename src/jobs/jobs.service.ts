import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UsersService } from 'src/users/users.service';

/**
 * Service responsible for managing job scheduling and interacting with queues.
 * This service handles scheduling birthday emails and retrieving users with upcoming birthdays.
 */
@Injectable()
export class JobService {
  constructor(
    @InjectQueue('emailQueue') private emailQueue: Queue, // Inject the emailQueue
    private userService: UsersService, // Inject UsersService to access user data
  ) {}

  /**
   * Schedules a birthday email to be sent for a given user.
   *
   * This method adds a job to the email queue for sending a birthday email to the specified user.
   *
   * @param userId - The ID of the user to receive the birthday email.
   * @returns A promise that resolves once the job is added to the queue.
   *
   * @example
   * // Example input:
   * scheduleBirthdayEmail(1)
   * // Adds a job for sending a birthday email to user with ID 1
   */
  async scheduleBirthdayEmail(userId: number) {
    await this.emailQueue.add('sendBirthdayEmail', { userId });
  }

  /**
   * Retrieves users whose birthdays are within the next 7 days.
   *
   * This method calls the UsersService to get users with upcoming birthdays.
   *
   * @returns A promise containing an array of users with their upcoming birthdays.
   *
   * @example
   * // Example output:
   * [
   *   {
   *     id: 1,
   *     email: "user@example.com",
   *     birthdate: "1990-01-01T00:00:00Z"
   *   },
   *   ...
   * ]
   */
  async getUsersWithUpcomingBirthdays() {
    const upcomingUsers =
      await this.userService.getUsersWithUpcomingBirthdays();
    return upcomingUsers;
  }
}
