import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrismaService, EmailService],
  exports: [EmailService],
})
export class EmailModule {}
