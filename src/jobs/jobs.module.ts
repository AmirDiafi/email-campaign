import { Module } from '@nestjs/common';
import { EmailService } from 'src/emails/emails.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobService } from './jobs.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [EmailService, PrismaService, JobService, UsersService], // Register providers
})
export class AppModule {}
