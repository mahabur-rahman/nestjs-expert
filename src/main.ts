import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/v1`);
  app.useGlobalPipes(new ValidationPipe());

  // define the options or config settings for swagger document
  const options = new DocumentBuilder()
    .setTitle('Auth Example')
    .setDescription('JWT AUTHENTICATION DEMON WITH MONGODB')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    } as SecuritySchemeObject)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // setup the swagger module
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
