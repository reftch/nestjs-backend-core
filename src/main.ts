import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    // logger: console
  });
  app.use(bodyParser.json({ type: (req: any) => req.get('Content-Type') === 'application/vnd.api+json', strict: false }));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Backend core server API')
    .setDescription('The backend core API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // basic authentication
  app.use(basicAuth({
    users: {
      test: 'password',
    }
  }));

  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
