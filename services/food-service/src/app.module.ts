import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrderModule } from './modules/order/order.module';
import { DeliveryZoneModule } from './modules/delivery-zone/delivery-zone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    RestaurantModule,
    MenuModule,
    OrderModule,
    DeliveryZoneModule,
  ],
})
export class AppModule {}
