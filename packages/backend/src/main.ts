import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs';
import { PORT } from './constants';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/cert.key'),
    cert: fs.readFileSync('./secrets/cert.crt'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Coding Challenge URL Shortener')
    .setDescription('URL Shortener API description')
    .addTag('url_shortener')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(PORT);

  console.log(`app listening on ${await app.getUrl()}`);
}
bootstrap();
