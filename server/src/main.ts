import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { prisma } from '@/prisma';

import { AppModule } from './app.module';
import { middlewares } from './app.midlewares';

const PORT = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.use(middlewares);

    await app.listen(PORT);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
bootstrap();
