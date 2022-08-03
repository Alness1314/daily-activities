import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const logger = new Logger('NestApplication');

  app.setGlobalPrefix('api');

  initSwagger(app);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  //await app.listen(AppModule.port);
  await app.listen(3000);

  logger.log(`Server running in ${await app.getUrl()}/api`);
}
bootstrap();
