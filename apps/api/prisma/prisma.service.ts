import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Connect to the database when the module is initialized
  async onModuleInit() {
    await this.$connect();
  }

  // Disconnect from the database when the application shuts down
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
