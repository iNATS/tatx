import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Enable raw body for webhook verification
    rawBody: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // CORS configuration
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Signature',
      'Stripe-Signature',
      'X-Tabby-Signature',
      'X-Tamara-Signature',
    ],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Tatx Payment Service')
    .setDescription(
      `
## Tatx Payment API

Comprehensive payment processing service for the Tatx platform supporting:

### Payment Gateways
- **HyperPay** - MADA, STC Pay (Saudi Arabia)
- **Stripe** - International credit/debit cards
- **Tabby** - Buy Now Pay Later (4 installments)
- **Tamara** - Buy Now Pay Later (3 installments)
- **Apple Pay** - Contactless payments
- **Google Pay** - Contactless payments

### Features
- Process payments for rides and orders
- Split payments (wallet + card)
- Save cards for future use (tokenization)
- Refund processing (full and partial)
- Installment plans (BNPL)
- Wallet management (balance, top-up, transfers)
- Auto top-up configuration
- Webhook handling for payment confirmations

### Authentication
All endpoints require Bearer token authentication.
Include the token in the Authorization header: \`Authorization: Bearer <token>\`
      `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Payments', 'Payment processing endpoints')
    .addTag('Wallet', 'Wallet management endpoints')
    .addTag('Gateway', 'Payment gateway configuration')
    .addTag('Webhooks', 'Webhook endpoints for payment confirmations')
    .addTag('health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Start server
  const port = configService.get('PORT', 3007);
  await app.listen(port);

  logger.log(`========================================`);
  logger.log(`  Tatx Payment Service`);
  logger.log(`========================================`);
  logger.log(`  Environment: ${configService.get('NODE_ENV', 'development')}`);
  logger.log(`  Port: ${port}`);
  logger.log(`  API: http://localhost:${port}/api`);
  logger.log(`  Docs: http://localhost:${port}/docs`);
  logger.log(`  Health: http://localhost:${port}/health`);
  logger.log(`========================================`);
}

bootstrap();
