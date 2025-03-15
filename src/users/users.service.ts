import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service for managing user-related business logic.
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user with the given email and birthdate.
   *
   * @param email - The email address of the user.
   * @param birthdate - The birthdate of the user.
   * @returns A promise containing the created user object.
   *
   * @example
   * // Example input:
   * {
   *   email: "user@example.com",
   *   birthdate: "1990-01-01T00:00:00Z"
   * }
   *
   * @example
   * // Example output:
   * {
   *   id: 1,
   *   email: "user@example.com",
   *   birthdate: "1990-01-01T00:00:00Z"
   * }
   */
  async createUser(email: string, birthdate: Date) {
    return this.prisma.user.create({
      data: { email, birthdate },
    });
  }

  /**
   * Retrieves users whose birthdays are within the next 7 days.
   *
   * This function also includes user preferences for products and fetches associated product data.
   *
   * @returns A promise containing an array of users with their product preferences and upcoming birthdays.
   *
   * @example
   * // Example output:
   * [
   *   {
   *     id: 1,
   *     email: "user@example.com",
   *     birthdate: "1990-01-01T00:00:00Z",
   *     userProductPreference: [
   *       {
   *         product: { id: 101, name: "Product 1", description: "Product description" }
   *       }
   *     ]
   *   },
   *   ...
   * ]
   */
  async getUsersWithUpcomingBirthdays() {
    const today = new Date();

    const res = await this?.prisma?.user?.findMany({
      include: {
        userProductPreference: {
          include: {
            product: true, // Fetch preferred products
          },
        },
      },
    });

    // Filter users whose birthday is within the next 7 days
    const upcomingUsers = res.filter((user) => {
      const userBirthday = user.birthdate.getDate();
      const userBirthMonth = user.birthdate.getMonth() + 1;
      const todayMonth = today.getMonth() + 1;
      const todayDay = today.getDate();

      return (
        userBirthMonth === todayMonth &&
        userBirthday >= todayDay && // more than today
        userBirthday <= todayDay + 7 // less than 7 days from today
      );
    });

    return upcomingUsers;
  }
}
