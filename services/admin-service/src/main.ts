import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.get('CORS_ORIGIN', '*'), credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Tatx Admin Service')
    .setDescription('Admin Dashboard API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('admin', 'Admin endpoints')
    .addTag('analytics', 'Analytics endpoints')
    .addTag('reports', 'Reports endpoints')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  const port = configService.get('PORT', 3010);
  await app.listen(port);
  console.log(`👨‍💼 Admin Service running on: http://localhost:${port}`);
}
bootstrap();
