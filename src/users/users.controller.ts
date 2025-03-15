import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * Controller for managing user-related operations.
 */
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Creates a new user.
   *
   * @param email - The email address of the user to be created.
   * @param birthdate - The birthdate of the user.
   * @returns A promise containing the created user data.
   *
   * @example
   * // Example request body:
   * {
   *   "email": "user@example.com",
   *   "birthdate": "1990-01-01T00:00:00Z"
   * }
   *
   * POST /users/create
   */
  @Post('create')
  async createUser(email: string, birthdate: Date) {
    return this.usersService.createUser(email, birthdate);
  }

  /**
   * Retrieves all users with upcoming birthdays.
   *
   * @returns A promise containing an array of users with upcoming birthdays.
   *
   * @example
   * // Example response:
   * [
   *   {
   *     "id": 1,
   *     "email": "user@example.com",
   *     "birthdate": "1990-01-01T00:00:00Z"
   *   },
   *   ...
   * ]
   *
   * GET /users/upcoming-birthdays
   */
  @Get('upcoming-birthdays')
  async getUpcomingBirthdays() {
    return this.usersService.getUsersWithUpcomingBirthdays();
  }
}
