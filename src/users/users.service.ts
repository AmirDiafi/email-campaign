import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserWithSortedProducts } from 'src/utils/sortUserProducts';
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
   * Get a single user by ID with their suggested products.
   * @param userId - User ID
   */
  async getUserWithSuggestions(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        suggestions: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Get users with upcoming birthdays along with their suggested products.
   */
  async getUsersWithUpcomingBirthdays() {
    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + 7);

    const users = await this.prisma.user.findMany({
      include: {
        suggestions: {
          include: {
            product: true,
          },
        },
      },
    });

    // Filter users whose birthday is within the next 7 days
    const upcomingUsers = users.filter((user) => {
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

    const sortedUserProducts = upcomingUsers.map((user) =>
      getUserWithSortedProducts(user),
    );

    return sortedUserProducts;
  }
}
