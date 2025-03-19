import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  createUser(@Body() dto: CreateUserDto) {
    const { email, birthdate } = dto;
    return this.usersService.createUser(email, new Date(birthdate));
  }

  /**
   * Get users with upcoming birthdays along with their suggestions.
   */
  @Get('/upcoming-birthdays')
  async getUsersWithUpcomingBirthdays() {
    return this.usersService.getUsersWithUpcomingBirthdays();
  }

  /**
   * Get a single user by ID with their suggestions.
   */
  @Get('/:userId')
  async getUserWithSuggestions(@Param('userId') userId: string) {
    return this.usersService.getUserWithSuggestions(parseInt(userId));
  }
}
