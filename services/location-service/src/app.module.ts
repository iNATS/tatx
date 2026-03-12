import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './modules/location/location.module';
import { GeocodingModule } from './modules/geocoding/geocoding.module';
import { RoutingModule } from './modules/routing/routing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }),
    LocationModule,
    GeocodingModule,
    RoutingModule,
  ],
})
export class AppModule {}
