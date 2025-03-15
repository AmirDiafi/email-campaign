import { Controller, Get } from '@nestjs/common';
import { EmailScheduler } from './emails.scheduler';

/**
 * Controller for testing email-related functionality.
 */
@Controller('test')
export class EmailTestController {
  constructor(private emailScheduler: EmailScheduler) {}

  /**
   * Triggers the sending of birthday emails.
   *
   * This route calls the email scheduler to handle sending emails to users with upcoming birthdays.
   *
   * @returns A confirmation message indicating that birthday emails were triggered.
   *
   * @example
   * // Example response:
   * "Birthday emails triggered!"
   *
   * GET /test/trigger-birthday-emails
   */
  @Get('trigger-birthday-emails')
  async triggerBirthdayEmails() {
    await this.emailScheduler.handleBirthdayEmails();
    return 'Birthday emails triggered!';
  }
}
