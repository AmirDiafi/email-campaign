/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './emails/emails.module';
import { JobService } from './jobs/jobs.service';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { EmailProcessor } from './emails/emails.processor';
import { EmailService } from './emails/emails.service';
import { PrismaService } from './prisma/prisma.service';
import { EmailScheduler } from './emails/emails.scheduler';
import { BullModule } from '@nestjs/bull';
import { EmailTestController } from './emails/emails.controller';
import { bullConfig } from 'src/config/bull.config';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.registerQueue({
      name: 'emailQueue',
      redis: bullConfig.redis,
      defaultJobOptions: bullConfig.defaultJobOptions,
    }),
    ScheduleModule.forRoot(),
    SentryModule.forRoot(),
    PrismaModule,
    UsersModule,
    EmailModule,
  ],
  providers: [
    EmailProcessor,
    EmailService,
    JobService,
    PrismaService,
    EmailScheduler,
  ],
  controllers: [EmailTestController],
})
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
})
export class AppModule {}
