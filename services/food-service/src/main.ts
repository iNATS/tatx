import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    credentials: true,
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

  // Global API prefix
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Tatx Food Service')
    .setDescription(
      `
## Tatx Food Ordering Service API

Complete food ordering service for the Tatx platform supporting:
- **Restaurant Management** - CRUD operations, search, categories, promotions
- **Menu Management** - Menu items, modifiers, inventory tracking
- **Order Management** - Order creation, tracking, status workflow, history
- **Delivery Zones** - Polygon-based delivery areas, availability checking

### Order Status Workflow
\`PENDING → CONFIRMED → PREPARING → READY_FOR_PICKUP → PICKED_UP → IN_TRANSIT → DELIVERED\`

### Supported Order Types
- FOOD - Restaurant food delivery
- GROCERY - Grocery delivery
- COURIER - Package/courier delivery
- PHARMACY - Pharmacy delivery

### Authentication
All endpoints require Bearer token authentication. Include the token in the Authorization header.
      `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'Health check endpoints')
    .addTag('restaurants', 'Restaurant management - CRUD, search, categories, promotions')
    .addTag('menu', 'Menu management - Categories, items, modifiers, inventory')
    .addTag('orders', 'Order management - Create, track, cancel, rate orders')
    .addTag('delivery-zones', 'Delivery zone management - Polygon zones, availability checking')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Tatx Food Service API',
  });

  // Get port from environment or default to 3005
  const port = configService.get('PORT', 3005);
  const host = configService.get('HOST', '0.0.0.0');

  await app.listen(port, host);

  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🍔  Tatx Food Service                                   ║
║                                                           ║
║   Running on: http://${host}:${port}                      ║
║   API Docs: http://${host}:${port}/docs                   ║
║   Health:   http://${host}:${port}/api/health             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
