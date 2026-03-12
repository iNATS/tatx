import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './modules/driver/driver.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DocumentsModule } from './modules/documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }),
    DriverModule,
    VehicleModule,
    DocumentsModule,
  ],
})
export class AppModule {}
