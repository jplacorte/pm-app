import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import { AppModule } from './src/app.module';
let serverPromise: Promise<any> | undefined;

async function bootstrap(): Promise<any> {
  if (serverPromise) return serverPromise;

  const app = express();

  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app), {
    logger: false,
  });

  // optional: set global pipes, cors, etc. if needed
  nestApp.enableShutdownHooks();
  await nestApp.init();

  // serverless-http wraps the express app
  const handler = serverless(app) as any;
  serverPromise = Promise.resolve(handler);
  return serverPromise;
}

export default async function handler(req: Request, res: Response) {
  const h = await bootstrap();
  return h(req, res);
}
