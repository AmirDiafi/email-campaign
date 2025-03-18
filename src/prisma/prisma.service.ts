import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly maxRetries = 5; // Maximum number of retries
  private readonly retryDelay = 5000; // Delay between retries in milliseconds

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async connectWithRetry(retries = 0): Promise<void> {
    try {
      await this.$connect();
      console.log('✅ Database connected');
    } catch (error) {
      console.error(
        `❌ Database connection failed (Attempt ${retries + 1}/${this.maxRetries}). Retrying in ${this.retryDelay / 1000} seconds...`,
        error,
      );

      if (retries < this.maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        await this.connectWithRetry(retries + 1);
      } else {
        console.error(
          '🚫 Max retries reached. Could not connect to the database.',
        );
        process.exit(1); // Exit the process if max retries are reached
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Database disconnected');
  }
}
