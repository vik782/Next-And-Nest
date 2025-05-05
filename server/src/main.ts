import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(Number(process.env.PORT), () => {
    console.log(`Server started at: http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
